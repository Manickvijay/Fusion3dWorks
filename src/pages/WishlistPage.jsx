import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/common/ProductCard';

export default function WishlistPage() {
  const { wishlist, products } = useShop();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-200/80 pb-6 space-y-2">
        <Link to="/" className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Saved Wishlist</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          You have {savedProducts.length} personalized 3D {savedProducts.length === 1 ? 'creation' : 'creations'} saved.
        </p>
      </div>

      {savedProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <Heart className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700">Your wishlist is currently empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the heart icon on any 3D keychain, cake topper, or signboard to save it for later!
          </p>
          <Link to="/" className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold mt-2">
            Explore 3D Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
