# Connect Jira

About 3 minutes. Lets Claude pull issues and sprint info from your Jira instance.

## Add the connector

1. Open [claude.ai/settings/connectors](https://claude.ai/settings/connectors).
2. Find **Jira** (Atlassian) and click **Connect**.
3. Sign in. If you're on Jira Cloud, OAuth is one click. Server / Data Center may need an admin token — talk to your IT.

<Checkpoint id="connector.jira.added">Jira is connected.</Checkpoint>

## Try it now

```text
Open the [PROJECT KEY] Jira project. Give me a one-page status for the current sprint: scope, completed points, blockers, risks.
```

```text
Find all Jira issues older than 90 days with no recent activity. Propose which ones to close vs. revive.
```
