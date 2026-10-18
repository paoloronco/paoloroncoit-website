import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('.vercel/output/static');
const config = JSON.parse(readFileSync('.vercel/output/config.json', 'utf8'));
const sitemap = readFileSync(path.join(root, 'sitemap-0.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
const articlePaths = (lang) => urls.filter((url) => url.pathname.startsWith(lang === 'en' ? '/en/writing/' : '/writing/')).map((url) => url.pathname);
const markdownRoutes = config.routes.filter((route) => route.has?.some((condition) => condition.key === 'accept') && route.status !== 404);

for (const url of urls) {
  const filename = url.pathname === '/' ? 'index.md' : `${url.pathname.slice(1)}.md`;
  const markdown = readFileSync(path.join(root, filename), 'utf8');
  assert.ok(markdown.includes(`url: "${url.href}"`), filename);
  assert.ok(markdown.includes(`language: "${url.pathname.startsWith('/en') ? 'en' : 'it'}"`), filename);
  const prose = markdown.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[\t ]*$/gm, '');
  assert.doesNotMatch(prose, /<script\b|<style\b|<svg\b/i, filename);
  const route = markdownRoutes.find((route) => new RegExp(route.src).test(url.pathname));
  assert.equal(route?.dest, `/${filename}`, filename);
  assert.equal(config.overrides[filename].contentType, 'text/markdown; charset=utf-8');
}
assert.ok(!existsSync(path.join(root, 'api/terminal/writings.json')), 'Articles API must not be prerendered');
assert.ok(config.routes.some((route) => !route.has && new RegExp(route.src ?? '(?!)').test('/api/terminal/writings.json') && route.dest?.includes('_render')), 'Articles API must reach the server function');
const spec = JSON.parse(readFileSync(path.join(root, 'openapi.json'), 'utf8'));
assert.deepEqual(Object.keys(spec.paths), ['/api/terminal/writings.json']);
assert.equal(spec.paths['/api/terminal/writings.json'].get.operationId, 'listPublishedArticles');
const catalog = JSON.parse(readFileSync(path.join(root, '.well-known/api-catalog'), 'utf8'));
assert.equal(catalog.linkset[0]['service-desc'][0].href, 'https://paoloronco.it/openapi.json');
assert.match(readFileSync(path.join(root, 'robots.txt'), 'utf8'), /Content-Signal: search=yes, ai-input=yes, ai-train=no/);
console.log(`Build audit passed: ${urls.length} canonical Markdown pages, discovery documents and dynamic articles API.`);

const origin = process.argv[2];
if (origin) {
  async function get(pathname, accept = 'text/html', status = 200) {
    const response = await fetch(new URL(pathname, origin), { headers: { Accept: accept }, signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, status, `${pathname}: HTTP status`);
    return response;
  }
  const paths = ['/', '/en', '/cv', '/en/cv', '/projects', '/en/projects', articlePaths('it')[0], articlePaths('en')[0]];
  for (const pathname of paths) {
    const html = await get(pathname);
    assert.match(html.headers.get('content-type') ?? '', /text\/html/);
    assert.match(html.headers.get('vary') ?? '', /\baccept\b/i);
    assert.match(html.headers.get('content-signal') ?? '', /ai-input=yes/);
    assert.match(html.headers.get('link') ?? '', /rel="api-catalog"/);
    assert.match(await html.text(), /rel="alternate" type="text\/markdown"/);
    const markdown = await get(pathname, 'text/markdown');
    assert.match(markdown.headers.get('content-type') ?? '', /text\/markdown/);
    assert.match(markdown.headers.get('vary') ?? '', /\baccept\b/i);
    const filename = pathname === '/' ? 'index.md' : `${pathname.slice(1)}.md`;
    assert.equal(await markdown.text(), readFileSync(path.join(root, filename), 'utf8'), `${pathname}: published Markdown matches build`);
    const direct = await get(`/${filename}`, 'text/markdown');
    assert.match(direct.headers.get('content-type') ?? '', /text\/markdown/);
    assert.equal(await direct.text(), readFileSync(path.join(root, filename), 'utf8'));
    assert.match((await get(pathname, 'text/markdown;q=0, text/html')).headers.get('content-type') ?? '', /text\/html/);
  }
  for (const [pathname, type] of [['/.well-known/api-catalog', /application\/linkset\+json/], ['/openapi.json', /application\/vnd\.oai\.openapi\+json/]]) {
    assert.match((await get(pathname, 'application/json')).headers.get('content-type') ?? '', type);
  }
  assert.match((await get('/__agent-audit-missing-page', 'text/markdown', 404)).headers.get('content-type') ?? '', /text\/markdown/);
  assert.match((await get('/__agent-audit-missing-page', 'text/html', 404)).headers.get('content-type') ?? '', /text\/html/);
  const responses = {};
  for (const lang of ['en', 'it']) {
    const response = await get(`/api/terminal/writings.json?lang=${lang}`, 'text/markdown');
    assert.match(response.headers.get('content-type') ?? '', /application\/json/);
    assert.match(response.headers.get('cache-control') ?? '', /max-age=300/);
    const data = await response.json();
    assert.deepEqual(data.files.map((file) => file.href).sort(), articlePaths(lang).sort(), `${lang}: all and only published articles in this language`);
    for (const file of data.files) {
      assert.equal(typeof file.markdown, 'string');
      assert.match(file.filename, /^[a-zA-Z0-9._-]+\.md$/);
    }
    const dates = data.files.map((file) => file.markdown.match(/\ndate: ([\d-]+)/)?.[1]);
    assert.deepEqual(dates, [...dates].sort().reverse(), `${lang}: newest first`);
    responses[lang] = data;
    console.log(`HTTP API ${lang}: ${data.files.length} published articles, correct language paths and schema.`);
  }
  assert.notDeepEqual(responses.it, responses.en);
  for (const suffix of ['', '?lang=unknown']) {
    assert.deepEqual(await (await get(`/api/terminal/writings.json${suffix}`, 'application/json')).json(), responses.it, 'Italian fallback');
  }
  console.log(`HTTP audit passed: ${paths.length} HTML/Markdown pairs, q=0, direct Markdown, discovery, 404s and API language isolation at ${origin}.`);
}
