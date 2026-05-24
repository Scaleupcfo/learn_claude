import { Outlet } from 'react-router-dom';
import Header from './Header';
import StuckButton from './StuckButton';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
      <StuckButton />
      <footer className="border-t border-ink-100 py-6 text-center text-xs text-ink-400">
        Learn Claude · Onboarding for CXOs
      </footer>
    </div>
  );
}
