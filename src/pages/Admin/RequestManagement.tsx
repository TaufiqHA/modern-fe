import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  Plus, 
  Clock, 
  Plane,
  X,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';

const REQUESTS_MOCK = [
  {
    id: 'REQ-551',
    customer: 'Deni Ramadhan',
    product: 'Nike Dunk Low Retro',
    link: 'https://nike.com/...',
    status: 'Pending',
    date: '10 Mei 2024',
    source: 'USA Store',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'REQ-442',
    customer: 'Siska Putri',
    product: 'Sony WH-1000XM5',
    link: 'https://amazon.com/...',
    status: 'Quotation Sent',
    date: '05 Mei 2024',
    source: 'Amazon Global',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200',
    quote: { base: 4200000, fee: 300000, tax: 250000, total: 4750000 }
  }
];

const RequestManagement = () => {
    const [view, setView] = useState<'list' | 'quote'>('list');
    const [selectedReq, setSelectedReq] = useState<any>(null);
    const [quoteData, setQuoteData] = useState({
        base: '',
        fee: '250000',
        tax: '0',
        total: 0
    });

    const handleOpenQuote = (req: any) => {
        setSelectedReq(req);
        if (req.quote) {
            setQuoteData({
                base: req.quote.base.toString(),
                fee: req.quote.fee.toString(),
                tax: req.quote.tax.toString(),
                total: req.quote.total
            });
        } else {
            setQuoteData({ base: '', fee: '250000', tax: '0', total: 0 });
        }
        setView('quote');
    };

    const calculateTotal = () => {
        const base = parseInt(quoteData.base) || 0;
        const fee = parseInt(quoteData.fee) || 0;
        const tax = parseInt(quoteData.tax) || 0;
        return base + fee + tax;
    };

    return (
        <AdminLayout>
            <div className="space-y-10">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter mb-2">Manajemen Request.</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Proses titipan barang (Jastip) dan Pre-Order</p>
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
                            {/* Tabs */}
                            <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
                                <button className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white text-gray-900 shadow-sm transition-all flex items-center gap-2">
                                    <Plane size={14} /> Jastip Requests
                                </button>
                                <button className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all flex items-center gap-2">
                                    <ShoppingBag size={14} /> Scheduled PO
                                </button>
                            </div>

                            {/* Table */}
                            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Request Details</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Sources</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {REQUESTS_MOCK.map((req) => (
                                                <tr key={req.id} className="group hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-14 h-14 rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                                                                <img src={req.image} alt="Product" className="w-full h-full object-cover grayscale" />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-xs font-black uppercase tracking-tight">{req.product}</p>
                                                                <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1">
                                                                    ID: {req.id} • <ExternalLink size={8} /> <a href={req.link} className="hover:underline">Link Produk</a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-xs font-bold text-gray-900">{req.customer}</p>
                                                        <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Requested {req.date}</p>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 rounded-full text-gray-400">
                                                            {req.source}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                                            req.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                                                        }`}>
                                                            {req.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => handleOpenQuote(req)}
                                                                className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
                                                            >
                                                                <DollarSign size={12} /> {req.quote ? 'Edit Quote' : 'Add Quote'}
                                                            </button>
                                                            <button className="flex items-center gap-2 bg-gray-100 text-gray-900 px-5 py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                                                                <RefreshCw size={12} /> Convert to PO
                                                            </button>
                                                        </div>
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
                            key="quote"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden"
                        >
                            <div className="grid md:grid-cols-5 h-full">
                                {/* Left: Product Info */}
                                <div className="md:col-span-2 bg-gray-50/50 p-10 md:p-14 border-r border-gray-100">
                                    <button 
                                        onClick={() => setView('list')}
                                        className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
                                    >
                                        <X size={14} /> Close
                                    </button>

                                    <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white mb-8 border border-gray-100 shadow-sm">
                                        <img src={selectedReq.image} alt="Product" className="w-full h-full object-cover" />
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Requested Product</p>
                                            <h3 className="text-2xl font-black tracking-tight">{selectedReq.product}</h3>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Customer</p>
                                            <p className="text-sm font-bold text-gray-900">{selectedReq.customer}</p>
                                        </div>
                                        <a href={selectedReq.link} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">
                                           Launch Source URL <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>

                                {/* Right: Quotation Form */}
                                <div className="md:col-span-3 p-10 md:p-14 flex flex-col justify-between">
                                    <div className="space-y-12">
                                        <div>
                                            <h2 className="text-3xl font-black tracking-tighter mb-2">Price Quotation.</h2>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Hitung total biaya titipan untuk pelanggan</p>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Base Item Price (Rp)</label>
                                                    <input 
                                                        type="number" 
                                                        value={quoteData.base}
                                                        onChange={(e) => setQuoteData({...quoteData, base: e.target.value})}
                                                        placeholder="Contoh: 3500000"
                                                        className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Jastip Fee (Fixed)</label>
                                                    <input 
                                                        type="number" 
                                                        value={quoteData.fee}
                                                        onChange={(e) => setQuoteData({...quoteData, fee: e.target.value})}
                                                        className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Biaya Pajak & Bea Masuk (Tax)</label>
                                                <input 
                                                    type="number" 
                                                    value={quoteData.tax}
                                                    onChange={(e) => setQuoteData({...quoteData, tax: e.target.value})}
                                                    placeholder="0"
                                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-black text-white p-10 rounded-[2rem] flex flex-col items-center gap-6 shadow-2xl shadow-gray-200 relative overflow-hidden">
                                            <DollarSign size={80} className="absolute -right-4 -bottom-4 text-white/5" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Estimated Grand Total</p>
                                            <h4 className="text-4xl font-black tracking-tight">Rp {calculateTotal().toLocaleString('id-ID')}</h4>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 mt-12">
                                        <button 
                                            onClick={() => setView('list')}
                                            className="px-8 py-5 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors"
                                        >
                                            Discard Quote
                                        </button>
                                        <button 
                                            className="bg-blue-600 text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-100"
                                        >
                                            <CheckCircle2 size={16} /> Send Quotation to User
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AdminLayout>
    );
};

export default RequestManagement;
