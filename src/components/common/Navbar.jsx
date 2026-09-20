import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Sparkles,
  Search,
  User,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Layers,
  Heart,
  UploadCloud,
  Truck,
  Box,
  SlidersHorizontal,
  Settings,
  RefreshCw
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function Navbar() {
  const {
    currentUser,
    setIsLoginModalOpen,
    logout,
    cartItemCount,
    setIsCartOpen,
    cartBadgeBounce,
    wishlist,
    backendStatus,
    isBackendSyncing,
    syncWithBackend,
    backendUrl
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      
      {/* Top Utility Announcement */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="flex items-center text-amber-400 font-bold">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            Custom 3D Printing & Gifts
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300">
            Estimated dispatch in 24–48 hours with real-time print layer tracking
          </span>
        </div>

        {/* Backend Status & Quick Demo Switcher */}
        <div className="flex items-center space-x-2.5 text-slate-400">
          <button
            onClick={() => syncWithBackend(true)}
            title={`Render Backend: ${backendUrl}\nClick to refresh connection`}
            className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-[10px] text-slate-300 transition-colors shadow-xs cursor-pointer"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                backendStatus === 'connected'
                  ? 'bg-emerald-400 animate-pulse'
                  : backendStatus === 'checking' || isBackendSyncing
                  ? 'bg-amber-400 animate-ping'
                  : 'bg-indigo-400'
              }`}
            />
            <span className="font-mono text-[10px]">
              {backendStatus === 'connected'
                ? 'Render Live'
                : isBackendSyncing
                ? 'Syncing...'
                : 'Render Backend'}
            </span>
            <RefreshCw className={`w-2.5 h-2.5 text-slate-400 ${isBackendSyncing ? 'animate-spin' : ''}`} />
          </button>

          {currentUser ? (
            <span className="text-[10px] text-slate-300 hidden md:flex items-center space-x-1.5">
              <span>Signed in as:</span>
              <span className="font-bold text-white">{currentUser.name}</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-mono font-bold ${
                currentUser.role === 'admin' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              }`}>
                {currentUser.role}
              </span>
            </span>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-[10px] text-indigo-300 hover:text-white transition-colors font-semibold hidden md:inline cursor-pointer"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 shrink-0 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-all text-white">
            <Box className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-black text-slate-900 tracking-tight">
                Fusion<span className="text-indigo-600">3D</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-extrabold uppercase tracking-wide border border-indigo-200">
                Works
              </span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 -mt-0.5 tracking-wider uppercase">
              Print Your Imagination
            </p>
          </div>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search custom keychains, cake toppers, name boards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100/80 border border-slate-200 rounded-full text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all shadow-inner"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </form>

        {/* Navigation & Action Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Custom CAD / 3D Model Upload Service link */}
          <Link
            to="/custom-print"
            className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
          >
            <UploadCloud className="w-4 h-4 text-indigo-500" />
            <span>Custom Print (STL)</span>
          </Link>

          {/* Track Orders Link */}
          <Link
            to="/track-order"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
          >
            <Truck className="w-4 h-4 text-slate-400" />
            <span>Track Order</span>
          </Link>

          {/* Customer only: Wishlist & Cart. Admin only: Admin portal link & Fleet summary */}
          {currentUser?.role !== 'admin' ? (
            <>
              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-full transition-colors"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Trigger Button */}
              <button
                id="header-cart-button"
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2.5 rounded-2xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-transform cursor-pointer ${
                  cartBadgeBounce ? 'scale-125 bg-amber-100 text-amber-800 border-amber-300' : ''
                }`}
                title="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 min-w-[20px] bg-indigo-600 text-white rounded-full text-[11px] font-black flex items-center justify-center shadow-md animate-in fade-in">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </>
          ) : (
            <Link
              to="/admin"
              className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black shadow-md transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Control Center</span>
            </Link>
          )}

          {/* User Profile / Login Area */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 pl-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-all cursor-pointer"
              >
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-900 leading-none">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] font-medium text-indigo-600 leading-none mt-0.5 uppercase tracking-wider">
                    {currentUser.role === 'admin' ? 'Admin Portal' : 'Customer Account'}
                  </div>
                </div>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-white shadow-xs"
                />
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-slate-400 text-[11px] truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700">
                      {currentUser.role === 'admin' ? 'Platform Administrator' : 'Customer Account'}
                    </span>
                  </div>

                  {currentUser.role === 'admin' ? (
                    <>
                      <Link
                        to="/admin"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2.5 text-orange-600 font-bold hover:bg-orange-50 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>3D Print Farm Fleet & Queue</span>
                      </Link>
                      <Link
                        to="/admin"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                      >
                        <Box className="w-4 h-4 text-slate-400" />
                        <span>Product Catalog & Discounts</span>
                      </Link>
                      <Link
                        to="/admin"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                      >
                        <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                        <span>Farm Telemetry & Analytics</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2.5 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>My Profile & Preferences</span>
                      </Link>

                      <Link
                        to="/profile?tab=orders"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2.5 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                      >
                        <Layers className="w-4 h-4 text-slate-400" />
                        <span>My 3D Print Orders</span>
                      </Link>

                      <Link
                        to="/custom-print"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2.5 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                      >
                        <UploadCloud className="w-4 h-4 text-slate-400" />
                        <span>Custom CAD Print Upload</span>
                      </Link>
                    </>
                  )}

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors text-left font-semibold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login / Sign Up</span>
            </button>
          )}

        </div>

      </div>

    </header>
  );
}
