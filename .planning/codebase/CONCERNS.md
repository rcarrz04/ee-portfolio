# Codebase Concerns

**Analysis Date:** 2026-08-18

## Tech Debt

**`node_modules` committed to git despite `.gitignore`:**
- Issue: `node_modules` is listed in `.gitignore` (line 9), but 8,138 files under `node_modules/` are tracked in git (`git ls-files | grep -c '^node_modules/'` → 8138, out of 8,246 tracked files total — over 98% of tracked files are `node_modules`). `git status --short` shows dozens of modified/deleted files under `node_modules/` (e.g. `node_modules/.bin/glob`, `node_modules/@babel/parser/lib/index.js`), meaning the local install has already drifted from what's committed.
- Files: `node_modules/` (entire tree, tracked)
- Impact: `.git` is 130MB, `node_modules` on disk is 152MB. Every clone downloads a full stale `node_modules` tree. Diffs and blame are polluted by dependency internals. The committed snapshot is a point-in-time install that doesn't match `package.json`/`package-lock.json` (see next item), so it's actively misleading rather than just wasteful.
- Fix approach: `git rm -r --cached node_modules && git commit`. Since `.gitignore` already excludes it, no further gitignore change needed. Contributors then run `npm install` locally as normal.

**`npm run lint` is broken (old ESLint CLI flags vs. flat config):**
- Issue: `package.json`'s `lint` script is `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0`, which uses ESLint's legacy `.eslintrc`-era CLI flags. The installed ESLint (`8.57.1`) auto-detects `eslint.config.js` at the repo root and switches to flat-config mode, where `--ext` is not a valid option.
- Files: `package.json:8` (lint script), `eslint.config.js`
- Impact: Running `npm run lint` fails immediately with `Invalid option '--ext' - perhaps you meant '-c'?` before any linting occurs. Verified by running it directly — reproduces the error every time. No lint checks currently run in this project (locally or presumably in CI, though CI has no lint step — see Missing Critical Features).
- Fix approach: Update the script to flat-config-compatible syntax, e.g. `eslint . --report-unused-disable-directives --max-warnings 0` (flat config infers `.ts`/`.tsx` targeting from `eslint.config.js`'s `files` glob, so `--ext` is unnecessary and unsupported).

**`eslint.config.js` imports `typescript-eslint`, which is not a declared dependency:**
- Issue: `eslint.config.js:5` does `import tseslint from "typescript-eslint"` and uses `tseslint.config(...)` / `...tseslint.configs.recommended` (the unified `typescript-eslint` v7+/v8 API). `package.json` devDependencies instead declare the older, split packages `@typescript-eslint/eslint-plugin@^6.14.0` and `@typescript-eslint/parser@^6.14.0` — the unified `typescript-eslint` package is absent entirely. Similarly, `eslint.config.js` imports `@eslint/js` and `globals`, neither of which is declared in `package.json`.
- Files: `eslint.config.js:1-5`, `package.json:37-49`
- Impact: A fresh `npm install` (e.g. from a clean clone, or as CI's "Clean install" step does via `rm -rf node_modules && npm install`) will NOT install `typescript-eslint`, `@eslint/js`, or `globals`, because nothing in `package.json` requires them. `eslint.config.js` would then fail to load with a module-not-found error, on top of the CLI-flag breakage above. Currently these three packages happen to still exist in the committed (stale) `node_modules` tree — checked via `ls node_modules/@eslint/js` and `ls node_modules/globals` (both present) vs. `ls node_modules/typescript-eslint` (absent) — which is why lint fails on the CLI-flag error rather than a missing-module error locally, but a clean install would fail even earlier.
- Root cause (via `git log -- package.json`): the project originated from a Lovable-generated scaffold whose original `package.json` had `eslint@^9.9.0`, `typescript-eslint@^8.0.1`, `@eslint/js@^9.9.0`, and `globals@^15.9.0` (confirmed via `git show <first-commit>:package.json`), matching `eslint.config.js`. A later dependency-fixing commit downgraded to `eslint@^8.55.0` + split `@typescript-eslint/*@^6.14.0` packages without updating `eslint.config.js` or removing/re-adding the packages it imports, leaving the two permanently out of sync.
- Fix approach: Either (a) add `typescript-eslint`, `@eslint/js`, and `globals` to `package.json` devDependencies (matching versions compatible with ESLint 8), or (b) rewrite `eslint.config.js` to use `@typescript-eslint/eslint-plugin` + `@typescript-eslint/parser` directly (the packages actually declared), or (c) upgrade `eslint`/`eslint-plugin-*` to the versions matching the original Lovable scaffold and drop the v6 split packages. Pick one direction — the two must agree.

**Two lockfiles present (`package-lock.json` and `bun.lockb`):**
- Issue: Both `package-lock.json` (npm) and `bun.lockb` (Bun) are committed at the repo root.
- Files: `package-lock.json`, `bun.lockb`
- Impact: Ambiguous which package manager is authoritative. CI (`.github/workflows/deploy.yml`) explicitly deletes `package-lock.json` and runs `npm install` fresh every deploy (see Fragile Areas), so the committed `package-lock.json` isn't even used for reproducible installs in the one place that matters. `bun.lockb` may be stale/unused entirely — no `bun` usage found in scripts or CI.
- Fix approach: Pick one package manager (npm, given `package.json` scripts and CI use `npm`), delete the other lockfile, and stop deleting `package-lock.json` in CI so installs are actually reproducible.

**Nearly all shadcn/ui components are unused dead code:**
- Issue: `src/components/ui/` contains 49 shadcn-generated component files, but a repo-wide import search (`grep -rn "@/components/ui/" src/pages src/components/*.tsx src/App.tsx`) shows only 2 are actually imported outside the `ui/` directory itself: `aspect-ratio.tsx` (used in `src/pages/ProjectDetail.tsx`) and `sonner.tsx` (used in `src/App.tsx` for the toast provider). The other 47 — including large files like `sidebar.tsx` (761 lines), `chart.tsx` (363 lines), `carousel.tsx` (260 lines), `menubar.tsx`, `dropdown-menu.tsx`, `form.tsx`, `select.tsx`, `command.tsx`, `button.tsx`, `card.tsx`, `dialog.tsx`, `tooltip.tsx`, etc. — have zero references anywhere else in `src/`.
- Files: `src/components/ui/*.tsx` (47 of 49 files unused; ~5,000+ of the 5,801 total lines under `src/components/ui/`), plus `src/hooks/use-toast.ts` and `src/hooks/use-mobile.tsx`, which are only referenced by the equally-unused `src/components/ui/toaster.tsx`, `use-toast.ts` (self), and `sidebar.tsx` respectively.
- Impact: Vite tree-shakes unused ES module code at build time, so this likely doesn't bloat the production bundle much by itself. The real cost is maintenance/navigation confusion — a contributor grepping `src/components/ui/` for "how do we build buttons/dialogs here" will find a full design-system scaffold that the actual pages don't use, and `package.json` correspondingly declares several `@radix-ui/*` dependencies (`react-avatar`, `react-dialog`, `react-dropdown-menu`, `react-label`, `react-slot`, `react-toast`, `react-tooltip`) that back only these unused components.
- Fix approach: Either delete the unused `ui/` files (and corresponding unused `@radix-ui/*` deps) to match actual usage, or intentionally keep the scaffold if future pages are expected to need it — but the vendor chunk in `vite.config.ts:16-30` currently bundles all of these Radix packages into the `vendor` chunk regardless of use, so trimming unused ones would shrink that chunk.

**Stray built assets committed at repo root, outside `dist/`:**
- Issue: `assets/index-_z7Crv3b.js` and `assets/index-7KsDh9wq.css` are tracked in git at the repo root (`git ls-files assets/`), separate from the gitignored `dist/` build output directory that `vite.config.ts` actually builds to (`outDir: "dist"`). `git log --oneline -- assets/` shows these came from early manual GitHub Pages deploy attempts (commits like "Deploy: fized base path for Github pages", "Final working deploy to github pages") before the current `.github/workflows/deploy.yml` CI-based deploy existed.
- Files: `assets/index-_z7Crv3b.js`, `assets/index-7KsDh9wq.css`
- Impact: These are stale build artifacts from an old deploy method the project no longer uses (CI now builds fresh into `dist/` and uploads via `actions/upload-pages-artifact@v3`). They serve no purpose and could confuse a reader into thinking they're the current build or a required file.
- Fix approach: `git rm -r assets/` if confirmed unreferenced by any current build/deploy step (deploy.yml only references `dist/`, `public/*`, and standard Vite build; nothing reads root `assets/`).

**Duplicate `robots.txt` (root and `public/`):**
- Issue: `robots.txt` exists both at the repo root and at `public/robots.txt`, with identical content (verified via `diff`). Only `public/robots.txt` is actually served by Vite (files in `public/` are copied to `dist/` root at build time); the root-level copy is not part of the build output.
- Files: `robots.txt`, `public/robots.txt`
- Impact: Low — the root copy is inert, but it's a duplicate that could drift out of sync with the real one if edited in only one place.
- Fix approach: Delete the root-level `robots.txt`; keep `public/robots.txt` as the single source of truth.

**TypeScript strict mode disabled:**
- Issue: `tsconfig.app.json` sets `"strict": false`, `"noUnusedLocals": false`, `"noUnusedParameters": false`, `"noImplicitAny": false`, `"noFallthroughCasesInSwitch": false`.
- Files: `tsconfig.app.json`
- Impact: TypeScript's type-checking safety net is largely off — implicit `any`, unused locals/params, and non-strict null/type checks all pass silently. Combined with the broken lint script (which would otherwise catch some of this), there's effectively no automated static-analysis gate on this codebase right now.
- Fix approach: Not urgent for a small static portfolio site with no `any`/`@ts-ignore` usage currently present (verified via grep — none found), but worth tightening incrementally (start with `noUnusedLocals`/`noUnusedParameters`) if the codebase grows.

## Known Bugs

None identified through code inspection beyond the broken lint script and CI workflow issue documented elsewhere in this document — no runtime error reports, stack traces, or bug-tracking artifacts exist in the repo to cross-reference.

## Security Considerations

**None significant identified.** This is a static, client-only portfolio site (no backend, no auth, no user input handling beyond client-side routing) built with Vite/React and deployed as static files to GitHub Pages. No `.env` files, credentials, or secrets were found in the repo (verified — no `.env*`, no credential/key files present). No API keys or third-party service integrations exist (see `INTEGRATIONS.md`).

## Performance Bottlenecks

**Large committed binary assets in `public/`:**
- Problem: Several files in `public/` are unusually large for a web-served portfolio site: `public/headshot_Carrazco.JPEG` is 20MB, `public/wearable vr glove report.pdf` is 25MB, `public/vr_glove_headset.jpg` is 2.8MB, `public/vr_glove.JPG` is 2.7MB, `public/acdcconverter.JPG` is 2.9MB, `public/skydiving.jpg` is 1.4MB.
- Files: `public/headshot_Carrazco.JPEG` (referenced directly in `src/pages/Home.tsx:60` as `/ee-portfolio/headshot_Carrazco.JPEG`), `public/wearable vr glove report.pdf` (referenced in `src/data/projects.ts:30`)
- Cause: Images are committed at original camera/phone resolution with no compression or resizing; the `headshot_Carrazco.JPEG` in particular is loaded directly on the Home page (likely above the fold) at 20MB — that's a very heavy asset for a hero/profile image on any connection, let alone mobile.
- Improvement path: Compress and resize images to web-appropriate dimensions/quality (e.g. convert to WebP, resize the headshot to something like 800px-1200px wide), and consider whether the 25MB PDF report needs to be linked directly vs. hosted elsewhere. This also compounds the git repo bloat noted in Tech Debt (`public/` totals 57MB).

## Fragile Areas

**GitHub Actions deploy workflow does a full "clean install" every deploy (`.github/workflows/deploy.yml`):**
- Files: `.github/workflows/deploy.yml`
- Why fragile: The build job's "Clean install" step (lines ~26-34) does `rm -rf node_modules`, `rm -f package-lock.json`, `npm cache clean --force`, `npm install`, then `npm install vite@4.5.2 --save-dev` as a separate follow-up install. This means every deploy resolves dependencies fresh against whatever the latest matching semver versions are at deploy time — package-lock.json is deleted before install, so it provides no reproducibility guarantee for CI even though it's committed. A future transitive dependency bump anywhere in the tree could break the build without any corresponding code change, and the workflow has no fallback strategy.
- Historical evidence this is a real risk, not theoretical: `git log --oneline -- .github/workflows/deploy.yml` shows a long chain of reactive fixup commits (`Fix Vite installation and version issues`, `Fix TypeScript build issues in GitHub Actions`, `Update GitHub Actions workflow to fix deployment`, `Downgrade lucide-react to stable version 0.294.0`, `Fix dependency conflicts and update installation process`, etc.) — the deploy pipeline has broken and been patched repeatedly.
- **Verified current state of the `npm@latest` force-install issue:** As of commit `c09e36d0` ("ci: stop force-installing npm@latest in deploy workflow", the current HEAD for this file), the line `npm install -g npm@latest` has been removed from the "Clean install" step. The commit message documents the root cause: `npm@latest` began requiring Node ≥22, but the workflow pins `node-version: '20'` (line 22), so the forced upgrade failed with `EBADENGINE` on every push, blocking all deploys. The current workflow (read directly from `.github/workflows/deploy.yml`) confirms the line is gone; the "Clean install" step now runs `rm -rf node_modules && rm -f package-lock.json && npm cache clean --force && npm install && npm install vite@4.5.2 --save-dev`, relying on the Node 20 runner's bundled npm rather than forcing an upgrade. This specific breakage is resolved, but the broader fragility of deleting the lockfile and reinstalling fresh on every deploy (described above) remains.
- Safe modification: Any change to this workflow should be tested via `workflow_dispatch` (already enabled, line 6) before relying on a `push` to `main` to validate it, since a broken deploy step blocks the live site from updating.
- Test coverage: None — no CI job runs `npm run build` or any check on pull requests; only the `push`-to-`main` and manual `workflow_dispatch` triggers exist (lines 3-6), meaning build breakage is only discovered at deploy time, not before merge.

**`npm run lint` and CI have no relationship — lint isn't run anywhere:**
- Files: `.github/workflows/deploy.yml`, `package.json`
- Why fragile: Since `npm run lint` is broken (see Tech Debt) and the deploy workflow never invokes it, there is no automated linting at any point in this project's pipeline. Combined with `strict: false` in `tsconfig.app.json`, code quality regressions (unused vars, type errors that would be caught by stricter settings, etc.) can be committed and deployed without any tooling flagging them.
- Safe modification: Fixing the lint script (see Tech Debt fix approach) and optionally adding a `npm run lint` / `npm run build` step to a PR-triggered CI check (not just the deploy-on-push workflow) would close this gap.

## Scaling Limits

Not applicable — this is a small static portfolio site (8 pages, no backend, no database) with no scaling concerns in the traditional sense.

## Dependencies at Risk

**`vite@4.5.2` pinned and manually reinstalled in CI:**
- Risk: `package.json` declares `"vite": "4.5.2"` (pinned exact version, devDependencies) but the CI workflow additionally runs `npm install vite@4.5.2 --save-dev` as an explicit second install step after the main `npm install` (`.github/workflows/deploy.yml`, "Clean install" step). Per the commit history (`git log --oneline -- .github/workflows/deploy.yml` → "Fix Vite installation and version issues"), this redundant reinstall was added reactively to work around some prior installation problem, but its continued necessity (given Vite is already correctly pinned in `package.json`) is unclear from the code alone.
- Impact: Low immediate risk since the version is pinned and consistent, but it's a workaround whose original cause isn't documented, making it unclear whether it's still needed or safe to remove without re-encountering whatever problem prompted it.
- Migration plan: If revisiting the deploy workflow, test removing the redundant `npm install vite@4.5.2 --save-dev` line (since `npm install` alone should already install the pinned version from `package.json`) via `workflow_dispatch` before committing to `main`.

**ESLint 8 (`eslint@^8.55.0`) is end-of-life relative to the flat-config API it's being asked to run:** covered in detail under Tech Debt above (`eslint.config.js` mismatch). Worth noting separately here that ESLint 8.x itself is no longer the actively maintained major version upstream (ESLint 9.x is current), so any fix should consider upgrading to ESLint 9 + `typescript-eslint` v8 (matching the original Lovable scaffold's intent) rather than patching ESLint 8 to limp along with mismatched config.

## Missing Critical Features

**No pull-request CI check (build/lint/typecheck):**
- Problem: `.github/workflows/deploy.yml` only triggers on `push` to `main` or manual `workflow_dispatch` — there is no workflow that runs on pull requests to validate a build, lint, or typecheck before merge.
- Blocks: Catching build-breaking changes before they reach `main` and trigger a live deploy. Currently, the only signal that something is broken is a failed deploy on the production branch itself (as evidenced by the repeated reactive fixup commits in the deploy workflow's history).

**No automated tests of any kind:**
- Problem: No test files exist in the repository (`find . -name "*.test.*" -o -name "*.spec.*"`, excluding `node_modules`, returns nothing) and no test runner is configured in `package.json` (no `jest`, `vitest`, or similar devDependency, no `test` script).
- Blocks: Any regression detection beyond manual visual review. For a content-driven static site of this size that may be acceptable, but it means every change (including dependency bumps) is unverified until manually checked in a browser.

## Test Coverage Gaps

**Entire codebase — no tests exist.** See TESTING.md for confirmation of the testing setup (or lack thereof). Given the site's small size (8 pages, mostly static content from `src/data/profile.ts` and `src/data/projects.ts`), the highest-value additions if tests were introduced would be:
- A build/typecheck smoke test in CI (catches the class of breakage this project has repeatedly hit in its deploy workflow history) — Priority: High
- Basic rendering tests for `src/pages/ProjectDetail.tsx` (dynamic route driven by `src/data/projects.ts`, most likely to break silently if data shape changes) — Priority: Low
- No priority assigned to unit-testing the unused `src/components/ui/` scaffold, since it isn't part of the live app (see Tech Debt)

---

*Concerns audit: 2026-08-18*
