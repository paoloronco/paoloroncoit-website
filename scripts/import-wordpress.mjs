// Importa i post da un export WordPress (.xml) in articoli Markdown.
// Uso:  node scripts/import-wordpress.mjs "percorso/export.xml"
// Output: src/content/writing/it/<slug>.md
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const OUT_DIR = path.join(root, 'src', 'content', 'writing', 'it');

const xmlPath = process.argv[2];
if (!xmlPath || !fs.existsSync(xmlPath)) {
  console.error('❌ Passa il percorso del file XML. Es: node scripts/import-wordpress.mjs "export.xml"');
  process.exit(1);
}

const xml = fs.readFileSync(xmlPath, 'utf8');

const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '_',
});
td.use(gfm);

// helpers ---------------------------------------------------------------
const cdata = (block, tag) => {
  const m = block.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`));
  return m ? m[1] : '';
};
const plainTag = (block, tag) => {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return m ? m[1].trim() : '';
};
const stripHtml = (html) =>
  html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const slugify = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const makeDesc = (text, fallback) => {
  let t = (text || '').trim();
  if (!t) return fallback;
  if (t.length <= 160) return t;
  const cut = t.slice(0, 160);
  return cut.slice(0, cut.lastIndexOf(' ')).trim() + '…';
};

// rimuove il disclaimer ChatGPT ricorrente
const dropDisclaimer = (md) =>
  md
    .split(/\n{2,}/)
    .filter((p) => !/(scritti con l['’]?\s*AI di OpenAI|OpenAI ChatGPT|ChatGPT,?\s*modello)/i.test(p))
    .join('\n\n')
    .trim();

// parsing ---------------------------------------------------------------
const items = xml.split('<item>').slice(1).map((s) => s.split('</item>')[0]);
fs.mkdirSync(OUT_DIR, { recursive: true });

const seen = new Set();
let ok = 0, skipped = 0;

for (const it of items) {
  const type = cdata(it, 'wp:post_type');
  const status = cdata(it, 'wp:status');
  if (type !== 'post' || status !== 'publish') { skipped++; continue; }

  const title = (cdata(it, 'title') || plainTag(it, 'title')).trim();
  const html = cdata(it, 'content:encoded');
  const dateRaw = cdata(it, 'wp:post_date') || '';
  const pubDate = (dateRaw.split(' ')[0]) || '2024-01-01';
  let slug = cdata(it, 'wp:post_name') || slugify(title);
  slug = slugify(decodeURIComponent(slug));
  if (!slug) { skipped++; continue; }
  if (seen.has(slug)) slug = `${slug}-${seen.size}`;
  seen.add(slug);

  // categorie -> tag
  const tags = [];
  const catRe = /<category domain="category" nicename="([^"]+)"><!\[CDATA\[([^\]]*)\]\]><\/category>/g;
  let cm;
  while ((cm = catRe.exec(it)) !== null) {
    const nice = cm[1];
    if (nice && nice !== 'uncategorized') tags.push(nice);
  }

  // contenuto
  let md = dropDisclaimer(td.turndown(html || ''));
  const excerpt = stripHtml(cdata(it, 'excerpt:encoded'));
  const description = makeDesc(excerpt || stripHtml((html || '').replace(/<!--[\s\S]*?-->/g, '')), title);

  const fm = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `pubDate: ${pubDate}`,
    `tags: ${JSON.stringify(tags)}`,
    'draft: false',
    '---',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), fm + md + '\n', 'utf8');
  ok++;
}

console.log(`✅ Importati ${ok} articoli in ${path.relative(root, OUT_DIR)} (saltati ${skipped} non-post).`);
