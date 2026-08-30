import React from 'react';
import { X, ShieldCheck, Star, Clock, MapPin, MessageSquare, Award } from 'lucide-react';
import { Listing, SellerProfile } from '../types';
import { ProductCard } from './ProductCard';

interface SellerProfileModalProps {
  sellerId: string | null;
  allListings: Listing[];
  onClose: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
  onContactSeller: (listing: Listing) => void;
}

export const SellerProfileModal: React.FC<SellerProfileModalProps> = ({
  sellerId,
  allListings,
  onClose,
  favorites,
  onToggleFavorite,
  onSelectListing,
  onContactSeller,
}) => {
  if (!sellerId) return null;

  // Find a listing from this seller to get seller metadata
  const matchingListings = allListings.filter((l) => l.seller.id === sellerId);
  const seller = matchingListings[0]?.seller || {
    id: sellerId,
    name: 'Verified Marketplace Host',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    reviewsCount: 32,
    isVerified: true,
    responseTime: '< 15 mins',
    responseRate: '98%',
    memberSince: 'March 2023',
    bio: 'Professional automobile collector and enthusiast equipment provider.',
  };

  return (
    <div
      id="seller-profile-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF9F6] text-zinc-900 rounded-3xl max-w-4xl w-full overflow-hidden shadow-modal border border-zinc-200 relative my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Seller Showcase</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Profile Hero Card */}
          <div className="bg-white p-6 rounded-3xl border border-zinc-200/90 shadow-ambient flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-zinc-100 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-zinc-950 font-manrope">{seller.name}</h2>
                  {seller.isVerified && (
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Host</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-1">Member since {seller.memberSince}</p>
                {seller.bio && (
                  <p className="text-xs text-zinc-700 font-dmsans italic mt-2 max-w-lg">
                    "{seller.bio}"
                  </p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-3 bg-zinc-50 p-3 rounded-2xl border border-zinc-100 text-center">
              <div className="px-3">
                <span className="text-sm font-extrabold text-amber-600 block">★ {seller.rating}</span>
                <span className="text-[10px] text-zinc-400 font-medium">{seller.reviewsCount} reviews</span>
              </div>
              <div className="w-px h-8 bg-zinc-200" />
              <div className="px-3">
                <span className="text-sm font-extrabold text-zinc-900 block">{seller.responseTime}</span>
                <span className="text-[10px] text-zinc-400 font-medium">Response</span>
              </div>
            </div>
          </div>

          {/* Seller's Active Listings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-zinc-950 font-manrope">
                Active Listings by {seller.name} ({matchingListings.length})
              </h3>
            </div>

            {matchingListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {matchingListings.map((listing) => (
                  <ProductCard
                    key={listing.id}
                    listing={listing}
                    isFavorite={favorites.includes(listing.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelectListing={(item) => {
                      onClose();
                      onSelectListing(item);
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 italic">No other active items listed at this moment.</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
