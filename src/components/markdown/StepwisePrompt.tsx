import { useMemo, useState } from 'react';
import CopyButton from '../CopyButton';

export interface PromptStep {
  title: string;
  description?: string;
  template: string;
}

interface Props {
  steps: PromptStep[];
  /** Optional separator between assembled steps when copied as one prompt. */
  joiner?: string;
}

/**
 * A five-step (or any-step) prompt builder. Each step is fully editable.
 * The combined prompt updates live and is copyable as one block.
 */
export default function StepwisePrompt({ steps, joiner = '\n\n' }: Props) {
  const [values, setValues] = useState<string[]>(() => steps.map((s) => s.template));

  const combined = useMemo(() => values.join(joiner), [values, joiner]);

  const reset = () => setValues(steps.map((s) => s.template));

  return (
    <div className="my-5 rounded-2xl border border-brand-200 bg-brand-50/40 p-4 sm:p-5 not-prose">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            5-step prompt
          </div>
          <p className="text-xs text-ink-500 mt-0.5">
            Edit any step. The full prompt updates live below.
          </p>
        </div>
        <button onClick={reset} className="text-xs text-ink-500 hover:text-ink-800">
          Reset
        </button>
      </div>

      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="bg-white rounded-xl border border-ink-200 p-3">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-600 text-white text-[10px] font-bold">
                {i + 1}
              </span>
              <span className="text-sm font-semibold text-ink-900">{s.title}</span>
              {s.description && (
                <span className="text-xs text-ink-500">— {s.description}</span>
              )}
            </div>
            <textarea
              value={values[i]}
              onChange={(e) =>
                setValues((prev) => prev.map((v, idx) => (idx === i ? e.target.value : v)))
              }
              rows={Math.min(10, Math.max(2, values[i].split('\n').length))}
              className="w-full text-sm font-mono p-2 border border-ink-200 rounded resize-y bg-ink-50 focus:outline-none focus:border-brand-400"
            />
          </li>
        ))}
      </ol>

      <div className="mt-4 bg-white rounded-xl border border-ink-200 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Your final prompt
          </span>
          <CopyButton text={combined} label="Copy full prompt" />
        </div>
        <pre className="text-xs font-mono whitespace-pre-wrap text-ink-800 leading-relaxed">
          {combined}
        </pre>
      </div>
    </div>
  );
}
