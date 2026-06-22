import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

const repositories = [
  'n8n-templates',
  'AI-RAG-docuquery-app',
  'Lynx',
  'tab-session-saver',
  'infra-agent',
  'heretic-models',
  'spotify_to_ytmusic',
  'ai-photo-renamer',
  'enclave',
  'WorthTheHours',
  'GoogleCloud-Inventory-Automation',
  'skills-website',
  'Disk-Management-APP',
  'CloudFlare-DDNS-Updater',
  'PythonScript-Windows11-IntalledAPPS',
];

const errors = [];
const entries = new Map();

for (const language of ['it', 'en']) {
  for (const [index, repository] of repositories.entries()) {
    const file = `src/content/work/${language}/${repository}.md`;
    let source;

    try {
      source = await readFile(file, 'utf8');
    } catch {
      errors.push(`Missing ${file}`);
      continue;
    }

    const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
    if (!match) {
      errors.push(`Missing YAML frontmatter in ${file}`);
      continue;
    }

    const data = parse(match[1]);
    entries.set(`${language}/${repository}`, data);
    const expectedOrder = index + 1;
    const expectedFeatured = index < 3;
    const expectedUrl = `https://github.com/paoloronco/${repository}`;

    if (data.order !== expectedOrder) errors.push(`${file}: expected order ${expectedOrder}`);
    if (data.featured !== expectedFeatured) errors.push(`${file}: expected featured ${expectedFeatured}`);
    if (!data.links?.some((link) => link.href === expectedUrl)) errors.push(`${file}: missing ${expectedUrl}`);
  }
}

for (const repository of repositories) {
  const italian = entries.get(`it/${repository}`);
  const english = entries.get(`en/${repository}`);
  if (!italian || !english) continue;

  if (italian.category !== english.category) errors.push(`${repository}: language categories do not match`);
  if (JSON.stringify(italian.stack) !== JSON.stringify(english.stack)) errors.push(`${repository}: language stacks do not match`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Project catalog contract satisfied: ${repositories.length} paired repositories.`);
