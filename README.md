# Ruben Carrazco: Portfolio

Personal portfolio site: https://rcarrz04.github.io/ee-portfolio/

Built with Vite, React, TypeScript, Tailwind, and framer-motion. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Develop

```sh
npm ci
npm run dev      # local dev server
npm run build    # production build into dist/
```

## Adding a project

Projects live in `src/data/projects.ts`. Add an entry there and put its images and PDFs in `public/`; the home page, projects page, and detail page all read from that one file. Use the `asset()` helper for any path under `public/` so URLs work under the `/ee-portfolio/` base path.
