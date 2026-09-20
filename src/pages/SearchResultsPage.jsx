import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/common/ProductCard';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products } = useShop();

  const cleanQuery = query.toLowerCase().trim();

  // Search algorithm
  const results = products.filter(p => {
    if (!cleanQuery) return true;
    return (
      p.title.toLowerCase().includes(cleanQuery) ||
      p.description.toLowerCase().includes(cleanQuery) ||
      p.brand.toLowerCase().includes(cleanQuery) ||
      p.categoryLabel.toLowerCase().includes(cleanQuery) ||
      p.sku.toLowerCase().includes(cleanQuery) ||
      p.highlights?.some(h => h.toLowerCase().includes(cleanQuery))
    );
  });

  const suggestions = ['CoreXY', 'PETG-CF', '0.4mm Hardened Nozzle', '8K Resin', 'PEI Sheet', 'Pla Plus'];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-indigo-600">Catalog</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Search Results</span>
        </div>

        {/* Results Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                Search Catalog
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {query ? (
                  <span>Results for <span className="text-indigo-600">"{query}"</span></span>
                ) : (
                  <span>All Catalog Items</span>
                )}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Found {results.length} products matching your criteria.
              </p>
            </div>

            {/* Suggested Search chips */}
            <div className="flex flex-wrap items-center gap-1.5 max-w-md">
              <span className="text-xs text-slate-400 font-semibold mr-1">Popular:</span>
              {suggestions.map(s => (
                <Link
                  key={s}
                  to={`/search?q=${encodeURIComponent(s)}`}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors font-medium"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {results.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              No products found matching "{query}"
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto">
              Check your spelling or try searching for generic 3D printing terms like "filament", "nozzle", "resin", or "CoreXY".
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
            >
              <span>Browse Full 3D Catalog</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
