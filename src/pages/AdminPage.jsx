import React, { useState, useMemo } from 'react';
import {
  Printer,
  Clock,
  Package,
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  Download,
  CheckCircle2,
  Sun,
  Moon,
  TrendingUp,
  X,
  Users,
  Upload,
  FileCode,
  Palette,
  Check,
  Percent,
  Search,
  MessageSquare,
  BarChart3,
  Activity
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import { useShop } from '../context/ShopContext';

export default function AdminPage() {
  const {
    currentUser,
    setIsLoginModalOpen,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    adminUpdateOrderStatus,
    assignOrderToPrinter,
    qaCheckOrder,
    deleteOrder,
    printers,
    updatePrinterStatus: _updatePrinterStatus,
    togglePrinterMaintenance,
    clearPrinterJob,
    registeredUsers,
    deleteUser,
    updateProductWithDiscount,
    addColorToProduct,
    customInquiries,
    updateInquiryStatus,
    replyToInquiry,
    deleteInquiry,
    filaments,
    addFilament,
    updateFilament: _updateFilament,
    toggleFilamentStock,
    deleteFilament,
    uploadStorageFile,
    ORDER_STAGES,
    addToast
  } = useShop();

  // Admin opens directly to the 3D printing list (explicit requirement: "Admin only need to see the 3d printing list")
  const [activeTab, setActiveTab] = useState('worklist'); // 'worklist' | 'products' | 'filaments' | 'users' | 'inquiries' | 'dashboard'

  // Inquiry Quote/Reply Modal State
  const [replyingInquiry, setReplyingInquiry] = useState(null);
  const [inquiryQuoteAmount, setInquiryQuoteAmount] = useState('');
  const [inquiryAdminReply, setInquiryAdminReply] = useState('');

  // Filament Color Manager Modal State
  const [isAddingFilament, setIsAddingFilament] = useState(false);
  const [newFilamentForm, setNewFilamentForm] = useState({
    name: '',
    hex: '#F59E0B',
    material: 'PLA+ Silk',
    inStock: true
  });
  const [isUploadingProductImage, setIsUploadingProductImage] = useState(false);
  const [isUploading3DModel, setIsUploading3DModel] = useState(false);

  // Print Queue Sorting Mode: "manage give orders base on the time"
  const [queueSortMode, setQueueSortMode] = useState('short-first'); // 'short-first' (Daytime) | 'long-first' (Nighttime) | 'all'
  const [selectedMachineFilter, setSelectedMachineFilter] = useState('all');

  // Edit / Create Product Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null); // null for create, string id for edit
  const [productForm, setProductForm] = useState({
    name: '',
    category: '3d-keychain',
    categoryLabel: '3D Keychains',
    price: 14.99,
    originalPrice: null,
    discountPercent: 0,
    printTime: '45m',
    printTimeMinutes: 45,
    description: 'Precision multi-color 3D printed custom creation.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    modelType: 'keychain',
    allowCustomText: true,
    customTextPlaceholder: 'e.g. TOP TEXT / BOTTOM TEXT',
    uploadedFileName: '',
    cadModelUrl: '',
    requiresUserImage: false,
    minImages: 1,
    maxImages: 3,
    imageInstructions: 'Upload high-resolution photo for 3D lithophane or custom preview',
    colorMode: 'multiple', // 'single' | 'multiple'
    singleHeading: 'Primary Filament Color',
    colorHeadings: ['Top Accent / Text Color', 'Base Plate / Backing Color'],
    customizableSections: [
      {
        id: 'top_text',
        name: 'Top Accent / Text Color',
        defaultColor: '#F59E0B'
      },
      {
        id: 'base_plate',
        name: 'Base Plate / Backing Color',
        defaultColor: '#0F172A'
      }
    ]
  });

  // Quick Discount Modal State
  const [discountModalProduct, setDiscountModalProduct] = useState(null);
  const [quickDiscountPercent, setQuickDiscountPercent] = useState(15);

  // Add Color Modal State
  const [colorModalSection, setColorModalSection] = useState(null); // { productId, sectionId }
  const [newColorForm, setNewColorForm] = useState({ name: 'Emerald Sparkle', hex: '#10B981' });

  // User search
  const [userSearchQuery, setUserSearchQuery] = useState('');

  // Dashboard Telemetry Metric: 'orders' | 'hours' | 'revenue'
  const [dashboardMetric, setDashboardMetric] = useState('orders');

  // Sorter / Filter for 3D Printing Work List based on Time
  const printQueue = useMemo(() => {
    const queue = [];
    orders.forEach(order => {
      order.items.forEach((item, idx) => {
        const itemPrintMins = (item.printTimeMinutes || 45) * (item.quantity || 1);
        queue.push({
          jobId: `${order.id}-J${idx + 1}`,
          orderId: order.id,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          productName: item.name,
          customText: item.customText,
          selectedColors: item.selectedColors,
          quantity: item.quantity,
          printTimeMinutes: itemPrintMins,
          printTimeFormatted: item.printTime || `${itemPrintMins}m`,
          orderStatus: order.status,
          statusProgress: order.statusProgress || 10,
          assignedPrinter: order.assignedPrinter || 'Unassigned',
          orderDate: order.date,
          suggestedBatch: itemPrintMins >= 150 ? 'Overnight Night-Batch' : 'Daytime Quick-Turnaround'
        });
      });
    });

    let filtered = queue;
    if (selectedMachineFilter !== 'all') {
      filtered = filtered.filter(j => j.assignedPrinter.toLowerCase().includes(selectedMachineFilter.toLowerCase()));
    }

    // Time-based sorting (low time first vs long time first)
    if (queueSortMode === 'short-first') {
      filtered.sort((a, b) => a.printTimeMinutes - b.printTimeMinutes);
    } else if (queueSortMode === 'long-first') {
      filtered.sort((a, b) => b.printTimeMinutes - a.printTimeMinutes);
    }

    return filtered;
  }, [orders, queueSortMode, selectedMachineFilter]);

  // Open Edit Product Modal
  const handleOpenEditProduct = (product) => {
    const isSingle = (product.customizableSections || []).length <= 1;
    const headings = (product.customizableSections || []).length > 0
      ? product.customizableSections.map(s => s.name)
      : ['Top Color', 'Bottom Color'];
    const singleHeading = (product.customizableSections || [])[0]?.name || 'Primary Filament Color';
    const existingImages = (product.images && product.images.length > 0)
      ? product.images
      : (product.gallery && product.gallery.length > 0)
      ? product.gallery
      : (product.image ? [product.image] : []);

    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      category: product.category,
      categoryLabel: product.categoryLabel || product.category,
      price: product.price,
      originalPrice: product.originalPrice || null,
      discountPercent: product.discountPercent || 0,
      printTime: product.printTime,
      printTimeMinutes: product.printTimeMinutes || 45,
      description: product.description || '',
      image: product.image || existingImages[0] || '',
      images: existingImages,
      modelType: product.modelType || 'keychain',
      allowCustomText: !!product.allowCustomText,
      customTextPlaceholder: product.customTextPlaceholder || 'ENTER TEXT',
      uploadedFileName: product.uploadedFileName || '',
      cadModelUrl: product.cadModelUrl || '',
      requiresUserImage: !!product.requiresUserImage,
      minImages: product.minImages || 1,
      maxImages: product.maxImages || 3,
      imageInstructions: product.imageInstructions || 'Upload reference photo for 3D model customization',
      colorMode: isSingle ? 'single' : 'multiple',
      singleHeading,
      colorHeadings: headings,
      customizableSections: product.customizableSections || []
    });
    setIsProductModalOpen(true);
  };

  // Open Create Product Modal
  const handleOpenCreateProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      category: '3d-keychain',
      categoryLabel: '3D Keychains',
      price: 14.99,
      originalPrice: null,
      discountPercent: 0,
      printTime: '45m',
      printTimeMinutes: 45,
      description: 'Precision 3D printed custom creation.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'],
      modelType: 'keychain',
      allowCustomText: true,
      customTextPlaceholder: 'e.g. TOP TEXT / BOTTOM TEXT',
      uploadedFileName: '',
      cadModelUrl: '',
      requiresUserImage: false,
      minImages: 1,
      maxImages: 3,
      imageInstructions: 'Upload reference photo for 3D model customization',
      colorMode: 'multiple',
      singleHeading: 'Primary Filament Color',
      colorHeadings: ['Top Color', 'Bottom Color'],
      customizableSections: [
        { id: 'top_text', name: 'Top Color', defaultColor: '#F59E0B' },
        { id: 'base_plate', name: 'Bottom Color', defaultColor: '#0F172A' }
      ]
    });
    setIsProductModalOpen(true);
  };

  // Save product (create or edit)
  const handleSaveProduct = (e) => {
    e.preventDefault();

    // Construct customizableSections based on admin's color headings
    const finalSections = productForm.colorMode === 'single'
      ? [{ id: 'color_main', name: (productForm.singleHeading || 'Filament Color').trim(), defaultColor: '#F59E0B' }]
      : productForm.colorHeadings.filter(h => h.trim()).map((h, idx) => ({
          id: `color_section_${idx + 1}`,
          name: h.trim(),
          defaultColor: '#F59E0B'
        }));

    const finalImages = (productForm.images && productForm.images.length > 0)
      ? productForm.images
      : (productForm.image ? [productForm.image] : []);

    const finalProduct = {
      ...productForm,
      image: productForm.image || finalImages[0] || '',
      images: finalImages,
      customizableSections: finalSections.length > 0 ? finalSections : [{ id: 'color_main', name: 'Filament Color', defaultColor: '#F59E0B' }]
    };

    if (editingProductId) {
      updateProduct(editingProductId, finalProduct);
      addToast(`Product "${productForm.name}" updated successfully!`, 'success');
    } else {
      addProduct(finalProduct);
      addToast(`New 3D Product "${productForm.name}" published!`, 'success');
    }
    setIsProductModalOpen(false);
  };

  // Multiple Image Upload Handler via Backend Storage Service
  const handleMultipleImagesUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setIsUploadingProductImage(true);
    try {
      const uploadPromises = files.map(file => uploadStorageFile(file, 'products'));
      const results = await Promise.all(uploadPromises);
      const newUrls = results.map(r => r.fileUrl || r.url).filter(Boolean);

      setProductForm(prev => {
        const currentList = Array.isArray(prev.images) && prev.images.length > 0
          ? [...prev.images]
          : (prev.image ? [prev.image] : []);
        const combined = [...currentList, ...newUrls];
        return {
          ...prev,
          image: prev.image || combined[0] || '',
          images: combined
        };
      });
      addToast(`Successfully uploaded ${newUrls.length} product image(s) to storage!`, 'success');
    } catch (err) {
      addToast(err.message || 'Image upload failed', 'error');
    } finally {
      setIsUploadingProductImage(false);
    }
  };

  const handleRemoveProductImage = (idx) => {
    setProductForm(prev => {
      const currentList = prev.images || (prev.image ? [prev.image] : []);
      const updated = currentList.filter((_, i) => i !== idx);
      return {
        ...prev,
        images: updated,
        image: prev.image === currentList[idx] ? (updated[0] || '') : prev.image
      };
    });
  };

  const handleSetCoverImage = (imgUrl) => {
    setProductForm(prev => ({
      ...prev,
      image: imgUrl
    }));
    addToast('Set as primary cover image!', 'info');
  };

  // 3D File (.stl, .obj, .3mf) Upload Handler via Backend Storage Service
  const handle3DModelFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading3DModel(true);
    try {
      const res = await uploadStorageFile(file, 'cad-models');
      if (res?.fileUrl) {
        setProductForm(prev => ({
          ...prev,
          uploadedFileName: file.name,
          cadModelUrl: res.fileUrl,
          description: prev.description ? `${prev.description} [Attached 3D Model: ${file.name}]` : `Custom 3D Model: ${file.name}`
        }));
        addToast(`3D CAD File "${file.name}" uploaded to storage!`, 'success');
      }
    } catch (err) {
      addToast(err.message || 'CAD model upload failed', 'error');
    } finally {
      setIsUploading3DModel(false);
    }
  };

  // Add more colours to product
  const handleAddColorSubmit = (e) => {
    e.preventDefault();
    if (!colorModalSection) return;
    addColorToProduct(colorModalSection.productId, colorModalSection.sectionId, newColorForm);
    setColorModalSection(null);
    setNewColorForm({ name: 'Emerald Sparkle', hex: '#10B981' });
  };

  // Quick Apply Discount
  const handleApplyDiscount = () => {
    if (!discountModalProduct) return;
    updateProductWithDiscount(discountModalProduct.id, quickDiscountPercent);
    setDiscountModalProduct(null);
  };

  // Export CSV
  const handleExportQueue = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Job ID,Order ID,Customer,Product,Print Time (Mins),Batch Type,Assigned Machine,Status"]
        .concat(printQueue.map(q => 
          `"${q.jobId}","${q.orderId}","${q.customerName}","${q.productName}",${q.printTimeMinutes},"${q.suggestedBatch}","${q.assignedPrinter}","${q.orderStatus}"`
        )).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Fusion3D_PrintFarmQueue_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('3D Print Work List exported to CSV!', 'success');
  };

  // Filtered users
  const filteredUsers = useMemo(() => {
    if (!userSearchQuery) return registeredUsers || [];
    return (registeredUsers || []).filter(u => 
      u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchQuery.toLowerCase())
    );
  }, [registeredUsers, userSearchQuery]);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activePrintersCount = (printers || []).filter(p => p.status === 'Printing').length;

  if (currentUser?.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-xl shadow-orange-100">
          <Printer className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-extrabold text-[11px] uppercase tracking-wider">
            Restricted Admin Area
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Administrator Authentication Required
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
            The 3D Print Farm Fleet, queue allocation, printer firmware controls, and user administration are restricted to authorized administrators.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-600/25 inline-flex items-center space-x-2 transition-all cursor-pointer text-xs"
          >
            <span>Sign In with Administrator Account</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-extrabold text-[10px] uppercase tracking-wider border border-orange-400/30">
              Admin Farm Control Center
            </span>
            <span className="text-slate-400 text-xs">• {currentUser?.name || 'Farm Administrator'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
            3D Print Farm Fleet & Production Queue
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Admin monitors print jobs, manages Bambu Lab A1 allocations, approves design proofs, and optimizes machine throughput by print duration.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleOpenCreateProduct}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add 3D Product</span>
          </button>

          <button
            onClick={handleExportQueue}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none text-xs font-bold">
        
        {/* Tab 1: 3D Printing List (Default!) */}
        <button
          onClick={() => setActiveTab('worklist')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'worklist'
              ? 'bg-orange-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>3D Printing List & Scheduling ({printQueue.length})</span>
        </button>

        {/* Tab 2: Products & Custom Options */}
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'products'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog & Discounts ({products.length})</span>
        </button>

        {/* Tab: Filament Colors & Stock Manager */}
        <button
          onClick={() => setActiveTab('filaments')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'filaments'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Filament Colors & Stock ({(filaments || []).length})</span>
        </button>

        {/* Tab 3: Registered Users List */}
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'users'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Registered Users ({(registeredUsers || []).length})</span>
        </button>

        {/* Tab 4: Customer Custom Requests */}
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'inquiries'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Custom Inquiries ({(customInquiries || []).length})</span>
        </button>

        {/* Tab 5: Analytics */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Farm Telemetry & Revenue</span>
        </button>
      </div>

      {/* TAB 1: 3D PRINTER WORK LIST / SMART SCHEDULING */}
      {activeTab === 'worklist' && (
        <div className="space-y-6">
          
          {/* Live Printer Farm Status Grid (Including Bambu Lab A1!) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <Printer className="w-4 h-4 text-orange-600" />
                  <h3 className="font-black text-sm text-slate-900">
                    Live 3D Printer Farm Fleet ({printers.length} Machines)
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500">
                  Includes high-speed Bambu Lab A1 with AMS Lite 4-color automatic filament feeder.
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400 font-medium">Filter Machine:</span>
                <select
                  value={selectedMachineFilter}
                  onChange={(e) => setSelectedMachineFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden"
                >
                  <option value="all">All Farm Machines</option>
                  <option value="Bambu Lab A1">Bambu Lab A1 (AMS Lite)</option>
                  <option value="X1-Carbon">Bambu Lab X1-Carbon</option>
                  <option value="Prusa">Prusa MK4</option>
                  <option value="Formlabs">Formlabs Resin</option>
                </select>
              </div>
            </div>

            {/* Printers Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {printers.map((printer) => (
                <div
                  key={printer.id}
                  className={`p-3.5 rounded-xl border transition-all text-xs flex flex-col justify-between space-y-2 ${
                    printer.status === 'Printing'
                      ? 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-300/30'
                      : printer.status === 'Idle'
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs truncate">
                        {printer.name}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        printer.status === 'Printing'
                          ? 'bg-amber-500 text-white animate-pulse'
                          : printer.status === 'Idle'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-500 text-white'
                      }`}>
                        {printer.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{printer.type}</p>
                  </div>

                  <div className="space-y-1 bg-white p-2 rounded-lg border border-slate-100 text-[10px]">
                    <div className="flex justify-between text-slate-600">
                      <span>Nozzle / Bed:</span>
                      <span className="font-mono font-bold text-slate-900">{printer.nozzleTemp || '220°C'} / {printer.bedTemp || '60°C'}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Material:</span>
                      <span className="font-semibold text-indigo-600">{printer.materialLoaded || 'PLA+'}</span>
                    </div>
                    {printer.currentJob && (
                      <div className="text-[10px] text-amber-700 font-medium truncate">
                        Job: {printer.currentJob} ({printer.progress}%)
                      </div>
                    )}
                  </div>

                  {/* Toggle Status Actions */}
                  <div className="pt-1 grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => togglePrinterMaintenance(printer.id)}
                      className="py-1 px-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[9px] font-bold transition-colors cursor-pointer text-center truncate"
                      title="Toggle calibration & maintenance mode"
                    >
                      {printer.status === 'Maintenance' ? 'Exit Maint.' : 'Calibrate'}
                    </button>
                    <button
                      onClick={() => clearPrinterJob(printer.id)}
                      className="py-1 px-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-[9px] font-bold transition-colors cursor-pointer text-center truncate"
                      title="Clear completed job and reset to Idle"
                    >
                      Clear / Idle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time-Based Smart Order Scheduler Controls */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Time-Based Smart Scheduling Algorithm</span>
                </div>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  Queue Priority Managed by Print Duration
                </h3>
                <p className="text-[11px] text-slate-500">
                  Short-time jobs prioritized during daytime for quick customer turnover; high-duration jobs scheduled for continuous night runs.
                </p>
              </div>

              {/* Time Sort Selector */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => setQueueSortMode('short-first')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    queueSortMode === 'short-first'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Shortest First (Daytime)</span>
                </button>

                <button
                  onClick={() => setQueueSortMode('long-first')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    queueSortMode === 'long-first'
                      ? 'bg-indigo-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Longest First (Night)</span>
                </button>
              </div>
            </div>

            {/* Print Queue Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Job & Order ID</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Product & Custom Specs</th>
                    <th className="py-2.5 px-3">Print Duration</th>
                    <th className="py-2.5 px-3">Suggested Batch</th>
                    <th className="py-2.5 px-3">Assigned Machine</th>
                    <th className="py-2.5 px-3">10-Stage Pipeline Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {printQueue.map((job) => (
                    <tr key={job.jobId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        {job.jobId}
                        <span className="block text-[10px] text-slate-400">{job.orderDate}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-800 block">{job.customerName}</span>
                        <span className="text-[10px] text-slate-400">{job.customerEmail}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-800">{job.productName} (x{job.quantity})</span>
                        {job.customText && (
                          <span className="block text-[10px] text-indigo-600 font-mono font-bold">
                            Text: "{job.customText}"
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-mono font-black text-slate-900 flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{job.printTimeMinutes} min</span>
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center space-x-1 ${
                          job.suggestedBatch.includes('Daytime')
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {job.suggestedBatch.includes('Daytime') ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                          <span>{job.suggestedBatch}</span>
                        </span>
                      </td>

                      {/* Machine Assignment Dropdown */}
                      <td className="py-3 px-3">
                        <select
                          value={printers.find(p => p.name === job.assignedPrinter)?.id || (job.assignedPrinter !== 'Unassigned' ? job.assignedPrinter : '')}
                          onChange={(e) => {
                            if (e.target.value) {
                              assignOrderToPrinter(job.orderId, e.target.value);
                            }
                          }}
                          className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-800"
                        >
                          <option value="">Unassigned</option>
                          {printers.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.status})
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* 10-Stage Status Updater */}
                      <td className="py-3 px-3">
                        <select
                          value={job.orderStatus}
                          onChange={(e) => adminUpdateOrderStatus(job.orderId, e.target.value)}
                          className="px-2 py-1 bg-indigo-50/70 border border-indigo-200 rounded-lg text-[11px] font-bold text-indigo-900 max-w-[180px] truncate"
                        >
                          {ORDER_STAGES.map((st) => (
                            <option key={st.id} value={st.id}>
                              {st.id}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => {
                            const bambu = printers.find(p => p.name.includes('Bambu') || p.id.includes('BAMBU')) || printers[0];
                            if (bambu) {
                              assignOrderToPrinter(job.orderId, bambu.id);
                            }
                          }}
                          className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                          title="Assign to Bambu Lab A1 and start printing"
                        >
                          Print A1
                        </button>
                        <button
                          onClick={() => qaCheckOrder(job.orderId, { tolerance: '< 0.08mm', notes: 'Inspection pass' })}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                          title="Pass Caliper QA Check"
                        >
                          QA Pass
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete order ${job.orderId}?`)) {
                              deleteOrder(job.orderId);
                            }
                          }}
                          className="px-2 py-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-lg text-[10px] font-bold cursor-pointer"
                          title="Remove Order"
                        >
                          <Trash2 className="w-3 h-3 inline" />
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

      {/* TAB: FILAMENT COLOUR & STOCK MANAGER */}
      {activeTab === 'filaments' && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Filament Colour & Inventory Manager
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  {filaments.length} Formulations
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Add, manage, and delete the physical filament colors available on your 3D printers. Toggle between In Stock and Out of Stock. When out of stock, customers cannot select the color in the store.
              </p>
            </div>

            <button
              onClick={() => setIsAddingFilament(true)}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md shadow-amber-600/20 transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Filament Colour</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Fleet Colours</span>
                <span className="text-2xl font-black font-mono text-slate-900">{filaments.length}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Palette className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">In Stock (Active)</span>
                <span className="text-2xl font-black font-mono text-emerald-600">
                  {filaments.filter(f => f.inStock !== false).length}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider block">Out of Stock (Disabled)</span>
                <span className="text-2xl font-black font-mono text-rose-600">
                  {filaments.filter(f => f.inStock === false).length}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <X className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Filament Inventory Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h4 className="font-black text-slate-900 text-sm">
                Filament Spool List ({filaments.length})
              </h4>
              <span className="text-xs text-slate-400">
                Visual swatches sync immediately with single/multi-color product selections
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">Colour Swatch</th>
                    <th className="py-3.5 px-6">Colour Name</th>
                    <th className="py-3.5 px-6">Hex Code</th>
                    <th className="py-3.5 px-6">Material Formulation</th>
                    <th className="py-3.5 px-6">Inventory Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filaments.map((fil) => (
                    <tr key={fil.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-9 h-9 rounded-2xl border-2 border-slate-200 shadow-2xs shrink-0 relative overflow-hidden"
                            style={{ backgroundColor: fil.hex }}
                          >
                            {fil.inStock === false && (
                              <span className="absolute inset-0 flex items-center justify-center">
                                <span className="w-full h-0.5 bg-rose-600 rotate-45 transform" />
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 font-bold text-slate-900 text-sm">
                        {fil.name}
                      </td>

                      <td className="py-4 px-6 font-mono text-slate-600">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-bold">
                          {fil.hex}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[11px] border border-indigo-100">
                          {fil.material || 'PLA+ Silk'}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleFilamentStock(fil.id)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            fil.inStock !== false
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                          }`}
                          title="Click to toggle stock status"
                        >
                          <span className={`w-2 h-2 rounded-full ${fil.inStock !== false ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <span>{fil.inStock !== false ? 'In Stock (Available)' : 'Out of Stock (Disabled)'}</span>
                        </button>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => toggleFilamentStock(fil.id)}
                            className="px-2.5 py-1 rounded-xl text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            {fil.inStock !== false ? 'Set Out of Stock' : 'Set In Stock'}
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete filament color "${fil.name}"?`)) {
                                deleteFilament(fil.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                            title="Delete filament colour"
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

      {/* TAB 2: PRODUCT MANAGEMENT & DISCOUNTS */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h3 className="text-base font-black text-slate-900">
                3D Product Catalog & Dynamic Customization ({products.length} Products)
              </h3>
              <p className="text-xs text-slate-500">
                Configure 3D STL mesh files, customize dual-color swatches, edit base print speeds, and apply promotional discounts.
              </p>
            </div>
            <button
              onClick={handleOpenCreateProduct}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New 3D Creation</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    
                    {p.discountPercent > 0 && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black uppercase">
                        -{p.discountPercent}% OFF
                      </span>
                    )}

                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-xs">
                      {p.printTime} print
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-indigo-600 uppercase tracking-wider">{p.categoryLabel || p.category}</span>
                      <span className="text-slate-400 font-mono">ID: {p.id}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 line-clamp-1 mt-0.5">{p.name}</h4>
                    
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="text-sm font-black text-slate-900 font-mono">
                        ${Number(p.price).toFixed(2)}
                      </span>
                      {p.originalPrice && p.originalPrice > p.price && (
                        <span className="text-xs text-slate-400 line-through font-mono">
                          ${Number(p.originalPrice).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Configured Color Palette */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-700">
                      <span>Color Options Available:</span>
                      <button
                        onClick={() => {
                          const firstSec = p.customizableSections?.[0];
                          if (firstSec) {
                            setColorModalSection({ productId: p.id, sectionId: firstSec.id });
                          }
                        }}
                        className="text-[10px] text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-0.5 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Color</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {(p.customizableSections?.[0]?.options || []).map((col, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px]"
                        >
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.hex }} />
                          <span>{col.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 3D CAD attachment note */}
                  {p.uploadedFileName && (
                    <div className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md font-mono flex items-center space-x-1">
                      <FileCode className="w-3 h-3" />
                      <span className="truncate">Attached Mesh: {p.uploadedFileName}</span>
                    </div>
                  )}
                </div>

                {/* Product Actions: Edit, Discount, Delete */}
                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleOpenEditProduct(p)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3 text-indigo-600" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        setDiscountModalProduct(p);
                        setQuickDiscountPercent(p.discountPercent || 15);
                      }}
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      <Percent className="w-3 h-3" />
                      <span>Discount</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete product "${p.name}"?`)) {
                        deleteProduct(p.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REGISTERED USERS LIST */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <h3 className="font-black text-base text-slate-900">
                  Registered Platform Users & Makers ({(registeredUsers || []).length})
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                View registered customers, their order history, membership level, and delivery contacts.
              </p>
            </div>

            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search user name or email..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">User</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Phone & Shipping Address</th>
                  <th className="py-2.5 px-3">Member Since</th>
                  <th className="py-2.5 px-3">Total Orders</th>
                  <th className="py-2.5 px-3">Total Spend</th>
                  <th className="py-2.5 px-3">Account Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2.5">
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                        <div>
                          <span className="font-bold text-slate-900 block">{user.name}</span>
                          <span className="text-[10px] text-slate-400">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        user.role === 'admin'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="py-3 px-3 max-w-xs">
                      <span className="text-slate-800 font-medium block">{user.phone}</span>
                      <span className="text-[10px] text-slate-400 truncate block">{user.address}</span>
                    </td>

                    <td className="py-3 px-3 text-slate-500 font-mono">
                      {user.memberSince || '2026'}
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      {user.totalOrders || user.ordersCount || 0}
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      ${Number(user.totalSpent || 0).toFixed(2)}
                    </td>

                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px] inline-flex items-center">
                        <Check className="w-2.5 h-2.5 mr-0.5" />
                        {user.status || 'Active'}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Remove user ${user.name}?`)) {
                              deleteUser(user.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete user account"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOM INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <h3 className="font-black text-base text-slate-900">
                Customer Inquiries & Sizing Requests ({(customInquiries || []).length})
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Submitted through the "Ask Details / Custom Request" modal on the Home page.
            </p>
          </div>

          {(customInquiries || []).length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No custom inquiries submitted yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customInquiries.map((inq) => (
                <div key={inq.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">{inq.name || inq.customerName}</span>
                      <span className="text-[11px] text-indigo-600 font-mono">{inq.email || inq.customerEmail}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                      {inq.productInterest || inq.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-2.5 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-slate-400 block font-semibold">Dimensions:</span>
                      <span className="font-mono text-slate-800">{inq.dimensions || 'Standard size'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Requested Colors:</span>
                      <span className="font-mono text-slate-800">{inq.preferredColors || inq.materialPreference || 'Default'}</span>
                    </div>
                  </div>

                  {(inq.specialNotes || inq.description) && (
                    <div>
                      <span className="text-slate-400 text-[10px] font-bold uppercase block">Special Notes:</span>
                      <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-100 mt-0.5">
                        {inq.specialNotes || inq.description}
                      </p>
                    </div>
                  )}

                  {inq.quoteAmount != null && (
                    <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900">
                      <div className="flex justify-between items-center font-bold text-xs">
                        <span>Quoted Price:</span>
                        <span className="font-mono text-sm">${Number(inq.quoteAmount).toFixed(2)}</span>
                      </div>
                      {inq.adminReply && (
                        <p className="text-[11px] text-emerald-800 mt-1 italic">
                          "{inq.adminReply}"
                        </p>
                      )}
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-400">Status:</span>
                      <select
                        value={inq.status || 'Pending Review'}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                        className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-800"
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="In Review">In Review</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => {
                          setReplyingInquiry(inq);
                          setInquiryQuoteAmount(inq.quoteAmount != null ? inq.quoteAmount : '');
                          setInquiryAdminReply(inq.adminReply || '');
                        }}
                        className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-[10px] font-bold cursor-pointer"
                      >
                        Quote / Reply
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this inquiry?')) {
                            deleteInquiry(inq.id);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: DASHBOARD & TELEMETRY WITH BAR CHART VISUALIZATION */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Sales Revenue</span>
              <div className="text-2xl font-black text-slate-900 font-mono">${totalRevenue.toFixed(2)}</div>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+24.5% vs previous week</span>
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Machines Running</span>
              <div className="text-2xl font-black text-slate-900 font-mono">{activePrintersCount} / {printers.length} Printers</div>
              <p className="text-[11px] text-indigo-600 font-bold flex items-center space-x-1">
                <Printer className="w-3.5 h-3.5" />
                <span>Bambu Lab A1 fleet operating smoothly</span>
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Queued Orders</span>
              <div className="text-2xl font-black text-slate-900 font-mono">{orders.length} Orders</div>
              <p className="text-[11px] text-amber-600 font-bold flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Avg print time per part: 52 mins</span>
              </p>
            </div>
          </div>

          {/* PRIMARY BAR CHART: 7-Day Production & Order Volume Graph */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  <BarChart3 className="w-4 h-4" />
                  <span>Interactive Production Analytics</span>
                </div>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  7-Day 3D Print Farm Performance & Demand Bar Chart
                </h3>
                <p className="text-xs text-slate-500">
                  Daily tracking of completed customer prints, machine extrusion hours, and revenue throughput.
                </p>
              </div>

              {/* Metric Switcher Controls */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl space-x-1 self-start sm:self-center">
                <button
                  onClick={() => setDashboardMetric('orders')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    dashboardMetric === 'orders'
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Order Volume
                </button>
                <button
                  onClick={() => setDashboardMetric('hours')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    dashboardMetric === 'hours'
                      ? 'bg-white text-amber-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Print Hours
                </button>
                <button
                  onClick={() => setDashboardMetric('revenue')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    dashboardMetric === 'revenue'
                      ? 'bg-white text-emerald-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Revenue ($)
                </button>
              </div>
            </div>

            {/* RECHARTS BAR CHART */}
            <div className="w-full h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { day: 'Mon', orders: 12, hours: 9.5, revenue: 198, nightShift: 4 },
                    { day: 'Tue', orders: 18, hours: 14.2, revenue: 312, nightShift: 6 },
                    { day: 'Wed', orders: 15, hours: 12.0, revenue: 254, nightShift: 5 },
                    { day: 'Thu', orders: 24, hours: 18.8, revenue: 440, nightShift: 8 },
                    { day: 'Fri', orders: 28, hours: 22.4, revenue: 520, nightShift: 10 },
                    { day: 'Sat', orders: 32, hours: 24.5, revenue: 615, nightShift: 12 },
                    { day: 'Sun', orders: 22, hours: 17.0, revenue: 390, nightShift: 7 }
                  ]}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="day"
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#CBD5E1' }}
                  />
                  <YAxis
                    stroke="#64748B"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => dashboardMetric === 'revenue' ? `$${val}` : `${val}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderRadius: '16px',
                      border: 'none',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                    }}
                    cursor={{ fill: '#F1F5F9', radius: 8 }}
                    formatter={(value) => [
                      dashboardMetric === 'revenue' ? `$${value}` : `${value} ${dashboardMetric === 'hours' ? 'hrs' : 'prints'}`,
                      dashboardMetric === 'orders' ? 'Customer Orders' : dashboardMetric === 'hours' ? 'Machine Print Time' : 'Sales Revenue'
                    ]}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '16px', fontSize: '11px', fontWeight: 'bold' }}
                  />
                  <Bar
                    dataKey={dashboardMetric}
                    name={
                      dashboardMetric === 'orders'
                        ? 'Customer Orders Printed'
                        : dashboardMetric === 'hours'
                        ? 'Extrusion Hours'
                        : 'Daily Revenue ($)'
                    }
                    radius={[8, 8, 0, 0]}
                  >
                    {[
                      { day: 'Mon' }, { day: 'Tue' }, { day: 'Wed' },
                      { day: 'Thu' }, { day: 'Fri' }, { day: 'Sat' }, { day: 'Sun' }
                    ].map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          dashboardMetric === 'orders'
                            ? index === 5 ? '#4F46E5' : '#6366F1'
                            : dashboardMetric === 'hours'
                            ? index === 5 ? '#D97706' : '#F59E0B'
                            : index === 5 ? '#059669' : '#10B981'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Fleet Utilization Sub-Chart */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <Activity className="w-3.5 h-3.5 text-orange-600" />
                  <span>3D Printer Fleet Utilization Breakdown</span>
                </h4>
                <span className="text-[11px] text-slate-500 font-mono">Bambu Lab A1 High-Speed Queue Priority</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {printers.map((p, idx) => (
                  <div key={p.id || idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span className="truncate">{p.name}</span>
                      <span className="font-mono text-[11px] text-indigo-600">{85 - idx * 8}% load</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          idx === 0 || idx === 1 ? 'bg-orange-500' : 'bg-indigo-600'
                        }`}
                        style={{ width: `${85 - idx * 8}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Bed: {p.bedTemp || '60°C'}</span>
                      <span className="font-semibold text-slate-700">{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PRODUCT MODAL (With Image Upload, 3D File Upload, and More Colours!) */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">
                  {editingProductId ? 'Edit 3D Product & Specifications' : 'Publish New 3D Creation'}
                </h3>
                <p className="text-slate-400">Configure machine print time, images, 3D STL files, and color swatches</p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 font-bold p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dual-Color Cyber Keychain"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      let label = '3D Keychains';
                      if (cat === 'cake-toppers') label = 'Cake Toppers';
                      if (cat === 'name-boards') label = 'Name Boards';
                      if (cat === '3d-gift') label = '3D Gifts';
                      setProductForm({ ...productForm, category: cat, categoryLabel: label });
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="3d-keychain">3D Keychains</option>
                    <option value="cake-toppers">Cake Toppers</option>
                    <option value="name-boards">Name Boards</option>
                    <option value="3d-gift">3D Gifts</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Base Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Print Time Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 45m"
                    value={productForm.printTime}
                    onChange={(e) => setProductForm({ ...productForm, printTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Duration (Minutes)</label>
                  <input
                    type="number"
                    required
                    value={productForm.printTimeMinutes}
                    onChange={(e) => setProductForm({ ...productForm, printTimeMinutes: parseInt(e.target.value) || 30 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              {/* MULTIPLE PRODUCT IMAGES UPLOAD & GALLERY (Explicit user requirement!) */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 flex items-center space-x-1.5 text-xs">
                    <Upload className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Product Images Gallery (Upload Multiple Images to Cloud Storage)</span>
                  </label>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                    {(productForm.images || []).length} Uploaded
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Choose Multiple Photos:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={isUploadingProductImage}
                      onChange={handleMultipleImagesUpload}
                      className="text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer disabled:opacity-50"
                    />
                    {isUploadingProductImage && (
                      <span className="text-[10px] text-indigo-600 font-bold mt-1 block animate-pulse">
                        Uploading multiple images to storage...
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Or Add Image by URL:
                    </label>
                    <div className="flex space-x-1.5">
                      <input
                        type="url"
                        value={productForm.image}
                        onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                        className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                        placeholder="https://images.unsplash..."
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (productForm.image) {
                            setProductForm(prev => ({
                              ...prev,
                              images: Array.from(new Set([...(prev.images || []), prev.image]))
                            }));
                            addToast('Added URL image to gallery!', 'info');
                          }
                        }}
                        className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[11px] rounded-xl cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Uploaded Gallery Thumbnails Grid */}
                {(productForm.images || []).length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-200">
                    <span className="text-[11px] font-bold text-slate-600 block">
                      Uploaded Photo Gallery (Hover to Set Cover or Remove):
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {(productForm.images || []).map((imgUrl, idx) => {
                        const isCover = productForm.image === imgUrl;
                        return (
                          <div
                            key={idx}
                            className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all group ${
                              isCover ? 'border-indigo-600 ring-2 ring-indigo-200 shadow-md' : 'border-slate-200'
                            }`}
                          >
                            <img src={imgUrl} alt={`Product Angle ${idx + 1}`} className="w-full h-full object-cover" />
                            
                            {/* Cover Badge */}
                            {isCover && (
                              <span className="absolute top-1 left-1 px-1.5 py-0.2 bg-indigo-600 text-white rounded text-[8px] font-black uppercase shadow-xs">
                                Cover
                              </span>
                            )}

                            {/* Actions Overlay */}
                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                              {!isCover && (
                                <button
                                  type="button"
                                  onClick={() => handleSetCoverImage(imgUrl)}
                                  className="px-1.5 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[9px] font-bold w-full text-center cursor-pointer"
                                >
                                  Make Cover
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveProductImage(idx)}
                                className="px-1.5 py-0.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-[9px] font-bold w-full text-center cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

            {/* COLOR CONFIGURATION: Single Color vs Multiple Color Headings */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="font-bold text-slate-800 text-xs flex items-center space-x-1.5">
                    <Palette className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Product Color Headings & Option Mode</span>
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Specify whether customers choose a single color or multiple parts (e.g. Top Color, Bottom Color).
                  </p>
                </div>

                {/* Mode Selector */}
                <div className="flex items-center bg-slate-200 p-0.5 rounded-xl text-xs font-bold shrink-0">
                  <button
                    type="button"
                    onClick={() => setProductForm(prev => ({ ...prev, colorMode: 'single' }))}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      productForm.colorMode === 'single'
                        ? 'bg-white text-indigo-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Single Color
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductForm(prev => ({ ...prev, colorMode: 'multiple' }))}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      productForm.colorMode === 'multiple'
                        ? 'bg-white text-indigo-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Multiple Colors
                  </button>
                </div>
              </div>

              {productForm.colorMode === 'single' ? (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">Single Color Heading Label:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Primary Color, Filament Color, Body Color"
                    value={productForm.singleHeading}
                    onChange={(e) => setProductForm(prev => ({ ...prev, singleHeading: e.target.value }))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                  <p className="text-[10px] text-slate-400">
                    Customers will choose 1 color from the available in-stock filaments.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <label className="text-[11px] font-bold text-slate-700 block">
                    Custom Color Headings (Top Color, Bottom Color, etc.):
                  </label>
                  {productForm.colorHeadings.map((heading, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono text-slate-400 font-bold w-6">{idx + 1}.</span>
                      <input
                        type="text"
                        required
                        placeholder={idx === 0 ? "e.g. Top Color" : "e.g. Bottom Color"}
                        value={heading}
                        onChange={(e) => {
                          const newHeadings = [...productForm.colorHeadings];
                          newHeadings[idx] = e.target.value;
                          setProductForm(prev => ({ ...prev, colorHeadings: newHeadings }));
                        }}
                        className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                      {productForm.colorHeadings.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setProductForm(prev => ({
                              ...prev,
                              colorHeadings: prev.colorHeadings.filter((_, i) => i !== idx)
                            }));
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove heading"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setProductForm(prev => ({
                        ...prev,
                        colorHeadings: [...prev.colorHeadings, `Color Section ${prev.colorHeadings.length + 1}`]
                      }));
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-bold text-xs flex items-center space-x-1 pt-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Another Color Heading</span>
                  </button>
                </div>
              )}
            </div>

              {/* 3D FILE UPLOAD OPTION (.stl, .obj, .3mf) (Explicit user requirement!) */}
              <div className="p-3.5 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-2">
                <label className="font-bold text-indigo-950 flex items-center space-x-1.5">
                  <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                  <span>3D CAD Model Upload (.STL, .OBJ, .3MF)</span>
                </label>
                <p className="text-[11px] text-slate-500">
                  Attach custom 3D printable geometry for Bambu Lab A1 slicing.
                </p>

                <input
                  type="file"
                  accept=".stl,.obj,.3mf,.step"
                  onChange={handle3DModelFileUpload}
                  className="text-xs text-slate-600 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer"
                />

                {productForm.uploadedFileName && (
                  <div className="text-[11px] font-mono text-emerald-700 font-bold flex items-center space-x-1 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Attached: {productForm.uploadedFileName}</span>
                  </div>
                )}
              </div>

              {/* CUSTOMER USER IMAGE REQUIREMENT SETTINGS (Explicit User Request) */}
              <div className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-amber-950 flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.requiresUserImage}
                      onChange={(e) => setProductForm({ ...productForm, requiresUserImage: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                    />
                    <span className="text-xs">Require Customer Photo Upload (For Lithophanes, Photo Keychains, Portraits)</span>
                  </label>
                </div>

                {productForm.requiresUserImage && (
                  <div className="space-y-2.5 pt-1 pl-6 border-l-2 border-amber-300">
                    <p className="text-[11px] text-amber-800 leading-snug">
                      When enabled, customer cannot add to cart without uploading their required reference photograph(s).
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Minimum Images Required:</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={productForm.minImages}
                          onChange={(e) => setProductForm({ ...productForm, minImages: parseInt(e.target.value) || 1 })}
                          className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-xl font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Maximum Images Allowed:</label>
                        <input
                          type="number"
                          min={productForm.minImages}
                          max="10"
                          value={productForm.maxImages}
                          onChange={(e) => setProductForm({ ...productForm, maxImages: parseInt(e.target.value) || 3 })}
                          className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-xl font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Upload Guidance Instructions for Customer:</label>
                      <input
                        type="text"
                        value={productForm.imageInstructions}
                        onChange={(e) => setProductForm({ ...productForm, imageInstructions: e.target.value })}
                        placeholder="e.g. Upload clear face portrait with high contrast"
                        className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Product Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl resize-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  {editingProductId ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* QUICK DISCOUNT MODAL */}
      {discountModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center space-x-2">
                <Percent className="w-4 h-4 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-sm">Add Promo Discount</h3>
              </div>
              <button onClick={() => setDiscountModalProduct(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <p className="text-slate-600">
                Apply promotional discount to <span className="font-bold text-slate-900">"{discountModalProduct.name}"</span>
              </p>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Current Price: ${(discountModalProduct.originalPrice || discountModalProduct.price).toFixed(2)}
              </p>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 block">Select Discount Percentage:</label>
              <div className="grid grid-cols-4 gap-2">
                {[0, 10, 15, 20, 25, 30, 40, 50].map(pct => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setQuickDiscountPercent(pct)}
                    className={`py-1.5 rounded-lg font-bold text-center border transition-all ${
                      quickDiscountPercent === pct
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {pct === 0 ? 'None' : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-slate-500 text-[11px] block">New Discounted Price:</span>
              <span className="text-lg font-black font-mono text-slate-900">
                ${(
                  (discountModalProduct.originalPrice || discountModalProduct.price) *
                  (1 - quickDiscountPercent / 100)
                ).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setDiscountModalProduct(null)}
                className="px-3.5 py-1.5 bg-slate-100 text-slate-700 rounded-xl font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyDiscount}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
              >
                Apply Discount
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MORE COLOURS MODAL */}
      {colorModalSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">Add New Color Swatch</h3>
              </div>
              <button onClick={() => setColorModalSection(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddColorSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Color Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Neon Emerald"
                  value={newColorForm.name}
                  onChange={(e) => setNewColorForm({ ...newColorForm, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Hex Color Code</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={newColorForm.hex}
                    onChange={(e) => setNewColorForm({ ...newColorForm, hex: e.target.value })}
                    className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    required
                    value={newColorForm.hex}
                    onChange={(e) => setNewColorForm({ ...newColorForm, hex: e.target.value })}
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs uppercase"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setColorModalSection(null)}
                  className="px-3.5 py-1.5 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Add Color Swatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUOTE / REPLY CUSTOM INQUIRY MODAL */}
      {replyingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Quote & Reply to Inquiry</h3>
                  <span className="text-[10px] text-slate-500 font-mono">{replyingInquiry.id} • {replyingInquiry.name || replyingInquiry.customerName}</span>
                </div>
              </div>
              <button
                onClick={() => setReplyingInquiry(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                replyToInquiry(replyingInquiry.id, {
                  quoteAmount: inquiryQuoteAmount ? Number(inquiryQuoteAmount) : null,
                  adminReply: inquiryAdminReply,
                });
                setReplyingInquiry(null);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Estimated Quote Price ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="29.99"
                    value={inquiryQuoteAmount}
                    onChange={(e) => setInquiryQuoteAmount(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Design Engineer Notes / Response
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. Reviewed CAD dimensions; recommended 0.16mm layer height in PLA+ Silk Gold with 4-hour print estimate."
                  value={inquiryAdminReply}
                  onChange={(e) => setInquiryAdminReply(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setReplyingInquiry(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  Dispatch Quote & Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD FILAMENT MODAL */}
      {isAddingFilament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 text-xs animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-amber-600" />
                <h3 className="font-black text-slate-900 text-sm">Add New Filament Colour</h3>
              </div>
              <button onClick={() => setIsAddingFilament(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addFilament(newFilamentForm);
                setIsAddingFilament(false);
                setNewFilamentForm({
                  name: '',
                  hex: '#10B981',
                  material: 'PLA+ Silk',
                  inStock: true
                });
              }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Colour Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emerald Sparkle, Midnight Pearl"
                  value={newFilamentForm.name}
                  onChange={(e) => setNewFilamentForm({ ...newFilamentForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Colour Picker</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={newFilamentForm.hex}
                      onChange={(e) => setNewFilamentForm({ ...newFilamentForm, hex: e.target.value })}
                      className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      required
                      value={newFilamentForm.hex}
                      onChange={(e) => setNewFilamentForm({ ...newFilamentForm, hex: e.target.value })}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Live Preview</label>
                  <div className="flex items-center space-x-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="w-7 h-7 rounded-full border border-slate-300 shadow-xs" style={{ backgroundColor: newFilamentForm.hex }} />
                    <span className="text-[11px] font-bold text-slate-700 truncate">{newFilamentForm.name || 'New Swatch'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Material Formulation</label>
                <select
                  value={newFilamentForm.material}
                  onChange={(e) => setNewFilamentForm({ ...newFilamentForm, material: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="PLA+ Silk">PLA+ Silk (High Sheen & Shine)</option>
                  <option value="PLA+ Matte">PLA+ Matte (Low Gloss PolyTerra)</option>
                  <option value="PLA+ Standard">PLA+ Standard (Bambu Tough)</option>
                  <option value="PETG High-Gloss">PETG High-Gloss (Chemical Resistant)</option>
                  <option value="PETG Carbon">PETG Carbon (Carbon Fiber Reinforced)</option>
                  <option value="ABS Tough">ABS Tough (Industrial Strength)</option>
                  <option value="TPU Flexible">TPU Flexible (95A Elastic)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold text-slate-900 block text-xs">Inventory Status</span>
                  <span className="text-[10px] text-slate-500">Enable to make this color available in the customer shop</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newFilamentForm.inStock}
                    onChange={(e) => setNewFilamentForm({ ...newFilamentForm, inStock: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingFilament(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-md shadow-amber-600/20 transition-all cursor-pointer"
                >
                  Save Filament Colour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
