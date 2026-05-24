## ① Prompt skeleton

<PromptSkeleton fields="meeting=Q3 2026 board meeting, audience=Board (4 investors, 2 independents), length=8 pages" template="Build a board pre-read for the [meeting].

Audience: [audience]. They have 30 minutes to read this on a plane. Length: [length].

Required sections (in this order):
1. Cover + agenda (1 page)
2. CEO letter / TL;DR (1 page)
3. Business update — what changed since last board (1-2 pages)
4. Financials — actuals vs plan, cash, runway (1 page)
5. KPIs — top 5 metrics with trendlines (1 page)
6. Risks & asks — 3 risks, 3 specific asks (1 page)
7. Appendix — supporting detail (optional)

Source material:
[PASTE LATEST METRICS, EXEC TEAM NOTES, PRIOR BOARD ACTIONS]

Style: every section header should be a sentence (the takeaway), not a topic. E.g. 'Revenue grew 18% QoQ driven by enterprise expansion' — not 'Revenue Update'." />

## ② How to iterate

- After draft 1, ask: *"Pretend you're [INVESTOR NAME] reading this. What's the first question you'd ask in the meeting?"* — then strengthen the answer in the doc.
- Trim asks ruthlessly. If you have 6 asks, you have 0. Pick 3.
- Add page numbers and a 1-line footer with the company name and confidentiality marker.

## ③ How to assemble the board pre-read

**Claude Cowork:** assemble in chat → copy to Google Docs → File → Download → PDF.

**Claude Code:**
```bash
claude
# "Generate the pre-read as a markdown file, then convert to PDF using pandoc."
```

If you connected Google Slides earlier, you can also ask Claude to render the pre-read as a deck instead.

## ④ When things go wrong

- **Too text-heavy** → *"Replace any list of more than 4 bullets with a table or chart description."*
- **Reading like a status report** → *"Each section should answer 'so what'. Add the implication after each fact."*
- **Numbers don't tie out** → paste the source numbers again, ask Claude to verify and flag mismatches.
