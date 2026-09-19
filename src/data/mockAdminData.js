// Initial mock database for Users, Orders, and Admin Settings

export const INITIAL_USERS = [
  {
    id: 'USR-1001',
    name: 'Manick Vijay',
    email: 'manickvijay596@gmail.com',
    phone: '+91 98765 43210',
    role: 'admin',
    status: 'Active',
    ordersCount: 4,
    joinedDate: '12 Jan 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    city: 'Bangalore, Karnataka'
  },
  {
    id: 'USR-1002',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98112 34567',
    role: 'customer',
    status: 'Active',
    ordersCount: 2,
    joinedDate: '05 Feb 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    city: 'Mumbai, Maharashtra'
  },
  {
    id: 'USR-1003',
    name: 'Dr. Rajesh Nair',
    email: 'rajesh.cardio@medhospital.org',
    phone: '+91 94470 12890',
    role: 'customer',
    status: 'Active',
    ordersCount: 6,
    joinedDate: '18 Jan 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    city: 'Chennai, Tamil Nadu'
  },
  {
    id: 'USR-1004',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@gmail.com',
    phone: '+91 97234 56789',
    role: 'customer',
    status: 'Active',
    ordersCount: 1,
    joinedDate: '28 Feb 2026',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
    city: 'Pune, Maharashtra'
  },
  {
    id: 'USR-1005',
    name: 'Vikramaditya Sen',
    email: 'vikram.sen@robotics.in',
    phone: '+91 98300 99881',
    role: 'customer',
    status: 'Suspended',
    ordersCount: 0,
    joinedDate: '01 Mar 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    city: 'Kolkata, West Bengal'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'OD129482019482',
    customerName: 'Manick Vijay',
    customerEmail: 'manickvijay596@gmail.com',
    customerPhone: '+91 98765 43210',
    date: '19 Sep 2026, 09:30 AM',
    items: [
      {
        id: 'prod-heart',
        title: 'Anatomical Human Heart 3D Model',
        quantity: 1,
        price: 1899,
        color: '#ef4444',
        selectedColorName: 'Anatomical Crimson'
      }
    ],
    subtotal: 1899,
    deliveryFee: 0,
    discount: 200,
    total: 1699,
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'Paid',
    status: 'Printing in Progress',
    progress: 68,
    estimatedDelivery: '21 Sep 2026',
    shippingAddress: {
      name: 'Manick Vijay',
      street: 'Flat 402, Precision Residency, 8th Main Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001'
    }
  },
  {
    id: 'OD129482019483',
    customerName: 'Dr. Rajesh Nair',
    customerEmail: 'rajesh.cardio@medhospital.org',
    customerPhone: '+91 94470 12890',
    date: '18 Sep 2026, 02:15 PM',
    items: [
      {
        id: 'prod-gearbox',
        title: 'Planetary Gear Reduction Kit',
        quantity: 2,
        price: 999,
        color: '#d97706',
        selectedColorName: 'Amber Gold'
      }
    ],
    subtotal: 1998,
    deliveryFee: 0,
    discount: 100,
    total: 1898,
    paymentMethod: 'HDFC Credit Card',
    paymentStatus: 'Paid',
    status: 'Shipped',
    progress: 90,
    estimatedDelivery: '20 Sep 2026',
    shippingAddress: {
      name: 'Dr. Rajesh Nair',
      street: 'Apollo Health City, Greams Lane',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600006'
    }
  },
  {
    id: 'OD129482019484',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@example.com',
    customerPhone: '+91 98112 34567',
    date: '17 Sep 2026, 07:45 PM',
    items: [
      {
        id: 'prod-planter',
        title: 'Voronoi Spiral Parametric Architecture Lamp & Planter',
        quantity: 1,
        price: 849,
        color: '#059669',
        selectedColorName: 'Emerald Silk'
      }
    ],
    subtotal: 849,
    deliveryFee: 79,
    discount: 0,
    total: 928,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    status: 'Delivered',
    progress: 100,
    estimatedDelivery: 'Delivered on 18 Sep 2026',
    shippingAddress: {
      name: 'Priya Sharma',
      street: '14/B Bandra West, Linking Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    }
  },
  {
    id: 'OD129482019485',
    customerName: 'Ananya Deshmukh',
    customerEmail: 'ananya.d@gmail.com',
    customerPhone: '+91 97234 56789',
    date: '19 Sep 2026, 11:10 AM',
    items: [
      {
        id: 'prod-tinker',
        title: 'TinkerBot Autonomous Chassis',
        quantity: 1,
        price: 1249,
        color: '#0284c7',
        selectedColorName: 'Electric Cyan'
      }
    ],
    subtotal: 1249,
    deliveryFee: 0,
    discount: 150,
    total: 1099,
    paymentMethod: 'Axis Bank NetBanking',
    paymentStatus: 'Paid',
    status: 'Order Placed',
    progress: 25,
    estimatedDelivery: '22 Sep 2026',
    shippingAddress: {
      name: 'Ananya Deshmukh',
      street: 'Plot 88, Viman Nagar, Near Symbiosis',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411014'
    }
  }
];
