import React from 'react';
import { ShieldCheck, Heart, ArrowUp, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface FooterProps {
  onNavigateCategory: (slug: string) => void;
  onOpenHowItWorks: () => void;
  onOpenPostListing: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateCategory,
  onOpenHowItWorks,
  onOpenPostListing,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="nova-footer" className="bg-[#1A1A1A] text-gray-400 font-sans pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Brand & Quick Action */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-gray-800 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#BF5B30] text-white flex items-center justify-center font-bold text-xl shadow-sm">
              <span className="font-serif text-2xl font-bold">N</span>
            </div>
            <div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white block">
                NOVA
              </span>
              <span className="text-xs text-gray-400">
                Buy. Sell. Rent. Live Better.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenPostListing}
              className="px-5 py-2.5 rounded-full bg-[#BF5B30] text-white hover:bg-[#a64e28] font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm uppercase tracking-wider"
            >
              + List an Item Today
            </button>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-gray-700 transition-all cursor-pointer"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Column Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 border-b border-gray-800 text-xs sm:text-sm">
          
          {/* Col 1: Marketplace */}
          <div>
            <h4 className="font-serif font-bold text-white uppercase tracking-wider text-xs mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigateCategory('all')} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  All Listings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('cars')} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  Automobiles & Supercars
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('electronics')} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  Flagship Electronics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('furniture')} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  Living & Furniture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('cameras')} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  Pro Cinema & Lenses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('tools')} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  Contractor Tools
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Rent & Buy */}
          <div>
            <h4 className="font-serif font-bold text-white uppercase tracking-wider text-xs mb-4">
              Rent & Buy
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={onOpenHowItWorks} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  How Rentals Work
                </button>
              </li>
              <li>
                <button onClick={onOpenHowItWorks} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  Instant Deposit Return
                </button>
              </li>
              <li>
                <button onClick={onOpenHowItWorks} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  Escrow Payment Guarantee
                </button>
              </li>
              <li>
                <button onClick={onOpenHowItWorks} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  Vehicle Inspection Checklist
                </button>
              </li>
              <li>
                <button onClick={onOpenHowItWorks} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  White-Glove Delivery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Selling & Hosts */}
          <div>
            <h4 className="font-serif font-bold text-white uppercase tracking-wider text-xs mb-4">
              For Sellers
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={onOpenPostListing} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  Post a Free Listing
                </button>
              </li>
              <li>
                <button onClick={onOpenPostListing} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  Rental Fleet Management
                </button>
              </li>
              <li>
                <button onClick={onOpenHowItWorks} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  Seller Protection Shield
                </button>
              </li>
              <li>
                <button onClick={onOpenHowItWorks} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  Pricing Calculator
                </button>
              </li>
              <li>
                <button onClick={onOpenHowItWorks} className="hover:text-[#BF5B30] transition-colors cursor-pointer">
                  Identity Verification
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Locations */}
          <div>
            <h4 className="font-serif font-bold text-white uppercase tracking-wider text-xs mb-4">
              Top Locations
            </h4>
            <ul className="space-y-2.5 text-gray-400">
              <li className="hover:text-white transition-colors">Patna, Bihar</li>
              <li className="hover:text-white transition-colors">Ranchi & Deoghar</li>
              <li className="hover:text-white transition-colors">Kolkata, WB</li>
              <li className="hover:text-white transition-colors">Delhi NCR</li>
              <li className="hover:text-white transition-colors">Mumbai & Pune</li>
              <li className="hover:text-white transition-colors">Bengaluru & Hyderabad</li>
            </ul>
          </div>

          {/* Col 5: Trust & Concierge */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="font-serif font-bold text-white uppercase tracking-wider text-xs mb-4">
              NOVA Concierge
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Need assistance with high-value vehicle inspections or escrow verification?
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-3.5 h-3.5 text-[#BF5B30]" />
                <span>concierge@nova.market</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-3.5 h-3.5 text-[#BF5B30]" />
                <span>1800-890-NOVA (Mon-Sun)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 NOVA Technologies Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-300 cursor-pointer">Escrow Agreement</span>
            <span className="hover:text-gray-300 cursor-pointer">Security Standards</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
