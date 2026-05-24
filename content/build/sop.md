## ① Prompt skeleton

<PromptSkeleton fields="processName=New employee onboarding, owner=People Ops, audience=Hiring managers and the new hire's buddy" template="Write a Standard Operating Procedure for '[processName]'. Owner: [owner]. Audience: [audience].

Sections:
1. Purpose (2 lines)
2. When this SOP applies (and when it doesn't)
3. Roles & responsibilities (table)
4. Step-by-step (numbered, with check-boxes)
5. Tools / templates / links
6. Definitions
7. Revision history (start with version 1, today's date)

Voice: imperative, second-person. Each step starts with a verb. If a step is 'optional', say so explicitly.

Inputs / current state notes:
[PASTE WHAT YOU HAVE]" />

## ② How to iterate

- Ask: *"Where can this SOP fail silently? Add a verification step after each risky action."*
- Cut steps that don't add value: *"If a step takes <30 seconds and is unambiguous, merge it into the previous one."*
- Get a real owner to review. SOPs that nobody owns rot fast.

## ③ How to publish the SOP

**Claude Cowork:** generate, copy into Notion / Confluence / Google Docs. Add to your wiki under a Process category.

**Claude Code:**
```bash
claude
# "Save as docs/sops/employee-onboarding.md and add a link in docs/sops/INDEX.md"
```

## ④ When things go wrong

- **Too generic** → *"Use the actual tools and people from our company: [list]. No placeholders."*
- **Too long** → *"Cut to 1 page. Move detail to an appendix."*
