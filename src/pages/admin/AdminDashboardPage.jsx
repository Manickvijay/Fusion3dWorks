import React from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingBag,
  Package,
  TrendingUp,
  AlertTriangle,
  Users,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  Truck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useShop } from '../../context/ShopContext';
import { MOCK_ANALYTICS } from '../../data/mockAdminData';

export default function AdminDashboardPage() {
  const { orders, products, updateOrderStatus } = useShop();

  const lowStockCount = products.filter(p => p.stock < 15).length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 124500;

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            Real-Time Operations Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Store Performance & Orders Control
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/products"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>

          <Link
            to="/admin/coupons"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl transition-colors"
          >
            <span>Create Promo Code</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Gross Revenue */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white block">
            ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <div className="flex items-center text-emerald-400 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        {/* Orders Placed */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Orders</span>
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white block">
            {orders.length + 38}
          </span>
          <div className="flex items-center text-orange-400 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span>6 units pending packing</span>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inventory Alerts</span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white block">
            {lowStockCount} SKUs
          </span>
          <Link to="/admin/inventory" className="text-xs text-rose-400 hover:underline font-semibold block">
            Review stock levels &rarr;
          </Link>
        </div>

        {/* Avg Order Value */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Order Value</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white block">
            $328.40
          </span>
          <span className="text-xs text-slate-400 block">
            Calculated across 428 orders
          </span>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Monthly Revenue Trend Area Chart */}
        <div className="lg:col-span-8 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Revenue & Slicing Growth</h3>
              <p className="text-xs text-slate-400">Total hardware sales & rapid prototyping fulfillment in USD</p>
            </div>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              FY 2024–2025
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ANALYTICS.monthlyRevenue}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" textAnchor="end" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="lg:col-span-4 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">Sales by Additive Category</h3>
            <p className="text-xs text-slate-400">Volume share of active orders</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ANALYTICS.categorySales} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fontSize: 11 }} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, 'Share']}
                />
                <Bar dataKey="value" fill="#f97316" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Orders Table with quick status toggle */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Customer Shipments</h3>
            <p className="text-xs text-slate-400">Manage orders, update dispatch state, and inspect tracking</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center"
          >
            <span>View all orders</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider bg-slate-900/50">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status & Dispatch Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {orders.slice(0, 5).map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-white">{ord.id}</td>
                  <td className="p-4">
                    <span className="font-bold text-white block">{ord.shippingAddress?.name || 'Customer'}</span>
                    <span className="text-slate-400 text-[11px]">{ord.shippingAddress?.city}, {ord.shippingAddress?.state}</span>
                  </td>
                  <td className="p-4">{ord.items?.length || 1} items</td>
                  <td className="p-4 text-slate-400">{ord.date}</td>
                  <td className="p-4 font-bold text-white">${ord.total.toFixed(2)}</td>
                  <td className="p-4">
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold border outline-hidden cursor-pointer ${
                        ord.status === 'Delivered'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : ord.status === 'Shipped' || ord.status === 'In Transit'
                          ? 'bg-amber-950 text-amber-300 border-amber-800'
                          : 'bg-indigo-950 text-indigo-300 border-indigo-800'
                      }`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
