// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Cambia con il dominio definitivo prima del deploy.
const SITE = 'https://paoloronco.it';

export default defineConfig({
  site: SITE,
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
    routing: {
      prefixDefaultLocale: false, // IT su "/", EN su "/en/"
    },
  },
  integrations: [mdx(), sitemap()],
  vite: {
    // cast: i tipi di Vite di Astro e di @tailwindcss/vite divergono (innocuo).
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
