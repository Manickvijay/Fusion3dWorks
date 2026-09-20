import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Printer,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  Send,
  CreditCard,
  Lock,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function Footer() {
  const { addToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setSubscribed(true);
      addToast('Thank you! Welcome coupon code WELCOME10 has been sent to your email.', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 text-xs">
      {/* Service Highlights Bar */}
      <div className="border-b border-slate-900 bg-slate-900/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 text-sm">Free Express Shipping</h4>
                <p className="mt-0.5 text-slate-400">Complimentary priority courier on all orders over $49.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 text-sm">2-Year Official Warranty</h4>
                <p className="mt-0.5 text-slate-400">Comprehensive hardware protection & lifetime tech guidance.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 text-sm">30-Day Hassle-Free Returns</h4>
                <p className="mt-0.5 text-slate-400">Easy returns and exchanges for unopened hardware & filaments.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 text-sm">Expert Maker Support</h4>
                <p className="mt-0.5 text-slate-400">Talk to certified 3D printing engineers 7 days a week.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-orange-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white">
                  <Printer className="w-5 h-5 text-orange-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-white tracking-tight">
                  Fusion<span className="text-indigo-500">3D</span> WORKS
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Print Your Imagination</span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Fusion3D Works is an enterprise-grade additive manufacturing e-commerce platform supplying precision CoreXY 3D printers, laser-calibrated filaments, 8K UV photopolymer resins, and industrial spare parts.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <p className="font-semibold text-slate-200 mb-2">Subscribe for 10% Off & 3D STL Drops</p>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-medium text-xs">Coupon code WELCOME10 dispatched to your inbox!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex rounded-xl overflow-hidden border border-slate-800 focus-within:border-indigo-500 max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your maker email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="flex-1 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 outline-hidden text-xs"
                  />
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 font-semibold transition-colors flex items-center">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h5 className="font-bold text-slate-200 uppercase tracking-wider mb-3">3D Catalog</h5>
            <ul className="space-y-2">
              <li><Link to="/category/3d-printers" className="hover:text-white transition-colors">CoreXY & Resin 3D Printers</Link></li>
              <li><Link to="/category/filaments" className="hover:text-white transition-colors">PLA+, PETG-CF & Nylon</Link></li>
              <li><Link to="/category/resins" className="hover:text-white transition-colors">8K & 12K Photopolymer Resins</Link></li>
              <li><Link to="/category/spare-parts" className="hover:text-white transition-colors">Hardened Steel Nozzles</Link></li>
              <li><Link to="/category/accessories" className="hover:text-white transition-colors">Textured PEI Build Plates</Link></li>
              <li><Link to="/category/tools" className="hover:text-white transition-colors">Digital Calipers & Deburrers</Link></li>
              <li><Link to="/custom-quote" className="hover:text-orange-400 font-medium text-orange-500 transition-colors">Custom 3D Printing Service</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="font-bold text-slate-200 uppercase tracking-wider mb-3">Customer Support</h5>
            <ul className="space-y-2">
              <li><Link to="/track-order" className="hover:text-white transition-colors">Live Order Tracking</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">My Customer Account</Link></li>
              <li><Link to="/offers" className="hover:text-white transition-colors">Active Coupon Codes</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Side-by-Side Product Comparison</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Help Center & Filament Guide</Link></li>
              <li><Link to="/policies?tab=shipping" className="hover:text-white transition-colors">Shipping & Delivery Policies</Link></li>
              <li><Link to="/policies?tab=returns" className="hover:text-white transition-colors">Warranty & Return Protocol</Link></li>
            </ul>
          </div>

          {/* Company & Enterprise */}
          <div>
            <h5 className="font-bold text-slate-200 uppercase tracking-wider mb-3">Enterprise & Labs</h5>
            <ul className="space-y-2">
              <li><Link to="/support?tab=enterprise" className="hover:text-white transition-colors">Education & University Grants</Link></li>
              <li><Link to="/support?tab=print-farm" className="hover:text-white transition-colors">Print Farm Fleet Management</Link></li>
              <li><Link to="/support?tab=oem" className="hover:text-white transition-colors">OEM Custom Spool Co-Branding</Link></li>
              <li><Link to="/policies?tab=terms" className="hover:text-white transition-colors">Terms of Additive Service</Link></li>
              <li><Link to="/policies?tab=privacy" className="hover:text-white transition-colors">Privacy & CAD Security Policy</Link></li>
              <li className="pt-2">
                <Link to="/admin/dashboard" className="inline-flex items-center text-xs font-bold text-orange-400 hover:text-orange-300">
                  <Lock className="w-3 h-3 mr-1" /> Admin Management Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500">
            &copy; {new Date().getFullYear()} Fusion3D Works Inc. All rights reserved. Precision engineered for makers worldwide.
          </p>

          <div className="flex items-center space-x-3 text-slate-400">
            <span className="text-[11px] font-medium text-slate-500 mr-2">Protected by 256-Bit SSL</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-[10px] text-slate-300">VISA</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-[10px] text-slate-300">MASTERCARD</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-[10px] text-slate-300">AMEX</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-[10px] text-slate-300">STRIPE</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-[10px] text-slate-300">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
