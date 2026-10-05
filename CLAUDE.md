<!-- GSD:project-start source:PROJECT.md -->
## Project

**Ruben Carrazco — Portfolio Visual Redesign**

A personal portfolio site for Ruben Carrazco, an EE student at Stanford (Hardware + Software track), showcasing his projects (VR glove, AC-DC converter, FPGA synthesizer, SIMD accelerator), resume, and background. Static React/Vite/Tailwind site hosted on GitHub Pages. Content and page structure (Home/About/Projects/Resume/Contact) are settled — this milestone is about finding the right visual identity, not rebuilding the app.

**Core Value:** The site has to look like a genuinely distinctive, "modern and slick" personal portfolio — not a template — and Ruben has to actually like looking at it. A technically correct rebuild that lands on the wrong aesthetic again fails this milestone.

### Constraints

- **Tech stack**: Vite + React + TS + Tailwind + shadcn/ui — no migration, per explicit decision.
- **Hosting**: GitHub Pages, `HashRouter`, base path `/ee-portfolio/` — deploy pipeline (`.github/workflows/deploy.yml`) must keep working.
- **Content**: Existing 5-page structure and resume-derived copy are locked for this milestone — visual/layout/color changes only.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript ~5.3.3 - All application code (`src/**/*.ts`, `src/**/*.tsx`)
- CSS - Tailwind utility classes plus custom styles in `src/index.css` and `src/App.css`
- HTML - Single entry template `index.html`
## Runtime
- Browser-only (static single-page application, no server runtime)
- Node.js 20 required for build/dev tooling (pinned in `.github/workflows/deploy.yml`, no `.nvmrc` present in repo)
- npm is the CI/deployment package manager (`package-lock.json` present, used by `.github/workflows/deploy.yml`)
- `bun.lockb` is also present in the repo root, indicating Bun was used at some point for local dependency management; not used by CI
- Both lockfiles coexisting is a minor inconsistency worth flagging (see CONCERNS.md if generated)
## Frameworks
- React 18.2.0 - UI rendering (`src/main.tsx`, `src/App.tsx`)
- React Router (react-router-dom 6.22.1, using `HashRouter`) - Client-side routing (`src/App.tsx`)
- Vite 4.5.2 - Dev server and bundler (`vite.config.ts`)
- Not detected - no test runner, test config, or `*.test.*`/`*.spec.*` files found in the repo
- @vitejs/plugin-react 4.2.1 - React fast-refresh/JSX transform for Vite
- TypeScript 5.3.3 - Type checking via `tsc` (project references in `tsconfig.json` → `tsconfig.app.json` / `tsconfig.node.json`)
- ESLint 8.55.0 with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` (`eslint.config.js`)
- Tailwind CSS 3.4.1 + PostCSS + Autoprefixer (`tailwind.config.js`, `postcss.config.js`)
- shadcn/ui conventions (`components.json`) — generates Radix-based components into `src/components/ui/`
## Key Dependencies
- `react` / `react-dom` 18.2.0 - Core UI library
- `react-router-dom` 6.22.1 (peer: `react-router` 6.22.1) - Routing, configured with `HashRouter` (required for GitHub Pages static hosting)
- `@tanstack/react-query` 5.17.19 - Query client is instantiated in `src/App.tsx` but no queries/mutations are used anywhere in `src/` (dependency present, unused in practice)
- `framer-motion` 12.10.5 - Animations
- `react-type-animation` 3.2.0 - Typewriter-style text animation (used on Home page)
- Radix UI primitives (`@radix-ui/react-*`: aspect-ratio, avatar, dialog, dropdown-menu, label, slot, toast, tooltip) - Headless UI primitives underlying `src/components/ui/*`
- `class-variance-authority` 0.7.0, `clsx` 2.1.0, `tailwind-merge` 2.2.1 - Class name composition utilities (`src/lib/utils.ts`)
- `tailwindcss-animate` 1.0.7 - Tailwind animation utilities
- `lucide-react` 0.294.0 - Icon set
- `sonner` 1.4.0 - Toast notifications (`src/components/ui/sonner.tsx`)
## Configuration
- No `.env` files present in the repo
- No `import.meta.env` or `process.env` usage found in `src/` except the Vite `base` path override (`VITE_BASE_URL`, set only in CI, see below)
- No runtime environment variables required to run the app locally
- `vite.config.ts` - Sets `base` to `VITE_BASE_URL` env var or `/ee-portfolio/` (GitHub Pages subpath), path alias `@` → `./src`, manual vendor chunk splitting, output to `dist/`
- `tailwind.config.js` - Custom color tokens (`paper`, `ink`, `graphite`, `line`, `signal`) plus shadcn/ui HSL CSS-variable tokens; custom font families (`Space Grotesk`, `IBM Plex Sans`, `IBM Plex Mono`)
- `postcss.config.js` - Tailwind + Autoprefixer plugins
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` - Project references; `strict: false`, `noImplicitAny: false`, path alias `@/*` → `./src/*`
- `eslint.config.js` - Flat config, `@typescript-eslint/no-unused-vars` disabled, `react-refresh/only-export-components` as warning
## Platform Requirements
- Node.js 20 (per CI), npm or Bun for installs
- `npm run dev` starts Vite dev server; `npm run build` / `npm run lint` / `npm run preview` are the other available scripts
- Static hosting only — GitHub Pages, served under the `/ee-portfolio/` subpath
- Built via GitHub Actions (`.github/workflows/deploy.yml`): checks out repo, installs Node 20, does a clean `npm install` (deletes `node_modules` and `package-lock.json` first, then reinstalls and force-pins `vite@4.5.2`), runs `npm run build`, copies `public/*` into `dist/`, touches `dist/.nojekyll`, and deploys via `actions/deploy-pages@v4`
- Deployment triggers on push to `main` or manual `workflow_dispatch`
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Page components: `PascalCase.tsx` in `src/pages/` (e.g. `src/pages/Home.tsx`, `src/pages/ProjectDetail.tsx`)
- Shared components: `PascalCase.tsx` in `src/components/` (e.g. `src/components/Navbar.tsx`, `src/components/ProjectCard.tsx`)
- shadcn/ui primitives: `kebab-case.tsx` in `src/components/ui/` (e.g. `src/components/ui/button.tsx`, `src/components/ui/dropdown-menu.tsx`) — this differs from the PascalCase used for app-level components; it is inherited from the shadcn/ui generator and should be preserved for any new primitive added via the same tool.
- Hooks: `kebab-case.tsx`/`.ts` prefixed with `use-` (e.g. `src/hooks/use-mobile.tsx`, `src/hooks/use-toast.ts`)
- Data modules: lowercase `camelCase`/plain name in `src/data/` (e.g. `src/data/projects.ts`, `src/data/profile.ts`)
- Type-only declaration files: `*.d.ts` (e.g. `src/types/images.d.ts`, `src/vite-env.d.ts`)
- React components are `const Name = () => { ... }` arrow function expressions with a trailing `export default Name;` (e.g. `src/components/Navbar.tsx:14-75`, `src/components/ProjectCard.tsx:4-41`, `src/pages/ProjectDetail.tsx:6-105`)
- Exception: shadcn/ui primitives use `React.forwardRef` factory functions assigned to a `const`, with `Component.displayName = "..."` set explicitly, then named (non-default) exports (e.g. `src/components/ui/button.tsx:42-56`)
- Helper/utility functions are plain `const fn = (...) => ...` or standard `function` declarations (e.g. `export function cn(...)` in `src/lib/utils.ts:4`, `export const getProject = (id: string) => ...` in `src/data/projects.ts:79`)
- `camelCase` throughout (`isOpen`, `linkClass`, `closeMenu` in `src/components/Navbar.tsx`)
- Data constants exported in `camelCase` (`profile`, `education`, `experience`, `skills` in `src/data/profile.ts`; `projects` in `src/data/projects.ts`)
- Module-level constant configuration is `UPPER_SNAKE_CASE` (e.g. `MOBILE_BREAKPOINT` in `src/hooks/use-mobile.tsx:3`)
- `PascalCase` for both `interface` and `type` (e.g. `Project` in `src/data/projects.ts:1`, `ExperienceItem` in `src/data/profile.ts:27`, `ThemeProviderProps`/`ThemeProviderState` in `src/components/theme-provider.tsx:5,11`)
- Prefer `interface` for object shapes that represent domain data (`Project`, `ExperienceItem`, `ButtonProps`); prefer `type` for unions and prop bags composed via `&`/generics
- Optional fields marked with `?` rather than union with `undefined` (e.g. `status?: "in-progress"` in `src/data/projects.ts:11`)
## Code Style
- No Prettier config present (`.prettierrc*` not found) — formatting is whatever the editor/ESLint produces; do not introduce a new formatter without discussion
- Double quotes for strings is the dominant style in app code (`src/components/Navbar.tsx`, `src/data/projects.ts`); shadcn/ui primitives under `src/components/ui/` also use double quotes but omit semicolons — match the file you're editing
- App-level files (`src/App.tsx`, `src/pages/*.tsx`, `src/components/*.tsx`, `src/data/*.ts`) consistently use trailing semicolons; shadcn/ui files under `src/components/ui/` and `src/hooks/`, `src/lib/utils.ts` consistently omit them. **Match the semicolon style of the surrounding file, not a global rule.**
- 2-space indentation throughout
- Tool: ESLint 8 via flat config `eslint.config.js`, using `@eslint/js` recommended + `typescript-eslint` recommended
- Plugins: `eslint-plugin-react-hooks` (recommended rules enabled), `eslint-plugin-react-refresh` (`react-refresh/only-export-components` set to `"warn"` with `allowConstantExport: true`)
- `@typescript-eslint/no-unused-vars` is explicitly turned **off** — unused variables/imports will not be flagged; do not rely on lint to catch dead code
- Run: `npm run lint` (runs `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0`, so any warning fails the command)
- `dist` is ignored (`eslint.config.js:8`)
- `tsconfig.app.json` sets `"strict": false`, `"noImplicitAny": false`, `"strictNullChecks": false`, `"noUnusedLocals": false`, `"noUnusedParameters": false`, `"noFallthroughCasesInSwitch": false`
- This is a deliberately loose config (typical of shadcn/ui-scaffolded projects). Do not assume null-safety or exhaustiveness checks are enforced by the compiler — write defensive checks manually where needed (see `src/pages/ProjectDetail.tsx:10-16` guarding `if (!project)`).
## Import Organization
- `@/*` → `src/*`, configured in both `tsconfig.app.json:12-14` / `tsconfig.json:9-11` and `vite.config.ts` (via `vite-tsconfig-paths`-equivalent alias resolution — check `vite.config.ts` for the `resolve.alias` entry before adding new aliases)
- Always import app code via `@/...` (e.g. `@/lib/utils`, `@/data/projects`, `@/components/ui/button`), never deep relative paths like `../../lib/utils`, except within `src/main.tsx`/`src/App.tsx` bootstrap files which use `./`
- Use `import type { X } from "..."` for type-only imports (e.g. `import type { Project } from "@/data/projects";` in `src/components/ProjectCard.tsx:2`)
## Error Handling
- No global error boundary, no try/catch blocks anywhere in application code (`src/pages/*`, `src/components/*`, `src/data/*`) — this is a static content site with no network calls or async I/O in app-authored code, so there is little to catch
- `throw new Error(...)` is used only inside shadcn/ui context-hook guards to catch **programmer misuse** at dev time (calling a hook outside its provider), e.g. `src/components/theme-provider.tsx:69-70` (`useTheme`), `src/components/ui/carousel.tsx:37`, `src/components/ui/form.tsx:50`, `src/components/ui/sidebar.tsx:42`, `src/components/ui/chart.tsx:29`. Follow this same pattern if adding a new context: guard `useContext` results and throw a descriptive error naming the hook and required provider.
- Missing/not-found data is handled with an early-return guard rendering a fallback UI, not an exception: `src/pages/ProjectDetail.tsx:10-16` returns a "Project not found." message when `getProject(id)` returns `undefined`. Follow this pattern for any new lookups against `src/data/*`.
- `console.error` is used exactly once, for observability of unmatched routes: `src/pages/NotFound.tsx:8-11`. There is no logging framework; if you add more diagnostic logging, use `console.error`/`console.warn` directly — no wrapper exists.
- `@tanstack/react-query`'s `QueryClient` is instantiated in `src/App.tsx:13` but is not currently used by any query/mutation in the codebase (searched — no `useQuery`/`useMutation` calls found). Treat it as unused scaffolding rather than an established async-data-fetching convention; if you add data fetching, react-query is already wired up via `QueryClientProvider` in `src/App.tsx:17`.
## Comments
- Sparse. Comments are used only to annotate non-obvious domain-specific data values, e.g. inline field comments in `src/data/projects.ts:3,7` explaining what `tag` and `course` mean
- No comments explaining "what" code does structurally — code is expected to be self-explanatory through naming
- No JSDoc/TSDoc anywhere in the codebase
## Component Design
- Function components take a single destructured props object typed inline: `const ProjectCard = ({ project }: { project: Project }) => {...}` (`src/components/ProjectCard.tsx:4`) — for a single prop, an inline type is preferred over a separate named `Props` interface
- Page components (`src/pages/*.tsx`) take no props — they read all data directly from `src/data/*` modules or route params (`useParams`), and are composed exclusively via `react-router-dom` `<Route>` elements in `src/App.tsx`
- Presentational/derived values (e.g. `linkClass`) are computed as local closures inside the component body rather than extracted to separate files, since they're single-use (`src/components/Navbar.tsx:19-25`)
- Tailwind CSS utility classes only — no CSS modules, no styled-components, no inline `style` objects except where a Tailwind utility cannot express it (e.g. `style={{ minHeight: "800px" }}` for the PDF iframe in `src/pages/ProjectDetail.tsx:88,92`)
- Class name composition/merging uses the `cn()` helper (`clsx` + `tailwind-merge`) from `src/lib/utils.ts` — always use `cn(...)` rather than manual template-string concatenation when combining conditional classes (see `src/components/Navbar.tsx:19-25`)
- Custom design-token colors are defined by literal hex/name in `tailwind.config.js` (`paper`, `ink`, `graphite`, `line`, `signal`) alongside the shadcn/ui `hsl(var(--x))` token set — use the named tokens (`text-ink`, `text-graphite`, `border-line`, `text-signal`) rather than raw Tailwind color utilities (`text-gray-900`, etc.) in new app UI to stay consistent with the site's visual system. Note `src/pages/NotFound.tsx:15-21` is an exception that still uses raw Tailwind grays/blues — do not copy that file's styling as a reference.
- Font families are custom-named Tailwind classes: `font-display` (Space Grotesk headings), `font-body` (IBM Plex Sans), `font-mono` (IBM Plex Mono, used for uppercase tracking-wide labels/tags throughout) — see `tailwind.config.js:19-23`
## Module Design
- App-level components/pages: `export default` (single default export per file)
- shadcn/ui primitives and utility modules: named exports, often multiple per file (e.g. `export { Button, buttonVariants }` in `src/components/ui/button.tsx:56`)
- Data modules export both the data collection and any accessor helpers as named exports (`export const projects`, `export const getProject` in `src/data/projects.ts`)
- None present — no `index.ts` re-export barrels in `src/components/`, `src/pages/`, `src/data/`, or `src/hooks/`. Import directly from the specific file path.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## System Overview
```text
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
- Page-per-route component pattern (`src/pages/`) rendered by `react-router-dom`'s `<Routes>`.
- Content/data fully separated from presentation: `src/data/*.ts` holds all copy (bio, project descriptions, skills) as typed constants; pages import and render it directly — no CMS, no fetch, no loaders.
- Component layer split into two tiers: hand-written page-specific components (`src/components/*.tsx`) vs. generated shadcn/ui primitive library (`src/components/ui/*.tsx`).
- `@tanstack/react-query`'s `QueryClientProvider` and `sonner`'s `Toaster` are wired into the app shell but unused by any page — vestigial scaffold from the shadcn/Lovable starter template (see README.md: project originated on lovable.dev). No `useQuery`/`useMutation` calls exist anywhere in `src/`.
- Client-only routing via `HashRouter` (not `BrowserRouter`) — required because the site is deployed as a static bundle to GitHub Pages, which has no server-side rewrite rules for client routes. URLs look like `https://<user>.github.io/ee-portfolio/#/projects`.
## Layers
- Purpose: Mount the React tree into the DOM.
- Location: `index.html`, `src/main.tsx`
- Contains: `ReactDOM.createRoot(...).render(<App />)` inside `React.StrictMode`.
- Depends on: `src/App.tsx`, `src/index.css` (global Tailwind styles).
- Used by: Vite dev server / static build.
- Purpose: Global providers and routing table.
- Location: `src/App.tsx`
- Contains: `QueryClientProvider`, `ThemeProvider`, `HashRouter`, `<Routes>` table, persistent `Navbar` + `Toaster`.
- Depends on: page components, `Navbar`, `theme-provider`, `ui/sonner`.
- Used by: `src/main.tsx`.
- Purpose: One component per route, owns page layout, section structure, and copy composition.
- Location: `src/pages/*.tsx`
- Contains: JSX layout, Tailwind utility classes, Framer Motion animation variants, data imports.
- Depends on: `src/data/*.ts`, `src/components/*.tsx`, `src/components/ui/*.tsx` (rarely), `lucide-react` icons.
- Used by: `src/App.tsx` route table.
- Purpose: Cross-page reusable pieces (nav, project card, theme context).
- Location: `src/components/*.tsx` (top level, not `ui/`)
- Depends on: `src/lib/utils.ts`, `src/data/projects.ts` (via prop types), `react-router-dom`.
- Used by: `src/App.tsx`, page components.
- Purpose: Generic, unstyled-then-styled Radix UI wrapper components generated by the shadcn CLI (`components.json`).
- Location: `src/components/ui/*.tsx`
- Contains: Button, Card, Dialog, Sidebar, Toast, Form, etc. — ~50 files.
- Depends on: `@radix-ui/*` packages, `class-variance-authority`, `src/lib/utils.ts`.
- Used by: **Only `aspect-ratio.tsx` (ProjectDetail) and `sonner.tsx` (App)** are imported by application code. The remainder is unused generated scaffold — do not assume a component here is wired up; verify with a grep before depending on it in a new feature.
- Purpose: Single source of truth for all site copy and project metadata.
- Location: `src/data/profile.ts`, `src/data/projects.ts`
- Contains: plain exported `const` objects/arrays and TypeScript interfaces (`ExperienceItem`, `Project`), plus a `getProject(id)` lookup helper.
- Depends on: nothing (pure data + types).
- Used by: `Home`, `About`, `Projects`, `ProjectDetail`, `Contact`, `ProjectCard`.
- Purpose: Images, PDFs (resume, project reports) served as-is.
- Location: `public/*` (source of truth) — copied verbatim into `dist/` during CI build (`.github/workflows/deploy.yml` runs `cp -r public/* dist/`).
- Referenced: by absolute path strings hardcoded in `src/data/*.ts` and page JSX, always prefixed with `/ee-portfolio/` (the Vite `base` — see vite.config.ts) e.g. `"/ee-portfolio/vr_glove.JPG"`.
- Note: a duplicate `assets/` directory exists at the repo root (`assets/index-*.js`, `assets/index-*.css`) — this looks like a stray prior build artifact, not part of `src/` or `public/`, and is not referenced by `index.html` (which points at `/src/main.tsx` for dev and Vite's own hashed build output for prod).
## Data Flow
### Primary Request Path (page render)
### Project Detail Flow
- No global app state / store. All "state" is either: (a) static imported data (`src/data/*.ts`), (b) local component `useState` (e.g., `Navbar`'s mobile menu `isOpen`, `theme-provider`'s `theme`), or (c) URL state via `react-router-dom` (`useParams`, `useLocation`).
- `ThemeProvider` persists a single value (`theme`) to `localStorage` under key `vite-ui-theme`; `App.tsx` sets `defaultTheme="light"` (`src/App.tsx:18`).
## Key Abstractions
- Purpose: Typed shape for all portfolio project entries — the only real "domain model" in the app.
- Examples: `src/data/projects.ts:1-14` (interface), `src/data/projects.ts:16-77` (4 instances).
- Pattern: Required fields (`id`, `tag`, `title`, `image`, `date`, `course`, `skills`, `overview`, `description`) + optional fields (`status`, `detailImages`, `report`) consumed conditionally by `ProjectCard` and `ProjectDetail`.
- Purpose: One React function component per route, default-exported, named to match the route/page.
- Examples: `src/pages/Home.tsx`, `src/pages/About.tsx`, `src/pages/Projects.tsx`, `src/pages/ProjectDetail.tsx`, `src/pages/Resume.tsx`, `src/pages/Contact.tsx`.
- Pattern: `const PageName = () => { return (<div className="min-h-screen bg-paper pt-32 pb-20"> ... </div>); }; export default PageName;` — every page shares the `bg-paper`/`pt-32`/`max-w-*` shell wrapper convention (no shared `<Layout>` component exists; each page repeats it — see Anti-Patterns).
- Purpose: Compose conditional Tailwind class strings without collisions.
- Location: `src/lib/utils.ts`
- Pattern: `cn(...inputs) = twMerge(clsx(inputs))`, used throughout `src/components/ui/*` and `Navbar.tsx`.
## Entry Points
- Location: `index.html` → `src/main.tsx`
- Triggers: page load in browser (or Vite dev server).
- Responsibilities: mount React root.
- Location: `vite dev` (via `npm run dev`, `package.json`)
- Triggers: local development.
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
### Repeated page shell markup
### Unused shadcn/ui scaffold
## Error Handling
- `ProjectDetail.tsx` guards against an unknown `:id` param by rendering an inline "Project not found." message (`src/pages/ProjectDetail.tsx:10-16`) rather than redirecting or throwing.
- `NotFound.tsx` logs unmatched routes via `console.error` (`src/pages/NotFound.tsx:8-11`) but, per Anti-Patterns above, is not currently mounted in the router.
- No `try/catch`, no error boundaries, no `.catch()` chains exist anywhere in `src/` — consistent with the absence of async I/O.
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
