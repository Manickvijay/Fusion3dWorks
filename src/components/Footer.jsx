import {
  Briefcase,
  HelpCircle,
  Gift,
  Star
} from 'lucide-react';

export default function Footer({ onOpenCustomQuote }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#172337] text-white text-[11px] border-t border-gray-700 mt-12">
      {/* Back to Top */}
      <button
        type="button"
        onClick={scrollToTop}
        className="w-full py-2.5 bg-[#232f3e] hover:bg-[#2c3a4d] text-gray-300 text-center font-bold text-xs transition-colors border-b border-gray-800 tracking-wider"
      >
        BACK TO TOP ↑
      </button>

      {/* Main Flipkart 6-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-800">
          {/* Col 1: ABOUT */}
          <div className="space-y-2">
            <span className="text-gray-400 uppercase font-bold text-[10px] tracking-wider block">
              ABOUT
            </span>
            <ul className="space-y-1.5 text-gray-300">
              <li><a href="#about" className="hover:underline">Contact Us</a></li>
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#about" className="hover:underline">Careers</a></li>
              <li><a href="#about" className="hover:underline">Flipkart Stories</a></li>
              <li><a href="#about" className="hover:underline">Press</a></li>
              <li><a href="#about" className="hover:underline">Corporate Information</a></li>
            </ul>
          </div>

          {/* Col 2: GROUP COMPANIES */}
          <div className="space-y-2 md:pl-4">
            <span className="text-gray-400 uppercase font-bold text-[10px] tracking-wider block">
              GROUP COMPANIES
            </span>
            <ul className="space-y-1.5 text-gray-300">
              <li><a href="#group" className="hover:underline">Myntra</a></li>
              <li><a href="#group" className="hover:underline">Cleartrip</a></li>
              <li><a href="#group" className="hover:underline">Shopsy</a></li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCustomQuote}
                  className="hover:underline text-yellow-400 text-left font-semibold"
                >
                  Fusion3D Print Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: HELP */}
          <div className="space-y-2 md:pl-4">
            <span className="text-gray-400 uppercase font-bold text-[10px] tracking-wider block">
              HELP
            </span>
            <ul className="space-y-1.5 text-gray-300">
              <li><a href="#help" className="hover:underline">Payments</a></li>
              <li><a href="#help" className="hover:underline">Shipping</a></li>
              <li><a href="#help" className="hover:underline">Cancellation &amp; Returns</a></li>
              <li><a href="#help" className="hover:underline">FAQ</a></li>
              <li><a href="#help" className="hover:underline">Report Infringement</a></li>
            </ul>
          </div>

          {/* Col 4: CONSUMER POLICY */}
          <div className="space-y-2 md:pl-4">
            <span className="text-gray-400 uppercase font-bold text-[10px] tracking-wider block">
              CONSUMER POLICY
            </span>
            <ul className="space-y-1.5 text-gray-300">
              <li><a href="#policy" className="hover:underline">Cancellation &amp; Returns</a></li>
              <li><a href="#policy" className="hover:underline">Terms Of Use</a></li>
              <li><a href="#policy" className="hover:underline">Security</a></li>
              <li><a href="#policy" className="hover:underline">Privacy</a></li>
              <li><a href="#policy" className="hover:underline">Sitemap</a></li>
              <li><a href="#policy" className="hover:underline">Grievance Redressal</a></li>
            </ul>
          </div>

          {/* Col 5: Mail Us */}
          <div className="space-y-2 md:pl-4">
            <span className="text-gray-400 uppercase font-bold text-[10px] tracking-wider block">
              Mail Us:
            </span>
            <p className="text-gray-300 leading-relaxed text-[10px]">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &amp; Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </p>
          </div>

          {/* Col 6: Registered Office */}
          <div className="space-y-2 md:pl-4">
            <span className="text-gray-400 uppercase font-bold text-[10px] tracking-wider block">
              Registered Office Address:
            </span>
            <p className="text-gray-300 leading-relaxed text-[10px]">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &amp; Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103, Karnataka, India<br />
              CIN : U51109KA2012PTC066107<br />
              Telephone: 044-45614700
            </p>
          </div>
        </div>

        {/* Bottom Horizontal Flipkart Bar */}
        <div className="border-t border-gray-700/70 mt-8 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5 text-yellow-400 font-semibold cursor-pointer hover:underline">
              <Briefcase className="w-4 h-4 text-yellow-400" />
              <span>Become a Seller</span>
            </span>
            <span className="flex items-center gap-1.5 text-yellow-400 font-semibold cursor-pointer hover:underline">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Advertise</span>
            </span>
            <span className="flex items-center gap-1.5 text-yellow-400 font-semibold cursor-pointer hover:underline">
              <Gift className="w-4 h-4 text-yellow-400" />
              <span>Gift Cards</span>
            </span>
            <span className="flex items-center gap-1.5 text-yellow-400 font-semibold cursor-pointer hover:underline">
              <HelpCircle className="w-4 h-4 text-yellow-400" />
              <span>Help Center</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-[11px]">
            <span>© 2007-2026 Flipkart.com</span>
            <div className="flex items-center gap-2 text-gray-300 font-mono text-[10px]">
              <span className="px-1.5 py-0.5 bg-gray-800 rounded">VISA</span>
              <span className="px-1.5 py-0.5 bg-gray-800 rounded">Mastercard</span>
              <span className="px-1.5 py-0.5 bg-gray-800 rounded">RuPay</span>
              <span className="px-1.5 py-0.5 bg-gray-800 rounded">UPI</span>
              <span className="px-1.5 py-0.5 bg-gray-800 rounded">NetBanking</span>
              <span className="px-1.5 py-0.5 bg-gray-800 rounded">COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
