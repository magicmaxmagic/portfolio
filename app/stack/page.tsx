import Container from "@/components/layout/Container";

export const metadata = {
  title: "Tech Stack | Maxence Le Gendre",
  description: "How I build and operate production ML systems.",
};

export default function TechStackPage() {
  return (
    <Container>
      <article className="py-16 max-w-3xl">
        <h1 className="text-5xl font-bold mb-4">How I Build ML Systems</h1>
        <p className="text-lg text-[color:var(--text-secondary)] mb-12 leading-relaxed">
          Tools are means, not goals. Every framework here exists to solve a specific problem in production:
          moving data reliably, training models efficiently, and making decisions at scale. The value is in how they work together.
        </p>

        {/* Data & Storage Layer */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[color:var(--accent-blue)] mb-2">Data & Storage Layer</h2>
            <p className="text-sm text-[color:var(--text-secondary)]">Foundation: ingest, store, and query data at scale</p>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">Snowflake</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Analytical warehouse for attribution models, MMM pipelines, and time-series aggregations
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">Databricks</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Distributed compute using Apache Spark for large-scale data transformation and model training
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">PostgreSQL</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Relational database for transactional data, feature stores, and model metadata
              </p>
            </div>
          </div>
        </section>

        {/* Processing & Compute */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[color:var(--accent-blue)] mb-2">Processing & Compute</h2>
            <p className="text-sm text-[color:var(--text-secondary)]">Pipeline execution: orchestrate workflows and manage dependencies</p>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">Metaflow</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Workflow orchestration for reproducible DAGs, versioning, and tracking lineage
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">Docker & Kubernetes</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Containerization for environment consistency and distributed orchestration across clusters
              </p>
            </div>
          </div>
        </section>

        {/* Modeling & Experimentation */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[color:var(--accent-blue)] mb-2">Modeling & Experimentation</h2>
            <p className="text-sm text-[color:var(--text-secondary)]">Training: experiment, evaluate, and iterate on models</p>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">PyTorch</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Deep learning framework for neural networks, LSTMs, and transformers with custom training loops
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">Scikit-learn</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Classical ML: linear models, trees, ensembles, and baselines for comparison
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">HuggingFace Transformers</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Pre-trained NLP: fine-tuning BERT, GPT variants for domain-specific tasks
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">Optuna</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Hyperparameter optimization with Bayesian search, early stopping, and pruning
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">PyMC3</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Probabilistic modeling for Bayesian inference and uncertainty quantification
              </p>
            </div>
          </div>
        </section>

        {/* Experiment Tracking & MLOps */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[color:var(--accent-blue)] mb-2">Experiment Tracking & MLOps</h2>
            <p className="text-sm text-[color:var(--text-secondary)]">Control: manage models, reproducibility, and controlled releases</p>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">MLflow</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Model registry, versioning, and deployment lifecycle from training to production
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">Weights & Biases</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Experiment tracking and comparison across runs, hyperparameters, and metrics
              </p>
            </div>
          </div>
        </section>

        {/* Analysis & Embeddings */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[color:var(--accent-blue)] mb-2">Analysis & Embeddings</h2>
            <p className="text-sm text-[color:var(--text-secondary)]">Understanding: extract meaning from text and high-dimensional data</p>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">Sentence-Transformers</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Semantic embeddings for similarity search, clustering, and retrieval
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">HDBSCAN</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Density-based clustering to discover variable-density patterns in embeddings
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[color:var(--text-primary)]">UMAP</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mt-1">
                Dimensionality reduction that preserves structure for visualization and analysis
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy & Closing */}
        <section className="mt-20 pt-12 border-t border-[color:var(--border-color)]">
          <h2 className="text-xl font-bold text-[color:var(--text-primary)] mb-4">On Tool Selection</h2>
          <p className="text-[color:var(--text-secondary)] mb-4 leading-relaxed">
            This stack reflects three principles: <span className="font-semibold text-[color:var(--text-primary)]">stability</span> (well-maintained, community backing), 
            <span className="font-semibold text-[color:var(--text-primary)]">debuggability</span> (can I understand failures?), and 
            <span className="font-semibold text-[color:var(--text-primary)]">production-readiness</span> (proven at scale, not academic novelty).
          </p>
          <p className="text-[color:var(--text-secondary)] leading-relaxed">
            The tools matter less than how they fit together. The goal is building systems where data flows reliably, 
            decisions are auditable, and performance is measurable—even under constraints.
          </p>
          <p className="text-[color:var(--text-secondary)] mt-6 text-sm">
            This technical foundation supports the projects and timeline documented elsewhere. 
            Each tool was chosen because it solved a real problem, not because it was trendy.
          </p>
        </section>
      </article>
    </Container>
  );
}
