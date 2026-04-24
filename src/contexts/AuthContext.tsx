import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type RolePermissions = {
  canManageVideos: boolean;
  canManageTicker: boolean;
  canDeleteComments: boolean;
  canBanUsers: boolean;
  canManageAdmins: boolean;
  canEditDefaults: boolean;
};

export interface AdminRole {
  id: string;
  name: string;
  tag: string;
  color: string; // tailwind color class or hex
  permissions: RolePermissions;
}

export interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  roleId?: string; // references AdminRole.id
  joinedAt: string;
  avatar?: string; // base64 or url
  banned?: boolean;
  bannedUntil?: string | null; // ISO or null = permanent
  banReason?: string;
}

interface StoredUser extends User {
  passwordHash: string;
}

interface AuthContextType {
  user: User | null;
  login: (usernameOrEmail: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  updateAvatar: (base64: string) => void;
  isAuthenticated: boolean;
  getRole: (roleId?: string) => AdminRole | null;
  hasPermission: (permission: keyof RolePermissions) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ADMIN_USERNAME = 'RageIntel';
const ADMIN_PASSWORD = 'V1c3C1ty@R@G3#2026!';

const OWNER_ROLE: AdminRole = {
  id: 'owner',
  name: 'Owner',
  tag: 'OWNER',
  color: '#facc15',
  permissions: {
    canManageVideos: true,
    canManageTicker: true,
    canDeleteComments: true,
    canBanUsers: true,
    canManageAdmins: true,
    canEditDefaults: true,
  },
};

function hashish(str: string): string {
  return btoa(str + '::rageintel_salt_2026');
}

export function getStoredRoles(): AdminRole[] {
  try {
    const r = localStorage.getItem('rageintel_roles');
    return r ? JSON.parse(r) : [OWNER_ROLE];
  } catch { return [OWNER_ROLE]; }
}

export function saveRoles(roles: AdminRole[]) {
  localStorage.setItem('rageintel_roles', JSON.stringify(roles));
}

export function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem('rageintel_users') || '[]');
  } catch { return []; }
}

export function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem('rageintel_users', JSON.stringify(users));
}

function isBanned(u: User): boolean {
  if (!u.banned) return false;
  if (!u.bannedUntil) return true; // permanent
  return new Date(u.bannedUntil) > new Date();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('rageintel_user');
    if (stored) {
      try {
        const parsed: User = JSON.parse(stored);
        // Refresh ban status from users list
        if (!parsed.isAdmin || parsed.username !== ADMIN_USERNAME) {
          const users = getStoredUsers();
          const found = users.find(u => u.username === parsed.username);
          if (found && isBanned(found)) {
            localStorage.removeItem('rageintel_user');
            return;
          }
          if (found) {
            const refreshed = { ...parsed, avatar: found.avatar, banned: found.banned, bannedUntil: found.bannedUntil };
            setUser(refreshed);
            localStorage.setItem('rageintel_user', JSON.stringify(refreshed));
            return;
          }
        }
        setUser(parsed);
      } catch {
        localStorage.removeItem('rageintel_user');
      }
    }
  }, []);

  const getRole = (roleId?: string): AdminRole | null => {
    if (!roleId) return null;
    const roles = getStoredRoles();
    return roles.find(r => r.id === roleId) || null;
  };

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    if (!user?.isAdmin) return false;
    if (user.username === ADMIN_USERNAME && (!user.roleId || user.roleId === 'owner')) return true;
    const role = getRole(user.roleId);
    return role?.permissions[permission] ?? false;
  };

  const login = async (usernameOrEmail: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 500));

    if (usernameOrEmail === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        username: ADMIN_USERNAME,
        email: 'admin@rageintel.com',
        isAdmin: true,
        roleId: 'owner',
        joinedAt: '2026-03-01T00:00:00Z',
      };
      setUser(adminUser);
      localStorage.setItem('rageintel_user', JSON.stringify(adminUser));
      return { success: true };
    }

    const users = getStoredUsers();
    const found = users.find(
      u => (u.username.toLowerCase() === usernameOrEmail.toLowerCase() ||
            u.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
           u.passwordHash === hashish(password)
    );

    if (!found) return { success: false, error: 'Invalid username/email or password.' };

    if (isBanned(found)) {
      const msg = found.bannedUntil
        ? `You are banned until ${new Date(found.bannedUntil).toLocaleDateString()}.${found.banReason ? ' Reason: ' + found.banReason : ''}`
        : `You are permanently banned.${found.banReason ? ' Reason: ' + found.banReason : ''}`;
      return { success: false, error: msg };
    }

    const loggedIn: User = {
      username: found.username,
      email: found.email,
      isAdmin: found.isAdmin || false,
      roleId: found.roleId,
      joinedAt: found.joinedAt,
      avatar: found.avatar,
    };
    setUser(loggedIn);
    localStorage.setItem('rageintel_user', JSON.stringify(loggedIn));
    return { success: true };
  };

  const signup = async (username: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 500));

    if (username.toLowerCase() === 'rageintel') return { success: false, error: 'That username is reserved.' };
    if (password.length < 8) return { success: false, error: 'Password must be at least 8 characters.' };

    const users = getStoredUsers();
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) return { success: false, error: 'Username already taken.' };
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) return { success: false, error: 'Email already registered.' };

    const newUser: StoredUser = {
      username, email,
      passwordHash: hashish(password),
      isAdmin: false,
      joinedAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveStoredUsers(users);

    const loggedIn: User = { username, email, isAdmin: false, joinedAt: newUser.joinedAt };
    setUser(loggedIn);
    localStorage.setItem('rageintel_user', JSON.stringify(loggedIn));
    return { success: true };
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 400));
    if (!user) return { success: false, error: 'Not logged in.' };
    if (newPassword.length < 8) return { success: false, error: 'New password must be at least 8 characters.' };

    // Owner
    if (user.username === ADMIN_USERNAME) {
      // We can't actually change the hardcoded password, but for demo we store an override
      if (oldPassword !== ADMIN_PASSWORD) {
        const override = localStorage.getItem('rageintel_owner_pw');
        if (!override || hashish(oldPassword) !== override) return { success: false, error: 'Incorrect current password.' };
      }
      localStorage.setItem('rageintel_owner_pw', hashish(newPassword));
      return { success: true };
    }

    const users = getStoredUsers();
    const idx = users.findIndex(u => u.username === user.username);
    if (idx === -1) return { success: false, error: 'User not found.' };
    if (users[idx].passwordHash !== hashish(oldPassword)) return { success: false, error: 'Incorrect current password.' };

    users[idx].passwordHash = hashish(newPassword);
    saveStoredUsers(users);
    return { success: true };
  };

  const updateAvatar = (base64: string) => {
    if (!user) return;
    const updated = { ...user, avatar: base64 };
    setUser(updated);
    localStorage.setItem('rageintel_user', JSON.stringify(updated));

    if (user.username !== ADMIN_USERNAME) {
      const users = getStoredUsers();
      const idx = users.findIndex(u => u.username === user.username);
      if (idx !== -1) { users[idx].avatar = base64; saveStoredUsers(users); }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rageintel_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, changePassword, updateAvatar, isAuthenticated: !!user, getRole, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
