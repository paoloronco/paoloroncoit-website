import assert from 'node:assert/strict';
import test from 'node:test';
import sharp from 'sharp';
import { projectSocialImage, writingSocialImage, renderSocialImage } from '../src/lib/social-image.ts';

const project = {
  id: 'en/homelab-backup',
  data: {
    title: 'Homelab Backup & Monitoring',
    summary: 'Backup automation and monitoring across self-hosted infrastructure.',
    category: 'cloud' as const,
    stack: ['Linux', 'Docker', 'Proxmox'],
    problem: '', solution: '', outcome: '', links: [],
    featured: false, order: 0, draft: false,
  },
};

test('cover URLs are stable, localized and change with the displayed content', () => {
  const url = projectSocialImage(project);
  assert.match(url, /^\/og\/projects\/en\/homelab-backup-[a-f0-9]{12}\.png$/);
  assert.equal(projectSocialImage(structuredClone(project)), url);
  assert.notEqual(projectSocialImage({ ...project, id: 'it/homelab-backup' }), url);
  for (const change of [
    { title: 'New title' }, { summary: 'Updated summary' },
    { stack: ['Linux', 'Bash'] }, { category: 'tool' as const },
  ]) assert.notEqual(projectSocialImage({ ...project, data: { ...project.data, ...change } }), url);
});

test('renders deterministic, opaque white PNGs at LinkedIn dimensions', async () => {
  const png = await renderSocialImage(project);
  const metadata = await sharp(png).metadata();
  assert.equal(metadata.format, 'png');
  assert.equal(metadata.width, 1200);
  assert.equal(metadata.height, 630);
  assert.ok(png.length < 5_000_000);
  const corner = await sharp(png).removeAlpha().extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer();
  assert.deepEqual([...corner], [255, 255, 255]);
  assert.ok((await sharp(png).stats()).isOpaque);
  assert.deepEqual(await renderSocialImage(project), png);
});

test('wraps long titles and safely renders markup, accents and an empty stack', async () => {
  const png = await renderSocialImage({
    ...project,
    id: 'it/test',
    data: {
      ...project.data,
      title: 'Windows 11 Installed Applications Exporter, Inventory & Infrastructure Automation',
      summary: 'Sicurezza e automazione: qualità, attività e controllo. <b>Testo letterale</b> & "virgolette".',
      stack: [],
    },
  });
  assert.equal((await sharp(png).metadata()).width, 1200);
});

const article = {
  id: 'en/homelab-backup',
  data: {
    title: 'Backups in a self-hosted homelab',
    description: 'A practical guide to keeping services and data recoverable.',
    tags: ['Linux', 'backup', 'Proxmox'],
    pubDate: new Date('2026-10-18'),
    draft: false,
  },
};

test('writing covers have their own localized URLs and content fingerprints', () => {
  const url = writingSocialImage(article);
  assert.match(url, /^\/og\/writing\/en\/homelab-backup-[a-f0-9]{12}\.png$/);
  assert.equal(writingSocialImage(structuredClone(article)), url);
  assert.notEqual(writingSocialImage({ ...article, id: 'it/homelab-backup' }), url);
  for (const change of [
    { title: 'New article title' }, { description: 'Updated description' }, { tags: ['Linux'] },
  ]) assert.notEqual(writingSocialImage({ ...article, data: { ...article.data, ...change } }), url);
});

test('renders article covers with tags and fits long editorial text without tags', async () => {
  const png = await renderSocialImage(article);
  const metadata = await sharp(png).metadata();
  assert.equal(metadata.format, 'png');
  assert.equal(metadata.width, 1200);
  assert.equal(metadata.height, 630);
  assert.ok((await sharp(png).stats()).isOpaque);
  assert.deepEqual(await renderSocialImage(article), png);
  const long = await renderSocialImage({
    ...article,
    id: 'it/long-article',
    data: {
      ...article.data,
      title: 'IT Support Simulator: my practical project to recreate real IT ticket management dynamics in a simulated enterprise helpdesk context',
      description: 'Una guida pratica: sicurezza, qualità e automazione. <b>Testo letterale</b> & "virgolette". '.repeat(5),
      tags: [],
    },
  });
  assert.equal((await sharp(long).metadata()).width, 1200);
});
