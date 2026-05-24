# Learn Claude — for CXOs

A self-paced, 3-hour onboarding for executives to get comfortable with **Claude Code** and **Claude Cowork** — install, wire connectors, and ship a first real artifact across communications, presentations, numbers, and operations.

## Stack

- React 19 + Vite + TypeScript + Tailwind CSS
- Supabase (auth via Google OAuth, Postgres with RLS for per-user progress)
- Markdown content authored in `/content`, parsed at build with `react-markdown`
- PDF certificate via `@react-pdf/renderer`

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to ./dist
```

Copy `.env.example` to `.env.local` and fill in your Supabase project URL and publishable key.

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
```

## Database

The Postgres schema is at the project root in this README under "Schema" — apply it once in your Supabase project's SQL editor. Tables: `profiles`, `module_progress`, `checklist_items`, `build_artifacts`. All protected by Row-Level Security so each user only sees their own data.

A trigger auto-creates a profile row on signup. Google OAuth must be enabled in **Authentication → Providers** in your Supabase dashboard, and `/auth/callback` must be in your allowed redirect URLs.

## Deploying to Netlify

1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import from Git → pick this repo**. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set environment variables in Netlify: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.
4. After first deploy, add the Netlify URL to your Supabase project's **Authentication → URL Configuration → Redirect URLs**, and to your Google OAuth client's **Authorized JavaScript origins**.

## Content

Lessons live in `/content`:

- `modules/` — welcome, install, connectors index
- `connectors/` — one Markdown file per connector (17 connectors)
- `build/` — one Markdown file per build goal (23 goals across 4 columns)
- `glossary/glossary.json` — searchable jargon decoder
- `gallery/samples.json` — sample outputs grid
- `troubleshooting/common-fixes.md` — the "Stuck?" page

Custom Markdown tags supported in lessons:

- `<PromptSkeleton template="..." fields="audience, tone" />` — fillable prompt with copy button
- `<Term>MCP</Term>` — glossary tooltip
- `<Checkpoint id="install.ran">…</Checkpoint>` — persistent checkbox
- `<OSBlock>` — tabbed Mac/Windows/Linux code blocks
