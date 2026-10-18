import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { writingSocialImage, renderSocialImage } from '@/lib/social-image';

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection('writing', (post) => !post.data.draft);
  return posts.map((post) => ({
    params: { slug: writingSocialImage(post).replace('/og/writing/', '').replace(/\.png$/, '') },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderSocialImage(props.post);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
