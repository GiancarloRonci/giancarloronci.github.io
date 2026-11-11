import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from './data/categories';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    categories: z.array(z.enum(CATEGORY_SLUGS)).min(1),
    // Copertina facoltativa, in public/assets/images/posts/. Se è un SVG, accanto serve il PNG
    // con lo stesso nome (lo genera `npm run covers`) per l'anteprima sui social.
    cover: z
      .object({
        src: z.string().startsWith('/'),
        alt: z.string(),
      })
      .optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Collega le traduzioni quando i due file hanno nomi diversi (es. indirizzo in inglese per la
    // versione inglese): stesso valore in en/ e it/. Se manca, vale il nome del file.
    translationKey: z.string().optional(),
  }),
});

export const collections = { posts };
