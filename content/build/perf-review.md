## ① Prompt skeleton

<PromptSkeleton fields="role=Engineering Manager, cycle=H2 2026, tone=Direct, kind, specific" template="Draft a performance review for an [role] for [cycle]. Tone: [tone].

Inputs (use only these — do not invent):
- My private notes on this person: [PASTE]
- Their self-review: [PASTE]
- Peer feedback summary: [PASTE]
- Their goals from start of cycle: [PASTE]

Structure:
1. Headline: one sentence — what kind of cycle was this?
2. Strengths (2-3, each with a specific example)
3. Areas to grow (1-2, each with a specific example and a coaching ask)
4. Goals for next cycle (3 maximum)
5. Calibration note (just for me — what rating I'm leaning toward and why)

Rules: every claim must be supported by a specific example from the inputs. If you don't have evidence for a claim, leave it out." />

## ② How to iterate

- Ask: *"Read this back and tell me where I'm being vague. Force me to be specific."*
- For tough feedback: *"Rewrite this section to be both honest and kind. Don't soften the message."*
- Always edit before delivering. Reviews are signed by you, not Claude.

## ③ How to run it

**Claude Cowork** is best — private mode (do not connect this conversation to public connectors).

## ④ When things go wrong

- **Generic** → paste more specifics from your notes. Claude can only be as concrete as your inputs.
- **Calibration unclear** → *"Compare this person's evidence to the leveling guide [PASTE GUIDE]. Suggest a rating with reasoning."*
