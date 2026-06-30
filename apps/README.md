# ATLAS Apps

Each app is a standalone project inside this folder.

## Structure

```
apps/
├── asteroids/          # standalone project (single HTML file)
│   └── index.html
├── kanban/
│   └── ...
└── ...
```

## Adding a new app

1. Create folder `apps/{name}/`
2. Init project: `npm create vite@latest . -- --template react-ts`
3. Configure `vite.config.ts` to output a single file:
   ```ts
   build: {
     outDir: '../../public/apps/{name}',
     rollupOptions: {
       output: { inlineDynamicImports: true }
     }
   }
   ```
4. Add the app to `src/data/apps.ts` with `status: 'wip'`
5. Change to `status: 'ready'` when done

## Building all apps

```bash
# From the atlas/ root
npm run build:apps   # builds all app/ projects
npm run build        # builds the Astro landing page
```
