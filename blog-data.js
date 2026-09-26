/* =================================================================
   BLOG POSTS
   To add a new post:
     1. Create posts/<slug>.md with frontmatter (title, date, tags, excerpt)
     2. Add an entry below with the matching slug
   A standalone page (e.g. an exported notebook) can set `href` instead.
================================================================= */
const blogPosts = [
    {
        slug:    "transformer-residual-stream",
        href:    "posts/transformer-residual-stream/",
        title:   "A Transformer Block, One Matrix at a Time",
        date:    "September 26, 2026",
        excerpt: "An interactive walkthrough of a single transformer block from the residual stream's point of view: follow four tokens through LayerNorm, attention, the MLP and the unembedding, with every number computed live in your browser.",
        tags:    ["Interpretability", "Transformers", "Interactive"]
    },
    {
        slug:    "logit-lens-pytorch",
        href:    "posts/logit-lens/",
        title:   "The Logit Lens in PyTorch",
        date:    "September 25, 2026",
        excerpt: "A hands-on logit lens walkthrough on GPT-2 with PyTorch and TransformerLens: decode the residual stream after every layer, see why ln_final matters, and plot top-k and rank heatmaps.",
        tags:    ["Interpretability", "Logit Lens", "PyTorch", "TransformerLens"]
    },
    {
        slug:    "nlp-tool-calling-transformer",
        title:   "Tool-Calling Language Models from First Principles",
        date:    "May 18, 2026",
        excerpt: "We built a decoder-only Transformer entirely from scratch in NumPy and trained it to perform structured tool calling — achieving 97–99.5% exact-match accuracy while uncovering systematic failures invisible to standard metrics.",
        tags:    ["NLP", "Transformers", "Tool-Calling", "NumPy", "Deep Learning"]
    },
    {
        slug:    "optimizing-llm-inference-costs",
        title:   "Optimizing LLM Inference Costs",
        date:    "December 8, 2025",
        excerpt: "Strategies for reducing API costs and latency when deploying Large Language Models in production environments. Learn how to balance performance and budget.",
        tags:    ["AI", "Cloud", "LLM"]
    },
    {
        slug:    "serverless-vs-kubernetes-for-ml",
        title:   "Serverless vs. Kubernetes for ML Inference",
        date:    "November 15, 2025",
        excerpt: "A comparative analysis of deploying machine learning models on AWS Lambda versus Amazon EKS. Which architecture suits your inference needs better?",
        tags:    ["DevOps", "AWS", "Kubernetes"]
    },
    {
        slug:    "future-of-low-resource-nlp",
        title:   "The Future of Low-Resource NLP",
        date:    "October 22, 2025",
        excerpt: "Exploring techniques for preserving and processing underrepresented languages using modern AI architectures and cross-lingual transfer learning.",
        tags:    ["NLP", "Research", "AI"]
    }
];
