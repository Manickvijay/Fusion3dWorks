import { Plus, Minus, Trash2 } from 'lucide-react';

export default function GromuseProductCard({
  product,
  quantity = 0,
  onAddToCart,
  onUpdateQuantity,
  onSelectProduct
}) {
  // Format price e.g. 17.29$ -> main number and cents
  const formattedPrice = Number(product.price).toFixed(2);
  const [dollars, cents] = formattedPrice.split('.');

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col justify-between p-4 group">
      {/* Product Image Clickable to open Product Detail View */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative flex items-center justify-center p-3 h-40 cursor-pointer overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="pt-2 flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-bold text-sm text-gray-900 hover:text-emerald-700 cursor-pointer line-clamp-1 leading-snug"
            title={product.title}
          >
            {product.title}
          </h3>

          <p className="text-xs text-gray-400 font-medium mt-0.5">
            {product.weight || '500 gm.'}
          </p>
        </div>

        {/* Price & Quantity Stepper */}
        <div className="mt-3 space-y-2">
          {/* Price display with authentic Gromuse styling */}
          <div className="flex items-baseline gap-0.5 text-gray-900">
            <span className="text-xl font-black tracking-tight">{dollars}.</span>
            <span className="text-sm font-bold">{cents}$</span>
          </div>

          {/* Interactive Stepper Button matching video frames 00:04, 00:07, 00:08 */}
          {quantity > 0 ? (
            <div className="flex items-center justify-between bg-[#dcfce7] text-[#166534] rounded-xl px-2 py-1.5 transition-all shadow-xs border border-emerald-300">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateQuantity(product.id, quantity - 1);
                }}
                className="w-7 h-7 rounded-lg bg-white/80 hover:bg-white text-[#166534] flex items-center justify-center shadow-xs transition-transform active:scale-95"
                title="Decrease"
              >
                {quantity === 1 ? (
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                ) : (
                  <Minus className="w-3.5 h-3.5" />
                )}
              </button>

              <span className="font-black text-sm px-2">
                {quantity}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product, 1);
                }}
                className="w-7 h-7 rounded-lg bg-white/80 hover:bg-white text-[#166534] flex items-center justify-center shadow-xs transition-transform active:scale-95"
                title="Increase"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product, 1);
              }}
              className="w-full py-2 bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#166534] rounded-xl font-bold flex items-center justify-center transition-colors active:scale-98 shadow-xs cursor-pointer"
              title="Add to cart"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
