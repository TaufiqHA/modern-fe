import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, ArrowLeft, Send, CheckCircle2, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const RequestJastip = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        productLink: '',
        quantity: 1,
        notes: ''
    });
    const [fileName, setFileName] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setTimeout(() => {
            setIsSubmitted(true);
        }, 800);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    if (isSubmitted) {
        return (
            <main className="pt-32 pb-40 px-6 min-h-[80vh] flex items-center justify-center text-center">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full"
                >
                    <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-10">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight mb-4">Request Terkirim!</h2>
                    <p className="text-gray-400 font-medium mb-10 leading-relaxed px-4">
                        Terima kasih sudah melakukan request jastip. Admin kami akan segera meninjau permintaan Anda dan menghubungi via Email/WhatsApp dalam waktu 1x24 jam.
                    </p>
                    <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 mb-12">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 text-left">Nomor Request</p>
                        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-50 shadow-sm">
                            <span className="font-mono font-black text-xl">#JS-{Math.floor(100000 + Math.random() * 900000)}</span>
                            <QrCode size={24} className="text-gray-200" />
                        </div>
                    </div>
                    <Link to="/jastip" className="inline-block px-10 py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all">
                        Kembali ke Jastip
                    </Link>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="pt-32 pb-40 px-6">
            <div className="max-w-3xl mx-auto">
                <Link to="/jastip" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors mb-12">
                    <ArrowLeft size={14} /> Batal & Kembali
                </Link>

                <header className="mb-20">
                    <h2 className="text-5xl font-bold tracking-tight mb-6">Form Request.</h2>
                    <p className="text-gray-400 font-medium max-w-sm">Berikan detail produk yang ingin Anda titip secara lengkap untuk mempercepat proses pengecekan harga.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Identity Section */}
                    <section>
                        <div className="flex items-center gap-4 mb-10">
                           <div className="w-8 h-[1px] bg-gray-200"></div>
                           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Informasi Pribadi</h3>
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

                    {/* Product Section */}
                    <section>
                        <div className="flex items-center gap-4 mb-10">
                           <div className="w-8 h-[1px] bg-gray-200"></div>
                           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Detail Titipan</h3>
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Link Produk</label>
                                <input 
                                    required
                                    type="url" 
                                    placeholder="https://toko.com/produk-keren"
                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                                    value={formData.productLink}
                                    onChange={(e) => setFormData({...formData, productLink: e.target.value})}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 items-start">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Foto Produk</label>
                                    <div className="relative group">
                                        <input 
                                            type="file" 
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        <div className="w-full bg-gray-50 border border-gray-100 border-dashed rounded-2xl p-10 flex flex-col items-center gap-4 group-hover:border-blue-600 transition-colors">
                                            <Upload className="text-gray-300" size={24} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                {fileName || 'Unggah Referensi Foto'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Jumlah (Qty)</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl px-4 h-[106px] justify-between">
                                        <button 
                                            type="button"
                                            onClick={() => setFormData({...formData, quantity: Math.max(1, formData.quantity - 1)})}
                                            className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold"
                                        >-</button>
                                        <span className="font-black text-xl font-mono">{formData.quantity}</span>
                                        <button 
                                            type="button"
                                            onClick={() => setFormData({...formData, quantity: formData.quantity + 1})}
                                            className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold"
                                        >+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Catatan (Warna, Ukuran, dll)</label>
                                <textarea 
                                    rows={4}
                                    placeholder="Contoh: Ukuran 42, warna putih tulang..."
                                    className="w-full bg-gray-50 border border-gray-50 rounded-3xl px-6 py-6 text-xs font-bold focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300 resize-none"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                />
                            </div>
                        </div>
                    </section>

                    <button 
                        type="submit" 
                        className="w-full py-6 bg-black text-white text-xs font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-gray-200"
                    >
                        Kirim Request <Send size={18} />
                    </button>
                    
                    <p className="text-center text-[10px] text-gray-400 font-medium">Dengan mengklik kirim, Anda menyetujui Ketentuan Layanan Jastip kami.</p>
                </form>
            </div>
        </main>
    );
};

export default RequestJastip;
