import { readFile } from 'node:fs/promises';

const files = ['src/styles/global.css', 'src/components/views/HomeView.astro'];
const source = (await Promise.all(files.map((file) => readFile(file, 'utf8')))).join('\n');
const required = ['--color-paper', '--color-signal', 'field-hero', 'dossier-row'];
const missing = required.filter((token) => !source.includes(token));

if (missing.length) {
  console.error(`Missing Field Manual contract: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Field Manual design contract satisfied.');
