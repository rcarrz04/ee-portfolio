# Requirements: Ruben Carrazco — Portfolio Visual Redesign (Pass 2)

**Defined:** 2026-08-18
**Core Value:** The site has to look like a genuinely distinctive, "modern and slick" personal portfolio — not a template — and Ruben has to actually like looking at it.

## v1 Requirements

Requirements for this milestone. Each maps to roadmap phases.

### Design Tokens (foundation)

- [ ] **TOKEN-01**: All color values route through the existing shadcn semantic CSS variables (`background`, `foreground`, `card`, `primary`, `accent`, `border`, etc.) — no direction-specific hardcoded hex utility classes (fixes pass 1's `paper`/`ink`/`graphite`/`line`/`signal` bypass)
- [x] **TOKEN-02**: The dark direction is authored with its own independently-chosen values (not derived by inverting the light direction's lightness)
- [x] **TOKEN-03**: Type system keeps a consistent display/body/mono role structure in components — only the font-family values assigned to those roles change per direction
- [x] **TOKEN-04**: A dev-only mechanism exists to switch between candidate directions on the running site, without shipping that switcher to production

### Direction Exploration

- [ ] **DIR-01**: 3 structurally distinct directions are generated, varying palette/mode and motif-intensity as independent axes (light/no-motif, dark/no-motif, one restrained-motif option) — not 3 color reskins of the same layout
- [ ] **DIR-02**: Each direction is shown across multiple page types (at minimum Home + one content-dense page such as About or Projects), not a hero-only mockup
- [ ] **DIR-03**: Ruben reviews all 3 directions live via the dev-server switcher and picks one (or requests iteration) before full implementation begins

### Full Implementation

- [ ] **IMPL-01**: The chosen direction is implemented across all 6 routes (Home, About, Projects, Project Detail, Resume, Contact)
- [ ] **IMPL-02**: Pass-1's hardcoded palette values and all direction-switcher scaffolding are removed after selection — only the winning direction's tokens remain in production
- [ ] **IMPL-03**: Table-stakes polish is present across all pages: consistent hover/focus states, verified mobile layout hierarchy, text/background contrast that stays readable
- [ ] **IMPL-04**: `npm run build` and `tsc --noEmit` pass; the deployed GitHub Pages site is spot-checked after merge

## v2 Requirements

Deferred to a future pass. Tracked but not in this roadmap — per explicit decision to get the visual direction right before layering differentiators.

### Differentiators

- **DIFF-01**: Case-study depth (problem → approach → decision → result) on Project Detail pages
- **DIFF-02**: Sparse micro-interactions layered on top of the locked visual system
- **DIFF-03**: Richer project imagery/video assets where available

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Page/section structure changes (nav, page count, information architecture) | Ruben confirmed this milestone is visual skin only — content and structure are locked |
| Framework/stack migration | Vite + React + TS + Tailwind + shadcn/ui and the GitHub Pages deploy pipeline are locked constraints |
| Repo hygiene fixes (broken `npm run lint`, `node_modules` committed to git, ~48 unused shadcn components, dual lockfiles, disabled TS strict mode) | Real issues, tracked in `.planning/codebase/CONCERNS.md`, but orthogonal to a visual redesign — separate milestone if desired |
| Custom cursors, WebGL/shader backgrounds | Research (`STACK.md`) flags real accessibility/complexity cost; only worth it if a chosen direction's identity specifically depends on it — none of the 3 directions currently do |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| TOKEN-01 | Phase 1 | Pending |
| TOKEN-02 | Phase 1 | Complete |
| TOKEN-03 | Phase 1 | Complete |
| TOKEN-04 | Phase 1 | Complete |
| DIR-01 | Phase 2 | Pending |
| DIR-02 | Phase 2 | Pending |
| DIR-03 | Phase 2 | Pending |
| IMPL-01 | Phase 3 | Pending |
| IMPL-02 | Phase 3 | Pending |
| IMPL-03 | Phase 3 | Pending |
| IMPL-04 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 11 total
- Mapped to phases: 11
- Unmapped: 0 ✓

---
*Requirements defined: 2026-08-18*
*Last updated: 2026-08-18 after roadmap creation (traceability confirmed against ROADMAP.md)*
