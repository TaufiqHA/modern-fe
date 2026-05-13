import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Truck, ShieldCheck, ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const product = PRODUCTS.find(p => p.id === Number(id));
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('Deskripsi');

    if (!product) {
        return (
            <div className="pt-40 pb-40 text-center">
                <h2 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h2>
                <Link to="/shop" className="text-blue-600 font-bold uppercase tracking-widest text-xs">Kembali ke Katalog</Link>
            </div>
        );
    }

    const tabs = ['Deskripsi', 'Spesifikasi', 'Ulasan', 'Pengiriman'];

    return (
        <main className="pt-24 pb-40 px-6">
            <div className="max-w-6xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors mb-12"
                >
                    <ArrowLeft size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Kembali</span>
                </button>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
                    {/* Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 mb-6">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity">
                                    <img 
                                        src={product.image} 
                                        alt="" 
                                        className="w-full h-full object-cover grayscale opacity-50"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col"
                    >
                        <div className="mb-8">
                            <span className="bg-gray-100 text-gray-600 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded inline-block mb-4">
                                {product.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{product.name}</h1>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star size={16} className="fill-current" />
                                    <span className="text-sm font-bold">{product.rating}</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                                <p className="text-sm text-gray-400 font-medium">120 Ulasan</p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <p className="text-3xl font-black mb-6">Rp {product.price.toLocaleString('id-ID')}</p>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                {product.description}
                            </p>
                        </div>

                        <div className="mt-auto">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="flex items-center border border-gray-100 rounded-full px-4 py-2 gap-6 bg-gray-50">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="text-gray-400 hover:text-gray-900 transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="text-sm font-black w-4 text-center">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="text-gray-400 hover:text-gray-900 transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <p className={`text-[10px] font-black uppercase tracking-widest ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {product.stock > 0 ? `Tersedia: ${product.stock} Stok` : 'Stok Habis'}
                            </p>
                            </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {product.stock > 0 ? (
                                <>
                                    <button
                                        onClick={() => {
                                            addToCart(product, quantity);
                                            navigate('/checkout');
                                        }} 
                                        className="px-8 py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                                    >
                                        Beli Sekarang
                                    </button>
                                    <button 
                                        onClick={() => {
                                            addToCart(product, quantity);
                                            navigate('/cart');
                                        }}
                                        className="px-8 py-5 border border-gray-100 text-gray-900 text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:border-gray-900 transition-all flex items-center justify-center gap-3"
                                    >
                                        <ShoppingCart size={16} />
                                        Keranjang
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => navigate(`/pre-order/${product.id}`)} 
                                    className="sm:col-span-2 px-8 py-5 bg-amber-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-amber-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-amber-50"
                                >
                                    Pre-Order Sekarang
                                </button>
                            )}
                        </div>

                            <div className="grid grid-cols-2 gap-6 mt-12 bg-gray-50/50 rounded-2xl p-6 border border-gray-50">
                                <div className="flex items-center gap-3">
                                    <Truck size={20} className="text-gray-400" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest mb-0.5">Pengiriman</p>
                                        <p className="text-[10px] text-gray-400 font-medium">Estimasi 2-4 Hari</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={20} className="text-gray-400" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest mb-0.5">Proteksi</p>
                                        <p className="text-[10px] text-gray-400 font-medium">Garansi 7 Hari</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tabs */}
                <div>
                   <div className="flex items-center justify-start md:justify-center gap-8 md:gap-12 border-b border-gray-50 mb-12 overflow-x-auto no-scrollbar px-4 sm:px-0">
                        {tabs.map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[10px] font-black uppercase tracking-[0.3em] pb-6 relative transition-colors whitespace-nowrap ${
                                    activeTab === tab ? 'text-gray-900' : 'text-gray-300 hover:text-gray-900'
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div 
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 w-full h-1 bg-black rounded-full"
                                    />
                                )}
                            </button>
                        ))}
                   </div>
                   
                   <div className="max-w-3xl mx-auto text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-gray-500 leading-relaxed font-medium"
                            >
                                {activeTab === 'Deskripsi' && (
                                    <p>{product.description} Dilengkapi dengan fitur-fitur modern yang menunjang gaya hidup harian Anda. Material yang digunakan telah melalui proses seleksi ketat untuk memastikan durabilitas yang maksimal tanpa mengesampingkan estetika minimalis.</p>
                                )}
                                {activeTab === 'Spesifikasi' && (
                                    <ul className="text-left space-y-4 max-w-sm mx-auto">
                                        <li className="flex justify-between border-b border-gray-50 pb-2">
                                            <span className="font-bold text-gray-400 text-xs uppercase tracking-widest">Bahan</span>
                                            <span className="text-gray-900 text-sm">Katun Premium / Sintetis</span>
                                        </li>
                                        <li className="flex justify-between border-b border-gray-50 pb-2">
                                            <span className="font-bold text-gray-400 text-xs uppercase tracking-widest">Warna</span>
                                            <span className="text-gray-900 text-sm">Putih / Hitam / Biru</span>
                                        </li>
                                        <li className="flex justify-between border-b border-gray-50 pb-2">
                                            <span className="font-bold text-gray-400 text-xs uppercase tracking-widest">Negara Asal</span>
                                            <span className="text-gray-900 text-sm">Indonesia</span>
                                        </li>
                                    </ul>
                                )}
                                {activeTab === 'Ulasan' && (
                                    <p>Halaman ini menampilkan ulasan dari pelanggan yang telah membeli produk ini. Saat ini belum ada detail ulasan visual yang ditampilkan.</p>
                                )}
                                {activeTab === 'Pengiriman' && (
                                    <p>Pesanan Anda akan diproses dalam 1x24 jam kerja. Kami menggunakan layanan kurir terpercaya JNE, J&T, dan SiCepat untuk memastikan paket sampai dengan aman di tangan Anda.</p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                   </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;
