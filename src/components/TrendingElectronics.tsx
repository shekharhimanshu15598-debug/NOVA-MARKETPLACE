import React from 'react';
import { ArrowUpRight, Cpu, Sparkles } from 'lucide-react';
import { Listing } from '../types';
import { ProductCard } from './ProductCard';

interface TrendingElectronicsProps {
  listings: Listing[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
  onViewAllElectronics: () => void;
}

export const TrendingElectronics: React.FC<TrendingElectronicsProps> = ({
  listings,
  favorites,
  onToggleFavorite,
  onSelectListing,
  onViewAllElectronics,
}) => {
  const electronicsListings = listings
    .filter((l) => ['electronics', 'computers', 'cameras', 'gaming'].includes(l.category))
    .slice(0, 4);

  return (
    <section id="trending-electronics-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200/60">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-3 h-3 text-emerald-700" />
            Cutting-Edge Tech
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight font-manrope">
            Trending Electronics & Cameras
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-1 font-dmsans max-w-xl">
            Pro MacBooks, 4K cinema gear, flagship smartphones, and next-gen gaming consoles tested for performance.
          </p>
        </div>

        <button
          id="view-all-tech-btn"
          onClick={onViewAllElectronics}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-950 hover:text-emerald-700 transition-colors cursor-pointer group self-start md:self-auto"
        >
          <span>View All Tech (500+)</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {electronicsListings.map((listing) => (
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
