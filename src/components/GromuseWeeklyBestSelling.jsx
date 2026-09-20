import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { WEEKLY_TABS } from '../data/groceryProducts';
import GromuseProductCard from './GromuseProductCard';

export default function GromuseWeeklyBestSelling({
  products,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onSelectProduct,
  onSeeMore
}) {
  const [activeTab, setActiveTab] = useState('frozen');

  // Filter items based on activeTab
  const filteredProducts = products.filter(p => {
    if (activeTab === 'frozen') return p.category === 'frozen' || p.category === 'meat';
    if (activeTab === 'vegetables') return p.category === 'vegetables';
    if (activeTab === 'snacks') return p.category === 'snacks';
    if (activeTab === 'chicken') return p.category === 'chicken';
    if (activeTab === 'meat') return p.category === 'meat';
    if (activeTab === 'dairy') return p.category === 'dairy';
    if (activeTab === 'fruits') return p.category === 'fruits';
    return true;
  }).slice(0, 5); // display 5 in a row as in video frame 00:17

  // Helper to get cart quantity for item
  const getQuantity = (id) => {
    const item = cartItems.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Weekly best selling items
        </h2>
        <button
          type="button"
          onClick={onSeeMore}
          className="text-rose-500 hover:text-rose-600 text-xs sm:text-sm font-bold flex items-center gap-1 group w-fit"
        >
          <span>See more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Category Tabs Strip matching frame 00:17 - 00:19 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
        {WEEKLY_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#115e59] text-white shadow-xs'
                  : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 5-Column Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
        {filteredProducts.map((product) => (
          <GromuseProductCard
            key={product.id}
            product={product}
            quantity={getQuantity(product.id)}
            onAddToCart={onAddToCart}
            onUpdateQuantity={onUpdateQuantity}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
}
