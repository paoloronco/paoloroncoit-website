import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import sharp from 'sharp';
import type { CollectionEntry } from 'astro:content';
import { site } from '../data/site.ts';

type Project = Pick<CollectionEntry<'work'>, 'id' | 'data'>;
type Article = Pick<CollectionEntry<'writing'>, 'id' | 'data'>;

const templateVersion = 'white-1';
const fontfile = resolve('src/assets/fonts/SpaceGrotesk.ttf');
const colors = {
  security: '#be123c',
  ai: '#6d28d9',
  automation: '#b45309',
  cloud: '#0369a1',
  tool: '#047857',
};

export function projectSocialImage(project: Project) {
  const { title, summary, category, stack } = project.data;
  const version = createHash('sha256')
    .update(JSON.stringify([templateVersion, site.name, site.url, project.id, title, summary, category, stack]))
    .digest('hex').slice(0, 12);
  return `/og/projects/${project.id}-${version}.png`;
}

export function writingSocialImage(post: Article) {
  const { title, description, tags } = post.data;
  const version = createHash('sha256')
    .update(JSON.stringify([templateVersion, site.name, site.url, post.id, title, description, tags]))
    .digest('hex').slice(0, 12);
  return `/og/writing/${post.id}-${version}.png`;
}

const escape = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
})[char]!);

async function text(value: string, size: number, color: string, height: number, bold = false) {
  for (let fontSize = size; fontSize >= Math.min(size, 20); fontSize -= 2) {
    const rendered = await sharp({ text: {
      text: `<span foreground="${color}">${escape(value)}</span>`,
      font: `Space Grotesk ${bold ? 'Bold' : ''} ${fontSize}`,
      fontfile,
      width: 1056,
      wrap: 'word-char',
      rgba: true,
    } }).png().toBuffer({ resolveWithObject: true });
    if (rendered.info.height <= height) return rendered;
  }
  throw new Error(`Social image text is too long: ${value.slice(0, 80)}`);
}

export async function renderSocialImage(entry: Project | Article) {
  const d = entry.data;
  const { title } = d;
  const { summary, accent, category, details } = 'summary' in d
    ? { summary: d.summary, accent: colors[d.category], category: d.category.toUpperCase(), details: d.stack }
    : { summary: d.description, accent: '#0369a1', category: 'WRITING', details: d.tags.map((tag) => `#${tag}`) };
  const lang = entry.id.split('/')[0];
  const section = 'summary' in d
    ? (lang === 'en' ? 'PROJECT' : 'PROGETTO')
    : (lang === 'en' ? 'ARTICLE' : 'ARTICOLO');
  const [heading, brand, badge, domain, locale] = await Promise.all([
    text(title, 64, '#0f172a', 168, true),
    text(site.name.toUpperCase(), 18, '#475569', 24, true),
    text(category, 18, accent, 24, true),
    text(new URL(site.url).hostname, 18, '#64748b', 24),
    text(`${section} / ${lang.toUpperCase()}`, 16, '#64748b', 24),
  ]);
  const description = await text(summary, 26, '#475569', 296 - heading.info.height);
  const background = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="white"/>
    <rect x="72" y="120" width="64" height="4" rx="2" fill="${accent}"/>
    <path d="M72 552H1128" stroke="#e2e8f0"/>
  </svg>`);
  const overlays: sharp.OverlayOptions[] = [
    { input: brand.data, left: 72, top: 64 },
    { input: badge.data, left: 1128 - badge.info.width, top: 64 },
    { input: heading.data, left: 72, top: 164 },
    { input: description.data, left: 72, top: 188 + heading.info.height },
    { input: domain.data, left: 72, top: 584 },
    { input: locale.data, left: 1128 - locale.info.width, top: 584 },
  ];
  if (details.length) {
    const tags = await text(details.slice(0, 4).join('  /  '), 20, '#64748b', 26);
    overlays.push({ input: tags.data, left: 72, top: 506 });
  }
  return sharp(background).composite(overlays).png({ compressionLevel: 9 }).toBuffer();
}
