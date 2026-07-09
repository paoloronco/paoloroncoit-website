import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist/client');
const site = 'https://paoloronco.it';
const failures = [];
const warnings = [];

function walk(dir, matcher, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file, matcher, out);
    else if (matcher(file)) out.push(file);
  }
  return out;
}

function relUrl(file) {
  return `/${path
    .relative(root, file)
    .replace(/\\/g, '/')
    .replace(/(^|\/)index\.html$/, '$1')
    .replace(/^404\.html$/, '404')}`;
}

function first(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? '';
}

function all(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1]?.trim() ?? '');
}

function stripNonNavigationalMarkup(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<pre\b[\s\S]*?<\/pre>/gi, '')
    .replace(/<code\b[\s\S]*?<\/code>/gi, '');
}

function hasLocalTarget(url) {
  const pathname = decodeURIComponent(url.pathname);
  const normalized = pathname === '/' ? '/index.html' : pathname.replace(/\/$/, '/index.html');
  const fileTarget = path.join(root, normalized);
  const htmlTarget = path.join(root, `${pathname.replace(/\/$/, '')}.html`);
  const indexTarget = path.join(root, pathname, 'index.html');
  return existsSync(fileTarget) || existsSync(htmlTarget) || existsSync(indexTarget);
}

function addIssue(kind, url, message) {
  const target = kind === 'failure' ? failures : warnings;
  target.push(`${url}: ${message}`);
}

if (!existsSync(root)) {
  console.error('dist/client not found. Run `npm run build` before `npm run seo:audit`.');
  process.exit(1);
}

const htmlFiles = walk(root, (file) => file.endsWith('.html'));
const canonicalOwners = new Map();

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const url = relUrl(file);
  const title = first(html, /<title>([\s\S]*?)<\/title>/i);
  const description = first(html, /<meta name="description" content="([^"]*)"/i);
  const robots = first(html, /<meta name="robots" content="([^"]*)"/i);
  const canonical = first(html, /<link rel="canonical" href="([^"]*)"/i);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const hreflangs = all(html, /<link rel="alternate" hreflang="([^"]+)"/gi);
  const noindex = robots.toLowerCase().includes('noindex');

  if (!title) addIssue('failure', url, 'missing <title>');
  if (!description) addIssue('failure', url, 'missing meta description');
  if (description && /\s{2,}|\r|\n/.test(description)) addIssue('failure', url, 'description is not normalized');
  if (!robots) addIssue('failure', url, 'missing robots meta');
  if (url === '/404' && !robots.includes('noindex')) addIssue('failure', url, '404 must be noindex');
  if (!canonical) addIssue('failure', url, 'missing canonical');
  if (canonical) {
    if (!canonical.startsWith(site)) addIssue('failure', url, `canonical outside site: ${canonical}`);
    canonicalOwners.set(canonical, [...(canonicalOwners.get(canonical) ?? []), url]);
  }
  if (!noindex) {
    for (const lang of ['it', 'en', 'x-default']) {
      if (!hreflangs.includes(lang)) addIssue('failure', url, `missing hreflang ${lang}`);
    }
  }
  if (h1Count !== 1 && url !== '/404') addIssue('failure', url, `expected 1 h1, found ${h1Count}`);
  if (!/<meta property="og:image" content="https:\/\/paoloronco\.it\//i.test(html)) addIssue('failure', url, 'missing absolute og:image');
  if (!/<meta name="twitter:title" content="/i.test(html)) addIssue('failure', url, 'missing twitter:title');
  if (!/<script is:inline type="application\/ld\+json"|<script type="application\/ld\+json"/i.test(html)) {
    addIssue('failure', url, 'missing JSON-LD');
  }
  if (title.length > 90) addIssue('warning', url, `long title (${title.length})`);
  if (description.length > 170) addIssue('warning', url, `long description (${description.length})`);

  const navigationalHtml = stripNonNavigationalMarkup(html);
  const references = all(navigationalHtml, /\b(?:href|src)=["']([^"']+)["']/gi);
  for (const reference of references) {
    if (
      !reference ||
      reference.startsWith('#') ||
      reference.includes('${') ||
      /^(mailto:|tel:|data:|javascript:|blob:)/i.test(reference)
    ) {
      continue;
    }

    let target;
    try {
      target = new URL(reference, site);
    } catch {
      addIssue('failure', url, `malformed link or asset reference: ${reference}`);
      continue;
    }

    if (target.origin !== site || target.pathname.startsWith('/api/')) continue;
    if (!hasLocalTarget(target)) addIssue('failure', url, `broken internal link or asset: ${reference}`);
  }
}

for (const [canonical, owners] of canonicalOwners.entries()) {
  if (owners.length > 1) addIssue('failure', canonical, `duplicate canonical owners: ${owners.join(', ')}`);
}

const sitemap = readFileSync(path.join(root, 'sitemap-0.xml'), 'utf8');
const sitemapUrls = all(sitemap, /<loc>(.*?)<\/loc>/g);
for (const badUrl of sitemapUrls.filter((url) => /\/work\/|\/docs\/|\/sitemap\.xml\/|\/writing\/(it|en)\//.test(url))) {
  addIssue('failure', badUrl, 'legacy or malformed URL appears in sitemap');
}

const rss = readFileSync(path.join(root, 'rss.xml'), 'utf8');
for (const badUrl of all(rss, /<link>(.*?)<\/link>/g).filter((url) => /\/writing\/(it|en)\//.test(url))) {
  addIssue('failure', badUrl, 'malformed localized RSS link');
}

console.log(`SEO audit scanned ${htmlFiles.length} HTML files and ${sitemapUrls.length} sitemap URLs.`);

if (warnings.length) {
  console.warn(`\nWarnings (${warnings.length}):`);
  for (const warning of warnings.slice(0, 40)) console.warn(`- ${warning}`);
  if (warnings.length > 40) console.warn(`- ...and ${warnings.length - 40} more`);
}

if (failures.length) {
  console.error(`\nFailures (${failures.length}):`);
  for (const failure of failures.slice(0, 80)) console.error(`- ${failure}`);
  if (failures.length > 80) console.error(`- ...and ${failures.length - 80} more`);
  process.exit(1);
}

console.log('SEO audit passed with no blocking failures.');
