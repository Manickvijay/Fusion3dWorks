// Central API Service for Fusion3D Works Backend Integration
// Uses integrated Express backend on current origin by default
export const API_BASE_URL = (import.meta.env.VITE_API_URL && !import.meta.env.VITE_API_URL.includes('onrender.com'))
  ? import.meta.env.VITE_API_URL
  : '';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMsg = `HTTP Error ${response.status}: ${response.statusText}`;
    try {
      const data = await response.json();
      if (data?.message) {
        errorMsg = data.message;
      }
    } catch {
      // Ignore if response body is not JSON
    }
    throw new Error(errorMsg);
  }

  // If response is 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  health: {
    check: () => request('/api/health'),
  },

  dashboard: {
    getStats: () => request('/api/dashboard/stats'),
  },

  products: {
    getAll: (params = {}) => {
      const query = new URLSearchParams();
      if (params.category) query.append('category', params.category);
      if (params.search) query.append('search', params.search);
      const queryString = query.toString() ? `?${query.toString()}` : '';
      return request(`/api/products${queryString}`);
    },
    getById: (id) => request(`/api/products/${id}`),
    create: (data) =>
      request('/api/products', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      request(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    applyDiscount: (id, data) =>
      request(`/api/products/${id}/discount`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      request(`/api/products/${id}`, {
        method: 'DELETE',
      }),
    submitReview: (productId, reviewData) =>
      request(`/api/products/${productId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(reviewData),
      }),
  },

  orders: {
    getAll: (customerEmail) => {
      const query = customerEmail ? `?customerEmail=${encodeURIComponent(customerEmail)}` : '';
      return request(`/api/orders${query}`);
    },
    getById: (id) => request(`/api/orders/${id}`),
    create: (data) =>
      request('/api/orders', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    cancel: (id, reason) =>
      request(`/api/orders/${id}/cancel`, {
        method: 'POST',
        body: JSON.stringify({ reason }),
      }),
    updateStatus: (id, data) =>
      request(`/api/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    approveProof: (id) =>
      request(`/api/orders/${id}/approve-proof`, {
        method: 'POST',
      }),
    requestProofChanges: (id, feedback) =>
      request(`/api/orders/${id}/request-proof-changes`, {
        method: 'POST',
        body: JSON.stringify({ feedback: typeof feedback === 'string' ? feedback : feedback?.feedback }),
      }),
    assignPrinter: (id, data) =>
      request(`/api/orders/${id}/assign-printer`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  printers: {
    getAll: () => request('/api/printers'),
    getById: (id) => request(`/api/printers/${id}`),
    updateStatus: (id, data) =>
      request(`/api/printers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    create: (data) =>
      request('/api/printers', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      request(`/api/printers/${id}`, {
        method: 'DELETE',
      }),
  },

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
    getUsers: () => request('/api/auth/users'),
    getUserById: (id) => request(`/api/auth/users/${id}`),
    updateUser: (id, userData) =>
      request(`/api/auth/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      }),
  },

  inquiries: {
    getAll: (customerEmail) => {
      const query = customerEmail ? `?customerEmail=${encodeURIComponent(customerEmail)}` : '';
      return request(`/api/inquiries${query}`);
    },
    create: (data) =>
      request('/api/inquiries', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  storage: {
    upload: async (file, folder = 'uploads') => {
      const url = `${API_BASE_URL}/api/storage/upload?folder=${encodeURIComponent(folder)}`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      return response.json();
    },
  },
};

export default api;
