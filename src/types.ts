export type ListingType = 'buy' | 'rent' | 'both';

export type RentPeriod = 'hour' | 'day' | 'week' | 'month';

export type ItemCondition = 'Brand New' | 'Like New' | 'Excellent' | 'Good' | 'Fair';

export interface SellerProfile {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  responseTime: string;
  responseRate: string;
  memberSince: string;
  bio?: string;
}

export interface Listing {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  type: ListingType;
  condition: ItemCondition;
  buyPrice: number;
  rentPrice?: number;
  rentPeriod?: RentPeriod;
  securityDeposit?: number;
  images: string[];
  description: string;
  brand?: string;
  model?: string;
  year?: number;
  specs: Record<string, string>;
  features: string[];
  location: {
    city: string;
    state: string;
    area: string;
    distanceMiles?: number;
    coordinates?: [number, number];
  };
  seller: SellerProfile;
  isFeatured?: boolean;
  isAvailable?: boolean;
  views: number;
  favoritesCount: number;
  status: 'active' | 'pending' | 'sold' | 'rented' | 'draft';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  count: number;
  subcategories: string[];
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorLocation?: string;
  rating: number;
  date: string;
  text: string;
  listingTitle: string;
  verifiedPurchase: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isOffer?: boolean;
  offerAmount?: number;
  offerType?: 'buy' | 'rent';
}

export interface MessageThread {
  id: string;
  otherUser: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  listing: {
    id: string;
    title: string;
    image: string;
    buyPrice: number;
    rentPrice?: number;
    rentPeriod?: RentPeriod;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface RentalBookingRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  renterName: string;
  renterAvatar: string;
  startDate: string;
  endDate: string;
  days: number;
  dailyRate: number;
  securityDeposit: number;
  serviceFee: number;
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestedAt: string;
}

export interface FilterState {
  searchQuery: string;
  type: 'all' | 'buy' | 'rent';
  category: string;
  subcategory: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  condition: string;
  brand: string;
  verifiedOnly: boolean;
  sortBy: 'recommended' | 'newest' | 'price-low' | 'price-high' | 'nearest' | 'rating';
}
