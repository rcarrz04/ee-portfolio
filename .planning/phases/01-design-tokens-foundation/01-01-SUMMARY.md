---
phase: 01-design-tokens-foundation
plan: 01
subsystem: ui
tags: [css-custom-properties, tailwind, dark-mode, wcag, contrast, design-tokens]

# Dependency graph
requires: []
provides:
  - "--font-display/--font-body/--font-mono CSS variables in :root, bound into tailwind.config.js fontFamily via var() indirection"
  - "An independently-authored .dark palette (19 values) with genuine card elevation, replacing the stock shadcn/Lovable scaffold"
  - "scripts/check-contrast.cjs — a dependency-free, source-parsing WCAG AA + non-inversion gate reusable by every future direction"
affects: [02-direction-exploration, 03-direction-implementation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Font-family roles resolve through CSS custom properties (var(--font-*)) rather than literal arrays in tailwind.config.js, so a single :root edit re-points every usage"
    - "Dark mode values are authored per-token against the target palette, never derived by inverting light-mode lightness"
    - "Automated contrast/structural gate parses the live src/index.css at runtime (no hardcoded duplicate values) so it cannot silently drift from source"

key-files:
  created: [scripts/check-contrast.cjs]
  modified: [src/index.css, tailwind.config.js]

key-decisions:
  - "Dark palette values used verbatim from UI-SPEC's target table — all ten WCAG AA pairs and four structural rules passed on the first run, no lightness tuning needed"
  - "Known light-mode accent-foreground/accent contrast gap (4.12:1, below 4.5:1 AA) is recorded as an explicit KNOWN exception with a 4.10:1 regression floor and handed to Phase 3 / IMPL-03, per UI-SPEC's explicit inherit-not-reauthor guidance — not fixed in this phase"

patterns-established:
  - "Contrast/structural gate pattern: scripts/check-contrast.cjs is committed and reusable — Phase 2 must run it against every new direction's :root/.dark block before presenting it"

requirements-completed: [TOKEN-02, TOKEN-03]

# Metrics
duration: ~10min
completed: 2026-08-21
---

# Phase 1 Plan 1: Design Tokens Foundation Summary

**Font roles now resolve through CSS variables (`var(--font-*)`), and `.dark` is a real independently-authored 19-value palette (charcoal-navy background, +4L card elevation, hue-19° accent) verified by a new dependency-free WCAG AA + non-inversion gate (`scripts/check-contrast.cjs`).**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-08-21T00:19:12Z (session start per STATE.md)
- **Completed:** 2026-08-21T00:26:06Z
- **Tasks:** 3 completed
- **Files modified:** 3 (2 modified, 1 created)

## Accomplishments
- Bound `display`/`body`/`mono` font-family roles to `var(--font-display)`, `var(--font-body)`, `var(--font-mono)` custom properties in `:root`, replacing literal font-stack arrays in `tailwind.config.js` — rendered output is byte-identical, but a future direction change is now a one-line `:root` edit.
- Wrote `scripts/check-contrast.cjs`, a zero-dependency Node script that parses `src/index.css` at runtime and asserts 9 WCAG AA 4.5:1 pairs + 1 large-text 3:1 pair for dark, 4 dark-mode non-inversion structural rules, and a light-mode regression-only baseline. Verified RED (exactly 4 `FAIL` lines, exit 1) against the stock scaffold before any dark values were touched.
- Replaced the stock shadcn/Lovable `.dark` block with the UI-SPEC's 19 authored values. Gate went GREEN on the first run — `ALL CHECKS PASS`, matching every planning-verified ratio exactly.

## Task Commits

Each task was committed atomically:

1. **Task 1: Bind font roles to CSS variables (TOKEN-03)** - `968729b9` (feat)
2. **Task 2: Create the contrast + non-inversion gate (RED before Task 3)** - `64aaa19c` (test)
3. **Task 3: Author the dark value set (TOKEN-02) — turn the gate GREEN** - `90562e37` (feat)

**Plan metadata:** _pending final commit below_

_Note: Task 2 is a `test` commit (RED gate) per plan design — the gate is expected to fail against the stock palette before Task 3 authors the fix, mirroring a TDD RED/GREEN structure even though the plan is not frontmatter-typed `tdd`._

## Files Created/Modified
- `src/index.css` - Added `--font-display`/`--font-body`/`--font-mono` to `:root`; replaced all 19 `.dark` color values with the UI-SPEC-authored dark palette. `:root` colors, `--radius`, and all 8 `--sidebar-*` declarations (both blocks) untouched.
- `tailwind.config.js` - `fontFamily.display`/`.body`/`.mono` now `["var(--font-display)"]` etc. instead of literal stacks. `sfpro` key byte-identical.
- `scripts/check-contrast.cjs` - New dependency-free gate: HSL→sRGB→WCAG contrast math, parses `:root`/`.dark` blocks from the live CSS file, prints `PASS`/`FAIL`/`KNOWN` lines, exits non-zero on any assertion failure.

## Decisions Made
- Used the UI-SPEC target dark values verbatim (no lightness tuning) — all assertions passed on the first run, confirming the planning-time contrast verification was accurate.
- Followed the plan's explicit instruction to record, not fix, the light-mode `accent-foreground`/`accent` gap (4.12:1) — this is a pre-existing `:root` value Phase 1 inherits per UI-SPEC, out of TOKEN-01..04 scope, handed to Phase 3 / IMPL-03.

## Deviations from Plan

None — plan executed exactly as written. All three tasks' automated verify commands and acceptance criteria passed without modification; the dark palette required no lightness adjustment.

## Full Gate Output (final, post-Task-3)

```
PASS [dark] foreground on background: 16.39:1 (>= 4.5:1)
PASS [dark] foreground on card: 14.81:1 (>= 4.5:1)
PASS [dark] muted-foreground on background: 6.56:1 (>= 4.5:1)
PASS [dark] muted-foreground on card: 5.93:1 (>= 4.5:1)
PASS [dark] card-foreground on card: 14.81:1 (>= 4.5:1)
PASS [dark] popover-foreground on popover: 14.81:1 (>= 4.5:1)
PASS [dark] secondary-foreground on secondary: 12.66:1 (>= 4.5:1)
PASS [dark] primary-foreground on primary: 16.39:1 (>= 4.5:1)
PASS [dark] accent-foreground on accent: 6.2:1 (>= 4.5:1)
PASS [dark] accent on background: 6.2:1 (>= 3:1)
PASS [dark structural] background is not near-black: L=9%
PASS [dark structural] foreground is not pure white: L=95%
PASS [dark structural] card elevated above background: delta 4 pts
PASS [dark structural] border lighter than background: border L=22%, background L=9%
PASS [light] foreground on background: 16.49:1 (>= 4.5:1)
PASS [light] muted-foreground on background: 5.81:1 (>= 4.5:1)
PASS [light] accent on background: 4.12:1 (>= 3:1)
PASS [light] primary-foreground on primary: 16.49:1 (>= 4.5:1)
KNOWN [light] accent-foreground on accent: 4.12:1 — pre-existing :root value inherited per
  UI-SPEC (not a TOKEN-01..04 decision), out of scope for this phase; handed to Phase 3 /
  IMPL-03 for remediation.

ALL CHECKS PASS
```

## Known Light-Mode Finding — Phase 3 / IMPL-03 Handoff

`accent-foreground` on `accent` in the **light** (`:root`) block measures **4.12:1**, below the
4.5:1 AA threshold for small text. This is a pre-existing value Phase 1 inherits rather than
re-authors, per UI-SPEC section 3 ("These are pre-existing values Phase 1 inherits, not new
decisions") — no TOKEN-01..04 requirement covers light-mode palette changes. It was **not**
fixed in this plan. `scripts/check-contrast.cjs` asserts a **4.10:1 regression floor** on this
pair (not 4.5:1) so future changes can be caught if they make it worse, without blocking on the
pre-existing gap. This is explicitly handed to **Phase 3 / IMPL-03** ("text/background contrast
that stays readable") for remediation.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 2 can author each new direction's values (light and dark) with confidence that
  `scripts/check-contrast.cjs` will catch both WCAG AA regressions and inversion-style dark
  palettes — run it against any new `:root`/`.dark` block before presenting the direction.
- Font roles are fully variable-bound; Phase 2 directions can swap typefaces with a `:root` edit,
  no component or config changes required.
- The known light-mode `accent-foreground`/`accent` gap (4.12:1) is tracked and must be picked up
  by Phase 3 / IMPL-03 — not blocking for Phase 2's direction exploration.
- No blockers.

---
*Phase: 01-design-tokens-foundation*
*Completed: 2026-08-21*

## Self-Check: PASSED
- FOUND: scripts/check-contrast.cjs
- FOUND: .planning/phases/01-design-tokens-foundation/01-01-SUMMARY.md
- FOUND commit: 968729b9 (Task 1)
- FOUND commit: 64aaa19c (Task 2)
- FOUND commit: 90562e37 (Task 3)
- FOUND commit: 5e2dbd73 (SUMMARY commit)
