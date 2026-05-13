import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/admin';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // In a real app, we'd verify password too.
            // For this demo, we use the specific email that triggers admin role in AuthContext.
            if (email !== 'admin@modern.com') {
                throw new Error('Akses ditolak. Email bukan administrator.');
            }
            
            await login(email);
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.message || 'Login gagal. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="w-full max-w-md">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8 md:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <ShieldCheck size={120} />
                    </div>

                    <div className="relative space-y-10">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
                                <Lock size={20} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tighter">Admin Panel.</h1>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure environment access only</p>
                            </div>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-50 text-red-500 p-4 rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest"
                            >
                                <AlertCircle size={16} /> {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Admin Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input 
                                        type="email" 
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                        placeholder="admin@modern.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Secure Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input 
                                        type="password" 
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-3 bg-black text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 disabled:opacity-50"
                            >
                                {isLoading ? 'Authenticating...' : 'Enter Dashboard'} <ArrowRight size={16} />
                            </button>
                        </form>

                        <div className="text-center">
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-300">
                                Protected by Modern Corp Security
                            </p>
                        </div>
                    </div>
                </motion.div>
                
                <p className="text-center mt-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Bukan Admin? <button onClick={() => navigate('/login')} className="text-gray-900 hover:underline">Kembali ke Store</button>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
