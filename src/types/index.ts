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
