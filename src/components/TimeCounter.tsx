import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../lib/progress';

export default function TimeCounter() {
  const { user } = useAuth();
  const [sec, setSec] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const load = () => {
      void getProfile(user.id).then((p) => {
        if (!cancelled) setSec(p?.total_time_seconds ?? 0);
      });
    };
    load();
    const id = window.setInterval(load, 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [user]);

  if (!user) return null;
  const minutes = Math.floor((sec ?? 0) / 60);
  return (
    <div className="hidden sm:flex items-center gap-1 text-xs text-ink-500">
      <span>⏱️</span>
      <span>
        <strong className="text-ink-800">{minutes}</strong> / 180 min
      </span>
    </div>
  );
}
