---
title: Optimizing LLM Inference Costs
date: December 8, 2025
tags: [AI, Cloud, LLM]
excerpt: Strategies for reducing API costs and latency when deploying Large Language Models in production environments. Learn how to balance performance and budget.
---

Production LLM deployments get expensive fast. Here's what I've learned building systems that balance performance and cost at scale.

## The Cost Problem

When you're hitting OpenAI or Anthropic APIs at scale, costs compound quickly. A single GPT-4o call might cost $0.0025 per 1k input tokens. At 100k daily requests averaging 2k tokens each, you're looking at $500/day before you've validated product-market fit.

The good news: most of that spending is waste, and the fixes are surprisingly straightforward.

## Strategy 1: Semantic Caching

The single highest-ROI optimization. Many LLM calls are near-identical — same prompt template, same context, slightly different phrasing. A semantic cache using embedding similarity can achieve 40–60%+ cache hit rates.

```python
from gptcache import cache
from gptcache.embedding import Onnx
from gptcache.manager import CacheBase, VectorBase, get_data_manager
from gptcache.similarity_evaluation.distance import SearchDistanceEvaluation

onnx = Onnx()
data_manager = get_data_manager(CacheBase("sqlite"), VectorBase("faiss", dimension=onnx.dimension))
cache.init(
    embedding_func=onnx.to_embeddings,
    data_manager=data_manager,
    similarity_evaluation=SearchDistanceEvaluation(),
)
```

In the [Tensor project](https://tensorchat.me/), a multi-layer Redis cache achieved a **60%+ cache hit rate**, cutting LLM API overhead by 70%. The trick was caching at two levels: exact-match for repeated queries and semantic-match for near-duplicates.

## Strategy 2: Model Cascading

Not every query needs GPT-4. Route simple queries to cheaper models and escalate only when needed.

```
User Query → Classifier → 
  if simple:   GPT-3.5-turbo  ($0.0005/1k tokens)
  if moderate: GPT-4o-mini    ($0.00015/1k tokens)
  if complex:  GPT-4o         ($0.0025/1k tokens)
```

A 2-tier cascade typically saves 60–80% with negligible quality degradation for the simple tier. The classifier itself is cheap — a small embedding model or even keyword heuristics gets you most of the way there.

## Strategy 3: Prompt Compression

Long context is expensive. Techniques that help:

- **LLMLingua** — token compression at 2–20× ratio with minimal semantic loss
- **Sentence-BERT summarization** — compress retrieved RAG chunks before injection
- **Structured outputs** — constrain response format to reduce output tokens (JSON mode vs. freeform)
- **Prefix caching** — reuse common system prompt prefixes across requests (Anthropic/OpenAI both support this)

Prefix caching deserves special attention. If your system prompt is 2k tokens and you're making 1M calls/day, that's 2B tokens of redundant input. Providers cache the prefix for a discount; make sure your system prompt is always at the start and doesn't change between calls.

## Strategy 4: Async Batching

If you have non-real-time workloads, batch API calls. OpenAI's Batch API runs at **50% of the synchronous cost** with a 24-hour SLA — perfect for:

- Offline evaluation pipelines
- Nightly report generation
- Data enrichment jobs
- Embedding large corpora

```python
from openai import OpenAI
client = OpenAI()

batch = client.batches.create(
    input_file_id=file_id,
    endpoint="/v1/chat/completions",
    completion_window="24h"
)
```

## Measuring What Matters

You can't optimize what you don't measure. Track these before touching anything:

| Metric | Tool |
|--------|------|
| Cost per request | LangSmith / Helicone |
| Cache hit rate | Redis `INFO stats` |
| P95 latency | Prometheus + Grafana |
| Token utilization | Provider dashboards |
| Model distribution | Custom logging |

## The Prioritization Matrix

Roughly, tackle these in order:

1. **Caching** — highest ROI, fastest to ship, no quality tradeoff
2. **Model routing** — 60–80% savings, requires a classifier
3. **Prompt compression** — 20–40% savings, higher engineering effort
4. **Batching** — 50% savings on async workloads, easy if they exist

## Takeaway

Start with caching. It's the fastest win with zero quality tradeoff. Then profile your model mix and find the cheapest model that meets your quality bar for each query type.

The goal isn't the cheapest possible inference — it's the best quality/cost ratio at your usage level. Define your acceptable latency and quality floor first, then optimize cost within those constraints.
