---
quick_id: 261005-wdn
status: complete
commit: 2a61ad76
---

# Summary

- Added `section?: "research"` to the Project model plus `engineeringProjects`, `researchProjects`, `projectPath()` helpers; tagged the jamming-gripper entry as research.
- New `/research` page (research cards + Publications moved from About) and `/research/:id` detail routes reusing ProjectDetail; "Research" nav link; detail back link follows the section.
- Projects grid and Home (featured four, "All N projects") now use engineering projects only (7); About no longer lists Publications (experience entry stays).
- Verified: build passes, tsc clean outside ui/, screenshots of Research, Projects, and research detail pages.
- Run inline without planner/executor agents.
