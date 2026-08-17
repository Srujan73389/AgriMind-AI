export type MarketplaceCategory = 'equipment' | 'supplies' | 'crops' | 'services';

export type ListingType = 'rent' | 'buy' | 'service';

export interface Seller {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  reviewsCount: number;
  location: string;
  distanceMiles: number;
  isVerified: boolean;
  phone: string;
}

export interface Listing {
  id: string;
  title: string;
  category: MarketplaceCategory;
  type: ListingType;
  price: number;
  priceUnit: string; // e.g. '/ day', '/ quintal', '/ acre', '/ bag'
  imageUrl: string;
  galleryUrls?: string[];
  description: string;
  specs: Record<string, string>;
  seller: Seller;
  location: string;
  distanceMiles: number;
  isVerifiedItem: boolean;
  aiRecommendedFor?: string;
  seedGroup?: string;
  seedSubCategory?: string;
  minHpRequired?: number; // Minimum tractor HP needed for implements
  maxHpRequired?: number; // Maximum tractor HP range for implements
  fuelBurnLitersPerHour?: number; // Estimated diesel burn rate
  stockAvailable?: number;
  operatorAvailable?: boolean;
  rating: number;
  reviewsCount: number;
  createdDate: string;
}

export interface CartItem {
  listing: Listing;
  quantity: number;
  rentalDays?: number;
  startDate?: string;
  endDate?: string;
  includeOperator?: boolean;
}

export interface FilterState {
  searchQuery: string;
  category: MarketplaceCategory | 'all';
  type: ListingType | 'all';
  maxDistanceMiles: number;
  minPrice: number;
  maxPrice: number;
  onlyAiRecommended: boolean;
  onlyVerified: boolean;
  selectedSeedSubCategory?: string;
  tractorHpFilter?: number | null;
}

export interface AiMatchRequest {
  crop: string;
  acres: number;
  soilType: string;
  tractorHp: number;
}
