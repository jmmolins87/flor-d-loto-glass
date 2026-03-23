# Repository Guidelines

## Project Structure & Module Organization
This repository is a `Next.js` App Router project with `TypeScript` and `Storyblok` as the external CMS.

- `app/`: routes, layouts, metadata, and API handlers. Public pages live under `app/(site)`, admin pages under `app/admin`, and server endpoints under `app/api`.
- `components/`: reusable UI split by purpose: `ui/`, `layout/`, `sections/`, `forms/`, `cards/`, and `shared/`.
- `lib/`: domain utilities such as Storyblok fetchers, SEO helpers, validation, auth, and site config.
- `public/`: static assets such as images and fallback videos.

Prefer the `@/*` import alias defined in [tsconfig.json](/Users/juanmamolinscortes/Documentos/floristeria-premium/tsconfig.json).

## Build, Test, and Development Commands
- `pnpm dev` or `npm run dev`: start the local Next.js dev server on `http://localhost:3000`.
- `pnpm build` or `npm run build`: create the production build with webpack.
- `pnpm start` or `npm run start`: build and serve the production app locally.
- `pnpm lint` or `npm run lint`: run ESLint across the repository.
Use `pnpm` when possible because the repo includes [pnpm-lock.yaml](/Users/juanmamolinscortes/Documentos/floristeria-premium/pnpm-lock.yaml).

## Coding Style & Naming Conventions
Use `TypeScript`, strict mode, and 2-space indentation. Follow the existing style: double quotes, semicolons, and named exports for shared modules unless a framework file requires a default export.

Use `PascalCase` for React components, `camelCase` for functions and variables, and lowercase route folder names such as `app/(site)/contacto`. Keep CMS mapping files grouped under `lib/storyblok/` and shared types under `lib/cms/`.

## Testing Guidelines
There is currently no dedicated unit or integration test suite configured. Until one is added, treat `pnpm lint` and `pnpm build` as the minimum validation before opening a PR. If you add tests, place them near the feature or in a dedicated `__tests__/` folder and use `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines
Recent commits use short, lowercase summaries in Spanish, for example `se añaden paginas legales nuevo checkbox`. Keep commit messages concise, imperative, and focused on one change.

PRs should include a clear summary, affected routes or CMS areas, linked issues when applicable, and screenshots for visible UI updates. Note any required environment variables, Storyblok content-model changes, or migration steps before requesting review.

## Configuration Notes
The project targets `Node 22.x`. Keep secrets in local environment files, never in source control. When changing Storyblok fetchers or content structure, verify both the storefront and the linked Storyblok space still match.
