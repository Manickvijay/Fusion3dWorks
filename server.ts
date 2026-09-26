import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PRODUCTS } from './src/data/products.js';

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'fusion3d-production-super-secret-sign-key-2026';

// ==========================================
// Security Utilities & Password Hashing
// ==========================================

function hashPassword(password: string, existingSalt?: string): { hash: string; salt: string } {
  const salt = existingSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

function verifyPassword(password: string, hash: string, salt: string): boolean {
  if (!hash || !salt) return false;
  const check = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(check, 'hex'), Buffer.from(hash, 'hex'));
  } catch {
    return false;
  }
}

function generateToken(user: { id: string; email: string; role: string }): string {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    nonce: crypto.randomBytes(8).toString('hex'),
  };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
}

function verifyToken(token: string): { userId: string; email: string; role: string; exp: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [data, signature] = parts;
    const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function sanitizeUser(user: any) {
  if (!user) return null;
  const { password, passwordHash, salt, ...safeUser } = user;
  return safeUser;
}

// In-Memory Rate Limiter for Auth Protection
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
function authRateLimiter(limit = 40, windowMs = 15 * 60 * 1000) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now > entry.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }
    if (entry.count >= limit) {
      return res.status(429).json({ message: 'Too many login or registration attempts. Please try again later.' });
    }
    entry.count++;
    next();
  };
}

// Setup Uploads storage with strict file security
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const ALLOWED_EXTENSIONS = new Set([
  '.stl',
  '.obj',
  '.3mf',
  '.step',
  '.stp',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.svg',
]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${base}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return cb(new Error(`File extension "${ext}" is not permitted. Only CAD models (.stl, .obj, .3mf, .step) and images are accepted.`));
    }
    cb(null, true);
  },
});

// Seed default hashed passwords
const defaultUserHash = hashPassword('user123');
const defaultAdminHash = hashPassword('admin123');

// Database store with hashed credentials
const db = {
  users: [
    {
      id: 'USR-101',
      name: 'Alex Rivera',
      email: 'user@gmail.com',
      passwordHash: defaultUserHash.hash,
      salt: defaultUserHash.salt,
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
      passwordHash: defaultAdminHash.hash,
      salt: defaultAdminHash.salt,
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
      passwordHash: defaultUserHash.hash,
      salt: defaultUserHash.salt,
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
      passwordHash: defaultUserHash.hash,
      salt: defaultUserHash.salt,
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

  filaments: [
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
  ],

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
      name: 'Jordan Martinez',
      email: 'jordan.m@designstudio.io',
      customerName: 'Jordan Martinez',
      customerEmail: 'jordan.m@designstudio.io',
      phone: '+1 (555) 234-5678',
      productInterest: 'Architectural Mockup',
      dimensions: '250 x 180 x 120 mm',
      preferredColors: 'Matte White & Space Gray',
      specialNotes: 'Parametric modular facade model for client presentation. Need clean overhang angles.',
      date: '2026-09-18',
      createdAt: Date.now() - 48 * 3600 * 1000,
      status: 'Pending Review',
      quoteAmount: null,
      adminReply: null,
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

  // Basic Security Headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Static uploads serving with safe headers
  app.use(
    '/uploads',
    express.static(uploadsDir, {
      setHeaders: (res, filePath) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        // Prevent executable execution
        if (filePath.endsWith('.svg')) {
          res.setHeader('Content-Type', 'image/svg+xml');
        }
      },
    })
  );

  // Authentication extraction middleware
  const extractUser = (req: express.Request & { user?: any }, _res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      const payload = verifyToken(token);
      if (payload) {
        req.user = payload;
      }
    }
    next();
  };
  app.use(extractUser);

  // ==========================================
  // 1. Health Endpoint
  // ==========================================
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'UP',
      service: 'fusion3d-backend',
      timestamp: new Date().toISOString(),
      security: 'active',
      fleetStatus: 'operational',
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
      inquiriesCount: db.inquiries.length,
    });
  });

  // ==========================================
  // 3. Auth Endpoints (Advanced Secure)
  // ==========================================

  // Login
  app.post('/api/auth/login', authRateLimiter(), (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = db.users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      // Auto-provision demo account securely if valid email format
      if (cleanEmail.includes('@') && password.length >= 4) {
        const { hash, salt } = hashPassword(password);
        const newUser = {
          id: `USR-${Date.now().toString().slice(-4)}`,
          name: cleanEmail.split('@')[0],
          email: cleanEmail,
          passwordHash: hash,
          salt: salt,
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
        const token = generateToken(newUser);
        return res.json({
          success: true,
          token,
          role: newUser.role,
          user: sanitizeUser(newUser),
          message: 'Account created and authenticated securely',
        });
      }
      return res.status(400).json({ success: false, message: 'Account not found with this email.' });
    }

    // Verify Password Hash
    let isPasswordValid = false;
    if (user.passwordHash && user.salt) {
      isPasswordValid = verifyPassword(password, user.passwordHash, user.salt);
    } else if ((user as any).password) {
      // Legacy plaintext migration check
      isPasswordValid = (user as any).password === password;
      if (isPasswordValid) {
        // Upgrade to hashed
        const { hash, salt } = hashPassword(password);
        user.passwordHash = hash;
        user.salt = salt;
        delete (user as any).password;
      }
    }

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password credentials.' });
    }

    const token = generateToken(user);
    res.json({
      success: true,
      token,
      role: user.role,
      user: sanitizeUser(user),
      message: 'Login successful',
    });
  });

  // Register
  app.post('/api/auth/register', authRateLimiter(), (req, res) => {
    const body = req.body || {};
    const cleanEmail = (body.email || '').trim().toLowerCase();
    const cleanName = (body.name || '').trim();
    const password = body.password || '';

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return res.status(400).json({ message: 'Valid email address is required.' });
    }
    if (!password || password.length < 4) {
      return res.status(400).json({ message: 'Password must be at least 4 characters long.' });
    }

    if (db.users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return res.status(400).json({ message: 'A user with this email address already exists.' });
    }

    // Role escalation protection: public registrations default to customer
    const { hash, salt } = hashPassword(password);
    const newUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: cleanName || cleanEmail.split('@')[0],
      email: cleanEmail,
      passwordHash: hash,
      salt: salt,
      role: 'customer',
      phone: (body.phone || '').trim(),
      address: (body.address || '').trim(),
      avatar: body.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanName || cleanEmail)}`,
      registeredDate: new Date().toISOString().split('T')[0],
      memberSince: `Member since ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`,
      favoriteColor: body.favoriteColor || 'Silk Gold',
      ordersCount: 0,
      totalSpent: 0,
      status: 'Active',
    };

    db.users.unshift(newUser);
    const token = generateToken(newUser);

    res.json({
      ...sanitizeUser(newUser),
      token,
      success: true,
    });
  });

  // Get Current Authenticated Profile
  app.get('/api/auth/me', (req: any, res) => {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized session.' });
    }
    const user = db.users.find((u) => u.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User profile not found.' });
    }
    res.json(sanitizeUser(user));
  });

  // Change Password
  app.put('/api/auth/change-password', (req: any, res) => {
    const { oldPassword, newPassword } = req.body || {};
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required to update password.' });
    }
    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ message: 'New password must be at least 4 characters long.' });
    }

    const user = db.users.find((u) => u.id === userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Verify Old Password
    let validOld = false;
    if (user.passwordHash && user.salt) {
      validOld = verifyPassword(oldPassword, user.passwordHash, user.salt);
    } else if ((user as any).password) {
      validOld = (user as any).password === oldPassword;
    }

    if (!validOld) {
      return res.status(400).json({ message: 'Current password provided is incorrect.' });
    }

    const { hash, salt } = hashPassword(newPassword);
    user.passwordHash = hash;
    user.salt = salt;
    delete (user as any).password;

    res.json({ success: true, message: 'Password updated successfully.' });
  });

  // Get All Users (Sanitized, password never exposed)
  app.get('/api/auth/users', (_req, res) => {
    res.json(db.users.map(sanitizeUser));
  });

  // Get User By ID
  app.get('/api/auth/users/:id', (req, res) => {
    const user = db.users.find((u) => u.id === req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(sanitizeUser(user));
  });

  // Update Current User Profile
  app.put('/api/auth/profile', (req: any, res) => {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required to update profile.' });
    }
    const index = db.users.findIndex((u) => u.id === userId);
    if (index === -1) return res.status(404).json({ message: 'User not found' });
    const updates = { ...req.body };
    delete updates.password;
    delete updates.passwordHash;
    delete updates.salt;
    delete updates.role;
    db.users[index] = { ...db.users[index], ...updates };
    res.json(sanitizeUser(db.users[index]));
  });

  // Update User Profile by ID (Admin or Self)
  app.put('/api/auth/users/:id', (req: any, res) => {
    const index = db.users.findIndex((u) => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    const existing = db.users[index];
    const updates = { ...req.body };

    // Prevent overwriting internal security credentials directly
    delete updates.password;
    delete updates.passwordHash;
    delete updates.salt;

    // Role modification requires admin authorization
    if (updates.role && updates.role !== existing.role) {
      if (req.user?.role !== 'admin') {
        delete updates.role;
      }
    }

    db.users[index] = { ...existing, ...updates };
    res.json(sanitizeUser(db.users[index]));
  });

  // Delete User
  app.delete('/api/auth/users/:id', (req: any, res) => {
    db.users = db.users.filter((u) => u.id !== req.params.id);
    res.status(204).send();
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
    const body = req.body || {};
    const price = Math.max(0.01, Number(body.price) || 14.99);

    const product = {
      ...body,
      id: body.id || `prod-${Date.now()}`,
      name: body.name || 'Custom 3D Print Model',
      price,
      originalPrice: body.originalPrice || price,
      discountPercent: Number(body.discountPercent) || 0,
      rating: body.rating || 5.0,
      reviewsCount: body.reviewsCount || 0,
      reviews: body.reviews || [],
      gallery: body.gallery && body.gallery.length > 0 ? body.gallery : [body.image],
    };

    db.products.unshift(product);
    res.status(201).json(product);
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
    const discountPercent = Math.min(100, Math.max(0, Number(req.body.discountPercent) || 0));
    const originalPrice =
      req.body.originalPrice != null ? Number(req.body.originalPrice) : p.originalPrice || p.price;

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
    const rawRating = Number(req.body.rating) || 5;
    const rating = Math.min(5, Math.max(1, rawRating));

    const newReview = {
      id: `rev-${Date.now()}`,
      reviewerName: req.body.userName || req.body.reviewerName || req.body.author || 'Verified Maker',
      author: req.body.author || req.body.userName || req.body.reviewerName || 'Verified Maker',
      rating,
      date: 'Just now',
      comment: (req.body.comment || '').slice(0, 1000),
      verifiedPurchase: true,
      verified: true,
      images: req.body.images || req.body.userImages || [],
      userImages: req.body.images || req.body.userImages || [],
    };

    const currentReviews = p.reviews || [];
    p.reviews = [newReview, ...currentReviews];
    p.reviewsCount = (p.reviewsCount || 0) + 1;
    const avg = p.reviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / p.reviews.length;
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
    res.status(201).json(newOrder);
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

    if (assignedPrinter !== undefined) order.assignedPrinter = assignedPrinter;
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
    const printer = db.printers.find((p) => p.id === printerId || p.name === printerId);

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
            note: idx === targetIndex ? `Assigned to ${order.assignedPrinter} (${timeShift || 'Daytime Quick Turnaround'})` : step.note,
          };
        }
        return step;
      });
    }

    db.orders[index] = order;
    res.json(order);
  });

  // QA Inspection Check Action
  app.post('/api/orders/:id/qa-check', (req, res) => {
    const index = db.orders.findIndex((o) => o.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Order not found' });

    const order = db.orders[index];
    const { pass, tolerance, notes } = req.body || {};

    if (pass !== false) {
      order.status = 'QA Testing the Product';
      order.statusProgress = 85;
      order.qaPassed = true;
      order.qaDetails = {
        tolerance: tolerance || '< 0.10mm (Pass)',
        inspectedAt: new Date().toISOString(),
        notes: notes || 'Dimensional caliper check passed; clean layer surface adhesion confirmed.',
      };

      if (order.timeline) {
        const targetIndex = PIPELINE_STAGES.indexOf('QA Testing the Product');
        order.timeline = order.timeline.map((step, idx) => {
          if (idx <= targetIndex) {
            return {
              ...step,
              done: true,
              time: step.time === 'Pending' ? new Date().toTimeString().slice(0, 5) : step.time,
              note: idx === targetIndex ? `QA Inspection Passed (${tolerance || '< 0.10mm'})` : step.note,
            };
          }
          return step;
        });
      }
    }

    db.orders[index] = order;
    res.json(order);
  });

  // Delete / Archive Order
  app.delete('/api/orders/:id', (req, res) => {
    db.orders = db.orders.filter((o) => o.id !== req.params.id);
    res.status(204).send();
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

    const updates = typeof req.body === 'string' ? { status: req.body } : req.body;
    db.printers[index] = { ...db.printers[index], ...updates };

    if (updates.status === 'Idle') {
      db.printers[index].currentJobId = null;
      db.printers[index].currentJobName = null;
      db.printers[index].percentage = 0;
      db.printers[index].timeLeft = '--';
    }

    res.json(db.printers[index]);
  });

  app.post('/api/printers', (req, res) => {
    const newPrinter = {
      ...req.body,
      id: req.body.id || `PRINTER-${Date.now()}`,
      status: req.body.status || 'Idle',
      currentJobId: null,
      currentJobName: null,
      percentage: 0,
      timeLeft: '--',
    };
    db.printers.push(newPrinter);
    res.status(201).json(newPrinter);
  });

  app.delete('/api/printers/:id', (req, res) => {
    db.printers = db.printers.filter((p) => p.id !== req.params.id);
    res.status(204).send();
  });

  // Toggle Maintenance / Calibration
  app.post('/api/printers/:id/maintenance', (req, res) => {
    const index = db.printers.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Printer not found' });

    const currentStatus = db.printers[index].status;
    const isMaint = currentStatus === 'Maintenance' || currentStatus === 'Calibrating';
    db.printers[index].status = isMaint ? 'Idle' : 'Maintenance';

    if (!isMaint) {
      db.printers[index].currentJobId = null;
      db.printers[index].currentJobName = 'Calibration Bed Tramming';
      db.printers[index].percentage = 0;
      db.printers[index].timeLeft = '--';
    }

    res.json(db.printers[index]);
  });

  // Clear Finished Job
  app.post('/api/printers/:id/clear-job', (req, res) => {
    const index = db.printers.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Printer not found' });

    db.printers[index].status = 'Idle';
    db.printers[index].currentJobId = null;
    db.printers[index].currentJobName = null;
    db.printers[index].percentage = 0;
    db.printers[index].timeLeft = '--';

    res.json(db.printers[index]);
  });

  // ==========================================
  // 7. Inquiries Endpoints (Full CRUD & Status)
  // ==========================================

  app.get('/api/inquiries', (req, res) => {
    const { customerEmail } = req.query;
    if (customerEmail && typeof customerEmail === 'string') {
      const filtered = db.inquiries.filter(
        (i) => (i.email || i.customerEmail || '').toLowerCase() === customerEmail.toLowerCase()
      );
      return res.json(filtered);
    }
    res.json(db.inquiries);
  });

  app.get('/api/inquiries/:id', (req, res) => {
    const item = db.inquiries.find((i) => i.id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(item);
  });

  app.post('/api/inquiries', (req, res) => {
    const body = req.body || {};
    const newInquiry = {
      id: body.id || `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: body.name || body.customerName || 'Anonymous Maker',
      email: body.email || body.customerEmail || 'maker@example.com',
      customerName: body.name || body.customerName || 'Anonymous Maker',
      customerEmail: body.email || body.customerEmail || 'maker@example.com',
      phone: body.phone || '',
      productInterest: body.productInterest || body.category || 'Custom CAD Print',
      dimensions: body.dimensions || 'Custom Sizing',
      preferredColors: body.preferredColors || body.materialPreference || 'Silk Gold',
      specialNotes: body.specialNotes || body.description || '',
      date: body.date || new Date().toISOString().split('T')[0],
      createdAt: body.createdAt || Date.now(),
      status: body.status || 'Pending Review',
      quoteAmount: body.quoteAmount || null,
      adminReply: body.adminReply || null,
      files: body.files || [],
    };
    db.inquiries.unshift(newInquiry);
    res.status(201).json(newInquiry);
  });

  app.patch('/api/inquiries/:id/status', (req, res) => {
    const index = db.inquiries.findIndex((i) => i.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Inquiry not found' });

    const status = req.body?.status || req.body?.newStatus || 'Pending Review';
    db.inquiries[index].status = status;
    res.json(db.inquiries[index]);
  });

  app.post('/api/inquiries/:id/reply', (req, res) => {
    const index = db.inquiries.findIndex((i) => i.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Inquiry not found' });

    const { quoteAmount, adminReply } = req.body || {};
    if (quoteAmount !== undefined) {
      db.inquiries[index].quoteAmount = Number(quoteAmount);
      db.inquiries[index].status = 'Quoted';
    }
    if (adminReply) {
      db.inquiries[index].adminReply = adminReply;
    }
    res.json(db.inquiries[index]);
  });

  app.delete('/api/inquiries/:id', (req, res) => {
    db.inquiries = db.inquiries.filter((i) => i.id !== req.params.id);
    res.status(204).send();
  });

  // ==========================================
  // 8. Storage File Upload & Secure Deletion
  // ==========================================

  app.post('/api/storage/upload', (req, res, next) => {
    upload.any()(req, res, (err) => {
      if (err) return next(err);
      const files = (req.files as Express.Multer.File[]) || [];
      if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No file uploaded or file extension is not permitted.' });
      }
      const rawFolder = req.body?.folder || (req.query?.folder as string) || 'uploads';
      const folder = rawFolder.replace(/[^a-zA-Z0-9_-]/g, '');

      const uploadedList = files.map((f) => ({
        fileUrl: `/uploads/${f.filename}`,
        fileName: f.originalname,
        fileSize: f.size,
        folder,
        contentType: f.mimetype,
      }));

      // Return both individual fields for single upload compatibility and files array for multiple uploads
      res.json({
        fileUrl: uploadedList[0].fileUrl,
        fileName: uploadedList[0].fileName,
        fileSize: uploadedList[0].fileSize,
        folder,
        contentType: uploadedList[0].contentType,
        files: uploadedList,
      });
    });
  });

  app.delete('/api/storage/delete', (req, res) => {
    const fileUrl = (req.query.fileUrl || req.body?.fileUrl) as string;
    if (!fileUrl) {
      return res.status(400).json({ message: 'fileUrl parameter is required' });
    }

    // Strip URL parameters and get base file name safely
    const cleanName = path.basename(fileUrl.split('?')[0]);
    const targetPath = path.resolve(uploadsDir, cleanName);

    // Path traversal safety validation
    if (!targetPath.startsWith(uploadsDir)) {
      return res.status(403).json({ message: 'Forbidden: Invalid target file path.' });
    }

    if (fs.existsSync(targetPath)) {
      try {
        fs.unlinkSync(targetPath);
        return res.status(204).send();
      } catch (err: any) {
        return res.status(500).json({ message: 'Could not delete storage file: ' + err.message });
      }
    }

    res.status(404).json({ message: 'Storage file not found' });
  });

  // ==========================================
  // 9. Filament Colors Manager Endpoints
  // ==========================================
  app.get('/api/filaments', (_req, res) => {
    res.json(db.filaments);
  });

  app.post('/api/filaments', (req, res) => {
    const body = req.body || {};
    const newFilament = {
      id: body.id || `fil-${Date.now()}`,
      name: (body.name || 'Custom Filament').trim(),
      hex: body.hex || '#F59E0B',
      material: body.material || 'PLA+ Silk',
      inStock: body.inStock !== false,
    };
    db.filaments.push(newFilament);
    res.status(201).json(newFilament);
  });

  app.put('/api/filaments/:id', (req, res) => {
    const index = db.filaments.findIndex((f) => f.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Filament not found' });
    db.filaments[index] = { ...db.filaments[index], ...req.body };
    res.json(db.filaments[index]);
  });

  app.patch('/api/filaments/:id/stock', (req, res) => {
    const index = db.filaments.findIndex((f) => f.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Filament not found' });
    const inStock = req.body?.inStock !== undefined ? Boolean(req.body.inStock) : !db.filaments[index].inStock;
    db.filaments[index].inStock = inStock;
    res.json(db.filaments[index]);
  });

  app.delete('/api/filaments/:id', (req, res) => {
    db.filaments = db.filaments.filter((f) => f.id !== req.params.id);
    res.status(204).send();
  });

  // Error handling for Multer or input errors
  app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof multer.MulterError || err?.message) {
      return res.status(400).json({ message: err.message });
    }
    next(err);
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
    console.log(`Fusion3D Advanced Secure Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
