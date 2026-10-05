# Project Research Summary

**Project:** ee-portfolio — Visual Redesign (Pass 2)
**Domain:** Personal engineering portfolio, visual/design-system redesign within a locked React 18 + Vite + TS + Tailwind + shadcn/ui stack (content and page structure locked; visual skin only)
**Researched:** 2026-08-18
**Confidence:** MEDIUM-HIGH

## Executive Summary

This is not a stack or feature-discovery problem — it's a design-diagnosis problem. Pass 1 shipped a "minimal light editorial" direction executed as a pervasive engineering-drawing/datasheet motif (title block, "§" section markers, revision stamps, grid-paper texture, tracked uppercase mono labels applied almost everywhere), and it didn't land. Critically, architecture research found the mechanical root cause of why pass 1 could never even answer "was it the light premise or the motif?": pass 1's actual palette was a flat hardcoded hex layer (`paper`/`ink`/`graphite`/`line`/`signal`) bolted onto `tailwind.config.js` *parallel to* — not through — the shadcn semantic token system that was already correctly wired for light/dark. Dark mode was never actually possible; the `.dark` scaffold in `index.css` and `theme-provider.tsx` has sat unexercised since day one. This means the first real engineering task of pass 2 is not creative — it's plumbing: delete the parallel hex palette, route every color/type usage through the existing semantic Tailwind classes (`bg-background`, `text-foreground`, `font-display`, etc.), and only then does exploring a dark direction (or any direction) become cheap and mechanically sound.

The recommended approach is to treat "palette/mode" and "motif intensity" as two independent axes and generate a direction set that isolates them — e.g., a light direction with no overt motif, a dark direction with no overt motif, and at most one direction that reintroduces a technical motif in a *restrained* dose (one hero moment, not wallpapered across every section). This directly targets Ruben's stated uncertainty (was it the premise or the execution?) and pitfalls research is unusually pointed on this: theme-as-wallpaper, novelty decay across a 5-page skim, and metaphor-breakdown-under-domain-expert-scrutiny are all named failure modes that specifically describe what pass 1 did. Feature research adds a second, complementary risk: two of the most AI-tool-default aesthetics circulating right now (cream/serif/terracotta "editorial luxury" and near-black/neon/glassmorphism "dev-tool dark") are exactly the kind of generic-looking output an AI-assisted rebuild could easily reproduce, and both are explicitly flagged as things to avoid regardless of which direction wins.

The main risk to manage across the whole milestone is evaluating directions too early/too shallowly — from the homepage hero only, or from CSS-variable-swapped reskins of one identical shadcn layout — which produces a lukewarm, hard-to-diagnose reaction instead of a real decision. Mitigation is structural: directions must differ in real layout/composition/imagery treatment (not just palette/font), must be shown across multiple page types (not just Home), and the motif's presence/absence and intensity must be a variable Ruben can react to explicitly. Once a direction is chosen, implementation is comparatively low-risk and well-understood (token-layer swap, not a rewrite) because the semantic-token architecture already exists in the repo — it just needs to be the *only* color/type vocabulary used.

## Key Findings

### Recommended Stack

The stack is locked (Vite + React + TS + Tailwind + shadcn/ui); this research is scoped to which additional tooling choices actually change how the site feels vs. which add complexity a solo dev doesn't need. The single highest-leverage, lowest-complexity lever available is typography: self-hosting a genuinely distinctive variable-font pairing via Fontsource (`@fontsource-variable/<name>`) beats any animation or texture choice for making the site feel considered rather than templated, and it's a pure win for Core Web Vitals on a static GitHub Pages site (no Google Fonts CDN request, no FOUC/CLS). Everything else on the motion/texture side should be treated as optional, direction-specific add-ons rather than defaults — the project already has `framer-motion@12` installed and it covers ~90% of what's needed (scroll reveals, stagger, simple parallax); GSAP, Lenis, WebGL/R3F backgrounds, and custom cursors are all explicitly scoped to "only if a specific chosen direction's identity genuinely requires it," not blanket additions.

**Core technologies:**
- Tailwind CSS 3.4.1 (existing) — design-token source of truth; don't add a second styling system, extend config instead
- Framer Motion `framer-motion@12` (existing) — default motion tool for scroll reveals/stagger/parallax; `motion`/`motion/react` is the renamed successor package, worth using for any *new* animation code but no forced migration
- `@fontsource-variable/<font>` (new) — self-hosted variable-font pairing; highest-leverage, lowest-risk distinctiveness lever for this milestone
- CSS/SVG grain (hand-rolled `feTurbulence`, no dependency) — optional subtle texture if a direction wants tactile warmth; never a JS/WebGL grain library
- Explicitly avoid by default: GSAP+ScrollTrigger, Lenis, WebGL/R3F backgrounds, custom cursor replacement, and kinetic-typewriter text (the last is already installed as `react-type-animation` but reads as a fatigued cliché — treat as a removal candidate unless a specific direction's hero concept depends on it)

### Expected Features

This is scoped to visual/presentational patterns only — no new pages or content. Feature research is unusually actionable here because it identifies specific, named anti-patterns that map directly onto both pass 1's failure and current AI-generated-site clichés, which is the exact trap a fast pass-2 rebuild could fall back into.

**Must have (table stakes):**
- One coherent visual language (type scale, spacing, color) applied identically across all 6 pages — the #1 tell of an unpolished redesign is inconsistency page-to-page
- Real project photography/renders (VR glove, PCB, FPGA board) instead of icons or stock imagery — the one differentiator lever unique to a hardware/software portfolio vs. a generic dev portfolio
- Fully re-themed shadcn/Tailwind tokens — zero default Inter/purple/rounded-everything left in place
- Legible contrast, deliberate whitespace, working hover/focus states, verified mobile hero + project-grid treatment

**Should have (competitive):**
- A genuinely distinctive type pairing used deliberately for hierarchy (not just swapping `font-family`)
- Varied-prominence project cards (flagship vs. smaller projects should not read as equal weight)
- A considered dark direction with its own independently-tuned accent/neutral palette (not an inverted light theme)
- Case-study depth on Project Detail pages (problem → approach → decision → result) — deferred to v1.x, start with 1-2 flagship projects
- Sparse, purposeful micro-interactions (3-4 well-placed, not 15) layered on *after* the direction is locked

**Defer (v2+):**
- Looped video/GIF of a flagship project in action — highest production cost, defer until the static direction is fully validated
- Domain-tagging visual system (hardware/firmware/software) — nice IA layer, not core to the direction decision

**Explicitly avoid (anti-features):** cream+serif+terracotta "editorial luxury" and near-black+neon+glassmorphism "dev-tool dark" (both are current AI-generated-site clichés); literal engineering/blueprint decoration (PCB traces, schematic clipart, blueprint grid backgrounds — this is close to what pass 1 already did); typewriter/terminal-cursor hero text; generic stock photography; uniform equal-weight project grid; heavy scroll-jacking/aggressive parallax; unstyled shadcn defaults.

### Architecture Approach

The design system should be built as three stacked token layers that change at different rates: Layer 1 (structural rhythm — spacing scale, container widths, section padding) stays **constant across every direction candidate**; Layer 2 (semantic token names — `background`, `foreground`, `card`, `primary`, `accent`, etc., already the correct shadcn shape) also stays constant; only Layer 3 (the actual palette/font *values* assigned to those names) changes per direction. This is what makes exploring 3-4 directions cheap — swapping a values block, not rewriting JSX — and it's also what directly answers Ruben's diagnostic question, since holding layout/spacing constant isolates whether a failed direction is about palette, type, or structure.

**Major components:**
1. `src/index.css` `@layer base` — semantic CSS custom properties (`:root` for default/light, `.dark` for dark mode, new `[data-direction="x"]` blocks per exploration candidate) — this scaffold already exists and is correctly wired, just currently bypassed
2. `tailwind.config.js` `theme.extend.colors`/`fontFamily` — maps semantic names to `hsl(var(--x))`/`var(--font-x)`; this indirection must be the *only* color/type vocabulary components ever reference (delete the parallel hardcoded hex palette: `paper`/`ink`/`graphite`/`line`/`signal`)
3. Page/component JSX — references only semantic Tailwind classes (`bg-background`, `text-foreground`, `font-display`), never direction-specific literal names — this is what keeps "apply the winning direction to all 5 pages" a token-swap, not a rewrite
4. A temporary dev-only direction switcher (`data-direction` attribute on `<html>`, hand-toggled or a tiny unlisted route) — scaffolding for the comparison phase only; explicitly not a shipped feature, since only one direction ships per PROJECT.md

### Critical Pitfalls

1. **Theme-as-wallpaper** — a motif applied everywhere (every section marker, label, border) instead of budgeted as an accent (1-2 hero moments per page). Avoid by capping any motif's recurring signifiers to ≤2-3 instances per page during direction generation.
2. **Conflating premise-wrong vs. execution-wrong** — Ruben's exact stated uncertainty. If pass 2 changes palette *and* motif together in one new direction, a second failure won't reveal which was at fault. Avoid by structuring the direction set so palette/mode and motif-intensity vary independently (at minimum: light-no-motif, dark-no-motif, one restrained-motif option).
3. **Novelty decay across pages** — a themed detail that reads as clever on the Home hero becomes tedious by the third page. Avoid by never evaluating a direction from the hero alone; mock up or describe how the motif recurs across all 5 page types before calling a direction done.
4. **Metaphor breakdown under domain-expert scrutiny** — pass 1's literal "REV 2026.08" revision-block borrows EE datasheet semantics that don't actually apply to a bio card, and the audience most likely to notice (EE recruiters/engineers) is the target audience. Avoid by only borrowing conventions that map to something real, or keeping motif references abstract (texture/line-weight/type) rather than literal artifact recreation.
5. **"Technically correct but doesn't feel right"** — an AI-assisted rebuild can nail spacing/contrast/responsiveness while still being a reskinned shadcn default rather than a deliberately shaped design. Avoid by requiring directions to differ in actual layout/composition/imagery treatment, not just CSS variables and fonts on an identical structure.

## Implications for Roadmap

Based on combined research, suggested phase structure:

### Phase 1: Design System Foundation
**Rationale:** Architecture research found the mechanical reason pass 1 couldn't respond to a dark toggle — a parallel hardcoded hex palette bypassing the already-correct shadcn semantic token system. This must be fixed before any direction exploration, or every subsequent direction repeats pass 1's mistake at larger scale and the "apply winning direction everywhere" step becomes a full rewrite instead of a values swap.
**Delivers:** Hardcoded hex palette (`paper`/`ink`/`graphite`/`line`/`signal`) removed; all existing pages swept to reference only semantic Tailwind classes; `[data-direction]` attribute scaffold added to `index.css`/`tailwind.config.js` for the comparison phase; Fontsource installed for whichever font candidates the direction phase will need.
**Addresses:** Table-stakes "one coherent visual language" precondition from FEATURES.md; the semantic-token architecture from ARCHITECTURE.md.
**Avoids:** Anti-Pattern 1 (parallel hardcoded palette) and Anti-Pattern 4 (building a production theme-switcher — this is dev-only scaffolding, not a shipped toggle) from ARCHITECTURE.md.

### Phase 2: Direction Exploration & Mockups
**Rationale:** This is the actual diagnostic core of the milestone. Directions must isolate palette/mode from motif-intensity as independent axes, and must be evaluated across multiple page types with real structural differences — not single-hero, CSS-variable-only reskins — or the owner's reaction stays undiagnosable (per Pitfalls 2, 3, 5).
**Delivers:** 3-4 concrete, structurally distinct directions (minimum: light/no-motif, dark/no-motif, one restrained-technical-motif option), each authored as its own independent `:root`/`.dark`/`[data-direction]` value set (not an inverted light palette for the dark one), shown across at least Home + one content-heavy page (About) + Projects grid so novelty decay and density mismatch are visible before commitment.
**Addresses:** FEATURES.md differentiators (distinctive type pairing, varied project-card prominence, considered dark palette) expressed as comparable options; PITFALLS.md's entire "Direction-exploration phase" and "Mockup/review phase" mapping.
**Avoids:** Pitfalls 1 (wallpaper), 2 (conflated variables), 3 (novelty decay), 4 (metaphor breakdown), 5 (reskin uncanny valley), 6 (chrome upstages the work).

### Phase 3: Direction Selection & Full Implementation
**Rationale:** Once Ruben reacts to genuinely comparable directions and one is chosen, implementation is low-risk because Phase 1 already made the token layer the single source of truth — this phase is a values-collapse and full-page sweep, not new design work.
**Delivers:** Chosen direction's values collapsed into `:root` (and `.dark` only if the winner is dark and worth keeping literally), all `data-direction` scaffolding and losing-direction blocks deleted, full application across all 6 pages (Home/About/Projects/Project Detail/Resume/Contact), table-stakes polish completed (real project imagery in place, hover/focus states, verified mobile hero + grid, contrast-checked).
**Uses:** STACK.md's Fontsource pairing and `prefers-reduced-motion`-gated Framer Motion for any entrance/reveal animation; ARCHITECTURE.md's Layer 1 (spacing/container widths) held constant throughout, never touched.
**Implements:** The token architecture from Phase 1 becomes the production styling system.

### Phase 4: Differentiator Layer (optional, sequence after Phase 3 is stable)
**Rationale:** FEATURES.md and PITFALLS.md both flag that micro-interactions and case-study depth should be layered onto an already-locked system, not bolted on before the direction is settled — otherwise effort risks being spent polishing something that gets thrown away.
**Delivers:** Case-study template applied to Project Detail pages starting with 1-2 flagship projects (VR glove, FPGA synth); sparse, purposeful micro-interactions (card hover reveal of stack/role, magnetic buttons, scroll-reveal) scoped to hero + project cards only.

### Phase Ordering Rationale

- Phase 1 must precede Phase 2 because direction comparison is only cheap (and only actually reveals dark-mode viability) once colors/fonts route through the semantic token layer — doing exploration against the old hardcoded palette would just repeat pass 1's architecture at 4x the directions.
- Phase 2 must fully precede Phase 3 because implementing "everywhere" before a direction is chosen and validated across multiple page types risks committing to something that fails Pitfall 3 (novelty decay) or Pitfall 5 (reskin, not real difference) only after the expensive full-implementation work is done.
- Phase 4 is explicitly sequenced last and marked optional/v1.x because FEATURES.md's dependency graph shows micro-interactions and case-study depth both depend on the signature direction being locked first — this also matches PROJECT.md's stated "no urgency, get it right" framing.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Direction Exploration):** Not a technical-research gap but a design-judgment one — the roadmapper/planner should treat "generating structurally distinct directions" as requiring explicit creative-brief work (per Pitfall 5's warning against reskin-only directions), not a mechanical task. Consider flagging for a design-focused planning pass rather than a code-research pass.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Design System Foundation):** Fully documented in ARCHITECTURE.md against this repo's actual files (`tailwind.config.js`, `src/index.css`, `theme-provider.tsx`) — mechanical, well-specified work.
- **Phase 3 (Full Implementation):** Standard token-swap-and-sweep pattern once Phase 1's architecture exists; STACK.md's Fontsource/Framer Motion guidance is concrete and installation-ready.
- **Phase 4 (Differentiator Layer):** Framer Motion `whileInView` patterns and case-study content structure are both concretely specified in STACK.md and FEATURES.md respectively.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM-HIGH | Verified against current library docs/changelogs (Motion's own upgrade guide, GSAP licensing change, Fontsource setup) and cross-referenced against this repo's actual `package.json`; the "what feels distinctive" typography/texture judgments are inherently more subjective and flagged as such within STACK.md itself |
| Features | MEDIUM | WebSearch-sourced design-community consensus (portfolio showcases, AI-slop-design commentary), cross-referenced across 3+ independent sources per major claim, especially the AI-cliché palette identifications — no formal spec exists for "standout portfolio," so this is aggregated practitioner opinion rather than authoritative documentation |
| Architecture | HIGH (mechanics) / MEDIUM (aesthetic conventions) | The token-layer diagnosis is HIGH confidence because it's verified by direct inspection of this repo's actual `tailwind.config.js`/`index.css`/`theme-provider.tsx` — not inference. The palette-composition and dark-mode-authoring conventions (60/30/10, elevation-via-lightness-steps) are MEDIUM, WebSearch-sourced but consistently cross-referenced (Smashing Magazine, shadcn maintainer discussion, multiple design-system guides) |
| Pitfalls | MEDIUM-HIGH | UX/metaphor fundamentals (skeuomorphism, metaphor breakdown) are HIGH confidence, sourced from NN/g, Baymard, A List Apart — established UX research orgs. Portfolio-specific and AI-design-taste findings are MEDIUM, consistent across independent sources but largely practitioner opinion. Grounded throughout in direct inspection of pass 1's actual shipped code, which is itself HIGH-confidence primary evidence |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- No canonical "correct" visual direction exists to converge on — feature/pitfalls research can name failure modes (wallpaper, novelty decay, AI-cliché palettes) but cannot substitute for Ruben's actual subjective reaction to concrete mockups. Handle by treating Phase 2 as a genuine open exploration with a tight review loop, not a research-answerable question.
- Font pairing specifics (which exact display/body faces) are deliberately left as design decisions, not resolved by research — STACK.md gives the *mechanism* (Fontsource variable fonts, role-based `--font-display`/`--font-body`/`--font-mono` tokens) but not specific font names. Resolve during Phase 2 direction authoring.
- Photo/imagery asset quality for real project photography (VR glove, PCB, FPGA board) is unverified — FEATURES.md flags this as potentially needing reshoots/better lighting but the actual asset inventory wasn't assessed in this research round. Flag for an early check during Phase 2 or 3 planning so it doesn't block implementation late.
- Native CSS scroll-driven animations and Lenis smooth-scroll are flagged as viable but cross-browser-inconsistent (CSS) or a potential desync risk when mixed with other scroll mechanisms (Lenis) — only relevant if Phase 4 pursues either; default to Framer Motion's `whileInView`/`useScroll` to sidestep this entirely unless a specific direction's identity requires otherwise.

## Sources

### Primary (HIGH confidence)
- Direct repo inspection: `tailwind.config.js`, `src/index.css`, `src/components/theme-provider.tsx`, `src/App.tsx`, `src/pages/Home.tsx`, `.planning/codebase/STRUCTURE.md`, `package.json`
- Motion (Framer Motion) official upgrade guide — motion.dev/docs/react-upgrade-guide
- NN/g — Skeuomorphism; NN/g — Design Taste vs. Technical Skills in the Era of AI
- Baymard Institute — Designing With Metaphors & Skeuomorphs
- A List Apart — Design by Metaphor
- W3C — Understanding WCAG 2.0 Success Criterion 1.4.3 (Contrast)
- Fontsource official site (fontsource.org)

### Secondary (MEDIUM confidence)
- Lenis official site + independent technical write-ups (scroll-desync risk)
- GSAP/GreenSock licensing change coverage (gsap.com forums, 2026 roundups)
- Accessibility critique of custom cursors (ericwbailey.website, Funka Foundation, dbushell.com)
- SVG `feTurbulence` grain technique (freecodecamp.org, css-tricks.com, Codrops)
- React Three Fiber/WebGL complexity accounts (Codrops, Maxime Heckel's blog, varun.ca)
- Colorlib, Sitebuilderreport, Really Good Designs — developer/engineer portfolio showcase roundups
- Kyle Chayka, 925 Studios, rnauval.dev, Medium — "AI slop" / generic AI web design commentary
- Smashing Magazine (2025) — Inclusive Dark Mode; ColorArchive; onething.design — dark-mode palette authoring conventions
- shadcn/ui theming best practices (paulserban.eu) + shadcn-ui/ui GitHub Issue #52
- Sparkbox, Stopdesign — multiple design-direction review methodology

### Tertiary (LOW-MEDIUM confidence)
- 2026 portfolio/web design trend roundups (Envato Elements, Fireart Studio, Colorlib, The Crit) — used only as directional signal that grain texture and restrained scrollytelling are current, not as technical fact

---
*Research completed: 2026-08-18*
*Ready for roadmap: yes*
