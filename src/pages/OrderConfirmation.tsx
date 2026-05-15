import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Home, ListOrdered, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const OrderConfirmation = () => {
    const location = useLocation();
    const { token } = useAuth();
    const orderId = location.state?.orderId || 'ORD-DUMMY-123';
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUploadProof = async () => {
        if (!selectedFile || !token || !orderId) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('proof', selectedFile);

            const response = await fetch(`${API_URL}/orders/${orderId}/payment-proof`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                alert('Bukti transfer berhasil diunggah! Admin akan segera memverifikasi pesanan Anda.');
                setSelectedFile(null);
                setPreviewUrl(null);
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Gagal mengunggah bukti transfer.');
            }
        } catch (err) {
            console.error('Upload error:', err);
            alert('Terjadi kesalahan koneksi.');
        } finally {
            setIsUploading(false);
        }
    };

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
                            <span className="text-sm font-black tracking-tight">#{orderId}</span>
                        </div>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-400 font-black uppercase tracking-widest">Detail Item</span>
                                <span className="font-bold">Lihat di Detail Pesanan</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-400 font-black uppercase tracking-widest">Metode Bayar</span>
                                <span className="font-bold">Transfer Bank / Manual</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mb-8">
                            <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                                Menunggu Pembayaran
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1">Estimasi Total</p>
                                <p className="text-2xl font-black text-gray-400 italic">Cek Detail</p>
                            </div>
                        </div>

                        {/* Payment Proof Section */}
                        <div className="pt-8 border-t border-gray-100">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Konfirmasi Pembayaran Manual</h4>
                            
                            <input 
                                type="file" 
                                id="payment-proof" 
                                className="hidden" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                            />
                            
                            {!selectedFile ? (
                                <label 
                                    htmlFor="payment-proof"
                                    className="flex flex-col items-center justify-center w-full py-8 border-2 border-dashed border-gray-200 rounded-2xl text-center cursor-pointer hover:border-gray-900 hover:text-gray-900 transition-colors group"
                                >
                                    <ImageIcon className="text-gray-200 mb-3 group-hover:text-black transition-colors" size={32} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">Pilih Foto Bukti Transfer</span>
                                </label>
                            ) : (
                                <div className="space-y-4">
                                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
                                        <img src={previewUrl!} alt="Preview Bukti" className="h-full w-full object-contain" />
                                    </div>
                                    <div className="flex gap-4">
                                        <label 
                                            htmlFor="payment-proof"
                                            className="flex-1 py-4 text-center border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            Ganti Foto
                                        </label>
                                        <button 
                                            onClick={handleUploadProof}
                                            disabled={isUploading}
                                            className="flex-1 py-4 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                                            {isUploading ? 'Mengunggah...' : 'Kirim Bukti'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <Link 
                            to={`/account/orders`} 
                            className="bg-black text-white px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all"
                        >
                            <ListOrdered size={16} />
                            Daftar Pesanan
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
