import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { entryLang, entrySlug } from '@/i18n/utils';
import { projectSocialImage, renderSocialImage } from '@/lib/social-image';

export const prerender = true;

export async function getStaticPaths() {
  const projects = await getCollection('work', (project) => !project.data.draft);
  const paths = projects.map((project) => ({
    params: { slug: projectSocialImage(project).replace('/og/projects/', '').replace(/\.png$/, '') },
    props: { project },
  }));
  // Mantiene validi gli URL delle immagini già memorizzati nelle anteprime social.
  const legacy = new Map<string, (typeof projects)[number]>();
  for (const project of projects) {
    const slug = entrySlug(project.id);
    if (!legacy.has(slug) || entryLang(project.id) === 'en') legacy.set(slug, project);
  }
  for (const [slug, project] of legacy) paths.push({ params: { slug }, props: { project } });
  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderSocialImage(props.project);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
