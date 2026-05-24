import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listProgress, moduleStatusMap, isCertificateEligible } from '../lib/progress';
import { MODULES, GOALS, goalModuleId, COLUMN_LABELS, COLUMN_ORDER } from '../lib/curriculum';
import type { ModuleStatus } from '../lib/database.types';

function dot(status: ModuleStatus | undefined): string {
  if (status === 'completed') return '✅';
  if (status === 'in_progress') return '🟡';
  return '⚪';
}

export default function ChecklistRail() {
  const { user } = useAuth();
  const location = useLocation();
  const [status, setStatus] = useState<Map<string, ModuleStatus>>(new Map());
  const [eligible, setEligible] = useState(false);

  const refresh = useCallback(() => {
    if (!user) return;
    void listProgress(user.id).then((rows) => {
      setStatus(moduleStatusMap(rows));
      setEligible(isCertificateEligible(rows));
    });
  }, [user]);

  // Initial load + every route change.
  useEffect(() => {
    refresh();
  }, [refresh, location.pathname]);

  // Real-time updates: visibility/focus/custom event + polling fallback.
  useEffect(() => {
    if (!user) return;
    const onVis = () => {
      if (!document.hidden) refresh();
    };
    const onCustom = () => refresh();
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('focus', refresh);
    window.addEventListener('progress:update', onCustom);
    const interval = window.setInterval(refresh, 20_000);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('progress:update', onCustom);
      window.clearInterval(interval);
    };
  }, [refresh, user]);

  const setupModules = MODULES.filter((m) => m.group === 'setup');
  const shipModule = MODULES.find((m) => m.id === 'ship.certificate');

  // Overall progress %
  const requiredIds = MODULES.filter((m) => m.required).map((m) => m.id);
  const goalCompletedPerCol = COLUMN_ORDER.map((col) =>
    GOALS.filter((g) => g.column === col).some((g) => status.get(goalModuleId(g.id)) === 'completed'),
  );
  const requiredDone = requiredIds.filter((id) => status.get(id) === 'completed').length;
  const goalsDone = goalCompletedPerCol.filter(Boolean).length;
  const totalSteps = requiredIds.length + COLUMN_ORDER.length;
  const doneSteps = requiredDone + goalsDone;
  const pct = Math.round((doneSteps / totalSteps) * 100);

  return (
    <div className="bg-white rounded-2xl border border-ink-100 shadow-card p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500 mt-0 mb-2">
        Your checklist
      </h3>

      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-ink-500">Overall progress</span>
          <span className="text-xs font-semibold text-ink-900">{pct}%</span>
        </div>
        <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <Section title="Setup">
        {setupModules.map((m) => (
          <Row
            key={m.id}
            icon={dot(status.get(m.id))}
            label={m.title}
            to={
              m.id === 'setup.install'
                ? '/setup/install'
                : m.id === 'setup.connectors'
                ? '/setup/connectors'
                : '/welcome'
            }
            meta={`${m.estimatedMinutes}m`}
            active={location.pathname.startsWith(
              m.id === 'setup.install' ? '/setup/install' : m.id === 'setup.connectors' ? '/setup/connectors' : '/welcome',
            )}
          />
        ))}
      </Section>

      <Section title="Build (one per column)">
        {COLUMN_ORDER.map((col, i) => {
          const goalsInCol = GOALS.filter((g) => g.column === col);
          const doneInCol = goalsInCol.filter((g) => status.get(goalModuleId(g.id)) === 'completed').length;
          return (
            <Row
              key={col}
              icon={goalCompletedPerCol[i] ? '✅' : '⚪'}
              label={`${COLUMN_LABELS[col].icon} ${COLUMN_LABELS[col].label}`}
              to="/build"
              meta={`${doneInCol}/${goalsInCol.length}`}
              active={location.pathname.startsWith('/build')}
            />
          );
        })}
      </Section>

      {shipModule && (
        <Section title="Ship">
          <Row
            icon={dot(status.get(shipModule.id))}
            label={shipModule.title}
            to="/certificate"
            meta={eligible ? 'Ready!' : ''}
            active={location.pathname === '/certificate'}
            highlight={eligible}
          />
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-400 mb-1">
        {title}
      </div>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
}

function Row({
  icon, label, to, meta, active, highlight,
}: {
  icon: string;
  label: string;
  to: string;
  meta?: string;
  active?: boolean;
  highlight?: boolean;
}) {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm no-underline transition ${
          active ? 'bg-ink-100 text-ink-900' :
          highlight ? 'bg-brand-50 text-brand-800 hover:bg-brand-100' :
          'text-ink-700 hover:bg-ink-50 hover:text-ink-900'
        }`}
      >
        <span className="text-xs">{icon}</span>
        <span className="flex-1 truncate">{label}</span>
        {meta && <span className="text-[11px] text-ink-400 shrink-0">{meta}</span>}
      </Link>
    </li>
  );
}
