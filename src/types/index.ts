export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  avatar?: string;
  bio?: string;
}

export interface Address {
  id: number;
  label: string;
  recipient: string;
  phone: string;
  detail: string;
  is_default: boolean;
}

export interface PaginatedProducts {
  data: Product[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

export interface AuthResponse {
  status: string;
  token: string;
  user: User;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description?: string;
  collectionId?: number;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Collection {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  count: number;
}

export interface StockLog {
  id: number;
  change: number;
  type: 'In' | 'Out';
  note: string;
  date: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'order' | 'jastip' | 'payment' | 'alert';
  unread: boolean;
  created_at: string;
}
