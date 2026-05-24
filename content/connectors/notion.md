# Connect Notion

About 2 minutes. Lets Claude read and write across your Notion workspace.

## Add the connector

1. Open [claude.ai/settings/connectors](https://claude.ai/settings/connectors).
2. Find **Notion** and click **Connect**.
3. Sign in. On the Notion permission screen, **select which pages/databases Claude can access** — be deliberate; default is "all pages".

<Checkpoint id="connector.notion.added">Notion is connected and I've scoped which pages Claude can see.</Checkpoint>

> **Tip:** Most CXOs grant access to a single "AI" parent page and move things into it as needed. Easier to reason about than blanket access.

## Try it now

```text
Open my "OKRs" Notion database and summarize Q3 progress: what's on track, at risk, and missed. Tag each item with an owner.
```

```text
Create a new Notion page in [PARENT PAGE] titled "[TITLE]". Use this outline: [PASTE]. Match the style of my existing meeting-notes pages.
```
