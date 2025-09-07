import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@modules/Auth/model/useAuth';

interface AppContextType {
  user: ReturnType<typeof useAuth>['user'];
  login: ReturnType<typeof useAuth>['login'];
  logout: ReturnType<typeof useAuth>['logout'];
  isAuthenticated: boolean;
  loading: boolean;
  isInitialized: boolean; // 👈 новое свойство
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, login, logout, loading, isInitialized } = useAuth(); // 👈 получаем isInitialized

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
    isInitialized, // 👈 передаём в контекст
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};