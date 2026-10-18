import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const mediaType = 'text/markdown'.replace(/[a-z]/g, (letter) => `[${letter}${letter.toUpperCase()}]`);
// Vercel matches header values with a regex; q=0 must exclude this media range.
export const markdownAccept = `(?:.*,[\\t ]*)?[\\t ]*${mediaType}(?![^,]*;[\\t ]*[qQ][\\t ]*=[\\t ]*0(?:\\.0*)?[\\t ]*(?:;|,|$))[\\t ]*(?:;[^,]*)?(?:,.*)?`;

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
turndown.use(gfm);
turndown.addRule('omitInterface', {
  filter: (node) =>
    ['SCRIPT', 'STYLE', 'SVG', 'BUTTON', 'FORM', 'INPUT', 'TEXTAREA'].includes(node.nodeName.toUpperCase()) ||
    node.getAttribute('aria-hidden') === 'true' || node.hasAttribute('hidden'),
  replacement: () => '',
});

export function pageMarkdown(html) {
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
  if (!canonical) return null;
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!main) throw new Error(`Missing main content: ${canonical}`);
  const title = turndown.turndown(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const lang = html.match(/<html\b[^>]*lang="([^"]+)"/i)?.[1];
  const pathname = new URL(canonical).pathname;
  const filename = pathname === '/' ? 'index.md' : `${pathname.slice(1)}.md`;
  const content = main.replace(/(<pre\b[^>]*\bdata-language="([^"]+)"[^>]*>\s*<code)>/g, '$1 class="language-$2">');
  const markdown = `---\ntitle: ${JSON.stringify(title)}\nlanguage: ${JSON.stringify(lang)}\nurl: ${JSON.stringify(canonical)}\n---\n\n${turndown.turndown(content)}\n`;
  return { pathname, filename, markdown };
}

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(file);
    else if (entry.name === 'index.html' || entry.name === '404.html') yield file;
  }
}

export default function agentContent() {
  const pages = [];
  const configFile = new URL('../.vercel/output/config.json', import.meta.url);
  const has = [{ type: 'header', key: 'accept', value: markdownAccept }];
  const headers = { 'Content-Type': 'text/markdown; charset=utf-8', Vary: 'Accept' };
  return {
    name: 'agent-content',
    hooks: {
      'astro:build:generated': ({ dir, logger }) => {
        pages.length = 0;
        for (const file of htmlFiles(fileURLToPath(dir))) {
          const page = pageMarkdown(readFileSync(file, 'utf8'));
          if (!page) continue;
          const destination = new URL(page.filename, dir);
          mkdirSync(new URL('.', destination), { recursive: true });
          writeFileSync(destination, page.markdown);
          pages.push(page);
        }
        logger.info(`Generated ${pages.length} Markdown pages`);
      },
      'astro:build:done': () => {
        const config = JSON.parse(readFileSync(configFile, 'utf8'));
        const filesystem = config.routes.findIndex((route) => route.handle === 'filesystem');
        if (filesystem === -1) throw new Error('Missing Vercel filesystem route');
        config.routes.splice(filesystem, 0, ...pages.map(({ pathname, filename }) => ({
          src: `^${pathname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
          has, dest: `/${filename}`, headers,
        })));
        const notFound = config.routes.findIndex((route) => route.status === 404 && route.dest === '/404.html');
        if (notFound === -1) throw new Error('Missing Vercel 404 route');
        config.routes.splice(notFound, 0, { src: '/.*', has, dest: '/404.md', headers, status: 404 });
        config.overrides = {
          ...config.overrides,
          ...Object.fromEntries(pages.map(({ filename }) => [filename, { contentType: headers['Content-Type'] }])),
        };
        writeFileSync(configFile, `${JSON.stringify(config, null, 2)}\n`);
      },
    },
  };
}
