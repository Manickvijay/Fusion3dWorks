import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Sparkles, Shield, Clock, RotateCcw, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 mt-20">
      
      {/* Feature Highlights Grid */}
      <div className="border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-indigo-950/60 border border-indigo-800/50 text-indigo-400 shrink-0">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Industrial 3D Printers</h4>
              <p className="text-slate-400 text-xs mt-1">
                Printed on precision Bambu CoreXY & Prusa machines at 0.12mm layer resolutions.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-indigo-950/60 border border-indigo-800/50 text-indigo-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Real-Time 3D Customizer</h4>
              <p className="text-slate-400 text-xs mt-1">
                Preview your bespoke colors and lettering in interactive 3D WebGL before printing.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-indigo-950/60 border border-indigo-800/50 text-indigo-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Live Slicing & Print Queue</h4>
              <p className="text-slate-400 text-xs mt-1">
                Track every print progress percentage, nozzle temperature, and delivery step.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-indigo-950/60 border border-indigo-800/50 text-indigo-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Reprint Guarantee</h4>
              <p className="text-slate-400 text-xs mt-1">
                If a layer shift or imperfection occurs, we reprint and dispatch free of charge.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        
        <div className="col-span-2 space-y-4">
          <div className="flex items-center space-x-2 text-white">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Box className="w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-tight">Fusion3D Works</span>
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed">
            Fusion3D Works turns your custom ideas into tangible, masterfully crafted 3D objects. From personalized name keychains to illuminated desk boards and custom cake toppers.
          </p>
          <div className="text-slate-500 text-[11px]">
            Lab Address: 104 Innovation Hub, San Francisco, CA 94107
          </div>
        </div>

        <div>
          <h5 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">3D Products</h5>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/category/3d-keychain" className="hover:text-white transition-colors">3D Keychains</Link></li>
            <li><Link to="/category/cake-toppers" className="hover:text-white transition-colors">Cake Toppers</Link></li>
            <li><Link to="/category/name-boards" className="hover:text-white transition-colors">Illuminated Name Boards</Link></li>
            <li><Link to="/category/3d-gift" className="hover:text-white transition-colors">Lithophane Lamps</Link></li>
            <li><Link to="/category/3d-gift" className="hover:text-white transition-colors">Infinity Heart Sculptures</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Custom Services</h5>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/custom-print" className="hover:text-white transition-colors">Upload Custom STL/OBJ</Link></li>
            <li><Link to="/track-order" className="hover:text-white transition-colors">Track 3D Print Queue</Link></li>
            <li><Link to="/profile" className="hover:text-white transition-colors">Maker Account</Link></li>
            <li><Link to="/admin" className="hover:text-white transition-colors">Admin Print Farm</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Filaments & Materials</h5>
          <ul className="space-y-2 text-slate-400">
            <li>Silk PolyTerra Dual PLA</li>
            <li>Food-Safe Bio Resin</li>
            <li>High-Temperature PETG</li>
            <li>Carbon-Fiber Infused</li>
            <li>Translucent Optical White</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-slate-900 py-6 text-center text-slate-500 text-[11px]">
        © {new Date().getFullYear()} Fusion3D Works. Print Your Imagination. All rights reserved.
      </div>
    </footer>
  );
}
