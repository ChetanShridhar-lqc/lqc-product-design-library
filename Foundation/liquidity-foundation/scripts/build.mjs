// Build step: validate tokens, then emit
//   dist/figma-sync.js  -> paste into the Figma MCP (use_figma) or any Plugin API runner
//   plugin/code.js      -> the private "Liquidity Token Sync" plugin
//   dist/tokens.css     -> CSS custom properties for the codebase
import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const manifest = read('tokens/manifest.json');
const files = {};
const allPaths = manifest.collections.flatMap(c => Object.values(c.modes).flat()).concat(manifest.textStyles?.files || []);
for (const p of allPaths) files[p] = read(p);

// ---- validation
const leaves = []; const walk = (n, p, f) => { if (n && typeof n === 'object' && '$value' in n) return leaves.push({ p, t: n, f }); for (const k of Object.keys(n || {})) if (!k.startsWith('$')) walk(n[k], p.concat(k), f); };
for (const [f, j] of Object.entries(files)) walk(j, [], f);
const byKey = new Map(); const errors = [];
const colOf0 = f => manifest.collections.find(c => Object.values(c.modes).flat().includes(f))?.name || 'text-styles';
for (const l of leaves) { const k = l.p.join('.'); if (byKey.has(k) && l.t.$type !== 'typography' && colOf0(byKey.get(k).f) === colOf0(l.f) && byKey.get(k).f === l.f) errors.push(`Duplicate token ${k} in ${l.f}`); if (!byKey.has(k)) byKey.set(k, l); }
const refs = v => typeof v === 'string' ? [...v.matchAll(/\{([^}]+)\}/g)].map(m => m[1]) : (v && typeof v === 'object' ? Object.values(v).flatMap(refs) : []);
for (const l of leaves) for (const r of refs(l.t.$value)) if (!byKey.has(r)) errors.push(`${l.f}: ${l.p.join('.')} -> unresolved {${r}}`);
for (const l of leaves) if (l.t.$type === 'color' && !refs(l.t.$value).length && !/^#([0-9a-f]{6}|[0-9a-f]{8})$/i.test(l.t.$value)) errors.push(`${l.p.join('.')}: bad hex ${l.t.$value}`);
if (errors.length) { console.error('Token validation failed:\n' + errors.join('\n')); process.exit(1); }

// ---- Figma sync script + plugin
const engine = fs.readFileSync(path.join(root, 'scripts/figma-sync.engine.js'), 'utf8');
const prune = process.argv.includes('--prune');
const bundled = engine.replace('/*__BUNDLE__*/ null', JSON.stringify({ manifest, files })).replace('/*__OPTIONS__*/ { prune: false }', JSON.stringify({ prune }));
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/figma-sync.js'), bundled);
const pluginBody = bundled.replace(/\nreturn await run\(BUNDLE, OPTIONS\);\s*$/, '');
fs.writeFileSync(path.join(root, 'plugin/code.js'), pluginBody + `
(async () => {
  try {
    const r = await run(BUNDLE, OPTIONS);
    const msg = \`Synced \${r.tokenCount} tokens · \${r.variables.created} new · \${r.textStyles.created + r.textStyles.updated} text styles · \${r.orphans.length} orphans · \${r.errors.length} errors\`;
    console.log(r); figma.closePlugin(msg);
  } catch (e) { figma.closePlugin('Sync failed: ' + e.message); }
})();
`);

// ---- CSS
const valueOf = (t) => t.$value;
const cssVal = (l) => { const v = valueOf(l.t); if (typeof v === 'string' && /^\{[^}]+\}$/.test(v)) { const k = v.slice(1, -1); return `var(${cssName(k.split('.'))})`; } if (l.t.$type === 'fontFamily') return `'${v}', system-ui, sans-serif`; return String(v); };
const colOf = f => manifest.collections.find(c => Object.values(c.modes).flat().includes(f));
const cssName = p => { const l = byKey.get(p.join('.')); const c = l && colOf(l.f); return '--' + ((c?.codeSyntaxPrefix ? [c.codeSyntaxPrefix] : []).concat(p)).join('-'); };
let css = `/* ${manifest.name} ${manifest.version} — generated from tokens/. Do not edit. */\n:root {\n`;
for (const l of leaves) if (l.t.$type !== 'typography') css += `  ${cssName(l.p)}: ${cssVal(l)};\n`;
css += '}\n';
for (const l of leaves) if (l.t.$type === 'typography') {
  const v = l.t.$value, ref = r => `var(${cssName(r.slice(1, -1).split('.'))})`;
  const cls = '.' + l.p.join('-');
  css += `${cls} { font-family: ${ref(v.fontFamily)}; font-weight: ${ref(v.fontWeight)}; font-size: ${ref(v.fontSize)}; line-height: ${ref(v.lineHeight)}; letter-spacing: ${parseFloat(v.letterSpacing) / 100}em;${v.textCase === 'uppercase' ? ' text-transform: uppercase;' : ''} }\n`;
}
fs.writeFileSync(path.join(root, 'dist/tokens.css'), css);
console.log(`OK · ${leaves.length} tokens validated · dist/figma-sync.js, plugin/code.js, dist/tokens.css written${prune ? ' (prune on)' : ''}`);
