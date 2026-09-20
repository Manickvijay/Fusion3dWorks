import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  Scale,
  User,
  ShieldAlert,
  ChevronDown,
  Menu,
  X,
  Printer,
  Sparkles,
  Package,
  Layers,
  Wrench,
  Cpu,
  Flame,
  FileText
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function Navbar() {
  const {
    cartItemCount,
    cartSubtotal,
    wishlist,
    compareList,
    openCartDrawer,
    categories,
    products,
    currentUser,
    switchUserRole
  } = useShop();

  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const searchContainerRef = useRef(null);
  const accountRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for suggestions
  const suggestions = searchQuery.trim().length > 1
    ? products.filter(p => {
        const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        return matchesQuery && matchesCategory;
      }).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&cat=${selectedCategory}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-orange-500 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white">
                  <Printer className="w-6 h-6 text-orange-400 group-hover:rotate-6 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                    Fusion<span className="text-indigo-600">3D</span>
                  </span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded-md">
                    WORKS
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-500 tracking-wide">
                  Print Your Imagination
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar with Category Selector & Auto-Suggest */}
          <div className="hidden md:flex flex-1 max-w-2xl relative" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="flex w-full rounded-xl border border-slate-300 hover:border-slate-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 bg-white shadow-xs overflow-hidden transition-all">
              {/* Category selector */}
              <div className="relative border-r border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 flex items-center">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent pl-3 pr-7 py-2.5 outline-hidden cursor-pointer appearance-none text-slate-700 text-xs font-medium"
                >
                  <option value="all">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 pointer-events-none" />
              </div>

              {/* Text input */}
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  placeholder="Search 3D printers, filaments, nozzles, 8K resin, PEI plates..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-hidden bg-transparent"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-slate-600 mr-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="px-5 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Auto Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in-50">
                <div className="p-2 bg-slate-50 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                  <span>Matching 3D Products</span>
                  <span>{suggestions.length} items</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {suggestions.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setShowSuggestions(false);
                        navigate(`/product/${item.id}`);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-indigo-50/50 flex items-center space-x-3 transition-colors group"
                    >
                      <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-indigo-600">
                          {item.title}
                        </p>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                          <span className="font-medium text-orange-600">${item.price.toFixed(2)}</span>
                          <span>•</span>
                          <span>{item.categoryLabel}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleSearchSubmit}
                  className="w-full py-2.5 text-center text-xs font-semibold text-indigo-600 hover:bg-indigo-50 border-t border-slate-100 bg-white"
                >
                  View all results for "{searchQuery}" &rarr;
                </button>
              </div>
            )}
          </div>

          {/* Right Action Icons & Badges */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Compare Badge */}
            <Link
              to="/compare"
              className="relative p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center"
              title="Compare Products"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Wishlist Badge */}
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-700 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button with Count & Drawer Trigger */}
            <button
              onClick={openCartDrawer}
              className="flex items-center space-x-2 p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition-all border border-indigo-200/60"
              title="View Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-indigo-600" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-xs">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] uppercase font-semibold text-slate-500">Cart</span>
                <span className="text-xs font-bold text-indigo-900">${cartSubtotal.toFixed(2)}</span>
              </div>
            </button>

            {/* User Account Menu Dropdown */}
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/20"
                />
                <span className="hidden xl:inline text-xs font-semibold text-slate-800">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:inline" />
              </button>

              {/* Account Dropdown */}
              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-indigo-600 font-medium">{currentUser.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 text-slate-700 capitalize">
                      Role: {currentUser.role}
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/account"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                    >
                      <User className="w-4 h-4 mr-2 text-slate-400" /> Account Dashboard
                    </Link>
                    <Link
                      to="/account?tab=orders"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                    >
                      <Package className="w-4 h-4 mr-2 text-slate-400" /> My 3D Orders & Invoices
                    </Link>
                    <Link
                      to="/track-order"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                    >
                      <Layers className="w-4 h-4 mr-2 text-slate-400" /> Live Shipment Tracking
                    </Link>
                    <Link
                      to="/custom-quote"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                    >
                      <Wrench className="w-4 h-4 mr-2 text-slate-400" /> Custom 3D Print Quote
                    </Link>
                  </div>

                  {/* Admin Portal Shortcut */}
                  <div className="border-t border-slate-100 pt-1 pb-1">
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4 mr-2 text-orange-600" /> Open Admin Portal
                    </Link>
                    
                    {/* Role quick toggle for prototype testing */}
                    <div className="px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Preview Role:</span>
                      <button
                        onClick={() => switchUserRole(currentUser.role === 'admin' ? 'customer' : 'admin')}
                        className="text-indigo-600 hover:underline font-semibold"
                      >
                        Toggle ({currentUser.role})
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Admin Portal Button for easy testing */}
            <Link
              to="/admin/dashboard"
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary Bottom Navigation Bar */}
      <nav aria-label="Product categories and secondary navigation" className="bg-slate-50 border-t border-slate-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11 text-xs font-semibold text-slate-700">
            
            {/* Left Category Links */}
            <div className="flex items-center space-x-6">
              
              {/* All Categories Dropdown Trigger */}
              <div className="relative group">
                <button
                  onMouseEnter={() => setCategoriesDropdownOpen(true)}
                  onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                  className="flex items-center space-x-1.5 py-2 text-indigo-600 hover:text-indigo-700 font-bold"
                >
                  <Menu className="w-4 h-4" />
                  <span>All 3D Categories</span>
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                </button>

                {/* Categories Dropdown Panel */}
                {categoriesDropdownOpen && (
                  <div
                    onMouseLeave={() => setCategoriesDropdownOpen(false)}
                    className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                  >
                    {categories.map(c => (
                      <Link
                        key={c.id}
                        to={`/category/${c.id}`}
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        <span className="font-medium">{c.name}</span>
                        <span className="text-[10px] text-slate-400">{c.subcategories.length} subcategories</span>
                      </Link>
                    ))}
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <Link
                        to="/shop"
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-bold text-indigo-600 hover:bg-slate-50"
                      >
                        Browse Full Catalog &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/shop" className="hover:text-indigo-600 transition-colors">
                All Products
              </Link>
              <Link to="/category/3d-printers" className="hover:text-indigo-600 transition-colors flex items-center space-x-1">
                <span>3D Printers</span>
                <span className="bg-indigo-100 text-indigo-700 text-[9px] px-1 py-0.2 rounded font-bold">HOT</span>
              </Link>
              <Link to="/category/filaments" className="hover:text-indigo-600 transition-colors">
                Filaments
              </Link>
              <Link to="/category/resins" className="hover:text-indigo-600 transition-colors">
                8K Resins
              </Link>
              <Link to="/category/spare-parts" className="hover:text-indigo-600 transition-colors">
                Nozzles & Parts
              </Link>
              <Link to="/category/accessories" className="hover:text-indigo-600 transition-colors">
                Build Plates
              </Link>
              <Link to="/custom-quote" className="hover:text-orange-600 text-orange-600 font-bold transition-colors flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom 3D Print Slicer</span>
              </Link>
            </div>

            {/* Right Quick Links */}
            <div className="flex items-center space-x-5 text-slate-600">
              <Link to="/offers" className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 font-bold">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>Deals & Coupons</span>
              </Link>
              <Link to="/track-order" className="hover:text-indigo-600 transition-colors">
                Track Shipment
              </Link>
              <Link to="/support" className="hover:text-indigo-600 transition-colors">
                Customer Support
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-4 animate-in slide-in-from-top-2">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="flex rounded-xl border border-slate-300 overflow-hidden">
            <input
              type="text"
              placeholder="Search 3D printers, filaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 text-sm text-slate-900 outline-hidden"
            />
            <button type="submit" className="px-4 bg-indigo-600 text-white">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50">
              Browse Catalog
            </Link>
            <Link to="/category/3d-printers" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50">
              3D Printers
            </Link>
            <Link to="/category/filaments" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50">
              Filaments
            </Link>
            <Link to="/category/resins" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50">
              8K Resins
            </Link>
            <Link to="/custom-quote" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-orange-50 text-orange-700 font-bold">
              Custom 3D Printing
            </Link>
            <Link to="/compare" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50">
              Compare ({compareList.length})
            </Link>
            <Link to="/offers" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50">
              Active Offers
            </Link>
            <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-900 text-white font-bold">
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
