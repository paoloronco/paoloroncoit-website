import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import sharp from 'sharp';
import type { CollectionEntry } from 'astro:content';
import { site } from '../data/site.ts';

type Project = Pick<CollectionEntry<'work'>, 'id' | 'data'>;

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
  throw new Error(`Project social image text is too long: ${value.slice(0, 80)}`);
}

export async function renderProjectSocialImage(project: Project) {
  const { title, summary, category, stack } = project.data;
  const accent = colors[category];
  const lang = project.id.split('/')[0];
  const [heading, description, brand, badge, domain, locale] = await Promise.all([
    text(title, 64, '#0f172a', 168, true),
    text(summary, 26, '#475569', 128),
    text(site.name.toUpperCase(), 18, '#475569', 24, true),
    text(category.toUpperCase(), 18, accent, 24, true),
    text(new URL(site.url).hostname, 18, '#64748b', 24),
    text(`${lang === 'en' ? 'PROJECT' : 'PROGETTO'} / ${lang.toUpperCase()}`, 16, '#64748b', 24),
  ]);
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
  if (stack.length) {
    const technologies = await text(stack.slice(0, 4).join('  /  '), 20, '#64748b', 26);
    overlays.push({ input: technologies.data, left: 72, top: 506 });
  }
  return sharp(background).composite(overlays).png({ compressionLevel: 9 }).toBuffer();
}
