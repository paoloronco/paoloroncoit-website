import fs from 'node:fs';
import assert from 'node:assert/strict';

const mode = process.argv[2];
assert.ok(mode === 'enabled' || mode === 'disabled', 'Usage: node scripts/check-analytics-integration.mjs <enabled|disabled>');

const html = fs.readFileSync('dist/client/index.html', 'utf8');
const expected = [
  'G-TEST123456',
  'claritytestid',
  'cdn-cookieyes.com/client_data/',
  'googletagmanager.com/gtag/js',
  'clarity.ms/tag/',
  'cookieyes_banner_load',
  'cookieyes_consent_update',
];

if (mode === 'enabled') {
  for (const marker of expected) assert.ok(html.includes(marker), `Missing enabled analytics marker: ${marker}`);
  assert.ok(!html.includes('type="text/plain" data-cookieyes="cookieyes-analytics"'), 'Analytics scripts must not remain inert text/plain tags');
  assert.ok(html.includes('consentv2'), 'Microsoft Clarity ConsentV2 signal is missing');
  const cookieYesPosition = html.indexOf('cdn-cookieyes.com/client_data/');
  assert.ok(cookieYesPosition < html.indexOf('googletagmanager.com/gtag/js'), 'CookieYes must load before Google Analytics');
  assert.ok(cookieYesPosition < html.indexOf('clarity.ms/tag/'), 'CookieYes must load before Microsoft Clarity');
} else {
  for (const marker of ['googletagmanager.com/gtag/js', 'clarity.ms/tag/', 'cookieyes_banner_load', 'cookieyes_consent_update']) {
    assert.ok(!html.includes(marker), `Disabled build contains provider marker: ${marker}`);
  }
}

console.log(`Analytics integration check passed (${mode}).`);
