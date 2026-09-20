// Fusion3D Works Mock Database for Users, Orders, Returns, Reviews & Admin Metrics

export const INITIAL_USERS = [
  {
    id: 'USR-1001',
    name: 'Manick Vijay',
    email: 'manickvijay596@gmail.com',
    phone: '+1 (555) 234-5678',
    role: 'admin',
    status: 'Active',
    ordersCount: 5,
    joinedDate: '12 Jan 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    city: 'San Francisco, CA',
    spentTotal: 1845.00
  },
  {
    id: 'USR-1002',
    name: 'Sarah Jenkins',
    email: 'sarah.j@aerotech-labs.com',
    phone: '+1 (555) 872-9102',
    role: 'customer',
    status: 'Active',
    ordersCount: 3,
    joinedDate: '05 Feb 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    city: 'Austin, TX',
    spentTotal: 980.50
  },
  {
    id: 'USR-1003',
    name: 'Dr. Michael Chen',
    email: 'mchen@biomed-research.org',
    phone: '+1 (555) 349-2189',
    role: 'customer',
    status: 'Active',
    ordersCount: 6,
    joinedDate: '18 Jan 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    city: 'Boston, MA',
    spentTotal: 2650.00
  },
  {
    id: 'USR-1004',
    name: 'Alexander Miller',
    email: 'alex.miller@rapidproto.io',
    phone: '+1 (555) 901-4432',
    role: 'customer',
    status: 'Active',
    ordersCount: 2,
    joinedDate: '28 Feb 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    city: 'Seattle, WA',
    spentTotal: 412.00
  },
  {
    id: 'USR-1005',
    name: 'David K. Vance',
    email: 'david.vance@precisionjigs.com',
    phone: '+1 (555) 438-1192',
    role: 'customer',
    status: 'Suspended',
    ordersCount: 0,
    joinedDate: '01 Mar 2026',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    city: 'Chicago, IL',
    spentTotal: 0.00
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'F3D-948210',
    trackingNumber: 'TRK-9842019US',
    carrier: 'FedEx Express 3D Priority',
    customerName: 'Manick Vijay',
    customerEmail: 'manickvijay596@gmail.com',
    customerPhone: '+1 (555) 234-5678',
    date: '19 Sep 2026, 09:30 AM',
    items: [
      {
        id: 'prod-printer-apex',
        title: 'Fusion3D Apex Pro CoreXY High-Speed 3D Printer',
        quantity: 1,
        price: 749.00,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
        variant: 'Standard Unit'
      },
      {
        id: 'prod-filament-pla',
        title: 'Fusion3D HyperSpeed PLA+ 1.75mm 1kg',
        quantity: 2,
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80',
        variant: 'Cobalt Blue'
      }
    ],
    subtotal: 798.98,
    deliveryFee: 0.00,
    discount: 50.00,
    tax: 59.92,
    total: 808.90,
    paymentMethod: 'Credit Card (Stripe Encrypted)',
    paymentStatus: 'Paid',
    status: 'Shipped',
    progress: 75,
    estimatedDelivery: '22 Sep 2026, by 4:30 PM',
    shippingAddress: {
      fullName: 'Manick Vijay',
      address: 'Suite 402, 100 Innovation Blvd',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States'
    },
    timeline: [
      { status: 'Order Placed', time: '19 Sep 2026, 09:30 AM', done: true, desc: 'Order received and verified by system.' },
      { status: 'Payment Confirmed', time: '19 Sep 2026, 09:32 AM', done: true, desc: 'Payment transaction authorized.' },
      { status: 'Processing', time: '19 Sep 2026, 11:00 AM', done: true, desc: 'Inspection and firmware flashing completed.' },
      { status: 'Packed', time: '19 Sep 2026, 02:45 PM', done: true, desc: 'Packaged in heavy-duty foam suspension crate.' },
      { status: 'Shipped', time: '19 Sep 2026, 05:20 PM', done: true, desc: 'Picked up by FedEx Express courier.' },
      { status: 'Out for Delivery', time: 'Pending', done: false, desc: 'Package scheduled on local delivery vehicle.' },
      { status: 'Delivered', time: 'Pending', done: false, desc: 'Delivered to recipient with signature.' }
    ]
  },
  {
    id: 'F3D-948211',
    trackingNumber: 'TRK-7481903US',
    carrier: 'UPS Air Freight',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@aerotech-labs.com',
    customerPhone: '+1 (555) 872-9102',
    date: '18 Sep 2026, 02:15 PM',
    items: [
      {
        id: 'prod-filament-petgcf',
        title: 'Carbon-Fiber Reinforced PETG-CF 1.75mm 1kg',
        quantity: 3,
        price: 38.99,
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
        variant: 'Carbon Stealth Black'
      },
      {
        id: 'prod-nozzle-hardened-kit',
        title: 'Hardened Steel High-Wear Nozzle 5-Piece Kit',
        quantity: 1,
        price: 26.99,
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
        variant: '0.4mm & 0.6mm Kit'
      }
    ],
    subtotal: 143.96,
    deliveryFee: 0.00,
    discount: 10.00,
    tax: 10.72,
    total: 144.68,
    paymentMethod: 'Corporate Net 30',
    paymentStatus: 'Paid',
    status: 'Delivered',
    progress: 100,
    estimatedDelivery: 'Delivered on 19 Sep 2026',
    shippingAddress: {
      fullName: 'Sarah Jenkins',
      address: 'Aerotech Hangar 4, 2500 Flightline Way',
      city: 'Austin',
      state: 'TX',
      postalCode: '78719',
      country: 'United States'
    },
    timeline: [
      { status: 'Order Placed', time: '18 Sep 2026, 02:15 PM', done: true, desc: 'Verified and queued.' },
      { status: 'Payment Confirmed', time: '18 Sep 2026, 02:20 PM', done: true, desc: 'Purchase order processed.' },
      { status: 'Processing', time: '18 Sep 2026, 03:00 PM', done: true, desc: 'Vacuum dry seal inspection passed.' },
      { status: 'Packed', time: '18 Sep 2026, 04:30 PM', done: true, desc: 'Packaged in shock-proof shipping container.' },
      { status: 'Shipped', time: '18 Sep 2026, 06:10 PM', done: true, desc: 'Dispatched via UPS Air Overnight.' },
      { status: 'Out for Delivery', time: '19 Sep 2026, 08:30 AM', done: true, desc: 'Loaded on local courier truck.' },
      { status: 'Delivered', time: '19 Sep 2026, 11:45 AM', done: true, desc: 'Signed by receiving security.' }
    ]
  },
  {
    id: 'F3D-948212',
    trackingNumber: 'TRK-2940124US',
    carrier: 'DHL Global Express',
    customerName: 'Dr. Michael Chen',
    customerEmail: 'mchen@biomed-research.org',
    customerPhone: '+1 (555) 349-2189',
    date: '17 Sep 2026, 10:20 AM',
    items: [
      {
        id: 'prod-custom-heart',
        title: 'Anatomical Human Heart 3D Model (Medical-Grade)',
        quantity: 2,
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
        variant: 'Anatomical Crimson'
      }
    ],
    subtotal: 99.98,
    deliveryFee: 12.00,
    discount: 0.00,
    tax: 7.99,
    total: 119.97,
    paymentMethod: 'Credit Card (Visa)',
    paymentStatus: 'Paid',
    status: 'Processing',
    progress: 45,
    estimatedDelivery: '23 Sep 2026',
    shippingAddress: {
      fullName: 'Dr. Michael Chen',
      address: 'BioMed Clinical Center, 45 Pasteur Way',
      city: 'Boston',
      state: 'MA',
      postalCode: '02115',
      country: 'United States'
    },
    timeline: [
      { status: 'Order Placed', time: '17 Sep 2026, 10:20 AM', done: true, desc: 'Medical print queue created.' },
      { status: 'Payment Confirmed', time: '17 Sep 2026, 10:22 AM', done: true, desc: 'Payment approved.' },
      { status: 'Processing', time: '18 Sep 2026, 08:00 AM', done: true, desc: '3D micro-layer curing in progress.' },
      { status: 'Packed', time: 'Pending', done: false, desc: 'Final post-cure and inspection.' },
      { status: 'Shipped', time: 'Pending', done: false, desc: 'Awaiting courier pickup.' },
      { status: 'Out for Delivery', time: 'Pending', done: false, desc: 'Scheduled delivery.' },
      { status: 'Delivered', time: 'Pending', done: false, desc: 'Pending.' }
    ]
  }
];

export const INITIAL_RETURNS = [
  {
    id: 'RET-401',
    orderId: 'F3D-948195',
    customerName: 'David K. Vance',
    customerEmail: 'david.vance@precisionjigs.com',
    product: 'High-Flow 300°C Ceramic Hotend Assembly',
    reason: 'Ordered wrong thread diameter (needed M7, received M6 standard)',
    requestDate: '15 Sep 2026',
    status: 'Under Review',
    refundAmount: 49.99
  },
  {
    id: 'RET-402',
    orderId: 'F3D-948182',
    customerName: 'Lisa Monroe',
    customerEmail: 'lisa.monroe@artstudios.com',
    product: '8K High-Definition Photopolymer UV Resin (1kg)',
    reason: 'Unopened duplicate bottle ordered in error',
    requestDate: '12 Sep 2026',
    status: 'Approved',
    refundAmount: 34.99
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'REV-101',
    productTitle: 'Fusion3D Apex Pro CoreXY 3D Printer',
    customerName: 'Marcus Vance',
    rating: 5,
    date: '14 Sep 2026',
    content: 'Blowing away every printer I have ever owned. 18-minute 3DBenchy with zero stringing and mirror-smooth walls.',
    status: 'Approved'
  },
  {
    id: 'REV-102',
    productTitle: 'Fusion3D HyperSpeed PLA+ 1.75mm 1kg',
    customerName: 'Dan Higgins',
    rating: 5,
    date: '11 Sep 2026',
    content: 'Zero stringing at 500mm/s on my Klipper machine. Colors are vibrant and matte.',
    status: 'Approved'
  },
  {
    id: 'REV-103',
    productTitle: 'Double-Sided Gold Textured PEI Spring Steel Plate',
    customerName: 'Arun K.',
    rating: 5,
    date: '08 Sep 2026',
    content: 'Adhesion is like magic. Prints stick firmly during the entire print, and when it cools down, they pop right off.',
    status: 'Pending'
  }
];

// Admin Dashboard Analytics Mock Data
export const ADMIN_ANALYTICS = {
  kpis: {
    totalRevenue: 128450.00,
    revenueGrowth: '+18.4%',
    totalOrders: 1420,
    ordersGrowth: '+12.1%',
    totalCustomers: 3840,
    customerGrowth: '+24.5%',
    totalProducts: 24,
    lowStockCount: 3,
    avgOrderValue: 90.45,
    fulfillmentRate: '99.2%'
  },
  salesHistory: [
    { day: 'Mon', revenue: 4200, orders: 42 },
    { day: 'Tue', revenue: 5800, orders: 58 },
    { day: 'Wed', revenue: 7100, orders: 69 },
    { day: 'Thu', revenue: 6400, orders: 61 },
    { day: 'Fri', revenue: 8900, orders: 84 },
    { day: 'Sat', revenue: 11200, orders: 108 },
    { day: 'Sun', revenue: 9800, orders: 94 }
  ],
  categoryBreakdown: [
    { name: '3D Printers', value: 48, fill: '#4f46e5' },
    { name: 'Filaments', value: 24, fill: '#06b6d4' },
    { name: 'Accessories', value: 12, fill: '#10b981' },
    { name: 'Resins', value: 8, fill: '#f59e0b' },
    { name: 'Spare Parts & Tools', value: 8, fill: '#f97316' }
  ],
  ordersByStatus: [
    { status: 'Delivered', count: 1180, color: '#10b981' },
    { status: 'Shipped', count: 142, color: '#3b82f6' },
    { status: 'Processing', count: 68, color: '#f59e0b' },
    { status: 'Cancelled/Refunded', count: 30, color: '#ef4444' }
  ]
};

export const MOCK_ANALYTICS = {
  monthlyRevenue: [
    { month: 'Apr', revenue: 84000 },
    { month: 'May', revenue: 92000 },
    { month: 'Jun', revenue: 104000 },
    { month: 'Jul', revenue: 112000 },
    { month: 'Aug', revenue: 119000 },
    { month: 'Sep', revenue: 128450 }
  ],
  categorySales: [
    { name: 'Printers', value: 48 },
    { name: 'Filaments', value: 24 },
    { name: 'Accessories', value: 12 },
    { name: 'Resins', value: 8 },
    { name: 'Spare Parts', value: 8 }
  ]
};

export const MOCK_USERS = INITIAL_USERS.map(u => ({
  ...u,
  tier: u.role === 'admin' ? 'Platform Administrator' : (u.spentTotal > 1500 ? 'Pro Maker VIP' : 'Verified Maker'),
  totalSpent: u.spentTotal || 0,
  company: u.city?.includes('San Francisco') ? 'HyperRobotics Lab' : (u.city?.includes('Austin') ? 'AeroTech Research' : 'Independent Maker')
}));

export const MOCK_REVIEWS = INITIAL_REVIEWS.map(r => ({
  ...r,
  userName: r.customerName,
  headline: r.productTitle,
  comment: r.content,
  verified: true
}));
