# TECH STACK

## Overview

I work across the full ML lifecycle: data engineering, model development, deployment, and monitoring. Below is the technical stack I'm comfortable with, organized by layer.

---

## Data & Warehousing

**Snowflake**
Data warehouse for structured, time-series data. Used for marketing analytics, ingestion of raw touchpoints, and transformation views. Understand table design, query optimization, and partitioning strategies.

**Databricks**
Unified platform for data engineering and ML. Used Spark SQL for large-scale transformations, PySpark for distributed ML training, and notebooks for exploratory work. Comfortable with Delta Lake for ACID transactions and data versioning.

**PostgreSQL**
Relational database for transactional data, model metadata, and application state. Used for real-time systems where Snowflake's batch latency is too high. Know indexing, query planning, connection pooling.

**DuckDB**
Lightweight in-process SQL engine. Useful for rapid exploration of Parquet files and CSVs without spinning up a database. Fast for OLAP queries on local data.

---

## Languages & Core Libraries

**Python**
Primary language for ML and data work. Use pandas for data manipulation, NumPy for numerical computing, scikit-learn for classical ML.

**SQL**
Daily tool for data extraction, transformation, and exploration. Comfortable with CTEs, window functions, and query optimization.

**Scala** (basics)
Used for Spark jobs requiring more performance than PySpark. Not my primary language, but functional programming concepts are useful.

**Bash / Bash Scripting**
For automation, orchestration, and DevOps tasks. Pipes, grep, awk for data wrangling on the command line.

---

## Machine Learning & Statistics

**Scikit-learn**
Standard library for classical ML: linear regression, logistic regression, decision trees, ensemble methods (random forests, gradient boosting). Know how to avoid pitfalls (data leakage, proper cross-validation, class imbalance handling).

**PyTorch**
Deep learning framework. Comfortable building custom models: neural networks, LSTMs, transformers. Prefer PyTorch over TensorFlow for research and custom architectures.

**Transformers (HuggingFace)**
Pre-trained models for NLP: BERT, GPT variants, sentence transformers. Fine-tuning, tokenization, and inference optimization.

**PyMC3 / PyMC** (Bayesian inference)
Probabilistic programming for Bayesian modeling. Used for marketing attribution (media mix modeling) where uncertainty quantification matters.

**Optuna**
Hyperparameter optimization via Bayesian search. More efficient than grid/random search, especially when tuning is expensive.

**XGBoost / LightGBM**
Gradient boosting libraries. Fast, memory-efficient, work well with tabular data. Use for baseline models and when simplicity/interpretability matters.

---

## MLOps & Deployment

**Metaflow**
Orchestration framework for ML workflows. Define DAGs (training, validation, deployment), track metadata, version inputs and outputs. Used for reproducible, scalable training pipelines.

**MLflow**
Model registry, experiment tracking, and versioning. Track hyperparameters, metrics, and model artifacts. Essential for production ML (rollback, A/B testing different model versions).

**Weights & Biases (W&B)**
Experiment tracking and visualization. Log metrics, visualize learning curves, compare runs. Better UX than MLflow for exploratory work.

**Docker**
Containerization for reproducibility and deployment. Package ML systems with dependencies and environment specifications. Know Docker basics: building images, running containers, networking.

**Kubernetes** (basics)
Orchestration of containerized services. Know pod/deployment concepts, scaling, and networking. Have deployed models on Kubernetes, but not a DevOps expert.

**Git / GitHub**
Version control for code. Use feature branches, pull requests, code review. Understand CI/CD concepts (though implementation varies).

**GitHub Actions / Cloud Build**
CI/CD pipelines for automated testing and deployment. Trigger on commit, run tests, build Docker images, push to registry.

---

## Data Processing & Feature Engineering

**Pandas**
Data manipulation and exploration. Know efficient operations (vectorization over loops), avoiding common pitfalls (inplace operations, copy-on-write), and memory management.

**PySpark**
Distributed data processing. Understand Spark SQL, DataFrame operations, partitioning, and shuffles. Know when to use Spark (100M+ rows) and when Pandas is enough.

**Polars** (emerging)
Faster alternative to Pandas with a more functional API. Not production-used yet, but keeping an eye on it.

**Featuretools**
Automated feature engineering from relational data. Know DFS (Deep Feature Synthesis) and entity relationships. Useful for quick baselines.

---

## NLP-Specific Tools

**Sentence-Transformers**
Semantic embeddings for text. Used for clustering, similarity search, and semantic understanding. Know fine-tuning and different pooling strategies.

**HDBSCAN**
Density-based clustering. Know when to use it over K-means (when clusters have different densities). Parameter tuning (min_cluster_size, min_samples).

**UMAP**
Dimensionality reduction for visualization and feature preprocessing. Know it's not a simple projection; it preserves both local and global structure.

**spaCy**
NLP library for tokenization, NER, dependency parsing. Production-friendly with good performance.

**NLTK**
Classic NLP library. Less modern than spaCy, but useful for some tasks (lemmatization, POS tagging).

---

## Visualization & Reporting

**Matplotlib / Seaborn**
Static plots for exploratory analysis and paper-quality figures. Know the figure/axes API, customization, and common pitfalls (figure sizes, font scaling).

**Plotly**
Interactive plots for dashboards and reports. Useful for exploring high-dimensional data.

**Tableau**
Business intelligence and dashboard tool. Know how to build dashboards, define metrics, and optimize for stakeholder consumption (not too much information, clear hierarchy).

**Jupyter / JupyterLab**
Interactive notebooks for exploration and documentation. Know how to write clear, reproducible notebooks (not 1000-line monsters).

---

## Infrastructure & DevOps

**AWS**
Cloud platform. Comfortable with EC2, S3, RDS, Lambda. Know basics of networking, IAM, and cost optimization.

**GCP**
Alternative cloud platform. Similar concepts to AWS but different naming/API. Know BigQuery for data warehousing.

**Ray** (emerging)
Distributed computing framework. Know basics of ray.remote, ray.tune for distributed hyperparameter tuning.

**Airflow**
Workflow orchestration alternative to Metaflow. More complex but more flexible for complex DAGs.

---

## What I Don't Use (But Understand)

**TensorFlow / Keras**
Functional for production systems at Google scale, but I find PyTorch more intuitive for custom work. Understand the concepts, not fluent in the API.

**Apache Spark Streaming**
Know the concept (micro-batches vs. true streaming), but haven't done production work. For high-frequency predictions, I'd use a queue (Kafka) + stateless service.

**Kafka / Event Streaming**
Understand the architecture and use cases (data pipelines, real-time systems). Haven't built production Kafka systems; I've mostly consumed them.

**Kubernetes** (advanced)
Haven't deployed complex, multi-service systems on Kubernetes. Know enough to be dangerous, not an expert.

---

## By Problem Type

**Marketing Attribution & Causal Inference**
Snowflake → Databricks (PySpark) → Metaflow (orchestration) → PyMC3 (Bayesian MMM) + PyTorch (neural network models) → MLflow (registry) → Tableau (reporting)

**NLP & Text Understanding**
Transformers (HuggingFace) + PyTorch → Optuna (hyperparameter tuning) → MLflow (versioning) → Weights & Biases (tracking) → Production inference on small models

**Time Series & Forecasting**
Pandas + Numpy → Scikit-learn / XGBoost (baselines) → PyTorch (if complex) → Metaflow (training pipeline) → DuckDB (local evaluation)

**Data Engineering & Feature Pipelines**
SQL (data definition) → Spark (distributed processing) → Metaflow (orchestration) → PostgreSQL (feature store) → Monitoring & alerting

**Unsupervised Learning & Clustering**
Embeddings (Sentence-Transformers, PCA) → Clustering (HDBSCAN, K-means) → Evaluation (silhouette, stability) → UMAP (visualization)

---

## Learning & Continuous Improvement

I stay current with:
- ArXiv papers (select NLP and causal inference papers)
- GitHub (tracking popular repos in ML ops, MLOps, causal inference)
- Conferences (NeurIPS, ICML abstracts, but mostly for direction, not implementation)

I don't chase every new framework. I optimize for:
1. **Stability** (well-maintained, community backing)
2. **Interpretability** (can I debug and understand failures?)
3. **Production-readiness** (not academic, can run at scale)
4. **Simplicity** (fewer dependencies, smaller learning curve)

---

## Philosophy

This stack is intentionally broad but not deep in every dimension. I'm deep in ML and data engineering because that's where I spend 70% of my time. I'm shallow in Kubernetes and DevOps because I collaborate with specialists there.

The right tool depends on the problem. I don't dogmatically use PyTorch if scikit-learn solves it faster. I don't build in Scala if Python is faster to iterate. I don't use Kubernetes if a simpler deployment model works.

This flexibility is a feature, not a weakness. Real problems don't fit neatly into one technology stack. Being adaptable matters more than being expert in every tool.
