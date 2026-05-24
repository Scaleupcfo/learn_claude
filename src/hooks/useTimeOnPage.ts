import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { addModuleTime } from '../lib/progress';

// Visibility-aware ticker that batches 15s flushes to Supabase.
// Status is managed entirely by addModuleTime — it creates a row with status
// 'in_progress' the first time, and never downgrades 'completed' back to
// 'in_progress' on subsequent flushes. This avoids a race where the unmount
// flush after a "mark complete" click would overwrite the completed status.
export function useTimeOnPage(moduleId: string | null) {
  const { user } = useAuth();
  const pendingSec = useRef(0);

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
        await addModuleTime(user.id, moduleId, sec);
      } catch {
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
