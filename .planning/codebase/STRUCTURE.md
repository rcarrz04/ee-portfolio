# Codebase Structure

**Analysis Date:** 2026-08-18

## Directory Layout

```
ee-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml         # CI: build + deploy to GitHub Pages on push to main
├── assets/                    # Stray root-level build artifact (NOT src or public — see note below)
│   ├── index-_z7Crv3b.js
│   └── index-7KsDh9wq.css
├── public/                    # Static files served as-is; copied into dist/ during CI build
│   ├── *.png / *.jpg / *.JPG / *.JPEG / *.svg   # Project + profile images
│   ├── *.pdf                  # Resume(s) and project reports, embedded via <iframe>
│   ├── favicon.ico, robots.txt, .nojekyll
│   └── placeholder.svg
├── src/
│   ├── main.tsx                # React root bootstrap (entry point)
│   ├── App.tsx                 # Providers + HashRouter + route table + global chrome
│   ├── App.css                 # Legacy CRA-style leftover CSS (check before assuming it's used)
│   ├── index.css               # Global Tailwind directives + CSS custom-property design tokens
│   ├── vite-env.d.ts           # Vite client type reference
│   ├── components/
│   │   ├── Navbar.tsx           # Global nav bar (desktop + mobile menu)
│   │   ├── ProjectCard.tsx      # Project summary tile (used on Home + Projects pages)
│   │   ├── theme-provider.tsx   # Light/dark theme context + localStorage persistence
│   │   └── ui/                  # shadcn/ui generated primitives (~50 files, mostly unused)
│   │       ├── aspect-ratio.tsx  # USED (ProjectDetail image framing)
│   │       ├── sonner.tsx        # USED (App.tsx Toaster)
│   │       └── ...               # button, card, dialog, sidebar, form, table, etc. — not imported anywhere in pages/components
│   ├── data/
│   │   ├── profile.ts           # profile, education, experience[], skills — About/Contact/Home content
│   │   └── projects.ts          # Project interface, projects[] array, getProject(id) helper
│   ├── hooks/
│   │   ├── use-mobile.tsx       # useIsMobile() breakpoint hook (only consumed by ui/sidebar.tsx, itself unused)
│   │   └── use-toast.ts         # useToast() imperative toast queue (backs unused ui/toast.tsx + ui/toaster.tsx)
│   ├── lib/
│   │   └── utils.ts             # cn() — clsx + tailwind-merge class composer
│   ├── pages/
│   │   ├── Home.tsx             # Route "/" — hero + featured projects grid
│   │   ├── About.tsx            # Route "/about" — bio, education, experience, skills
│   │   ├── Projects.tsx         # Route "/projects" — full project grid
│   │   ├── ProjectDetail.tsx    # Route "/projects/:id" — single project deep-dive
│   │   ├── Resume.tsx           # Route "/resume" — embedded resume PDF + download link
│   │   ├── Contact.tsx          # Route "/contact" — contact links + photo
│   │   ├── Index.tsx            # ORPHAN — not routed; shadcn/Lovable starter boilerplate
│   │   └── NotFound.tsx         # ORPHAN — not routed; no catch-all route exists in App.tsx
│   └── types/
│       └── images.d.ts          # Module declarations for *.jpg/.jpeg/.JPEG/.png/.svg imports
├── components.json              # shadcn/ui CLI config (aliases, style, Tailwind wiring)
├── eslint.config.js             # Flat ESLint config (TS + react-hooks + react-refresh)
├── index.html                   # HTML shell; loads /src/main.tsx; sets favicon to /ee-portfolio/favicon.ico
├── package.json                 # Scripts: dev, build, lint, preview
├── postcss.config.js            # Tailwind + autoprefixer pipeline
├── tailwind.config.js            # Tailwind theme extension (design tokens, fonts, animations)
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json  # TS project references; "@/*" → "./src/*"
├── vite.config.ts               # Vite config: base "/ee-portfolio/", "@" alias, vendor chunk splitting
├── bun.lockb / package-lock.json  # Both a Bun and an npm lockfile are present (see below)
└── README.md                     # Lovable.dev-generated starter README (not portfolio-specific)
```

## Directory Purposes

**`src/pages/`:**
- Purpose: One file per top-level route, default-exported React component.
- Contains: Full page layout JSX, Tailwind classes, direct imports from `src/data/`.
- Key files: `Home.tsx`, `About.tsx`, `Projects.tsx`, `ProjectDetail.tsx`, `Resume.tsx`, `Contact.tsx` are live/routed. `Index.tsx` and `NotFound.tsx` are present but not wired into `src/App.tsx` — do not assume they run.

**`src/components/`:**
- Purpose: Reusable, hand-written, portfolio-specific components shared across pages.
- Contains: `Navbar.tsx`, `ProjectCard.tsx`, `theme-provider.tsx`. Nothing else lives at this top level — page-specific one-off markup stays inline in the page file rather than being extracted here.
- Key files: `Navbar.tsx` (global nav), `ProjectCard.tsx` (project tile).

**`src/components/ui/`:**
- Purpose: shadcn/ui-generated Radix UI wrapper library, installed via the shadcn CLI (see `components.json`).
- Contains: ~50 primitive components (button, card, dialog, sidebar, form, table, carousel, chart, etc.).
- Key files: Only `aspect-ratio.tsx` and `sonner.tsx` are actually imported by the app. Treat the rest as available-but-unverified scaffold — grep for existing usage before relying on one.

**`src/data/`:**
- Purpose: Single source of truth for all site content (no CMS, no API).
- Contains: `profile.ts` (bio/education/experience/skills), `projects.ts` (`Project` interface + `projects[]` + `getProject(id)`).
- Key files: `profile.ts`, `projects.ts`.

**`src/hooks/`:**
- Purpose: Custom React hooks.
- Contains: `use-mobile.tsx` (breakpoint detection, only used by the unused `ui/sidebar.tsx`), `use-toast.ts` (toast queue state machine backing the unused `ui/toast.tsx`/`ui/toaster.tsx` — the app actually uses `sonner` for toasts, wired in `src/App.tsx`).

**`src/lib/`:**
- Purpose: Small framework-agnostic utilities.
- Contains: `utils.ts` — just the `cn()` Tailwind class-merge helper.

**`src/types/`:**
- Purpose: Ambient TypeScript module declarations.
- Contains: `images.d.ts` — declares typed default exports for `.jpg`/`.jpeg`/`.JPEG`/`.png`/`.svg` imports (note: project images are actually referenced by string path from `public/`, not `import`ed as modules — this declaration file is a shadcn/Vite-template default, no current `.tsx` file imports an image as a module).

**`public/`:**
- Purpose: Static assets copied byte-for-byte into `dist/` on build (via CI: `cp -r public/* dist/`, not via Vite's `publicDir` alone — see `.github/workflows/deploy.yml`).
- Contains: All project photos, headshot, resume PDFs, project report PDFs, favicon, `robots.txt`, `.nojekyll` (disables Jekyll processing on GitHub Pages).
- Generated: No. Committed: Yes.
- Note: files here are referenced elsewhere with the full `/ee-portfolio/<filename>` prefix (matching `vite.config.ts`'s `base`), not `/<filename>` or Vite's `import.meta.env.BASE_URL` — the prefix is hardcoded as a literal string in `src/data/projects.ts`, `src/pages/Resume.tsx`, `src/pages/Home.tsx`, and `src/pages/Contact.tsx`.

**`assets/` (repo root):**
- Purpose: Unclear / stray. Contains two hashed files (`index-_z7Crv3b.js`, `index-7KsDh9wq.css`) that look like a leftover Vite production build output, but sit outside both `src/` and `public/` and are not referenced by `index.html` or any config.
- Generated: Likely yes (hashed filenames match Vite's build output naming pattern). Committed: Yes (currently tracked at repo root — verify before treating as safe to ignore/delete).

**`.github/workflows/`:**
- Purpose: CI/CD.
- Contains: `deploy.yml` — builds with Node 20 + npm, force-reinstalls `vite@4.5.2`, runs `npm run build`, copies `public/*` into `dist/`, deploys `dist/` to GitHub Pages.

## Key File Locations

**Entry Points:**
- `index.html`: HTML shell, sets `<title>`, favicon, Google Fonts links, mounts `#root`, loads `/src/main.tsx`.
- `src/main.tsx`: React root creation and `<App />` render.

**Configuration:**
- `vite.config.ts`: Build config — `base: "/ee-portfolio/"`, `@` → `src` alias, manual vendor chunking, `outDir: "dist"`.
- `tailwind.config.js`: Design token extension (colors, fonts, radius, animations) consumed by all Tailwind class names across `src/`.
- `components.json`: shadcn/ui CLI config — defines the `@/components`, `@/lib`, `@/hooks`, `@/ui` aliases used when generating new `ui/` primitives.
- `tsconfig.json` (+ `tsconfig.app.json`, `tsconfig.node.json`): TS project references; `@/*` path alias mirrors the Vite alias.
- `eslint.config.js`: Flat-config ESLint (TypeScript + `react-hooks` + `react-refresh` plugins).
- `postcss.config.js`: Tailwind + autoprefixer plugin pipeline.

**Core Logic:**
- `src/App.tsx`: Route table — the map of URL path → page component. Add new routes here.
- `src/data/profile.ts`, `src/data/projects.ts`: All editable site content lives here, not in JSX.

**Testing:**
- Not applicable — no test framework, test files, or test scripts are configured in this repo (`package.json` has no `test` script; no `*.test.*`/`*.spec.*` files exist).

## Naming Conventions

**Files:**
- Page components: PascalCase matching the route/page name, e.g. `About.tsx`, `ProjectDetail.tsx` — always default-exported as a same-named `const`.
- Shared components: PascalCase, e.g. `Navbar.tsx`, `ProjectCard.tsx`.
- shadcn/ui primitives: kebab-case matching the Radix/shadcn source name, e.g. `aspect-ratio.tsx`, `dropdown-menu.tsx` — this is the shadcn CLI's own convention, distinct from the PascalCase convention used elsewhere in `src/`.
- Hooks: kebab-case prefixed with `use-`, e.g. `use-mobile.tsx`, `use-toast.ts` (again, shadcn/CLI convention — matches upstream shadcn/ui hook file naming).
- Data modules: lowercase, e.g. `profile.ts`, `projects.ts`.
- Type declaration files: `*.d.ts`, e.g. `images.d.ts`, `vite-env.d.ts`.

**Directories:**
- All lowercase, singular-or-plural matching contents: `pages/` (plural — one file per route), `components/` (plural), `data/` (singular collective), `hooks/` (plural), `lib/` (singular collective), `types/` (plural).

**Exports:**
- Page and shared components: single `export default` per file, function component defined as `const Name = () => {...}`.
- Data modules: multiple named exports (`export const profile = ...`, `export const projects: Project[] = ...`, `export const getProject = ...`) — no default export.
- UI primitives: multiple named exports per file (shadcn convention), e.g. `export { Card, CardHeader, CardContent, ... }`.

## Where to Add New Code

**New page/route:**
1. Create `src/pages/NewPage.tsx` following the existing page shell pattern: `<div className="min-h-screen bg-paper pt-32 pb-20"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"> ... </div></div>` (match the `max-w-*` used by sibling pages — 5xl for grids, 4xl/3xl for prose-heavy pages).
2. Register it in `src/App.tsx`: add `import NewPage from "@/pages/NewPage";` and `<Route path="/new-path" element={<NewPage />} />` inside `<Routes>`.
3. Add a nav entry to `src/components/Navbar.tsx`'s `links` array if it should appear in the nav bar.

**New shared component:**
- Portfolio-specific, reusable across ≥2 pages → `src/components/ComponentName.tsx` (PascalCase, default export), alongside `Navbar.tsx`/`ProjectCard.tsx`.
- Generic UI primitive (button variant, new Radix wrapper) → generate via shadcn CLI into `src/components/ui/` (kebab-case), or hand-check an existing unused file there first — many primitives (button, card, badge, tabs, etc.) already exist but are unwired; verify with `grep -rn "components/ui/<name>" src/pages src/components/*.tsx` before adding a duplicate.

**New project entry:**
- Add an object to the `projects` array in `src/data/projects.ts` matching the `Project` interface. Place project images/PDFs in `public/` and reference them as `"/ee-portfolio/<filename>"` (must match the literal base-path prefix used by every other asset reference in this file).

**New profile content (bio/education/experience/skills):**
- Edit the relevant exported const in `src/data/profile.ts` directly — `experience` is an array of `ExperienceItem`, `skills` is a `Record<string, string[]>` keyed by category.

**Utilities:**
- Framework-agnostic helpers → `src/lib/utils.ts` (currently only holds `cn()`; add new pure functions here rather than inline in components).
- React hooks → `src/hooks/` following the `use-kebab-case.tsx` naming used by `use-mobile.tsx`/`use-toast.ts`.

**Global styling/design tokens:**
- New Tailwind color/font/radius tokens → `tailwind.config.js` `theme.extend`, backed by CSS custom properties defined in `src/index.css` `@layer base`.

## Special Directories

**`src/components/ui/`:**
- Purpose: Generated shadcn/ui component library.
- Generated: Yes (via `npx shadcn add <component>`, configured by `components.json`).
- Committed: Yes.
- Caution: Mostly unused by the current app (see ARCHITECTURE.md Anti-Patterns) — safe to draw from, but confirm any given file is not already dead weight before building new features on top of it.

**`public/`:**
- Purpose: Static asset passthrough.
- Generated: No (hand-placed images/PDFs).
- Committed: Yes.

**`assets/` (repo root):**
- Purpose: Unclear stray build output (see Directory Purposes above).
- Generated: Likely yes.
- Committed: Yes — flag for cleanup review; not part of the standard Vite `src/`/`public/` structure and not referenced anywhere in the codebase.

**`.planning/`:**
- Purpose: GSD planning/codebase-map artifacts (this document lives here).
- Generated: Yes (by GSD tooling).
- Committed: Project-dependent.

**Dual lockfiles (`bun.lockb` + `package-lock.json`):**
- Both a Bun lockfile and an npm lockfile are committed at the repo root. `.github/workflows/deploy.yml` explicitly deletes `package-lock.json` and reinstalls with npm during CI (`rm -f package-lock.json && npm install`), so the committed `package-lock.json` is not actually what CI builds from. Prefer npm locally to match CI unless intentionally switching the whole project to Bun.

---

*Structure analysis: 2026-08-18*
