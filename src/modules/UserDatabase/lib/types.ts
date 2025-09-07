export interface User {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'admin' | 'doctor' | 'assistant' | 'patient';
  password: string; // только для демонстрации — в реальном проекте хранить хеши!
  isActive: boolean;
  createdAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  roles: string[]; // роли, которым разрешено
}