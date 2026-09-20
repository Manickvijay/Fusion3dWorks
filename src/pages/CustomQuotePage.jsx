import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Layers, ShieldCheck, CheckCircle2, Cpu, Wrench } from 'lucide-react';
import CustomPrintCalculator from '../components/customer/CustomPrintCalculator';

export default function CustomQuotePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Custom 3D Printing Service</span>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl border border-slate-800">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Additive On-Demand Manufacturing</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Rapid Precision 3D Printing Service
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Upload your CAD models (.STL, .OBJ, .STEP) for automated geometry analysis, instant volumetric pricing, and 48-hour dispatched manufacturing in carbon-fiber composites and sub-micron resins.
            </p>
          </div>
        </div>

        {/* Calculator Component */}
        <CustomPrintCalculator />

        {/* Material & Capability Guide */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Supported Materials & Mechanical Properties
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-extrabold text-indigo-600 uppercase">HyperSpeed PLA+</span>
              <p className="font-bold text-slate-800 text-sm">Visual Prototypes & Concept Rigs</p>
              <p className="text-slate-600 leading-relaxed">
                Smooth surface quality, zero warping, bio-based non-toxic resin with enhanced impact modifier. Heat deflection: 55°C.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-extrabold text-orange-500 uppercase">PETG-CF (Carbon Fiber)</span>
              <p className="font-bold text-slate-800 text-sm">Robotics & Functional Gears</p>
              <p className="text-slate-600 leading-relaxed">
                Reinforced with 15% chopped high-modulus carbon fiber. Extreme rigidity, matte textured finish. Heat deflection: 80°C.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-extrabold text-emerald-600 uppercase">8K High-Definition UV Resin</span>
              <p className="font-bold text-slate-800 text-sm">Sub-Micron Miniatures & Medical</p>
              <p className="text-slate-600 leading-relaxed">
                Virtually invisible 20-micron layer lines. Razor-sharp overhangs and smooth organic contours without layer stepping.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
