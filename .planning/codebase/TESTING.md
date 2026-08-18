# Testing Patterns

**Analysis Date:** 2026-08-18

## Current State: No Automated Test Suite

This project has **no test framework, no test files, and no test tooling of any kind.**

Verified by direct inspection:
- `package.json` — no `test` script; no `vitest`, `jest`, `@testing-library/*`, `playwright`, `cypress`, or any testing-related package listed in `dependencies` or `devDependencies` (`package.json:1-38`)
- No `*.test.ts`, `*.test.tsx`, `*.spec.ts`, or `*.spec.tsx` files anywhere in the repository (excluding `node_modules`)
- No `vitest.config.*`, `jest.config.*`, or equivalent config file present at the repo root
- `.github/workflows/deploy.yml` — the only CI workflow — runs `npm install` and `npm run build` only; it never invokes a test command (`.github/workflows/deploy.yml:26-37`)
- `eslint.config.js` has no testing-library or jest plugin configured

This is expected and appropriate for the current scope of the project: a small static personal portfolio site (`README.md`) built with Vite + React + react-router, with no backend, no forms that submit data, no authentication, and no external API calls in application code. Content is static TypeScript data (`src/data/projects.ts`, `src/data/profile.ts`) rendered by presentational components.

## What This Means for New Work

**Do not invent a test structure that doesn't exist.** If a future task requires adding tests:

1. **No framework is chosen yet.** Since the project uses Vite, the natural default would be **Vitest** (zero extra bundler config, same Vite pipeline) plus **@testing-library/react** for component tests — but this is a recommendation, not an existing convention. Confirm with the user before introducing new devDependencies and config files.
2. **No test script exists** — `npm run lint`, `npm run build`, `npm run dev`, `npm run preview` are the only available scripts (`package.json:6-11`). Adding a `test` script would require also wiring it into `.github/workflows/deploy.yml` if CI enforcement is desired.
3. **No mocking conventions exist** to follow, because there is nothing to mock yet: no network layer, no `fetch`/`axios` calls, and the `@tanstack/react-query` `QueryClient` instantiated in `src/App.tsx:13` is currently unused (no `useQuery`/`useMutation` calls found anywhere in `src/`).
4. **No fixtures/factories exist.** The closest thing to test data is the real content data in `src/data/projects.ts` and `src/data/profile.ts`, which is production content, not fixtures.

## Manual Verification (current practice)

In the absence of automated tests, correctness is currently verified manually via:
- `npm run dev` — local Vite dev server for visual/manual verification
- `npm run build` — TypeScript compile + Vite production build; this is the only automated correctness gate present (a type error or build failure will fail CI in `.github/workflows/deploy.yml:34-37`)
- `npm run lint` — ESLint with `--max-warnings 0`, available locally but **not run in CI** (`.github/workflows/deploy.yml` does not call it)
- `npm run preview` — serves the production build locally for final visual check before deploy

## Recommendation Priority (if tests are added later)

Given the codebase's current shape (static presentational components, pure data lookup helpers, no async logic), the highest-value, lowest-effort starting points would be:
- Unit test for `getProject(id)` in `src/data/projects.ts:79` — pure function, easy to test in isolation
- Unit test for `cn()` in `src/lib/utils.ts:4` — pure function
- Component smoke tests for pages that branch on data (e.g. `src/pages/ProjectDetail.tsx` renders a "Project not found." fallback when `getProject` returns `undefined`, see `src/pages/ProjectDetail.tsx:10-16`)

This is a suggestion for future scoping only — no test infrastructure currently exists to extend.

---

*Testing analysis: 2026-08-18*
