---
last_mapped_commit: c09e36d0ab5dcf2cab83ee5e887040ee7950517b
---

# Technology Stack

**Analysis Date:** 2026-08-18

## Languages

**Primary:**
- TypeScript ~5.3.3 - All application code (`src/**/*.ts`, `src/**/*.tsx`)

**Secondary:**
- CSS - Tailwind utility classes plus custom styles in `src/index.css` and `src/App.css`
- HTML - Single entry template `index.html`

## Runtime

**Environment:**
- Browser-only (static single-page application, no server runtime)
- Node.js 20 required for build/dev tooling (pinned in `.github/workflows/deploy.yml`, no `.nvmrc` present in repo)

**Package Manager:**
- npm is the CI/deployment package manager (`package-lock.json` present, used by `.github/workflows/deploy.yml`)
- `bun.lockb` is also present in the repo root, indicating Bun was used at some point for local dependency management; not used by CI
- Both lockfiles coexisting is a minor inconsistency worth flagging (see CONCERNS.md if generated)

## Frameworks

**Core:**
- React 18.2.0 - UI rendering (`src/main.tsx`, `src/App.tsx`)
- React Router (react-router-dom 6.22.1, using `HashRouter`) - Client-side routing (`src/App.tsx`)
- Vite 4.5.2 - Dev server and bundler (`vite.config.ts`)

**Testing:**
- Not detected - no test runner, test config, or `*.test.*`/`*.spec.*` files found in the repo

**Build/Dev:**
- @vitejs/plugin-react 4.2.1 - React fast-refresh/JSX transform for Vite
- TypeScript 5.3.3 - Type checking via `tsc` (project references in `tsconfig.json` → `tsconfig.app.json` / `tsconfig.node.json`)
- ESLint 8.55.0 with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` (`eslint.config.js`)
- Tailwind CSS 3.4.1 + PostCSS + Autoprefixer (`tailwind.config.js`, `postcss.config.js`)
- shadcn/ui conventions (`components.json`) — generates Radix-based components into `src/components/ui/`

## Key Dependencies

**Critical:**
- `react` / `react-dom` 18.2.0 - Core UI library
- `react-router-dom` 6.22.1 (peer: `react-router` 6.22.1) - Routing, configured with `HashRouter` (required for GitHub Pages static hosting)
- `@tanstack/react-query` 5.17.19 - Query client is instantiated in `src/App.tsx` but no queries/mutations are used anywhere in `src/` (dependency present, unused in practice)
- `framer-motion` 12.10.5 - Animations
- `react-type-animation` 3.2.0 - Typewriter-style text animation (used on Home page)

**UI Component System:**
- Radix UI primitives (`@radix-ui/react-*`: aspect-ratio, avatar, dialog, dropdown-menu, label, slot, toast, tooltip) - Headless UI primitives underlying `src/components/ui/*`
- `class-variance-authority` 0.7.0, `clsx` 2.1.0, `tailwind-merge` 2.2.1 - Class name composition utilities (`src/lib/utils.ts`)
- `tailwindcss-animate` 1.0.7 - Tailwind animation utilities
- `lucide-react` 0.294.0 - Icon set
- `sonner` 1.4.0 - Toast notifications (`src/components/ui/sonner.tsx`)

Note: `src/components/ui/` contains many more shadcn-generated component files (accordion, calendar, carousel, chart, command, form, sidebar, etc.) than are backed by dependencies in `package.json` (e.g. no `react-hook-form`, `embla-carousel-react`, `recharts`, `cmdk`, `vaul`, `date-fns`, `react-day-picker`, `input-otp` in `dependencies`). These are boilerplate scaffolding from the shadcn/ui generator; several likely fail to build/import if actually used. Only a small subset of `src/components/ui/` is imported by the app's pages.

## Configuration

**Environment:**
- No `.env` files present in the repo
- No `import.meta.env` or `process.env` usage found in `src/` except the Vite `base` path override (`VITE_BASE_URL`, set only in CI, see below)
- No runtime environment variables required to run the app locally

**Build:**
- `vite.config.ts` - Sets `base` to `VITE_BASE_URL` env var or `/ee-portfolio/` (GitHub Pages subpath), path alias `@` → `./src`, manual vendor chunk splitting, output to `dist/`
- `tailwind.config.js` - Custom color tokens (`paper`, `ink`, `graphite`, `line`, `signal`) plus shadcn/ui HSL CSS-variable tokens; custom font families (`Space Grotesk`, `IBM Plex Sans`, `IBM Plex Mono`)
- `postcss.config.js` - Tailwind + Autoprefixer plugins
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` - Project references; `strict: false`, `noImplicitAny: false`, path alias `@/*` → `./src/*`
- `eslint.config.js` - Flat config, `@typescript-eslint/no-unused-vars` disabled, `react-refresh/only-export-components` as warning

## Platform Requirements

**Development:**
- Node.js 20 (per CI), npm or Bun for installs
- `npm run dev` starts Vite dev server; `npm run build` / `npm run lint` / `npm run preview` are the other available scripts

**Production:**
- Static hosting only — GitHub Pages, served under the `/ee-portfolio/` subpath
- Built via GitHub Actions (`.github/workflows/deploy.yml`): checks out repo, installs Node 20, does a clean `npm install` (deletes `node_modules` and `package-lock.json` first, then reinstalls and force-pins `vite@4.5.2`), runs `npm run build`, copies `public/*` into `dist/`, touches `dist/.nojekyll`, and deploys via `actions/deploy-pages@v4`
- Deployment triggers on push to `main` or manual `workflow_dispatch`

---

*Stack analysis: 2026-08-18*
