/* =================================================================
   SITE DATA — edit this file to update the site content.
     NEWS         → the dated updates feed on the homepage
     PUBLICATIONS → the research / publications list
     PROJECTS     → the engineering projects grid
   Blog posts live in blog-data.js + posts/<slug>.md
================================================================= */

/* -----------------------------------------------------------------
   NEWS — newest first. `date` is the display string, `sort` is
   YYYY-MM used only for ordering. Set `highlight: true` for a dot
   accent on especially good news.
----------------------------------------------------------------- */
const NEWS = [
    {
        sort: '2026-05',
        date: 'August 2026',
        html: '<strong>Speculative Decoding and the Curse of Multilinguality</strong> is on arXiv and under review at <strong>ACL 2026</strong>.',
        highlight: true
    },
    {
        sort: '2026-05',
        date: 'May 2026',
        html: 'Wrote up <a href="blog-post.html?post=nlp-tool-calling-transformer">building a tool-calling Transformer from scratch in NumPy</a> — no autograd, no frameworks, just the math.',
        highlight: false
    },
    {
        sort: '2025-08',
        date: 'Aug 2025',
        html: 'Started my M.S. in Computer Science at the <strong>University of Colorado Boulder</strong>.',
        highlight: false
    },
    {
        sort: '2024-03',
        date: '2024',
        html: 'Published (locally) the work on Nepali image captioning (JSCP) and a driver drowsiness detection system (JISMAC).',
        highlight: false
    }
];

/* -----------------------------------------------------------------
   PUBLICATIONS — newest first.
     status: 'preprint' | 'peer-reviewed'
     authors: array; mark yourself with { me: true }
----------------------------------------------------------------- */
const PUBLICATIONS = [
    {
        id: 'spec-decoding-multilinguality',
        featured: true,
        year: '2026',
        status: 'preprint',
        venue: 'arXiv preprint',
        venueNote: 'Under review at ACL 2026',
        title: 'Speculative Decoding and the Curse of Multilinguality',
        authors: [
            { name: 'Nirajan Paudel', me: true },
            { name: 'Michael Ginn' },
            { name: 'Luc De Nardi' },
            { name: 'Alexis Palmer' }
        ],
        abstract: `Speculative decoding is a popular technique for large language model (LLM) inference, enabling faster generation by drafting multiple tokens with a smaller draft model. However, the effectiveness of speculative decoding has mainly been studied for English. Motivated by the curse of multilinguality, we hypothesize that speculative decoding is far less effective for low-resource languages due to the limited multilingual capacities of smaller models. We test eleven languages under a standard speculative decoding setup and find strong evidence for our hypothesis. Next, we try to improve the multilingual capabilities of the smaller draft model via distillation from the larger model. We find, though, that distillation generalizes poorly across tasks in the same language, and we argue that assembling a task-agnostic, fully representative dataset is infeasible for low-resource languages. Finally, we propose weaker n-gram models as draft models; these provide moderate speed-ups due to their minuscule inference cost.`,
        takeaway: 'The speed-ups everyone quotes for speculative decoding are an English result. Across eleven languages, the gains shrink sharply as resources thin out — and the obvious fix, distilling the draft model, does not transfer across tasks.',
        tags: ['Multilingual NLP', 'Efficient Inference', 'Low-Resource Languages'],
        links: [
            { href: 'https://arxiv.org/abs/2605.30580', label: 'arXiv', icon: 'fas fa-file-lines' },
            { href: 'https://arxiv.org/pdf/2605.30580', label: 'PDF', icon: 'fas fa-file-pdf' }
        ],
        bibtex: `@misc{paudel2026speculative,
  title         = {Speculative Decoding and the Curse of Multilinguality},
  author        = {Paudel, Nirajan and Ginn, Michael and De Nardi, Luc and Palmer, Alexis},
  year          = {2026},
  eprint        = {2605.30580},
  archivePrefix = {arXiv},
  primaryClass  = {cs.CL},
  url           = {https://arxiv.org/abs/2605.30580}
}`
    },
    {
        id: 'nepali-image-captioning',
        featured: false,
        year: '2024',
        status: 'peer-reviewed',
        venue: 'Journal of Soft Computing Paradigm (JSCP)',
        venueNote: null,
        title: 'Nepali Image Captioning: Generating Coherent Paragraph-Length Descriptions Using Transformer',
        authors: [
            { name: 'Nabaraj Subedi' },
            { name: 'Nirajan Paudel', me: true },
            { name: 'Manish Chhetri' },
            { name: 'Sudarshan Acharya' },
            { name: 'Nabin Lamichhane' }
        ],
        abstract: `Image captioning for Nepali is constrained by the near-absence of paragraph-level annotated data. We build a Transformer-based captioning model that pairs Inception-V3 visual features with a decoder trained to produce coherent paragraph-length Nepali descriptions rather than single sentences, and evaluate it against sentence-level baselines on a translated and manually corrected corpus.`,
        takeaway: 'A paragraph-level Nepali captioning model built on top of a translated corpus — an early look at how far transfer gets you when the target language has almost no native training data.',
        tags: ['Vision + Language', 'Nepali', 'Transformers'],
        links: [
            { href: 'https://doi.org/10.36548/jscp.2024.1.006', label: 'DOI', icon: 'fas fa-arrow-up-right-from-square' },
            { href: 'https://github.com/paudelnirajan/Major_Project_image_captioning', label: 'Code', icon: 'fab fa-github' }
        ],
        bibtex: `@article{subedi2024nepali,
  title   = {Nepali Image Captioning: Generating Coherent Paragraph-Length Descriptions Using Transformer},
  author  = {Subedi, Nabaraj and Paudel, Nirajan and Chhetri, Manish and Acharya, Sudarshan and Lamichhane, Nabin},
  journal = {Journal of Soft Computing Paradigm},
  year    = {2024},
  doi     = {10.36548/jscp.2024.1.006}
}`
    },
    {
        id: 'drowsiness-crash-detection',
        featured: false,
        year: '2024',
        status: 'peer-reviewed',
        venue: 'Journal of ISMAC (JISMAC)',
        venueNote: null,
        title: "Drowsiness and Crash Detection Mobile Application for Vehicle's Safety",
        authors: [
            { name: 'Nabaraj Subedi' },
            { name: 'Nirajan Paudel', me: true },
            { name: 'Manish Chhetri' },
            { name: 'Sudarshan Acharya' },
            { name: 'Nabin Lamichhane' }
        ],
        abstract: `A mobile application that runs on-device computer vision to detect driver drowsiness from facial landmarks and eye-aspect-ratio dynamics, combined with accelerometer-based crash detection that triggers an automatic emergency alert. The system is designed to run within the compute and battery budget of a commodity smartphone.`,
        takeaway: 'On-device drowsiness and crash detection for commodity phones — the constraint that shaped everything was doing real-time vision inside a phone battery budget.',
        tags: ['Computer Vision', 'On-Device ML', 'Safety'],
        links: [
            { href: 'https://doi.org/10.36548/jismac.2024.1.005', label: 'DOI', icon: 'fas fa-arrow-up-right-from-square' }
        ],
        bibtex: `@article{subedi2024drowsiness,
  title   = {Drowsiness and Crash Detection Mobile Application for Vehicle's Safety},
  author  = {Subedi, Nabaraj and Paudel, Nirajan and Chhetri, Manish and Acharya, Sudarshan and Lamichhane, Nabin},
  journal = {Journal of ISMAC},
  year    = {2024},
  doi     = {10.36548/jismac.2024.1.005}
}`
    }
];

/* -----------------------------------------------------------------
   PROJECTS — engineering work, shown below research.
----------------------------------------------------------------- */
const PROJECTS = [
    {
        id: 'tensor',
        title: 'Tensor: Agentic RAG for Academic Search',
        desc: 'A multi-stage agentic RAG system that lets engineering students in Nepal query a decade of past papers, syllabuses, and notes in natural language.',
        year: '2025',
        badge: 'Live',
        category: 'featured ai',
        tech: ['FastAPI', 'React', 'Pinecone', 'Redis', 'LangChain'],
        links: [
            { href: 'https://api-beta-tensor.sarvabhaum.ai/', icon: 'fas fa-arrow-up-right-from-square', label: 'Live Demo' }
        ],
        details: `
            <h4>The problem</h4>
            <p>Engineering students in Nepal navigate thousands of pages of legacy PDFs, multi-page syllabuses, and dense technical notes. Ordinary search fails on the queries they actually have — things like "show me 8-mark numericals on sorting from 2076."</p>
            <h4>Approach</h4>
            <p>A multi-stage agentic RAG pipeline with a hybrid query architecture: an LLM extracts structured filters from free text, which are combined with vector search and metadata filtering.</p>
            <h4>What made it work</h4>
            <ul>
                <li><strong>Hybrid query architecture:</strong> GPT-4o-mini dynamically extracts year, subject, chapter, and mark filters from natural language, giving near-zero-noise result sets</li>
                <li><strong>Intent routing:</strong> an LLM router classifies each query as structured, semantic, past-question, or hybrid</li>
                <li><strong>Two-stage reranking:</strong> a 50-candidate pool narrowed to the top 10 with a cross-encoder (ms-marco-MiniLM-L-6-v2)</li>
                <li><strong>Multi-layer Redis caching:</strong> 60%+ hit rate, cutting LLM API overhead by 70%</li>
                <li><strong>Streaming:</strong> server-sent events for sub-200ms time-to-first-token</li>
            </ul>
            <h4>Results</h4>
            <ul>
                <li>P95 response under 3 seconds, TTFT under 200ms</li>
                <li>85%+ query accuracy, with reranking contributing a 40% top-1 retrieval improvement</li>
                <li>25+ past papers indexed as 100,000+ vectors on Pinecone Serverless</li>
            </ul>
            <h4>Stack</h4>
            <p><strong>Backend:</strong> Python, FastAPI, SQLAlchemy, Pydantic<br>
            <strong>Frontend:</strong> React, Vite, Tailwind CSS, Vercel AI SDK<br>
            <strong>AI/ML:</strong> OpenAI, Gemini, Pinecone, LlamaParse, Sentence-Transformers<br>
            <strong>Infra:</strong> Redis/Upstash, Vercel, Railway, GitHub Actions</p>
        `
    },
    {
        id: 'zenco',
        title: 'Zenco: LLM-Powered Code Analysis',
        desc: 'Open-source CLI that automates documentation, refactoring, and dead-code removal across five languages — with an execution-priority scheme that cuts LLM API calls 30–50%.',
        year: '2025',
        badge: 'Open Source',
        category: 'featured ai',
        tech: ['Python', 'Tree-sitter', 'TypeScript', 'LLM APIs', 'CI/CD'],
        links: [
            { href: 'https://github.com/paudelnirajan/autodoc', icon: 'fab fa-github', label: 'GitHub' },
            { href: 'https://pypi.org/project/zenco/', icon: 'fas fa-cube', label: 'PyPI' },
            { href: 'https://github.com/paudelnirajan/zenco-vscode-extension', icon: 'fas fa-code', label: 'VS Code' }
        ],
        details: `
            <h4>The problem</h4>
            <p>Developers spend 20–30% of their time on repetitive maintenance — docstrings, type hints, dead code. Naively pointing an LLM at a large codebase is both slow and expensive.</p>
            <h4>The key idea: execution priority</h4>
            <p>Dead-code detection runs first, and every subsequent stage skips whatever it marked. That single ordering constraint removes 30–50% of the LLM API calls.</p>
            <h4>Architecture</h4>
            <ul>
                <li><strong>Multi-language parsing:</strong> Tree-sitter grammars for Python, JavaScript, Java, C++, and Go</li>
                <li><strong>Modular refactor:</strong> a 2,057-line monolith split into four independent processors, a ~70% complexity reduction</li>
                <li><strong>Design patterns:</strong> Strategy, Factory, Visitor for AST traversal, Adapter for a unified LLM interface</li>
                <li><strong>Multi-provider:</strong> Groq, OpenAI, Anthropic, and Gemini behind one API</li>
            </ul>
            <h4>Engineering</h4>
            <ul>
                <li>GitHub Actions matrix across 3 OSes × 4 Python versions (3.9–3.12)</li>
                <li>95.5% test pass rate, published to PyPI with automated versioning</li>
                <li>A TypeScript VS Code extension with diff view, automatic CLI management, and status-bar integration</li>
            </ul>
        `
    },
    {
        id: 'k8s-lambda',
        title: 'Serverless vs. Kubernetes for ML Inference',
        desc: 'A controlled benchmark of AWS Lambda against EKS for DistilBERT inference — full IaC, load generation, observability, and automated SRE reporting.',
        year: '2025',
        badge: null,
        category: 'featured cloud',
        tech: ['AWS', 'Terraform', 'Kubernetes', 'FastAPI', 'Locust'],
        links: [
            { href: 'https://github.com/paudelnirajan/k8s-vs-lambda-nlp-benchmark.git', icon: 'fab fa-github', label: 'GitHub' }
        ],
        details: `
            <h4>The question</h4>
            <p>For ML inference specifically, how do serverless and containerized deployments actually compare on cold starts, tail latency, scaling behavior, and cost? A hard constraint framed the whole thing: DistilBERT takes ~60s to load, well past API Gateway's 29-second timeout.</p>
            <h4>What was built</h4>
            <ul>
                <li><strong>AWS Lambda:</strong> container-based at 3008 MB, behind API Gateway, pay-per-request</li>
                <li><strong>Amazon EKS:</strong> managed node groups, two replicas, classic load balancer</li>
                <li><strong>FastAPI router:</strong> exponential-backoff retry to absorb Lambda cold starts, with Prometheus metrics</li>
                <li><strong>Streamlit dashboard:</strong> live side-by-side comparison plus a Llama-3 analysis pass over the run data</li>
            </ul>
            <h4>Outcomes</h4>
            <ul>
                <li>A two-hour manual deployment reduced to a 15-minute automated one</li>
                <li>Fully reproducible infrastructure via Terraform</li>
                <li>90%+ test coverage, and quantified cost cross-over points between the two architectures</li>
            </ul>
        `
    },
    {
        id: 'music-saas',
        title: 'Music Separation as a Service',
        desc: 'Async microservice pipeline on GKE that splits MP3s into four stems with Demucs, decoupled through a Redis queue.',
        year: '2025',
        badge: null,
        category: 'cloud',
        tech: ['GKE', 'Redis', 'Flask', 'Demucs', 'GCS'],
        links: [],
        details: `
            <h4>Overview</h4>
            <p>An asynchronous pipeline on Google Kubernetes Engine that separates audio into vocals, drums, bass, and other stems using Demucs.</p>
            <h4>Engineering notes</h4>
            <ul>
                <li><strong>Storage migration:</strong> MinIO to Google Cloud Storage, taking durability from ephemeral to 99.99%</li>
                <li><strong>Async processing:</strong> a Redis queue decouples the Flask API from the ML worker — API responses stay under 200ms while inference runs 2–5 minutes per song</li>
                <li><strong>Resource limits:</strong> 6Gi memory ceilings on Demucs pods eliminated eviction from memory spikes</li>
                <li><strong>Horizontal scaling:</strong> the worker pool scales on queue depth</li>
            </ul>
        `
    },
    {
        id: 'tool-calling-transformer',
        title: 'Tool-Calling Transformer from Scratch',
        desc: 'A decoder-only Transformer written entirely in NumPy — manual backprop, no autograd — trained to emit structured tool calls at 97–99.5% exact match.',
        year: '2026',
        badge: 'Writeup',
        category: 'featured ai',
        tech: ['NumPy', 'Transformers', 'Tool Calling'],
        links: [
            { href: 'blog-post.html?post=nlp-tool-calling-transformer', icon: 'fas fa-book-open', label: 'Read the writeup' }
        ],
        details: null
    },
    {
        id: 'audio-rag',
        title: 'Audio RAG Assistant',
        desc: 'Transcribes audio with Whisper and answers questions over the transcript through a retrieval-augmented pipeline.',
        year: '2024',
        badge: null,
        category: 'ai',
        tech: ['Whisper', 'RAG', 'LangChain'],
        links: [{ href: 'https://github.com/Nirajan17/Audio-RAG', icon: 'fab fa-github', label: 'GitHub' }],
        details: null
    },
    {
        id: 'digital-me',
        title: 'digitalME Personal Assistant',
        desc: 'A personal chatbot handling open conversation, document retrieval, and natural-language database queries.',
        year: '2024',
        badge: null,
        category: 'ai',
        tech: ['Python', 'NLP', 'RAG'],
        links: [{ href: 'https://github.com/Nirajan17/digitalME--Personal-Chatbot', icon: 'fab fa-github', label: 'GitHub' }],
        details: null
    },
    {
        id: 'pdf-chat',
        title: 'PDF Chat Assistant',
        desc: 'Upload a PDF and question it, backed by Mistral-7B-Instruct.',
        year: '2024',
        badge: null,
        category: 'ai',
        tech: ['Mistral-7B', 'RAG', 'Python'],
        links: [{ href: 'https://github.com/Nirajan17/PDF-Chat-Assistant', icon: 'fab fa-github', label: 'GitHub' }],
        details: null
    },
    {
        id: 'tour-rec',
        title: 'Tour Recommender — Pokhara',
        desc: 'Content-based recommendation over Pokhara destinations using description, genre, and keyword similarity.',
        year: '2023',
        badge: null,
        category: 'ai',
        tech: ['Python', 'Scikit-learn', 'NLP'],
        links: [{ href: 'https://github.com/Nirajan17/Tour-Recommender-Pokhara', icon: 'fab fa-github', label: 'GitHub' }],
        details: null
    }
];
