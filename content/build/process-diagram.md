## ① Prompt skeleton

<PromptSkeleton fields="processName=Customer onboarding, swimlanes=Sales, CS, Finance, Customer" template="Create a Mermaid diagram for the '[processName]' process. Use swimlanes: [swimlanes].

Show:
- Each step as a node
- Who owns each step (which swimlane)
- Decision points as diamonds
- Hand-offs as arrows with labels

Source steps:
[PASTE THE PROCESS STEPS]

Output as a Mermaid code block I can paste into Notion or any Mermaid renderer." />

## ② How to iterate

- Ask: *"Where in this diagram does the process most likely break? Add a red note at each weak point."*
- For complex processes, split into two diagrams (happy path vs. exception flows).

## ③ How to publish the diagram

Copy the Mermaid block. Paste into:
- **Notion** — start a Mermaid block (`/code`, language: Mermaid).
- **GitHub / GitLab** — paste in a Markdown file inside a ```` ```mermaid ```` block.
- **Online preview** — [mermaid.live](https://mermaid.live).

For an image: render in mermaid.live → Actions → Download PNG/SVG.

## ④ When things go wrong

- **Diagram is too dense** → *"Limit each lane to 6 nodes. If a lane needs more, split it into a sub-diagram."*
- **Decisions look wrong** → *"After each decision diamond, show all possible paths, not just the common one."*
