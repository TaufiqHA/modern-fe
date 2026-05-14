import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mail, Phone, ArrowRight, Chrome } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
    const [formData, setFormData] = useState({ email: '', password: '', phone: '', otp: '' });
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login, sendOtp, verifyOtp } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        try {
            if (loginMethod === 'email') {
                await login(formData.email, formData.password);
                navigate(from, { replace: true });
            } else {
                if (!isOtpSent) {
                    await sendOtp(formData.phone);
                    setIsOtpSent(true);
                } else {
                    await verifyOtp(formData.phone, formData.otp);
                    navigate(from, { replace: true });
                }
            }
        } catch (err: any) {
            setError(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="pt-32 pb-40 px-6 min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full">
                <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors mb-12">
                    <ArrowLeft size={14} /> Kembali
                </Link>

                <header className="mb-12">
                    <h2 className="text-4xl font-bold tracking-tight mb-4">Selamat Datang.</h2>
                    <p className="text-gray-400 font-medium">Masuk ke akun Anda untuk pengalaman belanja yang lebih personal.</p>
                </header>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold text-center">
                        {error}
                    </div>
                )}

                <div className="flex bg-gray-50 p-1.5 rounded-2xl mb-10">
                    <button 
                        onClick={() => { setLoginMethod('email'); setIsOtpSent(false); setError(null); }}
                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${loginMethod === 'email' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
                    >
                        Email
                    </button>
                    <button 
                        onClick={() => { setLoginMethod('phone'); setIsOtpSent(false); setError(null); }}
                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${loginMethod === 'phone' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
                    >
                        Nomor HP
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                        {loginMethod === 'email' ? (
                            <motion.div 
                                key="email"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Alamat Email</label>
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
                                    <input 
                                        required
                                        type="password" 
                                        placeholder="••••••••"
                                        className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="phone"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nomor WhatsApp</label>
                                    <div className="relative">
                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                        <input 
                                            required
                                            disabled={isOtpSent}
                                            type="tel" 
                                            placeholder="0812xxxxxxx"
                                            className="w-full bg-gray-50 border border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-xs font-bold focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300 disabled:opacity-50"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                </div>
                                
                                {isOtpSent && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-2"
                                    >
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Kode OTP</label>
                                        <input 
                                            required
                                            type="text" 
                                            maxLength={6}
                                            placeholder="Masukkan 6 digit kode"
                                            className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300 tracking-[0.5em] text-center"
                                            value={formData.otp}
                                            onChange={(e) => setFormData({...formData, otp: e.target.value})}
                                        />
                                        <p className="text-[10px] text-gray-400 text-center font-medium">OTP telah dikirim via WhatsApp</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button 
                        disabled={isLoading}
                        type="submit" 
                        className="w-full py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {isLoading ? 'Memproses...' : (isOtpSent ? 'Masuk' : (loginMethod === 'phone' ? 'Kirim OTP' : 'Masuk'))} {!isLoading && <ArrowRight size={16} />}
                    </button>
                </form>

                <div className="relative my-10">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-4 text-[10px] font-black uppercase tracking-widest text-gray-300">Atau masuk dengan</span>
                    </div>
                </div>

                <button 
                    onClick={() => login('google-user@gmail.com').then(() => navigate(from, { replace: true }))}
                    className="w-full py-5 border border-gray-100 rounded-2xl flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.1em] hover:border-gray-900 transition-all"
                >
                    <Chrome size={18} className="text-gray-400" /> Google Login
                </button>

                <p className="text-center mt-12 text-[10px] text-gray-400 font-medium">
                    Belum punya akun? <Link to="/register" state={{ from: location.state?.from }} className="text-gray-900 font-black border-b border-gray-900 pb-0.5 ml-1">Daftar Sekarang</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
