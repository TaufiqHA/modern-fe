/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Filter, Loader2, RefreshCcw } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { Product, Category } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000 });
  const [debouncedPriceRange, setDebouncedPriceRange] = useState({ min: 0, max: 2000000 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 500);
    return () => clearTimeout(timer);
  }, [priceRange]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      
      const categoryData = Array.isArray(data) ? data : (data.data || []);
      setCategories(categoryData);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setCategories([]);
    }
  };

  const fetchProducts = async (page: number, category: string, append: boolean = false, minPrice: number, maxPrice: number) => {
    if (append) setIsFetchingMore(true);
    else setIsLoading(true);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '8',
        min_price: minPrice.toString(),
        max_price: maxPrice.toString(),
      });
      if (category !== 'Semua') {
        params.append('category', category);
      }

      const response = await fetch(`${API_URL}/products?${params.toString()}`);
      const data = await response.json();
      
      const newProducts = data.data || data.products || [];
      const meta = data.meta || data;

      if (append) {
        setProducts(prev => [...prev, ...newProducts]);
      } else {
        setProducts(newProducts);
      }
      
      setLastPage(meta.last_page || 1);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(1, selectedCategory, false, debouncedPriceRange.min, debouncedPriceRange.max);
    setCurrentPage(1);
  }, [selectedCategory, debouncedPriceRange]);

  const handleLoadMore = () => {
    if (currentPage < lastPage) {
      const nextPage = currentPage + 1;
      fetchProducts(nextPage, selectedCategory, true, debouncedPriceRange.min, debouncedPriceRange.max);
      setCurrentPage(nextPage);
    }
  };

  return (
    <main className="pt-32 pb-40 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Katalog Produk.</h2>
          <p className="text-gray-400 font-medium max-w-md">Jelajahi koleksi essensial kami yang dikurasi dengan presisi untuk kenyamanan dan gaya Anda.</p>
        </div>

        {/* Filters and Price Slider */}
        <div className="space-y-8 mb-16 border-b border-gray-50 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                    <button 
                        onClick={() => setSelectedCategory('Semua')}
                        className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all ${
                            selectedCategory === 'Semua' ? 'bg-black text-white' : 'text-gray-400 hover:text-gray-900'
                        }`}
                    >
                        Semua
                    </button>
                    {Array.isArray(categories) && categories.map(cat => (
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

            {/* Price Range Slider */}
            <div className="max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Rentang Harga</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest">
                        Rp {priceRange.min.toLocaleString()} - Rp {priceRange.max.toLocaleString()}
                    </p>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full mb-6">
                    <div 
                        className="absolute h-full bg-black rounded-full"
                        style={{
                            left: `${(priceRange.min / 2000000) * 100}%`,
                            right: `${100 - (priceRange.max / 2000000) * 100}%`
                        }}
                    />
                    <input 
                        type="range"
                        min="0"
                        max="2000000"
                        step="50000"
                        value={priceRange.min}
                        onChange={(e) => {
                            const val = Math.min(Number(e.target.value), priceRange.max - 50000);
                            setPriceRange({ ...priceRange, min: val });
                        }}
                        className="absolute w-full top-0 h-2 bg-transparent appearance-none pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                    />
                    <input 
                        type="range"
                        min="0"
                        max="2000000"
                        step="50000"
                        value={priceRange.max}
                        onChange={(e) => {
                            const val = Math.max(Number(e.target.value), priceRange.min + 50000);
                            setPriceRange({ ...priceRange, max: val });
                        }}
                        className="absolute w-full top-0 h-2 bg-transparent appearance-none pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                    />
                </div>
            </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
            <div className="py-40 flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-gray-100" size={48} />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Memuat Katalog...</p>
            </div>
        ) : products.length > 0 ? (
            <div className="space-y-20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-12 md:gap-y-16">
                    {products.map((product, idx) => (
                        <div key={`${product.id}-${idx}`}>
                            <ProductCard product={product} idx={idx} />
                        </div>
                    ))}
                </div>

                {currentPage < lastPage && (
                    <div className="flex justify-center pt-10">
                        <button 
                            onClick={handleLoadMore}
                            disabled={isFetchingMore}
                            className="flex items-center gap-3 px-10 py-5 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:border-gray-900 transition-all disabled:opacity-50"
                        >
                            {isFetchingMore ? (
                                <Loader2 className="animate-spin" size={16} />
                            ) : (
                                <RefreshCcw size={16} />
                            )}
                            {isFetchingMore ? 'Memuat...' : 'Muat Lebih Banyak'}
                        </button>
                    </div>
                )}
            </div>
        ) : (
            <div className="py-40 text-center bg-gray-50 rounded-[3rem] border border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tidak ada produk ditemukan di kategori ini.</p>
            </div>
        )}
      </div>
    </main>
  );
};

export default Shop;
