import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listProgress, moduleStatusMap } from '../lib/progress';
import { MODULES, GOALS, goalModuleId, COLUMN_LABELS, COLUMN_ORDER } from '../lib/curriculum';
import type { ModuleStatus } from '../lib/database.types';

function dot(status: ModuleStatus | undefined): string {
  if (status === 'completed') return '✅';
  if (status === 'in_progress') return '⏳';
  return '⚪';
}

export default function ChecklistRail() {
  const { user } = useAuth();
  const [status, setStatus] = useState<Map<string, ModuleStatus>>(new Map());

  useEffect(() => {
    if (!user) return;
    void listProgress(user.id).then((rows) => setStatus(moduleStatusMap(rows)));
  }, [user]);

  const setupModules = MODULES.filter((m) => m.group === 'setup');
  const shipModule = MODULES.find((m) => m.id === 'ship.certificate');

  return (
    <aside className="card sticky top-20">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500 mt-0 mb-3">
        Your checklist
      </h3>

      <div>
        <div className="text-xs font-semibold text-ink-500 mb-1">Setup</div>
        <ul className="space-y-1 mb-4">
          {setupModules.map((m) => (
            <li key={m.id} className="flex items-center gap-2 text-sm">
              <span>{dot(status.get(m.id))}</span>
              <Link
                to={m.id === 'setup.install' ? '/setup/install' : m.id === 'setup.connectors' ? '/setup/connectors' : '/welcome'}
                className="text-ink-800 hover:text-brand-700 no-underline"
              >
                {m.title}
              </Link>
              <span className="ml-auto text-xs text-ink-400">{m.estimatedMinutes}m</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="text-xs font-semibold text-ink-500 mb-1">Build (1 per column)</div>
        <ul className="space-y-2 mb-4">
          {COLUMN_ORDER.map((col) => {
            const goalsInCol = GOALS.filter((g) => g.column === col);
            const doneInCol = goalsInCol.filter((g) => status.get(goalModuleId(g.id)) === 'completed');
            return (
              <li key={col} className="text-sm">
                <div className="flex items-center gap-2">
                  <span>{doneInCol.length > 0 ? '✅' : '⚪'}</span>
                  <span className="text-ink-800">
                    {COLUMN_LABELS[col].icon} {COLUMN_LABELS[col].label}
                  </span>
                  <span className="ml-auto text-xs text-ink-400">
                    {doneInCol.length} / {goalsInCol.length}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <Link to="/build" className="text-xs text-brand-600 hover:text-brand-700">
          See all goals →
        </Link>
      </div>

      {shipModule && (
        <div className="mt-4 pt-4 border-t border-ink-100">
          <div className="text-xs font-semibold text-ink-500 mb-1">Ship</div>
          <div className="flex items-center gap-2 text-sm">
            <span>{dot(status.get(shipModule.id))}</span>
            <Link to="/certificate" className="text-ink-800 hover:text-brand-700 no-underline">
              {shipModule.title}
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
