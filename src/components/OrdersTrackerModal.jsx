import {
  X,
  Package,
  Box
} from 'lucide-react';

export default function OrdersTrackerModal({ isOpen, onClose, orders, onOpenCustomQuote }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="font-extrabold text-base">Your 3D Print Orders & Tracking</h2>
              <span className="text-[11px] text-slate-300">
                Live monitoring from our industrial FDM and SLA print farm
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Box className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-800 text-base">No Orders Placed Yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Explore our catalog of medical models, precision gears, filaments, or upload an STL to initiate a custom print!
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCustomQuote();
                }}
                className="mt-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
              >
                Upload STL for Instant Quote
              </button>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="border border-gray-200 rounded-xl p-4 bg-white shadow-2xs space-y-3"
              >
                {/* Order Top Banner */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100 text-xs">
                  <div>
                    <span className="text-gray-500">Order ID: </span>
                    <strong className="font-mono text-gray-900">{ord.id}</strong>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-gray-500">Date: </span>
                    <span className="text-gray-800">{ord.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold text-[11px] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                      <span>{ord.status}</span>
                    </span>
                    <span className="font-bold text-gray-900">
                      ₹{ord.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Print Progress Bar */}
                <div className="space-y-1 bg-slate-900 text-white p-3 rounded-lg text-xs">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-cyan-400 flex items-center gap-1">
                      <Box className="w-3.5 h-3.5 animate-spin" />
                      <span>Printer CoreXY Farm Job In-Flight</span>
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {ord.progress || 45}% Layer Height Complete
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full"
                      style={{ width: `${ord.progress || 45}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                    <span>Est. Delivery: {ord.estimatedDelivery}</span>
                    <span>Tracking: Bluedart Express Air</span>
                  </div>
                </div>

                {/* Items in Order */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-gray-700 block uppercase tracking-wider">
                    Ordered 3D Works:
                  </span>
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                          style={{ backgroundColor: item.color || '#3b82f6' }}
                        />
                        <span className="font-medium text-gray-800 line-clamp-1">{item.title}</span>
                      </div>
                      <span className="font-mono text-gray-600 shrink-0">
                        {item.quantity}x • ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                <div className="bg-gray-50 p-2.5 rounded-lg text-[11px] text-gray-600">
                  <span className="font-bold text-gray-800">Ship to: </span>
                  <span>{ord.address}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
