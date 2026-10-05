<!-- refreshed: 2026-08-18 -->
# Architecture

**Analysis Date:** 2026-08-18

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│  Entry: index.html → src/main.tsx                            │
│  Mounts <App /> into #root (React 18 createRoot + StrictMode) │
└───────────────────────────┬───────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  App Shell — `src/App.tsx`                                   │
│  QueryClientProvider → ThemeProvider → HashRouter → Routes    │
│  Renders Navbar + <Route> outlet + Toaster on every route     │
└───────────────────────────┬───────────────────────────────────┘
                             ▼
┌───────────────────────────────────────────────────────────────┐
│                   Page Layer — `src/pages/*.tsx`               │
│  Home │ About │ Projects │ ProjectDetail │ Resume │ Contact     │
│  One component per route; owns page-level layout & copy        │
└───────────┬───────────────────────────────────┬─────────────────┘
            ▼                                   ▼
┌─────────────────────────┐        ┌─────────────────────────────┐
│  Shared Components        │        │  Static Data Layer            │
│  `src/components/*.tsx`   │◄───────│  `src/data/profile.ts`        │
│  Navbar, ProjectCard,     │  reads │  `src/data/projects.ts`       │
│  theme-provider           │        │  (plain exported consts/arrays)│
└───────────┬───────────────┘        └─────────────────────────────┘
            ▼
┌─────────────────────────────────────────────────────────────┐
│  UI Primitives — `src/components/ui/*.tsx` (shadcn/ui)       │
│  Radix-based primitives + `src/lib/utils.ts` (cn helper)      │
│  Only 2 of ~50 files are actually imported by app code         │
│  (aspect-ratio.tsx, sonner.tsx) — rest is unused scaffold      │
└─────────────────────────────────────────────────────────────┘
                             ▲
┌─────────────────────────────────────────────────────────────┐
│  Static Assets — `public/*` (images, PDFs) served at          │
│  base path `/ee-portfolio/` (see vite.config.ts `base`)       │
│  Referenced by absolute string paths inside data files         │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| App shell | Wires providers (React Query, Theme, Router) and renders global chrome (Navbar, Toaster) around routed pages | `src/App.tsx` |
| Navbar | Global nav bar, active-link highlighting, mobile hamburger menu | `src/components/Navbar.tsx` |
| ThemeProvider | Light/dark theme context, persists choice to `localStorage`, toggles `<html>` class | `src/components/theme-provider.tsx` |
| ProjectCard | Renders one project summary tile, links to detail page | `src/components/ProjectCard.tsx` |
| Home page | Landing/hero section + featured projects grid (all projects, animated) | `src/pages/Home.tsx` |
| About page | Bio, education, experience, skills — all sourced from `src/data/profile.ts` | `src/pages/About.tsx` |
| Projects page | Full project grid | `src/pages/Projects.tsx` |
| ProjectDetail page | Single project deep-dive by `:id` route param, renders images/report iframe | `src/pages/ProjectDetail.tsx` |
| Resume page | Embeds resume PDF in an iframe + download link | `src/pages/Resume.tsx` |
| Contact page | Contact links (mailto/LinkedIn/GitHub) + a personal photo | `src/pages/Contact.tsx` |
| Profile data | Bio, education, experience, skills as typed consts | `src/data/profile.ts` |
| Project data | `Project` interface, `projects` array, `getProject(id)` lookup helper | `src/data/projects.ts` |
| UI primitives | shadcn/ui component scaffold (Radix wrappers styled with Tailwind + CVA) | `src/components/ui/*.tsx` |
| Style/util helper | `cn()` — merges Tailwind classes via `clsx` + `tailwind-merge` | `src/lib/utils.ts` |
| Mobile hook | `useIsMobile()` — matchMedia-based breakpoint hook (used by `sidebar.tsx` only) | `src/hooks/use-mobile.tsx` |
| Toast hook | `useToast()` — imperative toast queue state machine backing `toast.tsx`/`toaster.tsx` (unused by app pages; app uses `sonner` instead) | `src/hooks/use-toast.ts` |

## Pattern Overview

**Overall:** Static single-page portfolio site. Client-side routed React SPA with **no backend, no API calls, and no persisted app state** — all content is hardcoded TypeScript data modules bundled at build time.

**Key Characteristics:**
- Page-per-route component pattern (`src/pages/`) rendered by `react-router-dom`'s `<Routes>`.
- Content/data fully separated from presentation: `src/data/*.ts` holds all copy (bio, project descriptions, skills) as typed constants; pages import and render it directly — no CMS, no fetch, no loaders.
- Component layer split into two tiers: hand-written page-specific components (`src/components/*.tsx`) vs. generated shadcn/ui primitive library (`src/components/ui/*.tsx`).
- `@tanstack/react-query`'s `QueryClientProvider` and `sonner`'s `Toaster` are wired into the app shell but unused by any page — vestigial scaffold from the shadcn/Lovable starter template (see README.md: project originated on lovable.dev). No `useQuery`/`useMutation` calls exist anywhere in `src/`.
- Client-only routing via `HashRouter` (not `BrowserRouter`) — required because the site is deployed as a static bundle to GitHub Pages, which has no server-side rewrite rules for client routes. URLs look like `https://<user>.github.io/ee-portfolio/#/projects`.

## Layers

**Entry/Bootstrap:**
- Purpose: Mount the React tree into the DOM.
- Location: `index.html`, `src/main.tsx`
- Contains: `ReactDOM.createRoot(...).render(<App />)` inside `React.StrictMode`.
- Depends on: `src/App.tsx`, `src/index.css` (global Tailwind styles).
- Used by: Vite dev server / static build.

**App Shell:**
- Purpose: Global providers and routing table.
- Location: `src/App.tsx`
- Contains: `QueryClientProvider`, `ThemeProvider`, `HashRouter`, `<Routes>` table, persistent `Navbar` + `Toaster`.
- Depends on: page components, `Navbar`, `theme-provider`, `ui/sonner`.
- Used by: `src/main.tsx`.

**Pages:**
- Purpose: One component per route, owns page layout, section structure, and copy composition.
- Location: `src/pages/*.tsx`
- Contains: JSX layout, Tailwind utility classes, Framer Motion animation variants, data imports.
- Depends on: `src/data/*.ts`, `src/components/*.tsx`, `src/components/ui/*.tsx` (rarely), `lucide-react` icons.
- Used by: `src/App.tsx` route table.

**Shared Components:**
- Purpose: Cross-page reusable pieces (nav, project card, theme context).
- Location: `src/components/*.tsx` (top level, not `ui/`)
- Depends on: `src/lib/utils.ts`, `src/data/projects.ts` (via prop types), `react-router-dom`.
- Used by: `src/App.tsx`, page components.

**UI Primitives (shadcn/ui):**
- Purpose: Generic, unstyled-then-styled Radix UI wrapper components generated by the shadcn CLI (`components.json`).
- Location: `src/components/ui/*.tsx`
- Contains: Button, Card, Dialog, Sidebar, Toast, Form, etc. — ~50 files.
- Depends on: `@radix-ui/*` packages, `class-variance-authority`, `src/lib/utils.ts`.
- Used by: **Only `aspect-ratio.tsx` (ProjectDetail) and `sonner.tsx` (App)** are imported by application code. The remainder is unused generated scaffold — do not assume a component here is wired up; verify with a grep before depending on it in a new feature.

**Data Layer:**
- Purpose: Single source of truth for all site copy and project metadata.
- Location: `src/data/profile.ts`, `src/data/projects.ts`
- Contains: plain exported `const` objects/arrays and TypeScript interfaces (`ExperienceItem`, `Project`), plus a `getProject(id)` lookup helper.
- Depends on: nothing (pure data + types).
- Used by: `Home`, `About`, `Projects`, `ProjectDetail`, `Contact`, `ProjectCard`.

**Static Assets:**
- Purpose: Images, PDFs (resume, project reports) served as-is.
- Location: `public/*` (source of truth) — copied verbatim into `dist/` during CI build (`.github/workflows/deploy.yml` runs `cp -r public/* dist/`).
- Referenced: by absolute path strings hardcoded in `src/data/*.ts` and page JSX, always prefixed with `/ee-portfolio/` (the Vite `base` — see vite.config.ts) e.g. `"/ee-portfolio/vr_glove.JPG"`.
- Note: a duplicate `assets/` directory exists at the repo root (`assets/index-*.js`, `assets/index-*.css`) — this looks like a stray prior build artifact, not part of `src/` or `public/`, and is not referenced by `index.html` (which points at `/src/main.tsx` for dev and Vite's own hashed build output for prod).

## Data Flow

### Primary Request Path (page render)

1. Browser loads `index.html`, which loads `src/main.tsx` as a module script.
2. `main.tsx` renders `<App />` into `#root` (`src/main.tsx:6-10`).
3. `App.tsx` sets up `QueryClientProvider` → `ThemeProvider` → `HashRouter`, then matches the current hash path against the `<Routes>` table (`src/App.tsx:22-29`).
4. Matched page component (e.g., `Projects.tsx`) imports data directly from `src/data/projects.ts` at module load time (`src/pages/Projects.tsx:2`) and renders it synchronously — no loading state, no async fetch.
5. Page composes shared components (e.g., `ProjectCard`) and shadcn UI primitives as needed, styled entirely with Tailwind utility classes plus CSS custom properties defined in `src/index.css`.

### Project Detail Flow

1. User clicks a `ProjectCard` link → `Link to={"/projects/" + project.id}` (`src/components/ProjectCard.tsx:6`).
2. `react-router-dom` matches `/projects/:id` → renders `ProjectDetail` (`src/App.tsx:26`).
3. `ProjectDetail` reads `id` via `useParams()` and calls `getProject(id)` (`src/pages/ProjectDetail.tsx:7-8`, `src/data/projects.ts:79`) — a linear `Array.find` over the in-memory `projects` array.
4. If no match, renders an inline "Project not found." message (no dedicated 404 route is wired for this case; see Anti-Patterns).
5. Otherwise renders overview/skills/course text, `detailImages` (or falls back to `project.image`) via the `AspectRatio` primitive, and an optional embedded PDF report `<iframe>`.

**State Management:**
- No global app state / store. All "state" is either: (a) static imported data (`src/data/*.ts`), (b) local component `useState` (e.g., `Navbar`'s mobile menu `isOpen`, `theme-provider`'s `theme`), or (c) URL state via `react-router-dom` (`useParams`, `useLocation`).
- `ThemeProvider` persists a single value (`theme`) to `localStorage` under key `vite-ui-theme`; `App.tsx` sets `defaultTheme="light"` (`src/App.tsx:18`).

## Key Abstractions

**`Project` (data model):**
- Purpose: Typed shape for all portfolio project entries — the only real "domain model" in the app.
- Examples: `src/data/projects.ts:1-14` (interface), `src/data/projects.ts:16-77` (4 instances).
- Pattern: Required fields (`id`, `tag`, `title`, `image`, `date`, `course`, `skills`, `overview`, `description`) + optional fields (`status`, `detailImages`, `report`) consumed conditionally by `ProjectCard` and `ProjectDetail`.

**Page component:**
- Purpose: One React function component per route, default-exported, named to match the route/page.
- Examples: `src/pages/Home.tsx`, `src/pages/About.tsx`, `src/pages/Projects.tsx`, `src/pages/ProjectDetail.tsx`, `src/pages/Resume.tsx`, `src/pages/Contact.tsx`.
- Pattern: `const PageName = () => { return (<div className="min-h-screen bg-paper pt-32 pb-20"> ... </div>); }; export default PageName;` — every page shares the `bg-paper`/`pt-32`/`max-w-*` shell wrapper convention (no shared `<Layout>` component exists; each page repeats it — see Anti-Patterns).

**`cn()` helper:**
- Purpose: Compose conditional Tailwind class strings without collisions.
- Location: `src/lib/utils.ts`
- Pattern: `cn(...inputs) = twMerge(clsx(inputs))`, used throughout `src/components/ui/*` and `Navbar.tsx`.

## Entry Points

**Browser entry:**
- Location: `index.html` → `src/main.tsx`
- Triggers: page load in browser (or Vite dev server).
- Responsibilities: mount React root.

**Dev server:**
- Location: `vite dev` (via `npm run dev`, `package.json`)
- Triggers: local development.

**Build entry:**
- Location: `vite build` (via `npm run build`), configured in `vite.config.ts`
- Triggers: CI (`.github/workflows/deploy.yml`) on push to `main`, or manual `workflow_dispatch`.
- Responsibilities: bundles `src/` into `dist/` (base path `/ee-portfolio/`, manual vendor chunk for React/Router/Query/Radix deps), then the workflow copies `public/*` into `dist/` and deploys `dist/` to GitHub Pages via `actions/deploy-pages`.

## Architectural Constraints

- **Threading:** Single-threaded browser execution; no web workers, no server runtime.
- **Global state:** None beyond `ThemeProvider`'s React Context (`src/components/theme-provider.tsx:21`) and `localStorage` for theme persistence. No Redux/Zustand/Context-based data store.
- **Circular imports:** None detected.
- **Routing mode:** Must remain `HashRouter` (`src/App.tsx:1`) as long as the site is statically hosted on GitHub Pages without a rewrite rule for `BrowserRouter`-style deep links.
- **Base path coupling:** All static asset URLs in `src/data/*.ts` and page JSX are hardcoded with the `/ee-portfolio/` prefix (matching `vite.config.ts`'s `base`). Changing the deployment base path requires updating every hardcoded asset string, not just `vite.config.ts` — there is no central asset-path helper.

## Anti-Patterns

### Orphan boilerplate pages

**What happens:** `src/pages/Index.tsx` ("Welcome to Your Blank App") and `src/pages/NotFound.tsx` (404 page with `console.error` + plain `<a href="/">` link) exist in `src/pages/` but are never imported or routed in `src/App.tsx`. There is also no catch-all (`path="*"`) route at all — unmatched hash paths currently render nothing inside the `<Routes>` outlet (only `Navbar` + empty `<Routes>` + `Toaster` show).
**Why it's wrong:** Dead code that looks like it's wired up (misleads future edits into thinking 404 handling exists), and there's no actual fallback UI for unmatched routes.
**Do this instead:** Either delete `Index.tsx`/`NotFound.tsx` if truly unused, or wire `NotFound` in as `<Route path="*" element={<NotFound />} />` in `src/App.tsx` and delete `Index.tsx` (Lovable/shadcn starter leftover, not portfolio content).

### Repeated page shell markup

**What happens:** Every page component repeats the same wrapper: `<div className="min-h-screen bg-paper pt-32 pb-20"><div className="max-w-{5xl|4xl|3xl} mx-auto px-4 sm:px-6 lg:px-8"> ... </div></div>` (see `src/pages/Projects.tsx:6-7`, `src/pages/About.tsx:6`, `src/pages/Resume.tsx:7-8`, `src/pages/Contact.tsx:12-13`).
**Why it's wrong:** Any global layout tweak (padding, max-width scale, background) requires editing 5-6 files identically; easy to drift/miss one.
**Do this instead:** Extract a shared `<PageShell>` or `<Layout>` component (or a route-level layout wrapping `<Outlet />`) if another page is added or the shell needs to change.

### Unused shadcn/ui scaffold

**What happens:** `src/components/ui/` contains ~50 generated component files (accordion, calendar, carousel, chart, command, form, menubar, sidebar, table, etc.) but application code only imports 2 of them (`aspect-ratio.tsx`, `sonner.tsx`). `src/hooks/use-toast.ts` (191 lines) backs `toast.tsx`/`toaster.tsx`, which are also unused (the app uses `sonner` for toasts instead, per `src/App.tsx:4,30`).
**Why it's wrong:** Bloats the codebase/bundle-analysis surface and can mislead contributors into thinking these components are live and tested.
**Do this instead:** When adding new UI, check with `grep -rn "components/ui/<name>" src/pages src/components/*.tsx` whether it's already wired in before assuming it's active; feel free to delete unused files if doing cleanup, but this was intentionally left untouched by prior work (Lovable/shadcn starter default) — treat as inherited scaffold, not a bug to silently fix mid-feature.

## Error Handling

**Strategy:** Minimal. This is a static content site with no forms, no network calls, and no data mutations — so there is very little to fail.

**Patterns:**
- `ProjectDetail.tsx` guards against an unknown `:id` param by rendering an inline "Project not found." message (`src/pages/ProjectDetail.tsx:10-16`) rather than redirecting or throwing.
- `NotFound.tsx` logs unmatched routes via `console.error` (`src/pages/NotFound.tsx:8-11`) but, per Anti-Patterns above, is not currently mounted in the router.
- No `try/catch`, no error boundaries, no `.catch()` chains exist anywhere in `src/` — consistent with the absence of async I/O.

## Cross-Cutting Concerns

**Logging:** None in production paths; only `NotFound.tsx`'s dormant `console.error` for unmatched routes.
**Validation:** None — all data is compile-time-typed TypeScript constants (`src/data/*.ts`), not user input.
**Authentication:** Not applicable — public static site, no auth of any kind.
**Styling:** Tailwind CSS utility classes throughout, with a custom design-token palette (`bg-paper`, `text-ink`, `text-graphite`, `text-signal`, `border-line`, `font-display`, `font-mono`) defined via CSS custom properties in `src/index.css` and mapped in `tailwind.config.js`. shadcn/ui's default HSL CSS-variable token set (`--background`, `--primary`, etc.) is also present in `src/index.css` for the (mostly unused) `ui/` component library.
**Animation:** `framer-motion` used directly in page components for fade/slide-in effects (`src/pages/Home.tsx`), not abstracted into a shared animation utility.

---

*Architecture analysis: 2026-08-18*
