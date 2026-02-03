import Container from "@/components/layout/Container";

export const metadata = {
  title: "About | Maxence Le Gendre",
  description: "Philosophy on applied ML, decision-making, and production systems.",
};

export default function AboutPage() {
  return (
    <Container>
      <article className="py-16 max-w-2xl">
        <h1 className="text-5xl font-bold mb-8">About</h1>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Professional Narrative</h2>
          <p>
            I'm an applied data scientist and machine learning engineer. That
            means I care about one thing: building ML systems that move business
            metrics, not vanity metrics.
          </p>
          <p>
            I've shipped attribution models at Ubisoft that optimized marketing
            spend. I've built NLP systems that extract structure from medical
            text. I've clustered customer feedback to surface insights. And I've
            founded a SaaS company, failed, and learned from it.
          </p>
          <p>
            But I'm not a researcher. I'm not writing papers. I'm building
            systems that work in production, at scale, with real
            constraints—limited data, latency budgets, cost pressure, and
            imperfect ground truth.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">How I Think About Applied ML</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">
              Decision-Oriented, Not Metric-Focused
            </h3>
            <p>
              The worst mistake in ML is optimizing the wrong objective. I start
              every project by asking: What decision does this model enable? Who
              makes it? What information do they need? If the answer is "improve
              F1 score," we've missed something.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Systems Thinking Over Algorithm Chasing</h3>
            <p>
              I've seen teams spend 3 months tuning hyperparameters to eke out
              2% accuracy improvement, while the real bottleneck is data quality
              or inference latency. Applied ML is mostly engineering: data
              pipelines, model versioning, infrastructure, and feedback loops.
              The algorithm matters. But it's 20% of the problem.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">End-to-End Ownership</h3>
            <p>
              I own the full stack: problem definition, data engineering,
              modeling, deployment, and monitoring. This means I understand
              constraints at every layer and can fix problems across boundaries.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Trade-offs, Always</h3>
            <p>
              Perfect models don't exist. Every decision trades off something.
              My job is to make those trade-offs explicit and defensible, not
              hide them in a notebook.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">What Problems Excite Me</h2>
          <ul>
            <li className="mb-3">
              <strong>Causal Inference:</strong> How do we measure what causes
              something, not just what correlates with it?
            </li>
            <li className="mb-3">
              <strong>Production ML at Scale:</strong> Building systems that
              serve millions of requests daily with 99.9% uptime.
            </li>
            <li className="mb-3">
              <strong>Data Quality:</strong> The bottleneck in ML is often the
              data, not the algorithm.
            </li>
            <li className="mb-3">
              <strong>Interpretability:</strong> Models you can explain are
              models you can trust.
            </li>
            <li className="mb-3">
              <strong>Cold-Start Problems:</strong> Getting good results with
              limited labeled data.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Languages & Tools</h3>
              <p className="text-slate-600">
                Python, SQL, Scala, Bash. Pandas, NumPy, Scikit-learn, PyTorch.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">ML & Data</h3>
              <p className="text-slate-600">
                Supervised learning, unsupervised learning, causal inference,
                NLP, time series.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Infrastructure</h3>
              <p className="text-slate-600">
                Metaflow, MLflow, Databricks, Snowflake, Docker, Kubernetes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Domain Expertise</h3>
              <p className="text-slate-600">
                Marketing attribution, NLP, causal measurement, product-focused
                ML.
              </p>
            </div>
          </div>
        </section>
      </article>
    </Container>
  );
}
