import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-ink-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-500" />
            Learn Claude
          </div>
          <Link to={user ? '/dashboard' : '/login'} className="btn-primary text-sm no-underline">
            {user ? 'Open dashboard' : 'Sign in'}
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <span className="chip bg-brand-100 text-brand-700">For CEOs, CFOs, COOs & founders</span>
          <h1 className="text-5xl font-bold tracking-tight text-ink-900 mt-6">
            Get comfortable with Claude in <span className="text-brand-600">3 hours</span>.
          </h1>
          <p className="mt-5 text-lg text-ink-600">
            A self-paced, executive-friendly onboarding for Claude Code and Claude Cowork —
            install it, wire your tools, and ship your first real artifact before lunch.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to={user ? '/dashboard' : '/login'} className="btn-primary text-base px-6 py-3 no-underline">
              {user ? 'Resume →' : 'Get started →'}
            </Link>
          </div>
          <p className="mt-4 text-xs text-ink-400">
            Free forever · Google sign-in · No credit card
          </p>
        </section>

        <section className="bg-white border-y border-ink-100">
          <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🛠️', title: 'Install & connect', body: 'OS-detected install. Wire Gmail, Calendar, Drive, Figma, and 13 more connectors — only what you need.' },
              { icon: '🚀', title: 'Build your first thing', body: 'Pick from 23 CXO-shaped goals: board deck, financial model, contract review, UI mockup, hiring kit, and more.' },
              { icon: '🆘', title: 'Never get stuck', body: 'A "Stuck? Get help" button on every page, plus a screenshot-paste guide and reset prompts.' },
            ].map((c) => (
              <div key={c.title}>
                <div className="text-3xl">{c.icon}</div>
                <h3 className="mt-3 font-semibold text-ink-900">{c.title}</h3>
                <p className="mt-1 text-sm text-ink-600">{c.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="py-8 text-center text-xs text-ink-400">© Learn Claude</footer>
    </div>
  );
}
