import Container from "@/components/layout/Container";

export const metadata = {
  title: "Tech Stack | Maxence Le Gendre",
  description: "Tools and frameworks I use for applied ML systems.",
};

export default function TechStackPage() {
  return (
    <Container>
      <article className="py-16 max-w-2xl">
        <h1 className="text-5xl font-bold mb-8">Tech Stack</h1>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Data & Warehousing</h2>
          <div className="mb-6">
            <h3 className="font-semibold">Snowflake</h3>
            <p className="text-slate-600">
              Cloud data warehouse for structured, time-series data and marketing analytics pipelines.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">Databricks</h3>
            <p className="text-slate-600">
              Unified platform for distributed data engineering and ML training using Apache Spark.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">PostgreSQL</h3>
            <p className="text-slate-600">
              Relational database for transactional data, model metadata, and application state.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Machine Learning & Science</h2>
          <div className="mb-6">
            <h3 className="font-semibold">Scikit-learn</h3>
            <p className="text-slate-600">
              Classical ML for linear models, decision trees, ensemble methods, and baseline models.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">PyTorch</h3>
            <p className="text-slate-600">
              Deep learning framework for training and evaluation of neural networks, LSTMs, and transformers.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">HuggingFace Transformers</h3>
            <p className="text-slate-600">
              Pre-trained NLP models for fine-tuning BERT, GPT variants, and sentence transformers.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">PyMC3</h3>
            <p className="text-slate-600">
              Bayesian inference for probabilistic modeling and uncertainty quantification.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">Optuna</h3>
            <p className="text-slate-600">
              Hyperparameter optimization using Bayesian search and pruning strategies.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">MLOps & Production</h2>
          <div className="mb-6">
            <h3 className="font-semibold">Metaflow</h3>
            <p className="text-slate-600">
              Workflow orchestration for defining DAGs and versioning ML pipelines.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">MLflow</h3>
            <p className="text-slate-600">
              Model registry, experiment tracking, versioning, and deployment management.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">Weights & Biases</h3>
            <p className="text-slate-600">
              Experiment tracking and visualization for comparing ML runs and hyperparameter experiments.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">Docker & Kubernetes</h3>
            <p className="text-slate-600">
              Containerization for reproducibility and orchestration at scale.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">NLP & Text</h2>
          <div className="mb-6">
            <h3 className="font-semibold">Sentence-Transformers</h3>
            <p className="text-slate-600">
              Semantic text embeddings for similarity search and clustering tasks.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">HDBSCAN</h3>
            <p className="text-slate-600">
              Density-based clustering for discovering variable-density patterns in text.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">UMAP</h3>
            <p className="text-slate-600">
              Dimensionality reduction for high-dimensional visualization and embedding analysis.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Philosophy</h2>
          <p>
            This stack prioritizes: stability (well-maintained, community
            backing), interpretability (can I debug failures?), and
            production-readiness (not academic). I don't chase every new
            framework. The right tool depends on the problem.
          </p>
        </section>
      </article>
    </Container>
  );
}
