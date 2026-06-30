# ATLAS

**All Tools Locally Accessible and Simple**

A curated collection of browser-based tools and games that run entirely offline — no install, no server, no account required. Everything lives in a single HTML file per app.

🔗 **Live site:** [alexiej.github.io/atlas](https://alexiej.github.io/atlas)  
🐦 **Follow:** [@ArekKlemenko](https://x.com/ArekKlemenko)

---

## What is ATLAS?

ATLAS is a landing page + app collection where every tool is a standalone `.html` file. Open it in a browser, it works. No network calls, no build step required by the user, no data leaving your machine.

Apps are built with:
- Pure HTML + Canvas (games)
- Web Audio API (sound)
- localStorage / IndexedDB (persistence)

---

## Stack

| Layer | Tech |
|-------|------|
| Landing page | [Astro 4](https://astro.build) |
| UI components | React 18 + TypeScript |
| Styling | CSS custom properties |
| Font | [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) + Inter |
| Deployment | GitHub Pages |

---

## Project structure

```
atlas/
├── src/
│   ├── components/
│   │   ├── AtlasApp.tsx    # Root — state + layout
│   │   ├── Header.tsx      # Logo + search + theme toggle
│   │   ├── FilterBar.tsx   # Category filters
│   │   ├── AppCard.tsx     # Bento grid card
│   │   ├── AppGrid.tsx     # Grid of cards
│   │   ├── RightPanel.tsx  # Slide-in detail panel
│   │   └── Footer.tsx      # Links + license
│   ├── data/
│   │   └── apps.ts         # App registry (types + data + constants)
│   ├── layouts/
│   │   └── Layout.astro    # HTML shell + fonts
│   ├── pages/
│   │   └── index.astro     # Entry point
│   └── styles/
│       └── globals.css     # All CSS
├── apps/
│   └── asteroids/
│       └── index.html      # Standalone app (single file)
├── public/
│   └── screenshots/        # App cover images (16:9)
└── astro.config.mjs
```

---

## Getting started

```bash
npm install
npm run dev       # http://localhost:4321/atlas
npm run build     # output → dist/
```

---

## Adding a new app

1. Create `apps/{name}/index.html` — fully self-contained, no external deps.
2. Add an entry to `src/data/apps.ts`:

```ts
{
  id:     'my-tool',
  title:  'MY TOOL',
  sub:    'Short tagline',
  cat:    'Tools',           // Games | Tools | Media | Productivity | Editors | Visualize
  status: 'ready',           // ready | wip | soon
  size:   '',                // '' | 'large' (2×2) | 'wide' (2×1) | 'tall' (1×2)
  desc:   'What it does.',
  cover:  '/atlas/screenshots/my-tool.jpg',
  url:    '/atlas/apps/my-tool/index.html',
  tags:   ['tag1', 'tag2'],
}
```

3. Add a screenshot to `public/screenshots/{name}.jpg` (1280×720 recommended).

---

## Apps

| App | Category | Status |
|-----|----------|--------|
| Asteroids | Games | ✅ Ready |

---

## Deploy

```bash
npm run build
# push dist/ to gh-pages branch
```

`astro.config.mjs` base URL:

```js
export default defineConfig({
  site: 'https://alexiej.github.io',
  base: '/atlas',
});
```

---

## License

MIT © 2026 [Arek Klemenko](https://x.com/ArekKlemenko)
