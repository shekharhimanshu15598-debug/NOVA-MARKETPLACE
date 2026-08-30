import React from 'react';
import { MapPin, Navigation, ArrowUpRight } from 'lucide-react';
import { Listing } from '../types';
import { ProductCard } from './ProductCard';

interface NearbyListingsProps {
  listings: Listing[];
  currentLocation: string;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
  onViewAllNearby: () => void;
}

export const NearbyListings: React.FC<NearbyListingsProps> = ({
  listings,
  currentLocation,
  favorites,
  onToggleFavorite,
  onSelectListing,
  onViewAllNearby,
}) => {
  // Sort or prioritize listings in the active location or nearest distance
  const nearbyItems = [...listings].sort((a, b) => {
    const isALocal = a.location.city.toLowerCase().includes(currentLocation.toLowerCase().split(',')[0]);
    const isBLocal = b.location.city.toLowerCase().includes(currentLocation.toLowerCase().split(',')[0]);
    if (isALocal && !isBLocal) return -1;
    if (!isALocal && isBLocal) return 1;
    return (a.location.distanceMiles || 10) - (b.location.distanceMiles || 10);
  }).slice(0, 4);

  return (
    <section id="nearby-listings-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200/60">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200/60">
            <Navigation className="w-3 h-3 text-emerald-700" />
            Location-Aware
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight font-manrope">
            Listings Near You in {currentLocation}
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-1 font-dmsans max-w-xl">
            Available for immediate local pickup or same-day delivery with verified escrow security.
          </p>
        </div>

        <button
          id="view-all-nearby-btn"
          onClick={onViewAllNearby}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-950 hover:text-emerald-700 transition-colors cursor-pointer group self-start md:self-auto"
        >
          <span>View All Nearby Items</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {nearbyItems.map((listing) => (
          <ProductCard
            key={listing.id}
            listing={listing}
            isFavorite={favorites.includes(listing.id)}
            onToggleFavorite={onToggleFavorite}
            onSelectListing={onSelectListing}
          />
        ))}
      </div>
    </section>
  );
};
