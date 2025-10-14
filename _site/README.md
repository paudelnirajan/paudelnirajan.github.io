# paudelnirajan.github.io
Personal Website & Blog

## Quick Start

This is a Jekyll-based personal website with blog functionality.

### Deploy to GitHub Pages (Recommended)
```bash
git add .
git commit -m "Update website"
git push origin main
```

Visit: `https://paudelnirajan.github.io`

### Run Locally with Docker
```bash
docker run --rm -v "$PWD":/srv/jekyll -p 4000:4000 jekyll/jekyll jekyll serve
```

Visit: `http://localhost:4000`

## Structure
- `index.html` - Home page with portfolio
- `blog.html` - Blog index page
- `_posts/` - Blog posts (format: `YYYY-MM-DD-title.md`)
- `_layouts/` - Page templates
- `_includes/` - Reusable components (sidebar, etc.)
- `assets/` - CSS, images, and other static files

## Note
See `SETUP_INSTRUCTIONS.md` for detailed setup and troubleshooting.
