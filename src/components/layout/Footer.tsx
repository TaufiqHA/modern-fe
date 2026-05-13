const Footer = () => {
  return (
    <footer className="py-20 border-t border-gray-50 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <p className="text-[10px] text-gray-400 font-bold tracking-[0.3em] uppercase">© 2026 MODERN STORE.</p>
        <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          <a href="#" className="hover:text-gray-900 transition-colors">Instagram</a>
          <a href="#" className="hover:text-gray-900 transition-colors">WhatsApp</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Bantuan</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
