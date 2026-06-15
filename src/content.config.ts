import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Articoli — Markdown/MDX in Git (Opzione B della proposta).
const writing = defineCollection({
  // esclude i file che iniziano con "_" (es. _template.md)
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/_*'], base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Progetti — formato "case file" investigativo.
const work = defineCollection({
  // esclude i file che iniziano con "_" (es. _template.md)
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/_*'], base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // Tag funzionali per il filtro del portfolio.
    category: z.enum(['security', 'ai', 'automation', 'cloud', 'tool']),
    stack: z.array(z.string()).default([]),
    // Struttura del case file.
    problem: z.string(),
    solution: z.string(),
    outcome: z.string(),
    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing, work };
