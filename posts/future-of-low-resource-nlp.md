---
title: The Future of Low-Resource NLP
date: October 22, 2025
tags: [NLP, Research, AI]
excerpt: Exploring techniques for preserving and processing underrepresented languages using modern AI architectures and cross-lingual transfer learning.
---

Over 7,000 languages are spoken on Earth. Fewer than 100 have meaningful NLP support. The gap between a language like English — with terabytes of training data, mature tooling, and decades of research — and a language like Nepali, Maithili, or Limbu is staggering. This is both a technical problem and a cultural one.

## Why Low-Resource NLP Is Hard

The core challenge is data scarcity. Modern LLMs are data-hungry. GPT-3 trained on ~570GB of text. A low-resource language might have a few hundred megabytes of digitized text — and much of it is noisy, domain-narrow, or inconsistently tokenized.

This creates compounding problems:

1. **Tokenization mismatch** — Most multilingual tokenizers (mBERT, XLM-R) over-segment low-resource language text. A Nepali word that should be 1 token might become 6–8 subword pieces, diluting the model's representational capacity.

2. **Transfer interference** — High-resource languages dominate multilingual models. The model learns to weight English patterns so heavily that low-resource language representations are pushed into suboptimal regions of the embedding space.

3. **Evaluation blindspots** — We lack standardized benchmarks for most low-resource languages. Without good evaluation, we can't measure progress.

## What's Actually Working

### Cross-Lingual Transfer

The most practical approach today: pretrain on a high-resource language, then fine-tune on a low-resource one. XLM-RoBERTa does this surprisingly well — it covers 100 languages and shows strong zero-shot transfer even for languages with minimal pretraining data.

The key insight from recent research: **linguistic proximity matters**. Transfer works best when source and target languages share typological features — script, morphology, word order. Hindi → Nepali transfers cleanly. English → Nepali transfers less so.

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Start with a multilingual model
model = AutoModelForSequenceClassification.from_pretrained("xlm-roberta-base")
tokenizer = AutoTokenizer.from_pretrained("xlm-roberta-base")

# Fine-tune on your low-resource language data
# Even 1,000–5,000 labeled examples can work well
trainer = Trainer(
    model=model,
    train_dataset=nepali_train,
    eval_dataset=nepali_val,
    ...
)
```

### Language-Adaptive Fine-Tuning (LAFT)

Rather than fine-tuning directly on the downstream task, LAFT inserts an intermediate step: continue pretraining the multilingual model on monolingual data in the target language before task fine-tuning.

With as few as 1M tokens of target language text, LAFT consistently improves downstream performance by 3–8 F1 points. The intuition: the intermediate step shifts the model's internal representations toward the target language's patterns before you ask it to perform a specific task.

### Translate-Train

A pragmatic baseline that's easy to underestimate: translate your labeled training data from a high-resource language using a general-purpose translation model, then train on the translated data.

For many tasks and language pairs, translate-train with mBART-50 or NLLB-200 beats direct cross-lingual transfer — especially when the translation quality is high. It's not elegant, but it works.

## The Nepali Image Captioning Case

In [my research on Nepali image captioning](https://doi.org/10.36548/jscp.2024.1.006), we faced exactly this stack of problems. Nepali has ~45M speakers but minuscule NLP infrastructure compared to its size.

Our approach:
- Inception V3 for visual feature extraction (pretrained on ImageNet)
- Transformer decoder fine-tuned on Nepali captions
- Custom tokenizer trained on Nepali text corpus to address subword fragmentation

The biggest gain came from building a Nepali-specific tokenizer rather than relying on generic multilingual tokenization. Proper tokenization reduced sequence lengths by 35–40%, which directly improved training efficiency and model quality.

## What LLMs Change (and Don't Change)

The rise of instruction-tuned LLMs like Llama, Mistral, and GPT-4 adds a new option: few-shot prompting in the target language. For some tasks (translation, summarization, basic classification), GPT-4 with 5–10 few-shot examples in Nepali outperforms fine-tuned small models.

But this approach has hard limits:
- It only works for languages in the LLM's pretraining data (Nepali is marginal; many languages are absent entirely)
- API costs make it infeasible at scale
- You're dependent on a closed, proprietary system that can change or disappear

**The fundamental problem remains**: LLMs are trained on internet data, and the internet massively overrepresents a handful of languages. Until that data imbalance changes, LLMs will remain poor tools for truly low-resource languages.

## The Cultural Stakes

This is the part that keeps me thinking beyond benchmarks.

Language is culture. When a language loses its digital presence — when speakers can't use it to navigate apps, search the web, or interact with AI — it accelerates the shift to dominant languages. The technology that was supposed to connect the world ends up homogenizing it.

The question I raised in my about section — *"Will humans be able to preserve their culture and language in AI models that persist longer than humans themselves?"* — isn't rhetorical. If we don't build the infrastructure to represent low-resource languages in AI systems now, we may lose the chance. Language shift is faster than we think.

## What Needs to Happen

1. **Better data collection infrastructure** — systematic, community-led collection of digitized text in low-resource languages
2. **Specialized tokenizers** — language-specific tokenizers trained on native text, not adapted from multilingual models
3. **Evaluation benchmarks** — standardized tasks with human-annotated data to measure real progress
4. **Community-driven models** — following the model of [Masakhane](https://www.masakhane.io/) for African languages, applied more broadly

The technical tools exist. What's missing is the prioritization and investment to apply them at scale to the languages that need it most.
