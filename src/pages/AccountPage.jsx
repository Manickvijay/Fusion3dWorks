import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Cpu,
  Settings,
  Truck,
  Printer,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function AccountPage() {
  const { user, orders } = useShop();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'hardware' | 'settings'

  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr-1',
      isDefault: true,
      label: 'Primary Workshop / Lab',
      name: 'Alex Chen',
      company: 'HyperRobotics Lab',
      street: '742 Evergreen Terrace, Suite 200',
      city: 'San Jose',
      state: 'CA',
      zip: '95125',
      phone: '+1 (408) 555-0199'
    },
    {
      id: 'addr-2',
      isDefault: false,
      label: 'Home Maker Studio',
      name: 'Alex Chen',
      company: '',
      street: '1204 Pine Valley Drive',
      city: 'Sunnyvale',
      state: 'CA',
      zip: '94087',
      phone: '+1 (408) 555-0188'
    }
  ]);

  const [registeredMachines] = useState([
    {
      id: 'F3D-PRN-9921',
      model: 'Fusion3D Apex Pro CoreXY',
      serial: 'APX-2024-998124',
      firmware: 'v2.4.1 Klipper Native',
      warrantyExpires: 'November 14, 2026',
      status: 'Active (Online)'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Customer Dashboard</span>
        </div>

        {/* Profile Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">{user?.name || 'Alex Chen'}</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                    Pro Maker Tier
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{user?.email || 'alex.chen@additive.io'}</p>
                <div className="flex items-center space-x-3 mt-2 text-[11px] text-slate-400">
                  <span>Member Since: March 2024</span>
                  <span>•</span>
                  <span>Orders Placed: {orders.length}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                to="/custom-quote"
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
              >
                + New Custom CAD Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Main Tabs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-1">
            {[
              { id: 'orders', label: 'Order History', icon: Package, badge: orders.length },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
              { id: 'hardware', label: 'Hardware Registry', icon: Cpu },
              { id: 'settings', label: 'Profile & Security', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-slate-900">
                    Past Orders & Shipments
                  </h2>
                  <span className="text-xs text-slate-500">{orders.length} total orders recorded</span>
                </div>

                {orders.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
                    <p className="text-sm font-bold text-slate-800">No orders placed yet</p>
                    <Link to="/shop" className="mt-3 inline-block px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">
                      Browse 3D Products
                    </Link>
                  </div>
                ) : (
                  orders.map((ord) => {
                    let statusColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
                    let StatusIcon = Clock;

                    if (ord.status === 'Delivered') {
                      statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                      StatusIcon = CheckCircle2;
                    } else if (ord.status === 'In Transit' || ord.status === 'Shipped') {
                      statusColor = 'bg-amber-50 text-amber-700 border-amber-200';
                      StatusIcon = Truck;
                    }

                    return (
                      <div key={ord.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-mono font-black text-sm text-slate-900">{ord.id}</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-xs text-slate-500">{ord.date}</span>
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono">
                              Tracking: {ord.trackingNumber}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center space-x-1.5 ${statusColor}`}>
                              <StatusIcon className="w-3.5 h-3.5" />
                              <span>{ord.status}</span>
                            </span>
                            <span className="text-base font-black text-slate-900 ml-2">
                              ${ord.total.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs py-1">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-10 h-10 object-cover rounded-xl border border-slate-200"
                                />
                                <div>
                                  <Link to={`/product/${item.productId}`} className="font-bold text-slate-900 hover:text-indigo-600 line-clamp-1">
                                    {item.title}
                                  </Link>
                                  <span className="text-[11px] text-slate-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</span>
                                </div>
                              </div>
                              <span className="font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        {/* Order Action Buttons */}
                        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2">
                          <Link
                            to={`/track-order?tracking=${ord.trackingNumber}`}
                            className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs flex items-center space-x-1 transition-colors"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Track Package</span>
                          </Link>

                          <Link
                            to={`/invoice/${ord.id}`}
                            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center space-x-1 transition-colors"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Invoice</span>
                          </Link>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-slate-900">Saved Delivery Addresses</h2>
                  <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedAddresses.map(addr => (
                    <div key={addr.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-bold">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-800">{addr.name}</p>
                      {addr.company && <p className="text-xs text-slate-500">{addr.company}</p>}
                      <p className="text-xs text-slate-600">{addr.street}</p>
                      <p className="text-xs text-slate-600">{addr.city}, {addr.state} {addr.zip}</p>
                      <p className="text-xs text-slate-400 font-mono mt-2">{addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hardware Registry Tab */}
            {activeTab === 'hardware' && (
              <div className="space-y-4">
                <h2 className="text-lg font-black text-slate-900">Registered 3D Printers & Equipment</h2>
                {registeredMachines.map(m => (
                  <div key={m.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{m.model}</h4>
                        <p className="text-xs text-slate-500 font-mono">Serial: {m.serial}</p>
                        <p className="text-[11px] text-slate-400">Firmware: {m.firmware}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold inline-block mb-1">
                        {m.status}
                      </span>
                      <p className="text-[11px] text-slate-500">Warranty Active: {m.warrantyExpires}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <h2 className="text-lg font-black text-slate-900">Maker Account & Security</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Display Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Primary Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 outline-hidden"
                    />
                  </div>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-xs">
                  Save Changes
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
