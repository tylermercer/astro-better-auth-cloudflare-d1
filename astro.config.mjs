// @ts-check
import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from 'astro/config';
import generateRadixColorsSass, { GENERATE_RADIX_COLORS_SIGNATURE } from './lib/plugins/sass/radix-ui-colors/generateRadixColorsSassCustomFunction';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  output: 'server',
  experimental: {
    // Not needed for better-auth, just added for convenience in storing non-auth session data (e.g. wizard form step data)
    session: {
      driver: 'cloudflare-kv-binding',
      options: {
        binding: "SESSIONS",
      },
    },
  },
  vite: {
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