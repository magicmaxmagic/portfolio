# Text Clustering & Voice of Customer Analysis

## Executive Summary

I built an end-to-end text clustering pipeline to extract insights from customer feedback. The system used sentence transformers for semantic embeddings, HDBSCAN for clustering, and UMAP for visualization. The result: unsupervised discovery of customer pain points, feature requests, and sentiment clusters without manual labeling.

This was applied ML in its truest form: unstructured feedback → structured insights → business decisions.

---

## Business Use Case

**The problem:**
Customer feedback arrives daily through multiple channels: support tickets, surveys, app reviews, social media. Hundreds of messages. No systematic way to understand what customers are saying.

**Traditional approaches (why they fail):**
- Manual tagging: Slow, subjective, doesn't scale past 500-1000 messages
- Keyword search: Brittle, biased toward expected topics, misses novel complaints
- Simple sentiment analysis: Tells you anger level, not the reason

**What we needed:**
- Automatic grouping of similar feedback without predefined categories
- Discovery of unexpected pain points
- Quantification: "What percentage of feedback mentions X?"
- Fast iteration: add new feedback weekly, regenerate insights monthly

**My contribution:**
Build a clustering pipeline that:
1. Embeds text semantically (beyond keyword matching)
2. Discovers clusters automatically (without manual tuning)
3. Makes clusters interpretable (what's the theme?)
4. Scales to thousands of messages monthly
5. Monitors for concept drift (are customer concerns changing over time?)

---

## Text Normalization & Preprocessing

Raw customer feedback is messy:

```
"OMG the app is SO LAGGY!! can't even open my profile 😤"
"Does anyone else get errors when trying to pay???"
"this is grat"
"@support y u no fix the login bug"
"Payment processing taking 5-10 min, should be instant"
```

**Preprocessing pipeline:**

**1. Standardization**
- Remove URLs, email addresses (noise, privacy)
- Decode HTML entities ("&amp;" → "&")
- Normalize whitespace (multiple spaces → one space)
- Lowercase (focus on semantics, not capitalization)

**2. Spelling correction (carefully)**
- Use a lightweight speller (pyspellchecker) on obvious errors
- "grat" → "great"
- But DON'T over-correct: "u" → "you" (common in informal text, lost authentic voice)
- Decision: Correct only if high confidence

**3. Emoji handling**
- Map emoji to text: "😤" → "[angry]", "❤️" → "[heart]"
- Emojis carry sentiment; useful signal for clustering
- Don't strip them entirely

**4. Tokenization & language filter**
- Keep only English (support for multiple languages later, not now)
- Remove pure spam/gibberish (< 5 tokens, or detected by language model)

**5. Minimal stemming (none for clustering)**
- NER systems benefit from stemming; text clustering often doesn't
- Reason: embeddings are semantic, not syntactic
- "payment", "paying", "paid" are already close in embedding space
- Aggressive stemming ("payment" → "pay", "paying" → "pay") loses nuance

**6. Length filtering**
- Remove very short messages (< 3 tokens, too little signal)
- Truncate very long messages (> 512 tokens, will be chunked by transformer anyway)

**Result:**
- Input: ~3,000 raw customer feedback messages
- After filtering: ~2,750 messages ready for embedding

---

## Embedding Strategy: Sentence-Transformers

**Why not TF-IDF?**
- TF-IDF is sparse, keyword-based
- "The app crashes when I open the payment page" and "Payment page causes app to crash" are almost identical in meaning but different TF-IDF vectors
- Semantic similarity is lost

**Why sentence-transformers (SBERT)?**

Sentence-BERT fine-tunes BERT to produce sentence embeddings where semantically similar sentences have similar vectors.

**How SBERT works:**
1. Encode sentence with BERT
2. Apply pooling (mean token embeddings)
3. Optimize with contrastive loss: similar sentences → close vectors, dissimilar → far vectors
4. Output: fixed-size dense vector (384-dim or 768-dim)

**Model choice: `all-MiniLM-L6-v2`**
- 6 layers, 384 dimensions
- Smaller than full sentence transformers (~33M parameters)
- Pre-trained on a large corpus of sentence pairs
- Trade-off: slightly lower accuracy than larger models, but faster inference (50ms per batch of 32)

**Why this model?**
- Inference latency: customer feedback arrives daily; recomputing embeddings should be fast
- Memory: 384-dim vectors for 3K messages → 1.2MB (fits in memory easily)
- Quality: Tested on downstream clustering; accuracy difference negligible vs. larger models

**Embedding computation:**
```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(messages, batch_size=32, show_progress_bar=True)
# Output: (2750, 384) array
```

**What we're capturing:**
- Semantic meaning (independent of exact wording)
- Customer intent ("I can't log in" ≈ "login is broken" ≈ "unable to authenticate")
- Sentiment (but SBERT isn't fine-tuned for sentiment, so this is implicit)

---

## Clustering Logic: HDBSCAN

**Problem with K-means:**
- K-means assumes spherical clusters of similar density
- Real feedback has clusters of different sizes: many small "bug reports", a few large "feature requests"
- K-means would force 5 clusters globally, but maybe 3 in one region, 10 in another

**Why HDBSCAN?**
- Density-based clustering (like DBSCAN, but hierarchical)
- Automatically discovers number of clusters
- Handles variable-density clusters
- Produces soft labels (probability of cluster membership, not hard assignment)

**How HDBSCAN works (intuitive):**

1. Build a k-NN graph (each point connects to 5 nearest neighbors)
2. Compute local density at each point
3. Define clusters as dense regions where local density is high relative to neighbors
4. Build hierarchy: merge nearby dense regions
5. Cut hierarchy to find stable clusters

**Configuration:**
```python
from hdbscan import HDBSCAN

clusterer = HDBSCAN(
    min_cluster_size=10,      # Minimum points per cluster
    min_samples=5,             # Minimum core distance
    metric='euclidean',        # Distance metric (could use 'cosine')
    cluster_selection_method='eom'  # Maximize stability
)

labels = clusterer.fit_predict(embeddings)
```

**Parameter tuning:**

- **min_cluster_size=10**: Clusters must have ≥10 messages. Why?
  - Too low (5): Creates noise clusters, hard to interpret
  - Too high (20+): Merges distinct clusters
  - 10 was sweet spot (empirically tested on 10% holdout)

- **min_samples=5**: Core distance threshold. Higher = more conservative clustering.

- **metric='euclidean'**: L2 distance. Could use 'cosine' (normalized), but euclidean works fine here.

**Result:**
- Identified 12 main clusters
- ~250 noise points (label = -1), ~3% of data
- Cluster sizes: 50 → 500 messages

---

## Cluster Interpretation

**How we named clusters (not automated):**

For each cluster, computed:
1. **Top keywords** (TF-IDF of cluster vs. rest of corpus)
2. **Sentiment** (positive/negative word frequency)
3. **Manual sampling** (read 20 random messages from cluster)

**Example clusters:**

| Cluster | Size | Theme | Top Words |
|---------|------|-------|-----------|
| 0 | 480 | **Payment Issues** | payment, declined, error, process, refund |
| 1 | 320 | **Performance & Lag** | slow, lag, crash, freeze, unresponsive |
| 2 | 290 | **Authentication** | login, password, reset, account, locked |
| 3 | 210 | **Feature Request: Dark Mode** | dark, mode, eyes, bright, theme |
| 4 | 180 | **Data Sync Issues** | sync, lost, disappear, offline, disconnect |
| 5 | 150 | **UI/UX Confusion** | confusing, where, find, button, unclear |
| ... | ... | ... | ... |

**Interpretation challenge: Ambiguous boundaries**

Some messages could belong to multiple clusters:
- "Payment is slow and often fails" → Payment Issues? Performance Issues? Both.
- HDBSCAN gives soft labels (probability); used threshold > 0.5 for hard assignment.

---

## Evaluation Metrics

**Challenge: No ground truth labels (unsupervised learning)**

Can't compute accuracy. Instead:

**1. Silhouette score** (internal validation)
- How tightly clustered are points, relative to other clusters?
- Range: [-1, 1]. Higher is better.
- Ours: 0.32 (decent, not great)
- Why not higher? Customer feedback is naturally messy; boundaries are soft.

**2. Calinski-Harabasz index** (cluster separability)
- Ratio of between-cluster to within-cluster variance
- Ours: 15.2 (reasonable; higher would indicate better separation)

**3. Noise ratio**
- What % of points are classified as noise (label = -1)?
- Ours: 3% (acceptable; not too high, not too low)
- Too high (> 10%): clustering isn't working, too many isolated points
- Too low (< 0.5%): possibly over-clustering, missed real noise

**4. Stability test** (robustness)
- Recompute embeddings with slight variation (e.g., different random seed in model)
- Are cluster assignments stable?
- Tested 10 replicates; 95% of points had stable cluster assignment
- Good sign: clustering is robust to minor variations

**5. Manual validation** (trust but verify)
- Read 50 random messages from each of top 5 clusters
- Does the cluster theme match the actual messages?
- Result: 90% of sampled messages align with predicted theme
- 10% were borderline or misclassified (expected in soft-boundary task)

---

## Insight Extraction & Actionability

**From clusters to business decisions:**

**Cluster 0 - Payment Issues (480 messages, 17% of feedback)**
- Problem: Payments failing or slow
- Sentiment: Frustrated, angry
- Action: Escalate to payments team; investigate gateway
- Impact: High (payment failures directly affect revenue)

**Cluster 3 - Feature Request: Dark Mode (210 messages, 7.6%)**
- Problem: No dark mode in app
- Sentiment: Polite requests, feature suggestions
- Action: Roadmap planning; easy PR opportunity
- Impact: Medium (improves UX for subset of users)

**Cluster 5 - UI/UX Confusion (150 messages, 5.4%)**
- Problem: Users can't find features, buttons are unclear
- Sentiment: Frustrated but constructive ("where is X?")
- Action: UX redesign, clearer onboarding, better documentation
- Impact: Medium (affects new user onboarding)

**Cluster 4 - Data Sync Issues (180 messages, 6.5%)**
- Problem: Data loss, sync failures, offline issues
- Sentiment: Angry, data loss is serious
- Action: Debug sync logic, improve offline handling
- Impact: Critical (data loss is trust-breaking)

---

## Monitoring for Concept Drift

Customer concerns change over time. New issues emerge, old issues resolve.

**Monthly recomputation:**
1. Collect new feedback (batch of ~500 new messages)
2. Recompute embeddings
3. Recluster (all historical + new)
4. Track cluster evolution

**Drift detection:**

Track top 3 clusters by size over time:

```
Month 1: Payment Issues (480), Performance (320), Auth (290)
Month 2: Payment Issues (520), Performance (280), Auth (260), SyncIssues (210)
Month 3: Payment Issues (550), SyncIssues (320), Performance (260), Auth (200)
```

Observation: Sync issues grew from 0 to 320 → likely a bug introduced recently.

**Actions:**
- Alert engineering team
- Prioritize the sync issue
- Re-run clustering to get detailed diagnosis

---

## Limitations & Trade-offs

**1. Interpretation is still manual**
- Clusters are discovered automatically, but naming them requires human reading
- 10-20 messages per cluster, find the theme by hand
- Not a blocker, but limits scalability if moving to thousands of messages/week

**2. No explicit sentiment modeling**
- SBERT embeddings capture some sentiment (intuitively), but not explicitly
- "The app is fast!" and "The app is slow" could have similar embeddings if the rest of the context is identical
- Workaround: Post-process each cluster with a sentiment classifier if needed

**3. Soft boundaries**
- Some feedback legitimately belongs in multiple clusters
- Hard assignment (choose one cluster) loses information
- Alternative: Keep soft labels, let downstream systems handle ambiguity

**4. Language & cultural bias**
- SBERT trained on English general text, not specific to app feedback
- Slang, emojis, abbreviations ("app is LIT") may not be understood correctly
- Solution: Fine-tune SBERT on your specific domain (but requires labeled pairs)

**5. Scalability to new domains**
- This clustering pipeline was built for a specific app's feedback
- Generalizing to a new product would require retuning min_cluster_size, re-labeling clusters
- Not plug-and-play, but close

---

## Technical Stack

**Tools used:**
- Sentence-BERT: `sentence-transformers` (Python)
- Clustering: `hdbscan` (Python, uses C++ backend for performance)
- Visualization: `umap-learn` for 2D projection (for exploratory plots)
- Storage: Parquet files (embeddings + metadata), queryable with Pandas or DuckDB

**Inference pipeline:**
```
New feedback → Normalize text → Encode with SBERT → 
Compare to existing embeddings (cosine distance) → 
Assign to nearest cluster (with confidence) → 
Log assignment + confidence → Alert if low confidence
```

**Monthly batch recompute:**
- Extract new feedback from database
- Normalize, encode, recluster
- Generate monthly report (cluster summary, trend analysis)
- Automated with Airflow

---

## Lessons Learned

**1. Embeddings are powerful for semantic tasks.**
A simple TF-IDF → K-means pipeline would have missed synonymous phrasings. SBERT nailed semantic similarity out of the box.

**2. Density-based clustering fits real-world data.**
K-means forced equal-sized, spherical clusters. HDBSCAN naturally discovered variable-density clusters that matched our intuition about feedback themes.

**3. Unsupervised learning still requires validation.**
No ground truth → harder to debug. Manual inspection of 50-100 examples was essential to trust the clusters.

**4. Interpretation is a feature, not a bug.**
Automated clustering would be useless if we couldn't understand *why* messages were grouped. Spending time on interpretation (top words, manual reading) was worth it.

**5. Monthly recompute is better than static.**
Feedback themes evolve. Static clusters become stale. Monthly updates kept the system relevant.

---

## What I'd Do Differently

**1. Fine-tune SBERT on domain data.**
Collect 500-1000 pairs of similar feedback messages (manually labeled). Fine-tune SBERT on your domain. Likely 5-10% improvement in clustering quality.

**2. Automate cluster naming.**
Use GPT (or similar) to read a sample of messages from each cluster and propose a name. Reduces manual effort. Risk: hallucination (proposing incorrect themes).

**3. Build a hierarchical clustering.**
Some clusters are sub-clusters of larger themes. E.g., "Dark Mode" and "Light Theme Toggle" could be under-branches of "Theme Preferences". Hierarchical clustering would reveal this structure.

**4. Add sentiment explicitly.**
Post-process each cluster with a fine-tuned sentiment classifier (BERT fine-tuned on customer feedback sentiment). Correlate sentiment with themes. Example: "Performance Issues" might have 80% negative sentiment, while "Feature Requests" 20% negative.

**5. Temporal segmentation.**
Cluster feedback separately by time period (Week 1, Week 2, etc.). Track how themes evolve *within* clusters over time.

---

## Conclusion

Voice of customer analysis is a classic problem in product development. Most companies solve it with manual tagging or keyword search. Both are slow and biased.

This clustering pipeline made it scalable and automated. It doesn't require pre-defined categories. It discovers what customers actually care about. And it updates monthly as the product and customer base evolve.

The magic wasn't the algorithm (HDBSCAN is well-known). It was the pipeline: good embeddings → reasonable clustering → systematic interpretation. That combination transforms raw feedback into actionable insight.
