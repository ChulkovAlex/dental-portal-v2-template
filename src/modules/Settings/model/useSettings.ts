import { useState, useEffect } from 'react';
import type { User, Permission } from '../lib/types';

// Моковые данные — позже заменим на API
const mockUsers: User[] = [
  { id: '1', name: 'Администратор', email: 'admin@clinic.ru', role: 'admin', isActive: true },
  { id: '2', name: 'Доктор Петров', email: 'petrov@clinic.ru', role: 'doctor', isActive: true },
  { id: '3', name: 'Ассистент Сидорова', email: 'sidorova@clinic.ru', role: 'assistant', isActive: false },
];

const mockPermissions: Permission[] = [
  { id: 'p1', name: 'Управление пользователями', description: 'Добавление, редактирование, удаление пользователей', assignedRoles: ['admin'] },
  { id: 'p2', name: 'Просмотр календаря', description: 'Доступ к просмотру расписания', assignedRoles: ['admin', 'doctor', 'assistant'] },
  { id: 'p3', name: 'Редактирование записей', description: 'Возможность изменять записи пациентов', assignedRoles: ['admin', 'doctor'] },
];

export const useSettings = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'permissions'>('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки
    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setPermissions(mockPermissions);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return {
    users,
    permissions,
    activeTab,
    setActiveTab,
    loading,
  };
};