import assert from 'node:assert/strict';
import test from 'node:test';
import sharp from 'sharp';
import { projectSocialImage, renderProjectSocialImage } from '../src/lib/project-social-image.ts';

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
  const png = await renderProjectSocialImage(project);
  const metadata = await sharp(png).metadata();
  assert.equal(metadata.format, 'png');
  assert.equal(metadata.width, 1200);
  assert.equal(metadata.height, 630);
  assert.ok(png.length < 5_000_000);
  const corner = await sharp(png).removeAlpha().extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer();
  assert.deepEqual([...corner], [255, 255, 255]);
  assert.ok((await sharp(png).stats()).isOpaque);
  assert.deepEqual(await renderProjectSocialImage(project), png);
});

test('wraps long titles and safely renders markup, accents and an empty stack', async () => {
  const png = await renderProjectSocialImage({
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
