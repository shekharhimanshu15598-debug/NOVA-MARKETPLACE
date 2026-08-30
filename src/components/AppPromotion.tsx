import React, { useState } from 'react';
import { Smartphone, Download, QrCode, CheckCircle2, ArrowRight, Bell, Sparkles } from 'lucide-react';

interface AppPromotionProps {
  onShowToast: (msg: string) => void;
}

export const AppPromotion: React.FC<AppPromotionProps> = ({ onShowToast }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast('Please enter a valid email address');
      return;
    }
    setIsSubscribed(true);
    onShowToast('Subscribed! You will receive weekly curated drops.');
  };

  return (
    <section id="app-promotion-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200/60">
      
      {/* Container */}
      <div className="bg-zinc-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-modal border border-zinc-800">
        
        {/* Subtle Green Ambient Glow */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Column: App info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider border border-white/15">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              NOVA on iOS & Android
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-manrope leading-tight">
              Trade, rent, and chat <br />
              <span className="font-editorial italic font-normal text-emerald-300">wherever you are.</span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base font-dmsans max-w-lg leading-relaxed">
              Get instant push notifications when buyers make offers on your listings, track real-time delivery of rented vehicles, and inspect items in augmented reality.
            </p>

            {/* App Store & Google Play Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onShowToast('NOVA iOS app download starting...')}
                className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-bold text-xs sm:text-sm hover:bg-zinc-100 transition-all flex items-center gap-2.5 shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-zinc-950" />
                <div className="text-left leading-none">
                  <span className="text-[9px] uppercase font-bold text-zinc-500 block">Download on</span>
                  <span className="font-extrabold text-xs">App Store</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onShowToast('NOVA Android APK download starting...')}
                className="px-5 py-2.5 rounded-xl bg-zinc-800 text-white border border-zinc-700 font-bold text-xs sm:text-sm hover:bg-zinc-700 transition-all flex items-center gap-2.5 shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <div className="text-left leading-none">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 block">Get it on</span>
                  <span className="font-extrabold text-xs">Google Play</span>
                </div>
              </button>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-6 border-t border-zinc-800/80">
              <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                Join 45,000+ members getting weekly curated drops:
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-4 py-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You're in! Check your inbox for exclusive early access listings.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Right Column: Smartphone UI Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-64 sm:w-72 bg-zinc-900 border-4 border-zinc-800 rounded-[38px] p-3 shadow-modal shadow-black/80 relative">
              {/* Camera Notch */}
              <div className="w-24 h-4 bg-zinc-950 rounded-full mx-auto mb-2" />

              {/* Inner Screen */}
              <div className="bg-[#FAF9F6] text-zinc-900 rounded-[28px] p-3 space-y-3 overflow-hidden text-left">
                
                {/* Mock Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-md bg-zinc-950 text-white flex items-center justify-center font-bold text-xs">
                      N
                    </div>
                    <span className="font-extrabold text-xs tracking-tight">NOVA</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                    Patna, BR
                  </span>
                </div>

                {/* Mock Search */}
                <div className="bg-zinc-100 rounded-xl p-2 text-[10px] text-zinc-400 font-medium">
                  Search 12,000+ listings...
                </div>

                {/* Mock Card Preview */}
                <div className="bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80"
                    alt="Porsche 911 Mock"
                    className="w-full h-24 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-2">
                    <div className="text-[10px] font-bold text-zinc-900 truncate">2023 Porsche 911 Carrera S</div>
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="text-xs font-extrabold text-zinc-950">₹1.85 Cr</span>
                      <span className="text-[10px] font-bold text-emerald-800">₹38,000/day</span>
                    </div>
                  </div>
                </div>

                {/* Mock Live Offer Notification */}
                <div className="bg-zinc-950 text-white rounded-xl p-2 flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <div className="text-[9px] leading-tight">
                    <span className="font-bold block text-white">New Offer Received</span>
                    <span className="text-zinc-400">Vikram offered ₹58,000 for DeWalt Kit</span>
                  </div>
                </div>

              </div>

              {/* Home Indicator bar */}
              <div className="w-28 h-1 bg-zinc-700 rounded-full mx-auto mt-3" />
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
