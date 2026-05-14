import { useState } from 'react';
import { Camera, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AccountLayout from './AccountLayout';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || ''
    });

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateUser({
                name: formData.name,
                phone: formData.phone,
                bio: formData.bio
            });
        } catch (error) {
            console.error('Update failed:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <AccountLayout>
            <header className="mb-12">
                <h3 className="text-2xl font-bold tracking-tight mb-2">Informasi Profil</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Kelola informasi pribadi Anda</p>
            </header>

            <div className="space-y-12">
                {/* Photo Section */}
                <div className="flex flex-col sm:flex-row items-center gap-8">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-xl">
                            <img src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <button className="absolute bottom-0 right-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:bg-blue-600 transition-colors">
                            <Camera size={16} />
                        </button>
                    </div>
                    <div className="text-center sm:text-left">
                        <h4 className="font-bold mb-1">{user?.name}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Member sejak Mei 2024</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nama Lengkap</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Alamat Email</label>
                        <input 
                            type="email" 
                            disabled
                            className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold opacity-50 cursor-not-allowed"
                            value={formData.email}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nomor WhatsApp</label>
                        <input 
                            type="tel" 
                            className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Bio Singkat</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        />
                    </div>
                </div>

                <div className="pt-8">
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-gray-100 disabled:opacity-50"
                    >
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Save size={16} />
                        )} 
                        {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>
            </div>
        </AccountLayout>
    );
};

export default Profile;
