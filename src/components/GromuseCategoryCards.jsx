import { ArrowRight } from 'lucide-react';
import { GROCERY_CATEGORIES } from '../data/groceryProducts';

export default function GromuseCategoryCards({
  selectedCategory,
  onSelectCategory,
  onSeeAll
}) {
  return (
    <div className="py-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
        {GROCERY_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`bg-white rounded-2xl p-4 border transition-all duration-200 cursor-pointer flex flex-col justify-between items-start group hover:shadow-md hover:border-emerald-300 ${
                isSelected ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm' : 'border-gray-100'
              }`}
            >
              <div>
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {cat.subtext}
                </p>
              </div>

              <div className="w-full flex justify-end mt-3">
                <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* "See all" card matching video */}
        <div
          onClick={onSeeAll}
          className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-emerald-300 transition-all duration-200 cursor-pointer flex flex-col justify-between items-start group hover:shadow-md"
        >
          <div>
            <h3 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700 transition-colors">
              See all
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Browse store
            </p>
          </div>

          <div className="w-full flex justify-end mt-3">
            <div className="w-12 h-12 rounded-full bg-[#86efac]/50 hover:bg-[#86efac] text-emerald-950 flex items-center justify-center transition-all group-hover:scale-110 shadow-xs">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
