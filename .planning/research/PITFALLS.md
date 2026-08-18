# Pitfalls Research

**Domain:** Personal engineering-portfolio website — visual redesign (second pass, motif-driven design risk)
**Researched:** 2026-08-18
**Confidence:** MEDIUM-HIGH (UX/metaphor fundamentals HIGH — NN/g, Baymard, A List Apart; portfolio-specific and AI-design-taste findings MEDIUM — consistent across multiple independent sources but largely practitioner opinion, not empirical studies)

## Context: What Pass 1 Actually Did

Read directly from the shipped codebase (`src/pages/Home.tsx`, `src/index.css`) to ground this research in specifics, not just the description in PROJECT.md:

- Palette: near-white "paper" background (`60 17% 95%`), near-black "ink" text, muted "graphite" secondary text, single orange "signal" accent — genuinely minimal, low color variety.
- Motif applied pervasively, not as an accent: `§ Home` / `§ Projects` section markers in tracked-uppercase mono, a literal "title block" (engineering-drawing revision block) as a hero sidebar with `NAME / ROLE / LOC / REV 2026.08` rows, a `grid-paper` graph-paper background texture, `font-mono text-xs uppercase tracking-widest` labels repeated across sections, hairline borders everywhere (`border-line`).
- The metaphor is decorative rather than functional: `REV 2026.08` borrows engineering revision-control semantics for a personal bio card where there is no actual revision history — the audience most likely to recognize datasheet/schematic conventions (EE recruiters, fellow engineers) is also the audience most likely to notice the metaphor doesn't literally hold up.

This grounds every pitfall below in what's actually on the page, not a hypothetical "themed design."

## Critical Pitfalls

### Pitfall 1: Theme-as-wallpaper (motif applied everywhere instead of as an accent)

**What goes wrong:**
A conceptual motif (schematic/datasheet, in this case) gets stamped onto every section, every label, every card — section markers, borders, mono uppercase labels, grid texture, revision-block chrome — until the "concept" is the dominant visual experience instead of a supporting layer around the content (projects, photos, resume). The viewer's eye is pulled to the theme's repeated signifiers on every scroll, not to the work.

**Why it happens:**
Once a motif is chosen, it's easy (especially with AI-assisted implementation, which is very good at consistent pattern application) to mechanically propagate it to every component for "cohesion." Cohesion is treated as "more instances of the motif" rather than "the motif appears once, memorably, and everything else gets out of the way."

**How to avoid:**
Budget the motif like a scarce resource. Pick 1-2 places per page where the concept gets to be loud (e.g., the hero) and make everywhere else quiet, standard, content-first. If a mockup review finds the motif's visual vocabulary (uppercase mono labels, hairline borders, "§" markers) recurring more than 2-3 times on a single page, that's a signal it has become wallpaper.

**Warning signs:**
- Every page has its own "§ [Section]" style marker.
- The same micro-typography treatment (tracked uppercase mono) is used for navigation, labels, tags, AND buttons.
- Screenshots of the page, viewed at a glance, read as "engineering drawing" before they read as "portfolio of a person's work."

**Phase to address:**
Direction-exploration phase — when generating the 3+ concrete directions, explicitly instruct each themed direction to apply its motif in a *restrained* dose (one hero moment) as one variant, separate from a *maximal* dose as another, so the owner can react to "how much theme is too much" as its own axis, independent of which theme.

---

### Pitfall 2: Conflating "the premise is wrong" with "the execution is wrong" (owner's exact stated uncertainty)

**What goes wrong:**
The owner already can't tell whether "minimal + light" itself is the problem, or whether the schematic motif riding on top of it is the problem. If pass 2 changes both the palette AND the motif at the same time in a single new direction, this ambiguity persists — a second failure won't reveal which variable was at fault, risking a third do-over.

**Why it happens:**
It's natural to want to "fix everything that might be wrong" in one redesign rather than isolating variables. This is efficient for shipping but bad for diagnosis, and this milestone's whole purpose is diagnosis (per PROJECT.md: "genuinely unsure whether the direction was the minimal/light premise itself or specifically the schematic motifs").

**How to avoid:**
Structure the set of directions so premise and motif vary independently: at minimum, include (a) a light/minimal direction with NO overt engineering motif (clean editorial/typographic, content-forward), (b) a dark direction with no overt motif, and (c) at most one direction that reintroduces a technical/engineering motif but restrained (per Pitfall 1) — so the motif's presence or absence is a variable the owner can react to explicitly, not entangled with palette changes.

**Warning signs:**
- All proposed directions include some form of schematic/technical decoration — no "clean, motif-free" control exists to compare against.
- Owner feedback on mockups is vague ("still not it") rather than pointing at a specific element — a sign the directions didn't isolate the variables being tested.

**Phase to address:**
Direction-exploration phase (design of the direction set itself, before any mockups are built) — explicitly plan the direction matrix to separate "palette/mode" (light vs dark vs other) from "motif intensity" (none vs restrained vs heavy) as two axes, not one.

---

### Pitfall 3: Novelty decay — motifs that charm once become tedious on repeat viewing

**What goes wrong:**
A themed detail (a title block, a "REV" number, a "§" marker) can look clever the first time a reviewer sees it on the hero. By the third page (About → Projects → Resume), the same device repeated becomes tiresome rather than delightful — and a portfolio is specifically a multi-page artifact a recruiter will skim quickly, so this compounding effect is fast and highly consequential here, more than for a typical single-page site.

**Why it happens:**
Designers (and design owners) evaluate a motif from a single hero screenshot, where it reads as fresh. The failure mode only becomes visible with repeated exposure across the full page set — which is exactly what static mockups of just the homepage will fail to catch.

**How to avoid:**
Never evaluate a themed direction from the hero alone. Mock up (or at least sketch) how the motif's signature elements recur across all 5 pages before calling a direction "done." If the same visual trick appears identically on Home, About, Projects, and Resume, treat that as a red flag rather than "consistency."

**Warning signs:**
- The motif's most distinctive element (title block, section marker, revision stamp) appears unchanged on every page.
- When looking at 3-4 page mockups back-to-back, the reaction shifts from "neat" to "okay, I get it" — that shift is the novelty-decay signal.

**Phase to address:**
Mockup/review phase — require multi-page (not single-hero) mockups or at least a "how this motif appears on every page type" note per direction, so novelty decay is visible before full implementation, not after.

---

### Pitfall 4: Metaphor breaks down under scrutiny from the exact audience it's meant to impress

**What goes wrong:**
Datasheet/schematic/engineering-drawing conventions (revision blocks, section numbering, drawing borders) have real semantic meaning in the EE/hardware world. When those conventions are borrowed decoratively but don't actually function the way the source convention does (a bio card with a "REV 2026.08" field, when nothing about the person has a revision history), the mismatch is most visible to the audience who knows the convention best — which is precisely the EE recruiters and engineers this portfolio targets. What reads as "familiar shorthand" to a general audience can read as "doesn't actually understand what a revision block is for" to the target audience.

**Why it happens:**
This is a documented, well-established UX failure mode: metaphors work when the digital behavior maps to the physical/source convention, and break down at the edges where the mapping doesn't hold (see Baymard, NN/g research on skeuomorphism and metaphor in UX — "the fundamental challenge is balancing familiarity against the capabilities diverging between the physical object and the digital counterpart"). It's compounded here because the source domain (EE datasheets/schematics) is also the applicant's own professional domain — the audience has above-average fluency in spotting a misapplied convention.

**How to avoid:**
If a technical-motif direction is explored again, only borrow conventions that either (a) map onto something real on the page (e.g., a genuine "last updated" date is fine; a fabricated "REV" number with no real versioning behind it is not), or (b) are used so lightly/abstractly (a texture, a line weight, a type choice) that no domain expert would expect it to behave like the real thing. Avoid literal recreations of specific artifacts (title blocks, revision tables) unless they carry real information.

**Warning signs:**
- A motif element requires inventing fake data to populate it (a "REV" number that doesn't correspond to any actual revision, a "§" numbering scheme with no real document behind it).
- Reviewers with domain expertise (EE background) are the intended audience but haven't been asked "does this read as authentic or as costume?"

**Phase to address:**
Direction-exploration phase, if a technical-motif direction is included at all — vet each motif element against "does this map to something real, or is it decoration wearing a domain's clothes?"

---

### Pitfall 5: "Technically correct but doesn't feel right" — the AI-assisted design uncanny valley

**What goes wrong:**
An AI-assisted rebuild can nail every technically verifiable property (consistent Tailwind/shadcn spacing tokens, passable color contrast, responsive grid, clean component structure) while still producing something that reads as generic-plus-a-decorative-layer rather than a deliberately designed system. The result "looks correct" in review (nothing is obviously broken) but doesn't "feel" considered — because the underlying layout/typography/composition is still a fairly standard shadcn/ui card-grid arrangement, with the theme applied as a skin (colors, fonts, borders) on top of default component structure, rather than the layout itself being shaped by the chosen direction.

**Why it happens:**
This is a known and named failure mode in 2026 AI-assisted design discourse: AI tooling is excellent at technical correctness and pattern-matching to "what a portfolio/SaaS site usually looks like," but pattern-matching trends toward the statistical mean, not toward a specific point of view. Multiple independent sources (Adobe, NN/g, UX Collective, and practitioner blogs) converge on the same framing: taste is "recognizing when something is technically correct but structurally wrong," and that judgment doesn't come from the tool — it has to be imposed by the person reviewing the output.

**How to avoid:**
When evaluating each direction, explicitly separate two questions: "is this correctly built?" (spacing, contrast, responsiveness — easy to verify, AI tooling handles this well) from "does this feel like a deliberate choice, not a default with a skin?" (harder, requires the owner's actual reaction, not a checklist). Push directions to differ structurally — layout, hierarchy, imagery treatment, information density — not just palette/font swaps on an identical shadcn/ui card grid. If two "different" directions are just recolored/refonted versions of the same underlying layout, they are not actually a meaningful comparison set.

**Warning signs:**
- Directions differ mainly in CSS variables (`--background`, `--accent`, font family) with near-identical component structure and page layout underneath.
- The reaction to a direction is lukewarm/hard-to-articulate ("it's fine, I guess") rather than a clear like/dislike — a classic uncanny-valley response.

**Phase to address:**
Direction-generation phase — require that the set of directions vary in actual structure (hero composition, project-grid density, imagery role, typographic hierarchy), not only in color/typeface, so the owner is evaluating genuinely different designs rather than reskins of one default.

---

### Pitfall 6: Personal branding/chrome upstages the actual work

**What goes wrong:**
A heavily conceptual identity (title blocks, section markers, revision stamps, consistent "drawing" chrome) draws attention to "look, this person has a clever design concept" rather than to the projects themselves (VR glove, AC-DC converter, FPGA synthesizer, SIMD accelerator). For a portfolio whose job is to get someone to look at and remember the *work*, decorative identity competing with the work for attention is counterproductive — this is a widely echoed critique in portfolio-specific design writing, not just a general design principle.

**Why it happens:**
A distinctive motif is, by definition, attention-grabbing — that's what makes it feel "not template." But attention-grabbing chrome and attention-grabbing work compete for the same limited scanning time a recruiter gives a portfolio (often under a minute per site).

**How to avoid:**
For each direction, explicitly check: on the Projects/Home page, does the eye land on the project imagery/titles first, or on the thematic chrome (labels, borders, texture) first? Favor directions where project photography and titles are the largest, highest-contrast elements on the page; motif elements should be quieter than the work by default.

**Warning signs:**
- In a mockup, thematic elements (mono labels, borders, texture) have equal or higher visual weight than project titles/imagery.
- Describing a direction out loud, the first thing mentioned is "it looks like an engineering drawing" rather than "you can see the VR glove project clearly."

**Phase to address:**
Mockup review phase — when presenting each direction to the owner, ask directly "what do you notice first: the theme, or the work?" as part of the reaction-gathering process, before committing.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Reskinning shadcn/ui defaults (swap CSS variables/fonts) instead of restructuring layout per direction | Fast to produce multiple "directions" for review | Directions look different but aren't structurally distinct — owner can't actually compare real options (Pitfall 5) | Acceptable only for a first-pass rough palette/mood sketch, never for the directions the owner makes a final call on |
| Evaluating a direction from the homepage hero only | Fast mockup turnaround | Misses novelty decay and motif overuse that only shows up across multiple pages (Pitfall 3) | Never for the final decision; okay as an early gut-check before investing in multi-page mockups |
| Applying a heavy motif everywhere for "consistency" | Feels thorough, easy to reason about ("the rule is: everything gets the treatment") | Motif becomes wallpaper, competes with work for attention (Pitfalls 1 & 6) | Never — consistency should mean "consistent restraint," not "consistent decoration" |

## Integration Gotchas

Not a data/API-heavy project, so this is lighter than typical, but still relevant given the GitHub Pages/HashRouter static-hosting setup:

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|-------------------|
| Google Fonts (Space Grotesk/IBM Plex or replacements) on GitHub Pages | Loading multiple weights/families "just in case," causing visible FOUT/FOIT that undercuts a "polished" first impression precisely when a new visual identity is trying to make a good first impression | Pick the minimum weight/family set each direction actually uses; verify font-loading behavior on the deployed GitHub Pages build, not just local dev |
| Light/dark mode direction (`.dark` class already scaffolded in `index.css`) | Treating dark mode as an automatic color-token inversion of the light design, without re-checking imagery treatment (photos, borders, texture) actually look intentional in dark, not just "light design with inverted colors" | Treat the dark direction as its own direction to evaluate on its own mockups — not a checkbox toggle on the light direction |

## Performance Traps

Low relevance for a static personal portfolio at this traffic scale, but worth noting since motif-heavy pass 1 used background-image grid textures and per-element `framer-motion` animation:

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|-----------------|
| Decorative background textures (e.g., `grid-paper` gradients) applied broadly, not just behind the hero | Slightly heavier paint/repaint cost, more visual noise reducing the "clean minimal" feeling the direction was going for | Keep decorative textures scoped to one hero section max, matching how pass 1's own code comment described intent ("used behind the hero title-block only") — verify direction 2 mockups don't let it creep further | Not a real breakage risk at this project's scale (personal site, low traffic) — the real cost is aesthetic (busyness), not technical |

## Security Mistakes

Minimal relevance — static portfolio, no backend/auth/API (per PROJECT.md). No domain-specific security pitfalls beyond general best practice (e.g., not exposing personal contact info in ways that invite scraping/spam beyond what a Contact page already requires). Not a focus area for this milestone.

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-------------------|
| Tracked uppercase mono micro-text for labels/section markers (pass 1: `text-xs uppercase tracking-widest`) | Slower to scan at a glance — recruiters skimming multiple portfolios in minutes benefit from immediately legible labels, not stylized ones; uppercase + wide tracking + small size compounds against fast scanning | Reserve small-caps/mono/tracked treatment for at most one or two accents per page (e.g., a single eyebrow label), keep primary scanning text (nav, project titles, headings) in a normal-case, higher-legibility treatment |
| Low-contrast "graphite on paper" secondary text paired with a minimal palette | Risks sitting near WCAG AA contrast thresholds (4.5:1 for body text) for a design that's supposed to read as "clean," not just "quiet" — untested contrast can undercut the minimal premise's credibility if it also reads as hard to read | Explicitly contrast-check each direction's text/background pairs, especially muted/secondary text, before calling a direction ready for review |
| A single overarching "concept" applied identically across very different page types (a sparse hero vs. a dense Resume page vs. a Project Detail page) | The motif that works for a hero (spacious, one focal element) often doesn't translate to a dense information page (resume bullet lists, skills) — forcing the same chrome onto both can make the dense pages feel cluttered or the sparse pages feel over-decorated | Test each direction's specific treatment for the Resume and Project Detail pages, not just Home — these are the pages most likely to reveal whether a motif scales to real content density |

## "Looks Done But Isn't" Checklist

- [ ] **"Multiple distinct directions":** Often actually the same shadcn/ui layout with different CSS variables/fonts — verify each direction changes real layout/composition, not just palette (Pitfall 5).
- [ ] **"Dark option included":** Often a mechanical inversion of the light direction's tokens — verify it's been evaluated on its own mockups, with its own imagery/border/texture treatment considered (Integration Gotchas).
- [ ] **"Motif applied consistently":** Often means "motif applied maximally, everywhere" — verify motif intensity was a deliberate, reviewed choice, not a default (Pitfall 1).
- [ ] **"Mockups presented for reaction":** Often just the homepage hero — verify multi-page mockups (or explicit page-by-page notes) exist before the owner commits to a direction, so novelty decay and density mismatches are visible (Pitfalls 3 & UX pitfalls table).
- [ ] **"Contrast/accessibility fine":** Often eyeballed rather than checked — verify actual contrast ratios for muted/secondary text against the chosen background per direction.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|----------------|-----------------|
| Committed to a direction, then it reveals the "wallpaper" or novelty-decay problem after full implementation | MEDIUM | Because content/structure is locked and untouched (per PROJECT.md scope), recovery is a targeted de-intensification pass: strip repeated motif elements down to one hero instance, keep the underlying palette/typography choice — cheaper than a full third redesign since the diagnosis (premise vs. motif) should already be known from pass 2's direction-testing |
| Both palette and motif changed together again, so a second "isn't working" reaction can't be diagnosed | HIGH | Would require going back to isolated-variable mockups (light-no-motif vs. dark-no-motif vs. restrained-motif) that should have been done in phase 1 — best avoided entirely rather than recovered from, per Pitfall 2 |
| Directions turned out to be reskins, not real alternatives, and the owner picked one without a genuine comparison | LOW-MEDIUM | Since this is caught by asking the owner to react to mockups before full build-out, recovery is just going back to the direction-generation step with an explicit instruction to vary structure, not just tokens — cheap if caught before full implementation, expensive if caught after |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|--------------------|----------------|
| Theme-as-wallpaper (motif overapplied) | Direction-exploration phase (generating the direction set) | Each direction's mockup shows motif signifiers ≤2-3 times per page, concentrated in one "hero moment" |
| Conflating premise vs. execution failure | Direction-exploration phase (designing the direction matrix) | Direction set includes at least one motif-free light option and one motif-free dark option, isolating palette from motif |
| Novelty decay across pages | Mockup/review phase | Mockups (or explicit descriptions) cover all 5 page types, not just Home hero, before owner commits |
| Metaphor breaking down under domain-expert scrutiny | Direction-exploration phase, for any technical-motif direction | Each motif element maps to real data or is abstract enough not to invite literal comparison to the real convention |
| "Technically correct but doesn't feel right" (AI-assisted uncanny valley) | Direction-generation phase | Directions differ in actual layout/composition/imagery treatment, not just CSS variables/fonts on an identical structure |
| Chrome upstages the work | Mockup review phase | Owner's first reaction to each Home/Projects mockup names the work before naming the theme |

## Sources

- [NN/g — Skeuomorphism](https://www.nngroup.com/articles/skeuomorphism/) — HIGH confidence, authoritative UX research org
- [Baymard Institute — Designing With Metaphors & Skeuomorphs](https://baymard.com/blog/metaphors-and-skeuomorphs) — HIGH confidence, includes concrete failure examples (screen-space-wasted-on-decoration case study)
- [A List Apart — Design by Metaphor](https://alistapart.com/article/designbymetaphor/) — HIGH confidence, established web-design publication
- [Creative Bloq — 8 common portfolio mistakes](https://www.creativebloq.com/features/8-common-portfolio-mistakes-and-how-to-fix-them) — MEDIUM confidence
- [Design Shack — 6 Portfolio Design Mistakes](https://designshack.net/articles/business-articles/6-portfolio-design-mistakes-that-drive-me-nuts/) — MEDIUM confidence
- [Dribbble Resources — 5 Design Portfolio Mistakes](https://dribbble.com/resources/portfolio-mistakes-send-clients-running) — MEDIUM confidence, corroborates "over-polished/inauthentic" and "personal branding shouldn't be the loudest voice" findings
- [Shuffle — Why Do Most AI-Generated Websites Look the Same?](https://shuffle.dev/blog/2026/01/why-do-most-ai-generated-websites-look-the-same/) — MEDIUM confidence, 2026 practitioner analysis of AI design defaults
- [NN/g — Design Taste vs. Technical Skills in the Era of AI](https://www.nngroup.com/articles/taste-vs-technical-skills-ai/) — HIGH confidence, directly supports the "technically correct but structurally wrong" framing
- [Adobe Express — AI in design and content: Why taste is the true differentiator](https://www.adobe.com/express/learn/blog/ai-in-design-recommendations) — MEDIUM confidence
- [Sparkbox — Showing Single or Multiple Web Design Concepts](https://sparkbox.com/foundry/single_or_multiple_design_deliverables) — MEDIUM confidence, directly supports "2-3 rough directions early, before deep investment" methodology used in this project's roadmap
- [Stopdesign — Multiple design directions](https://stopdesign.com/archive/2005/04/17/multiple-design-directions.html) — MEDIUM confidence
- [WebAIM — Typefaces and Fonts](https://webaim.org/techniques/fonts/) — HIGH confidence, supports monospace/uppercase readability caution
- [W3C — Understanding WCAG 2.0 Success Criterion 1.4.3 (Contrast)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) — HIGH confidence, authoritative standard, supports the contrast-check recommendation
- Direct code inspection of pass 1 (`src/pages/Home.tsx`, `src/index.css` in the project repo) — HIGH confidence, primary source for what pass 1 actually shipped

---
*Pitfalls research for: personal engineering-portfolio visual redesign (pass 2 — motif-driven design risk)*
*Researched: 2026-08-18*
