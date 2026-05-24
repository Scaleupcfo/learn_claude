import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfile, upsertProfile, setModuleStatus } from '../lib/progress';
import { GOALS } from '../lib/curriculum';

const ROLES = ['CEO', 'CFO', 'COO', 'CMO', 'CTO', 'CPO', 'Founder', 'Other'];

export default function WelcomePage() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('CEO');
  const [company, setCompany] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState(GOALS[0].id);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    void getProfile(user.id).then((p) => {
      if (p?.full_name) setFullName(p.full_name);
      if (p?.role) setRole(p.role);
      if (p?.company) setCompany(p.company);
      if (p?.primary_goal) setPrimaryGoal(p.primary_goal);
    });
  }, [user]);

  const save = async () => {
    if (!user) return;
    setBusy(true);
    try {
      await upsertProfile({
        id: user.id,
        full_name: fullName,
        role,
        company,
        primary_goal: primaryGoal,
      });
      await setModuleStatus(user.id, 'welcome', 'completed');
      nav('/dashboard');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1>Welcome 👋</h1>
      <p className="mt-2 text-ink-600">
        A few quick details so we can shape this to you. Plan on about{' '}
        <strong>3 hours</strong> in total — but you can leave and come back any time.
      </p>

      <div className="card mt-6 space-y-4">
        <Field label="Your name">
          <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </Field>
        <Field label="Your role">
          <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Company">
          <input className="input" value={company} onChange={(e) => setCompany(e.target.value)} />
        </Field>
        <Field label="What do you most want to build first?">
          <select className="input" value={primaryGoal} onChange={(e) => setPrimaryGoal(e.target.value)}>
            {GOALS.map((g) => <option key={g.id} value={g.id}>{g.icon} {g.title}</option>)}
          </select>
          <p className="text-xs text-ink-400 mt-1">You can change this later — and try as many as you want.</p>
        </Field>
        <button onClick={save} disabled={busy || !fullName || !company} className="btn-primary mt-2 disabled:opacity-50">
          {busy ? 'Saving…' : 'Continue to dashboard →'}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-700 mb-1">{label}</span>
      {children}
    </label>
  );
}

// add an input style — using a tailwind utility class via index.css would be cleaner,
// but inline here keeps Welcome self-contained
const _injected = (() => {
  const id = 'welcome-input-style';
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = `.input { width:100%; padding:.5rem .75rem; border:1px solid #e2e8f0; border-radius:.5rem; background:white; font-size:.875rem; } .input:focus { outline:2px solid #fdba74; outline-offset:0; }`;
  document.head.appendChild(el);
})();
void _injected;
