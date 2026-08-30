import React, { useState } from 'react';
import { Sparkles, ArrowRight, Eye, Tag, Check, Heart } from 'lucide-react';
import { Listing } from '../types';
import { formatINR } from '../utils/formatters';

interface CuratedLivingSpacesProps {
  listings: Listing[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
  onExploreFurniture: () => void;
}

export const CuratedLivingSpaces: React.FC<CuratedLivingSpacesProps> = ({
  listings,
  favorites,
  onToggleFavorite,
  onSelectListing,
  onExploreFurniture,
}) => {
  const sofaItem = listings.find((l) => l.id === 'furn-1');
  const chairItem = listings.find((l) => l.id === 'furn-3');
  const tableItem = listings.find((l) => l.id === 'furn-2');

  const [activeHotspot, setActiveHotspot] = useState<string | null>('furn-1');

  return (
    <section id="curated-living-spaces-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9E9E0] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest mb-2 border border-gray-300">
          <Sparkles className="w-3 h-3 text-[#BF5B30]" />
          Interior Architecture & Design
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight">
          Curated Living Spaces
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Stage your home with sustainable craftsmanship, textured fabrics, and ergonomic design. Buy outright or rent on flexible monthly plans.
        </p>
      </div>

      {/* Main Living Room Visual with Interactive Hotspots */}
      <div className="relative rounded-3xl overflow-hidden shadow-bento border border-gray-300 bg-[#1A1A1A] aspect-[16/9] min-h-[420px] max-h-[620px] group">
        
        {/* Living Room Stage Photo */}
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85"
          alt="Curated Mid-Century Modern Living Room"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30 pointer-events-none" />

        {/* Interactive Hotspot 1: Bouclé Sofa */}
        {sofaItem && (
          <div className="absolute top-[62%] left-[42%] z-20">
            <button
              onClick={() => setActiveHotspot(activeHotspot === 'furn-1' ? null : 'furn-1')}
              className="relative w-8 h-8 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center shadow-lg border border-white hover:scale-110 transition-transform cursor-pointer"
              title="View Sofa details"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BF5B30] opacity-75"></span>
              <Tag className="w-4 h-4 text-[#BF5B30] relative z-10" />
            </button>

            {/* Popover Card */}
            {activeHotspot === 'furn-1' && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-xl p-4 rounded-3xl shadow-modal border border-gray-200 z-30 animate-in fade-in zoom-in-95 duration-150 text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#BF5B30]">Featured Piece</p>
                <h4 className="text-xs font-serif font-bold text-[#1A1A1A] mt-0.5 line-clamp-1">{sofaItem.title}</h4>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Rent</span>
                    <span className="text-xs font-bold text-[#BF5B30] font-sans">{formatINR(sofaItem.rentPrice || 0)}/mo</span>
                  </div>
                  <button
                    onClick={() => onSelectListing(sofaItem)}
                    className="px-3 py-1 bg-[#1A1A1A] text-white rounded-xl text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Interactive Hotspot 2: Solid Teak Table */}
        {tableItem && (
          <div className="absolute top-[48%] right-[22%] z-20">
            <button
              onClick={() => setActiveHotspot(activeHotspot === 'furn-2' ? null : 'furn-2')}
              className="relative w-8 h-8 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center shadow-lg border border-white hover:scale-110 transition-transform cursor-pointer"
              title="View Table details"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BF5B30] opacity-75"></span>
              <Tag className="w-4 h-4 text-[#BF5B30] relative z-10" />
            </button>

            {/* Popover Card */}
            {activeHotspot === 'furn-2' && (
              <div className="absolute bottom-10 right-0 w-64 bg-white/95 backdrop-blur-xl p-4 rounded-3xl shadow-modal border border-gray-200 z-30 animate-in fade-in zoom-in-95 duration-150 text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#BF5B30]">Handcrafted Wood</p>
                <h4 className="text-xs font-serif font-bold text-[#1A1A1A] mt-0.5 line-clamp-1">{tableItem.title}</h4>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Buy</span>
                    <span className="text-xs font-bold text-[#1A1A1A] font-sans">{formatINR(tableItem.buyPrice)}</span>
                  </div>
                  <button
                    onClick={() => onSelectListing(tableItem)}
                    className="px-3 py-1 bg-[#1A1A1A] text-white rounded-xl text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Bar Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10 pointer-events-auto">
          <div className="text-white drop-shadow-sm">
            <h3 className="text-xl sm:text-2xl font-serif text-white font-normal">
              The Minimalist Sanctuary Living Suite
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Complete living set available for monthly rental or direct purchase with white-glove setup.
            </p>
          </div>

          <button
            id="curated-explore-living-btn"
            onClick={onExploreFurniture}
            className="px-5 py-2.5 rounded-full bg-white text-[#1A1A1A] font-bold text-xs sm:text-sm shadow-md hover:bg-[#F5F5F0] transition-all flex items-center gap-1.5 group cursor-pointer"
          >
            <span>Explore Furniture (380+)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

      </div>

    </section>
  );
};
