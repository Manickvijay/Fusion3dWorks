import { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  Filter,
  Box,
  Truck
} from 'lucide-react';

import { PRODUCTS } from './data/products';
import { INITIAL_USERS, INITIAL_ORDERS } from './data/mockAdminData';
import Navbar from './components/Navbar';
import CategoryNav from './components/CategoryNav';
import HeroBanner from './components/HeroBanner';
import FlipkartSections from './components/FlipkartSections';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CustomPrintCalculator from './components/CustomPrintCalculator';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrdersTrackerModal from './components/OrdersTrackerModal';
import WishlistModal from './components/WishlistModal';
import LoginModal from './components/LoginModal';
import AdminPortal from './components/AdminPortal';
import Footer from './components/Footer';

export default function App() {
  // Navigation & Filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedTech, setSelectedTech] = useState('all');
  const [onlyAssured, setOnlyAssured] = useState(false);
  const [onlyFastDelivery, setOnlyFastDelivery] = useState(false);
  const [priceRange, setPriceRange] = useState('all');
  const [pincode, setPincode] = useState('560001');
  const [city, setCity] = useState('Bangalore');

  // Interactive Modals
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCustomQuoteOpen, setIsCustomQuoteOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  // User session state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_current_user');
      return saved ? JSON.parse(saved) : {
        id: 'USR-1001',
        name: 'Manick Vijay',
        email: 'manickvijay596@gmail.com',
        phone: '+91 98765 43210',
        role: 'customer'
      };
    } catch {
      return null;
    }
  });

  // Dynamic Products state (managed by Admin)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Dynamic Users state (managed by Admin)
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Dynamic Orders state (managed by Admin & Checkout)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Cart & Wishlist state with local persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_cart');
      return saved ? JSON.parse(saved) : [
        {
          ...PRODUCTS[0],
          quantity: 1,
          selectedColorName: 'Cardiac Red'
        }
      ];
    } catch {
      return [
        {
          ...PRODUCTS[0],
          quantity: 1,
          selectedColorName: 'Cardiac Red'
        }
      ];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1]];
    } catch {
      return [PRODUCTS[1]];
    }
  });

  // Toast message
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_users', JSON.stringify(users));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('fusion3d_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('fusion3d_current_user');
      }
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [currentUser]);

  // User Auth operations
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    // Also ensure this user is recorded in registered users list
    setUsers((prev) => {
      const exists = prev.some((u) => u.email === user.email);
      if (exists) return prev;
      return [
        ...prev,
        {
          id: user.id || 'USR-' + Math.floor(1000 + Math.random() * 9000),
          name: user.name,
          email: user.email,
          phone: user.phone || '+91 98765 00000',
          role: user.role || 'customer',
          status: 'Active',
          ordersCount: 1,
          joinedDate: 'Today',
          avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
        }
      ];
    });
    showToast(`✓ Welcome back to Flipkart, ${user.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Logged out from Flipkart session.');
  };

  // Admin Portal Operations: Products
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`✓ Published "${newProduct.title}" to Flipkart Storefront!`);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    showToast(`✓ Updated "${updatedProduct.title}" details.`);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog.');
  };

  // Admin Portal Operations: Orders
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`✓ Order ${orderId} marked as "${newStatus}"`);
  };

  // Admin Portal Operations: Users
  const handleAddUser = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
    showToast(`✓ Created account for ${newUser.name}`);
  };

  const handleToggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const next = u.status === 'Active' ? 'Suspended' : 'Active';
          showToast(`Account ${u.name} is now ${next}`);
          return { ...u, status: next };
        }
        return u;
      })
    );
  };

  const handleToggleUserRole = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextRole = u.role === 'admin' ? 'customer' : 'admin';
          showToast(`Account ${u.name} role changed to ${nextRole}`);
          return { ...u, role: nextRole };
        }
        return u;
      })
    );
  };

  // Cart operations
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.id === product.id && item.color === product.color
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity
        };
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`✓ Added "${product.title}" (${quantity}) to cart!`);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart');
  };

  const handleToggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed from Wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`♥ Added "${product.title}" to Wishlist!`);
    }
  };

  const handleBuyNow = (product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setSelectedProduct(null);
    const subtotal = product.price * quantity;
    const isFree = subtotal >= 999;
    setCheckoutData({
      items: [{ ...product, quantity }],
      subtotal,
      discount: Math.round(product.price * 0.3 * quantity),
      deliveryFee: isFree ? 0 : 79,
      finalTotal: subtotal + (isFree ? 0 : 79)
    });
    setIsCheckoutOpen(true);
  };

  const handleProceedToCheckout = (data) => {
    setCheckoutData(data);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    showToast(`🎉 Order ${newOrder.id} Placed! Slicing queue started.`);
  };

  // Filtered & Sorted Products from dynamic store catalog
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchTag = p.tagline?.toLowerCase().includes(q);
          const matchMaterial = p.material?.toLowerCase().includes(q);
          const matchCat = p.categoryLabel?.toLowerCase().includes(q);
          if (!matchTitle && !matchTag && !matchMaterial && !matchCat) {
            return false;
          }
        }

        // Tech filter
        if (
          selectedTech !== 'all' &&
          !p.technology?.toLowerCase().includes(selectedTech.toLowerCase())
        ) {
          return false;
        }

        // Assured
        if (onlyAssured && !p.isAssured) {
          return false;
        }

        // Fast Delivery
        if (
          onlyFastDelivery &&
          !p.fastDelivery?.toLowerCase().includes('tomorrow')
        ) {
          return false;
        }

        // Price range
        if (priceRange === 'under-500' && p.price >= 500) return false;
        if (
          priceRange === '500-1500' &&
          (p.price < 500 || p.price > 1500)
        )
          return false;
        if (priceRange === 'above-1500' && p.price <= 1500) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.ratingCount - a.ratingCount;
        return 0; // relevance
      });
  }, [
    products,
    selectedCategory,
    searchQuery,
    selectedTech,
    onlyAssured,
    onlyFastDelivery,
    priceRange,
    sortBy
  ]);

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#f1f3f6] text-slate-900 flex flex-col font-sans selection:bg-[#2874f0] selection:text-white">
      {/* Flipkart Iconic Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        cartTotal={cartTotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCustomQuote={() => setIsCustomQuoteOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAdmin={() => setIsAdminOpen(true)}
        pincode={pincode}
        setPincode={setPincode}
        city={city}
        setCity={setCity}
      />

      {/* Flipkart Horizontal Category Bar */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          if (catId === 'custom') {
            setIsCustomQuoteOpen(true);
          }
        }}
        onOpenCustomQuote={() => setIsCustomQuoteOpen(true)}
      />

      {/* Main Flipkart Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 space-y-6">
        {/* Promotional Hero Carousel */}
        <HeroBanner
          onOpenCustomQuote={() => setIsCustomQuoteOpen(true)}
          onSelectCategory={setSelectedCategory}
        />

        {/* Custom 3D Printing Quote Section (Expandable) */}
        {isCustomQuoteOpen && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <CustomPrintCalculator
              onAddToCart={handleAddToCart}
              onClose={() => setIsCustomQuoteOpen(false)}
            />
          </div>
        )}

        {/* Flipkart Deals of the Day, Bank Offers & 3-Column Promos */}
        <FlipkartSections
          products={products}
          onSelectProduct={setSelectedProduct}
          onOpenCustomQuote={() => setIsCustomQuoteOpen(true)}
          onSelectCategory={setSelectedCategory}
        />

        {/* Catalog Section with Flipkart Style Sidebar & Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Desktop Left Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4">
            <div className="bg-white rounded-md border border-gray-200 p-4 shadow-2xs space-y-4 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-1.5 font-bold text-sm text-gray-900 uppercase tracking-wide">
                  <Filter className="w-4 h-4 text-[#2874f0]" />
                  <span>Filters</span>
                </div>
                {(selectedCategory !== 'all' ||
                  selectedTech !== 'all' ||
                  onlyAssured ||
                  onlyFastDelivery ||
                  priceRange !== 'all') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedTech('all');
                      setOnlyAssured(false);
                      setOnlyFastDelivery(false);
                      setPriceRange('all');
                    }}
                    className="text-xs font-bold text-[#2874f0] hover:underline"
                  >
                    CLEAR ALL
                  </button>
                )}
              </div>

              {/* Flipkart Assured Checkbox Filter */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyAssured}
                    onChange={(e) => setOnlyAssured(e.target.checked)}
                    className="accent-[#2874f0] w-4 h-4 rounded"
                  />
                  <span className="text-xs font-bold text-[#2874f0] italic tracking-tighter">
                    f-assured <span className="text-yellow-500 font-black">★</span>
                  </span>
                </label>
              </div>

              {/* 3D Technology */}
              <div className="space-y-2 pt-3 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  3D Print Technology
                </span>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {[
                    { id: 'all', label: 'All Technologies' },
                    { id: 'FDM', label: 'FDM (Filament Extrusion)' },
                    { id: 'SLA', label: 'SLA / DLP (8K Liquid Resin)' }
                  ].map((t) => (
                    <label
                      key={t.id}
                      className="flex items-center gap-2 cursor-pointer hover:text-[#2874f0]"
                    >
                      <input
                        type="radio"
                        name="tech"
                        checked={selectedTech === t.id}
                        onChange={() => setSelectedTech(t.id)}
                        className="accent-[#2874f0]"
                      />
                      <span>{t.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2 pt-3 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  Price Range
                </span>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-500', label: 'Under ₹500' },
                    { id: '500-1500', label: '₹500 - ₹1,500' },
                    { id: 'above-1500', label: 'Above ₹1,500' }
                  ].map((pr) => (
                    <label
                      key={pr.id}
                      className="flex items-center gap-2 cursor-pointer hover:text-[#2874f0]"
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange === pr.id}
                        onChange={() => setPriceRange(pr.id)}
                        className="accent-[#2874f0]"
                      />
                      <span>{pr.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Speed */}
              <div className="space-y-2 pt-3 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  Delivery Speed
                </span>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyFastDelivery}
                      onChange={(e) => setOnlyFastDelivery(e.target.checked)}
                      className="rounded accent-[#2874f0]"
                    />
                    <span className="text-gray-700 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#2874f0]" />
                      <span>Next-Day Delivery</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Custom 3D STL Upload Promotion */}
              <div className="bg-[#2874f0]/5 border border-[#2874f0]/20 p-3.5 rounded-lg text-xs space-y-2">
                <div className="font-bold text-[#2874f0] flex items-center gap-1.5">
                  <Box className="w-4 h-4" />
                  <span>Custom CAD / STL Part?</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Upload any 3D model for instant algorithmic volumetric slicing, weight, and automated pricing.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCustomQuoteOpen(true)}
                  className="w-full py-1.5 bg-[#2874f0] hover:bg-blue-700 text-white font-bold text-xs rounded transition-colors shadow-2xs"
                >
                  Upload 3D CAD
                </button>
              </div>
            </div>
          </aside>

          {/* Right Product Grid (9 cols) */}
          <div className="lg:col-span-9 space-y-4">
            {/* Top Toolbar: Results count & Sort Bar */}
            <div className="bg-white p-3 rounded-md border border-gray-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                <span className="font-bold text-gray-900">
                  Showing {filteredProducts.length} of {products.length} Products
                </span>
                {selectedCategory !== 'all' && (
                  <span className="bg-blue-50 text-[#2874f0] font-bold px-2 py-0.5 rounded text-[11px]">
                    Category: {selectedCategory}
                  </span>
                )}
              </div>

              {/* Sort By Controls (Flipkart style tab sort) */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 font-semibold hidden sm:inline">Sort By:</span>
                <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded">
                  {[
                    { id: 'relevance', label: 'Popularity' },
                    { id: 'price-low', label: 'Price -- Low to High' },
                    { id: 'price-high', label: 'Price -- High to Low' },
                    { id: 'rating', label: 'Customer Rating' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSortBy(s.id)}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                        sortBy === s.id
                          ? 'bg-white text-[#2874f0] shadow-xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-md p-12 text-center border border-gray-200 shadow-2xs space-y-3">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#2874f0] flex items-center justify-center mx-auto">
                  <Box className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-gray-900">No Products Matched</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Try adjusting your search terms or clearing filters. You can also upload a custom 3D model for instant manufacturing!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedTech('all');
                    setOnlyAssured(false);
                    setOnlyFastDelivery(false);
                    setPriceRange('all');
                  }}
                  className="px-4 py-2 bg-[#2874f0] text-white text-xs font-bold rounded hover:bg-blue-700 shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onSelectProduct={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                    isWishlisted={wishlist.some((w) => w.id === prod.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Product Detail & Interactive 3D Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          isWishlisted={wishlist.some((w) => w.id === selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          pincode={pincode}
          city={city}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) =>
          setWishlist((prev) => prev.filter((w) => w.id !== id))
        }
        onAddToCart={handleAddToCart}
        onSelectProduct={setSelectedProduct}
      />

      {/* Orders & 3D Job Tracker Modal */}
      <OrdersTrackerModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onOpenCustomQuote={() => setIsCustomQuoteOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        checkoutData={checkoutData}
        onOrderPlaced={handleOrderPlaced}
        defaultPincode={pincode}
        defaultCity={city}
      />

      {/* Login & Signup Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Admin Management Portal */}
      {isAdminOpen && (
        <AdminPortal
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          users={users}
          onAddUser={handleAddUser}
          onToggleUserStatus={handleToggleUserStatus}
          onToggleUserRole={handleToggleUserRole}
          onClose={() => setIsAdminOpen(false)}
          currentUser={currentUser}
        />
      )}

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Flipkart 6-Column Footer */}
      <Footer
        onOpenCustomQuote={() => setIsCustomQuoteOpen(true)}
        onSelectCategory={setSelectedCategory}
      />
    </div>
  );
}
