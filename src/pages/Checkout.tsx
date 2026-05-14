/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CreditCard, Truck, MapPin, CheckCircle2, ArrowRight, Loader2, Plus, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Address } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface ShippingRate {
    id: string;
    courier: string;
    service: string;
    cost: number;
    etd: string;
}

const Checkout = () => {
    const [step, setStep] = useState(1);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
    
    const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
    const [isLoadingShipping, setIsLoadingShipping] = useState(false);
    const [selectedShipping, setSelectedShipping] = useState<ShippingRate | null>(null);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { cart, cartTotal, clearCart } = useCart();
    const { token, isAuthenticated } = useAuth();
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?redirect=/checkout');
            return;
        }

        const fetchAddresses = async () => {
            if (!token) return;
            try {
                const response = await fetch(`${API_URL}/user/addresses`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                const addrList = data.addresses || data.data?.addresses || data.data || [];
                setAddresses(addrList);
                
                // Select default address
                const defaultAddr = addrList.find((a: Address) => a.is_default);
                if (defaultAddr) {
                    setSelectedAddressId(defaultAddr.id);
                } else if (addrList.length > 0) {
                    setSelectedAddressId(addrList[0].id);
                }
            } catch (error) {
                console.error('Failed to fetch addresses:', error);
            } finally {
                setIsLoadingAddresses(false);
            }
        };

        fetchAddresses();
    }, [token, isAuthenticated, navigate]);

    // Fetch shipping rates when moving to Step 2
    useEffect(() => {
        const fetchShippingRates = async () => {
            if (step === 2 && selectedAddressId && token) {
                setIsLoadingShipping(true);
                setError(null);
                try {
                    // In a real app, this would call an API like RajaOngkir
                    // For now, we simulate with a slight delay
                    const response = await fetch(`${API_URL}/shipping/rates`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` 
                        },
                        body: JSON.stringify({
                            address_id: selectedAddressId,
                            weight: cart.reduce((total, item) => total + (item.quantity * 1000), 0) // default 1kg per item
                        })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setShippingRates(data.rates || data.data || []);
                    } else {
                        // Fallback/Mock data if API not implemented
                        setShippingRates([
                            { id: 'jne-reg', courier: 'JNE', service: 'Reguler', cost: 15000, etd: '2-4 Hari' },
                            { id: 'sicepat-reg', courier: 'SiCepat', service: 'Reguler', cost: 14000, etd: '2-3 Hari' },
                            { id: 'tiki-reg', courier: 'TIKI', service: 'Reguler', cost: 15000, etd: '2-4 Hari' }
                        ]);
                    }
                } catch (error) {
                    console.error('Failed to fetch shipping rates:', error);
                    // Mock data fallback on error
                    setShippingRates([
                        { id: 'jne-reg', courier: 'JNE', service: 'Reguler', cost: 15000, etd: '2-4 Hari' },
                        { id: 'sicepat-reg', courier: 'SiCepat', service: 'Reguler', cost: 14000, etd: '2-3 Hari' }
                    ]);
                } finally {
                    setIsLoadingShipping(false);
                }
            }
        };

        fetchShippingRates();
    }, [step, selectedAddressId, token, cart]);

    const handleCreateOrder = async () => {
        if (!selectedAddressId || !selectedShipping || !token) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    address_id: selectedAddressId,
                    shipping_id: selectedShipping.id,
                    shipping_cost: selectedShipping.cost,
                    items: cart.map(item => ({
                        product_id: item.id,
                        quantity: item.quantity
                    })),
                    payment_method: 'midtrans_va'
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Gagal membuat pesanan');
            }

            clearCart();

            if (result.data?.payment_url || result.payment_url) {
                window.location.href = result.data?.payment_url || result.payment_url;
            } else {
                navigate('/order-confirmation', { state: { orderId: result.data?.id || result.id } });
            }
        } catch (err: any) {
            setError(err.message || 'Terjadi kesalahan saat memproses pesanan');
        } finally {
            setIsSubmitting(false);
        }
    };

    const steps = [
        { id: 1, name: 'Alamat', icon: MapPin },
        { id: 2, name: 'Pengiriman', icon: Truck },
        { id: 3, name: 'Pembayaran', icon: CreditCard },
    ];

    const shippingCost = selectedShipping?.cost || 0;
    const finalTotal = cartTotal + shippingCost;

    return (
        <main className="pt-32 pb-40 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-4xl font-bold tracking-tight mb-12 text-center">Checkout.</h2>
                    
                    {/* Stepper */}
                    <div className="flex items-center justify-center gap-4 md:gap-12 relative">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -z-10 -translate-y-1/2 hidden md:block"></div>
                        {steps.map((s, idx) => (
                            <div key={s.id} className="flex flex-col items-center gap-3 bg-white px-4">
                                <motion.div 
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                        step >= s.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
                                    }`}
                                    animate={{ 
                                        scale: step === s.id ? 1.1 : 1,
                                    }}
                                >
                                    {step > s.id ? <CheckCircle2 size={20} /> : <s.icon size={18} />}
                                </motion.div>
                                <span className={`text-[8px] font-black uppercase tracking-[0.2em] transition-colors ${
                                    step >= s.id ? 'text-gray-900' : 'text-gray-300'
                                }`}>
                                    {s.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-16">
                    {/* Form Area */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <h3 className="text-xl font-bold mb-6">Pilih Alamat Pengiriman</h3>
                                    
                                    {isLoadingAddresses ? (
                                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                                            <Loader2 className="animate-spin text-gray-200" size={32} />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Memuat Alamat...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {addresses.length > 0 ? (
                                                addresses.map((addr) => (
                                                    <div 
                                                        key={addr.id}
                                                        onClick={() => setSelectedAddressId(addr.id)}
                                                        className={`p-6 border-2 rounded-2xl transition-all cursor-pointer flex items-start justify-between ${
                                                            selectedAddressId === addr.id ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200 bg-white'
                                                        }`}
                                                    >
                                                        <div>
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <p className="font-black text-xs uppercase tracking-widest">{addr.label}</p>
                                                                {addr.is_default && (
                                                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-widest rounded-full">Utama</span>
                                                                )}
                                                            </div>
                                                            <p className="text-sm font-medium text-gray-500 leading-relaxed">
                                                                {addr.recipient} ({addr.phone}) <br />
                                                                {addr.detail}
                                                            </p>
                                                        </div>
                                                        {selectedAddressId === addr.id && (
                                                            <div className="bg-black text-white p-1 rounded-full">
                                                                <CheckCircle2 size={14} />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Belum ada alamat tersimpan</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <Link to="/account/addresses" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:underline">
                                        <Plus size={14} /> Kelola Alamat
                                    </Link>
                                    
                                    <div className="pt-8 border-t border-gray-50">
                                        <button 
                                            disabled={!selectedAddressId}
                                            onClick={() => setStep(2)}
                                            className="w-full py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            Lanjut ke Pengiriman <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <h3 className="text-xl font-bold mb-6">Pilih Metode Pengiriman</h3>
                                    
                                    {isLoadingShipping ? (
                                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                                            <Loader2 className="animate-spin text-blue-600" size={32} />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Menghitung Ongkos Kirim...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {shippingRates.map((rate) => (
                                                <div 
                                                    key={rate.id}
                                                    onClick={() => setSelectedShipping(rate)}
                                                    className={`p-6 border-2 rounded-2xl transition-all cursor-pointer flex items-center justify-between ${
                                                        selectedShipping?.id === rate.id ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200 bg-white'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                                                            selectedShipping?.id === rate.id ? 'bg-white border-gray-100' : 'bg-gray-50 border-gray-50'
                                                        }`}>
                                                            <Truck size={24} className={selectedShipping?.id === rate.id ? 'text-blue-600' : 'text-gray-300'} />
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-xs uppercase tracking-widest mb-1">{rate.courier} ({rate.service})</p>
                                                            <p className="text-[10px] text-gray-400 font-medium">Estimasi {rate.etd}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-black text-sm">Rp {rate.cost.toLocaleString('id-ID')}</p>
                                                </div>
                                            ))}
                                            {shippingRates.length === 0 && (
                                                <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Gagal memuat layanan pengiriman</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    
                                    <div className="pt-8 border-t border-gray-50 flex gap-4">
                                        <button 
                                            onClick={() => setStep(1)}
                                            className="grow py-5 border border-gray-100 text-gray-900 text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:border-gray-900 transition-all"
                                        >
                                            Kembali
                                        </button>
                                        <button 
                                            disabled={!selectedShipping}
                                            onClick={() => setStep(3)}
                                            className="grow-[2] py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            Metode Pembayaran <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <h3 className="text-xl font-bold mb-6">Metode Pembayaran</h3>
                                    
                                    {error && (
                                        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold">
                                            <AlertCircle size={18} />
                                            {error}
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div className="p-6 border-2 border-black rounded-2xl bg-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center">
                                                    <CreditCard size={24} className="text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-xs uppercase tracking-widest mb-1">Otomatis (Midtrans)</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">VA, Kartu Kredit, QRIS, E-Wallet</p>
                                                </div>
                                            </div>
                                            <div className="bg-black text-white p-1 rounded-full">
                                                <CheckCircle2 size={14} />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-8 border-t border-gray-50 flex gap-4">
                                        <button 
                                            disabled={isSubmitting}
                                            onClick={() => setStep(2)}
                                            className="grow py-5 border border-gray-100 text-gray-900 text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:border-gray-900 transition-all disabled:opacity-50"
                                        >
                                            Kembali
                                        </button>
                                        <button 
                                            disabled={isSubmitting}
                                            className="grow-[2] py-5 bg-blue-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-200 disabled:bg-gray-400"
                                            onClick={handleCreateOrder}
                                        >
                                            {isSubmitting ? (
                                                <>Memproses... <Loader2 size={18} className="animate-spin" /></>
                                            ) : (
                                                <>Buat Pesanan & Bayar</>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Summary Area */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-50 rounded-3xl p-8 sticky top-28 border border-gray-50">
                            <h3 className="text-lg font-bold mb-8">Ringkasan Order</h3>
                            <div className="space-y-6 mb-10 pb-10 border-b border-gray-100">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover grayscale opacity-80" alt={item.name} referrerPolicy="no-referrer" />
                                        </div>
                                        <div className="flex flex-col justify-between py-1">
                                            <p className="text-xs font-black uppercase tracking-tight line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-gray-400 font-black">{item.quantity} × Rp {item.price.toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>
                                ))}
                                {cart.length === 0 && (
                                    <p className="text-xs text-gray-400 italic">Keranjang kosong</p>
                                )}
                            </div>

                            <div className="space-y-4 mb-10">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400 font-black uppercase tracking-widest">Subtotal</span>
                                    <span className="font-black">Rp {cartTotal.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400 font-black uppercase tracking-widest">Pajak (11%)</span>
                                    <span className="font-black text-gray-400">Rp 0 (Termasuk)</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400 font-black uppercase tracking-widest">Ongkos Kirim</span>
                                    <span className="font-black">{step >= 2 ? (isLoadingShipping ? '...' : `Rp ${shippingCost.toLocaleString('id-ID')}`) : '—'}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Total Akhir</span>
                                <span className="text-2xl font-black">Rp {finalTotal.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Checkout;

