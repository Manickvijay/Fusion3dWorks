import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  Trash2,
  ShoppingCart,
  Star,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ComparePage() {
  const { compareItems, removeFromCompare, clearCompare, addToCart, products } = useShop();
  const [highlightDifferences, setHighlightDifferences] = useState(false);
  const [addSelectorOpen, setAddSelectorOpen] = useState(false);

  const comparedProducts = products.filter(p => compareItems.includes(p.id));

  // Specs keys to compare
  const specRows = [
    { label: 'Brand', key: 'brand' },
    { label: 'Category', key: 'categoryLabel' },
    { label: 'Price', render: p => `$${p.price.toFixed(2)}` },
    { label: 'Customer Rating', render: p => `${p.rating} ★ (${p.reviewCount} reviews)` },
    { label: 'Stock Status', render: p => p.inStock ? 'In Stock (Ready)' : 'Backorder' },
    { label: 'Technology', render: p => p.technology || p.specs?.technology || 'Standard Additive' },
    { label: 'Build Volume / Size', render: p => p.buildVolume || p.specs?.buildVolume || p.specs?.weight || 'N/A' },
    { label: 'Max Speed', render: p => p.printSpeed || p.specs?.maxSpeed || 'N/A' },
    { label: 'Hotend Max Temp', render: p => p.specs?.hotendTemp || p.specs?.printingTemp || 'N/A' },
    { label: 'Bed Temperature', render: p => p.specs?.bedTemp || 'N/A' },
    { label: 'Auto Leveling', render: p => p.specs?.leveling || 'N/A' },
    { label: 'Enclosure', render: p => p.specs?.enclosure || 'N/A' },
    { label: 'Warranty', render: p => '2-Year Direct Guarantee' }
  ];

  if (comparedProducts.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center border border-slate-200 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-4">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Compare 3D Printers & Materials
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 mb-6 leading-relaxed">
            You haven't added any products to compare yet. Tap the scale icon on any 3D printer, filament, or part to view detailed side-by-side engineering specifications.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
          >
            <span>Browse Products to Compare</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Product Comparison</span>
        </div>

        {/* Header Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Compare 3D Printers & Hardware ({comparedProducts.length}/4)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Side-by-side dimensional, thermal, and mechanical parameter comparison matrix.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                highlightDifferences
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Highlight Differences
            </button>

            <button
              onClick={clearCompare}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 transition-colors flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear List</span>
            </button>
          </div>
        </div>

        {/* Comparison Table / Matrix */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            {/* Header row with Product Cards */}
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="p-6 w-1/5 text-xs font-bold text-slate-400 uppercase tracking-wider align-top">
                  Product Details
                </th>
                {comparedProducts.map(p => (
                  <th key={p.id} className="p-6 w-1/4 align-top">
                    <div className="relative space-y-3">
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute -top-2 -right-2 p-1.5 text-slate-400 hover:text-rose-600 bg-white border border-slate-200 rounded-full shadow-xs transition-colors"
                        title="Remove from compare"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="w-full aspect-square rounded-2xl bg-slate-50 overflow-hidden border border-slate-200">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      </div>

                      <span className="text-[10px] font-bold text-indigo-600 uppercase block">{p.brand}</span>
                      <Link to={`/product/${p.id}`} className="text-xs font-bold text-slate-900 hover:text-indigo-600 line-clamp-2">
                        {p.title}
                      </Link>

                      <div className="text-lg font-black text-slate-900">
                        ${p.price.toFixed(2)}
                      </div>

                      <button
                        onClick={() => addToCart(p, 1)}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1 shadow-xs transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Spec rows */}
            <tbody className="divide-y divide-slate-100 text-xs">
              {specRows.map((row, idx) => {
                // Check if values differ across compared products
                const values = comparedProducts.map(p => row.render ? row.render(p) : p[row.key]);
                const isDiff = new Set(values).size > 1;

                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      highlightDifferences && isDiff ? 'bg-amber-50/70 font-semibold' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <td className="p-4 px-6 font-bold text-slate-700 bg-slate-50/30">
                      {row.label}
                    </td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-4 px-6 text-slate-800">
                        {row.render ? row.render(p) : p[row.key]}
                      </td>
                    ))}
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
