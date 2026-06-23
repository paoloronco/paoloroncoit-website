import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { entryLang, entrySlug, localizePath, type Lang } from '@/i18n/utils';

const safeFilename = (slug: string) => `${slug.replace(/\/index$/, '').replace(/[^a-zA-Z0-9._-]+/g, '-')}.md`;

export const GET: APIRoute = async ({ url }) => {
  const lang: Lang = url.searchParams.get('lang') === 'en' ? 'en' : 'it';
  const posts = (await getCollection('writing', (entry) => !entry.data.draft && entryLang(entry.id) === lang)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  const files = posts.map((post) => {
    const slug = entrySlug(post.id);
    const data = post.data;
    const body = typeof post.body === 'string' ? post.body.trim() : '';
    const lines = [
      `# ${data.title}`,
      '',
      data.description,
      '',
      `date: ${data.pubDate.toISOString().slice(0, 10)}`,
      `tags: ${data.tags.join(', ') || '-'}`,
    ];
    if (data.updatedDate) lines.push(`updated: ${data.updatedDate.toISOString().slice(0, 10)}`);
    if (body) lines.push('', '---', '', body);
    return {
      filename: safeFilename(slug),
      markdown: lines.join('\n'),
      href: localizePath(`/writing/${slug}`, lang),
    };
  });

  return new Response(JSON.stringify({ files }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
