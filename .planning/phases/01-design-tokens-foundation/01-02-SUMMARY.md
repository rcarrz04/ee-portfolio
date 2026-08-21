---
phase: 01-design-tokens-foundation
plan: 02
subsystem: ui
tags: [react, vite, dead-code-elimination, dev-tooling]

requires:
  - phase: 01-design-tokens-foundation (plan 01)
    provides: semantic token system (bg-card, border-border, text-muted-foreground) that the switcher panel uses instead of the legacy paper/ink/graphite/line/signal palette
provides:
  - "src/lib/directions.ts: DirectionId type, Direction interface, DIRECTIONS registry (single 'baseline' entry), DIRECTION_STORAGE_KEY constant"
  - "src/components/DirectionSwitcher.tsx: dev-only floating panel that reads/writes data-direction on <html>, sessionStorage-backed, allowlist-validated"
  - "src/App.tsx: import.meta.env.DEV-gated mount point, verified dead-code-eliminated in production via A/B build pair"
affects: [phase-2 (direction comparison / candidate authoring)]

tech-stack:
  added: []
  patterns:
    - "DOM-attribute switching mirrors ThemeProvider's pattern (data-direction vs .dark/.light class) but uses sessionStorage under a distinct key to avoid colliding with ThemeProvider's localStorage vite-ui-theme key"
    - "Dev-only code gated by inline literal import.meta.env.DEV (not hoisted to a variable) so Vite's static replacement + Rollup tree-shaking removes it entirely from production bundles"
    - "Registry pattern: DIRECTIONS array is the single extension point — Phase 2 appends entries here with no other file needing changes"

key-files:
  created:
    - src/lib/directions.ts
    - src/components/DirectionSwitcher.tsx
  modified:
    - src/App.tsx

key-decisions:
  - "Used sessionStorage (not localStorage) for the direction choice to avoid key collision with ThemeProvider's localStorage-based vite-ui-theme"
  - "No React.lazy contingency needed — the inline import.meta.env.DEV gate alone was sufficient to eliminate the switcher from the production bundle on the first attempt"

patterns-established:
  - "A/B build proof for dead-code elimination claims: a positive-control build (NODE_ENV=development + --mode development, which does NOT force NODE_ENV=production the way a bare vite build --mode development would) must contain the sentinel string, and the real production build must not, before a negative grep is trusted"

requirements-completed: [TOKEN-04]

duration: ~10min
completed: 2026-08-21
---

# Phase 1 Plan 2: Dev-Only Direction Switcher Summary

**Dev-only `data-direction` switcher panel with a `DIRECTIONS` registry, mounted behind an inline `import.meta.env.DEV` gate and proven dead-code-eliminated from the production bundle via a positive/negative build pair.**

## Performance

- **Duration:** ~10 min
- **Completed:** 2026-08-21T00:30:45Z
- **Tasks:** 2
- **Files modified:** 3 (2 created, 1 modified)

## Accomplishments
- `src/lib/directions.ts` registry ships exactly one entry (`{ id: "baseline", label: "Baseline" }`), side-effect-free so Rollup can tree-shake it, and is the single place Phase 2 needs to touch to add a direction.
- `src/components/DirectionSwitcher.tsx` renders a `fixed bottom-4 right-4` panel using only semantic token classes (`bg-card`, `border-border`, `text-muted-foreground`) and the existing `Button` component, reads/validates a `sessionStorage` value against the `DIRECTIONS` allowlist before ever applying it to the DOM, and persists new selections back to `sessionStorage` under a key namespaced separately from `ThemeProvider`'s `localStorage` key.
- `src/App.tsx` mounts the switcher as `{import.meta.env.DEV && <DirectionSwitcher />}` immediately after `<Toaster />`, using the literal inline expression (not hoisted, not `process.env`) so Vite's static replacement makes the branch and its import dead code in production.
- Measured, not assumed, that the elimination actually works: a positive-control build found the `ee-portfolio-direction` sentinel string, and the real `npm run build` output did not.

## Task Commits

Each task was committed atomically:

1. **Task 1: Create the directions registry and the switcher panel** - `59e3ab5e` (feat)
2. **Task 2: Mount behind the DEV gate and prove production absence with a control build** - `642bd56f` (feat)

**Plan metadata:** (this commit, docs: complete plan)

## Files Created/Modified
- `src/lib/directions.ts` - `DirectionId` type, `Direction` interface, `DIRECTIONS` registry (one entry: baseline), `DIRECTION_STORAGE_KEY = "ee-portfolio-direction"`
- `src/components/DirectionSwitcher.tsx` - Dev-only floating panel; validates stored direction id against the registry before applying it to `document.documentElement`
- `src/App.tsx` - Added `DirectionSwitcher` import and `import.meta.env.DEV`-gated mount as a sibling to `<Toaster />`; `bg-paper` wrapper left untouched for plan `01-03`

## A/B Build Proof (measured)

| Build | Command | `ee-portfolio-direction` found in `assets/*.js`? |
|---|---|---|
| Positive control | `NODE_ENV=development npx vite build --mode development --outDir dist-devcheck` | **Yes** (`dist-devcheck/assets/index-c6bb923b.js`) |
| Production | `npm run build` | **No** (grep exit 1, no matches) |

This confirms the negative grep on the production build is meaningful — the control build proves the check is capable of detecting the string when the code path is reachable, so the production build's absence of the string reflects real dead-code elimination, not a typo'd key that was never emitted anywhere. `dist-devcheck/` was deleted immediately after the control grep and left no untracked artifact (`dist/` and `dist-devcheck/` are both covered by `.gitignore`).

**React.lazy contingency:** not needed. The inline `import.meta.env.DEV` gate alone eliminated the switcher from production on the first measured attempt.

## Decisions Made
- `sessionStorage` (not `localStorage`) for the direction choice, to avoid colliding with `ThemeProvider`'s `localStorage` key `vite-ui-theme`.
- No `[data-direction="baseline"]` CSS block was added — `:root` already is the baseline, per plan scope boundary; `src/index.css` was not touched (owned by `01-01`, which ran in parallel).

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Note for Phase 2

Adding a new direction requires two changes, not one file as Phase 1's baseline-only state might suggest:
1. Append an entry to `DIRECTIONS` in `src/lib/directions.ts` (e.g. `{ id: "dark-signal", label: "Dark Signal" }`) — this alone makes the new button appear in the switcher panel, with no changes needed to `DirectionSwitcher.tsx` or `App.tsx`.
2. Add a matching `[data-direction="<id>"]` block in `src/index.css` with a full, self-contained set of CSS variable overrides (do not rely on partial inheritance from `:root` — UI-SPEC section 4 flags this as a "recommended, avoids partial-inheritance bugs" decision Phase 2 owns).

No `[data-direction="baseline"]` block exists or is needed, since `:root` already is the baseline values.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- TOKEN-04 plumbing is in place and provably absent from production; Phase 2 can start authoring candidate directions immediately by extending `DIRECTIONS` and `src/index.css`.
- No blockers.

---
*Phase: 01-design-tokens-foundation*
*Completed: 2026-08-21*

## Self-Check: PASSED

- FOUND: src/lib/directions.ts
- FOUND: src/components/DirectionSwitcher.tsx
- FOUND: 59e3ab5e (Task 1 commit)
- FOUND: 642bd56f (Task 2 commit)
