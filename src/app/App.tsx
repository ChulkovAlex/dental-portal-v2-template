import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthPage } from '@modules/Auth/ui/AuthPage';
import { PatientsPage } from '@modules/Patients/index';
import { DashboardPage } from '@modules/Dashboard';
import { SettingsPage } from '@modules/Settings';
import { IDentDBPage } from '@modules/IDentDB';
import { ThemeToggle } from '@shared/ui/ThemeToggle';
import { useAppContext } from '@core/contexts/AppContext';
import { ProtectedRoute } from '@core/components/ProtectedRoute';
import './App.css';

const App: React.FC = () => {
  const { user, isInitialized } = useAppContext();

  if (!isInitialized) {
    return <div className="app-loader">Загрузка...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <nav>
            {user && (
              <>
                <Link to="/dashboard" style={{ marginRight: '1rem' }}>
                  Главная
                </Link>
                <Link to="/settings" style={{ marginRight: '1rem' }}>
                  Настройки
                </Link>
                <Link to="/ident-db" style={{ marginRight: '1rem' }}>
                  iDent БД
                </Link>
                <Link to="/patients" style={{ marginRight: '1rem' }}>
                  Пациенты
                </Link>
              </>
            )}
          </nav>
          <div className="header-actions">
            {user && <button onClick={() => useAppContext().logout()} className="logout-btn">🚪 Выйти</button>}
            <ThemeToggle />
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/patients"
              element={
                <ProtectedRoute>
                  <PatientsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ident-db"
              element={
                <ProtectedRoute>
                  <IDentDBPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<AuthPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;