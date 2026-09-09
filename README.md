# paudelnirajan.github.io

Personal academic site — research, publications, projects, and writing.

**Live:** [paudelnirajan.github.io](https://paudelnirajan.github.io)

---

## Editing the content

Almost everything you'll want to change lives in two data files. No build step, no
framework — edit, commit, push.

| File | What's in it |
| --- | --- |
| `site-data.js` | `NEWS`, `PUBLICATIONS`, `PROJECTS` |
| `blog-data.js` | the list of writing entries |
| `posts/<slug>.md` | the body of each written piece |

### Add a news item

Newest first. `sort` is `YYYY-MM` and is used only for ordering; `date` is what
readers see. Set `highlight: true` for the pulsing accent dot.

```js
{
    sort: '2026-09',
    date: 'Sep 2026',
    html: 'Something happened. <a href="...">Link</a> and <strong>emphasis</strong> both work.',
    highlight: false
}
```

### Add a publication

Mark yourself in the author list with `me: true` — that's what bolds your name.
`featured: true` promotes a paper into the spotlight card at the top (keep exactly
one featured, or none).

```js
{
    id: 'short-slug',
    featured: false,
    year: '2026',
    status: 'preprint',              // 'preprint' | 'peer-reviewed'
    venue: 'arXiv preprint',
    venueNote: 'Under review at ACL 2026',   // or null
    title: '...',
    authors: [{ name: 'Nirajan Paudel', me: true }, { name: 'Co Author' }],
    abstract: '...',                 // shown behind the "Abstract" toggle
    takeaway: '...',                 // the one-line plain-language summary
    tags: ['Multilingual NLP'],
    links: [{ href: '...', label: 'arXiv', icon: 'fas fa-file-lines' }],
    bibtex: `@misc{...}`             // powers the copy-to-clipboard button
}
```

### Add a written piece

1. Write `posts/<slug>.md` with frontmatter (`title`, `date`, `tags`, `excerpt`).
2. Add a matching entry to `blog-data.js`.

Images referenced by bare filename resolve against `posts/`.

---

## Things worth knowing

- **Theme.** Light ("paper") is the default; the toggle persists to `localStorage`
  and the first visit follows the OS setting. An inline script in `<head>` applies
  it before first paint so there's no flash.
- **The token animation** in the publications spotlight is an illustration of the
  speculative-decoding result, not measured data — it says so on the card. Edit
  `SPEC_SAMPLES` in `script.js` to change it.
- **Greetings** rotate through `GREETINGS` in `script.js`.
- **Reduced motion** is respected throughout: the greeting stops rotating, the
  token strip renders a single static frame, and reveals are disabled.
- **The masthead photo.** `photo_for_website.jpg` is loaded directly. It's a
  near-square original, and the masthead card is a 3:4 portrait, so CSS crops the
  sides via `object-fit: cover` — nothing is cut off the top or bottom.
- **Google Scholar.** The Scholar link in the masthead currently points at a name
  search. Swap it for your profile URL once you have one — it's marked with a
  `TODO` comment in `index.html`.

---

## Structure

```
index.html        homepage
blog-post.html    article template (reads ?post=<slug>)
styles.css        the whole design system, light + dark
script.js         rendering and interactions
site-data.js      news / publications / projects
blog-data.js      writing index
posts/            markdown articles + their images
```

## Local preview

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

---

## Built with

Plain HTML, CSS, and JavaScript. [Fraunces](https://fonts.google.com/specimen/Fraunces)
and [Inter](https://fonts.google.com/specimen/Inter) for type, [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
for metadata, [Font Awesome](https://fontawesome.com/) for icons, and
[marked](https://marked.js.org/) to render the articles.

## Contact

nirajan.paudel@colorado.edu · [GitHub](https://github.com/paudelnirajan) · [LinkedIn](https://www.linkedin.com/in/nirajanpaudel17/)
