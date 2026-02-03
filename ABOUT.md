# ABOUT PAGE

## Professional Narrative

I'm an applied data scientist and machine learning engineer. That means I care about one thing: building ML systems that move business metrics, not vanity metrics.

I've shipped attribution models at Ubisoft that optimized marketing spend. I've built NLP systems that extract structure from medical text. I've clustered customer feedback to surface insights. And I've founded a SaaS company, failed, and learned from it.

But I'm not a researcher. I'm not writing papers. I'm building systems that work in production, at scale, with real constraints—limited data, latency budgets, cost pressure, and imperfect ground truth.

---

## How I Think About Applied ML

**Decision-Oriented, Not Metric-Focused**

The worst mistake in ML is optimizing the wrong objective. I start every project by asking: What decision does this model enable? Who makes it? What information do they need?

If the answer is "improve F1 score," we've missed something. The right answer is "allocate budget to high-ROI channels," or "alert engineers to critical vulnerabilities," or "help doctors diagnose faster."

The model is a means, not the end.

**Systems Thinking Over Algorithm Chasing**

I've seen teams spend 3 months tuning hyperparameters to eke out 2% accuracy improvement, while the real bottleneck is data quality or inference latency. That's upside-down priorities.

Applied ML is mostly engineering:
- Data pipelines (clean, transform, validate)
- Model versioning (reproducible, auditable)
- Infrastructure (monitoring, rollback, scale)
- Feedback loops (how do we know the model works in production?)

The algorithm matters. But it's 20% of the problem.

**End-to-End Ownership**

I don't hand off models to another team. I own the full stack:
- Problem definition (what are we actually solving?)
- Data collection and engineering
- Modeling and validation
- Deployment and monitoring
- Feedback and iteration

This means I understand the constraints at every layer. I know why the model underperforms in production (usually: distribution shift). I can fix it (retrain, add data, recalibrate).

**Trade-offs, Always**

Perfect models don't exist. Every decision trades off something:
- More complex models → higher accuracy, harder to debug, slower to retrain
- More training data → better performance, slower labeling, higher cost
- Higher precision → fewer false positives, more false negatives
- Real-time predictions → higher latency, higher compute cost

My job is to make those trade-offs explicit and defensible. Not hide them in a notebook.

---

## What Problems Excite Me

**1. Causal Inference Problems**

How do we measure what *causes* something, not just what correlates with it? Attribution, A/B testing, counterfactual analysis—these keep me up. They're hard because causality is hard. Real data is observational, not experimental. We have to be creative.

**2. Production ML at Scale**

It's one thing to train a model on a dataset. It's another to serve it to 1 million requests/day, monitor it for drift, retrain it weekly, version it, and maintain 99.9% uptime. That's a different skill set. I enjoy thinking about that infrastructure.

**3. Data Quality & Lineage Problems**

The bottleneck in ML isn't always the algorithm. It's the data. Where did it come from? Is it clean? Is it representative? How do we monitor for distribution shift? These unglamorous problems are critical.

**4. Interpretability & Explainability**

A model that works but you can't explain is a liability, especially in high-stakes domains (healthcare, finance). I like building systems where we can point to a prediction and say: "Here's why the model decided that."

**5. Cold-Start & Few-Shot Problems**

Most interesting real-world problems have limited labeled data. How do we get good results with 100 examples instead of 1 million? Transfer learning, meta-learning, data augmentation—I'm drawn to these constrained settings because that's where you have to think deeply.

---

## My Approach to Decision-Making

**Start with the question, not the method.**

Bad: "We have data. Let's use a neural network."
Good: "We need to understand which marketing channels are effective. What data do we have, and what inference approach matches our constraints?"

**Simplify first.**

Before building a complex model:
1. What's the naive baseline? (Last-click attribution, human labeling, trend extrapolation)
2. Can we beat the baseline with simple linear regression? Why or why not?
3. Only if simple approaches fail, add complexity.

This saves months of work and often reveals that the real problem isn't the model—it's the data or the problem definition.

**Quantify uncertainty.**

Point estimates are overconfident. I think in distributions:
- "The model achieves 0.74 F1" → incomplete
- "The model achieves 0.74 ± 0.03 F1, with 95% CI [0.71, 0.77]" → better
- "On rare entities, F1 is 0.52, but that's based on only 200 examples, so high variance" → honest

**Iterate with stakeholders, not alone.**

The smartest model is useless if nobody understands it or trusts it. I involve business stakeholders early:
- Show them the problem, ask what they need
- Show them the model, ask if it answers their question
- Show them the failure modes, ask if those are acceptable
- Iterate based on feedback

This takes longer than just shipping a model. But it's the only way to get adoption.

---

## On Failure & Learning

I failed at Prevent. The company had a real problem to solve, decent technology, and entrepreneurial drive. But we optimized for the wrong market, moved too slow on sales, and misjudged product-market fit.

That failure was the best learning I've had. I learned more in 9 months of building and failing than I would have in 3 years of optimizing metrics at a large company.

I think about failure pragmatically:
- Did we learn something? Yes. → Worth the cost.
- Could we have learned it faster with a smaller experiment? Maybe. → Note for next time.
- Do I regret it? No. → Paid tuition to understand entrepreneurship.

I apply that mindset to ML projects too. A model that fails in production (because of data drift, a wrong assumption, etc.) is an opportunity to understand the system better, not a disaster.

---

## Skills & Experience Summary

**Languages & Data Tools:**
- Python (primary), SQL, some Scala
- Pandas, NumPy, Scikit-learn, PyTorch
- Spark, Databricks, Snowflake, PostgreSQL

**ML & Statistics:**
- Supervised learning (regression, classification)
- Unsupervised learning (clustering, embeddings)
- Causal inference (matching, instrumental variables, Bayesian methods)
- Time series and forecasting
- NLP (transformers, embeddings, sequence models)
- Reinforcement learning (basics)

**MLOps & Production:**
- Model versioning: MLflow, ModelRegistry
- Experiment tracking: Weights & Biases, MLflow
- Orchestration: Metaflow, Airflow, DAGs
- CI/CD: Git, GitHub Actions, automated testing
- Infrastructure: Docker, Kubernetes (basics), AWS, GCP

**Domain Expertise:**
- Marketing attribution and media mix modeling
- NLP and text understanding
- Causal measurement and experimentation
- Early-stage product development

---

## What Excites Me Now

I'm looking for roles where:
1. **Impact is measurable.** A decision-focused metric, not a vanity metric.
2. **Systems matter.** Building end-to-end ML infrastructure, not just models.
3. **Scale is real.** Millions of predictions, lots of data, high stakes.
4. **Learning happens continuously.** New domains, new challenges, opportunities to think deeply.

I want to work with teams that care about the full ML stack, not just model performance. Where data engineering and MLOps are first-class citizens. Where we debate trade-offs and iterate based on real feedback, not opinions.

Big tech companies, fast-growing startups, or mission-driven organizations doing hard technical work—all appeal to me, depending on the specific problem.

---

## Closing Thought

ML is not magic. It's a tool. A powerful one, but still a tool.

The magic is in asking the right question, understanding your data, making trade-offs explicit, and shipping something that works. That's what I do. That's what excites me. That's what I want to keep building.
