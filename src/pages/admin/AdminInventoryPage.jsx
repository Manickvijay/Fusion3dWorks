import React, { useState } from 'react';
import {
  Boxes,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Minus,
  RotateCcw,
  Search,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function AdminInventoryPage() {
  const { products, updateProduct, addToast } = useShop();
  const [filter, setFilter] = useState('all'); // 'all' | 'low' | 'critical' | 'instock'
  const [search, setSearch] = useState('');

  const handleStockChange = (productId, newStock) => {
    const validStock = Math.max(0, newStock);
    updateProduct(productId, {
      stock: validStock,
      inStock: validStock > 0
    });
  };

  const handleBulkRestock = (amount = 25) => {
    products.forEach(p => {
      if (p.stock < 10) {
        updateProduct(p.id, { stock: p.stock + amount, inStock: true });
      }
    });
    addToast(`Restocked all low-inventory items by +${amount} units!`, 'success');
  };

  const filteredProducts = products.filter(p => {
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase());

    if (filter === 'low') return matchSearch && p.stock < 15 && p.stock > 0;
    if (filter === 'critical') return matchSearch && p.stock < 5;
    if (filter === 'instock') return matchSearch && p.stock >= 15;
    return matchSearch;
  });

  const lowStockCount = products.filter(p => p.stock < 15).length;
  const criticalStockCount = products.filter(p => p.stock < 5).length;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            Warehouse & Spool Storage
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Inventory Levels & Automated Restocking
          </h1>
        </div>

        <button
          onClick={() => handleBulkRestock(30)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-md transition-colors w-fit"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Quick Restock Low SKUs (+30)</span>
        </button>
      </div>

      {/* Stock Health Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 block">Total Active SKUs</span>
            <span className="text-2xl font-black text-white">{products.length}</span>
          </div>
          <Boxes className="w-8 h-8 text-indigo-400 opacity-60" />
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-400 block">Low Inventory (&lt;15 Units)</span>
            <span className="text-2xl font-black text-amber-400">{lowStockCount}</span>
          </div>
          <AlertTriangle className="w-8 h-8 text-amber-400 opacity-60" />
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-rose-400 block">Critical Threshold (&lt;5 Units)</span>
            <span className="text-2xl font-black text-rose-400">{criticalStockCount}</span>
          </div>
          <AlertTriangle className="w-8 h-8 text-rose-400 opacity-60" />
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[240px] flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Filter by title, brand, or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white outline-hidden w-full"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {[
            { id: 'all', label: 'All SKUs' },
            { id: 'low', label: 'Low Stock (<15)' },
            { id: 'critical', label: 'Critical (<5)' },
            { id: 'instock', label: 'Healthy (15+)' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                filter === btn.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider bg-slate-900/50">
                <th className="p-4">SKU / Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Unit Price</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Instant Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map((p) => {
                let statusBadge = (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Normal
                  </span>
                );

                if (p.stock === 0) {
                  statusBadge = (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                      Out of Stock
                    </span>
                  );
                } else if (p.stock < 5) {
                  statusBadge = (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                      Critical (&lt;5)
                    </span>
                  );
                } else if (p.stock < 15) {
                  statusBadge = (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                      Low Stock
                    </span>
                  );
                }

                return (
                  <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-10 h-10 object-cover rounded-xl border border-slate-800 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-white block line-clamp-1">{p.title}</span>
                          <span className="font-mono text-[11px] text-slate-500">SKU: {p.sku || 'F3D-SKU'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-400">{p.categoryLabel}</td>
                    <td className="p-4 font-mono font-bold text-white">${p.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span className="font-black text-sm font-mono text-white">{p.stock}</span>
                      <span className="text-slate-500 text-[11px] ml-1">units</span>
                    </td>
                    <td className="p-4">{statusBadge}</td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center space-x-1.5 bg-slate-900 border border-slate-800 rounded-xl p-1">
                        <button
                          onClick={() => handleStockChange(p.id, p.stock - 1)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold"
                          title="Decrease 1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center font-mono font-bold text-xs text-white">
                          {p.stock}
                        </span>
                        <button
                          onClick={() => handleStockChange(p.id, p.stock + 1)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold"
                          title="Increase 1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleStockChange(p.id, p.stock + 10)}
                          className="px-2 h-7 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-[11px] font-bold transition-colors"
                          title="Add 10 units"
                        >
                          +10
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
