import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, AuthResponse } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password?: string) => Promise<void>;
  register: (data: { name: string; email: string; password?: string; phone?: string }) => Promise<void>;
  sendOtp: (phone: string) => Promise<void>;
  verifyOtp: (phone: string, otp: string) => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token && !user) {
        try {
          const response = await fetch(`${API_URL}/user/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            // Handle both { user: ... } and direct user object
            setUser(data.user || data);
          } else {
            // Token invalid or expired
            logout();
          }
        } catch (error) {
          console.error('Failed to fetch user:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token, user]);

  const login = async (email: string, password?: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok || data.status === 'error') {
      throw new Error(data.message || 'Login failed');
    }

    // Support both direct data and data.user/data.token
    const userToSet = data.user || data.data?.user || data.data;
    const tokenToSet = data.token || data.data?.token;

    if (tokenToSet) {
      setToken(tokenToSet);
      localStorage.setItem('token', tokenToSet);
    }
    
    if (userToSet) {
      setUser(userToSet);
    }
  };

  const register = async (userData: { name: string; email: string; password?: string; phone?: string }) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok || data.status === 'error') {
      throw new Error(data.message || 'Registration failed');
    }

    const userToSet = data.user || data.data?.user || data.data;
    const tokenToSet = data.token || data.data?.token;

    if (tokenToSet) {
      setToken(tokenToSet);
      localStorage.setItem('token', tokenToSet);
    }
    
    if (userToSet) {
      setUser(userToSet);
    }
  };

  const sendOtp = async (phone: string) => {
    const response = await fetch(`${API_URL}/auth/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send OTP');
    }
  };

  const verifyOtp = async (phone: string, otp: string) => {
    const response = await fetch(`${API_URL}/auth/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp })
    });

    const data = await response.json();

    if (!response.ok || data.status === 'error') {
      throw new Error(data.message || 'Invalid OTP');
    }

    const userToSet = data.user || data.data?.user || data.data;
    const tokenToSet = data.token || data.data?.token;

    if (tokenToSet) {
      setToken(tokenToSet);
      localStorage.setItem('token', tokenToSet);
    }
    
    if (userToSet) {
      setUser(userToSet);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!token) return;

    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok || data.status === 'error') {
      throw new Error(data.message || 'Failed to update profile');
    }

    const updatedUser = data.user || data.data?.user || data.data;
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      login, 
      register,
      sendOtp,
      verifyOtp,
      updateUser,
      logout, 
      isAuthenticated: !!user, 
      isAdmin: user?.role === 'admin',
      isLoading
    }}>
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
