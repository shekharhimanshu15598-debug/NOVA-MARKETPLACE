import React, { useState } from 'react';
import { Repeat, Calendar, ShieldCheck, Zap, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Listing } from '../types';
import { ProductCard } from './ProductCard';

interface DedicatedRentalSectionProps {
  listings: Listing[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
  onBrowseRentals: () => void;
}

export const DedicatedRentalSection: React.FC<DedicatedRentalSectionProps> = ({
  listings,
  favorites,
  onToggleFavorite,
  onSelectListing,
  onBrowseRentals,
}) => {
  const [selectedRentalCategory, setSelectedRentalCategory] = useState<string>('all');

  const rentalListings = listings.filter((l) => {
    if (!l.rentPrice) return false;
    if (selectedRentalCategory === 'all') return true;
    return l.category === selectedRentalCategory;
  }).slice(0, 4);

  return (
    <section id="dedicated-rental-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
      
      {/* Banner / Value Proposition Header */}
      <div className="bg-[#1A1A1A] rounded-3xl p-8 sm:p-12 text-white shadow-bento relative overflow-hidden mb-10 border border-gray-800">
        {/* Decorative Rust Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#BF5B30]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-[10px] font-bold uppercase tracking-widest mb-4 border border-white/10">
            <Repeat className="w-3.5 h-3.5 text-[#BF5B30]" />
            Zero-Commitment Living
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight">
            Need it for a while? <br />
            <span className="italic text-[#BF5B30]">Just rent it.</span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed font-sans">
            Rent luxury supercars for weekend getaways, pro cinema cameras for commercial shoots, or designer furniture sets for temporary relocations — with verified insurance and instant security deposit refunds.
          </p>

          {/* Value Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-white/10 text-[#BF5B30] shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Flexible Durations</h4>
                <p className="text-xs text-gray-400 mt-0.5 font-sans">Rent by the day, week, or month with easy extensions.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-white/10 text-[#BF5B30] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Damage Protection</h4>
                <p className="text-xs text-gray-400 mt-0.5 font-sans">All rentals include verified condition checks and coverage.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-white/10 text-[#BF5B30] shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Instant Handover</h4>
                <p className="text-xs text-gray-400 mt-0.5 font-sans">Direct pickup or doorstep delivery within 3 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills & Browse Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedRentalCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedRentalCategory === 'all'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Rentals
          </button>
          <button
            onClick={() => setSelectedRentalCategory('cars')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedRentalCategory === 'cars'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Automobiles
          </button>
          <button
            onClick={() => setSelectedRentalCategory('cameras')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedRentalCategory === 'cameras'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Cameras & Drones
          </button>
          <button
            onClick={() => setSelectedRentalCategory('computers')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedRentalCategory === 'computers'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Laptops & Tech
          </button>
          <button
            onClick={() => setSelectedRentalCategory('furniture')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedRentalCategory === 'furniture'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Furniture
          </button>
          <button
            onClick={() => setSelectedRentalCategory('tools')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedRentalCategory === 'tools'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Tools & Gear
          </button>
        </div>

        <button
          id="browse-all-rentals-btn"
          onClick={onBrowseRentals}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:text-[#BF5B30] transition-colors cursor-pointer group shrink-0"
        >
          <span>Explore 450+ Rental Items</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Rental Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {rentalListings.map((listing) => (
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
