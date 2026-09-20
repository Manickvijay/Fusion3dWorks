import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Printer,
  Search,
  Flame,
  AlertCircle,
  Sparkles,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import CancelOrderModal from '../components/common/CancelOrderModal';

export default function OrderTrackingPage() {
  const [searchParams] = useSearchParams();
  const queryOrderId = searchParams.get('orderId');
  const { orders, customerApproveDesign, customerRequestDesignChanges, cancelOrder } = useShop();

  const [inputOrderId, setInputOrderId] = useState(queryOrderId || (orders && orders[0]?.id) || 'ORD-8821');
  const [selectedOrderId, setSelectedOrderId] = useState(queryOrderId || null);
  const [cancellingOrder, setCancellingOrder] = useState(null);

  const activeOrder = React.useMemo(() => {
    if (!orders || orders.length === 0) return null;
    const targetId = selectedOrderId || queryOrderId;
    if (targetId) {
      const found = orders.find(o => o.id.toLowerCase() === targetId.trim().toLowerCase());
      if (found) return found;
    }
    return orders[0];
  }, [orders, selectedOrderId, queryOrderId]);

  const handleSearchOrder = (e) => {
    e.preventDefault();
    if (!orders) return;
    const found = orders.find(o => o.id.toLowerCase() === inputOrderId.trim().toLowerCase());
    if (found) {
      setSelectedOrderId(found.id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header & Search */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <Printer className="w-3.5 h-3.5" />
          <span>Real-Time 3D Print Farm Tracking</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Track Your 3D Print Order
        </h1>
        <p className="text-xs text-slate-500">
          Monitor multi-stage engineering: CAD slicing, 3D design proof review, Bambu Lab A1 printing, and courier transit.
        </p>

        {/* Order Search Box */}
        <form onSubmit={handleSearchOrder} className="flex gap-2 max-w-md mx-auto pt-2">
          <input
            type="text"
            placeholder="Enter Order ID (e.g. ORD-8821)"
            value={inputOrderId}
            onChange={(e) => setInputOrderId(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-2xl text-xs font-mono font-bold text-slate-900 focus:outline-hidden focus:border-indigo-500 shadow-2xs uppercase"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Track</span>
          </button>
        </form>
      </div>

      {activeOrder ? (
        <div className="space-y-6">
          
          {/* Main Status Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    Print Job Order ID
                  </span>
                  {activeOrder.status === 'Cancelled' && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                      Cancelled
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-black font-mono tracking-tight">{activeOrder.id}</h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Placed on {activeOrder.date} • Recipient: {activeOrder.customerName}
                </p>
              </div>

              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm">
                  {activeOrder.statusProgress}%
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-200 block text-[11px]">Production Pipeline</span>
                  <span className="text-amber-300 font-extrabold text-sm">{activeOrder.status}</span>
                </div>
              </div>
            </div>

            {/* Print Farm Machine Telemetry */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Machine</span>
                <span className="font-bold text-slate-900 flex items-center space-x-1 mt-0.5">
                  <Printer className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{activeOrder.assignedPrinter || 'Bambu Lab A1 (AMS Lite)'}</span>
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Courier Dispatch</span>
                <span className="font-mono font-bold text-indigo-600 mt-0.5 block">
                  #{activeOrder.trackingNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Extrusion Specs</span>
                <span className="font-mono font-bold text-slate-900 mt-0.5 block flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>0.12mm / 220°C Nozzle</span>
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Dispatch</span>
                <span className="font-bold text-emerald-600 mt-0.5 block">
                  {activeOrder.estimatedCompletion}
                </span>
              </div>
            </div>

            {/* Interactive Design Proof Review Alert (Customer Point of View) */}
            {activeOrder.designProof && (
              <div className="p-5 bg-indigo-50/70 border-b border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span className="font-black text-indigo-900">3D Engineering Proof Review</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeOrder.designProof.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : activeOrder.designProof.status === 'Revision Requested'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-indigo-200 text-indigo-900'
                    }`}>
                      {activeOrder.designProof.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs">
                    {activeOrder.designProof.notes}
                  </p>
                </div>

                {activeOrder.designProof.status === 'Pending Customer Approval' && (
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => customerApproveDesign(activeOrder.id)}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs cursor-pointer flex items-center space-x-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve 3D Design</span>
                    </button>
                    <button
                      onClick={() => {
                        const note = prompt('Enter your requested adjustments for the 3D design team:');
                        if (note) customerRequestDesignChanges(activeOrder.id, note);
                      }}
                      className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl font-semibold cursor-pointer"
                    >
                      Request Revision
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 10-Stage Pipeline Timeline */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Production & Slicing Milestones (10 Stages)</h3>
                  <p className="text-xs text-slate-400">Track each technical checkpoint from order placement to door delivery</p>
                </div>
                {activeOrder.status !== 'Delivered' && activeOrder.status !== 'Cancelled' && (
                  <button
                    onClick={() => setCancellingOrder(activeOrder)}
                    className="text-xs text-rose-600 hover:text-rose-800 font-bold border border-rose-200 hover:bg-rose-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel Order
                  </button>
                )}
              </div>

              <div className="relative border-l-2 border-indigo-200 ml-4 pl-6 space-y-6">
                {(activeOrder.timeline || []).map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step.done
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className={`text-xs font-bold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.status}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">({step.time})</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{step.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items Summary in this order */}
            <div className="p-6 bg-slate-50/60 border-t border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-800">Order Specifications & Purchased 3D Items</h4>
              <div className="space-y-2">
                {(activeOrder.items || []).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
                      <div>
                        <span className="font-bold text-slate-900">{item.name}</span>
                        {item.customText && (
                          <span className="block text-[11px] font-mono text-indigo-600 font-semibold">
                            Embossed: "{item.customText}"
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 block">
                          Quantity: {item.quantity} • Machine Print Time: {item.printTime || '45m'}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono font-bold text-slate-900">
                      ${((item.price || 12.99) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="font-bold text-slate-800">Order Not Found</h3>
          <p className="text-xs text-slate-500">
            Please verify the order ID (e.g. ORD-8821) or check your customer profile order list.
          </p>
        </div>
      )}

      {/* Order Cancellation Reason Modal */}
      <CancelOrderModal
        order={cancellingOrder}
        isOpen={Boolean(cancellingOrder)}
        onClose={() => setCancellingOrder(null)}
        onConfirmCancel={cancelOrder}
      />

    </div>
  );
}
