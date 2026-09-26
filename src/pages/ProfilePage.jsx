import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User,
  Layers,
  Heart,
  FileText,
  Truck,
  CheckCircle2,
  Printer,
  Sparkles,
  Edit2,
  Save,
  Box,
  X,
  LogIn,
  ArrowRight,
  ShieldCheck,
  Lock,
  Key
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import CancelOrderModal from '../components/common/CancelOrderModal';

export default function ProfilePage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'orders';
  const [activeTab, setActiveTab] = useState(initialTab);

  const {
    currentUser,
    orders,
    wishlist,
    products,
    cancelOrder,
    customerApproveDesign,
    customerRequestDesignChanges,
    setIsLoginModalOpen,
    updateUserProfile,
    changePassword,
    authToken
  } = useShop();

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Active user's profile state
  const [profileData, setProfileData] = useState(() => ({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    favoriteMaterial: currentUser?.favoriteMaterial || 'PLA+ Silk PolyTerra',
    favoriteColor: currentUser?.favoriteColor || 'Silk Gold'
  }));

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [cancellingOrder, setCancellingOrder] = useState(null);

  const startEditingProfile = () => {
    setProfileData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      address: currentUser?.address || '',
      favoriteMaterial: currentUser?.favoriteMaterial || 'PLA+ Silk PolyTerra',
      favoriteColor: currentUser?.favoriteColor || 'Silk Gold'
    });
    setIsEditingProfile(true);
  };

  // Filter orders for current user
  const userOrders = (orders || []).filter(
    o => currentUser?.email && (o.customerEmail || '').toLowerCase() === currentUser.email.toLowerCase()
  );

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
    await updateUserProfile(profileData);
  };

  // Wishlisted products
  const savedProducts = (products || []).filter(p => (wishlist || []).includes(p.id));

  // If user is not logged in, show guest prompt
  if (!currentUser) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-lg shadow-indigo-100">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sign In to Your 3D Printing Account</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Log in or create a new account to track your real-time 3D print progress, view design proofs, manage delivery addresses, and save favorites.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/25 inline-flex items-center space-x-2 transition-all cursor-pointer text-sm"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="relative">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'}
              alt={profileData.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-indigo-400/50 shadow-xl"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">{profileData.name}</h1>
            </div>
            <p className="text-xs text-slate-300 font-mono">{profileData.email}</p>
            <p className="text-[11px] text-slate-400">{currentUser?.memberSince || 'Member since 2026'}</p>
          </div>
        </div>

        {/* Clean Stats - Success Print Removed as per user directive */}
        <div className="flex items-center gap-4 text-center">
          <div className="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10">
            <span className="text-xl font-black font-mono text-amber-400 block">{userOrders.length}</span>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Total Orders</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10">
            <span className="text-xl font-black font-mono text-cyan-400 block">{savedProducts.length}</span>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Saved Items</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10">
            <span className="text-xl font-black font-mono text-indigo-300 block">
              ${userOrders.reduce((sum, o) => sum + (o.total || 0), 0).toFixed(2)}
            </span>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Total Value</span>
          </div>
        </div>

      </div>

      {/* Tabs Menu */}
      <div className="flex items-center space-x-2 border-b border-slate-200 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>My 3D Print Orders ({userOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Details & Addresses</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'wishlist'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({savedProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'security'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Security & Password</span>
        </button>
      </div>

      {/* Tab 1: Orders & Live Print Tracking */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Active & Past 3D Print Orders</h2>
              <p className="text-xs text-slate-500">
                Track slicing progress, live extruder temperatures, and courier delivery.
              </p>
            </div>
            <Link
              to="/"
              className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-bold transition-colors"
            >
              + Queue New Print
            </Link>
          </div>

          {userOrders.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
              <Box className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700">No Orders Placed Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Customize your first 3D keychain, cake topper, or signboard to see real-time print tracking here!
              </p>
              <Link
                to="/"
                className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold mt-2"
              >
                Browse Creations
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {userOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Order Top Bar */}
                  <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {order.id}
                      </span>
                      <span className="text-slate-500">
                        Placed on {order.date} at {order.time}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center space-x-1.5 ${
                        order.status === 'Printing'
                          ? 'bg-amber-100 text-amber-800'
                          : order.status === 'Quality Check'
                          ? 'bg-indigo-100 text-indigo-800'
                          : order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        <Printer className="w-3.5 h-3.5" />
                        <span>Status: {order.status}</span>
                      </span>

                      <button
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Invoice</span>
                      </button>

                      <Link
                        to={`/track-order?orderId=${order.id}`}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold flex items-center space-x-1 transition-colors"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Live Tracker</span>
                      </Link>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-5 space-y-4">
                    
                    {/* Items in Order */}
                    <div className="space-y-3">
                      {(order.items || []).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-slate-100"
                            />
                            <div>
                              <h4 className="font-bold text-slate-900">{item.name}</h4>
                              {item.customText && (
                                <p className="text-[11px] text-indigo-600 font-mono font-semibold">
                                  Custom Text: "{item.customText}"
                                </p>
                              )}
                              <p className="text-[10px] text-slate-400">
                                Qty: {item.quantity} • Unit Print Time: {item.printTime || '45m'}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-mono font-bold text-slate-900 text-sm">
                              ${((item.price || 12.99) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="pt-3 border-t border-slate-100 space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-700 flex items-center space-x-1">
                          <Printer className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Assigned Machine: {order.assignedPrinter || 'Bambu Lab X1-Carbon #1'}</span>
                        </span>
                        <span className="font-mono font-bold text-indigo-600">
                          {order.statusProgress}% Completed
                        </span>
                      </div>

                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${order.statusProgress}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                        <span>Tracking: #{order.trackingNumber}</span>
                        <span>Estimated Ready: {order.estimatedCompletion}</span>
                      </div>
                    </div>

                    {/* Customer Design Proof Review Section */}
                    {order.designProof && (
                      <div className="p-3.5 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1.5 font-bold text-indigo-900">
                            <Sparkles className="w-4 h-4 text-indigo-600" />
                            <span>Engineering 3D Design Proof:</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            order.designProof.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.designProof.status === 'Revision Requested'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-indigo-200 text-indigo-900 animate-pulse'
                          }`}>
                            {order.designProof.status}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-600">
                          {order.designProof.notes || 'Admin engineer has prepared the CAD geometry and multi-material color slice.'}
                        </p>

                        {order.designProof.status === 'Pending Customer Approval' && (
                          <div className="flex items-center space-x-2 pt-1">
                            <button
                              onClick={() => customerApproveDesign(order.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                              <span>Approve Proof for Printing</span>
                            </button>
                            <button
                              onClick={() => {
                                const note = prompt('Enter your requested adjustments for the 3D design team:');
                                if (note) customerRequestDesignChanges(order.id, note);
                              }}
                              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                            >
                              Request Changes
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 30-Minute Cancellation Option */}
                    {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-400">
                          Need adjustments? Orders can be self-canceled within 30 minutes of placement.
                        </span>
                        <button
                          onClick={() => setCancellingOrder(order)}
                          className="px-3 py-1 text-rose-600 hover:bg-rose-50 rounded-lg font-bold border border-rose-200 text-[11px] transition-colors cursor-pointer"
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Profile Details & Address */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">E-Commerce Customer Profile</h2>
              <p className="text-xs text-slate-500">
                Manage your shipping destinations, contact information, and 3D print preferences.
              </p>
            </div>
            <button
              onClick={() => isEditingProfile ? setIsEditingProfile(false) : startEditingProfile()}
              className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Full Name</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 disabled:opacity-75 disabled:bg-slate-100/60 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Email Address (Login ID)</label>
                <input
                  type="email"
                  disabled
                  value={profileData.email}
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Phone Number (For Delivery SMS)</label>
                <input
                  type="tel"
                  disabled={!isEditingProfile}
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 disabled:opacity-75 disabled:bg-slate-100/60 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Default Shipping Address</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 disabled:opacity-75 disabled:bg-slate-100/60 font-medium"
                />
              </div>
            </div>

            {/* 3D Printing Specific Preferences */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>3D Printing Preferences</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Preferred Filament Material</label>
                  <select
                    disabled={!isEditingProfile}
                    value={profileData.favoriteMaterial}
                    onChange={(e) => setProfileData({ ...profileData, favoriteMaterial: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 disabled:opacity-75 disabled:bg-slate-100/60 font-medium"
                  >
                    <option>PLA+ Silk PolyTerra (Radiant Shine)</option>
                    <option>Tough Matte PLA (Durable & Crisp)</option>
                    <option>Food-Safe Bio Resin (Cake Toppers)</option>
                    <option>High-Temp PETG (Waterproof & Outdoor)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Default Accent Color Choice</label>
                  <select
                    disabled={!isEditingProfile}
                    value={profileData.favoriteColor}
                    onChange={(e) => setProfileData({ ...profileData, favoriteColor: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 disabled:opacity-75 disabled:bg-slate-100/60 font-medium"
                  >
                    <option>Silk Gold</option>
                    <option>Cyber Cyan</option>
                    <option>Neon Coral</option>
                    <option>Stealth Black</option>
                    <option>Champagne Rose</option>
                  </select>
                </div>
              </div>
            </div>

            {isEditingProfile && (
              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}

          </form>
        </div>
      )}

      {/* Tab 3: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900">Your Saved 3D Creations</h2>
          {savedProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-2">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">No saved products. Click the heart icon on any item to save it!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {savedProducts.map(p => (
                <div key={p.id} className="bg-white rounded-3xl border border-slate-200 p-4 space-y-3">
                  <img src={p.image} alt={p.name} className="w-full aspect-square rounded-2xl object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 truncate">{p.name}</h4>
                    <p className="text-indigo-600 font-bold font-mono text-sm mt-1">${p.price.toFixed(2)}</p>
                  </div>
                  <Link
                    to={`/product/${p.id}`}
                    className="block w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-center text-xs font-bold rounded-xl"
                  >
                    View & Customize
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Security & Authentication */}
      {activeTab === 'security' && (
        <div className="max-w-2xl space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Account Security & Credentials</h3>
                <p className="text-xs text-slate-500">
                  Update your authentication credentials and monitor cryptographic session security.
                </p>
              </div>
            </div>

            {/* Session Security Overview */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Session Status:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active & Authenticated
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Access Role:</span>
                <span className="font-mono font-bold uppercase text-slate-800">{currentUser?.role || 'customer'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Token Protection:</span>
                <span className="font-mono text-[11px] text-slate-600">
                  {authToken ? 'HMAC-SHA256 Signed' : 'Local Session'}
                </span>
              </div>
            </div>

            {/* Change Password Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setPasswordError('');
                setPasswordSuccess('');

                if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                  setPasswordError('New password and confirmation do not match.');
                  return;
                }
                if (passwordForm.newPassword.length < 4) {
                  setPasswordError('New password must be at least 4 characters.');
                  return;
                }

                setIsUpdatingPassword(true);
                const res = await changePassword(passwordForm.oldPassword, passwordForm.newPassword);
                setIsUpdatingPassword(false);

                if (res?.success) {
                  setPasswordSuccess('Password successfully updated!');
                  setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
                } else {
                  setPasswordError(res?.message || 'Failed to update password.');
                }
              }}
              className="space-y-4 pt-2"
            >
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Change Password
              </h4>

              {passwordError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
                  {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs">
                  {passwordSuccess}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Key className="w-3.5 h-3.5" />
                <span>{isUpdatingPassword ? 'Updating Password...' : 'Save New Password'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">FUSION3D WORKS INVOICE</h3>
                <p className="text-slate-400 font-mono text-[11px]">Invoice #{selectedInvoiceOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[11px] bg-slate-50 p-3 rounded-2xl">
              <div>
                <span className="text-slate-400 block font-semibold">Billed To:</span>
                <span className="font-bold text-slate-800">{selectedInvoiceOrder.customerName}</span>
                <p className="text-slate-500">{selectedInvoiceOrder.customerEmail}</p>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Print Order Date:</span>
                <span className="font-bold text-slate-800">{selectedInvoiceOrder.date}</span>
                <p className="text-slate-500">Method: {selectedInvoiceOrder.paymentMethod}</p>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2 border-t border-slate-100 pt-2">
              {(selectedInvoiceOrder?.items || []).map((it, i) => (
                <div key={i} className="flex justify-between">
                  <div>
                    <span className="font-bold text-slate-800">{it.name} (x{it.quantity})</span>
                    {it.customText && <p className="text-[10px] text-indigo-600 font-mono font-semibold">Embossed: "{it.customText}"</p>}
                  </div>
                  <span className="font-mono font-bold text-slate-900">${((it.price || 12.99) * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-1 text-right">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span className="font-mono font-bold text-slate-800">${selectedInvoiceOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Custom CAD Slicing & QA:</span>
                <span className="font-bold text-emerald-600">FREE ($0.00)</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-100">
                <span>Total Paid:</span>
                <span className="font-mono text-indigo-600">${selectedInvoiceOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer"
              >
                Print / Download PDF
              </button>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
              >
                Close
              </button>
            </div>
          </div>
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
