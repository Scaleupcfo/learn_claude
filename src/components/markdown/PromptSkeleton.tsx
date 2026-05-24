import { useMemo, useState } from 'react';
import CopyButton from '../CopyButton';

interface Props {
  template: string;
  fields?: string; // comma-separated placeholder names with optional defaults: "audience=Board, tone=concise"
}

function parseFields(spec?: string) {
  if (!spec) return [] as { name: string; def: string }[];
  return spec.split(',').map((p) => {
    const [name, def = ''] = p.split('=').map((s) => s.trim());
    return { name, def };
  });
}

export default function PromptSkeleton({ template, fields }: Props) {
  const parsed = useMemo(() => parseFields(fields), [fields]);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(parsed.map((p) => [p.name, p.def])),
  );

  const filled = useMemo(() => {
    let out = template;
    for (const { name } of parsed) {
      const v = values[name] || `[${name.toUpperCase()}]`;
      out = out.replaceAll(`[${name}]`, v);
    }
    return out;
  }, [template, parsed, values]);

  return (
    <div className="bg-brand-50/40 border border-brand-200 rounded-xl p-4 my-4 not-prose">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">Prompt skeleton</span>
        <CopyButton text={filled} label="Copy filled prompt" />
      </div>
      {parsed.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          {parsed.map((p) => (
            <label key={p.name} className="text-xs text-ink-600">
              <span className="block mb-0.5 font-medium">{p.name}</span>
              <input
                type="text"
                value={values[p.name] ?? ''}
                onChange={(e) => setValues((s) => ({ ...s, [p.name]: e.target.value }))}
                placeholder={p.def || p.name}
                className="w-full px-2 py-1 border border-ink-200 rounded text-sm bg-white"
              />
            </label>
          ))}
        </div>
      )}
      <pre className="bg-white border border-ink-200 rounded p-3 text-xs whitespace-pre-wrap font-mono text-ink-800">
        {filled}
      </pre>
    </div>
  );
}
