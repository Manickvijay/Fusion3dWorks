import { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

export default function GromuseFilterBar({
  selectedCategory,
  onSelectCategory,
  sortBy,
  setSortBy,
  priceFilter,
  setPriceFilter
}) {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showPriceMenu, setShowPriceMenu] = useState(false);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'fruits', label: 'Fruits' },
    { id: 'snacks', label: 'Snacks & Breads' },
    { id: 'chicken', label: 'Chicken' },
    { id: 'meat', label: 'Meat & Ball' },
    { id: 'frozen', label: 'Frozen Food' },
    { id: 'dairy', label: 'Milk & Dairy' },
    { id: 'drinks', label: 'Beverages' }
  ];

  const currentCategoryLabel = categories.find(c => c.id === selectedCategory)?.label || 'All Categories';

  return (
    <div className="py-4 space-y-4">
      {/* Breadcrumb matching video */}
      <div className="flex items-center gap-2 text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
        <span>Gromuse</span>
        <span className="text-gray-400 font-normal">/</span>
        <span className="capitalize">{selectedCategory === 'all' ? 'All category' : currentCategoryLabel}</span>
      </div>

      {/* Filter Chips row matching video frame 00:30 - 00:33 */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
        {/* Category Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#115e59] text-white font-bold hover:bg-[#0f4e4b] transition-colors shadow-xs"
          >
            <span>{currentCategoryLabel}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {showCategoryMenu && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-30 animate-in fade-in zoom-in-95">
              {categories.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(c.id);
                    setShowCategoryMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-emerald-50 text-xs font-semibold ${
                    selectedCategory === c.id ? 'text-emerald-700 bg-emerald-50/50' : 'text-gray-700'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPriceMenu(!showPriceMenu)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border transition-colors font-medium ${
              priceFilter !== 'all'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>Price</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {showPriceMenu && (
            <div className="absolute left-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-30 animate-in fade-in zoom-in-95">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under10', label: 'Under $10' },
                { id: '10to20', label: '$10 to $20' },
                { id: 'above20', label: 'Above $20' }
              ].map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setPriceFilter(p.id);
                    setShowPriceMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-xs text-gray-700 font-medium"
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Review Pill */}
        <button
          type="button"
          onClick={() => alert('Filtered by 4.5+ Star Customer Reviews')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          <span>Review</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {/* Color Pill */}
        <button
          type="button"
          onClick={() => alert('Color / Variety filtering ready')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          <span>Color</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {/* Material / Organic Pill */}
        <button
          type="button"
          onClick={() => alert('Organic Certified Produce filter active')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          <span>Material</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {/* Offer Pill */}
        <button
          type="button"
          onClick={() => alert('Special Promo Offers &amp; Instant 15% Discounts applied')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          <span>Offer</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {/* All Filters */}
        <button
          type="button"
          onClick={() => {
            onSelectCategory('all');
            setPriceFilter('all');
            setSortBy('default');
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>All Filters (3)</span>
        </button>

        {/* Sort By Dropdown (Pushed to Right) */}
        <div className="relative ml-auto">
          <button
            type="button"
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-800 font-bold hover:bg-gray-50 transition-colors"
          >
            <span>Sort by</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {showSortMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-30 animate-in fade-in zoom-in-95">
              {[
                { id: 'default', label: 'Featured & Popular' },
                { id: 'price-low', label: 'Price: Low to High' },
                { id: 'price-high', label: 'Price: High to Low' },
                { id: 'rating', label: 'Customer Rating' }
              ].map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSortBy(s.id);
                    setShowSortMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-emerald-50 text-xs font-medium ${
                    sortBy === s.id ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-gray-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
