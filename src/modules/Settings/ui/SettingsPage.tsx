import React from 'react';
import { useSettings } from '../model/useSettings';
import { UsersTab } from './UsersTab';
import { PermissionsTab } from './PermissionsTab';
import './SettingsPage.css';

export const SettingsPage: React.FC = () => {
  const { users, permissions, activeTab, setActiveTab, loading } = useSettings();

  if (loading) {
    return <div className="settings-page">Загрузка настроек...</div>;
  }

  return (
    <div className="settings-page">
      <h2>⚙️ Настройки системы</h2>
      <div className="settings-tabs">
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Пользователи
        </button>
        <button
          className={`tab-btn ${activeTab === 'permissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('permissions')}
        >
          Права доступа
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'users' && <UsersTab users={users} />}
        {activeTab === 'permissions' && <PermissionsTab permissions={permissions} />}
      </div>
    </div>
  );
};