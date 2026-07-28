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
const CONTENT_ENTRY_EXTENSIONS = new Set(['.md', '.mdx']);
const RESERVED_ROOT_PATHS = new Set([
  '404',
  'about',
  'api',
  'ask',
  'certificati',
  'contact',
  'cookie',
  'cv',
  'docs',
  'en',
  'privacy',
  'projects',
  'rss.xml',
  'sitemap.xml',
  'skills',
  'terms',
  'work',
  'writing',
]);

/**
 * @param {'it' | 'en'} lang
 */
function getWritingSlugs(lang) {
  try {
    return readdirSync(new URL(`./src/content/writing/${lang}/`, import.meta.url), { withFileTypes: true })
      .filter((entry) => entry.isFile() && CONTENT_ENTRY_EXTENSIONS.has(extname(entry.name).toLowerCase()))
      .map((entry) => entry.name.replace(/\.(md|mdx)$/i, ''))
      .filter((slug) => slug && !RESERVED_ROOT_PATHS.has(slug));
  } catch {
    return [];
  }
}

function getLegacyRedirects() {
  /** @type {Record<string, string>} */
  const redirects = {};

  /**
   * @param {string} from
   * @param {string} to
   */
  const add = (from, to) => {
    const source = from === '/' ? '/' : from.replace(/\/+$/, '');
    const destination = to === '/' ? '/' : to.replace(/\/+$/, '');

    redirects[source] = destination;
  };

  add('/portfolio', '/projects');
  add('/projects-websites', '/projects');
  add('/my-skills', '/skills');
  add('/all-my-websites', '/projects');
  add('/ai-chatbot', '/ask');
  add('/cookie-policy', '/cookie');
  add('/links', '/projects/orbitpage');
  add('/lynx-un-link-manager-open-source-e-self-hosted', '/writing/orbitpage-un-link-manager-open-source-e-self-hosted');
  add('/n8n-voiceovers', '/writing/n8n-template-wordpress-ai-voiceovers-with-google-cloud');
  add('/en/ai-chatbot', '/en/ask');
  add('/en/cookie-policy', '/en/cookie');
  add('/en/links', '/en/projects/orbitpage');
  add('/en/lynx-un-link-manager-open-source-e-self-hosted', '/en/writing/orbitpage-un-link-manager-open-source-e-self-hosted');
  add('/en/portfolio', '/en/projects');
  add('/en/projects-websites', '/en/projects');
  add('/en/projects-websites-2', '/en/projects');
  add('/en/voiceovers', '/en/writing/n8n-template-wordpress-ai-voiceovers-with-google-cloud');
  add('/writing/it/lynx-un-link-manager-open-source-e-self-hosted', '/writing/orbitpage-un-link-manager-open-source-e-self-hosted');
  add('/writing/en/lynx-un-link-manager-open-source-e-self-hosted', '/en/writing/orbitpage-un-link-manager-open-source-e-self-hosted');

  for (const slug of getWritingSlugs('it')) {
    add(`/${slug}`, `/writing/${slug}`);
    add(`/it/${slug}`, `/writing/${slug}`);
    add(`/writing/it/${slug}`, `/writing/${slug}`);
    add(`/${slug}/feed`, `/writing/${slug}`);
  }

  for (const slug of getWritingSlugs('en')) {
    add(`/en/${slug}`, `/en/writing/${slug}`);
    add(`/writing/en/${slug}`, `/en/writing/${slug}`);
    add(`/en/${slug}/feed`, `/en/writing/${slug}`);
  }

  return redirects;
}

/**
 * @param {string} page
 */
function isCanonicalSitemapPage(page) {
  const { pathname } = new URL(page);
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  return !(
    normalizedPath === '/api' ||
    normalizedPath.startsWith('/api/') ||
    normalizedPath === '/docs' ||
    normalizedPath === '/en/docs' ||
    normalizedPath === '/sitemap.xml' ||
    normalizedPath === '/work' ||
    normalizedPath.startsWith('/work/') ||
    normalizedPath === '/en/work' ||
    normalizedPath.startsWith('/en/work/')
  );
}

export default defineConfig({
  site: SITE,
  // Mantiene sitemap, canonical, hreflang e link interni sulla stessa variante.
  // Vercel applica il relativo redirect permanente tramite vercel.json.
  trailingSlash: 'never',
  redirects: {
    ...getLegacyRedirects(),
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
      prefixDefaultLocale: false, // IT su "/", EN su "/en"
    },
  },
  integrations: [
    mdx(),
    sitemap({
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
