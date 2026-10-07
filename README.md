# Liquidity Foundation (v3) — tokens first

The token files in `tokens/` are the **only source of truth**. Figma and code are
both generated from them. Never edit variables or text styles by hand in the
Figma library: change the JSON, rebuild, and sync.

```
tokens/*.json  ──build──►  dist/figma-sync.js / plugin/  ──►  Figma library (Foundation V3)
                     └───►  dist/tokens.css               ──►  codebase
```

Figma library: https://www.figma.com/design/vyucAqkYjDg9kenwkEVusO

## What's inside

| Path | Contents |
|---|---|
| `tokens/manifest.json` | Collections, modes, Figma scopes, code-syntax prefixes, font-style map |
| `tokens/color/primitives.json` | Brand ramps (green, gold, error, warning, purple, neutral) + derived sand, sage, brand singles |
| `tokens/color/semantic.earth.json` | 99 semantic colours (`bg`, `button`, `text`, `border`, `icon`, `chart`) — mode **Earth** |
| `tokens/dimension/spacing.json`, `radius.json` | LQC UI Kit spacing and radius scales |
| `tokens/typography/primitives.json` | Families, weights (400/500 only), size and line-height scales |
| `tokens/typography/text-styles.json` | 15 composite text styles |
| `scripts/figma-sync.engine.js` | Plugin API sync engine (idempotent upsert by name) |
| `scripts/build.mjs` | Validates tokens, then writes `dist/figma-sync.js`, `plugin/code.js`, `dist/tokens.css` |
| `plugin/` | "Liquidity Token Sync" private Figma plugin |

Format: [W3C Design Tokens (DTCG)](https://tr.designtokens.org/format/) — `$type`, `$value`,
`$description`, aliases as `{color.sand.100}`.

## Workflow

1. Edit a JSON file in `tokens/` (open a PR — tokens are reviewed like code).
2. `npm run build` — fails on unresolved aliases, bad hex values or duplicate names.
3. Sync to Figma, either way:
   - **Plugin:** Figma › Plugins › Development › Import plugin from manifest › `plugin/manifest.json`,
     open Foundation V3, run *Liquidity Token Sync*.
   - **Claude + Figma MCP:** run `dist/figma-sync.js` through `use_figma` on the library file.
4. Review the result, then **Publish** the library.
5. Ship `dist/tokens.css` to the codebase.

### Sync rules

- Variables and text styles are matched **by name**, so renaming a token creates a new variable.
  The old one is reported as an orphan, and existing bindings keep pointing at it.
- Orphans are only reported by default. `npm run build:prune` produces a script that deletes them.
  Run it only after the consuming files have been migrated.
- A changed `$type` recreates the variable (bindings to it break). The sync reports this as a warning.
- Every variable gets explicit scopes (from the manifest) and WEB code syntax `var(--…)`,
  identical to the names in `dist/tokens.css`.
- Primitives are hidden from publishing, so consumers only ever pick semantic tokens.

## Adding a theme (e.g. Dark)

1. Copy `tokens/color/semantic.earth.json` to `semantic.dark.json` and change the aliases.
2. In `manifest.json`, add it to the Color collection: `"modes": { "Earth": [...], "Dark": ["tokens/color/semantic.dark.json"] }`.
3. Build and sync — the Dark mode is added to the existing collection; Earth is untouched.

Every theme file must define the same token names. A missing token falls back to the first mode and is reported.

## Rules that live with the tokens

- **One ink:** `text/default` (Current Green) for headings, values and primary icons.
- Text tokens pass 4.5:1 on every light surface down to `bg/surface-sunken`; `text/placeholder` is inputs-only.
- `*-inverse*` tokens are for dark-green surfaces only.
- Yellow (`bg/brand`, `*/inverse-brand`) appears on green, or as a fill with green text — never as text or a thin line on sand.
- One `button/primary` per view.
- `neutral` primitives are for charts only; UI greys come from `sand`.
- Weights are Regular (400) and Medium (500). No semibold or bold.
