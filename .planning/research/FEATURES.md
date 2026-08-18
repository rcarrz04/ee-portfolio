# Feature Research

**Domain:** Personal engineering/developer portfolio website — visual/presentational design (page structure locked: Home, About, Projects, Project Detail, Resume, Contact)
**Researched:** 2026-08-18
**Confidence:** MEDIUM (WebSearch-sourced, cross-referenced across multiple independent design-trend and portfolio-showcase sources; no single canonical spec exists for "standout portfolio" — this is aggregated design-community consensus, not a formal standard)

## Feature Landscape

This is scoped to **visual/presentational patterns only** — no new pages, sections, or content are proposed. Every item below is something that can be expressed through hero treatment, typography, color, imagery, card/grid presentation, and micro-interactions within the existing 6 pages.

### Table Stakes (Users Expect These)

Things that must be true for the site to read as "modern and slick" at all. Missing these makes it look dated or amateurish regardless of aesthetic direction chosen.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear, immediate value statement in hero (who you are, what you do, in <2s of scanning) | Standard across every well-regarded dev/engineer portfolio surveyed; recruiters and visitors bounce if headline is vague ("Full-stack engineer" beats "Hi, I'm Ruben") | LOW | Applies to Home hero only — content already exists, this is about typographic hierarchy/placement, not new copy |
| Consistent type scale + spacing system across all 5 pages | Inconsistent heading sizes/spacing is the #1 tell of an unpolished site; deliberate rhythm reads as "designed" | LOW–MED | Define once (e.g. Tailwind config scale), apply everywhere — mechanical but easy to get wrong ad hoc |
| Real project visuals, not placeholder/generic imagery | A card with a stock icon or blank gradient instead of an actual photo/screenshot of the VR glove, FPGA synth, etc. immediately reads as unfinished | LOW–MED | Requires sourcing/cropping real photos or renders per project; content work, not just CSS |
| Responsive layout that works cleanly on mobile (not just "doesn't break") | Recruiters and visitors frequently open portfolio links on phone; a site that merely reflows without a considered mobile hierarchy reads as an afterthought | MED | Mobile hero, mobile project cards, and mobile nav all need explicit treatment, not just breakpoint shrinking |
| Purposeful use of whitespace / negative space | Cramped layouts read as templated/unfinished; generous, intentional whitespace is what separates "designed" from "default Bootstrap" | LOW | Mostly a spacing-token discipline issue |
| Subtle, consistent hover/focus states on interactive elements (links, buttons, cards) | Baseline expectation post-2020; a site with zero hover feedback feels broken or unfinished, not "clean" | LOW | Simple opacity/underline/lift transitions — no need for anything elaborate to hit table stakes |
| Legible, accessible contrast in whichever palette is chosen (light or dark) | Both light and dark directions fail fast if body text contrast is poor; this is a baseline QA item, not a style choice | LOW | Check both directions explicitly since Ruben wants a dark option in the mix |
| Fast perceived load / no layout shift on images | Static SPA on GitHub Pages — no excuse for slow/jank; portfolios are judged in seconds | LOW | Explicit width/height or aspect-ratio boxes on all project imagery |
| Working, discoverable resume/contact access from every page | Table stakes for the actual job of a portfolio (get hired) — visually this just means it shouldn't be visually buried by a bold aesthetic choice | LOW | Structure is locked/existing; just don't let a nav redesign hide it |
| One coherent visual language across Home → About → Projects → Detail → Resume → Contact | A portfolio that looks like 3 different sites stitched together (different card styles, different type per page) reads as incoherent, not "eclectic" | MED | This is the actual failure mode most likely to sink a redesign — needs a documented system, not per-page improvisation |

### Differentiators (Competitive Advantage)

What separates a memorable portfolio from a merely competent one. These are where the redesign should actually spend effort — pick a handful, don't try to do all of them.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| A genuinely distinctive type pairing (not default Inter/system font, not the current Space Grotesk+IBM Plex combo if it's part of what's not working) | Typography is the single highest-leverage differentiator for a small static site — it's the first thing that registers as "considered" vs "default" | LOW | Cheap to change, high visual impact; worth testing 2–3 pairings per direction mockup |
| Real photography or high-quality renders of the physical hardware (VR glove, PCB for the AC-DC converter, FPGA board) used as hero/showcase imagery instead of icons or abstract graphics | For a hardware+software portfolio specifically, showing the *actual thing* is more credible and more memorable than any illustration style — this is the one lever that's unique to EE/hardware portfolios vs generic web-dev portfolios | MED | Depends on photo quality Ruben has; may need reshoots/better lighting/close-up detail shots of connectors, solder work, board layout |
| Project cards that reveal stack/role/impact on hover or on scroll, rather than static thumbnail + title only | Rewards exploration, communicates more information density without cluttering the base grid | LOW–MED | Works well within existing Projects page grid — no structural change, just interaction layer |
| Case-study depth on Project Detail pages: problem → approach → key technical decision → result/metric, with supporting imagery per step (schematic, code snippet, test bench photo, final result) | This is what separates "portfolio" from "resume with pictures" — technical readers (other engineers, technical recruiters) specifically look for evidence of reasoning, not just outcome | MED | Content-adjacent but presentation-driven: needs a repeatable visual template per detail page (image + caption blocks, pull-quotes for key decisions, before/after or spec comparisons) |
| A signature layout motif unique to Ruben, expressed abstractly rather than literally (e.g. a consistent asymmetric grid rhythm, a distinctive way project metadata is tagged, a specific accent-color-as-signal system) | This is what makes a portfolio "his" rather than "a template" — but it has to be structural/systemic, not decorative (see Anti-Patterns: literal engineering skins) | MED | This is the actual creative core of the redesign; everything else here supports it |
| Purposeful micro-interactions used sparingly: magnetic/lift button states, smooth scroll-reveal on project entry, cursor-aware hover on hero, subtle parallax on hero imagery only | Signals craft and attention to detail without becoming a gimmick; used *sparingly* is the operative constraint — 3–4 well-placed interactions read as polish, 15 read as trying too hard | MED | Framer Motion or CSS-only transitions both viable in the existing React/Tailwind stack; scope to hero + project cards, not everywhere |
| A considered dark mode (or dark-as-primary direction) with genuine palette work, not an inverted light theme | Dark portfolios read as more "engineering/technical" to some audiences, but only work if the palette is deliberate — flat black + one accent is the trap (see Anti-Patterns) | MED | Ruben explicitly wants at least one dark direction explored — needs its own accent/neutral palette, not just `bg-black text-white` |
| Domain-specific but non-literal visual system for tagging project type (hardware vs firmware vs software) | Useful information architecture for a mixed hardware/software body of work — differentiates from a generic "all projects look the same" grid | LOW–MED | Can be color-coding, iconography, or typographic treatment — avoid literal circuit-trace or PCB-silkscreen motifs (reads as costume, see Anti-Patterns) |
| Short looped video/GIF of a project in action (VR glove tracking, synth producing sound/waveform) in place of a static hero image on that project's detail page | Motion is rare in student portfolios and disproportionately memorable for physical/interactive hardware projects — direct evidence the thing actually works | MED–HIGH | Highest production cost of anything listed here; worth doing for 1–2 flagship projects rather than all of them |

### Anti-Features (Commonly Requested, Often Problematic)

Visual patterns that look appealing in isolation (or are what an AI design tool defaults to) but read as generic, templated, or actively work against a memorable/credible engineering portfolio.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|------------------|-------------|
| Cream/off-white background + large italicized serif display type + terracotta/rust accent ("editorial luxury" look) | Reads as tasteful, calm, on-trend — this is currently one of the most common AI-tool default aesthetics (explicitly associated with Claude's own brand and countless AI-generated "editorial" sites) | Instantly recognizable as *the* current AI-generated-site look to anyone who's seen more than a few 2025–2026 portfolios; also mismatched to an EE/hardware identity — reads as lifestyle-brand, not engineer | If warmth/editorial calm is the goal, get there through spacing and type hierarchy, not this specific palette+font combination |
| Near-black (#0e0e0e-ish) background + single neon accent (green/purple/cyan) + glassmorphism cards + gradient orb in background | Reads as "cutting-edge tech/dev tool" — this is the other dominant AI-tool default, nicknamed the "Claude Code / v0 / Cursor aesthetic" in current design commentary | Equally recognizable as templated/AI-generated as the cream option above; glass-blur cards and gradient orbs specifically read as decoration with no connection to Ruben's actual work | If dark is the direction, build a genuine multi-tone dark palette (2–3 neutrals, one considered accent used sparingly) instead of pure black + neon glow |
| Broadsheet/newspaper hairline-rule layout — thin dividing lines everywhere, dense multi-column text blocks, masthead-style headers, monospace "issue/edition" labels | Signals "editorial rigor" and "information density," feels appropriately serious for technical content | This is close to what pass 1 of this exact project already tried (title-block/datasheet motif) and it didn't land — hairline-grid/editorial layouts also read as templated when the grid itself becomes the whole personality rather than supporting the content | Use structure and whitespace discipline without leaning on visible rule-lines as the primary visual signature |
| Literal engineering/blueprint decoration: PCB trace patterns as background texture, circuit-diagram clipart, blueprint grid-paper backgrounds, schematic-symbol iconography used purely decoratively | Feels "on brand" for an EE — obvious, thematic, easy to justify | Reads as costume rather than identity once overused; it's also become its own AI-generated-portfolio cliché for anyone in a technical field (the "engineer skin" equivalent of the cream/dark defaults) — likely contributed to pass 1 not landing | Let the *real* project imagery (actual PCBs, actual code, actual hardware) carry the technical signal; keep any abstract motif restrained and structural (grid rhythm, accent color logic) rather than illustrative |
| Typing-effect / terminal-cursor hero text ("Hello, I'm Ruben_") | Extremely common in developer-portfolio tutorials and starter templates, feels "coder-authentic" | One of the most fatigued clichés in the dev-portfolio space specifically (alongside terminal/matrix-code-rain backgrounds) — immediately reads as "built from a tutorial" | Static, confidently-set headline typography does more work and ages better |
| Generic stock photography (handshakes, laptop-on-desk-with-coffee, abstract circuit macro photos not from Ruben's own projects) | Fills visual gaps quickly when real assets are missing | Instantly reads as filler; especially damaging next to genuinely real hardware photos elsewhere on the same site — the contrast makes the stock images worse than having no image | Use only real project assets; if a section has no real photo available, use a simpler graphic/typographic treatment instead of stock imagery |
| Uniform equal-size 3-across card grid where every project gets identical visual weight regardless of depth/importance | Easy to build, feels "clean and organized" | Flattens hierarchy — a flagship project (VR glove) and a smaller one (AC-DC converter) reading as equally weighted loses the chance to signal what Ruben is proudest of / most skilled at | Vary card size/prominence (bento-style or a featured-project-first layout) within the existing Projects page — no new sections needed, just layout weighting |
| Heavy scroll-jacking, full-page snap transitions, or aggressive parallax on every section | Feels "immersive" and technically impressive to build | Actively hurts usability (recruiters skimming quickly get fought by the scroll), and is disproportionately likely to break/feel janky on GitHub Pages + mobile without a dedicated animation budget | Reserve motion for hero entrance and project-card reveals; keep scrolling native everywhere else |
| Purple gradient blobs / default shadcn "Inter + purple primary" look left unstyled | Fastest path to shipping — it's literally the shadcn/Tailwind default | This is arguably the single most recognizable "I didn't theme my shadcn app" signal in current web design; guarantees a templated read | Fully override the Tailwind/shadcn theme tokens (color, radius, font) rather than shipping defaults — non-negotiable regardless of which direction is chosen |

## Feature Dependencies

```
[Coherent type/spacing system]
    └──requires──> [Chosen visual direction locked in]
                       └──requires──> [Direction mockups reviewed & approved by Ruben]

[Case-study depth on Project Detail pages]
    └──requires──> [Real project imagery sourced/shot per project]

[Signature layout motif]
    └──enhances──> [Project card differentiation]
    └──enhances──> [Hero distinctiveness]

[Dark direction with genuine palette]
    └──conflicts with──> [Reusing the light-direction accent color unchanged]
       (a color that works as accent-on-cream may not work as accent-on-near-black — needs independent tuning)

[Purposeful micro-interactions]
    └──requires──> [Signature layout motif] already defined
       (interactions should reinforce the system, not be bolted on before the system exists)
```

### Dependency Notes

- **Case-study depth requires real project imagery:** the Project Detail page differentiator is meaningless without actual photos/screenshots per project (VR glove build shots, FPGA synth waveform/board photos, SIMD accelerator diagrams, AC-DC converter schematic + bench photo). This is an asset-gathering task that should happen alongside/before final visual polish of that page.
- **Dark direction conflicts with reusing the light accent color unchanged:** if Ruben explores both a light and dark direction as separate mockups (per PROJECT.md's "real spread of distinct visual directions" requirement), each needs its own accent-color tuning pass — a color picked for contrast against cream will likely be wrong against near-black.
- **Micro-interactions depend on the signature motif being defined first:** adding hover/scroll effects before the visual direction is locked risks polishing something that gets thrown away; sequence interaction design after direction selection.

## MVP Definition

Framed against this milestone's actual goal: land on and fully implement one visual direction across all 6 pages, replacing the current editorial/engineering-drawing design.

### Launch With (v1)

- [ ] Full type + spacing + color system defined and applied consistently across Home/About/Projects/Project Detail/Resume/Contact — table stakes coherence, non-negotiable
- [ ] Hero treatment on Home that reads distinctively within 2 seconds (typography + layout, not gimmicks)
- [ ] Project cards using real imagery, varied sizing/prominence to signal flagship vs smaller projects
- [ ] Fully re-themed shadcn/Tailwind tokens (no default Inter/purple/rounded-everything left in place)
- [ ] Baseline hover/focus states on all interactive elements
- [ ] Verified mobile layout for hero and project grid specifically (not just generic reflow)

### Add After Validation (v1.x)

- [ ] Case-study template applied to Project Detail pages (problem → approach → decision → result, with supporting imagery per project) — start with the 1–2 flagship projects, extend to all 4
- [ ] Purposeful micro-interactions (scroll-reveal, card hover reveal of stack/role, magnetic buttons) layered onto the locked-in direction
- [ ] Domain-tagging visual system for hardware vs firmware vs software projects

### Future Consideration (v2+)

- [ ] Looped video/GIF of a flagship project in action (VR glove, synth) — highest production cost, defer until static direction is fully validated and Ruben has bandwidth to shoot/edit
- [ ] Any additional signature motif refinement once real-world feedback (recruiters, peers) comes in

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Coherent type/spacing/color system across all pages | HIGH | MEDIUM | P1 |
| Real project imagery replacing any placeholders | HIGH | MEDIUM | P1 |
| Fully re-themed shadcn tokens (kill defaults) | HIGH | LOW | P1 |
| Distinctive hero typography/layout | HIGH | LOW | P1 |
| Varied-prominence project card grid | MEDIUM | LOW | P1 |
| Dark direction with independently-tuned palette | HIGH (per Ruben's explicit ask) | MEDIUM | P1 |
| Case-study depth on Project Detail pages | HIGH | MEDIUM–HIGH | P2 |
| Sparse, purposeful micro-interactions | MEDIUM | MEDIUM | P2 |
| Domain-tagging visual system | MEDIUM | LOW–MEDIUM | P2 |
| Looped project video/GIF | MEDIUM | HIGH | P3 |

**Priority key:**
- P1: Needed for the core visual-direction decision and its full implementation
- P2: Strengthens the redesign once the direction is locked and stable
- P3: Nice to have, defer to a later pass

## Sources

- [Colorlib — 21 Best Developer Portfolio Websites (2026)](https://colorlib.com/wp/developer-portfolios/)
- [Sitebuilderreport — Engineer Portfolios: 20+ Well-Designed Examples (2026)](https://www.sitebuilderreport.com/inspiration/engineer-portfolios)
- [Sitebuilderreport — Software Engineer Portfolios](https://www.sitebuilderreport.com/inspiration/software-engineer-portfolios)
- [Really Good Designs — 24 Brilliant Developer Portfolio Examples](https://reallygooddesigns.com/developer-portfolio-examples/)
- [Really Good Designs — 18 Interactive Portfolio Examples](https://reallygooddesigns.com/interactive-portfolio-examples/)
- [Kyle Chayka — The generic style of AI web design](https://kylechayka.substack.com/p/the-generic-style-of-ai-web-design)
- [925 Studios — AI Slop Web Design: Complete Guide (2026)](https://www.925studios.co/blog/ai-slop-web-design-guide)
- [rnauval.dev — How to Improve Web Design Without Generic AI Results](https://rnauval.dev/en/blog/improve-web-design-without-ai-slop)
- [Medium — Your Website Looks Like AI Made It (2026)](https://medium.com/@sahilkargutkar.sk/your-website-looks-like-ai-made-it-and-thats-becoming-a-problem-e679668ca7f4)
- [DEV Community — Dark Mode Design That Doesn't Look AI](https://dev.to/raxxostudios/dark-mode-design-that-doesnt-look-ai-2cn3)
- [RAXXO Studios — Dark Mode Design That Doesn't Look AI](https://raxxo.shop/blogs/lab/dark-mode-design-that-doesnt-look-ai)
- [SaaSFrame — Designing Bento Grids That Actually Work (2026)](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide)
- [Webflow Blog — 15 Best Microinteraction Examples](https://webflow.com/blog/microinteractions)
- [Bricxlabs — 12 Micro Animation Examples (2026)](https://bricxlabs.com/blogs/micro-interactions-2025-examples)
- [Brittany Chiang portfolio (v4) — "most-forked developer portfolio," reference point for the genre's dominant template](https://brittanychiang.com/)
- [americanprofessionguide.com — How to Build Your Robotics Engineering Portfolio](https://americanprofessionguide.com/how-to-build-your-robotics-engineering-portfolio/)
- [.planning/PROJECT.md — project context, pass-1 failure notes, locked page structure, dark-option requirement]

**Note on confidence:** This research is aggregated from WebSearch-sourced design-community commentary (blog posts, showcase roundups, dev-community articles) rather than a formal specification or Context7-verifiable documentation — appropriate for a visual-design/trend question, which has no authoritative "docs." Cross-referenced across 3+ independent sources per major claim (especially the AI-cliché palette identifications). Confidence is MEDIUM rather than HIGH because design trend commentary is inherently more subjective and time-sensitive than technical/API claims; treat the anti-pattern identifications (cream+serif+terracotta, near-black+neon+glassmorphism) as directionally solid — they're independently corroborated across multiple 2025–2026 sources — but the specific hex codes/details are illustrative, not prescriptive.

---
*Feature research for: personal engineering-portfolio visual redesign (page structure locked)*
*Researched: 2026-08-18*
