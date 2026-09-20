import { Truck, CreditCard } from 'lucide-react';

export default function GromuseFeatureCards() {
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Blue Delivery Promo Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white p-6 sm:p-8 flex items-center justify-between overflow-hidden shadow-sm relative group">
          <div className="space-y-3 z-10 max-w-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
              <Truck className="w-3.5 h-3.5" />
              <span>Free delivery</span>
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              Get up to 50% off <br />
              Delivery by 12:15pm <br />
              Fast and free
            </h3>
          </div>

          {/* 3D Gift illustration */}
          <div className="w-28 sm:w-36 h-28 sm:h-36 flex items-center justify-center text-6xl sm:text-7xl group-hover:scale-110 transition-transform drop-shadow-lg">
            🎁
          </div>
        </div>

        {/* Gold Membership Promo Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#b45309] to-[#d97706] text-white p-6 sm:p-8 flex items-center justify-between overflow-hidden shadow-sm relative group">
          <div className="space-y-3 z-10 max-w-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Membership Card</span>
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              You can enjoy a 5% <br />
              discount using our <br />
              health card
            </h3>
          </div>

          {/* 3D Clock illustration */}
          <div className="w-28 sm:w-36 h-28 sm:h-36 flex items-center justify-center text-6xl sm:text-7xl group-hover:scale-110 transition-transform drop-shadow-lg">
            ⏰
          </div>
        </div>
      </div>
    </div>
  );
}
