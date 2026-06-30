// @ts-check
import { readdirSync } from 'node:fs';
import { extname } from 'node:path';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// Cambia con il dominio definitivo prima del deploy.
const SITE = 'https://paoloronco.it';
const CERTIFICATE_ASSET_EXTENSIONS = new Set(['.pdf', '.png', '.webp']);

function getCertificateAssetPages() {
  try {
    return readdirSync(new URL('./public/certificati/', import.meta.url), { withFileTypes: true })
      .filter((entry) => entry.isFile() && CERTIFICATE_ASSET_EXTENSIONS.has(extname(entry.name).toLowerCase()))
      .map((entry) => new URL(`/certificati/${encodeURIComponent(entry.name)}`, SITE).toString());
  } catch {
    return [];
  }
}

/**
 * @param {string} page
 */
function isCanonicalSitemapPage(page) {
  const { pathname } = new URL(page);
  return !(
    pathname.startsWith('/api/') ||
    pathname === '/docs/' ||
    pathname === '/en/docs/' ||
    pathname === '/sitemap.xml/' ||
    pathname === '/work/' ||
    pathname.startsWith('/work/') ||
    pathname === '/en/work/' ||
    pathname.startsWith('/en/work/')
  );
}

export default defineConfig({
  site: SITE,
  redirects: {
    '/work': '/projects',
    '/work/[...slug]': '/projects/[...slug]',
    '/en/work': '/en/projects',
    '/en/work/[...slug]': '/en/projects/[...slug]',
    '/docs': '/certificati',
    '/en/docs': '/en/certifications',
    '/sitemap.xml': '/sitemap-index.xml',
  },
  // Le pagine restano statiche (prerender di default). Solo le route con
  // `export const prerender = false` (es. /api/ask) girano on-demand su Vercel.
  adapter: vercel({ maxDuration: 60 }),
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
    routing: {
      prefixDefaultLocale: false, // IT su "/", EN su "/en/"
    },
  },
  integrations: [
    mdx(),
    sitemap({
      customPages: getCertificateAssetPages(),
      filter: isCanonicalSitemapPage,
      i18n: {
        defaultLocale: 'it',
        locales: {
          it: 'it-IT',
          en: 'en-US',
        },
      },
    }),
  ],
  vite: {
    // cast: i tipi di Vite di Astro e di @tailwindcss/vite divergono (innocuo).
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
