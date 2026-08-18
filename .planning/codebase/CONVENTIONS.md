# Coding Conventions

**Analysis Date:** 2026-08-18

## Naming Patterns

**Files:**
- Page components: `PascalCase.tsx` in `src/pages/` (e.g. `src/pages/Home.tsx`, `src/pages/ProjectDetail.tsx`)
- Shared components: `PascalCase.tsx` in `src/components/` (e.g. `src/components/Navbar.tsx`, `src/components/ProjectCard.tsx`)
- shadcn/ui primitives: `kebab-case.tsx` in `src/components/ui/` (e.g. `src/components/ui/button.tsx`, `src/components/ui/dropdown-menu.tsx`) — this differs from the PascalCase used for app-level components; it is inherited from the shadcn/ui generator and should be preserved for any new primitive added via the same tool.
- Hooks: `kebab-case.tsx`/`.ts` prefixed with `use-` (e.g. `src/hooks/use-mobile.tsx`, `src/hooks/use-toast.ts`)
- Data modules: lowercase `camelCase`/plain name in `src/data/` (e.g. `src/data/projects.ts`, `src/data/profile.ts`)
- Type-only declaration files: `*.d.ts` (e.g. `src/types/images.d.ts`, `src/vite-env.d.ts`)

**Functions/Components:**
- React components are `const Name = () => { ... }` arrow function expressions with a trailing `export default Name;` (e.g. `src/components/Navbar.tsx:14-75`, `src/components/ProjectCard.tsx:4-41`, `src/pages/ProjectDetail.tsx:6-105`)
- Exception: shadcn/ui primitives use `React.forwardRef` factory functions assigned to a `const`, with `Component.displayName = "..."` set explicitly, then named (non-default) exports (e.g. `src/components/ui/button.tsx:42-56`)
- Helper/utility functions are plain `const fn = (...) => ...` or standard `function` declarations (e.g. `export function cn(...)` in `src/lib/utils.ts:4`, `export const getProject = (id: string) => ...` in `src/data/projects.ts:79`)

**Variables:**
- `camelCase` throughout (`isOpen`, `linkClass`, `closeMenu` in `src/components/Navbar.tsx`)
- Data constants exported in `camelCase` (`profile`, `education`, `experience`, `skills` in `src/data/profile.ts`; `projects` in `src/data/projects.ts`)
- Module-level constant configuration is `UPPER_SNAKE_CASE` (e.g. `MOBILE_BREAKPOINT` in `src/hooks/use-mobile.tsx:3`)

**Types/Interfaces:**
- `PascalCase` for both `interface` and `type` (e.g. `Project` in `src/data/projects.ts:1`, `ExperienceItem` in `src/data/profile.ts:27`, `ThemeProviderProps`/`ThemeProviderState` in `src/components/theme-provider.tsx:5,11`)
- Prefer `interface` for object shapes that represent domain data (`Project`, `ExperienceItem`, `ButtonProps`); prefer `type` for unions and prop bags composed via `&`/generics
- Optional fields marked with `?` rather than union with `undefined` (e.g. `status?: "in-progress"` in `src/data/projects.ts:11`)

## Code Style

**Formatting:**
- No Prettier config present (`.prettierrc*` not found) — formatting is whatever the editor/ESLint produces; do not introduce a new formatter without discussion
- Double quotes for strings is the dominant style in app code (`src/components/Navbar.tsx`, `src/data/projects.ts`); shadcn/ui primitives under `src/components/ui/` also use double quotes but omit semicolons — match the file you're editing
- App-level files (`src/App.tsx`, `src/pages/*.tsx`, `src/components/*.tsx`, `src/data/*.ts`) consistently use trailing semicolons; shadcn/ui files under `src/components/ui/` and `src/hooks/`, `src/lib/utils.ts` consistently omit them. **Match the semicolon style of the surrounding file, not a global rule.**
- 2-space indentation throughout

**Linting:**
- Tool: ESLint 8 via flat config `eslint.config.js`, using `@eslint/js` recommended + `typescript-eslint` recommended
- Plugins: `eslint-plugin-react-hooks` (recommended rules enabled), `eslint-plugin-react-refresh` (`react-refresh/only-export-components` set to `"warn"` with `allowConstantExport: true`)
- `@typescript-eslint/no-unused-vars` is explicitly turned **off** — unused variables/imports will not be flagged; do not rely on lint to catch dead code
- Run: `npm run lint` (runs `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0`, so any warning fails the command)
- `dist` is ignored (`eslint.config.js:8`)

**TypeScript strictness:**
- `tsconfig.app.json` sets `"strict": false`, `"noImplicitAny": false`, `"strictNullChecks": false`, `"noUnusedLocals": false`, `"noUnusedParameters": false`, `"noFallthroughCasesInSwitch": false`
- This is a deliberately loose config (typical of shadcn/ui-scaffolded projects). Do not assume null-safety or exhaustiveness checks are enforced by the compiler — write defensive checks manually where needed (see `src/pages/ProjectDetail.tsx:10-16` guarding `if (!project)`).

## Import Organization

**Order (observed, not enforced by tooling):**
1. External packages (`react`, `react-router-dom`, `framer-motion`, `lucide-react`, `@tanstack/react-query`)
2. Internal absolute imports via `@/` alias (components, hooks, lib, data)
3. Relative imports only in root-level bootstrap files (`./App.tsx`, `./index.css` in `src/main.tsx`)

No import-sorting plugin is configured; order is by convention only, not enforced.

**Path Aliases:**
- `@/*` → `src/*`, configured in both `tsconfig.app.json:12-14` / `tsconfig.json:9-11` and `vite.config.ts` (via `vite-tsconfig-paths`-equivalent alias resolution — check `vite.config.ts` for the `resolve.alias` entry before adding new aliases)
- Always import app code via `@/...` (e.g. `@/lib/utils`, `@/data/projects`, `@/components/ui/button`), never deep relative paths like `../../lib/utils`, except within `src/main.tsx`/`src/App.tsx` bootstrap files which use `./`

**Type-only imports:**
- Use `import type { X } from "..."` for type-only imports (e.g. `import type { Project } from "@/data/projects";` in `src/components/ProjectCard.tsx:2`)

## Error Handling

**Patterns:**
- No global error boundary, no try/catch blocks anywhere in application code (`src/pages/*`, `src/components/*`, `src/data/*`) — this is a static content site with no network calls or async I/O in app-authored code, so there is little to catch
- `throw new Error(...)` is used only inside shadcn/ui context-hook guards to catch **programmer misuse** at dev time (calling a hook outside its provider), e.g. `src/components/theme-provider.tsx:69-70` (`useTheme`), `src/components/ui/carousel.tsx:37`, `src/components/ui/form.tsx:50`, `src/components/ui/sidebar.tsx:42`, `src/components/ui/chart.tsx:29`. Follow this same pattern if adding a new context: guard `useContext` results and throw a descriptive error naming the hook and required provider.
- Missing/not-found data is handled with an early-return guard rendering a fallback UI, not an exception: `src/pages/ProjectDetail.tsx:10-16` returns a "Project not found." message when `getProject(id)` returns `undefined`. Follow this pattern for any new lookups against `src/data/*`.
- `console.error` is used exactly once, for observability of unmatched routes: `src/pages/NotFound.tsx:8-11`. There is no logging framework; if you add more diagnostic logging, use `console.error`/`console.warn` directly — no wrapper exists.
- `@tanstack/react-query`'s `QueryClient` is instantiated in `src/App.tsx:13` but is not currently used by any query/mutation in the codebase (searched — no `useQuery`/`useMutation` calls found). Treat it as unused scaffolding rather than an established async-data-fetching convention; if you add data fetching, react-query is already wired up via `QueryClientProvider` in `src/App.tsx:17`.

## Comments

**When to Comment:**
- Sparse. Comments are used only to annotate non-obvious domain-specific data values, e.g. inline field comments in `src/data/projects.ts:3,7` explaining what `tag` and `course` mean
- No comments explaining "what" code does structurally — code is expected to be self-explanatory through naming
- No JSDoc/TSDoc anywhere in the codebase

## Component Design

**Structure:**
- Function components take a single destructured props object typed inline: `const ProjectCard = ({ project }: { project: Project }) => {...}` (`src/components/ProjectCard.tsx:4`) — for a single prop, an inline type is preferred over a separate named `Props` interface
- Page components (`src/pages/*.tsx`) take no props — they read all data directly from `src/data/*` modules or route params (`useParams`), and are composed exclusively via `react-router-dom` `<Route>` elements in `src/App.tsx`
- Presentational/derived values (e.g. `linkClass`) are computed as local closures inside the component body rather than extracted to separate files, since they're single-use (`src/components/Navbar.tsx:19-25`)

**Styling:**
- Tailwind CSS utility classes only — no CSS modules, no styled-components, no inline `style` objects except where a Tailwind utility cannot express it (e.g. `style={{ minHeight: "800px" }}` for the PDF iframe in `src/pages/ProjectDetail.tsx:88,92`)
- Class name composition/merging uses the `cn()` helper (`clsx` + `tailwind-merge`) from `src/lib/utils.ts` — always use `cn(...)` rather than manual template-string concatenation when combining conditional classes (see `src/components/Navbar.tsx:19-25`)
- Custom design-token colors are defined by literal hex/name in `tailwind.config.js` (`paper`, `ink`, `graphite`, `line`, `signal`) alongside the shadcn/ui `hsl(var(--x))` token set — use the named tokens (`text-ink`, `text-graphite`, `border-line`, `text-signal`) rather than raw Tailwind color utilities (`text-gray-900`, etc.) in new app UI to stay consistent with the site's visual system. Note `src/pages/NotFound.tsx:15-21` is an exception that still uses raw Tailwind grays/blues — do not copy that file's styling as a reference.
- Font families are custom-named Tailwind classes: `font-display` (Space Grotesk headings), `font-body` (IBM Plex Sans), `font-mono` (IBM Plex Mono, used for uppercase tracking-wide labels/tags throughout) — see `tailwind.config.js:19-23`

## Module Design

**Exports:**
- App-level components/pages: `export default` (single default export per file)
- shadcn/ui primitives and utility modules: named exports, often multiple per file (e.g. `export { Button, buttonVariants }` in `src/components/ui/button.tsx:56`)
- Data modules export both the data collection and any accessor helpers as named exports (`export const projects`, `export const getProject` in `src/data/projects.ts`)

**Barrel Files:**
- None present — no `index.ts` re-export barrels in `src/components/`, `src/pages/`, `src/data/`, or `src/hooks/`. Import directly from the specific file path.

---

*Convention analysis: 2026-08-18*
