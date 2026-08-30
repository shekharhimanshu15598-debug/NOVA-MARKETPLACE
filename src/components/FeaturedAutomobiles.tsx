import React from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';
import { Listing } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedAutomobilesProps {
  listings: Listing[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
  onViewAllCars: () => void;
}

export const FeaturedAutomobiles: React.FC<FeaturedAutomobilesProps> = ({
  listings,
  favorites,
  onToggleFavorite,
  onSelectListing,
  onViewAllCars,
}) => {
  const autoListings = listings.filter((l) => l.category === 'cars').slice(0, 4);

  return (
    <section id="featured-automobiles-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest mb-2">
            <Zap className="w-3 h-3 text-[#BF5B30]" />
            Verified Fleet
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] tracking-tight">
            Featured Automobiles
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-xl">
            Clean title luxury sedans, high-performance sports cars, and rugged 4x4 off-roaders with full inspection reports.
          </p>
        </div>

        <button
          id="view-all-cars-btn"
          onClick={onViewAllCars}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:text-[#BF5B30] transition-colors cursor-pointer group self-start md:self-auto"
        >
          <span>View All Vehicles (240+)</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {autoListings.map((listing) => (
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
