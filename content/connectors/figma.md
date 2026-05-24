# Connect Figma

About 3 minutes. Lets Claude open Figma files, see your designs, generate frames, and propose edits — all without leaving the chat.

## Add the connector

1. Open [claude.ai/settings/connectors](https://claude.ai/settings/connectors).
2. Find **Figma** in the list. (If you don't see it, check the [Connectors directory](https://claude.ai/directory) and add it from there.)
3. Click **Connect** and sign in with your Figma account. Approve access.

<Checkpoint id="connector.figma.added">Figma is connected.</Checkpoint>

## What Claude can do via Figma

- 🔍 **See your designs** — given a Figma URL, Claude can read the frames, components, variables, and layer structure.
- 📸 **Get screenshots** — Claude can pull a rendered image of a frame so you both see exactly the same thing.
- ✏️ **Suggest edits** — copy changes, alignment fixes, restructured layouts.
- 🧩 **Generate frames** — propose mockups for a screen you haven't designed yet.

## Try it now — three starter prompts

**See and critique a design**
```text
Open this Figma file: [PASTE FIGMA URL].
Show me a screenshot of the [FRAME NAME] frame.
Then critique it as a [AUDIENCE — e.g. first-time mobile user] would experience it.
Be specific: hierarchy, copy, affordances, accessibility.
```

**Generate a first mockup**
```text
Create a Figma frame for a [SCREEN — e.g. login screen] for a [PRODUCT TYPE — e.g. fintech mobile app] aimed at [USER — e.g. small business owners]. Use a clean, modern style.
Show me a screenshot once it's generated.
```

**Iterate on a design**
```text
Take the [FRAME NAME] frame in [FILE URL] and produce three variants:
1) Simpler — fewer elements, more whitespace.
2) Premium — typography forward, muted palette.
3) Playful — illustrative, bolder colors.
Show screenshots of all three side by side.
```

## When it doesn't work

- **"Figma file not found"** — make sure the file's permissions allow your Figma account to view it. Try opening the URL in your browser first.
- **"Frame is too complex"** — ask Claude to focus on a specific frame or section: *"Just the header for now."*
- **Output looks generic** — give Claude a reference: *"Match the style of [URL of a design you like]."*

You're set. Try the **[UI mockup via Figma](/build/figma-mockup)** goal to ship your first design.
