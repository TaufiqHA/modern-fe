import { ReactNode } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { User, Package, Plane, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AccountLayoutProps {
  children: ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  const { logout } = useAuth();

  const navItems = [
    { name: 'Profil', href: '/account/profile', icon: User },
    { name: 'Riwayat Pesanan', href: '/account/orders', icon: Package },
    { name: 'Request Jastip', href: '/account/jastip', icon: Plane },
    { name: 'Alamat Tersimpan', href: '/account/addresses', icon: MapPin },
  ];

  return (
    <main className="pt-32 pb-40 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-12">Akun Saya.</h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    isActive 
                      ? 'bg-black text-white shadow-xl shadow-gray-200' 
                      : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon size={16} />
                {item.name}
              </NavLink>
            ))}
            <button 
              onClick={logout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all mt-8"
            >
              <LogOut size={16} />
              Keluar
            </button>
          </aside>

          {/* Content area */}
          <div className="flex-1 bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountLayout;
