import React, { useState, useRef, ChangeEvent } from 'react';
import { Camera, Save, Lock, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AccountLayout from './AccountLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Profile = () => {
    const { user, updateUser, token } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('email', formData.email);
            submitData.append('phone', formData.phone);
            submitData.append('bio', formData.bio);
            
            if (selectedFile) {
                submitData.append('avatar', selectedFile);
            }

            await updateUser(submitData);
            alert('Profil berhasil diperbarui!');
            // Reset local file state after success
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (error) {
            console.error('Update failed:', error);
            alert('Gagal memperbarui profil');
        } finally {
            setIsSaving(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Konfirmasi password tidak cocok!");
            return;
        }

        if (passwordData.newPassword.length < 8) {
            alert("Password baru minimal 8 karakter!");
            return;
        }

        setIsChangingPassword(true);
        try {
            const response = await fetch(`${API_URL}/user/password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    current_password: passwordData.currentPassword,
                    new_password: passwordData.newPassword,
                    new_password_confirmation: passwordData.confirmPassword
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert('Password berhasil diganti!');
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                alert(result.message || 'Gagal mengganti password');
            }
        } catch (err) {
            console.error('Password change failed:', err);
            alert('Terjadi kesalahan koneksi');
        } finally {
            setIsChangingPassword(false);
        }
    };

    return (
        <AccountLayout>
            <header className="mb-12">
                <h3 className="text-2xl font-bold tracking-tight mb-2">Informasi Profil</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Kelola informasi pribadi Anda</p>
            </header>

            <div className="space-y-16">
                {/* Information Section */}
                <div className="space-y-12">
                    {/* Photo Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-xl">
                                <img 
                                    src={previewUrl || user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:bg-blue-600 transition-colors"
                            >
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
                                className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
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

                    <div className="pt-4">
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-gray-100 disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </div>

                {/* Security Section */}
                <div className="pt-16 border-t border-gray-100">
                    <header className="mb-12">
                        <div className="flex items-center gap-3 mb-2">
                            <ShieldCheck size={20} className="text-blue-600" />
                            <h3 className="text-2xl font-bold tracking-tight">Keamanan Akun</h3>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Perbarui kata sandi untuk melindungi akun Anda</p>
                    </header>

                    <form onSubmit={handleChangePassword} className="space-y-8">
                        <div className="grid sm:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Password Saat Ini</label>
                                <input 
                                    required
                                    type="password" 
                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Password Baru</label>
                                <input 
                                    required
                                    type="password" 
                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Konfirmasi Password Baru</label>
                                <input 
                                    required
                                    type="password" 
                                    className="w-full bg-gray-50 border border-gray-50 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-gray-900 transition-colors"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit"
                                disabled={isChangingPassword}
                                className="flex items-center gap-3 bg-gray-100 text-black px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all disabled:opacity-50"
                            >
                                {isChangingPassword ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />} 
                                {isChangingPassword ? 'Memproses...' : 'Ganti Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AccountLayout>
    );
};

export default Profile;


