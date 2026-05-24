## ① Prompt skeleton

A good document prompt does five things: defines the **audience**, the **length**, the **tone**, the **source material**, and the **success criterion**. Use the skeleton below — edit the placeholders, then copy.

<PromptSkeleton fields="audience=My executive team, length=500 words, tone=Direct and warm" template="Write a [length] memo for [audience].

Subject: [SUBJECT]

Source material (use only what's here — do not invent facts):
[PASTE NOTES, BULLETS, PRIOR DRAFT, ETC.]

Tone: [tone]. Use the second-person 'you' where natural. No corporate cliches. Short paragraphs.

The memo is successful if a reader can, in 60 seconds, tell me: (1) what is going on, (2) what I want them to do, (3) by when." />

## ② How to iterate

Your first draft will be close — never perfect. Here's how to get to "shippable" in 2-3 rounds:

- **Be specific about what to change.** Not "make it better" — "the second paragraph buries the lead. Move the decision to the first sentence."
- **Reference exact phrases.** "Replace 'as a result of the above factors' with something a human would say."
- **Ask for variants when stuck.** "Give me three different openings, each in a different tone."
- **Cut, don't add.** Most exec writing is too long. Ask: *"Cut 30% without losing meaning. Show only the new version."*

Before you ship, ask Claude: *"Read this back to me and tell me what's still vague."*

## ③ How to publish the document

**In VS Code / with Claude Code:**
```bash
claude
# Then in the prompt: paste your skeleton and the source material.
# Ask Claude to write to a file: "Save the final version as memo.md"
```

**In the browser (Claude Cowork):**
1. Open [claude.ai](https://claude.ai).
2. Paste your filled-in skeleton.
3. When happy, copy the output into Google Docs or Word. Or, if Drive/Docs is connected, ask Claude to create the doc directly.

To export to PDF: in Google Docs, **File → Download → PDF**.

## ④ When things go wrong

- **"It sounds like AI wrote it."** → Add to your prompt: *"Match the voice of the source material exactly. Don't summarize what's already concise."*
- **"It's burying the lead."** → *"Put the bottom line in the first sentence. Then explain."*
- **"It's hallucinating facts."** → *"Use only the facts in the source material. If you don't know something, write [TBD]."*
- **"It's too long."** → *"Cut to 250 words. Hard limit."*
