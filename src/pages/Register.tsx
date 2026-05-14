import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        try {
            await register(formData);
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.message || 'Gagal mendaftar. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="pt-32 pb-40 px-6 min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full">
                <Link to="/login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors mb-12">
                    <ArrowLeft size={14} /> Kembali ke Login
                </Link>

                <header className="mb-12">
                    <h2 className="text-4xl font-bold tracking-tight mb-4">Buat Akun.</h2>
                    <p className="text-gray-400 font-medium">Bergabunglah dengan komunitas kami untuk mendapatkan benefit eksklusif.</p>
                </header>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nama Lengkap</label>
                        <div className="relative">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                            <input 
                                required
                                type="text" 
                                placeholder="Masukkan nama Anda"
                                className="w-full bg-gray-50 border border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-xs font-bold focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                            <input 
                                required
                                type="email" 
                                placeholder="nama@email.com"
                                className="w-full bg-gray-50 border border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-xs font-bold focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Password</label>
                        <div className="relative">
                            <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                            <input 
                                required
                                type="password" 
                                placeholder="Min. 8 Karakter"
                                className="w-full bg-gray-50 border border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-xs font-bold focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-2">
                        <input type="checkbox" required className="w-4 h-4 rounded border-gray-200 text-black focus:ring-black" />
                        <span className="text-[10px] text-gray-400 font-medium leading-relaxed">Saya setuju dengan Ketentuan Layanan dan Kebijakan Privasi.</span>
                    </div>

                    <button 
                        disabled={isLoading}
                        type="submit" 
                        className="w-full py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'} {!isLoading && <ArrowRight size={16} />}
                    </button>
                </form>

                <p className="text-center mt-12 text-[10px] text-gray-400 font-medium">
                    Sudah punya akun? <Link to="/login" className="text-gray-900 font-black border-b border-gray-900 pb-0.5 ml-1">Masuk</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
