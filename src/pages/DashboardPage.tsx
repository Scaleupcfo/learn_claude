import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfile, listProgress, moduleStatusMap, isCertificateEligible } from '../lib/progress';
import type { Profile, ModuleStatus } from '../lib/database.types';
import { MODULES, GOALS, goalModuleId, COLUMN_LABELS, COLUMN_ORDER } from '../lib/curriculum';

type Status = ModuleStatus | undefined;

function statusIcon(s: Status) {
  if (s === 'completed') return '✅';
  if (s === 'in_progress') return '🟡';
  return '⚪';
}

function actionLabel(s: Status) {
  if (s === 'completed') return 'Review';
  if (s === 'in_progress') return 'Resume →';
  return 'Start →';
}

export default function DashboardPage() {
  const { user } = useAuth();
  const location = useLocation();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [status, setStatus] = useState<Map<string, ModuleStatus>>(new Map());
  const [eligible, setEligible] = useState(false);

  const load = useCallback(() => {
    if (!user) return;
    void getProfile(user.id).then(setProfile);
    void listProgress(user.id).then((rows) => {
      setStatus(moduleStatusMap(rows));
      setEligible(isCertificateEligible(rows));
    });
  }, [user]);

  useEffect(() => { load(); }, [load, location.pathname]);

  useEffect(() => {
    if (!user) return;
    const onVis = () => { if (!document.hidden) load(); };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('focus', load);
    window.addEventListener('progress:update', load);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('focus', load);
      window.removeEventListener('progress:update', load);
    };
  }, [user, load]);

  const setupModules = MODULES.filter((m) => m.group === 'setup');
  const shipModule = MODULES.find((m) => m.id === 'ship.certificate');

  // Progress math
  const requiredIds = MODULES.filter((m) => m.required).map((m) => m.id);
  const goalCompletedPerCol = COLUMN_ORDER.map((col) =>
    GOALS.filter((g) => g.column === col).some((g) => status.get(goalModuleId(g.id)) === 'completed'),
  );
  const requiredDone = requiredIds.filter((id) => status.get(id) === 'completed').length;
  const goalsDone = goalCompletedPerCol.filter(Boolean).length;
  const totalSteps = requiredIds.length + COLUMN_ORDER.length;
  const doneSteps = requiredDone + goalsDone;
  const pct = Math.round((doneSteps / totalSteps) * 100);

  const minutes = Math.floor((profile?.total_time_seconds ?? 0) / 60);

  const linkForSetup = (id: string) =>
    id === 'setup.install' ? '/setup/install' :
    id === 'setup.connectors' ? '/setup/connectors' : '/welcome';

  return (
    <div className="max-w-2xl mx-auto pb-12">
      {/* Hero */}
      <div className="text-center pt-2 pb-6">
        <h1 className="text-3xl">
          Hi {profile?.full_name?.split(' ')[0] ?? 'there'} <span>👋</span>
        </h1>
        <p className="mt-2 text-ink-500 text-sm">
          You've invested <strong className="text-ink-800">{minutes} min</strong>
          {' '}of your 3-hour journey. Keep going.
        </p>
      </div>

      {/* Big progress ring */}
      <div className="flex flex-col items-center mb-8">
        <ProgressRing pct={pct} />
        <p className="text-sm text-ink-500 mt-2">
          {doneSteps} of {totalSteps} steps complete
        </p>
      </div>

      {/* Checklist sections */}
      <div className="space-y-8">
        <ChecklistSection title="Setup">
          {setupModules.map((m) => {
            const s = status.get(m.id);
            return (
              <ChecklistRow
                key={m.id}
                icon={statusIcon(s)}
                title={m.title}
                meta={`~${m.estimatedMinutes} min`}
                to={linkForSetup(m.id)}
                actionLabel={actionLabel(s)}
                done={s === 'completed'}
              />
            );
          })}
        </ChecklistSection>

        <ChecklistSection title="Build — one from each column" subtitle="Required for your certificate">
          {COLUMN_ORDER.map((col, i) => {
            const meta = COLUMN_LABELS[col];
            const goalsInCol = GOALS.filter((g) => g.column === col);
            const doneInCol = goalsInCol.filter(
              (g) => status.get(goalModuleId(g.id)) === 'completed',
            ).length;
            const done = goalCompletedPerCol[i];
            return (
              <ChecklistRow
                key={col}
                icon={done ? '✅' : '⚪'}
                title={`${meta.icon} ${meta.label}`}
                meta={`${doneInCol} of ${goalsInCol.length}`}
                to="/build"
                actionLabel={done ? 'Try another' : 'Pick a goal →'}
                done={done}
              />
            );
          })}
        </ChecklistSection>

        {shipModule && (
          <ChecklistSection title="Ship">
            <ChecklistRow
              icon={statusIcon(status.get(shipModule.id))}
              title={shipModule.title}
              meta={eligible ? 'Ready to claim!' : 'Unlocks when above is complete'}
              to={eligible ? '/certificate' : '/dashboard'}
              actionLabel={
                status.get(shipModule.id) === 'completed' ? 'Review'
                : eligible ? 'Claim →' : 'Locked'
              }
              done={status.get(shipModule.id) === 'completed'}
              disabled={!eligible && status.get(shipModule.id) !== 'completed'}
              highlight={eligible && status.get(shipModule.id) !== 'completed'}
            />
          </ChecklistSection>
        )}
      </div>
    </div>
  );
}

/* --- Subcomponents --- */

function ProgressRing({ pct }: { pct: number }) {
  const size = 140;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - pct / 100);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f97316"
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-ink-900 leading-none">{pct}%</div>
        <div className="text-[10px] uppercase tracking-wider text-ink-500 mt-1">complete</div>
      </div>
    </div>
  );
}

function ChecklistSection({
  title, subtitle, children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 px-1">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-500 mt-0 mb-0">
          {title}
        </h2>
        {subtitle && <p className="text-xs text-ink-400 mt-0.5">{subtitle}</p>}
      </div>
      <ul className="space-y-2">{children}</ul>
    </section>
  );
}

function ChecklistRow({
  icon, title, meta, to, actionLabel, done, disabled, highlight,
}: {
  icon: string;
  title: string;
  meta?: string;
  to: string;
  actionLabel: string;
  done?: boolean;
  disabled?: boolean;
  highlight?: boolean;
}) {
  const body = (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border transition ${
        disabled ? 'bg-ink-50 border-ink-100 text-ink-400 cursor-not-allowed' :
        highlight ? 'bg-brand-50 border-brand-300 hover:shadow-pop' :
        done ? 'bg-white border-ink-100 text-ink-500 hover:border-ink-200' :
        'bg-white border-ink-200 hover:border-brand-300 hover:shadow-pop'
      }`}
    >
      <span className="text-xl shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className={`font-semibold truncate ${done ? 'line-through' : ''} ${disabled ? '' : 'text-ink-900'}`}>
          {title}
        </div>
        {meta && (
          <div className="text-xs text-ink-500 mt-0.5">{meta}</div>
        )}
      </div>
      <span
        className={`text-sm font-medium shrink-0 ${
          disabled ? 'text-ink-300' :
          highlight ? 'text-brand-700' :
          done ? 'text-ink-400' : 'text-brand-600'
        }`}
      >
        {actionLabel}
      </span>
    </div>
  );

  if (disabled) {
    return <li>{body}</li>;
  }

  return (
    <li>
      <Link to={to} className="block no-underline text-inherit">{body}</Link>
    </li>
  );
}
