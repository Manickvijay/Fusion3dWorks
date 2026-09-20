import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Layers, Cpu, Award } from 'lucide-react';
import Interactive3DViewer from '../common/Interactive3DViewer';

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden py-12 lg:py-20 border-b border-slate-800">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-orange-400 font-bold uppercase tracking-wider text-[11px]">Next-Gen CoreXY</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300">Fusion3D Apex Pro Now Shipping Worldwide</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Print Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-200 to-orange-400">Imagination</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Precision desktop and industrial 3D printers, laser-gauged filaments (±0.02mm), 8K/12K UV resins, and hardened alloy components. Engineered for makers, robotics labs, and 24/7 print farms.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/shop"
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold rounded-xl text-sm shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all"
              >
                <span>Explore 3D Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/custom-quote"
                className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700/90 active:scale-95 text-slate-100 font-bold rounded-xl text-sm border border-slate-700 backdrop-blur-md flex items-center space-x-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>Instant Slicing Quote</span>
              </Link>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <p className="text-2xl font-extrabold text-white">600 <span className="text-sm font-semibold text-indigo-400">mm/s</span></p>
                <p className="text-xs text-slate-400 mt-0.5">Max Print Velocity</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">±0.02 <span className="text-sm font-semibold text-emerald-400">mm</span></p>
                <p className="text-xs text-slate-400 mt-0.5">Laser Diameter Spec</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">12K <span className="text-sm font-semibold text-orange-400">Resin</span></p>
                <p className="text-xs text-slate-400 mt-0.5">Sub-20μm Precision</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">2-Year <span className="text-sm font-semibold text-indigo-400">Warranty</span></p>
                <p className="text-xs text-slate-400 mt-0.5">Hardware Guarantee</p>
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive 3D Model Canvas */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              {/* Top tag */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                  <Cpu className="w-3.5 h-3.5 text-orange-400" />
                  <span>3D CAD Interactive Viewport</span>
                </span>
                <span className="text-[11px] text-slate-400">Click & Drag to Orbit</span>
              </div>

              {/* Three.js Canvas */}
              <Interactive3DViewer modelType="printer" defaultColor="#4f46e5" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
