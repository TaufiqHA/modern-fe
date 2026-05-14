/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import AccountLayout from './AccountLayout';
import { motion } from 'motion/react';
import { FileText, Hourglass, DollarSign, PackageCheck, ExternalLink, Loader2, AlertCircle, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        pending: 'bg-amber-50 text-amber-600',
        quotation: 'bg-blue-50 text-blue-600',
        approved: 'bg-green-50 text-green-600',
        rejected: 'bg-red-50 text-red-600',
        completed: 'bg-gray-50 text-gray-600',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${styles[status as keyof typeof styles] || 'bg-gray-50 text-gray-600'}`}>
            {status}
        </span>
    );
};

const JastipRequests = () => {
    const { token } = useAuth();
    const [requests, setRequests] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRequests = async () => {
            if (!token) return;
            
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await fetch(`${API_URL}/jastip/requests`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Gagal mengambil data request jastip');
                }
                
                const data = await response.json();
                // Ensure we handle both direct array and { data: [] } formats
                setRequests(Array.isArray(data) ? data : data.data || []);
            } catch (err: any) {
                setError(err.message || 'Terjadi kesalahan koneksi');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRequests();
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
                <h3 className="text-2xl font-bold tracking-tight mb-2">Request Jastip</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pantau status penawaran barang titipan Anda</p>
            </header>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
                    <Loader2 size={32} className="animate-spin text-blue-600" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Memuat Request...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-3xl flex flex-col items-center gap-4 text-center">
                    <AlertCircle size={32} />
                    <div>
                        <p className="font-bold uppercase tracking-tight mb-1">Terjadi Kesalahan</p>
                        <p className="text-xs font-medium opacity-80">{error}</p>
                    </div>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-2 px-6 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl"
                    >
                        Coba Lagi
                    </button>
                </div>
            ) : requests.length === 0 ? (
                <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-100">
                    <ShoppingBag size={48} className="mx-auto text-gray-200 mb-6" />
                    <h4 className="text-lg font-bold mb-2">Belum Ada Request</h4>
                    <p className="text-gray-400 text-xs font-medium max-w-xs mx-auto mb-8 leading-relaxed">
                        Anda belum pernah melakukan request jastip. Cari barang impian Anda dan titip sekarang!
                    </p>
                    <a href="/request-jastip" className="inline-block px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all">
                        Buat Request Baru
                    </a>
                </div>
            ) : (
                <div className="space-y-6">
                    {requests.map((req) => (
                        <motion.div 
                            key={req.id || req.request_id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-gray-50/50 border border-gray-50 rounded-3xl"
                        >
                            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                                <img 
                                    src={req.image || 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=200'} 
                                    alt="Product" 
                                    className="w-full h-full object-cover grayscale" 
                                />
                            </div>
                            
                            <div className="flex-1 space-y-2 text-center sm:text-left">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                                    <h4 className="font-bold text-sm uppercase tracking-tight">{req.product_name || req.product}</h4>
                                    <StatusBadge status={req.status} />
                                </div>
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                    ID: {req.id || req.request_id} • DIAJUKAN {new Date(req.created_at || req.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                                {req.product_link && (
                                    <a href={req.product_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
                                        <ExternalLink size={10} /> Lihat Link Produk
                                    </a>
                                )}
                            </div>

                            <div className="w-full sm:w-auto text-center sm:text-right pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                                {req.status === 'quotation' ? (
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Estimasi Total</p>
                                        <p className="text-lg font-black tracking-tight">{formatCurrency(req.quote || req.price)}</p>
                                        <button className="w-full sm:w-auto px-6 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-colors">Terima & Bayar</button>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 italic">
                                            {req.status === 'pending' ? 'Menunggu Review Admin...' : 
                                             req.status === 'approved' ? 'Pesanan Sedang Diproses' :
                                             req.status === 'completed' ? 'Pesanan Selesai' :
                                             'Status: ' + req.status}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </AccountLayout>
    );
};

export default JastipRequests;

