import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Dr. Rajesh Nair',
    role: 'Head of Clinical Cardiology, MedCenter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    comment: 'The anatomical fidelity of the 3D heart model is extraordinary. The coronary sulcus and ventricles are clearly demarcated. We use it weekly in pre-operative surgical rehearsals.',
    rating: 5,
    verifiedPurchase: 'Anatomical Human Heart Study Model'
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Lead Automation Engineer, HyperRobotics',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    comment: 'The Fusion3D Apex Pro CoreXY is hands-down the best machine in our workshop. Running at 500mm/s with carbon-fiber PETG, it maintained ±0.05mm bore tolerances for our planetary gearboxes.',
    rating: 5,
    verifiedPurchase: 'Fusion3D Apex Pro 3D Printer'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Miniature Sculptor & Cosplay Artisan',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    comment: 'The 8K UV Photopolymer resin has virtually zero shrinkage. Microscopic rivets, cloth folds, and facial details printed with surgical clarity right out of the vat.',
    rating: 5,
    verifiedPurchase: '8K High-Definition Photopolymer UV Resin'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 block">
            Verified Customer Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trusted by 10,000+ Engineers, Surgeons & Makers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Read how Fusion3D Works accelerates rapid prototyping, medical modeling, and additive manufacturing workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center space-x-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                  </div>
                </div>

                <div className="flex items-center text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mt-1 w-fit">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  <span>Verified Purchase: {t.verifiedPurchase}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
