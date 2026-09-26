/* =================================================================
   Nirajan Paudel — site behaviour
   Content lives in site-data.js (news/pubs/projects) and
   blog-data.js (writing). This file only renders and animates.
================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    initDrawer();
    initReveal();
    initGreeting();
    renderNews();
    renderPublications();
    renderProjects();
    initFilters();
    initModal();
    renderWriting();
});

const reducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const esc = (s) => String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

/* -----------------------------------------------------------------
   THEME
----------------------------------------------------------------- */
function initTheme() {
    // the inline script in <head> already applied the theme; just wire the button
    paintThemeIcon(document.documentElement.getAttribute('data-theme'));

    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        paintThemeIcon(next);
        try { localStorage.setItem('np-theme', next); } catch (e) { /* private mode */ }
    });
}

function paintThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    const btn  = document.getElementById('theme-toggle');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    if (btn)  btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}

/* -----------------------------------------------------------------
   NAV — shadow on scroll + active section
----------------------------------------------------------------- */
function initNav() {
    const nav      = document.getElementById('navbar');
    const links    = [...document.querySelectorAll('.nav-links a[data-target]')];
    const sections = links
        .map(l => document.getElementById(l.dataset.target))
        .filter(Boolean);

    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            nav?.classList.toggle('stuck', window.scrollY > 8);

            if (sections.length) {
                const line = window.scrollY + window.innerHeight * 0.3;
                let current = sections[0];
                sections.forEach(s => { if (s.offsetTop <= line) current = s; });
                links.forEach(l => l.classList.toggle('active', l.dataset.target === current.id));
            }
            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* -----------------------------------------------------------------
   MOBILE DRAWER
----------------------------------------------------------------- */
function initDrawer() {
    const burger   = document.getElementById('burger');
    const drawer   = document.getElementById('drawer');
    const backdrop = document.getElementById('backdrop');
    if (!burger || !drawer || !backdrop) return;

    const setOpen = (open) => {
        drawer.classList.toggle('open', open);
        backdrop.classList.toggle('show', open);
        burger.classList.toggle('open', open);
        drawer.setAttribute('aria-hidden', String(!open));
        burger.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    };

    burger.addEventListener('click', () => setOpen(!drawer.classList.contains('open')));
    backdrop.addEventListener('click', () => setOpen(false));
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) setOpen(false);
    });
}

/* -----------------------------------------------------------------
   SCROLL REVEAL
----------------------------------------------------------------- */
function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reducedMotion() || !('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('visible'));
        return;
    }

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

    items.forEach(el => obs.observe(el));
}

/* -----------------------------------------------------------------
   GREETING — rotates through languages I care about
----------------------------------------------------------------- */
const GREETINGS = [
    ['नमस्ते',        'Nepali'],
    ['Hello',         'English'],
    ['नमस्कार',       'Hindi'],
    ['হ্যালো',         'Bengali'],
    ['ሰላም',           'Amharic'],
    ['Jambo',         'Swahili'],
    ['Rimaykullayki', 'Quechua'],
    ['Halo',          'Indonesian'],
    ['Merhaba',       'Turkish'],
    ['Բարեւ',         'Armenian'],
    ['Hola',          'Spanish']
];

function initGreeting() {
    const box  = document.getElementById('greeting');
    const word = document.getElementById('greeting-word');
    const lang = document.getElementById('greeting-lang');
    if (!box || !word || !lang) return;

    let i = 0;
    if (reducedMotion()) return;

    setInterval(() => {
        box.classList.add('swap');
        setTimeout(() => {
            i = (i + 1) % GREETINGS.length;
            word.textContent = GREETINGS[i][0];
            lang.textContent = GREETINGS[i][1];
        }, 250);
        setTimeout(() => box.classList.remove('swap'), 600);
    }, 3200);
}

/* -----------------------------------------------------------------
   NEWS — show the first few, reveal the rest on request
----------------------------------------------------------------- */
const NEWS_VISIBLE = 4;

function renderNews() {
    const list = document.getElementById('news-list');
    if (!list || typeof NEWS === 'undefined') return;

    const items = [...NEWS].sort((a, b) => String(b.sort).localeCompare(String(a.sort)));

    list.innerHTML = items.map((n, i) => `
        <div class="news-item ${n.highlight ? 'hl' : ''} ${i >= NEWS_VISIBLE ? 'is-hidden' : ''}">
            <span class="news-date">${esc(n.date)}</span>
            <div class="news-body">${n.html}</div>
        </div>
    `).join('');

    const more = document.getElementById('news-more');
    if (!more) return;

    if (items.length <= NEWS_VISIBLE) { more.hidden = true; return; }

    more.hidden = false;
    let open = false;
    more.addEventListener('click', () => {
        open = !open;
        list.querySelectorAll('.news-item').forEach((el, i) => {
            if (i >= NEWS_VISIBLE) el.classList.toggle('is-hidden', !open);
        });
        more.querySelector('span').textContent = open ? 'Show less' : 'Show earlier news';
        more.querySelector('i').className = open ? 'fas fa-minus' : 'fas fa-plus';
    });
}

/* -----------------------------------------------------------------
   PUBLICATIONS
----------------------------------------------------------------- */
function authorLine(authors) {
    return authors
        .map(a => a.me ? `<span class="me">${esc(a.name)}</span>` : esc(a.name))
        .join('<span class="dot">·</span>');
}

function pubActions(p) {
    const links = p.links.map(l => `
        <a href="${esc(l.href)}" target="_blank" rel="noopener"><i class="${esc(l.icon)}"></i> ${esc(l.label)}</a>
    `).join('');

    return `
        ${links}
        <button type="button" data-drawer="abs-${p.id}" aria-expanded="false">
            <i class="fas fa-align-left"></i> Abstract
        </button>
        <button type="button" data-drawer="bib-${p.id}" aria-expanded="false">
            <i class="fas fa-quote-right"></i> BibTeX
        </button>
    `;
}

function pubDrawers(p) {
    return `
        <div class="pub-drawer" id="abs-${p.id}"><div>
            <div class="pub-abstract">
                <h4>Abstract</h4>
                <p>${esc(p.abstract)}</p>
            </div>
        </div></div>
        <div class="pub-drawer" id="bib-${p.id}"><div>
            <div class="pub-abstract">
                <h4>
                    BibTeX
                    <button type="button" class="bib-copy" data-copy="${p.id}"
                            style="float:right;font-family:var(--mono);font-size:0.62rem;letter-spacing:0.1em;color:var(--accent);cursor:pointer">
                        COPY
                    </button>
                </h4>
                <pre id="bibtext-${p.id}">${esc(p.bibtex)}</pre>
            </div>
        </div></div>
    `;
}

function renderPublications() {
    const list = document.getElementById('pub-list');
    if (!list || typeof PUBLICATIONS === 'undefined') return;

    const featured = PUBLICATIONS.find(p => p.featured);
    const rest     = PUBLICATIONS.filter(p => !p.featured);

    const count = document.getElementById('pub-count');
    if (count) {
        const n = PUBLICATIONS.length;
        count.textContent = `${n} paper${n === 1 ? '' : 's'}`;
    }

    /* ---- featured spotlight ---- */
    const slot = document.getElementById('spotlight-slot');
    if (slot && featured) {
        const primary = featured.links[0];
        slot.innerHTML = `
            <article class="spotlight">
                <div>
                    <span class="spotlight-flag">${esc(featured.venueNote || 'Latest paper')}</span>
                    <h3>${primary
                        ? `<a href="${esc(primary.href)}" target="_blank" rel="noopener">${esc(featured.title)}</a>`
                        : esc(featured.title)}</h3>
                    <p class="pub-authors">${authorLine(featured.authors)}</p>
                    <p class="pub-venue">${esc(featured.venue)}, ${esc(featured.year)}</p>
                    <p class="pub-takeaway">${esc(featured.takeaway)}</p>
                    <div class="pub-actions">${pubActions(featured)}</div>
                    ${pubDrawers(featured)}
                    <div class="pub-tags">${featured.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
                </div>
                <aside class="specviz" id="specviz" aria-hidden="true"></aside>
            </article>
        `;
        initSpecViz();
    }

    /* ---- the rest ---- */
    list.innerHTML = rest.map(p => {
        const primary = p.links[0];
        return `
        <article class="pub">
            <div class="pub-gutter">
                <span class="pub-year">${esc(p.year)}</span>
                <span class="pub-status ${p.status === 'preprint' ? 'preprint' : ''}">
                    ${p.status === 'preprint' ? 'Preprint' : 'Published'}
                </span>
            </div>
            <div>
                <h3 class="pub-title">${primary
                    ? `<a href="${esc(primary.href)}" target="_blank" rel="noopener">${esc(p.title)}</a>`
                    : esc(p.title)}</h3>
                <p class="pub-authors">${authorLine(p.authors)}</p>
                <p class="pub-venue">${esc(p.venue)}, ${esc(p.year)}${
                    p.venueNote ? `<span class="note">${esc(p.venueNote)}</span>` : ''
                }</p>
                <p class="pub-takeaway">${esc(p.takeaway)}</p>
                <div class="pub-actions">${pubActions(p)}</div>
                ${pubDrawers(p)}
                <div class="pub-tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
            </div>
        </article>`;
    }).join('');

    wirePubButtons();
}

function wirePubButtons() {
    /* abstract / bibtex drawers */
    document.querySelectorAll('[data-drawer]').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.drawer);
            if (!target) return;
            const open = target.classList.toggle('open');
            btn.setAttribute('aria-expanded', String(open));
            btn.classList.toggle('copied', false);
        });
    });

    /* copy bibtex */
    document.querySelectorAll('.bib-copy').forEach(btn => {
        btn.addEventListener('click', async () => {
            const pre = document.getElementById(`bibtext-${btn.dataset.copy}`);
            if (!pre) return;
            const text = pre.textContent;
            try {
                await navigator.clipboard.writeText(text);
            } catch (e) {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); } catch (err) { /* give up quietly */ }
                document.body.removeChild(ta);
            }
            const original = btn.textContent;
            btn.textContent = 'COPIED';
            setTimeout(() => { btn.textContent = original; }, 1600);
        });
    });
}

/* -----------------------------------------------------------------
   SPECULATIVE DECODING VISUAL
   An illustration of the paper's central finding: the draft model
   proposes tokens, the target model verifies them, and the fraction
   it accepts collapses as the language gets lower-resource.
----------------------------------------------------------------- */
const SPEC_SAMPLES = [
    {
        lang: 'English',
        tokens: ['The', ' draft', ' model', ' pro', 'poses', ' several', ' to', 'kens', ' at', ' once'],
        accept: 8, rate: '80%', speedup: '2.3×'
    },
    {
        lang: 'Spanish',
        tokens: ['El', ' modelo', ' bor', 'rador', ' pro', 'pone', ' varios', ' to', 'kens'],
        accept: 6, rate: '67%', speedup: '1.9×'
    },
    {
        lang: 'Indonesian',
        tokens: ['Model', ' draf', ' meng', 'usul', 'kan', ' beberapa', ' token'],
        accept: 4, rate: '57%', speedup: '1.5×'
    },
    {
        lang: 'Nepali',
        tokens: ['ड्राफ्ट', ' मोडेल', ' ले', ' धेरै', ' टोकन', ' प्रस्ताव', ' गर्छ'],
        accept: 2, rate: '29%', speedup: '1.1×'
    },
    {
        lang: 'Amharic',
        tokens: ['የ', 'ረቂቅ', ' ሞዴል', ' በርካታ', ' ቶከኖች', ' ያቀርባል'],
        accept: 1, rate: '17%', speedup: '0.9×'
    }
];

function initSpecViz() {
    const box = document.getElementById('specviz');
    if (!box) return;

    box.innerHTML = `
        <div class="specviz-head">
            <span>speculative decoding</span>
            <span class="specviz-lang" id="sv-lang">—</span>
        </div>
        <div class="specviz-row">
            <span class="specviz-row-label" id="sv-label">draft model proposes</span>
            <div class="specviz-tokens" id="sv-tokens"></div>
        </div>
        <div class="specviz-meter"><i id="sv-meter"></i></div>
        <div class="specviz-stat">
            <span>acceptance <b id="sv-rate">—</b></span>
            <span>speed-up <b id="sv-speed">—</b></span>
        </div>
        <p class="specviz-note">
            Illustration, not measured data — see the paper for the real numbers across eleven languages.
        </p>
    `;

    const elLang   = document.getElementById('sv-lang');
    const elLabel  = document.getElementById('sv-label');
    const elTokens = document.getElementById('sv-tokens');
    const elMeter  = document.getElementById('sv-meter');
    const elRate   = document.getElementById('sv-rate');
    const elSpeed  = document.getElementById('sv-speed');

    const paint = (s, verified) => {
        elLang.textContent = s.lang;
        elTokens.innerHTML = s.tokens.map((t, i) => {
            let cls = 'tok shown';
            if (verified) cls += i < s.accept ? ' accepted' : (i === s.accept ? ' rejected' : '');
            return `<span class="${cls}">${esc(t.trim())}</span>`;
        }).join('');
    };

    /* static fallback when the visitor prefers less motion */
    if (reducedMotion()) {
        const s = SPEC_SAMPLES[SPEC_SAMPLES.length - 2];
        paint(s, true);
        elLabel.textContent = 'target model verifies';
        elMeter.style.width = s.rate;
        elRate.textContent  = s.rate;
        elSpeed.textContent = s.speedup;
        return;
    }

    let idx = 0;
    let timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));

    function cycle() {
        timers.forEach(clearTimeout);
        timers = [];

        const s = SPEC_SAMPLES[idx];
        idx = (idx + 1) % SPEC_SAMPLES.length;

        /* phase 1 — draft proposes, tokens fade in one by one */
        elLang.textContent  = s.lang;
        elLabel.textContent = 'draft model proposes';
        elMeter.style.width = '0%';
        elRate.textContent  = '…';
        elSpeed.textContent = '…';
        elTokens.innerHTML  = s.tokens
            .map(t => `<span class="tok">${esc(t.trim())}</span>`)
            .join('');

        const chips = [...elTokens.children];
        chips.forEach((c, i) => later(() => c.classList.add('shown'), 70 * i));

        const drafted = 70 * chips.length + 380;

        /* phase 2 — target verifies, accepting a prefix */
        later(() => { elLabel.textContent = 'target model verifies'; }, drafted);
        chips.forEach((c, i) => later(() => {
            if (i < s.accept)       c.classList.add('accepted');
            else if (i === s.accept) c.classList.add('rejected');
        }, drafted + 110 * i));

        const verified = drafted + 110 * (s.accept + 1) + 200;
        later(() => {
            elMeter.style.width = s.rate;
            elRate.textContent  = s.rate;
            elSpeed.textContent = s.speedup;
        }, verified);

        later(cycle, verified + 2600);
    }

    /* only run while it is actually on screen */
    if ('IntersectionObserver' in window) {
        let running = false;
        new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting && !running) { running = true; cycle(); }
                else if (!e.isIntersecting && running) {
                    running = false;
                    timers.forEach(clearTimeout);
                    timers = [];
                }
            });
        }, { threshold: 0.2 }).observe(box);
    } else {
        cycle();
    }
}

/* -----------------------------------------------------------------
   PROJECTS
----------------------------------------------------------------- */
function renderProjects() {
    const grid = document.getElementById('project-grid');
    if (!grid || typeof PROJECTS === 'undefined') return;

    grid.innerHTML = PROJECTS.map(p => `
        <article class="project ${p.details ? '' : 'no-details'}"
                 data-category="${esc(p.category)}"
                 data-id="${esc(p.id)}"
                 ${p.details ? 'tabindex="0" role="button" aria-label="Read more about ' + esc(p.title) + '"' : ''}>
            <div class="project-top">
                <span class="project-year">${esc(p.year)}</span>
                ${p.badge ? `<span class="project-badge">${esc(p.badge)}</span>` : ''}
                ${p.details ? '<span class="project-arrow"><i class="fas fa-arrow-up-right-from-square"></i></span>' : ''}
            </div>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.desc)}</p>
            <div class="project-tech">${p.tech.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        </article>
    `).join('');
}

function initFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    const grid = document.getElementById('project-grid');
    if (!btns.length || !grid) return;

    const apply = (f) => {
        grid.querySelectorAll('.project').forEach(card => {
            const match = f === 'all' || (card.dataset.category || '').includes(f);
            card.style.display = match ? '' : 'none';
        });
    };

    apply('featured');

    btns.forEach(btn => btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        apply(btn.dataset.filter);
    }));
}

/* -----------------------------------------------------------------
   PROJECT MODAL
----------------------------------------------------------------- */
function initModal() {
    const modal    = document.getElementById('modal');
    const body     = document.getElementById('modal-body');
    const closeBtn = document.getElementById('modal-close');
    const grid     = document.getElementById('project-grid');
    if (!modal || !body || typeof PROJECTS === 'undefined') return;

    let lastFocused = null;

    function open(id) {
        const p = PROJECTS.find(x => x.id === id);
        if (!p || !p.details) return;

        lastFocused = document.activeElement;
        body.innerHTML = `
            <h2 class="modal-title">${esc(p.title)}</h2>
            ${p.links.length ? `<div class="modal-links">${p.links.map(l => `
                <a href="${esc(l.href)}" target="_blank" rel="noopener"><i class="${esc(l.icon)}"></i> ${esc(l.label)}</a>
            `).join('')}</div>` : ''}
            <div class="modal-tech">${p.tech.map(t => `<span>${esc(t)}</span>`).join('')}</div>
            <hr class="modal-sep">
            <div class="modal-detail">${p.details}</div>
        `;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        modal.querySelector('.modal-scroll').scrollTop = 0;
        closeBtn?.focus();
    }

    function close() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        lastFocused?.focus();
    }

    grid?.addEventListener('click', e => {
        const card = e.target.closest('.project');
        if (card) open(card.dataset.id);
    });
    grid?.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = e.target.closest('.project');
        if (!card) return;
        e.preventDefault();
        open(card.dataset.id);
    });

    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    closeBtn?.addEventListener('click', close);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('show')) close();
    });
}

/* -----------------------------------------------------------------
   WRITING
----------------------------------------------------------------- */
function renderWriting() {
    const list = document.getElementById('writing-list');
    if (!list || typeof blogPosts === 'undefined') return;

    list.innerHTML = blogPosts.map(post => `
        <article class="post-row" data-href="${post.href || `blog-post.html?post=${encodeURIComponent(post.slug)}`}"
                 tabindex="0" role="link" aria-label="${esc(post.title)}">
            <span class="post-row-date">${esc(post.date)}</span>
            <div>
                <h3>${esc(post.title)}</h3>
                <p>${esc(post.excerpt)}</p>
                <div class="post-row-tags">${post.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
            </div>
            <span class="post-row-arrow"><i class="fas fa-arrow-right"></i></span>
        </article>
    `).join('');

    const go = (el) => { window.location.href = el.dataset.href; };
    list.querySelectorAll('.post-row').forEach(row => {
        row.addEventListener('click', () => go(row));
        row.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(row); }
        });
    });
}
