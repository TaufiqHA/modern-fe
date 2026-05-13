import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  Package,
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  X, 
  Save, 
  History,
  TrendingDown,
  TrendingUp,
  Filter
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../data/products';

const STOCK_HISTORY = [
  { id: 1, product: 'Essential White Sneakers', change: +10, type: 'In', note: 'Restock supplier', date: '12 Mei 2024, 14:20' },
  { id: 2, product: 'Minimalist Cotton Tee', change: -2, type: 'Out', note: 'Order #ORD-9921', date: '12 Mei 2024, 11:05' },
  { id: 3, product: 'Leather Everyday Bag', change: +5, type: 'In', note: 'Restock supplier', date: '10 Mei 2024, 09:15' },
  { id: 4, product: 'Smart Watch S2', change: -1, type: 'Out', note: 'Order #ORD-9915', date: '08 Mei 2024, 16:45' },
];

const ProductManagement = () => {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setView('form');
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setView('form');
    };

    return (
        <AdminLayout>
            <div className="space-y-10">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter mb-2">Manajemen Produk.</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Kelola inventaris dan stok barang Anda</p>
                    </div>
                    {view === 'list' && (
                        <button 
                            onClick={handleAddNew}
                            className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-100"
                        >
                            <Plus size={16} /> Tambah Produk Baru
                        </button>
                    )}
                </header>

                <AnimatePresence mode="wait">
                    {view === 'list' ? (
                        <motion.div 
                            key="list"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            {/* Stats & Search */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100">
                                    <Search size={18} className="text-gray-400 ml-2" />
                                    <input 
                                        type="text" 
                                        placeholder="Cari produk berdasarkan nama atau kategori..." 
                                        className="bg-transparent text-xs font-bold outline-none w-full"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                                        <Filter size={18} />
                                    </button>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-50 flex items-center justify-between px-8">
                                    <div>
                                        <p className="text-[8px] font-black uppercase tracking-widest text-blue-400 mb-1">Total Produk</p>
                                        <p className="text-xl font-black text-blue-600">{PRODUCTS.length}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                                        <Package size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* Product Table */}
                            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Produk</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Kategori</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Harga</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Stok</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredProducts.map((product) => (
                                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale" />
                                                            </div>
                                                            <span className="text-xs font-bold text-gray-900 line-clamp-1">{product.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 rounded-full text-gray-500">
                                                            {product.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-xs font-black">
                                                        Rp {product.price.toLocaleString('id-ID')}
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`text-xs font-black ${product.stock <= 5 ? 'text-red-500' : 'text-gray-900'}`}>
                                                            {product.stock}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => handleEdit(product)}
                                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Stock History Log */}
                            <section className="mt-16">
                                <header className="flex items-center gap-4 mb-8">
                                    <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center">
                                        <History size={14} />
                                    </div>
                                    <h2 className="text-sm font-black uppercase tracking-widest">Log Riwayat Stok</h2>
                                </header>
                                <div className="space-y-4">
                                    {STOCK_HISTORY.map((log) => (
                                        <div key={log.id} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${log.type === 'In' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                    {log.type === 'In' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-tight text-gray-900">{log.product}</p>
                                                    <p className="text-[8px] text-gray-400 font-bold">{log.note}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-xs font-black ${log.type === 'In' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {log.type === 'In' ? '+' : ''}{log.change}
                                                </p>
                                                <p className="text-[8px] text-gray-300 font-bold uppercase">{log.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 md:p-12 relative overflow-hidden"
                        >
                            <button 
                                onClick={() => setView('list')}
                                className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-2xl font-black tracking-tighter mb-12">
                                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                            </h2>

                            <form className="space-y-10">
                                <div className="grid md:grid-cols-2 gap-10">
                                    {/* Image Upload Placeholder */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Foto Produk</label>
                                        <div className="aspect-square bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 group hover:border-blue-500 transition-colors cursor-pointer">
                                            {editingProduct?.image ? (
                                                <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover rounded-[2.5rem]" />
                                            ) : (
                                                <>
                                                    <div className="w-16 h-16 rounded-3xl bg-gray-100 text-gray-400 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                                                        <ImageIcon size={32} />
                                                    </div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Upload Image</p>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="space-y-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nama Produk</label>
                                            <input 
                                                type="text" 
                                                defaultValue={editingProduct?.name}
                                                className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                                placeholder="Contoh: Modern Cotton Tee"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Kategori</label>
                                                <select className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors appearance-none">
                                                    {CATEGORIES.map(cat => (
                                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Harga (Rp)</label>
                                                <input 
                                                    type="number" 
                                                    defaultValue={editingProduct?.price}
                                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Stok Awal</label>
                                                <input 
                                                    type="number" 
                                                    defaultValue={editingProduct?.stock}
                                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                                    placeholder="0"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Rating</label>
                                                <input 
                                                    type="number" 
                                                    step="0.1"
                                                    defaultValue={editingProduct?.rating}
                                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                                    placeholder="0.0"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Deskripsi Produk</label>
                                            <textarea 
                                                defaultValue={editingProduct?.description}
                                                rows={4}
                                                className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors resize-none"
                                                placeholder="Tuliskan detail produk di sini..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <button 
                                        type="button"
                                        onClick={() => setView('list')}
                                        className="flex-1 px-8 py-5 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors"
                                    >
                                        Batalkan
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-[2] flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-100"
                                    >
                                        <Save size={16} /> Simpan Produk
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AdminLayout>
    );
};

export default ProductManagement;
