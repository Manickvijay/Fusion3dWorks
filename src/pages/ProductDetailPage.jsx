import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Sparkles,
  ShoppingBag,
  Heart,
  Eye,
  Share2,
  ArrowLeft,
  ShieldCheck,
  Zap,
  MapPin,
  CheckCircle2,
  Truck,
  Star,
  Image as ImageIcon,
  UploadCloud,
  X,
  Plus,
  ChevronRight,
  Layers,
  AlertCircle,
  Sliders,
  Edit3
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Interactive3DViewer from '../components/common/Interactive3DViewer';
import ProductCard from '../components/common/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    wishlist,
    toggleWishlist,
    addToast,
    currentUser,
    submitProductReview
  } = useShop();

  const product = products.find(p => p.id === id) || products[0];

  // View Mode: 'gallery' or '3d'
  const [viewMode, setViewMode] = useState('gallery');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState(product?.allowCustomText ? 'SARAH & LEO' : '');

  // Wishlist animation state
  const [wishlistPulsing, setWishlistPulsing] = useState(false);

  // User Uploaded Images state (For items requiring user photos like lithophanes/keychains)
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageUploadError, setImageUploadError] = useState('');

  // Pincode Availability Checker state
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null); // null | 'available' | 'invalid'

  // Review Form state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showAllReviewsModal, setShowAllReviewsModal] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewAuthor, setNewReviewAuthor] = useState(currentUser?.name || 'Happy Customer');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewPhotos, setNewReviewPhotos] = useState([]);

  // Dynamic Selected Colors for each section
  const [selectedColors, setSelectedColors] = useState(() => {
    if (product?.customizableSections && Array.isArray(product.customizableSections)) {
      const initial = {};
      product.customizableSections.forEach(sec => {
        initial[sec.id] = sec.defaultColor || (sec.options && sec.options[0]?.hex) || '#4F46E5';
      });
      return initial;
    }
    return {};
  });

  const [prevProductId, setPrevProductId] = useState(product?.id);
  if (product && product.id !== prevProductId) {
    setPrevProductId(product.id);
    if (product.customizableSections && Array.isArray(product.customizableSections)) {
      const initial = {};
      product.customizableSections.forEach(sec => {
        initial[sec.id] = sec.defaultColor || (sec.options && sec.options[0]?.hex) || '#4F46E5';
      });
      setSelectedColors(initial);
    }
    setUploadedImages([]);
    setImageUploadError('');
  }

  // Related products from same category or catalog
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.id !== product.id && (p.category === product.category || p.rating >= 4.8))
      .slice(0, 4);
  }, [products, product]);

  // Rating breakdowns
  const productReviews = useMemo(() => (product?.reviews || []), [product?.reviews]);
  const totalReviewsCount = product?.reviewsCount || productReviews.length;
  const averageRating = Number(product?.rating || 5.0).toFixed(1);

  // Calculate rating distribution
  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    productReviews.forEach(r => {
      const score = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
      counts[score] = (counts[score] || 0) + 1;
    });
    // Ensure base realistic distribution if fewer reviews stored
    if (productReviews.length < 5) {
      counts[5] = Math.round(totalReviewsCount * 0.85);
      counts[4] = Math.round(totalReviewsCount * 0.12);
      counts[3] = Math.max(1, Math.round(totalReviewsCount * 0.03));
    }
    return counts;
  }, [productReviews, totalReviewsCount]);

  // Collect all customer photos across reviews
  const allCustomerPhotos = useMemo(() => {
    const photos = [];
    productReviews.forEach(rev => {
      if (Array.isArray(rev.images)) {
        rev.images.forEach(img => photos.push({ img, author: rev.author }));
      }
    });
    return photos;
  }, [productReviews]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">3D Product Not Found</h2>
        <Link to="/" className="text-indigo-600 text-sm font-semibold mt-4 inline-block">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isWishlisted = (wishlist || []).includes(product.id);
  const galleryImages = (product.gallery && product.gallery.length > 0)
    ? product.gallery
    : (product.image ? [product.image] : []);

  const handleColorChange = (sectionId, hex) => {
    setSelectedColors(prev => ({ ...prev, [sectionId]: hex }));
  };

  const handleWishlistToggle = () => {
    setWishlistPulsing(true);
    toggleWishlist(product.id);
    setTimeout(() => setWishlistPulsing(false), 500);
  };

  // Image Upload handler for customer photo requirements
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const maxAllowed = product.maxImages || 3;
    const currentCount = uploadedImages.length;
    const remainingSlots = maxAllowed - currentCount;

    if (remainingSlots <= 0) {
      setImageUploadError(`Maximum of ${maxAllowed} photos allowed for this product.`);
      return;
    }

    const filesToLoad = files.slice(0, remainingSlots);
    filesToLoad.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages(prev => [...prev, event.target.result]);
        setImageUploadError('');
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = (index) => {
    setUploadedImages(prev => prev.filter((_, idx) => idx !== index));
  };

  // Validation before ordering or adding to cart
  const validateCustomization = () => {
    if (product.requiresUserImage) {
      const minRequired = product.minImages || 1;
      if (uploadedImages.length < minRequired) {
        const msg = `Please upload at least ${minRequired} photo(s) to proceed with this custom 3D order.`;
        setImageUploadError(msg);
        addToast(msg, 'error');
        return false;
      }
    }
    setImageUploadError('');
    return true;
  };

  const handleAddToCart = (e) => {
    if (!validateCustomization()) return;

    addToCart(
      product,
      {
        quantity,
        selectedColors,
        customText: product.allowCustomText ? customText : '',
        userImages: uploadedImages
      },
      e
    );
  };

  const handleBuyNow = (e) => {
    if (!validateCustomization()) return;

    addToCart(
      product,
      {
        quantity,
        selectedColors,
        customText: product.allowCustomText ? customText : '',
        userImages: uploadedImages
      },
      e
    );
    navigate('/checkout');
  };

  // Pincode Verification Handler
  const handleCheckPincode = (e) => {
    e.preventDefault();
    const cleanPin = pincodeInput.trim();
    if (cleanPin.length >= 5) {
      setPincodeStatus('available');
      addToast(`Delivery is available for pincode ${cleanPin}!`, 'success');
    } else {
      setPincodeStatus('invalid');
      addToast('Please enter a valid 5 or 6 digit pincode', 'error');
    }
  };

  // Share handler: shares image & URL or copies to clipboard
  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this custom 3D printed ${product.name} on Fusion3D Works!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        addToast('Shared successfully!', 'success');
        return;
      } catch {
        // User cancelled or unsupported; fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${product.name} - ${window.location.href}`);
      addToast('Product link & details copied to clipboard!', 'info');
    }
  };

  // Review submission handler
  const handleReviewPhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewReviewPhotos(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReviewComment.trim()) {
      addToast('Please write a brief review comment', 'error');
      return;
    }

    submitProductReview(
      product.id,
      null,
      newReviewRating,
      newReviewComment,
      newReviewAuthor || currentUser?.name || 'Verified Customer',
      newReviewPhotos
    );

    setShowReviewModal(false);
    setNewReviewComment('');
    setNewReviewPhotos([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600 flex items-center space-x-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to 3D Catalog</span>
        </Link>
        <span className="text-[11px] font-mono uppercase text-slate-400">
          ID: {product.id}
        </span>
      </div>

      {/* Admin Notice Banner if Admin is logged in */}
      {currentUser?.role === 'admin' && (
        <div className="p-4 bg-indigo-900 text-white rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <Sliders className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-indigo-200">
                Admin Control View
              </h4>
              <p className="text-xs text-white/90">
                You are previewing this product as Lead Platform Administrator. Customer purchasing flows are available for testing.
              </p>
            </div>
          </div>
          <Link
            to="/admin"
            className="px-3.5 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold transition-all shadow-xs"
          >
            Open Admin Dashboard
          </Link>
        </div>
      )}

      {/* PRIMARY PRODUCT SECTION: Visuals + Customizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Media Stage (Gallery or Interactive 3D Canvas) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* View Mode Toggle Strip */}
          <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setViewMode('gallery')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                viewMode === 'gallery'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-indigo-600" />
              <span>High-Res Photo Gallery</span>
            </button>

            <button
              onClick={() => setViewMode('3d')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Interactive 3D Inspector</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono uppercase">
                360°
              </span>
            </button>
          </div>

          {/* Active Visual Container */}
          {viewMode === '3d' ? (
            <div className="space-y-2">
              <Interactive3DViewer
                product={product}
                selectedColors={selectedColors}
                customText={customText}
              />
              <p className="text-[11px] text-center text-slate-500 font-medium">
                Colors and custom lettering update directly on the 3D model in real time!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Main Photo Card */}
              <div className="relative aspect-4/3 w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={`${product.name} view ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />

                {/* Print Time Overlay Badge */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="px-3 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md flex items-center space-x-1.5 backdrop-blur-md">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Print Time: {product.printTime}</span>
                  </span>
                </div>

                {/* Wishlist & Share Float */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-2.5 rounded-full backdrop-blur-md shadow-md transition-all cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-50 text-rose-600 border border-rose-200 scale-105'
                        : 'bg-white/90 text-slate-700 hover:text-rose-600 hover:bg-white'
                    } ${wishlistPulsing ? 'animate-ping' : ''}`}
                    title={isWishlisted ? 'Remove from Saved' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 transition-transform duration-200 ${isWishlisted ? 'fill-rose-500 scale-110' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-full bg-white/90 text-slate-700 hover:bg-white backdrop-blur-md shadow-md transition-all cursor-pointer"
                    title="Share Product Link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* 3D Prompt Overlay Button */}
                <button
                  onClick={() => setViewMode('3d')}
                  className="absolute bottom-4 right-4 px-3.5 py-2 bg-slate-950/80 hover:bg-slate-950 text-white rounded-2xl text-xs font-bold flex items-center space-x-2 backdrop-blur-md shadow-xl transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Switch to 3D Inspection</span>
                </button>
              </div>

              {/* Side-Scrolling Horizontal Photo Carousel */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
                  <span>Photo Angles ({galleryImages.length} views):</span>
                  <span className="text-[11px] text-slate-400">Scroll horizontally</span>
                </div>

                <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-indigo-600 ring-2 ring-indigo-200 scale-102'
                          : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Angle ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Technical 3D Printer Specifications Strip */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Print Time</span>
              <span className="font-mono font-bold text-slate-900 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>{product.printTime}</span>
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Layer Height</span>
              <span className="font-mono font-bold text-slate-900">
                {product.layerHeight || '0.12 mm'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Material</span>
              <span className="font-bold text-slate-900 truncate block">
                {product.material || 'PLA+ Silk'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Dimensions</span>
              <span className="font-mono font-bold text-slate-900 text-[11px] truncate block">
                {product.dimensions || 'Custom'}
              </span>
            </div>
          </div>

          {/* DELIVERY & PINCODE AVAILABILITY CHECKER */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Delivery & Pincode Availability
              </h4>
            </div>

            <p className="text-xs text-slate-600">
              Check delivery availability, dispatch timeframe, and courier partners for your area:
            </p>

            <form onSubmit={handleCheckPincode} className="flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  maxLength={10}
                  value={pincodeInput}
                  onChange={(e) => {
                    setPincodeInput(e.target.value);
                    setPincodeStatus(null);
                  }}
                  placeholder="Enter 6-digit Delivery Pincode"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-hidden focus:border-indigo-600 focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Check
              </button>
            </form>

            {/* Pincode Availability Feedback */}
            {pincodeStatus === 'available' && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1.5 text-xs">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Standard & Express Delivery Available for {pincodeInput}!</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-emerald-700 pt-1">
                  <div className="flex items-center space-x-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Estimated Delivery: 2–4 Business Days</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Courier Partners: BlueDart & Delhivery</span>
                  </div>
                </div>
              </div>
            )}

            {pincodeStatus === 'invalid' && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center space-x-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Please enter a valid 5 or 6 digit pincode to verify delivery.</span>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Customization Controls & Purchase Engine */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header & Pricing */}
          <div className="space-y-2 border-b border-slate-200/80 pb-5">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                {product.categoryLabel}
              </span>
              {product.badge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Star Rating summary inline */}
            <div className="flex items-center space-x-3 pt-1">
              <div className="flex items-center text-amber-500 font-bold text-xs">
                <Star className="w-4 h-4 fill-amber-400 mr-1" />
                <span>{averageRating}</span>
                <span className="text-slate-400 text-[11px] ml-1">
                  ({totalReviewsCount} Customer Reviews)
                </span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                In Stock & Ready to Order
              </span>
            </div>

            <div className="flex items-baseline space-x-3 pt-2">
              <span className="text-3xl font-black text-slate-900 font-mono">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through font-mono">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          {/* Custom 3D Printing Personalization Inputs */}
          <div className="space-y-5 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Personalize Your 3D Creation</span>
            </h3>

            {/* CUSTOM USER IMAGE UPLOAD (For Lithophanes, Custom Photo Keychains, etc.) */}
            {product.requiresUserImage && (
              <div className="p-4 bg-indigo-50/50 border border-indigo-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                    <UploadCloud className="w-4 h-4 text-indigo-600" />
                    <span>Upload Custom Photo(s)</span>
                  </label>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                    Min: {product.minImages || 1} • Max: {product.maxImages || 3}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {product.imageInstructions || 'Upload high-resolution photos for 3D lithophane and surface relief modeling.'}
                </p>

                {/* Uploaded Thumbnails Preview */}
                {uploadedImages.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-indigo-400 group">
                        <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute top-1 right-1 p-1 bg-slate-950/80 text-white rounded-full hover:bg-rose-600 transition-colors"
                          title="Remove photo"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* File Upload Trigger */}
                {uploadedImages.length < (product.maxImages || 3) && (
                  <label className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer bg-white transition-colors">
                    <UploadCloud className="w-5 h-5 text-indigo-600 mb-1" />
                    <span className="text-xs font-bold text-indigo-600">
                      Click to choose photo from device
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Supports JPG, PNG, WEBP (Max 10MB)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}

                {imageUploadError && (
                  <div className="flex items-center space-x-1.5 text-xs text-rose-600 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{imageUploadError}</span>
                  </div>
                )}
              </div>
            )}

            {/* Custom Text Field if enabled */}
            {product.allowCustomText && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-800">
                    Custom Embossed Lettering / Name
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {customText.length}/20 chars
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={20}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                  placeholder={product.customTextPlaceholder || 'ENTER NAME'}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold font-mono tracking-wider focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all uppercase text-slate-900"
                />
                <p className="text-[10px] text-slate-500">
                  Will be extruded in raised 3D geometric relief on the model face.
                </p>
              </div>
            )}

            {/* Dynamic Customizable Color Sections */}
            {product.customizableSections && product.customizableSections.map(section => {
              const activeHex = selectedColors[section.id] || section.defaultColor;
              const activeColorObj = section.options ? section.options.find(o => o.hex === activeHex) : null;

              return (
                <div key={section.id} className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{section.name}:</span>
                    <span className="text-indigo-600 font-bold">
                      {activeColorObj?.name || 'Selected'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {(section.options || []).map((opt, idx) => (
                      <button
                        key={opt?.hex || `opt-${idx}`}
                        type="button"
                        onClick={() => handleColorChange(section.id, opt.hex)}
                        className={`group relative flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          activeHex === opt.hex
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                          style={{ backgroundColor: opt.hex }}
                        />
                        <span>{opt.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Action Buttons: Admin Management Panel OR Customer Add to Cart */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              {currentUser?.role === 'admin' ? (
                <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sliders className="w-4 h-4 text-amber-400" />
                      <span className="font-black text-xs uppercase tracking-wider text-amber-300">
                        Admin Catalog & Production Controller
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      SKU: {product.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-3 rounded-xl border border-slate-800 font-mono">
                    <div>
                      <span className="text-slate-400 block font-sans">Print Duration:</span>
                      <span className="text-white font-bold">{product.printTime || '45m'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-sans">Customer Photos:</span>
                      <span className="text-white font-bold">
                        {product.requiresUserImage ? `Required (${product.minImages || 1}–${product.maxImages || 3})` : 'Not Required'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-sans">Active Price:</span>
                      <span className="text-emerald-400 font-bold">${product.price.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-sans">CAD Model:</span>
                      <span className="text-indigo-300 truncate block">{product.uploadedFileName || 'Standard Sliced'}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <Link
                      to="/admin"
                      className="flex-1 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm text-center"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit in Admin Farm</span>
                    </Link>
                    <Link
                      to="/admin"
                      className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 border border-slate-700 text-center"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>View Print Queue</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold font-mono text-sm text-slate-900">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* ADD TO CART BUTTON */}
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-md flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer text-xs sm:text-sm"
                    >
                      <ShoppingBag className="w-4 h-4 text-indigo-400" />
                      <span>Add to Cart</span>
                    </button>

                    {/* BUY NOW BUTTON */}
                    <button
                      type="button"
                      onClick={handleBuyNow}
                      className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/25 flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer text-xs sm:text-sm"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Buy Now • ${(product.price * quantity).toFixed(2)}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Secure Checkout • 30-Minute Cancellation Window • Quality Guaranteed</span>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* Value Accordions / Production Guarantee */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs text-slate-600">
            <div className="flex items-center space-x-2 font-bold text-slate-900">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>How Your Order is 3D Printed</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Upon ordering, our 3D design team extrudes your custom specifications and uploads a photorealistic 3D proof for your approval before printing begins on our precision CoreXY printer farm.
            </p>
          </div>

        </div>

      </div>

      {/* RATINGS & REVIEWS SECTION */}
      <section id="product-reviews" className="space-y-8 pt-6 border-t border-slate-200">
        
        {/* Section Header with Write Review Trigger */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center space-x-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>Ratings & Customer Reviews</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Real feedback and photos from verified 3D print owners
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Rating Breakdown Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          
          {/* Overall Score */}
          <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6 text-center">
            <span className="text-5xl font-black text-slate-900 font-mono tracking-tight">
              {averageRating}
            </span>
            <div className="flex items-center text-amber-400 mt-2 space-x-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs text-slate-500 font-medium mt-1">
              Based on {totalReviewsCount} verified ratings
            </span>
            <span className="mt-3 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-bold">
              98% Recommended
            </span>
          </div>

          {/* Star Distribution Progress Bars */}
          <div className="md:col-span-8 flex flex-col justify-center space-y-2.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingCounts[star] || 0;
              const percent = totalReviewsCount > 0 ? Math.round((count / totalReviewsCount) * 100) : 0;
              return (
                <div key={star} className="flex items-center space-x-3 text-xs">
                  <div className="w-12 font-bold text-slate-700 flex items-center space-x-1">
                    <span>{star}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-10 text-right font-mono text-[11px] text-slate-500">
                    {percent}%
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Customer Uploaded Photo Gallery Strip */}
        {allCustomerPhotos.length > 0 && (
          <div className="space-y-3 bg-slate-50 p-5 rounded-3xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                <span>Customer 3D Print Gallery ({allCustomerPhotos.length} Photos)</span>
              </h4>
              <span className="text-[11px] text-slate-500">
                Uploaded by verified customers
              </span>
            </div>

            <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300">
              {allCustomerPhotos.map((item, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-xs group"
                >
                  <img
                    src={item.img}
                    alt={`Customer print by ${item.author}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-1 text-[9px] text-white truncate font-medium">
                    {item.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-900">
              Customer Comments ({productReviews.length})
            </h4>
            {productReviews.length > 3 && (
              <button
                onClick={() => setShowAllReviewsModal(true)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1 cursor-pointer"
              >
                <span>View All Reviews</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(showAllReviewsModal ? productReviews : productReviews.slice(0, 4)).map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-xs hover:border-slate-300 transition-colors text-left"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-slate-900">{rev.author}</span>
                      {rev.verified && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified Purchase</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  "{rev.comment}"
                </p>

                {/* Review Photos if attached */}
                {rev.images && rev.images.length > 0 && (
                  <div className="flex items-center space-x-2 pt-1">
                    {rev.images.map((imgUrl, i) => (
                      <div key={i} className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200">
                        <img src={imgUrl} alt="Review attachment" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <section id="related-products" className="space-y-5 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Related 3D Creations You May Like</span>
              </h3>
              <p className="text-xs text-slate-500">
                Popular personalized 3D designs in the same category
              </p>
            </div>
            <Link
              to="/"
              className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map(relProduct => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}

      {/* WRITE A REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Write a Review for {product.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Share your experience and photos with the 3D maker community
                </p>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              {/* Star Selection */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 block">
                  Overall Rating:
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2 font-mono">
                    {newReviewRating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Author Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 block">
                  Your Display Name:
                </label>
                <input
                  type="text"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-indigo-600 focus:bg-white"
                />
              </div>

              {/* Comments */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 block">
                  Your Review Comments:
                </label>
                <textarea
                  rows={3}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="How was the 3D print quality, color accuracy, and packaging?"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-indigo-600 focus:bg-white resize-none"
                />
              </div>

              {/* Attach Photos of Printed Item */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>Upload Photos of Your Print (Optional):</span>
                  <span className="text-[10px] text-slate-400 font-normal">Max 3 photos</span>
                </label>

                {newReviewPhotos.length > 0 && (
                  <div className="flex gap-2">
                    {newReviewPhotos.map((photo, i) => (
                      <div key={i} className="relative w-14 h-14 rounded-xl overflow-hidden border border-indigo-400">
                        <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                <label className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl p-2.5 flex items-center justify-center space-x-2 cursor-pointer bg-slate-50 hover:bg-white transition-colors">
                  <ImageIcon className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-semibold text-slate-700">Choose images to upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleReviewPhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  Submit Review
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
