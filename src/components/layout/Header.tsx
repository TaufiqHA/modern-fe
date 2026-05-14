import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { cartCount, cart, cartTotal } = useCart();
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Koleksi', href: '/collections' },
    { name: 'Jastip', href: '/jastip' },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-xl font-black tracking-tighter">MODERN.</Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.href} 
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                location.pathname === item.href ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-6 md:gap-8">
          <button className="text-gray-400 hover:text-gray-900 transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="text-gray-400 hover:text-gray-900 transition-colors relative"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mini Cart Popup */}
            <AnimatePresence>
              {isCartOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsCartOpen(false)}
                  ></div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="fixed top-24 left-4 right-4 md:absolute md:top-auto md:left-auto md:right-0 md:mt-6 md:w-80 bg-white shadow-2xl rounded-3xl border border-gray-50 overflow-hidden z-50 mx-auto max-w-sm md:max-w-none"
                    >
                    <div className="p-6 border-b border-gray-50">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em]">Ringkasan Keranjang</h4>
                    </div>

                    <div className="max-h-80 overflow-y-auto no-scrollbar">
                      {cart.length > 0 ? (
                        <div className="p-6 space-y-6">
                          {cart.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <div className="w-12 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-80" />
                              </div>
                              <div className="flex flex-col justify-center">
                                <p className="text-[10px] font-black uppercase tracking-tight line-clamp-1">{item.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold mt-1">{item.quantity} × Rp {item.price.toLocaleString('id-ID')}</p>
                              </div>
                            </div>
                          ))}
                          {cart.length > 3 && (
                            <p className="text-[10px] text-gray-400 italic text-center">+{cart.length - 3} item lainnya</p>
                          )}
                        </div>
                      ) : (
                        <div className="p-12 text-center">
                          <ShoppingCart size={24} className="mx-auto text-gray-200 mb-4" />
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Keranjang Kosong</p>
                        </div>
                      )}
                    </div>

                    <div className="p-6 bg-gray-50 flex flex-col gap-3">
                      {cart.length > 0 && (
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total</span>
                            <span className="text-sm font-black">Rp {cartTotal.toLocaleString('id-ID')}</span>
                        </div>
                      )}
                      <Link 
                        to="/cart" 
                        onClick={() => setIsCartOpen(false)}
                        className="w-full py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl text-center hover:bg-blue-600 transition-colors"
                      >
                        Lihat Semua
                      </Link>
                      {cart.length > 0 && (
                        <Link 
                          to="/checkout" 
                          onClick={() => setIsCartOpen(false)}
                          className="w-full py-3 border border-gray-100 bg-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl text-center hover:border-gray-900 transition-colors"
                        >
                          Checkout
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <div className="relative">
            {isLoading ? (
                <div className="w-8 h-8 rounded-full bg-gray-50 animate-pulse border border-gray-100"></div>
            ) : isAuthenticated ? (
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-100 flex items-center justify-center hover:border-gray-900 transition-colors"
              >
                {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <User size={16} />
                )}
              </button>
            ) : (
              <Link to="/login" className="text-gray-400 hover:text-gray-900 transition-colors">
                <User size={20} />
              </Link>
            )}

            <AnimatePresence>
                {isUserMenuOpen && isAuthenticated && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)}></div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 mt-6 w-48 bg-white shadow-2xl rounded-2xl border border-gray-50 overflow-hidden z-50 p-2"
                        >
                            <div className="p-4 border-b border-gray-50 mb-2">
                                <p className="text-[10px] font-black uppercase tracking-tight line-clamp-1">{user?.name}</p>
                                <p className="text-[8px] text-gray-400 font-bold truncate mt-1">{user?.email}</p>
                            </div>
                            <Link 
                                to="/account/profile" 
                                onClick={() => setIsUserMenuOpen(false)}
                                className="block w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                Profil
                            </Link>
                            <Link 
                                to="/account/orders" 
                                onClick={() => setIsUserMenuOpen(false)}
                                className="block w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                Pesanan Saya
                            </Link>
                            <Link 
                                to="/account/jastip" 
                                onClick={() => setIsUserMenuOpen(false)}
                                className="block w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                Request Jastip
                            </Link>
                            {user?.role === 'admin' && (
                                <Link 
                                    to="/admin" 
                                    onClick={() => setIsUserMenuOpen(false)}
                                    className="block w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 transition-colors rounded-lg mt-1"
                                >
                                    Admin Panel
                                </Link>
                            )}
                            <div className="h-[1px] bg-gray-50 my-2"></div>
                            <button 
                                onClick={() => { logout(); setIsUserMenuOpen(false); }}
                                className="w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors rounded-xl"
                            >
                                Logout
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
          </div>
          <button 
            className="md:hidden text-gray-900" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 py-8 px-6 md:hidden z-40"
          >
            <nav className="flex flex-col gap-6 items-center">
              {menuItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.href} 
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
