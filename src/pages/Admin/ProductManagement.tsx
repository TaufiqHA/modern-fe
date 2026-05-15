import React, { useState, useEffect } from 'react';
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
  Filter,
  Loader2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Product, Category, StockLog } from '../../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const STOCK_HISTORY = [
  { id: 1, product: 'Essential White Sneakers', change: +10, type: 'In', note: 'Restock supplier', date: '12 Mei 2024, 14:20' },
  { id: 2, product: 'Minimalist Cotton Tee', change: -2, type: 'Out', note: 'Order #ORD-9921', date: '12 Mei 2024, 11:05' },
  { id: 3, product: 'Leather Everyday Bag', change: +5, type: 'In', note: 'Restock supplier', date: '10 Mei 2024, 09:15' },
  { id: 4, product: 'Smart Watch S2', change: -1, type: 'Out', note: 'Order #ORD-9915', date: '08 Mei 2024, 16:45' },
];

const ProductManagement = () => {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [stockLogs, setStockLogs] = useState<StockLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { token } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        category: '',
        stock: 0,
        description: '',
        image: '',
        rating: 0
    });

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/products?limit=100`);
            const data = await response.json();
            setProducts(data.data || data.products || data || []);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/categories`);
            const data = await response.json();
            setCategories(data.data || data || []);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchStockLogs = async () => {
            if (!editingProduct || !token) return;
            
            try {
                const response = await fetch(`${API_URL}/admin/products/${editingProduct.id}/stock-logs`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setStockLogs(data.data || data || []);
            } catch (error) {
                console.error('Failed to fetch stock logs:', error);
            }
        };

        if (editingProduct) {
            fetchStockLogs();
        } else {
            setStockLogs([]);
        }
    }, [editingProduct, token]);

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            stock: product.stock,
            description: product.description || '',
            image: product.image,
            rating: product.rating
        });
        setView('form');
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            price: 0,
            category: categories[0]?.name || '',
            stock: 0,
            description: '',
            image: '',
            rating: 0
        });
        setView('form');
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Yakin ingin menghapus produk ini?')) return;
        
        try {
            const response = await fetch(`${API_URL}/admin/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                fetchProducts();
                alert('Produk berhasil dihapus');
            } else {
                alert('Gagal menghapus produk');
            }
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Terjadi kesalahan saat menghapus produk');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        const method = editingProduct ? 'PATCH' : 'POST';
        const url = editingProduct 
            ? `${API_URL}/admin/products/${editingProduct.id}` 
            : `${API_URL}/admin/products`;

        try {
            const response = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                setView('list');
                fetchProducts();
                alert(`Produk berhasil ${editingProduct ? 'diperbarui' : 'ditambahkan'}`);
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Gagal menyimpan produk');
            }
        } catch (error) {
            console.error('Failed to save product:', error);
            alert('Terjadi kesalahan saat menyimpan produk');
        } finally {
            setIsSaving(false);
        }
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
                                        <p className="text-xl font-black text-blue-600">{products.length}</p>
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
                                            {isLoading ? (
                                                <tr>
                                                    <td colSpan={5} className="px-8 py-20 text-center">
                                                        <Loader2 className="animate-spin text-gray-200 mx-auto" size={32} />
                                                    </td>
                                                </tr>
                                            ) : filteredProducts.map((product) => (
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
                                                            <button 
                                                                onClick={() => handleDelete(product.id)}
                                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {!isLoading && filteredProducts.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="px-8 py-10 text-center text-xs text-gray-400">
                                                        Tidak ada produk ditemukan
                                                    </td>
                                                </tr>
                                            )}
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

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid md:grid-cols-2 gap-10">
                                    {/* Image URL Input instead of upload for simplicity in JSON payload */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Foto Produk (URL)</label>
                                        <div className="space-y-4">
                                            <input 
                                                type="text" 
                                                value={formData.image}
                                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                                placeholder="https://images.unsplash.com/..."
                                            />
                                            <div className="aspect-square bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 overflow-hidden">
                                                {formData.image ? (
                                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="text-gray-400 flex flex-col items-center gap-2">
                                                        <ImageIcon size={32} />
                                                        <p className="text-[8px] font-black uppercase tracking-widest">Image Preview</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="space-y-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nama Produk</label>
                                            <input 
                                                required
                                                type="text" 
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                                placeholder="Contoh: Modern Cotton Tee"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Kategori</label>
                                                <select 
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors appearance-none"
                                                >
                                                    {categories.map(cat => (
                                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Harga (Rp)</label>
                                                <input 
                                                    required
                                                    type="number" 
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Stok</label>
                                                <input 
                                                    required
                                                    type="number" 
                                                    value={formData.stock}
                                                    onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                                    placeholder="0"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Rating</label>
                                                <input 
                                                    type="number" 
                                                    step="0.1"
                                                    value={formData.rating}
                                                    onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                                    placeholder="0.0"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Deskripsi Produk</label>
                                            <textarea 
                                                value={formData.description}
                                                onChange={(e) => setFormData({...formData, description: e.target.value})}
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
                                        disabled={isSaving}
                                        className="flex-[2] flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-100 disabled:opacity-50"
                                    >
                                        {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} 
                                        {isSaving ? 'Menyimpan...' : 'Simpan Produk'}
                                    </button>
                                </div>
                            </form>

                            {/* Stock Mutation History */}
                            {editingProduct && (
                                <div className="mt-20 border-t border-gray-100 pt-12">
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-8">Riwayat Mutasi Stok</h3>
                                    <div className="space-y-4">
                                        {stockLogs.length > 0 ? (
                                            stockLogs.map((log) => (
                                                <div key={log.id} className="flex justify-between items-center p-6 bg-gray-50 rounded-[2rem] border border-gray-50/50">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${log.type === 'In' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                            {log.type === 'In' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase tracking-tight text-gray-900">{log.note}</p>
                                                            <p className="text-[8px] text-gray-400 font-bold">{new Date(log.date).toLocaleString('id-ID')}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`text-sm font-black ${log.type === 'In' ? 'text-green-600' : 'text-red-600'}`}>
                                                        {log.type === 'In' ? '+' : ''}{log.change}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-10 text-center bg-gray-50 rounded-[2rem] border border-dashed border-gray-100">
                                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Belum ada riwayat perubahan stok</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AdminLayout>
    );
};

export default ProductManagement;
