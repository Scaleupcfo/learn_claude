A Functional Specification (FS) document in SAP style is a clear handover from business to technical teams: what the system does today, what it should do tomorrow, and how a developer should build it. It's one of the highest-leverage docs a CXO or BA can ship — get it right and the implementation takes half as long.

The prompt below is structured in **5 editable steps**. Edit any step. The full prompt updates live.

## ① Your 5-step prompt

<StepwisePrompt>
[
  {
    "title": "Role",
    "description": "Who Claude should pretend to be",
    "template": "You are a senior SAP functional consultant with 15+ years of experience writing Functional Specification documents in [MODULE — e.g. FICO / MM / SD / HR]. You write in clear, structured business English a developer can implement from."
  },
  {
    "title": "Goal",
    "description": "What we're producing",
    "template": "Write a Functional Specification (FS) document for the following business requirement:\n\n[BRIEFLY DESCRIBE THE REQUIREMENT IN 1-3 SENTENCES]\n\nDeliver a complete FS doc that a developer in the offshore team could pick up and start building from, with no follow-up questions."
  },
  {
    "title": "Context",
    "description": "Background, current state, target state",
    "template": "Background:\n- Company: [COMPANY NAME], industry: [INDUSTRY]\n- SAP environment: [S/4HANA on-prem / S/4HANA cloud / ECC 6.0]\n- Module(s) involved: [LIST]\n- Stakeholders: [BUSINESS OWNER], [PROCESS OWNER], [IT OWNER]\n\nCurrent state (As-Is):\n[DESCRIBE HOW THE PROCESS WORKS TODAY, INCLUDING ANY PAIN POINTS]\n\nTarget state (To-Be):\n[DESCRIBE THE PROCESS AFTER THIS CHANGE]\n\nReference materials (use as ground truth, do not invent beyond these):\n[PASTE TICKETS, EMAILS, MEETING NOTES, EXISTING DOC LINKS]"
  },
  {
    "title": "Format",
    "description": "Exact section structure to follow",
    "template": "Structure the document with these section headers, in this order:\n\n1. Cover Page — title, FS ID, version, author, date, approver(s)\n2. Document Control — revision history table\n3. Overview — 3-5 sentences on what this FS covers and why\n4. Scope & Objectives — what's in scope, what's explicitly out of scope\n5. Business Process — As-Is and To-Be (process flow described step by step)\n6. Functional Requirements — numbered list (FR-001, FR-002, …) with: requirement, priority (Must / Should / Could), acceptance criteria\n7. Inputs & Outputs — tables of input fields and output fields with data types, mandatory/optional, validation rules\n8. Business Rules & Validations — numbered list (BR-001, …) of the logic\n9. Integration Touchpoints — upstream and downstream systems, interfaces, data flows\n10. Authorizations & Roles — who can do what\n11. Reporting & Audit — what gets logged, what reports are needed\n12. Test Scenarios — table: scenario ID, description, input, expected output\n13. Open Items & Assumptions — anything unresolved, plus assumptions you made\n14. Appendix — mockups, sample data, references\n\nUse SAP-standard terminology. Number every requirement, rule, and test scenario so they can be referenced in implementation tickets."
  },
  {
    "title": "Constraints",
    "description": "Quality bar and what to avoid",
    "template": "Quality bar:\n- Write in clear business English. A developer with limited domain knowledge should understand it.\n- Be specific. 'The system should validate the data' is not useful — 'The system must validate that the GL account exists in T-table SKA1 for company code [BUKRS]' is.\n- If you don't know something, write '[OPEN ITEM: …]' rather than inventing.\n- Every functional requirement must have at least one matching test scenario.\n\nDo not:\n- Invent transaction codes, table names, or BAPIs that don't exist.\n- Use marketing language ('seamless', 'world-class', 'cutting-edge').\n- Skip the As-Is description even if obvious — the offshore team may not have context.\n\nLength: aim for 6-12 pages. Cut anything that doesn't help the developer build it correctly."
  }
]
</StepwisePrompt>

## ② How to iterate

Your first draft will be 80% there. Tighten in 2-3 rounds:

- **Catch hallucinations.** SAP is full of specific transaction codes (e.g. *MIRO*, *FB60*, *VA01*) and tables (*BSEG*, *MARA*, *VBAK*). Ask Claude: *"For each transaction code and table name you used, tell me where it appears in the SAP module I specified. If you can't verify it, flag it as [VERIFY]."*
- **Pressure-test the requirements.** *"For each FR-XXX, write one realistic edge case that would break a naive implementation. Add a business rule that handles it."*
- **Reality-check the test scenarios.** *"For each test scenario, identify the FR it validates. Any FR with no matching test scenario, add one."*
- **Get the stakeholder voice right.** Paste an example FS from your team and ask: *"Match the writing style and section depth of this reference doc."*

## ③ How to create the FS doc

Once the prompt is dialled in, two paths — pick whichever fits how you work.

**If you don't use VS Code (most CXOs):**
1. Open [claude.ai](https://claude.ai) in your browser.
2. Paste the full prompt from the **"Your final prompt"** box above.
3. Claude will produce the FS doc as a single response. Read it once end-to-end.
4. Iterate using the patterns in section ② above.
5. When happy, copy the final doc into your standard FS template (Word/Confluence/SharePoint).
6. To export as a PDF: paste into Word → File → Save As → PDF.

**If you use VS Code (or want it in version control):**
```bash
claude
```
Then in the prompt:
```text
Build the FS doc described in fs-prompts/RICEFW-042.md and save the result as fs-docs/RICEFW-042-v1.md.
```

You can keep multiple FS docs in `fs-docs/` and version them with git. Optional next step: convert to .docx with `pandoc`:
```bash
pandoc fs-docs/RICEFW-042-v1.md -o fs-docs/RICEFW-042-v1.docx
```

## ④ When things go wrong

- **Sections are too thin** → *"Expand section 6 (Functional Requirements). Each FR should have a 1-paragraph justification, not just a one-liner."*
- **Sections are too verbose** → *"Cut section 5 by 40% without losing precision. Tables wherever possible instead of prose."*
- **Mix of conflicting SAP modules** → *"You're mixing FICO and MM terminology. Stick to MM only — refactor."*
- **'Could' requirements drowning the doc** → *"Move every 'Could' priority requirement to a separate 'Future enhancements' section. Keep the core doc focused on Must / Should."*
- **Developer keeps asking questions after handoff** → for each question they asked, add the answer back to your prompt under Context, regenerate, and re-distribute the v2.
