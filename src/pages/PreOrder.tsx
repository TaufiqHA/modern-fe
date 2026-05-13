import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Send, CheckCircle2, Package } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const PreOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = PRODUCTS.find(p => p.id === Number(id));
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        quantity: 1,
        notes: ''
    });

    if (!product) {
        return (
            <div className="pt-40 pb-40 text-center">
                <h2 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h2>
                <Link to="/shop" className="text-blue-600 font-bold uppercase tracking-widest text-xs">Kembali ke Katalog</Link>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            setIsSubmitted(true);
        }, 800);
    };

    if (isSubmitted) {
        return (
            <main className="pt-32 pb-40 px-6 min-h-[80vh] flex items-center justify-center text-center">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full"
                >
                    <div className="w-24 h-24 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-10">
                        <Package size={48} />
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight mb-4">Pre-Order Diterima!</h2>
                    <p className="text-gray-400 font-medium mb-10 leading-relaxed px-4">
                        Request Pre-Order Anda untuk <span className="text-gray-900 font-bold">{product.name}</span> telah kami terima. Kami akan segera mengabari Anda setelah stok tersedia melalui Email atau WhatsApp.
                    </p>
                    <Link to="/shop" className="inline-block px-10 py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all">
                        Kembali ke Toko
                    </Link>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="pt-32 pb-40 px-6">
            <div className="max-w-3xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors mb-12"
                >
                    <ArrowLeft size={14} /> Kembali
                </button>

                <header className="mb-20">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[8px] font-black uppercase tracking-widest rounded-full">Pre-Order</span>
                    </div>
                    <h2 className="text-5xl font-bold tracking-tight mb-6">Formulir Pre-Order.</h2>
                    <p className="text-gray-400 font-medium max-w-sm">Produk ini sedang dalam masa pemesanan ulang. Silakan isi data Anda untuk antrean pre-order.</p>
                </header>

                <div className="flex flex-col md:flex-row gap-12 mb-20 items-center bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale opacity-80" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                        <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-4">{product.category}</p>
                        <p className="text-2xl font-black">Rp {product.price.toLocaleString('id-ID')}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    <section>
                        <div className="flex items-center gap-4 mb-10">
                           <div className="w-8 h-[1px] bg-gray-200"></div>
                           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Informasi Pemesan</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nama Lengkap</label>
                                <input 
                                    required
                                    type="text" 
                                    placeholder="Masukkan nama Anda"
                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nomor WhatsApp</label>
                                <input 
                                    required
                                    type="tel" 
                                    placeholder="0812xxxxxxx"
                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Email</label>
                                <input 
                                    required
                                    type="email" 
                                    placeholder="email@example.com"
                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-10">
                           <div className="w-8 h-[1px] bg-gray-200"></div>
                           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Detail Pesanan</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Jumlah (Qty)</label>
                                <div className="flex items-center bg-gray-50 rounded-2xl px-4 h-[60px] justify-between">
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, quantity: Math.max(1, formData.quantity - 1)})}
                                        className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold"
                                    >-</button>
                                    <span className="font-black text-lg font-mono">{formData.quantity}</span>
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, quantity: formData.quantity + 1})}
                                        className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold"
                                    >+</button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Catatan Tambahan</label>
                                <input 
                                    type="text"
                                    placeholder="Contoh: Ukuran atau Warna"
                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-[18px] text-xs font-bold focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                />
                            </div>
                        </div>
                    </section>

                    <button 
                        type="submit" 
                        className="w-full py-6 bg-amber-600 text-white text-xs font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-amber-700 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-amber-100"
                    >
                        Kirim Request Pre-Order <Send size={18} />
                    </button>
                    
                    <p className="text-center text-[10px] text-gray-400 font-medium">Estimasi ketersediaan barang adalah 2-4 minggu setelah pemesanan.</p>
                </form>
            </div>
        </main>
    );
};

export default PreOrder;
