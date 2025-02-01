// @ts-check
import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from 'astro/config';
import remarkEmdash from './lib/plugins/remark/emdash.js';
import rawFonts from './lib/plugins/vite/rawFonts.js';
import generateRadixColorsSass, { GENERATE_RADIX_COLORS_SIGNATURE } from './lib/plugins/sass/radix-ui-colors/generateRadixColorsSassCustomFunction';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  output: 'server',
  experimental: {
    session: {
      driver: 'cloudflare-kv-binding',
      options: {
        binding: "SESSIONS",
      },
    },
  },
  markdown: {
    remarkPlugins: [
      remarkEmdash
    ],
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
        'buffer',
      ].flatMap(id => [id, `node:${id}`]),
    },
    css: {
      preprocessorOptions: {
        scss: {
          functions: {
            // @ts-ignore
            [GENERATE_RADIX_COLORS_SIGNATURE]: generateRadixColorsSass
          }
        }
      }
    },
  },
});