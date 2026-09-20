import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Heart,
  Scale,
  ShoppingCart,
  Zap,
  Box,
  Layers,
  RotateCw,
  FileText,
  HelpCircle,
  ArrowRight,
  Eye,
  Check,
  Plus
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Interactive3DViewer from '../components/common/Interactive3DViewer';
import ProductCard from '../components/common/ProductCard';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    addToast
  } = useShop();

  const product = products.find(p => p.id === productId) || products[0];

  const [activeImage, setActiveImage] = useState(product.image);
  const [view3D, setView3D] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.availableColors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'box' | 'slicing' | 'reviews'

  // Review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewsList, setReviewsList] = useState(product.reviews || []);

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const currentPrice = selectedVariant?.price || product.price;

  // Handle Add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant, selectedColor);
    navigate('/checkout');
  };

  // Submit review handler
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewText,
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewText('');
    addToast('Thank you! Your product review has been submitted for verification.', 'success');
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Frequently bought together companion items
  const companionProducts = products
    .filter(p => p.id !== product.id && (p.category === 'filaments' || p.category === 'spare-parts'))
    .slice(0, 2);

  const bundleTotal = currentPrice + companionProducts.reduce((sum, c) => sum + c.price, 0);
  const bundleDiscounted = Math.round(bundleTotal * 0.92 * 100) / 100;

  const handleAddBundle = () => {
    addToCart(product, 1, selectedVariant, selectedColor);
    companionProducts.forEach(comp => addToCart(comp, 1));
    addToast('Added all 3 bundled items to cart with 8% combo discount!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-indigo-600">Catalog</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-indigo-600">
            {product.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs">{product.title}</span>
        </div>

        {/* Product Main Section: Gallery + Purchase Configurator */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Gallery & 3D Interactive Viewport */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Toggle 2D Photo vs 3D Orbit */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setView3D(false)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      !view3D ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    High-Res Photos
                  </button>
                  <button
                    onClick={() => setView3D(true)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      view3D ? 'bg-orange-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Interactive 3D View</span>
                  </button>
                </div>

                <span className="text-[11px] text-slate-400 font-mono">SKU: {product.sku}</span>
              </div>

              {/* Main Media Display */}
              {view3D ? (
                <div>
                  <Interactive3DViewer
                    modelType={product.category === 'filaments' ? 'filaments' : 'printer'}
                    defaultColor={selectedColor?.hex || '#4f46e5'}
                  />
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Rotate 360°, inspect gantry components, and preview filament hues in live WebGL.
                  </p>
                </div>
              ) : (
                <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 relative">
                  <img
                    src={activeImage}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {product.discount && (
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-black bg-rose-500 text-white rounded-xl shadow-md">
                      SAVE {product.discount}
                    </span>
                  )}
                  {product.badge && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold bg-indigo-600 text-white rounded-xl shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Thumbnails row */}
              {!view3D && images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImage === img
                          ? 'border-indigo-600 ring-2 ring-indigo-200'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Service Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <Truck className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                  <span className="font-semibold block">Free Shipping</span>
                  <span className="text-[10px] text-slate-400">On orders $49+</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="font-semibold block">2-Year Warranty</span>
                  <span className="text-[10px] text-slate-400">Direct factory parts</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                  <span className="font-semibold block">30-Day Returns</span>
                  <span className="text-[10px] text-slate-400">100% Guaranteed</span>
                </div>
              </div>

            </div>

            {/* Right Column: Information, Selection & Cart CTAs */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-extrabold text-indigo-600 uppercase tracking-wider">{product.brand}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                    {product.categoryLabel}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  {product.title}
                </h1>

                {/* Rating & Stock */}
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900 ml-1 text-sm">{product.rating}</span>
                    <span className="text-slate-400 ml-1">({product.reviewCount} reviews)</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <span className="text-emerald-600 font-bold flex items-center">
                    <Check className="w-4 h-4 mr-0.5" /> In Stock ({product.stock} units ready to ship)
                  </span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline space-x-3">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                      ${currentPrice.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-slate-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.discount && (
                    <span className="text-xs font-bold text-rose-600">
                      You save ${(product.originalPrice - currentPrice).toFixed(2)} ({product.discount})
                    </span>
                  )}
                </div>

                <div className="text-right text-[11px] text-slate-500">
                  <span>Financing available from </span>
                  <strong className="text-slate-800">${(currentPrice / 12).toFixed(2)}/mo</strong>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Package / Edition Option:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((v, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedVariant?.name === v.name
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="block text-xs">{v.name}</span>
                        <span className="text-sm font-extrabold text-slate-900 mt-1 block">
                          ${v.price.toFixed(2)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Swatch Selector */}
              {product.availableColors && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Filament Hue: <span className="text-indigo-600">{selectedColor?.name || product.availableColors[0].name}</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    {product.availableColors.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(c)}
                        className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                          (selectedColor?.name || product.availableColors[0].name) === c.name
                            ? 'border-indigo-600 scale-110 ring-2 ring-indigo-200'
                            : 'border-slate-300 hover:scale-105'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="w-full h-full rounded-full block border border-slate-200"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Purchase Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-3 text-slate-600 hover:bg-slate-200 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-3 text-xs font-extrabold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-3 text-slate-600 hover:bg-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart (${(currentPrice * quantity).toFixed(2)})</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      isWishlisted ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-slate-300 text-slate-600 hover:text-rose-600'
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  </button>

                  {/* Compare */}
                  <button
                    onClick={() => toggleCompare(product.id)}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      isCompared ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-300 text-slate-600 hover:text-indigo-600'
                    }`}
                    title="Compare Product"
                  >
                    <Scale className="w-5 h-5" />
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-500 active:scale-98 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md transition-all"
                >
                  <Zap className="w-4 h-4" />
                  <span>Instant 1-Click Buy Now</span>
                </button>
              </div>

              {/* Highlights Bullets */}
              {product.highlights && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Key Engineering Features:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {product.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Frequently Bought Together Bundle */}
        {companionProducts.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span>Frequently Bought Together (Save 8% on Bundle)</span>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded-xl" />
                  <div className="max-w-[140px]">
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">{product.title}</span>
                    <span className="text-xs font-black text-indigo-600">${currentPrice.toFixed(2)}</span>
                  </div>
                </div>

                {companionProducts.map((cp) => (
                  <React.Fragment key={cp.id}>
                    <Plus className="w-4 h-4 text-slate-400" />
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                      <img src={cp.image} alt={cp.title} className="w-16 h-16 object-cover rounded-xl" />
                      <div className="max-w-[140px]">
                        <span className="text-xs font-bold text-slate-800 line-clamp-1">{cp.title}</span>
                        <span className="text-xs font-black text-indigo-600">${cp.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <div className="lg:col-span-4 p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-indigo-900 font-semibold">Bundle Total (3 items):</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-2xl font-black text-slate-900">${bundleDiscounted.toFixed(2)}</span>
                    <span className="text-xs text-slate-400 line-through">${bundleTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleAddBundle}
                  className="mt-3 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add All 3 to Cart</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Technical Tabs: Specifications / Box Contents / Slicing / Reviews */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs mb-10 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
            {[
              { id: 'specs', label: 'Technical Specifications', icon: Layers },
              { id: 'box', label: 'Package Box Contents', icon: Box },
              { id: 'slicing', label: 'Slicing & Setup Guide', icon: FileText },
              { id: 'reviews', label: `Customer Reviews (${reviewsList.length})`, icon: Star }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-indigo-600 text-indigo-600 bg-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8">
            {/* Specs Tab */}
            {activeTab === 'specs' && (
              <div className="max-w-3xl">
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  Engineering & Dimensional Specifications
                </h3>
                {product.specs ? (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                    {Object.entries(product.specs).map(([k, v], i) => (
                      <div key={i} className="flex justify-between py-3 px-4 text-xs even:bg-slate-50">
                        <span className="font-semibold text-slate-600 capitalize">
                          {k.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="font-bold text-slate-900 text-right">{v}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Standard aerospace & ISO 9001 certified specifications apply.</p>
                )}
              </div>
            )}

            {/* Box Contents Tab */}
            {activeTab === 'box' && (
              <div className="max-w-3xl">
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  What's Inside the Shipping Box
                </h3>
                {product.boxContents ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.boxContents.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Factory sealed with complete hardware mounting kit and manual.</p>
                )}
              </div>
            )}

            {/* Slicing Guide Tab */}
            {activeTab === 'slicing' && (
              <div className="max-w-3xl space-y-4 text-xs text-slate-700">
                <h3 className="text-base font-bold text-slate-900">
                  Calibrated OrcaSlicer, PrusaSlicer & Cura Profiles
                </h3>
                <p>
                  Official preset profiles for Fusion3D hardware and materials are embedded into OrcaSlicer and Bambu Studio.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Recommended Hotend</span>
                    <span className="text-indigo-600 font-extrabold text-sm">215°C - 230°C</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">High-speed hardened nozzle</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Textured Bed Temp</span>
                    <span className="text-orange-500 font-extrabold text-sm">55°C - 65°C</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">No glue stick required</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Direct Retraction</span>
                    <span className="text-emerald-600 font-extrabold text-sm">0.8 mm @ 45mm/s</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">Zero stringing profile</span>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Review Form */}
                <form onSubmit={handleAddReview} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 max-w-2xl space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Write a Verified Maker Review
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name / Studio Name"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      required
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-hidden"
                    />
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-hidden"
                    >
                      <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                      <option value="4">★★★★☆ (4 Stars - Great)</option>
                      <option value="3">★★★☆☆ (3 Stars - Average)</option>
                    </select>
                  </div>
                  <textarea
                    rows="3"
                    placeholder="Share your printing experience, layer adhesion observations, and feedback..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
                  >
                    Submit Review
                  </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-4 max-w-3xl">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                          {rev.verified && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-md flex items-center">
                              <CheckCircle2 className="w-3 h-3 mr-0.5" /> Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center space-x-0.5 text-amber-400 mb-2">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900">
                Related {product.categoryLabel} Hardware
              </h3>
              <Link to={`/category/${product.category}`} className="text-xs font-bold text-indigo-600 hover:underline">
                View all in category &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
