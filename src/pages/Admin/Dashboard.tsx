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
  Cell,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  ShoppingBag, 
  Plane, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { motion } from 'motion/react';

const REVENUE_DATA = [
  { name: 'Jan', value: 45000000 },
  { name: 'Feb', value: 52000000 },
  { name: 'Mar', value: 48000000 },
  { name: 'Apr', value: 61000000 },
  { name: 'May', value: 55000000 },
  { name: 'Jun', value: 67000000 },
];

const TRENDS_DATA = [
  { name: 'Ready Stock', value: 450, color: '#000000' },
  { name: 'Pre-Order', value: 300, color: '#3b82f6' },
  { name: 'Jastip', value: 250, color: '#10b981' },
];

const RECENT_ORDERS = [
  { id: 'ORD-9921', customer: 'Budi Santoso', type: 'Ready Stock', amount: 399000, status: 'Success' },
  { id: 'ORD-9920', customer: 'Siti Aminah', type: 'Jastip', amount: 1250000, status: 'Pending' },
  { id: 'ORD-9919', customer: 'Andi Wijaya', type: 'Pre-Order', amount: 899000, status: 'Processing' },
  { id: 'ORD-9918', customer: 'Rina Kartika', type: 'Ready Stock', amount: 155000, status: 'Success' },
];

const StatCard = ({ title, value, change, icon: Icon, isPositive }: any) => (
  <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100 transition-all">
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
  </div>
);

const Dashboard = () => {
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
            value="Rp 328.4M" 
            change="+12.5%" 
            icon={TrendingUp} 
            isPositive={true} 
          />
          <StatCard 
            title="Total Pesanan" 
            value="1,284" 
            change="+18.2%" 
            icon={ShoppingBag} 
            isPositive={true} 
          />
          <StatCard 
            title="Request Jastip" 
            value="84" 
            change="-4.1%" 
            icon={Plane} 
            isPositive={false} 
          />
          <StatCard 
            title="Pelanggan Baru" 
            value="342" 
            change="+22.4%" 
            icon={Users} 
            isPositive={true} 
          />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest mb-8 md:mb-10">Revenue Analytics</h3>
            <div className="h-[250px] md:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={REVENUE_DATA}>
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
            </div>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest mb-8 md:mb-10">Order Trends</h3>
            <div className="h-[250px] md:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TRENDS_DATA} layout="vertical" margin={{ left: -20 }}>
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
                    {TRENDS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Recent Orders Section */}
        <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 md:p-10 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest">Recent Orders</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
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
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-10 py-6 text-xs font-black uppercase tracking-tight text-gray-900">{order.id}</td>
                    <td className="px-10 py-6 text-xs font-bold text-gray-700">{order.customer}</td>
                    <td className="px-10 py-6">
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 rounded-full">{order.type}</span>
                    </td>
                    <td className="px-10 py-6 text-xs font-black">Rp {order.amount.toLocaleString('id-ID')}</td>
                    <td className="px-10 py-6">
                      <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                        order.status === 'Success' ? 'bg-green-50 text-green-600' : 
                        order.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
