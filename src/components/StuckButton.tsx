import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function StuckButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 btn-primary shadow-pop"
        aria-label="Get help"
      >
        🆘 Stuck? Get help
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-ink-900/30 flex justify-end"
          onClick={() => setOpen(false)}
        >
          <aside
            className="w-full sm:w-[420px] bg-white h-full shadow-pop p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold mt-0">Quick escapes</h2>
              <button onClick={() => setOpen(false)} className="btn-ghost text-lg" aria-label="Close">✕</button>
            </div>

            <ol className="space-y-4 text-sm">
              <li>
                <strong className="text-ink-900">1 · Try Claude in the browser.</strong>
                <p className="mt-1">
                  Sometimes the terminal version misbehaves. Open{' '}
                  <a href="https://claude.ai" target="_blank" rel="noreferrer">claude.ai</a> in a new tab, paste the same prompt, and continue there.
                </p>
              </li>
              <li>
                <strong className="text-ink-900">2 · Take a screenshot and paste it in.</strong>
                <p className="mt-1">
                  Mac: <code>Cmd + Shift + 4</code>, then <code>Cmd + V</code> into Claude.<br />
                  Windows: <code>Win + Shift + S</code>, then <code>Ctrl + V</code>.
                </p>
              </li>
              <li>
                <strong className="text-ink-900">3 · Start a fresh chat.</strong>
                <p className="mt-1">
                  If Claude is going in circles, open a new chat and paste:
                </p>
                <pre className="mt-1 bg-ink-900 text-ink-100 rounded p-2 text-xs whitespace-pre-wrap">
{`I was working on [WHAT YOU WERE DOING]. Here's what I have so far: [PASTE]. Here's what I want next: [GOAL]. Please proceed from here.`}
                </pre>
              </li>
              <li>
                <strong className="text-ink-900">4 · Walk away for 2 minutes.</strong>
                <p className="mt-1">
                  Most "stuck" moments come from over-specifying. Read your prompt out loud. Cut half. Try again.
                </p>
              </li>
              <li>
                <strong className="text-ink-900">5 · Go deeper.</strong>
                <p className="mt-1">
                  See the full <Link to="/help" onClick={() => setOpen(false)}>troubleshooting page</Link>.
                </p>
              </li>
            </ol>
          </aside>
        </div>
      )}
    </>
  );
}
