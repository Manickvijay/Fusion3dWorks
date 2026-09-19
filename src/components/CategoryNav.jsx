import {
  Smartphone,
  Shirt,
  Tv,
  Home,
  Wrench,
  Sparkles,
  ShoppingBag,
  Bike,
  Smile,
  ChevronDown
} from 'lucide-react';

const FLIPKART_CATEGORIES = [
  { id: 'all', name: 'Top Offers', icon: Sparkles, color: 'text-rose-600 bg-rose-50' },
  { id: 'mechanical', name: 'Mobiles & Tech', icon: Smartphone, color: 'text-blue-600 bg-blue-50' },
  { id: 'figurines', name: 'Fashion & Cosplay', icon: Shirt, color: 'text-purple-600 bg-purple-50' },
  { id: 'materials', name: 'Electronics', icon: Tv, color: 'text-amber-600 bg-amber-50' },
  { id: 'decor', name: 'Home & Decor', icon: Home, color: 'text-emerald-600 bg-emerald-50' },
  { id: 'medical', name: 'Medical Anatomy', icon: ShoppingBag, color: 'text-cyan-600 bg-cyan-50' },
  { id: 'custom', name: '3D Printing Lab', icon: Wrench, color: 'text-orange-600 bg-orange-50', hasDropdown: true },
  { id: 'figurines', name: 'Beauty & Toys', icon: Smile, color: 'text-pink-600 bg-pink-50' },
  { id: 'mechanical', name: 'Auto & Drone Parts', icon: Bike, color: 'text-indigo-600 bg-indigo-50' }
];

export default function CategoryNav({ selectedCategory, onSelectCategory, onOpenCustomQuote }) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between overflow-x-auto py-3 scrollbar-none gap-4 md:gap-8">
          {FLIPKART_CATEGORIES.map((cat, index) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  if (cat.id === 'custom') {
                    onOpenCustomQuote();
                  } else {
                    onSelectCategory(cat.id);
                  }
                }}
                className="flex flex-col items-center gap-1 min-w-[70px] sm:min-w-[85px] group cursor-pointer text-center"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    cat.color
                  } group-hover:scale-110 shadow-xs ${
                    isSelected ? 'ring-2 ring-[#2874f0]' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-0.5 text-xs font-bold text-gray-800 group-hover:text-[#2874f0] transition-colors whitespace-nowrap">
                  <span>{cat.name}</span>
                  {cat.hasDropdown && (
                    <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-[#2874f0]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
