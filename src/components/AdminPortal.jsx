import { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  X,
  TrendingUp,
  IndianRupee,
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function AdminPortal({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  users,
  onAddUser,
  onToggleUserStatus,
  onToggleUserRole,
  onClose,
  currentUser
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'users'

  // Product filters and modal state
  const [productSearch, setProductSearch] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // New product form state
  const [newProductForm, setNewProductForm] = useState({
    title: '',
    tagline: '',
    category: 'mechanical',
    categoryLabel: 'Mechanical & Functional',
    price: 999,
    originalPrice: 1999,
    stock: 50,
    inStock: true,
    isAssured: true,
    fastDelivery: 'Tomorrow, by 2 PM',
    material: 'Carbon-Fiber Reinforced PETG',
    technology: 'Industrial FDM',
    color: '#0284c7',
    description: 'Precision engineered 3D printed component manufactured to industrial tolerances.',
    modelType: 'procedural',
    proceduralType: 'gearbox'
  });

  // Order filters and modal state
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // User filters and modal state
  const [userSearch, setUserSearch] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer',
    city: 'Bangalore, Karnataka'
  });

  // Analytics calculation
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
  }, [orders]);

  const ordersByStatus = useMemo(() => {
    const counts = { placed: 0, processing: 0, shipped: 0, delivered: 0 };
    orders.forEach(o => {
      const s = (o.status || '').toLowerCase();
      if (s.includes('placed')) counts.placed++;
      else if (s.includes('print') || s.includes('process')) counts.processing++;
      else if (s.includes('ship')) counts.shipped++;
      else if (s.includes('deliver')) counts.delivered++;
    });
    return counts;
  }, [orders]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCatFilter !== 'all' && p.category !== selectedCatFilter) return false;
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.categoryLabel?.toLowerCase().includes(q) ||
          p.material?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, selectedCatFilter, productSearch]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(ord => {
      if (orderStatusFilter !== 'all' && ord.status !== orderStatusFilter) return false;
      if (orderSearch.trim()) {
        const q = orderSearch.toLowerCase();
        return (
          ord.id.toLowerCase().includes(q) ||
          ord.customerName?.toLowerCase().includes(q) ||
          ord.customerPhone?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [orders, orderStatusFilter, orderSearch]);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      if (userSearch.trim()) {
        const q = userSearch.toLowerCase();
        return (
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.phone.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [users, userSearch]);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const discountPct = Math.round(
      ((newProductForm.originalPrice - newProductForm.price) / newProductForm.originalPrice) * 100
    );
    const productToAdd = {
      ...newProductForm,
      id: 'prod-custom-' + Date.now(),
      discount: `${discountPct}% off`,
      rating: 4.8,
      ratingCount: 1,
      availableColors: [
        { name: 'Primary Color', hex: newProductForm.color },
        { name: 'Industrial Black', hex: '#0f172a' }
      ],
      highlights: [
        'High-density 3D printing with precision dimensional tolerance',
        'Certified high-durability finish with impact resistance',
        'Direct from Flipkart Verified 3D Manufacturing Hub'
      ],
      specs: {
        'Technology': newProductForm.technology,
        'Material': newProductForm.material,
        'Infill': '30% Hexagonal',
        'Quality Standard': 'Flipkart Assured Grade A'
      },
      reviews: []
    };
    onAddProduct(productToAdd);
    setIsAddProductOpen(false);
    // Reset form
    setNewProductForm({
      title: '',
      tagline: '',
      category: 'mechanical',
      categoryLabel: 'Mechanical & Functional',
      price: 999,
      originalPrice: 1999,
      stock: 50,
      inStock: true,
      isAssured: true,
      fastDelivery: 'Tomorrow, by 2 PM',
      material: 'Carbon-Fiber Reinforced PETG',
      technology: 'Industrial FDM',
      color: '#0284c7',
      description: 'Precision engineered 3D printed component manufactured to industrial tolerances.',
      modelType: 'procedural',
      proceduralType: 'gearbox'
    });
  };

  const handleSaveEditProduct = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    onUpdateProduct(editingProduct);
    setEditingProduct(null);
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) return;
    const userToAdd = {
      id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
      ...newUserForm,
      status: 'Active',
      ordersCount: 0,
      joinedDate: 'Today',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
    };
    onAddUser(userToAdd);
    setIsAddUserOpen(false);
    setNewUserForm({
      name: '',
      email: '',
      phone: '',
      role: 'customer',
      city: 'Bangalore, Karnataka'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#f1f3f6] flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Top Admin Header */}
      <header className="bg-[#0d4243] text-white px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#22c55e] flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4 fill-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">Gromuse</span>
            <span className="bg-[#86efac] text-emerald-950 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded shadow-xs">
              Seller &amp; Admin Hub
            </span>
          </div>
          <span className="text-emerald-300 text-xs hidden md:inline">|</span>
          <span className="text-xs text-emerald-100 hidden md:inline font-medium">
            Management Portal (Grocery Products, Orders &amp; Users)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold">{currentUser?.name || 'Administrator'}</div>
            <div className="text-[10px] text-[#86efac] font-semibold uppercase tracking-wider">
              {currentUser?.role === 'admin' ? 'Master Admin' : 'Admin Mode'}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white transition-colors text-xs font-bold shadow-xs cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>View Gromuse Store</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="w-60 bg-white border-r border-gray-200 flex flex-col justify-between py-4 shadow-2xs">
          <div className="space-y-1 px-3">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Store Administration
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors text-left ${
                activeTab === 'overview'
                  ? 'bg-blue-50 text-[#2874f0]'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors text-left ${
                activeTab === 'products'
                  ? 'bg-blue-50 text-[#2874f0]'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Package className="w-4 h-4" />
              <div className="flex-1 flex items-center justify-between">
                <span>Products Catalog</span>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full font-bold">
                  {products.length}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors text-left ${
                activeTab === 'orders'
                  ? 'bg-blue-50 text-[#2874f0]'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <div className="flex-1 flex items-center justify-between">
                <span>Orders &amp; Shipments</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">
                  {orders.length}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors text-left ${
                activeTab === 'users'
                  ? 'bg-blue-50 text-[#2874f0]'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <div className="flex-1 flex items-center justify-between">
                <span>Users &amp; Accounts</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                  {users.length}
                </span>
              </div>
            </button>
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 mx-3 rounded-xl text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Flipkart Assured QC</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-tight">
              All changes apply instantaneously to the active live storefront.
            </p>
          </div>
        </aside>

        {/* Center Main Work Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Flipkart Storefront Overview</h1>
                <p className="text-xs text-gray-500">
                  Real-time analytics across inventory, orders, customer acquisition, and 3D printing queue.
                </p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                    <span>Total Revenue</span>
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                      <IndianRupee className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-gray-900">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+24.5% vs last week</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                    <span>Total Orders</span>
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-gray-900">{orders.length}</div>
                  <div className="text-[11px] text-gray-500">
                    {ordersByStatus.processing} in active 3D printing farm
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                    <span>Active Products</span>
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-gray-900">{products.length}</div>
                  <div className="text-[11px] text-emerald-600 font-bold">
                    100% in stock &amp; ready to print
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                    <span>Registered Users</span>
                    <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-gray-900">{users.length}</div>
                  <div className="text-[11px] text-gray-500">
                    {users.filter(u => u.status === 'Active').length} active verified accounts
                  </div>
                </div>
              </div>

              {/* Recent Orders Mini Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="font-bold text-sm text-gray-900">Recent Customer Orders</div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-[#2874f0] hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] border-b border-gray-200">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Item / Product</th>
                        <th className="p-3">Total Amount</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.slice(0, 4).map(ord => (
                        <tr key={ord.id} className="hover:bg-gray-50/70">
                          <td className="p-3 font-mono font-bold text-blue-700">{ord.id}</td>
                          <td className="p-3">
                            <div className="font-bold text-gray-900">{ord.customerName}</div>
                            <div className="text-[10px] text-gray-400">{ord.customerPhone}</div>
                          </td>
                          <td className="p-3 text-gray-700">
                            {ord.items?.[0]?.title || 'Custom 3D Item'}
                            {ord.items?.length > 1 && ` (+${ord.items.length - 1} more)`}
                          </td>
                          <td className="p-3 font-bold text-gray-900">
                            ₹{ord.total?.toLocaleString('en-IN')}
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.status.includes('Delivered')
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status.includes('Shipped')
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedOrderDetails(ord)}
                              className="text-xs font-bold text-blue-600 hover:underline"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Products Catalog Management</h1>
                  <p className="text-xs text-gray-500">
                    Add new items, update prices, manage stock, and edit Flipkart Assured status.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2874f0] hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by product title, material, or keyword..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full text-xs text-gray-800 outline-none placeholder-gray-400"
                  />
                  {productSearch && (
                    <button type="button" onClick={() => setProductSearch('')}>
                      <X className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-semibold">Category:</span>
                  <select
                    value={selectedCatFilter}
                    onChange={(e) => setSelectedCatFilter(e.target.value)}
                    className="text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-gray-50 outline-none text-gray-700"
                  >
                    <option value="all">All Categories ({products.length})</option>
                    <option value="medical">Medical &amp; Anatomy</option>
                    <option value="mechanical">Mechanical &amp; Functional</option>
                    <option value="figurines">Figurines &amp; Cosplay</option>
                    <option value="decor">Architectural Decor</option>
                    <option value="materials">Filaments &amp; Resins</option>
                  </select>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] border-b border-gray-200">
                      <tr>
                        <th className="p-3">Product</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Selling Price</th>
                        <th className="p-3">Original MRP</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">Flipkart Assured</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-gray-50/70">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: prod.color || '#2563eb' }}
                              >
                                <Package className="w-5 h-5 text-white" />
                              </div>
                              <div className="max-w-xs">
                                <div className="font-bold text-gray-900 truncate" title={prod.title}>
                                  {prod.title}
                                </div>
                                <div className="text-[10px] text-gray-400 truncate">
                                  {prod.material} • {prod.technology}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-semibold">
                              {prod.categoryLabel || prod.category}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-gray-900">
                            ₹{prod.price?.toLocaleString('en-IN')}
                          </td>
                          <td className="p-3 text-gray-400 line-through">
                            ₹{prod.originalPrice?.toLocaleString('en-IN')}
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-emerald-600">
                              {prod.stock || 45} units
                            </span>
                          </td>
                          <td className="p-3">
                            {prod.isAssured ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                <ShieldCheck className="w-3 h-3 text-blue-600" />
                                <span>f-assured</span>
                              </span>
                            ) : (
                              <span className="text-[10px] text-gray-400">Standard</span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingProduct({ ...prod })}
                                className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit Product"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${prod.title}"?`)) {
                                    onDeleteProduct(prod.id);
                                  }
                                }}
                                className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Customer Orders &amp; Print Jobs</h1>
                  <p className="text-xs text-gray-500">
                    Track incoming orders, update manufacturing status, and generate delivery notes.
                  </p>
                </div>
              </div>

              {/* Order Filters */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by Order ID, Customer Name, or Phone..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full text-xs text-gray-800 outline-none placeholder-gray-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-semibold">Status:</span>
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-gray-50 outline-none text-gray-700"
                  >
                    <option value="all">All Orders ({orders.length})</option>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Printing in Progress">Printing in Progress</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] border-b border-gray-200">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer Details</th>
                        <th className="p-3">Order Items</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">Status Selector</th>
                        <th className="p-3 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-gray-50/70">
                          <td className="p-3 font-mono font-bold text-blue-700">
                            {ord.id}
                            <div className="text-[10px] text-gray-400 font-sans">{ord.date}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-gray-900">{ord.customerName}</div>
                            <div className="text-[10px] text-gray-500">{ord.customerPhone}</div>
                            <div className="text-[10px] text-gray-400 truncate max-w-[160px]">
                              {ord.shippingAddress?.city || 'Bangalore'}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-gray-800 font-medium">
                              {ord.items?.[0]?.title || '3D Printed Part'}
                            </div>
                            <div className="text-[10px] text-gray-400">
                              Qty: {ord.items?.[0]?.quantity || 1} • {ord.items?.length || 1} item(s)
                            </div>
                          </td>
                          <td className="p-3 font-bold text-gray-900">
                            ₹{ord.total?.toLocaleString('en-IN')}
                          </td>
                          <td className="p-3">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {ord.paymentMethod || 'Paid (Online)'}
                            </span>
                          </td>
                          <td className="p-3">
                            <select
                              value={ord.status}
                              onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                              className="text-xs font-bold border border-gray-300 rounded px-2 py-1 bg-white focus:border-blue-600 outline-none"
                            >
                              <option value="Order Placed">Order Placed</option>
                              <option value="Printing in Progress">Printing in Progress</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedOrderDetails(ord)}
                              className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Invoice</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: USERS MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Registered Users &amp; Accounts</h1>
                  <p className="text-xs text-gray-500">
                    Manage buyer accounts, assign administrator privileges, and moderate users.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2874f0] hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create User Account</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search user by name, email, phone, or role..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full text-xs text-gray-800 outline-none placeholder-gray-400"
                />
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] border-b border-gray-200">
                      <tr>
                        <th className="p-3">User</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Orders</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50/70">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={u.avatar}
                                alt={u.name}
                                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                              />
                              <div>
                                <div className="font-bold text-gray-900">{u.name}</div>
                                <div className="text-[10px] text-gray-400">Joined {u.joinedDate}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-gray-800">{u.email}</div>
                            <div className="text-[10px] text-gray-400">{u.phone}</div>
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                              u.role === 'admin'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {u.role === 'admin' ? '🛡️ Admin' : '👤 Customer'}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-gray-700">
                            {u.ordersCount || 0} orders
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              u.status === 'Active'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => onToggleUserRole(u.id)}
                                className="text-[11px] font-bold text-blue-600 hover:underline px-1.5 py-0.5"
                                title="Toggle Role"
                              >
                                {u.role === 'admin' ? 'Make Customer' : 'Make Admin'}
                              </button>
                              <button
                                type="button"
                                onClick={() => onToggleUserStatus(u.id)}
                                className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                                  u.status === 'Active'
                                    ? 'text-rose-600 hover:bg-rose-50'
                                    : 'text-emerald-600 hover:bg-emerald-50'
                                }`}
                              >
                                {u.status === 'Active' ? 'Suspend' : 'Activate'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD PRODUCT */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="font-bold text-base text-gray-900">Add New Product to Flipkart</h3>
              <button type="button" onClick={() => setIsAddProductOpen(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleCreateProduct} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={newProductForm.title}
                  onChange={(e) => setNewProductForm({ ...newProductForm, title: e.target.value })}
                  placeholder="e.g. Ergonomic Mechanical Keyboard Case"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => {
                      const labels = {
                        medical: 'Medical & Anatomy',
                        mechanical: 'Mechanical & Functional',
                        figurines: 'Figurines & Cosplay',
                        decor: 'Architectural & Decor',
                        materials: 'Filaments & Resins'
                      };
                      setNewProductForm({
                        ...newProductForm,
                        category: e.target.value,
                        categoryLabel: labels[e.target.value] || '3D Parts'
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="mechanical">Mechanical &amp; Functional</option>
                    <option value="medical">Medical &amp; Anatomy</option>
                    <option value="figurines">Figurines &amp; Cosplay</option>
                    <option value="decor">Architectural &amp; Decor</option>
                    <option value="materials">Filaments &amp; Resins</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newProductForm.stock}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    value={newProductForm.originalPrice}
                    onChange={(e) => setNewProductForm({ ...newProductForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Print Material</label>
                  <input
                    type="text"
                    value={newProductForm.material}
                    onChange={(e) => setNewProductForm({ ...newProductForm, material: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Theme Color</label>
                  <input
                    type="color"
                    value={newProductForm.color}
                    onChange={(e) => setNewProductForm({ ...newProductForm, color: e.target.value })}
                    className="w-full h-9 border border-gray-300 rounded-lg cursor-pointer p-1"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Product Description</label>
                <textarea
                  rows={2}
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isAssured"
                  checked={newProductForm.isAssured}
                  onChange={(e) => setNewProductForm({ ...newProductForm, isAssured: e.target.checked })}
                  className="accent-blue-600"
                />
                <label htmlFor="isAssured" className="font-semibold text-gray-700">
                  Qualify for Flipkart Assured badge (f-assured)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2874f0] hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  Publish to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="font-bold text-base text-gray-900">Edit Product Details</h3>
              <button type="button" onClick={() => setEditingProduct(null)}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSaveEditProduct} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={editingProduct.stock || 45}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="editAssured"
                  checked={editingProduct.isAssured || false}
                  onChange={(e) => setEditingProduct({ ...editingProduct, isAssured: e.target.checked })}
                  className="accent-blue-600"
                />
                <label htmlFor="editAssured" className="font-semibold text-gray-700">
                  Flipkart Assured badge
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2874f0] hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ORDER DETAILS / INVOICE */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                  Flipkart Tax Invoice &amp; Dispatch Order
                </span>
                <h3 className="font-bold text-base text-gray-900 font-mono">
                  {selectedOrderDetails.id}
                </h3>
              </div>
              <button type="button" onClick={() => setSelectedOrderDetails(null)}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-3 rounded-lg">
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Customer Details</span>
                <div className="font-bold text-gray-900">{selectedOrderDetails.customerName}</div>
                <div className="text-gray-600">{selectedOrderDetails.customerPhone}</div>
                <div className="text-gray-500">{selectedOrderDetails.customerEmail}</div>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Delivery Address</span>
                <div className="text-gray-700">
                  {selectedOrderDetails.shippingAddress?.street || 'Flat 402, Precision Residency'}
                </div>
                <div className="text-gray-700">
                  {selectedOrderDetails.shippingAddress?.city || 'Bangalore'} - {selectedOrderDetails.shippingAddress?.pincode || '560001'}
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
              <div className="bg-gray-100 px-3 py-1.5 font-bold text-gray-700">Order Items</div>
              <div className="p-3 divide-y divide-gray-100">
                {selectedOrderDetails.items?.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900">{item.title}</div>
                      <div className="text-[10px] text-gray-500">
                        Qty: {item.quantity} • Color: {item.selectedColorName || 'Standard'}
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs space-y-1 pt-1">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{selectedOrderDetails.subtotal?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping &amp; Handling:</span>
                <span>{selectedOrderDetails.deliveryFee === 0 ? 'FREE' : `₹${selectedOrderDetails.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Final Paid Total:</span>
                <span className="text-blue-600 font-mono">₹{selectedOrderDetails.total?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrderDetails(null)}
                className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black"
              >
                Close Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD USER */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="font-bold text-base text-gray-900">Add User Account</h3>
              <button type="button" onClick={() => setIsAddUserOpen(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  placeholder="e.g. rahul@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={newUserForm.phone}
                  onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                  placeholder="+91 98765 00000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Account Role</label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-600 bg-white"
                >
                  <option value="customer">Customer (Standard Buyer)</option>
                  <option value="admin">Administrator (Full Access)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2874f0] hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
