// Promuove i "titoli in grassetto" (righe che sono SOLO **...**) a heading ## ,
// così riattivano TOC e ancore. Da WordPress molti titoli di sezione erano <strong>.
// Uso: node scripts/promote-headings.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dirs = [
  path.join(root, 'src', 'content', 'writing', 'it'),
  path.join(root, 'src', 'content', 'writing', 'en'),
];

// riga intera fatta solo di **testo** (max ~90 char, niente asterischi interni)
const re = /^\*\*([^*\n]{2,90}?)\*\*[ \t]*$/gm;

let changedFiles = 0;
let promoted = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const fp = path.join(dir, f);
    const src = fs.readFileSync(fp, 'utf8');
    // separa frontmatter dal corpo per non toccarlo
    const m = src.match(/^(---[\s\S]*?---\n)([\s\S]*)$/);
    if (!m) continue;
    const fm = m[1];
    let body = m[2];
    let count = 0;
    body = body.replace(re, (_, title) => {
      count++;
      return `## ${title.trim()}`;
    });
    if (count > 0) {
      fs.writeFileSync(fp, fm + body, 'utf8');
      changedFiles++;
      promoted += count;
    }
  }
}

console.log(`✅ Heading promossi: ${promoted} in ${changedFiles} file.`);
