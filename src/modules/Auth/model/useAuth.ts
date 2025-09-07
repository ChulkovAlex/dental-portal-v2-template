import { useState, useEffect } from 'react';
import type { User } from '../lib/types';
import { userDatabase } from '@modules/UserDatabase';

const STORAGE_KEY = 'dentapp_user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsedUser = JSON.parse(saved);
          const validUser = userDatabase.findUserByEmail(parsedUser.email);
          if (validUser && validUser.password === parsedUser.password) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const foundUser = userDatabase.validateUser(email, password);
      if (foundUser) {
        setUser(foundUser);
      } else {
        throw new Error('Неверный email или пароль');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Неверный email или пароль');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return { user, loading, isInitialized, login, logout };
};