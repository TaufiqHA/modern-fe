import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Plane, 
  AlertCircle,
  MoreVertical,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const NotificationAdmin = () => {
    const { notifications, isLoading, markAsRead, markAllAsRead } = useNotifications();
    const [activeFilter, setActiveFilter] = useState('Semua');

    const filterMap: Record<string, string> = {
        'Pesanan': 'order',
        'Request Jastip': 'jastip',
        'Sistem': 'alert',
        'Pembayaran': 'payment'
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
        <AdminLayout>
            <div className="space-y-10">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter mb-2">Notifikasi Admin.</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pemberitahuan aktivitas terbaru di platform</p>
                    </div>
                    <button 
                        onClick={markAllAsRead}
                        className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline"
                    >
                        Tandai semua dibaca
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Category Filter */}
                    <div className="lg:col-span-1 space-y-2">
                        {['Semua', 'Pesanan', 'Request Jastip', 'Sistem', 'Pembayaran'].map((cat) => (
                            <button 
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                    activeFilter === cat ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-900'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Notification List */}
                    <div className="lg:col-span-3 space-y-4">
                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="animate-spin text-gray-200" size={32} />
                            </div>
                        ) : filteredNotifications.length > 0 ? (
                            filteredNotifications.map((notif) => (
                                <motion.div 
                                    key={notif.id}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onClick={() => notif.unread && markAsRead(notif.id)}
                                    className={`group bg-white p-6 rounded-[2rem] border transition-all hover:shadow-xl hover:shadow-gray-100 flex items-start gap-6 cursor-pointer ${
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
                                            <span className="text-[8px] font-black uppercase tracking-widest text-gray-300">{formatTime(notif.created_at)}</span>
                                        </div>
                                        <p className="text-xs font-medium text-gray-500 leading-relaxed max-w-lg">
                                            {notif.description}
                                        </p>
                                    </div>

                                    <button className="p-2 text-gray-300 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-all">
                                        <MoreVertical size={18} />
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-100">
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Tidak ada notifikasi</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default NotificationAdmin;
