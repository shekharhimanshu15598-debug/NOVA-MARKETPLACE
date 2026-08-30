import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Share2, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  MessageSquare, 
  Repeat, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Maximize2, 
  Sparkles, 
  Clock, 
  Award, 
  Info,
  DollarSign,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Listing } from '../types';
import { formatINR } from '../utils/formatters';

interface ProductDetailModalProps {
  listing: Listing | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onContactSeller: (listing: Listing) => void;
  onOpenSellerProfile: (sellerId: string) => void;
  onShowToast: (msg: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  listing,
  onClose,
  isFavorite,
  onToggleFavorite,
  onContactSeller,
  onOpenSellerProfile,
  onShowToast,
}) => {
  if (!listing) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeMode, setActiveMode] = useState<'buy' | 'rent'>(
    listing.rentPrice ? 'rent' : 'buy'
  );

  // Rental calculator state
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  });

  // Calculate rental duration in days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(0, end.getTime() - start.getTime());
  const rentalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const dailyRate = listing.rentPrice || 0;
  const rentalSubtotal = dailyRate * rentalDays;
  const securityDeposit = listing.securityDeposit || Math.round(listing.buyPrice * 0.1);
  const serviceFee = Math.round(rentalSubtotal * 0.05);
  const rentalTotal = rentalSubtotal + securityDeposit + serviceFee;

  // Make an offer state
  const [showOfferInput, setShowOfferInput] = useState(false);
  const [offerAmount, setOfferAmount] = useState(listing.buyPrice ? Math.round(listing.buyPrice * 0.95).toString() : '');

  // Schedule inspection modal state
  const [showInspectionPicker, setShowInspectionPicker] = useState(false);
  const [inspectionDate, setInspectionDate] = useState(startDate);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('Listing link copied to clipboard!');
  };

  const handleBookingSubmit = () => {
    onShowToast(`Rental request submitted for ${rentalDays} days! Seller notified.`);
    onClose();
  };

  const handleOfferSubmit = () => {
    onShowToast(`Offer of ${formatINR(Number(offerAmount))} submitted to ${listing.seller.name}!`);
    setShowOfferInput(false);
  };

  const handleScheduleSubmit = () => {
    onShowToast(`Inspection appointment requested for ${inspectionDate}. Seller will confirm.`);
    setShowInspectionPicker(false);
  };

  return (
    <div
      id="product-detail-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF9F6] text-zinc-900 rounded-3xl max-w-5xl w-full overflow-hidden shadow-modal border border-zinc-200 relative my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-100 text-zinc-800 uppercase tracking-wider">
              {listing.category}
            </span>
            <span className="text-xs font-semibold text-zinc-500">•</span>
            <span className="text-xs font-semibold text-zinc-600">{listing.condition}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(listing.id)}
              className={`p-2 rounded-full border border-zinc-200 transition-all cursor-pointer ${
                isFavorite ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-zinc-700 hover:bg-zinc-100'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 transition-all cursor-pointer"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              id="detail-modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white transition-all cursor-pointer ml-2"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="max-h-[80vh] overflow-y-auto p-4 sm:p-6 lg:p-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Image Gallery & Full Specs (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Main Active Image with Zoom */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 shadow-ambient border border-zinc-200">
                <img
                  src={listing.images[selectedImageIndex] || listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {/* Left / Right Nav on Main Image */}
                {listing.images.length > 1 && (
                  <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length)}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev + 1) % listing.images.length)}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/70 text-white text-[11px] font-bold backdrop-blur-sm">
                  {selectedImageIndex + 1} / {listing.images.length} Photos
                </div>
              </div>

              {/* Thumbnails Row */}
              {listing.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        selectedImageIndex === idx ? 'border-zinc-950 scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-ambient">
                <h3 className="text-base font-bold text-zinc-950 font-manrope mb-2">
                  Item Description
                </h3>
                <p className="text-zinc-700 text-sm font-dmsans leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* Key Specs Grid (Automobile / Tech specs) */}
              {listing.specs && Object.keys(listing.specs).length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-ambient">
                  <h3 className="text-base font-bold text-zinc-950 font-manrope mb-4">
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(listing.specs).map(([key, val]) => (
                      <div key={key} className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 flex flex-col justify-between">
                        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{key}</span>
                        <span className="text-xs sm:text-sm font-bold text-zinc-900 mt-1 font-manrope">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features List */}
              {listing.features && listing.features.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-ambient">
                  <h3 className="text-base font-bold text-zinc-950 font-manrope mb-3">
                    Included Features & Equipment
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {listing.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Map Placeholder */}
              <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-ambient">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-zinc-950 font-manrope">
                    Pickup & Handover Location
                  </h3>
                  <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    {listing.location.area}, {listing.location.city}
                  </span>
                </div>

                {/* Styled Map Graphic Box */}
                <div className="relative h-44 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80"
                    alt="Location Map Placeholder"
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-zinc-950/20" />
                  <div className="relative z-10 px-4 py-2 rounded-full bg-zinc-950 text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>{listing.location.area}, {listing.location.city}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Pricing, Rental Calculator & Action Panel (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Main Action Box with Buy/Rent Tabs */}
              <div className="bg-white p-6 rounded-3xl border border-zinc-200/90 shadow-hover sticky top-24">
                
                {/* Title & Location Header */}
                <div>
                  <div className="flex items-center gap-1 text-xs text-zinc-500 font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{listing.location.area}, {listing.location.city}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-950 font-manrope leading-snug">
                    {listing.title}
                  </h1>
                </div>

                {/* Mode Selector Tabs (Buy vs Rent) */}
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-100 rounded-2xl my-5">
                  <button
                    type="button"
                    onClick={() => setActiveMode('buy')}
                    className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeMode === 'buy'
                        ? 'bg-white text-zinc-950 shadow-sm'
                        : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy Outright</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveMode('rent')}
                    className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeMode === 'rent'
                        ? 'bg-white text-emerald-900 shadow-sm'
                        : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    <Repeat className="w-4 h-4 text-emerald-700" />
                    <span>Rent Item</span>
                  </button>
                </div>

                {/* IF RENT MODE ACTIVE */}
                {activeMode === 'rent' && (
                  <div className="space-y-4">
                    {/* Rate */}
                    <div className="flex items-baseline justify-between pb-3 border-b border-zinc-100">
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Rental Rate</span>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-emerald-900 font-manrope">
                          {formatINR(listing.rentPrice || 0)}
                        </span>
                        <span className="text-xs text-zinc-500 font-medium">/{listing.rentPeriod || 'day'}</span>
                      </div>
                    </div>

                    {/* Interactive Dates */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-zinc-950"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-zinc-950"
                        />
                      </div>
                    </div>

                    {/* Breakdown Box */}
                    <div className="bg-zinc-50 rounded-2xl p-4 space-y-2 text-xs border border-zinc-100">
                      <div className="flex justify-between text-zinc-600">
                        <span>{formatINR(dailyRate)} × {rentalDays} days</span>
                        <span className="font-semibold text-zinc-900">{formatINR(rentalSubtotal)}</span>
                      </div>
                      <div className="flex justify-between text-zinc-600">
                        <span className="flex items-center gap-1">
                          Refundable Security Deposit
                          <Info className="w-3 h-3 text-zinc-400" title="Returned within 60 mins of inspection" />
                        </span>
                        <span className="font-semibold text-zinc-900">{formatINR(securityDeposit)}</span>
                      </div>
                      <div className="flex justify-between text-zinc-600">
                        <span>Platform Protection & Escrow Fee</span>
                        <span className="font-semibold text-zinc-900">{formatINR(serviceFee)}</span>
                      </div>
                      <div className="border-t border-zinc-200 pt-2 flex justify-between text-sm font-bold text-zinc-950 font-manrope">
                        <span>Total Due Today</span>
                        <span className="text-emerald-900 text-base">{formatINR(rentalTotal)}</span>
                      </div>
                    </div>

                    {/* Rent Action Button */}
                    <button
                      id="request-rental-booking-btn"
                      onClick={handleBookingSubmit}
                      className="w-full py-3.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-hover transition-all cursor-pointer"
                    >
                      <Repeat className="w-4 h-4" />
                      <span>Request Rental Booking</span>
                    </button>
                  </div>
                )}

                {/* IF BUY MODE ACTIVE */}
                {activeMode === 'buy' && (
                  <div className="space-y-4">
                    {/* Buy Price */}
                    <div className="flex items-baseline justify-between pb-3 border-b border-zinc-100">
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Purchase Price</span>
                      <div className="text-right">
                        <span className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-manrope">
                          {formatINR(listing.buyPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Escrow Guarantee Pill */}
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center gap-2.5 text-xs text-emerald-900 font-medium">
                      <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                      <span>Funds released to seller only after in-person inspection and condition verification.</span>
                    </div>

                    {/* Buy Now & Offer Buttons */}
                    <div className="space-y-2">
                      <button
                        id="buy-now-escrow-btn"
                        onClick={() => {
                          onShowToast(`Escrow checkout initiated for ${formatINR(listing.buyPrice)}`);
                          onClose();
                        }}
                        className="w-full py-3.5 px-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-hover transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Buy with Escrow Protection</span>
                      </button>

                      {showOfferInput ? (
                        <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-200 space-y-2 animate-in fade-in duration-150">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Your Counter Offer (₹)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={offerAmount}
                              onChange={(e) => setOfferAmount(e.target.value)}
                              className="flex-1 bg-white border border-zinc-300 rounded-xl px-3 py-1.5 text-xs font-bold text-zinc-900 focus:outline-none focus:border-zinc-950"
                            />
                            <button
                              type="button"
                              onClick={handleOfferSubmit}
                              className="px-3 py-1.5 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800"
                            >
                              Send
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowOfferInput(false)}
                              className="px-2 py-1.5 text-zinc-500 hover:text-zinc-800 text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          id="make-an-offer-btn"
                          onClick={() => setShowOfferInput(true)}
                          className="w-full py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-2xl text-xs font-bold transition-all cursor-pointer"
                        >
                          Make an Offer
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Secondary Actions: Inspection & Chat */}
                <div className="mt-4 pt-4 border-t border-zinc-100 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    id="contact-seller-btn"
                    onClick={() => {
                      onContactSeller(listing);
                      onClose();
                    }}
                    className="py-2.5 px-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-xs font-bold text-zinc-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat with Seller</span>
                  </button>

                  <button
                    type="button"
                    id="schedule-inspection-btn"
                    onClick={() => setShowInspectionPicker(!showInspectionPicker)}
                    className="py-2.5 px-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-xs font-bold text-zinc-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule Inspection</span>
                  </button>
                </div>

                {/* Inspection Date Picker Popover */}
                {showInspectionPicker && (
                  <div className="mt-3 p-3 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2 animate-in fade-in duration-150">
                    <p className="text-[11px] font-bold text-zinc-800">Select Date for Physical Inspection:</p>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={inspectionDate}
                        onChange={(e) => setInspectionDate(e.target.value)}
                        className="flex-1 bg-white border border-zinc-200 rounded-xl px-2.5 py-1 text-xs"
                      />
                      <button
                        onClick={handleScheduleSubmit}
                        className="px-3 py-1 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Verified Seller Profile Card */}
              <div className="bg-white p-6 rounded-3xl border border-zinc-200/90 shadow-ambient space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Seller Information
                  </span>
                  <button
                    onClick={() => onOpenSellerProfile(listing.seller.id)}
                    className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                  >
                    View Profile →
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={listing.seller.avatar}
                    alt={listing.seller.name}
                    className="w-12 h-12 rounded-full object-cover border border-zinc-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-zinc-950">{listing.seller.name}</h4>
                      {listing.seller.isVerified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-600" title="Verified Identity" />
                      )}
                    </div>
                    <p className="text-xs text-zinc-500">Member since {listing.seller.memberSince}</p>
                  </div>
                </div>

                {listing.seller.bio && (
                  <p className="text-xs text-zinc-600 italic">
                    "{listing.seller.bio}"
                  </p>
                )}

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-100 text-center">
                  <div className="p-2 rounded-xl bg-zinc-50">
                    <span className="text-xs font-bold text-amber-600 block">★ {listing.seller.rating}</span>
                    <span className="text-[10px] text-zinc-400">{listing.seller.reviewsCount} reviews</span>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-50">
                    <span className="text-xs font-bold text-zinc-900 block">{listing.seller.responseTime}</span>
                    <span className="text-[10px] text-zinc-400">Response</span>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-50">
                    <span className="text-xs font-bold text-emerald-700 block">{listing.seller.responseRate}</span>
                    <span className="text-[10px] text-zinc-400">Rate</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
