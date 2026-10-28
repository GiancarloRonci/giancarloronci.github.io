// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://giancarloronci.github.io',
  // Inglese senza prefisso (/about/), italiano sotto /it/ (/it/about/)
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-GB', it: 'it-IT' },
      },
    }),
  ],
});
