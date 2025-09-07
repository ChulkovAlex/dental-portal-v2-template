import React from 'react';
import type { Permission } from '../lib/types';
import './PermissionsTab.css';

interface PermissionsTabProps {
  permissions: Permission[];
}

export const PermissionsTab: React.FC<PermissionsTabProps> = ({ permissions }) => {
  return (
    <div className="permissions-tab">
      <h3>🔑 Права доступа</h3>
      <div className="permissions-list">
        {permissions.map(permission => (
          <div key={permission.id} className="permission-card">
            <h4>{permission.name}</h4>
            <p className="permission-description">{permission.description}</p>
            <div className="assigned-roles">
              <strong>Назначено ролям:</strong>
              <div className="roles-list">
                {permission.assignedRoles.map(role => (
                  <span key={role} className="role-tag">{role}</span>
                ))}
              </div>
            </div>
            <button className="edit-permission-btn">✏️ Редактировать</button>
          </div>
        ))}
      </div>
    </div>
  );
};