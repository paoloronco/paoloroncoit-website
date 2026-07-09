import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '@/data/site';
import { entryLang, entrySlug, localizePath } from '@/i18n/utils';

export async function GET(context) {
  const posts = await getCollection('writing', (e) => !e.data.draft);
  return rss({
    title: `${site.name} — Writing`,
    description: 'Security, AI/LLM, automazione e self-hosting.',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((p) => ({
        title: p.data.title,
        description: p.data.description,
        pubDate: p.data.pubDate,
        link: localizePath(`/writing/${entrySlug(p.id)}`, entryLang(p.id)),
        categories: p.data.tags,
      })),
  });
}
