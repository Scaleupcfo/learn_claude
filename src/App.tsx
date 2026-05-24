import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AuthCallback from './pages/AuthCallback';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import SetupInstallPage from './pages/SetupInstallPage';
import SetupConnectorsPage from './pages/SetupConnectorsPage';
import ConnectorDetailPage from './pages/ConnectorDetailPage';
import BuildHubPage from './pages/BuildHubPage';
import GoalPage from './pages/GoalPage';
import GalleryPage from './pages/GalleryPage';
import GlossaryPage from './pages/GlossaryPage';
import HelpPage from './pages/HelpPage';
import CertificatePage from './pages/CertificatePage';
import type { ReactNode } from 'react';

function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink-500">
        Loading…
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/setup/install" element={<SetupInstallPage />} />
        <Route path="/setup/connectors" element={<SetupConnectorsPage />} />
        <Route path="/setup/connectors/:id" element={<ConnectorDetailPage />} />
        <Route path="/build" element={<BuildHubPage />} />
        <Route path="/build/:goalId" element={<GoalPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/certificate" element={<CertificatePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
