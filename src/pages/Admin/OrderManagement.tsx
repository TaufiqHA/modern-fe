/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Truck, 
  Eye, 
  Package,
  Plane,
  Clock,
  CreditCard,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        'pending': 'bg-amber-50 text-amber-600 border-amber-100',
        'paid': 'bg-blue-50 text-blue-600 border-blue-100',
        'processing': 'bg-indigo-50 text-indigo-600 border-indigo-100',
        'shipped': 'bg-purple-50 text-purple-600 border-purple-100',
        'delivered': 'bg-green-50 text-green-600 border-green-100',
        'cancelled': 'bg-red-50 text-red-600 border-red-100',
    };

    const labels: Record<string, string> = {
        'pending': 'Pending Payment',
        'paid': 'Paid',
        'processing': 'Processing',
        'shipped': 'Shipped',
        'delivered': 'Success',
        'cancelled': 'Cancelled'
    };

    return (
        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${styles[status as keyof typeof styles] || 'bg-gray-50 text-gray-400 border-gray-100'}`}>
            {labels[status] || status}
        </span>
    );
};

const OrderManagement = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [resiInput, setResiInput] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchOrders = async () => {
        if (!token) return;
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/admin/orders`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setOrders(data.data || data || []);
        } catch (err: any) {
            setError(err.message || 'Gagal memuat data pesanan');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [token]);

    const handleUpdateStatus = async (orderId: string, newStatus: string, trackingNumber?: string) => {
        if (!token) return;
        
        if (newStatus === 'cancelled' && !window.confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
            return;
        }

        setIsUpdating(true);
        try {
            const response = await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    status: newStatus,
                    tracking_number: trackingNumber
                })
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'Gagal memperbarui status');
            }

            // Update local state or refresh
            await fetchOrders();
            
            // If in detail view, update selectedOrder
            if (view === 'detail' && selectedOrder?.id === orderId) {
                const updated = orders.find(o => o.id === orderId);
                if (updated) setSelectedOrder(updated);
                else setView('list');
            }

            alert('Status pesanan berhasil diperbarui');
        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const filteredOrders = orders.filter(o => {
        const matchesType = filterType === 'All' || o.type === filterType;
        const matchesSearch = (o.id + o.user?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    const handleViewDetail = (order: any) => {
        setSelectedOrder(order);
        setResiInput(order.tracking_number || order.resi || '');
        setView('detail');
    };

    return (
        <AdminLayout>
            <div className="space-y-10">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter mb-2">Manajemen Order.</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pantau dan proses semua transaksi masuk</p>
                    </div>
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
                            {/* Search & Filter */}
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="flex-1 flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100">
                                    <Search size={18} className="text-gray-400 ml-2" />
                                    <input 
                                        type="text" 
                                        placeholder="Cari berdasarkan Order ID atau nama customer..." 
                                        className="bg-transparent text-xs font-bold outline-none w-full"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                                    {['All', 'Ready Stock', 'Pre-Order', 'Jastip'].map(type => (
                                        <button 
                                            key={type}
                                            onClick={() => setFilterType(type)}
                                            className={`px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                                                filterType === type 
                                                ? 'bg-black text-white border-black shadow-xl shadow-gray-200' 
                                                : 'bg-white text-gray-400 border-gray-100 hover:border-gray-900'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Table Container */}
                            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center py-40 gap-4 text-gray-400">
                                        <Loader2 size={32} className="animate-spin text-blue-600" />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Memuat Data...</p>
                                    </div>
                                ) : error ? (
                                    <div className="flex flex-col items-center justify-center py-40 gap-4 text-red-500">
                                        <AlertCircle size={32} />
                                        <p className="text-xs font-bold">{error}</p>
                                        <button onClick={fetchOrders} className="px-6 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl">Refresh</button>
                                    </div>
                                ) : filteredOrders.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-40 gap-4 text-gray-300">
                                        <Package size={48} />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Tidak ada order ditemukan</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-gray-50/50">
                                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Type</th>
                                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {filteredOrders.map((order) => (
                                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${
                                                                    order.type === 'Ready Stock' ? 'bg-black' : 
                                                                    order.type === 'Pre-Order' ? 'bg-blue-500' : 'bg-emerald-500'
                                                                }`}>
                                                                    {order.type === 'Ready Stock' ? <Package size={14} /> : 
                                                                    order.type === 'Pre-Order' ? <Clock size={14} /> : <Plane size={14} />}
                                                                </div>
                                                                <span className="text-xs font-black uppercase tracking-tight">{order.id}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div>
                                                                <p className="text-xs font-bold text-gray-900">{order.user?.name || order.customer || 'Guest'}</p>
                                                                <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">{order.user?.email || order.email}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                                {order.type || 'Ready Stock'}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <StatusBadge status={order.status} />
                                                        </td>
                                                        <td className="px-8 py-6 text-xs font-black">
                                                            Rp {(order.total || 0).toLocaleString('id-ID')}
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <button 
                                                                onClick={() => handleViewDetail(order)}
                                                                className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
                                                            >
                                                                <ChevronRight size={20} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="detail"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid lg:grid-cols-3 gap-8"
                        >
                            {/* Left Column: Info */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-sm">
                                    <div className="flex justify-between items-start mb-12">
                                        <button 
                                            onClick={() => setView('list')}
                                            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-2"
                                        >
                                            <ArrowLeft className="w-3 h-3" /> Back to Orders
                                        </button>
                                        <StatusBadge status={selectedOrder.status} />
                                    </div>

                                    <div className="flex flex-col md:flex-row justify-between gap-12">
                                        <div className="space-y-6 flex-1">
                                            <h2 className="text-3xl font-black tracking-tighter">Order {selectedOrder.id}</h2>
                                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-300">
                                                <span>{new Date(selectedOrder.created_at || selectedOrder.date).toLocaleDateString('id-ID')}</span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                                                <span>{selectedOrder.type || 'Ready Stock'}</span>
                                            </div>
                                            
                                            <div className="pt-8 space-y-4">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">Items Ordered ({selectedOrder.items?.length || selectedOrder.items || 0})</p>
                                                <div className="space-y-4">
                                                    {(selectedOrder.items && Array.isArray(selectedOrder.items)) ? selectedOrder.items.map((item: any, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                                                            <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 overflow-hidden">
                                                                <img src={item.image || item.product?.image} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-xs font-bold line-clamp-1">{item.name || item.product?.name || 'Product'}</p>
                                                                <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Qty: {item.quantity || 1} • Rp {(item.price || item.product?.price || 0).toLocaleString('id-ID')}</p>
                                                            </div>
                                                        </div>
                                                    )) : (
                                                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                                                            <div className="w-12 h-12 bg-white rounded-xl border border-gray-100" />
                                                            <div className="flex-1">
                                                                <p className="text-xs font-bold line-clamp-1">Product Details Unavailable</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-px bg-gray-100 hidden md:block" />

                                        <div className="space-y-8 min-w-[240px]">
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 flex items-center gap-2"><CreditCard size={14} /> Payment</p>
                                                <div className="bg-gray-50 p-4 rounded-2xl">
                                                    <p className="text-xs font-bold">{selectedOrder.payment_method || selectedOrder.paymentMethod || 'VA / Credit Card'}</p>
                                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Rp {(selectedOrder.total || 0).toLocaleString('id-ID')}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 flex items-center gap-2"><Truck size={14} /> Shipping</p>
                                                <div className="bg-gray-50 p-4 rounded-2xl">
                                                    <p className="text-xs font-bold">{selectedOrder.user?.name || selectedOrder.customer}</p>
                                                    <p className="text-[10px] font-medium text-gray-400 leading-relaxed mt-2">
                                                        {selectedOrder.address?.detail || selectedOrder.shipping_address || 'Address info...'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Admin Actions */}
                            <div className="space-y-8">
                                {/* Payment Confirmation Card */}
                                <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-8">Order Status Action</h3>
                                    
                                    {selectedOrder.status === 'pending' ? (
                                        <div className="space-y-6">
                                            <div className="aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3">
                                                <Eye size={24} className="text-gray-300" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">View Payment Evidence</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button 
                                                    disabled={isUpdating}
                                                    onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')}
                                                    className="flex items-center justify-center gap-2 p-4 border border-red-100 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-colors disabled:opacity-50"
                                                >
                                                    <XCircle size={14} /> Reject
                                                </button>
                                                <button 
                                                    disabled={isUpdating}
                                                    onClick={() => handleUpdateStatus(selectedOrder.id, 'paid')}
                                                    className="flex items-center justify-center gap-2 p-4 bg-green-50 text-green-600 border border-green-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-100 transition-colors disabled:opacity-50"
                                                >
                                                    <CheckCircle size={14} /> Confirm
                                                </button>
                                            </div>
                                        </div>
                                    ) : selectedOrder.status === 'paid' ? (
                                        <div className="space-y-6">
                                            <p className="text-[10px] font-medium text-gray-400 leading-relaxed">Pesanan sudah dibayar. Pindahkan ke tahap pemrosesan untuk mulai menyiapkan barang.</p>
                                            <button 
                                                disabled={isUpdating}
                                                onClick={() => handleUpdateStatus(selectedOrder.id, 'processing')}
                                                className="w-full py-5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
                                            >
                                                Start Processing
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4 p-4 bg-green-50 text-green-600 rounded-2xl border border-green-100">
                                            <CheckCircle size={20} />
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest">Payment Verified</p>
                                                <p className="text-[8px] font-bold opacity-75">Verified via {selectedOrder.payment_method || 'System'}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Tracking Info Card */}
                                <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-8">Shipment Tracking</h3>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nomor Resi</label>
                                            <input 
                                                type="text" 
                                                value={resiInput}
                                                onChange={(e) => setResiInput(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                                placeholder="Contoh: JX12345678"
                                            />
                                        </div>
                                        <button 
                                            disabled={isUpdating || !resiInput}
                                            onClick={() => handleUpdateStatus(selectedOrder.id, 'shipped', resiInput)}
                                            className="w-full flex items-center justify-center gap-3 bg-black text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-100 disabled:bg-gray-400"
                                        >
                                            {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Truck size={16} />} 
                                            {(selectedOrder.tracking_number || selectedOrder.resi) ? 'Update Resi' : 'Input Resi & Ship'}
                                        </button>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                                    <button 
                                        disabled={isUpdating}
                                        onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')}
                                        className="w-full p-6 border border-red-50 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AdminLayout>
    );
};

export default OrderManagement;

const ArrowLeft = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

