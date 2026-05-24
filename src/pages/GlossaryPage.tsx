import { useMemo, useState } from 'react';
import glossary from '../../content/glossary/glossary.json';

interface Entry {
  term: string;
  plainEnglish: string;
  cxoAnalogy?: string;
  seeAlso?: string[];
}

export default function GlossaryPage() {
  const [q, setQ] = useState('');
  const entries = glossary as Entry[];
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return entries;
    return entries.filter(
      (e) =>
        e.term.toLowerCase().includes(needle) ||
        e.plainEnglish.toLowerCase().includes(needle) ||
        (e.cxoAnalogy ?? '').toLowerCase().includes(needle),
    );
  }, [q, entries]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1>Glossary</h1>
      <p className="text-ink-600">
        Every bit of Claude jargon you might run into — in plain English, with an analogy
        when it helps.
      </p>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search… (e.g. MCP, subagent, model)"
        className="mt-4 w-full px-3 py-2 border border-ink-200 rounded-lg bg-white text-sm"
      />
      <ul className="mt-6 space-y-4">
        {filtered.map((e) => (
          <li key={e.term} className="card">
            <h3 className="mt-0 mb-1">{e.term}</h3>
            <p className="text-sm text-ink-700">{e.plainEnglish}</p>
            {e.cxoAnalogy && (
              <p className="text-sm text-ink-500 mt-2"><em>Think of it like:</em> {e.cxoAnalogy}</p>
            )}
          </li>
        ))}
        {filtered.length === 0 && <li className="text-sm text-ink-500">No matches.</li>}
      </ul>
    </div>
  );
}
