import { useState } from 'react';
import { motion } from 'motion/react';
import { Filter } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const filteredProducts = selectedCategory === 'Semua' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <main className="pt-32 pb-40 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Katalog Produk.</h2>
          <p className="text-gray-400 font-medium max-w-md">Jelajahi koleksi essensial kami yang dikurasi dengan presisi untuk kenyamanan dan gaya Anda.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 border-b border-gray-50 pb-8">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                <button 
                    onClick={() => setSelectedCategory('Semua')}
                    className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all ${
                        selectedCategory === 'Semua' ? 'bg-black text-white' : 'text-gray-400 hover:text-gray-900'
                    }`}
                >
                    Semua
                </button>
                {CATEGORIES.map(cat => (
                    <button 
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                            selectedCategory === cat.name ? 'bg-black text-white' : 'text-gray-400 hover:text-gray-900'
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-2 text-gray-400">
                <Filter size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Filter</span>
            </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-12 md:gap-y-16">
                {filteredProducts.map((product, idx) => (
                    <ProductCard key={product.id} product={product} idx={idx} />
                ))}
            </div>
        ) : (
            <div className="py-40 text-center">
                <p className="text-gray-400 font-medium italic">Tidak ada produk ditemukan di kategori ini.</p>
            </div>
        )}
      </div>
    </main>
  );
};

export default Shop;
