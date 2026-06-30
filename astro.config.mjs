import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',            // generates flat HTML/CSS/JS — required for GitHub Pages
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }), // globals.css handles @tailwind directives
  ],
  site: 'https://alexiej.github.io',
  base: '/ATLAS',
});
