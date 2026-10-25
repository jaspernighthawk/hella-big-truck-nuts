// astro.config.mjs
// ------------------------------------------------------------
// This is Astro's one settings file. It plays the same role that
// config.toml played in the Hugo version, but it's JavaScript.
// Astro reads it once when you run `npm run dev` or `npm run build`.
// ------------------------------------------------------------
import { defineConfig } from 'astro/config';

export default defineConfig({
  // The final public address of the site. Astro uses this to build
  // absolute links in the sitemap and (later) the RSS feed.
  // Hugo had 'http://example.org/' here, which was a placeholder.
  site: 'https://hellabigtrucknuts.com',

  // 'always' means every page URL ends in a slash: /blog/j/ not /blog/j
  // That matches how Hugo built the old site, so old links keep working,
  // and it makes the relative "[Back](../)" links in the posts behave.
  trailingSlash: 'always',

  // Where the finished static site is written when you run `npm run build`.
  // (Hugo called this folder "public"; Astro's default is "dist".)
  outDir: './dist',
});
