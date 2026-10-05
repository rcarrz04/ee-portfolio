---
last_mapped_commit: c09e36d0ab5dcf2cab83ee5e887040ee7950517b
---

# External Integrations

**Analysis Date:** 2026-08-18

## APIs & External Services

This is a fully static, client-only site. No third-party API SDKs, HTTP clients (`fetch`/`axios`), or backend services are used anywhere in `src/`.

**Contact / Social (link-outs only, no API calls):**
- Email - `mailto:` link built from `profile.email` (`src/data/profile.ts`, rendered in `src/pages/Contact.tsx`)
- LinkedIn - Static external link, `profile.linkedin` (`src/data/profile.ts`)
- GitHub - Static external link, `profile.github` (`src/data/profile.ts`)

There is no contact form, form submission handler, or email-sending integration (e.g. Formspree, EmailJS) — `src/pages/Contact.tsx` renders three plain `<a href>` links only.

## Data Storage

**Databases:**
- None. No database client, ORM, or connection string present anywhere in the codebase.

**File Storage:**
- Local filesystem only, via the `public/` directory, copied verbatim into `dist/` at build time (see `.github/workflows/deploy.yml`). Contains images (`headshot_Carrazco.JPEG`, `pcbbanner.jpg`, `skydiving.jpg`, `vr_glove.JPG`, etc.) and PDFs (resume files, `ee108finalreport.pdf`, `wearable vr glove report.pdf`).
- Project/profile content is hardcoded in TypeScript data modules: `src/data/profile.ts` (bio, education, experience, skills) and `src/data/projects.ts` (project entries) — no CMS or external data source.

**Caching:**
- None detected. `@tanstack/react-query`'s `QueryClient` is instantiated in `src/App.tsx` but no queries are defined anywhere, so no caching behavior is actually exercised.

## Authentication & Identity

**Auth Provider:**
- None. This is a public, unauthenticated static portfolio site with no login, session, or identity concept.

## Monitoring & Observability

**Error Tracking:**
- None (no Sentry, LogRocket, or similar).

**Logs:**
- None beyond default browser console; no logging library or remote log shipping.

## CI/CD & Deployment

**Hosting:**
- GitHub Pages, served at a `/ee-portfolio/` subpath (matches `vite.config.ts` `base` and the `HashRouter` usage in `src/App.tsx`, which avoids needing server-side rewrite rules for client-side routes).

**CI Pipeline:**
- GitHub Actions workflow `.github/workflows/deploy.yml` ("Deploy to GitHub Pages"):
  - Triggers: push to `main`, or manual `workflow_dispatch`
  - Steps: checkout → setup Node 20 → clean install (removes `node_modules`/`package-lock.json`, reinstalls, force-pins `vite@4.5.2`) → `npm run build` → copy `public/*` into `dist/` → touch `dist/.nojekyll` → upload Pages artifact → deploy via `actions/deploy-pages@v4`
  - Uses GitHub's `github-pages` deployment environment with OIDC (`id-token: write` permission)

## Environment Configuration

**Required env vars:**
- `VITE_BASE_URL` (optional) - Overrides the Vite `base` path; set to `/ee-portfolio/` explicitly in the CI build step. Not required for local development (defaults to `/ee-portfolio/` in `vite.config.ts`).
- No other environment variables are read anywhere in the app.

**Secrets location:**
- None found. No `.env` files exist in the repo, and no API keys, tokens, or credentials are referenced in source.

## Webhooks & Callbacks

**Incoming:**
- None.

**Outgoing:**
- None.

---

*Integration audit: 2026-08-18*
