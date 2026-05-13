import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <main className="pt-32 pb-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Keranjang Belanja.</h2>
          <p className="text-gray-400 font-medium">Anda memiliki {cartCount} item di keranjang Anda.</p>
        </div>

        {cart.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-gray-50/50 rounded-3xl border border-gray-50"
                  >
                    <div className="w-32 h-40 bg-gray-200 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-80" referrerPolicy="no-referrer" />
                    </div>

                    <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full text-center sm:text-left">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{item.category}</p>
                        <p className="mt-4 font-black text-sm">Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>

                      <div className="flex items-center justify-center sm:justify-start gap-8">
                        <div className="flex items-center border border-gray-100 rounded-full px-4 py-2 gap-4 bg-white shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-400 hover:text-gray-900 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-400 hover:text-gray-900 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-3xl p-8 sticky top-28 border border-gray-50">
                <h3 className="text-lg font-bold mb-8">Ringkasan Belanja</h3>
                
                <div className="space-y-4 mb-10 pb-10 border-b border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-black uppercase tracking-widest">Subtotal</span>
                    <span className="font-black">Rp {cartTotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-black uppercase tracking-widest">Pajak</span>
                    <span className="font-black text-gray-400 italic">Termasuk</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-black uppercase tracking-widest">Pengiriman</span>
                    <span className="font-black text-[10px] text-gray-300">Dihitung saat checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Total Harga</span>
                  <span className="text-2xl font-black">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-200"
                >
                  Lanjut ke Checkout <ArrowRight size={16} />
                </button>
                
                <Link to="/shop" className="block text-center mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors">
                  Lanjut Belanja
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-40 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mb-8">
              <ShoppingBag size={40} />
            </div>
            <h3 className="text-xl font-bold mb-4">Keranjang Anda kosong</h3>
            <p className="text-gray-400 max-w-sm mb-10 font-medium leading-relaxed">Sepertinya Anda belum menambahkan produk apapun ke dalam keranjang belanja Anda hari ini.</p>
            <Link 
              to="/shop" 
              className="px-10 py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all"
            >
              Mulai Belanja
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
