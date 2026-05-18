const PROJECTS = [
    {
        id: 'tensor',
        title: 'Tensor: Agentic RAG Academic AI',
        desc: 'Advanced RAG conversational AI platform for engineering students — centralized access to past papers, syllabuses, and technical notes with intelligent multi-stage question answering.',
        icon: 'fas fa-brain',
        badge: 'Featured',
        category: 'featured ai',
        size: 'wide',        // spans 2 bento columns
        tech: ['FastAPI', 'React', 'Pinecone', 'Redis', 'LangChain'],
        links: [
            { href: 'https://tensorchat.me/', icon: 'fas fa-external-link-alt', label: 'Live Demo' }
        ],
        details: `
            <h4>The Challenge</h4>
            <p>Engineering students in Nepal struggled to navigate thousands of pages of legacy PDFs, multi-page syllabuses, and complex technical notes. Traditional search fails year-specific queries like "Show me 8-mark numericals on Sorting from 2076."</p>
            <h4>Solution</h4>
            <p>A Multi-Stage Agentic RAG pipeline with hybrid query architecture combining AI metadata extraction, vector search, and metadata filtering.</p>
            <h4>Key Technical Highlights</h4>
            <ul>
                <li><strong>Hybrid Query Architecture:</strong> GPT-4o-mini dynamically extracts filters (year, subject, chapter, marks) from natural language — zero-noise results</li>
                <li><strong>Intent Routing:</strong> LLM-based router classifies into Structured / Semantic / Past Question / Hybrid categories</li>
                <li><strong>Two-Stage Reranking:</strong> 50-candidate pool narrowed to top 10 via Cross-Encoder (ms-marco-MiniLM-L-6-v2)</li>
                <li><strong>Multi-Layer Redis Caching:</strong> 60%+ cache hit rate, 70% reduction in LLM API overhead</li>
                <li><strong>Streaming Architecture:</strong> Server-Sent Events for &lt;200ms TTFT</li>
            </ul>
            <h4>Results</h4>
            <ul>
                <li>P95 response time under 3 seconds · &lt;200ms TTFT</li>
                <li>85%+ query accuracy · 40% Top-1 retrieval improvement via reranking</li>
                <li>25+ engineering past papers indexed · 100,000+ vectors on Pinecone Serverless</li>
            </ul>
            <h4>Stack</h4>
            <p><strong>Backend:</strong> Python, FastAPI, SQLAlchemy, Pydantic<br>
            <strong>Frontend:</strong> React, Vite, Tailwind CSS, Vercel AI SDK<br>
            <strong>AI/ML:</strong> OpenAI, Gemini, Pinecone, LlamaParse, Sentence-Transformers<br>
            <strong>Infra:</strong> Redis/Upstash, Vercel, Railway, GitHub Actions</p>
        `
    },
    {
        id: 'k8s-lambda',
        title: 'Serverless vs. Kubernetes Benchmark',
        desc: 'Production-grade infra comparing AWS Lambda and EKS for DistilBERT inference. Full IaC, CI/CD, observability, and AI-powered SRE reports.',
        icon: 'fas fa-cloud',
        badge: 'Featured',
        category: 'featured cloud',
        size: 'normal',
        tech: ['AWS', 'Terraform', 'Kubernetes', 'FastAPI', 'Locust'],
        links: [
            { href: 'https://github.com/paudelnirajan/k8s-vs-lambda-nlp-benchmark.git', icon: 'fab fa-github', label: 'GitHub' }
        ],
        details: `
            <h4>The Challenge</h4>
            <p>Compare serverless and containerized deployments for ML inference across cold start behavior, latency, scalability, and cost. Key constraint: DistilBERT model load (~60s) exceeds API Gateway's 29-second timeout.</p>
            <h4>Solution Architecture</h4>
            <ul>
                <li><strong>AWS Lambda:</strong> Container-based (3008 MB RAM), API Gateway integration, pay-per-request</li>
                <li><strong>Amazon EKS:</strong> Managed node groups, 2-replica deployment, Classic Load Balancer</li>
                <li><strong>FastAPI Router:</strong> Exponential backoff retry for Lambda cold starts + Prometheus metrics</li>
                <li><strong>Streamlit Dashboard:</strong> Real-time side-by-side comparison + Groq-powered AI analysis (Llama 3)</li>
            </ul>
            <h4>Results</h4>
            <ul>
                <li>Manual 2h deployment → automated 15 min</li>
                <li>100% reproducible deployments via Terraform</li>
                <li>90%+ test coverage · Quantified cost trade-offs</li>
            </ul>
        `
    },
    {
        id: 'zenco',
        title: 'Zenco: AI Code Analysis Platform',
        desc: 'Open-source CLI leveraging LLMs to automate code documentation, refactoring, and quality enhancement across 5 languages. Reduces dev time 20–30% and API costs 30–50%.',
        icon: 'fas fa-code',
        badge: 'Featured',
        category: 'featured ai',
        size: 'wide',
        tech: ['Python', 'Tree-sitter', 'LLM APIs', 'TypeScript', 'CI/CD'],
        links: [
            { href: 'https://github.com/paudelnirajan/autodoc',                     icon: 'fab fa-github',              label: 'GitHub' },
            { href: 'https://pypi.org/project/zenco/',                              icon: 'fas fa-external-link-alt',   label: 'PyPI' },
            { href: 'https://github.com/paudelnirajan/zenco-vscode-extension',      icon: 'fas fa-code',                label: 'VS Code Extension' }
        ],
        details: `
            <h4>The Challenge</h4>
            <p>Developers spend 20–30% of time on repetitive tasks — docstrings, type hints, dead code. Using LLM APIs inefficiently on large codebases is expensive and slow.</p>
            <h4>Breakthrough: Execution Priority System</h4>
            <p>Dead code detection runs first; subsequent stages skip detected dead code — achieving 30–50% reduction in LLM API calls.</p>
            <h4>Architecture</h4>
            <ul>
                <li><strong>Multi-Language Parsing:</strong> Tree-sitter for Python, JavaScript, Java, C++, Go</li>
                <li><strong>Modular Design:</strong> 2,057-line monolith → 4 independent processors, 70% complexity reduction</li>
                <li><strong>Design Patterns:</strong> Strategy, Factory, Visitor (AST traversal), Adapter (unified LLM interface)</li>
                <li><strong>Multi-Provider LLM:</strong> Groq, OpenAI, Anthropic, Gemini via unified API</li>
            </ul>
            <h4>DevOps</h4>
            <ul>
                <li>GitHub Actions matrix: 3 OSes × 4 Python versions (3.9–3.12) = 12 combinations</li>
                <li>95.5% test pass rate · Published on PyPI · Automated versioning</li>
            </ul>
            <h4>VS Code Extension</h4>
            <p>TypeScript extension bringing Zenco into the IDE — diff view for side-by-side comparison, automatic CLI management, status bar integration, cross-platform compatibility.</p>
        `
    },
    {
        id: 'music-saas',
        title: 'Music Separation as a Service',
        desc: 'Scalable microservices on GKE for AI-driven audio source separation. Processes MP3s into 4 stems via async Redis pipeline.',
        icon: 'fas fa-music',
        category: 'cloud',
        size: 'normal',
        tech: ['GKE', 'Redis', 'Flask', 'Demucs', 'GCS'],
        links: [],
        details: `
            <h4>Overview</h4>
            <p>Asynchronous pipeline on Google Kubernetes Engine separating audio into vocals, drums, bass, and other stems using the Demucs ML model.</p>
            <h4>Key Achievements</h4>
            <ul>
                <li><strong>GCS Migration:</strong> MinIO → Google Cloud Storage — data durability from ephemeral to 99.99%</li>
                <li><strong>Async Processing:</strong> Redis queue decouples Flask API from ML worker — API response &lt;200ms, ML inference 2–5 min/song</li>
                <li><strong>Resource Management:</strong> 6Gi RAM limits for Demucs pods — zero evictions from memory spikes</li>
                <li><strong>Horizontal Scaling:</strong> Worker pool scales dynamically on queue depth</li>
            </ul>
        `
    },
    {
        id: 'audio-rag',
        title: 'Audio RAG Assistant',
        desc: 'Transcribes audio with OpenAI Whisper and enables intelligent Q&A via Retrieval-Augmented Generation.',
        icon: 'fas fa-microphone',
        category: 'ai',
        size: 'normal',
        tech: ['Whisper', 'RAG', 'Python', 'LangChain'],
        links: [{ href: 'https://github.com/Nirajan17/Audio-RAG', icon: 'fab fa-github', label: 'GitHub' }],
        details: null
    },
    {
        id: 'digital-me',
        title: 'digitalME Personal Assistant',
        desc: 'Personal AI chatbot for natural conversations, document retrieval, and database queries.',
        icon: 'fas fa-robot',
        category: 'ai',
        size: 'normal',
        tech: ['Python', 'NLP', 'RAG', 'LangChain'],
        links: [{ href: 'https://github.com/Nirajan17/digitalME--Personal-Chatbot', icon: 'fab fa-github', label: 'GitHub' }],
        details: null
    },
    {
        id: 'pdf-chat',
        title: 'PDF Chat Assistant',
        desc: 'Upload PDFs and chat with them using Mistral-7B-Instruct for natural language document interaction.',
        icon: 'fas fa-file-pdf',
        category: 'ai',
        size: 'normal',
        tech: ['Mistral-7B', 'LLM', 'Python', 'RAG'],
        links: [{ href: 'https://github.com/Nirajan17/PDF-Chat-Assistant', icon: 'fab fa-github', label: 'GitHub' }],
        details: null
    },
    {
        id: 'nepali-caption',
        title: 'Nepali Image Captioning',
        desc: 'Transformer model generating paragraph-length Nepali captions for images with Inception V3 feature extraction.',
        icon: 'fas fa-image',
        category: 'ai',
        size: 'normal',
        tech: ['Transformer', 'CNN', 'NLP', 'TensorFlow'],
        links: [{ href: 'https://github.com/paudelnirajan/Major_Project_image_captioning', icon: 'fab fa-github', label: 'GitHub' }],
        details: null
    },
    {
        id: 'tour-rec',
        title: 'Tour Recommender — Pokhara',
        desc: 'Content-based recommendation for Pokhara destinations using description, genre, and keyword similarity.',
        icon: 'fas fa-map-marker-alt',
        category: 'ai',
        size: 'normal',
        tech: ['Python', 'ML', 'NLP', 'Scikit-learn'],
        links: [{ href: 'https://github.com/Nirajan17/Tour-Recommender-Pokhara', icon: 'fab fa-github', label: 'GitHub' }],
        details: null
    }
];

/* -----------------------------------------------------------------
   INIT
----------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    initMobileNav();
    initScrollReveal();
    initTypewriter();
    renderProjects();
    initFilters();
    initModal();
    renderBlog();
});

/* -----------------------------------------------------------------
   THEME — dark / light toggle
----------------------------------------------------------------- */
function initTheme() {
    const saved = localStorage.getItem('np-theme') || 'dark';
    applyTheme(saved);

    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('mob-theme')?.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('np-theme', next);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    const iconClass = isDark ? 'fas fa-sun' : 'fas fa-moon';
    const label    = isDark ? 'Dark mode' : 'Light mode';

    const icon  = document.getElementById('theme-icon');
    const lbl   = document.getElementById('theme-label');
    const mIcon = document.getElementById('mob-theme-icon');

    if (icon)  icon.className  = iconClass;
    if (lbl)   lbl.textContent = label;
    if (mIcon) mIcon.className = iconClass;
}

/* -----------------------------------------------------------------
   SIDEBAR — active link tracking
----------------------------------------------------------------- */
function initNav() {
    const links    = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function updateActive() {
        const mid = window.scrollY + window.innerHeight * 0.35;
        sections.forEach(s => {
            if (mid >= s.offsetTop && mid < s.offsetTop + s.offsetHeight) {
                links.forEach(l => {
                    l.classList.toggle('active', l.dataset.target === s.id);
                });
            }
        });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = 80;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        });
    });
}

/* -----------------------------------------------------------------
   MOBILE NAV
----------------------------------------------------------------- */
function initMobileNav() {
    const toggle   = document.getElementById('mob-toggle');
    const drawer   = document.getElementById('mob-drawer');
    const backdrop = document.getElementById('mob-backdrop');

    function openDrawer() {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        backdrop.classList.add('show');
        toggle.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        backdrop.classList.remove('show');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
    }

    toggle?.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
    backdrop?.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(l => l.addEventListener('click', closeDrawer));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
}

/* -----------------------------------------------------------------
   SCROLL REVEAL
----------------------------------------------------------------- */
function initScrollReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* -----------------------------------------------------------------
   TYPEWRITER
----------------------------------------------------------------- */
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const roles = ['ML Engineer', 'Cloud Architect', 'NLP Researcher', 'Software Engineer'];
    let ri = 0, ci = 0, deleting = false, speed = 110;

    function tick() {
        const word = roles[ri];
        el.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
        if (!deleting && ci === word.length)      { deleting = true;  speed = 2200; }
        else if (deleting && ci === 0)            { deleting = false; ri = (ri + 1) % roles.length; speed = 450; }
        else                                       { speed = deleting ? 48 : 110; }
        setTimeout(tick, speed);
    }
    setTimeout(tick, 800);
}

/* -----------------------------------------------------------------
   RENDER PROJECTS (bento)
----------------------------------------------------------------- */
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = PROJECTS.map(p => `
        <article class="project-item" data-category="${p.category}" data-id="${p.id}">
            <div class="project-main">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.desc}</p>
                <div class="project-tech">
                    ${p.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
            <span class="project-arrow"><i class="fas fa-arrow-right"></i></span>
        </article>
    `).join('');
}

/* -----------------------------------------------------------------
   PROJECT FILTERS
----------------------------------------------------------------- */
function initFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    const grid = document.getElementById('projects-grid');
    if (!btns.length || !grid) return;

    function applyFilter(f) {
        const items = grid.querySelectorAll('.project-item');
        items.forEach(c => {
            const cats = c.dataset.category || '';
            c.style.display = f === 'all' || cats.includes(f) ? '' : 'none';
        });
    }

    applyFilter('featured');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.dataset.filter);
        });
    });
}

/* -----------------------------------------------------------------
   MODAL
----------------------------------------------------------------- */
function initModal() {
    const overlay  = document.getElementById('modal-overlay');
    const body     = document.getElementById('modal-body');
    const closeBtn = document.getElementById('modal-close');
    if (!overlay) return;

    function open(id) {
        const p = PROJECTS.find(x => x.id === id);
        if (!p || !p.details) return;

        body.innerHTML = `
            <h2 class="modal-title">${p.title}</h2>
            <div class="modal-links">
                ${p.links.map(l => `
                    <a href="${l.href}" target="_blank" rel="noopener">
                        <i class="${l.icon}"></i> ${l.label}
                    </a>
                `).join('')}
            </div>
            <div class="modal-tech">
                ${p.tech.map(t => `<span>${t}</span>`).join('')}
            </div>
            <hr class="modal-sep">
            <div class="modal-detail">${p.details}</div>
        `;

        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        overlay.querySelector('.modal-scroll').scrollTop = 0;
    }

    function close() {
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    document.getElementById('projects-grid')?.addEventListener('click', e => {
        const item = e.target.closest('.project-item');
        if (item) open(item.dataset.id);
    });

    overlay?.addEventListener('click', e => {
        if (e.target === overlay) close();
    });
    closeBtn?.addEventListener('click', close);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('show')) close();
    });
}

/* -----------------------------------------------------------------
   BLOG
----------------------------------------------------------------- */
function renderBlog() {
    const grid = document.getElementById('blog-grid');
    if (!grid || typeof blogPosts === 'undefined') return;

    grid.innerHTML = blogPosts.map(post => `
        <article class="blog-item" data-href="blog-post.html?post=${post.slug}">
            <div class="blog-main">
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-meta">
                    <span class="blog-date">${post.date}</span>
                    <div class="blog-tags">
                        ${post.tags.map(t => `<span>${t}</span>`).join('')}
                    </div>
                </div>
            </div>
            <span class="blog-arrow" aria-hidden="true">
                <i class="fas fa-arrow-right"></i>
            </span>
        </article>
    `).join('');

    grid.querySelectorAll('.blog-item').forEach(item => {
        item.addEventListener('click', () => {
            window.location.href = item.dataset.href;
        });
    });
}
