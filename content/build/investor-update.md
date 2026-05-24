## ① Prompt skeleton

<PromptSkeleton fields="month=October 2026, audience=Seed and Series A investors, tone=Confident, not boastful" template="Write a monthly investor update for [audience] covering [month].

Structure (use these section headers verbatim):
1. TL;DR — 3 sentences
2. Highlights — 3 bullets max
3. Lowlights / risks — 2 bullets, honest
4. Metrics — table with these rows: ARR, MRR new, MRR churn, runway months, headcount
5. Asks — exactly 1-3, each a specific person or intro you need

Numbers to use (do not invent):
[PASTE METRICS + COMMENTARY]

Tone: [tone]. Investors will read this in under 90 seconds — make every line earn its space." />

## ② How to iterate

- Investors value **specific asks** over vague ones. If Claude writes "introductions would be helpful" — ask it to name three personas or companies instead.
- Ask Claude: *"What would a savvy investor flag as suspicious in this update?"* — then address those before sending.
- Keep the tone honest about lowlights. Investors trust founders who name problems.

## ③ How to run it

**In Claude Cowork:** paste the skeleton + numbers in chat, iterate, then copy into your investor-update email or doc.

**In Claude Code:**
```bash
claude
# "Save this as investor-updates/2026-10.md"
```

Export to PDF: in Google Docs, **File → Download → PDF**.

## ④ When things go wrong

- **Metrics look wrong** → paste the source table again, ask: *"Verify each number in the metrics section against the source. Flag any that don't match."*
- **Too cheerleading** → *"Cut every adjective. Just verbs and numbers."*
- **Generic asks** → *"Replace 'help with hiring' with three named roles and the profile we're looking for."*
