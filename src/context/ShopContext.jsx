import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';
import api, { API_BASE_URL } from '../services/api';

const ShopContext = createContext();

export const INITIAL_REGISTERED_USERS = [
  {
    id: 'USR-101',
    name: 'Alex Rivera',
    email: 'user@gmail.com',
    role: 'customer',
    phone: '+1 (555) 438-9021',
    address: '742 Evergreen Terrace, Springfield, OR 97477',
    registeredDate: '2026-01-15',
    ordersCount: 3,
    totalSpent: 79.97,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'ADM-201',
    name: 'Chief Maker David',
    email: 'admin@gmail.com',
    role: 'admin',
    phone: '+1 (800) 555-F3D',
    address: 'Fusion3D Central Print Lab, San Francisco, CA',
    registeredDate: '2025-11-01',
    ordersCount: 0,
    totalSpent: 0.00,
    status: 'Active (Staff)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'USR-102',
    name: 'Samantha Lee',
    email: 'samantha.lee@example.com',
    role: 'customer',
    phone: '+1 (555) 892-3310',
    address: '144 Ocean Boulevard, Santa Monica, CA 90401',
    registeredDate: '2026-02-10',
    ordersCount: 2,
    totalSpent: 52.98,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'USR-103',
    name: 'Jordan Martinez',
    email: 'jordan.m@designstudio.io',
    role: 'customer',
    phone: '+1 (555) 234-5678',
    address: '500 Tech Parkway, Austin, TX 78701',
    registeredDate: '2026-03-01',
    ordersCount: 5,
    totalSpent: 198.50,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_FILAMENTS = [
  { id: 'fil-1', name: 'Silk Gold', hex: '#F59E0B', material: 'PLA+ Silk', inStock: true },
  { id: 'fil-2', name: 'Matte Obsidian', hex: '#0F172A', material: 'PLA+ Matte', inStock: true },
  { id: 'fil-3', name: 'Pure White', hex: '#FFFFFF', material: 'PLA+ Standard', inStock: true },
  { id: 'fil-4', name: 'Cyber Cyan', hex: '#06B6D4', material: 'PETG High-Gloss', inStock: true },
  { id: 'fil-5', name: 'Neon Coral', hex: '#F43F5E', material: 'PLA+ PolyTerra', inStock: true },
  { id: 'fil-6', name: 'Emerald Green', hex: '#10B981', material: 'PLA+ PolyTerra', inStock: true },
  { id: 'fil-7', name: 'Deep Space Navy', hex: '#1E3A8A', material: 'PLA+ Tough', inStock: true },
  { id: 'fil-8', name: 'Pastel Lilac', hex: '#A855F7', material: 'PLA+ Silk', inStock: false },
  { id: 'fil-9', name: 'Graphite Gray', hex: '#475569', material: 'PETG Carbon', inStock: true },
  { id: 'fil-10', name: 'Ruby Crimson', hex: '#DC2626', material: 'PLA+ Silk', inStock: true },
];

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-3d-keychain',
    slug: '3d-keychain',
    name: '3D Keychains',
    description: 'Personalized dual-color typography and scannable code keychains',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    badge: 'Best Seller',
    displayOrder: 1,
    isActive: true,
    count: 2
  },
  {
    id: 'cat-cake-toppers',
    slug: 'cake-toppers',
    name: 'Cake Toppers',
    description: 'Food-safe organic bio-PLA script toppers for weddings & birthdays',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop&q=80',
    badge: 'Celebrations',
    displayOrder: 2,
    isActive: true,
    count: 1
  },
  {
    id: 'cat-name-boards',
    slug: 'name-boards',
    name: 'Name Boards & Signs',
    description: 'Freestanding desk nameplates with backlighting channels',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    badge: 'Interior Desk',
    displayOrder: 3,
    isActive: true,
    count: 1
  },
  {
    id: 'cat-3d-gift',
    slug: '3d-gift',
    name: '3D Gifts & Sculptures',
    description: 'Bespoke lithophane photo lamps, geometric sculptures, and desk art',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    badge: 'Art & Memory',
    displayOrder: 4,
    isActive: true,
    count: 4
  }
];

export const ORDER_STAGES = [
  { id: 'Order Placed', label: 'Order Placed', progress: 10, defaultNote: 'CAD model order received and queued for design engineer.' },
  { id: 'Design Stage', label: 'Design Stage', progress: 20, defaultNote: '3D typography and dimensional modeling in progress.' },
  { id: 'Preview Design Sent', label: 'Preview Design Sent', progress: 35, defaultNote: '3D preview model & render sent to customer for review and confirmation.' },
  { id: 'Ready for Printing', label: 'Ready for Printing', progress: 50, defaultNote: 'Design confirmed by customer! Multi-material gcode sliced.' },
  { id: 'Printing Started', label: 'Printing Started', progress: 65, defaultNote: 'Bed heated and multi-filament extrusion underway.' },
  { id: 'Printing Complete', label: 'Printing Complete', progress: 78, defaultNote: 'Finished printing! Cooled and removed from magnetic PEI bed.' },
  { id: 'QA Testing the Product', label: 'QA Testing the Product', progress: 85, defaultNote: 'Dimensional caliper check, deburring, and color separation pass.' },
  { id: 'Packing', label: 'Packing', progress: 90, defaultNote: 'Carefully wrapped in shock-absorbing eco packaging with tamper seal.' },
  { id: 'Shipping to Delivery Partner', label: 'Shipping to Delivery Partner', progress: 95, defaultNote: 'Handed over to courier partner with active dispatch tracking.' },
  { id: 'Delivered', label: 'Delivered', progress: 100, defaultNote: 'Package delivered safely to customer address.' }
];

export const INITIAL_PRINTERS = [
  {
    id: 'PRINTER-BAMBU-A1',
    name: 'Bambu Lab A1 (AMS Lite)',
    type: 'High-Speed Multi-Color CoreXY / Direct Drive (500 mm/s)',
    status: 'Printing', // Idle | Printing | Maintenance | Calibrating
    currentJobId: 'ORD-8821',
    currentJobName: 'Personalized 3D Dual-Color Keychain',
    layerProgress: '162 / 210',
    percentage: 77,
    timeLeft: '12m',
    tempNozzle: '220°C',
    tempBed: '65°C',
    spoolColors: ['#F59E0B', '#0F172A', '#06B6D4', '#FFFFFF'],
    preferredShift: 'Daytime Quick Turnaround'
  },
  {
    id: 'PRINTER-1',
    name: 'Bambu Lab X1-Carbon #1',
    type: 'Enclosed High-Temp CoreXY (AMS 4-Spool)',
    status: 'Idle',
    currentJobId: null,
    currentJobName: null,
    layerProgress: '0 / 0',
    percentage: 0,
    timeLeft: '--',
    tempNozzle: '24°C',
    tempBed: '25°C',
    spoolColors: ['#E2B872', '#18181B', '#EF4444', '#10B981'],
    preferredShift: 'Daytime & Nighttime'
  },
  {
    id: 'PRINTER-2',
    name: 'Prusa MK4 #2',
    type: 'Precision Single-Nozzle FDM',
    status: 'Idle',
    currentJobId: null,
    currentJobName: null,
    layerProgress: '0 / 0',
    percentage: 0,
    timeLeft: '--',
    tempNozzle: '25°C',
    tempBed: '24°C',
    spoolColors: ['#E2B872'],
    preferredShift: 'Daytime Quick Turnaround'
  },
  {
    id: 'PRINTER-3',
    name: 'Creality K1 Max #3',
    type: 'Large Format High-Speed FDM (300x300x300mm)',
    status: 'Idle',
    currentJobId: null,
    currentJobName: null,
    layerProgress: '0 / 0',
    percentage: 0,
    timeLeft: '--',
    tempNozzle: '26°C',
    tempBed: '24°C',
    spoolColors: ['#06B6D4', '#0F172A'],
    preferredShift: 'Night-Time Overnight Batch'
  },
  {
    id: 'PRINTER-4',
    name: 'Elegoo Saturn 4 Ultra #4',
    type: '12K High-Def Photopolymer UV Resin',
    status: 'Idle',
    currentJobId: null,
    currentJobName: null,
    layerProgress: '0 / 0',
    percentage: 0,
    timeLeft: '--',
    tempNozzle: 'N/A (Tilt-Release Resin)',
    tempBed: '30°C',
    spoolColors: ['#FFFFFF'],
    preferredShift: 'Night-Time Overnight Batch'
  }
];

const INITIAL_MOCK_ORDERS = [
  {
    id: 'ORD-8821',
    date: '2026-09-19',
    time: '14:30',
    createdAt: Date.now() - 45 * 60 * 1000,
    customerName: 'Alex Rivera',
    customerEmail: 'user@gmail.com',
    customerPhone: '+1 (555) 438-9021',
    items: [
      {
        productId: 'prod-keychain-dual',
        name: 'Personalized Dual-Color 3D Name Keychain',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        price: 12.99,
        quantity: 2,
        customText: 'ALEX & EMILY',
        selectedColors: { top_text: '#F59E0B', base_plate: '#0F172A' },
        printTimeMinutes: 45
      }
    ],
    subtotal: 25.98,
    shippingFee: 0.00,
    total: 25.98,
    paymentMethod: 'Credit Card (Visa)',
    status: 'Printing Started',
    statusProgress: 65,
    estimatedCompletion: 'Today, 5:45 PM',
    trackingNumber: 'BD-88219412',
    deliveryPartner: 'BlueDart Express',
    assignedPrinter: 'Bambu Lab A1 (AMS Lite)',
    designProof: {
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      modelType: 'keychain',
      approved: true,
      notes: 'Custom 3D extrusion with dual-tone filament chamfered border.'
    },
    timeline: [
      { status: 'Order Placed', time: '14:30', done: true, note: 'CAD model order recorded.' },
      { status: 'Design Stage', time: '14:40', done: true, note: '3D typography extruded & positioned.' },
      { status: 'Preview Design Sent', time: '14:48', done: true, note: 'Design proof approved by customer.' },
      { status: 'Ready for Printing', time: '14:55', done: true, note: 'Assigned to Bambu Lab A1 AMS 4-color.' },
      { status: 'Printing Started', time: '15:05', done: true, note: 'Bed: 65°C, Extruder: 220°C. Layer 162/210.' },
      { status: 'Printing Complete', time: 'Pending', done: false, note: 'Awaiting machine completion.' },
      { status: 'QA Testing the Product', time: 'Pending', done: false, note: 'Dimensional caliper check.' },
      { status: 'Packing', time: 'Pending', done: false, note: 'Packaging in padded bubble tin.' },
      { status: 'Shipping to Delivery Partner', time: 'Pending', done: false, note: 'Courier pickup scheduled.' },
      { status: 'Delivered', time: 'Pending', done: false, note: 'Pending delivery.' }
    ],
    shippingAddress: {
      fullName: 'Alex Rivera',
      address: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      zip: '97477'
    }
  },
  {
    id: 'ORD-8825',
    date: '2026-09-20',
    time: '00:35',
    createdAt: Date.now() - 12 * 60 * 1000, // 12 mins ago, eligible for cancellation
    customerName: 'Alex Rivera',
    customerEmail: 'user@gmail.com',
    customerPhone: '+1 (555) 438-9021',
    items: [
      {
        productId: 'prod-cake-topper-wedding',
        name: 'Custom Calligraphy Wedding Cake Topper',
        image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
        price: 24.50,
        quantity: 1,
        customText: 'Mr & Mrs Miller',
        selectedColors: { script_finish: '#E2B872' },
        printTimeMinutes: 85
      }
    ],
    subtotal: 24.50,
    shippingFee: 4.99,
    total: 29.49,
    paymentMethod: 'Apple Pay',
    status: 'Preview Design Sent',
    statusProgress: 35,
    estimatedCompletion: 'Tomorrow Evening',
    trackingNumber: 'DL-77189204',
    deliveryPartner: 'Delhivery Surface',
    assignedPrinter: null,
    designProof: {
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
      modelType: 'topper',
      approved: false,
      notes: 'Preview proof ready for your review: Gold calligraphy script with dual 70mm food-safe anchor stakes.'
    },
    timeline: [
      { status: 'Order Placed', time: '00:35', done: true, note: 'Order placed by user. Sits in designer queue.' },
      { status: 'Design Stage', time: '00:40', done: true, note: 'Curves vectorized and stabilized for support.' },
      { status: 'Preview Design Sent', time: '00:45', done: true, note: 'Awaiting customer review and confirmation.' },
      { status: 'Ready for Printing', time: 'Pending', done: false, note: 'Awaiting customer approval.' },
      { status: 'Printing Started', time: 'Pending', done: false, note: 'Will assign to Bambu Lab A1 or Prusa MK4.' },
      { status: 'Printing Complete', time: 'Pending', done: false, note: 'Pending.' },
      { status: 'QA Testing the Product', time: 'Pending', done: false, note: 'Pending.' },
      { status: 'Packing', time: 'Pending', done: false, note: 'Pending.' },
      { status: 'Shipping to Delivery Partner', time: 'Pending', done: false, note: 'Pending.' },
      { status: 'Delivered', time: 'Pending', done: false, note: 'Pending.' }
    ],
    shippingAddress: {
      fullName: 'Alex Rivera',
      address: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      zip: '97477'
    }
  }
];

export function ShopProvider({ children }) {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authToken, setAuthToken] = useState(() => {
    try {
      return localStorage.getItem('fusion3d_token') || null;
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Products Catalog
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_products');
      if (!saved) return INITIAL_PRODUCTS;
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_PRODUCTS;
      const hasValidProduct = parsed.some(p => p.customizableSections && Array.isArray(p.customizableSections) && p.reviews);
      return hasValidProduct ? parsed : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((item, idx) => ({
        ...item,
        cartItemId: item.cartItemId || item.id || `cart-item-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`,
        name: item.name || item.title || 'Custom 3D Print',
        image: item.image || item.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        price: typeof item.price === 'number' ? item.price : 14.99,
        quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
        selectedColors: (item.selectedColors && typeof item.selectedColors === 'object') ? item.selectedColors : (item.color ? { base: item.color } : {}),
        customText: item.customText || '',
        printTime: item.printTime || '45m',
        printTimeMinutes: Number(item.printTimeMinutes) || 45
      }));
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_wishlist');
      if (!saved) return ['prod-keychain-dual', 'prod-nameboard-desk'];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : ['prod-keychain-dual', 'prod-nameboard-desk'];
    } catch {
      return ['prod-keychain-dual', 'prod-nameboard-desk'];
    }
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_orders');
      if (!saved) return INITIAL_MOCK_ORDERS;
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_MOCK_ORDERS;
      return parsed.map(o => ({
        ...o,
        items: Array.isArray(o.items) ? o.items : [],
        timeline: Array.isArray(o.timeline) ? o.timeline : []
      }));
    } catch {
      return INITIAL_MOCK_ORDERS;
    }
  });

  // 3D Printers Farm
  const [printers, setPrinters] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_printers');
      return saved ? JSON.parse(saved) : INITIAL_PRINTERS;
    } catch {
      return INITIAL_PRINTERS;
    }
  });

  // Flying Cart Animation State
  const [flyingItem, setFlyingItem] = useState(null);
  const [cartBadgeBounce, setCartBadgeBounce] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Registered Users (Admin view & management)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_users_list');
      return saved ? JSON.parse(saved) : INITIAL_REGISTERED_USERS;
    } catch {
      return INITIAL_REGISTERED_USERS;
    }
  });

  // Custom inquiries & details requests
  const [customInquiries, setCustomInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filament Colors Inventory
  const [filaments, setFilaments] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_filaments');
      return saved ? JSON.parse(saved) : INITIAL_FILAMENTS;
    } catch {
      return INITIAL_FILAMENTS;
    }
  });

  // Dynamic Product Categories (Admin Managed & Dynamic Homepage)
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('fusion3d_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Backend Connectivity & Live Synchronization
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking' | 'connected' | 'sleeping' | 'offline'
  const [isBackendSyncing, setIsBackendSyncing] = useState(false);

  // Sync data from Render Spring Boot backend
  const syncWithBackend = useCallback(async (notify = false) => {
    setIsBackendSyncing(true);
    try {
      await api.health.check();
      setBackendStatus('connected');

      // Fetch live data from backend in parallel
      const [prodRes, orderRes, printerRes, usersRes, inqRes, filRes, catRes] = await Promise.allSettled([
        api.products.getAll(),
        api.orders.getAll(),
        api.printers.getAll(),
        api.auth.getUsers(),
        api.inquiries.getAll(),
        api.filaments.getAll(),
        api.categories.getAll(),
      ]);

      if (prodRes.status === 'fulfilled' && Array.isArray(prodRes.value) && prodRes.value.length > 0) {
        setProducts(prodRes.value);
      }
      if (orderRes.status === 'fulfilled' && Array.isArray(orderRes.value) && orderRes.value.length > 0) {
        setOrders(orderRes.value);
      }
      if (printerRes.status === 'fulfilled' && Array.isArray(printerRes.value) && printerRes.value.length > 0) {
        setPrinters(printerRes.value);
      }
      if (usersRes.status === 'fulfilled' && Array.isArray(usersRes.value) && usersRes.value.length > 0) {
        setRegisteredUsers(usersRes.value);
      }
      if (inqRes.status === 'fulfilled' && Array.isArray(inqRes.value) && inqRes.value.length > 0) {
        setCustomInquiries(inqRes.value);
      }
      if (filRes.status === 'fulfilled' && Array.isArray(filRes.value) && filRes.value.length > 0) {
        setFilaments(filRes.value);
      }
      if (catRes.status === 'fulfilled' && Array.isArray(catRes.value) && catRes.value.length > 0) {
        setCategories(catRes.value);
      }

      if (notify) {
        addToast('Synced live data with Render backend!', 'success');
      }
    } catch (err) {
      console.log('Backend not currently reachable (Render cold start or building):', err.message);
      setBackendStatus('sleeping');
    } finally {
      setIsBackendSyncing(false);
    }
  }, [addToast]);

  // Initial Sync & Background Polling for Render Spinup
  useEffect(() => {
    let active = true;
    const runInitialSync = async () => {
      if (active) {
        await syncWithBackend();
      }
    };
    runInitialSync();

    // Check periodically until Render container responds
    const timer = setInterval(() => {
      if (active) {
        syncWithBackend();
      }
    }, 25000);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [syncWithBackend]);

  // Persist State to LocalStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('fusion3d_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('fusion3d_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_users_list', JSON.stringify(registeredUsers));
    } catch (e) {
      console.error(e);
    }
  }, [registeredUsers]);

  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_inquiries', JSON.stringify(customInquiries));
    } catch (e) {
      console.error(e);
    }
  }, [customInquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_filaments', JSON.stringify(filaments));
    } catch (e) {
      console.error(e);
    }
  }, [filaments]);

  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_printers', JSON.stringify(printers));
    } catch (e) {
      console.error(e);
    }
  }, [printers]);

  useEffect(() => {
    try {
      localStorage.setItem('fusion3d_categories', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  // Auth Operations (Live Render PostgreSQL Backend Authentication & Registration)
  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const res = await api.auth.login(cleanEmail, password);
      if (res && res.success && res.user) {
        const userObj = {
          id: res.user.id || `USR-${Date.now().toString().slice(-4)}`,
          name: res.user.name || cleanEmail.split('@')[0],
          email: res.user.email || cleanEmail,
          role: (res.user.role || res.role || 'customer').toLowerCase(),
          phone: res.user.phone || '',
          address: res.user.address || '',
          avatar: res.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(res.user.name || cleanEmail)}`,
          registeredDate: res.user.registeredDate || new Date().toISOString().split('T')[0],
          memberSince: res.user.memberSince || 'Active Member',
          favoriteColor: res.user.favoriteColor || 'Silk Gold',
          status: res.user.status || 'Active'
        };
        setCurrentUser(userObj);
        localStorage.setItem('fusion3d_user', JSON.stringify(userObj));
        if (res.token) {
          setAuthToken(res.token);
          localStorage.setItem('fusion3d_token', res.token);
        }
        addToast(`Welcome back, ${userObj.name}!`, 'success');
        setIsLoginModalOpen(false);
        return { success: true, role: userObj.role, user: userObj };
      } else {
        const msg = res?.message || 'Invalid email or password.';
        return { success: false, message: msg };
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.message || 'Login failed. Please check your credentials or network.';
      return { success: false, message: msg };
    }
  };

  // Live User Registration directly to Render PostgreSQL
  const register = async ({ name, email, password, phone = '', role = 'customer', address = '' }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = (name || '').trim();
    const cleanRole = (role || 'customer').toLowerCase();

    try {
      const payload = {
        name: cleanName,
        email: cleanEmail,
        password: password,
        phone: (phone || '').trim(),
        role: cleanRole,
        address: (address || '').trim(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanName || cleanEmail)}`,
        status: cleanRole === 'admin' ? 'Active (Staff)' : 'Active',
        registeredDate: new Date().toISOString().split('T')[0],
        memberSince: `Member since ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
      };

      const created = await api.auth.register(payload);
      if (created && (created.email || created.id)) {
        const userObj = {
          id: created.id || `USR-${Date.now().toString().slice(-4)}`,
          name: created.name || cleanName,
          email: created.email || cleanEmail,
          role: (created.role || cleanRole).toLowerCase(),
          phone: created.phone || payload.phone,
          address: created.address || payload.address,
          avatar: created.avatar || payload.avatar,
          registeredDate: created.registeredDate || payload.registeredDate,
          memberSince: created.memberSince || payload.memberSince,
          favoriteColor: created.favoriteColor || 'Silk Gold',
          status: created.status || payload.status
        };

        setCurrentUser(userObj);
        localStorage.setItem('fusion3d_user', JSON.stringify(userObj));
        if (created.token) {
          setAuthToken(created.token);
          localStorage.setItem('fusion3d_token', created.token);
        }
        setRegisteredUsers(prev => [userObj, ...prev.filter(u => u.email !== userObj.email)]);
        addToast(`Account created successfully! Welcome to Fusion3D, ${userObj.name}.`, 'success');
        setIsLoginModalOpen(false);
        return { success: true, user: userObj };
      }
      return { success: false, message: 'Registration could not be completed.' };
    } catch (err) {
      console.error('Registration error:', err);
      const msg = err.message || 'Registration failed. Please check your credentials.';
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setAuthToken(null);
    localStorage.removeItem('fusion3d_user');
    localStorage.removeItem('fusion3d_token');
    addToast('You have been signed out.', 'info');
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      await api.auth.changePassword(oldPassword, newPassword);
      addToast('Password changed successfully!', 'success');
      return { success: true };
    } catch (err) {
      const msg = err.message || 'Failed to update password.';
      addToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const deleteUser = async (userId) => {
    setRegisteredUsers(prev => prev.filter(u => u.id !== userId));
    addToast('User account removed.', 'info');
    api.auth.deleteUser(userId).catch(err => console.log('Delete user sync:', err.message));
  };

  const updateUserProfile = async (updatedFields) => {
    if (!currentUser) return { success: false, message: 'Not signed in' };
    try {
      const merged = { ...currentUser, ...updatedFields };
      setCurrentUser(merged);
      localStorage.setItem('fusion3d_user', JSON.stringify(merged));

      if (currentUser.id) {
        await api.auth.updateUser(currentUser.id, updatedFields);
      }
      addToast('Profile updated successfully!', 'success');
      return { success: true, user: merged };
    } catch (err) {
      console.error('Update profile error:', err);
      addToast('Profile saved locally.', 'info');
      return { success: true };
    }
  };

  // Trigger Flying Animation To Cart Icon
  const triggerFlyAnimation = (image, startX, startY) => {
    // Header cart button target coordinate estimation
    const cartButtonEl = document.getElementById('header-cart-button');
    let targetX = window.innerWidth - 60;
    let targetY = 32;
    if (cartButtonEl) {
      const rect = cartButtonEl.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
    }

    setFlyingItem({
      id: Date.now(),
      image,
      startX: startX || window.innerWidth / 2,
      startY: startY || window.innerHeight / 2,
      targetX,
      targetY
    });

    // After animation ends, bounce the cart icon
    setTimeout(() => {
      setFlyingItem(null);
      setCartBadgeBounce(true);
      setTimeout(() => setCartBadgeBounce(false), 600);
    }, 850);
  };

  // Cart Operations
  const addToCart = (product, customOptions = {}, clickEvent = null) => {
    if (clickEvent) {
      const clientX = clickEvent.clientX || (clickEvent.touches && clickEvent.touches[0]?.clientX);
      const clientY = clickEvent.clientY || (clickEvent.touches && clickEvent.touches[0]?.clientY);
      triggerFlyAnimation(product.image, clientX, clientY);
    } else {
      triggerFlyAnimation(product.image, window.innerWidth / 2, window.innerHeight / 2);
    }

    setCart(prevCart => {
      // Check if exact same product with identical customization already exists
      const existingIndex = prevCart.findIndex(item =>
        item.productId === product.id &&
        item.customText === (customOptions.customText || '') &&
        JSON.stringify(item.selectedColors) === JSON.stringify(customOptions.selectedColors || {})
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += (customOptions.quantity || 1);
        return updated;
      } else {
        const newItem = {
          cartItemId: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: customOptions.quantity || 1,
          customText: customOptions.customText || '',
          selectedColors: customOptions.selectedColors || {},
          userImages: customOptions.userImages || [],
          printTime: product.printTime,
          printTimeMinutes: product.printTimeMinutes || 60,
          category: product.category,
          material: product.material || 'PLA+'
        };
        return [...prevCart, newItem];
      }
    });

    addToast(`Added "${product.name}" to your 3D print cart!`, 'success');
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => (prev || []).map(item =>
      (item.cartItemId === cartItemId || item.id === cartItemId) ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => (prev || []).filter(item => item.cartItemId !== cartItemId && item.id !== cartItemId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from saved items', 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Saved to your wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  // Orders Placement (STARTS IN 'Order Placed' - NOT SENT TO PRINTER AUTOMATICALLY!)
  const placeOrder = (orderData) => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingNumber = `BD-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const initialTimeline = ORDER_STAGES.map((stage, idx) => ({
      status: stage.id,
      time: idx === 0 ? 'Just now' : 'Pending',
      done: idx === 0,
      note: stage.defaultNote
    }));

    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: Date.now(), // timestamp for 30m cancel window
      customerName: orderData.shippingAddress?.fullName || currentUser?.name || 'Customer',
      customerEmail: currentUser?.email || orderData.shippingAddress?.email || orderData.customerEmail || 'customer@fusion3dworks.com',
      customerPhone: orderData.shippingAddress?.phone || currentUser?.phone || '',
      items: orderData.items || cart,
      subtotal: orderData.subtotal,
      shippingFee: orderData.shippingFee || 0,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod || 'Credit Card (Stripe Encrypted)',
      status: 'Order Placed', // User places order -> Design Queue, NOT printer directly!
      statusProgress: 10,
      estimatedCompletion: 'In 24–48 hours',
      trackingNumber,
      deliveryPartner: 'BlueDart Express',
      assignedPrinter: null, // Admin manually manages & assigns printer!
      designProof: {
        image: orderData.items?.[0]?.image || null,
        modelType: orderData.items?.[0]?.modelType || orderData.items?.[0]?.category || 'custom',
        approved: false,
        notes: 'Order received. Designer is extruding custom 3D geometry.'
      },
      timeline: initialTimeline,
      shippingAddress: orderData.shippingAddress || {}
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    addToast(`Order ${orderId} placed! Recorded in 3D production pipeline.`, 'success');

    // Asynchronously sync with Render backend
    api.orders.create(newOrder)
      .then(created => {
        if (created && created.id) {
          setOrders(prev => prev.map(o => o.id === orderId ? created : o));
        }
      })
      .catch(err => {
        console.log('Order created locally, backend queued:', err.message);
      });

    return newOrder;
  };

  // Order Cancellation (Within 30 mins or before leaving Design Stage)
  const cancelOrder = (orderId, reason = 'Customer requested cancellation') => {
    const cancelTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: 'Cancelled',
          statusProgress: 0,
          cancelledAt: Date.now(),
          cancellationReason: reason,
          timeline: [
            ...(order.timeline || []),
            { status: 'Order Cancelled', time: cancelTime, done: true, note: `Cancelled by customer: ${reason}` }
          ]
        };
      }
      return order;
    }));
    addToast(`Order #${orderId} has been cancelled.`, 'info');
    api.orders.cancel(orderId, reason).catch(err => console.log('Cancel order sync:', err.message));
  };

  // Update order status with 10-step pipeline & extra assets (Admin)
  const adminUpdateOrderStatus = (orderId, newStatus, extraData = {}) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const stageObj = ORDER_STAGES.find(s => s.id === newStatus);
        const stageIndex = ORDER_STAGES.findIndex(s => s.id === newStatus);
        const progress = stageObj ? stageObj.progress : order.statusProgress;

        const updatedTimeline = (order.timeline || []).map((step, idx) => {
          if (idx <= stageIndex) {
            return {
              ...step,
              done: true,
              time: step.time === 'Pending' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : step.time,
              note: (idx === stageIndex && extraData.note) ? extraData.note : step.note
            };
          }
          return step;
        });

        const updatedDesignProof = extraData.designProof
          ? { ...order.designProof, ...extraData.designProof }
          : order.designProof;

        return {
          ...order,
          status: newStatus,
          statusProgress: progress,
          assignedPrinter: extraData.assignedPrinter !== undefined ? extraData.assignedPrinter : order.assignedPrinter,
          deliveryPartner: extraData.deliveryPartner || order.deliveryPartner,
          trackingNumber: extraData.trackingNumber || order.trackingNumber,
          designProof: updatedDesignProof,
          timeline: updatedTimeline
        };
      }
      return order;
    }));

    // If an assigned printer was designated and status is 'Printing Started'
    if (extraData.assignedPrinter && (newStatus === 'Printing Started' || newStatus === 'Ready for Printing')) {
      setPrinters(prev => prev.map(printer => {
        if (printer.name === extraData.assignedPrinter || printer.id === extraData.printerId) {
          return {
            ...printer,
            status: 'Printing',
            currentJobId: orderId,
            currentJobName: `Order ${orderId}`,
            percentage: 15,
            timeLeft: extraData.timeLeft || '45m'
          };
        }
        return printer;
      }));
    }

    addToast(`Order ${orderId} updated to "${newStatus}"`, 'info');

    api.orders.updateStatus(orderId, { newStatus, ...extraData })
      .catch(err => console.log('Admin order status sync:', err.message));
  };

  // Backwards compatible status updater
  const updateOrderStatus = (orderId, newStatus) => {
    adminUpdateOrderStatus(orderId, newStatus);
  };

  // Customer approves design proof
  const customerApproveDesign = (orderId) => {
    adminUpdateOrderStatus(orderId, 'Ready for Printing', {
      note: 'Customer approved 3D design proof in online portal.',
      designProof: { approved: true }
    });
    addToast('3D Design proof confirmed! Your order is now ready for 3D printing.', 'success');
    api.orders.approveProof(orderId).catch(err => console.log('Approve proof sync:', err.message));
  };

  // Customer requests design changes
  const customerRequestDesignChanges = (orderId, changesNote) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: 'Design Stage',
          designProof: {
            ...order.designProof,
            approved: false,
            userFeedback: changesNote
          },
          timeline: (order.timeline || []).map(t =>
            t.status === 'Preview Design Sent'
              ? { ...t, done: false, note: `Revision requested: "${changesNote}"` }
              : t
          )
        };
      }
      return order;
    }));
    addToast('Change request submitted to our 3D design engineer.', 'info');
    api.orders.requestProofChanges(orderId, changesNote).catch(err => console.log('Proof changes sync:', err.message));
  };

  // Assign Order to Printer based on Print Time / Schedule
  const assignOrderToPrinter = (orderId, printerId, timeShift = 'Daytime Quick Turnaround') => {
    const targetPrinter = printers.find(p => p.id === printerId || p.name === printerId);
    if (!targetPrinter) return;

    adminUpdateOrderStatus(orderId, 'Printing Started', {
      assignedPrinter: targetPrinter.name,
      printerId: targetPrinter.id,
      note: `Assigned to ${targetPrinter.name} (${timeShift})`
    });

    setPrinters(prev => prev.map(p => {
      if (p.id === targetPrinter.id) {
        return {
          ...p,
          status: 'Printing',
          currentJobId: orderId,
          currentJobName: `Job #${orderId}`,
          percentage: 10,
          timeLeft: '40m'
        };
      }
      return p;
    }));

    addToast(`Assigned Order ${orderId} to machine: ${targetPrinter.name}`, 'success');
    api.orders.assignPrinter(orderId, { printerId: targetPrinter.id, timeShift }).catch(err => console.log('Assign printer sync:', err.message));
  };

  // Products CRUD & Discount Management (Admin)
  const addProduct = (newProduct) => {
    const id = newProduct.id || `prod-${Date.now()}`;
    const productWithDefaults = {
      ...newProduct,
      id,
      rating: 5.0,
      reviewsCount: 0,
      badge: newProduct.badge || 'New Arrival',
      gallery: newProduct.gallery && newProduct.gallery.length > 0 ? newProduct.gallery : [newProduct.image]
    };
    setProducts(prev => [productWithDefaults, ...prev]);
    addToast(`Created 3D product: "${newProduct.name}"!`, 'success');

    api.products.create(productWithDefaults)
      .then(created => {
        if (created?.id) {
          setProducts(prev => prev.map(p => p.id === id ? created : p));
        }
      })
      .catch(err => console.log('Create product sync:', err.message));
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    addToast('Product specifications updated successfully', 'success');
    api.products.update(id, updatedFields).catch(err => console.log('Update product sync:', err.message));
  };

  const updateProductWithDiscount = (productId, updateData) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        let finalPrice = typeof updateData.price === 'number' ? updateData.price : p.price;
        let originalPrice = updateData.originalPrice || p.originalPrice || finalPrice;
        const discountPercent = Number(updateData.discountPercent) || 0;

        if (discountPercent > 0) {
          if (!updateData.originalPrice) {
            originalPrice = finalPrice;
          }
          finalPrice = parseFloat((originalPrice * (1 - discountPercent / 100)).toFixed(2));
        }

        return {
          ...p,
          ...updateData,
          price: finalPrice,
          originalPrice,
          discountPercent
        };
      }
      return p;
    }));
    addToast('Product specifications & discount applied successfully!', 'success');
    api.products.applyDiscount(productId, updateData).catch(err => console.log('Discount sync:', err.message));
  };

  // Add more colors to product customizable section
  const addColorToProduct = (productId, sectionId, newColor) => {
    let updatedProduct = null;
    setProducts(prev => prev.map(p => {
      if (p.id === productId && p.customizableSections) {
        updatedProduct = {
          ...p,
          customizableSections: p.customizableSections.map(sec => {
            if (sec.id === sectionId || (!sectionId && sec.options)) {
              return {
                ...sec,
                options: [...(sec.options || []), newColor]
              };
            }
            return sec;
          })
        };
        return updatedProduct;
      }
      return p;
    }));
    addToast(`Added new color "${newColor.name}" (${newColor.hex})!`, 'success');
    if (updatedProduct) {
      api.products.update(productId, updatedProduct).catch(err => console.log('Color update sync:', err.message));
    }
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('Product removed from catalog', 'info');
    api.products.delete(id).catch(err => console.log('Delete product sync:', err.message));
  };

  // Submit verified product rating & review
  const submitProductReview = (productId, orderId, rating, comment, reviewerName = 'Verified Customer', userImages = []) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const currentReviews = p.reviews || [];
        const currentCount = p.reviewsCount || currentReviews.length;
        const currentRating = p.rating || 5.0;
        const newCount = currentCount + 1;
        const newAvg = parseFloat(((currentRating * currentCount + rating) / newCount).toFixed(1));
        const newReview = {
          id: `rev-${Date.now()}`,
          author: reviewerName || 'Verified Customer',
          rating: Number(rating),
          date: 'Just now',
          comment,
          verified: true,
          images: Array.isArray(userImages) ? userImages : []
        };
        return {
          ...p,
          rating: newAvg,
          reviewsCount: newCount,
          reviews: [newReview, ...currentReviews]
        };
      }
      return p;
    }));

    if (orderId) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, isReviewed: true, userRating: rating } : o));
    }

    addToast('Thank you for rating and reviewing your 3D printed item!', 'success');

    api.products.submitReview(productId, {
      rating: Number(rating),
      comment,
      author: reviewerName,
      images: Array.isArray(userImages) ? userImages : []
    }).catch(err => console.log('Review sync:', err.message));
  };

  // Submit custom inquiry / "Ask Details"
  const submitCustomRequest = (inquiry) => {
    const newInquiry = {
      id: `INQ-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      createdAt: Date.now(),
      status: 'Pending Review',
      ...inquiry
    };
    setCustomInquiries(prev => [newInquiry, ...prev]);
    addToast('Custom specifications inquiry submitted to our 3D design team!', 'success');
    api.inquiries.create(newInquiry).catch(err => console.log('Inquiry sync:', err.message));
    return newInquiry;
  };

  const updateInquiryStatus = (inquiryId, status) => {
    setCustomInquiries(prev => prev.map(i => i.id === inquiryId ? { ...i, status } : i));
    addToast(`Inquiry status updated to "${status}"`, 'info');
    api.inquiries.updateStatus(inquiryId, status).catch(err => console.log('Inquiry status sync:', err.message));
  };

  const replyToInquiry = (inquiryId, replyData) => {
    setCustomInquiries(prev => prev.map(i => {
      if (i.id === inquiryId) {
        return {
          ...i,
          status: 'Quoted',
          quoteAmount: replyData.quoteAmount != null ? Number(replyData.quoteAmount) : i.quoteAmount,
          adminReply: replyData.adminReply || replyData.notes || i.adminReply
        };
      }
      return i;
    }));
    addToast('Quote and specifications reply saved and dispatched!', 'success');
    api.inquiries.reply(inquiryId, replyData).catch(err => console.log('Inquiry reply sync:', err.message));
  };

  const deleteInquiry = (inquiryId) => {
    setCustomInquiries(prev => prev.filter(i => i.id !== inquiryId));
    addToast('Inquiry removed from queue.', 'info');
    api.inquiries.delete(inquiryId).catch(err => console.log('Inquiry delete sync:', err.message));
  };

  // QA Check Action
  const qaCheckOrder = (orderId, qaData = {}) => {
    const tolerance = qaData.tolerance || '< 0.08mm (Caliper Verified)';
    adminUpdateOrderStatus(orderId, 'QA Testing the Product', {
      note: `QA Inspection Passed: Tolerances within ${tolerance}. Surface deburred.`
    });
    api.orders.qaCheck(orderId, { pass: true, tolerance, notes: qaData.notes }).catch(err => console.log('QA check sync:', err.message));
  };

  // Order Deletion / Archival
  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    addToast(`Order ${orderId} removed.`, 'info');
    api.orders.delete(orderId).catch(err => console.log('Delete order sync:', err.message));
  };

  // 3D Printer Work List / Farm Controls (Admin)
  const updatePrinterStatus = (printerId, statusUpdates) => {
    const updates = typeof statusUpdates === 'string' ? { status: statusUpdates } : statusUpdates;
    setPrinters(prev => prev.map(p => {
      if (p.id === printerId) {
        const updated = { ...p, ...updates };
        if (updates.status === 'Idle') {
          updated.currentJobId = null;
          updated.currentJobName = null;
          updated.percentage = 0;
          updated.timeLeft = '--';
        }
        return updated;
      }
      return p;
    }));
    api.printers.updateStatus(printerId, updates).catch(err => console.log('Printer update sync:', err.message));
  };

  const togglePrinterMaintenance = (printerId) => {
    setPrinters(prev => prev.map(p => {
      if (p.id === printerId) {
        const isMaint = p.status === 'Maintenance' || p.status === 'Calibrating';
        return {
          ...p,
          status: isMaint ? 'Idle' : 'Maintenance',
          currentJobId: isMaint ? null : p.currentJobId,
          percentage: isMaint ? 0 : p.percentage
        };
      }
      return p;
    }));
    addToast('Machine maintenance status toggled.', 'info');
    api.printers.toggleMaintenance(printerId).catch(err => console.log('Maintenance sync:', err.message));
  };

  const clearPrinterJob = (printerId) => {
    setPrinters(prev => prev.map(p => {
      if (p.id === printerId) {
        return {
          ...p,
          status: 'Idle',
          currentJobId: null,
          currentJobName: null,
          percentage: 0,
          timeLeft: '--'
        };
      }
      return p;
    }));
    addToast('Printer job cleared and marked Idle.', 'success');
    api.printers.clearJob(printerId).catch(err => console.log('Clear job sync:', err.message));
  };

  // Filament Color Manager Operations (Admin)
  const addFilament = (newFil) => {
    const item = {
      id: newFil.id || `fil-${Date.now()}`,
      name: (newFil.name || 'Custom Filament').trim(),
      hex: newFil.hex || '#F59E0B',
      material: newFil.material || 'PLA+ Silk',
      inStock: newFil.inStock !== false
    };
    setFilaments(prev => [item, ...prev]);
    addToast(`Added filament color "${item.name}"!`, 'success');
    api.filaments.create(item).catch(err => console.log('Filament create sync:', err.message));
    return item;
  };

  const updateFilament = (id, updates) => {
    setFilaments(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    addToast('Filament color updated.', 'success');
    api.filaments.update(id, updates).catch(err => console.log('Filament update sync:', err.message));
  };

  const toggleFilamentStock = (id, inStock) => {
    setFilaments(prev => prev.map(f => {
      if (f.id === id) {
        const nextStock = inStock !== undefined ? inStock : !f.inStock;
        return { ...f, inStock: nextStock };
      }
      return f;
    }));
    addToast('Filament stock status updated.', 'info');
    api.filaments.toggleStock(id, inStock).catch(err => console.log('Filament stock sync:', err.message));
  };

  const deleteFilament = (id) => {
    setFilaments(prev => prev.filter(f => f.id !== id));
    addToast('Filament color removed from inventory.', 'info');
    api.filaments.delete(id).catch(err => console.log('Filament delete sync:', err.message));
  };

  // Category Management Operations (Admin & Dynamic Catalog)
  const createCategory = async (categoryData) => {
    try {
      const cleanSlug = (categoryData.slug || categoryData.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const newCat = {
        id: `cat-${Date.now()}`,
        slug: cleanSlug,
        name: (categoryData.name || 'New Category').trim(),
        description: categoryData.description || '',
        imageUrl: categoryData.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        badge: categoryData.badge || 'New',
        displayOrder: Number(categoryData.displayOrder) || (categories.length + 1),
        isActive: true,
        count: 0
      };

      setCategories(prev => [...prev, newCat]);
      addToast(`Category "${newCat.name}" created successfully!`, 'success');

      api.categories.create(newCat)
        .then(res => {
          if (res?.id) {
            setCategories(prev => prev.map(c => c.id === newCat.id ? res : c));
          }
        })
        .catch(err => console.log('Category create sync:', err.message));

      return newCat;
    } catch (err) {
      console.error('Error creating category:', err);
      addToast('Failed to create category', 'error');
      throw err;
    }
  };

  const updateCategory = async (id, updates) => {
    try {
      setCategories(prev => prev.map(c => (c.id === id || c.slug === id) ? { ...c, ...updates } : c));
      addToast('Category updated.', 'success');

      api.categories.update(id, updates).catch(err => console.log('Category update sync:', err.message));
    } catch (err) {
      console.error('Error updating category:', err);
      addToast('Failed to update category', 'error');
    }
  };

  const deleteCategory = async (id) => {
    try {
      setCategories(prev => prev.filter(c => c.id !== id && c.slug !== id));
      addToast('Category deleted from catalog.', 'info');

      api.categories.delete(id).catch(err => console.log('Category delete sync:', err.message));
    } catch (err) {
      console.error('Error deleting category:', err);
      addToast('Failed to delete category', 'error');
    }
  };

  // Enterprise Order Management Operations
  const updateEnterpriseOrder = async (orderId, enterpriseData) => {
    try {
      setOrders(prev => prev.map(o => {
        if (o.id === orderId) {
          const updated = { ...o, ...enterpriseData };
          if (enterpriseData.internalNote) {
            const noteObj = {
              id: `note-${Date.now()}`,
              text: enterpriseData.internalNote,
              createdAt: new Date().toISOString(),
              author: 'Administrator'
            };
            updated.internalNotes = [...(o.internalNotes || []), noteObj];
          }
          return updated;
        }
        return o;
      }));

      addToast('Enterprise order details updated successfully!', 'success');
      const res = await api.orders.updateEnterprise(orderId, enterpriseData);
      if (res && res.id) {
        setOrders(prev => prev.map(o => o.id === orderId ? res : o));
      }
      return res;
    } catch (err) {
      console.error('Enterprise order update error:', err);
      addToast('Failed to update enterprise order details.', 'error');
    }
  };

  const addOrderAdminNote = async (orderId, noteText) => {
    try {
      const res = await api.orders.addNote(orderId, noteText);
      setOrders(prev => prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            internalNotes: [...(o.internalNotes || []), res]
          };
        }
        return o;
      }));
      addToast('Admin note added to order dossier.', 'success');
      return res;
    } catch (err) {
      console.error('Add note error:', err);
      addToast('Failed to add internal note', 'error');
    }
  };

  // S3 Cloud CAD/Asset Uploader
  const uploadStorageFile = async (file, folder = 'models') => {
    return api.storage.upload(file, folder);
  };

  const uploadStorageFiles = async (files, folder = 'products') => {
    return api.storage.uploadMultiple(files, folder);
  };

  // Cart Calculations
  const cartItemCount = (cart || []).reduce((sum, item) => sum + (Number(item?.quantity) || 1), 0);
  const cartSubtotal = (cart || []).reduce((sum, item) => sum + ((Number(item?.price) || 0) * (Number(item?.quantity) || 1)), 0);
  const totalPrintMinutes = (cart || []).reduce((sum, item) => sum + ((Number(item?.printTimeMinutes) || 45) * (Number(item?.quantity) || 1)), 0);

  return (
    <ShopContext.Provider
      value={{
        // Auth
        currentUser,
        authToken,
        login,
        register,
        logout,
        updateUserProfile,
        changePassword,
        deleteUser,
        isLoginModalOpen,
        setIsLoginModalOpen,

        // Catalog & Categories
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        createCategory,
        updateCategory,
        deleteCategory,

        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
        cartSubtotal,
        totalPrintMinutes,
        isCartOpen,
        setIsCartOpen,

        // Wishlist
        wishlist,
        toggleWishlist,

        // Orders
        orders,
        placeOrder,
        updateOrderStatus,
        adminUpdateOrderStatus,
        updateEnterpriseOrder,
        addOrderAdminNote,
        cancelOrder,
        deleteOrder,
        customerApproveDesign,
        customerRequestDesignChanges,
        assignOrderToPrinter,
        qaCheckOrder,
        ORDER_STAGES,

        // 3D Printers
        printers,
        updatePrinterStatus,
        togglePrinterMaintenance,
        clearPrinterJob,

        // Admin & Management
        registeredUsers,
        setRegisteredUsers,
        updateProductWithDiscount,
        addColorToProduct,
        submitProductReview,
        customInquiries,
        submitCustomRequest,
        updateInquiryStatus,
        replyToInquiry,
        deleteInquiry,

        // Filament Color Inventory (Admin & Customer Selection)
        filaments,
        addFilament,
        updateFilament,
        toggleFilamentStock,
        deleteFilament,
        INITIAL_FILAMENTS,

        // Flying Animation
        flyingItem,
        cartBadgeBounce,

        // Modals & Toasts
        toasts,
        addToast,
        removeToast,
        quickViewProduct,
        setQuickViewProduct,

        // Live Render Backend Connectivity
        backendStatus,
        isBackendSyncing,
        syncWithBackend,
        backendUrl: API_BASE_URL,
        uploadStorageFile,
        uploadStorageFiles
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
