import type {
  DealerUser,
  FarmerListing,
  CropMarketOverview,
  PriceAlertItem,
  RecentAlertLog,
  StockInventoryItem,
  NegotiationOffer
} from './types';
import { DISTRICT_DATA, normalizeDistrictName, getCropImage } from '../../districtData';

export const CURRENT_DEALER: DealerUser = {
  id: "AP-DLR-2026-3044",
  name: "Sri Balaji Agro Traders",
  role: "dealer",
  district: "Guntur",
  mobile: "9848033442",
  avatarInitials: "SB"
};

export const INITIAL_MARKET_OVERVIEWS: CropMarketOverview[] = [
  {
    id: "cmo-1",
    cropName: "Guntur Sannam Chilli",
    grade: "Teja Supreme S17",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600&auto=format&fit=crop",
    currentPrice: 18500,
    previousPrice: 17980,
    changePct: 3.0,
    volumeQuintals: 150,
    demand: "High",
    status: "Active"
  },
  {
    id: "cmo-2",
    cropName: "Guntur Chilli",
    grade: "334",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600&auto=format&fit=crop",
    currentPrice: 17200,
    previousPrice: 16850,
    changePct: 2.1,
    volumeQuintals: 280,
    demand: "High",
    status: "Active"
  },
  {
    id: "cmo-3",
    cropName: "Tobacco (FCV)",
    grade: "Grade A",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=600&auto=format&fit=crop",
    currentPrice: 4850,
    previousPrice: 4900,
    changePct: -1.0,
    volumeQuintals: 320,
    demand: "Medium",
    status: "Active"
  },
  {
    id: "cmo-4",
    cropName: "Turmeric",
    grade: "Premium",
    image: "/images/crops/turmeric.jpg",
    currentPrice: 9200,
    previousPrice: 8850,
    changePct: 4.0,
    volumeQuintals: 95,
    demand: "High",
    status: "Active"
  },
  {
    id: "cmo-5",
    cropName: "Maize",
    grade: "FAQ",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
    currentPrice: 2150,
    previousPrice: 2120,
    changePct: 1.4,
    volumeQuintals: 410,
    demand: "Medium",
    status: "Active"
  }
];

export const INITIAL_FARMER_LISTINGS: FarmerListing[] = [
  {
    id: "lst-1",
    farmerName: "Venkata Ramana",
    farmerInitials: "VR",
    mandal: "Amaravathi Mandal",
    district: "Guntur",
    cropName: "Guntur Sannam Chilli",
    cropVariety: "Teja Supreme S17",
    grade: "Grade A1",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600&auto=format&fit=crop",
    availableVolumeQuintals: 150,
    askingPricePerQuintal: 18500,
    listedTime: "Today, 09:30 AM",
    verified: true,
    dealsCount: 12,
    rating: 4.8,
    completionRate: 100
  },
  {
    id: "lst-2",
    farmerName: "Siva Kumar",
    farmerInitials: "SK",
    mandal: "Tenali Mandal",
    district: "Guntur",
    cropName: "Paddy (BPT 5204)",
    cropVariety: "FAQ",
    grade: "Grade A",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
    availableVolumeQuintals: 300,
    askingPricePerQuintal: 2150,
    listedTime: "Today, 08:15 AM",
    verified: true,
    dealsCount: 19,
    rating: 4.9,
    completionRate: 98
  },
  {
    id: "lst-3",
    farmerName: "Lakshmi Rao",
    farmerInitials: "LR",
    mandal: "Ponnur Mandal",
    district: "Guntur",
    cropName: "Turmeric",
    cropVariety: "Premium",
    grade: "Grade A",
    image: "/images/crops/turmeric.jpg",
    availableVolumeQuintals: 95,
    askingPricePerQuintal: 9200,
    listedTime: "Yesterday, 05:20 PM",
    verified: true,
    dealsCount: 8,
    rating: 4.7,
    completionRate: 100
  },
  {
    id: "lst-4",
    farmerName: "Madhavi Prasad",
    farmerInitials: "MP",
    mandal: "Mangalagiri Mandal",
    district: "Guntur",
    cropName: "Guntur Chilli",
    cropVariety: "334",
    grade: "Grade A",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600&auto=format&fit=crop",
    availableVolumeQuintals: 280,
    askingPricePerQuintal: 17200,
    listedTime: "Yesterday, 02:10 PM",
    verified: true,
    dealsCount: 15,
    rating: 4.8,
    completionRate: 96
  },
  {
    id: "lst-5",
    farmerName: "Ramesh Kumar",
    farmerInitials: "RK",
    mandal: "Tadikonda Mandal",
    district: "Guntur",
    cropName: "Cotton (Kapas)",
    cropVariety: "MCU-5 Long Staple",
    grade: "Grade A",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=600&auto=format&fit=crop",
    availableVolumeQuintals: 220,
    askingPricePerQuintal: 7600,
    listedTime: "6 Sep 2025",
    verified: true,
    dealsCount: 22,
    rating: 4.9,
    completionRate: 100
  },
  {
    id: "lst-6",
    farmerName: "K. Venkateswarlu",
    farmerInitials: "KV",
    mandal: "Kovvur Mandal",
    district: "East Godavari",
    cropName: "Paddy (MTU 1010)",
    cropVariety: "MTU 1010 Swarna",
    grade: "Grade A",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
    availableVolumeQuintals: 450,
    askingPricePerQuintal: 2320,
    listedTime: "Today, 11:00 AM",
    verified: true,
    dealsCount: 31,
    rating: 4.9,
    completionRate: 99
  },
  {
    id: "lst-7",
    farmerName: "B. Nagaraju",
    farmerInitials: "BN",
    mandal: "Kadiri Mandal",
    district: "Sri Sathya Sai",
    cropName: "Groundnut (K-6)",
    cropVariety: "Kadiri Lepakshi",
    grade: "Grade A Bold",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop",
    availableVolumeQuintals: 180,
    askingPricePerQuintal: 7450,
    listedTime: "Today, 10:15 AM",
    verified: true,
    dealsCount: 16,
    rating: 4.8,
    completionRate: 97
  }
];

export const INITIAL_PRICE_ALERTS: PriceAlertItem[] = [
  {
    id: "AL-2026-001",
    cropName: "Guntur Chilli",
    grade: "Teja Supreme S17",
    iconType: "chilli",
    condition: "Price Above",
    targetPrice: 19000,
    currentPrice: 18500,
    status: "Active",
    lastUpdated: "Today, 09:42 AM",
    actionText: "View >"
  },
  {
    id: "AL-2026-002",
    cropName: "Turmeric",
    grade: "Premium",
    iconType: "turmeric",
    condition: "Price Below",
    targetPrice: 8500,
    currentPrice: 9200,
    status: "Active",
    lastUpdated: "Today, 08:15 AM",
    actionText: "View >"
  },
  {
    id: "AL-2026-003",
    cropName: "Tobacco (FCV)",
    grade: "Grade A",
    iconType: "tobacco",
    condition: "Price Below",
    targetPrice: 4200,
    currentPrice: 4850,
    status: "Active",
    lastUpdated: "Yesterday, 06:20 PM",
    actionText: "View >"
  },
  {
    id: "AL-2026-004",
    cropName: "Maize",
    grade: "FAQ",
    iconType: "maize",
    condition: "Price Above",
    targetPrice: 2500,
    currentPrice: 2150,
    status: "Active",
    lastUpdated: "Yesterday, 03:10 PM",
    actionText: "View >"
  },
  {
    id: "AL-2026-005",
    cropName: "Guntur Sannam Chilli",
    grade: "Teja Supreme S17",
    iconType: "chilli",
    condition: "Price Above",
    targetPrice: 18500,
    currentPrice: 18000,
    status: "Active",
    lastUpdated: "Yesterday, 11:45 AM",
    actionText: "View >"
  },
  {
    id: "AL-2026-006",
    cropName: "Turmeric",
    grade: "Finger",
    iconType: "turmeric",
    condition: "Price Below",
    targetPrice: 8300,
    currentPrice: 8750,
    status: "Active",
    lastUpdated: "Yesterday, 10:22 AM",
    actionText: "View >"
  },
  {
    id: "AL-2026-007",
    cropName: "Maize",
    grade: "FAQ",
    iconType: "maize",
    condition: "Price Above",
    targetPrice: 2300,
    currentPrice: 2000,
    status: "Active",
    lastUpdated: "16 Sep 2025",
    actionText: "View >"
  },
  {
    id: "AL-2026-008",
    cropName: "Tobacco (FCV)",
    grade: "Grade B",
    iconType: "tobacco",
    condition: "Price Below",
    targetPrice: 4700,
    currentPrice: 4600,
    status: "Active",
    lastUpdated: "16 Sep 2025",
    actionText: "View >"
  }
];

export const INITIAL_RECENT_ALERTS: RecentAlertLog[] = [
  {
    id: "ral-1",
    time: "Today, 10:15 AM",
    cropName: "Guntur Chilli",
    grade: "Teja Supreme S17",
    alertType: "Price Above",
    price: 18500,
    changePct: 3.2,
    status: "Triggered"
  },
  {
    id: "ral-2",
    time: "Today, 08:40 AM",
    cropName: "Turmeric",
    grade: "Premium",
    alertType: "Price Below",
    price: 9200,
    changePct: -1.8,
    status: "Triggered"
  },
  {
    id: "ral-3",
    time: "Yesterday, 06:50 PM",
    cropName: "Tobacco (FCV)",
    grade: "Grade A",
    alertType: "Price Below",
    price: 4850,
    changePct: -2.1,
    status: "Triggered"
  },
  {
    id: "ral-4",
    time: "Yesterday, 02:30 PM",
    cropName: "Maize",
    grade: "FAQ",
    alertType: "Price Above",
    price: 2150,
    changePct: 2.7,
    status: "Active"
  }
];

export const INITIAL_STOCK_ITEMS: StockInventoryItem[] = [
  {
    id: "stk-1",
    sku: "AL-2026-001",
    cropName: "Guntur Chilli",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600&auto=format&fit=crop",
    grade: "Teja Supreme S17",
    unit: "Quintal (Q)",
    currentStock: 250,
    minStock: 100,
    status: "In Stock",
    lastUpdated: "16 Sep 2025, 09:42 AM",
    warehouse: "Guntur Central Mandi Hub"
  },
  {
    id: "stk-2",
    sku: "AL-2026-002",
    cropName: "Turmeric",
    image: "/images/crops/turmeric.jpg",
    grade: "Premium",
    unit: "Quintal (Q)",
    currentStock: 120,
    minStock: 80,
    status: "In Stock",
    lastUpdated: "16 Sep 2025, 08:15 AM",
    warehouse: "Tenali Cold Storage Yard"
  },
  {
    id: "stk-3",
    sku: "AL-2026-003",
    cropName: "Tobacco (FCV)",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=600&auto=format&fit=crop",
    grade: "Grade A",
    unit: "Kg",
    currentStock: 340,
    minStock: 200,
    status: "In Stock",
    lastUpdated: "15 Sep 2025, 06:20 PM",
    warehouse: "Guntur Central Mandi Hub"
  },
  {
    id: "stk-4",
    sku: "AL-2026-004",
    cropName: "Maize",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
    grade: "FAQ",
    unit: "Quintal (Q)",
    currentStock: 90,
    minStock: 150,
    status: "Low Stock",
    lastUpdated: "15 Sep 2025, 03:10 PM",
    warehouse: "Tenali Cold Storage Yard"
  },
  {
    id: "stk-5",
    sku: "AL-2026-005",
    cropName: "Guntur Sannam Chilli",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600&auto=format&fit=crop",
    grade: "Teja Supreme S17",
    unit: "Quintal (Q)",
    currentStock: 60,
    minStock: 100,
    status: "Low Stock",
    lastUpdated: "14 Sep 2025, 11:45 AM",
    warehouse: "Guntur Central Mandi Hub"
  },
  {
    id: "stk-6",
    sku: "AL-2026-006",
    cropName: "Turmeric",
    image: "/images/crops/turmeric.jpg",
    grade: "Finger",
    unit: "Quintal (Q)",
    currentStock: 180,
    minStock: 100,
    status: "In Stock",
    lastUpdated: "14 Sep 2025, 10:22 AM",
    warehouse: "Tenali Cold Storage Yard"
  },
  {
    id: "stk-7",
    sku: "AL-2026-007",
    cropName: "Maize",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
    grade: "FAQ",
    unit: "Quintal (Q)",
    currentStock: 70,
    minStock: 100,
    status: "Low Stock",
    lastUpdated: "13 Sep 2025, 04:15 PM",
    warehouse: "Guntur Central Mandi Hub"
  },
  {
    id: "stk-8",
    sku: "AL-2026-008",
    cropName: "Tobacco (FCV)",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=600&auto=format&fit=crop",
    grade: "Grade B",
    unit: "Kg",
    currentStock: 220,
    minStock: 150,
    status: "In Stock",
    lastUpdated: "12 Sep 2025, 02:30 PM",
    warehouse: "Guntur Central Mandi Hub"
  }
];

export const INITIAL_OFFER_HISTORY: NegotiationOffer[] = [
  {
    id: "off-1",
    dateTime: "8 Sep 2025, 10:45 AM",
    offeredPrice: 17500,
    quantity: 150,
    status: "Pending",
    message: "We are interested to purchase 150 Q of Grade A1 Guntur Sannam Chilli. Please confirm if you can accept this price."
  },
  {
    id: "off-2",
    dateTime: "8 Sep 2025, 09:30 AM",
    offeredPrice: 17000,
    quantity: 150,
    status: "Rejected",
    message: "Price is too low. Can you offer ₹18,000?"
  }
];

export function getDistrictFarmerListings(districtName: string): FarmerListing[] {
  const norm = normalizeDistrictName(districtName);
  const detail = DISTRICT_DATA[norm] || DISTRICT_DATA["Guntur"];

  const sampleFarmers = [
    { name: "Venkata Ramana", initials: "VR" },
    { name: "K. Subba Rao", initials: "KS" },
    { name: "M. Chenna Reddy", initials: "MC" },
    { name: "P. Appa Rao", initials: "PA" }
  ];

  return detail.crops.map((crop, idx) => {
    const f = sampleFarmers[idx % sampleFarmers.length];
    const pNum = crop.priceNum || 2500;
    const arrivalNum = parseInt(crop.arrival.replace(/[^0-9]/g, '')) || 25;

    return {
      id: `lst-${norm.toLowerCase().replace(/[^a-z]/g, '')}-${idx}`,
      farmerName: `${f.name}`,
      farmerInitials: f.initials,
      mandal: `${norm} Regional Market`,
      district: norm,
      cropName: crop.name,
      cropVariety: crop.variety || 'Standard FAQ',
      grade: "Grade A1 FAQ",
      image: crop.image || getCropImage(crop.name),
      availableVolumeQuintals: arrivalNum * 10,
      askingPricePerQuintal: pNum,
      listedTime: "Live Mandi",
      verified: true,
      dealsCount: 12 + idx * 3,
      rating: 4.8,
      completionRate: 98
    };
  });
}

