import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../lib/progress';

export default function AuthCallback() {
  const { user, loading } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      nav('/login', { replace: true });
      return;
    }
    void getProfile(user.id).then((p) => {
      const needsWelcome = !p?.role || !p?.company;
      nav(needsWelcome ? '/welcome' : '/dashboard', { replace: true });
    });
  }, [user, loading, nav]);

  return <div className="p-10 text-center text-ink-500">Signing you in…</div>;
}
