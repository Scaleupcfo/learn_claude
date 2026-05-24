import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (loading) return <div className="p-10 text-center text-ink-500">Loading…</div>;
  if (user) return <Navigate to="/dashboard" replace />;

  const signIn = async () => {
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError(error.message);
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 px-4">
      <div className="card max-w-md w-full text-center">
        <span className="inline-block w-2 h-2 rounded-full bg-brand-500 mx-auto" />
        <h1 className="mt-4 text-2xl font-bold">Welcome to Learn Claude</h1>
        <p className="mt-2 text-sm text-ink-600">
          Three hours to becoming comfortable with Claude Code & Claude Cowork — for CXOs.
        </p>
        <button onClick={signIn} disabled={busy} className="btn-primary w-full mt-6 disabled:opacity-50">
          {busy ? 'Redirecting…' : 'Continue with Google'}
        </button>
        {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
        <p className="mt-6 text-xs text-ink-400">
          By signing in you agree to be patient with yourself for the first hour.
        </p>
      </div>
    </div>
  );
}
