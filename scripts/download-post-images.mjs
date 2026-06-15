// Scarica in locale le immagini remote referenziate negli articoli e riscrive i link.
// Output immagini: public/posts/<slug>/<file>   ->   link diventano /posts/<slug>/<file>
// Uso: node scripts/download-post-images.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(root, 'src', 'content', 'writing', 'it');
const PUBLIC_DIR = path.join(root, 'public', 'posts');

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

const urlRe = /(!\[[^\]]*\]\(|<img[^>]+src=["'])\s*(https?:\/\/[^)"'\s]+)/gi;
const extFromType = (ct) =>
  ({ 'image/png': '.png', 'image/jpeg': '.jpg', 'image/gif': '.gif', 'image/webp': '.webp', 'image/svg+xml': '.svg' }[ct] || '');

let downloaded = 0, failed = 0, rewritten = 0;

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const fp = path.join(POSTS_DIR, file);
  let content = fs.readFileSync(fp, 'utf8');

  // raccoglie URL unici
  const urls = new Set();
  let m;
  while ((m = urlRe.exec(content)) !== null) urls.add(m[2]);
  if (urls.size === 0) continue;

  const destDir = path.join(PUBLIC_DIR, slug);
  const used = new Set();
  let changed = false;

  for (const url of urls) {
    try {
      const res = await fetch(url, { redirect: 'follow' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const buf = Buffer.from(await res.arrayBuffer());

      // nome file
      let base = path.basename(new URL(url).pathname) || 'image';
      base = decodeURIComponent(base).split('?')[0].replace(/[^a-zA-Z0-9._-]/g, '_');
      if (!path.extname(base)) base += extFromType(res.headers.get('content-type') || '') || '.img';
      let name = base;
      let i = 1;
      while (used.has(name)) { const e = path.extname(base); name = base.slice(0, -e.length) + '-' + i++ + e; }
      used.add(name);

      fs.mkdirSync(destDir, { recursive: true });
      fs.writeFileSync(path.join(destDir, name), buf);
      const localPath = `/posts/${slug}/${name}`;
      content = content.split(url).join(localPath);
      changed = true;
      downloaded++;
    } catch (e) {
      console.warn(`  ⚠ ${slug}: impossibile scaricare ${url} (${e.message})`);
      failed++;
    }
  }

  if (changed) { fs.writeFileSync(fp, content, 'utf8'); rewritten++; }
}

console.log(`✅ Immagini scaricate: ${downloaded} · articoli aggiornati: ${rewritten} · fallite: ${failed}`);
