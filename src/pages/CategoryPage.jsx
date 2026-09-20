import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Box } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/common/ProductCard';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const { products } = useShop();

  let displayedProducts = [...products];
  let pageTitle = 'All 3D Creations';
  let pageSubtitle = 'Precision extruded custom creations';

  if (categoryId) {
    displayedProducts = products.filter(p => p.category === categoryId);
    if (categoryId === '3d-keychain') {
      pageTitle = 'Custom 3D Keychains';
      pageSubtitle = 'Personalized dual-color typography and scannable code keychains';
    } else if (categoryId === 'cake-toppers') {
      pageTitle = 'Custom Cake Toppers';
      pageSubtitle = 'Food-safe organic bio-PLA script toppers for weddings & birthdays';
    } else if (categoryId === 'name-boards') {
      pageTitle = 'Illuminated 3D Name Boards';
      pageSubtitle = 'Freestanding desk nameplates with backlighting channels';
    } else if (categoryId === '3d-gift') {
      pageTitle = '3D Gifts & Sculptures';
      pageSubtitle = 'Bespoke lithophane photo lamps, geometric sculptures, and desk art';
    }
  } else if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayedProducts = products.filter(
      p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
    pageTitle = `Search Results for "${searchQuery}"`;
    pageSubtitle = `Found ${displayedProducts.length} matching 3D products`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="border-b border-slate-200/80 pb-6 space-y-2">
        <Link to="/" className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Collections</span>
        </Link>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{pageTitle}</h1>
        <p className="text-xs sm:text-sm text-slate-500">{pageSubtitle}</p>
      </div>

      {displayedProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <Box className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700">No matching creations found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for "keychain", "cake", "name board", or browse all items.
          </p>
          <Link to="/" className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold mt-2">
            View All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
