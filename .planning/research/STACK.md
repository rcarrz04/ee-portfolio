# Stack Research

**Domain:** Visual redesign tooling for an existing React 18 + Vite + TS + Tailwind + shadcn/ui personal portfolio (static, GitHub Pages, HashRouter)
**Researched:** 2026-08-18
**Confidence:** MEDIUM-HIGH (verified against current library docs/changelogs and multiple independent sources; some "what feels distinctive" judgments are inherently subjective/LOW confidence and flagged as such)

## Framing

The stack is locked — this document does not propose framework alternatives. The question is narrower: **within Vite + React + Tailwind + shadcn, which additional tooling choices actually change how the site feels, vs which are complexity that a solo dev doesn't need to carry.**

The existing `package.json` already has `framer-motion@12`, `tailwindcss-animate`, and `react-type-animation` installed (used by the pass-1 "engineering drawing" design). Recommendations below build on what's already there rather than assuming a blank slate.

## Recommended Stack

### Core Technologies (already present — keep)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Tailwind CSS | 3.4.1 | Utility styling, design tokens | Already the design-token source of truth (colors, spacing, type scale). Don't add a second animation/utility CSS system on top — extend Tailwind config instead. Note: Tailwind v4 exists but is a separate migration (CSS-first config, different plugin API) — out of scope for a visual-only milestone. |
| Framer Motion (now published as `motion`) | Currently `framer-motion@^12.10.5` | Component-level animation, page transitions, scroll-linked reveals | Framer Motion became an independent project in 2025 and was republished to npm as `motion`, with the React import moving to `motion/react`. The API is unchanged — only the package name and import path differ. `framer-motion@12` still works and receives no further updates; not urgent to migrate, but if any new animation code is written this milestone, install `motion` fresh and import from `motion/react` rather than adding new code against the frozen `framer-motion` package. (MEDIUM confidence — verified via Motion's own upgrade guide and multiple 2025/2026 sources.) |
| `tailwindcss-animate` | 1.0.7 | Powers shadcn/ui's built-in enter/exit transitions (dialogs, dropdowns, tooltips) | Keep — shadcn components depend on it. It is not a general animation library; don't try to build scroll storytelling with it. |

### Typography

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Fontsource (`@fontsource-variable/<font>`) | latest | Self-hosted, npm-installed variable font files | Distinctive typography is one of the highest-leverage, lowest-complexity ways to make a portfolio not look like a template — more than any animation library. Fontsource packages a font as an npm dependency: no external Google Fonts request, no render-blocking `<link>` to fonts.googleapis.com, no FOUC/CLS from a late-loading stylesheet. One variable-font `.woff2` covers the whole weight range (e.g., 100–900) with a single file, replacing what would otherwise be 4-6 separate static-weight requests. For a static GitHub Pages site, this is a pure win: better Lighthouse/CLS score AND it unlocks using weight (and in some fonts, optical size / width axes) as an actual design tool via `font-variation-settings`, which is very hard to get "for free" with Google Fonts' CDN CSS. (HIGH confidence — Fontsource is the standard self-hosting approach for Vite/React and is directly importable as a package: `npm install @fontsource-variable/<name>`, then `import '@fontsource-variable/<name>'` once in `main.tsx`.) |
| Variable font pairing (1 display/expressive + 1 workhorse text face) | — | Establish the visual identity | Pass 1 used Space Grotesk + IBM Plex — a reasonable, safe technical-editorial pairing that reads as "template-adjacent" precisely because it's the most common EE/dev-portfolio combo right now. The lever for "distinctive" is less about swapping to some exotic font and more about (a) picking a pairing with real personality contrast — e.g. a display serif or a condensed/expanded grotesk for headings against a neutral, highly legible variable sans for body — and (b) actually using the variable axes (weight, optical size, occasionally width) for hierarchy instead of just swapping `font-family` between two statically-weighted faces. This is a design decision, not a tooling one, but it is only enabled by variable-font self-hosting. |

### Motion / Scroll

| Technology | Version | Purpose | When to Use |
|------------|---------|---------|-------------|
| Framer Motion / `motion` (already installed) `whileInView`, `useScroll`, `useTransform` | current | Section reveals, staggered lists, simple scroll-linked parallax (e.g., hero opacity/translate tied to scroll) | This is enough for ~90% of what makes a portfolio feel "alive": fade/slide-in on scroll, staggered card grids, subtle parallax on a hero image, animated route transitions between pages. It's already a dependency, it's React-idiomatic (no imperative DOM refs/cleanup to hand-manage), and it composes with React's render cycle instead of fighting it. Default to this. |
| GSAP + ScrollTrigger | latest (free) | Only if the design direction genuinely requires pinned sections, scrubbed multi-step timelines, or horizontal scroll-jacking | As of 2025, GSAP (Webflow-owned since Oct 2024) made its entire plugin set — including ScrollTrigger, SplitText, ScrollSmoother — free for commercial use, removing the old "Club GreenSock" paywall that used to make this an easy no. (HIGH confidence.) Even so: don't add GSAP unless a chosen visual direction specifically needs pinning/scrubbing that Framer Motion's `useScroll`/`useTransform` genuinely can't express cleanly. Adding a second animation engine alongside Framer Motion is real complexity (two mental models, two sets of scroll listeners, potential fighting over the same scroll timeline) for a 5-page static portfolio. Treat as opt-in per-direction, not a default addition. |
| Lenis (smooth scroll) | latest | Only if a direction wants deliberate "buttery" inertial scroll as part of its identity | Verified: Lenis wraps native scroll rather than faking it with transforms, so it doesn't break `position: sticky` or Intersection Observer-based reveals the way older libraries (Locomotive Scroll) did. It's the current standard choice when smooth scroll is wanted. Caveat worth flagging: Lenis's eased/interpolated scroll position can desync from native CSS scroll-driven animations (`animation-timeline: scroll()`), since those read real scroll position, not Lenis's visual position — so pick one scroll-effect mechanism (Lenis+JS-driven effects, OR native CSS scroll-driven animations) and don't mix them. For a personal portfolio, smooth scroll is a "nice, not necessary" signal of polish — worth it only if it's part of the deliberate feel of the chosen direction, not added reflexively. |
| Native CSS scroll-driven animations (`animation-timeline: scroll()` / `view()`) | CSS, no library | Simple, GPU-cheap scroll-linked effects (progress bars, reveal-on-enter) without any JS | Real and shippable in 2026 in Chromium-based browsers; Safari/Firefox support has been landing but is inconsistent — treat as progressive enhancement, not a dependency to build core interactions on, unless prepared to accept degraded (static) fallback in non-supporting browsers. Zero bundle-size cost, which is attractive for a static portfolio, but don't reach for it as the primary mechanism given cross-browser risk; Framer Motion's `whileInView`/`useScroll` is the safer default and works everywhere React does. |
| `react-type-animation` (already installed) | 3.2.0 | Typewriter-style text effect | This was used in pass 1. Typewriter/kinetic-text effects are common on dev portfolios to the point of being a cliché signal ("template-y") rather than a distinctiveness signal — treat as a candidate for removal unless a specific direction has a strong reason to keep it. Don't add more kinetic-typography libraries (e.g., SplitType, GSAP SplitText) speculatively; only reach for text-splitting/animation if a chosen direction's hero concept specifically depends on it. |

### Texture / Background Effects

| Technology | Version | Purpose | When to Use |
|------------|---------|---------|-------------|
| CSS/SVG grain (inline SVG `feTurbulence` filter or a small tiling noise PNG/WebP, applied via `background-image` + `mix-blend-mode: overlay`) | none — hand-rolled, ~20-40 lines | Subtle film-grain / paper texture over solid or gradient backgrounds | This is the correct way to do "grain," which is a genuinely current (2025-2026) portfolio texture trend that reads as tactile/human-made rather than templated. An SVG `feTurbulence` filter (or a single small pre-generated noise PNG) costs effectively nothing — no dependency, negligible render cost once cached, resolution-independent if SVG. Worth doing if a chosen direction wants a tactile/analog feel. Don't reach for a JS "grain library" or WebGL noise shader for this — that's solving a problem CSS/SVG already solves for free. (HIGH confidence.) |
| WebGL / shader background (React Three Fiber, OGL, raw `<canvas>` shader) | — | Animated generative background, 3D hero object, interactive particle field | Technically works within this stack (R3F is just a React renderer, drops into any component), but for a solo-dev, 5-page, content-driven engineering portfolio this is the highest-complexity, lowest-necessity option on this list. Real costs: a new rendering paradigm to learn/debug (shader math, `useFrame` render-loop performance tuning, mobile GPU/battery impact, respecting `prefers-reduced-motion`), meaningfully larger bundle (Three.js + R3F + drei is not small), and — most importantly for THIS project — it competes with the content for attention on a site whose job is to showcase engineering projects, not to be a WebGL demo. Verdict: skip by default. The one scenario where it's worth it is if a specific chosen visual direction's core identity IS a generative/interactive background (e.g., a circuit-board particle field as the site's signature device) and Ruben explicitly wants to spend the time — in that case scope it to a single component (e.g., just the homepage hero canvas), not a site-wide layer, and lazy-load it so it never blocks initial paint. (MEDIUM confidence — complexity claims verified across multiple sources; the "not worth it for this project" judgment is a recommendation, not a fact.) |
| Custom cursor | — | Replace/augment default OS cursor | **Recommend against, by default.** This is the one item on this list where the research is unusually one-sided rather than "depends on direction." Accessibility sources are consistent and specific: users who rely on OS-level cursor accessibility settings (size, color, contrast) get overridden by custom CSS/JS cursors; cursor position is tightly correlated with visual attention, so an exotic or lagging cursor actively degrades usability, not just aesthetics; and it's one of the few genuinely universal UI conventions on the web, so breaking it costs trust for a purely decorative gain. If a direction wants a cursor-adjacent interaction (e.g., a subtle magnetic-hover effect on buttons/links), that's a much smaller-scope, much lower-risk alternative — implement as a Framer Motion hover effect on individual elements, not a global custom-cursor replacement. (HIGH confidence — accessibility concerns corroborated by multiple independent sources including dedicated a11y orgs.) |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Fontsource npm packages | Font asset management | Treat fonts as versioned dependencies (`package.json`), not files dropped in `public/`. Simplifies updates and keeps font subsetting/optimization out of manual maintenance. |
| `prefers-reduced-motion` media query (Tailwind's `motion-safe:`/`motion-reduce:` variants, or a check inside Framer Motion via `useReducedMotion()`) | Respect OS-level reduced-motion preference | Not optional if any scroll/entrance animation is added — cheap to implement (Framer Motion ships `useReducedMotion()` out of the box) and is the accessibility baseline any of the motion recommendations above should be gated behind. |

## Installation

```bash
# Self-hosted variable font(s) — pick per chosen direction, example shown
npm install @fontsource-variable/<display-font>
npm install @fontsource-variable/<body-font>

# Only if a direction requires it — optional, evaluate per-direction:
npm install motion            # supersedes framer-motion for any NEW animation code
npm install gsap              # only if pinning/scrubbing is required
npm install lenis             # only if deliberate inertial scroll is part of the identity
```

No install needed for: CSS/SVG grain (hand-rolled), native CSS scroll-driven animations (browser built-in), `whileInView`/`useScroll` (already in `framer-motion@12`, already a dependency).

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Fontsource self-hosted variable fonts | Google Fonts `<link>`/CDN | Only if truly optimizing for zero setup time over a single afternoon and performance/CLS is a non-concern — not recommended here since Fontsource is nearly as low-effort and strictly better for a static site's Core Web Vitals. |
| Framer Motion (`whileInView`/`useScroll`) as default motion tool | GSAP + ScrollTrigger | When a specific chosen direction needs pinned sections, scrubbed timelines, or horizontal scroll — not as a blanket replacement. |
| CSS/SVG grain (hand-rolled) | A JS "grain/noise" npm package | Never, for this project — the hand-rolled approach is strictly simpler and has no dependency-maintenance cost. |
| Skip WebGL background by default | React Three Fiber generative background | Only if a specific chosen direction's core identity requires an interactive/generative canvas element, scoped to one component, lazy-loaded. |
| Skip custom cursor | Framer Motion magnetic-hover on individual interactive elements | If a direction wants a cursor-adjacent "alive" feel without the accessibility/trust costs of replacing the OS cursor globally. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Adding GSAP + Framer Motion + Lenis all at once "to be safe" | Three animation/scroll systems on a 5-page static site is unmanaged complexity for a solo dev — they can visually conflict (see Lenis/CSS scroll-driven desync note above) and each adds its own render-loop/cleanup code to maintain | Start with Framer Motion (already installed) only. Add GSAP or Lenis individually, and only if a specific chosen direction's requirements can't be met with what's already there. |
| Global custom cursor replacement | Documented accessibility harm (overrides OS accessibility cursor settings) and UX harm (obscures clickable-affordance signals); one of the only genuinely one-sided "don't" findings in this research | Scoped hover micro-interactions on specific elements instead |
| WebGL/Three.js as a default/global background layer | Bundle size, GPU/battery cost, `prefers-reduced-motion` handling, and — specific to this project — it competes with engineering-project content for attention on a portfolio whose job is to showcase that content | CSS gradients/grain for texture; reserve WebGL for a single, deliberately-chosen hero component if a direction specifically calls for it |
| Kinetic-text/typewriter effects as a default (e.g., keeping `react-type-animation` by default) | Increasingly reads as "portfolio template" boilerplate rather than distinctive — the opposite of this milestone's goal | Only include if a specific chosen direction's hero concept genuinely depends on it; otherwise drop it |
| Migrating to Tailwind v4 or swapping shadcn/ui's underlying primitives as part of this work | Explicitly out of scope — stack is locked for this milestone, and v4's CSS-first config is a real migration, not a visual tweak | Extend the existing Tailwind v3 config (colors, fontFamily, keyframes) for whatever new design tokens each direction needs |

## Stack Patterns by Variant

**If the chosen direction is minimal/editorial (refined version of pass 1, not the schematic motif):**
- Lean hardest on typography (Fontsource variable font pairing) and generous whitespace/grid as the primary distinctiveness levers.
- Motion: Framer Motion `whileInView` fades/slides only — restraint is the point.
- Texture: optional very subtle grain (opacity ~0.03-0.06) if warmth is wanted; otherwise skip entirely.

**If the chosen direction is dark/bold/maximalist:**
- Grain/noise texture reads well here (film/cinematic association) — safe to push opacity higher (~0.08-0.15).
- Framer Motion parallax + stagger for hero sections; GSAP only if the direction includes a genuinely complex scroll-driven sequence (e.g., pinned project showcase that scrubs through states).
- Consider a scoped WebGL hero element only here, and only if Ruben is excited to spend time on it — this is the one variant where it would actually fit the identity rather than feel bolted on.

**If time/energy runs short and only one "distinctiveness lever" can be pulled:**
- Typography (self-hosted variable font pairing, used deliberately for hierarchy) is the highest-leverage, lowest-complexity choice on this entire list. It touches every page automatically for free, has no runtime/accessibility risk, and is very hard to get right with default Google Fonts + a single weight.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `framer-motion@12.10.5` | React 18.2, Vite 4.5.2 | Fully compatible, currently installed and working (pass 1 shipped with it). No forced upgrade needed. |
| `motion` (new package name) | React 18+ | Drop-in for `framer-motion` — same API, only import path (`motion/react`) changes. Safe to introduce alongside existing `framer-motion` usage if migrating incrementally; not required to migrate everything in one pass. |
| `@fontsource-variable/*` | Any bundler (Vite included) | Pure CSS + font-file package; no build config changes needed beyond a single top-level `import` statement. |
| `gsap` (free tier, post-May-2025) | React 18, any bundler | No license/paywall concern anymore; only cost is bundle size and a second animation mental model — see "What NOT to Use." |
| Native CSS `animation-timeline: scroll()` | Chromium: yes. Firefox/Safari: inconsistent as of this research (2026) | Treat as progressive enhancement only; do not build required functionality on it. |

## Sources

- Motion (Framer Motion) official upgrade guide — motion.dev/docs/react-upgrade-guide — package rename `framer-motion` → `motion`, import path change to `motion/react`. HIGH confidence.
- Fontsource official site (fontsource.org) and multiple independent setup guides (dev.to, everythingcs.dev) — self-hosted variable font installation pattern for Vite/React. HIGH confidence, cross-verified across sources.
- Lenis official site (lenis.darkroom.engineering) and independent technical write-ups — native-scroll-wrapping architecture, sticky-positioning compatibility, desync risk with native CSS scroll-driven animations. MEDIUM confidence (WebSearch-sourced, cross-verified across 3+ independent sources).
- GSAP/GreenSock licensing change — gsap.com community forum threads + independent 2026 roundups (smashingapps.com, noqode.fr) confirming full free-tier release of ScrollTrigger/SplitText/etc. post Webflow acquisition. HIGH confidence, corroborated across independent sources.
- Accessibility critique of custom cursors — ericwbailey.website ("Don't use custom CSS mouse cursors"), Funka Foundation (stiftelsenfunka.org), dbushell.com — consistent, specific accessibility harms cited across multiple independent a11y-focused sources. HIGH confidence.
- SVG `feTurbulence` grain-texture technique — freecodecamp.org, css-tricks.com, Codrops (tympanus.net) — standard, well-established CSS/SVG technique, no library required. HIGH confidence.
- React Three Fiber / WebGL portfolio complexity — Codrops (tympanus.net), Maxime Heckel's blog (blog.maximeheckel.com), varun.ca — practitioner accounts of tuning/debugging cost. MEDIUM confidence (complexity claims verified across independent practitioner sources; "not worth it for this project" is this document's own judgment applied to those findings, not an external claim).
- 2026 portfolio/web design trend roundups (Envato Elements, Fireart Studio, Colorlib, The Crit) — used only to corroborate that grain texture and restrained kinetic-text/scrollytelling are current (not to source technical recommendations). LOW-MEDIUM confidence, treated as directional signal only, not fact.
- Existing `package.json` at repo root — ground truth for what's already installed (`framer-motion@12.10.5`, `tailwindcss-animate@1.0.7`, `react-type-animation@3.2.0`, Tailwind `3.4.1`, Vite `4.5.2`, React `18.2.0`). Read directly, HIGH confidence.

---
*Stack research for: Visual redesign tooling within a locked React/Vite/Tailwind/shadcn portfolio stack*
*Researched: 2026-08-18*
