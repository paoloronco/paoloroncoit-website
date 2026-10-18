import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { getTransformedRoutes } from '@vercel/routing-utils';
import { markdownAccept, pageMarkdown } from './agent-content.mjs';

test('Discovery and cache headers match the homepage as well as nested paths', () => {
  const project = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  const { routes, error } = getTransformedRoutes({ headers: project.headers });
  assert.equal(error, null);
  for (const pathname of ['/', '/en', '/en/cv', '/writing/article', '/llms.txt']) {
    const headers = Object.assign({}, ...routes.filter((route) => new RegExp(route.src).test(pathname)).map((route) => route.headers));
    assert.equal(headers.Vary, 'Accept', pathname);
    assert.match(headers.Link ?? '', /rel="api-catalog"/, pathname);
    assert.match(headers['Content-Signal'] ?? '', /ai-input=yes/, pathname);
  }
});

test('Markdown negotiation requires an explicit acceptable media type', () => {
  const accepts = new RegExp(`^${markdownAccept}$`);
  for (const value of ['text/markdown', ' text/markdown ', 'TEXT/MARKDOWN', 'text/html, text/markdown;q=0.5', 'text/markdown; charset=utf-8; q=1', 'text/markdown;q=0, text/markdown;q=0.8']) {
    assert.ok(accepts.test(value), value);
  }
  for (const value of ['', '*/*', 'text/html', 'text/markdownx', 'application/json; profile="text/markdown"', 'text/markdown;q=0', 'text/markdown;q=0.000', 'text/markdown; charset=utf-8; q=0, text/html', 'text/markdown; Q=0; charset=utf-8', 'text/plain, text/markdown;q=0']) {
    assert.ok(!accepts.test(value), value);
  }
});

test('Markdown contains the requested page, language, tables and code, without UI or scripts', () => {
  const html = `<html lang="en"><head><title>Cloud &amp; AI</title><link rel="canonical" href="https://paoloronco.it/en/projects/test"></head>
    <body><header>Site navigation</header><main><h1>Cloud &amp; AI</h1><p>English content <a href="/en/contact">Contact</a>.</p>
    <pre data-language="js"><code><span>const value = 42;</span></code></pre><table><thead><tr><th>Tool</th><th>Use</th></tr></thead><tbody><tr><td>Astro</td><td>Static HTML</td></tr></tbody></table>
    <script>secret-script()</script><svg><title>Decorative SVG</title></svg><p aria-hidden="true">Hidden label</p><form>Chat form</form></main><footer>Site footer</footer></body></html>`;
  const page = pageMarkdown(html);
  assert.equal(page.pathname, '/en/projects/test');
  assert.equal(page.filename, 'en/projects/test.md');
  assert.match(page.markdown, /title: "Cloud & AI"/);
  assert.match(page.markdown, /language: "en"/);
  assert.match(page.markdown, /url: "https:\/\/paoloronco.it\/en\/projects\/test"/);
  assert.match(page.markdown, /# Cloud & AI/);
  assert.match(page.markdown, /\[Contact\]\(\/en\/contact\)/);
  assert.match(page.markdown, /```js\nconst value = 42;\n```/);
  assert.match(page.markdown, /\| Astro \| Static HTML \|/);
  assert.doesNotMatch(page.markdown, /Site navigation|Site footer|secret-script|Decorative SVG|Hidden label|Chat form/);
});

test('Homepages have distinct static Markdown paths; redirects are skipped', () => {
  const html = (pathname, lang) => `<html lang="${lang}"><title>Paolo</title><link rel="canonical" href="https://paoloronco.it${pathname}"><main><h1>Paolo</h1></main></html>`;
  assert.equal(pageMarkdown(html('/', 'it')).filename, 'index.md');
  assert.equal(pageMarkdown(html('/en', 'en')).filename, 'en.md');
  assert.equal(pageMarkdown('<meta http-equiv="refresh" content="0;url=/projects">'), null);
  assert.throws(() => pageMarkdown('<link rel="canonical" href="https://paoloronco.it/">'), /Missing main content/);
});
