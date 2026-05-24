import { useState } from 'react';
import glossary from '../../../content/glossary/glossary.json';

type Entry = { term: string; plainEnglish: string; cxoAnalogy?: string };
const map: Record<string, Entry> = Object.fromEntries(
  (glossary as Entry[]).map((e) => [e.term.toLowerCase(), e]),
);

export default function Term({ children }: { children: string }) {
  const key = String(children).toLowerCase();
  const entry = map[key];
  const [open, setOpen] = useState(false);
  if (!entry) {
    return <span className="underline decoration-dotted">{children}</span>;
  }
  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="underline decoration-dotted decoration-brand-400 text-ink-800 hover:text-brand-700"
      >
        {children}
      </button>
      {open && (
        <span className="absolute z-20 left-0 top-full mt-1 w-72 bg-white border border-ink-200 shadow-pop rounded-lg p-3 text-xs not-italic text-ink-700 normal-case">
          <strong className="block text-ink-900 mb-1">{entry.term}</strong>
          <span className="block">{entry.plainEnglish}</span>
          {entry.cxoAnalogy && (
            <span className="block mt-2 text-ink-500"><em>Think of it like:</em> {entry.cxoAnalogy}</span>
          )}
        </span>
      )}
    </span>
  );
}
