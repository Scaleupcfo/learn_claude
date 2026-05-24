import { Outlet } from 'react-router-dom';
import Header from './Header';
import StuckButton from './StuckButton';
import ChecklistRail from './ChecklistRail';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
            <ChecklistRail />
          </div>
        </aside>
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
