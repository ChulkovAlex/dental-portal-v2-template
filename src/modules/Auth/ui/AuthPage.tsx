import React, { useState, useEffect } from 'react'; // 👈 добавили useEffect
import { useAuth } from '../model/useAuth';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { useNavigate } from 'react-router-dom'; // 👈 добавили useNavigate
import './AuthPage.css';

export const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, loading, login, logout } = useAuth();
  const navigate = useNavigate(); // 👈 хук навигации

  // 👇 Редирект после успешной авторизации
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  if (user) {
    return (
      <div className="auth-container">
        <Card className="auth-card">
          <h2>👋 Добро пожаловать, {user.name}!</h2>
          <p>Вы успешно авторизованы как {user.role}.</p>
          <Button variant="outline" onClick={logout} fullWidth>
            Выйти из системы
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <h2>🔐 Авторизация</h2>
        <p className="auth-subtitle">Пожалуйста, войдите в свою учётную запись</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Электронная почта</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите ваш email"
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите ваш пароль"
              required
              className="input-field"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
            isLoading={loading}
          >
            Войти
          </Button>
        </form>
        <div className="auth-footer">
          <a href="#forgot">Забыли пароль?</a>
        </div>
      </Card>
    </div>
  );
};