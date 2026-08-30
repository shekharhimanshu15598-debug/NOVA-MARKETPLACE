import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Heart, 
  MessageSquare, 
  Plus, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Check, 
  Compass, 
  Layers, 
  ShoppingBag, 
  Repeat, 
  HelpCircle,
  BarChart3,
  LogOut,
  ShieldCheck,
  Building
} from 'lucide-react';
import { POPULAR_LOCATIONS } from '../data/mockData';

interface NavbarProps {
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
  favoritesCount: number;
  unreadMessagesCount: number;
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
  onOpenMessages: () => void;
  onOpenPostListing: () => void;
  onOpenSellerDashboard: () => void;
  onOpenAuth: () => void;
  onOpenHowItWorks: () => void;
  activeTab: string;
  onNavigateTab: (tab: string, filterOptions?: any) => void;
  user: { name: string; email: string; avatar: string } | null;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLocation,
  onSelectLocation,
  favoritesCount,
  unreadMessagesCount,
  onOpenSearch,
  onOpenFavorites,
  onOpenMessages,
  onOpenPostListing,
  onOpenSellerDashboard,
  onOpenAuth,
  onOpenHowItWorks,
  activeTab,
  onNavigateTab,
  user,
  onSignOut,
}) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = POPULAR_LOCATIONS.filter(loc => 
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <header className={`sticky top-0 z-40 transition-all duration-200 ${
      isScrolled ? 'bg-[#F5F5F0]/95 backdrop-blur-md shadow-bento border-b border-gray-300/80' : 'bg-[#F5F5F0] border-b border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Left: Brand Logo & Location */}
          <div className="flex items-center gap-6">
            <button
              id="navbar-brand-logo"
              onClick={() => onNavigateTab('home')}
              className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
            >
              <span className="text-3xl font-serif font-bold tracking-tight text-[#1A1A1A]">
                NOVA
              </span>
            </button>

            {/* Location Selector Trigger */}
            <div className="relative hidden md:block" ref={locationRef}>
              <button
                id="navbar-location-picker-btn"
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1A1A1A] bg-white hover:bg-gray-50 rounded-full border border-gray-200 shadow-sm transition-all cursor-pointer"
              >
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Near</span>
                <span className="font-semibold text-xs text-[#1A1A1A] max-w-[130px] truncate">{currentLocation}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {/* Location Selector Dropdown */}
              {isLocationOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-3xl shadow-modal border border-gray-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 py-1.5 mb-2 border-b border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Location</p>
                    <p className="text-xs font-semibold text-[#1A1A1A]">Discover listings near you</p>
                  </div>
                  
                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search city or state..."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="w-full bg-[#F5F5F0] border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#1A1A1A]"
                      autoFocus
                    />
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {filteredLocations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          onSelectLocation(loc);
                          setIsLocationOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors cursor-pointer text-left ${
                          currentLocation === loc ? 'bg-[#1A1A1A] text-white font-semibold' : 'text-[#1A1A1A] hover:bg-[#E9E9E0]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Building className="w-3.5 h-3.5 opacity-60" />
                          {loc}
                        </span>
                        {currentLocation === loc && <Check className="w-3.5 h-3.5 text-[#BF5B30]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2">
            <button
              id="nav-link-home"
              onClick={() => onNavigateTab('home')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'home' 
                  ? 'bg-[#1A1A1A] text-white shadow-sm' 
                  : 'text-gray-500 hover:text-[#1A1A1A] hover:bg-white/60'
              }`}
            >
              Home
            </button>
            <button
              id="nav-link-buy"
              onClick={() => onNavigateTab('browse', { type: 'buy' })}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'browse' && activeTab !== 'rent'
                  ? 'bg-[#1A1A1A] text-white' 
                  : 'text-gray-500 hover:text-[#1A1A1A] hover:bg-white/60'
              }`}
            >
              Buy
            </button>
            <button
              id="nav-link-rent"
              onClick={() => onNavigateTab('browse', { type: 'rent' })}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1A1A1A] hover:bg-white/60 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Rent</span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#BF5B30]/15 text-[#BF5B30] rounded-full">Rentals</span>
            </button>
            <button
              id="nav-link-categories"
              onClick={() => onNavigateTab('categories')}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1A1A1A] hover:bg-white/60 transition-all cursor-pointer"
            >
              Categories
            </button>
            <button
              id="nav-link-how-it-works"
              onClick={onOpenHowItWorks}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1A1A1A] hover:bg-white/60 transition-all cursor-pointer"
            >
              How It Works
            </button>
          </nav>

          {/* Right Action Icons & Post Listing */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger Button */}
            <button
              id="navbar-search-trigger-btn"
              onClick={onOpenSearch}
              className="p-2.5 text-gray-600 hover:text-[#1A1A1A] hover:bg-white rounded-full transition-colors cursor-pointer"
              aria-label="Search listings"
              title="Search anything"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Favorites Icon */}
            <button
              id="navbar-favorites-btn"
              onClick={onOpenFavorites}
              className="relative p-2.5 text-gray-600 hover:text-[#1A1A1A] hover:bg-white rounded-full transition-colors cursor-pointer"
              aria-label="Saved items"
              title="Saved items"
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#BF5B30] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Messages Icon */}
            <button
              id="navbar-messages-btn"
              onClick={onOpenMessages}
              className="relative p-2.5 text-gray-600 hover:text-[#1A1A1A] hover:bg-white rounded-full transition-colors cursor-pointer"
              aria-label="Chat messages"
              title="Messages"
            >
              <MessageSquare className="w-4 h-4" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#BF5B30] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <button
                  id="navbar-user-avatar-btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-white border border-gray-200 transition-all cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 mr-1 hidden sm:block" />
                </button>
              ) : (
                <button
                  id="navbar-sign-in-btn"
                  onClick={onOpenAuth}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-[#1A1A1A] hover:bg-white rounded-full border border-gray-200 transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* User Dropdown Menu */}
              {isUserMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-3xl shadow-modal border border-gray-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2.5 border-b border-gray-100 mb-1">
                    <p className="text-sm font-bold text-[#1A1A1A] truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#BF5B30] bg-[#BF5B30]/10 px-2 py-0.5 rounded-full w-fit">
                      <ShieldCheck className="w-3 h-3" /> Verified Member
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <button
                      onClick={() => {
                        onOpenSellerDashboard();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-[#1A1A1A] hover:bg-[#F5F5F0] rounded-xl transition-colors cursor-pointer text-left"
                    >
                      <BarChart3 className="w-4 h-4 text-gray-500" />
                      Seller Dashboard
                    </button>
                    <button
                      onClick={() => {
                        onOpenFavorites();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-[#1A1A1A] hover:bg-[#F5F5F0] rounded-xl transition-colors cursor-pointer text-left"
                    >
                      <Heart className="w-4 h-4 text-gray-500" />
                      My Saved Items ({favoritesCount})
                    </button>
                    <button
                      onClick={() => {
                        onOpenMessages();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-[#1A1A1A] hover:bg-[#F5F5F0] rounded-xl transition-colors cursor-pointer text-left"
                    >
                      <MessageSquare className="w-4 h-4 text-gray-500" />
                      Messages ({unreadMessagesCount})
                    </button>
                    
                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={() => {
                        onSignOut();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Post Listing Primary CTA */}
            <button
              id="navbar-post-listing-btn"
              onClick={onOpenPostListing}
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#1A1A1A] hover:bg-black text-white rounded-full text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Post Listing</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="navbar-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-700 hover:text-zinc-950 lg:hidden rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold text-zinc-800">{currentLocation}</span>
            </div>
            <button
              onClick={() => {
                setIsLocationOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-xs text-emerald-700 font-semibold underline"
            >
              Change
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onNavigateTab('home');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-800 font-medium text-xs text-left"
            >
              <Compass className="w-4 h-4 text-zinc-600" />
              Explore All
            </button>
            <button
              onClick={() => {
                onNavigateTab('browse', { type: 'buy' });
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-800 font-medium text-xs text-left"
            >
              <ShoppingBag className="w-4 h-4 text-zinc-600" />
              Buy Items
            </button>
            <button
              onClick={() => {
                onNavigateTab('browse', { type: 'rent' });
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-800 font-medium text-xs text-left"
            >
              <Repeat className="w-4 h-4 text-emerald-600" />
              Rent Gear
            </button>
            <button
              onClick={() => {
                onNavigateTab('categories');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-800 font-medium text-xs text-left"
            >
              <Layers className="w-4 h-4 text-zinc-600" />
              Categories
            </button>
          </div>

          <div className="pt-2 border-t border-zinc-100 space-y-2">
            <button
              onClick={() => {
                onOpenSellerDashboard();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
            >
              <span className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-zinc-500" />
                Seller Dashboard
              </span>
            </button>
            <button
              onClick={() => {
                onOpenHowItWorks();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-zinc-500" />
                How NOVA Works
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
