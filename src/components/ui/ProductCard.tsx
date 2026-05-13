import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  idx?: number;
}

const ProductCard = ({ product, idx = 0 }: ProductCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 mb-6 relative">
            <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded">
                    {product.category}
                </span>
                {product.stock === 0 && (
                    <span className="ml-2 bg-red-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg shadow-red-200">
                        Habis
                    </span>
                )}
            </div>
        </div>
      </Link>
      <div className="flex justify-between items-start">
        <div>
          <Link to={`/product/${product.id}`}>
            <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h4>
          </Link>
          <div className="flex items-center gap-1.5 grayscale opacity-50">
            <Star className="fill-gray-900 text-gray-900" size={10} />
            <span className="text-[10px] font-black uppercase tracking-tighter">{product.rating}</span>
          </div>
        </div>
        <p className="text-sm font-black text-right">
          Rp {product.price.toLocaleString('id-ID')}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
