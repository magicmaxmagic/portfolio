# Prevent – SaaS for Automated Web Vulnerability Detection

## Executive Summary

I co-founded Prevent, a SaaS product for automated web vulnerability detection. The vision was bold: scan websites continuously, detect security vulnerabilities (SQL injection, XSS, broken auth, etc.), and alert developers in real-time.

I owned the ML/security architecture, backend infrastructure, and early product strategy. We built, shipped, and learned hard lessons about product-market fit, the difficulty of selling enterprise security to bootstrapped teams, and when to pivot.

This wasn't a traditional ML project. It was a full-stack company. And the failure taught me more than any success.

---

## Product Vision

**The problem:**
- OWASP Top 10 vulnerabilities appear in 80%+ of web applications
- Most developers don't have time or expertise to manually penetration test
- Existing tools are expensive ($1000+/month), complex to set up, targeted at security teams not developers
- There's a gap: small to mid-size teams building web products with no security infrastructure

**Our hypothesis:**
- Developers want automated scanning that's *easy* and *fast*
- A SaaS tool that scans on commit (or daily) and alerts on vulnerabilities could be a no-brainer
- Charge $50-200/month, capture SMB market underserved by Rapid7 and Qualys

**Product design:**

**1. Automatic scanning**
- Connect your GitHub repo (OAuth)
- We monitor commits
- On each commit: trigger a security scan
- Results in 10-30 minutes (not hours)

**2. Vulnerability detection**
- SQL injection detection (pattern matching + dynamic testing)
- Cross-site scripting (XSS) detection
- Broken authentication (weak password handling, JWT issues)
- Insecure serialization
- Security misconfiguration
- Sensitive data exposure

**3. Smart alerting**
- Don't flood users with noise (false positives kill trust)
- Group similar vulnerabilities
- Prioritize by severity + exploitability
- Integrate with Slack: "New SQL injection risk in /api/users endpoint"

**4. Remediation guidance**
- For each vulnerability, show:
  - What it is (explanation)
  - Why it matters (CVSS score, exploitability)
  - How to fix it (code examples, secure code patterns)
- External link to CWE / OWASP documentation

**Target customer:**
- Early-stage SaaS founders (100-1000 developers)
- Freelance developers or small agencies
- Companies post-IPO with compliance requirements

---

## Architecture

**System design:**

```
GitHub/GitLab (OAuth) ─┐
                       ├─→ [Webhook Listener] ─→ [Queue (Celery)]
User Dashboard ────────┤
                       ├─→ [Scanner Orchestration]
Slack Integration ─────┤   (Provisioning + Coordination)
                       │
                       ├─→ [Security Scanner Pool] (5-10 instances)
                       │   - Static analysis (AST parsing, regex patterns)
                       │   - Dynamic testing (HTTP fuzzing)
                       │   - Dependency scanning (CVE checking)
                       │
                       └─→ [Results Storage] (PostgreSQL)
                           [Vector DB] (for semantic search of vulns)
                           [Cache] (Redis)
```

**Core components:**

**1. Webhook & Orchestration**
- Listen for GitHub push events
- Parse commit, fetch code
- Queue scanning job
- Technology: Python + FastAPI

**2. Static Analysis Engine**
- Parse code AST (Abstract Syntax Tree)
- Look for vulnerable patterns:
  - Direct SQL string concatenation: `query = "SELECT * FROM users WHERE id=" + user_id` (classic SQL injection)
  - Insecure deserialization: `pickle.loads(user_data)` in Python
  - Hardcoded secrets: API keys, passwords in code
- Regex-based detection for known patterns
- Technology: `ast` module (Python), `tree-sitter` (multi-language parsing)

**3. Dynamic Analysis (DAST)**
- Spin up a containerized instance of the application
- Fuzzing: Send malicious inputs (SQL payloads, XSS attempts) to endpoints
- Monitor responses for signs of vulnerability
- Example: Send `admin' OR '1'='1` to login form, see if it bypasses authentication
- Technology: Docker, Burp Suite API, custom Selenium scripts

**4. Dependency Vulnerability Scanning**
- Parse `package.json`, `requirements.txt`, `Gemfile`
- Cross-reference against CVE databases
- Check for known vulnerabilities in dependencies
- Technology: `safety` (Python), `npm audit`, `bundler audit`

**5. Results Processing**
- Deduplicate findings (same SQL injection pattern found in 3 places → 1 vulnerability)
- Score severity (CVSS v3.1)
- Generate remediation suggestions (LLM-powered)
- Store in PostgreSQL

**6. User-Facing Dashboard**
- React frontend
- Display vulnerabilities by endpoint, severity, type
- Historical trends (is the codebase getting more or less secure over time?)
- Technology: React + TailwindCSS, Vercel hosting

---

## Security Considerations

**Key challenges:**

**1. Running untrusted code safely**
- We're scanning user applications (which we don't control)
- A user's code could be malicious
- We need sandboxing: containerized execution, network isolation, resource limits
- Solution: Docker + Kubernetes namespaces, killed after timeout (30 min max)

**2. Data privacy**
- We see user code (intellectual property)
- We see potential secrets (API keys, credentials)
- Compliance: GDPR, SOC 2
- Solution: Encrypted storage, no retention policy (delete after scan), no logging of secrets

**3. False positives**
- Static analysis generates noise (regex false positives)
- Damage: User ignores alerts ("the tool cried wolf")
- Solution: Validate findings via dynamic testing before alerting, maintain low false positive rate (target: < 5%)

**4. Zero-day vulnerabilities**
- We're pattern-matching against known vulnerabilities
- New vulnerability types emerge
- Solution: Regular model updates, community feedback integration

---

## Monetization

**Pricing model:**
- **Free tier**: 1 scan/month, basic alerts, community support
- **Pro tier**: $99/month, unlimited scans, integrations (Slack, GitHub), 7-day retention
- **Enterprise**: Custom pricing, dedicated support, on-premises option

**Payment integration:**
- Stripe for subscription management
- Webhooks for usage-based billing (if customer scans 100+ times/month, charge per excess scan)
- Tech: `stripe-python`, Celery tasks for meter reporting

**Metrics we tracked:**
- CAC (Customer Acquisition Cost): ~$150 (Google Ads + ProductHunt)
- MRR (Monthly Recurring Revenue): Started at $500 (5 customers), peaked at $12K (120 customers)
- Churn: 8% monthly (high, red flag)
- LTV (Lifetime Value): ~$500 (12 months * $80 avg - churn, with cost allocation)
- LTV/CAC ratio: 3.3x (healthy is >3)

---

## Why We Pivoted (The Honest Version)

**The beautiful hypothesis:** Developers need automated vulnerability scanning. We'll charge them $50-200/month.

**The reality:**
1. **Sales friction was enormous.** We landed 20 customers in 6 months (good). But converting SMBs who cared about security took months of effort. Many didn't *feel* like security was urgent. "We'll deal with it when we raise funding and need SOC 2."

2. **False positives killed trust.** Our static analysis was decent but not great (80-90% precision). Users saw 50 alerts, 10 were real. They stopped checking. We had to cut alerting back, but that made the product less useful.

3. **Difficult to integrate.** Our dynamic testing required running the app. But many users had:
   - External dependencies we couldn't mock
   - Authentication required to access endpoints
   - Database-dependent code paths
   - Our sandbox couldn't replicate their real environment

4. **Competitive pressure.** Snyk (much better funded, focused on dependencies) emerged. Veracode existed already. We were competing in a crowded market without differentiation.

5. **Market mismatch.** Our target customer (early-stage founders) has two problems:
   - They don't think about security (they think about product)
   - They can't afford $100/month when they're bootstrapped

   Our second target (companies needing compliance) would spend money, but:
   - They already have budgets for Qualys/Nessus
   - They want a single vendor, not best-of-breed
   - They need on-premises, we were SaaS

**The pivot:**
- Shifted from "sell automated scanning to devs" to "provide security vulnerability APIs for other SaaS products"
- Goal: Embed our scanning in 3rd-party developer platforms (GitHub's security tab, etc.)
- Theory: B2B2C (platform play) would be easier than direct B2B

**Outcome:**
- Explored partnerships; GitHub wasn't interested in third-party scanners (built their own later)
- Found 2-3 potential integration partners, but revenue was slow
- Eventually pivoted again to consulting (helping companies fix the vulnerabilities we found)
- Then shut down (founder bandwidth elsewhere, market timing wrong)

---

## Entrepreneurial Learnings

**What I got right:**

**1. Built something real, fast.**
- MVP in 3 months
- Shipped with 70% feature completeness
- Got it in front of users immediately
- Learned from market, not from guesses

**2. Customer conversations early.**
- Talked to 50+ potential customers before building
- Revised product vision based on feedback
- Learned about budget constraints, urgency, integration needs

**3. Picked a real problem.**
- Vulnerability scanning is genuinely needed
- Not a vanity project; it solves pain

**What I'd do differently:**

**1. Segment better.**
- Initial target was too broad (SMBs + enterprises)
- Should have focused on one (either SMBs needing compliance, or enterprises with existing security budgets)
- Chasing both meant our product pleased neither

**2. Nail the integration story first.**
- We built a cool scanning engine
- But the user experience (how they actually use the product) was clunky
- Should have started with: "How does a developer discover a vulnerability?" and built backward

**3. Over-invest in precision early.**
- Our false positive rate (10-20%) killed adoption
- We needed < 5% before users would trust the product
- Took 6 months to get there (too late)
- Should have spent more time on precision engineering upfront

**4. Don't compete on features alone.**
- Snyk, Veracode, and others existed
- We had to have a *defensible* position (superior UX, lower price, better for a niche)
- We didn't. We were a mediocre version of existing tools

**5. Revenue timing matters.**
- We built for 6 months, launched, then tried to sell
- Should have had paying customers funding the build
- Would have forced us to prioritize what *actually* mattered to customers

---

## Technical Lessons

**1. Sandboxing untrusted code is hard.**
- Docker isn't perfect isolation; Kubernetes better, but still risks
- Running arbitrary user code is inherently dangerous
- Spent 2 weeks on escapeproof sandboxing (worth it, not enough)

**2. Static analysis patterns don't generalize.**
- A SQL injection pattern in Python isn't the same in PHP or JavaScript
- Regex works for 70% of cases; AST-based analysis works for 90%
- Tree-sitter (multi-language parser) was game-changing, came late

**3. Dynamic testing is slow.**
- Spinning up containers, running the app, fuzzing takes time
- Users expect results in minutes, not hours
- Scaling compute was expensive (EC2 instances idle 80% of the time)

**4. Data privacy is not negotiable.**
- Storing user code (even if hashed) creates liability
- Legal review took longer than expected
- Deleted all sensitive data ASAP; ran into customer issues (they wanted retention)
- Lesson: Involve legal/compliance earlier

---

## What Prevent Taught Me About Building ML Products

**The triangle of product success:**

```
    Problem
    /     \
   /       \
Market -- Solution
```

Prevent had:
- Real problem ✓
- Decent solution (worked 80% of the time)
- Wrong market ✗ (SMBs didn't want to pay; enterprises already had solutions)

The missing piece: *market fit*. Even good tech fails without it.

**Other insights:**

**1. ML isn't a moat unless it's hard to replicate.**
- Our scanning was ML-powered (static + dynamic analysis)
- Snyk, Qualys, and others could build the same
- We needed 2-3 years of data + tuning to have better ML than competitors
- We didn't have that runway

**2. Enterprise sales are a feature, not a byproduct.**
- Targeting enterprises? You need: sales team, legal support, integration engineering
- We were 2 people; we didn't have these
- We could have built better for that market if we'd committed

**3. Free tiers are a trap.**
- We had 500 free users, 20 paid users
- Free users generated support requests, no revenue
- Would have been better: free trial (2 weeks), then paywall

**4. Benchmarking matters.**
- We measured ourselves against our own metrics (scans, vulnerabilities found)
- We didn't benchmark against Snyk, Qualys (would have revealed gaps earlier)
- Comparative analysis matters for positioning

---

## Conclusion

Prevent was a lesson in humility. The idea was sensible. The execution was respectable. But the market didn't want our solution in the form we built it.

If I did it again, I'd:
1. Focus on one specific market (e.g., fintech companies needing PCI compliance)
2. Make sure they're willing to pay before building anything
3. Reduce the scope (sell scanning API, not full SaaS)
4. Partner with larger platforms rather than sell direct

The product didn't fail because the tech was bad. It failed because I built something cool, then tried to find customers, rather than starting with customers and building what they need.

That's the entrepreneurial lesson. Not all ML-shaped problems need an ML solution. And not all good products make good businesses.
