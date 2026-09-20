import React, { useState } from 'react';
import { Star, CheckCircle2, XCircle, Trash2, ShieldCheck, Filter } from 'lucide-react';
import { MOCK_REVIEWS } from '../../data/mockAdminData';
import { useShop } from '../../context/ShopContext';

export default function AdminReviewsPage() {
  const { addToast } = useShop();
  const [reviewsList, setReviewsList] = useState(MOCK_REVIEWS);
  const [filter, setFilter] = useState('all');

  const handleStatusChange = (id, newStatus) => {
    setReviewsList(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    addToast(`Review marked as ${newStatus}`, 'info');
  };

  const handleDelete = (id) => {
    setReviewsList(prev => prev.filter(r => r.id !== id));
    addToast('Review deleted from store', 'info');
  };

  const filtered = reviewsList.filter(r => {
    if (filter === 'approved') return r.status === 'Approved';
    if (filter === 'pending') return r.status === 'Pending';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            Quality & Feedback
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Customer Review Moderation ({reviewsList.length})
          </h1>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {['all', 'pending', 'approved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-colors ${
                filter === f ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider bg-slate-900/50">
                <th className="p-4">Customer</th>
                <th className="p-4">Product</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Review Content</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-white block">{r.userName}</span>
                    {r.verified && (
                      <span className="text-[10px] text-emerald-400 flex items-center mt-0.5">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Buyer
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-300 font-medium max-w-[180px] truncate">{r.productTitle}</td>
                  <td className="p-4">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-amber-400' : 'text-slate-700'}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 max-w-sm">
                    <p className="font-bold text-white">{r.headline}</p>
                    <p className="text-slate-400 text-[11px] line-clamp-2 mt-0.5">{r.comment}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      r.status === 'Approved'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {r.status !== 'Approved' && (
                      <button
                        onClick={() => handleStatusChange(r.id, 'Approved')}
                        className="p-1.5 bg-slate-900 hover:bg-emerald-950 text-emerald-400 rounded-lg transition-colors"
                        title="Approve Review"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="p-1.5 bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
                      title="Delete Review"
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

    </div>
  );
}
