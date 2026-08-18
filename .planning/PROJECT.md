# Ruben Carrazco — Portfolio Visual Redesign

## What This Is

A personal portfolio site for Ruben Carrazco, an EE student at Stanford (Hardware + Software track), showcasing his projects (VR glove, AC-DC converter, FPGA synthesizer, SIMD accelerator), resume, and background. Static React/Vite/Tailwind site hosted on GitHub Pages. Content and page structure (Home/About/Projects/Resume/Contact) are settled — this milestone is about finding the right visual identity, not rebuilding the app.

## Core Value

The site has to look like a genuinely distinctive, "modern and slick" personal portfolio — not a template — and Ruben has to actually like looking at it. A technically correct rebuild that lands on the wrong aesthetic again fails this milestone.

## Requirements

### Validated

- ✓ Vite + React + TS + Tailwind + shadcn/ui stack — GitHub Pages via `deploy.yml`, `HashRouter`, base path `/ee-portfolio/` — proven, deploy pipeline confirmed working
- ✓ 5-page structure (Home, About, Projects, Project Detail, Resume, Contact) with content sourced from Ruben's resume — approved content, not up for debate this milestone
- ✓ Centralized content model (`src/data/projects.ts`, `src/data/profile.ts`) — keep, extend as needed
- ✓ Deploy pipeline healthy as of 2026-08-18 (fixed `npm@latest`/Node 20 `EBADENGINE` break in `deploy.yml`)

### Active

- [ ] Explore a real spread of distinct visual directions (color palette, typography, layout/spacing, imagery treatment) — including at least one dark option — before committing to one
- [ ] Present directions concretely enough for Ruben to react to (mockups/screenshots per direction, not just descriptions)
- [ ] Land on one direction and implement it fully across all 5 pages, replacing the current "engineering drawing" editorial design end to end
- [ ] Preserve all existing content (resume-derived copy, project data, experience/skills sections) through the visual change

### Out of Scope

- Page/section structure changes (nav, page count, information architecture) — this milestone is visual skin only, per explicit decision
- Framework/stack migration — staying on Vite/React/Tailwind/shadcn, same GitHub Pages deploy pipeline
- Fixing pre-existing repo hygiene issues surfaced during codebase mapping (broken `npm run lint` script, `node_modules` committed to git, unused shadcn components, dual lockfiles, disabled TS strict mode) — real issues, tracked in `.planning/codebase/CONCERNS.md`, but orthogonal to a visual redesign; revisit as a separate milestone if desired

## Context

- This is the second design pass. The first pass (shipped 2026-08-18, PR #1) was a "minimal light editorial" direction executed as an engineering-drawing/datasheet motif — paper/ink/graphite/line palette, Space Grotesk + IBM Plex type system, a title-block hero, domain-coded project tags. It's live at https://rcarrz04.github.io/ee-portfolio/ but Ruben says the direction isn't working, and is genuinely unsure whether the problem was the minimal/light premise itself or specifically the schematic motifs — hence wanting a real spread of options (including dark) rather than one more single guess.
- No urgency — Ruben wants this explored properly rather than rushed to ship.
- Full codebase state captured in `.planning/codebase/` (mapped 2026-08-18): static SPA, no backend/auth/API, ~48 of ~50 shadcn/ui primitives unused, zero test coverage, disabled TS strict mode — none of this blocks a visual redesign but is available as reference.
- Ruben's resume (source of truth for all content) lives at `~/Desktop/Obsidian Vault/Wiki/Personal/Resume/Resume_25_26_Ruben_Carrazco_(EE)_Portfolio.pdf`.

## Constraints

- **Tech stack**: Vite + React + TS + Tailwind + shadcn/ui — no migration, per explicit decision.
- **Hosting**: GitHub Pages, `HashRouter`, base path `/ee-portfolio/` — deploy pipeline (`.github/workflows/deploy.yml`) must keep working.
- **Content**: Existing 5-page structure and resume-derived copy are locked for this milestone — visual/layout/color changes only.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Visual skin only, structure locked | Ruben confirmed content/page structure is fine; only the look isn't landing | — Pending |
| Explore multiple concrete directions (incl. dark) before committing | Ruben is genuinely unsure what's wrong with pass 1 — needs real options to react to, not another single guess | — Pending |
| No urgency / no deadline pressure | Confirmed by Ruben — optimize for getting it right over shipping fast | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-08-18 after initialization*
