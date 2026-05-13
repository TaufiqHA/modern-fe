import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Home, ListOrdered } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
    return (
        <main className="pt-40 pb-40 px-6 min-h-[80vh] flex items-center justify-center">
            <div className="max-w-xl w-full">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center"
                >
                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10">
                        <CheckCircle2 size={40} />
                    </div>

                    <h2 className="text-4xl font-bold tracking-tight mb-4">Pesanan Berhasil!</h2>
                    <p className="text-gray-400 font-medium mb-12">Terima kasih atas pesanan Anda. Kami akan segera memprosesnya.</p>
                    
                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-50 mb-12 text-left">
                        <div className="flex justify-between items-center pb-6 border-b border-gray-100 mb-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Nomor Order</span>
                            <span className="text-sm font-black tracking-tight">#ORD-2026-051242</span>
                        </div>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-400 font-black uppercase tracking-widest">Detail Item</span>
                                <span className="font-bold">1 × Essential White Sneakers</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-400 font-black uppercase tracking-widest">Metode Bayar</span>
                                <span className="font-bold">Virtual Account (Otomatis)</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                                Menunggu Pembayaran
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1">Total Pembayaran</p>
                                <p className="text-2xl font-black">Rp 914.000</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <Link 
                            to="/shop" 
                            className="bg-black text-white px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all"
                        >
                            <ListOrdered size={16} />
                            Lihat Detail
                        </Link>
                        <Link 
                            to="/" 
                            className="border border-gray-100 text-gray-900 px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:border-gray-900 transition-all"
                        >
                            <Home size={16} />
                            Kembali Beranda
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default OrderConfirmation;
