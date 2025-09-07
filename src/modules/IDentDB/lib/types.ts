export interface IDentConnection {
  id: string;
  name: string;
  host: string;
  port: number;
  database: string;
  username: string;
  lastConnected: Date | null;
  status: 'connected' | 'disconnected' | 'error';
}

export interface SQLQuery {
  id: string;
  name: string;
  query: string;
  description: string;
  lastExecuted: Date | null;
  lastResultCount: number | null;
}