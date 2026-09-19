import { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  MapPin,
  ChevronDown,
  X,
  User,
  Package,
  Sparkles,
  LayoutDashboard,
  LogOut,
  HelpCircle
} from 'lucide-react';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenCustomQuote,
  onOpenOrders,
  onOpenLogin,
  currentUser,
  onLogout,
  onOpenAdmin,
  pincode,
  setPincode,
  city,
  setCity
}) {
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [tempPincode, setTempPincode] = useState(pincode);
  const [tempCity, setTempCity] = useState(city);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleSaveLocation = (e) => {
    e.preventDefault();
    if (tempPincode.trim()) {
      setPincode(tempPincode.trim());
      setCity(tempCity.trim() || 'Bangalore');
      setShowPincodeModal(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#2874f0] text-white shadow-md">
      {/* Top micro announcement bar */}
      <div className="bg-[#1e5bc6] text-[11px] px-4 py-1 text-blue-100 flex items-center justify-between border-b border-blue-600/50">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-400 text-slate-900 font-extrabold text-[9px] uppercase px-1 rounded">
              PLUS
            </span>
            <span>Flipkart Big Saving Days • Instant 3D Printing &amp; Fast Delivery Across India</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenOrders}
              className="hover:text-yellow-300 transition-colors flex items-center gap-1 font-semibold"
            >
              <Package className="w-3 h-3" />
              <span>Track Orders</span>
            </button>
            <span className="text-blue-400">|</span>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-yellow-300 hover:text-white transition-colors flex items-center gap-1 font-bold"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Admin Management Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Flipkart Blue Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Flipkart Iconic Brand Logo */}
          <div
            className="flex flex-col cursor-pointer select-none group"
            onClick={() => setSelectedCategory('all')}
          >
            <div className="flex items-center gap-1 leading-none">
              <span className="text-2xl font-black italic tracking-tight font-sans text-white group-hover:text-yellow-300 transition-colors">
                Flipkart
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] italic font-semibold leading-none text-gray-200">
              <span>Explore</span>
              <span className="text-yellow-400 font-bold">Plus</span>
              <Sparkles className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
            </div>
          </div>

          {/* Delivery Location Indicator */}
          <button
            type="button"
            onClick={() => setShowPincodeModal(true)}
            className="hidden xl:flex items-center gap-1.5 text-xs text-white/90 hover:text-white transition-colors text-left"
          >
            <MapPin className="w-4 h-4 text-yellow-300" />
            <div className="leading-tight text-[11px]">
              <span className="block text-blue-200 text-[10px]">Deliver to</span>
              <span className="font-bold underline decoration-dotted">{city} {pincode}</span>
            </div>
          </button>

          {/* Wide Flipkart White Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="flex items-center bg-white rounded-xs shadow-inner overflow-hidden">
              <input
                type="text"
                placeholder="Search for Products, Brands and More"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-500 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-gray-400 hover:text-gray-600 mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                className="px-4 py-2 text-[#2874f0] hover:text-blue-800 transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-4 text-sm font-bold">
            {/* Login Button or User Account Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1.5 text-white hover:text-yellow-300 transition-colors py-1 px-2 rounded font-semibold text-xs sm:text-sm"
                >
                  <User className="w-4 h-4" />
                  <span className="max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-2xl border border-gray-100 py-1.5 text-xs text-gray-800 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-gray-100 bg-blue-50/50">
                      <div className="font-bold text-gray-900">{currentUser.name}</div>
                      <div className="text-[11px] text-gray-500">{currentUser.email}</div>
                      {currentUser.role === 'admin' && (
                        <span className="inline-block mt-1 text-[9px] font-bold uppercase bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">
                          Store Administrator
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenAdmin();
                      }}
                      className="w-full px-4 py-2 text-left font-bold text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Admin Management Portal</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenOrders();
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Package className="w-4 h-4 text-gray-500" />
                      <span>Orders &amp; Track Jobs</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenWishlist();
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Wishlist ({wishlistCount})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenCustomQuote();
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Custom 3D CAD Quote</span>
                    </button>

                    <div className="border-t border-gray-100 my-1" />

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full px-4 py-2 text-left text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenLogin}
                className="bg-white text-[#2874f0] px-5 py-1.5 rounded-xs font-bold text-xs sm:text-sm hover:bg-yellow-400 hover:text-slate-900 transition-colors shadow-xs"
              >
                Login
              </button>
            )}

            {/* Become a Seller */}
            <button
              type="button"
              onClick={onOpenAdmin}
              className="hidden lg:block text-white hover:text-yellow-300 transition-colors text-xs font-bold whitespace-nowrap"
            >
              Become a Seller / Admin
            </button>

            {/* More Menu */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="flex items-center gap-1 text-white hover:text-yellow-300 transition-colors text-xs font-bold py-1"
              >
                <span>More</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showMoreMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl border border-gray-100 py-1.5 text-xs text-gray-800 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMoreMenu(false);
                      onOpenAdmin();
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 font-bold text-blue-600"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Admin Dashboard</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMoreMenu(false);
                      onOpenCustomQuote();
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>3D Print Farm Slicer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMoreMenu(false);
                      alert('Flipkart 24x7 Customer Support: 1800-202-9898');
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                    <span>24x7 Customer Care</span>
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative p-1 text-white hover:text-yellow-300 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart with yellow count badge */}
            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-1.5 text-white hover:text-yellow-300 transition-colors py-1 px-1.5"
              title="Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-yellow-400 text-slate-900 text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold text-xs sm:text-sm">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Pincode Modal */}
      {showPincodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white text-gray-900 rounded-lg max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-[#2874f0] font-bold text-base">
                <MapPin className="w-5 h-5" />
                <span>Choose Flipkart Delivery Location</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPincodeModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-3 mb-4">
              Enter your Indian Postal Pincode to view product availability, express next-day delivery slots, and shipping options.
            </p>
            <form onSubmit={handleSaveLocation} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  6-Digit Pincode
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 560001, 110001, 400001"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:border-[#2874f0] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  City / Region
                </label>
                <input
                  type="text"
                  value={tempCity}
                  onChange={(e) => setTempCity(e.target.value)}
                  placeholder="e.g. Bangalore, Mumbai, Delhi"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:border-[#2874f0] outline-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPincodeModal(false)}
                  className="px-4 py-2 border border-gray-200 text-xs font-bold text-gray-600 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2874f0] hover:bg-blue-700 text-white text-xs font-bold rounded shadow-xs"
                >
                  Save Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
