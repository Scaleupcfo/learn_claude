import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfile, listProgress, moduleStatusMap, isCertificateEligible } from '../lib/progress';
import type { Profile } from '../lib/database.types';
import type { ModuleStatus } from '../lib/database.types';
import { MODULES, getGoal, goalModuleId } from '../lib/curriculum';
import ChecklistRail from '../components/ChecklistRail';

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [status, setStatus] = useState<Map<string, ModuleStatus>>(new Map());
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    if (!user) return;
    const load = () => {
      void getProfile(user.id).then(setProfile);
      void listProgress(user.id).then((rows) => {
        setStatus(moduleStatusMap(rows));
        setEligible(isCertificateEligible(rows));
      });
    };
    load();
    const onVis = () => {
      if (!document.hidden) load();
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('focus', load);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('focus', load);
    };
  }, [user]);

  // The "next" module: first required setup not completed, else primary goal, else any pending.
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-6">
        <div>
          <h1>Hi {profile?.full_name?.split(' ')[0] ?? 'there'} 👋</h1>
          <p className="mt-1 text-ink-600">
            You've invested <strong>{Math.floor((profile?.total_time_seconds ?? 0) / 60)} min</strong> so far.
            Goal: feel comfortable with Claude in about 3 hours.
          </p>
        </div>

        {nextModule && (
          <div className="card">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickCard icon="🛠️" title="Install Claude Code" to="/setup/install" desc="OS-detected install with copy-paste commands." />
          <QuickCard icon="🔌" title="Wire your connectors" to="/setup/connectors" desc="Pick from Gmail, Drive, Figma, Slack, and more." />
          <QuickCard icon="🚀" title="Build your first thing" to="/build" desc="23 CXO-shaped goals. Pick what fits today." />
          <QuickCard icon="🖼️" title="See sample outputs" to="/gallery" desc="What real CXOs have built with Claude." />
        </div>

        {eligible && status.get('ship.certificate') !== 'completed' && (
          <div className="card border-brand-300 bg-brand-50/40">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div className="flex-1">
                <h3 className="mt-0">You've earned your certificate</h3>
                <p className="text-sm text-ink-600">
                  You've completed the setup and at least one goal in every column.
                </p>
              </div>
              <Link to="/certificate" className="btn-primary no-underline">Claim →</Link>
            </div>
          </div>
        )}

        {profile?.primary_goal && (
          <div className="text-xs text-ink-500">
            Your stated first goal: <strong>{getGoal(profile.primary_goal)?.title}</strong> ·{' '}
            <Link to={`/build/${profile.primary_goal}`}>Open</Link>
          </div>
        )}
      </div>

      <ChecklistRail />
    </div>
  );
}

function QuickCard({ icon, title, desc, to }: { icon: string; title: string; desc: string; to: string }) {
  return (
    <Link to={to} className="card hover:shadow-pop transition no-underline text-ink-800">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-2 mb-1">{title}</h3>
      <p className="text-sm text-ink-500">{desc}</p>
    </Link>
  );
}
