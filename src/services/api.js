/**
 * Fusion3D Works - Unified Backend API Client
 * Connects frontend directly to Render Spring Boot backend
 * (https://fusion3dworks-backend.onrender.com)
 */

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'https://fusion3dworks-backend.onrender.com'
).replace(/\/$/, '');

// Normalization helpers for data uniformity
export function normalizeProduct(p) {
  if (!p) return null;
  let sections = p.customizableSections;
  if ((!sections || !Array.isArray(sections) || sections.length === 0) && p.customizableSectionsJson) {
    try {
      sections = JSON.parse(p.customizableSectionsJson);
    } catch {
      sections = [];
    }
  }
  return {
    ...p,
    customizableSections: Array.isArray(sections) ? sections : [],
    gallery: Array.isArray(p.gallery) && p.gallery.length > 0 ? p.gallery : [p.image],
    reviews: Array.isArray(p.reviews)
      ? p.reviews.map(r => ({
          id: r.id,
          author: r.author || 'Customer',
          rating: r.rating || 5,
          date: r.date || 'Recent',
          comment: r.comment || '',
          verified: r.verified !== false,
          images: Array.isArray(r.images) ? r.images : [],
        }))
      : [],
  };
}

export function normalizeOrder(o) {
  if (!o) return null;
  const proof = (o.designProof && typeof o.designProof === 'object')
    ? o.designProof
    : {
        image: o.designProofImage || null,
        modelType: o.designProofModelType || 'keychain',
        approved: Boolean(o.designProofApproved),
        notes: o.designProofNotes || '',
        userFeedback: o.designProofUserFeedback || '',
      };

  const shippingAddr = (o.shippingAddress && typeof o.shippingAddress === 'object')
    ? o.shippingAddress
    : (o.shippingAddressDetails || {
        fullName: o.shippingFullName || o.customerName || '',
        address: typeof o.shippingAddress === 'string' ? o.shippingAddress : '',
        city: o.shippingCity || '',
        state: o.shippingState || '',
        zip: o.shippingZip || '',
        phone: o.shippingPhone || o.customerPhone || '',
      });

  return {
    ...o,
    designProof: proof,
    shippingAddress: shippingAddr,
    items: Array.isArray(o.items)
      ? o.items.map(item => {
          let colors = item.selectedColors;
          if (!colors && item.selectedColorsJson) {
            try {
              colors = JSON.parse(item.selectedColorsJson);
            } catch {
              colors = {};
            }
          }
          return {
            ...item,
            selectedColors: colors || {},
          };
        })
      : [],
    timeline: Array.isArray(o.timeline) ? o.timeline : [],
  };
}

// Request helper
async function request(endpoint, options = {}, timeoutMs = 12000) {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const headers = {
    Accept: 'application/json',
    ...options.headers,
  };

  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      let errorMessage = `HTTP Error ${res.status}`;
      try {
        const errJson = await res.json();
        errorMessage = errJson.message || errJson.error || errorMessage;
      } catch {
        // non-json response
      }
      const err = new Error(errorMessage);
      err.status = res.status;
      throw err;
    }

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await res.json();
    }
    const text = await res.text();
    return text ? { message: text } : { success: true };
  } catch (error) {
    clearTimeout(timer);
    if (error.name === 'AbortError') {
      error.isTimeout = true;
      error.message = 'Backend request timed out (service may be spinning up on Render)';
    }
    throw error;
  }
}

export const api = {
  baseUrl: API_BASE_URL,

  // Health check
  health: {
    check: () => request('/api/health', { method: 'GET' }, 8000),
  },

  // Auth & Users
  auth: {
    login: (email, password) =>
      request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (userData) =>
      request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    getUsers: () => request('/api/auth/users', { method: 'GET' }),
    getUserById: (id) => request(`/api/auth/users/${id}`, { method: 'GET' }),
    updateUser: (id, userData) =>
      request(`/api/auth/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      }),
  },

  // Products & Reviews
  products: {
    getAll: async (category, search) => {
      const params = new URLSearchParams();
      if (category && category !== 'all') params.append('category', category);
      if (search) params.append('search', search);
      const query = params.toString() ? `?${params.toString()}` : '';
      const list = await request(`/api/products${query}`, { method: 'GET' });
      return Array.isArray(list) ? list.map(normalizeProduct) : [];
    },
    getById: async (id) => {
      const p = await request(`/api/products/${id}`, { method: 'GET' });
      return normalizeProduct(p);
    },
    create: async (product) => {
      const payload = {
        ...product,
        customizableSectionsJson: Array.isArray(product.customizableSections)
          ? JSON.stringify(product.customizableSections)
          : product.customizableSectionsJson,
      };
      const created = await request('/api/products', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      return normalizeProduct(created);
    },
    update: async (id, product) => {
      const payload = {
        ...product,
        customizableSectionsJson: Array.isArray(product.customizableSections)
          ? JSON.stringify(product.customizableSections)
          : product.customizableSectionsJson,
      };
      const updated = await request(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      return normalizeProduct(updated);
    },
    applyDiscount: async (id, discountData) => {
      const updated = await request(`/api/products/${id}/discount`, {
        method: 'PATCH',
        body: JSON.stringify(discountData),
      });
      return normalizeProduct(updated);
    },
    delete: (id) =>
      request(`/api/products/${id}`, {
        method: 'DELETE',
      }),
    submitReview: async (productId, reviewData) => {
      const review = await request(`/api/products/${productId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(reviewData),
      });
      return review;
    },
  },

  // Orders & 10-Step Pipeline
  orders: {
    getAll: async (customerEmail) => {
      const query = customerEmail ? `?customerEmail=${encodeURIComponent(customerEmail)}` : '';
      const list = await request(`/api/orders${query}`, { method: 'GET' });
      return Array.isArray(list) ? list.map(normalizeOrder) : [];
    },
    getById: async (id) => {
      const o = await request(`/api/orders/${id}`, { method: 'GET' });
      return normalizeOrder(o);
    },
    create: async (orderData) => {
      const dto = {
        customerName: orderData.shippingAddress?.fullName || orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.shippingAddress?.phone || orderData.customerPhone,
        subtotal: orderData.subtotal,
        shippingFee: orderData.shippingFee || 0,
        total: orderData.total,
        paymentMethod: orderData.paymentMethod,
        shippingFullName: orderData.shippingAddress?.fullName || orderData.customerName,
        shippingAddress: orderData.shippingAddress?.address,
        shippingCity: orderData.shippingAddress?.city,
        shippingState: orderData.shippingAddress?.state,
        shippingZip: orderData.shippingAddress?.zip,
        shippingPhone: orderData.shippingAddress?.phone || orderData.customerPhone,
        items: (orderData.items || []).map(i => ({
          productId: i.productId || i.id,
          name: i.name,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
          customText: i.customText,
          selectedColorsJson: typeof i.selectedColors === 'object' ? JSON.stringify(i.selectedColors) : '',
          printTimeMinutes: i.printTimeMinutes || 45,
        })),
      };
      const created = await request('/api/orders', {
        method: 'POST',
        body: JSON.stringify(dto),
      });
      return normalizeOrder(created);
    },
    updateStatus: async (id, statusData) => {
      const updated = await request(`/api/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify(statusData),
      });
      return normalizeOrder(updated);
    },
    cancel: async (id, reason) => {
      const updated = await request(`/api/orders/${id}/cancel`, {
        method: 'POST',
        body: JSON.stringify({ reason }),
      });
      return normalizeOrder(updated);
    },
    approveProof: async (id) => {
      const updated = await request(`/api/orders/${id}/approve-proof`, {
        method: 'POST',
      });
      return normalizeOrder(updated);
    },
    requestProofChanges: async (id, changesNote) => {
      const updated = await request(`/api/orders/${id}/request-proof-changes`, {
        method: 'POST',
        body: JSON.stringify({ changesNote }),
      });
      return normalizeOrder(updated);
    },
    assignPrinter: async (id, printerData) => {
      const updated = await request(`/api/orders/${id}/assign-printer`, {
        method: 'POST',
        body: JSON.stringify(printerData),
      });
      return normalizeOrder(updated);
    },
  },

  // 3D Printer Farm & Telemetry
  printers: {
    getAll: () => request('/api/printers', { method: 'GET' }),
    updateStatus: (id, statusData) =>
      request(`/api/printers/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify(statusData),
      }),
  },

  // Custom Print Inquiries
  inquiries: {
    getAll: () => request('/api/inquiries', { method: 'GET' }),
    create: (inquiryData) =>
      request('/api/inquiries', {
        method: 'POST',
        body: JSON.stringify(inquiryData),
      }),
  },

  // S3 File Storage (CAD STL, OBJ, 3MF & Review Photos)
  storage: {
    upload: async (file, folder = 'models') => {
      const formData = new FormData();
      formData.append('file', file);
      if (folder) formData.append('folder', folder);

      return request(
        '/api/storage/upload',
        {
          method: 'POST',
          body: formData,
        },
        30000
      );
    },
    delete: (key) =>
      request(`/api/storage?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
      }),
  },

  // Admin Dashboard Live Stats
  dashboard: {
    getStats: () => request('/api/dashboard/stats', { method: 'GET' }),
  },
};

export default api;
