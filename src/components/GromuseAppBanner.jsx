export default function GromuseAppBanner() {
  return (
    <div className="my-8 rounded-3xl bg-gradient-to-r from-[#4a154b] via-[#581c87] to-[#3b0764] text-white p-6 sm:p-10 relative overflow-hidden shadow-sm">
      {/* Background soft circles */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left Text & App Badges */}
        <div className="max-w-xl space-y-4 text-center md:text-left">
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Stay Home and Get All <br className="hidden sm:inline" />
            Your Essentials From <br className="hidden sm:inline" />
            Our Market!
          </h2>

          <p className="text-xs sm:text-sm text-purple-200 font-medium">
            Download the app from app store or google play
          </p>

          {/* App Store Buttons matching frame 00:21 */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            {/* Google Play */}
            <a
              href="#playstore"
              onClick={(e) => e.preventDefault()}
              className="bg-black/90 hover:bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 border border-white/20 shadow-md transition-transform active:scale-95"
            >
              <div className="text-base">▶️</div>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-gray-400 font-medium">GET IT ON</div>
                <div className="text-xs font-bold leading-none">Google Play</div>
              </div>
            </a>

            {/* Apple App Store */}
            <a
              href="#appstore"
              onClick={(e) => e.preventDefault()}
              className="bg-black/90 hover:bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 border border-white/20 shadow-md transition-transform active:scale-95"
            >
              <div className="text-base">🍏</div>
              <div className="text-left">
                <div className="text-[9px] text-gray-400 font-medium">Download on the</div>
                <div className="text-xs font-bold leading-none">App Store</div>
              </div>
            </a>
          </div>
        </div>

        {/* Right Courier Rider Graphic */}
        <div className="flex-shrink-0 relative">
          <div className="w-56 sm:w-72 h-48 sm:h-56 bg-purple-900/40 rounded-3xl p-4 flex flex-col items-center justify-center border border-purple-500/30 shadow-xl backdrop-blur-xs">
            {/* Delivery person avatar representation */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-amber-400 flex items-center justify-center text-4xl shadow-md border-2 border-white">
                🧑‍🌾
              </div>
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full text-xs shadow-xs">
                ⚡
              </span>
            </div>

            {/* Grocery Crate */}
            <div className="mt-3 bg-amber-800/80 px-4 py-2 rounded-xl border border-amber-500/40 text-center">
              <span className="text-2xl">🥦 🍎 🥕 🍇</span>
              <div className="text-[10px] font-bold text-amber-200 mt-1">
                Fresh Harvest Crate • In-Transit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
