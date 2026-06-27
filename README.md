# Alien Zoo Field Journal

A strange, cozy field-notes app for observing Earth creatures like an alien researcher.

Use it for:

- real animal notes
- zoo-game planning
- imaginary species logs
- conservation study
- cute creature taxonomy
- soft little systems thinking

## Features

- Vite + React + TypeScript
- GitHub Pages deployment workflow
- mobile-friendly responsive layout
- starter species logs
- searchable specimen index
- localStorage creature logs
- field-card format for habitat, diet, behavior, enrichment, conservation, and Vivi notes

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

This repo is configured for GitHub Pages with Vite's base path set to:

```ts
base: '/alien-zoo/'
```

The deployment workflow lives at:

```txt
.github/workflows/deploy.yml
```

After the workflow runs, the site should publish at:

```txt
https://k766807.github.io/alien-zoo/
```

If Pages does not publish automatically, go to **Settings → Pages** and make sure the source is set to **GitHub Actions**.

## Project direction

Possible next upgrades:

- export logs as JSON
- printable field journal card
- Planet Zoo habitat-planning mode
- creature mood badges
- conservation flashcards
- alien taxonomy generator
- image slots for sketches or screenshots
