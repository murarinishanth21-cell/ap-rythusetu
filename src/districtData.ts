export interface CropInfo {
  name: string;
  variety?: string;
  image: string;
  arrival: string;
  price: string;
  priceNum: number;
  priceRange: string;
  trend: string;
  trendPositive: boolean;
  msp?: string;
  mandiName: string;
  suitability: string;
  yieldPerAcre: string;
  yieldNum: number; // in quintals/acre
  costPerAcre: number; // in ₹
  estRevenuePerAcre: number; // in ₹
  estProfitPerAcre: number; // in ₹
  roi: string;
}

export interface DistrictDetail {
  name: string;
  center: [number, number]; // [lng, lat]
  tagline: string;
  soilType: string;
  primarySeason: string;
  rainfall: string;
  totalArrivals: string;
  activeFarmers: number;
  crops: CropInfo[];
}

export const CROP_IMAGES: Record<string, string> = {
  "palm oil": "/images/crops/palm_oil.jpg",
  "oil palm": "/images/crops/palm_oil.jpg",
  "cashew": "/images/crops/cashew_nuts.jpg",
  "cashew nut": "/images/crops/cashew_nuts.jpg",
  "cashew nuts": "/images/crops/cashew_nuts.jpg",
  "jeedipappu": "/images/crops/cashew_nuts.jpg",
  "black gram": "/images/crops/black_gram.jpg",
  "urad": "/images/crops/black_gram.jpg",
  "minumulu": "/images/crops/black_gram.jpg",
  "jaggery": "/images/crops/jaggery.jpg",
  "jaggarey": "/images/crops/jaggery.jpg",
  "bellam": "/images/crops/jaggery.jpg",
  "coconut": "/images/crops/coconut.jpg",
  "kobbari": "/images/crops/coconut.jpg",
  "cotton": "/images/crops/cotton.jpg",
  "pratti": "/images/crops/cotton.jpg",
  "turmeric": "/images/crops/turmeric.jpg",
  "pasupu": "/images/crops/turmeric.jpg",
  "groundnut": "/images/crops/groundnut.jpg",
  "peanut": "/images/crops/groundnut.jpg",
  "verusenaga": "/images/crops/groundnut.jpg",
  "sugarcane": "/images/crops/sugarcane.jpg",
  "sugar cane": "/images/crops/sugarcane.jpg",
  "cheruku": "/images/crops/sugarcane.jpg",
  "chilli": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600&auto=format&fit=crop",
  "paddy": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
  "rice": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
  "mango": "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop",
  "orange": "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=600&auto=format&fit=crop",
  "mosambi": "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=600&auto=format&fit=crop",
  "banana": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=600&auto=format&fit=crop",
  "maize": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
  "corn": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
  "tobacco": "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=600&auto=format&fit=crop",
  "bengal gram": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=600&auto=format&fit=crop",
  "chickpea": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=600&auto=format&fit=crop",
  "senagalu": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=600&auto=format&fit=crop",
  "lemon": "https://images.unsplash.com/photo-1590502593747-42a996133562?q=80&w=600&auto=format&fit=crop",
  "lime": "https://images.unsplash.com/photo-1590502593747-42a996133562?q=80&w=600&auto=format&fit=crop",
  "onion": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=600&auto=format&fit=crop",
  "silk": "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop",
  "tomato": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop",
  "ragi": "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop",
  "millet": "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop",
  "coffee": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
  "pepper": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop"
};

export function getCropImage(cropName: string): string {
  if (!cropName) return "/images/crops/groundnut.jpg";
  const lower = cropName.toLowerCase();
  for (const [key, url] of Object.entries(CROP_IMAGES)) {
    if (lower.includes(key)) {
      return url;
    }
  }
  return "https://images.unsplash.com/photo-1595188812674-d4f3b610c436?q=80&w=600&auto=format&fit=crop";
}

export const DISTRICT_DATA: Record<string, DistrictDetail> = {
  "Guntur": {
    "name": "Guntur",
    "center": [
      80.45,
      16.3
    ],
    "tagline": "World-Famous Red Chilli, Cotton, Paddy & Tobacco Epicenter",
    "soilType": "Deep Black Cotton & Rich Alluvial Soil",
    "primarySeason": "Kharif & Rabi (Optimal Moisture)",
    "rainfall": "864 mm Avg",
    "totalArrivals": "65 Tons",
    "activeFarmers": 420,
    "crops": [
      {
        "name": "Red Chilli",
        "variety": "Teja S17 & Byadagi Export Grade",
        "image": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600&auto=format&fit=crop",
        "arrival": "32 Tons",
        "price": "₹18,500 / Q",
        "priceNum": 18500,
        "priceRange": "₹17,800 - ₹19,200",
        "trend": "+4.8%",
        "trendPositive": true,
        "msp": "₹16,500 / Q",
        "mandiName": "Guntur Mirchi Yard (Asia's Largest)",
        "suitability": "98% (High Optimal)",
        "yieldPerAcre": "22 - 25 Quintals/Acre",
        "yieldNum": 24,
        "costPerAcre": 55000,
        "estRevenuePerAcre": 444000,
        "estProfitPerAcre": 389000,
        "roi": "707%"
      },
      {
        "name": "Cotton",
        "variety": "Long Staple Bt Cotton",
        "image": "/images/crops/cotton.jpg",
        "arrival": "18 Tons",
        "price": "₹7,650 / Q",
        "priceNum": 7650,
        "priceRange": "₹7,200 - ₹7,900",
        "trend": "+2.1%",
        "trendPositive": true,
        "msp": "₹7,122 / Q",
        "mandiName": "Guntur Cotton Market Yard",
        "suitability": "94% (Very High)",
        "yieldPerAcre": "12 - 15 Quintals/Acre",
        "yieldNum": 14,
        "costPerAcre": 32000,
        "estRevenuePerAcre": 107100,
        "estProfitPerAcre": 75100,
        "roi": "235%"
      },
      {
        "name": "Paddy (Rice)",
        "variety": "Tenali BPT-5204 (Sona Masoori)",
        "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
        "arrival": "42 Tons",
        "price": "₹2,480 / Q",
        "priceNum": 2480,
        "priceRange": "₹2,350 - ₹2,550",
        "trend": "+1.6%",
        "trendPositive": true,
        "msp": "₹2,300 / Q",
        "mandiName": "Tenali APMC Market Yard",
        "suitability": "95% (Delta Alluvial)",
        "yieldPerAcre": "30 - 34 Quintals/Acre",
        "yieldNum": 32,
        "costPerAcre": 27000,
        "estRevenuePerAcre": 79360,
        "estProfitPerAcre": 52360,
        "roi": "194%"
      },
      {
        "name": "Virginia Tobacco",
        "variety": "Flue-Cured Virginia (FCV)",
        "image": "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=600&auto=format&fit=crop",
        "arrival": "12 Tons",
        "price": "₹19,200 / Q",
        "priceNum": 19200,
        "priceRange": "₹18,500 - ₹20,100",
        "trend": "+3.2%",
        "trendPositive": true,
        "msp": "₹17,000 / Q",
        "mandiName": "Guntur Tobacco Board Platform",
        "suitability": "91% (Commercial High)",
        "yieldPerAcre": "8 - 10 Quintals/Acre",
        "yieldNum": 9,
        "costPerAcre": 48000,
        "estRevenuePerAcre": 172800,
        "estProfitPerAcre": 124800,
        "roi": "260%"
      }
    ]
  },
  "Krishna": {
    "name": "Krishna",
    "center": [
      81,
      16.35
    ],
    "tagline": "Krishna Delta Paddy, Vuyyuru Sugarcane & Pulse Granary",
    "soilType": "Rich Coastal Alluvial & Clayey Delta Soil",
    "primarySeason": "Kharif (Sarva) & Rabi (Dalva)",
    "rainfall": "960 mm Avg",
    "totalArrivals": "72 Tons",
    "activeFarmers": 490,
    "crops": [
      {
        "name": "Paddy (Rice)",
        "variety": "BPT 5204 (Sona Masoori)",
        "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
        "arrival": "52 Tons",
        "price": "₹2,420 / Q",
        "priceNum": 2420,
        "priceRange": "₹2,320 - ₹2,550",
        "trend": "+1.9%",
        "trendPositive": true,
        "msp": "₹2,300 / Q",
        "mandiName": "Gudivada & Machilipatnam Rythu Bazar",
        "suitability": "99% (Ideal Deltaic)",
        "yieldPerAcre": "30 - 35 Quintals/Acre",
        "yieldNum": 32,
        "costPerAcre": 28000,
        "estRevenuePerAcre": 77440,
        "estProfitPerAcre": 49440,
        "roi": "177%"
      },
      {
        "name": "Sugarcane",
        "variety": "Co 86032 High Sugar Recovery",
        "image": "/images/crops/sugarcane.jpg",
        "arrival": "85 Tons",
        "price": "₹3,400 / Ton",
        "priceNum": 340,
        "priceRange": "₹3,200 - ₹3,600",
        "trend": "+2.5%",
        "trendPositive": true,
        "msp": "₹3,150 / Ton",
        "mandiName": "Vuyyuru KCP Sugar Mill Gate Yard",
        "suitability": "96% (Delta Canal Irrigated)",
        "yieldPerAcre": "40 - 50 Tons/Acre",
        "yieldNum": 45,
        "costPerAcre": 42000,
        "estRevenuePerAcre": 153000,
        "estProfitPerAcre": 111000,
        "roi": "264%"
      },
      {
        "name": "Black Gram (Urad)",
        "variety": "Krishna Delta LBG-752 (Rabi Minumulu)",
        "image": "/images/crops/black_gram.jpg",
        "arrival": "14 Tons",
        "price": "₹8,600 / Q",
        "priceNum": 8600,
        "priceRange": "₹8,200 - ₹8,900",
        "trend": "+3.8%",
        "trendPositive": true,
        "msp": "₹6,950 / Q",
        "mandiName": "Vijayawada & Gudivada Grain Mandi",
        "suitability": "94% (Post-Rice Relay Pulse)",
        "yieldPerAcre": "6 - 8 Quintals/Acre",
        "yieldNum": 7,
        "costPerAcre": 12000,
        "estRevenuePerAcre": 60200,
        "estProfitPerAcre": 48200,
        "roi": "402%"
      },
      {
        "name": "Mango",
        "variety": "GI-Tagged Banganapalli",
        "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop",
        "arrival": "18 Tons",
        "price": "₹4,200 / Q",
        "priceNum": 4200,
        "priceRange": "₹3,800 - ₹4,800",
        "trend": "+3.4%",
        "trendPositive": true,
        "msp": "₹3,600 / Q",
        "mandiName": "Krishna Regional Horticulture Mandi",
        "suitability": "92% (High Suitability)",
        "yieldPerAcre": "45 - 55 Quintals/Acre",
        "yieldNum": 50,
        "costPerAcre": 35000,
        "estRevenuePerAcre": 210000,
        "estProfitPerAcre": 175000,
        "roi": "500%"
      }
    ]
  },
  "Ananthapur": {
    "name": "Ananthapur",
    "center": [
      77.6,
      14.68
    ],
    "tagline": "Premier Groundnut, Sweet Orange & Drought-Resilient Nutri-Cereals Hub",
    "soilType": "Red Sandy Loams & Well-Drained Red Chalkas",
    "primarySeason": "Kharif Rainfed & Rabi Micro-Irrigation",
    "rainfall": "553 mm Avg",
    "totalArrivals": "48 Tons",
    "activeFarmers": 380,
    "crops": [
      {
        "name": "Groundnut",
        "variety": "K6 Dharani & Kadiri Bold",
        "image": "/images/crops/groundnut.jpg",
        "arrival": "35 Tons",
        "price": "₹6,900 / Q",
        "priceNum": 6900,
        "priceRange": "₹6,400 - ₹7,350",
        "trend": "+2.8%",
        "trendPositive": true,
        "msp": "₹6,377 / Q",
        "mandiName": "Ananthapur Agricultural Market Yard",
        "suitability": "96% (Primary Agro-Zone)",
        "yieldPerAcre": "8 - 11 Quintals/Acre",
        "yieldNum": 10,
        "costPerAcre": 18000,
        "estRevenuePerAcre": 69000,
        "estProfitPerAcre": 51000,
        "roi": "283%"
      },
      {
        "name": "Sweet Orange (Mosambi)",
        "variety": "Sathgudi Cheeni Citrus",
        "image": "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=600&auto=format&fit=crop",
        "arrival": "22 Tons",
        "price": "₹5,200 / Q",
        "priceNum": 5200,
        "priceRange": "₹4,800 - ₹5,700",
        "trend": "+5.1%",
        "trendPositive": true,
        "msp": "₹4,200 / Q",
        "mandiName": "Tadipatri Horticulture Mandi",
        "suitability": "95% (Semi-Arid Ideal)",
        "yieldPerAcre": "60 - 75 Quintals/Acre",
        "yieldNum": 68,
        "costPerAcre": 48000,
        "estRevenuePerAcre": 353600,
        "estProfitPerAcre": 305600,
        "roi": "637%"
      },
      {
        "name": "Pomegranate",
        "variety": "Bhagwa Export Quality",
        "image": "https://images.unsplash.com/photo-1541344999736-83eca872f241?q=80&w=600&auto=format&fit=crop",
        "arrival": "15 Tons",
        "price": "₹11,500 / Q",
        "priceNum": 11500,
        "priceRange": "₹10,200 - ₹12,800",
        "trend": "+4.2%",
        "trendPositive": true,
        "msp": "₹8,500 / Q",
        "mandiName": "Kalyandurg Fruit Market Yard",
        "suitability": "93% (Arid Horticulture)",
        "yieldPerAcre": "40 - 50 Quintals/Acre",
        "yieldNum": 45,
        "costPerAcre": 75000,
        "estRevenuePerAcre": 517500,
        "estProfitPerAcre": 442500,
        "roi": "590%"
      },
      {
        "name": "Foxtail Millet (Korra)",
        "variety": "SIA 3088 Nutri-Cereal",
        "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop",
        "arrival": "12 Tons",
        "price": "₹3,800 / Q",
        "priceNum": 3800,
        "priceRange": "₹3,500 - ₹4,100",
        "trend": "+2.0%",
        "trendPositive": true,
        "msp": "₹3,400 / Q",
        "mandiName": "Guntakal Millet Market Terminal",
        "suitability": "97% (Drought Hardy)",
        "yieldPerAcre": "10 - 12 Quintals/Acre",
        "yieldNum": 11,
        "costPerAcre": 9000,
        "estRevenuePerAcre": 41800,
        "estProfitPerAcre": 32800,
        "roi": "364%"
      }
    ]
  },
  "West Godavari": {
    "name": "West Godavari",
    "center": [
      81.55,
      16.7
    ],
    "tagline": "The Rice Granary of Andhra Pradesh, Coconut Groves & Aqua Belt",
    "soilType": "Deep Alluvial Deltaic & Fertile Clayey Soils",
    "primarySeason": "Sarva (Kharif) & Dalva (Rabi)",
    "rainfall": "1050 mm Avg",
    "totalArrivals": "90 Tons",
    "activeFarmers": 580,
    "crops": [
      {
        "name": "Paddy",
        "variety": "Swarna Sub-1 & MTU 1010",
        "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
        "arrival": "68 Tons",
        "price": "₹2,450 / Q",
        "priceNum": 2450,
        "priceRange": "₹2,350 - ₹2,580",
        "trend": "+1.5%",
        "trendPositive": true,
        "msp": "₹2,300 / Q",
        "mandiName": "Tadepalligudem & Bhimavaram Market",
        "suitability": "99% (State Benchmark)",
        "yieldPerAcre": "32 - 38 Quintals/Acre",
        "yieldNum": 35,
        "costPerAcre": 29000,
        "estRevenuePerAcre": 85750,
        "estProfitPerAcre": 56750,
        "roi": "196%"
      },
      {
        "name": "Coconut",
        "variety": "East Coast Tall & Hybrid Green",
        "image": "/images/crops/coconut.jpg",
        "arrival": "38 Tons",
        "price": "₹1,850 / 100 Nuts",
        "priceNum": 1850,
        "priceRange": "₹1,700 - ₹2,050",
        "trend": "+3.6%",
        "trendPositive": true,
        "msp": "₹1,500 / 100 Nuts",
        "mandiName": "Tanuku Coconut Terminal Yard",
        "suitability": "98% (Coastal Tropical)",
        "yieldPerAcre": "8,000 - 10,000 Nuts/Acre",
        "yieldNum": 90,
        "costPerAcre": 35000,
        "estRevenuePerAcre": 166500,
        "estProfitPerAcre": 131500,
        "roi": "375%"
      },
      {
        "name": "Maize",
        "variety": "High Yield Yellow Grain Corn",
        "image": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
        "arrival": "24 Tons",
        "price": "₹2,280 / Q",
        "priceNum": 2280,
        "priceRange": "₹2,150 - ₹2,400",
        "trend": "+2.2%",
        "trendPositive": true,
        "msp": "₹2,090 / Q",
        "mandiName": "Tadepalligudem Corn Mandi",
        "suitability": "95% (Rabi Delta High)",
        "yieldPerAcre": "30 - 35 Quintals/Acre",
        "yieldNum": 32,
        "costPerAcre": 24000,
        "estRevenuePerAcre": 72960,
        "estProfitPerAcre": 48960,
        "roi": "204%"
      },
      {
        "name": "Sugarcane",
        "variety": "Co 86032 Delta High Sucrose",
        "image": "/images/crops/sugarcane.jpg",
        "arrival": "60 Tons",
        "price": "₹3,350 / Ton",
        "priceNum": 335,
        "priceRange": "₹3,150 - ₹3,550",
        "trend": "+1.8%",
        "trendPositive": true,
        "msp": "₹3,150 / Ton",
        "mandiName": "Bhimavaram Agro Processing Yard",
        "suitability": "94% (Delta Canal Irrigated)",
        "yieldPerAcre": "42 - 48 Tons/Acre",
        "yieldNum": 45,
        "costPerAcre": 40000,
        "estRevenuePerAcre": 150750,
        "estProfitPerAcre": 110750,
        "roi": "277%"
      }
    ]
  },
  "East Godavari": {
    "name": "East Godavari",
    "center": [
      81.8,
      17
    ],
    "tagline": "Fertile Delta Paddy, Kadiyam Nurseries, Banana & Natu Tobacco Hub",
    "soilType": "Rich Deltaic Alluvial & River Bank Loams",
    "primarySeason": "Kharif & Rabi (Canal Fed)",
    "rainfall": "1080 mm Avg",
    "totalArrivals": "68 Tons",
    "activeFarmers": 450,
    "crops": [
      {
        "name": "Paddy",
        "variety": "MTU 1061 (Indra) & BPT 5204",
        "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
        "arrival": "48 Tons",
        "price": "₹2,440 / Q",
        "priceNum": 2440,
        "priceRange": "₹2,340 - ₹2,550",
        "trend": "+1.7%",
        "trendPositive": true,
        "msp": "₹2,300 / Q",
        "mandiName": "Rajahmundry Agri Market Yard",
        "suitability": "98% (Delta Alluvial)",
        "yieldPerAcre": "30 - 36 Quintals/Acre",
        "yieldNum": 33,
        "costPerAcre": 28000,
        "estRevenuePerAcre": 80520,
        "estProfitPerAcre": 52520,
        "roi": "188%"
      },
      {
        "name": "Banana",
        "variety": "Grand Naine & Karpura Chekkarakeli",
        "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=600&auto=format&fit=crop",
        "arrival": "34 Tons",
        "price": "₹1,650 / Q",
        "priceNum": 1650,
        "priceRange": "₹1,450 - ₹1,850",
        "trend": "+4.1%",
        "trendPositive": true,
        "msp": "₹1,300 / Q",
        "mandiName": "Ravulapalem Banana Market Yard",
        "suitability": "97% (River Valley Fertile)",
        "yieldPerAcre": "140 - 180 Quintals/Acre",
        "yieldNum": 160,
        "costPerAcre": 62000,
        "estRevenuePerAcre": 264000,
        "estProfitPerAcre": 202000,
        "roi": "326%"
      },
      {
        "name": "Natu Tobacco",
        "variety": "Burley & Dark Air Cured",
        "image": "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=600&auto=format&fit=crop",
        "arrival": "16 Tons",
        "price": "₹14,500 / Q",
        "priceNum": 14500,
        "priceRange": "₹13,800 - ₹15,200",
        "trend": "+2.4%",
        "trendPositive": true,
        "msp": "₹12,800 / Q",
        "mandiName": "Rajahmundry Tobacco Auction Yard",
        "suitability": "93% (Lanka Soils Optimum)",
        "yieldPerAcre": "10 - 12 Quintals/Acre",
        "yieldNum": 11,
        "costPerAcre": 38000,
        "estRevenuePerAcre": 159500,
        "estProfitPerAcre": 121500,
        "roi": "320%"
      },
      {
        "name": "Black Gram",
        "variety": "LBG 752 Delta Post-Harvest Pulse",
        "image": "/images/crops/black_gram.jpg",
        "arrival": "12 Tons",
        "price": "₹8,450 / Q",
        "priceNum": 8450,
        "priceRange": "₹8,000 - ₹8,800",
        "trend": "+2.9%",
        "trendPositive": true,
        "msp": "₹6,950 / Q",
        "mandiName": "Anaparthi Agri Mandi",
        "suitability": "95% (Relay Pulse High)",
        "yieldPerAcre": "6 - 8 Quintals/Acre",
        "yieldNum": 7,
        "costPerAcre": 11000,
        "estRevenuePerAcre": 59150,
        "estProfitPerAcre": 48150,
        "roi": "438%"
      }
    ]
  },
  "Konaseema": {
    "name": "Konaseema",
    "center": [
      81.9,
      16.58
    ],
    "tagline": "India's Coconut Capital, Pristine Delta Paddy & Tropical Plantations",
    "soilType": "Deep River Alluvial & Delta Wetland Soils",
    "primarySeason": "Perennial Horticulture & Double Paddy",
    "rainfall": "1120 mm Avg",
    "totalArrivals": "85 Tons",
    "activeFarmers": 510,
    "crops": [
      {
        "name": "Coconut",
        "variety": "Godavari Ganga & Deejay Hybrid",
        "image": "/images/crops/coconut.jpg",
        "arrival": "65 Tons",
        "price": "₹1,950 / 100 Nuts",
        "priceNum": 1950,
        "priceRange": "₹1,800 - ₹2,150",
        "trend": "+4.5%",
        "trendPositive": true,
        "msp": "₹1,550 / 100 Nuts",
        "mandiName": "Amalapuram Coconut Mandi (AP Coconut Capital)",
        "suitability": "99% (Prime Coconut Delta)",
        "yieldPerAcre": "9,000 - 12,000 Nuts/Acre",
        "yieldNum": 105,
        "costPerAcre": 36000,
        "estRevenuePerAcre": 204750,
        "estProfitPerAcre": 168750,
        "roi": "469%"
      },
      {
        "name": "Paddy",
        "variety": "BPT 2270 (Bhavani) & MTU 1010",
        "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
        "arrival": "40 Tons",
        "price": "₹2,460 / Q",
        "priceNum": 2460,
        "priceRange": "₹2,360 - ₹2,580",
        "trend": "+1.8%",
        "trendPositive": true,
        "msp": "₹2,300 / Q",
        "mandiName": "Razole & Kothapeta Market Yard",
        "suitability": "98% (Wet Deltaic)",
        "yieldPerAcre": "30 - 35 Quintals/Acre",
        "yieldNum": 33,
        "costPerAcre": 28000,
        "estRevenuePerAcre": 81180,
        "estProfitPerAcre": 53180,
        "roi": "190%"
      },
      {
        "name": "Banana",
        "variety": "Karpura Chekkarakeli Fragrant Table",
        "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=600&auto=format&fit=crop",
        "arrival": "25 Tons",
        "price": "₹1,750 / Q",
        "priceNum": 1750,
        "priceRange": "₹1,550 - ₹1,950",
        "trend": "+3.5%",
        "trendPositive": true,
        "msp": "₹1,350 / Q",
        "mandiName": "Ambajipeta Fruit Market",
        "suitability": "96% (Alluvial Intercrop)",
        "yieldPerAcre": "120 - 150 Quintals/Acre",
        "yieldNum": 135,
        "costPerAcre": 55000,
        "estRevenuePerAcre": 236250,
        "estProfitPerAcre": 181250,
        "roi": "330%"
      },
      {
        "name": "Green Gram (Moong)",
        "variety": "WGG-42 Post-Harvest Delta Moong",
        "image": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=600&auto=format&fit=crop",
        "arrival": "10 Tons",
        "price": "₹8,550 / Q",
        "priceNum": 8550,
        "priceRange": "₹8,100 - ₹8,900",
        "trend": "+2.8%",
        "trendPositive": true,
        "msp": "₹8,558 / Q",
        "mandiName": "Amalapuram Pulse Yard",
        "suitability": "94% (Residual Moisture High)",
        "yieldPerAcre": "5 - 7 Quintals/Acre",
        "yieldNum": 6,
        "costPerAcre": 10000,
        "estRevenuePerAcre": 51300,
        "estProfitPerAcre": 41300,
        "roi": "413%"
      }
    ]
  },
  "Kakinada": {
    "name": "Kakinada",
    "center": [
      82.2,
      17
    ],
    "tagline": "Global Non-Basmati Rice Export Hub, Maize & Coastal Agri Corridor",
    "soilType": "Deep Coastal Alluvial & Fertile Loamy Soils",
    "primarySeason": "Sarva & Dalva (Port Export Oriented)",
    "rainfall": "1040 mm Avg",
    "totalArrivals": "75 Tons",
    "activeFarmers": 470,
    "crops": [
      {
        "name": "Paddy",
        "variety": "Export Grade Non-Basmati White Rice",
        "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
        "arrival": "55 Tons",
        "price": "₹2,520 / Q",
        "priceNum": 2520,
        "priceRange": "₹2,420 - ₹2,650",
        "trend": "+2.3%",
        "trendPositive": true,
        "msp": "₹2,300 / Q",
        "mandiName": "Kakinada Port Agriculture Terminal",
        "suitability": "98% (Export Gateway Quality)",
        "yieldPerAcre": "32 - 37 Quintals/Acre",
        "yieldNum": 34,
        "costPerAcre": 29000,
        "estRevenuePerAcre": 85680,
        "estProfitPerAcre": 56680,
        "roi": "195%"
      },
      {
        "name": "Maize",
        "variety": "Pioneer Hybrid Yellow Corn",
        "image": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
        "arrival": "30 Tons",
        "price": "₹2,290 / Q",
        "priceNum": 2290,
        "priceRange": "₹2,180 - ₹2,420",
        "trend": "+2.7%",
        "trendPositive": true,
        "msp": "₹2,090 / Q",
        "mandiName": "Peddapuram Agri Yard",
        "suitability": "96% (High Commercial Yield)",
        "yieldPerAcre": "30 - 36 Quintals/Acre",
        "yieldNum": 33,
        "costPerAcre": 24000,
        "estRevenuePerAcre": 75570,
        "estProfitPerAcre": 51570,
        "roi": "215%"
      },
      {
        "name": "Coconut",
        "variety": "Coastal Tall & Hybrid",
        "image": "/images/crops/coconut.jpg",
        "arrival": "22 Tons",
        "price": "₹1,820 / 100 Nuts",
        "priceNum": 1820,
        "priceRange": "₹1,680 - ₹1,980",
        "trend": "+2.0%",
        "trendPositive": true,
        "msp": "₹1,500 / 100 Nuts",
        "mandiName": "Tuni Coconut Yard",
        "suitability": "95% (Coastal Sands Optimum)",
        "yieldPerAcre": "8,000 - 10,000 Nuts/Acre",
        "yieldNum": 90,
        "costPerAcre": 34000,
        "estRevenuePerAcre": 163800,
        "estProfitPerAcre": 129800,
        "roi": "382%"
      },
      {
        "name": "Black Gram",
        "variety": "PU-31 Rice Fallow Pulse",
        "image": "/images/crops/black_gram.jpg",
        "arrival": "14 Tons",
        "price": "₹8,350 / Q",
        "priceNum": 8350,
        "priceRange": "₹7,950 - ₹8,700",
        "trend": "+3.1%",
        "trendPositive": true,
        "msp": "₹6,950 / Q",
        "mandiName": "Pithapuram Agri Mandi",
        "suitability": "93% (Delta Moisture Relay)",
        "yieldPerAcre": "6 - 8 Quintals/Acre",
        "yieldNum": 7,
        "costPerAcre": 11500,
        "estRevenuePerAcre": 58450,
        "estProfitPerAcre": 46950,
        "roi": "408%"
      }
    ]
  },
  "Eluru": {
    "name": "Eluru",
    "center": [
      81.1,
      16.7
    ],
    "tagline": "India's Oil Palm Capital, Nuzvid Mangoes & Rich Paddy Belt",
    "soilType": "Fertile Alluvial Loams & Black Clayey Soils",
    "primarySeason": "Canal Irrigated Kharif, Rabi & Perennial Palm",
    "rainfall": "990 mm Avg",
    "totalArrivals": "80 Tons",
    "activeFarmers": 520,
    "crops": [
      {
        "name": "Oil Palm",
        "variety": "Fresh Fruit Bunches (Tenera)",
        "image": "/images/crops/palm_oil.jpg",
        "arrival": "50 Tons",
        "price": "₹14,200 / Ton FFB",
        "priceNum": 1420,
        "priceRange": "₹13,500 - ₹14,800",
        "trend": "+4.2%",
        "trendPositive": true,
        "msp": "₹13,000 / Ton",
        "mandiName": "Pedavegi & Denduluru Oil Palm Mill (ICAR-IIOPR)",
        "suitability": "99% (National Hub of Oil Palm)",
        "yieldPerAcre": "8 - 12 Tons FFB/Acre",
        "yieldNum": 10,
        "costPerAcre": 38000,
        "estRevenuePerAcre": 142000,
        "estProfitPerAcre": 104000,
        "roi": "274%"
      },
      {
        "name": "Paddy",
        "variety": "MTU 1224 (Maruteru Samba)",
        "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
        "arrival": "45 Tons",
        "price": "₹2,440 / Q",
        "priceNum": 2440,
        "priceRange": "₹2,340 - ₹2,560",
        "trend": "+1.6%",
        "trendPositive": true,
        "msp": "₹2,300 / Q",
        "mandiName": "Eluru Agri Market Yard",
        "suitability": "97% (Alluvial Wet Delta)",
        "yieldPerAcre": "30 - 35 Quintals/Acre",
        "yieldNum": 33,
        "costPerAcre": 28000,
        "estRevenuePerAcre": 80520,
        "estProfitPerAcre": 52520,
        "roi": "188%"
      },
      {
        "name": "Mango",
        "variety": "Nuzvid Banganapalli & Chinna Rasalu",
        "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop",
        "arrival": "28 Tons",
        "price": "₹4,400 / Q",
        "priceNum": 4400,
        "priceRange": "₹3,900 - ₹4,900",
        "trend": "+4.8%",
        "trendPositive": true,
        "msp": "₹3,600 / Q",
        "mandiName": "Nuzvid Mango Market Terminal",
        "suitability": "98% (World Famous Nuzvid Tract)",
        "yieldPerAcre": "45 - 55 Quintals/Acre",
        "yieldNum": 50,
        "costPerAcre": 36000,
        "estRevenuePerAcre": 220000,
        "estProfitPerAcre": 184000,
        "roi": "511%"
      },
      {
        "name": "Cocoa",
        "variety": "Criollo-Forastero Hybrid Beans",
        "image": "https://images.unsplash.com/photo-1541344999736-83eca872f241?q=80&w=600&auto=format&fit=crop",
        "arrival": "15 Tons",
        "price": "₹28,500 / Q",
        "priceNum": 28500,
        "priceRange": "₹26,000 - ₹31,000",
        "trend": "+5.6%",
        "trendPositive": true,
        "msp": "₹24,000 / Q",
        "mandiName": "Chintalapudi Plantation Terminal",
        "suitability": "95% (Ideal Palm Intercrop)",
        "yieldPerAcre": "5 - 7 Quintals/Acre",
        "yieldNum": 6,
        "costPerAcre": 22000,
        "estRevenuePerAcre": 171000,
        "estProfitPerAcre": 149000,
        "roi": "677%"
      }
    ]
  },
  "NTR": {
    "name": "NTR",
    "center": [
      80.5,
      16.6
    ],
    "tagline": "Nunna Mango Hub, Nandigama Cotton & Pulses Commercial Heartland",
    "soilType": "Black Cotton Soils & Fertile Krishna River Basins",
    "primarySeason": "Kharif & Rabi (Canal & Well Irrigated)",
    "rainfall": "930 mm Avg",
    "totalArrivals": "70 Tons",
    "activeFarmers": 430,
    "crops": [
      {
        "name": "Mango",
        "variety": "Banganapalli & Chinna Rasalu",
        "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop",
        "arrival": "45 Tons",
        "price": "₹4,350 / Q",
        "priceNum": 4350,
        "priceRange": "₹3,900 - ₹4,850",
        "trend": "+3.9%",
        "trendPositive": true,
        "msp": "₹3,500 / Q",
        "mandiName": "Nunna Mango Market (Asia Top 3)",
        "suitability": "98% (World Famous Orchard Hub)",
        "yieldPerAcre": "45 - 55 Quintals/Acre",
        "yieldNum": 50,
        "costPerAcre": 35000,
        "estRevenuePerAcre": 217500,
        "estProfitPerAcre": 182500,
        "roi": "521%"
      },
      {
        "name": "Cotton",
        "variety": "Nandigama Long Staple Bt Cotton",
        "image": "/images/crops/cotton.jpg",
        "arrival": "22 Tons",
        "price": "₹7,580 / Q",
        "priceNum": 7580,
        "priceRange": "₹7,150 - ₹7,850",
        "trend": "+2.0%",
        "trendPositive": true,
        "msp": "₹7,122 / Q",
        "mandiName": "Nandigama Cotton Market Yard",
        "suitability": "95% (Black Cotton Soil Optimum)",
        "yieldPerAcre": "12 - 15 Quintals/Acre",
        "yieldNum": 14,
        "costPerAcre": 31000,
        "estRevenuePerAcre": 106120,
        "estProfitPerAcre": 75120,
        "roi": "242%"
      },
      {
        "name": "Black Gram (Urad Dal)",
        "variety": "LBG-752 & PU-31",
        "image": "/images/crops/black_gram.jpg",
        "arrival": "18 Tons",
        "price": "₹8,520 / Q",
        "priceNum": 8520,
        "priceRange": "₹8,100 - ₹8,850",
        "trend": "+2.8%",
        "trendPositive": true,
        "msp": "₹6,950 / Q",
        "mandiName": "Vijayawada Wholesale Grain Mandi",
        "suitability": "96% (Krishna Basin Pulse)",
        "yieldPerAcre": "6 - 8 Quintals/Acre",
        "yieldNum": 7,
        "costPerAcre": 12500,
        "estRevenuePerAcre": 59640,
        "estProfitPerAcre": 47140,
        "roi": "377%"
      },
      {
        "name": "Chilli",
        "variety": "Tiruvuru Spiced Red Chilli",
        "image": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600&auto=format&fit=crop",
        "arrival": "14 Tons",
        "price": "₹17,800 / Q",
        "priceNum": 17800,
        "priceRange": "₹16,900 - ₹18,600",
        "trend": "+3.7%",
        "trendPositive": true,
        "msp": "₹16,000 / Q",
        "mandiName": "Tiruvuru Spices Yard",
        "suitability": "93% (Semi-Dry Spices Tract)",
        "yieldPerAcre": "20 - 23 Quintals/Acre",
        "yieldNum": 22,
        "costPerAcre": 52000,
        "estRevenuePerAcre": 391600,
        "estProfitPerAcre": 339600,
        "roi": "653%"
      }
    ]
  },
  "Palnadu": {
    "name": "Palnadu",
    "center": [
      79.8,
      16.2
    ],
    "tagline": "Fierce Red Chilli Heartland, Piduguralla Cotton & Pulses Hub",
    "soilType": "Heavy Black Soils & Limestone Rich Red Soils",
    "primarySeason": "Kharif & Rabi (Nagarjuna Sagar Right Canal & Borewell)",
    "rainfall": "790 mm Avg",
    "totalArrivals": "60 Tons",
    "activeFarmers": 390,
    "crops": [
      {
        "name": "Red Chilli",
        "variety": "334 & Teja Spiced Variety",
        "image": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600&auto=format&fit=crop",
        "arrival": "28 Tons",
        "price": "₹18,200 / Q",
        "priceNum": 18200,
        "priceRange": "₹17,400 - ₹19,000",
        "trend": "+4.2%",
        "trendPositive": true,
        "msp": "₹16,500 / Q",
        "mandiName": "Narasaraopet & Macherla Market Yard",
        "suitability": "97% (Palnadu Spice Climate)",
        "yieldPerAcre": "20 - 24 Quintals/Acre",
        "yieldNum": 22,
        "costPerAcre": 54000,
        "estRevenuePerAcre": 400400,
        "estProfitPerAcre": 346400,
        "roi": "641%"
      },
      {
        "name": "Cotton",
        "variety": "Medium-Long Staple Bt",
        "image": "/images/crops/cotton.jpg",
        "arrival": "20 Tons",
        "price": "₹7,600 / Q",
        "priceNum": 7600,
        "priceRange": "₹7,200 - ₹7,850",
        "trend": "+1.9%",
        "trendPositive": true,
        "msp": "₹7,122 / Q",
        "mandiName": "Piduguralla & Chilakaluripet Cotton Market",
        "suitability": "95% (Black Soil Heavy)",
        "yieldPerAcre": "12 - 15 Quintals/Acre",
        "yieldNum": 13,
        "costPerAcre": 31000,
        "estRevenuePerAcre": 98800,
        "estProfitPerAcre": 67800,
        "roi": "219%"
      },
      {
        "name": "Bengal Gram",
        "variety": "JG-11 Black Soil Senagalu",
        "image": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=600&auto=format&fit=crop",
        "arrival": "16 Tons",
        "price": "₹6,150 / Q",
        "priceNum": 6150,
        "priceRange": "₹5,800 - ₹6,450",
        "trend": "+2.5%",
        "trendPositive": true,
        "msp": "₹5,440 / Q",
        "mandiName": "Vinukonda Pulse Mandi",
        "suitability": "94% (Rabi Black Soil Ideal)",
        "yieldPerAcre": "8 - 10 Quintals/Acre",
        "yieldNum": 9,
        "costPerAcre": 15000,
        "estRevenuePerAcre": 55350,
        "estProfitPerAcre": 40350,
        "roi": "269%"
      },
      {
        "name": "Sweet Orange (Mosambi)",
        "variety": "Macherla Sathgudi Cheeni",
        "image": "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=600&auto=format&fit=crop",
        "arrival": "14 Tons",
        "price": "₹4,950 / Q",
        "priceNum": 4950,
        "priceRange": "₹4,500 - ₹5,400",
        "trend": "+3.8%",
        "trendPositive": true,
        "msp": "₹4,100 / Q",
        "mandiName": "Macherla Fruit Market Yard",
        "suitability": "92% (High Dry Climate Quality)",
        "yieldPerAcre": "55 - 65 Quintals/Acre",
        "yieldNum": 60,
        "costPerAcre": 42000,
        "estRevenuePerAcre": 297000,
        "estProfitPerAcre": 255000,
        "roi": "607%"
      }
    ]
  },
  "Bapatla": {
    "name": "Bapatla",
    "center": [
      80.4,
      15.9
    ],
    "tagline": "Coastal BPT Paddy, Vetapalem Cashew & Chirala Sandy Groundnut Hub",
    "soilType": "Coastal Sandy Loams, Marine Alluvial & Clayey Delta Soils",
    "primarySeason": "Sarva, Dalva & Coastal Summer Groundnut",
    "rainfall": "890 mm Avg",
    "totalArrivals": "55 Tons",
    "activeFarmers": 370,
    "crops": [
      {
        "name": "Paddy",
        "variety": "BPT 5204 (Developed at Bapatla Agri College) & Swarna",
        "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
        "arrival": "38 Tons",
        "price": "₹2,470 / Q",
        "priceNum": 2470,
        "priceRange": "₹2,380 - ₹2,580",
        "trend": "+1.9%",
        "trendPositive": true,
        "msp": "₹2,300 / Q",
        "mandiName": "Bapatla & Chirala Market Yard",
        "suitability": "98% (BPT Homeland)",
        "yieldPerAcre": "30 - 35 Quintals/Acre",
        "yieldNum": 33,
        "costPerAcre": 28000,
        "estRevenuePerAcre": 81510,
        "estProfitPerAcre": 53510,
        "roi": "191%"
      },
      {
        "name": "Cashew Nut",
        "variety": "BPP-8 High Yielding Hybrid",
        "image": "/images/crops/cashew_nuts.jpg",
        "arrival": "15 Tons",
        "price": "₹11,400 / Q",
        "priceNum": 11400,
        "priceRange": "₹10,500 - ₹12,200",
        "trend": "+4.1%",
        "trendPositive": true,
        "msp": "₹9,800 / Q",
        "mandiName": "Vetapalem Cashew Market Yard",
        "suitability": "96% (Coastal Processing Pioneer)",
        "yieldPerAcre": "10 - 13 Quintals/Acre",
        "yieldNum": 11,
        "costPerAcre": 34000,
        "estRevenuePerAcre": 125400,
        "estProfitPerAcre": 91400,
        "roi": "269%"
      },
      {
        "name": "Groundnut",
        "variety": "Chirala Sandy Soil Dharani",
        "image": "/images/crops/groundnut.jpg",
        "arrival": "14 Tons",
        "price": "₹7,150 / Q",
        "priceNum": 7150,
        "priceRange": "₹6,700 - ₹7,500",
        "trend": "+2.7%",
        "trendPositive": true,
        "msp": "₹6,377 / Q",
        "mandiName": "Chirala Coastal Sandy Belt Yard",
        "suitability": "95% (Sandy Coastline Bold Pods)",
        "yieldPerAcre": "12 - 15 Quintals/Acre",
        "yieldNum": 13,
        "costPerAcre": 22000,
        "estRevenuePerAcre": 92950,
        "estProfitPerAcre": 70950,
        "roi": "323%"
      },
      {
        "name": "Black Gram",
        "variety": "Parchur Mandi Urad Dal (LBG-752)",
        "image": "/images/crops/black_gram.jpg",
        "arrival": "11 Tons",
        "price": "₹8,480 / Q",
        "priceNum": 8480,
        "priceRange": "₹8,100 - ₹8,800",
        "trend": "+3.2%",
        "trendPositive": true,
        "msp": "₹6,950 / Q",
        "mandiName": "Parchur Grain Terminal Yard",
        "suitability": "94% (Rabi Fallow Soil)",
        "yieldPerAcre": "6 - 8 Quintals/Acre",
        "yieldNum": 7,
        "costPerAcre": 12000,
        "estRevenuePerAcre": 59360,
        "estProfitPerAcre": 47360,
        "roi": "395%"
      }
    ]
  },
  "Prakasam": {
    "name": "Prakasam",
    "center": [
      79.6,
      15.5
    ],
    "tagline": "India's FCV Tobacco Epicenter, Markapur Bengal Gram & Chilli Basin",
    "soilType": "Black Cotton Soils, Light Sandy Loams & Red Gravelly Soils",
    "primarySeason": "Kharif & Rabi (Rainfed & Micro-Irrigated)",
    "rainfall": "750 mm Avg",
    "totalArrivals": "62 Tons",
    "activeFarmers": 410,
    "crops": [
      {
        "name": "Tobacco (FCV)",
        "variety": "Flue Cured Virginia (Export Grade)",
        "image": "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=600&auto=format&fit=crop",
        "arrival": "25 Tons",
        "price": "₹19,800 / Q",
        "priceNum": 19800,
        "priceRange": "₹18,900 - ₹21,200",
        "trend": "+4.4%",
        "trendPositive": true,
        "msp": "₹17,500 / Q",
        "mandiName": "Ongole Tobacco Board Auction Platform (India HQ)",
        "suitability": "99% (National Benchmark Hub)",
        "yieldPerAcre": "8 - 11 Quintals/Acre",
        "yieldNum": 10,
        "costPerAcre": 49000,
        "estRevenuePerAcre": 198000,
        "estProfitPerAcre": 149000,
        "roi": "304%"
      },
      {
        "name": "Bengal Gram (Chickpea)",
        "variety": "JG-11 & KAK-2 Bold",
        "image": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=600&auto=format&fit=crop",
        "arrival": "22 Tons",
        "price": "₹6,180 / Q",
        "priceNum": 6180,
        "priceRange": "₹5,800 - ₹6,500",
        "trend": "+2.3%",
        "trendPositive": true,
        "msp": "₹5,440 / Q",
        "mandiName": "Markapur & Santhanuthalapadu Mandi",
        "suitability": "96% (Black Soil Cold Rabi)",
        "yieldPerAcre": "8 - 11 Quintals/Acre",
        "yieldNum": 9,
        "costPerAcre": 16000,
        "estRevenuePerAcre": 55620,
        "estProfitPerAcre": 39620,
        "roi": "248%"
      },
      {
        "name": "Red Chilli",
        "variety": "Prakasam Hot Chilli (Podili Spiced)",
        "image": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600&auto=format&fit=crop",
        "arrival": "18 Tons",
        "price": "₹18,100 / Q",
        "priceNum": 18100,
        "priceRange": "₹17,200 - ₹18,900",
        "trend": "+3.5%",
        "trendPositive": true,
        "msp": "₹16,500 / Q",
        "mandiName": "Podili Spices Market Yard",
        "suitability": "94% (Dry Weather Pod Drying)",
        "yieldPerAcre": "20 - 23 Quintals/Acre",
        "yieldNum": 21,
        "costPerAcre": 53000,
        "estRevenuePerAcre": 380100,
        "estProfitPerAcre": 327100,
        "roi": "617%"
      },
      {
        "name": "Cotton",
        "variety": "Black Soil Medium Long Staple",
        "image": "/images/crops/cotton.jpg",
        "arrival": "14 Tons",
        "price": "₹7,550 / Q",
        "priceNum": 7550,
        "priceRange": "₹7,100 - ₹7,800",
        "trend": "+1.7%",
        "trendPositive": true,
        "msp": "₹7,122 / Q",
        "mandiName": "Addanki Cotton Mandi",
        "suitability": "92% (Rainfed Black Soils)",
        "yieldPerAcre": "11 - 14 Quintals/Acre",
        "yieldNum": 13,
        "costPerAcre": 30000,
        "estRevenuePerAcre": 98150,
        "estProfitPerAcre": 68150,
        "roi": "227%"
      }
    ]
  },
  "Nellore": {
    "name": "Nellore",
    "center": [
      79.7,
      14.4
    ],
    "tagline": "Nellore Molagolukulu Fine Rice & Gudur Lemon Wholesale Capital",
    "soilType": "Coastal Alluvial, Deep Red Loamy Soils & Wetland Muck Soils",
    "primarySeason": "Kharif & Rabi (Pennar River & Somasila Dam Fed)",
    "rainfall": "1040 mm Avg",
    "totalArrivals": "65 Tons",
    "activeFarmers": 420,
    "crops": [
      {
        "name": "Nellore Rice",
        "variety": "Molagolukulu (NLR 34449)",
        "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
        "arrival": "42 Tons",
        "price": "₹2,680 / Q",
        "priceNum": 2680,
        "priceRange": "₹2,550 - ₹2,850",
        "trend": "+2.7%",
        "trendPositive": true,
        "msp": "₹2,300 / Q",
        "mandiName": "Nellore Stonebridge Agri Mandi",
        "suitability": "99% (Native GI-Quality Rice)",
        "yieldPerAcre": "28 - 34 Quintals/Acre",
        "yieldNum": 31,
        "costPerAcre": 28000,
        "estRevenuePerAcre": 83080,
        "estProfitPerAcre": 55080,
        "roi": "197%"
      },
      {
        "name": "Lemon (Acid Lime)",
        "variety": "Balaji & Vikram Citron",
        "image": "https://images.unsplash.com/photo-1590502593747-42a996133562?q=80&w=600&auto=format&fit=crop",
        "arrival": "30 Tons",
        "price": "₹4,800 / Q",
        "priceNum": 4800,
        "priceRange": "₹4,200 - ₹5,400",
        "trend": "+6.2%",
        "trendPositive": true,
        "msp": "₹3,900 / Q",
        "mandiName": "Gudur Lemon Wholesale Market Yard (India's Largest)",
        "suitability": "99% (National Lemon Capital)",
        "yieldPerAcre": "70 - 90 Quintals/Acre",
        "yieldNum": 80,
        "costPerAcre": 45000,
        "estRevenuePerAcre": 384000,
        "estProfitPerAcre": 339000,
        "roi": "753%"
      },
      {
        "name": "Sugarcane",
        "variety": "Kovur High Sugar Cane (Co 86032)",
        "image": "/images/crops/sugarcane.jpg",
        "arrival": "45 Tons",
        "price": "₹3,300 / Ton",
        "priceNum": 330,
        "priceRange": "₹3,150 - ₹3,450",
        "trend": "+1.9%",
        "trendPositive": true,
        "msp": "₹3,150 / Ton",
        "mandiName": "Kovur Sugar Mill Gate Yard",
        "suitability": "94% (Pennar Canal Valley)",
        "yieldPerAcre": "40 - 46 Tons/Acre",
        "yieldNum": 43,
        "costPerAcre": 39000,
        "estRevenuePerAcre": 141900,
        "estProfitPerAcre": 102900,
        "roi": "264%"
      },
      {
        "name": "Black Gram",
        "variety": "LBG-752 Post-Paddy Pulse",
        "image": "/images/crops/black_gram.jpg",
        "arrival": "10 Tons",
        "price": "₹8,400 / Q",
        "priceNum": 8400,
        "priceRange": "₹8,000 - ₹8,750",
        "trend": "+2.5%",
        "trendPositive": true,
        "msp": "₹6,950 / Q",
        "mandiName": "Atmakur Pulse Yard",
        "suitability": "93% (Relay Residual Moisture)",
        "yieldPerAcre": "6 - 7 Quintals/Acre",
        "yieldNum": 6.5,
        "costPerAcre": 11000,
        "estRevenuePerAcre": 54600,
        "estProfitPerAcre": 43600,
        "roi": "396%"
      }
    ]
  },
  "Kurnool": {
    "name": "Kurnool",
    "center": [
      78.05,
      15.8
    ],
    "tagline": "Adoni Cotton Capital, Kurnool Red Onion & Nutri-Cereal Heartland",
    "soilType": "Deep Black Cotton Soils & Mixed Red Loams",
    "primarySeason": "Kharif & Rabi (Tungabhadra Basin)",
    "rainfall": "670 mm Avg",
    "totalArrivals": "70 Tons",
    "activeFarmers": 460,
    "crops": [
      {
        "name": "Cotton",
        "variety": "Adoni Long Staple Bt Hybrid",
        "image": "/images/crops/cotton.jpg",
        "arrival": "38 Tons",
        "price": "₹7,750 / Q",
        "priceNum": 7750,
        "priceRange": "₹7,300 - ₹8,100",
        "trend": "+2.9%",
        "trendPositive": true,
        "msp": "₹7,122 / Q",
        "mandiName": "Adoni Cotton Market (AP's Largest Cotton Yard)",
        "suitability": "98% (Cotton Hub of Rayalaseema)",
        "yieldPerAcre": "13 - 16 Quintals/Acre",
        "yieldNum": 15,
        "costPerAcre": 33000,
        "estRevenuePerAcre": 116250,
        "estProfitPerAcre": 83250,
        "roi": "252%"
      },
      {
        "name": "Onion",
        "variety": "Kurnool Red Bellary Variety",
        "image": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=600&auto=format&fit=crop",
        "arrival": "40 Tons",
        "price": "₹2,100 / Q",
        "priceNum": 2100,
        "priceRange": "₹1,850 - ₹2,350",
        "trend": "-1.5%",
        "trendPositive": false,
        "msp": "₹1,750 / Q",
        "mandiName": "Kurnool Rythu Bazaar & Market Yard",
        "suitability": "97% (Red Soil Onion Heartland)",
        "yieldPerAcre": "70 - 90 Quintals/Acre",
        "yieldNum": 80,
        "costPerAcre": 42000,
        "estRevenuePerAcre": 168000,
        "estProfitPerAcre": 126000,
        "roi": "300%"
      },
      {
        "name": "Groundnut",
        "variety": "K6 Dharani Pods",
        "image": "/images/crops/groundnut.jpg",
        "arrival": "20 Tons",
        "price": "₹6,850 / Q",
        "priceNum": 6850,
        "priceRange": "₹6,400 - ₹7,250",
        "trend": "+2.1%",
        "trendPositive": true,
        "msp": "₹6,377 / Q",
        "mandiName": "Yemmiganur Oilseed Market",
        "suitability": "95% (Semi-Arid Pods)",
        "yieldPerAcre": "9 - 12 Quintals/Acre",
        "yieldNum": 10,
        "costPerAcre": 19000,
        "estRevenuePerAcre": 68500,
        "estProfitPerAcre": 49500,
        "roi": "261%"
      },
      {
        "name": "Foxtail Millet (Korra)",
        "variety": "Rayalaseema Nutri-Cereal (SIA-3156)",
        "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop",
        "arrival": "12 Tons",
        "price": "₹3,750 / Q",
        "priceNum": 3750,
        "priceRange": "₹3,450 - ₹4,050",
        "trend": "+1.9%",
        "trendPositive": true,
        "msp": "₹3,400 / Q",
        "mandiName": "Dhone Millet Market Yard",
        "suitability": "96% (Drought Resilient)",
        "yieldPerAcre": "10 - 12 Quintals/Acre",
        "yieldNum": 11,
        "costPerAcre": 9500,
        "estRevenuePerAcre": 41250,
        "estProfitPerAcre": 31750,
        "roi": "334%"
      }
    ]
  },
  "Nandyal": {
    "name": "Nandyal",
    "center": [
      78.48,
      15.48
    ],
    "tagline": "National Bengal Gram Breeding & Trading Epicenter, Maize & Jowar Hub",
    "soilType": "Deep Calcareous Black Soils & Alluvial Basins",
    "primarySeason": "Rabi Bengal Gram & Kharif Maize/Jowar",
    "rainfall": "710 mm Avg",
    "totalArrivals": "65 Tons",
    "activeFarmers": 430,
    "crops": [
      {
        "name": "Bengal Gram",
        "variety": "Nandyal Senagalu (NBeG 3)",
        "image": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=600&auto=format&fit=crop",
        "arrival": "38 Tons",
        "price": "₹6,280 / Q",
        "priceNum": 6280,
        "priceRange": "₹5,900 - ₹6,600",
        "trend": "+3.1%",
        "trendPositive": true,
        "msp": "₹5,440 / Q",
        "mandiName": "Nandyal Agricultural Market Yard (National Benchmark)",
        "suitability": "99% (National Benchmark Hub)",
        "yieldPerAcre": "9 - 12 Quintals/Acre",
        "yieldNum": 11,
        "costPerAcre": 16000,
        "estRevenuePerAcre": 69080,
        "estProfitPerAcre": 53080,
        "roi": "332%"
      },
      {
        "name": "Maize",
        "variety": "High Starch Yellow Feed Corn",
        "image": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
        "arrival": "25 Tons",
        "price": "₹2,260 / Q",
        "priceNum": 2260,
        "priceRange": "₹2,120 - ₹2,380",
        "trend": "+2.1%",
        "trendPositive": true,
        "msp": "₹2,090 / Q",
        "mandiName": "Allagadda & Nandyal Grain Mandi",
        "suitability": "95% (High Starch Yield)",
        "yieldPerAcre": "28 - 34 Quintals/Acre",
        "yieldNum": 31,
        "costPerAcre": 23000,
        "estRevenuePerAcre": 70060,
        "estProfitPerAcre": 47060,
        "roi": "205%"
      },
      {
        "name": "Jowar (Sorghum)",
        "variety": "Nandyal White Jonnalu (NJ 2647)",
        "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop",
        "arrival": "16 Tons",
        "price": "₹3,450 / Q",
        "priceNum": 3450,
        "priceRange": "₹3,200 - ₹3,700",
        "trend": "+1.8%",
        "trendPositive": true,
        "msp": "₹3,180 / Q",
        "mandiName": "Banaganapalle Millet Yard",
        "suitability": "96% (Deep Black Soil Rainfed)",
        "yieldPerAcre": "14 - 18 Quintals/Acre",
        "yieldNum": 16,
        "costPerAcre": 13000,
        "estRevenuePerAcre": 55200,
        "estProfitPerAcre": 42200,
        "roi": "325%"
      },
      {
        "name": "Banana",
        "variety": "Grand Naine Tissue Culture",
        "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=600&auto=format&fit=crop",
        "arrival": "20 Tons",
        "price": "₹1,620 / Q",
        "priceNum": 1620,
        "priceRange": "₹1,450 - ₹1,800",
        "trend": "+3.4%",
        "trendPositive": true,
        "msp": "₹1,300 / Q",
        "mandiName": "Allagadda Fruit Market",
        "suitability": "93% (Kundu River Irrigated)",
        "yieldPerAcre": "130 - 160 Quintals/Acre",
        "yieldNum": 145,
        "costPerAcre": 58000,
        "estRevenuePerAcre": 234900,
        "estProfitPerAcre": 176900,
        "roi": "305%"
      }
    ]
  },
  "Sri Sathya Sai": {
    "name": "Sri Sathya Sai",
    "center": [
      77.7,
      14.2
    ],
    "tagline": "Kadiri Groundnut Homeland, Hindupur Silk Cocoon Market & Tamarind Hub",
    "soilType": "Red Sandy Loams & Well-Drained Red Chalkas",
    "primarySeason": "Kharif Groundnut & Perennial Sericulture",
    "rainfall": "560 mm Avg",
    "totalArrivals": "52 Tons",
    "activeFarmers": 395,
    "crops": [
      {
        "name": "Groundnut",
        "variety": "Kadiri Lepakshi & Kadiri-6",
        "image": "/images/crops/groundnut.jpg",
        "arrival": "32 Tons",
        "price": "₹7,050 / Q",
        "priceNum": 7050,
        "priceRange": "₹6,600 - ₹7,450",
        "trend": "+3.2%",
        "trendPositive": true,
        "msp": "₹6,377 / Q",
        "mandiName": "Kadiri & Dharmavaram Agri Market Yard",
        "suitability": "98% (Kadiri Genetic Homeland)",
        "yieldPerAcre": "9 - 12 Quintals/Acre",
        "yieldNum": 11,
        "costPerAcre": 19000,
        "estRevenuePerAcre": 77550,
        "estProfitPerAcre": 58550,
        "roi": "308%"
      },
      {
        "name": "Mulberry Silk (Cocoon)",
        "variety": "Bivoltine High Grade Silk Cocoon",
        "image": "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop",
        "arrival": "12 Tons",
        "price": "₹52,000 / Q",
        "priceNum": 52000,
        "priceRange": "₹48,000 - ₹56,000",
        "trend": "+5.4%",
        "trendPositive": true,
        "msp": "₹42,000 / Q",
        "mandiName": "Hindupur Govt Silk Cocoon Market",
        "suitability": "97% (Premier Silk Yard)",
        "yieldPerAcre": "6 - 8 Quintals/Acre",
        "yieldNum": 7,
        "costPerAcre": 65000,
        "estRevenuePerAcre": 364000,
        "estProfitPerAcre": 299000,
        "roi": "460%"
      },
      {
        "name": "Mango",
        "variety": "Banganapalli & Raspuri",
        "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop",
        "arrival": "18 Tons",
        "price": "₹4,150 / Q",
        "priceNum": 4150,
        "priceRange": "₹3,750 - ₹4,650",
        "trend": "+3.0%",
        "trendPositive": true,
        "msp": "₹3,500 / Q",
        "mandiName": "Penukonda Fruit Mandi",
        "suitability": "94% (Dry Weather High Brix)",
        "yieldPerAcre": "40 - 50 Quintals/Acre",
        "yieldNum": 45,
        "costPerAcre": 32000,
        "estRevenuePerAcre": 186750,
        "estProfitPerAcre": 154750,
        "roi": "484%"
      },
      {
        "name": "Tamarind",
        "variety": "Hindupur Sweet & Sour Bold Pulp",
        "image": "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=600&auto=format&fit=crop",
        "arrival": "14 Tons",
        "price": "₹8,900 / Q",
        "priceNum": 8900,
        "priceRange": "₹8,200 - ₹9,600",
        "trend": "+2.6%",
        "trendPositive": true,
        "msp": "₹7,200 / Q",
        "mandiName": "Hindupur Tamarind Terminal",
        "suitability": "96% (Dry Tract Perennial)",
        "yieldPerAcre": "25 - 35 Quintals/Acre",
        "yieldNum": 30,
        "costPerAcre": 25000,
        "estRevenuePerAcre": 267000,
        "estProfitPerAcre": 242000,
        "roi": "968%"
      }
    ]
  },
  "YSR Kadapa": {
    "name": "YSR Kadapa",
    "center": [
      78.8,
      14.5
    ],
    "tagline": "Banana Export Capital, Mydukur Curcumin-Rich Turmeric & Citrus Basin",
    "soilType": "Red Gravelly Soils, Black Cotton Soils & River Valley Alluvial",
    "primarySeason": "Perennial Horticulture & Rabi Pulses",
    "rainfall": "695 mm Avg",
    "totalArrivals": "72 Tons",
    "activeFarmers": 470,
    "crops": [
      {
        "name": "Banana",
        "variety": "Tissue Culture Grand Naine (Export Grade)",
        "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=600&auto=format&fit=crop",
        "arrival": "45 Tons",
        "price": "₹1,750 / Q",
        "priceNum": 1750,
        "priceRange": "₹1,550 - ₹1,950",
        "trend": "+4.9%",
        "trendPositive": true,
        "msp": "₹1,350 / Q",
        "mandiName": "Pulivendula & Kadapa Fruit Market (Export Train Direct)",
        "suitability": "99% (State's Leading Banana Cluster)",
        "yieldPerAcre": "160 - 200 Quintals/Acre",
        "yieldNum": 180,
        "costPerAcre": 70000,
        "estRevenuePerAcre": 315000,
        "estProfitPerAcre": 245000,
        "roi": "350%"
      },
      {
        "name": "Turmeric",
        "variety": "Kadapa Yellow Curcumin Rich",
        "image": "/images/crops/turmeric.jpg",
        "arrival": "22 Tons",
        "price": "₹9,850 / Q",
        "priceNum": 9850,
        "priceRange": "₹9,200 - ₹10,600",
        "trend": "+5.8%",
        "trendPositive": true,
        "msp": "₹8,400 / Q",
        "mandiName": "Mydukur & Kadapa Turmeric Market Yard",
        "suitability": "97% (High Curcumin Alluvial)",
        "yieldPerAcre": "22 - 26 Quintals/Acre",
        "yieldNum": 24,
        "costPerAcre": 48000,
        "estRevenuePerAcre": 236400,
        "estProfitPerAcre": 188400,
        "roi": "392%"
      },
      {
        "name": "Sweet Orange (Cheeni)",
        "variety": "Sathgudi Citrus Sweet Lime",
        "image": "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=600&auto=format&fit=crop",
        "arrival": "18 Tons",
        "price": "₹5,100 / Q",
        "priceNum": 5100,
        "priceRange": "₹4,600 - ₹5,600",
        "trend": "+3.6%",
        "trendPositive": true,
        "msp": "₹4,100 / Q",
        "mandiName": "Proddatur Fruit Yard",
        "suitability": "95% (Semi-Arid Citrus)",
        "yieldPerAcre": "60 - 70 Quintals/Acre",
        "yieldNum": 65,
        "costPerAcre": 46000,
        "estRevenuePerAcre": 331500,
        "estProfitPerAcre": 285500,
        "roi": "621%"
      },
      {
        "name": "Bengal Gram",
        "variety": "Black Soil Senagalu (JG-11)",
        "image": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=600&auto=format&fit=crop",
        "arrival": "12 Tons",
        "price": "₹6,150 / Q",
        "priceNum": 6150,
        "priceRange": "₹5,800 - ₹6,450",
        "trend": "+2.1%",
        "trendPositive": true,
        "msp": "₹5,440 / Q",
        "mandiName": "Jammalamadugu Pulse Mandi",
        "suitability": "93% (Black Cotton Soils)",
        "yieldPerAcre": "8 - 10 Quintals/Acre",
        "yieldNum": 9,
        "costPerAcre": 15000,
        "estRevenuePerAcre": 55350,
        "estProfitPerAcre": 40350,
        "roi": "269%"
      }
    ]
  },
  "Annamayya": {
    "name": "Annamayya",
    "center": [
      78.7,
      13.9
    ],
    "tagline": "Asia's Largest Tomato Yard Madanapalle, Totapuri Mango & Red Papaya",
    "soilType": "Red Sandy Loams & Well-Drained Hill Basin Soils",
    "primarySeason": "Year-Round Tomato & Kharif Horticulture",
    "rainfall": "740 mm Avg",
    "totalArrivals": "85 Tons",
    "activeFarmers": 540,
    "crops": [
      {
        "name": "Tomato",
        "variety": "Madanapalle Hybrid Red (Asia's #1)",
        "image": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop",
        "arrival": "55 Tons",
        "price": "₹2,650 / Q",
        "priceNum": 2650,
        "priceRange": "₹2,200 - ₹3,100",
        "trend": "+8.4%",
        "trendPositive": true,
        "msp": "₹1,800 / Q",
        "mandiName": "Madanapalle Tomato Mandi (Asia's Largest Tomato Yard)",
        "suitability": "99% (World-Famous Benchmark)",
        "yieldPerAcre": "180 - 240 Quintals/Acre",
        "yieldNum": 210,
        "costPerAcre": 72000,
        "estRevenuePerAcre": 556500,
        "estProfitPerAcre": 484500,
        "roi": "673%"
      },
      {
        "name": "Mango",
        "variety": "Totapuri (Processing Grade) & Banganapalli",
        "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop",
        "arrival": "30 Tons",
        "price": "₹3,900 / Q",
        "priceNum": 3900,
        "priceRange": "₹3,400 - ₹4,400",
        "trend": "+3.1%",
        "trendPositive": true,
        "msp": "₹3,200 / Q",
        "mandiName": "Rayachoti & Madanapalle Pulp Terminal",
        "suitability": "96% (Pulp Industry Hub)",
        "yieldPerAcre": "50 - 65 Quintals/Acre",
        "yieldNum": 58,
        "costPerAcre": 38000,
        "estRevenuePerAcre": 226200,
        "estProfitPerAcre": 188200,
        "roi": "495%"
      },
      {
        "name": "Papaya",
        "variety": "Red Lady High Brics Table Fruit",
        "image": "https://images.unsplash.com/photo-1541344999736-83eca872f241?q=80&w=600&auto=format&fit=crop",
        "arrival": "20 Tons",
        "price": "₹1,550 / Q",
        "priceNum": 1550,
        "priceRange": "₹1,350 - ₹1,750",
        "trend": "+3.8%",
        "trendPositive": true,
        "msp": "₹1,200 / Q",
        "mandiName": "Pileru Fruit Market Yard",
        "suitability": "95% (Drip Irrigated Hill Basin)",
        "yieldPerAcre": "200 - 260 Quintals/Acre",
        "yieldNum": 230,
        "costPerAcre": 68000,
        "estRevenuePerAcre": 356500,
        "estProfitPerAcre": 288500,
        "roi": "424%"
      },
      {
        "name": "Groundnut",
        "variety": "Rayachoti Dharani K6",
        "image": "/images/crops/groundnut.jpg",
        "arrival": "15 Tons",
        "price": "₹6,980 / Q",
        "priceNum": 6980,
        "priceRange": "₹6,500 - ₹7,350",
        "trend": "+2.2%",
        "trendPositive": true,
        "msp": "₹6,377 / Q",
        "mandiName": "Rayachoti Oilseed Mandi",
        "suitability": "94% (Rainfed Red Soils)",
        "yieldPerAcre": "9 - 12 Quintals/Acre",
        "yieldNum": 10.5,
        "costPerAcre": 19500,
        "estRevenuePerAcre": 73290,
        "estProfitPerAcre": 53790,
        "roi": "276%"
      }
    ]
  },
  "Chittoor": {
    "name": "Chittoor",
    "center": [
      79.1,
      13.2
    ],
    "tagline": "India's Mango Pulp Processing Capital, Sugarcane & Table Tomato Basin",
    "soilType": "Red Sandy Loams & Well-Drained Granite Weathered Soils",
    "primarySeason": "Perennial Horticulture & Kharif Rainfed",
    "rainfall": "890 mm Avg",
    "totalArrivals": "80 Tons",
    "activeFarmers": 510,
    "crops": [
      {
        "name": "Mango (Totapuri)",
        "variety": "Industrial Pulp Processing Grade",
        "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop",
        "arrival": "50 Tons",
        "price": "₹3,950 / Q",
        "priceNum": 3950,
        "priceRange": "₹3,500 - ₹4,500",
        "trend": "+4.1%",
        "trendPositive": true,
        "msp": "₹3,200 / Q",
        "mandiName": "Chittoor Fruit Processing Market Yard (60+ Pulp Plants)",
        "suitability": "99% (National Pulp Industry Epicenter)",
        "yieldPerAcre": "55 - 70 Quintals/Acre",
        "yieldNum": 62,
        "costPerAcre": 40000,
        "estRevenuePerAcre": 244900,
        "estProfitPerAcre": 204900,
        "roi": "512%"
      },
      {
        "name": "Sugarcane",
        "variety": "Co 86032 High Recovery",
        "image": "/images/crops/sugarcane.jpg",
        "arrival": "55 Tons",
        "price": "₹3,320 / Ton",
        "priceNum": 332,
        "priceRange": "₹3,150 - ₹3,500",
        "trend": "+1.6%",
        "trendPositive": true,
        "msp": "₹3,150 / Ton",
        "mandiName": "Chittoor Sugar Mill Gate Yard",
        "suitability": "96% (Sub-Tropical Irrigated)",
        "yieldPerAcre": "42 - 48 Tons/Acre",
        "yieldNum": 45,
        "costPerAcre": 41000,
        "estRevenuePerAcre": 149400,
        "estProfitPerAcre": 108400,
        "roi": "264%"
      },
      {
        "name": "Tomato",
        "variety": "Palamaner Table Grade Hybrid",
        "image": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop",
        "arrival": "25 Tons",
        "price": "₹2,580 / Q",
        "priceNum": 2580,
        "priceRange": "₹2,150 - ₹2,950",
        "trend": "+6.5%",
        "trendPositive": true,
        "msp": "₹1,800 / Q",
        "mandiName": "Palamaner Vegetable Terminal",
        "suitability": "96% (Mild Climate Plateau)",
        "yieldPerAcre": "170 - 220 Quintals/Acre",
        "yieldNum": 195,
        "costPerAcre": 68000,
        "estRevenuePerAcre": 503100,
        "estProfitPerAcre": 435100,
        "roi": "640%"
      },
      {
        "name": "Groundnut",
        "variety": "JL-24 & Kadiri Bold",
        "image": "/images/crops/groundnut.jpg",
        "arrival": "16 Tons",
        "price": "₹7,020 / Q",
        "priceNum": 7020,
        "priceRange": "₹6,600 - ₹7,400",
        "trend": "+2.4%",
        "trendPositive": true,
        "msp": "₹6,377 / Q",
        "mandiName": "Kuppam Agri Yard",
        "suitability": "94% (Red Sandy Uplands)",
        "yieldPerAcre": "9 - 12 Quintals/Acre",
        "yieldNum": 10.5,
        "costPerAcre": 19000,
        "estRevenuePerAcre": 73710,
        "estProfitPerAcre": 54710,
        "roi": "288%"
      }
    ]
  },
  "Tirupati": {
    "name": "Tirupati",
    "center": [
      79.4,
      13.6
    ],
    "tagline": "Paddy Granary, Groundnut Belt & Temple Floriculture Haven",
    "soilType": "Sandy Loams, Red Clay Loams & Swarnamukhi River Alluvial",
    "primarySeason": "Kharif & Rabi (Kalyani & Swarnamukhi Basins)",
    "rainfall": "920 mm Avg",
    "totalArrivals": "58 Tons",
    "activeFarmers": 390,
    "crops": [
      {
        "name": "Paddy",
        "variety": "NLR 34449 & IR 64",
        "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
        "arrival": "36 Tons",
        "price": "₹2,500 / Q",
        "priceNum": 2500,
        "priceRange": "₹2,380 - ₹2,620",
        "trend": "+1.9%",
        "trendPositive": true,
        "msp": "₹2,300 / Q",
        "mandiName": "Tirupati & Srikalahasti Agri Yard",
        "suitability": "97% (Swarnamukhi River Basin)",
        "yieldPerAcre": "28 - 34 Quintals/Acre",
        "yieldNum": 31,
        "costPerAcre": 27000,
        "estRevenuePerAcre": 77500,
        "estProfitPerAcre": 50500,
        "roi": "187%"
      },
      {
        "name": "Groundnut",
        "variety": "Dharani & Kadiri Bold",
        "image": "/images/crops/groundnut.jpg",
        "arrival": "22 Tons",
        "price": "₹7,100 / Q",
        "priceNum": 7100,
        "priceRange": "₹6,650 - ₹7,450",
        "trend": "+2.5%",
        "trendPositive": true,
        "msp": "₹6,377 / Q",
        "mandiName": "Chandragiri Groundnut Yard",
        "suitability": "96% (High Oilseed Potential)",
        "yieldPerAcre": "10 - 13 Quintals/Acre",
        "yieldNum": 11.5,
        "costPerAcre": 20000,
        "estRevenuePerAcre": 81650,
        "estProfitPerAcre": 61650,
        "roi": "308%"
      },
      {
        "name": "Sugarcane",
        "variety": "Srikalahasti Sugar Cane (Co 86032)",
        "image": "/images/crops/sugarcane.jpg",
        "arrival": "35 Tons",
        "price": "₹3,310 / Ton",
        "priceNum": 331,
        "priceRange": "₹3,150 - ₹3,450",
        "trend": "+1.7%",
        "trendPositive": true,
        "msp": "₹3,150 / Ton",
        "mandiName": "Srikalahasti Sugar Mill Yard",
        "suitability": "94% (Canal Irrigated)",
        "yieldPerAcre": "38 - 45 Tons/Acre",
        "yieldNum": 42,
        "costPerAcre": 38000,
        "estRevenuePerAcre": 139020,
        "estProfitPerAcre": 101020,
        "roi": "266%"
      },
      {
        "name": "Jasmine & Floriculture",
        "variety": "Temple Garland Grade Malli",
        "image": "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop",
        "arrival": "14 Tons",
        "price": "₹32,000 / Q",
        "priceNum": 32000,
        "priceRange": "₹28,000 - ₹38,000",
        "trend": "+8.2%",
        "trendPositive": true,
        "msp": "₹25,000 / Q",
        "mandiName": "Tirupati Flower Wholesale Mandi",
        "suitability": "98% (High Religious Demand)",
        "yieldPerAcre": "18 - 25 Quintals/Acre",
        "yieldNum": 21,
        "costPerAcre": 75000,
        "estRevenuePerAcre": 672000,
        "estProfitPerAcre": 597000,
        "roi": "796%"
      }
    ]
  },
  "Visakhapatnam": {
    "name": "Visakhapatnam",
    "center": [
      83.3,
      17.7
    ],
    "tagline": "Coastal Agro-Corridor, Sugarcane, Bheemunipatnam Cashew & Floriculture",
    "soilType": "Coastal Red Sandy Loams & Well-Drained Lateritic Soils",
    "primarySeason": "Kharif & Rabi (Coastal Humid Micro-Climate)",
    "rainfall": "1020 mm Avg",
    "totalArrivals": "50 Tons",
    "activeFarmers": 340,
    "crops": [
      {
        "name": "Sugarcane",
        "variety": "Co 7706 & Co 86032",
        "image": "/images/crops/sugarcane.jpg",
        "arrival": "32 Tons",
        "price": "₹3,320 / Ton",
        "priceNum": 332,
        "priceRange": "₹3,150 - ₹3,480",
        "trend": "+1.9%",
        "trendPositive": true,
        "msp": "₹3,150 / Ton",
        "mandiName": "Anandapuram Agri Terminal Yard",
        "suitability": "95% (High Coastal Sucrose)",
        "yieldPerAcre": "40 - 46 Tons/Acre",
        "yieldNum": 43,
        "costPerAcre": 38000,
        "estRevenuePerAcre": 142760,
        "estProfitPerAcre": 104760,
        "roi": "276%"
      },
      {
        "name": "Cashew Nut",
        "variety": "Vengurla-4 Hybrid",
        "image": "/images/crops/cashew_nuts.jpg",
        "arrival": "14 Tons",
        "price": "₹11,600 / Q",
        "priceNum": 11600,
        "priceRange": "₹10,800 - ₹12,400",
        "trend": "+3.8%",
        "trendPositive": true,
        "msp": "₹9,800 / Q",
        "mandiName": "Bheemunipatnam Cashew Market",
        "suitability": "96% (Coastal Orchard Belt)",
        "yieldPerAcre": "10 - 14 Quintals/Acre",
        "yieldNum": 12,
        "costPerAcre": 35000,
        "estRevenuePerAcre": 139200,
        "estProfitPerAcre": 104200,
        "roi": "298%"
      },
      {
        "name": "Paddy",
        "variety": "RGL 2537 Coastal Wetland Rice",
        "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
        "arrival": "22 Tons",
        "price": "₹2,420 / Q",
        "priceNum": 2420,
        "priceRange": "₹2,320 - ₹2,520",
        "trend": "+1.5%",
        "trendPositive": true,
        "msp": "₹2,300 / Q",
        "mandiName": "Visakhapatnam Rural Mandi",
        "suitability": "93% (Coastal Wetland)",
        "yieldPerAcre": "28 - 32 Quintals/Acre",
        "yieldNum": 30,
        "costPerAcre": 26000,
        "estRevenuePerAcre": 72600,
        "estProfitPerAcre": 46600,
        "roi": "179%"
      },
      {
        "name": "Floriculture & Marigold",
        "variety": "Pusa Narangi Table Garland Grade",
        "image": "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop",
        "arrival": "10 Tons",
        "price": "₹12,500 / Q",
        "priceNum": 12500,
        "priceRange": "₹10,500 - ₹14,500",
        "trend": "+5.6%",
        "trendPositive": true,
        "msp": "₹9,500 / Q",
        "mandiName": "Anandapuram Flower Yard",
        "suitability": "96% (Urban Peri-Artery Demand)",
        "yieldPerAcre": "35 - 45 Quintals/Acre",
        "yieldNum": 40,
        "costPerAcre": 48000,
        "estRevenuePerAcre": 500000,
        "estProfitPerAcre": 452000,
        "roi": "942%"
      }
    ]
  },
  "Anakapalli": {
    "name": "Anakapalli",
    "center": [
      82.98,
      17.68
    ],
    "tagline": "Asia's 2nd Largest Jaggery Market, Sugarcane Heartland & Sesame Hub",
    "soilType": "Deep Alluvial Loams & Well-Drained Red Loamy Soils",
    "primarySeason": "Sarada River Basin Kharif & Perennial Cane",
    "rainfall": "1010 mm Avg",
    "totalArrivals": "75 Tons",
    "activeFarmers": 490,
    "crops": [
      {
        "name": "Jaggery (Bellam)",
        "variety": "GI-Registered Anakapalli Golden Jaggery Lump",
        "image": "/images/crops/jaggery.jpg",
        "arrival": "48 Tons",
        "price": "₹4,600 / Q",
        "priceNum": 4600,
        "priceRange": "₹4,200 - ₹4,950",
        "trend": "+4.6%",
        "trendPositive": true,
        "msp": "₹3,800 / Q",
        "mandiName": "Anakapalli Jaggery Market (Asia's 2nd Largest)",
        "suitability": "99% (GI Benchmark Yard)",
        "yieldPerAcre": "45 - 55 Quintals/Acre",
        "yieldNum": 50,
        "costPerAcre": 44000,
        "estRevenuePerAcre": 230000,
        "estProfitPerAcre": 186000,
        "roi": "423%"
      },
      {
        "name": "Sugarcane",
        "variety": "High Sucrose Jaggery Cane (Co 86032)",
        "image": "/images/crops/sugarcane.jpg",
        "arrival": "50 Tons",
        "price": "₹3,380 / Ton",
        "priceNum": 338,
        "priceRange": "₹3,200 - ₹3,550",
        "trend": "+2.1%",
        "trendPositive": true,
        "msp": "₹3,150 / Ton",
        "mandiName": "Chodavaram Sugar & Jaggery Yard",
        "suitability": "98% (Sarada River Basin Ideal)",
        "yieldPerAcre": "42 - 50 Tons/Acre",
        "yieldNum": 46,
        "costPerAcre": 40000,
        "estRevenuePerAcre": 155480,
        "estProfitPerAcre": 115480,
        "roi": "289%"
      },
      {
        "name": "Paddy",
        "variety": "RGL 2537 (Srikakulam Sannalu)",
        "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
        "arrival": "30 Tons",
        "price": "₹2,450 / Q",
        "priceNum": 2450,
        "priceRange": "₹2,350 - ₹2,550",
        "trend": "+1.6%",
        "trendPositive": true,
        "msp": "₹2,300 / Q",
        "mandiName": "Anakapalli Grain Yard",
        "suitability": "95% (Wetland Alluvial)",
        "yieldPerAcre": "30 - 34 Quintals/Acre",
        "yieldNum": 32,
        "costPerAcre": 27000,
        "estRevenuePerAcre": 78400,
        "estProfitPerAcre": 51400,
        "roi": "190%"
      },
      {
        "name": "Sesame (Gingelly)",
        "variety": "Nuvvulu High Oilseed Variety",
        "image": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=600&auto=format&fit=crop",
        "arrival": "12 Tons",
        "price": "₹12,800 / Q",
        "priceNum": 12800,
        "priceRange": "₹11,900 - ₹13,600",
        "trend": "+3.8%",
        "trendPositive": true,
        "msp": "₹9,267 / Q",
        "mandiName": "Yelamanchili Oilseed Mandi",
        "suitability": "94% (Summer Residual Crop)",
        "yieldPerAcre": "4 - 6 Quintals/Acre",
        "yieldNum": 5,
        "costPerAcre": 12000,
        "estRevenuePerAcre": 64000,
        "estProfitPerAcre": 52000,
        "roi": "433%"
      }
    ]
  },
  "Vizianagaram": {
    "name": "Vizianagaram",
    "center": [
      83.4,
      18.1
    ],
    "tagline": "North Coastal Maize Heartland, Suvarnarekha Mango & NCS Sugar Belt",
    "soilType": "Red Sandy Loams & Well-Drained Red Loams",
    "primarySeason": "Kharif & Rabi (Nagavali & Champavathi Basins)",
    "rainfall": "1030 mm Avg",
    "totalArrivals": "65 Tons",
    "activeFarmers": 430,
    "crops": [
      {
        "name": "Maize",
        "variety": "Pioneer Hybrid Grain Corn",
        "image": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
        "arrival": "40 Tons",
        "price": "₹2,310 / Q",
        "priceNum": 2310,
        "priceRange": "₹2,190 - ₹2,420",
        "trend": "+2.8%",
        "trendPositive": true,
        "msp": "₹2,090 / Q",
        "mandiName": "Vizianagaram Agri Market Yard (Leading North Coast Corn Hub)",
        "suitability": "98% (Regional Epicenter)",
        "yieldPerAcre": "32 - 38 Quintals/Acre",
        "yieldNum": 35,
        "costPerAcre": 24000,
        "estRevenuePerAcre": 80850,
        "estProfitPerAcre": 56850,
        "roi": "237%"
      },
      {
        "name": "Mango",
        "variety": "Suvarnarekha & Banganapalli",
        "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop",
        "arrival": "24 Tons",
        "price": "₹4,250 / Q",
        "priceNum": 4250,
        "priceRange": "₹3,800 - ₹4,700",
        "trend": "+3.9%",
        "trendPositive": true,
        "msp": "₹3,500 / Q",
        "mandiName": "Salur & Bobbili Fruit Mandi",
        "suitability": "96% (Native Suvarnarekha)",
        "yieldPerAcre": "45 - 55 Quintals/Acre",
        "yieldNum": 50,
        "costPerAcre": 35000,
        "estRevenuePerAcre": 212500,
        "estProfitPerAcre": 177500,
        "roi": "507%"
      },
      {
        "name": "Sugarcane",
        "variety": "Bobbili NCS High Sugar Cane",
        "image": "/images/crops/sugarcane.jpg",
        "arrival": "35 Tons",
        "price": "₹3,340 / Ton",
        "priceNum": 334,
        "priceRange": "₹3,180 - ₹3,500",
        "trend": "+1.9%",
        "trendPositive": true,
        "msp": "₹3,150 / Ton",
        "mandiName": "Bobbili Sugar Mill Yard",
        "suitability": "95% (Champavathi Valley)",
        "yieldPerAcre": "38 - 44 Tons/Acre",
        "yieldNum": 41,
        "costPerAcre": 37000,
        "estRevenuePerAcre": 136940,
        "estProfitPerAcre": 99940,
        "roi": "270%"
      },
      {
        "name": "Finger Millet (Ragi)",
        "variety": "North Coastal Nutri-Cereal (VR 847)",
        "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop",
        "arrival": "14 Tons",
        "price": "₹3,950 / Q",
        "priceNum": 3950,
        "priceRange": "₹3,600 - ₹4,250",
        "trend": "+2.2%",
        "trendPositive": true,
        "msp": "₹4,290 / Q",
        "mandiName": "Gajapathinagaram Millet Mandi",
        "suitability": "97% (Red Soil Nutri-Cereal)",
        "yieldPerAcre": "12 - 15 Quintals/Acre",
        "yieldNum": 13,
        "costPerAcre": 12000,
        "estRevenuePerAcre": 51350,
        "estProfitPerAcre": 39350,
        "roi": "328%"
      }
    ]
  },
  "Srikakulam": {
    "name": "Srikakulam",
    "center": [
      83.9,
      18.3
    ],
    "tagline": "GI Palasa Cashew Capital (300+ Units), Paddy & Uddanam Coconut Frontier",
    "soilType": "Coastal Alluvial, Red Sandy Loams & Laterite Soils",
    "primarySeason": "Kharif & Rabi (Nagavali & Vamsadhara Basins)",
    "rainfall": "1060 mm Avg",
    "totalArrivals": "68 Tons",
    "activeFarmers": 440,
    "crops": [
      {
        "name": "Cashew Nut",
        "variety": "Palasa Raw Cashew Nut (GI Grade)",
        "image": "/images/crops/cashew_nuts.jpg",
        "arrival": "38 Tons",
        "price": "₹11,800 / Q",
        "priceNum": 11800,
        "priceRange": "₹11,200 - ₹12,600",
        "trend": "+4.9%",
        "trendPositive": true,
        "msp": "₹10,000 / Q",
        "mandiName": "Palasa Cashew Market (AP Cashew Capital, 300+ Units)",
        "suitability": "99% (GI Tag Registered Zone)",
        "yieldPerAcre": "12 - 16 Quintals/Acre",
        "yieldNum": 14,
        "costPerAcre": 36000,
        "estRevenuePerAcre": 165200,
        "estProfitPerAcre": 129200,
        "roi": "359%"
      },
      {
        "name": "Paddy",
        "variety": "BPT 5204 & MTU 1061",
        "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600&auto=format&fit=crop",
        "arrival": "40 Tons",
        "price": "₹2,440 / Q",
        "priceNum": 2440,
        "priceRange": "₹2,340 - ₹2,550",
        "trend": "+1.5%",
        "trendPositive": true,
        "msp": "₹2,300 / Q",
        "mandiName": "Amadalavalasa Agri Market Yard",
        "suitability": "97% (Vamsadhara Basin Wet)",
        "yieldPerAcre": "30 - 35 Quintals/Acre",
        "yieldNum": 32,
        "costPerAcre": 27000,
        "estRevenuePerAcre": 78080,
        "estProfitPerAcre": 51080,
        "roi": "189%"
      },
      {
        "name": "Coconut",
        "variety": "Uddanam Coastal Tall Belt",
        "image": "/images/crops/coconut.jpg",
        "arrival": "25 Tons",
        "price": "₹1,800 / 100 Nuts",
        "priceNum": 1800,
        "priceRange": "₹1,650 - ₹1,950",
        "trend": "+2.4%",
        "trendPositive": true,
        "msp": "₹1,500 / 100 Nuts",
        "mandiName": "Sompeta & Ichchapuram Coconut Mandi",
        "suitability": "96% (Coastal Uddanam Belt)",
        "yieldPerAcre": "8,000 - 10,000 Nuts/Acre",
        "yieldNum": 90,
        "costPerAcre": 33000,
        "estRevenuePerAcre": 162000,
        "estProfitPerAcre": 129000,
        "roi": "391%"
      },
      {
        "name": "Green Gram (Pesalu)",
        "variety": "Post-Harvest Delta Pulse (TM-96-2)",
        "image": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=600&auto=format&fit=crop",
        "arrival": "12 Tons",
        "price": "₹8,450 / Q",
        "priceNum": 8450,
        "priceRange": "₹8,000 - ₹8,800",
        "trend": "+2.8%",
        "trendPositive": true,
        "msp": "₹8,558 / Q",
        "mandiName": "Narasannapeta Pulse Yard",
        "suitability": "94% (Delta Residual Moisture)",
        "yieldPerAcre": "5 - 7 Quintals/Acre",
        "yieldNum": 6,
        "costPerAcre": 10500,
        "estRevenuePerAcre": 50700,
        "estProfitPerAcre": 40200,
        "roi": "383%"
      }
    ]
  },
  "Parvathipuram Manyam": {
    "name": "Parvathipuram Manyam",
    "center": [
      83.4,
      18.8
    ],
    "tagline": "Tribal Organic Millets Hub, Hill Cashew & High-Curcumin Kasturi Turmeric",
    "soilType": "Red Gravelly Soils, Hill Sandy Loams & Organic Forest Soils",
    "primarySeason": "Kharif Organic Rainfed & Hill Spring Horticulture",
    "rainfall": "1150 mm Avg",
    "totalArrivals": "45 Tons",
    "activeFarmers": 350,
    "crops": [
      {
        "name": "Finger Millet (Ragi)",
        "variety": "VR-847 (Organic Tribal Ragi)",
        "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop",
        "arrival": "22 Tons",
        "price": "₹4,100 / Q",
        "priceNum": 4100,
        "priceRange": "₹3,800 - ₹4,350",
        "trend": "+4.1%",
        "trendPositive": true,
        "msp": "₹4,290 / Q",
        "mandiName": "Parvathipuram Tribal Produce Yard (ITDA Millet Hub)",
        "suitability": "99% (Organic Tribal Center)",
        "yieldPerAcre": "12 - 15 Quintals/Acre",
        "yieldNum": 14,
        "costPerAcre": 11000,
        "estRevenuePerAcre": 57400,
        "estProfitPerAcre": 46400,
        "roi": "422%"
      },
      {
        "name": "Cashew Nut",
        "variety": "Organic Hill Grown Cashew",
        "image": "/images/crops/cashew_nuts.jpg",
        "arrival": "18 Tons",
        "price": "₹11,500 / Q",
        "priceNum": 11500,
        "priceRange": "₹10,800 - ₹12,200",
        "trend": "+3.6%",
        "trendPositive": true,
        "msp": "₹9,800 / Q",
        "mandiName": "Seethampeta ITDA Market Yard",
        "suitability": "97% (Forest Hill Terrain)",
        "yieldPerAcre": "10 - 13 Quintals/Acre",
        "yieldNum": 11,
        "costPerAcre": 32000,
        "estRevenuePerAcre": 126500,
        "estProfitPerAcre": 94500,
        "roi": "295%"
      },
      {
        "name": "Hill Turmeric",
        "variety": "High Curcumin Organic Kasturi",
        "image": "/images/crops/turmeric.jpg",
        "arrival": "14 Tons",
        "price": "₹10,200 / Q",
        "priceNum": 10200,
        "priceRange": "₹9,500 - ₹11,000",
        "trend": "+5.2%",
        "trendPositive": true,
        "msp": "₹8,400 / Q",
        "mandiName": "Kurupam Tribal Spices Yard",
        "suitability": "98% (High Hill Curcumin > 5.5%)",
        "yieldPerAcre": "18 - 22 Quintals/Acre",
        "yieldNum": 20,
        "costPerAcre": 42000,
        "estRevenuePerAcre": 204000,
        "estProfitPerAcre": 162000,
        "roi": "386%"
      },
      {
        "name": "Tribal Pulses (Rajma)",
        "variety": "Organic Agency Valley Red Beans",
        "image": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=600&auto=format&fit=crop",
        "arrival": "10 Tons",
        "price": "₹9,400 / Q",
        "priceNum": 9400,
        "priceRange": "₹8,800 - ₹10,200",
        "trend": "+3.0%",
        "trendPositive": true,
        "msp": "₹7,500 / Q",
        "mandiName": "Salur Tribal Yard",
        "suitability": "95% (High Altitude Cooler Slopes)",
        "yieldPerAcre": "6 - 8 Quintals/Acre",
        "yieldNum": 7,
        "costPerAcre": 14000,
        "estRevenuePerAcre": 65800,
        "estProfitPerAcre": 51800,
        "roi": "370%"
      }
    ]
  },
  "Alluri Sitharama Raju": {
    "name": "Alluri Sitharama Raju",
    "center": [
      81.9,
      17.9
    ],
    "tagline": "Araku Valley GI Organic Arabica Coffee, Black Pepper & High-Altitude Spices",
    "soilType": "Humus-Rich Forest Loams, High Altitude Acidic & Lateritic Soils",
    "primarySeason": "Perennial High Altitude Organic Canopy",
    "rainfall": "1250 mm Avg",
    "totalArrivals": "50 Tons",
    "activeFarmers": 380,
    "crops": [
      {
        "name": "Araku Arabica Coffee",
        "variety": "GI-Tagged Single Origin Specialty Arabica",
        "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
        "arrival": "24 Tons",
        "price": "₹38,000 / Q",
        "priceNum": 38000,
        "priceRange": "₹35,000 - ₹42,000",
        "trend": "+6.8%",
        "trendPositive": true,
        "msp": "₹30,000 / Q",
        "mandiName": "Araku Valley Organic Coffee Cooperative Yard",
        "suitability": "99% (Global GI Excellence)",
        "yieldPerAcre": "5 - 7 Quintals/Acre",
        "yieldNum": 6,
        "costPerAcre": 50000,
        "estRevenuePerAcre": 228000,
        "estProfitPerAcre": 178000,
        "roi": "356%"
      },
      {
        "name": "Black Pepper",
        "variety": "Panniyur-1 High Piperine Organic",
        "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop",
        "arrival": "14 Tons",
        "price": "₹64,000 / Q",
        "priceNum": 64000,
        "priceRange": "₹59,000 - ₹69,000",
        "trend": "+5.1%",
        "trendPositive": true,
        "msp": "₹52,000 / Q",
        "mandiName": "Paderu Spices Terminal Yard",
        "suitability": "98% (High Elevation Canopy Crop)",
        "yieldPerAcre": "3 - 4.5 Quintals/Acre",
        "yieldNum": 4,
        "costPerAcre": 35000,
        "estRevenuePerAcre": 256000,
        "estProfitPerAcre": 221000,
        "roi": "631%"
      },
      {
        "name": "Organic Turmeric",
        "variety": "Kasturi Agency Turmeric (Curcumin > 5.8%)",
        "image": "/images/crops/turmeric.jpg",
        "arrival": "18 Tons",
        "price": "₹10,500 / Q",
        "priceNum": 10500,
        "priceRange": "₹9,800 - ₹11,400",
        "trend": "+4.4%",
        "trendPositive": true,
        "msp": "₹8,500 / Q",
        "mandiName": "Chintapalli Organic Spices Yard",
        "suitability": "97% (High Altitude Pure Organic)",
        "yieldPerAcre": "18 - 22 Quintals/Acre",
        "yieldNum": 20,
        "costPerAcre": 43000,
        "estRevenuePerAcre": 210000,
        "estProfitPerAcre": 167000,
        "roi": "388%"
      },
      {
        "name": "Tribal Ginger",
        "variety": "High Aroma Fresh Rhizomes",
        "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop",
        "arrival": "16 Tons",
        "price": "₹7,800 / Q",
        "priceNum": 7800,
        "priceRange": "₹7,200 - ₹8,500",
        "trend": "+3.9%",
        "trendPositive": true,
        "msp": "₹6,400 / Q",
        "mandiName": "Rampachodavaram Forest Produce Yard",
        "suitability": "96% (Forest Shade Valley)",
        "yieldPerAcre": "50 - 65 Quintals/Acre",
        "yieldNum": 58,
        "costPerAcre": 62000,
        "estRevenuePerAcre": 452400,
        "estProfitPerAcre": 390400,
        "roi": "630%"
      }
    ]
  }
};

export const DISTRICT_LIST = Object.keys(DISTRICT_DATA);

export function normalizeDistrictName(name: string): string {
  if (!name) return "Guntur";
  const lower = name.toLowerCase().replace(/[^a-z]/g, '');
  
  if (lower.includes('alluri') || lower.includes('asr')) return "Alluri Sitharama Raju";
  if (lower.includes('anakapalli')) return "Anakapalli";
  if (lower.includes('ananthapur') || lower.includes('anantapur')) return "Ananthapur";
  if (lower.includes('annamayya')) return "Annamayya";
  if (lower.includes('bapatla')) return "Bapatla";
  if (lower.includes('chittoor')) return "Chittoor";
  if (lower.includes('konaseema') || lower.includes('ambedkar')) return "Konaseema";
  if (lower.includes('eastgodavari') || lower.includes('rajahmundry')) return "East Godavari";
  if (lower.includes('eluru')) return "Eluru";
  if (lower.includes('guntur')) return "Guntur";
  if (lower.includes('kakinada')) return "Kakinada";
  if (lower.includes('krishna') || lower.includes('machilipatnam')) return "Krishna";
  if (lower.includes('kurnool')) return "Kurnool";
  if (lower.includes('nandyal')) return "Nandyal";
  if (lower.includes('ntr') || lower.includes('vijayawada')) return "NTR";
  if (lower.includes('palnadu') || lower.includes('narasaraopet')) return "Palnadu";
  if (lower.includes('parvathipuram') || lower.includes('manyam')) return "Parvathipuram Manyam";
  if (lower.includes('prakasam') || lower.includes('ongole')) return "Prakasam";
  if (lower.includes('nellore') || lower.includes('spsr')) return "Nellore";
  if (lower.includes('sathsai') || lower.includes('sathyasai') || lower.includes('sathya')) return "Sri Sathya Sai";
  if (lower.includes('srikakulam')) return "Srikakulam";
  if (lower.includes('tirupati')) return "Tirupati";
  if (lower.includes('visakhapatnam') || lower.includes('vizag')) return "Visakhapatnam";
  if (lower.includes('vizianagaram')) return "Vizianagaram";
  if (lower.includes('westgodavari') || lower.includes('bhimavaram')) return "West Godavari";
  if (lower.includes('kadapa') || lower.includes('ysr')) return "YSR Kadapa";
  
  return name;
}

export interface DailyForecast {
  day: string;
  date: string;
  condition: string;
  icon: string;
  maxTemp: number;
  minTemp: number;
  rainProb: number;
  humidity: number;
  windSpeed: number;
  advisory: string;
}

export interface DistrictWeather {
  currentTemp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  soilMoisture: string;
  rainfallAnnual: string;
  agroAdvisory: string;
  forecast: DailyForecast[];
}

export function getDistrictWeather(districtName: string): DistrictWeather {
  const norm = normalizeDistrictName(districtName);
  const detail = DISTRICT_DATA[norm] || DISTRICT_DATA["Guntur"];
  
  const isRayalaseema = ["Ananthapur", "Kurnool", "Nandyal", "YSR Kadapa", "Annamayya", "Sri Sathya Sai", "Chittoor", "Tirupati"].includes(norm);
  const isNorthCoastal = ["Alluri Sitharama Raju", "Anakapalli", "Visakhapatnam", "Vizianagaram", "Srikakulam", "Parvathipuram Manyam"].includes(norm);
  
  const now = new Date();
  
  const forecast: DailyForecast[] = [
    {
      day: "Today",
      date: now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      condition: isRayalaseema ? "Sunny & Dry" : isNorthCoastal ? "Passing Clouds" : "Partly Sunny",
      icon: isRayalaseema ? "☀️" : isNorthCoastal ? "⛅" : "🌤️",
      maxTemp: isRayalaseema ? 35 : isNorthCoastal ? 30 : 33,
      minTemp: isRayalaseema ? 23 : isNorthCoastal ? 22 : 25,
      rainProb: isRayalaseema ? 10 : isNorthCoastal ? 35 : 20,
      humidity: isRayalaseema ? 52 : isNorthCoastal ? 82 : 72,
      windSpeed: isRayalaseema ? 14 : isNorthCoastal ? 18 : 16,
      advisory: isRayalaseema ? "Favorable for harvest drying & pod maturation." : "Ideal for morning bio-fertilizer foliar spray."
    },
    {
      day: "Tomorrow",
      date: new Date(now.getTime() + 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      condition: isRayalaseema ? "Clear Sky" : isNorthCoastal ? "Light Showers" : "Scattered Clouds",
      icon: isRayalaseema ? "☀️" : isNorthCoastal ? "🌦️" : "⛅",
      maxTemp: isRayalaseema ? 36 : isNorthCoastal ? 29 : 32,
      minTemp: isRayalaseema ? 24 : isNorthCoastal ? 21 : 24,
      rainProb: isRayalaseema ? 5 : isNorthCoastal ? 45 : 25,
      humidity: isRayalaseema ? 48 : isNorthCoastal ? 85 : 74,
      windSpeed: isRayalaseema ? 12 : isNorthCoastal ? 20 : 15,
      advisory: isNorthCoastal ? "Postpone pesticide dusting during forecast shower window." : "Schedule evening drip irrigation for optimal moisture conservation."
    },
    {
      day: new Date(now.getTime() + 172800000).toLocaleDateString('en-IN', { weekday: 'short' }),
      date: new Date(now.getTime() + 172800000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      condition: isRayalaseema ? "Warm & Breezy" : isNorthCoastal ? "Partly Cloudy" : "Moderate Humidity",
      icon: isRayalaseema ? "🌤️" : isNorthCoastal ? "⛅" : "🌤️",
      maxTemp: isRayalaseema ? 34 : isNorthCoastal ? 31 : 33,
      minTemp: isRayalaseema ? 23 : isNorthCoastal ? 22 : 25,
      rainProb: isRayalaseema ? 15 : isNorthCoastal ? 25 : 15,
      humidity: isRayalaseema ? 55 : isNorthCoastal ? 78 : 70,
      windSpeed: isRayalaseema ? 16 : isNorthCoastal ? 16 : 14,
      advisory: "Favorable conditions for inter-cultivation and weeding operations."
    },
    {
      day: new Date(now.getTime() + 259200000).toLocaleDateString('en-IN', { weekday: 'short' }),
      date: new Date(now.getTime() + 259200000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      condition: isRayalaseema ? "Clear Sky" : isNorthCoastal ? "Light Mists" : "Sunny Intervals",
      icon: isRayalaseema ? "☀️" : isNorthCoastal ? "🌫️" : "🌤️",
      maxTemp: isRayalaseema ? 35 : isNorthCoastal ? 30 : 34,
      minTemp: isRayalaseema ? 24 : isNorthCoastal ? 21 : 25,
      rainProb: isRayalaseema ? 10 : isNorthCoastal ? 30 : 10,
      humidity: isRayalaseema ? 50 : isNorthCoastal ? 80 : 68,
      windSpeed: isRayalaseema ? 14 : isNorthCoastal ? 14 : 12,
      advisory: "Excellent weather for grain packaging and warehouse transport."
    },
    {
      day: new Date(now.getTime() + 345600000).toLocaleDateString('en-IN', { weekday: 'short' }),
      date: new Date(now.getTime() + 345600000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      condition: isRayalaseema ? "Sunny" : isNorthCoastal ? "Cloudy" : "Partly Sunny",
      icon: isRayalaseema ? "☀️" : isNorthCoastal ? "☁️" : "⛅",
      maxTemp: isRayalaseema ? 36 : isNorthCoastal ? 29 : 33,
      minTemp: isRayalaseema ? 23 : isNorthCoastal ? 22 : 24,
      rainProb: isRayalaseema ? 5 : isNorthCoastal ? 40 : 20,
      humidity: isRayalaseema ? 49 : isNorthCoastal ? 84 : 73,
      windSpeed: isRayalaseema ? 13 : isNorthCoastal ? 19 : 15,
      advisory: "Maintain optimum water depth in paddy plots (2-3 cm)."
    }
  ];

  return {
    currentTemp: isRayalaseema ? 34 : isNorthCoastal ? 29 : 32,
    condition: isRayalaseema ? "Mostly Sunny" : isNorthCoastal ? "Passing Clouds" : "Partly Sunny",
    icon: isRayalaseema ? "☀️" : isNorthCoastal ? "⛅" : "🌤️",
    humidity: isRayalaseema ? 52 : isNorthCoastal ? 82 : 72,
    windSpeed: isRayalaseema ? 14 : isNorthCoastal ? 18 : 15,
    soilMoisture: isRayalaseema ? "Adequate (58%)" : isNorthCoastal ? "High (79%)" : "Optimal (68%)",
    rainfallAnnual: detail.rainfall || "850 - 1100 mm",
    agroAdvisory: isRayalaseema 
      ? `Dry, sunny agro-climate in ${norm}. Optimal for groundnut, cotton, and pulses. Conserve root-zone moisture through mulch and scheduled micro-irrigation.`
      : isNorthCoastal 
      ? `Humid coastal climate in ${norm}. Highly suitable for cashew, coconut, turmeric and oil palm. Ensure proper soil aeration and monitor for fungal humidity spots.`
      : `Fertile delta climate in ${norm} with optimal moisture. Suitable for paddy, chillies, sugarcane and pulses. Maintain regular crop scouting and field drainage.`,
    forecast
  };
}

const FARMER_NAMES_POOL = [
  "Venkata Ramana", "K. Subba Rao", "M. Chenna Reddy", "P. Appa Rao", "G. Nageswara Rao",
  "B. Krishna Murthy", "K. Satyanarayana", "V. Veerabhadra Rao", "Ch. Rambabu", "Y. Srinivasa Rao",
  "D. Kotiswara Rao", "T. Ranga Rao", "S. Anjaneyulu", "M. Venugopal", "B. Srinivasulu",
  "K. Madhusudhan", "P. Chandra Sekhar", "G. Sivaram Reddy", "M. Munirathnam", "C. Gangadharam",
  "V. Sitaram", "S. Venkateswarlu", "D. Rama Rao", "N. Narayana", "B. Somasekhar", "K. Jagannatham"
];

export function getAllDistrictSeedCrops(): any[] {
  const allListings: any[] = [];
  let idCounter = 101;
  let farmerIdx = 0;

  for (const [distName, detail] of Object.entries(DISTRICT_DATA)) {
    for (const crop of detail.crops) {
      const farmerName = FARMER_NAMES_POOL[farmerIdx % FARMER_NAMES_POOL.length];
      farmerIdx++;
      const pNum = crop.priceNum || 2500;
      const arrivalNum = parseInt(crop.arrival.replace(/[^0-9]/g, '')) || 25;

      allListings.push({
        id: idCounter++,
        farmer_id: `AP-FRM-2026-${idCounter + 900}`,
        farmer_name: farmerName,
        district: distName,
        mandal: `${distName} Agricultural Hub`,
        crop: crop.name,
        variety: crop.variety,
        qty: arrivalNum * 8,
        price: pNum,
        quality: 'Grade A1 Verified FAQ',
        image_url: crop.image || getCropImage(crop.name),
        status: 'Available',
        created_at: new Date().toISOString()
      });
    }
  }
  return allListings;
}

export function getDistrictMarketOverviews(districtName: string): any[] {
  const norm = normalizeDistrictName(districtName);
  const detail = DISTRICT_DATA[norm] || DISTRICT_DATA["Guntur"];
  return detail.crops.map((c, i) => {
    const pNum = c.priceNum || 2500;
    const change = parseFloat(c.trend.replace(/[^0-9.-]/g, '')) || (c.trendPositive ? 2.8 : -1.4);
    const arrivalNum = parseInt(c.arrival.replace(/[^0-9]/g, '')) || 30;
    return {
      id: `cmo-${norm.toLowerCase().replace(/[^a-z]/g, '')}-${i}`,
      cropName: c.name,
      grade: c.variety,
      image: c.image || getCropImage(c.name),
      currentPrice: pNum,
      previousPrice: Math.round(pNum / (1 + (change / 100))),
      changePct: change,
      volumeQuintals: arrivalNum * 10,
      demand: c.trendPositive ? 'High' : 'Medium',
      status: 'Active'
    };
  });
}

const TELUGU_CROP_NAMES: Record<string, string> = {
  "red chilli": "ఎర్ర మిరప",
  "chilli": "మిరప",
  "cotton": "పత్తి",
  "paddy": "వరి ధాన్యం",
  "rice": "వరి బియ్యం",
  "tobacco": "పొగాకు",
  "sugarcane": "చెరకు",
  "black gram": "మినుములు",
  "mango": "మామిడి",
  "groundnut": "వేరుశనగ",
  "sweet orange": "బత్తాయి",
  "pomegranate": "దానిమ్మ",
  "foxtail millet": "కొర్రలు",
  "coconut": "కొబ్బరి",
  "maize": "మొక్కజొన్న",
  "banana": "అరటి",
  "oil palm": "ఆయిల్ పామ్",
  "cashew": "జీడిపప్పు",
  "turmeric": "పసుపు",
  "onion": "ఉల్లిపాయ",
  "bengal gram": "శనగలు",
  "silk": "పట్టు",
  "ragi": "రాగులు",
  "tomato": "టమోటా",
  "papaya": "బొప్పాయి",
  "coffee": "కాఫీ",
  "pepper": "మిరియాలు",
  "ginger": "అల్లం",
  "jaggery": "బెల్లం",
  "sesame": "నువ్వులు"
};

export function getCropTeluguName(cropName: string): string {
  const lower = cropName.toLowerCase();
  for (const [k, v] of Object.entries(TELUGU_CROP_NAMES)) {
    if (lower.includes(k)) return v;
  }
  return cropName;
}

export function getCropCategory(cropName: string): 'Spices & Cash' | 'Food Grains' | 'Oilseeds' | 'Horticulture & Plantation' | 'Pulses' {
  const lower = cropName.toLowerCase();
  if (lower.includes('chilli') || lower.includes('tobacco') || lower.includes('cotton') || lower.includes('jaggery') || lower.includes('sugarcane')) return 'Spices & Cash';
  if (lower.includes('paddy') || lower.includes('rice') || lower.includes('maize') || lower.includes('millet') || lower.includes('ragi') || lower.includes('jowar')) return 'Food Grains';
  if (lower.includes('groundnut') || lower.includes('oil palm') || lower.includes('sesame')) return 'Oilseeds';
  if (lower.includes('gram') || lower.includes('urad') || lower.includes('moong') || lower.includes('chickpea') || lower.includes('senagalu') || lower.includes('rajmash') || lower.includes('pulse')) return 'Pulses';
  return 'Horticulture & Plantation';
}

export function getDistrictCropGradeSpecs(districtName: string): any[] {
  const norm = normalizeDistrictName(districtName);
  const detail = DISTRICT_DATA[norm] || DISTRICT_DATA["Guntur"];

  return detail.crops.map((c) => {
    const baseRate = c.priceNum || 2500;
    const msp = c.msp ? (parseInt(c.msp.replace(/[^0-9]/g, '')) || Math.round(baseRate * 0.88)) : Math.round(baseRate * 0.88);
    const teluguName = getCropTeluguName(c.name);
    const category = getCropCategory(c.name);

    return {
      id: `crop-${norm.toLowerCase().replace(/[^a-z]/g, '')}-${c.name.toLowerCase().replace(/[^a-z]/g, '')}`,
      cropName: `${c.name} (${norm})`,
      teluguName,
      category,
      standardVariety: c.variety,
      apmcMandi: c.mandiName,
      image: c.image || getCropImage(c.name),
      mspBenchmark: msp,
      baseMarketRate: baseRate,
      trend: c.trend,
      trendPositive: c.trendPositive,
      grades: [
        {
          grade: 'Grade A1 (Export)',
          multiplier: 1.15,
          moistureLimit: '< 10.0%',
          foreignMatter: '< 0.5%',
          brokenDiscolored: '< 1.0%',
          description: `Super-premium export grade from ${norm}. Highest bulk density, pristine quality, verified APMC certified lot.`,
          marketDemand: 'Very High'
        },
        {
          grade: 'Grade A (FAQ Standard)',
          multiplier: 1.0,
          moistureLimit: '10.0% - 12.0%',
          foreignMatter: '0.5% - 1.0%',
          brokenDiscolored: '1.0% - 2.5%',
          description: `APMC mandi benchmark auction lot for ${c.name} at ${c.mandiName}. Cleaned, dry and graded.`,
          marketDemand: 'High'
        },
        {
          grade: 'Grade B (Commercial)',
          multiplier: 0.88,
          moistureLimit: '12.0% - 13.5%',
          foreignMatter: '1.0% - 2.5%',
          brokenDiscolored: '2.5% - 4.5%',
          description: 'Commercial wholesale batch for standard mill processing and open yard trading.',
          marketDemand: 'Steady'
        },
        {
          grade: 'Grade C (Industrial)',
          multiplier: 0.74,
          moistureLimit: '> 13.5%',
          foreignMatter: '> 2.5%',
          brokenDiscolored: '> 4.5%',
          description: 'Secondary lot for byproduct extraction and feed processing.',
          marketDemand: 'Moderate'
        }
      ]
    };
  });
}


