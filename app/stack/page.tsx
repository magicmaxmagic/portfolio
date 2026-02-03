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
              Data warehouse for structured, time-series data. Used for
              marketing analytics, ingestion of raw touchpoints, and
              transformation views.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">Databricks</h3>
            <p className="text-slate-600">
              Unified platform for data engineering and ML. Used for Spark SQL
              transformations, PySpark distributed ML training, and exploration.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">PostgreSQL</h3>
            <p className="text-slate-600">
              Relational database for transactional data, model metadata, and
              application state. Know indexing, query planning, and connection
              pooling.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Machine Learning & Science</h2>
          <div className="mb-6">
            <h3 className="font-semibold">Scikit-learn</h3>
            <p className="text-slate-600">
              Standard library for classical ML. Linear models, decision trees,
              ensemble methods. Go-to for baseline models and when simplicity
              matters.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">PyTorch</h3>
            <p className="text-slate-600">
              Deep learning framework. Build custom models: neural networks,
              LSTMs, transformers. Preferred over TensorFlow for research and
              custom architectures.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">HuggingFace Transformers</h3>
            <p className="text-slate-600">
              Pre-trained models for NLP. BERT, GPT variants, sentence
              transformers. Fine-tuning and inference optimization.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">PyMC3</h3>
            <p className="text-slate-600">
              Bayesian inference for probabilistic modeling. Used for marketing
              attribution where uncertainty quantification matters.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">Optuna</h3>
            <p className="text-slate-600">
              Hyperparameter optimization via Bayesian search. More efficient
              than grid/random search, especially when tuning is expensive.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">MLOps & Production</h2>
          <div className="mb-6">
            <h3 className="font-semibold">Metaflow</h3>
            <p className="text-slate-600">
              Orchestration for ML workflows. Define DAGs, track metadata,
              version inputs and outputs. Used for reproducible training
              pipelines.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">MLflow</h3>
            <p className="text-slate-600">
              Model registry and experiment tracking. Version models, track
              metrics, enable A/B testing and rollback.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">Weights & Biases</h3>
            <p className="text-slate-600">
              Experiment tracking with better UX than MLflow. Log metrics,
              visualize curves, compare runs efficiently.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">Docker & Kubernetes</h3>
            <p className="text-slate-600">
              Containerization for reproducibility. Know Docker basics: building
              images, networking. Kubernetes for orchestration at scale.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">NLP & Text</h2>
          <div className="mb-6">
            <h3 className="font-semibold">Sentence-Transformers</h3>
            <p className="text-slate-600">
              Semantic embeddings for text. Know fine-tuning, pooling
              strategies, and different model sizes.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">HDBSCAN</h3>
            <p className="text-slate-600">
              Density-based clustering. Know when to use it over K-means
              (variable-density clusters).
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold">UMAP</h3>
            <p className="text-slate-600">
              Dimensionality reduction for visualization. Preserves local and
              global structure better than PCA/t-SNE.
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
