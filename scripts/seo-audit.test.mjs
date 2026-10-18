import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

test('SEO audit validates technical verification files and still rejects broken language links', () => {
  const fixture = mkdtempSync(path.join(tmpdir(), 'paoloronco-seo-'));
  const client = path.join(fixture, 'dist/client');
  mkdirSync(path.join(client, 'en'), { recursive: true });
  const page = (lang, pathname) => `<html lang="${lang}"><head>
    <title>Paolo Ronco</title><meta name="description" content="Personal portfolio."><meta name="robots" content="index, follow">
    <link rel="canonical" href="https://paoloronco.it${pathname}">
    <link rel="alternate" hreflang="it" href="https://paoloronco.it/">
    <link rel="alternate" hreflang="en" href="https://paoloronco.it/en">
    <link rel="alternate" hreflang="x-default" href="https://paoloronco.it/">
    <meta property="og:image" content="https://paoloronco.it/portrait.png"><meta name="twitter:title" content="Paolo Ronco">
    <script type="application/ld+json">{"@type":"Person"}</script></head><body><h1>Paolo Ronco</h1></body></html>`;
  const verificationFile = path.join(client, 'google123abc.html');
  const token = 'google-site-verification: google123abc.html';
  const audit = () => spawnSync(process.execPath, [fileURLToPath(new URL('./seo-audit.mjs', import.meta.url))], {
    cwd: fixture, encoding: 'utf8', timeout: 15000,
  });
  try {
    writeFileSync(path.join(client, 'index.html'), page('it', '/'));
    writeFileSync(path.join(client, 'en/index.html'), page('en', '/en'));
    writeFileSync(path.join(client, 'portrait.png'), 'fixture');
    writeFileSync(path.join(client, 'sitemap-0.xml'), '<urlset><url><loc>https://paoloronco.it/</loc></url><url><loc>https://paoloronco.it/en</loc></url></urlset>');
    writeFileSync(path.join(client, 'rss.xml'), '<rss><channel><link>https://paoloronco.it/</link></channel></rss>');
    writeFileSync(verificationFile, token);
    let result = audit();
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /2 HTML pages, 1 verification files/);

    writeFileSync(verificationFile, '<html>Wrong verification token</html>');
    result = audit();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /invalid Google site verification token/);

    writeFileSync(verificationFile, token);
    rmSync(path.join(client, 'en/index.html'));
    result = audit();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /broken internal link or asset: https:\/\/paoloronco\.it\/en/);
  } finally {
    assert.ok(path.resolve(fixture).startsWith(path.resolve(tmpdir()) + path.sep));
    rmSync(fixture, { recursive: true, force: true });
  }
});
