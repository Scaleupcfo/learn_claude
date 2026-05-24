## ① Prompt skeleton

Requires the [Figma connector](/setup/connectors/figma).

<PromptSkeleton fields="screen=Login screen, product=A B2B SaaS dashboard for finance teams, style=Clean, modern, generous whitespace, reference=https://stripe.com" template="Create a Figma frame for a [screen] for [product]. Style: [style]. Reference for visual vibe: [reference].

Include:
- Page title and subtitle
- Primary input fields (label clearly what they are for this screen)
- One primary CTA, one secondary action
- Trust signals (logos, security badge, or testimonial — pick what fits)
- Footer with key links

After generating: show me a screenshot of the frame and a 3-bullet critique of where it might fall short for a first-time user." />

## ② How to iterate

- **See before you guess.** Always ask: *"Show me a screenshot of the [FRAME] frame."* Then critique together.
- **Iterate in small jumps.** "Make the primary CTA bigger." → screenshot → "Now soften the corner radius." → screenshot.
- **Use real reference images.** Paste a screenshot of a design you like: *"Match the typography hierarchy of this."*
- **Generate variants for hard decisions.** *"Show me three layouts — left-aligned, centered, and split-screen. Screenshots side by side."*

> **Figma-specific tip:** Claude is much better at editing existing frames than creating from scratch. If you have any base design, point Claude at it first.

## ③ How to use the Figma file

**Claude Cowork** is the natural place for this — Figma renders inline.

**Claude Code** if you're also editing the front-end code that implements the design:
```bash
claude
# "Open the Figma file at [URL], pull the components/colors, and update src/components/Login.tsx to match."
```

## ④ When things go wrong

- **"Figma file not found"** → check sharing settings on the file; your Figma account needs view/edit access.
- **Designs look generic** → give Claude a stronger reference: *"Match the visual style of [URL OF A DESIGN YOU LIKE]."*
- **Claude won't generate, only critiques** → start with a blank frame yourself, then ask Claude to fill it in.
- **Layers are messy** → ask: *"Clean up the layer names and group related elements."*
