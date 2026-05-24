## ① Prompt skeleton

<PromptSkeleton fields="newsType=funding announcement, audience=Tech press and prospective customers, location=Bengaluru" template="Write a press release for a [newsType].

The five W's:
- Who: [COMPANY NAME], [ONE-LINE DESCRIPTION]
- What: [WHAT'S BEING ANNOUNCED]
- When: [DATE]
- Where: [location]
- Why it matters: [IMPACT IN ONE SENTENCE]

Include:
- Headline (8-12 words)
- Sub-headline (1 sentence)
- Lead paragraph (the 5 W's in one paragraph)
- 2-3 supporting paragraphs
- 1 quote from [SPOKESPERSON, TITLE]
- 1 quote from [CUSTOMER or PARTNER]
- Boilerplate paragraph about [COMPANY]
- Media contact: [NAME, EMAIL]

Tone: factual, no hyperbole. Journalists hate adjectives — every claim must be specific." />

## ② How to iterate

- Headlines are 90% of the work. Ask: *"Give me five alternative headlines, each emphasizing a different angle."*
- Quotes should sound like a human, not a press release. *"Rewrite the CEO quote as if said over coffee."*
- If the press release feels long, it is. *"Cut to 350 words."*

## ③ How to distribute the press release

**Claude Cowork:** iterate in chat, copy into your distribution tool (PR Newswire, your website CMS, or a doc to send journalists).

**Claude Code:**
```bash
claude
# "Save as pr/2026-10-funding-announcement.md and also create a PDF version."
```

## ④ When things go wrong

- **Reads like a brochure** → *"Remove all marketing copy. Stick to facts a journalist could verify."*
- **Quotes sound fake** → *"Make the quote sound like the actual person — paste their LinkedIn-About below as the voice reference."*
