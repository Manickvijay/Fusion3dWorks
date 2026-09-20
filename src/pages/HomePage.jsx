import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  Clock,
  ArrowRight,
  ShieldCheck,
  UploadCloud,
  Filter,
  CheckCircle2,
  Box,
  Flame,
  Award,
  Zap,
  SlidersHorizontal,
  X,
  Star,
  MessageSquarePlus,
  Send,
  HelpCircle,
  Palette,
  Tag,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import ProductCard from '../components/common/ProductCard';

export default function HomePage() {
  const { products, printers, submitCustomRequest } = useShop();

  // Active filters
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAskDetailsModalOpen, setIsAskDetailsModalOpen] = useState(false);

  // Advanced filter states
  const [priceRange, setPriceRange] = useState(60);
  const [selectedDuration, setSelectedDuration] = useState('all'); // all | fast | medium | long
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [hasDiscountOnly, setHasDiscountOnly] = useState(false);

  // Ask Details Modal form state
  const [askForm, setAskForm] = useState({
    name: '',
    email: '',
    productInterest: 'Personalized 3D Keychain',
    dimensions: '',
    preferredColors: '',
    specialNotes: ''
  });
  const [askSubmitted, setAskSubmitted] = useState(false);

  // Visual Category Cards definition (Image + Text Card below banner)
  const visualCategoryCards = [
    {
      id: 'all',
      name: 'All 3D Products',
      tagline: 'Full Custom Catalog',
      count: products.length,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: '3d-keychain',
      name: '3D Keychains',
      tagline: 'Dual-Color Names & Logos',
      count: products.filter(p => p.category === '3d-keychain').length,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'cake-toppers',
      name: 'Cake Toppers',
      tagline: 'Wedding & Birthday Script',
      count: products.filter(p => p.category === 'cake-toppers').length,
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'name-boards',
      name: 'Name Boards',
      tagline: 'Illuminated Gamer & Desk Signs',
      count: products.filter(p => p.category === 'name-boards').length,
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: '3d-gift',
      name: '3D Gifts & Art',
      tagline: 'Lithophanes & Planters',
      count: products.filter(p => p.category === '3d-gift').length,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80'
    }
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...(products || [])];

    // Category filter
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    // Price filter
    list = list.filter(p => p.price <= priceRange);

    // Duration filter
    if (selectedDuration === 'fast') {
      list = list.filter(p => (p.printTimeMinutes || 60) <= 60);
    } else if (selectedDuration === 'medium') {
      list = list.filter(p => (p.printTimeMinutes || 60) > 60 && (p.printTimeMinutes || 60) <= 150);
    } else if (selectedDuration === 'overnight') {
      list = list.filter(p => (p.printTimeMinutes || 60) > 150);
    }

    // Material filter
    if (selectedMaterial !== 'all') {
      list = list.filter(p => (p.material || '').toLowerCase().includes(selectedMaterial.toLowerCase()));
    }

    // Rating filter
    if (minRating > 0) {
      list = list.filter(p => (p.rating || 5.0) >= minRating);
    }

    // Discount filter
    if (hasDiscountOnly) {
      list = list.filter(p => p.discountPercent > 0 || (p.originalPrice && p.originalPrice > p.price));
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'print-fast') {
      list.sort((a, b) => (a.printTimeMinutes || 60) - (b.printTimeMinutes || 60));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }

    return list;
  }, [products, activeCategory, sortBy, priceRange, selectedDuration, selectedMaterial, minRating, hasDiscountOnly]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== 'all') count++;
    if (priceRange < 60) count++;
    if (selectedDuration !== 'all') count++;
    if (selectedMaterial !== 'all') count++;
    if (minRating > 0) count++;
    if (hasDiscountOnly) count++;
    return count;
  }, [activeCategory, priceRange, selectedDuration, selectedMaterial, minRating, hasDiscountOnly]);

  const resetFilters = () => {
    setActiveCategory('all');
    setPriceRange(60);
    setSelectedDuration('all');
    setSelectedMaterial('all');
    setMinRating(0);
    setHasDiscountOnly(false);
    setSortBy('featured');
  };

  const handleAskDetailsSubmit = (e) => {
    e.preventDefault();
    submitCustomRequest(askForm);
    setAskSubmitted(true);
    setTimeout(() => {
      setAskSubmitted(false);
      setIsAskDetailsModalOpen(false);
      setAskForm({
        name: '',
        email: '',
        productInterest: 'Personalized 3D Keychain',
        dimensions: '',
        preferredColors: '',
        specialNotes: ''
      });
    }, 1800);
  };

  const activePrintersCount = (printers || []).filter(p => p.status === 'Printing').length;

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      
      {/* Enhanced Hero Banner Section - Warm & Electric Palette with Live Telemetry */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl mx-3 sm:mx-6 lg:mx-8 p-6 sm:p-10 lg:p-12 border border-indigo-900/40 shadow-2xl mt-3">
        
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 -ml-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          
          {/* Live Farm Telemetry Pill */}
          <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 backdrop-blur-md text-xs font-semibold shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold">Print Farm Live:</span>
            <span className="text-slate-200">
              Bambu Lab A1 & X1-Carbon Fleet Active ({activePrintersCount} printers running)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
            Custom 3D Printing & Design <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-indigo-200 to-cyan-300">
              Personalized for Every Moment
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
            Dual-color name keychains, custom wedding cake toppers, illuminated LED gamer boards, and precision lithophanes. Order online, review your 3D design proof with our engineers, and get doorstep courier tracking.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#products-catalog"
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2 text-xs sm:text-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Browse 3D Catalog</span>
            </a>

            <button
              onClick={() => setIsAskDetailsModalOpen(true)}
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl shadow-lg transition-all flex items-center space-x-1.5 text-xs sm:text-sm cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Ask Details / Custom Request</span>
            </button>

            <Link
              to="/custom-print"
              className="px-4 py-3 bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 font-bold rounded-xl transition-all flex items-center space-x-1.5 text-xs sm:text-sm"
            >
              <UploadCloud className="w-4 h-4 text-indigo-400" />
              <span>Upload 3D STL File</span>
            </Link>
          </div>

          {/* Value Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs">
            <div className="flex items-center space-x-2 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>3D Interactive Preview</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Cancelable within 30 min</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Admin Design Approval Proof</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>BlueDart & Delhivery Tracking</span>
            </div>
          </div>

        </div>

      </section>

      {/* VISUAL CATEGORY CARDS BELOW BANNER (Image + Text Cards, Not Plain Text!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Explore 3D Collections</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Select a category to filter the catalog instantly
            </p>
          </div>
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1"
            >
              <span>View All</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Horizontal Food-App Style Category Scroll List */}
        <div className="relative">
          <div
            id="category-scroll-container"
            className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-200 scroll-smooth px-1"
          >
            {visualCategoryCards.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="group/item flex flex-col items-center shrink-0 transition-all cursor-pointer text-center w-24 sm:w-28 focus:outline-hidden"
                >
                  {/* Circular/Squircle Food-App Category Stage */}
                  <div
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 transition-all duration-200 shadow-xs flex items-center justify-center bg-slate-100 ${
                      isSelected
                        ? 'border-indigo-600 ring-4 ring-indigo-100 scale-105 shadow-md'
                        : 'border-slate-200 group-hover/item:border-indigo-400 group-hover/item:scale-102'
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-indigo-600/20 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md" />
                      </div>
                    )}
                  </div>

                  {/* Category Label */}
                  <span
                    className={`mt-2 text-xs sm:text-[13px] font-bold tracking-tight line-clamp-1 transition-colors ${
                      isSelected ? 'text-indigo-600 font-black' : 'text-slate-800 group-hover/item:text-indigo-600'
                    }`}
                  >
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
                    {cat.count} items
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN CATALOG & ADVANCED FILTER BAR */}
      <section id="products-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Filter & Sort Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center space-x-2">
            {/* Advanced Filter Modal Trigger Button */}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Advanced Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-mono flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Ask Details Button in Filter Bar */}
            <button
              onClick={() => setIsAskDetailsModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ask Details / Custom Request</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> results
            </span>

            {/* Sorter */}
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-400 font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:border-indigo-500"
              >
                <option value="featured">Featured & Best Sellers</option>
                <option value="rating">Top Rated (Stars)</option>
                <option value="print-fast">Fastest Print Time</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Active Filters Badges Row */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium text-[11px]">Applied Filters:</span>
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-200">
                Category: {activeCategory}
                <button onClick={() => setActiveCategory('all')} className="ml-1 hover:text-indigo-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {priceRange < 60 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-200">
                Max ${priceRange}
                <button onClick={() => setPriceRange(60)} className="ml-1 hover:text-indigo-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedDuration !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-200">
                Duration: {selectedDuration}
                <button onClick={() => setSelectedDuration('all')} className="ml-1 hover:text-indigo-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedMaterial !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-200">
                Material: {selectedMaterial}
                <button onClick={() => setSelectedMaterial('all')} className="ml-1 hover:text-indigo-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-200">
                <Star className="w-3 h-3 fill-indigo-600 text-indigo-600 mr-1" />
                <span>Rating: {minRating}+ Stars</span>
                <button onClick={() => setMinRating(0)} className="ml-1 hover:text-indigo-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {hasDiscountOnly && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-rose-50 text-rose-700 text-[11px] font-semibold border border-rose-200">
                On Discount Only
                <button onClick={() => setHasDiscountOnly(false)} className="ml-1 hover:text-rose-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-[11px] text-slate-500 hover:text-rose-600 underline cursor-pointer ml-1"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Small Compact Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <Box className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">No products match your filter criteria</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your price range, print speed duration, or category filter to discover available 3D creations.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </section>

      {/* CUSTOM 3D CAD UPLOAD BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-10 overflow-hidden border border-indigo-900/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[11px] font-bold inline-flex items-center space-x-1.5">
              <UploadCloud className="w-3.5 h-3.5 text-amber-300" />
              <span>Own 3D Model?</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Instant Custom STL / OBJ File Slicing
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upload your custom 3D mesh files. Choose layer heights from 0.08mm to 0.28mm, configure filament materials (PLA+, PETG, Silk), and receive real-time slicing metrics.
            </p>
            <div className="pt-1">
              <Link
                to="/custom-print"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md"
              >
                <span>Upload Custom 3D Model</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 text-xs space-y-2 w-full md:w-72">
            <div className="flex justify-between border-b border-white/10 pb-1.5 font-bold text-amber-300">
              <span>Bambu Lab A1 Fleet</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full">Active</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Max Acceleration:</span>
              <span className="font-mono font-bold text-white">10,000 mm/s²</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>AMS Multi-Color:</span>
              <span className="font-mono font-bold text-white">4 Colors Auto</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Print Precision:</span>
              <span className="font-mono font-bold text-white">±0.05 mm</span>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS & VERIFIED CUSTOMER FEEDBACK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="text-center max-w-lg mx-auto">
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
            Verified Customer Ratings & Reviews
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Real Reviews from Satisfied Customers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-slate-700 ml-1">5.0</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Immaculate Dual-Tone Finish</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              "The personalized keychain arrived within 48 hours. The color separation between the base and lettering is laser-sharp with zero bleed. Fantastic design proof review step!"
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-800">Samantha L.</span>
              <span className="text-emerald-600 font-semibold flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-slate-700 ml-1">5.0</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Centerpiece for Our Cake</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Gold script finish was stunning! Loved that the designer sent a 3D proof before initiating the print so we could approve the anchor depth. 10/10 recommend."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-800">David & Elena</span>
              <span className="text-emerald-600 font-semibold flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-slate-700 ml-1">4.9</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Fast BlueDart Delivery</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              "The illuminated gamer sign looks unreal on stream. Real-time courier tracking number was active the morning after QA inspection. Packaged with great care."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-800">Jordan M.</span>
              <span className="text-emerald-600 font-semibold flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Buyer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANCED FILTER POPUP MODAL */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-black text-slate-900">Advanced 3D Filters</h3>
              </div>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Controls */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              
              {/* Price Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Maximum Price:</span>
                  <span className="text-indigo-600 font-mono text-sm">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="2"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>$10</span>
                  <span>$35</span>
                  <span>$60+</span>
                </div>
              </div>

              {/* Print Speed / Turnaround */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 block">Print Duration Speed:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'all', label: 'Any Duration' },
                    { id: 'fast', label: 'Fast (< 1 hour)' },
                    { id: 'medium', label: 'Medium (1–2.5 hrs)' },
                    { id: 'overnight', label: 'Overnight (> 2.5 hrs)' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedDuration(opt.id)}
                      className={`p-2 rounded-xl text-left border font-semibold transition-all ${
                        selectedDuration === opt.id
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Preference */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 block">Filament & Material Type:</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'all', label: 'All Materials' },
                    { id: 'PLA', label: 'PLA+ Polymer' },
                    { id: 'PETG', label: 'PETG Tough' },
                    { id: 'Silk', label: 'Silk Gloss' },
                    { id: 'Resin', label: '12K UV Resin' }
                  ].map(mat => (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setSelectedMaterial(mat.id)}
                      className={`p-2 rounded-xl text-center border font-semibold transition-all ${
                        selectedMaterial === mat.id
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {mat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 block">Customer Rating:</label>
                <div className="flex gap-2">
                  {[0, 4.0, 4.5, 4.8].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setMinRating(r)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center space-x-1 ${
                        minRating === r
                          ? 'bg-amber-50 border-amber-500 text-amber-800'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {r === 0 ? (
                        <span>All</span>
                      ) : (
                        <>
                          <span>{r}</span>
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount Only Toggle */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Discounted Creations Only</span>
                  <span className="text-[10px] text-slate-400">Show products with active promo discounts</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasDiscountOnly}
                  onChange={(e) => setHasDiscountOnly(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>

            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-slate-500 hover:text-rose-600 font-semibold"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                Apply Filters ({filteredProducts.length} results)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ASK DETAILS / CUSTOM REQUEST MODAL */}
      {isAskDetailsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <MessageSquarePlus className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="text-base font-black text-slate-900">Ask Details / Custom Request</h3>
                  <p className="text-[11px] text-slate-500">Submit your custom sizing, color, or 3D specification request</p>
                </div>
              </div>
              <button
                onClick={() => setIsAskDetailsModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {askSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Inquiry Submitted!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Our 3D design team will review your specifications and reply with a CAD preview and quotation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAskDetailsSubmit} className="space-y-3.5 text-xs">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Rivera"
                      value={askForm.name}
                      onChange={(e) => setAskForm({ ...askForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@gmail.com"
                      value={askForm.email}
                      onChange={(e) => setAskForm({ ...askForm, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Product / Creation Category</label>
                  <select
                    value={askForm.productInterest}
                    onChange={(e) => setAskForm({ ...askForm, productInterest: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500"
                  >
                    <option value="Personalized 3D Keychain">Personalized 3D Keychain</option>
                    <option value="Custom Wedding Cake Topper">Custom Wedding Cake Topper</option>
                    <option value="Illuminated LED Name Board">Illuminated LED Name Board</option>
                    <option value="Lithophane 3D Lamp Shade">Lithophane 3D Lamp Shade</option>
                    <option value="Full Custom 3D STL Print">Full Custom 3D STL Print</option>
                    <option value="Other Custom Part">Other Bespoke 3D Part</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Dimensions (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 120mm x 45mm x 10mm"
                      value={askForm.dimensions}
                      onChange={(e) => setAskForm({ ...askForm, dimensions: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Color / Material Wish</label>
                    <input
                      type="text"
                      placeholder="e.g. Silk Gold & Matte Black"
                      value={askForm.preferredColors}
                      onChange={(e) => setAskForm({ ...askForm, preferredColors: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Specific Requirements & Text *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe custom text, font style preference, mounting holes, or special instructions..."
                    value={askForm.specialNotes}
                    onChange={(e) => setAskForm({ ...askForm, specialNotes: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAskDetailsModalOpen(false)}
                    className="px-4 py-2 text-slate-500 hover:text-slate-800 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center space-x-1.5 shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
