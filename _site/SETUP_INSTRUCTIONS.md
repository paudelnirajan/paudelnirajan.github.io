# Website Setup Instructions

## The Problem
The `eventmachine` gem (required by Jekyll) has compilation issues on Apple Silicon Macs with Ruby 3.1.4.

## ✅ RECOMMENDED SOLUTION: Deploy to GitHub Pages

Since your repository is `paudelnirajan.github.io`, GitHub Pages will automatically build and serve your Jekyll site.

### Steps:

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Add blog functionality and fix structure"
   git push origin main
   ```

2. **Enable GitHub Pages (if not already enabled):**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Select branch: **main** and folder: **/ (root)**
   - Click **Save**

3. **Wait 1-2 minutes** for GitHub to build your site

4. **Visit:** `https://paudelnirajan.github.io`

That's it! GitHub handles all the Jekyll compilation for you.

---

## Alternative: Fix Local Jekyll Installation

If you need to run Jekyll locally, try these solutions:

### Option 1: Install with specific compiler flags
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install eventmachine with C++17 support
gem install eventmachine -- --with-cxxflags="-std=c++17"

# Then install bundle
bundle install

# Run Jekyll
bundle exec jekyll serve
```

### Option 2: Use Docker (Easiest for local development)
```bash
# Install Docker Desktop for Mac first, then:
docker run --rm -v "$PWD":/srv/jekyll -p 4000:4000 jekyll/jekyll jekyll serve
```

Visit: `http://localhost:4000`

### Option 3: Use a newer Ruby version
```bash
# Install Ruby 3.2+ which has better Apple Silicon support
rbenv install 3.2.2
rbenv local 3.2.2

# Then try bundle install again
bundle install
bundle exec jekyll serve
```

---

## What Was Fixed

✅ Moved `includes/` → `_includes/` (Jekyll standard)
✅ Moved `posts/` → `_posts/` (Jekyll standard)  
✅ Renamed blog post to follow Jekyll convention: `2025-10-14-welcome-to-my-blog.md`
✅ Created blog index page (`blog.html`)
✅ Created blog post layout (`_layouts/post.html`)
✅ Added Blog link to navigation
✅ Added comprehensive blog CSS styles
✅ Created `assets/images/` directory for your profile photo

## Next Steps

1. **Add your profile photo:** Place `photo_for_website.jpg` in `assets/images/`
2. **Deploy to GitHub Pages** (recommended)
3. **Create more blog posts:** Add files in `_posts/` with format: `YYYY-MM-DD-title.md`

## Creating New Blog Posts

Create a new file in `_posts/` with this format:

**Filename:** `_posts/2025-10-15-my-second-post.md`

**Content:**
```markdown
---
layout: post
title: "My Second Blog Post"
date: 2025-10-15
---

## Your content here

Write your blog post using Markdown...
```
