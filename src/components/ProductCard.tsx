import React, { useState } from 'react';
import { Heart, MapPin, ShieldCheck, ChevronLeft, ChevronRight, Sparkles, Repeat, ShoppingBag } from 'lucide-react';
import { Listing } from '../types';
import { formatCompactINR, formatINR } from '../utils/formatters';

interface ProductCardProps {
  listing: Listing;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  listing,
  isFavorite,
  onToggleFavorite,
  onSelectListing,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const hasMultipleImages = listing.images && listing.images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
    }
  };

  return (
    <div
      id={`product-card-${listing.id}`}
      onClick={() => onSelectListing(listing)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-bento hover:shadow-bento-hover transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F5F0]">
        <img
          src={listing.images[currentImageIndex] || listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {listing.isFeatured && (
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#BF5B30] text-white shadow-sm flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-200" /> Featured
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-white/95 backdrop-blur-md text-gray-800 shadow-sm border border-gray-200 uppercase tracking-wider">
              {listing.condition}
            </span>
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            id={`fav-btn-${listing.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(listing.id);
            }}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all shadow-sm cursor-pointer ${
              isFavorite 
                ? 'bg-[#BF5B30] text-white scale-105' 
                : 'bg-white/90 hover:bg-white text-gray-700 hover:text-[#BF5B30]'
            }`}
            aria-label="Save to favorites"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Multi-Image Carousel Arrows (Visible on Hover) */}
        {hasMultipleImages && isHovered && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between z-10">
            <button
              onClick={prevImage}
              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-md backdrop-blur-sm transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextImage}
              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-md backdrop-blur-sm transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Carousel Dots */}
        {hasMultipleImages && (
          <div className="absolute bottom-2.5 left-0 right-0 flex items-center justify-center gap-1 z-10 pointer-events-none">
            {listing.images.slice(0, 5).map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? 'w-4 bg-white shadow-sm' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Distance */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span className="flex items-center gap-1 font-medium text-gray-600 truncate max-w-[70%]">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              {listing.location.area}, {listing.location.city}
            </span>
            {listing.location.distanceMiles && (
              <span className="text-[10px] font-semibold text-gray-400">
                {listing.location.distanceMiles} mi away
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-[#1A1A1A] text-base line-clamp-2 group-hover:text-[#BF5B30] transition-colors leading-snug">
            {listing.title}
          </h3>

          {/* Quick Specs Snippet (if available) */}
          {listing.specs && (
            <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px]">
              {Object.entries(listing.specs).slice(0, 2).map(([key, val]) => (
                <span key={key} className="px-2 py-0.5 rounded-md bg-[#F5F5F0] text-gray-700 font-medium">
                  {val}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Seller Info & Pricing */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          
          {/* Verified Seller Pill */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <img
                src={listing.seller.avatar}
                alt={listing.seller.name}
                className="w-5 h-5 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-semibold text-gray-700 truncate max-w-[110px]">
                {listing.seller.name}
              </span>
              {listing.seller.isVerified && (
                <ShieldCheck className="w-3.5 h-3.5 text-[#BF5B30] shrink-0" title="Verified Seller" />
              )}
            </div>

            <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
              ★ {listing.seller.rating}
            </span>
          </div>

          {/* Dual Buy & Rent Pricing Display */}
          <div className="flex items-baseline justify-between gap-2 mt-1">
            
            {/* Buy Price */}
            <div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400 block">Buy</span>
              <span className="text-base sm:text-lg font-bold text-[#1A1A1A] font-sans">
                {formatINR(listing.buyPrice)}
              </span>
            </div>

            {/* Rent Price (if available) */}
            {listing.rentPrice ? (
              <div className="text-right">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#BF5B30] block flex items-center justify-end gap-0.5">
                  <Repeat className="w-2.5 h-2.5" /> Rent
                </span>
                <span className="text-sm sm:text-base font-bold text-[#BF5B30] font-sans">
                  {formatINR(listing.rentPrice)}
                  <span className="text-[10px] font-normal text-gray-500">/{listing.rentPeriod || 'day'}</span>
                </span>
              </div>
            ) : (
              <div className="text-right">
                <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400 block">Status</span>
                <span className="text-xs font-semibold text-gray-500">Buy Only</span>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
