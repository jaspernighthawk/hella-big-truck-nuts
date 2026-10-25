# Hella Big Truck Nuts (Astro edition)

The website of Hannah GD Santana, rebuilt in [Astro](https://astro.build)
from the original 2021 Hugo version.

## Running it on your computer

```sh
npm install     # once: downloads Astro into node_modules/
npm run dev     # starts a live-reloading preview at http://localhost:4321
npm run build   # writes the finished static site into dist/
```

## Where things live

| Folder / file          | What it is                                                   |
| ---------------------- | ------------------------------------------------------------ |
| `src/content/HBTN/`   | **All the writing.** One Markdown file per page.             |
| `src/pages/`           | Astro templates that turn the Markdown into HTML pages.      |
| `src/layouts/`         | The shared page shell (`<html>`, `<head>`, header, footer).  |
| `src/components/`      | Reusable chunks: Header, Footer, PageList.                   |
| `src/styles/global.css`| The site's CSS, all in one place, commented.                 |
| `public/`              | Files copied to the site untouched (the truck-nut photos).   |
| `src/content.config.ts`| Declares what frontmatter a page is allowed to have.         |
| `astro.config.mjs`     | Site-wide settings (the site URL, trailing slashes).         |

The manual — daily routine, Git and npm explained, how to add posts,
change the styling, and build components — is `GUIDE.md`.
