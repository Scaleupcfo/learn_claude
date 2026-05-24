## ① Prompt skeleton

Best with the [Google Sheets connector](/setup/connectors/gsheets).

<PromptSkeleton fields="modelType=3-year SaaS revenue model, scenarios=Low / Base / High, horizon=36 months" template="Build a [modelType] in Google Sheets. Horizon: [horizon]. Scenarios: [scenarios].

Structure:
- Tab 1 'Assumptions' — every input toggleable in one place
- Tab 2 'Calcs' — month-by-month build
- Tab 3 'Output' — summary: revenue, gross margin, cash, headcount, by quarter

Assumptions to use (do not invent):
[PASTE STARTING ASSUMPTIONS — pricing, churn, sales hiring plan, CAC, etc.]

Conventions:
- Every formula should reference Assumptions, never hard-code.
- Use named ranges for scenario toggles.
- Color: input cells blue, formulas black, outputs green." />

## ② How to iterate

- **Agree the structure in plain text first.** Don't let Claude build the sheet until you've nodded at the column layout in chat. Rebuilding sheets is painful.
- Test edge cases: *"What happens if churn doubles in month 12? Add a row that shows it."*
- Ask: *"Where are the most fragile formulas? Add a comment explaining each."*

## ③ How to run it

**Claude Cowork** creates the sheet at a URL you can open. Eyeball each tab. If it's right, save. If not, ask Claude to fix the specific cell range.

**Claude Code:** generate as `.xlsx` with `openpyxl` if you want offline:
```bash
claude
# "Build this model as a local xlsx file using openpyxl. Save as fy26-model.xlsx."
```

## ④ When things go wrong

- **Numbers don't tie out** → paste a screenshot of the output and ask: *"Why doesn't Q4 revenue equal sum of months 10-12?"*
- **Too many tabs** → *"Collapse to one Assumptions tab and one Output tab. Hide intermediate calcs."*
- **Scenario toggle broken** → *"The Low scenario shows the same as Base. Trace which cell isn't reading the scenario flag."*
