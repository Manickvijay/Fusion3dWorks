import { ShoppingCart } from 'lucide-react';

export default function GromuseFooter({ onSelectCategory }) {
  return (
    <footer className="bg-[#f7f9f6] border-t border-gray-200 text-gray-700 text-xs mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 pb-10 border-b border-gray-200">
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#22c55e] flex items-center justify-center text-white">
                <ShoppingCart className="w-4 h-4 fill-white" />
              </div>
              <span className="text-2xl font-black text-[#0d4243] tracking-tight">
                Gromuse
              </span>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Fresh organic groceries delivered in 15 minutes.
            </p>

            <div className="space-y-1.5 pt-2">
              <span className="font-bold text-gray-900 text-[11px] block uppercase tracking-wider">
                Accepted Payments
              </span>
              <div className="flex items-center gap-2 text-xl filter drop-shadow-xs">
                <span className="px-2 py-1 bg-white rounded border border-gray-200 text-xs font-black text-blue-800">VISA</span>
                <span className="px-2 py-1 bg-white rounded border border-gray-200 text-xs font-black text-red-600">MC</span>
                <span className="px-2 py-1 bg-white rounded border border-gray-200 text-xs font-black text-orange-500">DISCOVER</span>
                <span className="px-2 py-1 bg-white rounded border border-gray-200 text-xs font-black text-pink-600">Klarna.</span>
                <span className="px-2 py-1 bg-white rounded border border-gray-200 text-xs font-black text-blue-600">PayPal</span>
              </div>
            </div>
          </div>

          {/* Department */}
          <div>
            <h4 className="font-black text-gray-900 mb-3 text-xs tracking-wider uppercase">
              Department
            </h4>
            <ul className="space-y-2 text-gray-500 text-xs">
              <li><button type="button" onClick={() => onSelectCategory?.('all')} className="hover:text-emerald-700">Fashion</button></li>
              <li><button type="button" onClick={() => onSelectCategory?.('all')} className="hover:text-emerald-700">Education Product</button></li>
              <li><button type="button" onClick={() => onSelectCategory?.('frozen')} className="hover:text-emerald-700">Frozen Food</button></li>
              <li><button type="button" onClick={() => onSelectCategory?.('drinks')} className="hover:text-emerald-700">Beverages</button></li>
              <li><button type="button" onClick={() => onSelectCategory?.('vegetables')} className="hover:text-emerald-700">Organic Grocery</button></li>
              <li><button type="button" onClick={() => onSelectCategory?.('all')} className="hover:text-emerald-700">Office Supplies</button></li>
              <li><button type="button" onClick={() => onSelectCategory?.('all')} className="hover:text-emerald-700">Beauty Products</button></li>
            </ul>
          </div>

          {/* About us */}
          <div>
            <h4 className="font-black text-gray-900 mb-3 text-xs tracking-wider uppercase">
              About us
            </h4>
            <ul className="space-y-2 text-gray-500 text-xs">
              <li><a href="#about" className="hover:text-emerald-700">About shopcart</a></li>
              <li><a href="#careers" className="hover:text-emerald-700">Careers</a></li>
              <li><a href="#news" className="hover:text-emerald-700">News &amp; Blog</a></li>
              <li><a href="#help" className="hover:text-emerald-700">Help</a></li>
              <li><a href="#press" className="hover:text-emerald-700">Press Center</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-black text-gray-900 mb-3 text-xs tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-2 text-gray-500 text-xs">
              <li><a href="#gift" className="hover:text-emerald-700">Gift Card</a></li>
              <li><a href="#mobile" className="hover:text-emerald-700">Mobile App</a></li>
              <li><a href="#shipping" className="hover:text-emerald-700">Shipping &amp; Delivery</a></li>
              <li><a href="#pickup" className="hover:text-emerald-700">Order Pickup</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-black text-gray-900 mb-3 text-xs tracking-wider uppercase">
              Help
            </h4>
            <ul className="space-y-2 text-gray-500 text-xs">
              <li><a href="#help" className="hover:text-emerald-700">Shopcart Help</a></li>
              <li><a href="#returns" className="hover:text-emerald-700">Returns</a></li>
              <li><a href="#track" className="hover:text-emerald-700">Track orders</a></li>
              <li><a href="#contact" className="hover:text-emerald-700">Contact us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar matching video frame 00:27 */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium">
            <a href="#seller" className="hover:text-gray-900 flex items-center gap-1">
              <span>💼</span> Become Seller
            </a>
            <a href="#gifts" className="hover:text-gray-900 flex items-center gap-1">
              <span>🎁</span> Gift Cards
            </a>
            <a href="#help" className="hover:text-gray-900 flex items-center gap-1">
              <span>❓</span> Help Center
            </a>
            <a href="#terms" className="hover:text-gray-900">Terms of Use</a>
            <a href="#privacy" className="hover:text-gray-900">Privacy Policy</a>
          </div>

          <div className="text-gray-400">
            All right reserved by Mueenmd | 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
