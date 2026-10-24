/* =================================================================
   BLOG POSTS
   To add a new post:
     1. Create posts/<slug>.md with frontmatter (title, date, tags, excerpt)
     2. Add an entry below with the matching slug
   A standalone page (e.g. an exported notebook) can set `href` instead.
================================================================= */
const blogPosts = [
    {
        slug:    "latent-visualization",
        href:    "posts/latent-visualization/",
        title:   "The Geometry of Refusal",
        date:    "October 23, 2026",
        excerpt: "A rotatable, multi-panel playground for how safety lives in a transformer's residual stream: one refusal direction, a separate harmfulness direction, and what the 3D picture hides. A follow-up to the Llama sphere.",
        tags:    ["Interpretability", "AI Safety", "Refusal", "Interactive"]
    },
    {
        slug:    "token-concept-visualization",
        href:    "posts/token-concept-visualization/",
        title:   "Do Llamas Think in English? A Sphere You Can Rotate",
        date:    "October 18, 2026",
        excerpt: "An interactive 3D take on Wendler et al. (ACL 2024): follow a Llama-2 hidden state from input space through an English-leaning concept space to the output language, and see why the logit lens reads English in the middle layers.",
        tags:    ["Interpretability", "Multilingual", "Logit Lens", "Interactive"]
    },
    {
        slug:    "transformer-block-neurons",
        href:    "posts/transformer-block-neurons/",
        title:   "One Transformer Block, Neuron by Neuron",
        date:    "October 4, 2026",
        excerpt: "A tiny real model (d = 8, 2 heads, 4 blocks) running on your sentence, drawn neuron by neuron. Every circle holds the number it actually computed; hover one to see the lines feeding it.",
        tags:    ["Interpretability", "Transformers", "Interactive"]
    },
    {
        slug:    "training-transformer-8-gpus",
        href:    "posts/training-transformer-8-gpus/",
        title:   "Training a Transformer on Eight GPUs, Then Serving It",
        date:    "September 26, 2026",
        excerpt: "A worked example you can click through: a 1.27B-parameter, Llama-shaped model trained on one 8-GPU node with tensor, pipeline and data parallelism, then taken through post-training and deployment.",
        tags:    ["Distributed Training", "Transformers", "Interactive"]
    },
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
