import AccountLayout from './AccountLayout';
import { motion } from 'motion/react';
import { Package, Clock, Truck, CheckCircle2 } from 'lucide-react';

const ORDERS = [
  {
    id: 'ORD-9921',
    date: '12 Mei 2024',
    type: 'Ready Stock',
    status: 'Dikirim',
    total: 399000,
    items: ['Minimalist Cotton Tee', 'Urban Fanny Pack'],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'ORD-8812',
    date: '08 Mei 2024',
    type: 'Pre-Order',
    status: 'Diproses',
    total: 899000,
    items: ['Classic Wool Coat'],
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=200'
  }
];

const STAGES = [
    { label: 'Diterima', icon: Clock },
    { label: 'Diproses', icon: Package },
    { label: 'Dikirim', icon: Truck },
    { label: 'Selesai', icon: CheckCircle2 },
];

const Orders = () => {
    return (
        <AccountLayout>
            <header className="mb-12">
                <h3 className="text-2xl font-bold tracking-tight mb-2">Riwayat Pesanan</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pantau status transaksi belanja Anda</p>
            </header>

            <div className="space-y-8">
                {ORDERS.map((order) => (
                    <motion.div 
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 border border-gray-100 rounded-[2rem] hover:shadow-xl hover:shadow-gray-50 transition-all group"
                    >
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                                    <img src={order.image} alt="Product" className="w-full h-full object-cover grayscale" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-sm uppercase tracking-tight">{order.id}</h4>
                                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{order.date} • {order.type}</p>
                                    <p className="text-xs font-medium text-gray-500 line-clamp-1">{order.items.join(', ')}</p>
                                </div>
                            </div>
                            <div className="text-left lg:text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">Total Transaksi</p>
                                <p className="text-lg font-black tracking-tight">Rp {order.total.toLocaleString('id-ID')}</p>
                            </div>
                        </div>

                        {/* Status Tracker */}
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex justify-between relative">
                                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -z-0"></div>
                                {STAGES.map((stage, idx) => {
                                    const isCompleted = STAGES.findIndex(s => s.label === order.status) >= idx;
                                    return (
                                        <div key={idx} className="relative z-10 flex flex-col items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isCompleted ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-300'}`}>
                                                <stage.icon size={14} />
                                            </div>
                                            <span className={`text-[8px] font-black uppercase tracking-widest ${isCompleted ? 'text-gray-900' : 'text-gray-300'}`}>
                                                {stage.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">Detail Tagihan</button>
                            <button className="px-6 py-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-colors">Lacak Paket</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </AccountLayout>
    );
};

export default Orders;
