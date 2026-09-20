import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';

// Common UI Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CartDrawer from './components/common/CartDrawer';
import LoginModal from './components/common/LoginModal';
import QuickViewModal from './components/common/QuickViewModal';
import FlyingCartItem from './components/common/FlyingCartItem';
import ToastContainer from './components/common/ToastContainer';

// Pages
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import CustomPrintPage from './pages/CustomPrintPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import AdminPage from './pages/AdminPage';

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Global Main Layout
function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white antialiased">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <LoginModal />
      <QuickViewModal />
      <FlyingCartItem />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/product" element={<Navigate to="/" replace />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/search" element={<CategoryPage />} />
            <Route path="/custom-print" element={<CustomPrintPage />} />
            <Route path="/track-order" element={<OrderTrackingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/admin" element={<AdminPage />} />
            
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  );
}
