## ① Prompt skeleton

Requires the [Gmail connector](/setup/connectors/gmail).

<PromptSkeleton fields="purpose=Reconnect with dormant customers, segment=Customers inactive for 60+ days, tone=Warm and brief" template="I need to send a personalized email to each person in this list. Purpose: [purpose]. Audience segment: [segment]. Tone: [tone].

For each person:
1. Pull their last interaction from Gmail (or note 'no prior thread').
2. Draft a 5-sentence email that references something specific from that history.
3. Use this opener style: [PASTE 1-2 EXAMPLE OPENERS YOU LIKE]
4. End with a single question or call-to-action.

List of people:
[PASTE EMAILS, ONE PER LINE]

Output as a table: name | email | draft subject | draft body. Do not send anything. I will review each one." />

## ② How to iterate

- Always have Claude **draft, never send** for the first run. Spot-check 3 emails. If 2 are good, the rest probably are too. If 2 are bad, fix the prompt and re-run.
- For tighter personalization: *"For each person, include a sentence referencing the most recent topic from our thread — quote a 5-7 word phrase."*
- To match your voice, paste 3 sent emails of yours and say: *"Match this voice."*

## ③ How to send the emails

**Claude Cowork:** generate the table → spot-check → for the ones you approve, ask Claude to send (or copy/paste into Gmail yourself for the first batch).

**Claude Code:**
```bash
claude
# "Generate drafts and save as a CSV. I'll import to my mail merge tool."
```

## ④ When things go wrong

- **Emails feel templated** → *"Read each one back. If two emails are >60% the same, rewrite one to be different."*
- **Pulled wrong context** → *"For [PERSON], the relevant thread is [DATE]. Use that one specifically."*
- **Worried about sending the wrong thing** → always keep one safety word in your prompt: *"Never send. Always draft for my review."*
