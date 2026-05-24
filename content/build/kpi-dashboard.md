## ① Prompt skeleton

Requires [Google Sheets](/setup/connectors/gsheets).

<PromptSkeleton fields="company=Series A SaaS, viewer=CEO weekly, kpis=ARR, new MRR, churn $, NRR, runway months" template="Build a CEO KPI dashboard in Google Sheets. Audience: [viewer]. Company stage: [company]. KPIs to show: [kpis].

Structure:
- Tab 1 'Raw' — paste the weekly data here
- Tab 2 'Dashboard' — clean view with the 5 numbers, week-over-week change, sparkline
- Tab 3 'Trend' — small multiple charts (one per KPI) over the last 12 weeks

Style: minimal, monospace numbers, no chart junk. The dashboard should fit on one screen without scrolling.

Source data:
[PASTE 4-12 WEEKS OF NUMBERS]" />

## ② How to iterate

- **Five numbers, not 50.** If you're tempted to add a 6th KPI, drop a current one.
- Ask: *"What's the most important number on this dashboard? Make it visually 2x the others."*
- Add a thresholds row: *"If churn > 2%, color the cell red. If NRR < 110%, color amber."*

## ③ How to run it

Open the sheet Claude created. Bookmark it. Update once a week (or wire it to your data source so it self-updates).

## ④ When things go wrong

- **Cluttered** → *"Hide tab 'Raw' and the intermediate columns. Show only the dashboard."*
- **Numbers don't update** → check that you're pasting into the same range each week.
