import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Truck, 
  Eye, 
  MoreVertical,
  CreditCard,
  Package,
  Plane,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const ORDERS_MOCK = [
  {
    id: 'ORD-9921',
    customer: 'Budi Santoso',
    email: 'budi@example.com',
    type: 'Ready Stock',
    status: 'Pending Payment',
    total: 399000,
    date: '12 Mei 2024',
    items: 2,
    paymentMethod: 'Bank Transfer (BCA)',
    resi: null
  },
  {
    id: 'ORD-8812',
    customer: 'Siti Aminah',
    email: 'siti@example.com',
    type: 'Pre-Order',
    status: 'Paid',
    total: 899000,
    date: '11 Mei 2024',
    items: 1,
    paymentMethod: 'GoPay',
    resi: null
  },
  {
    id: 'ORD-7755',
    customer: 'Andi Wijaya',
    email: 'andi@example.com',
    type: 'Jastip',
    status: 'Shipped',
    total: 1250000,
    date: '10 Mei 2024',
    items: 1,
    paymentMethod: 'Bank Transfer (Mandiri)',
    resi: 'JX123456789'
  }
];

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        'Pending Payment': 'bg-amber-50 text-amber-600 border-amber-100',
        'Paid': 'bg-blue-50 text-blue-600 border-blue-100',
        'Processing': 'bg-indigo-50 text-indigo-600 border-indigo-100',
        'Shipped': 'bg-purple-50 text-purple-600 border-purple-100',
        'Success': 'bg-green-50 text-green-600 border-green-100',
        'Cancelled': 'bg-red-50 text-red-600 border-red-100',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${styles[status as keyof typeof styles] || 'bg-gray-50 text-gray-400 border-gray-100'}`}>
            {status}
        </span>
    );
};

const OrderManagement = () => {
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [resiInput, setResiInput] = useState('');
    const [filterType, setFilterType] = useState('All');

    const filteredOrders = filterType === 'All' 
        ? ORDERS_MOCK 
        : ORDERS_MOCK.filter(o => o.type === filterType);

    const handleViewDetail = (order: any) => {
        setSelectedOrder(order);
        setResiInput(order.resi || '');
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

                            {/* Table */}
                            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
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
                                                            <p className="text-xs font-bold text-gray-900">{order.customer}</p>
                                                            <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">{order.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                            {order.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <StatusBadge status={order.status} />
                                                    </td>
                                                    <td className="px-8 py-6 text-xs font-black">
                                                        Rp {order.total.toLocaleString('id-ID')}
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
                                                <span>{selectedOrder.date}</span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                                                <span>{selectedOrder.type}</span>
                                            </div>
                                            
                                            <div className="pt-8 space-y-4">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">Items Ordered ({selectedOrder.items})</p>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                                                        <div className="w-12 h-12 bg-white rounded-xl border border-gray-100" />
                                                        <div className="flex-1">
                                                            <p className="text-xs font-bold line-clamp-1">Sample Product Name</p>
                                                            <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Qty: 1 • Rp 399.000</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-px bg-gray-100 hidden md:block" />

                                        <div className="space-y-8 min-w-[240px]">
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 flex items-center gap-2"><CreditCard size={14} /> Payment</p>
                                                <div className="bg-gray-50 p-4 rounded-2xl">
                                                    <p className="text-xs font-bold">{selectedOrder.paymentMethod}</p>
                                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Rp {selectedOrder.total.toLocaleString('id-ID')}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 flex items-center gap-2"><Truck size={14} /> Shipping</p>
                                                <div className="bg-gray-50 p-4 rounded-2xl">
                                                    <p className="text-xs font-bold">{selectedOrder.customer}</p>
                                                    <p className="text-[10px] font-medium text-gray-400 leading-relaxed mt-2">
                                                        Jl. Minimalist No. 42, Kebayoran Baru, Jakarta Selatan, 12150
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
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-8">Payment Info</h3>
                                    {selectedOrder.status === 'Pending Payment' ? (
                                        <div className="space-y-6">
                                            <div className="aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3">
                                                <Eye size={24} className="text-gray-300" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">View Receipt</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button className="flex items-center justify-center gap-2 p-4 border border-red-100 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-colors">
                                                    <XCircle size={14} /> Reject
                                                </button>
                                                <button className="flex items-center justify-center gap-2 p-4 bg-green-50 text-green-600 border border-green-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-100 transition-colors">
                                                    <CheckCircle size={14} /> Confirm
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4 p-4 bg-green-50 text-green-600 rounded-2xl border border-green-100">
                                            <CheckCircle size={20} />
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest">Payment Verified</p>
                                                <p className="text-[8px] font-bold opacity-75">Verified on May 12, 11:20 AM</p>
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
                                        <button className="w-full flex items-center justify-center gap-3 bg-black text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-100">
                                            <Truck size={16} /> {selectedOrder.resi ? 'Update Resi' : 'Input Resi & Ship'}
                                        </button>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <button className="w-full p-6 border border-red-50 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all">
                                    Cancel Order
                                </button>
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
