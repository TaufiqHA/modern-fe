import AccountLayout from './AccountLayout';
import { motion } from 'motion/react';
import { FileText, Hourglass, DollarSign, PackageCheck, ExternalLink } from 'lucide-react';

const JASTIP_REQUESTS = [
  {
    id: 'REQ-551',
    product: 'Nike Dunk Low Retro',
    link: 'https://nike.com/...',
    status: 'pending',
    date: '10 Mei 2024',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'REQ-442',
    product: 'Sony WH-1000XM5',
    link: 'https://amazon.com/...',
    status: 'quotation',
    date: '05 Mei 2024',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200',
    quote: 4500000
  }
];

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        pending: 'bg-amber-50 text-amber-600',
        quotation: 'bg-blue-50 text-blue-600',
        approved: 'bg-green-50 text-green-600',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${styles[status as keyof typeof styles]}`}>
            {status}
        </span>
    );
};

const JastipRequests = () => {
    return (
        <AccountLayout>
            <header className="mb-12">
                <h3 className="text-2xl font-bold tracking-tight mb-2">Request Jastip</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pantau status penawaran barang titipan Anda</p>
            </header>

            <div className="space-y-6">
                {JASTIP_REQUESTS.map((req) => (
                    <motion.div 
                        key={req.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-gray-50/50 border border-gray-50 rounded-3xl"
                    >
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                            <img src={req.image} alt="Product" className="w-full h-full object-cover grayscale" />
                        </div>
                        
                        <div className="flex-1 space-y-2 text-center sm:text-left">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                                <h4 className="font-bold text-sm uppercase tracking-tight">{req.product}</h4>
                                <StatusBadge status={req.status} />
                            </div>
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">ID: {req.id} • DIAJUKAN {req.date}</p>
                            <a href={req.link} className="inline-flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
                                <ExternalLink size={10} /> Lihat Link Produk
                            </a>
                        </div>

                        <div className="w-full sm:w-auto text-center sm:text-right pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                            {req.status === 'quotation' ? (
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Estimasi Total</p>
                                    <p className="text-lg font-black tracking-tight">Rp {req?.quote?.toLocaleString('id-ID')}</p>
                                    <button className="w-full sm:w-auto px-6 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-colors">Terima & Bayar</button>
                                </div>
                            ) : (
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 italic">Menunggu Review Admin...</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </AccountLayout>
    );
};

export default JastipRequests;
