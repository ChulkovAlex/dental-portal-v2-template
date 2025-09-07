import { useState, useEffect } from 'react';
import type { IDentConnection, SQLQuery } from '../lib/types';

const mockConnection: IDentConnection = {
  id: 'conn1',
  name: 'Основная база iDent',
  host: 'localhost',
  port: 5432,
  database: 'ident_prod',
  username: 'dentist_admin',
  lastConnected: new Date(Date.now() - 3600000),
  status: 'connected',
};

const mockQueries: SQLQuery[] = [
  {
    id: 'q1',
    name: 'Получить всех пациентов',
    query: 'SELECT * FROM patients ORDER BY last_name, first_name',
    description: 'Выбирает всех активных пациентов из базы',
    lastExecuted: new Date(Date.now() - 7200000),
    lastResultCount: 1247,
  },
  {
    id: 'q2',
    name: 'Получить записи за сегодня',
    query: 'SELECT * FROM appointments WHERE appointment_date = CURRENT_DATE',
    description: 'Выбирает все записи на сегодняшний день',
    lastExecuted: new Date(Date.now() - 1800000),
    lastResultCount: 18,
  },
];

export const useIDentDB = () => {
  const [connection, setConnection] = useState<IDentConnection | null>(null);
  const [queries, setQueries] = useState<SQLQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnection(mockConnection);
      setQueries(mockQueries);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const testConnection = () => {
    setTestResult('Подключение успешно! (симуляция)');
  };

  const executeQuery = (queryId: string) => {
    alert(`Выполняется запрос: ${queries.find(q => q.id === queryId)?.name}`);
  };

  return {
    connection,
    queries,
    loading,
    testResult,
    testConnection,
    executeQuery,
  };
};