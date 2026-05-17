/* =================================================================
   BLOG POSTS
   To add a new post:
     1. Create posts/<slug>.md with frontmatter (title, date, tags, excerpt)
     2. Add an entry below with the matching slug
================================================================= */
const blogPosts = [
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
