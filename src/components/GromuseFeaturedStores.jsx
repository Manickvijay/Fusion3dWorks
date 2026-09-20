import { ArrowRight, Zap } from 'lucide-react';
import { FEATURED_STORES } from '../data/groceryProducts';

export default function GromuseFeaturedStores({ onSelectStore }) {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Featured store
        </h2>
        <button
          type="button"
          onClick={() => onSelectStore?.('all')}
          className="text-rose-500 hover:text-rose-600 text-xs sm:text-sm font-bold flex items-center gap-1 group"
        >
          <span>Visit all stores</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FEATURED_STORES.map((store) => (
          <div
            key={store.id}
            onClick={() => onSelectStore?.(store.id)}
            className={`bg-gradient-to-r ${store.bgColor} text-white rounded-2xl p-6 relative overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-200 group`}
          >
            {/* Background circular highlight */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform" />

            <div className="flex items-center gap-4 relative z-10">
              {/* Store Icon Badge */}
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white font-black text-lg border border-white/30 shadow-xs">
                {store.logoText}
              </div>

              <div>
                <h3 className="font-black text-lg text-white">
                  {store.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium mt-1">
                  <Zap className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                  <span>{store.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
