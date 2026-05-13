import { motion } from 'motion/react';
import { MousePointer2, CreditCard, Package, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    icon: MousePointer2,
    title: 'Pilih Produk',
    desc: 'Cari produk yang Anda inginkan dari marketplace luar negeri atau toko fisik.'
  },
  {
    icon: CreditCard,
    title: 'Kirim Request',
    desc: 'Isi formulir jastip dengan detail link, foto, dan spesifikasi produk.'
  },
  {
    icon: Package,
    title: 'Konfirmasi Harga',
    desc: 'Admin akan mengirimkan penawaran harga total (termasuk fee & ongkir).'
  },
  {
    icon: CheckCircle2,
    title: 'Terima Barang',
    desc: 'Setelah pembayaran lunas, kami akan membelikan dan mengirimkan barang ke alamat Anda.'
  }
];

const Jastip = () => {
  return (
    <main className="pt-32 pb-40 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Banner Section */}
        <section className="bg-gray-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-24 text-white mb-20 md:mb-32 relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-6 md:mb-8 leading-tight">Titip Barang Sesuai Keinginanmu.</h2>
            <p className="text-gray-400 font-medium text-sm md:text-lg leading-relaxed mb-8 md:mb-12">
              Layanan Jasa Titip (Jastip) terpercaya untuk membantu Anda mendapatkan produk impian dari berbagai toko global tanpa repot.
            </p>
            <Link 
              to="/jastip/request" 
              className="inline-flex items-center justify-center gap-4 bg-white text-black px-8 md:px-10 py-4 md:py-5 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-all group w-full sm:w-auto"
            >
              Request Jastip Sekarang <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 md:opacity-20 pointer-events-none hidden sm:block">
             <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800" alt="Shipping" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-40">
          <div className="text-center mb-24">
            <h3 className="text-3xl font-bold mb-4 tracking-tight">Bagaimana Cara Kerjanya?</h3>
            <p className="text-gray-400 font-medium tracking-widest text-[10px] uppercase">Langkah Mudah Berbelanja Jastip</p>
          </div>

          <div className="grid md:grid-cols-4 gap-12 relative">
             <div className="absolute top-12 left-0 w-full h-[1px] bg-gray-50 -z-10 hidden md:block"></div>
             {STEPS.map((step, idx) => (
               <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
               >
                 <div className="w-24 h-24 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-8 shadow-sm group-hover:border-blue-600 transition-colors">
                    <step.icon size={32} className="text-gray-300" />
                 </div>
                 <h4 className="font-bold text-sm mb-4 tracking-tight uppercase">{step.title}</h4>
                 <p className="text-xs text-gray-400 font-medium leading-relaxed px-4">{step.desc}</p>
               </motion.div>
             ))}
          </div>
        </section>

        {/* Call to Action Small */}
        <section className="text-center bg-gray-50 rounded-[2.5rem] p-12 md:p-20 border border-gray-50">
            <h3 className="text-2xl font-bold mb-6">Punya Link Produk Sendiri?</h3>
            <p className="text-gray-400 font-medium mb-10 max-w-md mx-auto">Tempelkan link produk Anda dan biarkan kami yang mengurus sisanya hingga barang sampai di depan pintu.</p>
            <Link 
                to="/jastip/request" 
                className="text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-black pb-2 hover:text-blue-600 hover:border-blue-600 transition-colors"
            >
                Buka Formulir Request
            </Link>
        </section>
      </div>
    </main>
  );
};

export default Jastip;
