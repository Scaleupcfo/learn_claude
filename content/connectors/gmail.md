# Connect Gmail

About 3 minutes. Lets Claude read, draft, search, and reply to email.

## Add the connector

1. Open [claude.ai/settings/connectors](https://claude.ai/settings/connectors).
2. Find **Gmail** in the list and click **Connect**.
3. Sign in with the Google account whose inbox you want Claude to use.
4. On the Google consent screen, review the permissions and click **Continue**.

<Checkpoint id="connector.gmail.added">Gmail is connected.</Checkpoint>

## What Claude can and can't see

- ✅ Can read messages, search threads, draft replies, and (with your confirmation) send mail.
- ❌ Will not auto-send anything without you reviewing it first.
- ❌ Cannot access other Google accounts you didn't connect.

## Try it now — two starter prompts

```text
Summarize my unread inbox from the past 24 hours into three buckets: needs reply today, needs reply this week, FYI only.
```

```text
Find the most recent thread with [PERSON / COMPANY] and draft a polite reply that confirms the meeting and asks two clarifying questions: [Q1], [Q2].
```
