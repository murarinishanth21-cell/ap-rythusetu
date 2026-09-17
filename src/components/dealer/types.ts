export interface DealerUser {
  id: string;
  name: string;
  role: 'dealer';
  district: string;
  mobile: string;
  avatarInitials: string;
}

export interface FarmerListing {
  id: string;
  farmerName: string;
  farmerInitials: string;
  mandal: string;
  district: string;
  cropName: string;
  cropVariety: string;
  grade: string;
  image: string;
  availableVolumeQuintals: number;
  askingPricePerQuintal: number;
  listedTime: string;
  verified: boolean;
  dealsCount: number;
  rating: number;
  completionRate: number;
}

export interface MarketPricePoint {
  date: string;
  price: number;
}

export interface CropMarketOverview {
  id: string;
  cropName: string;
  grade: string;
  image: string;
  currentPrice: number;
  previousPrice: number;
  changePct: number;
  volumeQuintals: number;
  demand: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Inactive';
}

export interface PriceAlertItem {
  id: string;
  cropName: string;
  grade: string;
  iconType: string;
  condition: 'Price Above' | 'Price Below';
  targetPrice: number;
  currentPrice: number;
  status: 'Active' | 'Triggered' | 'Inactive';
  lastUpdated: string;
  actionText: string;
}

export interface RecentAlertLog {
  id: string;
  time: string;
  cropName: string;
  grade: string;
  alertType: 'Price Above' | 'Price Below';
  price: number;
  changePct: number;
  status: 'Triggered' | 'Active';
}

export interface StockInventoryItem {
  id: string;
  sku: string;
  cropName: string;
  image: string;
  grade: string;
  unit: string;
  currentStock: number;
  minStock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
  warehouse: string;
}

export interface NegotiationOffer {
  id: string;
  dateTime: string;
  offeredPrice: number;
  quantity: number;
  status: 'Pending' | 'Rejected' | 'Accepted';
  message: string;
}
