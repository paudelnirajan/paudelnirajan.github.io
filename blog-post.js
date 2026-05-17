/* =================================================================
   BLOG POST RENDERER
   Fetches posts/<slug>.md, parses frontmatter, renders via marked.js
================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const slug   = params.get('post');

    if (!slug) {
        showError('No post specified.', 'Go back to blog');
        return;
    }

    showLoading();

    fetch(`posts/${slug}.md`)
        .then(res => {
            if (!res.ok) throw new Error(`${res.status}`);
            return res.text();
        })
        .then(raw => render(raw))
        .catch(() => showError(`Could not load post "${slug}".`, 'Go back to blog'));
});

function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { meta: {}, body: raw };

    const meta = {};
    match[1].split('\n').forEach(line => {
        const ci = line.indexOf(':');
        if (ci === -1) return;
        const key = line.slice(0, ci).trim();
        let val    = line.slice(ci + 1).trim();
        if (val.startsWith('[') && val.endsWith(']')) {
            val = val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
        }
        meta[key] = val;
    });

    return { meta, body: match[2] };
}

function readingTime(text) {
    const words = text.trim().split(/\s+/).length;
    const mins  = Math.max(1, Math.round(words / 200));
    return `${mins} min read`;
}

function render(raw) {
    const { meta, body } = parseFrontmatter(raw);

    const title = meta.title || 'Untitled';
    const date  = meta.date  || '';
    const tags  = Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : []);
    const time  = readingTime(body);

    document.title = `${title} — Nirajan Paudel`;

    const headerEl  = document.getElementById('post-header');
    const bodyEl    = document.getElementById('post-body');
    const dividerEl = document.getElementById('post-divider');

    headerEl.innerHTML = `
        <div class="post-meta">
            <span class="post-date">${date}</span>
            <span class="post-reading-time">${time}</span>
        </div>
        <h1 class="post-title">${title}</h1>
        ${tags.length ? `
        <div class="post-tags">
            ${tags.map(t => `<span>${t}</span>`).join('')}
        </div>` : ''}
    `;

    marked.setOptions({ breaks: false, gfm: true });
    bodyEl.innerHTML = marked.parse(body);

    dividerEl.style.display = 'block';
}

function showLoading() {
    document.getElementById('post-body').innerHTML = `
        <div class="post-loading">
            <i class="fas fa-circle-notch"></i>
            <p>Loading post…</p>
        </div>
    `;
}

function showError(msg, linkText) {
    document.getElementById('post-body').innerHTML = `
        <div class="post-error">
            <i class="fas fa-triangle-exclamation"></i>
            <h2>Post not found</h2>
            <p>${msg}</p>
            <p><a href="index.html#blog">${linkText}</a></p>
        </div>
    `;
}
