// src/content.config.ts
// ------------------------------------------------------------
// A "content collection" is Astro's name for a folder of Markdown
// files that it reads, checks, and hands to your templates as data.
//
// This file does two jobs:
//   1. Says WHERE the Markdown lives (the `loader`).
//   2. Says WHAT frontmatter each file may have (the `schema`).
//      If a file breaks the rules — say, a misspelled date — Astro
//      stops the build and tells you which file and which field.
//      That's a feature: typos get caught before they go live.
//
// Hugo's equivalent was implicit: it accepted any frontmatter and
// silently ignored what it didn't understand.
// ------------------------------------------------------------
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  // Read every .md file inside src/content/HBTN/, at any depth.
  // Each file's "id" becomes its URL path, e.g.
  //   src/content/HBTN/blog/j.md          -> id "blog/j"        -> /blog/j/
  //   src/content/HBTN/about/index.md     -> id "about"         -> /about/
  // (an index.md stands for its folder, just like Hugo's _index.md)
   loader: glob({ pattern: '**/[^_]*.md', base: './src/content/HBTN' }),
  // `z` is Zod, a little library for describing the shape of data.
  schema: z.object({
    title: z.string(),

    // z.coerce.date() turns a frontmatter string like
    // "2021-12-12T11:01:45-08:00" into a real JavaScript Date.
    date: z.coerce.date(),

    // Everything below is optional. `.default(false)` means a page
    // with no `draft:` line counts as published.
    draft: z.boolean().default(false),
    author: z.string().optional(),

    // These three were Hugo "taxonomies". We keep the data so nothing
    // is lost; whether to build tag pages is a decision for later.
    tags: z.array(z.string()).nullish(),
    categories: z.array(z.string()).nullish(),
    moods: z.array(z.string()).nullish(),

    // Section pages only (an index.md): when true, the list of pages
    // inside this section shows each page's date after its title.
    // Set `listDates: true` in the section's frontmatter to turn it on.
    listDates: z.boolean().default(false),
  }),
});

// Export every collection you define. Right now there's just one.
export const collections = { pages };
