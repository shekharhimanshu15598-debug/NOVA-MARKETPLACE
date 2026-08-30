import React, { useState } from 'react';
import { Search, ArrowRight, ArrowUpRight, Sparkles, Plus, Repeat, ShoppingBag, ShieldCheck, MapPin, Tag } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface HeroSectionProps {
  onSearch?: (query: string, category: string, type: 'all' | 'buy' | 'rent') => void;
  onSearchSubmit?: (query: string, type: 'all' | 'buy' | 'rent', category: string, location?: string) => void;
  onQuickCategory?: (categorySlug: string) => void;
  onOpenPostListing: () => void;
  currentLocation?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onSearchSubmit,
  onQuickCategory,
  onOpenPostListing,
  currentLocation = 'Patna, Bihar',
}) => {
  const [activeType, setActiveType] = useState<'buy' | 'rent'>('buy');
  const [searchQuery, setSearchQuery] = useState('');

  const handleExecuteSearch = (queryToSearch?: string, typeToUse?: 'all' | 'buy' | 'rent') => {
    const q = queryToSearch !== undefined ? queryToSearch : searchQuery;
    const t = typeToUse || activeType;
    if (onSearch) {
      onSearch(q, 'all', t);
    } else if (onSearchSubmit) {
      onSearchSubmit(q, t, 'all', currentLocation);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteSearch();
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    handleExecuteSearch(tag);
  };

  return (
    <section id="hero-bento-section" className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* 1. Bento Hero Title & Search Header */}
      <div className="flex flex-col items-center justify-center py-4 sm:py-6 gap-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1A1A1A] max-w-3xl leading-[1.12] tracking-tight">
          Everything you need. <br />
          <span className="italic text-[#BF5B30]">Buy it. Rent it. Sell it.</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-xl font-sans">
          India's premier marketplace for verified luxury automobiles, flagship electronics, curated furniture, and pro rental gear.
        </p>

        {/* Bento Search Bar */}
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-2 shadow-sm flex flex-col sm:flex-row items-center gap-2 mt-2"
        >
          {/* BUY / RENT Pill Switcher */}
          <div className="flex gap-1 bg-gray-50 p-1 rounded-xl w-full sm:w-auto shrink-0">
            <button
              type="button"
              id="hero-bento-buy-btn"
              onClick={() => setActiveType('buy')}
              className={`flex-1 sm:flex-initial px-5 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer uppercase ${
                activeType === 'buy'
                  ? 'bg-white text-[#1A1A1A] shadow-sm'
                  : 'text-gray-500 hover:text-[#1A1A1A]'
              }`}
            >
              BUY
            </button>
            <button
              type="button"
              id="hero-bento-rent-btn"
              onClick={() => setActiveType('rent')}
              className={`flex-1 sm:flex-initial px-5 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer uppercase ${
                activeType === 'rent'
                  ? 'bg-white text-[#1A1A1A] shadow-sm'
                  : 'text-gray-500 hover:text-[#1A1A1A]'
              }`}
            >
              RENT
            </button>
          </div>

          {/* Search Input Field */}
          <input
            id="hero-bento-search-input"
            type="text"
            placeholder='Try "Toyota Fortuner", "MacBook", "Sofa", "Sony A7"...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:flex-grow bg-transparent outline-none px-3 py-2 text-sm text-[#1A1A1A] placeholder:text-gray-400 font-sans"
          />

          {/* Terracotta Search Button */}
          <button
            type="submit"
            id="hero-bento-search-submit-btn"
            className="w-full sm:w-auto bg-[#BF5B30] hover:bg-[#a64e29] text-white px-8 py-2.5 rounded-xl text-sm font-bold tracking-wide uppercase shadow-sm transition-all duration-200 cursor-pointer shrink-0"
          >
            Search
          </button>
        </form>
      </div>

      {/* 2. The Signature Bento Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 lg:gap-5 min-h-[580px]">
        
        {/* Tile 1: 2x2 Feature Spotlight - BMW 3 Series 2024 */}
        <div
          id="bento-tile-auto-spotlight"
          onClick={() => handleExecuteSearch('BMW 3 Series', 'all')}
          className="col-span-1 md:col-span-2 md:row-span-2 bg-[#E9E9E0] border border-gray-300 rounded-3xl overflow-hidden relative group cursor-pointer shadow-bento hover:shadow-bento-hover transition-all duration-300 min-h-[300px]"
        >
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
            alt="BMW 3 Series 2024"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Bottom Card Content */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex gap-2 mb-2">
              <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-widest text-white">
                Featured Auto
              </span>
              <span className="bg-[#BF5B30] px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-widest text-white shadow-sm">
                Verified
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-1 leading-tight text-white drop-shadow-sm">
              BMW 3 Series 2024
            </h3>
            <div className="flex flex-wrap items-baseline gap-4 mt-2">
              <span className="text-2xl sm:text-3xl font-bold font-sans text-white">₹42,50,000</span>
              <span className="text-xs sm:text-sm font-medium text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                Rent: ₹4,500/day
              </span>
            </div>
          </div>
        </div>

        {/* Tile 2: Rental Essentials - MacBook Pro 14" M3 */}
        <div
          id="bento-tile-rental-essentials"
          onClick={() => handleExecuteSearch('MacBook Pro', 'rent')}
          className="col-span-1 md:col-span-1 md:row-span-1 bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-between shadow-bento hover:shadow-bento-hover hover:border-[#BF5B30]/40 transition-all duration-300 cursor-pointer group"
        >
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
              Rental Essentials
            </span>
            <h4 className="text-xl font-serif text-[#1A1A1A] mt-2 group-hover:text-[#BF5B30] transition-colors">
              MacBook Pro 14” M3
            </h4>
          </div>
          <div className="flex justify-between items-end mt-4">
            <div className="text-xs">
              <p className="text-gray-400 uppercase text-[10px] tracking-wider font-semibold">Starts from</p>
              <p className="font-bold text-xl text-[#1A1A1A] font-sans">
                ₹1,200<span className="text-[10px] font-normal text-gray-500">/day</span>
              </p>
            </div>
            <div className="w-10 h-10 bg-[#F5F5F0] group-hover:bg-[#BF5B30] group-hover:text-white rounded-full flex items-center justify-center transition-colors text-[#1A1A1A]">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Tile 3: Design-Led Furniture (Dark Bento Tile) */}
        <div
          id="bento-tile-furniture"
          onClick={() => {
            if (onQuickCategory) onQuickCategory('furniture');
            else handleExecuteSearch('furniture', 'all');
          }}
          className="col-span-1 md:col-span-1 md:row-span-1 bg-[#1A1A1A] border border-gray-800 rounded-3xl p-6 text-white flex flex-col justify-between shadow-bento hover:shadow-bento-hover transition-all duration-300 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
            🛋️
          </div>
          <div>
            <h4 className="text-lg font-serif mb-1 text-white group-hover:text-amber-200 transition-colors">
              Design-Led Furniture
            </h4>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Discover 450+ modern pieces for your studio or home setup.
            </p>
          </div>
        </div>

        {/* Tile 4: Nearby Treasures - Canon EOS R6 Mark II */}
        <div
          id="bento-tile-nearby-treasures"
          onClick={() => handleExecuteSearch('Canon EOS R6', 'all')}
          className="col-span-1 md:col-span-2 md:row-span-1 bg-[#D9D9D0] border border-gray-300 rounded-3xl p-6 flex flex-col sm:flex-row gap-5 justify-between shadow-bento hover:shadow-bento-hover transition-all duration-300 cursor-pointer group"
        >
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-600 block">
                Nearby Treasures
              </span>
              <h4 className="text-xl font-serif text-[#1A1A1A] mt-1 group-hover:text-[#BF5B30] transition-colors">
                Canon EOS R6 Mark II
              </h4>
              <p className="text-xs text-gray-600 mt-1 font-sans">
                3.2 km away • Like New • With 24-70mm Lens
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleExecuteSearch('Canon EOS R6', 'buy');
                }}
                className="bg-white hover:bg-gray-50 text-[#1A1A1A] px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Buy for ₹1,85,000
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleExecuteSearch('Canon EOS R6', 'rent');
                }}
                className="border border-gray-400 hover:bg-white/40 text-[#1A1A1A] px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Rent Item
              </button>
            </div>
          </div>
          <div className="w-full sm:w-36 h-28 sm:h-auto bg-[#C5C5BF] rounded-2xl overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80"
              alt="Canon EOS Camera"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Tile 5: Have something to sell? (Dashed Creator Tile) */}
        <button
          type="button"
          id="bento-tile-post-listing"
          onClick={onOpenPostListing}
          className="col-span-1 md:col-span-1 md:row-span-1 border-2 border-dashed border-gray-300 hover:border-[#BF5B30] bg-[#F5F5F0] hover:bg-white rounded-3xl flex flex-col items-center justify-center p-6 text-center gap-2 transition-all duration-300 cursor-pointer group shadow-bento"
        >
          <div className="w-10 h-10 rounded-full bg-[#E9E9E0] group-hover:bg-[#BF5B30] group-hover:text-white flex items-center justify-center text-lg font-bold text-gray-500 transition-colors">
            +
          </div>
          <p className="text-sm font-serif text-[#1A1A1A] font-bold">Have something to sell?</p>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-sans">
            Start listing today and earn income.
          </p>
        </button>

        {/* Tile 6: Trending Now Live Tags */}
        <div
          id="bento-tile-trending"
          className="col-span-1 md:col-span-1 md:row-span-1 bg-white border border-gray-200 rounded-3xl p-5 flex flex-col justify-between shadow-bento"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Trending Now</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {['PlayStation 5', 'Dining Set', 'Mahindra Thar', 'Office Pods', 'Sony FX3'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleTagClick(item)}
                className="bg-[#F5F5F0] hover:bg-[#E9E9E0] text-[#1A1A1A] px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};

