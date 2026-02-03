# Marketing Attribution & MMM at Scale – Ubisoft

## Executive Summary

At Ubisoft, I designed and shipped an end-to-end marketing attribution pipeline that combined multiple statistical approaches (Markov chains, removal effect, and Bayesian media mix modeling). The system processed raw marketing spend and audience data through Snowflake → Databricks → Metaflow pipelines, ultimately enabling more intelligent budget allocation across channels.

This wasn't an academic exercise in attribution. It was infrastructure built to answer one question: *For every dollar spent in marketing, which channel drove the most incremental player acquisition?* That question has a real answer, but it's buried under data quality issues, causal inference complexity, and organizational friction.

---

## The Business Problem

**The question:**
A player discovers Ubisoft's game through multiple marketing touchpoints—sometimes search ads, then social media retargeting, then an email. Who gets credit? How do we allocate next month's budget?

**Why it matters:**
- Marketing budgets are finite and highly tuned
- A misallocation compounds: under-fund a high-ROI channel, and you starve growth
- Traditional analytics (last-click attribution) biases toward bottom-funnel awareness channels and undervalues top-funnel brand-building
- Without good attribution, marketing spend decisions default to politics and gut feel

**The organizational gap:**
Marketing teams had intuition and spreadsheets. Data wasn't flowing systematically into decisions. There was no single source of truth for channel effectiveness.

---

## Why Attribution Is Hard in Real Life

**1. Causality, Not Correlation**
If we see: Player clicks search ad → clicks social retargeting ad → installs game, we might assume both channels deserve credit. But what if the player would have installed anyway? We need to measure the *incremental* lift, not just observe the path.

**2. Data Constraints**
- We don't have perfect user journey data. Not every touchpoint is tracked (especially offline channels)
- We have marketing spend data (we know how much went to each channel) but the audience impact is noisy
- Seasonality, external events, and competitor actions confound the signal

**3. Attribution Approaches Have Tradeoffs**
- **Last-click**: Simple, wrong, biases toward retargeting
- **First-click**: Wrong in the opposite direction
- **Linear/time-decay**: Still heuristic, doesn't measure incrementality
- **Markov chains**: Elegant, but assumes stationarity and can be brittle with sparse data
- **MMM (Media Mix Modeling)**: Powerful for aggregate insights, but coarse-grained and hard to implement
- **Causal inference (RCTs)**: Gold standard, but slow and expensive

**Real constraint:** We had to choose an approach that works with observational data, doesn't require randomized experiments, and produces actionable recommendations *now*.

---

## Data Sources & Constraints

**Raw inputs:**
- **Marketing spend** (Ubisoft's internal systems): Daily spend by channel, region, game title
- **Audience data** (Google Analytics, Facebook Ad Manager, Appsflyer): Player touchpoints, install events, timestamps
- **Business metrics** (Snowflake data warehouse): Player installs, engagement, lifetime value
- **Causal events**: Campaign launches, platform changes, seasonal periods

**Data quality issues we encountered:**
- **Attribution windows**: Different channels have different natural windows (search: hours, brand awareness: weeks)
- **Cross-device tracking gaps**: Players switch devices; we lose the signal
- **Lag**: Marketing spend → installs isn't instant. There's delay between a click and an install
- **Confounding**: Competitor campaigns, platform algorithm changes, iOS privacy updates
- **Sparse channels**: Some channels had too little data to estimate effects reliably

**How we handled it:**
- Aggregated to weekly level (balanced lag and noise)
- Filtered to channels with minimum volume thresholds
- Built confidence intervals, not point estimates
- Separated brand awareness (long-tail effect) from direct response (short-tail)

---

## Modeling Choices

We implemented *three complementary approaches*, not one. Each answered a different question.

### 1. Markov Chain Attribution

**What it does:**
Models the player journey as a sequence of touchpoints. Estimates the probability that each touchpoint converts the player, accounting for other touchpoints in the chain.

**Why we chose it:**
- Works with individual-level journey data
- Intuitive: "What's the conditional probability of install given this touchpoint?"
- Produces a per-channel credit distribution

**Implementation:**
- Built first-order Markov chains (each state depends only on the previous touchpoint)
- Handled null conversions (players who don't install) with a "no install" absorbing state
- Applied removal effect: what's the lift if we removed each channel from the journey?

**Limitations we hit:**
- Assumes stationarity: touch 1 and touch 10 have the same effect (they don't)
- Sensitive to data sparsity: rare channel combinations produce unstable estimates
- Doesn't account for dose-response (more spend ≠ proportionally more installs)

### 2. Removal Effect & Incrementality

**What it does:**
For each channel, estimate: *What's the causal lift in installs if we removed that channel entirely?*

**Why it matters:**
- Directly measures incrementality, not just correlation
- Bypasses the "did the touchpoint cause the install?" question
- Produced concrete numbers: "Removing search ads costs us X installs per week"

**Implementation:**
- Built time-series model: Installs ~ f(spend by channel) + seasonality + trend
- Controlled for external factors (platform changes, competitor activity)
- Used lagged spend (accounting for the conversion lag)
- Estimated confidence intervals via bootstrap

**Technical detail:**
We used a distributed lag model:

$$
\text{Installs}_t = \alpha + \sum_{c} \sum_{k=0}^{L} \beta_{c,k} \cdot \text{Spend}_{c,t-k} + \gamma_t + \epsilon_t
$$

Where:
- $c$ = channel
- $L$ = lag window (up to 28 days for brand awareness, 3 days for performance)
- $\gamma_t$ = seasonal/trend component (modeled with splines)
- $\beta_{c,k}$ = incremental installs per dollar spent in channel $c$ at lag $k$

**What worked:**
- Forced us to think about lag and carryover
- Produced actionable cost-per-install by channel
- Could be retrained quickly (weekly)

**What didn't:**
- Struggled during campaign transitions (causality assumptions break)
- Multicollinearity between channels (hard to separate their effects)
- Seasonality patterns change year-to-year

### 3. Bayesian Media Mix Modeling

**What it does:**
Builds a probabilistic model of install generation from marketing spend. Includes priors about diminishing returns and saturation.

**Why we added it:**
- Markov chains are individual-level; MMM is aggregate
- MMM can model non-linear dose-response (law of diminishing returns)
- Bayesian framework lets us encode domain knowledge via priors

**Implementation:**
- Used a Poisson likelihood (installs are count data)
- Modeled spend effects with an Adstock transformation (carryover effect):
  
$$
\text{Adstock}_{c,t} = \sum_{k=0}^{L} \lambda_c^k \cdot \text{Spend}_{c,t-k}
$$

- Applied saturation (Hill curve) to model diminishing returns:

$$
\text{Effect}_c = k_c \cdot \frac{\text{Adstock}_{c}^{s_c}}{x_{c,0.5}^{s_c} + \text{Adstock}_{c}^{s_c}}
$$

Where $x_{c,0.5}$ is the half-saturation point (spend level at 50% of max effect).

- Used PyMC3 for Bayesian inference

**Advantages:**
- Forces us to think about saturation (critical for budget optimization)
- Produces posterior distributions over parameters (uncertainty quantification)
- Predictive: "If we increase search spend by 20%, how many installs?"

**Complications:**
- Hard to get right. Priors matter a lot
- Posterior is high-dimensional; inference is slow
- Identifiability issues (multiple parameter combinations fit the data)
- Required stakeholder education (non-technical teams find Bayesian MMM unintuitive)

---

## Architecture: Snowflake → Databricks → Metaflow → MLflow

**Data layer (Snowflake):**
- Centralized warehouse for all marketing and install data
- Raw tables: daily_spend, daily_installs_by_source, player_journeys
- Transformation views: weekly aggregations, feature engineering, data quality checks

**Computation layer (Databricks):**
- Spark jobs for large-scale transformations (player journey aggregation, feature engineering)
- PySpark + distributed ML for fitting models at scale
- Notebooks for exploratory analysis, model validation

**Orchestration layer (Metaflow):**
- Automated training pipelines: extract → feature → train → validate
- Dependency management (runs only if new data is available)
- Metadata tracking (which data version, which model code, which parameters)

```
MetaflowDAG:
  ├─ FetchDataTask (Snowflake → Spark)
  ├─ FeatureEngineeringTask (Aggregations, lags, seasonality)
  ├─ TrainMarkovChain (Python)
  ├─ TrainRemovalEffect (PyMC3)
  ├─ TrainMMM (PyMC3)
  ├─ ValidateModels (Backtest, cross-validation)
  └─ RegisterToMLflow
```

**Model registry & versioning (MLflow):**
- Each model (Markov, Removal Effect, MMM) versioned and registered
- Track parameters, metrics, and inference code together
- Rollback capability if a new model underperforms

**Inference:**
- Weekly model retrain triggered by Metaflow
- Attribution recommendations exported to Snowflake table
- Marketing team queries dashboard (Tableau) for allocation insights

---

## Results & Decision Impact

**What we shipped:**
1. **Weekly attribution report**: Channel-level credit, confidence intervals, cost per install by channel
2. **Budget optimization model**: Given fixed total spend, recommended allocation across channels
3. **Scenario analysis**: "If we increase search spend by $100K, expected incremental installs?"

**Business impact:**
- Identified that one high-spend channel was under-performing by 40% (vs. assumed effectiveness)
- Reallocated budget → ~15% increase in install efficiency (installs per dollar spent)
- Reduced dependency on last-click attribution (which was systematically biasing toward retargeting)
- Enabled monthly budget conversations between marketing and data (vs. static historical allocation)

**How teams used it:**
- Marketing managers referenced the model in budget requests
- CFO used the analysis for ROI justification
- Product team wanted to understand the attribution impact of iOS privacy changes (we could measure the lift degradation in real-time)

---

## Trade-offs & Limitations

**What we didn't do (and why):**

**1. Didn't RCT entire marketing budget**
- Gold standard for causality
- Impractical: turns off channels to A/B test, loses revenue in the short term
- Acceptable compromise: Use observational inference with multiple approaches

**2. Didn't model saturation perfectly**
- Diminishing returns is real (more spend on a channel produces less marginal lift)
- Estimating saturation curves requires variation in spend (which may not exist)
- Workaround: Used domain knowledge to set priors; regularly updated with business intuition

**3. Didn't unify all attribution into one number**
- Marketing wanted a single "attribution weight per channel"
- Reality: Different approaches (Markov, MMM, Removal Effect) give different answers
- Decision: Show all three, let stakeholders understand the range

**4. Didn't account for competitive dynamics**
- Competitor campaigns confound our effects
- Hard to measure competitor spend and impact
- Limitation: Model assumes competitor activity is random noise

**5. Didn't go real-time**
- Weekly retrain cycle (latency: up to 7 days)
- Daily would be better for fast-moving channels
- Trade-off: Weekly was stable and reliable; daily risked instability from noise

---

## Key Learnings

**1. The curse of perfect data doesn't exist.**
We had more data than most teams. We still had gaps, biases, and confounders. Attribution is hard not because of tooling—it's hard because causality in observational data is hard. Accept the uncertainty; quantify it; move forward.

**2. Multiple models > single model.**
Different techniques highlight different aspects of the truth. Markov chains show individual-level patterns. MMM reveals saturation. Removal effect isolates incrementality. Show all three; let stakeholders integrate them.

**3. Priors and assumptions matter more than algorithm.*
The biggest variance in attribution estimates comes from:
- How we define the attribution window (3 days vs. 28 days?)
- Whether we assume carry-over (adstock) or not
- What we do with non-tracked touchpoints

These are *modeler choices*, not data. Document them heavily.

**4. Stakeholder alignment is the real bottleneck.**
The model is shipped. Teams don't use it because:
- Non-technical stakeholders don't trust Bayesian inference
- It contradicts existing intuition
- It forces accountability (spending more on low-ROI channels becomes visible)

Solution: Inverse causality. Start with decisions they need to make, then ask what model would inform that decision.

**5. Causal understanding compounds.**
Once the model exists, every new business question becomes tractable. "What's the impact of a platform algorithm change?" becomes: retrain the model, look at posterior difference. This is more valuable than any single attribution number.

---

## What I'd Do Differently

1. **Start with the decision**, not the model. Ask marketing: "What decision would change if you had perfect attribution?" Build toward that specific answer.

2. **Simplify first, add complexity later.** Start with removal effect (easiest to explain). Prove value. Then layer in Markov chains and MMM.

3. **Invest more in data quality.** Spent 30% of the project on modeling, 70% on cleaning touchpoint data. That ratio should be 40/60.

4. **Integrate causal forests** for heterogeneous treatment effects (does the lift of search depend on region? On game title? On player segment?). We didn't go there; it would have been valuable.

5. **Monitor for model drift.** We validated weekly, but didn't formally track whether the model's assumptions held. After iOS privacy changes, accuracy degraded, and we caught it late.

---

## Technical Stack Summary

- **Data warehouse**: Snowflake
- **Compute**: Databricks (PySpark)
- **Orchestration**: Metaflow
- **Modeling**: PyMC3 (Bayesian), scikit-learn (Markov chains)
- **Model registry**: MLflow
- **Visualization**: Tableau (dashboards), Matplotlib (notebooks)
- **Versioning**: Git + Metaflow artifacts

---

## Conclusion

Attribution is a solved problem in *theory*. In practice, it's a series of trade-offs between causal rigor, data availability, and organizational readiness. My contribution wasn't inventing a new method—it was **building a system that made the right trade-offs explicit, measurable, and iterable.**

The models I shipped enabled better decisions. The models I *didn't* ship (RCT-based, fully real-time, per-individual) would have been more elegant but less practical.

That's the tension I optimize for: elegant enough to be correct, practical enough to ship.
