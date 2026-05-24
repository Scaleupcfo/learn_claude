## ① Prompt skeleton

Requires [Google Slides](/setup/connectors/gslides) (or Microsoft 365).

<PromptSkeleton fields="meeting=Q3 board, slideCount=14, style=Minimal, large type, dark text on white" template="Create a [slideCount]-slide deck for the [meeting]. Style: [style].

Slide-by-slide outline (use these headers verbatim):
1. Cover — company, quarter, date
2. Agenda
3. CEO message — 1 sentence per priority area, 3 priorities
4. Quarter in review — what shipped, what didn't
5. Financials — revenue, cash, runway, plan vs actual
6. KPIs — 5 charts in a 2x3 grid
7. Customers — wins + losses
8. Product — 2-3 things, what's next
9. Team — headcount changes, key hires
10. Risks — 3 risks, mitigations
11. Asks — 3 specific asks of the board
12. Q&A
13. Appendix divider
14. Backup detail

Source material:
[PASTE]

Rules:
- Every slide header should be a takeaway sentence, not a topic.
- Max 5 bullets per slide. Max 8 words per bullet.
- If a slide can be a chart, describe the chart — don't bullet it." />

## ② How to iterate

- After Claude generates the deck, ask: *"Open slide 5 and rewrite the header to be a sentence."* Do that for each topic-style header.
- Ask: *"Which 3 slides will get the most pushback from a sophisticated board? Strengthen them."*
- For visuals: *"Suggest a chart type for the KPI slide. Describe what it should show."*

## ③ How to run it

**Claude Cowork:** Claude will create the actual Slides file. Open the link, polish, present.

**Claude Code:**
```bash
claude
# "Generate the deck as a markdown outline first. Once I approve, push to Google Slides."
```

For PowerPoint instead, use the [Microsoft 365 connector](/setup/connectors/ms365) — same prompt, different connector.

## ④ When things go wrong

- **Too text-heavy** → *"Rewrite every slide with no more than 25 words total."*
- **Tone is off for the board** → *"Imagine [INVESTOR NAME] is reading this. Adjust the tone."*
- **Charts described, not generated** → that's expected — finish them in the actual slide app.
