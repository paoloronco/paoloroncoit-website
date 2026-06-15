// Normalizza i tag negli articoli (it/ ed en/): corregge slug sbagliati,
// unifica i doppioni, ordina. Esegui DOPO la traduzione.
// Uso: node scripts/normalize-tags.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dirs = [
  path.join(root, 'src', 'content', 'writing', 'it'),
  path.join(root, 'src', 'content', 'writing', 'en'),
];

// mappa di rinomina/unione (slug originale -> slug pulito)
const MAP = {
  'kali-linux-linux': 'kali-linux',
  'raspberrypi': 'raspberry-pi',
  'ms-windows': 'windows',
  'sicurezza-informatica': 'security',
  'cybersecurity': 'security',
  'information-security': 'security',
  'n8n-guides': 'n8n',
  // invariati: proxmox, server, web, linux, cloud, hardware, iot
};

const normalize = (tag) => MAP[tag] ?? tag;

let changed = 0;
const seenTags = new Set();

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const fp = path.join(dir, f);
    const src = fs.readFileSync(fp, 'utf8');
    const m = src.match(/^tags:\s*(\[[^\]]*\])\s*$/m);
    if (!m) continue;
    let arr;
    try { arr = JSON.parse(m[1]); } catch { continue; }
    const cleaned = [...new Set(arr.map(normalize))].sort();
    cleaned.forEach((t) => seenTags.add(t));
    const newLine = `tags: ${JSON.stringify(cleaned)}`;
    if (newLine !== `tags: ${m[1]}`) {
      fs.writeFileSync(fp, src.replace(m[0], newLine), 'utf8');
      changed++;
    }
  }
}

console.log(`✅ Tag normalizzati. File aggiornati: ${changed}`);
console.log(`   Tag finali in uso: ${[...seenTags].sort().join(', ')}`);
