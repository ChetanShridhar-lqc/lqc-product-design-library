// Liquidity Foundation — token → Figma sync engine.
// Runs inside the Figma Plugin API. Tokens are the source of truth:
// this script creates or updates variables, modes and text styles to match
// the bundled token files. It never edits the token files.
// The build step (scripts/build.mjs) injects the bundle below.
const BUNDLE = /*__BUNDLE__*/ null;
const OPTIONS = /*__OPTIONS__*/ { prune: false };

const TYPE_MAP = { color: 'COLOR', dimension: 'FLOAT', number: 'FLOAT', fontWeight: 'FLOAT', fontFamily: 'STRING', string: 'STRING' };

function walk(node, path, out) {
  if (node && typeof node === 'object' && '$value' in node) { out.push({ path, token: node }); return; }
  for (const k of Object.keys(node || {})) if (!k.startsWith('$')) walk(node[k], path.concat(k), out);
}
function scopeFor(scopes, path) {
  const dot = path.join('.'); let best = null, len = -1;
  for (const k of Object.keys(scopes || {})) {
    if (k === '*' && len < 0) { best = scopes[k]; len = 0; }
    else if ((dot === k || dot.startsWith(k + '.')) && k.length > len) { best = scopes[k]; len = k.length; }
  }
  return best || [];
}
function hexToRgba(hex) {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const r = parseInt(n.slice(0, 2), 16) / 255, g = parseInt(n.slice(2, 4), 16) / 255, b = parseInt(n.slice(4, 6), 16) / 255;
  const a = n.length === 8 ? parseInt(n.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}
const isAlias = v => typeof v === 'string' && /^\{[^}]+\}$/.test(v);
const aliasPath = v => v.slice(1, -1);

async function run(bundle, opts) {
  const { manifest, files } = bundle;
  const report = { collections: {}, variables: { created: 0, updated: 0 }, textStyles: { created: 0, updated: 0 }, orphans: [], warnings: [], errors: [] };

  // 1. Parse tokens into a global index: dotted path -> { collection, name, type, values{mode}, description }
  const index = {};
  for (const col of manifest.collections) {
    for (const [modeName, paths] of Object.entries(col.modes)) {
      for (const p of paths) {
        const leaves = []; walk(files[p], [], leaves);
        for (const { path, token } of leaves) {
          const key = path.join('.');
          const nameParts = col.stripRoot && path[0] === col.stripRoot ? path.slice(1) : path;
          const entry = index[key] || (index[key] = { key, path, collection: col.name, name: nameParts.join('/'), type: token.$type, values: {}, description: token.$description || '' });
          entry.values[modeName] = token.$value;
          if (!TYPE_MAP[token.$type]) report.errors.push(`Unsupported $type "${token.$type}" at ${key}`);
        }
      }
    }
  }

  // 2. Collections and modes
  const localCols = await figma.variables.getLocalVariableCollectionsAsync();
  const colObj = {}, modeIds = {};
  for (const col of manifest.collections) {
    let c = localCols.find(x => x.name === col.name);
    const isNew = !c;
    if (!c) c = figma.variables.createVariableCollection(col.name);
    c.hiddenFromPublishing = !!col.hiddenFromPublishing;
    const wanted = Object.keys(col.modes);
    modeIds[col.name] = {};
    wanted.forEach((m, i) => {
      let mode = c.modes.find(x => x.name === m);
      if (!mode && i === 0 && (isNew || c.modes.length === 1) && !wanted.includes(c.modes[0].name)) { c.renameMode(c.modes[0].modeId, m); mode = c.modes.find(x => x.name === m); }
      if (!mode) { const id = c.addMode(m); mode = { modeId: id, name: m }; }
      modeIds[col.name][m] = mode.modeId;
    });
    colObj[col.name] = { c, def: col };
    report.collections[col.name] = { id: c.id, modes: wanted, created: isNew };
  }

  // 3. Variables (create pass)
  const localVars = await figma.variables.getLocalVariablesAsync();
  const varByKey = {};
  for (const e of Object.values(index)) {
    const { c, def } = colObj[e.collection];
    const type = TYPE_MAP[e.type];
    let v = localVars.find(x => x.variableCollectionId === c.id && x.name === e.name);
    if (v && v.resolvedType !== type) { report.warnings.push(`Type changed for ${e.name}: recreated`); v.remove(); v = null; }
    if (!v) { v = figma.variables.createVariable(e.name, c, type); report.variables.created++; } else report.variables.updated++;
    v.description = e.description;
    v.scopes = scopeFor(def.scopes, e.path);
    const cssName = '--' + (def.codeSyntaxPrefix ? [def.codeSyntaxPrefix].concat(e.path) : e.path).join('-');
    v.setVariableCodeSyntax('WEB', `var(${cssName})`);
    varByKey[e.key] = v;
  }

  // 4. Values pass (aliases resolve to variables in any collection)
  for (const e of Object.values(index)) {
    const v = varByKey[e.key]; const firstMode = Object.keys(colObj[e.collection].def.modes)[0];
    for (const [m, modeId] of Object.entries(modeIds[e.collection])) {
      let raw = e.values[m];
      if (raw === undefined) { raw = e.values[firstMode]; report.warnings.push(`${e.name} has no value for mode ${m}; used ${firstMode}`); }
      let val;
      if (isAlias(raw)) {
        const target = varByKey[aliasPath(raw)];
        if (!target) { report.errors.push(`Unresolved alias ${raw} at ${e.key}`); continue; }
        val = { type: 'VARIABLE_ALIAS', id: target.id };
      } else if (e.type === 'color') val = hexToRgba(raw);
      else if (TYPE_MAP[e.type] === 'FLOAT') val = typeof raw === 'number' ? raw : parseFloat(String(raw));
      else val = String(raw);
      v.setValueForMode(modeId, val);
    }
  }

  // 5. Orphans: variables in managed collections that the tokens no longer define
  const managedIds = new Set(Object.values(colObj).map(x => x.c.id));
  const keep = new Set(Object.values(varByKey).map(v => v.id));
  for (const v of await figma.variables.getLocalVariablesAsync()) {
    if (managedIds.has(v.variableCollectionId) && !keep.has(v.id)) {
      report.orphans.push(v.name);
      if (opts.prune) v.remove();
    }
  }

  // 6. Text styles, bound to typography variables
  const ts = manifest.textStyles;
  if (ts) {
    const resolve = ref => { const e = index[aliasPath(ref)]; if (!e) throw new Error('Unresolved ' + ref); let x = e; while (isAlias(Object.values(x.values)[0])) x = index[aliasPath(Object.values(x.values)[0])]; return { entry: e, value: Object.values(x.values)[0] }; };
    const localStyles = await figma.getLocalTextStylesAsync();
    for (const p of ts.files) {
      const leaves = []; walk(files[p], [], leaves);
      for (const { path, token } of leaves) {
        const name = (ts.stripRoot && path[0] === ts.stripRoot ? path.slice(1) : path).join('/');
        try {
          const val = token.$value;
          const fam = resolve(val.fontFamily), wt = resolve(val.fontWeight), size = resolve(val.fontSize), lh = resolve(val.lineHeight);
          const styleName = (ts.fontStyles[fam.value] || {})[String(wt.value)];
          if (!styleName) throw new Error(`No font style mapped for ${fam.value} ${wt.value}`);
          await figma.loadFontAsync({ family: fam.value, style: styleName });
          let s = localStyles.find(x => x.name === name);
          if (!s) { s = figma.createTextStyle(); s.name = name; report.textStyles.created++; } else report.textStyles.updated++;
          s.description = token.$description || '';
          s.fontName = { family: fam.value, style: styleName };
          s.fontSize = parseFloat(size.value);
          s.lineHeight = { unit: 'PIXELS', value: parseFloat(lh.value) };
          s.letterSpacing = { unit: 'PERCENT', value: parseFloat(val.letterSpacing || '0') };
          s.textCase = val.textCase === 'uppercase' ? 'UPPER' : 'ORIGINAL';
          for (const [field, ref] of [['fontFamily', val.fontFamily], ['fontSize', val.fontSize], ['lineHeight', val.lineHeight], ['fontWeight', val.fontWeight]]) {
            try { s.setBoundVariable(field, varByKey[aliasPath(ref)]); } catch (err) { report.warnings.push(`${name}: could not bind ${field} (${err.message})`); }
          }
        } catch (err) { report.errors.push(`Text style ${name}: ${err.message}`); }
      }
    }
  }
  report.tokenCount = Object.keys(index).length;
  return report;
}

return await run(BUNDLE, OPTIONS);
