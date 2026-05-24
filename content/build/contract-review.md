## ① Prompt skeleton

<PromptSkeleton fields="contractType=SaaS Master Services Agreement, party=Acme Inc (we are the vendor), riskTolerance=Mid-market reasonable" template="Review the attached [contractType]. We are: [party]. Our risk tolerance: [riskTolerance].

Produce:
1. **Risk summary** — top 5 risks, ranked. For each: clause reference, plain-English description, business impact, suggested change.
2. **Redlines** — markup the contract with specific edits, in [tracked-changes / inline brackets] format.
3. **Open questions** — anything legal counsel must decide that AI shouldn't.
4. **Acceptable as-is** — clauses that are fine; don't waste lawyer time on these.

Be specific. 'This is risky' is not useful — 'Section 8.2's indemnity is uncapped, recommend a 12-month-fees cap' is.

Contract text:
[PASTE FULL CONTRACT]" />

## ② How to iterate

- Always have a real lawyer review before signing. Claude is a strong first pass, not a substitute.
- For complex clauses: *"Explain Section 7 in plain English, then describe two scenarios where it could hurt us."*
- Ask: *"What's missing that a careful counterparty would have included?"*

## ③ How to apply the redlines

**Claude Cowork** for the review.

**Claude Code:**
```bash
claude
# "Open contracts/acme-msa.docx, do a redline pass, save as acme-msa-redlined.docx"
```

## ④ When things go wrong

- **Generic redlines** → paste 2-3 examples of how your lawyers usually negotiate this clause. Claude will match the style.
- **Missing context** → tell Claude what kind of relationship this is: one-off, strategic, long-term, etc. Risk calibration changes.
- **Privileged content** — if the contract is sensitive, use Claude Cowork in your work account, not personal.
