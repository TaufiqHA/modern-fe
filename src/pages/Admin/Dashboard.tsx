/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  ShoppingBag, 
  Plane, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const StatCard = ({ title, value, change, icon: Icon, isPositive, isLoading }: any) => (
  <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100 transition-all min-h-[160px] flex flex-col justify-center">
    {isLoading ? (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="animate-spin text-gray-200" size={24} />
      </div>
    ) : (
      <>
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900">
            <Icon size={20} className="md:w-6 md:h-6" />
          </div>
          <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {change}
          </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-2">{title}</p>
        <h3 className="text-2xl font-black tracking-tight">{value}</h3>
      </>
    )}
  </div>
);

const Dashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/admin/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setStats(data.data || data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, [token]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) return `Rp ${(amount / 1000000000).toFixed(1)}B`;
    if (amount >= 1000000) return `Rp ${(amount / 1000000).toFixed(1)}M`;
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const revenueData = stats?.revenue_analytics || [];
  const trendsData = stats?.order_trends || [];
  const recentOrders = stats?.recent_orders || [];

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Header Section */}
        <section>
          <h1 className="text-3xl font-black tracking-tighter mb-2">Dashboard.</h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ringkasan performa bisnis Anda hari ini</p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Pendapatan" 
            value={formatCurrency(stats?.total_sales || 0)} 
            change="+12.5%" 
            icon={TrendingUp} 
            isPositive={true} 
            isLoading={isLoading}
          />
          <StatCard 
            title="Total Pesanan" 
            value={(stats?.total_orders || 0).toLocaleString('id-ID')} 
            change="+18.2%" 
            icon={ShoppingBag} 
            isPositive={true} 
            isLoading={isLoading}
          />
          <StatCard 
            title="Request Jastip" 
            value={(stats?.pending_jastip || 0).toLocaleString('id-ID')} 
            change="-4.1%" 
            icon={Plane} 
            isPositive={false} 
            isLoading={isLoading}
          />
          <StatCard 
            title="Pelanggan Baru" 
            value={(stats?.new_customers || 0).toLocaleString('id-ID')} 
            change="+22.4%" 
            icon={Users} 
            isPositive={true} 
            isLoading={isLoading}
          />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest mb-8 md:mb-10">Revenue Analytics</h3>
            <div className="h-[250px] md:h-[300px] w-full flex items-center justify-center">
              {isLoading ? (
                <Loader2 className="animate-spin text-gray-100" size={48} />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 900 }} 
                      dy={10}
                    />
                    <YAxis 
                      hide 
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                      labelStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}
                      formatter={(value: any) => [new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value), 'Revenue']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#000000" 
                      strokeWidth={4} 
                      dot={{ r: 4, fill: '#000000', strokeWidth: 2, stroke: '#fff' }} 
                      activeDot={{ r: 6, fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest mb-8 md:mb-10">Order Trends</h3>
            <div className="h-[250px] md:h-[300px] w-full flex items-center justify-center">
              {isLoading ? (
                <Loader2 className="animate-spin text-gray-100" size={48} />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendsData} layout="vertical" margin={{ left: -20 }}>
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 900 }}
                    />
                    <Tooltip 
                      cursor={{ fill: '#f9fafb' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                      {trendsData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color || '#000000'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </section>

        {/* Recent Orders Section */}
        <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 md:p-10 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest">Recent Orders</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto min-h-[200px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-gray-100" size={32} />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Memuat Pesanan...</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Type</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-10 py-6 text-xs font-black uppercase tracking-tight text-gray-900">{order.id}</td>
                      <td className="px-10 py-6 text-xs font-bold text-gray-700">{order.user?.name || order.customer}</td>
                      <td className="px-10 py-6">
                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 rounded-full">{order.type || 'Ready Stock'}</span>
                      </td>
                      <td className="px-10 py-6 text-xs font-black">Rp {(order.total || order.amount || 0).toLocaleString('id-ID')}</td>
                      <td className="px-10 py-6">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                          order.status === 'delivered' || order.status === 'Success' ? 'bg-green-50 text-green-600' : 
                          order.status === 'pending' || order.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-10 py-20 text-center text-[10px] font-black uppercase tracking-widest text-gray-300">Belum ada pesanan terbaru</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

