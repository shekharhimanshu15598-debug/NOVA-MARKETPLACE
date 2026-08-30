import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Map as MapIcon, 
  Grid as GridIcon, 
  SlidersHorizontal, 
  Search, 
  X, 
  MapPin, 
  ShieldCheck, 
  RotateCcw, 
  ArrowUpDown, 
  Check, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { FilterState, Listing } from '../types';
import { ProductCard } from './ProductCard';
import { formatINR } from '../utils/formatters';

interface SearchBrowseViewProps {
  listings: Listing[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
  initialFilters: Partial<FilterState>;
  onResetToHome: () => void;
}

export const SearchBrowseView: React.FC<SearchBrowseViewProps> = ({
  listings,
  favorites,
  onToggleFavorite,
  onSelectListing,
  initialFilters,
  onResetToHome,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedMapPin, setSelectedMapPin] = useState<Listing | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState(initialFilters.searchQuery || '');
  const [listingType, setListingType] = useState<'all' | 'buy' | 'rent'>(initialFilters.type || 'all');
  const [category, setCategory] = useState(initialFilters.category || 'all');
  const [subcategory, setSubcategory] = useState(initialFilters.subcategory || 'all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(20000000);
  const [condition, setCondition] = useState<string>('all');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'newest' | 'rating'>('recommended');

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === category);

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesBrand = item.brand?.toLowerCase().includes(q);
        const matchesCity = item.location.city.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesBrand && !matchesCity) return false;
      }

      // Type (Buy / Rent)
      if (listingType === 'buy' && item.buyPrice === undefined) return false;
      if (listingType === 'rent' && !item.rentPrice) return false;

      // Category
      if (category !== 'all' && item.category !== category) return false;

      // Subcategory
      if (subcategory !== 'all' && item.subcategory !== subcategory) return false;

      // Condition
      if (condition !== 'all' && item.condition !== condition) return false;

      // Verified only
      if (verifiedOnly && !item.seller.isVerified) return false;

      // Price
      const comparePrice = listingType === 'rent' && item.rentPrice ? item.rentPrice : item.buyPrice;
      if (comparePrice < minPrice || comparePrice > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        const pA = listingType === 'rent' && a.rentPrice ? a.rentPrice : a.buyPrice;
        const pB = listingType === 'rent' && b.rentPrice ? b.rentPrice : b.buyPrice;
        return pA - pB;
      }
      if (sortBy === 'price-high') {
        const pA = listingType === 'rent' && a.rentPrice ? a.rentPrice : a.buyPrice;
        const pB = listingType === 'rent' && b.rentPrice ? b.rentPrice : b.buyPrice;
        return pB - pA;
      }
      if (sortBy === 'rating') {
        return b.seller.rating - a.seller.rating;
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // Default: recommended / featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [listings, searchQuery, listingType, category, subcategory, condition, verifiedOnly, minPrice, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setListingType('all');
    setCategory('all');
    setSubcategory('all');
    setMinPrice(0);
    setMaxPrice(20000000);
    setCondition('all');
    setVerifiedOnly(false);
    setSortBy('recommended');
  };

  return (
    <div id="search-browse-view" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Top Search Controls Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-bento border border-gray-200 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Query Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="browse-search-input"
              type="text"
              placeholder="Search across all listings, cars, gadgets, furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F5F0] border border-gray-200 rounded-2xl pl-10 pr-8 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#BF5B30] text-[#1A1A1A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters (Buy / Rent / All) */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <div className="p-1 bg-[#F5F5F0] rounded-2xl flex items-center shrink-0 border border-gray-200">
              <button
                onClick={() => setListingType('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  listingType === 'all' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-gray-600 hover:text-[#1A1A1A]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setListingType('buy')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  listingType === 'buy' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-gray-600 hover:text-[#1A1A1A]'
                }`}
              >
                For Sale
              </button>
              <button
                onClick={() => setListingType('rent')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  listingType === 'rent' ? 'bg-[#BF5B30] text-white shadow-sm' : 'text-gray-600 hover:text-[#1A1A1A]'
                }`}
              >
                For Rent
              </button>
            </div>

            {/* View Mode Toggle (Grid vs Map) */}
            <div className="p-1 bg-[#F5F5F0] rounded-2xl flex items-center shrink-0 border border-gray-200">
              <button
                id="view-mode-grid-btn"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-gray-500 hover:text-[#1A1A1A]'
                }`}
                title="Grid View"
              >
                <GridIcon className="w-4 h-4" />
              </button>
              <button
                id="view-mode-map-btn"
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
                  viewMode === 'map' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-gray-500 hover:text-[#1A1A1A]'
                }`}
                title="Map View"
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-3.5 py-2 bg-[#F5F5F0] text-gray-800 rounded-2xl text-xs font-bold flex items-center gap-1.5 border border-gray-200"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

        </div>

        {/* Results Counter & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t border-gray-100 gap-2">
          <div className="text-xs text-gray-500 font-medium">
            Showing <span className="font-bold text-[#1A1A1A]">{filteredListings.length}</span> results
            {category !== 'all' && (
              <span> in <strong className="text-[#1A1A1A]">{activeCategoryObj?.name}</strong></span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#F5F5F0] border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
            >
              <option value="recommended">Recommended & Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Listed</option>
              <option value="rating">Top Rated Sellers</option>
            </select>
          </div>
        </div>

      </div>

      {/* Main Content Layout (Sidebar + Results) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Filter Sidebar (Desktop 3 Cols / Mobile Drawer) */}
        <aside className={`lg:col-span-3 bg-white rounded-3xl p-6 border border-gray-200 shadow-bento space-y-6 ${
          isMobileFilterOpen ? 'block' : 'hidden lg:block'
        }`}>
          
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#BF5B30]" />
              <h3 className="font-serif font-bold text-sm text-[#1A1A1A] uppercase tracking-wider">
                Refine Search
              </h3>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-[#BF5B30] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Category
            </label>
            <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
              <button
                onClick={() => {
                  setCategory('all');
                  setSubcategory('all');
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                  category === 'all' ? 'bg-[#1A1A1A] text-white font-bold' : 'text-gray-700 hover:bg-[#F5F5F0]'
                }`}
              >
                <span>All Categories</span>
                <span>{listings.length}</span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.slug);
                    setSubcategory('all');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                    category === cat.slug ? 'bg-[#1A1A1A] text-white font-bold' : 'text-gray-700 hover:bg-[#F5F5F0]'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] opacity-75">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subcategories (if a category is active) */}
          {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Subcategory
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSubcategory('all')}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                    subcategory === 'all' ? 'bg-[#F5F5F0] font-bold text-[#1A1A1A]' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All {activeCategoryObj.name}
                </button>
                {activeCategoryObj.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubcategory(sub)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                      subcategory === sub ? 'bg-[#F5F5F0] font-bold text-[#1A1A1A]' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Condition Filter */}
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Condition
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {['all', 'Brand New', 'Like New', 'Excellent', 'Good'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setCondition(cond)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                    condition === cond
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-[#F5F5F0] text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {cond === 'all' ? 'Any' : cond}
                </button>
              ))}
            </div>
          </div>

          {/* Verified Seller Only Toggle */}
          <div className="pt-4 border-t border-gray-100">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#BF5B30]" />
                <span className="text-xs font-bold text-[#1A1A1A]">Verified Sellers Only</span>
              </div>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 accent-[#BF5B30] rounded cursor-pointer"
              />
            </label>
          </div>

        </aside>

        {/* Results Container (9 Cols) */}
        <main className="lg:col-span-9">
          
          {/* MAP VIEW */}
          {viewMode === 'map' && (
            <div className="space-y-6">
              
              {/* Interactive Visual Map Box with Pins */}
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-ambient border border-zinc-300 bg-zinc-900">
                {/* Styled Map Graphic Background */}
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80"
                  alt="City Map View"
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-black/30" />

                {/* Map Control overlay info */}
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-zinc-900 shadow-md flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{filteredListings.length} listings pinpointed in your region</span>
                </div>

                {/* Mock Interactive Markers on Map */}
                <div className="absolute inset-0 pointer-events-auto">
                  {filteredListings.slice(0, 8).map((listing, idx) => {
                    const topPos = 25 + ((idx * 17) % 55);
                    const leftPos = 20 + ((idx * 23) % 65);
                    return (
                      <button
                        key={listing.id}
                        onClick={() => setSelectedMapPin(listing)}
                        style={{ top: `${topPos}%`, left: `${leftPos}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-xs font-extrabold shadow-modal transition-transform hover:scale-110 flex items-center gap-1 cursor-pointer ${
                          selectedMapPin?.id === listing.id
                            ? 'bg-emerald-600 text-white ring-4 ring-white/50 z-30 scale-110'
                            : 'bg-zinc-950 text-white hover:bg-zinc-800 z-20'
                        }`}
                      >
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{formatINR(listing.buyPrice)}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Map Pin Card Preview */}
                {selectedMapPin && (
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 z-30 animate-in fade-in slide-in-from-bottom-2 duration-150">
                    <div className="bg-white rounded-2xl p-3 shadow-modal border border-zinc-200 flex gap-3 items-center">
                      <img
                        src={selectedMapPin.images[0]}
                        alt={selectedMapPin.title}
                        className="w-20 h-20 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">{selectedMapPin.category}</span>
                        <h4 className="text-xs font-bold text-zinc-900 truncate">{selectedMapPin.title}</h4>
                        <div className="flex justify-between items-baseline mt-1">
                          <span className="text-sm font-extrabold text-zinc-950">{formatINR(selectedMapPin.buyPrice)}</span>
                          <button
                            onClick={() => onSelectListing(selectedMapPin)}
                            className="text-xs font-bold text-emerald-800 hover:underline"
                          >
                            Details →
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedMapPin(null)}
                        className="p-1 text-zinc-400 hover:text-zinc-700 self-start"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Grid beneath Map */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredListings.map((listing) => (
                  <ProductCard
                    key={listing.id}
                    listing={listing}
                    isFavorite={favorites.includes(listing.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelectListing={onSelectListing}
                  />
                ))}
              </div>

            </div>
          )}

          {/* GRID VIEW */}
          {viewMode === 'grid' && (
            <>
              {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredListings.map((listing) => (
                    <ProductCard
                      key={listing.id}
                      listing={listing}
                      isFavorite={favorites.includes(listing.id)}
                      onToggleFavorite={onToggleFavorite}
                      onSelectListing={onSelectListing}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 shadow-ambient max-w-md mx-auto my-8">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 font-manrope">
                    No matching listings found
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 font-dmsans">
                    Try broadening your search keywords, adjusting the price filters, or clearing the condition filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-5 px-5 py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </>
          )}

        </main>

      </div>

    </div>
  );
};
