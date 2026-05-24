## ① Prompt skeleton

<PromptSkeleton fields="product=Our enterprise tier, currentPrice=$X/seat/month, audience=Pricing committee" template="Analyze pricing for [product]. Current: [currentPrice]. Audience for the output: [audience].

Inputs:
- Cost structure: [PASTE]
- Competitor pricing: [PASTE]
- Customer willingness-to-pay signals: [PASTE — quotes, churn reasons, lost-deal reasons]
- Strategic context: [PASTE — are we growth-focused or margin-focused right now?]

Output:
1. Three price options with rationale (e.g. hold, +15%, +30%)
2. For each: expected impact on new sales, expansion, churn, NRR
3. Risks of each option (one paragraph)
4. Recommendation with the trade-off named clearly

Be honest about uncertainty. Don't pick a number with false precision." />

## ② How to iterate

- Ask: *"Which assumption, if wrong, breaks the recommendation? Stress-test it."*
- For grandfathering: *"How should we treat existing customers under each option?"*
- For board memos, add: *"Write a 1-paragraph executive summary at the top."*

## ③ How to share the analysis

**Claude Cowork** for the analysis; copy into a Google Doc to share with the pricing committee.

## ④ When things go wrong

- **Too theoretical** → paste real lost-deal notes; force the analysis to engage with them.
- **Recommendation feels safe** → *"Force-rank the three options. Don't sit on the fence."*
