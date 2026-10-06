---
quick_id: 261005-wdn
description: Separate research from EE projects (own nav section, page, and routes)
mode: inline (no subagents)
---

# Quick Task 261005-wdn

## Tasks
1. `src/data/projects.ts`: add optional `section?: "research"`, export `engineeringProjects`, `researchProjects`, `projectPath()`; tag the jamming-gripper entry `section: "research"`.
2. Use them: `ProjectCard` (link via `projectPath`), `Projects` page and `Home` (engineering only, count excludes research), `ProjectDetail` (back link to the right section).
3. New `src/pages/Research.tsx` (research cards + Publications moved out of About); routes `/research` and `/research/:id` in `App.tsx`; "Research" link in `Navbar`; remove Publications from `About.tsx`.

## Verify
- `npm run build` passes; `tsc` clean outside `src/components/ui/`.
- Screenshots: Projects grid has no research card; Research page shows the gripper card and the publication; research detail back link goes to Research; Home count is 7.
