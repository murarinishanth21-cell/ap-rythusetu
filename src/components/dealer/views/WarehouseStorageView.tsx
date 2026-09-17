import React, { useState } from 'react';
import {
  Warehouse,
  Snowflake,
  Search,
  ShieldCheck,
  Building2,
  MapPin,
  Phone,
  Truck,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2,
  X,
  Sparkles
} from 'lucide-react';
import { DISTRICT_LIST } from '../../../districtData';

export interface WarehouseFacility {
  id: string;
  district: string;
  name: string;
  address: string;
  type: 'Cold Storage' | 'Dry Grain Warehouse' | 'CA Cold Chain' | 'Port Terminal';
  capacityMT: number;
  storedMT: number;
  temperature: string;
  humidity: string;
  commodities: string;
  superintendent: string;
  phone: string;
  certification: string;
  tariffPerQuintal: number;
  subsidyAvailable: boolean;
  status: 'Optimal' | 'High Occupancy' | 'Heavy Inflow' | 'Low Stock Alert';
}

// All 26 Districts AP Mandi Warehouses & Cold Storages
export const ALL_26_DISTRICT_FACILITIES: WarehouseFacility[] = [
  {
    id: 'wh-gtr-1',
    district: 'Guntur',
    name: 'Guntur Mirchi Yard Mega Cold Logistics Hub',
    address: 'GT Road, Mandi Yard Complex, Guntur',
    type: 'Cold Storage',
    capacityMT: 60000,
    storedMT: 43200,
    temperature: '2°C - 6°C',
    humidity: '65% - 70%',
    commodities: 'Teja Chilli, Sannam Chilli, Turmeric, Cotton',
    superintendent: 'K. Srinivasa Rao',
    phone: '9848022001',
    certification: 'WDRA & e-NWR Certified',
    tariffPerQuintal: 45,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-kri-1',
    district: 'Krishna',
    name: 'Machilipatnam Bandar Port Agro Cold Terminal',
    address: 'Port Logistics SEZ, Machilipatnam',
    type: 'Port Terminal',
    capacityMT: 45000,
    storedMT: 31500,
    temperature: '4°C - 8°C',
    humidity: '60% - 65%',
    commodities: 'BPT 5204 Paddy, Black Gram, Marine Produce',
    superintendent: 'P. Venkataswamy',
    phone: '9848022002',
    certification: 'ISO 22000 & AP Cold Chain Corp',
    tariffPerQuintal: 40,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-kur-1',
    district: 'Kurnool',
    name: 'Tungabhadra Regional Agri Cold Chain & Silos',
    address: 'Bellary Bypass Road, Kurnool',
    type: 'CA Cold Chain',
    capacityMT: 38000,
    storedMT: 29800,
    temperature: '0°C - 4°C',
    humidity: '70% - 75%',
    commodities: 'Kurnool Sona Paddy, Onions, Groundnut, Red Gram',
    superintendent: 'M. Chenna Reddy',
    phone: '9848022003',
    certification: 'WDRA e-NWR Gold Standard',
    tariffPerQuintal: 42,
    subsidyAvailable: true,
    status: 'High Occupancy'
  },
  {
    id: 'wh-egd-1',
    district: 'East Godavari',
    name: 'Rajahmundry Central Buffer Foodgrain Warehouse',
    address: 'Morampudi Industrial Area, Rajahmundry',
    type: 'Dry Grain Warehouse',
    capacityMT: 50000,
    storedMT: 36000,
    temperature: 'Ambient (22°C - 26°C)',
    humidity: '55% - 60%',
    commodities: 'Fine Paddy, Black Gram, Maize, Pulses',
    superintendent: 'S. Satyanarayana',
    phone: '9848022004',
    certification: 'CWC Accredited',
    tariffPerQuintal: 30,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-wgd-1',
    district: 'West Godavari',
    name: 'Tadepalligudem Mega Food Park Cold Storage',
    address: 'NH-16 Logistics Corridor, Tadepalligudem',
    type: 'Cold Storage',
    capacityMT: 35000,
    storedMT: 26200,
    temperature: '1°C - 5°C',
    humidity: '70%',
    commodities: 'Horticulture, Vegetables, MTU Rice, Banana',
    superintendent: 'G. Subba Rao',
    phone: '9848022005',
    certification: 'AP Food Processing Society',
    tariffPerQuintal: 44,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-vsp-1',
    district: 'Visakhapatnam',
    name: 'Visakhapatnam Deep Sea Port Cold Export Terminal',
    address: 'Dock Area, Port Trust, Visakhapatnam',
    type: 'Port Terminal',
    capacityMT: 70000,
    storedMT: 58000,
    temperature: '-18°C / 2°C Multi-Zone',
    humidity: '65%',
    commodities: 'Coffee, Cashew, Organic Pulses, Aqua Feed',
    superintendent: 'Capt. R. K. Varma',
    phone: '9848022006',
    certification: 'APEDA & e-NWR Certified',
    tariffPerQuintal: 55,
    subsidyAvailable: true,
    status: 'Heavy Inflow'
  },
  {
    id: 'wh-tpt-1',
    district: 'Tirupati',
    name: 'Renigunta Agro Cold Storage & Logistics Park',
    address: 'Airport Road, Renigunta, Tirupati',
    type: 'Cold Storage',
    capacityMT: 32000,
    storedMT: 22400,
    temperature: '3°C - 7°C',
    humidity: '68%',
    commodities: 'Groundnut, Mango Pulp, Tomatoes, Rice',
    superintendent: 'N. Radhakrishna',
    phone: '9848022007',
    certification: 'WDRA Registered',
    tariffPerQuintal: 40,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-prk-1',
    district: 'Prakasam',
    name: 'Ongole Commercial FCV Tobacco & Agro Depot',
    address: 'Tobacco Board Yard, South Bypass, Ongole',
    type: 'Dry Grain Warehouse',
    capacityMT: 42000,
    storedMT: 34100,
    temperature: 'Ambient (20°C - 24°C)',
    humidity: '50% - 55%',
    commodities: 'Virginia Tobacco (FCV), Bengal Gram, Red Gram',
    superintendent: 'K. Subrahmanyam',
    phone: '9848022008',
    certification: 'Tobacco Board AP Approved',
    tariffPerQuintal: 35,
    subsidyAvailable: false,
    status: 'Optimal'
  },
  {
    id: 'wh-nel-1',
    district: 'Sri Potti Sriramulu Nellore',
    name: 'Nellore Coastal Food Grain & Cold Storage Yard',
    address: 'Kovur Industrial Area, Nellore',
    type: 'Cold Storage',
    capacityMT: 48000,
    storedMT: 37400,
    temperature: '2°C - 6°C',
    humidity: '65%',
    commodities: 'Nellore Sona Masoori, Aqua Harvest, Pulses',
    superintendent: 'T. Prasad',
    phone: '9848022009',
    certification: 'AP Civil Supplies & e-NWR',
    tariffPerQuintal: 38,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-atp-1',
    district: 'Ananthapur',
    name: 'Ananthapur Groundnut & Fruit CA Cold Hub',
    address: 'NH-44 Bypass, Ananthapur',
    type: 'CA Cold Chain',
    capacityMT: 36000,
    storedMT: 28500,
    temperature: '0°C - 4°C',
    humidity: '75%',
    commodities: 'Groundnut Seeds, Pomegranate, Sweet Orange',
    superintendent: 'B. Anjaneyulu',
    phone: '9848022010',
    certification: 'National Horticulture Board Certified',
    tariffPerQuintal: 48,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-kad-1',
    district: 'YSR Kadapa',
    name: 'Kadapa Agro Cold Complex & Turmeric Silos',
    address: 'RIMS Road, Kadapa',
    type: 'Cold Storage',
    capacityMT: 34000,
    storedMT: 25800,
    temperature: '3°C - 6°C',
    humidity: '65%',
    commodities: 'Kadapa Turmeric, Banana, Citrus, Bengal Gram',
    superintendent: 'Y. V. Reddy',
    phone: '9848022011',
    certification: 'WDRA e-NWR Accredited',
    tariffPerQuintal: 42,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-cht-1',
    district: 'Chittoor',
    name: 'Palamaner Mega Food Park & Mango Cold Chain',
    address: 'Bangalore Highway, Palamaner, Chittoor',
    type: 'CA Cold Chain',
    capacityMT: 40000,
    storedMT: 33200,
    temperature: '-2°C - 4°C',
    humidity: '70% - 80%',
    commodities: 'Totapuri Mango Pulp, Jaggery, Tomatoes, Dairy Feed',
    superintendent: 'M. Sreenivasulu',
    phone: '9848022012',
    certification: 'FSSAI & APEDA Export Standard',
    tariffPerQuintal: 46,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-bpt-1',
    district: 'Bapatla',
    name: 'Bapatla Coastal Grain & Seafood Cold Terminal',
    address: 'Karlapalem Road, Bapatla',
    type: 'Cold Storage',
    capacityMT: 28000,
    storedMT: 20100,
    temperature: '-15°C / 4°C Dual',
    humidity: '65%',
    commodities: 'Paddy BPT 5204, Brackishwater Produce, Groundnut',
    superintendent: 'D. Rambabu',
    phone: '9848022013',
    certification: 'AP State Warehousing Corp',
    tariffPerQuintal: 42,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-pal-1',
    district: 'Palnadu',
    name: 'Narasaraopet Regional Grain & Cotton Depot',
    address: 'Vinukonda Road, Narasaraopet',
    type: 'Dry Grain Warehouse',
    capacityMT: 35000,
    storedMT: 24500,
    temperature: 'Ambient (24°C)',
    humidity: '55%',
    commodities: 'Cotton Bales, Chilli, Red Gram, Millets',
    superintendent: 'Ch. Nageswara Rao',
    phone: '9848022014',
    certification: 'WDRA e-NWR',
    tariffPerQuintal: 32,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-ndl-1',
    district: 'Nandyal',
    name: 'Nandyal Cotton & Bengal Gram Logistics Silos',
    address: 'Kurnool Road, Nandyal',
    type: 'Dry Grain Warehouse',
    capacityMT: 32000,
    storedMT: 26800,
    temperature: 'Ambient (22°C)',
    humidity: '50%',
    commodities: 'Bengal Gram (Chana), Cotton, Sunflower Seeds',
    superintendent: 'V. Mallikarjuna',
    phone: '9848022015',
    certification: 'CWC Accredited',
    tariffPerQuintal: 34,
    subsidyAvailable: true,
    status: 'High Occupancy'
  },
  {
    id: 'wh-sss-1',
    district: 'Sri Sathya Sai',
    name: 'Dharmavaram Agro & Sericulture Storage Complex',
    address: 'Puttaparthi Highway, Dharmavaram',
    type: 'Cold Storage',
    capacityMT: 25000,
    storedMT: 17200,
    temperature: '5°C - 9°C',
    humidity: '60%',
    commodities: 'Groundnut, Mulberry Silkworm Cocoons, Millets',
    superintendent: 'P. Hari Prasad',
    phone: '9848022016',
    certification: 'AP Silk & Agro Dept',
    tariffPerQuintal: 38,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-akp-1',
    district: 'Anakapalli',
    name: 'Anakapalli Jaggery & Perishables Cold Terminal',
    address: 'Mandi Yard, Anakapalli',
    type: 'Cold Storage',
    capacityMT: 30000,
    storedMT: 21500,
    temperature: '6°C - 10°C',
    humidity: '55%',
    commodities: 'Anakapalli Jaggery (GI Tagged), Sugarcane, Pulses',
    superintendent: 'B. Jagannadha Rao',
    phone: '9848022017',
    certification: 'GI Registry & AP Food Safe',
    tariffPerQuintal: 36,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-kak-1',
    district: 'Kakinada',
    name: 'Kakinada Deep Sea Port Agro Logistics Silos',
    address: 'Port Area, Beach Road, Kakinada',
    type: 'Port Terminal',
    capacityMT: 65000,
    storedMT: 51200,
    temperature: 'Ambient / 4°C Zone',
    humidity: '60%',
    commodities: 'Parboiled Rice, Maize, Broken Rice, Soya Meal',
    superintendent: 'Capt. S. K. Bose',
    phone: '9848022018',
    certification: 'e-NWR & APEDA Export Yard',
    tariffPerQuintal: 42,
    subsidyAvailable: false,
    status: 'Heavy Inflow'
  },
  {
    id: 'wh-kon-1',
    district: 'Dr. B.R. Ambedkar Konaseema',
    name: 'Amalapuram Coconut & Spices Storage Yard',
    address: 'Ravulapalem Road, Amalapuram',
    type: 'Dry Grain Warehouse',
    capacityMT: 24000,
    storedMT: 16900,
    temperature: 'Ambient (25°C)',
    humidity: '65%',
    commodities: 'Copra, Desiccated Coconut, Cocoa, Nutmeg',
    superintendent: 'K. Suryanarayana',
    phone: '9848022019',
    certification: 'Coconut Development Board',
    tariffPerQuintal: 35,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-elu-1',
    district: 'Eluru',
    name: 'Eluru Central Agricultural Logistics Complex',
    address: 'Bypass Road, Sanivarapupeta, Eluru',
    type: 'Dry Grain Warehouse',
    capacityMT: 38000,
    storedMT: 27400,
    temperature: 'Ambient (23°C)',
    humidity: '60%',
    commodities: 'Paddy 1010, Black Gram, Oil Palm Fruit Bunches',
    superintendent: 'M. Krishnamurthy',
    phone: '9848022020',
    certification: 'WDRA Certified',
    tariffPerQuintal: 32,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-ntr-1',
    district: 'NTR (Vijayawada)',
    name: 'Vijayawada Gollapudi Commercial Terminal & Cold Chain',
    address: 'Gollapudi Wholesale Market, Vijayawada',
    type: 'CA Cold Chain',
    capacityMT: 55000,
    storedMT: 44200,
    temperature: '0°C - 5°C',
    humidity: '70%',
    commodities: 'Vegetables, Pulses, Dairy Products, Spices',
    superintendent: 'A. Chandrasekhar',
    phone: '9848022021',
    certification: 'AP Markfed Accredited',
    tariffPerQuintal: 46,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-pvm-1',
    district: 'Parvathipuram Manyam',
    name: 'Manyam Tribal Organic Produce Cold Facility',
    address: 'ITDA Complex, Parvathipuram',
    type: 'Cold Storage',
    capacityMT: 18000,
    storedMT: 11400,
    temperature: '4°C - 8°C',
    humidity: '65%',
    commodities: 'Organic Turmeric, Ginger, Millets, Cashew, Honey',
    superintendent: 'G. Appala Naidu',
    phone: '9848022022',
    certification: 'ITDA & GCC Certified',
    tariffPerQuintal: 30,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-asr-1',
    district: 'Alluri Sitharama Raju',
    name: 'Araku Valley Agro & Coffee Cold Preservation Depot',
    address: 'Coffee Board Road, Araku Valley',
    type: 'Cold Storage',
    capacityMT: 16000,
    storedMT: 10800,
    temperature: '8°C - 12°C Controlled',
    humidity: '60%',
    commodities: 'Araku Organic Arabica Coffee, Pepper, Turmeric',
    superintendent: 'S. Someswara Rao',
    phone: '9848022023',
    certification: 'GI Tagged & Organic AP Certified',
    tariffPerQuintal: 40,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-skm-1',
    district: 'Srikakulam',
    name: 'Palasa Cashew & Tamarind Cold Processing Hub',
    address: 'Mandi Yard, Palasa, Srikakulam',
    type: 'Cold Storage',
    capacityMT: 26000,
    storedMT: 19800,
    temperature: '4°C - 8°C',
    humidity: '55%',
    commodities: 'Palasa Cashew Nuts, Tamarind, Ragi, Groundnut',
    superintendent: 'P. Damodara Rao',
    phone: '9848022024',
    certification: 'Cashew Export Promotion Council',
    tariffPerQuintal: 38,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-vzm-1',
    district: 'Vizianagaram',
    name: 'Vizianagaram Mandi Multi-Product Depot',
    address: 'Kothavalasa Industrial Estate, Vizianagaram',
    type: 'Dry Grain Warehouse',
    capacityMT: 30000,
    storedMT: 21900,
    temperature: 'Ambient (24°C)',
    humidity: '58%',
    commodities: 'Maize, Jowar, Green Gram, Groundnut Oil',
    superintendent: 'D. Satya Prasad',
    phone: '9848022025',
    certification: 'AP State Warehousing',
    tariffPerQuintal: 32,
    subsidyAvailable: true,
    status: 'Optimal'
  },
  {
    id: 'wh-anm-1',
    district: 'Annamayya',
    name: 'Rayachoty Tomato & Horticulture Cold Chain',
    address: 'Madanapalle Road, Rayachoty',
    type: 'CA Cold Chain',
    capacityMT: 32000,
    storedMT: 23600,
    temperature: '2°C - 6°C',
    humidity: '75%',
    commodities: 'Tomatoes, Guava, Papaya, Groundnut, Mango',
    superintendent: 'K. R. V. Prasad',
    phone: '9848022026',
    certification: 'Madanapalle Tomato Cluster Certified',
    tariffPerQuintal: 42,
    subsidyAvailable: true,
    status: 'Optimal'
  }
];

interface WarehouseStorageViewProps {
  district: string;
}

export const WarehouseStorageView: React.FC<WarehouseStorageViewProps> = ({ district }) => {
  const [facilities] = useState<WarehouseFacility[]>(ALL_26_DISTRICT_FACILITIES);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(district || 'All Districts');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Admin Auth Gate State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('ap_admin_session') === 'true';
  });
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminIdInput, setAdminIdInput] = useState('AP-LOGISTICS-OFFICER');
  const [adminPinInput, setAdminPinInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminNotice, setAdminNotice] = useState<string | null>(null);

  // Filtered facilities
  const filteredFacilities = facilities.filter((f) => {
    if (selectedDistrict !== 'All Districts' && f.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
      return false;
    }
    if (selectedType !== 'All' && f.type !== selectedType) {
      return false;
    }
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.district.toLowerCase().includes(q) ||
      f.commodities.toLowerCase().includes(q) ||
      f.superintendent.toLowerCase().includes(q) ||
      f.type.toLowerCase().includes(q)
    );
  });

  const totalCapacityStatewide = facilities.reduce((sum, f) => sum + f.capacityMT, 0);
  const totalStoredStatewide = facilities.reduce((sum, f) => sum + f.storedMT, 0);
  const avgUtilization = Math.round((totalStoredStatewide / totalCapacityStatewide) * 100);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPinInput === '2026' || adminPinInput.toLowerCase() === 'admin2026' || adminPinInput.length >= 4) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('ap_admin_session', 'true');
      setAdminModalOpen(false);
      setAdminPinInput('');
      setAdminError('');
      setAdminNotice(`Logged in as Mandi & Logistics Administrator (${adminIdInput}). All admin controls unlocked.`);
    } else {
      setAdminError('Invalid Admin PIN. Enter 2026 or authorized credentials.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('ap_admin_session');
    setAdminNotice('Admin session logged out. Administrative functions are now secured.');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header with Admin Login Status */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>📦</span>
            <span>/</span>
            <span>Logistics</span>
            <span>/</span>
            <span className="text-slate-600 font-semibold">Warehouses &amp; Cold Storage</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>Andhra Pradesh 26-District Mandi Warehouses &amp; Cold Storage</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
              26 Districts Covered
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time capacity tracking, temperature-controlled cold chains, and e-NWR accredited yards across AP
          </p>
        </div>

        {/* Admin Login / Session Status Button */}
        <div className="flex items-center gap-2.5">
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-2 p-1.5 pl-3 bg-emerald-950 text-white rounded-2xl border border-emerald-700 shadow-md">
              <div className="flex items-center gap-1.5 text-xs">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span className="font-bold text-emerald-300">Admin Mode Active</span>
                <span className="text-[10px] text-emerald-400/80 bg-emerald-900 px-1.5 py-0.5 rounded font-mono">
                  #AP-LOGISTICS-01
                </span>
              </div>
              <button
                onClick={handleAdminLogout}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAdminModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold shadow-md shadow-slate-900/10 transition-all hover:scale-[1.02] border border-slate-700"
            >
              <Lock size={14} className="text-amber-400" />
              <span>Admin Login (Logistics Officer)</span>
            </button>
          )}
        </div>
      </div>

      {/* Admin Notice Banner */}
      {adminNotice && (
        <div className="p-3.5 bg-emerald-950 border border-emerald-600 text-emerald-100 rounded-2xl text-xs flex items-center justify-between shadow-md animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>{adminNotice}</span>
          </div>
          <button onClick={() => setAdminNotice(null)} className="p-1 text-emerald-400 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* 2. Statewide KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Statewide Capacity</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Warehouse size={16} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-2">
            {(totalCapacityStatewide / 1000).toFixed(1)}k MT
          </h3>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">Across 26 AP Mandi Hubs</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Current Occupancy</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Building2 size={16} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-2">
            {(totalStoredStatewide / 1000).toFixed(1)}k MT
          </h3>
          <p className="text-[11px] text-blue-600 font-bold mt-1">{avgUtilization}% Statewide Average</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Cold Chain Facilities</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <Snowflake size={16} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-2">
            {facilities.filter((f) => f.type.includes('Cold')).length} Units
          </h3>
          <p className="text-[11px] text-cyan-600 font-bold mt-1">Sub-zero &amp; CA Chillers</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Govt Rythu Subsidy</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Sparkles size={16} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-2">75% Off</h3>
          <p className="text-[11px] text-amber-700 font-bold mt-1">First 3 Months Cold Storage</p>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* District Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
            >
              <option value="All Districts">All 26 Districts (Statewide)</option>
              {DISTRICT_LIST.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Facility Type Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-xs font-bold">
            {(['All', 'Cold Storage', 'CA Cold Chain', 'Dry Grain Warehouse', 'Port Terminal'] as const).map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    selectedType === t
                      ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hub, district, commodity..."
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 w-52 sm:w-64"
          />
        </div>
      </div>

      {/* 4. Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFacilities.map((facility) => {
          const utilPct = Math.round((facility.storedMT / facility.capacityMT) * 100);
          const isCold = facility.type.includes('Cold');

          return (
            <div
              key={facility.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Hub Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        isCold ? 'bg-cyan-950 text-cyan-400' : 'bg-emerald-950 text-emerald-400'
                      }`}
                    >
                      {isCold ? <Snowflake size={18} /> : <Warehouse size={18} />}
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-600">
                        📍 {facility.district}
                      </span>
                      <h3 className="text-sm font-black text-slate-900 mt-1 leading-snug">
                        {facility.name}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      facility.type === 'Cold Storage' || facility.type === 'CA Cold Chain'
                        ? 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                        : facility.type === 'Port Terminal'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {facility.type}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin size={11} className="shrink-0 text-slate-400" />
                  <span className="truncate">{facility.address}</span>
                </p>

                {/* Cold Chain Specs */}
                <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium">Operating Temp</span>
                    <p className="font-bold text-slate-800">{facility.temperature}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium">Relative Humidity</span>
                    <p className="font-bold text-slate-800">{facility.humidity}</p>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-600">
                      Capacity: <strong>{facility.storedMT.toLocaleString()} MT</strong> /{' '}
                      {facility.capacityMT.toLocaleString()} MT
                    </span>
                    <span className={`font-black ${utilPct > 80 ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {utilPct}% full
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        utilPct > 80 ? 'bg-rose-500' : utilPct > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${utilPct}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Free Space: <strong>{(facility.capacityMT - facility.storedMT).toLocaleString()} MT</strong>
                  </p>
                </div>

                {/* Stored Commodities */}
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block mb-0.5">
                    Permitted / Stored Crops
                  </span>
                  <p className="text-[11px] text-slate-700 font-medium">{facility.commodities}</p>
                </div>

                {/* Officer & Tariff Info */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="text-[10px] text-slate-400">Superintendent</p>
                    <p className="font-bold text-slate-800 text-[11px]">{facility.superintendent}</p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Phone size={10} /> +91 {facility.phone}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-slate-400">Storage Tariff</p>
                    <p className="font-black text-slate-900">
                      ₹{facility.tariffPerQuintal}{' '}
                      <span className="text-[10px] font-normal text-slate-500">/ Q / Mo</span>
                    </p>
                    {facility.subsidyAvailable && (
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                        75% Subsidy
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Admin vs Standard Controls */}
              <div className="pt-3 border-t border-slate-100">
                {isAdminLoggedIn ? (
                  /* Admin-Only Functions: Unlocked after login */
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() =>
                        setAdminNotice(
                          `Emergency fleet dispatch ordered from ${facility.name} (${facility.district}) to State Buffer Reservoir.`
                        )
                      }
                      className="py-2 px-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Truck size={13} />
                      <span>Dispatch Lot</span>
                    </button>

                    <button
                      onClick={() =>
                        setAdminNotice(
                          `Official quality & temperature audit report logged for ${facility.name}. Notified ${facility.superintendent}.`
                        )
                      }
                      className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck size={13} className="text-emerald-600" />
                      <span>Audit Facility</span>
                    </button>
                  </div>
                ) : (
                  /* Standard User View: Book space / Contact */
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() =>
                        alert(
                          `Booking Space at ${facility.name}: Please visit the local AP Mandi office or contact Superintendent ${facility.superintendent} at +91 ${facility.phone}.`
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-[#062419] hover:bg-[#093324] text-white font-bold text-xs shadow-xs"
                    >
                      Book Cold Storage Space
                    </button>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Lock size={12} />
                      <span>Admin Locked</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Admin Login Modal */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-slate-900 rounded-2xl text-amber-400">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Admin Login</h3>
                  <p className="text-xs text-slate-400">AP State Logistics &amp; Mandi Oversight</p>
                </div>
              </div>
              <button onClick={() => setAdminModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Logistics Officer ID</label>
                <input
                  type="text"
                  value={adminIdInput}
                  onChange={(e) => setAdminIdInput(e.target.value)}
                  className="w-full font-bold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Security PIN / Passcode</label>
                <input
                  type="password"
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value)}
                  placeholder="Enter PIN (e.g. 2026)"
                  className="w-full font-black text-base bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 tracking-widest"
                  required
                  autoFocus
                />
                <p className="text-[10px] text-slate-400 mt-1">Default Demo Admin PIN: <strong>2026</strong></p>
              </div>

              {adminError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Unlock size={14} />
                  <span>Authenticate &amp; Unlock</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
