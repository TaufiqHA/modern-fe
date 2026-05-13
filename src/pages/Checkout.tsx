import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CreditCard, Truck, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const { cart, cartTotal, clearCart } = useCart();
    
    const steps = [
        { id: 1, name: 'Alamat', icon: MapPin },
        { id: 2, name: 'Pengiriman', icon: Truck },
        { id: 3, name: 'Pembayaran', icon: CreditCard },
    ];

    const shippingCost = step >= 2 ? 15000 : 0;
    const finalTotal = cartTotal + shippingCost;

    return (
        <main className="pt-32 pb-40 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-4xl font-bold tracking-tight mb-12 text-center">Checkout.</h2>
                    
                    {/* Stepper */}
                    <div className="flex items-center justify-center gap-4 md:gap-12 relative">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -z-10 -translate-y-1/2 hidden md:block"></div>
                        {steps.map((s, idx) => (
                            <div key={s.id} className="flex flex-col items-center gap-3 bg-white px-4">
                                <motion.div 
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                        step >= s.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
                                    }`}
                                    animate={{ 
                                        scale: step === s.id ? 1.1 : 1,
                                    }}
                                >
                                    {step > s.id ? <CheckCircle2 size={20} /> : <s.icon size={18} />}
                                </motion.div>
                                <span className={`text-[8px] font-black uppercase tracking-[0.2em] transition-colors ${
                                    step >= s.id ? 'text-gray-900' : 'text-gray-300'
                                }`}>
                                    {s.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-16">
                    {/* Form Area */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <h3 className="text-xl font-bold mb-6">Pilih Alamat Pengiriman</h3>
                                    <div className="space-y-4">
                                        <div className="p-6 border-2 border-black rounded-2xl bg-gray-50 flex items-start justify-between">
                                            <div>
                                                <p className="font-black text-xs uppercase tracking-widest mb-2">Rumah (Utama)</p>
                                                <p className="text-sm font-medium text-gray-500 leading-relaxed">
                                                    John Doe (+62 812 3456 7890) <br />
                                                    Jl. Mawar No. 5, Kec. Rappocini, Kota Makassar <br />
                                                    Sulawesi Selatan, 90222
                                                </p>
                                            </div>
                                            <div className="bg-black text-white p-1 rounded-full">
                                                <CheckCircle2 size={14} />
                                            </div>
                                        </div>
                                        <div className="p-6 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors flex items-start justify-between cursor-pointer group">
                                            <div>
                                                <p className="font-black text-xs uppercase tracking-widest mb-2 text-gray-400 group-hover:text-gray-900 transition-colors">Kantor</p>
                                                <p className="text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors leading-relaxed">
                                                    Jl. Sudirman No. 10, Menara Global Lt. 5, Jakarta Selatan
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:underline">+ Tambah Alamat Baru</button>
                                    
                                    <div className="pt-8 border-t border-gray-50">
                                        <button 
                                            onClick={() => setStep(2)}
                                            className="w-full py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                                        >
                                            Lanjut ke Pengiriman <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <h3 className="text-xl font-bold mb-6">Pilih Metode Pengiriman</h3>
                                    <div className="space-y-4">
                                        <div className="p-6 border-2 border-black rounded-2xl bg-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center">
                                                    <Truck size={24} className="text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-xs uppercase tracking-widest mb-1">Reguler (JNE)</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">Estimasi 2-4 Hari</p>
                                                </div>
                                            </div>
                                            <p className="font-black text-sm">Rp 15.000</p>
                                        </div>
                                        <div className="p-6 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors flex items-center justify-between cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-50 rounded-xl border border-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                                    <Truck size={24} className="text-gray-300 group-hover:text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-xs uppercase tracking-widest mb-1 text-gray-400 group-hover:text-gray-900 transition-colors">Express (SiCepat)</p>
                                                    <p className="text-[10px] text-gray-300 group-hover:text-gray-400 font-medium">Estimasi 1-2 Hari</p>
                                                </div>
                                            </div>
                                            <p className="font-black text-sm text-gray-300 group-hover:text-gray-900">Rp 28.000</p>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-8 border-t border-gray-50 flex gap-4">
                                        <button 
                                            onClick={() => setStep(1)}
                                            className="grow py-5 border border-gray-100 text-gray-900 text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:border-gray-900 transition-all"
                                        >
                                            Kembali
                                        </button>
                                        <button 
                                            onClick={() => setStep(3)}
                                            className="grow-[2] py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                                        >
                                            Metode Pembayaran <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <h3 className="text-xl font-bold mb-6">Metode Pembayaran</h3>
                                    <div className="space-y-4">
                                        <div className="p-6 border-2 border-black rounded-2xl bg-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center">
                                                    <CreditCard size={24} className="text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-xs uppercase tracking-widest mb-1">Transfer Bank (Virtual Account)</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">BCA, Mandiri, BNI, BRI</p>
                                                </div>
                                            </div>
                                            <div className="bg-black text-white p-1 rounded-full">
                                                <CheckCircle2 size={14} />
                                            </div>
                                        </div>
                                        {['E-Wallet', 'OVO / GoPay / Dana'].map((item) => (
                                            <div key={item} className="p-6 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors flex items-center justify-between cursor-pointer group">
                                                 <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-50 rounded-xl border border-gray-50 flex items-center justify-center">
                                                        <CreditCard size={24} className="text-gray-300" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-xs uppercase tracking-widest mb-1 text-gray-400 group-hover:text-gray-900 transition-colors">E-Wallet (Otomatis)</p>
                                                        <p className="text-[10px] text-gray-300 font-medium">OVO, GoPay, Dana, LinkAja</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="pt-8 border-t border-gray-50 flex gap-4">
                                        <button 
                                            onClick={() => setStep(2)}
                                            className="grow py-5 border border-gray-100 text-gray-900 text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:border-gray-900 transition-all"
                                        >
                                            Kembali
                                        </button>
                                        <button 
                                            className="grow-[2] py-5 bg-blue-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-200"
                                            onClick={() => {
                                                clearCart();
                                                navigate('/order-confirmation');
                                            }}
                                        >
                                            Buat Pesanan
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Summary Area */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-50 rounded-3xl p-8 sticky top-28 border border-gray-50">
                            <h3 className="text-lg font-bold mb-8">Ringkasan Order</h3>
                            <div className="space-y-6 mb-10 pb-10 border-b border-gray-100">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover grayscale opacity-80" alt={item.name} referrerPolicy="no-referrer" />
                                        </div>
                                        <div className="flex flex-col justify-between py-1">
                                            <p className="text-xs font-black uppercase tracking-tight line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-gray-400 font-black">{item.quantity} × Rp {item.price.toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>
                                ))}
                                {cart.length === 0 && (
                                    <p className="text-xs text-gray-400 italic">Keranjang kosong</p>
                                )}
                            </div>

                            <div className="space-y-4 mb-10">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400 font-black uppercase tracking-widest">Subtotal</span>
                                    <span className="font-black">Rp {cartTotal.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400 font-black uppercase tracking-widest">Pajak (11%)</span>
                                    <span className="font-black text-gray-400">Rp 0 (Termasuk)</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400 font-black uppercase tracking-widest">Ongkos Kirim</span>
                                    <span className="font-black">{step >= 2 ? `Rp ${shippingCost.toLocaleString('id-ID')}` : '—'}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Total Akhir</span>
                                <span className="text-2xl font-black">Rp {finalTotal.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Checkout;
