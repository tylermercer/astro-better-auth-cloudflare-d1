// @ts-check
import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from 'astro/config';
import remarkFootnote from 'remark-footnotes';
import remarkEmdash from './lib/plugins/remark/emdash.js';
import rawFonts from './lib/plugins/vite/rawFonts.js';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  markdown: {
    remarkPlugins: [
      // @ts-ignore -- doesn't like remarkFootnote
      [remarkFootnote, {
        inlineNotes: true
      }],
      remarkEmdash],
  },
  vite: {
    plugins: [rawFonts(['.woff'])],
    ssr: {
      external: [
        'astro/container',
        'crypto',
        'fs',
        'path',
        'sharp',
        'esbuild',
      ].flatMap(id => [id, `node:${id}`]),
    },
  },
});