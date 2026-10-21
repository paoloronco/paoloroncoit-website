import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const mode = process.argv[2];
assert.ok(mode === 'enabled' || mode === 'disabled', 'Usage: node scripts/check-analytics-integration.mjs <enabled|disabled>');

const html = fs.readFileSync('dist/client/index.html', 'utf8');
const expected = [
  'G-TEST123456',
  'claritytestid',
  'app.termly.io/resource-blocker/8c058474-ccc0-4a3d-8d39-5cdebac8b508?autoBlock=on',
  'googletagmanager.com/gtag/js',
  'clarity.ms/tag/',
  "window.Termly.on('initialized'",
  "window.Termly.on('consent'",
];

assert.ok(!/cookieyes|cky-consent/i.test(html), 'Old CMP references must be removed');
assert.match(html.match(/<script\b[^>]*>/)?.[0] || '', /app\.termly\.io\/resource-blocker\//, 'Termly must be the first script');
assert.ok(html.includes('window.displayPreferenceModal()'), 'Footer consent preferences link is missing');

if (mode === 'enabled') {
  for (const marker of expected) assert.ok(html.includes(marker), `Missing enabled analytics marker: ${marker}`);
  assert.ok(html.includes('consentv2'), 'Microsoft Clarity ConsentV2 signal is missing');
} else {
  for (const marker of ['googletagmanager.com/gtag/js', 'clarity.ms/tag/', "window.Termly.on('consent'"]) {
    assert.ok(!html.includes(marker), `Disabled build contains provider marker: ${marker}`);
  }
}

const source = fs.readFileSync('src/components/Analytics.astro', 'utf8');
const script = [...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
  .find((match) => match[1].includes('document.currentScript'))[1];

function simulate(initialState, available = true) {
  let state = initialState;
  let reloads = 0;
  const listeners = {};
  const scripts = [];
  const insert = (element) => scripts.push(element);
  const window = {
    location: { reload: () => reloads++ },
    ...(available && { Termly: {
      on: (event, callback) => { listeners[event] = callback; },
      getConsentState: () => state,
    } }),
  };
  const document = {
    currentScript: { getAttribute: (name) => name === 'data-google-analytics-id' ? 'G-TEST123456' : 'claritytestid' },
    createElement: () => ({ setAttribute(name, value) { this[name] = value; } }),
    head: { appendChild: insert },
    getElementsByTagName: () => [{ parentNode: { insertBefore: insert } }],
  };
  vm.runInNewContext(script, { window, document });
  return {
    window, scripts,
    get reloads() { return reloads; },
    consent(nextState) { state = nextState; listeners.consent({ consentState: state }); },
    initialize(nextState) { state = nextState; listeners.initialized({}); },
  };
}

for (const state of [undefined, {}, { analytics: false }, { analytics: 'true' }]) {
  assert.equal(simulate(state).scripts.length, 0, 'No tracking without explicit analytics consent');
}
assert.equal(simulate({ analytics: true }, false).scripts.length, 0, 'A failed CMP must fail closed');
assert.equal(simulate({ analytics: true }).scripts.length, 2, 'Restore stored consent');
const session = simulate(undefined);
session.initialize({ analytics: false });
assert.equal(session.scripts.length, 0);
session.consent({ analytics: true });
session.consent({ analytics: true });
assert.equal(session.scripts.length, 2, 'Do not duplicate trackers on repeated consent events');
assert.ok(session.scripts.every((element) => element['data-categories'] === 'analytics'));
assert.equal(session.window['ga-disable-G-TEST123456'], false);
assert.equal(session.window.clarity.q.at(-1)[1].analytics_Storage, 'granted');
session.consent({ analytics: false });
assert.equal(session.window['ga-disable-G-TEST123456'], true);
assert.equal(session.window.dataLayer.at(-1)[2].analytics_storage, 'denied');
assert.equal(session.window.clarity.q.at(-1)[1].analytics_Storage, 'denied');
assert.equal(session.reloads, 1, 'Withdrawal must stop already-running trackers');

const navigationScript = [...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
  .find((match) => match[1].includes('astro:before-swap'))[1];
let beforeSwap;
let banner = {};
const termlyStyle = { textContent: '.termly-styles-root{}' };
const moved = [];
vm.runInNewContext(navigationScript, { document: {
  addEventListener: (event, callback) => { assert.equal(event, 'astro:before-swap'); beforeSwap = callback; },
  getElementById: () => banner,
  head: { querySelectorAll: () => [termlyStyle, { textContent: '.site{}' }] },
} });
const swap = { newDocument: { body: { prepend: (node) => moved.push(node) }, head: { appendChild: (node) => moved.push(node) } } };
beforeSwap(swap);
assert.deepEqual(moved, [banner, termlyStyle], 'Keep the CMP and its styles when Astro replaces the page');
banner = null;
assert.doesNotThrow(() => beforeSwap(swap), 'Navigation must work when the CMP is unavailable');

console.log(`Analytics integration check passed (${mode}).`);
