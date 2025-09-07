import React from 'react';
import type { User } from '../lib/types';
import './UsersTab.css';

interface UsersTabProps {
  users: User[];
}

export const UsersTab: React.FC<UsersTabProps> = ({ users }) => {
  return (
    <div className="users-tab">
      <h3>👥 Пользователи</h3>
      <table className="users-table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                  {user.isActive ? 'Активен' : 'Неактивен'}
                </span>
              </td>
              <td>
                <button className="action-btn edit">✏️</button>
                <button className="action-btn delete">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-user-btn">➕ Добавить пользователя</button>
    </div>
  );
};