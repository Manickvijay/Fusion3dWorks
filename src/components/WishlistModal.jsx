import {
  X,
  Heart,
  ShoppingCart,
  Trash2,
  Box
} from 'lucide-react';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="font-extrabold text-base">My Wishlist ({wishlist.length})</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Your Wishlist is Empty</h3>
              <p className="text-xs text-gray-500">
                Click the heart icon on any 3D model or filament to save it for later!
              </p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-2xs hover:border-gray-300"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border border-gray-200 cursor-pointer"
                  style={{ backgroundColor: item.color || '#2563eb' }}
                  onClick={() => {
                    onClose();
                    onSelectProduct(item);
                  }}
                >
                  <Box className="w-6 h-6 text-white/90" />
                </div>

                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSelectProduct(item);
                  }}
                >
                  <h4 className="font-bold text-xs text-gray-900 truncate hover:text-blue-600">
                    {item.title}
                  </h4>
                  <div className="text-xs font-black text-gray-900 mt-0.5">
                    ₹{item.price.toLocaleString('en-IN')}{' '}
                    <span className="text-[10px] text-gray-600 line-through font-normal">
                      ₹{item.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(item, 1);
                      onRemoveFromWishlist(item.id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemoveFromWishlist(item.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
