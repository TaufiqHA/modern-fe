import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification } from '../types';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { token, isAuthenticated } = useAuth();

  const fetchNotifications = async () => {
    if (!token || !isAuthenticated) return;
    
    try {
      const response = await fetch(`${API_URL}/notifications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      setNotifications(data.notifications || data.data?.notifications || []);
      setUnreadCount(data.unread_count || data.data?.unread_count || 0);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const markAsRead = async (id: string) => {
    if (!token) return;
    try {
      await fetch(`${API_URL}/notifications/${id}/read`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!token) return;
    try {
      await fetch(`${API_URL}/notifications/read-all`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
      // Simple polling every 60 seconds
      const interval = setInterval(fetchNotifications, 60000);
      return () => clearInterval(interval);
    } else {
        setNotifications([]);
        setUnreadCount(0);
    }
  }, [isAuthenticated, token]);

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      isLoading, 
      fetchNotifications, 
      markAsRead, 
      markAllAsRead 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
