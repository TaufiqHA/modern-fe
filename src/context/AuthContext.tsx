import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (emailOrPhone: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (emailOrPhone: string) => {
    // Simulasi loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isEmail = emailOrPhone.includes('@');
    const isAdminEmail = emailOrPhone === 'admin@modern.com';

    // Simulasi user login
    setUser({
      id: '1',
      name: isAdminEmail ? 'Admin Master' : 'User Demo',
      email: isEmail ? emailOrPhone : 'user@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
      role: isAdminEmail ? 'admin' : 'user'
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
