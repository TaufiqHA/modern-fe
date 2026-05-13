import { Product, Category } from '../types';

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Sepatu', icon: '👟' },
  { id: 2, name: 'Pakaian', icon: '👗' },
  { id: 3, name: 'Tas', icon: '🎒' },
  { id: 4, name: 'Aksesori', icon: '🧢' },
  { id: 5, name: 'Elektronik', icon: '💻' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Essential White Sneakers',
    price: 899000,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    category: 'Sepatu',
    description: 'Sneakers putih esensial dengan desain minimalis. Dibuat dari bahan sintetis berkualitas tinggi yang tahan lama dan mudah dibersihkan. Sangat nyaman untuk penggunaan sehari-hari.',
    collectionId: 1,
    stock: 0
  },
  {
    id: 2,
    name: 'Minimalist Cotton Tee',
    price: 199000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    category: 'Pakaian',
    description: 'Kaos katun 100% yang lembut dan menyerap keringat. Potongan rileks yang modern, cocok dipadukan dengan celana apapun untuk tampilan kasual yang rapi.',
    collectionId: 1,
    stock: 15
  },
  {
    id: 3,
    name: 'Leather Everyday Bag',
    price: 1450000,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    category: 'Tas',
    description: 'Tas kulit asli yang elegan untuk segala kebutuhan. Memiliki banyak kompartemen fungsional untuk menyimpan laptop, buku, dan perlengkapan harian Anda.',
    collectionId: 3,
    stock: 5
  },
  {
    id: 4,
    name: 'Classic Denims',
    price: 549000,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    category: 'Pakaian',
    description: 'Celana denim klasik dengan potongan straight fit. Menggunakan bahan denim berkualitas yang akan semakin nyaman seiring berjalannya waktu.',
    collectionId: 1,
    stock: 20
  },
  {
    id: 5,
    name: 'Smart Watch S2',
    price: 2450000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    category: 'Elektronik',
    description: 'Jam tangan pintar generasi terbaru dengan fitur pelacakan kesehatan lengkap dan notifikasi cerdas. Daya tahan baterai hingga 5 hari.',
    collectionId: 3,
    stock: 8
  },
  {
    id: 6,
    name: 'Canvas Hip Bag',
    price: 299000,
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=400',
    rating: 4.4,
    category: 'Tas',
    description: 'Tas pinggang kanvas yang praktis untuk liburan atau aktivitas luar ruangan. Ringan dan memiliki kunci pengaman yang kuat.',
    collectionId: 3,
    stock: 12
  },
  {
    id: 7,
    name: 'Wool Blend Coat',
    price: 1850000,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    category: 'Pakaian',
    description: 'Mantel campuran wol yang hangat dan bergaya. Memberikan siluet yang tegas dan profesional untuk musim dingin atau acara formal.',
    collectionId: 2,
    stock: 3
  },
  {
    id: 8,
    name: 'Modern Sunglasses',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1511499767390-a7335958648d?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    category: 'Aksesori',
    description: 'Kacamata hitam modern dengan perlindungan UV 400. Desain frame yang timeless cocok untuk berbagai bentuk wajah.',
    collectionId: 3,
    stock: 25
  }
];
