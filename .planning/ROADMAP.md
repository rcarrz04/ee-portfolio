# Roadmap: Ruben Carrazco — Portfolio Visual Redesign (Pass 2)

## Overview

The current site's "engineering drawing" editorial pass didn't land, and Ruben is unsure whether the light/minimal premise or the schematic motifs were at fault. This milestone fixes that by first making the styling architecture sound (colors/type routed through shadcn's semantic tokens, not a parallel hardcoded palette), then generating three structurally distinct, independently-authored directions (light/no-motif, dark/no-motif, restrained-motif) that Ruben can compare live via a dev-only switcher, and finally implementing the chosen direction across all six routes with the scaffolding removed. Phases are ordered as prerequisite layers: the token foundation must exist before directions can be cheaply compared, and a direction must be chosen before full implementation begins.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Design Tokens Foundation** - Route all color/type through shadcn semantic tokens and add a dev-only direction switcher, so directions become cheap value swaps instead of full rewrites
- [ ] **Phase 2: Direction Exploration** - Author 3 structurally distinct directions and let Ruben compare them live across multiple pages to pick one
- [ ] **Phase 3: Full Implementation** - Apply the chosen direction across all 6 routes, remove losing-direction scaffolding, and ship

## Phase Details

### Phase 1: Design Tokens Foundation
**Goal**: Every page's color and type usage routes through the shadcn semantic token layer (not a parallel hardcoded palette), dark mode is real and independently authored, and a dev-only mechanism exists to switch between candidate directions on the running site.
**Depends on**: Nothing (first phase)
**Requirements**: TOKEN-01, TOKEN-02, TOKEN-03, TOKEN-04
**Success Criteria** (what must be TRUE):
  1. Grepping the codebase finds zero pass-1 hardcoded palette classes (`paper`/`ink`/`graphite`/`line`/`signal`); every page renders using only semantic Tailwind classes (`bg-background`, `text-foreground`, `border-border`, etc.)
  2. The `.dark` block in `index.css` contains its own independently-chosen HSL values (not a mechanical lightness-inversion of `:root`), and toggling dark mode on any page visibly produces a coherent, intentional dark palette
  3. Components consistently reference `font-display`/`font-body`/`font-mono` role classes bound to CSS variables — no direct font-family literals in JSX — so changing a role's assigned font-family updates every usage of that role at once
  4. A dev-only direction switcher (e.g. `data-direction` attribute toggled via a hidden route or keyboard shortcut) changes color/font values live on the running dev server, and is verifiably absent from the `npm run build` production output
**Plans**: 3 plans in 2 waves

Plans:
- [x] 01-01-PLAN.md — Bind font roles to CSS variables + author the dark value set, gated by a contrast script (TOKEN-02, TOKEN-03) [wave 1]
- [x] 01-02-PLAN.md — Dev-only direction switcher: DIRECTIONS registry, floating panel, DEV-gated mount proven absent from production (TOKEN-04) [wave 1]
- [ ] 01-03-PLAN.md — Sweep all 107 pass-1 palette classes to semantic tokens across 9 files and delete the five hardcoded color keys (TOKEN-01) [wave 2, depends on 01-01 + 01-02]

**UI hint**: yes

### Phase 2: Direction Exploration
**Goal**: Ruben can compare three concrete, structurally distinct visual directions live on the running site and pick one (or request iteration) before any full-page implementation work begins.
**Depends on**: Phase 1
**Requirements**: DIR-01, DIR-02, DIR-03
**Success Criteria** (what must be TRUE):
  1. Three directions exist as independent value-sets — light/no-motif, dark/no-motif, one restrained-motif — each authored with its own palette/type/motif choices, not a CSS-variable-only reskin of one identical layout
  2. Every direction is viewable via the dev-server switcher on at least Home and one content-dense page (About or Projects), with real layout/composition differences visible, not just a hero-only mockup
  3. Ruben has reviewed all 3 directions live via the switcher and recorded a decision — a chosen direction, or specific iteration requested — before Phase 3 starts
**Plans**: TBD
**UI hint**: yes

### Phase 3: Full Implementation
**Goal**: The chosen direction is the site's only styling system, fully applied across all 6 routes, with all comparison scaffolding removed and the site production-ready.
**Depends on**: Phase 2
**Requirements**: IMPL-01, IMPL-02, IMPL-03, IMPL-04
**Success Criteria** (what must be TRUE):
  1. All 6 routes (Home, About, Projects, Project Detail, Resume, Contact) render the chosen direction consistently, with existing resume-derived content and project data fully preserved
  2. Losing directions' value blocks, the dev-only switcher, and any remaining pass-1 hardcoded palette values are deleted — only the winning direction's tokens remain in the codebase
  3. Every page has consistent hover/focus states, a verified mobile layout hierarchy, and text/background contrast that stays readable
  4. `npm run build` and `tsc --noEmit` both pass with zero errors, and the deployed GitHub Pages site has been spot-checked after merge
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design Tokens Foundation | 2/3 | In Progress|  |
| 2. Direction Exploration | 0/TBD | Not started | - |
| 3. Full Implementation | 0/TBD | Not started | - |
</content>
