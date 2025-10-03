import { LocalStorageDB } from './localStorageDB';

// Tipos e utilidades
export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string; // apenas para demo local. NUNCA use em produção desta forma
  createdAt: string;
  updatedAt: string;
};

export type SafeUser = Omit<User, 'passwordHash'>;

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type UpdateProfileInput = Partial<Pick<User, 'name' | 'email'>>;

const NAMESPACE = 'app';
const USERS_COLLECTION = 'users';
const CURRENT_USER_KEY = 'auth:currentUserId';

const db = new LocalStorageDB(NAMESPACE);

function nowISO() {
  return new Date().toISOString();
}

function hashPassword(pwd: string): string {
  // AVISO: apenas para ambiente local/demonstração
  try {
    return btoa(pwd);
  } catch {
    return pwd;
  }
}

function sanitize(user: User | null | undefined): SafeUser | null {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function genId() {
  return `u_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

function getUsers(): User[] {
  return db.loadCollection<User>(USERS_COLLECTION);
}

function saveUsers(users: User[]) {
  db.saveCollection<User>(USERS_COLLECTION, users);
}

function getCurrentUserId(): string | null {
  return db.get<string>(CURRENT_USER_KEY, null);
}

function setCurrentUserId(id: string | null) {
  if (id) db.set(CURRENT_USER_KEY, id);
  else db.remove(CURRENT_USER_KEY);
}

// API pública
export const authService = {
  register(input: RegisterInput): SafeUser {
    const { name, email, password } = input;

    const users = getUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error('E-mail já cadastrado.');
    }

    const user: User = {
      id: genId(),
      name,
      email,
      passwordHash: hashPassword(password),
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };

    users.push(user);
    saveUsers(users);
    setCurrentUserId(user.id);

    return sanitize(user)!;
  },

  login(input: LoginInput): SafeUser {
    const { email, password } = input;
    const users = getUsers();
    const pwdHash = hashPassword(password);

    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === pwdHash
    );

    if (!user) {
      throw new Error('Credenciais inválidas.');
    }

    setCurrentUserId(user.id);
    return sanitize(user)!;
  },

  logout(): void {
    setCurrentUserId(null);
  },

  getCurrentUser(): SafeUser | null {
    const id = getCurrentUserId();
    if (!id) return null;
    const users = getUsers();
    const user = users.find((u) => u.id === id) || null;
    return sanitize(user);
  },

  updateProfile(update: UpdateProfileInput): SafeUser {
    const id = getCurrentUserId();
    if (!id) throw new Error('Não autenticado.');

    const users = getUsers();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error('Usuário não encontrado.');

    // Se alterar email, verificar duplicidade
    if (update.email && update.email !== users[idx].email) {
      const exists = users.some(
        (u) => u.id !== id && u.email.toLowerCase() === update.email!.toLowerCase()
      );
      if (exists) throw new Error('E-mail já está em uso.');
    }

    const updated: User = {
      ...users[idx],
      ...update,
      updatedAt: nowISO(),
    };

    users[idx] = updated;
    saveUsers(users);
    return sanitize(updated)!;
  },

  changePassword(currentPassword: string, newPassword: string): void {
    const id = getCurrentUserId();
    if (!id) throw new Error('Não autenticado.');

    const users = getUsers();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error('Usuário não encontrado.');

    const user = users[idx];
    if (user.passwordHash !== hashPassword(currentPassword)) {
      throw new Error('Senha atual incorreta.');
    }

    users[idx] = {
      ...user,
      passwordHash: hashPassword(newPassword),
      updatedAt: nowISO(),
    };

    saveUsers(users);
  },

  // Utilidades para testes/seed local
  reset(): void {
    db.clearAll();
  },
};

export default authService;
