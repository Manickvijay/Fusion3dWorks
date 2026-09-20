import { PROMO_DISCOUNTS } from '../data/groceryProducts';

export default function GromusePromoCards({ onSelectPromo }) {
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROMO_DISCOUNTS.map((promo) => (
          <div
            key={promo.id}
            onClick={() => onSelectPromo?.(promo)}
            className={`${promo.bgColor} rounded-3xl p-5 border border-white/60 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden relative group`}
          >
            {/* Top Text */}
            <div className="space-y-1 relative z-10">
              <span className="text-xs font-bold text-gray-700 block">
                {promo.title}
              </span>
              <div className={`text-2xl sm:text-3xl font-black ${promo.textColor} tracking-tight`}>
                {promo.amount}
              </div>
              <p className="text-[11px] text-gray-600 leading-snug pt-1 max-w-[150px]">
                {promo.subtitle}
              </p>
            </div>

            {/* Bottom Product Image */}
            <div className="mt-4 flex items-center justify-end relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
