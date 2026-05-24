# Troubleshooting & escape hatches

When things feel stuck, you usually need one of five moves. They're listed in the order to try them.

## 1. Try Claude in the browser

If Claude Code is misbehaving — strange errors, frozen output, weird file edits — switch to [claude.ai](https://claude.ai). Paste the same prompt. You'll often get unstuck in 30 seconds.

<Checkpoint id="help.tried-browser">I've opened claude.ai in a tab and bookmarked it for emergencies.</Checkpoint>

## 2. Show, don't tell — paste a screenshot

Claude is multimodal. When words aren't working, paste a picture.

- **macOS:** `Cmd + Shift + 4` to capture a region, then `Cmd + V` into Claude.
- **Windows:** `Win + Shift + S` to snip, then `Ctrl + V` into Claude.

A single screenshot of what's wrong is worth two paragraphs of description.

## 3. Start a fresh chat

If Claude is going in circles, the conversation has too much old context muddying the water. Start a new chat and use this reset prompt:

```text
I was working on [WHAT YOU WERE DOING].

Here's what I have so far:
[PASTE THE LATEST GOOD OUTPUT]

Here's what I want next:
[GOAL — be specific about format, length, audience]

Please proceed from here.
```

## 4. Cut the prompt in half

Most "stuck" moments come from over-specifying. Read your prompt out loud. If a sentence isn't doing work, delete it. Try again.

## 5. Common errors → fixes

| Symptom | Fix |
|---|---|
| `claude: command not found` | Re-open your terminal so it picks up the new PATH. If that fails, re-run the install from [Setup → Install](/setup/install). |
| OAuth callback fails | Sign out, clear cookies for claude.ai, sign in again. |
| Connector says "permission denied" | Re-authorize the connector from [Setup → Connectors](/setup/connectors). Permissions can lapse. |
| Claude refuses or "can't help" | Reframe: state your role and intent. "I'm the CEO doing X for Y — here's the context…" usually unblocks it. |
| Output is too long / verbose | Add: *"Reply in under 200 words. No preamble."* |
| Output is too short / shallow | Add: *"Take your time. Think step by step. Show your reasoning."* |
| File edits broke something | In Claude Code, ask: *"Revert the last change to file X."* It can usually undo. |

## Still stuck?

Email the person who shared this platform with you. A 2-minute screen-share fixes 90% of remaining problems.
