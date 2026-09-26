import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PRODUCTS } from './src/data/products.js';

const PORT = 3000;

// Setup Uploads storage
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${base}-${uniqueSuffix}${ext}`);
  },
});
const upload = multer({ storage });

// In-Memory Database Store (Pre-seeded with initial data)
const db = {
  users: [
    {
      id: 'USR-101',
      name: 'Alex Rivera',
      email: 'user@gmail.com',
      password: 'user123',
      role: 'customer',
      phone: '+1 (555) 438-9021',
      address: '742 Evergreen Terrace, Springfield, OR 97477',
      registeredDate: '2026-01-15',
      memberSince: 'Member since Jan 2026',
      favoriteColor: 'Silk Gold',
      ordersCount: 3,
      totalSpent: 79.97,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'ADM-201',
      name: 'Chief Maker David',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1 (800) 555-F3D',
      address: 'Fusion3D Central Print Lab, San Francisco, CA',
      registeredDate: '2025-11-01',
      memberSince: 'Staff Administrator',
      favoriteColor: 'Neon Coral',
      ordersCount: 0,
      totalSpent: 0.0,
      status: 'Active (Staff)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'USR-102',
      name: 'Samantha Lee',
      email: 'samantha.lee@example.com',
      password: 'user123',
      role: 'customer',
      phone: '+1 (555) 892-3310',
      address: '144 Ocean Boulevard, Santa Monica, CA 90401',
      registeredDate: '2026-02-10',
      memberSince: 'Member since Feb 2026',
      favoriteColor: 'Cyan Blue',
      ordersCount: 2,
      totalSpent: 52.98,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'USR-103',
      name: 'Jordan Martinez',
      email: 'jordan.m@designstudio.io',
      password: 'user123',
      role: 'customer',
      phone: '+1 (555) 234-5678',
      address: '500 Tech Parkway, Austin, TX 78701',
      registeredDate: '2026-03-01',
      memberSince: 'Member since Mar 2026',
      favoriteColor: 'Emerald',
      ordersCount: 5,
      totalSpent: 198.5,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    },
  ],

  products: [...INITIAL_PRODUCTS],

  printers: [
    {
      id: 'PRINTER-BAMBU-A1',
      name: 'Bambu Lab A1 (AMS Lite)',
      type: 'High-Speed Multi-Color CoreXY / Direct Drive (500 mm/s)',
      status: 'Printing',
      currentJobId: 'ORD-8821',
      currentJobName: 'Personalized 3D Dual-Color Keychain',
      layerProgress: '162 / 210',
      percentage: 77,
      timeLeft: '12m',
      tempNozzle: '220°C',
      tempBed: '65°C',
      spoolColors: ['#F59E0B', '#0F172A', '#06B6D4', '#FFFFFF'],
      preferredShift: 'Daytime Quick Turnaround',
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
      preferredShift: 'Daytime & Nighttime',
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
      preferredShift: 'Daytime Quick Turnaround',
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
      preferredShift: 'Night-Time Overnight Batch',
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
      preferredShift: 'Night-Time Overnight Batch',
    },
  ],

  orders: [
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
          printTimeMinutes: 45,
        },
      ],
      subtotal: 25.98,
      shippingFee: 0.0,
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
        notes: 'Custom 3D extrusion with dual-tone filament chamfered border.',
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
        { status: 'Delivered', time: 'Pending', done: false, note: 'Pending delivery.' },
      ],
      shippingAddress: {
        fullName: 'Alex Rivera',
        address: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'OR',
        zip: '97477',
      },
    },
    {
      id: 'ORD-8825',
      date: '2026-09-20',
      time: '00:35',
      createdAt: Date.now() - 12 * 60 * 1000,
      customerName: 'Alex Rivera',
      customerEmail: 'user@gmail.com',
      customerPhone: '+1 (555) 438-9021',
      items: [
        {
          productId: 'prod-cake-topper-wedding',
          name: 'Custom Calligraphy Wedding Cake Topper',
          image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
          price: 24.5,
          quantity: 1,
          customText: 'Mr & Mrs Miller',
          selectedColors: { script_finish: '#E2B872' },
          printTimeMinutes: 85,
        },
      ],
      subtotal: 24.5,
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
        notes: 'Preview proof ready for your review: Gold calligraphy script with dual 70mm food-safe anchor stakes.',
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
        { status: 'Delivered', time: 'Pending', done: false, note: 'Pending.' },
      ],
      shippingAddress: {
        fullName: 'Alex Rivera',
        address: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'OR',
        zip: '97477',
      },
    },
  ],

  inquiries: [
    {
      id: 'INQ-1001',
      date: '2026-09-18',
      createdAt: Date.now() - 48 * 3600 * 1000,
      customerName: 'Jordan Martinez',
      customerEmail: 'jordan.m@designstudio.io',
      phone: '+1 (555) 234-5678',
      category: 'Architectural Mockup',
      materialPreference: 'PLA+ Silk',
      urgency: 'Standard',
      description: 'Parametric modular facade model for client presentation. Need clean overhang angles.',
      status: 'In Review',
      files: [],
    },
  ],
};

const STAGE_PROGRESS_MAP: Record<string, number> = {
  'Order Placed': 10,
  'Design Stage': 20,
  'Preview Design Sent': 35,
  'Ready for Printing': 50,
  'Printing Started': 65,
  'Printing Complete': 78,
  'QA Testing the Product': 85,
  'Packing': 90,
  'Shipping to Delivery Partner': 95,
  'Delivered': 100,
  'Cancelled': 0,
};

const PIPELINE_STAGES = [
  'Order Placed',
  'Design Stage',
  'Preview Design Sent',
  'Ready for Printing',
  'Printing Started',
  'Printing Complete',
  'QA Testing the Product',
  'Packing',
  'Shipping to Delivery Partner',
  'Delivered',
];

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static uploads serving
  app.use('/uploads', express.static(uploadsDir));

  // ==========================================
  // 1. Health Endpoint
  // ==========================================
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'UP',
      service: 'fusion3d-backend',
      timestamp: new Date().toISOString(),
    });
  });

  // ==========================================
  // 2. Dashboard Stats Endpoint
  // ==========================================
  app.get('/api/dashboard/stats', (_req, res) => {
    let totalRevenue = 0;
    let activeOrders = 0;
    let completedOrders = 0;
    const ordersByStatus: Record<string, number> = {};

    db.orders.forEach((o) => {
      totalRevenue += Number(o.total) || 0;
      const st = o.status || 'Order Placed';
      ordersByStatus[st] = (ordersByStatus[st] || 0) + 1;
      if (st.toLowerCase() === 'delivered') {
        completedOrders++;
      } else if (st.toLowerCase() !== 'cancelled') {
        activeOrders++;
      }
    });

    const printersBusy = db.printers.filter((p) => p.status === 'Printing').length;

    res.json({
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalOrders: db.orders.length,
      activeOrders,
      completedOrders,
      printersTotal: db.printers.length,
      printersBusy,
      registeredUsersCount: db.users.length,
      ordersByStatus,
    });
  });

  // ==========================================
  // 3. Auth Endpoints
  // ==========================================
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body || {};
    const cleanEmail = (email || '').trim().toLowerCase();
    const user = db.users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      // Auto-register demo account if credentials resemble email
      if (cleanEmail.includes('@') && password && password.length >= 4) {
        const newUser = {
          id: `USR-${Date.now().toString().slice(-4)}`,
          name: cleanEmail.split('@')[0],
          email: cleanEmail,
          password: password,
          role: 'customer',
          phone: '+1 (555) 000-0000',
          address: 'Default Shipping Address, USA',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanEmail)}`,
          registeredDate: new Date().toISOString().split('T')[0],
          memberSince: 'Active Member',
          favoriteColor: 'Silk Gold',
          ordersCount: 0,
          totalSpent: 0,
          status: 'Active',
        };
        db.users.unshift(newUser);
        return res.json({
          success: true,
          token: `token-${newUser.id}-${Date.now()}`,
          role: newUser.role,
          user: newUser,
          message: 'Account created and logged in successfully',
        });
      }
      return res.status(400).json({ success: false, message: 'User not found with this email' });
    }

    if (user.password && user.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid password credentials.' });
    }

    res.json({
      success: true,
      token: `token-${user.id}-${Date.now()}`,
      role: user.role,
      user,
      message: 'Login successful',
    });
  });

  app.post('/api/auth/register', (req, res) => {
    const body = req.body || {};
    const cleanEmail = (body.email || '').trim().toLowerCase();

    if (db.users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return res.status(400).json({ message: 'User already exists with email ' + cleanEmail });
    }

    const newUser = {
      id: body.id || `USR-${Date.now().toString().slice(-4)}`,
      name: body.name || cleanEmail.split('@')[0],
      email: cleanEmail,
      password: body.password || 'user123',
      role: (body.role || 'customer').toLowerCase(),
      phone: body.phone || '',
      address: body.address || '',
      avatar: body.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(body.name || cleanEmail)}`,
      registeredDate: body.registeredDate || new Date().toISOString().split('T')[0],
      memberSince: body.memberSince || 'Member since ' + new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      favoriteColor: body.favoriteColor || 'Silk Gold',
      ordersCount: 0,
      totalSpent: 0,
      status: body.status || 'Active',
    };

    db.users.unshift(newUser);
    res.json(newUser);
  });

  app.get('/api/auth/users', (_req, res) => {
    res.json(db.users);
  });

  app.get('/api/auth/users/:id', (req, res) => {
    const user = db.users.find((u) => u.id === req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  });

  app.put('/api/auth/users/:id', (req, res) => {
    const index = db.users.findIndex((u) => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });
    db.users[index] = { ...db.users[index], ...req.body };
    res.json(db.users[index]);
  });

  // ==========================================
  // 4. Products Endpoints
  // ==========================================
  app.get('/api/products', (req, res) => {
    const { category, search } = req.query;
    let list = [...db.products];

    if (category && typeof category === 'string' && category.toLowerCase() !== 'all') {
      list = list.filter((p) => (p.category || '').toLowerCase() === category.toLowerCase());
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q))
      );
    }

    res.json(list);
  });

  app.get('/api/products/:id', (req, res) => {
    const product = db.products.find((p) => p.id === req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  });

  app.post('/api/products', (req, res) => {
    const product = {
      ...req.body,
      id: req.body.id || `prod-${Date.now()}`,
      rating: req.body.rating || 5.0,
      reviewsCount: req.body.reviewsCount || 0,
      reviews: req.body.reviews || [],
    };
    db.products.unshift(product);
    res.json(product);
  });

  app.put('/api/products/:id', (req, res) => {
    const index = db.products.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Product not found' });
    db.products[index] = { ...db.products[index], ...req.body };
    res.json(db.products[index]);
  });

  app.patch('/api/products/:id/discount', (req, res) => {
    const index = db.products.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Product not found' });

    const p = db.products[index];
    const discountPercent = Number(req.body.discountPercent) || 0;
    const originalPrice = req.body.originalPrice != null
      ? Number(req.body.originalPrice)
      : (p.originalPrice || p.price);

    let finalPrice = originalPrice;
    if (discountPercent > 0) {
      finalPrice = Math.round(originalPrice * (1 - discountPercent / 100) * 100) / 100;
    }

    p.originalPrice = originalPrice;
    p.price = finalPrice;
    p.discountPercent = discountPercent;

    db.products[index] = p;
    res.json(p);
  });

  app.delete('/api/products/:id', (req, res) => {
    db.products = db.products.filter((p) => p.id !== req.params.id);
    res.status(204).send();
  });

  app.post('/api/products/:id/reviews', (req, res) => {
    const index = db.products.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Product not found' });

    const p = db.products[index];
    const newReview = {
      id: `rev-${Date.now()}`,
      reviewerName: req.body.userName || req.body.reviewerName || 'Verified Maker',
      rating: Number(req.body.rating) || 5,
      date: 'Just now',
      comment: req.body.comment || '',
      verifiedPurchase: true,
      userImages: req.body.images || req.body.userImages || [],
    };

    const currentReviews = p.reviews || [];
    p.reviews = [newReview, ...currentReviews];
    p.reviewsCount = (p.reviewsCount || 0) + 1;
    const avg =
      p.reviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / p.reviews.length;
    p.rating = Math.round(avg * 10) / 10;

    db.products[index] = p;
    res.json(newReview);
  });

  // ==========================================
  // 5. Orders Endpoints
  // ==========================================
  app.get('/api/orders', (req, res) => {
    const { customerEmail } = req.query;
    if (customerEmail && typeof customerEmail === 'string') {
      const filtered = db.orders.filter(
        (o) => (o.customerEmail || '').toLowerCase() === customerEmail.toLowerCase()
      );
      return res.json(filtered);
    }
    res.json(db.orders);
  });

  app.get('/api/orders/:id', (req, res) => {
    const order = db.orders.find((o) => o.id === req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  });

  app.post('/api/orders', (req, res) => {
    const dto = req.body || {};
    const orderId = dto.id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5);

    const timeline = PIPELINE_STAGES.map((stage, idx) => ({
      status: stage,
      time: idx === 0 ? timeStr : 'Pending',
      done: idx === 0,
      note: idx === 0 ? 'CAD model order recorded and queued.' : `Pending ${stage}`,
    }));

    const newOrder = {
      id: orderId,
      date: now.toISOString().split('T')[0],
      time: timeStr,
      createdAt: Date.now(),
      customerName: dto.customerName || 'Customer',
      customerEmail: dto.customerEmail || 'customer@example.com',
      customerPhone: dto.customerPhone || '+1 (555) 000-0000',
      items: dto.items || [],
      subtotal: Number(dto.subtotal) || 0,
      shippingFee: Number(dto.shippingFee) || 0,
      total: Number(dto.total) || 0,
      paymentMethod: dto.paymentMethod || 'Credit Card',
      status: 'Order Placed',
      statusProgress: 10,
      estimatedCompletion: 'In 24–48 hours',
      trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}`,
      deliveryPartner: 'BlueDart Express',
      assignedPrinter: null,
      designProof: dto.items?.[0]
        ? {
            image: dto.items[0].image,
            modelType: 'keychain',
            approved: false,
            notes: 'Order placed. Designer will generate customized parametric preview.',
          }
        : null,
      timeline,
      shippingAddress: dto.shippingAddress || {
        fullName: dto.customerName || '',
        address: dto.shippingAddress?.address || '',
        city: dto.shippingAddress?.city || '',
        state: dto.shippingAddress?.state || '',
        zip: dto.shippingAddress?.zip || '',
      },
    };

    db.orders.unshift(newOrder);
    res.json(newOrder);
  });

  app.patch('/api/orders/:id/status', (req, res) => {
    const index = db.orders.findIndex((o) => o.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Order not found' });

    const order = db.orders[index];
    const { newStatus, note, assignedPrinter, deliveryPartner, trackingNumber, designProofApproved } = req.body;

    if (newStatus) {
      order.status = newStatus;
      order.statusProgress = STAGE_PROGRESS_MAP[newStatus] ?? order.statusProgress;

      const targetIndex = PIPELINE_STAGES.indexOf(newStatus);
      if (targetIndex >= 0 && order.timeline) {
        order.timeline = order.timeline.map((step, idx) => {
          if (idx <= targetIndex) {
            return {
              ...step,
              done: true,
              time: step.time === 'Pending' ? new Date().toTimeString().slice(0, 5) : step.time,
              note: idx === targetIndex && note ? note : step.note,
            };
          }
          return step;
        });
      }
    }

    if (assignedPrinter) order.assignedPrinter = assignedPrinter;
    if (deliveryPartner) order.deliveryPartner = deliveryPartner;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (designProofApproved !== undefined && order.designProof) {
      order.designProof.approved = designProofApproved;
    }

    db.orders[index] = order;
    res.json(order);
  });

  app.post('/api/orders/:id/cancel', (req, res) => {
    const index = db.orders.findIndex((o) => o.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Order not found' });

    const order = db.orders[index];
    const reason = req.body?.reason || 'Customer requested cancellation';
    order.status = 'Cancelled';
    order.statusProgress = 0;
    order.cancellationReason = reason;
    order.cancelledAt = Date.now();

    if (order.timeline) {
      order.timeline.push({
        status: 'Order Cancelled',
        time: new Date().toTimeString().slice(0, 5),
        done: true,
        note: `Cancelled: ${reason}`,
      });
    }

    db.orders[index] = order;
    res.json(order);
  });

  app.post('/api/orders/:id/approve-proof', (req, res) => {
    const index = db.orders.findIndex((o) => o.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Order not found' });

    const order = db.orders[index];
    order.status = 'Ready for Printing';
    order.statusProgress = 50;
    if (order.designProof) {
      order.designProof.approved = true;
    }
    if (order.timeline) {
      const targetIndex = PIPELINE_STAGES.indexOf('Ready for Printing');
      order.timeline = order.timeline.map((step, idx) => {
        if (idx <= targetIndex) {
          return {
            ...step,
            done: true,
            time: step.time === 'Pending' ? new Date().toTimeString().slice(0, 5) : step.time,
            note: idx === targetIndex ? 'Customer approved 3D design proof in online portal.' : step.note,
          };
        }
        return step;
      });
    }

    db.orders[index] = order;
    res.json(order);
  });

  app.post('/api/orders/:id/request-proof-changes', (req, res) => {
    const index = db.orders.findIndex((o) => o.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Order not found' });

    const order = db.orders[index];
    const feedback = req.body?.feedback || 'Geometry and typography revision requested.';
    order.status = 'Design Stage';
    order.statusProgress = 20;
    if (order.designProof) {
      order.designProof.approved = false;
      order.designProof.notes = `Customer revision feedback: "${feedback}"`;
    }

    if (order.timeline) {
      order.timeline = order.timeline.map((step) => {
        if (step.status === 'Preview Design Sent') {
          return { ...step, done: false, note: `Revision requested: "${feedback}"` };
        }
        return step;
      });
    }

    db.orders[index] = order;
    res.json(order);
  });

  app.post('/api/orders/:id/assign-printer', (req, res) => {
    const index = db.orders.findIndex((o) => o.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Order not found' });

    const { printerId, timeShift } = req.body;
    const printer = db.printers.find((p) => p.id === printerId);

    const order = db.orders[index];
    order.status = 'Printing Started';
    order.statusProgress = 65;
    order.assignedPrinter = printer ? printer.name : printerId;

    if (printer) {
      printer.status = 'Printing';
      printer.currentJobId = order.id;
      printer.currentJobName = `Order ${order.id}`;
      printer.percentage = 15;
      printer.timeLeft = '45m';
    }

    if (order.timeline) {
      const targetIndex = PIPELINE_STAGES.indexOf('Printing Started');
      order.timeline = order.timeline.map((step, idx) => {
        if (idx <= targetIndex) {
          return {
            ...step,
            done: true,
            time: step.time === 'Pending' ? new Date().toTimeString().slice(0, 5) : step.time,
            note: idx === targetIndex ? `Assigned to ${order.assignedPrinter} (${timeShift || 'Daytime'})` : step.note,
          };
        }
        return step;
      });
    }

    db.orders[index] = order;
    res.json(order);
  });

  // ==========================================
  // 6. Printers Endpoints
  // ==========================================
  app.get('/api/printers', (_req, res) => {
    res.json(db.printers);
  });

  app.get('/api/printers/:id', (req, res) => {
    const printer = db.printers.find((p) => p.id === req.params.id);
    if (!printer) return res.status(404).json({ message: 'Printer not found' });
    res.json(printer);
  });

  app.put('/api/printers/:id', (req, res) => {
    const index = db.printers.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Printer not found' });
    db.printers[index] = { ...db.printers[index], ...req.body };
    res.json(db.printers[index]);
  });

  app.post('/api/printers', (req, res) => {
    const newPrinter = {
      ...req.body,
      id: req.body.id || `PRINTER-${Date.now()}`,
      status: req.body.status || 'Idle',
    };
    db.printers.push(newPrinter);
    res.json(newPrinter);
  });

  app.delete('/api/printers/:id', (req, res) => {
    db.printers = db.printers.filter((p) => p.id !== req.params.id);
    res.status(204).send();
  });

  // ==========================================
  // 7. Inquiries Endpoints
  // ==========================================
  app.get('/api/inquiries', (req, res) => {
    const { customerEmail } = req.query;
    if (customerEmail && typeof customerEmail === 'string') {
      const filtered = db.inquiries.filter(
        (i) => (i.customerEmail || '').toLowerCase() === customerEmail.toLowerCase()
      );
      return res.json(filtered);
    }
    res.json(db.inquiries);
  });

  app.post('/api/inquiries', (req, res) => {
    const newInquiry = {
      ...req.body,
      id: req.body.id || `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      date: req.body.date || new Date().toISOString().split('T')[0],
      createdAt: req.body.createdAt || Date.now(),
      status: req.body.status || 'Pending Review',
    };
    db.inquiries.unshift(newInquiry);
    res.json(newInquiry);
  });

  // ==========================================
  // 8. Storage File Upload Endpoint
  // ==========================================
  app.post('/api/storage/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const folder = req.body.folder || req.query.folder || 'uploads';
    res.json({
      fileUrl: `/uploads/${req.file.filename}`,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      folder,
    });
  });

  // ==========================================
  // Vite Frontend Middleware / Static Serve
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fusion3D Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
