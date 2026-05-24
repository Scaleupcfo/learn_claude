# Connect Zapier / Make

About 5 minutes. Lets Claude trigger workflows across thousands of apps you've already wired up.

## Add the connector

1. Open [claude.ai/settings/connectors](https://claude.ai/settings/connectors).
2. Find **Zapier** (or **Make**) and click **Connect**.
3. Sign in to your Zapier/Make account.
4. In Zapier, you may also need to enable specific "AI Actions" you want Claude to be able to trigger. Start with 2-3, not 50.

<Checkpoint id="connector.zapier.added">Zapier / Make is connected and I've enabled the AI Actions I want.</Checkpoint>

## What this unlocks

Any app Zapier or Make supports — Airtable, Pipedrive, Mailchimp, Typeform, hundreds of others — becomes reachable through Claude indirectly. Useful when there's no first-party connector.

## Try it now

```text
Using my Zapier actions, find every form submission from [TYPEFORM/FORM NAME] in the last 7 days and create a summary row in [SHEET URL] with name, email, key answer, and a one-line classification.
```
