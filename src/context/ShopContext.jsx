import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ACTIVE_COUPONS, validateCoupon } from '../data/coupons';
import { INITIAL_USERS, INITIAL_ORDERS, INITIAL_REVIEWS, INITIAL_RETURNS } from '../data/mockAdminData';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Products state (persisted in localStorage)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('f3d_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('f3d_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('f3d_wishlist');
      return saved ? JSON.parse(saved) : ['prod-printer-apex', 'prod-filament-petgcf'];
    } catch {
      return ['prod-printer-apex', 'prod-filament-petgcf'];
    }
  });

  // Comparison list (max 4 products)
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('f3d_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Applied coupon
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('f3d_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Users state
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('f3d_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Current logged in user (default admin: Manick Vijay)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('f3d_current_user');
      return saved ? JSON.parse(saved) : INITIAL_USERS[0];
    } catch {
      return INITIAL_USERS[0];
    }
  });

  // Reviews state
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('f3d_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // UI States
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('f3d_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('f3d_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('f3d_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('f3d_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('f3d_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('f3d_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('f3d_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('f3d_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Toast notifications
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1, variant = null, selectedColor = null) => {
    const cartItemId = `${product.id}-${variant?.name || 'default'}-${selectedColor?.name || 'default'}`;
    const price = variant?.price || product.price;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            title: product.title,
            brand: product.brand,
            category: product.category,
            categoryLabel: product.categoryLabel,
            price: price,
            originalPrice: product.originalPrice,
            image: product.image,
            quantity: quantity,
            variant: variant?.name || null,
            color: selectedColor || null,
            sku: variant?.sku || product.sku
          }
        ];
      }
    });

    addToast(`Added "${product.title.slice(0, 32)}..." to your cart.`, 'success');
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    addToast('Item removed from cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from your wishlist.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Saved to your wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Compare operations
  const toggleCompare = (productId) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        addToast('Product removed from comparison.', 'info');
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 4) {
        addToast('Comparison limit reached (max 4 products).', 'warning');
        return prev;
      }
      addToast('Product added to comparison table.', 'success');
      return [...prev, productId];
    });
  };

  const isInCompare = (productId) => compareList.includes(productId);
  const clearCompare = () => setCompareList([]);

  // Coupon handling
  const applyCouponCode = (code) => {
    const res = validateCoupon(code, cart, cartSubtotal);
    if (res.valid) {
      setAppliedCoupon({
        ...res.coupon,
        discountAmount: res.discountAmount
      });
      addToast(res.message, 'success');
      return { success: true, message: res.message };
    } else {
      addToast(res.message, 'error');
      return { success: false, message: res.message };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed.', 'info');
  };

  // Cart financial calculations
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const freeShippingThreshold = 49.00;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const standardShippingFee = cartSubtotal > 0 ? (isFreeShipping ? 0.00 : 9.99) : 0.00;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Coupon discount computation
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      couponDiscount = (cartSubtotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscount && couponDiscount > appliedCoupon.maxDiscount) {
        couponDiscount = appliedCoupon.maxDiscount;
      }
    } else if (appliedCoupon.discountType === 'fixed') {
      couponDiscount = Math.min(appliedCoupon.discountValue, cartSubtotal);
    } else if (appliedCoupon.discountType === 'shipping') {
      couponDiscount = standardShippingFee;
    }
  }

  const estTax = Math.round(cartSubtotal * 0.075 * 100) / 100; // 7.5% sales tax
  const cartTotal = Math.max(0, Math.round((cartSubtotal - couponDiscount + (appliedCoupon?.discountType === 'shipping' ? 0 : standardShippingFee) + estTax) * 100) / 100);

  // Order creation
  const createOrder = (orderData) => {
    const orderId = `F3D-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `TRK-${Math.floor(1000000 + Math.random() * 9000000)}US`;
    
    const newOrder = {
      id: orderId,
      trackingNumber,
      carrier: 'FedEx Express 3D Priority',
      customerName: orderData.shippingAddress.fullName,
      customerEmail: orderData.shippingAddress.email || currentUser?.email || 'customer@fusion3dworks.com',
      customerPhone: orderData.shippingAddress.phone || '+1 (555) 000-0000',
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: cart.map(i => ({
        id: i.productId,
        title: i.title,
        quantity: i.quantity,
        price: i.price,
        image: i.image,
        variant: i.variant || (i.color ? i.color.name : null)
      })),
      subtotal: cartSubtotal,
      deliveryFee: standardShippingFee,
      discount: couponDiscount,
      tax: estTax,
      total: cartTotal,
      paymentMethod: orderData.paymentMethod || 'Credit Card',
      paymentStatus: 'Paid',
      status: 'Processing',
      progress: 25,
      estimatedDelivery: 'In 3-5 business days',
      shippingAddress: orderData.shippingAddress,
      timeline: [
        { status: 'Order Placed', time: 'Just now', done: true, desc: 'Order received and verified by system.' },
        { status: 'Payment Confirmed', time: 'Just now', done: true, desc: 'Payment transaction authorized.' },
        { status: 'Processing', time: 'In progress', done: true, desc: 'Technician inspecting items & queueing calibration.' },
        { status: 'Packed', time: 'Pending', done: false, desc: 'Packaged in heavy-duty foam crate.' },
        { status: 'Shipped', time: 'Pending', done: false, desc: 'Dispatched with carrier.' },
        { status: 'Out for Delivery', time: 'Pending', done: false, desc: 'On local courier delivery vehicle.' },
        { status: 'Delivered', time: 'Pending', done: false, desc: 'Delivered to destination.' }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    addToast(`Order #${newOrder.id} placed successfully!`, 'success');
    return newOrder;
  };

  // Admin order status update
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order;

        let progress = 25;
        if (newStatus === 'Packed') progress = 50;
        if (newStatus === 'Shipped') progress = 75;
        if (newStatus === 'Delivered') progress = 100;
        if (newStatus === 'Cancelled') progress = 0;

        const updatedTimeline = order.timeline.map(t => {
          if (t.status === newStatus) return { ...t, done: true, time: 'Just updated' };
          return t;
        });

        return {
          ...order,
          status: newStatus,
          progress,
          timeline: updatedTimeline
        };
      })
    );
    addToast(`Order ${orderId} updated to "${newStatus}".`, 'info');
  };

  // Admin product operations
  const addProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    addToast(`Product "${newProduct.title}" added to catalog.`, 'success');
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    addToast(`Product "${updatedProduct.title}" updated successfully.`, 'success');
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    addToast('Product removed from catalog.', 'info');
  };

  const updateProductStock = (productId, newStock) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, stock: newStock, inStock: newStock > 0 }
          : p
      )
    );
    addToast('Inventory count adjusted.', 'success');
  };

  // User management
  const switchUserRole = (role) => {
    const updated = { ...currentUser, role };
    setCurrentUser(updated);
    addToast(`Switched active view role to "${role.toUpperCase()}".`, 'info');
  };

  const toggleUserStatus = (userId) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === userId
          ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
          : u
      )
    );
    addToast('User status updated.', 'info');
  };

  // Review management
  const addProductReview = (productId, reviewData) => {
    const newRev = {
      id: `REV-${Date.now()}`,
      productId,
      productTitle: products.find(p => p.id === productId)?.title || 'Product',
      customerName: reviewData.customerName || currentUser.name,
      rating: reviewData.rating,
      date: 'Just now',
      content: reviewData.content,
      status: 'Approved' // auto-approve in prototype
    };
    setReviews(prev => [newRev, ...prev]);
    addToast('Thank you! Your verified review has been published.', 'success');
  };

  const updateReviewStatus = (reviewId, status) => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, status } : r))
    );
    addToast(`Review status set to "${status}".`, 'info');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories: CATEGORIES,
        cart,
        cartItemCount,
        cartSubtotal,
        freeShippingThreshold,
        isFreeShipping,
        standardShippingFee,
        amountToFreeShipping,
        couponDiscount,
        estTax,
        cartTotal,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartDrawerOpen,
        openCartDrawer: () => setCartDrawerOpen(true),
        closeCartDrawer: () => setCartDrawerOpen(false),
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        orders,
        createOrder,
        updateOrderStatus,
        users,
        currentUser,
        setCurrentUser,
        switchUserRole,
        toggleUserStatus,
        reviews,
        addProductReview,
        updateReviewStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductStock,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
