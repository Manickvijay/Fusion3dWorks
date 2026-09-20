import { ArrowRight, ShoppingBag } from 'lucide-react';

export default function GromuseHero({ onShopNow }) {
  return (
    <div className="relative bg-gradient-to-r from-[#115e59] via-[#0f4e4b] to-[#0c3c3a] text-white rounded-3xl overflow-hidden shadow-sm my-4">
      {/* Background subtle leaf / produce watermarks */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left Text content */}
        <div className="max-w-lg space-y-4 text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            We bring the store <br className="hidden sm:inline" />
            to your door
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-md">
            Get organic produce and sustainably sourced groceries delivery at up to 4% off grocery. Fast express delivery right to your kitchen counter.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              type="button"
              onClick={onShopNow}
              className="px-6 py-3 rounded-full bg-[#86efac] hover:bg-[#4ade80] text-emerald-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Shop now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Grocery Bag Graphic (matching video frame 00:01) */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <div className="relative w-64 sm:w-80 h-56 sm:h-64 flex items-center justify-center">
            {/* Bag container with fresh veggies */}
            <div className="relative z-10 w-52 sm:w-60 h-44 sm:h-52 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 p-3 shadow-2xl flex flex-col justify-between overflow-hidden border-2 border-emerald-400/30">
              {/* Veggies popping out top */}
              <div className="flex justify-around items-end -mt-6">
                <span className="text-3xl filter drop-shadow-md">🥦</span>
                <span className="text-4xl filter drop-shadow-md">🥕</span>
                <span className="text-3xl filter drop-shadow-md">🍅</span>
                <span className="text-4xl filter drop-shadow-md">🥬</span>
              </div>

              <div className="flex items-center justify-center py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-500/40 border border-emerald-300/40 flex items-center justify-center text-white">
                  <ShoppingBag className="w-8 h-8 text-[#86efac]" />
                </div>
              </div>

              <div className="bg-emerald-950/60 rounded-xl py-1.5 px-3 flex items-center justify-between text-[11px] font-bold text-emerald-200">
                <span>100% Organic</span>
                <span className="text-[#86efac]">Fresh Farm</span>
              </div>
            </div>

            {/* Glowing background circle */}
            <div className="absolute inset-0 bg-[#22c55e]/20 rounded-full filter blur-xl scale-90" />
          </div>
        </div>
      </div>
    </div>
  );
}
