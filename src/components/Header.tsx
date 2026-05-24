import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TimeCounter from './TimeCounter';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/setup/install', label: 'Setup' },
  { to: '/build', label: 'Build' },
  { to: '/glossary', label: 'Glossary' },
];

export default function Header() {
  const { user, signOut } = useAuth();
  return (
    <header className="border-b border-ink-100 bg-white/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-ink-900 no-underline">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-500" />
          Learn Claude
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium no-underline ${
                  isActive ? 'bg-ink-100 text-ink-900' : 'text-ink-600 hover:text-ink-900 hover:bg-ink-50'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <TimeCounter />
          {user && (
            <button onClick={signOut} className="text-xs text-ink-500 hover:text-ink-800">
              Sign out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
