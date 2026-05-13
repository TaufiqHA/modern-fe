import { ReactNode, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  Plane, 
  Bell,
  ArrowLeft,
  Menu,
  X,
  Search,
  User,
  LogOut,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Manajemen Produk', href: '/admin/products', icon: Package },
    { name: 'Manajemen Order', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Manajemen Request', href: '/admin/requests', icon: Plane },
    { name: 'Notifikasi Admin', href: '/admin/notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row relative">
      {/* Mobile Toggle & Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Admin Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 h-screen
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
           <Link to="/" className="text-xl font-black tracking-tighter hover:text-blue-600 transition-colors">MODERN.</Link>
           <div className="flex items-center gap-2">
             <Link to="/" className="p-2 text-gray-400 hover:text-gray-900 transition-colors hidden md:block">
                <ArrowLeft size={18} />
             </Link>
             <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-gray-900 md:hidden"
             >
                <X size={20} />
             </button>
           </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-6 ml-4">Management</p>
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  isActive 
                    ? 'bg-black text-white shadow-2xl shadow-gray-200' 
                    : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <item.icon size={16} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50">
            <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black">AD</div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-tight text-gray-900">Admin Master</p>
                    <p className="text-[8px] text-gray-400 font-bold">admin@modern.com</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        <header className="bg-white border-b border-gray-100 p-4 md:px-10 md:py-6 sticky top-0 z-30 flex justify-between items-center">
            <div className="flex items-center gap-4 flex-1">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 -ml-2 text-gray-900 md:hidden"
                >
                    <Menu size={20} />
                </button>
                <div className="hidden lg:flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-50 focus-within:border-gray-200 transition-all w-full max-w-md">
                    <Search size={16} className="text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Cari pesanan, pelanggan, atau produk..." 
                        className="bg-transparent text-[10px] font-bold outline-none w-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="relative">
                        <button 
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="flex items-center gap-2 bg-gray-50 p-1 pr-3 rounded-2xl border border-gray-50 hover:border-gray-200 transition-all transition-all"
                        >
                            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center text-[10px] font-black">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-xl" />
                                ) : (
                                    <User size={14} />
                                )}
                            </div>
                            <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-gray-900 ml-1">Admin</span>
                        </button>

                        <AnimatePresence>
                            {isUserMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)}></div>
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-4 w-56 bg-white shadow-2xl rounded-[2rem] border border-gray-50 overflow-hidden z-50 p-3"
                                    >
                                        <div className="p-5 border-b border-gray-50 mb-3 bg-gray-50 rounded-3xl">
                                            <p className="text-[10px] font-black uppercase tracking-tight text-gray-900">{user?.name}</p>
                                            <p className="text-[8px] text-gray-400 font-bold truncate mt-1">{user?.email}</p>
                                        </div>
                                        <Link 
                                            to="/" 
                                            className="flex items-center gap-3 w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
                                        >
                                            <ArrowLeft size={14} /> Website
                                        </Link>
                                        <Link 
                                            to="/admin/profile"
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="flex items-center gap-3 w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
                                        >
                                            <User size={14} /> My Profile
                                        </Link>
                                        <div className="h-[1px] bg-gray-50 my-2"></div>
                                        <button 
                                            onClick={() => { logout(); setIsUserMenuOpen(false); }}
                                            className="flex items-center gap-3 w-full text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors rounded-2xl"
                                        >
                                            <LogOut size={14} /> Keluar
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
