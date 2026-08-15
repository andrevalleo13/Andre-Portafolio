import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const journalCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/journal" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    readTime: z.string(),
    lang: z.enum(['en', 'es']).default('en'),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'journal': journalCollection,
};
