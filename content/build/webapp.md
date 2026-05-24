## ① Prompt skeleton

<PromptSkeleton fields="appType=Internal expense lookup tool, users=Our finance team, mustDo=Search by vendor; filter by month; export selected rows to CSV, tech=React + Vite + Tailwind, simple, no backend" template="Build a [appType] for [users].

Must do: [mustDo]
Tech: [tech]
Data source: a CSV I'll paste in — load it into memory at start.

UX:
- One screen. No login.
- Search bar at top, filters below, results table.
- Selected rows are highlighted; an Export button downloads them as CSV.
- Keep it clean and professional. Avoid card sprawl.

Build:
- Single Vite + React + Tailwind project.
- All code in one or two files if possible.
- A README with the two commands to run." />

## ② How to iterate

- Always start with the smallest version that works end-to-end. Then add filters, sorting, export.
- For changes: *"In the filter row, add a date picker that filters the table."*
- To redesign: *"Show me three visual variants of the results table. I'll pick one."*

## ③ How to run it

**Non-VS-Code users:**
1. Install Node.js if you don't have it: [nodejs.org](https://nodejs.org). Pick the LTS.
2. Open your terminal in the folder Claude created.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the URL it prints (usually `http://localhost:5173`).

**VS Code users:** open the folder in VS Code, hit the terminal pane (Ctrl/Cmd + `), run the same commands.

To share publicly: drag the `dist` folder (after `npm run build`) onto [Netlify Drop](https://app.netlify.com/drop).

## ④ When things go wrong

- **`npm: command not found`** → install Node.js (see step 1 above).
- **App opens blank** → look at the terminal where you ran `npm run dev`. Paste any red error into Claude — it'll fix it.
- **Looks broken** → paste a screenshot into Claude: *"This is what it looks like. Make it look like the design we agreed."*
- **Stuck for >10 minutes** → that's the moment to hit the **🆘 Stuck? Get help** button.
