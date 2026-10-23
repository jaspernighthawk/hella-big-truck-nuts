// src/lib/pages.ts
// ------------------------------------------------------------
// Little helper functions for working with the "pages" collection.
// Nothing here is Astro-specific magic — it's plain TypeScript that
// the page templates import so they don't repeat themselves.
// ------------------------------------------------------------
import { getCollection, type CollectionEntry } from 'astro:content';

export type Page = CollectionEntry<'pages'>;

/**
 * Every page that should be built, i.e. not a draft.
 * (Set `draft: true` in a file's frontmatter to hide it from the site.)
 */
export async function getPublishedPages(): Promise<Page[]> {
  return getCollection('pages', (page) => !page.data.draft);
}

/**
 * The direct children of a section, newest first.
 *
 * Pages are identified by their path-like id: "blog", "blog/j",
 * "blog/specials", "blog/specials/e". The children of "blog" are the
 * ids that start with "blog/" and have exactly one more segment —
 * so "blog/j" and "blog/specials" count, but "blog/specials/e" doesn't
 * (it belongs to "blog/specials").
 *
 * Pass parentId = "" to get the top-level sections (about, blog, ...).
 */
export function childrenOf(parentId: string, allPages: Page[]): Page[] {
  const prefix = parentId === '' ? '' : `${parentId}/`;

  return allPages
    .filter((page) => {
      if (page.id === 'home') return false;            // homepage text, not a section
      if (!page.id.startsWith(prefix)) return false;
      const rest = page.id.slice(prefix.length);
      return rest.length > 0 && !rest.includes('/');   // exactly one segment deeper
    })
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
