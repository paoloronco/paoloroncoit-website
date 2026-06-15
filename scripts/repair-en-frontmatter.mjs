// Ripara/uniforma il frontmatter degli articoli EN.
// pubDate/tags/draft presi dall'IT (autorevoli); title/description dalla traduzione EN.
// Gestisce i file dove il modello ha dimenticato il "---" di chiusura o dei campi.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const IT = path.join(root, 'src', 'content', 'writing', 'it');
const EN = path.join(root, 'src', 'content', 'writing', 'en');

const FM_KEYS = /^(title|description|pubDate|updatedDate|tags|draft)\s*:/;

function splitFrontmatter(src) {
  const lines = src.split(/\r?\n/);
  if (lines[0] !== '---') return { fmLines: [], body: src };
  // cerca il secondo '---'
  let close = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') { close = i; break; }
  }
  if (close !== -1) {
    return { fmLines: lines.slice(1, close), body: lines.slice(close + 1).join('\n') };
  }
  // nessuna chiusura: prendi le righe-chiave iniziali come frontmatter
  let i = 1;
  const fm = [];
  while (i < lines.length && (FM_KEYS.test(lines[i]) || lines[i].trim() === '')) {
    if (lines[i].trim() !== '') fm.push(lines[i]);
    // ferma al primo blank seguito da contenuto non-chiave
    if (lines[i].trim() === '' && i + 1 < lines.length && !FM_KEYS.test(lines[i + 1])) { i++; break; }
    i++;
  }
  return { fmLines: fm, body: lines.slice(i).join('\n') };
}

const getVal = (fmLines, key) => {
  const l = fmLines.find((x) => new RegExp('^' + key + '\\s*:').test(x));
  if (!l) return undefined;
  let v = l.slice(l.indexOf(':') + 1).trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
  return v;
};

let repaired = 0, ok = 0, missingIt = 0;

for (const f of fs.readdirSync(EN).filter((x) => x.endsWith('.md'))) {
  const enPath = path.join(EN, f);
  const itPath = path.join(IT, f);
  if (!fs.existsSync(itPath)) { missingIt++; continue; }

  const enSrc = fs.readFileSync(enPath, 'utf8');
  const itSrc = fs.readFileSync(itPath, 'utf8');
  const en = splitFrontmatter(enSrc);
  const it = splitFrontmatter(itSrc);

  const title = getVal(en.fmLines, 'title') || getVal(it.fmLines, 'title') || f.replace(/\.md$/, '');
  const description = getVal(en.fmLines, 'description') || getVal(it.fmLines, 'description') || title;
  const pubDate = getVal(it.fmLines, 'pubDate') || '2024-01-01';
  const tagsRaw = (it.fmLines.find((x) => /^tags\s*:/.test(x)) || 'tags: []').replace(/^tags\s*:\s*/, '');
  let tags = '[]';
  try { tags = JSON.stringify(JSON.parse(tagsRaw)); } catch {}
  const draft = (getVal(it.fmLines, 'draft') || 'false');

  const rebuilt =
    ['---',
     `title: ${JSON.stringify(title)}`,
     `description: ${JSON.stringify(description)}`,
     `pubDate: ${pubDate}`,
     `tags: ${tags}`,
     `draft: ${draft}`,
     '---',
     ''].join('\n') + en.body.replace(/^\n+/, '') + '\n';

  // riscrive solo se cambia (così non tocca i file già perfetti inutilmente)
  if (rebuilt !== enSrc) { fs.writeFileSync(enPath, rebuilt, 'utf8'); repaired++; }
  else ok++;
}

console.log(`✅ Frontmatter EN: riparati/uniformati ${repaired}, già ok ${ok}, IT mancante ${missingIt}`);
