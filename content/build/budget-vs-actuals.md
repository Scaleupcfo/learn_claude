## ① Prompt skeleton

<PromptSkeleton fields="period=Q3 2026, format=One-page summary + variance table" template="Analyze [period] budget vs actuals. Output: [format].

Data attached / pasted:
[PASTE CSV OR XLSX CONTENT]

Required:
1. Top-line variance: revenue vs plan, expenses vs plan, net.
2. Top 3 favorable variances — with a 1-line cause.
3. Top 3 unfavorable variances — with a 1-line cause.
4. One-paragraph CFO commentary: what to do about it.

Tone: dry and specific. No corporate hedging. If you can't explain a variance from the data, say 'cause unclear, needs investigation'." />

## ② How to iterate

- Ask Claude: *"Which variances are likely timing differences vs. real misses?"*
- For trend analysis: *"Compare this period to the prior two. Is anything compounding?"*

## ③ How to publish the analysis

**Claude Cowork:** paste the CSV → review → copy commentary into your board pre-read.

**Claude Code:**
```bash
claude
# "Load fy26q3-actuals.xlsx, compare to fy26-budget.xlsx, output a markdown summary."
```

## ④ When things go wrong

- **Misclassified expenses** → tell Claude what your COA categories are explicitly.
- **Numbers ambiguous** → *"For unclear lines, list them in a 'needs investigation' section instead of guessing."*
