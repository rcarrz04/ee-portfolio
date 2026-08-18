# Architecture Research

**Domain:** Personal engineering portfolio — VISUAL DESIGN SYSTEM structure (color, type, layout/spacing), reinterpreted for a light + dark multi-direction exploration on an existing Tailwind + shadcn/ui + CSS-variable theme scaffold. App architecture (routing/data/components) is locked and NOT covered here.
**Researched:** 2026-08-18
**Confidence:** HIGH (mechanics — verified directly against this repo's actual config) / MEDIUM (aesthetic conventions — WebSearch-sourced, cross-referenced across multiple sources)

## Standard "Architecture" for a Design System (Token Layers, Not App Layers)

A distinctive-but-coherent portfolio design system is built as three independent, stacked token layers. Each layer changes at a different rate and should not leak into the others:

```
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 3 — DIRECTION IDENTITY (changes per direction, incl. dark)│
│  ┌───────────────┐  ┌────────────────┐  ┌─────────────────────┐ │
│  │ Color palette  │  │ Type pairing    │  │ Texture/imagery      │ │
│  │ (5-7 tokens)   │  │ (display/body/  │  │ treatment            │ │
│  │                │  │  mono roles)    │  │ (grain, motif, none) │ │
│  └───────┬───────┘  └────────┬────────┘  └──────────┬──────────┘ │
├──────────┴───────────────────┴──────────────────────┴────────────┤
│  LAYER 2 — SEMANTIC TOKENS (shared shape, direction-swappable     │
│             values) — background/foreground/primary/accent/etc.  │
│             Defined as CSS custom properties, HSL triplets.       │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 1 — STRUCTURAL RHYTHM (constant across ALL directions)    │
│  ┌───────────────┐  ┌────────────────┐  ┌─────────────────────┐ │
│  │ Spacing scale  │  │ Container       │  │ Radius/border-width  │ │
│  │ (4/8px steps)  │  │ widths per page │  │ scale                │ │
│  └───────────────┘  └────────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**The key architectural decision this project needs:** Layer 1 (structural rhythm) stays fixed across every direction you mock up, light or dark. Layer 2 (semantic token *names*) also stays fixed — it's the existing shadcn set (`background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `border`, `ring`, `destructive`). Only Layer 3 (the *values* assigned to those names, plus font-family choices) changes per direction. This is what makes exploring 3-4 directions cheap: you're not rewriting component markup per direction, you're swapping a values block.

### Layer Responsibilities

| Layer | Responsibility | Where It Lives in This Repo |
|-------|----------------|------------------------------|
| Structural rhythm | Spacing scale, container max-widths, section padding, radius scale — the "grid" that gives every page consistent vertical/horizontal breathing room regardless of color/type | `tailwind.config.js` (`spacing` is Tailwind's default 4px scale — do not override), page shells (`pt-32 pb-20`, `max-w-5xl` etc. already established per `STRUCTURE.md`) |
| Semantic tokens | Named color/radius roles that components and pages reference (`bg-background`, `text-foreground`, `border-border`) — the indirection layer that makes theming possible at all | `src/index.css` `@layer base` (`--background`, `--foreground`, `--primary`, … as HSL triplets), mapped in `tailwind.config.js` `theme.extend.colors` via `hsl(var(--x))` |
| Direction identity | The actual palette values, font-family assignments, and optional texture/motif that make one direction feel different from another | New: per-direction `:root`-scoped or attribute-scoped variable blocks in `src/index.css`; font-family tokens in `tailwind.config.js` `fontFamily` |

## Current State in This Repo (Verified, Not Assumed)

This matters because it explains *why* pass 1 ("engineering drawing" direction) couldn't respond to a dark toggle, and it's the concrete starting point for the token system:

1. **The shadcn semantic layer already exists and is correctly wired for light/dark.** `src/index.css` defines a full `:root` block (light) and a full `.dark` block (dark) for `--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--muted`, `--accent`, `--border`, `--input`, `--ring`, `--destructive`, plus `--sidebar-*` and `--radius`, all as `H S% L%` triplets consumed via `hsl(var(--x))`. `tailwind.config.js` has `darkMode: ["class"]`. `theme-provider.tsx` toggles a `light`/`dark` class on `<html>` and persists to `localStorage`. **This scaffold is functionally complete and untouched from the shadcn/Lovable default — it has never been exercised** (`App.tsx` hardcodes `defaultTheme="light"`, no toggle UI is rendered anywhere).

2. **Pass 1's actual palette bypassed that layer entirely.** `tailwind.config.js` also defines `paper`, `ink`, `graphite`, `line`, `signal` as flat hardcoded hex strings (`"#F5F5F1"`, `"#14161A"`, etc.) sitting *next to* the semantic `hsl(var(--x))` tokens. Pages use `bg-paper`, `text-ink`, `text-graphite` directly (confirmed via grep across `Home.tsx`, `Navbar.tsx`, `ProjectCard.tsx`, `Projects.tsx`, `ProjectDetail.tsx`, `Resume.tsx`, `Contact.tsx`, `About.tsx`). **These hex utilities do not read CSS variables, so toggling `.dark` on `<html>` would change nothing about the actual rendered page** — the visible palette is a static light-only value baked directly into the Tailwind config, parallel to but disconnected from the theme system. This is the root mechanical reason "unsure if the problem was light vs. dark" is even an open question: dark was never actually possible in pass 1, regardless of whether the *motif* was liked.

3. **Type is currently a single fixed triplet**, not per-direction: `sfpro` (unused), `display: Space Grotesk`, `body: IBM Plex Sans`, `mono: IBM Plex Mono`, applied globally via `font-body` on `body` and `font-display` on `h1-h4` in `index.css`. No mechanism exists yet for a second direction to use different faces.

**Implication:** the fix is not "add a dark palette" — it's "delete the hardcoded hex color layer and route 100% of palette usage for every direction, light or dark, through the existing semantic token names." Once that's true, the shadcn `.dark` scaffold that's already sitting in the config becomes directly usable rather than decorative.

## Recommended Token Structure for Multi-Direction Exploration

```
src/
├── index.css                    # @layer base: semantic CSS custom properties
│   ├── :root { ... }            # DEFAULT direction values (light)
│   ├── .dark { ... }            # DEFAULT direction values (dark) — reuse as-is
│   ├── [data-direction="x"] {}  # ADD: one block per exploration direction
│   └── [data-direction="x"].dark {} # ADD: only needed if a direction ships both modes
├── tailwind.config.js
│   ├── theme.extend.colors      # UNCHANGED shape — background/foreground/primary/etc.
│   │                             #   mapped to hsl(var(--x)) — this is the ONLY color
│   │                             #   vocabulary components should ever use
│   ├── theme.extend.fontFamily  # EXTEND: add direction-scoped font tokens
│   │                             #   (display/body/mono per direction, see below)
│   └── theme.extend.spacing     # DO NOT touch — Tailwind's 4px scale is the shared
│                                  #   structural rhythm across all directions
```

### Structure Rationale

- **One semantic vocabulary, many value sets.** Components and pages should only ever be written against `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`, `bg-accent`, etc. — never against direction-specific names like `bg-paper`. This is what lets you build 3-4 direction mockups without touching JSX more than once (during the final "apply chosen direction across all 5 pages" phase, you're deleting scaffolding, not rewriting markup).
- **Directions are selected by attribute/class on `<html>`, same mechanism as `.dark` already uses.** During the exploration phase this doesn't need real theme-provider wiring — a temporary dev-only switcher (even a hardcoded `data-direction` value swapped by hand while screenshotting each of the 5 pages, or a tiny unlisted `/directions` route with buttons) is enough to produce concrete comparable mockups. Do not build a production multi-theme switcher unless the final requirement is "user can toggle themes" — per `PROJECT.md`, only ONE direction ships; the switching mechanism is scaffolding for comparison, not a shipped feature.
- **`.dark` is not "the dark direction" — it's a mode.** Keep those semantically separate even though one of your 3-4 directions will *be* dark by default. If the winning direction is dark, you can either (a) make its dark values the new `:root` and delete `.dark`, or (b) keep `.dark` as the literal implementation of that direction and set `defaultTheme="dark"` with no toggle exposed. Simplest and recommended: **(a)** — collapse to `:root` once one direction wins, since no toggle is a stated requirement.

## Design Patterns for the Direction Identity Layer

### Pattern 1: Palette Composition (5-7 token roles, not more)

**What:** A distinctive-but-usable portfolio palette needs a small, fixed set of *roles*, not an open list of colors. Verified across shadcn/Radix, Linear, and Vercel conventions (MEDIUM confidence, cross-referenced): `background`, `foreground`, `card`/`surface`, `border`, `muted`/`muted-foreground` (secondary text), and exactly one `accent`/`primary` used sparingly. A rough 60/30/10 ratio (dominant neutral / secondary neutral / accent) keeps any direction from becoming visually noisy — the accent should appear on interactive elements, key labels, or one hero element, not spread across large fills. (MEDIUM confidence — WebSearch cross-referenced, standard design-system convention.)

**When to use:** Every direction, light or dark. Resist adding a second accent color per direction unless one direction's whole identity *is* a duotone/multi-accent treatment (viable as one deliberate direction, not a default).

**Example (semantic values only — this is what changes per direction, not the class names used in JSX):**
```css
/* :root — Direction A, light, warm-neutral */
--background: 40 20% 96%;   /* warm off-white, not pure white */
--foreground: 220 15% 12%;  /* near-black, not pure black */
--card: 40 15% 99%;
--border: 40 10% 85%;
--muted-foreground: 220 8% 42%;
--accent: 19 89% 43%;        /* single accent hue */
--accent-foreground: 40 20% 96%;
```
```css
/* [data-direction="b"].dark — Direction B, dark */
--background: 222 30% 7%;    /* NOT #000 — dark charcoal/navy, ~8-10% lightness */
--foreground: 210 20% 96%;   /* NOT pure #fff — slightly softened */
--card: 222 26% 11%;         /* +3-4 lightness points over background = elevation */
--border: 222 18% 20%;
--muted-foreground: 215 12% 60%;
--accent: 19 85% 55%;        /* often needs to shift lighter/more saturated in dark
                                 mode to hit the same perceived contrast as in light */
```

**Trade-off:** Fixed role vocabulary is slightly less "creative freedom" per direction, but it's what makes 3-4 directions buildable in the available time and keeps every direction dark-mode-*capable* even if you only ship one dark direction.

### Pattern 2: Dark Direction Requires Its Own Value Set, Not an Inversion

**What:** Never generate a dark direction by literally inverting a light palette's lightness values. Multiple independent sources (Smashing Magazine, ColorArchive, onething.design — MEDIUM confidence, consistent across sources) converge on the same rules:
- Base dark background: ~8-12% lightness, slightly desaturated, not `#000000` (avoids "halation"/glow artifacts around light text and harsh edge vibration).
- Elevation via lightness steps, not shadows: card/popover surfaces sit 3-4 lightness points above the base background per elevation level (e.g., background L:10 → card L:14 → popover L:18).
- Text: avoid pure `#FFFFFF` on dark backgrounds — use an off-white (L:92-96%) to soften contrast.
- Accent colors frequently need a *different* saturation/lightness in dark mode than in light mode to read as equally prominent — don't reuse the identical accent HSL value across both `:root` and `.dark` blocks without checking it.
- WCAG AA: 4.5:1 for body text, 3:1 for large text/headings — check both modes independently.

**When to use:** For the dark direction specifically, and for any direction that later gets a dark variant.

**Trade-off:** Requires deliberately authoring a second, independent value set per dark direction rather than a formula/script — more design effort up front, but it's the difference between a dark mode that looks designed vs. one that looks like a CSS filter.

### Pattern 3: Type System — Fixed Roles, Swappable Faces, Shared Scale Ratio

**What:** Keep the existing three-role convention (`font-display` / `font-body` / `font-mono`) as the permanent Layer-2 shape — it already matches the standard portfolio pattern of a distinct headline face, a highly legible body face, and a mono face for meta/labels/code-adjacent accents (common in EE/engineering-flavored portfolios specifically, and already precedented by pass 1's IBM Plex Mono usage). What changes per direction is *which* faces fill those roles and the *scale ratio* between them, not the role structure itself.

Use a modular scale ratio appropriate to how expressive vs. restrained each direction is: 1.25 (major third) for a quieter, UI-like direction; 1.5-1.618 for a more editorial/expressive direction with bigger type contrast. (MEDIUM confidence, standard typographic convention, cross-referenced.) Base body size 16px, body line-height ~1.5.

**When to use:** Every direction defines its own `--font-display`, `--font-body`, `--font-mono` (or equivalent Tailwind `fontFamily.direction-display` keys) plus its own scale ratio — but the *role names* used in JSX (`font-display`, `font-body`, `font-mono`) never change.

**Example:**
```js
// tailwind.config.js — extend, don't replace, per direction candidate
fontFamily: {
  display: ["var(--font-display)"],
  body: ["var(--font-body)"],
  mono: ["var(--font-mono)"],
}
```
```css
[data-direction="a"] {
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'IBM Plex Sans', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
[data-direction="b"] {
  --font-display: 'Fraunces', serif;   /* editorial contrast direction */
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

**Trade-off:** CSS-variable font-family indirection (vs. Tailwind's usual static `fontFamily` keys) costs one extra layer of indirection but is what makes fonts swappable per `data-direction` without touching `tailwind.config.js` per direction.

### Pattern 4: Spacing/Grid Rhythm Stays Constant Across Directions

**What:** The 4px/8px-step spacing scale (Tailwind's default) and the page container widths already established in this codebase (`max-w-5xl` for grids, `max-w-4xl`/`max-w-3xl` for prose-heavy pages, `pt-32 pb-20` section padding) are Layer 1 — structural, not aesthetic. Verified as industry-standard convention (Material Design, IBM Carbon, Fluent, Bootstrap all converge on 8pt-multiple spacing — HIGH confidence, widely documented). This layer should **not** vary between your light and dark direction candidates.

**When to use:** Always. What *can* vary per direction without touching the underlying scale is density (how many spacing steps you use between elements — a "quiet minimal" direction might use larger gaps at the same 8px increments than a "dense technical" direction), not the unit itself.

**Trade-off:** None significant — this is the layer that should feel most "boring" and consistent; it's what makes switching between direction mockups feel like the same site with a different skin, rather than a structurally different layout each time (which would make it hard for Ruben to isolate "is it the palette, the type, or the layout that isn't working" — directly answers the stated confusion from pass 1).

## Data Flow: How a Direction's Token Reaches the Rendered Pixel

```
[data-direction="b"] attribute set on <html>  (dev-time toggle during exploration;
    removed/hardcoded once one direction is chosen)
    ↓
CSS custom property block for that attribute value activates
    (--background, --foreground, --primary, --font-display, etc.)
    ↓
tailwind.config.js theme.extend.colors / fontFamily reference hsl(var(--x)) / var(--font-x)
    — this indirection is what's ALREADY built into shadcn's setup in this repo
    ↓
Component/page JSX uses semantic Tailwind classes only:
    bg-background, text-foreground, bg-card, text-muted-foreground, font-display
    (never bg-paper, text-ink, or other direction-specific literal names)
    ↓
Rendered page reflects whichever direction/mode is active, with zero JSX changes
```

**Key point for the roadmap:** because this flow already exists end-to-end for the shadcn semantic layer, the actual engineering work is (1) deleting/replacing the parallel hardcoded-hex palette from pass 1, (2) authoring N direction value blocks, (3) wiring a temporary comparison mechanism, not building new plumbing.

## Scaling Considerations (Reinterpreted: N Directions × 5 Pages, Not Traffic)

| Scale | Approach |
|-------|----------|
| 1 direction fully speculative (today) | Author values directly in `:root`/`.dark`, iterate live in the app — no attribute-switching scaffolding needed yet. |
| 3-4 direction candidates for comparison | Add `[data-direction="x"]` blocks in `index.css`, a minimal dev-only switcher (button row or manual attribute edit), and render a representative subset of pages (Home + one content-heavy page like About, + Projects grid) under each — full 5-page mockups per direction is likely overkill for the *comparison* step; reserve full 5-page implementation for the winner. |
| 1 winning direction, all 5 pages | Collapse to a single `:root` (+ `.dark` only if the winner is dark and you want the scaffold literally reused), delete the other `data-direction` blocks and any now-dead hardcoded hex Tailwind colors (`paper`/`ink`/`graphite`/`line`/`signal`), sweep all pages/components to confirm zero literal-hex-color Tailwind classes remain. |

### Priorities in Order

1. **First thing that breaks if skipped:** authoring 3-4 directions as literal hardcoded classes per page (repeating pass 1's mistake at 4x the scale) — always route through the semantic token layer described above, even during rough exploration, or comparison becomes expensive and the eventual "apply everywhere" phase turns into a full rewrite instead of a token-value swap.
2. **Second:** picking the dark direction's palette by inverting the light one instead of authoring it independently — produces a dark mode that looks like a browser dark-mode extension result, not a designed direction. Treat it as its own Pattern-2 exercise.

## Anti-Patterns

### Anti-Pattern 1: Parallel Hardcoded Palette Next to the Semantic Token System

**What people do (this repo, pass 1):** Define a flat, literal color palette (`paper`, `ink`, `graphite`, `line`, `signal`) directly in `tailwind.config.js` as hex strings, alongside the shadcn `hsl(var(--x))` semantic tokens, and use the literal names in JSX.
**Why it's wrong:** Breaks dark mode entirely (no CSS variable to swap), makes every direction change a full find-and-replace across every page instead of a values-block edit, and duplicates the token system rather than extending it.
**Do this instead:** Every color used anywhere in JSX should resolve through a semantic Tailwind class backed by a CSS custom property. If a direction needs a role the current shadcn set doesn't have (e.g., a distinct "highlight" separate from "accent"), add it as a new semantic token (`--highlight` + `highlight` in `theme.extend.colors`) — don't reach for a literal hex utility class.

### Anti-Pattern 2: Inverting Lightness for Dark Mode Instead of Authoring It

**What people do:** Take the light palette's HSL values and flip the L (lightness) channel to get a "dark" palette.
**Why it's wrong:** Produces washed-out or overly harsh results — accents that read fine in light mode often look either invisible or neon in a naive inversion; pure-white-on-pure-black-adjacent inversions cause halation; elevation (card vs. background) disappears because both scaled the same way.
**Do this instead:** Author the dark direction's `:root`/`.dark` block as its own design decision — start from a dark base (~L:8-12%, desaturated), build up 2-3 elevation steps, then pick text and accent values that hit WCAG AA against *that* background independently.

### Anti-Pattern 3: Letting Layout/Spacing Vary Per Direction

**What people do:** Treat "direction" as encompassing layout structure too — different grid columns, different section order, different container widths per mockup.
**Why it's wrong:** Given the stated confusion ("unsure if it was the light/minimal premise or the schematic motifs"), varying layout alongside color/type per direction reintroduces the same ambiguity for pass 2 — if a direction fails, you won't know if it was the palette, the type, or the structure.
**Do this instead:** Hold Layer 1 (spacing scale, container widths, section rhythm) constant across every direction candidate. Let only color, type, and optionally a texture/motif accent vary. This isolates the variable that's actually being tested this milestone.

### Anti-Pattern 4: Building a Production Theme-Switcher UI for a Single-Direction Ship

**What people do:** Since the `.dark` class + `theme-provider.tsx` scaffold already exists, over-invest in wiring a full light/dark toggle button, system-preference detection polish, etc.
**Why it's wrong:** `PROJECT.md` states only ONE direction ships, fully, across all 5 pages — no toggle is a requirement. Building a real switcher is scope creep relative to this milestone's actual goal (pick one direction, implement it everywhere).
**Do this instead:** Use `data-direction`/`.dark` attribute-swapping only as a *development-time comparison tool*. Once a direction is chosen, hardcode its values into `:root` (and `.dark` only if literally needed) and consider deleting the switcher scaffolding — it can be revisited as a real feature in a future milestone if ever desired.

## Integration Points

### External Services
None — this is a static, no-backend visual redesign; no integration points beyond Google Fonts (already loaded via `index.html` per `STRUCTURE.md`) and GitHub Pages static hosting, both out of scope for this research.

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `index.css` (CSS custom properties) ↔ `tailwind.config.js` (`theme.extend.colors`/`fontFamily`) | `hsl(var(--x))` / `var(--font-x)` references | This indirection already exists correctly for the shadcn semantic set; extend it, don't parallel it, for any new token needed by a direction. |
| `tailwind.config.js` semantic classes ↔ page/component JSX | Tailwind utility class names (`bg-background`, `font-display`, etc.) | JSX should never reference a direction-specific literal name; this is what keeps the "apply winning direction to all 5 pages" step cheap. |
| `theme-provider.tsx` (`.dark`/`.light` class on `<html>`) ↔ CSS `.dark` block | DOM class toggle read by CSS selector | Already wired end-to-end but unexercised (`defaultTheme="light"` hardcoded, no toggle rendered) — reusable as-is for a dark direction's implementation if desired, or safely ignorable if the winning direction handles its own scoping via a hardcoded `:root`. |

## Sources

- [Dark Mode Color Palettes for Modern Websites — Colorhero](https://colorhero.io/blog/dark-mode-color-palettes-2025) — MEDIUM confidence
- [Best Color Palettes for Developer Portfolios (2025) — webportfolios.dev](https://www.webportfolios.dev/blog/best-color-palettes-for-developer-portfolio) — MEDIUM confidence
- [Inclusive Dark Mode: Designing Accessible Dark Themes — Smashing Magazine, 2025](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/) — MEDIUM-HIGH confidence (reputable publication, recent)
- [Dark Mode Color Design: Building a System, Not Just an Inversion — ColorArchive](https://colorarchive.org/guides/dark-mode-color-design-guide/) — MEDIUM confidence
- [10 Best Practices for Dark Mode UI Design — onething.design](https://www.onething.design/post/best-practices-for-dark-mode-ui-design) — MEDIUM confidence
- [shadcn/ui Theming Best Practices: CSS Variables vs Tailwind Config](https://www.paulserban.eu/blog/post/shadcnui-theming-best-practices-css-variables-vs-tailwind-config/) — MEDIUM confidence
- [Use CSS variables to simplify creating dark theme — shadcn-ui/ui GitHub Issue #52](https://github.com/shadcn-ui/ui/issues/52) — MEDIUM-HIGH confidence (maintainer/community discussion on the actual library)
- [Typography System Design: Building Type Scales — Figr](https://figr.design/blog/typography-system-design) — MEDIUM confidence
- [Best Font Pairings for Designer Portfolios in 2026 — The Crit](https://thecrit.co/resources/best-font-pairings-portfolio) — MEDIUM confidence
- [The 8pt Grid System: A Simple Guide to Consistent UI Spacing](https://www.rejuvenate.digital/news/designing-rhythm-power-8pt-grid-ui-design) — HIGH confidence (widely corroborated industry convention: Material Design, IBM Carbon, Fluent, Bootstrap)
- [The 60-30-10 Color Rule in Web Design Explained — brandhouse.marketing](https://brandhouse.marketing/the-60-30-10-color-rule-in-web-design/) — MEDIUM confidence
- Direct repo inspection (HIGH confidence — primary source): `tailwind.config.js`, `src/index.css`, `src/components/theme-provider.tsx`, `src/App.tsx`, `.planning/codebase/STRUCTURE.md`

---
*Architecture research for: personal engineering portfolio visual design system (light + dark direction support)*
*Researched: 2026-08-18*
