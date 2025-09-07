export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'assistant';
  isActive: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  assignedRoles: string[];
}