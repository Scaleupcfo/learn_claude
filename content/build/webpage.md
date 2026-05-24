## ① Prompt skeleton

<PromptSkeleton fields="pageType=Landing page for a B2B SaaS, audience=CFOs at mid-market companies, primaryAction=Book a demo, style=Calm, premium, generous whitespace" template="Create a single-file HTML landing page.

Page type: [pageType]
Audience: [audience]
Primary CTA: [primaryAction]
Style: [style]

Sections (in order):
1. Hero — headline (8-12 words), sub-headline (1 sentence), primary CTA, optional small social proof line
2. Three benefits with icons (use inline SVG)
3. Social proof (logo strip OR a 1-line quote)
4. How it works — 3 steps
5. FAQ — 4-6 questions
6. Final CTA

Tech rules:
- One file, self-contained: HTML + inline CSS + tiny inline JS only if needed.
- Modern, accessible HTML. No frameworks.
- Mobile-first. Test mentally at 375px wide.
- No tracking or external scripts." />

## ② How to iterate

- Ask: *"Generate 3 hero headlines, each with a different emotional angle. Show them all."*
- For style: *"Match the visual feel of [URL — e.g. stripe.com] without copying their copy."*
- For polish: *"Increase whitespace between sections. Use 80px vertical padding on each section."*

## ③ How to publish the page

**Non-VS-Code users:** Claude returns the HTML. Copy it. Save it as `index.html` on your computer. Double-click to open in any browser.

To share it with the world:
- Drag the file onto [Netlify Drop](https://app.netlify.com/drop) → get a public URL in 30 seconds.

**VS Code users:**
```bash
claude
# "Build a landing page, save as index.html. Then start a local server on port 3000."
```
Open `http://localhost:3000` in your browser.

## ④ When things go wrong

- **Looks dated** → *"Modernize: bigger type (heading 64px+), tighter line-height, more whitespace, fewer colors."*
- **Doesn't work on mobile** → *"Show the CSS for screens under 768px. Fix any horizontal overflow."*
- **Broken on open** → make sure you saved the file with `.html` extension (not `.txt`).
