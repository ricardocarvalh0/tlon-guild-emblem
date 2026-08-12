# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a fresh Vite + React + TypeScript scaffold (`tlon-guild-emblem`). `src/App.tsx` is still the
unmodified Vite starter template — no application-specific components, routing, or state management
exist yet. MUI (`@mui/material`, `@mui/icons-material`), Emotion, and `@fontsource/roboto` are installed
as dependencies but not yet wired up anywhere in the code, so treat them as the intended UI stack when
building new components.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — type-check via `tsc -b` then produce a production build with `vite build`
- `npm run lint` — run ESLint over the whole project
- `npm run preview` — serve the production build locally

There is no test runner configured in this repository.

## Architecture

- Entry point: `src/main.tsx` mounts `<App />` from `src/App.tsx` into `#root` (see `index.html`) inside
  `React.StrictMode`.
- TypeScript is split via project references: `tsconfig.json` references `tsconfig.app.json` (app source,
  `src/`, target `es2023`, bundler module resolution, strict unused-locals/params checks) and
  `tsconfig.node.json` (Vite config tooling).
- ESLint config (`eslint.config.js`) uses the flat-config format: `@eslint/js` recommended +
  `typescript-eslint` recommended + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` (Vite
  variant), scoped to `**/*.{ts,tsx}`, with `dist` ignored.
- Static assets referenced via absolute `/…` paths (e.g. `/icons.svg#...`) are served from `public/`;
  assets imported in component code (e.g. `./assets/hero.png`) live under `src/assets/`.
