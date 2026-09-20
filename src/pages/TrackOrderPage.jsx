import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Truck,
  Search,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const { orders } = useShop();

  const queryTracking = searchParams.get('tracking') || '';
  const defaultTracking = queryTracking || (orders[0]?.trackingNumber || 'F3D-TRK-88129');
  const [searchInput, setSearchInput] = useState(defaultTracking);
  const [activeTrackingNumber, setActiveTrackingNumber] = useState(defaultTracking);

  // Find matching order or fallback to simulated tracking
  const matchedOrder = orders.find(
    o => o.trackingNumber?.toLowerCase() === activeTrackingNumber.toLowerCase() ||
         o.id?.toLowerCase() === activeTrackingNumber.toLowerCase()
  ) || orders[0];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveTrackingNumber(searchInput.trim());
    }
  };

  const steps = [
    {
      title: 'Order Confirmed & Slicing Verified',
      desc: 'Order received and digital CAD parameters validated by quality assurance.',
      time: 'Oct 14, 09:30 AM',
      done: true
    },
    {
      title: 'Desiccant Vacuum Packaging',
      desc: 'Filament spools sealed with moisture indicators; 3D printer gantry secured with transport brackets.',
      time: 'Oct 14, 02:15 PM',
      done: true
    },
    {
      title: 'Dispatched from Fulfillment Hub',
      desc: 'Handed to FedEx Priority Freight at Reno Central Logistics Facility.',
      time: 'Oct 15, 08:40 AM',
      done: true
    },
    {
      title: 'In Transit to Regional Sorting Facility',
      desc: 'Arrived at San Jose Regional Freight Terminal. Out for delivery dispatch scan.',
      time: 'Oct 16, 06:12 AM',
      done: true
    },
    {
      title: 'Final Delivery & Signature',
      desc: 'Driver en route to recipient commercial address.',
      time: 'Estimated Oct 16, 02:00 PM',
      done: matchedOrder?.status === 'Delivered'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link to="/account" className="hover:text-indigo-600">Account</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Live Shipment Tracking</span>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            Track 3D Printing Orders & Shipments
          </h1>
          <p className="text-xs text-slate-500 mb-4">
            Enter your Fusion3D tracking code (e.g. F3D-TRK-88129) or Order ID to inspect live transit telemetry.
          </p>

          <form onSubmit={handleSearch} className="flex rounded-2xl overflow-hidden border border-slate-300 bg-white">
            <input
              type="text"
              placeholder="Enter Tracking Number or Order ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 px-4 py-3 text-xs text-slate-800 outline-hidden font-mono"
            />
            <button
              type="submit"
              className="px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center space-x-2 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Track</span>
            </button>
          </form>
        </div>

        {/* Tracking Details Card */}
        {matchedOrder && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8">
            
            {/* Carrier & Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
                  FedEx Ground Precision Freight
                </span>
                <h2 className="text-xl font-black text-slate-900 font-mono mt-0.5">
                  {matchedOrder.trackingNumber || activeTrackingNumber}
                </h2>
                <span className="text-xs text-slate-400">Order Ref: {matchedOrder.id}</span>
              </div>

              <div className="flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-2xl text-indigo-800">
                <Truck className="w-5 h-5 text-indigo-600 animate-pulse" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-500 block">Status</span>
                  <span className="text-xs font-black">{matchedOrder.status || 'In Transit'}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-6">
                Live Transit Checkpoints
              </h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                {steps.map((st, idx) => (
                  <div key={idx} className="relative flex items-start space-x-4">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      st.done ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-900">{st.title}</h4>
                        <span className="text-[11px] text-slate-400 font-mono">{st.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination & Package Specs */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Destination Address</span>
                <p className="font-bold text-slate-800">{matchedOrder.shippingAddress?.name}</p>
                <p className="text-slate-600">{matchedOrder.shippingAddress?.street}</p>
                <p className="text-slate-600">{matchedOrder.shippingAddress?.city}, {matchedOrder.shippingAddress?.state} {matchedOrder.shippingAddress?.zip}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Package Telemetry</span>
                <p className="text-slate-600">Weight: <strong>14.2 kg (Gross)</strong></p>
                <p className="text-slate-600">Handling: <strong>Shock-Sensor & Desiccant Monitored</strong></p>
                <Link
                  to={`/invoice/${matchedOrder.id}`}
                  className="mt-2 inline-flex items-center text-xs font-bold text-indigo-600 hover:underline"
                >
                  <FileText className="w-3.5 h-3.5 mr-1" />
                  <span>View Commercial Invoice</span>
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
