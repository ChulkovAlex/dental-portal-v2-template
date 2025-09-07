import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '@core/contexts/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isInitialized } = useAppContext();

  if (!isInitialized) {
    return <div className="init-loader">Инициализация...</div>; // 👈 можно заменить на спиннер
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};