import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { setModuleStatus } from '../lib/progress';

interface Props {
  moduleId: string;
  label: string;
  /** Where to send the user after they mark this complete. Pass null to stay put. */
  nextPath?: string | null;
  className?: string;
}

export default function CompleteButton({ moduleId, label, nextPath, className = '' }: Props) {
  const { user } = useAuth();
  const nav = useNavigate();
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [err, setErr] = useState<string | null>(null);

  const click = async () => {
    if (!user) {
      setErr('Not signed in.');
      setState('error');
      return;
    }
    setState('busy');
    setErr(null);
    try {
      await setModuleStatus(user.id, moduleId, 'completed');
      // Notify any live components (sidebar checklist, dashboard) to refresh.
      window.dispatchEvent(new CustomEvent('progress:update', { detail: { moduleId } }));
      setState('done');
      if (nextPath) {
        window.setTimeout(() => nav(nextPath), 700);
      } else {
        window.setTimeout(() => setState('idle'), 1500);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
      setState('error');
    }
  };

  const text =
    state === 'busy' ? 'Saving…' :
    state === 'done' ? '✓ Saved' :
    state === 'error' ? 'Try again' :
    label;

  return (
    <div className={`flex flex-col items-end gap-1 ${className}`}>
      <button
        onClick={click}
        disabled={state === 'busy'}
        className={`btn-primary disabled:opacity-50 ${state === 'done' ? 'bg-green-600 hover:bg-green-600' : ''}`}
      >
        {text}
      </button>
      {err && <span className="text-xs text-red-600">{err}</span>}
    </div>
  );
}
