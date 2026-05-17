---
title: Serverless vs. Kubernetes for ML Inference
date: November 15, 2025
tags: [DevOps, AWS, Kubernetes]
excerpt: A comparative analysis of deploying machine learning models on AWS Lambda versus Amazon EKS. Which architecture suits your inference needs better?
---

When you need to deploy an ML model to production, the infrastructure choice shapes everything downstream: cold start behavior, cost profile, scaling limits, and operational complexity. I spent several weeks running real benchmarks on this — here's what actually matters.

## The Setup

I deployed **DistilBERT** (67M parameters, ~250MB disk) on two architectures:

- **AWS Lambda** — container-based, 3008 MB RAM, API Gateway frontend
- **Amazon EKS** — managed node groups, 2-replica deployment, Classic Load Balancer

Both served identical FastAPI inference endpoints. Load testing used Locust simulating realistic traffic patterns.

> The first unexpected finding: DistilBERT's model load time (~60 seconds) exceeds API Gateway's 29-second hard timeout. This forced an architectural change — Lambda needs to warm the model asynchronously before the first real request.

## Cold Start: The Silent Killer

Cold starts are the most misunderstood aspect of serverless ML.

For Lambda with a container image:

```
Container pull:     8–15s
Python runtime:     2–3s
Model load:         55–65s
First inference:    200–400ms
───────────────────────────
Total cold start:   ~75–85s
```

For EKS (pod already running):

```
First inference:    180–350ms
```

The numbers look damning for Lambda. But here's the nuance: **cold starts only hit users if you have no warming strategy**. A simple CloudWatch Events trigger hitting Lambda every 5 minutes costs ~$0.60/month and effectively eliminates cold starts for steady-state traffic.

## Latency Under Load

At 10 concurrent users:

| Percentile | Lambda | EKS |
|------------|--------|-----|
| P50 | 220ms | 195ms |
| P95 | 380ms | 290ms |
| P99 | 890ms | 410ms |

At 100 concurrent users:

| Percentile | Lambda | EKS |
|------------|--------|-----|
| P50 | 310ms | 210ms |
| P95 | 1,240ms | 380ms |
| P99 | 3,800ms | 620ms |

Lambda's P99 blowout at 100 concurrent users is explained by queuing — when requests exceed provisioned concurrency, Lambda provisions new instances, and some requests hit cold starts.

## Cost Analysis

This is where the comparison gets interesting.

**Lambda cost model** (pay-per-request):
- 3008 MB × 400ms avg = 1,203 GB-seconds
- At $0.0000166667/GB-second = $0.00002 per request
- At 1M requests/month: ~$20 + $3.50 API Gateway = **~$23.50/month**

**EKS cost model** (pay-per-hour):
- 2× m5.large nodes = $0.192/hr = $140/month
- EKS cluster fee: $72/month
- Load balancer: $18/month
- **~$230/month regardless of traffic**

The crossover point is roughly **10M requests/month**. Below that threshold, Lambda is almost always cheaper. Above it, EKS wins on unit economics — and the gap widens fast.

## Operational Complexity

Lambda wins on ops burden — no cluster management, no pod autoscaling configuration, no node draining. But EKS offers capabilities Lambda can't match:

- **GPU access** — Lambda doesn't support GPU instances
- **Model sizes > 10GB** — Lambda's container limit is 10GB
- **Persistent connections** — streaming, WebSockets, long-running inference
- **Multi-model serving** — share GPU/CPU across models on a single instance

## When to Use What

**Choose Lambda when:**
- Traffic is spiky or unpredictable
- Model fits in 10GB and doesn't need GPU
- Team wants minimal ops overhead
- Cost at low traffic volume matters

**Choose EKS when:**
- Traffic is steady and predictable (> 10M requests/month)
- Model requires GPU acceleration
- You need fine-grained resource control
- Multi-model serving is required

## The AI-Powered SRE Layer

One piece of the project I found unexpectedly useful: a Streamlit dashboard that runs **Groq/Llama 3** to analyze benchmark results and surface recommendations automatically.

Instead of staring at Prometheus graphs, the LLM synthesizes patterns across latency, cost, and error rate metrics into actionable text. It's a simple pattern — feed structured JSON metrics into the prompt, get natural language analysis back — but it dramatically accelerated the interpretation phase.

## Takeaway

There's no universal winner. Lambda is the right default for unpredictable workloads with small-to-medium models. EKS earns its complexity premium when you need GPUs, very large models, or the unit economics flip at high volume.

The most expensive mistake is choosing EKS prematurely — you're paying $230+/month from day one, before you know if your model is even worth running.

Start serverless. Migrate when you have a concrete reason.
