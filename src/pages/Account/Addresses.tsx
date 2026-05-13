import AccountLayout from './AccountLayout';
import { motion } from 'motion/react';
import { Plus, Home, Briefcase, MapPin, MoreVertical } from 'lucide-react';

const ADDRESSES = [
  {
    id: 1,
    label: 'Rumah',
    recipient: 'User Demo',
    phone: '08123456789',
    detail: 'Jl. Minimalist No. 42, Kebayoran Baru, Jakarta Selatan, 12150',
    type: Home
  },
  {
    id: 2,
    label: 'Kantor',
    recipient: 'User Demo',
    phone: '08123456789',
    detail: 'Modern Hub Building Lt. 12, Sudirman, Jakarta Pusat, 10220',
    type: Briefcase
  }
];

const Addresses = () => {
    return (
        <AccountLayout>
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2">Alamat Tersimpan</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pengelolaan daftar alamat pengiriman</p>
                </div>
                <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-100">
                    <Plus size={16} /> Tambah Alamat
                </button>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                {ADDRESSES.map((addr) => (
                    <motion.div 
                        key={addr.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-8 border border-gray-100 rounded-[2rem] hover:border-gray-900 transition-all group relative"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-colors">
                                <addr.type size={18} />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest">{addr.label}</h4>
                        </div>

                        <div className="space-y-2 mb-8">
                            <p className="text-sm font-bold">{addr.recipient}</p>
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{addr.phone}</p>
                            <p className="text-xs font-medium text-gray-400 leading-relaxed max-w-[200px]">{addr.detail}</p>
                        </div>

                        <div className="flex gap-4">
                            <button className="text-[10px] font-black uppercase tracking-widest border-b border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors">Edit</button>
                            <button className="text-[10px] font-black uppercase tracking-widest border-b border-red-500 pb-1 text-red-500 hover:text-red-700 hover:border-red-700 transition-colors">Hapus</button>
                        </div>

                        <button className="absolute top-8 right-8 text-gray-200">
                            <MoreVertical size={20} />
                        </button>
                    </motion.div>
                ))}
            </div>
        </AccountLayout>
    );
};

export default Addresses;
