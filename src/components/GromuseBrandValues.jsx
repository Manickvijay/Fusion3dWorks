import { Ticket, Gift, Smartphone, ShoppingCart, Home } from 'lucide-react';

export default function GromuseBrandValues() {
  const values = [
    {
      id: 'v1',
      title: 'Gromuse Gift vouchers.',
      icon: Ticket,
      art: '🎟️'
    },
    {
      id: 'v2',
      title: 'Present a gift card',
      icon: Gift,
      art: '🎁'
    },
    {
      id: 'v3',
      title: 'Pay your tabby invoice',
      icon: Smartphone,
      art: '📱'
    },
    {
      id: 'v4',
      title: 'Order and Collect',
      icon: ShoppingCart,
      art: '🛒'
    },
    {
      id: 'v5',
      title: 'Deliver to your home',
      icon: Home,
      art: '🏡'
    }
  ];

  return (
    <div className="my-8 rounded-3xl bg-gradient-to-b from-[#d9f99d] to-[#bef264] text-gray-900 p-6 sm:p-12 shadow-xs">
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl font-black text-emerald-950 tracking-tight">
          We always provide you the best in town
        </h2>
        <p className="text-xs sm:text-sm text-emerald-900/80 max-w-2xl mx-auto leading-relaxed">
          Since 2007 we have been delivering excellence in product development, support &amp; updates for frictionless shopping experiences.
        </p>
      </div>

      {/* 5 Archway Cards matching frame 00:25 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {values.map((v) => {
          const Icon = v.icon;
          return (
            <div
              key={v.id}
              className="bg-[#0b3b3c] text-white rounded-t-3xl rounded-b-2xl p-5 flex flex-col justify-between items-center text-center h-64 border-t-4 border-[#86efac] shadow-md hover:-translate-y-1 transition-transform group"
            >
              <h3 className="font-bold text-sm text-white pt-2 leading-snug">
                {v.title}
              </h3>

              {/* Central Art & Icon */}
              <div className="my-auto flex flex-col items-center">
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {v.art}
                </span>
                <div className="w-10 h-10 rounded-full bg-emerald-900/60 border border-emerald-400/30 flex items-center justify-center text-[#86efac]">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <span className="text-[10px] text-emerald-200 uppercase tracking-widest font-bold pb-1">
                Gromuse Service
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
