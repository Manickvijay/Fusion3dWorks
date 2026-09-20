import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  ExternalLink,
  Eye,
  X,
  MapPin,
  CreditCard
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, addToast } = useShop();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(o => {
    const matchSearch = !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.trackingNumber?.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress?.name?.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === 'all' || o.status.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            Fulfillment Queue
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Customer Orders & Dispatch ({orders.length})
          </h1>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[240px] flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search by Order ID, tracking code, customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white outline-hidden w-full"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {['all', 'Processing', 'In Transit', 'Delivered'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {st === 'all' ? 'All Orders' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider bg-slate-900/50">
                <th className="p-4">Order Ref</th>
                <th className="p-4">Customer & Destination</th>
                <th className="p-4">Items Count</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total Paid</th>
                <th className="p-4">Fulfillment Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">
                    <span className="font-mono font-bold text-white block">{ord.id}</span>
                    <span className="font-mono text-[11px] text-slate-500">{ord.trackingNumber}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-white block">{ord.shippingAddress?.name}</span>
                    <span className="text-slate-400 text-[11px]">{ord.shippingAddress?.city}, {ord.shippingAddress?.state}</span>
                  </td>
                  <td className="p-4">{ord.items?.length || 1} line items</td>
                  <td className="p-4 text-slate-400">{ord.date}</td>
                  <td className="p-4 font-bold font-mono text-white">${ord.total.toFixed(2)}</td>
                  <td className="p-4">
                    <select
                      value={ord.status}
                      onChange={(e) => {
                        updateOrderStatus(ord.id, e.target.value);
                        addToast(`Order ${ord.id} status updated to ${e.target.value}`, 'success');
                      }}
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
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors inline-flex items-center"
                      title="Inspect Order Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <Link
                      to={`/invoice/${ord.id}`}
                      target="_blank"
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors inline-flex items-center"
                      title="Commercial Invoice"
                    >
                      <Printer className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedOrder(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <div className="relative bg-slate-950 text-white border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">Order {selectedOrder.id}</h3>
                <span className="text-xs text-slate-400">Placed on {selectedOrder.date}</span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Recipient & Tracking */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1">Destination</span>
                <p className="font-bold text-white">{selectedOrder.shippingAddress?.name}</p>
                {selectedOrder.shippingAddress?.company && <p className="text-slate-400">{selectedOrder.shippingAddress?.company}</p>}
                <p className="text-slate-400">{selectedOrder.shippingAddress?.street}</p>
                <p className="text-slate-400">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zip}</p>
              </div>

              <div>
                <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1">Dispatch Logistics</span>
                <p className="text-slate-300">Tracking: <strong className="text-indigo-400 font-mono">{selectedOrder.trackingNumber}</strong></p>
                <p className="text-slate-300">Method: {selectedOrder.shippingMethod?.toUpperCase()}</p>
                <p className="text-slate-300">Payment: {selectedOrder.paymentMethod?.toUpperCase()}</p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              <span className="font-bold uppercase tracking-wider text-xs text-slate-500">Ordered Items</span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 bg-slate-900 rounded-xl border border-slate-800/80">
                    <div className="flex items-center space-x-3">
                      <img src={it.image} alt={it.title} className="w-10 h-10 object-cover rounded-lg border border-slate-800" />
                      <div>
                        <span className="font-bold text-white block">{it.title}</span>
                        <span className="text-slate-400 text-[11px]">Qty: {it.quantity} × ${it.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <span className="font-bold font-mono text-white">${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-400">Total Charged:</span>
              <span className="font-black text-xl font-mono text-indigo-400">${selectedOrder.total.toFixed(2)}</span>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <Link
                to={`/invoice/${selectedOrder.id}`}
                target="_blank"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
