import React from 'react';
import { useIDentDB } from '../model/useIDentDB';
import './IDentDBPage.css';

export const IDentDBPage: React.FC = () => {
  const { connection, queries, loading, testResult, testConnection, executeQuery } = useIDentDB();

  if (loading) {
    return <div className="ident-page">Загрузка настроек подключения...</div>;
  }

  return (
    <div className="ident-page">
      <h2>🗃️ Подключение к БД iDent</h2>
      
      <div className="connection-card">
        <h3>Настройки подключения</h3>
        {connection && (
          <div className="connection-details">
            <p><strong>Название:</strong> {connection.name}</p>
            <p><strong>Хост:</strong> {connection.host}</p>
            <p><strong>Порт:</strong> {connection.port}</p>
            <p><strong>База данных:</strong> {connection.database}</p>
            <p><strong>Пользователь:</strong> {connection.username}</p>
            <p><strong>Статус:</strong> 
              <span className={`status-indicator ${connection.status}`}>
                {connection.status === 'connected' ? 'Подключено' : 
                 connection.status === 'disconnected' ? 'Отключено' : 'Ошибка'}
              </span>
            </p>
            {connection.lastConnected && (
              <p><strong>Последнее подключение:</strong> {connection.lastConnected.toLocaleString()}</p>
            )}
          </div>
        )}
        <button className="test-connection-btn" onClick={testConnection}>
          🔄 Проверить подключение
        </button>
        {testResult && <div className="test-result">{testResult}</div>}
      </div>

      <div className="queries-section">
        <h3>SQL-запросы</h3>
        <div className="queries-list">
          {queries.map(query => (
            <div key={query.id} className="query-card">
              <h4>{query.name}</h4>
              <p className="query-description">{query.description}</p>
              <code className="query-code">{query.query}</code>
              {query.lastExecuted && (
                <div className="query-meta">
                  <span>Последнее выполнение: {query.lastExecuted.toLocaleString()}</span>
                  {query.lastResultCount !== null && (
                    <span>Результатов: {query.lastResultCount}</span>
                  )}
                </div>
              )}
              <button className="execute-btn" onClick={() => executeQuery(query.id)}>
                ▶️ Выполнить
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};