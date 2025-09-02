import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'employee' | 'employer' | null;

type AuthContextType = {
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
    role: UserRole;
  } | null;
  login: (email: string, password: string, role: UserRole) => void;
  loginWithRole: (role: Exclude<UserRole, null>) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (data: { name?: string | null; email?: string | null }) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user']>(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email: string, password: string, role: UserRole) => {
    // In a real app, you would validate credentials with your backend
    const newUser = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role,
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const loginWithRole = (role: Exclude<UserRole, null>) => {
    const email = role === 'employer' ? 'employer@example.com' : 'student@example.com';
    const newUser = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      name: role === 'employer' ? 'Employer' : 'Student',
      email,
      role,
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const switchRole = (role: UserRole) => {
    if (!user) return;
    
    const updatedUser = { ...user, role };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updateProfile = (data: { name?: string | null; email?: string | null }) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithRole, logout, switchRole, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
