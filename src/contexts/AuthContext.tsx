import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  joinedAt: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (usernameOrEmail: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Admin credentials (hashed concept — stored as-is for client-side demo)
const ADMIN_USERNAME = 'RageIntel';
const ADMIN_PASSWORD_HASH = 'V1c3C1ty@R@G3#2026!';

function hashish(str: string): string {
  // Simple obfuscation for demo
  return btoa(str + '::rageintel_salt_2026');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('rageintel_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('rageintel_user');
      }
    }
  }, []);

  const login = async (usernameOrEmail: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 600));

    // Admin check
    if (usernameOrEmail === ADMIN_USERNAME && password === ADMIN_PASSWORD_HASH) {
      const adminUser: User = {
        username: 'RageIntel',
        email: 'admin@rageintel.com',
        isAdmin: true,
        joinedAt: '2026-03-01T00:00:00Z',
      };
      setUser(adminUser);
      localStorage.setItem('rageintel_user', JSON.stringify(adminUser));
      return { success: true };
    }

    // Regular users
    const users = getStoredUsers();
    const found = users.find(
      u => (u.username.toLowerCase() === usernameOrEmail.toLowerCase() || u.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
           u.passwordHash === hashish(password)
    );

    if (!found) {
      return { success: false, error: 'Invalid username/email or password.' };
    }

    const loggedIn: User = {
      username: found.username,
      email: found.email,
      isAdmin: false,
      joinedAt: found.joinedAt,
    };
    setUser(loggedIn);
    localStorage.setItem('rageintel_user', JSON.stringify(loggedIn));
    return { success: true };
  };

  const signup = async (username: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 600));

    if (username.toLowerCase() === 'rageintel') {
      return { success: false, error: 'That username is reserved.' };
    }
    if (password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters.' };
    }

    const users = getStoredUsers();
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, error: 'Username already taken.' };
    }
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already registered.' };
    }

    const newUser = {
      username,
      email,
      passwordHash: hashish(password),
      isAdmin: false,
      joinedAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem('rageintel_users', JSON.stringify(users));

    const loggedIn: User = { username, email, isAdmin: false, joinedAt: newUser.joinedAt };
    setUser(loggedIn);
    localStorage.setItem('rageintel_user', JSON.stringify(loggedIn));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rageintel_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

function getStoredUsers(): Array<{ username: string; email: string; passwordHash: string; isAdmin: boolean; joinedAt: string }> {
  try {
    return JSON.parse(localStorage.getItem('rageintel_users') || '[]');
  } catch {
    return [];
  }
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
