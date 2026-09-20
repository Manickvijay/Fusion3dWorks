import { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  Zap,
  Heart,
  Package,
  LayoutDashboard,
  LogOut,
  X
} from 'lucide-react';

export default function GromuseNavbar({
  searchQuery,
  setSearchQuery,
  cartCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  currentUser,
  onOpenLogin,
  onLogout,
  onOpenAdmin,
  onSelectCategory
}) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0d4243] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Left: Menu & Gromuse Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Toggle Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div
              onClick={() => onSelectCategory('all')}
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              {/* Shopping basket / sprout icon */}
              <div className="w-8 h-8 rounded-lg bg-[#22c55e] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <ShoppingCart className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                Gromuse
              </span>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-xl relative hidden sm:block">
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-inner">
              <input
                type="text"
                placeholder="Search for Grocery, Shoes, Vegetable or Meat"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none pr-2 bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-gray-400 hover:text-gray-600 mr-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                className="text-gray-500 hover:text-[#0d4243] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Express Delivery Badge */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-yellow-300 font-bold bg-[#082e2f] px-3 py-1.5 rounded-full border border-yellow-400/30 shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 animate-pulse" />
              <span>Order now and get it within <strong className="text-white">15 mint!</strong></span>
            </div>

            {/* Cart Icon Button with Badge */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2 rounded-full bg-[#115e59] hover:bg-[#134e4a] text-white transition-all shadow-sm active:scale-95"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#22c55e] text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 p-0.5 rounded-full border-2 border-[#22c55e] hover:border-white transition-colors"
                  title="My Account"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 text-xs text-gray-800 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-gray-100 bg-emerald-50/50">
                      <div className="font-bold text-gray-900">{currentUser.name}</div>
                      <div className="text-[11px] text-gray-500 truncate">{currentUser.email}</div>
                      <span className="inline-block mt-1 text-[9px] font-bold uppercase bg-[#dcfce7] text-[#166534] px-1.5 py-0.5 rounded">
                        {currentUser.role === 'admin' ? 'Store Administrator' : 'Verified Shopper'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserDropdown(false);
                        onOpenAdmin();
                      }}
                      className="w-full px-4 py-2 text-left font-bold text-emerald-700 hover:bg-emerald-50 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                      <span>Admin Management Portal</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserDropdown(false);
                        onOpenOrders();
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Package className="w-4 h-4 text-gray-500" />
                      <span>My Orders &amp; Delivery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserDropdown(false);
                        onOpenWishlist();
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Saved Wishlist</span>
                    </button>

                    <div className="border-t border-gray-100 my-1" />

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserDropdown(false);
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
                className="px-4 py-1.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs font-bold transition-all shadow-xs"
              >
                Login
              </button>
            )}

            {/* Quick Admin Hub Switcher */}
            <button
              type="button"
              onClick={onOpenAdmin}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white font-semibold transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-yellow-300" />
              <span>Admin Hub</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 sm:hidden">
          <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow-inner">
            <input
              type="text"
              placeholder="Search for Grocery, Meat, Fruits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs text-gray-800 placeholder-gray-400 outline-none pr-2 bg-transparent"
            />
            <Search className="w-3.5 h-3.5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white text-gray-900 h-full p-5 space-y-4 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 font-black text-lg text-[#0d4243]">
                  <ShoppingCart className="w-5 h-5 text-[#22c55e]" />
                  <span>Gromuse</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMobileMenu(false)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1 text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setShowMobileMenu(false);
                    onSelectCategory('all');
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  All Groceries
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMobileMenu(false);
                    onSelectCategory('vegetables');
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  Fresh Vegetables
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMobileMenu(false);
                    onSelectCategory('fruits');
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  Fresh Fruits
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMobileMenu(false);
                    onSelectCategory('chicken');
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  Chicken &amp; Meat
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMobileMenu(false);
                    onSelectCategory('dairy');
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  Milk &amp; Dairy
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setShowMobileMenu(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                <span>Admin Management Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
