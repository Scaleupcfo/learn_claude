## ① Prompt skeleton

Requires the [Canva connector](/setup/connectors/canva).

<PromptSkeleton fields="purpose=Sales sheet for [PRODUCT], audience=Mid-market buyers, style=Use my Canva Brand Kit" template="Create a one-page sales sheet in Canva.

Purpose: [purpose].
Audience: [audience].
Style: [style].

Sections:
1. Headline (8-12 words, customer-benefit framed)
2. Sub-headline (1 sentence)
3. 3 short benefit blocks with icons
4. Social proof (logo strip or quote)
5. Call to action (1 button, 1 URL)

Voice: skip jargon. Use second person ('you'). One specific number in each benefit if possible." />

## ② How to iterate

- Ask Claude: *"Show me 3 headline variants — emotional, rational, and metric-driven."*
- For social proof, paste actual quotes. Don't let Claude invent customer names.

## ③ How to run it

Claude creates the Canva file. Open the URL Claude returns, review, polish manually for spacing/icons, then download as PDF or PNG.

## ④ When things go wrong

- **Layout is off** → that's expected — finish in Canva. Claude is great at copy, decent at layout.
- **Brand colors not applied** → confirm in your Canva account that you have a Brand Kit set, and ask Claude: *"Use my Brand Kit colors and fonts."*
