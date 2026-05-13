import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { COLLECTIONS } from '../data/collections';

const Collections = () => {
  return (
    <main className="pt-32 pb-40 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Koleksi Kami.</h2>
          <p className="text-gray-400 font-medium max-w-sm">Narasi visual melalui produk pilihan yang dikelompokkan berdasarkan tema dan filosofi desain.</p>
        </header>

        <div className="space-y-40">
          {COLLECTIONS.map((col, idx) => (
            <motion.section 
              key={col.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}
            >
              <div className="flex-1 w-full aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-50 shadow-2xl shadow-gray-100">
                <img 
                  src={col.image} 
                  alt={col.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-6">Volume {idx + 1}</p>
                <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{col.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-10 max-w-md mx-auto md:mx-0">
                  {col.description}
                </p>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <Link 
                        to={`/collections/${col.slug}`} 
                        className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] hover:text-blue-600 transition-colors"
                    >
                        Jelajahi Produk <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none border-l border-gray-100 pl-8 hidden md:block">
                        {col.count} Items
                    </span>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Collections;
