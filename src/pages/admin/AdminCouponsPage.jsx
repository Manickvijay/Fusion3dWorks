import React, { useState } from 'react';
import { Tag, Plus, Trash2, X, CheckCircle2, Percent, Calendar } from 'lucide-react';
import { COUPONS } from '../../data/coupons';
import { useShop } from '../../context/ShopContext';

export default function AdminCouponsPage() {
  const { addToast } = useShop();
  const [couponsList, setCouponsList] = useState(COUPONS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'percentage',
    value: 15,
    minSubtotal: 100,
    description: '',
    expiresAt: '2025-12-31'
  });

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;

    const created = {
      ...newCoupon,
      code: newCoupon.code.trim().toUpperCase(),
      value: parseFloat(newCoupon.value) || 0,
      minSubtotal: parseFloat(newCoupon.minSubtotal) || 0
    };

    setCouponsList(prev => [created, ...prev]);
    setIsAddModalOpen(false);
    addToast(`Coupon voucher "${created.code}" published!`, 'success');
  };

  const handleDeleteCoupon = (code) => {
    setCouponsList(prev => prev.filter(c => c.code !== code));
    addToast(`Coupon "${code}" deleted`, 'info');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            Promotional Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Discount Vouchers & Campaign Codes
          </h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-md transition-colors w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider bg-slate-900/50">
                <th className="p-4">Coupon Code</th>
                <th className="p-4">Discount Type & Rate</th>
                <th className="p-4">Min. Spend Threshold</th>
                <th className="p-4">Expires On</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {couponsList.map((c) => (
                <tr key={c.code} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">
                    <span className="font-mono font-black text-sm text-indigo-400 px-2.5 py-1 bg-indigo-950/80 border border-indigo-800 rounded-lg inline-block">
                      {c.code}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-white">
                    {c.type === 'percentage' ? `${c.value}% OFF` : `$${c.value} OFF`}
                  </td>
                  <td className="p-4 text-slate-300 font-mono">${c.minSubtotal}</td>
                  <td className="p-4 text-slate-400">{c.expiresAt}</td>
                  <td className="p-4 text-slate-400 max-w-xs truncate">{c.description}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteCoupon(c.code)}
                      className="p-1.5 bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
                      title="Delete Coupon"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <div className="relative bg-slate-950 text-white border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Publish New Voucher Code</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Coupon Code (Uppercase) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., SUMMERPRINT20"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Discount Type</label>
                  <select
                    value={newCoupon.type}
                    onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white font-medium"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Value *</label>
                  <input
                    type="number"
                    required
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Min Spend ($) *</label>
                  <input
                    type="number"
                    required
                    value={newCoupon.minSubtotal}
                    onChange={(e) => setNewCoupon({ ...newCoupon, minSubtotal: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Expiration Date</label>
                  <input
                    type="date"
                    value={newCoupon.expiresAt}
                    onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description / Promo Hook</label>
                <textarea
                  rows="2"
                  placeholder="e.g., Save 15% on orders over $100..."
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold"
                >
                  Publish Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
