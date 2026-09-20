import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  Users,
  Tag,
  Star,
  Settings,
  ArrowLeft,
  Bell,
  Search,
  ExternalLink,
  Printer,
  ChevronDown,
  ShieldAlert,
  Menu,
  X
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview & Analytics', path: '/admin', icon: LayoutDashboard },
    { label: 'Product Catalog', path: '/admin/products', icon: Package },
    { label: 'Inventory & Stock', path: '/admin/inventory', icon: Boxes },
    { label: 'Orders & Shipments', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Customer Accounts', path: '/admin/users', icon: Users },
    { label: 'Discounts & Coupons', path: '/admin/coupons', icon: Tag },
    { label: 'Review Moderation', path: '/admin/reviews', icon: Star },
    { label: 'Store Configuration', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-64 flex-col justify-between bg-slate-950 border-r border-slate-800 p-4 shrink-0">
        <div className="space-y-6">
          
          {/* Admin Brand */}
          <div className="flex items-center space-x-3 px-2 pt-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-orange-500 text-white flex items-center justify-center font-black shadow-lg">
              F3D
            </div>
            <div>
              <span className="font-black text-sm text-white tracking-tight block">Fusion3D Works</span>
              <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                Admin Control Deck
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Return to Storefront */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4 text-indigo-400" />
              <span>Back to Storefront</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>

          <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center">
              AD
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">Admin Console</span>
              <span className="text-[10px] text-emerald-400 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                Store Live
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
            F3D
          </div>
          <span className="text-sm font-bold text-white">Admin Deck</span>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-xs font-bold text-slate-400 hover:text-white mr-2">
            Storefront
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-xs font-bold ${
                location.pathname === item.path ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Main Admin Content Viewport */}
      <main className="flex-1 bg-slate-900 overflow-y-auto p-4 sm:p-8">
        <Outlet />
      </main>

    </div>
  );
}
