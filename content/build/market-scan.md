## ① Prompt skeleton

<PromptSkeleton fields="market=Mid-market HRIS in India, depth=Strategic overview for a board update, competitors=List 5 key players" template="Produce a [depth] on the [market] market.

Cover:
1. Market shape — size, growth rate, key segments (cite sources)
2. Competitors: [competitors] — 1-paragraph profile + strengths/weaknesses each
3. Customer pain points and unmet needs
4. Where we win and where we don't (assume we are [YOUR COMPANY DESCRIPTION])
5. Three strategic implications for our next 12 months

Tone: senior strategy consultant, not blog post. Cite sources inline. Flag anything where you're uncertain." />

## ② How to iterate

- **Always ask for sources.** *"For each fact, give me the source URL. If you can't find one, mark it 'unverified'."*
- For depth: *"Pick the one most surprising insight and write a full page on it."*
- For board use, ask: *"What's the one chart that would communicate this most clearly?"* Then build it separately.

## ③ How to run it

**Claude Cowork** is best — Claude can search the web. Open at [claude.ai](https://claude.ai).

**Claude Code** for a saved repo version: ask Claude to save the scan as `research/2026-10-market-scan.md`.

## ④ When things go wrong

- **Sources are flaky** → *"Only use sources from the last 24 months. Discard everything older."*
- **Reads like a Wikipedia dump** → *"Cut anything I could have found in 5 minutes on Google. Lead with the non-obvious."*
- **No clear implications** → *"For each market insight, add a 'so what for us' sentence."*
