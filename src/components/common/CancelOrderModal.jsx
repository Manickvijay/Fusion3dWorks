import React, { useState } from 'react';
import { AlertTriangle, X, CheckCircle2 } from 'lucide-react';

const COMMON_REASONS = [
  'Ordered by mistake',
  'Need to change custom lettering or color swatches',
  'Delivery time does not meet my event or birthday date',
  'Found an alternative gift option',
  'Incorrect delivery address entered',
  'Other reason (please describe below)'
];

export default function CancelOrderModal({ order, isOpen, onClose, onConfirmCancel }) {
  const [selectedReason, setSelectedReason] = useState(COMMON_REASONS[0]);
  const [customNotes, setCustomNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !order) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const finalReason = selectedReason === 'Other reason (please describe below)'
      ? (customNotes.trim() || 'Other reason')
      : (customNotes.trim() ? `${selectedReason} - ${customNotes.trim()}` : selectedReason);

    onConfirmCancel(order.id, finalReason);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Cancel Order #{order.id}
              </h3>
              <p className="text-xs text-slate-500">
                Please select a reason to cancel your 3D printing order
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary Pill */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Refund Amount</span>
            <span className="text-base font-black text-slate-900 font-mono">
              ${Number(order.total || 0).toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Current Stage</span>
            <span className="font-bold text-indigo-600">
              {order.status}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              Reason for Cancellation:
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {COMMON_REASONS.map((reason) => (
                <label
                  key={reason}
                  onClick={() => setSelectedReason(reason)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedReason === reason
                      ? 'border-rose-500 bg-rose-50/50 text-slate-900 font-semibold shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="radio"
                      name="cancellationReason"
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className="text-rose-600 focus:ring-rose-500 h-3.5 w-3.5"
                    />
                    <span>{reason}</span>
                  </div>
                  {selectedReason === reason && (
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Optional Extra Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">
              Additional Details (Optional):
            </label>
            <textarea
              rows={2}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Tell us what went wrong or how we can improve..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-rose-500 focus:bg-white resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              Keep Order
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20 active:scale-98 cursor-pointer"
            >
              {isSubmitting ? 'Cancelling...' : 'Confirm Order Cancellation'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
