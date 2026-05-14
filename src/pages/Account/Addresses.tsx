import { useState, useEffect } from 'react';
import AccountLayout from './AccountLayout';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Home, Briefcase, MapPin, MoreVertical, X, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Address } from '../../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Addresses = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newAddress, setNewAddress] = useState({
        label: '',
        recipient: '',
        phone: '',
        detail: ''
    });
    const { token } = useAuth();

    const fetchAddresses = async () => {
        if (!token) return;
        try {
            const response = await fetch(`${API_URL}/user/addresses`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            // Support various API response structures
            setAddresses(data.addresses || data.data?.addresses || data.data || []);
        } catch (error) {
            console.error('Failed to fetch addresses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [token]);

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const response = await fetch(`${API_URL}/user/addresses`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newAddress)
            });
            if (response.ok) {
                setShowAddModal(false);
                setNewAddress({ label: '', recipient: '', phone: '', detail: '' });
                fetchAddresses();
            }
        } catch (error) {
            console.error('Failed to add address:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const getIcon = (label: string) => {
        const l = label.toLowerCase();
        if (l.includes('rumah')) return Home;
        if (l.includes('kantor') || l.includes('kerja')) return Briefcase;
        return MapPin;
    };

    return (
        <AccountLayout>
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2">Alamat Tersimpan</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pengelolaan daftar alamat pengiriman</p>
                </div>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-100"
                >
                    <Plus size={16} /> Tambah Alamat
                </button>
            </header>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-gray-200" size={40} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Memuat Alamat...</p>
                </div>
            ) : addresses.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                    {addresses.map((addr) => {
                        const Icon = getIcon(addr.label);
                        return (
                            <motion.div 
                                key={addr.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 border border-gray-100 rounded-[2.5rem] hover:border-gray-900 transition-all group relative"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-colors">
                                        <Icon size={18} />
                                    </div>
                                    <h4 className="text-xs font-black uppercase tracking-widest">{addr.label}</h4>
                                    {addr.is_default && (
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-widest rounded-full">Utama</span>
                                    )}
                                </div>

                                <div className="space-y-2 mb-8">
                                    <p className="text-sm font-bold">{addr.recipient}</p>
                                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{addr.phone}</p>
                                    <p className="text-xs font-medium text-gray-400 leading-relaxed max-w-[200px]">{addr.detail}</p>
                                </div>

                                <div className="flex gap-4">
                                    <button className="text-[10px] font-black uppercase tracking-widest border-b border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors">Edit</button>
                                    <button className="text-[10px] font-black uppercase tracking-widest border-b border-red-500 pb-1 text-red-500 hover:text-red-700 hover:border-red-700 transition-colors">Hapus</button>
                                </div>

                                <button className="absolute top-8 right-8 text-gray-200 hover:text-gray-900">
                                    <MoreVertical size={20} />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-24 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
                    <MapPin className="mx-auto text-gray-200 mb-6" size={48} />
                    <h4 className="text-xs font-black uppercase tracking-widest mb-2">Belum Ada Alamat</h4>
                    <p className="text-[10px] text-gray-400 font-medium">Tambahkan alamat pengiriman untuk memudahkan checkout.</p>
                </div>
            )}

            {/* Add Address Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
                            onClick={() => setShowAddModal(false)}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-x-6 bottom-6 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white rounded-[2.5rem] shadow-2xl z-[70] overflow-hidden"
                        >
                            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest">Tambah Alamat Baru</h4>
                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Lengkapi detail pengiriman Anda</p>
                                </div>
                                <button onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleAddAddress} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Label Alamat</label>
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="Rumah / Kantor / Apartemen"
                                        className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                        value={newAddress.label}
                                        onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Penerima</label>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="Nama Lengkap"
                                            className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                            value={newAddress.recipient}
                                            onChange={(e) => setNewAddress({...newAddress, recipient: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Telepon</label>
                                        <input 
                                            required
                                            type="tel" 
                                            placeholder="0812xxxx"
                                            className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                            value={newAddress.phone}
                                            onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Alamat Lengkap</label>
                                    <textarea 
                                        required
                                        rows={3}
                                        placeholder="Nama jalan, nomor rumah, kec, kab, kode pos"
                                        className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors resize-none"
                                        value={newAddress.detail}
                                        onChange={(e) => setNewAddress({...newAddress, detail: e.target.value})}
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-gray-100 disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                                    {isSaving ? 'Menyimpan...' : 'Simpan Alamat'}
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </AccountLayout>
    );
};

export default Addresses;
