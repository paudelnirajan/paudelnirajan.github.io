/* =================================================================
   ARTICLE RENDERER
   Fetches posts/<slug>.md, parses the frontmatter, renders with marked.
================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initProgress();

    const slug = new URLSearchParams(window.location.search).get('post');
    if (!slug) {
        showError('No post was specified in the URL.');
        return;
    }

    showLoading();

    fetch(`posts/${slug}.md`)
        .then(res => {
            if (!res.ok) throw new Error(String(res.status));
            return res.text();
        })
        .then(render)
        .catch(() => showError(`Could not load the post &ldquo;${escapeHtml(slug)}&rdquo;.`));
});

/* ----------------------------------------------------------------- */
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}

function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { meta: {}, body: raw };

    const meta = {};
    match[1].split('\n').forEach(line => {
        const ci = line.indexOf(':');
        if (ci === -1) return;
        const key = line.slice(0, ci).trim();
        let val   = line.slice(ci + 1).trim();
        if (val.startsWith('[') && val.endsWith(']')) {
            val = val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
        }
        meta[key] = val;
    });

    return { meta, body: match[2] };
}

function readingTime(text) {
    const words = text.trim().split(/\s+/).length;
    return `${Math.max(1, Math.round(words / 200))} min read`;
}

/* ----------------------------------------------------------------- */
function render(raw) {
    const { meta, body } = parseFrontmatter(raw);

    const title = meta.title || 'Untitled';
    const date  = meta.date  || '';
    const tags  = Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : []);

    document.title = `${title} — Nirajan Paudel`;

    const desc = document.querySelector('meta[name="description"]');
    if (desc && meta.excerpt) desc.setAttribute('content', meta.excerpt);

    document.getElementById('article-header').innerHTML = `
        <div class="article-meta">
            ${date ? `<span>${escapeHtml(date)}</span>` : ''}
            <span>${readingTime(body)}</span>
        </div>
        <h1 class="article-title">${escapeHtml(title)}</h1>
        ${tags.length ? `<div class="article-tags">${
            tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')
        }</div>` : ''}
    `;

    marked.setOptions({ breaks: false, gfm: true });

    const bodyEl = document.getElementById('article-body');
    bodyEl.innerHTML = marked.parse(body);
    fixImagePaths(bodyEl);
    externalLinksNewTab(bodyEl);

    document.getElementById('article-rule').hidden = false;
    document.getElementById('article-end').hidden  = false;
}

/** Resolve sibling-relative image paths (e.g. pipeline.png) under posts/ */
function fixImagePaths(container) {
    container.querySelectorAll('img[src]').forEach(img => {
        const src = img.getAttribute('src');
        if (!src || /^https?:\/\//i.test(src) || src.startsWith('/') || src.startsWith('posts/')) return;
        img.src = `posts/${src.replace(/^\.\//, '')}`;
        img.loading = 'lazy';
    });
}

function externalLinksNewTab(container) {
    container.querySelectorAll('a[href^="http"]').forEach(a => {
        if (a.hostname === window.location.hostname) return;
        a.target = '_blank';
        a.rel = 'noopener';
    });
}

/* ----------------------------------------------------------------- */
function initProgress() {
    const bar = document.getElementById('progress');
    if (!bar) return;

    let ticking = false;
    const update = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = max > 0 ? `${Math.min(100, (window.scrollY / max) * 100)}%` : '0%';
            ticking = false;
        });
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

function showLoading() {
    document.getElementById('article-body').innerHTML = `
        <div class="state loading">
            <i class="fas fa-circle-notch"></i>
            <p>Loading…</p>
        </div>
    `;
}

function showError(msg) {
    document.getElementById('article-body').innerHTML = `
        <div class="state">
            <i class="fas fa-triangle-exclamation"></i>
            <h2>Post not found</h2>
            <p>${msg}</p>
            <p style="margin-top:14px"><a href="index.html#writing">Back to all writing</a></p>
        </div>
    `;
}
