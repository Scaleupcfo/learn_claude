import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import StuckButton from './StuckButton';
import ChecklistRail from './ChecklistRail';

export default function Layout() {
  const { pathname } = useLocation();
  // On the dashboard the checklist IS the page, so we hide the rail.
  const showRail = pathname !== '/dashboard';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div
        className={
          showRail
            ? 'flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8'
            : 'flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6'
        }
      >
        {showRail && (
          <aside className="hidden lg:block">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
              <ChecklistRail />
            </div>
          </aside>
        )}
        <main>
          <Outlet />
        </main>
      </div>
      <StuckButton />
      <footer className="border-t border-ink-100 py-6 text-center text-xs text-ink-400">
        Learn Claude · Onboarding for CXOs
      </footer>
    </div>
  );
}
