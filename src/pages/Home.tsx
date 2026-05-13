import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { PRODUCTS } from '../data/products';

const Home = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <main className="pt-20">
      {/* Simple Hero */}
      <section className="px-6 pt-10 pb-20 md:pt-16 md:pb-32 lg:pt-20 lg:pb-40">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center md:text-left flex flex-col items-center md:items-start"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
              Masa Depan <br />
              <span className="text-gray-300 text-3xl sm:text-4xl md:text-4xl lg:text-7xl block mt-2 md:mt-0">Esensial.</span>
            </h2>
            <p className="text-base md:text-lg text-gray-500 max-w-sm mb-10 leading-relaxed font-medium">
              Temukan harmoni antara fungsi murni dan desain abadi dalam setiap produk yang kami kurasi khusus untuk Anda.
            </p>
            <Link to="/shop" className="group flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] hover:text-blue-600 transition-colors">
              Mulai Belanja <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-50 group"
          >
            <img 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800" 
              alt="Featured"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Clean Grid */}
      <section className="px-6 pb-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-12 sm:mb-16 gap-4">
            <h3 className="text-3xl font-bold tracking-tight">Koleksi Terbatas</h3>
            <Link to="/collections" className="text-sm font-bold text-gray-300 tracking-widest uppercase hover:text-gray-900 transition-colors">Edisi 01 — Lihat Semua</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-12 md:gap-y-16">
            {featuredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} idx={idx} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
