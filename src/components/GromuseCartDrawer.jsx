import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Zap } from 'lucide-react';

export default function GromuseCartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onCheckout
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 25 ? 0 : 2.99;
  const total = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#0d4243] text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#86efac]" />
            <h2 className="font-black text-lg">My Shopping Cart</h2>
            <span className="bg-[#115e59] text-[#86efac] text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs text-rose-300 hover:text-white underline cursor-pointer mr-1"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 15 min delivery guarantee banner */}
        <div className="bg-[#dcfce7] px-4 py-2 text-xs text-[#166534] font-bold flex items-center gap-2">
          <Zap className="w-4 h-4 fill-emerald-600 text-emerald-600 animate-pulse" />
          <span>Express 15-minute doorstep delivery guaranteed!</span>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400 space-y-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-300">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-gray-700">Your basket is empty</p>
                <p className="text-xs text-gray-400 mt-1">Explore our fresh produce and add groceries to your door.</p>
              </div>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-gray-50/70 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="w-14 h-14 bg-white rounded-xl p-1 flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-gray-900 truncate">
                    {item.title}
                  </h4>
                  <div className="text-[11px] text-gray-400">
                    {item.weight || '500 gm.'}
                  </div>
                  <div className="text-xs font-black text-gray-900 mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center bg-white border border-gray-200 rounded-lg p-0.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    {item.quantity === 1 ? (
                      <Trash2 className="w-3 h-3 text-rose-500" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                  </button>

                  <span className="w-7 text-center font-bold text-xs text-gray-800">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-white space-y-3">
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>15-Min Express Delivery</span>
                <span className="font-bold text-emerald-600">
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-100">
                <span>Total Amount</span>
                <span className="text-emerald-700">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0d4243] hover:bg-[#115e59] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
