import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  AlertTriangle,
  ExternalLink,
  Layers
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, addToast } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    title: '',
    brand: 'Fusion3D Apex',
    category: '3d-printers',
    categoryLabel: '3D Printers',
    price: '',
    originalPrice: '',
    stock: 25,
    sku: '',
    image: 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=800&auto=format&fit=crop&q=80',
    description: '',
    badge: 'New Release'
  });

  const filteredProducts = products.filter(p => {
    const matchQuery = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchQuery && matchCat;
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      brand: 'Fusion3D Apex',
      category: '3d-printers',
      categoryLabel: '3D Printers',
      price: '',
      originalPrice: '',
      stock: 20,
      sku: `F3D-${Math.floor(1000 + Math.random() * 9000)}`,
      image: 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=800&auto=format&fit=crop&q=80',
      description: '',
      badge: 'New Release'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setFormData({
      ...p,
      price: String(p.price),
      originalPrice: p.originalPrice ? String(p.originalPrice) : ''
    });
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();

    const catObj = CATEGORIES.find(c => c.id === formData.category);

    const productPayload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      stock: parseInt(formData.stock) || 0,
      categoryLabel: catObj ? catObj.name : '3D Equipment',
      inStock: parseInt(formData.stock) > 0,
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 0
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
      setEditingProduct(null);
    } else {
      addProduct(productPayload);
      setIsAddModalOpen(false);
    }
  };

  const handleDelete = (id, title) => {
    if (confirm(`Are you sure you want to remove "${title}" from the store catalog?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            Catalog Database
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Manage 3D Printing Products ({products.length})
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-md transition-colors w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[240px] flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search by title, SKU, or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white outline-hidden w-full"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-white rounded-xl px-3 py-2 outline-hidden font-medium"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider bg-slate-900/50">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-12 h-12 object-cover rounded-xl border border-slate-800 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-white block line-clamp-1">{p.title}</span>
                        <span className="text-[11px] text-indigo-400">{p.brand}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                      {p.categoryLabel}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-400">{p.sku || 'N/A'}</td>
                  <td className="p-4 font-bold text-white">${p.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      p.stock < 10 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
                      title="Edit product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      className="p-1.5 bg-slate-900 hover:bg-rose-950 text-slate-300 hover:text-rose-400 rounded-lg transition-colors"
                      title="Delete product"
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

      {/* Add or Edit Product Modal */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <div className="relative bg-slate-950 text-white border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingProduct ? 'Edit 3D Product Specs' : 'Add New 3D Product'}
              </h3>
              <button
                onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white font-medium"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Price (USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Original Price (For Discount)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Stock Units *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Product Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold"
                >
                  {editingProduct ? 'Save Modifications' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
