import React from 'react';
import { Award, ShieldCheck, Gauge, Zap, Repeat, Headphones } from 'lucide-react';

const ADVANTAGES = [
  {
    icon: Gauge,
    title: 'Laser-Gauged Precision',
    description: 'Every spool of filament is measured using 3-axis continuous laser micrometers to ensure tight ±0.02mm diameter tolerances.'
  },
  {
    icon: ShieldCheck,
    title: '2-Year Hardware Warranty',
    description: 'All 3D printers and wash & cure stations include an unconditional 2-year warranty with direct factory replacement parts.'
  },
  {
    icon: Zap,
    title: 'High-Flow Volumetric Tuning',
    description: 'Our nozzles and hotends are engineered for 30mm³/s+ high volumetric flow rates, keeping up with modern 600mm/s CoreXY speeds.'
  },
  {
    icon: Repeat,
    title: 'Print-It-Forward Standards',
    description: 'Custom functional parts are printed strictly to Voron Design and aerospace standards: 4+ perimeters, 40% gyroid infill.'
  },
  {
    icon: Award,
    title: 'Certified Non-Toxic Formulations',
    description: 'Medical and cosmetic grade PLA+ filaments and plant-based resins certified free of heavy metals and harsh VOC off-gassing.'
  },
  {
    icon: Headphones,
    title: '7-Day Engineer Support',
    description: 'Direct phone, email, and live video troubleshooting with experienced additive manufacturing engineers.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1 block">
            The Fusion3D Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Why Makers & Industrial Labs Choose Fusion3D Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Engineered from the ground up for zero downtime, consistent layer bonding, and high repeatability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADVANTAGES.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 hover:bg-slate-950 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {adv.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
