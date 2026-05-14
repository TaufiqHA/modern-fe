/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import AccountLayout from './AccountLayout';
import { motion } from 'motion/react';
import { Package, Clock, Truck, CheckCircle2, Loader2, AlertCircle, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const STAGES = [
    { label: 'Diterima', icon: Clock, status: 'pending' },
    { label: 'Diproses', icon: Package, status: 'paid' },
    { label: 'Dikirim', icon: Truck, status: 'shipped' },
    { label: 'Selesai', icon: CheckCircle2, status: 'delivered' },
];

const statusMap: Record<string, string> = {
    'pending': 'Diterima',
    'paid': 'Diproses',
    'shipped': 'Dikirim',
    'delivered': 'Selesai'
};

const Orders = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) return;
            
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await fetch(`${API_URL}/orders`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (!response.ok) {
                    throw new Error('Gagal mengambil data riwayat pesanan');
                }
                
                const data = await response.json();
                setOrders(data.data || data || []);
            } catch (err: any) {
                setError(err.message || 'Terjadi kesalahan saat memuat data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <AccountLayout>
            <header className="mb-12">
                <h3 className="text-2xl font-bold tracking-tight mb-2">Riwayat Pesanan</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pantau status transaksi belanja Anda</p>
            </header>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 size={32} className="animate-spin text-blue-600" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Memuat Pesanan...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-3xl flex flex-col items-center gap-4 text-center">
                    <AlertCircle size={32} />
                    <div>
                        <p className="font-bold uppercase tracking-tight mb-1">Terjadi Kesalahan</p>
                        <p className="text-xs font-medium opacity-80">{error}</p>
                    </div>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-100">
                    <ShoppingBag size={48} className="mx-auto text-gray-200 mb-6" />
                    <h4 className="text-lg font-bold mb-2">Belum Ada Pesanan</h4>
                    <p className="text-gray-400 text-xs font-medium max-w-xs mx-auto leading-relaxed">
                        Anda belum memiliki riwayat pesanan. Mulai jelajahi koleksi produk kami dan temukan barang favorit Anda!
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order) => {
                        const currentStatusLabel = statusMap[order.status] || 'Diterima';
                        const currentIdx = STAGES.findIndex(s => s.label === currentStatusLabel);

                        return (
                            <motion.div 
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-8 border border-gray-100 rounded-[2rem] hover:shadow-xl hover:shadow-gray-50 transition-all group"
                            >
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                                            <img 
                                                src={order.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200'} 
                                                alt="Product" 
                                                className="w-full h-full object-cover grayscale" 
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-sm uppercase tracking-tight">{order.id}</h4>
                                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                                {new Date(order.created_at || order.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} • {order.type || 'Ready Stock'}
                                            </p>
                                            <p className="text-xs font-medium text-gray-500 line-clamp-1">
                                                {order.items?.map((item: any) => item.name || item).join(', ') || 'Detail pesanan...'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-left lg:text-right">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">Total Transaksi</p>
                                        <p className="text-lg font-black tracking-tight">{formatCurrency(order.total)}</p>
                                    </div>
                                </div>

                                {/* Status Tracker */}
                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <div className="flex justify-between relative">
                                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -z-0"></div>
                                        {STAGES.map((stage, idx) => {
                                            const isCompleted = currentIdx >= idx;
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
                        );
                    })}
                </div>
            )}
        </AccountLayout>
    );
};

export default Orders;

