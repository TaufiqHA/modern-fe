import React, { useState } from 'react';
import AccountLayout from './AccountLayout';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Plane, 
  AlertCircle,
  CheckCircle2,
  Loader2,
  CreditCard
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const Notifications = () => {
    const { notifications, isLoading, markAsRead, markAllAsRead } = useNotifications();
    const [activeFilter, setActiveFilter] = useState('Semua');

    const filterMap: Record<string, string> = {
        'Pesanan': 'order',
        'Pembayaran': 'payment',
        'Jastip': 'jastip'
    };

    const filteredNotifications = notifications.filter(n => {
        if (activeFilter === 'Semua') return true;
        return n.type === filterMap[activeFilter];
    });

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMins = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMins < 60) return `${diffInMins} Menit yang lalu`;
        if (diffInHours < 24) return `${diffInHours} Jam yang lalu`;
        return `${diffInDays} Hari yang lalu`;
    };

    return (
        <AccountLayout>
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2">Notifikasi Saya</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Informasi terbaru mengenai aktivitas akun Anda</p>
                </div>
                <button 
                    onClick={markAllAsRead}
                    className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline"
                >
                    Tandai semua dibaca
                </button>
            </header>

            <div className="space-y-8">
                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {['Semua', 'Pesanan', 'Pembayaran', 'Jastip'].map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                                activeFilter === cat ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-900'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-gray-200" size={32} />
                        </div>
                    ) : filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notif) => (
                            <motion.div 
                                key={notif.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={() => notif.unread && markAsRead(notif.id)}
                                className={`group bg-white p-6 rounded-[2rem] border transition-all hover:border-gray-900 flex items-start gap-6 cursor-pointer ${
                                    notif.unread ? 'border-blue-500/20 bg-blue-50/5' : 'border-gray-50'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
                                    notif.type === 'order' ? 'bg-blue-50 text-blue-600' :
                                    notif.type === 'jastip' ? 'bg-amber-50 text-amber-600' :
                                    notif.type === 'payment' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}>
                                    {notif.type === 'order' ? <ShoppingBag size={18} /> :
                                     notif.type === 'jastip' ? <Plane size={18} /> :
                                     notif.type === 'payment' ? <CreditCard size={18} /> : <AlertCircle size={18} />}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-xs font-bold text-gray-900">{notif.title}</h4>
                                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-300">{formatTime(notif.created_at)}</span>
                                    </div>
                                    <p className="text-[10px] font-medium text-gray-500 leading-relaxed">
                                        {notif.description}
                                    </p>
                                </div>
                                {notif.unread && (
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
                            <AlertCircle className="mx-auto text-gray-200 mb-4" size={32} />
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Belum ada notifikasi</p>
                        </div>
                    )}
                </div>
            </div>
        </AccountLayout>
    );
};

export default Notifications;
