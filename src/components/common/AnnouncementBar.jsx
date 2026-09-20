import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Truck, Tag, X, ShieldCheck } from 'lucide-react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside aria-label="Special announcements and offers" className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800 relative z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <div className="hidden sm:flex items-center space-x-4 text-slate-400">
          <span className="flex items-center space-x-1">
            <Truck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Free Express Courier Delivery on Orders $49+</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>2-Year Factory Guarantee on All 3D Printers</span>
          </span>
        </div>

        {/* Center Flash Banner */}
        <div className="flex-1 text-center flex items-center justify-center space-x-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Zap className="w-2.5 h-2.5 mr-1 animate-pulse" /> FLASH DEAL
          </span>
          <span className="font-medium text-slate-200">
            Use code <span className="font-bold text-orange-400 tracking-wider">FUSION10</span> for 10% off your entire cart!
          </span>
          <Link to="/offers" className="underline text-indigo-400 hover:text-indigo-300 ml-1 font-semibold">
            View All Offers &rarr;
          </Link>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setVisible(false)}
          className="text-slate-400 hover:text-white p-0.5 rounded transition-colors ml-2"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
