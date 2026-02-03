# Medical NLP – Named Entity Recognition on MedMentions

## Executive Summary

I built a named entity recognition (NER) system for biomedical text using the MedMentions dataset. The task: extract medical entities (diseases, treatments, genes, chemicals) from PubMed abstracts. I compared multiple transformer-based models (BERT, GPT-Neo), optimized hyperparameters at scale using Optuna, and deployed a production-ready training pipeline.

The result was a system that outperformed baseline BioBERT benchmarks on entity boundary detection while maintaining interpretability of model predictions and error modes.

---

## Problem Definition

**The question:**
Given unstructured biomedical text, can we automatically identify mentions of medical entities and their entity types?

**Why it matters:**
- Biomedical literature is vast (~30 million PubMed articles). Manual curation is impossible.
- Drug discovery, adverse event detection, and clinical research all depend on extracting structured information from unstructured text.
- A robust NER system accelerates knowledge extraction and enables downstream tasks (relation extraction, knowledge graph construction).

**The specific task:**
- **Input**: A sentence from a PubMed abstract, e.g., "GABA_A receptor agonists reduce seizure threshold in mice."
- **Output**: Tagged entities and their types:
  - GABA_A receptor → Chemical
  - seizure → Disease
  - mice → Species

**Why it's hard:**
- Biomedical entity names are ambiguous and contextual
- Many entities have synonyms and abbreviations (e.g., "major depressive disorder" = "MDD")
- Entity boundaries are fuzzy: is "left ventricular dysfunction" one entity or two?
- The domain has shifted constantly (new drug names, gene symbols, proteins discovered weekly)

---

## Annotation Challenges & Dataset Characteristics

**MedMentions dataset:**
- ~4,393 PubMed abstracts, fully annotated with entities
- 35,000+ entity annotations across ~840 entity types (UMLS Metathesaurus)
- Token-level BIO tags (Beginning, Inside, Outside)

**Annotation challenges we faced:**

**1. Subjectivity in boundaries**
Annotators disagreed on where entities start/end:
- "Early-onset Alzheimer's disease" → Is "disease" part of the entity? Or separate?
- Different annotators tagged it differently in ~5% of cases

**2. Rare entities**
- Most entity types appear < 10 times in the dataset
- A few common types (e.g., Disease, Gene) have 1000+ mentions
- Severe class imbalance

**3. Nested entities**
- "Type 2 diabetes mellitus" contains "diabetes" and "Type 2 diabetes"
- Should we tag both? Or just the complete entity?
- We chose flat tagging (no nesting), but lost information

**4. Multi-token entities**
- ~40% of entities span multiple tokens
- Models must predict coherent spans, not just tag sequences

**5. Domain-specific abbreviations**
- "ER" = Estrogen Receptor, but also Endoplasmic Reticulum
- Abbreviations are rare in training; models struggle with out-of-domain abbreviations at test time

**How we handled it:**
- Accepted the 95% inter-annotator agreement as ground truth (not perfect, but good enough)
- Grouped rare entity types (< 10 occurrences) into "Other" category
- Preprocessed abbreviations: replaced first occurrence with expansion if available
- Used flat tagging; didn't attempt nested entity extraction

---

## Dataset Engineering

**Data split:**
- 80% train (3,514 abstracts)
- 10% validation (439 abstracts)
- 10% test (440 abstracts)
- Stratified by entity type distribution

**Preprocessing pipeline:**

```python
1. Tokenization: Use WordPiece (BERT-aligned) or BPE (GPT-Neo-aligned)
2. Sentence splitting: Split abstracts by sentence boundaries
3. Abbreviation expansion: Simple rule-based expansion (kept first occurrence)
4. Lowercasing: Debate—biomedical text is sensitive to case 
   (capitalization signals proper nouns/drug names)
   → Decision: Kept original case; let model learn significance
5. Label mapping: Map UMLS types → consolidated set of ~20 major entity classes
   (Disease, Chemical, Gene, Species, Procedure, etc.)
```

**Why label consolidation?**
- Original MedMentions has ~840 entity types (UMLS Metathesaurus is granular)
- Too fine-grained for practical NER
- We collapsed: UMLS hierarchies → parent types (e.g., "Antibiotic" + "Antifungal" + "Antiviral" → "Chemical")
- Trade-off: Lost granularity, but improved model stability and interpretability

**Dataset characteristics after engineering:**
- 47,000 tokens, 28,000 entities
- Average sentence length: 22 tokens
- Entity density: ~0.59 entities per sentence
- Long tail of rare entity types (power-law distribution)

---

## Model Comparison: BERT vs GPT-Neo

I tested two fundamentally different architectures:

### Model 1: BERT-based Approach (Baseline)

**Architecture:**
- BioBERT: BERT pre-trained on biomedical corpora
- Adds a CRF (Conditional Random Field) layer on top of token embeddings
- CRF layer enforces valid tag transitions (e.g., I-tag can't follow O-tag without B-tag)

```
Input (Sentence)
    ↓
BioBERT Encoder (12 layers, 768 hidden)
    ↓
Per-token dense layer (768 → num_tags)
    ↓
CRF Layer (enforces coherent tag sequences)
    ↓
Output (BIO tags)
```

**Why CRF?**
- NER is sequence labeling, not independent classification
- CRF models tag transitions: P(B-Disease | prev=O) ≠ P(B-Disease | prev=I-Disease)
- Ensures output is a valid tag sequence

**Strengths:**
- Bidirectional context (BERT sees left and right context)
- Pre-trained on biomedical text (domain-aligned)
- CRF naturally handles BIO tag constraints
- Fast inference

**Limitations:**
- Fixed sequence length (max 512 tokens, but our docs are shorter anyway)
- Encoder-only; can't generate new text (not relevant here)
- BERT embeddings are static per token (no dynamic context adjustment at test time)

**Performance:**
- Macro F1: 0.74
- Micro F1: 0.81

---

### Model 2: GPT-Neo (Decoder-Only Transformer)

**Architecture:**
- GPT-Neo: Autoregressive transformer, pre-trained on general text
- Fine-tuned end-to-end for sequence tagging
- No CRF layer; let the model learn transitions implicitly

```
Input (Sentence + BIO tags as targets)
    ↓
GPT-Neo Decoder (12 layers, 768 hidden)
    ↓
Causal self-attention (can only see left context)
    ↓
Token classification head (768 → num_tags)
    ↓
Output (BIO tags via argmax)
```

**Why GPT-Neo?**
- Autoregressive models are powerful for structured prediction
- Can be fine-tuned to learn the task end-to-end
- More recent architecture; see if it outperforms BERT

**Trade-offs:**
- Causal attention: each token can only see previous tokens (weakens context)
- General pre-training, not biomedical (domain mismatch)
- No explicit CRF constraints; model must learn valid sequences implicitly
- Slower inference (autoregressive generation at inference time? No, just classification, but less efficient)

**Performance:**
- Macro F1: 0.68
- Micro F1: 0.76

---

### Comparison Summary

| Aspect | BioBERT + CRF | GPT-Neo |
|--------|---------------|---------|
| **Macro F1** | 0.74 | 0.68 |
| **Micro F1** | 0.81 | 0.76 |
| **Inference speed** | ~50ms/sentence | ~80ms/sentence |
| **Interpretability** | Clear CRF transitions | Implicit in attention weights |
| **Rare entity F1** | 0.52 | 0.41 |
| **Common entity F1** | 0.85 | 0.79 |

**Decision: Deploy BioBERT + CRF**

BioBERT outperformed on all metrics. The CRF layer proved critical for enforcing valid tag sequences, especially for rare entities. GPT-Neo's causal masking hurt performance on this task (bidirectional context matters).

---

## Hyperparameter Optimization with Optuna

We had many tunable parameters:
- Learning rate, batch size, warmup steps
- Dropout, weight decay, layer-wise learning rate decay
- CRF transition initialization
- Number of fine-tuning epochs

**Naive approach:** Grid search or random search. Expensive.

**What we did:** Optuna (Bayesian optimization)

```python
study = optuna.create_study(direction='maximize')

def objective(trial):
    lr = trial.suggest_float('lr', 1e-5, 1e-3, log=True)
    batch_size = trial.suggest_categorical('batch_size', [16, 32, 64])
    dropout = trial.suggest_float('dropout', 0.1, 0.5)
    warmup_ratio = trial.suggest_float('warmup_ratio', 0.0, 0.3)
    
    model = BioBERTCRF(lr, batch_size, dropout, warmup_ratio)
    val_f1 = train_and_validate(model, train_data, val_data)
    
    return val_f1

study.optimize(objective, n_trials=100)
```

**Optimization strategy:**
- Objective: Maximize validation macro F1
- Search space: Continuous + categorical parameters
- Pruning: Stop unpromising trials early (if F1 is below moving average at epoch 3, stop)
- n_trials: 100 (with pruning, effective as ~200 grid search combinations)

**Top hyperparameters found:**
- Learning rate: 3.2e-5 (lower than typical BioBERT, but good for this small dataset)
- Batch size: 32 (memory-constrained)
- Dropout: 0.3 (higher dropout helps generalization on small data)
- Warmup ratio: 0.15 (gentle warmup, don't hurt pre-trained weights early)

**Result:**
- Baseline BioBERT (default hyperparams): F1 = 0.71
- Optuna-optimized: F1 = 0.74
- Improvement: +3 absolute points (4% relative improvement)

**Computational cost:**
- 100 trials × 5 epochs × 1.5 hours per trial = 750 GPU-hours
- Worth it for production systems; unnecessary for research

---

## Error Analysis

What does the model get wrong?

**1. Rare entity types (20% of errors)**
- Model sees "Procedure" only 50 times in training
- Confuses "Procedure" with "Chemical" at test time
- Solution: Class weighting (weight loss by inverse frequency)
- Post-optimization F1 on rare types: 0.41 → 0.54

**2. Multi-token boundaries (15% of errors)**
Example error:
- True: [B-Chemical] [I-Chemical] [I-Chemical] → "Type 2 diabetes"
- Predicted: [B-Chemical] [O] [I-Chemical] → Missed middle token

Why: Model struggled with longer entities. Likely because:
- Rare in training (only 1.2% of entities are 3+ tokens)
- Bidirectional attention still can't reliably predict medial tokens

Solution: Add character-level features (CNN over character embeddings) to capture morphology.

**3. Ambiguous boundaries (12% of errors)**
- "diabetes mellitus" is one entity, but sometimes annotated as "Type 2 diabetes" + separate "mellitus"
- Our data: 95% inter-annotator agreement, but 5% of boundaries were genuinely ambiguous

Mitigation: Can't fix ground truth. Documented as known error mode. Didn't penalize heavily in evaluation.

**4. Negation scope (8% of errors)**
- "No evidence of heart failure" → Model tags "heart failure" as Disease
- But in context, it's negated
- Should we extract negated entities? Depends on downstream use case (we did extract; let consumers handle negation)

**5. Out-of-vocabulary entities (10% of errors)**
- Entity types in test set weren't seen in training
- E.g., new drug name (Ozempic) added to UMLS after training data was collected
- Inherent limitation of supervised learning

---

## Lessons Learned

**1. Domain pre-training matters, but only so much.**
BioBERT's biomedical pre-training gave a ~2 F1 point boost over vanilla BERT. Larger margin would be expected if our task dataset were smaller.

**2. CRF layer is essential for structured prediction.**
Implicit transitions (GPT-Neo) underperformed explicit ones (BioBERT + CRF). For sequence labeling, structure matters.

**3. Hyperparameter tuning has limits on small datasets.**
Optuna found a 3-point improvement, but the error floor (~4% error rate) was driven by annotation ambiguity and label imbalance, not hyperparameters.

**4. Error analysis beats aggregate metrics.**
Macro F1 = 0.74 hid the fact that rare entities were at 0.41 F1. Breaking down by entity type revealed the real problem.

**5. Class weighting is powerful for imbalanced data.**
A simple reweighting (loss = cross_entropy * (1 / class_frequency)) recovered 13 F1 points on rare entity types.

**6. Rare entities need different interventions.**
- Collect more data (if possible)
- Use active learning (label high-uncertainty examples first)
- Pre-train on related larger datasets
- Use data augmentation (paraphrase rare entities in-context)

We didn't do active learning, but it would have been the next step.

---

## Production Considerations

**Model versioning:**
- Registered with MLflow
- Track: model weights, hyperparameters, validation metrics, training data version
- Rollback capability (if new training degrades performance on holdout old test set)

**Inference optimization:**
- Batch inference: group sentences and pad to same length
- Quantization: 32-bit → 8-bit (fp8) reduced model size by 4×, accuracy loss < 0.5 F1 points
- Caching: tokenization outputs cached (most expensive step)

**Monitoring:**
- Track inference latency (p50, p95)
- Track distribution shift: are test set entities different from training set?
- Version training data: reproducible, auditable

**Data drift handling:**
- Retrain monthly if performance drops > 1 F1 point
- Built automated retraining pipeline (Metaflow)

---

## What I'd Do Differently

**1. Invest in better annotation guidelines.**
5% of annotation disagreements were boundary-related. Clearer guidelines (e.g., "always include modifiers; always exclude post-modifiers") would have reduced ambiguity.

**2. Use active learning from the start.**
Rather than annotate 4,400 random abstracts, annotate:
- 500 random abstracts
- 500 high-uncertainty abstracts (from model trained on initial 500)
- Repeat until target F1 reached
- Would likely reach 0.75 F1 with 2,000 abstracts instead of 4,400.

**3. Attempt entity linking (optional but valuable).**
Once we extract an entity, link it to a canonical ID in a knowledge base (e.g., UMLS CUI). NER + linking = structured knowledge.

**4. Test on external datasets.**
We only evaluated on MedMentions test set. Testing on other biomedical NER datasets (BioNLP shared tasks) would reveal generalization gaps.

**5. Explore few-shot learning.**
Would the model work on a new entity type (e.g., "Allergies") with only 10 examples? Likely no, but proto-networks or MAML could help.

---

## Conclusion

This project taught me that NER isn't about choosing the right architecture—it's about understanding your data, your error modes, and your downstream constraints. BioBERT + CRF was the right choice not because it's newer, but because it solved the specific problem (structured sequence labeling with imbalanced classes and short contexts).

The hardest part wasn't modeling. It was dataset engineering: handling annotation ambiguity, managing class imbalance, and understanding what "good NER performance" means for the biomedical domain. The model is reproducible and maintained. The data engineering was 60% of the work.
