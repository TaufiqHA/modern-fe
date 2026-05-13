import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Shield, 
  Camera, 
  Save, 
  Key,
  Globe,
  Bell
} from 'lucide-react';

const AdminProfile = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AdminLayout>
            <div className="space-y-10 max-w-5xl">
                {/* Header */}
                <header>
                    <h1 className="text-3xl font-black tracking-tighter mb-2">My Profile.</h1>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Kelola informasi akun dan preferensi admin Anda</p>
                </header>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Left: Avatar & Quick Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                            <div className="relative group mb-6">
                                <div className="w-32 h-32 rounded-[2.5rem] bg-black text-white flex items-center justify-center text-4xl font-black overflow-hidden shadow-2xl shadow-gray-200">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        'AD'
                                    )}
                                </div>
                                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl border border-gray-100 shadow-xl flex items-center justify-center text-gray-400 hover:text-black transition-all">
                                    <Camera size={18} />
                                </button>
                            </div>
                            
                            <h2 className="text-xl font-black tracking-tight">{user?.name}</h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6">Administrator</p>
                            
                            <div className="w-full h-px bg-gray-50 mb-6" />
                            
                            <div className="w-full space-y-4">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <span>Joined</span>
                                    <span className="text-gray-900">May 2024</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <span>Last Login</span>
                                    <span className="text-gray-900">Today, 14:45</span>
                                </div>
                            </div>
                        </section>

                        <section className="bg-gray-900 p-8 rounded-[2rem] text-white">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="text-blue-400" size={18} />
                                <h3 className="text-[10px] font-black uppercase tracking-widest">Security Status</h3>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed mb-6">Akun Anda dilindungi dengan enkripsi tingkat lanjut dan autentikasi multi-faktor.</p>
                            <button className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                Audit Security Log
                            </button>
                        </section>
                    </div>

                    {/* Right: Personal Tabs & Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                                        <User size={18} />
                                    </div>
                                    <h3 className="text-sm font-black uppercase tracking-widest">Personal Details</h3>
                                </div>

                                <form className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Full Name</label>
                                            <input 
                                                type="text" 
                                                defaultValue={user?.name}
                                                className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-black transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Email Address</label>
                                            <input 
                                                type="email" 
                                                defaultValue={user?.email}
                                                className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-black transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Timezone</label>
                                            <div className="relative">
                                                <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                                <select className="w-full bg-gray-50 border border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-xs font-bold focus:outline-none appearance-none">
                                                    <option>Jakarta (GMT+07:00)</option>
                                                    <option>Singapore (GMT+08:00)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Language</label>
                                            <select className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none appearance-none">
                                                <option>Bahasa Indonesia</option>
                                                <option>English (US)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button 
                                        type="button" 
                                        className="flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-200"
                                    >
                                        <Save size={16} /> Save Changes
                                    </button>
                                </form>
                            </div>
                        </section>

                        <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 md:p-14">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                                    <Key size={18} />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-widest">Update Password</h3>
                            </div>
                            <p className="text-xs text-gray-400 mb-8 font-medium">Gunakan setidaknya 12 karakter dengan kombinasi angka dan simbol.</p>
                            
                            <div className="space-y-6 max-w-md">
                                <input 
                                    type="password" 
                                    placeholder="Current Password"
                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-black transition-colors"
                                />
                                <input 
                                    type="password" 
                                    placeholder="New Password"
                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-black transition-colors"
                                />
                                <button className="text-[10px] font-black uppercase tracking-widest text-gray-900 hover:underline px-4">
                                    Lupa Password?
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProfile;
