import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Star,
  Check,
  RotateCcw,
  Search,
  ChevronDown
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/common/ProductCard';

export default function ShopPage() {
  const { products, categories } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [layout, setLayout] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const list = products.map(p => p.brand).filter(Boolean);
    return Array.from(new Set(list));
  }, [products]);

  // Toggle brand filter
  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setPriceRange(2000);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Brands
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Price
      if (product.price > priceRange) {
        return false;
      }
      // Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }
      // In stock
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      return 0; // featured default
    });
  }, [products, selectedCategory, selectedBrands, priceRange, minRating, inStockOnly, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">3D Printing Catalog</span>
        </div>

        {/* Page Title & Subtitle */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            All 3D Printing Products & Equipment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse {products.length} certified additive manufacturing items across 3D printers, filaments, 8K resin, nozzles, and build sheets.
          </p>
        </div>

        {/* Main Layout: Filters Sidebar + Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-900 flex items-center">
                  <SlidersHorizontal className="w-4 h-4 mr-2 text-indigo-600" />
                  <span>Filter Catalog</span>
                </span>
                <button
                  onClick={resetFilters}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Categories
                </h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-[10px] text-slate-400 font-normal">{products.length}</span>
                  </button>

                  {categories.map(cat => {
                    const count = products.filter(p => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Max Price
                  </h4>
                  <span className="text-xs font-extrabold text-indigo-600">
                    ${priceRange}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>$20</span>
                  <span>$1000</span>
                  <span>$2000+</span>
                </div>
              </div>

              {/* In Stock Only */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded-md text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <span>In-Stock Ready to Ship Only</span>
                </label>
              </div>

              {/* Brand Checkboxes */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                  Brands
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-3.5 h-3.5 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                      />
                      <span className="truncate">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Rating */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Minimum Rating
                </h4>
                <div className="space-y-1">
                  {[4.5, 4.0, 3.5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setMinRating(minRating === star ? 0 : star)}
                      className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        minRating === star ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                      </div>
                      <span>{star} Stars & Above</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Catalog Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              
              {/* Product Count & Active Filters summary */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-800">
                  Showing {filteredProducts.length} of {products.length} products
                </span>

                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>
              </div>

              {/* Sort & Layout Toggles */}
              <div className="flex items-center space-x-3">
                {/* Sort dropdown */}
                <div className="flex items-center space-x-1.5 text-xs text-slate-600">
                  <span className="hidden sm:inline font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 outline-hidden cursor-pointer"
                  >
                    <option value="featured">Featured Picks</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviewed</option>
                  </select>
                </div>

                {/* View switcher */}
                <div className="hidden sm:flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50">
                  <button
                    onClick={() => setLayout('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      layout === 'grid' ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayout('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      layout === 'list' ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Active filter pills */}
            {(selectedCategory !== 'all' || selectedBrands.length > 0 || inStockOnly || minRating > 0 || priceRange < 2000) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold">Active:</span>
                {selectedCategory !== 'all' && (
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium flex items-center space-x-1">
                    <span>Category: {selectedCategory}</span>
                    <button onClick={() => setSelectedCategory('all')}><X className="w-3 h-3 ml-1" /></button>
                  </span>
                )}
                {selectedBrands.map(b => (
                  <span key={b} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium flex items-center space-x-1">
                    <span>{b}</span>
                    <button onClick={() => toggleBrand(b)}><X className="w-3 h-3 ml-1" /></button>
                  </span>
                ))}
                {inStockOnly && (
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium flex items-center space-x-1">
                    <span>In-Stock</span>
                    <button onClick={() => setInStockOnly(false)}><X className="w-3 h-3 ml-1" /></button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-600 hover:underline font-semibold ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products Grid or List */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <p className="text-base font-bold text-slate-800">No matching products found</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your price range, selected brand, or category filters to find what you are looking for.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : layout === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} layout="list" />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white shadow-2xl p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Category</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => { setSelectedCategory('all'); setMobileFilterOpen(false); }}
                    className={`block w-full text-left p-2 rounded-lg text-xs ${selectedCategory === 'all' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600'}`}
                  >
                    All Categories
                  </button>
                  {categories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedCategory(c.id); setMobileFilterOpen(false); }}
                      className={`block w-full text-left p-2 rounded-lg text-xs ${selectedCategory === c.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Max Price (${priceRange})</h4>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl text-xs"
              >
                Apply Filters ({filteredProducts.length} results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
