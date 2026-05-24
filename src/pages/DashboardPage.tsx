import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfile, listProgress, moduleStatusMap, isCertificateEligible } from '../lib/progress';
import type { Profile, ModuleStatus } from '../lib/database.types';
import { MODULES, getGoal, goalModuleId } from '../lib/curriculum';

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

  useEffect(() => {
    load();
  }, [load, location.pathname]);

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

  const nextModule =
    MODULES.filter((m) => m.required && m.id !== 'ship.certificate').find(
      (m) => status.get(m.id) !== 'completed',
    ) ?? (profile?.primary_goal ? MODULES.find((m) => m.id === goalModuleId(profile.primary_goal!)) : undefined);

  const linkFor = (id: string) => {
    if (id === 'welcome') return '/welcome';
    if (id === 'setup.install') return '/setup/install';
    if (id === 'setup.connectors') return '/setup/connectors';
    if (id === 'ship.certificate') return '/certificate';
    if (id.startsWith('build.')) return `/build/${id.slice('build.'.length)}`;
    return '/dashboard';
  };

  const minutes = Math.floor((profile?.total_time_seconds ?? 0) / 60);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mt-6">
        <h1 className="text-3xl">
          Hi {profile?.full_name?.split(' ')[0] ?? 'there'} <span className="inline-block">👋</span>
        </h1>
        <p className="mt-2 text-ink-600">
          You've invested <strong>{minutes} min</strong> · Goal: feel comfortable with Claude in about 3 hours.
        </p>
      </div>

      {nextModule && (
        <div className="card mt-8 text-left">
          <div className="text-xs uppercase tracking-wide font-semibold text-brand-700">Up next</div>
          <h2 className="mt-1 mb-1">{nextModule.title}</h2>
          <p className="text-sm text-ink-500">
            About {nextModule.estimatedMinutes} minutes ·{' '}
            {status.get(nextModule.id) === 'in_progress' ? 'In progress' : 'Not started'}
          </p>
          <Link to={linkFor(nextModule.id)} className="btn-primary mt-4 inline-flex no-underline">
            {status.get(nextModule.id) === 'in_progress' ? 'Resume →' : 'Start →'}
          </Link>
        </div>
      )}

      {eligible && status.get('ship.certificate') !== 'completed' && (
        <div className="card mt-6 border-brand-300 bg-brand-50/40 text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div className="flex-1">
              <h3 className="mt-0">You've earned your certificate</h3>
              <p className="text-sm text-ink-600">
                Setup complete and at least one goal in every column.
              </p>
            </div>
            <Link to="/certificate" className="btn-primary no-underline">Claim →</Link>
          </div>
        </div>
      )}

      {profile?.primary_goal && (
        <p className="text-xs text-ink-500 mt-8">
          Your stated first goal: <strong>{getGoal(profile.primary_goal)?.title ?? profile.primary_goal}</strong>{' '}
          · <Link to={`/build/${profile.primary_goal}`}>Open</Link>
        </p>
      )}
    </div>
  );
}
