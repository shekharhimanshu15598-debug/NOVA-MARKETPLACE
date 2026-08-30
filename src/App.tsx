import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryExplorer } from './components/CategoryExplorer';
import { FeaturedAutomobiles } from './components/FeaturedAutomobiles';
import { TrendingElectronics } from './components/TrendingElectronics';
import { CuratedLivingSpaces } from './components/CuratedLivingSpaces';
import { DedicatedRentalSection } from './components/DedicatedRentalSection';
import { NearbyListings } from './components/NearbyListings';
import { LifestyleDiscovery } from './components/LifestyleDiscovery';
import { TrustAndSafety } from './components/TrustAndSafety';
import { CommunityReviews } from './components/CommunityReviews';
import { AppPromotion } from './components/AppPromotion';
import { Footer } from './components/Footer';

// Modals and Views
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchBrowseView } from './components/SearchBrowseView';
import { PostListingWizardModal } from './components/PostListingWizardModal';
import { SellerDashboardModal } from './components/SellerDashboardModal';
import { MessagesModal } from './components/MessagesModal';
import { FavoritesModal } from './components/FavoritesModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { SellerProfileModal } from './components/SellerProfileModal';

// Mock Data & Types
import { ALL_LISTINGS, MOCK_THREADS } from './data/mockData';
import { FilterState, Listing, MessageThread } from './types';
import { Check, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<'all' | 'buy' | 'rent' | 'cars' | 'electronics' | 'furniture'>('all');
  const [isBrowseMode, setIsBrowseMode] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Patna, Bihar');

  // Listings data state
  const [listings, setListings] = useState<Listing[]>(ALL_LISTINGS);
  const [favorites, setFavorites] = useState<string[]>(['car-1', 'elec-1', 'cam-1']);
  const [threads, setThreads] = useState<MessageThread[]>(MOCK_THREADS);

  // Search and Filter State
  const [searchFilters, setSearchFilters] = useState<Partial<FilterState>>({
    searchQuery: '',
    category: 'all',
    type: 'all',
  });

  // Modal State
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [isPostListingOpen, setIsPostListingOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3800);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
      showToast('Removed from saved wishlist');
    } else {
      setFavorites([...favorites, id]);
      showToast('Saved to your favorites wishlist ❤️');
    }
  };

  // Search trigger from Hero or Navbar
  const handleSearchSubmit = (query: string, category: string, type: 'all' | 'buy' | 'rent') => {
    setSearchFilters({
      searchQuery: query,
      category,
      type,
    });
    setIsBrowseMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category select trigger from Explorer
  const handleCategorySelect = (categorySlug: string) => {
    if (categorySlug === 'all') {
      setSearchFilters({ category: 'all' });
    } else {
      setSearchFilters({ category: categorySlug });
    }
    setIsBrowseMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tab switch trigger from Navbar
  const handleTabSelect = (tab: 'all' | 'buy' | 'rent' | 'cars' | 'electronics' | 'furniture') => {
    setActiveTab(tab);
    if (tab === 'all') {
      setIsBrowseMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'buy') {
      setSearchFilters({ type: 'buy', category: 'all', searchQuery: '' });
      setIsBrowseMode(true);
    } else if (tab === 'rent') {
      setSearchFilters({ type: 'rent', category: 'all', searchQuery: '' });
      setIsBrowseMode(true);
    } else if (tab === 'cars') {
      setSearchFilters({ category: 'cars', searchQuery: '' });
      setIsBrowseMode(true);
    } else if (tab === 'electronics') {
      setSearchFilters({ category: 'electronics', searchQuery: '' });
      setIsBrowseMode(true);
    } else if (tab === 'furniture') {
      setSearchFilters({ category: 'furniture', searchQuery: '' });
      setIsBrowseMode(true);
    }
  };

  // Add listing from Wizard
  const handleAddListing = (newListing: Listing) => {
    setListings([newListing, ...listings]);
    setSelectedListing(newListing);
  };

  // Contact seller and initiate thread
  const handleContactSeller = (listing: Listing) => {
    // Check if thread already exists
    let existingThread = threads.find((t) => t.listing.id === listing.id);
    if (!existingThread) {
      existingThread = {
        id: `thread-${Date.now()}`,
        listing: {
          id: listing.id,
          title: listing.title,
          buyPrice: listing.buyPrice,
          rentPrice: listing.rentPrice,
          rentPeriod: listing.rentPeriod,
          image: listing.images[0],
        },
        otherUser: {
          id: listing.seller.id,
          name: listing.seller.name,
          avatar: listing.seller.avatar,
          isOnline: true,
          isVerified: listing.seller.isVerified,
        },
        lastMessage: 'Hi! Is this item available for inspection?',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: 'user-me',
            text: `Hi ${listing.seller.name}! I am interested in your "${listing.title}". Is it available for inspection this week?`,
            time: 'Just now',
          },
        ],
      };
      setThreads([existingThread, ...threads]);
    }
    setIsMessagesOpen(true);
  };

  // Send message in thread with automatic simulated response
  const handleSendMessage = (threadId: string, text: string) => {
    const updated = threads.map((thread) => {
      if (thread.id === threadId) {
        const newMsg = {
          id: `msg-${Date.now()}`,
          senderId: 'user-me',
          text,
          time: 'Just now',
        };
        return {
          ...thread,
          lastMessage: text,
          lastMessageTime: 'Just now',
          messages: [...thread.messages, newMsg],
        };
      }
      return thread;
    });
    setThreads(updated);

    // Simulated reply after 1.5 seconds
    setTimeout(() => {
      setThreads((current) =>
        current.map((t) => {
          if (t.id === threadId) {
            const replies = [
              'Thanks for your interest! Yes, it is fully available and ready for handover.',
              'I have all original documents and warranty cards ready. When would you like to meet?',
              'Sounds good! You can lock in the escrow deposit and we can schedule the inspection right away.',
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            return {
              ...t,
              lastMessage: randomReply,
              lastMessageTime: 'Just now',
              messages: [
                ...t.messages,
                {
                  id: `reply-${Date.now()}`,
                  senderId: t.otherUser.id,
                  text: randomReply,
                  time: 'Just now',
                },
              ],
            };
          }
          return t;
        })
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] font-sans antialiased flex flex-col selection:bg-[#BF5B30] selection:text-white">
      
      {/* 1. Global Announcement Banner */}
      <AnnouncementBar
        onOpenRentals={() => handleTabSelect('rent')}
        onOpenPostListing={() => setIsPostListingOpen(true)}
      />

      {/* 2. Primary Navigation Bar */}
      <Navbar
        currentLocation={currentLocation}
        onSelectLocation={setCurrentLocation}
        activeTab={activeTab}
        onSelectTab={handleTabSelect}
        favoritesCount={favorites.length}
        unreadMessagesCount={threads.reduce((acc, t) => acc + (t.unreadCount || 0), 1)}
        onOpenSearch={() => {
          setIsBrowseMode(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenMessages={() => setIsMessagesOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenPostListing={() => setIsPostListingOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {isBrowseMode ? (
          /* Search & Filter Browse Page */
          <SearchBrowseView
            listings={listings}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectListing={setSelectedListing}
            initialFilters={searchFilters}
            onResetToHome={() => {
              setIsBrowseMode(false);
              setActiveTab('all');
            }}
          />
        ) : (
          /* Editorial Homepage Layout */
          <>
            {/* 3. Hero Section with Live Background & Search Engine */}
            <HeroSection
              onSearch={handleSearchSubmit}
              onQuickCategory={handleCategorySelect}
              onOpenPostListing={() => setIsPostListingOpen(true)}
            />

            {/* 4. Category Grid Explorer */}
            <CategoryExplorer onSelectCategory={handleCategorySelect} />

            {/* 5. Featured Automobiles Showcase (Hero Car Carousel) */}
            <FeaturedAutomobiles
              listings={listings}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectListing={setSelectedListing}
              onViewAllCars={() => {
                setSearchFilters({ category: 'cars', type: 'all' });
                setIsBrowseMode(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 6. Trending Electronics & Pro Gear Carousel */}
            <TrendingElectronics
              listings={listings}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectListing={setSelectedListing}
              onViewAllElectronics={() => {
                setSearchFilters({ category: 'electronics', type: 'all' });
                setIsBrowseMode(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 7. Curated Living Spaces (Interactive Hotspots) */}
            <CuratedLivingSpaces
              onSelectListing={setSelectedListing}
              onViewFurniture={() => {
                setSearchFilters({ category: 'furniture', type: 'all' });
                setIsBrowseMode(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 8. Dedicated Rental Section (Daily / Weekly / Monthly Filter) */}
            <DedicatedRentalSection
              listings={listings}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectListing={setSelectedListing}
              onViewAllRentals={() => {
                setSearchFilters({ type: 'rent', category: 'all' });
                setIsBrowseMode(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 9. Location-Aware Nearby Listings */}
            <NearbyListings
              listings={listings}
              currentLocation={currentLocation}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectListing={setSelectedListing}
              onViewAllNearby={() => {
                setSearchFilters({ category: 'all', type: 'all' });
                setIsBrowseMode(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 10. Lifestyle Discovery Editorial Guides */}
            <LifestyleDiscovery onSelectStoryCategory={handleCategorySelect} />

            {/* 11. Trust, Escrow & Safety Proof */}
            <TrustAndSafety />

            {/* 12. Verified Community Reviews */}
            <CommunityReviews />

            {/* 13. Mobile App Showcase & Newsletter */}
            <AppPromotion onShowToast={showToast} />
          </>
        )}
      </main>

      {/* 14. Comprehensive Multi-column Footer */}
      <Footer
        onNavigateCategory={handleCategorySelect}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenPostListing={() => setIsPostListingOpen(true)}
      />

      {/* Floating Bottom Toast Notification */}
      {toastMessage && (
        <div
          id="global-toast-notification"
          className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-5 py-3 rounded-2xl shadow-modal flex items-center gap-3 border border-gray-800 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="w-5 h-5 rounded-full bg-[#BF5B30] text-white flex items-center justify-center font-bold text-xs">
            ✓
          </div>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Product & Vehicle Detail Modal */}
      {selectedListing && (
        <ProductDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          isFavorite={favorites.includes(selectedListing.id)}
          onToggleFavorite={handleToggleFavorite}
          onContactSeller={handleContactSeller}
          onOpenSellerProfile={(sellerId) => {
            setSelectedListing(null);
            setSelectedSellerId(sellerId);
          }}
          onShowToast={showToast}
        />
      )}

      {/* Post a Listing Creator Wizard Modal */}
      {isPostListingOpen && (
        <PostListingWizardModal
          onClose={() => setIsPostListingOpen(false)}
          onAddListing={handleAddListing}
          onShowToast={showToast}
          userLocation={currentLocation}
        />
      )}

      {/* Seller & Host Dashboard Modal */}
      {isDashboardOpen && (
        <SellerDashboardModal
          onClose={() => setIsDashboardOpen(false)}
          userListings={listings.filter((l) => l.seller.id === 'seller-1' || l.seller.id === 'seller-user-me')}
          onOpenPostListing={() => setIsPostListingOpen(true)}
          onShowToast={showToast}
        />
      )}

      {/* Real-time Messages Modal */}
      {isMessagesOpen && (
        <MessagesModal
          onClose={() => setIsMessagesOpen(false)}
          threads={threads}
          onSendMessage={handleSendMessage}
          onShowToast={showToast}
        />
      )}

      {/* Wishlist Favorites Modal */}
      {isFavoritesOpen && (
        <FavoritesModal
          onClose={() => setIsFavoritesOpen(false)}
          favorites={favorites}
          allListings={listings}
          onToggleFavorite={handleToggleFavorite}
          onSelectListing={setSelectedListing}
          onBrowseAll={() => {
            setIsFavoritesOpen(false);
            setIsBrowseMode(true);
          }}
        />
      )}

      {/* How It Works Guide Modal */}
      {isHowItWorksOpen && (
        <HowItWorksModal
          onClose={() => setIsHowItWorksOpen(false)}
          onOpenPostListing={() => {
            setIsHowItWorksOpen(false);
            setIsPostListingOpen(true);
          }}
        />
      )}

      {/* Seller Profile Showcase Modal */}
      {selectedSellerId && (
        <SellerProfileModal
          sellerId={selectedSellerId}
          allListings={listings}
          onClose={() => setSelectedSellerId(null)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectListing={setSelectedListing}
          onContactSeller={handleContactSeller}
        />
      )}

    </div>
  );
}
