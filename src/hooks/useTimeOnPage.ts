import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { addModuleTime, setModuleStatus } from '../lib/progress';

// Visibility-aware ticker that batches 15s flushes to Supabase.
export function useTimeOnPage(moduleId: string | null) {
  const { user } = useAuth();
  const pendingSec = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!user || !moduleId) return;
    let intervalId: number | null = null;
    let visible = !document.hidden;

    const tick = () => {
      if (visible) pendingSec.current += 1;
    };

    const flush = async () => {
      if (!user || !moduleId) return;
      const sec = pendingSec.current;
      if (sec <= 0) return;
      pendingSec.current = 0;
      try {
        if (!startedRef.current) {
          await setModuleStatus(user.id, moduleId, 'in_progress');
          startedRef.current = true;
        }
        await addModuleTime(user.id, moduleId, sec);
      } catch {
        // restore on failure
        pendingSec.current += sec;
      }
    };

    const onVis = () => {
      visible = !document.hidden;
    };

    intervalId = window.setInterval(tick, 1000);
    const flushId = window.setInterval(flush, 15000);
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('beforeunload', flush);

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      window.clearInterval(flushId);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('beforeunload', flush);
      void flush();
    };
  }, [user, moduleId]);
}
