# Connect Google Sheets

(Bundled with Google Drive.)

## Verify

Open [claude.ai/settings/connectors](https://claude.ai/settings/connectors) and confirm **Google Drive** is connected. Sheets access comes with it.

<Checkpoint id="connector.gsheets.added">I've confirmed Sheets access.</Checkpoint>

## Try it now — financial-model patterns

```text
Open the sheet at [URL]. Tell me what model it is, the assumptions feeding it, and where the formula chain is most fragile.
```

```text
Build a new sheet titled "[NAME]" with three tabs: Assumptions, Calculations, Output. Use these assumptions: [PASTE]. Add scenario toggles for low/base/high.
```

> **Tip:** For complex models, paste the raw assumptions in a chat first, agree the structure with Claude in plain text, *then* ask it to create the sheet. Building the structure twice is wasted effort.
