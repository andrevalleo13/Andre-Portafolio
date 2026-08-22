import { z, defineCollection } from 'astro:content';

const journalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    readTime: z.string().optional(),
    lang: z.string().default('en'),
    draft: z.boolean().default(false),
  }),
});

const workCollection = defineCollection({
  type: 'content',
});

export const collections = {
  'journal': journalCollection,
  'work': workCollection,
};
