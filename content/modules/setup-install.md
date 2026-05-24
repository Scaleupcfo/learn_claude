# Install Claude Code

About 15 minutes. You'll install Claude Code on your laptop, sign in, and run your first prompt.

## What you're installing

Claude Code is a small command-line app that lets Claude read and edit files on your computer and run commands you approve. It's distributed by Anthropic.

> **What about Claude Cowork?** No install needed — it lives in the browser at [claude.ai](https://claude.ai). You're already signed in if you signed into this platform with Google. We'll use it later.

## 1 — Open your terminal

You'll type a few commands. The "terminal" is the black-text app on your computer.

<OSBlock>
```bash mac
# Press Cmd + Space, type "Terminal", press Enter.
echo "Hello — you are in the terminal."
```
```powershell windows
# Press Win key, type "PowerShell", press Enter.
Write-Host "Hello — you are in the terminal."
```
</OSBlock>

<Checkpoint id="install.opened-terminal">My terminal is open and I can type into it.</Checkpoint>

## 2 — Install Claude Code

<OSBlock>
```bash mac
# Recommended: install via Homebrew. If brew isn't installed, follow https://brew.sh first.
brew install --cask claude-code
```
```powershell windows
# Use winget (built into Windows 10/11).
winget install --id Anthropic.ClaudeCode -e
```
</OSBlock>

> If the command above doesn't work, see the [official install docs](https://docs.claude.com/en/docs/claude-code/quickstart) and pick the method that matches your machine. Open this page in a browser when you do — the docs are kept up to date.

<Checkpoint id="install.installed">The install command finished without errors.</Checkpoint>

## 3 — Sign in and say hello

Open Claude Code and sign in with your Anthropic account.

```bash
claude
```

The first time you run it, you'll be prompted to sign in via your browser. Once you're back in the terminal, type a simple prompt:

```text
Hello — what can you help me with today?
```

You should see a response within seconds. Congratulations — you've just talked to Claude on your machine.

<Checkpoint id="install.first-reply">I got a reply from Claude in the terminal.</Checkpoint>

## 4 — Optional: install the VS Code extension

If you use VS Code, install the Claude Code extension for a richer editing experience. Skip this if you're not a VS Code user — you do not need it.

```bash
# In VS Code: Cmd/Ctrl + Shift + X, search "Claude Code", install.
```

## When it doesn't work

- **`command not found: claude`** — Close and re-open your terminal so the new PATH is loaded.
- **Sign-in loops forever** — Sign out of all Anthropic accounts at [claude.ai](https://claude.ai), then `claude` again.
- **Anything else** — Tap the **🆘 Stuck? Get help** button at the bottom right.

When the three checkboxes above are ticked, you're done. Next: wire your connectors.
