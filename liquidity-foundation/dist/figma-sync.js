// Liquidity Foundation — token → Figma sync engine.
// Runs inside the Figma Plugin API. Tokens are the source of truth:
// this script creates or updates variables, modes and text styles to match
// the bundled token files. It never edits the token files.
// The build step (scripts/build.mjs) injects the bundle below.
const BUNDLE = {"manifest":{"name":"Liquidity Foundation","version":"3.0.0","prune":false,"collections":[{"name":"Primitives","hiddenFromPublishing":true,"stripRoot":"color","modes":{"Value":["tokens/color/primitives.json"]},"scopes":{"*":[]}},{"name":"Color","modes":{"Earth":["tokens/color/semantic.earth.json"]},"codeSyntaxPrefix":"color","scopes":{"bg":["FRAME_FILL","SHAPE_FILL"],"button":["FRAME_FILL","SHAPE_FILL"],"text":["TEXT_FILL"],"border":["STROKE_COLOR"],"icon":["SHAPE_FILL","STROKE_COLOR"],"chart":["FRAME_FILL","SHAPE_FILL","STROKE_COLOR"]}},{"name":"Spacing","modes":{"Value":["tokens/dimension/spacing.json"]},"scopes":{"space":["GAP","WIDTH_HEIGHT"]}},{"name":"Radius","modes":{"Value":["tokens/dimension/radius.json"]},"scopes":{"radius":["CORNER_RADIUS"]}},{"name":"Typography","hiddenFromPublishing":false,"stripRoot":"font","modes":{"Value":["tokens/typography/primitives.json"]},"scopes":{"font.family":["FONT_FAMILY"],"font.weight":["FONT_WEIGHT"],"font.size":["FONT_SIZE"],"font.line-height":["LINE_HEIGHT"]}}],"textStyles":{"files":["tokens/typography/text-styles.json"],"stripRoot":"text-style","fontStyles":{"IBM Plex Sans":{"400":"Regular","500":"Medium"},"IBM Plex Mono":{"400":"Regular","500":"Medium"},"PP Valve":{"400":"Plain Regular","500":"Plain Regular"}}}},"files":{"tokens/color/primitives.json":{"color":{"green":{"50":{"$type":"color","$value":"#F2FCF1"},"100":{"$type":"color","$value":"#DFFADE"},"200":{"$type":"color","$value":"#C1F3BF"},"300":{"$type":"color","$value":"#8FE88D"},"400":{"$type":"color","$value":"#56D454"},"500":{"$type":"color","$value":"#2FBA2D"},"600":{"$type":"color","$value":"#219A1F"},"700":{"$type":"color","$value":"#1D791C"},"800":{"$type":"color","$value":"#1B601B"},"900":{"$type":"color","$value":"#184F19"},"950":{"$type":"color","$value":"#072708","$description":"Brand: Current Green"}},"gold":{"50":{"$type":"color","$value":"#FEFCE8"},"100":{"$type":"color","$value":"#FFF9C2"},"200":{"$type":"color","$value":"#FFEF89"},"300":{"$type":"color","$value":"#FFDE43","$description":"Brand: Surge Yellow"},"400":{"$type":"color","$value":"#FDCA12"},"500":{"$type":"color","$value":"#ECB006","$description":"Brand: Stability Gold"},"600":{"$type":"color","$value":"#CC8802"},"700":{"$type":"color","$value":"#A35F05","$description":"Brand: Growth Amber"},"800":{"$type":"color","$value":"#864B0D"},"900":{"$type":"color","$value":"#723D11"},"950":{"$type":"color","$value":"#431F05","$description":"Brand: Prospect Brown"}},"error":{"50":{"$type":"color","$value":"#FEF3F2"},"100":{"$type":"color","$value":"#FEE5E2"},"200":{"$type":"color","$value":"#FECFCA"},"300":{"$type":"color","$value":"#FCAEA5"},"400":{"$type":"color","$value":"#F87E71"},"500":{"$type":"color","$value":"#EF5544"},"600":{"$type":"color","$value":"#D73523"},"700":{"$type":"color","$value":"#B92C1C"},"800":{"$type":"color","$value":"#99281B"},"900":{"$type":"color","$value":"#7F271D"},"950":{"$type":"color","$value":"#45100A"}},"warning":{"50":{"$type":"color","$value":"#FFF8EC"},"100":{"$type":"color","$value":"#FFF0D3"},"200":{"$type":"color","$value":"#FFDDA5"},"300":{"$type":"color","$value":"#FFC46D"},"400":{"$type":"color","$value":"#FF9F32"},"500":{"$type":"color","$value":"#FF820A"},"600":{"$type":"color","$value":"#FF6900"},"700":{"$type":"color","$value":"#CC4B02"},"800":{"$type":"color","$value":"#A13A0B"},"900":{"$type":"color","$value":"#82320C"},"950":{"$type":"color","$value":"#461704"}},"purple":{"50":{"$type":"color","$value":"#F4F2FF"},"100":{"$type":"color","$value":"#EAE8FF"},"200":{"$type":"color","$value":"#D8D4FF"},"300":{"$type":"color","$value":"#BCB1FF"},"400":{"$type":"color","$value":"#9B85FF"},"500":{"$type":"color","$value":"#744AFF"},"600":{"$type":"color","$value":"#6A30F7"},"700":{"$type":"color","$value":"#5D1EE3"},"800":{"$type":"color","$value":"#4D18BF"},"900":{"$type":"color","$value":"#40169C"},"950":{"$type":"color","$value":"#260B6A"}},"neutral":{"50":{"$type":"color","$value":"#F7F7F8"},"100":{"$type":"color","$value":"#EEEEF0"},"200":{"$type":"color","$value":"#DADADD"},"300":{"$type":"color","$value":"#B9B9C0"},"400":{"$type":"color","$value":"#93939D"},"500":{"$type":"color","$value":"#71717B"},"600":{"$type":"color","$value":"#606069"},"700":{"$type":"color","$value":"#4F4E56"},"800":{"$type":"color","$value":"#434349"},"900":{"$type":"color","$value":"#3B3B3F"},"950":{"$type":"color","$value":"#27272A"},"$description":"Charts and data visualisation only"},"sand":{"50":{"$type":"color","$value":"#FDFBF8"},"100":{"$type":"color","$value":"#F9F5F1"},"200":{"$type":"color","$value":"#F5EEE8"},"300":{"$type":"color","$value":"#EDE6E0","$description":"Brand: Legacy Grey"},"400":{"$type":"color","$value":"#DBD3CC"},"500":{"$type":"color","$value":"#BFB6AE"},"600":{"$type":"color","$value":"#9C9289"},"700":{"$type":"color","$value":"#7A7169"},"800":{"$type":"color","$value":"#59514A"},"900":{"$type":"color","$value":"#38322B"},"$description":"Derived: OKLCH hue 63 (Legacy Grey), low chroma"},"sage":{"50":{"$type":"color","$value":"#F5F7EF"},"100":{"$type":"color","$value":"#EEF2E5"},"200":{"$type":"color","$value":"#E3E9D8"},"300":{"$type":"color","$value":"#CFD8C3"},"400":{"$type":"color","$value":"#9CA691"},"500":{"$type":"color","$value":"#6E7964"},"$description":"Derived: Current Green mixed into Sand"},"brand":{"forward-white":{"$type":"color","$value":"#FDF5F0","$description":"Brand: Forward White (Pantone 9285 C)"},"surge-soft":{"$type":"color","$value":"#FDF3CB","$description":"Derived: Surge Yellow 30% over Sand 50"}}}},"tokens/color/semantic.earth.json":{"bg":{"canvas":{"$type":"color","$value":"{color.sand.100}","$description":"Page canvas"},"surface":{"$type":"color","$value":"{color.sand.50}","$description":"Cards, inputs, panels, grid cells"},"surface-subtle":{"$type":"color","$value":"{color.sand.200}","$description":"KPI bands, table headers"},"surface-sunken":{"$type":"color","$value":"{color.sand.300}","$description":"Sunken areas, row hover"},"surface-selected":{"$type":"color","$value":"{color.sand.400}","$description":"Selected rows"},"surface-brand":{"$type":"color","$value":"{color.brand.forward-white}","$description":"Brand moments: AI panel, empty states"},"neutral":{"$type":"color","$value":"{color.sand.500}"},"neutral-bold":{"$type":"color","$value":"{color.sand.700}","$description":"Tracks and avatars, not for text"},"disabled":{"$type":"color","$value":"{color.sand.300}"},"inverse":{"$type":"color","$value":"{color.green.950}","$description":"Left panel, dark bars"},"inverse-subtle":{"$type":"color","$value":"{color.green.900}","$description":"Active nav item, panel sections"},"accent":{"$type":"color","$value":"{color.green.800}"},"accent-hover":{"$type":"color","$value":"{color.green.900}"},"accent-pressed":{"$type":"color","$value":"{color.green.950}"},"accent-subtle":{"$type":"color","$value":"{color.sage.100}"},"accent-subtle-hover":{"$type":"color","$value":"{color.sage.200}"},"brand":{"$type":"color","$value":"{color.gold.300}","$description":"Surge Yellow. On green, or as a fill with green text"},"highlight":{"$type":"color","$value":"{color.brand.surge-soft}","$description":"Priority pills, flagged rows"},"brand-brown":{"$type":"color","$value":"{color.gold.950}"},"brand-amber":{"$type":"color","$value":"{color.gold.700}"},"success-bold":{"$type":"color","$value":"{color.green.700}"},"success-subtle":{"$type":"color","$value":"{color.sage.100}"},"error-bold":{"$type":"color","$value":"{color.error.700}"},"error-subtle":{"$type":"color","$value":"{color.error.50}"},"warning-bold":{"$type":"color","$value":"{color.warning.800}"},"warning-subtle":{"$type":"color","$value":"{color.warning.50}"},"info-bold":{"$type":"color","$value":"{color.purple.600}"},"info-subtle":{"$type":"color","$value":"{color.purple.50}"}},"button":{"primary":{"$type":"color","$value":"{color.green.950}","$description":"One per view"},"primary-hover":{"$type":"color","$value":"{color.green.900}"},"primary-pressed":{"$type":"color","$value":"{color.green.800}"},"accent":{"$type":"color","$value":"{color.gold.300}"},"accent-hover":{"$type":"color","$value":"{color.gold.400}"},"accent-pressed":{"$type":"color","$value":"{color.gold.500}"},"ghost-hover":{"$type":"color","$value":"{color.sand.200}"},"ghost-pressed":{"$type":"color","$value":"{color.sand.300}"}},"text":{"default":{"$type":"color","$value":"{color.green.950}","$description":"Headings, values, body"},"secondary":{"$type":"color","$value":"{color.sand.900}"},"subtle":{"$type":"color","$value":"{color.sand.800}","$description":"Labels, metadata"},"placeholder":{"$type":"color","$value":"{color.sand.700}","$description":"Inside inputs only"},"disabled":{"$type":"color","$value":"{color.sand.600}"},"accent":{"$type":"color","$value":"{color.green.800}","$description":"Links"},"accent-hover":{"$type":"color","$value":"{color.green.900}"},"accent-pressed":{"$type":"color","$value":"{color.green.950}"},"success":{"$type":"color","$value":"{color.green.800}"},"error":{"$type":"color","$value":"{color.error.700}"},"warning":{"$type":"color","$value":"{color.warning.800}"},"info":{"$type":"color","$value":"{color.purple.600}"},"inverse":{"$type":"color","$value":"{color.brand.forward-white}","$description":"On dark green only"},"inverse-subtle":{"$type":"color","$value":"{color.sand.300}","$description":"On dark green only"},"inverse-muted":{"$type":"color","$value":"{color.sage.400}","$description":"On dark green only"},"inverse-brand":{"$type":"color","$value":"{color.gold.300}","$description":"On dark green only"},"inverse-success":{"$type":"color","$value":"{color.green.400}","$description":"On dark green only"},"inverse-error":{"$type":"color","$value":"{color.error.400}","$description":"On dark green only"},"inverse-warning":{"$type":"color","$value":"{color.warning.400}","$description":"On dark green only"}},"border":{"default":{"$type":"color","$value":"{color.sand.300}","$description":"Hairlines, card edges"},"strong":{"$type":"color","$value":"{color.sand.400}"},"input":{"$type":"color","$value":"{color.sand.600}","$description":"Inputs at rest"},"bold":{"$type":"color","$value":"{color.sand.700}","$description":"Where 3:1 is required"},"accent":{"$type":"color","$value":"{color.green.800}","$description":"Focus and selected"},"inverse":{"$type":"color","$value":"{color.green.900}"},"inverse-strong":{"$type":"color","$value":"{color.green.700}"},"brand":{"$type":"color","$value":"{color.gold.300}","$description":"On dark green only"},"success":{"$type":"color","$value":"{color.green.600}"},"success-subtle":{"$type":"color","$value":"{color.sage.300}"},"error":{"$type":"color","$value":"{color.error.600}"},"error-subtle":{"$type":"color","$value":"{color.error.200}"},"warning":{"$type":"color","$value":"{color.warning.700}"},"warning-subtle":{"$type":"color","$value":"{color.warning.200}"},"info":{"$type":"color","$value":"{color.purple.500}"},"info-subtle":{"$type":"color","$value":"{color.purple.200}"}},"icon":{"default":{"$type":"color","$value":"{color.green.950}"},"subtle":{"$type":"color","$value":"{color.sand.700}"},"accent":{"$type":"color","$value":"{color.green.800}"},"disabled":{"$type":"color","$value":"{color.sand.500}"},"success":{"$type":"color","$value":"{color.green.700}"},"error":{"$type":"color","$value":"{color.error.700}"},"warning":{"$type":"color","$value":"{color.warning.700}"},"info":{"$type":"color","$value":"{color.purple.600}"},"inverse":{"$type":"color","$value":"{color.brand.forward-white}"},"inverse-subtle":{"$type":"color","$value":"{color.sage.400}"},"inverse-brand":{"$type":"color","$value":"{color.gold.300}"}},"chart":{"green":{"strong":{"$type":"color","$value":"{color.green.700}"},"medium":{"$type":"color","$value":"{color.green.500}"},"subtle":{"$type":"color","$value":"{color.green.300}"}},"purple":{"strong":{"$type":"color","$value":"{color.purple.600}"},"medium":{"$type":"color","$value":"{color.purple.400}"},"subtle":{"$type":"color","$value":"{color.purple.300}"}},"gold":{"strong":{"$type":"color","$value":"{color.gold.700}"},"medium":{"$type":"color","$value":"{color.gold.500}"},"subtle":{"$type":"color","$value":"{color.gold.300}"}},"error":{"strong":{"$type":"color","$value":"{color.error.600}"},"medium":{"$type":"color","$value":"{color.error.400}"},"subtle":{"$type":"color","$value":"{color.error.200}"}},"warning":{"strong":{"$type":"color","$value":"{color.warning.600}"},"medium":{"$type":"color","$value":"{color.warning.400}"},"subtle":{"$type":"color","$value":"{color.warning.300}"}},"axis":{"$type":"color","$value":"{color.neutral.500}"},"grid":{"$type":"color","$value":"{color.neutral.200}"}}},"tokens/dimension/spacing.json":{"space":{"0":{"$type":"dimension","$value":"0px"},"4":{"$type":"dimension","$value":"4px"},"6":{"$type":"dimension","$value":"6px"},"8":{"$type":"dimension","$value":"8px"},"12":{"$type":"dimension","$value":"12px"},"16":{"$type":"dimension","$value":"16px"},"20":{"$type":"dimension","$value":"20px"},"24":{"$type":"dimension","$value":"24px"},"32":{"$type":"dimension","$value":"32px"},"36":{"$type":"dimension","$value":"36px"},"40":{"$type":"dimension","$value":"40px"},"56":{"$type":"dimension","$value":"56px"},"64":{"$type":"dimension","$value":"64px"},"72":{"$type":"dimension","$value":"72px"},"96":{"$type":"dimension","$value":"96px"},"128":{"$type":"dimension","$value":"128px"},"160":{"$type":"dimension","$value":"160px"}}},"tokens/dimension/radius.json":{"radius":{"none":{"$type":"dimension","$value":"0px"},"2xs":{"$type":"dimension","$value":"3px","$description":"Checkboxes, tiny chips"},"xs":{"$type":"dimension","$value":"6px","$description":"Badges, tooltips"},"sm":{"$type":"dimension","$value":"8px","$description":"Inputs, buttons"},"md":{"$type":"dimension","$value":"12px","$description":"Cards, menus"},"lg":{"$type":"dimension","$value":"16px","$description":"Modals, large panels"},"xl":{"$type":"dimension","$value":"20px"},"2xl":{"$type":"dimension","$value":"24px"},"full":{"$type":"dimension","$value":"9999px","$description":"Pills, avatars"}}},"tokens/typography/primitives.json":{"font":{"family":{"brand":{"$type":"fontFamily","$value":"PP Valve","$description":"Display and wordmark only"},"sans":{"$type":"fontFamily","$value":"IBM Plex Sans"},"mono":{"$type":"fontFamily","$value":"IBM Plex Mono"}},"weight":{"regular":{"$type":"fontWeight","$value":400},"medium":{"$type":"fontWeight","$value":500}},"size":{"100":{"$type":"dimension","$value":"8px"},"150":{"$type":"dimension","$value":"9px"},"200":{"$type":"dimension","$value":"10px"},"250":{"$type":"dimension","$value":"11px"},"300":{"$type":"dimension","$value":"12px"},"350":{"$type":"dimension","$value":"14px"},"400":{"$type":"dimension","$value":"16px"},"450":{"$type":"dimension","$value":"18px"},"500":{"$type":"dimension","$value":"20px"},"550":{"$type":"dimension","$value":"22px"},"600":{"$type":"dimension","$value":"24px"},"650":{"$type":"dimension","$value":"28px"},"700":{"$type":"dimension","$value":"32px"},"750":{"$type":"dimension","$value":"36px"},"800":{"$type":"dimension","$value":"40px"},"850":{"$type":"dimension","$value":"48px"},"900":{"$type":"dimension","$value":"60px"},"950":{"$type":"dimension","$value":"72px"}},"line-height":{"100":{"$type":"dimension","$value":"10px"},"150":{"$type":"dimension","$value":"11px"},"200":{"$type":"dimension","$value":"12px"},"250":{"$type":"dimension","$value":"14px"},"300":{"$type":"dimension","$value":"16px"},"350":{"$type":"dimension","$value":"18px"},"400":{"$type":"dimension","$value":"20px"},"450":{"$type":"dimension","$value":"22px"},"500":{"$type":"dimension","$value":"24px"},"550":{"$type":"dimension","$value":"26px"},"600":{"$type":"dimension","$value":"28px"},"650":{"$type":"dimension","$value":"32px"},"700":{"$type":"dimension","$value":"36px"},"750":{"$type":"dimension","$value":"40px"},"800":{"$type":"dimension","$value":"48px"},"850":{"$type":"dimension","$value":"56px"},"900":{"$type":"dimension","$value":"72px"},"950":{"$type":"dimension","$value":"84px"}}}},"tokens/typography/text-styles.json":{"text-style":{"display":{"lg":{"$type":"typography","$value":{"fontFamily":"{font.family.brand}","fontWeight":"{font.weight.regular}","fontSize":"{font.size.850}","lineHeight":"{font.line-height.800}","letterSpacing":"2%","textCase":"uppercase"},"$description":"Hero headlines, Valve in capitals"},"md":{"$type":"typography","$value":{"fontFamily":"{font.family.brand}","fontWeight":"{font.weight.regular}","fontSize":"{font.size.700}","lineHeight":"{font.line-height.650}","letterSpacing":"2%","textCase":"uppercase"}}},"heading":{"xl":{"$type":"typography","$value":{"fontFamily":"{font.family.sans}","fontWeight":"{font.weight.medium}","fontSize":"{font.size.650}","lineHeight":"{font.line-height.700}","letterSpacing":"-1%","textCase":"none"},"$description":"Page titles"},"lg":{"$type":"typography","$value":{"fontFamily":"{font.family.sans}","fontWeight":"{font.weight.medium}","fontSize":"{font.size.600}","lineHeight":"{font.line-height.650}","letterSpacing":"-1%","textCase":"none"}},"md":{"$type":"typography","$value":{"fontFamily":"{font.family.sans}","fontWeight":"{font.weight.medium}","fontSize":"{font.size.500}","lineHeight":"{font.line-height.600}","letterSpacing":"0%","textCase":"none"}},"sm":{"$type":"typography","$value":{"fontFamily":"{font.family.sans}","fontWeight":"{font.weight.medium}","fontSize":"{font.size.400}","lineHeight":"{font.line-height.500}","letterSpacing":"0%","textCase":"none"},"$description":"Card and section headings"}},"body":{"lg":{"$type":"typography","$value":{"fontFamily":"{font.family.sans}","fontWeight":"{font.weight.regular}","fontSize":"{font.size.400}","lineHeight":"{font.line-height.500}","letterSpacing":"0%","textCase":"none"}},"md":{"$type":"typography","$value":{"fontFamily":"{font.family.sans}","fontWeight":"{font.weight.regular}","fontSize":"{font.size.350}","lineHeight":"{font.line-height.400}","letterSpacing":"0%","textCase":"none"},"$description":"Default body text"},"sm":{"$type":"typography","$value":{"fontFamily":"{font.family.sans}","fontWeight":"{font.weight.regular}","fontSize":"{font.size.300}","lineHeight":"{font.line-height.300}","letterSpacing":"0%","textCase":"none"}}},"label":{"lg":{"$type":"typography","$value":{"fontFamily":"{font.family.sans}","fontWeight":"{font.weight.medium}","fontSize":"{font.size.350}","lineHeight":"{font.line-height.400}","letterSpacing":"0%","textCase":"none"},"$description":"Buttons, tabs, form labels"},"md":{"$type":"typography","$value":{"fontFamily":"{font.family.sans}","fontWeight":"{font.weight.medium}","fontSize":"{font.size.300}","lineHeight":"{font.line-height.300}","letterSpacing":"0%","textCase":"none"}}},"overline":{"$type":"typography","$value":{"fontFamily":"{font.family.sans}","fontWeight":"{font.weight.medium}","fontSize":"{font.size.300}","lineHeight":"{font.line-height.300}","letterSpacing":"6%","textCase":"uppercase"},"$description":"Eyebrows and section labels"},"numeric":{"lg":{"$type":"typography","$value":{"fontFamily":"{font.family.sans}","fontWeight":"{font.weight.medium}","fontSize":"{font.size.600}","lineHeight":"{font.line-height.650}","letterSpacing":"-1%","textCase":"none"},"$description":"KPI values"},"md":{"$type":"typography","$value":{"fontFamily":"{font.family.sans}","fontWeight":"{font.weight.medium}","fontSize":"{font.size.400}","lineHeight":"{font.line-height.500}","letterSpacing":"0%","textCase":"none"}}},"code":{"sm":{"$type":"typography","$value":{"fontFamily":"{font.family.mono}","fontWeight":"{font.weight.regular}","fontSize":"{font.size.300}","lineHeight":"{font.line-height.300}","letterSpacing":"0%","textCase":"none"},"$description":"IDs, figures in data-dense tables"}}}}}};
const OPTIONS = {"prune":false};

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
