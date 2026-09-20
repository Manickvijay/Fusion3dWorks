import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/common/ProductCard';

export default function WishlistPage() {
  const { wishlist, products, addToCart, clearWishlist } = useShop();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach(p => addToCart(p, 1));
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full text-center border border-slate-200 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Your Wishlist is Empty</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 mb-6 leading-relaxed">
            Save your favorite 3D printers, carbon-fiber filaments, and replacement parts to review or order later.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
          >
            <span>Explore 3D Hardware</span>
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
          <span className="text-slate-900 font-semibold">My Saved Wishlist</span>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Saved Items ({wishlistedProducts.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Items saved to your maker account with real-time stock and price change tracking.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleAddAllToCart}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add All to Cart</span>
            </button>
            <button
              onClick={clearWishlist}
              className="px-4 py-2 bg-white hover:bg-rose-50 border border-slate-200 text-rose-600 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

      </div>
    </div>
  );
}
