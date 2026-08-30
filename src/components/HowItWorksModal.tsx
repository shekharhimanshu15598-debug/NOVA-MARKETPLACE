import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Repeat, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Calendar, 
  MapPin, 
  Award,
  DollarSign
} from 'lucide-react';

interface HowItWorksModalProps {
  onClose: () => void;
  onOpenPostListing: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ onClose, onOpenPostListing }) => {
  const [tab, setTab] = useState<'buying' | 'renting' | 'selling'>('renting');

  return (
    <div
      id="how-it-works-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white text-zinc-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-modal border border-zinc-200 relative my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-950 font-manrope">
                How NOVA Works
              </h2>
              <p className="text-[11px] text-zinc-500">
                Transparent rules for buying, renting, and listing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-200 text-zinc-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-3 p-2 bg-zinc-100/70 border-b border-zinc-200 gap-1 text-xs font-bold">
          <button
            onClick={() => setTab('renting')}
            className={`py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              tab === 'renting' ? 'bg-white text-emerald-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            <Repeat className="w-4 h-4 text-emerald-700" />
            <span>Renting Guide</span>
          </button>

          <button
            onClick={() => setTab('buying')}
            className={`py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              tab === 'buying' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buying & Escrow</span>
          </button>

          <button
            onClick={() => setTab('selling')}
            className={`py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              tab === 'selling' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Selling & Listing</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: RENTING */}
          {tab === 'renting' && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Zero-Stress Rentals
                </span>
                <h3 className="text-xl font-extrabold text-zinc-950 font-manrope mt-2">
                  Drive luxury cars & test high-end gear without ownership costs
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white font-bold text-xs flex items-center justify-center mb-3">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 font-manrope">Pick Dates & Request</h4>
                  <p className="text-[11px] text-zinc-600 mt-1">
                    Choose start and end dates. Security deposit & daily rental fees are transparently broken down.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white font-bold text-xs flex items-center justify-center mb-3">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 font-manrope">Inspect & Digital Handover</h4>
                  <p className="text-[11px] text-zinc-600 mt-1">
                    Meet the host in person or request doorstep delivery. Take quick photos to lock condition before driving.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white font-bold text-xs flex items-center justify-center mb-3">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 font-manrope">Instant Deposit Return</h4>
                  <p className="text-[11px] text-zinc-600 mt-1">
                    Once the item or vehicle is returned in good order, your deposit is auto-refunded within 60 minutes.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
                <span>
                  <strong>Full Insurance Included:</strong> High-value vehicle rentals come with comprehensive road assistance and third-party protection.
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: BUYING */}
          {tab === 'buying' && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-full">
                  100% Escrow Protection
                </span>
                <h3 className="text-xl font-extrabold text-zinc-950 font-manrope mt-2">
                  No advance payments to strangers. Funds held in neutral escrow.
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white font-bold text-xs flex items-center justify-center mb-3">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 font-manrope">Lock Deal / Make Offer</h4>
                  <p className="text-[11px] text-zinc-600 mt-1">
                    Agree on price with the seller or click "Buy with Escrow". Your funds are stored in an RBI-compliant escrow account.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white font-bold text-xs flex items-center justify-center mb-3">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 font-manrope">Schedule In-Person Check</h4>
                  <p className="text-[11px] text-zinc-600 mt-1">
                    Inspect the vehicle, electronics, or gear thoroughly. Check battery health, registration, and original invoices.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white font-bold text-xs flex items-center justify-center mb-3">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 font-manrope">Release Funds with OTP</h4>
                  <p className="text-[11px] text-zinc-600 mt-1">
                    When you are completely satisfied, confirm handover with a single tap. If the item is misrepresented, 100% of your funds are returned immediately.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SELLING */}
          {tab === 'selling' && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Monetize Assets
                </span>
                <h3 className="text-xl font-extrabold text-zinc-950 font-manrope mt-2">
                  List items for outright sale or earn recurring daily rental income
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900">Dual Listing Mode</h4>
                    <p className="text-[11px] text-zinc-600">List an item for sale while offering it for rent simultaneously. Maximize utility and revenue.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900">Seller Protection Shield</h4>
                    <p className="text-[11px] text-zinc-600">Every renter must submit government ID verification and pay a mandatory security deposit before taking possession.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900">Instant Escrow Payouts</h4>
                    <p className="text-[11px] text-zinc-600">Earnings are credited directly to your bank account with zero hidden transaction deductions.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenPostListing();
                }}
                className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl text-xs font-bold transition-colors cursor-pointer"
              >
                + Start Listing Your Inventory Now
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
