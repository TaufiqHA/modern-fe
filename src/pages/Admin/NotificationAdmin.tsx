import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { motion } from 'motion/react';
import { 
  Bell, 
  ShoppingBag, 
  Plane, 
  MessageSquare, 
  UserPlus, 
  AlertCircle,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Pesanan Baru #ORD-9922',
    description: 'Pelanggan Budi Santoso telah membuat pesanan baru untuk Ready Stock.',
    time: '2 Menit yang lalu',
    type: 'order',
    unread: true
  },
  {
    id: 2,
    title: 'Request Jastip Baru',
    description: 'Siska Putri mengajukan request titipan Nike Dunk Low.',
    time: '15 Menit yang lalu',
    type: 'jastip',
    unread: true
  },
  {
    id: 3,
    title: 'Stok Hampir Habis',
    description: 'Essential White Sneakers tersisa 2 pasang di inventaris.',
    time: '1 Jam yang lalu',
    type: 'alert',
    unread: false
  },
  {
    id: 4,
    title: 'Pembayaran Diterima',
    description: 'Konfirmasi pembayaran otomatis berhasil untuk order #ORD-8812.',
    time: '3 Jam yang lalu',
    type: 'payment',
    unread: false
  }
];

const NotificationAdmin = () => {
    return (
        <AdminLayout>
            <div className="space-y-10">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter mb-2">Notifikasi Admin.</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pemberitahuan aktivitas terbaru di platform</p>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Tandai semua dibaca</button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Category Filter */}
                    <div className="lg:col-span-1 space-y-2">
                        {['Semua', 'Pesanan', 'Request Jastip', 'Sistem', 'Pembayaran'].map((cat, i) => (
                            <button 
                                key={cat}
                                className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                    i === 0 ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-900'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Notification List */}
                    <div className="lg:col-span-3 space-y-4">
                        {NOTIFICATIONS.map((notif) => (
                            <motion.div 
                                key={notif.id}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`group bg-white p-6 rounded-[2rem] border transition-all hover:shadow-xl hover:shadow-gray-100 flex items-start gap-6 ${
                                    notif.unread ? 'border-blue-500/20 bg-blue-50/10' : 'border-gray-100'
                                }`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                                    notif.type === 'order' ? 'bg-blue-50 text-blue-600' :
                                    notif.type === 'jastip' ? 'bg-amber-50 text-amber-600' :
                                    notif.type === 'alert' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                                }`}>
                                    {notif.type === 'order' ? <ShoppingBag size={20} /> :
                                     notif.type === 'jastip' ? <Plane size={20} /> :
                                     notif.type === 'alert' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                                </div>

                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-sm font-black tracking-tight text-gray-900">{notif.title}</h3>
                                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-300">{notif.time}</span>
                                    </div>
                                    <p className="text-xs font-medium text-gray-500 leading-relaxed max-w-lg">
                                        {notif.description}
                                    </p>
                                </div>

                                <button className="p-2 text-gray-300 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-all">
                                    <MoreVertical size={18} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default NotificationAdmin;
