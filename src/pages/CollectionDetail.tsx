import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { useCart } from '../context/CartContext';

const CollectionDetail = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  
  const collection = COLLECTIONS.find(c => c.slug === slug);
  const collectionProducts = PRODUCTS.filter(p => p.collectionId === collection?.id);

  if (!collection) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-2xl font-bold">Koleksi tidak ditemukan.</h2>
        <Link to="/collections" className="text-blue-600 mt-4 block">Kembali ke Koleksi</Link>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-40 px-6">
      <div className="max-w-6xl mx-auto">
        <Link to="/collections" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors mb-12">
          <ArrowLeft size={14} /> Kembali ke Koleksi
        </Link>

        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-6">Volume {collection.id}</p>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">{collection.title}</h2>
                <p className="text-gray-500 font-medium leading-relaxed max-w-md">
                    {collection.description}
                </p>
            </div>
            <div className="aspect-[16/9] rounded-[2rem] overflow-hidden bg-gray-50">
                <img src={collection.image} alt={collection.title} className="w-full h-full object-cover grayscale opacity-80" referrerPolicy="no-referrer" />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-12 md:gap-y-16">
          {collectionProducts.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={`/product/${product.id}`} className="block mb-6 relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-[2rem]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product, 1);
                  }}
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center translate-y-20 group-hover:translate-y-0 transition-transform duration-500 shadow-xl"
                >
                  <ShoppingCart size={18} />
                </button>
              </Link>
              
              <div className="px-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xs font-black uppercase tracking-tight leading-tight group-hover:text-blue-600 transition-colors uppercase cursor-pointer">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Star size={10} fill="currentColor" className="text-yellow-400" />
                  <span className="text-[10px] font-black text-gray-400 tracking-widest">{product.rating}</span>
                </div>
                <p className="text-sm font-black tracking-tight">Rp {product.price.toLocaleString('id-ID')}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {collectionProducts.length === 0 && (
            <div className="py-20 text-center text-gray-400">
                <p className="text-xs font-black uppercase tracking-widest leading-relaxed">Belum ada produk dalam koleksi ini.</p>
            </div>
        )}
      </div>
    </main>
  );
};

export default CollectionDetail;
