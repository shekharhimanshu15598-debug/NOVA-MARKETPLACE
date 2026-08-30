import React, { useState } from 'react';
import { 
  X, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Heart, 
  Repeat, 
  CheckCircle2, 
  XCircle, 
  PauseCircle, 
  PlayCircle, 
  Trash2, 
  Plus, 
  ShieldCheck, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Listing, RentalBookingRequest } from '../types';
import { formatCompactINR, formatINR } from '../utils/formatters';

interface SellerDashboardModalProps {
  onClose: () => void;
  userListings: Listing[];
  onOpenPostListing: () => void;
  onShowToast: (msg: string) => void;
}

const MOCK_RENTAL_REQUESTS: RentalBookingRequest[] = [
  {
    id: 'req-1',
    listingId: 'car-1',
    listingTitle: '2023 Porsche 911 Carrera S',
    listingImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80',
    renterName: 'Sameer Singhal',
    renterAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    startDate: '2026-09-02',
    endDate: '2026-09-05',
    days: 3,
    dailyRate: 38000,
    securityDeposit: 150000,
    serviceFee: 5700,
    totalAmount: 269700,
    status: 'pending',
    requestedAt: '2 hours ago',
  },
  {
    id: 'req-2',
    listingId: 'cam-1',
    listingTitle: 'Sony Alpha 7 IV Mirrorless Package',
    listingImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80',
    renterName: 'Pooja Kashyap',
    renterAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    startDate: '2026-09-08',
    endDate: '2026-09-10',
    days: 2,
    dailyRate: 2200,
    securityDeposit: 35000,
    serviceFee: 220,
    totalAmount: 39620,
    status: 'approved',
    requestedAt: '1 day ago',
  },
];

export const SellerDashboardModal: React.FC<SellerDashboardModalProps> = ({
  onClose,
  userListings,
  onOpenPostListing,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'rentals' | 'payouts'>('overview');
  const [requests, setRequests] = useState<RentalBookingRequest[]>(MOCK_RENTAL_REQUESTS);
  const [localListings, setLocalListings] = useState<Listing[]>(userListings);

  const totalViews = localListings.reduce((acc, l) => acc + (l.views || 120), 0);
  const totalFavorites = localListings.reduce((acc, l) => acc + (l.favoritesCount || 14), 0);

  const handleApprove = (id: string) => {
    setRequests(requests.map((r) => r.id === id ? { ...r, status: 'approved' } : r));
    onShowToast('Rental request approved! Escrow payment locked in secure account.');
  };

  const handleReject = (id: string) => {
    setRequests(requests.map((r) => r.id === id ? { ...r, status: 'rejected' } : r));
    onShowToast('Rental request declined.');
  };

  const handleToggleStatus = (id: string) => {
    setLocalListings(localListings.map((l) => {
      if (l.id === id) {
        const nextStatus = l.status === 'active' ? 'draft' : 'active';
        onShowToast(`Listing status updated to ${nextStatus.toUpperCase()}`);
        return { ...l, status: nextStatus };
      }
      return l;
    }));
  };

  return (
    <div
      id="seller-dashboard-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white text-zinc-900 rounded-3xl max-w-4xl w-full overflow-hidden shadow-modal border border-zinc-200 relative my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-950 font-manrope">
                Seller & Host Dashboard
              </h2>
              <p className="text-xs text-zinc-500">
                Track marketplace earnings, active inventory & rental bookings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenPostListing();
              }}
              className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" /> New Listing
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-200 text-zinc-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex px-6 border-b border-zinc-100 bg-white gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'border-zinc-950 text-zinc-950' : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Overview & Metrics
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'listings' ? 'border-zinc-950 text-zinc-950' : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            My Listings ({localListings.length})
          </button>
          <button
            onClick={() => setActiveTab('rentals')}
            className={`py-3 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rentals' ? 'border-zinc-950 text-zinc-950' : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <span>Rental Bookings</span>
            {requests.filter((r) => r.status === 'pending').length > 0 && (
              <span className="w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {requests.filter((r) => r.status === 'pending').length}
              </span>
            )}
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* 4 Stat Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Total Earnings</span>
                  <span className="text-xl font-extrabold text-zinc-950 font-manrope mt-1 block">₹2,84,500</span>
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5 mt-1">
                    <TrendingUp className="w-3 h-3" /> +18% this month
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Active Listings</span>
                  <span className="text-xl font-extrabold text-zinc-950 font-manrope mt-1 block">{localListings.length} items</span>
                  <span className="text-[10px] text-zinc-500 font-medium mt-1">All verified</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Total Views</span>
                  <span className="text-xl font-extrabold text-zinc-950 font-manrope mt-1 block">{totalViews.toLocaleString()}</span>
                  <span className="text-[10px] text-zinc-500 font-medium mt-1">Across 14 cities</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Favorited</span>
                  <span className="text-xl font-extrabold text-zinc-950 font-manrope mt-1 block">{totalFavorites} saves</span>
                  <span className="text-[10px] text-rose-600 font-bold mt-1">High interest</span>
                </div>
              </div>

              {/* Earnings Breakdown & Visual SVG Chart */}
              <div className="p-5 rounded-3xl bg-zinc-950 text-white shadow-ambient">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold font-manrope">Monthly Revenue Stream</h3>
                    <p className="text-xs text-zinc-400">Rental Subscriptions vs Direct Sales</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Rentals
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Sales
                    </span>
                  </div>
                </div>

                {/* SVG Line / Bar Chart */}
                <div className="h-32 w-full flex items-end justify-between gap-2 pt-4">
                  {[
                    { month: 'Apr', rent: 35, sale: 20 },
                    { month: 'May', rent: 55, sale: 40 },
                    { month: 'Jun', rent: 45, sale: 65 },
                    { month: 'Jul', rent: 75, sale: 50 },
                    { month: 'Aug', rent: 95, sale: 80 },
                    { month: 'Sep', rent: 110, sale: 95 },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end justify-center gap-1 h-24">
                        <div
                          className="w-3 sm:w-4 bg-emerald-400 rounded-t-md transition-all"
                          style={{ height: `${bar.rent}%` }}
                        />
                        <div
                          className="w-3 sm:w-4 bg-amber-400 rounded-t-md transition-all"
                          style={{ height: `${bar.sale}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-zinc-400 font-medium">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Escrow Guarantee Status */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">Escrow Account Active & Protected</h4>
                    <p className="text-[11px] text-emerald-800">Direct instant payouts enabled to your verified bank account.</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-900 bg-white px-3 py-1 rounded-lg shadow-sm">
                  Verified Tier 1
                </span>
              </div>

            </div>
          )}

          {/* TAB: MY LISTINGS */}
          {activeTab === 'listings' && (
            <div className="space-y-3">
              {localListings.map((listing) => (
                <div
                  key={listing.id}
                  className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">{listing.category}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          listing.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-700'
                        }`}>
                          {listing.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-zinc-950 line-clamp-1">{listing.title}</h4>
                      <p className="text-xs text-zinc-600 mt-0.5">
                        Sale: <span className="font-bold text-zinc-950">{formatINR(listing.buyPrice)}</span>
                        {listing.rentPrice && (
                          <span> • Rent: <span className="font-bold text-emerald-800">{formatINR(listing.rentPrice)}/{listing.rentPeriod}</span></span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleToggleStatus(listing.id)}
                      className="px-3 py-1.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-xs font-bold text-zinc-800 transition-colors"
                    >
                      {listing.status === 'active' ? 'Pause' : 'Activate'}
                    </button>
                    <button
                      onClick={() => onShowToast('Listing boosted to top of search results for 48 hours!')}
                      className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-xs font-bold text-white transition-colors"
                    >
                      Promote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: RENTAL REQUESTS */}
          {activeTab === 'rentals' && (
            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-2xl border border-zinc-200 bg-white shadow-ambient space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={req.listingImage}
                        alt={req.listingTitle}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-zinc-950">{req.listingTitle}</h4>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Requested by <strong className="text-zinc-900">{req.renterName}</strong> • {req.requestedAt}
                        </p>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      req.status === 'pending'
                        ? 'bg-amber-100 text-amber-900'
                        : req.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-rose-100 text-rose-900'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-zinc-50 p-3 rounded-xl text-xs">
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold">Duration</span>
                      <span className="font-bold text-zinc-900">{req.startDate} to {req.endDate} ({req.days} days)</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold">Rate</span>
                      <span className="font-bold text-zinc-900">{formatINR(req.dailyRate)}/day</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold">Total Quote</span>
                      <span className="font-bold text-emerald-800">{formatINR(req.totalAmount)}</span>
                    </div>
                  </div>

                  {req.status === 'pending' && (
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
                      <button
                        onClick={() => handleReject(req.id)}
                        className="px-4 py-1.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-xs font-bold text-zinc-700 transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="px-4 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-xs font-bold text-white transition-colors"
                      >
                        Approve Booking & Lock Escrow
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
