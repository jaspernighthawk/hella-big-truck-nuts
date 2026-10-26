# How to run Hella Big Truck Nuts

A manual for the site's owner. It assumes nothing except that you've
opened Terminal before. Sections 1–3 are what you need day to day;
4–6 are for when you want to change how the site works or looks;
7 is a map of where the site lives; 8 is for when things break.

---

## 1. The daily routine

Every working session goes like this. Open Terminal (it's in
Applications → Utilities, or type "Terminal" into Spotlight). You'll
see a line ending in `%` — that's the **prompt**, meaning Terminal is
waiting for a command. Type or paste one line at a time and press
Return after each:

```sh
cd "/Users/jasperluna/Desktop/Claude Projects/Hella Big Truck Nuts/hbtn-astro"
npm run dev
```

The first line moves Terminal into the site's folder and prints nothing
(no news is good news). The second starts the preview server and prints
a few lines ending in `Local  http://localhost:4321/`. **The prompt
doesn't come back** — the server has taken over this Terminal window
and will keep printing a line for every page you visit. That's normal.

Open **http://localhost:4321/** in a browser. ("localhost" means "this
computer"; the page exists only on your Mac.) Edit any file in BBEdit or
Obsidian, save, and the browser updates by itself — no reloading, no
rebuilding.

Write, tweak, look. When you're happy, stop the server so you can type
commands again: click in the Terminal window and press **Ctrl+C**
(Control, not Command). The prompt comes back. Then:

```sh
git add -A
git commit -m "what changed"
git push
```

…replacing `what changed` with a few words describing the edit, in
quotes. About a minute later the change is on the live site. Start the
server again with `npm run dev` whenever you want to keep working.

If you'd rather keep the server running while you commit, open a second
Terminal tab with **Cmd+T**, `cd` into the folder there too, and use
that tab for Git. Each tab has its own current folder.

---

## 2. Terminal cheat sheet

### Terminal itself

- **Return** runs the line you typed. Nothing happens until you press it.
- **Up arrow** brings back the previous command; keep pressing for
  older ones. Most days are the same four commands, so this is faster
  than retyping.
- **Tab** autocompletes a file or folder name. Type `cd "/Users/jas`
  and press Tab.
- Dragging a folder from Finder into the Terminal window pastes its
  full path, quotes and all.
- **Ctrl+C** stops whatever is running (the dev server, a stuck
  command). It is *Control*, not Command. Cmd+C copies, as everywhere.
- **`q`** gets you out of any screen that's taken over the window and
  shows `:` or `(END)` at the bottom — `git log` and `git diff` do this.
- **Cmd+K** clears the window. Purely cosmetic.
- `zsh: command not found: xyz` means you typed something Terminal
  doesn't recognize — usually a typo, or a command meant for a
  different folder.
- Terminal never asks "are you sure?" It does what you typed. The Git
  commands in this guide are all safe; be careful with anything
  starting `rm`, which deletes without a Trash.

### Getting there

**`cd "…/hbtn-astro"`** — "change directory." Terminal always has a
current folder, and every command below acts on *that* folder, so this
comes first. The quotes are needed because the path has spaces in it.

### npm (runs the site)

npm is the tool that came with Node, the JavaScript runtime Astro is
written in. You'll use three commands, all defined in `package.json`:

**`npm run dev`** — start the live preview at localhost:4321. Leave it
running while you work; Ctrl+C stops it.

**`npm run build`** — produce the finished site as plain HTML files in
the `dist/` folder. You don't normally need this (Cloudflare runs it
for you), but it's a good way to check that nothing is broken before
you push: if it prints a red error, Cloudflare would hit the same one.

**`npm install`** — download Astro and its dependencies into
`node_modules/`. You did this once; you'd do it again on a new computer,
or if `package.json` changes.

### git (keeps the history)

Git is a system that remembers every version of every file. The site
folder is a "repository" (repo): a folder Git is watching.

**`git status`** — what's changed since the last snapshot. Safe to run
anytime; it changes nothing. Run it whenever you're unsure.

**`git diff`** — the actual line-by-line changes you haven't committed.
Press `q` to leave the view.

**`git add -A`** — "stage" everything: tell Git that all your edits,
new files, and deletions should go into the next snapshot. (`git add
some/file.md` stages just one file, if you want to leave other
half-finished work out.)

**`git commit -m "message"`** — take the snapshot. It's permanent and
labeled with your message. The message is a note to future-you about
*why*, so "Fix broken image on Store page" beats "changes." Without
`-m`, Git opens a text editor for the message, which is confusing;
always use `-m`.

**`git push`** — send your new commits up to GitHub. Until you push,
commits exist only on your Mac. Cloudflare watches GitHub, so a push is
what makes the live site update. You can commit many times and push
once.

**`git log`** — the list of commits, newest first. `git log --oneline`
is the compact version. `q` to exit.

A mental picture: `add` chooses what goes in the box, `commit` seals
and labels it, `push` ships it.

**`&&`** between two commands (as in `git add -A && git commit -m
"…"`) isn't Git — it's the shell saying "and then, only if that
worked." Separate lines do the same thing.

---

## 3. Writing

### Where the words live

All the site's text is Markdown files in `src/content/HBTN/`. The
folder structure *is* the site structure:

```
src/content/HBTN/
  home.md              ← the homepage's welcome text
  about/
    index.md           ← the About section page itself
    whoami.md          ← /about/whoami/
    …
  blog/
    index.md           ← /blog/
    j.md               ← /blog/j/
    specials/
      index.md         ← /blog/specials/
      e.md             ← /blog/specials/e/
  images/ …
  store/ …
```

(`HBTN` is also the name of the Obsidian vault — the folder and the
vault are the same thing. Astro is told where to look by one line in
`src/content.config.ts`; rename the folder and that line must change
too, or the dev server reports `home.md is missing`.)

A file named `index.md` is the page for its folder; any other file is
a page inside that folder. The filename becomes the URL, so keep
filenames lowercase with no spaces (`my-new-post.md`).

### Editing in Obsidian

The `HBTN` folder is an Obsidian vault, so you can write in Obsidian
and let it handle the frontmatter as a form (the "Properties" panel at
the top of each note: `draft` is a checkbox, `date` a date picker).
BBEdit works just as well for the same files; Git doesn't care which
you use. Obsidian won't open `.astro` or `.css` files — those are
BBEdit's.

Settings that matter, all under Settings → Files and links:

- **Use [[Wikilinks]]: off.** Obsidian's `[[double bracket]]` links
  mean nothing to Astro. With this off, Obsidian writes ordinary
  Markdown links that work on the site.
- **New link format: Relative path to file.**

Things that render in Obsidian but come out as literal text on the
site: callouts, `==highlights==`, `![[embeds]]`. Stick to standard
Markdown. Images are the other gap — they live in `public/resources/`,
outside the vault, so Obsidian can't preview them; see "Images" below.

Obsidian keeps its own settings in a hidden `.obsidian/` folder inside
the vault. Git is told to ignore it (`.gitignore`).

### Adding a post

**With the template (Obsidian):** make a new note in the `blog` folder,
name it in lowercase with hyphens (`furry-nuts`), then Cmd+P →
"Templates: Insert template" → `_post`. That fills in the frontmatter
with today's date and `draft: true`, so the post stays hidden until you
untick it. Type the title, write, untick draft when ready.

The template lives at `_templates/_post.md` in the vault. Edit it to
change what new posts start with — in **Source mode**, not the
Properties panel, and keep the date line quoted
(`date: "{{date:YYYY-MM-DD}}"`): unquoted, Obsidian reads the curly
braces as YAML and mangles the placeholder.

The leading underscore on `_post.md` matters. The pattern in
`src/content.config.ts` is `**/[^_]*.md`, meaning "every .md file
whose name does NOT start with an underscore." That's how the template
stays out of the site; without it, the template would be published as
a page and its `{{date}}` placeholder would break the build. Any file
you name with a leading `_` gets the same treatment, which is a handy
way to keep scratch notes in the vault. (A `!`-style exclusion in the
pattern looks tidier but confuses Astro's file watcher; underscore is
the reliable way.)

**By hand (any editor):** create `src/content/HBTN/blog/furry-nuts.md`
and start it with a **frontmatter** block:

```markdown
---
title: "Furry Nuts: A Reckoning"
date: 2026-10-25
author: "Hannah"
---

Your text here. **Bold**, *italic*, [links](https://example.com),
and blank lines between paragraphs.
```

Save it. The dev server picks it up instantly; it appears in the Blog
list (newest first) and at `/blog/furry-nuts/`. Commit and push when
ready.

### Frontmatter fields

The lines between the `---` fences. These are the ones the site
understands (defined in `src/content.config.ts`):

| Field        | Required? | Notes                                                   |
| ------------ | --------- | ------------------------------------------------------- |
| `title`      | yes       | In quotes if it contains a colon.                       |
| `date`       | yes       | `2026-10-25` is enough; controls list order.            |
| `author`     | no        | Shown under the title as "by …".                        |
| `draft`      | no        | `true` hides the page from the site. Default `false`.   |
| `tags`       | no        | `["nuts", "trucks"]`. Stored, not yet displayed.        |
| `categories` | no        | Same.                                                   |
| `moods`      | no        | Same.                                                   |

A typo in a field name, or a date Astro can't read, stops the build
with an error naming the file and the field. That's on purpose:
better to find out in the preview than on the live site.

### Adding a whole section

Make a new folder under `src/content/HBTN/` with an `index.md` in
it. It shows up on the homepage list automatically. Pages you add
inside that folder show up on the section's page.

### Images

Put the file in `public/resources/` (where the truck-nut photos are).
Anything in `public/` is copied to the site as-is. Then in Markdown:

```markdown
![A nut on a lifted F-150](/resources/f150-nut.jpeg)
```

The text in square brackets is the **alt text**: what screen readers
say and what shows if the image fails to load. Write it as a
description, not a caption. The path starts with `/resources/`, not
`/public/resources/`.

Keep photos reasonable — under 500KB or so. Astro can do fancier image
optimization, but the site doesn't use it yet.

### Embedding a YouTube video

Markdown lets you drop in raw HTML. Copy this block and change the ID
after `/embed/` (the part after `v=` in a YouTube URL):

```html
<div class="video">
  <iframe
    src="https://www.youtube-nocookie.com/embed/VIDEO_ID_HERE"
    title="YouTube video"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>
```

`blog/j.md` has a working example.

### Hiding a page

Add `draft: true` to its frontmatter. It vanishes from the site but
stays in the repo. Remove the line to publish it.

---

## 4. How the site is built

What happens between a Markdown file and a web page, in five steps.
Each file named here opens with a comment block saying the same thing
in more detail.

1. **`src/content.config.ts`** declares the *collection*: "read every
   `.md` under `src/content/HBTN/` (except names starting `_`), and here's
   what frontmatter is allowed." Astro reads the files and checks them
   against the rules.

2. **`src/pages/[...slug].astro`** is the template that turns each
   entry into a page. The odd filename is a pattern: `[...slug]`
   means "any path." It asks the collection for every published page,
   makes one URL per page, and for each one renders the title, the
   byline, the Markdown content, and (if it's a section) a list of the
   pages inside it. `src/pages/index.astro` does the same job for the
   homepage, and `404.astro` for missing pages.

3. **`src/layouts/BaseLayout.astro`** is the shell every page is
   wrapped in: `<html>`, `<head>`, the header, a `<main>` where the
   page's content goes (the `<slot />`), the footer. Change this file
   and every page changes.

4. **`src/components/`** are reusable pieces: `Header.astro`,
   `Footer.astro`, `PageList.astro`. The layout and pages use them like
   custom HTML tags: `<Header />`.

5. **`src/styles/global.css`** is the one stylesheet. The layout
   imports it, so it applies everywhere.

`src/lib/pages.ts` is a helper with two functions the templates share:
"get all published pages" and "get the children of this section."

Running `npm run build` executes all of that once and writes plain
HTML into `dist/`. There's no server, no database; Cloudflare just
hands out the files.

---

## 5. Styling

Everything visual is in `src/styles/global.css`, and every rule there
has a comment. A few things to know:

**CSS variables.** The top of the file defines colors by name:

```css
:root {
  --pink: pink;
  --white: white;
  --footer-gray: #757575;
}
```

Below, rules say `background-color: var(--pink)` instead of `pink`.
Change the value at the top and everywhere that uses it follows. Add
your own the same way.

**Finding the rule for a thing.** Each part of the page has a class
name: the banner is `.site-header`, the bottom bar `.site-footer`, the
list of pages `.page-list`, the author line `.byline`. Search the CSS
for the class name. Content from Markdown (paragraphs, headings,
images) has no class; style it with `main p`, `main h1`, `main img`
and so on.

**Seeing what you're doing.** With `npm run dev` running, edit the CSS
and the browser updates without reloading. Your browser's developer
tools (right-click → Inspect) let you click any element and see
exactly which rules apply to it — the single most useful thing for
learning CSS.

**Fonts.** The site currently uses the browser's default serif (Times
on most Macs) by not specifying a font at all. To set one, add
`font-family: …` to the `body` rule. For a web font, Google Fonts
gives you a `<link>` tag to paste into `BaseLayout.astro`'s `<head>`
and a `font-family` line for the CSS.

**The commented-out block at the bottom** of the file is the CSS from
the Hugo version that never actually loaded. It's there as a record.

_(This section will grow as the design work happens.)_

---

## 6. Templates and components

### Anatomy of an .astro file

```astro
---
// Top half: JavaScript. Runs once, when the site is built.
// Never reaches the visitor's browser.
import Header from '../components/Header.astro';
const greeting = 'Hello';
---

<!-- Bottom half: HTML. Curly braces drop in values from above. -->
<h1>{greeting}, nuts.</h1>
<Header />
```

The `---` fences are the same idea as Markdown frontmatter.

### Making a component

A component is any `.astro` file in `src/components/`. Say you want a
reusable "buy now" button. Create `src/components/BuyButton.astro`:

```astro
---
// Props are the values whoever uses this component can pass in.
interface Props {
  text?: string;   // the ? means optional
}
const { text = 'BUY EM' } = Astro.props;  // default if none passed
---

<a class="buy-button" href="/store/">{text}</a>
```

Use it from a layout or page by importing it in the top half and
writing it like a tag in the bottom half:

```astro
---
import BuyButton from '../components/BuyButton.astro';
---
<BuyButton />
<BuyButton text="GET NUTS" />
```

Then style `.buy-button` in `global.css`. `Header.astro` is a real
example: it takes a `text` prop, which is how the homepage banner says
"HOME. OF. NUTS." while every other page says "HELLA. BIG. TRUCK.
NUTS." (look at `index.astro` to see it being passed).

### Where components can and can't go

Components work in `.astro` files: layouts, pages, other components.
They do **not** work inside `.md` files — Markdown doesn't know about
them. If you ever want to use a component inside a post, the answer
is a format called MDX (Markdown plus components), which Astro supports
with a small add-on. Not set up yet; ask when you want it.

### The slot

In `BaseLayout.astro`, `<slot />` marks where the page's own content
goes. A layout is a component with a hole in it.

---

## 7. Where the site lives

Three companies are involved, and each does one thing.

**GitHub** (github.com/jaspernighthawk/hella-big-truck-nuts) holds the
source: a copy of this folder and its full history. `git push` sends
your commits here. If your Mac died tomorrow, this is the copy you'd
rebuild from (`git clone` that URL onto a new machine, then
`npm install`).

**Cloudflare** (dash.cloudflare.com) builds and serves the site. It
watches the GitHub repo; every push to `main` triggers a build
(`npm run build`, then `npx wrangler deploy`, as set in
`wrangler.jsonc`) and the result goes live a minute later. Under
**Workers & Pages → hella-big-truck-nuts** you can see every
deployment and its build log — the first place to look if a push
doesn't show up on the site. Cloudflare also runs the domain's DNS
(the records that say "hellabigtrucknuts.com means this Worker") and
the redirect rule that sends `www.` to the bare domain. The site also
answers at `hella-big-truck-nuts.silent-star-40b2.workers.dev`, which
is handy for testing and harmless to leave on.

**Squarespace** (account.squarespace.com → Domains) owns the name. You
pay them yearly to keep `hellabigtrucknuts.com` registered. The only
setting there that matters is **Nameservers**, which points at
Cloudflare; its DNS page is empty and should stay that way. If
Squarespace ever emails about renewal, that's the one thing to act on.

The canonical address is **hellabigtrucknuts.com**, no `www`. That's
set in three places that should agree: the redirect rule in
Cloudflare, the `site` line in `astro.config.mjs`, and the footer link
in `src/components/Footer.astro`.

Nothing on any of these costs money except the yearly domain renewal.

---

## 8. When something goes wrong

**The dev server prints a red error naming a `.md` file.** Almost
always frontmatter: a missing `title`, a date it can't parse, a stray
colon in an unquoted title. Fix the file; the error clears itself.

**"Port 4321 is already in use."** A previous `npm run dev` is still
running somewhere (another Terminal tab, probably). Find it and Ctrl+C,
or just use the new address Astro offers (4322).

**The push is rejected.** Usually "fetch first" — GitHub has a commit
your Mac doesn't (rare, since only you push). Run `git pull`, then
`git push` again.

**You pushed, but the live site didn't change.** Before anything
else, open Workers & Pages → hella-big-truck-nuts → Deployments in
the Cloudflare dashboard. A red row means the build failed and the
previous version is still live; click it to read the log. A green row
with an old timestamp means the push never arrived (`git status` should
say "up to date with origin/main"). A green row with the right
timestamp means it deployed and your browser is showing a cached copy:
hard-refresh (Cmd+Shift+R) or use a private window.

**Cloudflare's build turns red.** Open the deployment in the
Cloudflare dashboard and read the log; the error is the same one
`npm run build` would show you locally. Fix, commit, push; it rebuilds.

**The build is red with "Could not find requested image" (or
"Duplicate id"), but it works on your Mac.** Capital letters. Your Mac
treats `Photo.jpg` and `photo.jpg` as the same file; Cloudflare builds
on Linux, which treats them as different files. Two ways this bites:

- A link says `photo.jpg` and the file is `Photo.jpg`. Works locally,
  fails on Cloudflare. Fix: make them match (lowercase both).
- You renamed `Photo.jpg` to `photo.jpg`, but Git didn't notice —
  on a Mac, a capitalization-only rename looks like no change at all,
  so Git keeps the old name and Cloudflare checks out `Photo.jpg`.
  Fix: tell Git explicitly, then commit:

  ```sh
  git rm --cached public/resources/Photo.jpg
  git add public/resources/photo.jpg
  ```

  (`--cached` means "forget it in Git, but leave the file on disk.")
  `git status` then shows the rename as `R  Photo.jpg -> photo.jpg`.

The prevention is the filename rule: lowercase, hyphens, no spaces,
from the moment a file is created. Obsidian's attachment folder
should be `attachments`, not `Attachments`.

**Git says something about a `.lock` file.** A previous Git command was
interrupted. Make sure no Git command is running, then delete the file
it names (it's inside the hidden `.git` folder) and try again.

**The site looks wrong but the file looks right.** Hard-refresh the
browser (Cmd+Shift+R) to bypass its cache.

**A frontmatter field you just added does nothing, with no error.**
Astro keeps a cache of every page's checked frontmatter in the hidden
`.astro/` folder, and after a change to `content.config.ts` it
sometimes keeps the old version of a page. Stop the server (Ctrl+C),
then:

```sh
rm .astro/data-store.json
npm run dev
```

That file is disposable — Astro rebuilds it from your Markdown on
every start. If things are still confusing, `rm -r .astro` removes the
whole cache folder, equally safely.

**Still stuck?** `git status` and the exact error text are the two
things to paste to whoever's helping.
