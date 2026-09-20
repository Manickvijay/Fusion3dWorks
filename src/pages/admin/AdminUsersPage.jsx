import React, { useState } from 'react';
import { Users, Search, ShieldCheck, Mail, Phone, Calendar, UserCheck } from 'lucide-react';
import { MOCK_USERS } from '../../data/mockAdminData';
import { useShop } from '../../context/ShopContext';

export default function AdminUsersPage() {
  const { addToast } = useShop();
  const [usersList, setUsersList] = useState(MOCK_USERS);
  const [search, setSearch] = useState('');

  const filteredUsers = usersList.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.company?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleUserStatus = (id) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        addToast(`Customer status changed to ${nextStatus}`, 'info');
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            Customer Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Registered Makers & Enterprise Accounts ({usersList.length})
          </h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs max-w-md">
        <Search className="w-4 h-4 text-slate-400 mr-2" />
        <input
          type="text"
          placeholder="Search by customer name, email, or institution..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-white outline-hidden w-full"
        />
      </div>

      {/* Users Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider bg-slate-900/50">
                <th className="p-4">Customer</th>
                <th className="p-4">Organization / Lab</th>
                <th className="p-4">Account Tier</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-white block">{u.name}</span>
                        <span className="text-slate-500 text-[11px]">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{u.company || 'Individual Maker'}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {u.tier}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-white">{u.ordersCount}</td>
                  <td className="p-4 font-mono font-bold text-white">${u.totalSpent.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      u.status === 'Active'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className="text-xs font-bold text-slate-400 hover:text-white px-2 py-1 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      {u.status === 'Active' ? 'Suspend' : 'Reactivate'}
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
