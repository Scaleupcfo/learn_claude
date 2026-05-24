## ① Prompt skeleton

Requires [Calendar](/setup/connectors/gcal) and [Drive](/setup/connectors/gdrive).

<PromptSkeleton fields="window=tomorrow, depth=high-stakes only, format=One-pager per meeting" template="Look at my calendar for [window]. For each meeting that's [depth] (external, customer, board, exec), produce a [format] brief.

For each meeting include:
1. Attendees (with role + company)
2. What this meeting is about (2 lines, from prior emails / docs in Drive)
3. The 3 questions I should be ready for
4. The 1 question I should ask
5. Any open commitments from prior interactions

Source: my Gmail and Drive. Don't invent — say 'no record' if nothing's there." />

## ② How to iterate

- After your first brief, ask: *"For [MEETING], pull the most recent doc we shared with [COMPANY] and summarize their reaction."*
- For recurring meetings, save a slash command or prompt template — same skeleton, different week.

## ③ How to use the briefs

**Claude Cowork:** run before your day starts. Copy briefs into a doc you keep open during meetings.

**Claude Code:** ask Claude to save each brief to `meeting-briefs/2026-10-24-acme.md` so you have an audit trail.

## ④ When things go wrong

- **Pulled stale context** → *"For [MEETING], ignore anything before [DATE]. Only use recent material."*
- **Too much for some meetings** → *"For 15-min internal meetings, just give me 3 bullets. Save the full brief for 30+ min external."*
