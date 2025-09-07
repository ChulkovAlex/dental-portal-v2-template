import { User, Permission } from '../lib/types';

class UserDatabase {
  private users: User[] = [];
  private permissions: Permission[] = [];

  constructor() {
    this.init();
  }

  private init() {
    // Создаём суперпользователя
    this.users.push({
      id: 'super-001',
      email: 'superadmin@dent.ru',
      name: 'Супер Администратор',
      role: 'superadmin',
      password: 'super123', // ⚠️ только для демо
      isActive: true,
      createdAt: new Date(),
    });

    // Создаём тестовых пользователей
    this.users.push(
      {
        id: 'admin-001',
        email: 'admin@dent.ru',
        name: 'Администратор Клиники',
        role: 'admin',
        password: 'admin123',
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: 'doctor-001',
        email: 'doctor@dent.ru',
        name: 'Доктор Петров',
        role: 'doctor',
        password: 'doctor123',
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: 'patient-001',
        email: 'patient@dent.ru',
        name: 'Пациент Иванов',
        role: 'patient',
        password: 'patient123',
        isActive: true,
        createdAt: new Date(),
      }
    );

    // Создаём права доступа
    this.permissions = [
      {
        id: 'p1',
        name: 'Управление пользователями',
        description: 'Добавление, редактирование, удаление пользователей',
        roles: ['superadmin', 'admin'],
      },
      {
        id: 'p2',
        name: 'Просмотр календаря',
        description: 'Доступ к просмотру расписания',
        roles: ['superadmin', 'admin', 'doctor', 'assistant', 'patient'],
      },
      {
        id: 'p3',
        name: 'Редактирование записей',
        description: 'Возможность изменять записи пациентов',
        roles: ['superadmin', 'admin', 'doctor'],
      },
      {
        id: 'p4',
        name: 'Настройка iDent БД',
        description: 'Настройка подключения и SQL-запросов',
        roles: ['superadmin'],
      },
    ];
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  validateUser(email: string, password: string): User | null {
    const user = this.findUserByEmail(email);
    if (user && user.password === password && user.isActive) {
      return user;
    }
    return null;
  }

  getUserPermissions(userId: string): Permission[] {
    const user = this.users.find(u => u.id === userId);
    if (!user) return [];
    return this.permissions.filter(p => p.roles.includes(user.role));
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getAllPermissions(): Permission[] {
    return this.permissions;
  }
}

// Экспортируем синглтон
export const userDatabase = new UserDatabase();