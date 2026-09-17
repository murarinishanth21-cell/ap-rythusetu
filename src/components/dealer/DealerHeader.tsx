import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  MapPin,
  Bell,
  Menu,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  LogOut,
  X,
  ArrowRight,
  Sparkles,
  Sprout,
  LogIn,
  UserCheck,
  User
} from 'lucide-react';
import { DISTRICT_LIST } from '../../districtData';
import type { DealerUser, FarmerListing } from './types';
import type { DealerActiveTab } from './DealerSidebar';

export interface UserProfile {
  name: string;
  role: 'dealer' | 'farmer' | 'admin' | 'transport' | 'worker';
  id: string;
  mobile: string;
  district?: string;
  avatarInitials: string;
  isLoggedIn: boolean;
}

interface DealerHeaderProps {
  dealer: DealerUser;
  activeDistrict: string;
  onChangeDistrict: (district: string) => void;
  onOpenMobileSidebar: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onLogout?: () => void;
  listings?: FarmerListing[];
  onNavigateToTab?: (tab: DealerActiveTab) => void;
  onSelectListingForDeal?: (listing: FarmerListing) => void;
  currentUser?: UserProfile;
  onLoginUser?: (role: 'dealer' | 'farmer' | 'admin' | 'transport' | 'worker', name?: string, id?: string, mobile?: string, district?: string) => void;
  onSignOutUser?: () => void;
  onOpenAuthModal?: (mode?: 'login' | 'signup') => void;
  activeTab?: DealerActiveTab;
  onSelectPortalMode?: (mode: 'general' | 'farmer' | 'dealer' | 'transport' | 'admin', district?: string) => void;
}

export const DealerHeader: React.FC<DealerHeaderProps> = ({
  dealer,
  activeDistrict,
  onChangeDistrict,
  onOpenMobileSidebar,
  searchQuery,
  onSearchChange,
  onLogout,
  listings = [],
  onNavigateToTab,
  onSelectListingForDeal,
  currentUser = {
    name: dealer.name,
    role: 'dealer',
    id: dealer.id,
    mobile: dealer.mobile,
    avatarInitials: dealer.avatarInitials,
    isLoggedIn: false
  },
  onLoginUser,
  onSignOutUser,
  onOpenAuthModal,
  activeTab: _activeTab = 'dashboard',
  onSelectPortalMode
}) => {
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginRole, setLoginRole] = useState<'dealer' | 'farmer' | 'admin'>('dealer');
  const [customPhone, setCustomPhone] = useState('');
  const [customName, setCustomName] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const q = searchQuery.trim().toLowerCase();

  // 1. Matched App Modules & Features
  const SYSTEM_ACTIONS = [
    { id: 'market_trends' as DealerActiveTab, title: 'Market Trends & SVG Line Graph', desc: 'Real-time Mandi price charts & daily volume', icon: '📈', keywords: ['trend', 'chart', 'price', 'graph', 'market', 'rates', 'history', 'sannam'] },
    { id: 'buy_produce' as DealerActiveTab, title: 'Buy Produce (Farmer Listings)', desc: 'Browse harvest lots & initiate procurement deals', icon: '🛒', keywords: ['buy', 'produce', 'crop', 'listing', 'enquiry', 'purchase', 'lot', 'mandi'] },
    { id: 'deal_and_ask' as DealerActiveTab, title: 'Deal & Ask Negotiation Flow', desc: 'Active bargaining counter & offer history', icon: '🤝', keywords: ['deal', 'ask', 'negotiate', 'offer', 'bargain', 'counter', 'agreement'] },
    { id: 'price_alerts' as DealerActiveTab, title: 'Price Alerts & Target Rates', desc: 'Set triggers for price drops or spikes', icon: '🔔', keywords: ['alert', 'notify', 'target', 'trigger', 'threshold', 'bell'] },
    { id: 'stock_inventory' as DealerActiveTab, title: 'Stock & Inventory Management', desc: 'Warehouse quantities, SKUs, and low-stock alarms', icon: '📦', keywords: ['stock', 'inventory', 'warehouse', 'sku', 'reserve', 'storage', 'low'] },
    { id: 'farmer_sell' as DealerActiveTab, title: 'Farmer Mandi Publishing Portal', desc: 'Publish harvest lots & respond to enquiries', icon: '🧑‍🌾', keywords: ['sell', 'farmer', 'publish', 'harvest', 'crop', 'rythu'] },
    { id: 'ap_map' as DealerActiveTab, title: 'AP 26-District GeoJSON Explorer', desc: 'Interactive statewide map with agronomy & weather', icon: '🗺️', keywords: ['map', 'district', 'geojson', 'weather', 'statewide', 'explorer'] },
    { id: 'profit_calc' as DealerActiveTab, title: 'Crop Yield & Profit Calculator', desc: 'Estimate production yield, costs, and net ROI', icon: '🧮', keywords: ['calc', 'calculator', 'profit', 'yield', 'cost', 'revenue', 'roi', 'estimate'] },
    { id: 'ai_assistant' as DealerActiveTab, title: 'AI Voice & Leaf Vision Diagnostics', desc: 'Multilingual Telugu/Hindi voice & disease scanner', icon: '🎙️', keywords: ['ai', 'voice', 'bot', 'disease', 'leaf', 'scan', 'telugu', 'paddy blast'] },
    { id: 'transport_vehicles' as DealerActiveTab, title: 'Transport Logistics Fleet', desc: 'Book freight trucks with 6-digit OTP escrow', icon: '🚚', keywords: ['transport', 'vehicle', 'truck', 'freight', 'fleet', 'otp', 'driver'] },
    { id: 'warehouse_storage' as DealerActiveTab, title: 'Warehouse & Cold Storage (26 Districts)', desc: 'Government cold storage facilities, silos, and e-NWR depots', icon: '❄️', keywords: ['warehouse', 'cold', 'storage', 'cool', 'chill', 'silos', 'buffer', 'depot'] },
    { id: 'labour_hub' as DealerActiveTab, title: 'AP Shramik Hubs & Workers Portal', desc: 'Hire workers for farmers and construction sites in AP Shramik Hubs', icon: '👷', keywords: ['shramik', 'worker', 'hire', 'construction', 'coolie', 'job', 'wages', 'labour', 'workforce'] },
    { id: 'grievances' as DealerActiveTab, title: 'Mandi Grievance & Dispute Redressal', desc: 'Dispute tickets for payment delays & weighment', icon: '⚖️', keywords: ['grievance', 'complaint', 'dispute', 'ticket', 'support', 'redressal', 'issue'] }
  ];

  const matchedModules = q
    ? SYSTEM_ACTIONS.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.desc.toLowerCase().includes(q) ||
          a.keywords.some((k) => k.includes(q))
      ).slice(0, 3)
    : [];

  // 2. Matched Listings
  const matchedListings = q && listings
    ? listings.filter(
        (l) =>
          l.cropName.toLowerCase().includes(q) ||
          l.cropVariety.toLowerCase().includes(q) ||
          l.farmerName.toLowerCase().includes(q) ||
          l.mandal.toLowerCase().includes(q) ||
          l.grade.toLowerCase().includes(q) ||
          l.district.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  // 3. Matched AP Districts
  const matchedDistricts = q
    ? DISTRICT_LIST.filter((d) => d.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const totalResultsCount = matchedModules.length + matchedListings.length + matchedDistricts.length;

  const handleSelectModule = (tab: DealerActiveTab) => {
    setIsSearchFocused(false);
    if (onNavigateToTab) onNavigateToTab(tab);
  };

  const handleSelectListing = (l: FarmerListing) => {
    setIsSearchFocused(false);
    if (onSelectListingForDeal) {
      onSelectListingForDeal(l);
    } else if (onNavigateToTab) {
      onNavigateToTab('deal_and_ask');
    }
  };

  const handleSelectDistrict = (dist: string) => {
    onChangeDistrict(dist);
    setIsSearchFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsSearchFocused(false);
    } else if (e.key === 'Enter') {
      setIsSearchFocused(false);
      if (onNavigateToTab) onNavigateToTab('buy_produce');
    }
  };

  // Close search on outside click
  useEffect(() => {
    const handleOutsideClick = (evt: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(evt.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Profile Specific Realtime Notifications
  const DEALER_NOTIFICATIONS = [
    {
      id: 'dn-1',
      title: '🌶️ Market Rate Spike',
      desc: 'Guntur Sannam Chilli rose +4.8% to ₹18,500/Q in Guntur Mirchi Yard.',
      time: '6 min ago',
      unread: true,
      category: 'Market Update'
    },
    {
      id: 'dn-2',
      title: '🧑‍🌾 New Harvest Lot Listed',
      desc: 'Farmer V. Ramana Rao published 150 Q Teja Supreme Chilli in Tenali.',
      time: '18 min ago',
      unread: true,
      category: 'Farmer Listing'
    },
    {
      id: 'dn-3',
      title: '🤝 Bargain Accepted',
      desc: 'Farmer Venkata Ramana accepted your counter-offer of ₹18,200/Q for lot #lst-101.',
      time: '42 min ago',
      unread: false,
      category: 'Deal Acceptance'
    },
    {
      id: 'dn-4',
      title: '🚚 Transport Fleet Dispatched',
      desc: '10-Ton Freight Truck AP-07-TJ-4492 en route from Guntur Mandi to Tenali farm-gate.',
      time: '1 hour ago',
      unread: false,
      category: 'Logistics'
    }
  ];

  const FARMER_NOTIFICATIONS = [
    {
      id: 'fn-1',
      title: '💼 Dealer Bargain Proposal',
      desc: 'Sri Balaji Agro Commodities submitted an offer of ₹18,000/Q for your 150 Q Chilli lot.',
      time: '4 min ago',
      unread: true,
      category: 'Bargain Offer'
    },
    {
      id: 'fn-2',
      title: '🏛️ AP Govt MSP Price Alert',
      desc: 'Agriculture Dept declared minimum floor price safety of ₹16,500/Q for Red Chilli.',
      time: '25 min ago',
      unread: true,
      category: 'MSP Declaration'
    },
    {
      id: 'fn-3',
      title: '🛡️ RBK Quality Certified',
      desc: 'Rythu Bharosa Kendra officer certified your Turmeric harvest as Grade A1.',
      time: '1 hour ago',
      unread: false,
      category: 'RBK Inspection'
    },
    {
      id: 'fn-4',
      title: '🚜 Farm-Gate Transport Allocated',
      desc: 'Tractor Trolley AP-16-TX-9921 scheduled for loading today at 02:00 PM. OTP: 492011.',
      time: '2 hours ago',
      unread: false,
      category: 'Transport Booking'
    },
    {
      id: 'fn-5',
      title: '💰 Escrow Payment Credited',
      desc: '₹2,73,000 direct RTGS payment credited to your SBI Account (AP-Rythu Escrow).',
      time: '4 hours ago',
      unread: false,
      category: 'Payment Settlement'
    }
  ];

  const ADMIN_NOTIFICATIONS = [
    {
      id: 'an-1',
      title: '📦 Buffer Stock Rebalance Alert',
      desc: 'Ananthapur and Sri Sathya Sai dryland granaries require groundnut replenishment.',
      time: '10 min ago',
      unread: true,
      category: 'State Buffer'
    },
    {
      id: 'an-2',
      title: '❄️ Cold Storage Capacity Warning',
      desc: 'Machilipatnam and Kakinada port silos operating above 82% capacity.',
      time: '35 min ago',
      unread: true,
      category: 'Warehouse Logistics'
    }
  ];

  const activeRole = currentUser?.role || 'dealer';
  const notifications = activeRole === 'farmer' ? FARMER_NOTIFICATIONS : activeRole === 'admin' ? ADMIN_NOTIFICATIONS : DEALER_NOTIFICATIONS;
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4 shadow-xs">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full max-w-lg" ref={searchContainerRef}>
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setIsSearchFocused(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search crops, farmers, districts, modules (e.g. Chilli, Guntur, Transport)..."
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                onSearchChange('');
                setIsSearchFocused(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200/60 transition-colors"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}

          {/* Live Floating Search Results Dropdown */}
          {isSearchFocused && q.length > 0 && (
            <div className="absolute left-0 top-full mt-2 w-full sm:w-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-100 max-h-[82vh] overflow-y-auto custom-scrollbar">
              {/* Header result counter */}
              <div className="p-3 bg-slate-50/80 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">
                  {totalResultsCount > 0 ? (
                    <>Found <strong className="text-emerald-700 font-black">{totalResultsCount}</strong> results for &ldquo;{searchQuery}&rdquo;</>
                  ) : (
                    <>No exact matches for &ldquo;{searchQuery}&rdquo;</>
                  )}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">ESC to close</span>
              </div>

              {/* 1. System Feature Matches */}
              {matchedModules.length > 0 && (
                <div className="p-2 space-y-1">
                  <div className="px-2.5 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={11} className="text-amber-500" />
                    <span>Platform Features &amp; Actions</span>
                  </div>
                  {matchedModules.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleSelectModule(m.id)}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/60 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg p-1.5 bg-slate-100 rounded-lg group-hover:bg-emerald-100 transition-colors">
                          {m.icon}
                        </span>
                        <div className="truncate">
                          <p className="text-xs font-black text-slate-900 group-hover:text-emerald-800">
                            {m.title}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">{m.desc}</p>
                        </div>
                      </div>
                      <span className="shrink-0 text-[11px] font-bold text-emerald-700 bg-white px-2 py-1 rounded-lg border border-slate-200 group-hover:border-emerald-200 flex items-center gap-1">
                        <span>Open</span>
                        <ArrowRight size={11} />
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* 2. Farmer Produce Listings Matches */}
              {matchedListings.length > 0 && (
                <div className="p-2 space-y-1">
                  <div className="px-2.5 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sprout size={11} className="text-emerald-600" />
                    <span>Mandi Produce Lots &amp; Farmers</span>
                  </div>
                  {matchedListings.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => handleSelectListing(l)}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={l.image}
                          alt={l.cropName}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1595188812674-d4f3b610c436?q=80&w=600&auto=format&fit=crop';
                          }}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-900 group-hover:text-emerald-700 truncate">
                            {l.cropName} <span className="text-slate-400 font-normal">({l.cropVariety})</span>
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            Farmer: <strong className="text-slate-700">{l.farmerName}</strong> • {l.mandal}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 pl-2">
                        <p className="text-xs font-black text-emerald-700">₹{l.askingPricePerQuintal.toLocaleString()} / Q</p>
                        <p className="text-[10px] font-semibold text-slate-400">{l.availableVolumeQuintals} Q Avail</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* 3. Mandi District Matches */}
              {matchedDistricts.length > 0 && (
                <div className="p-2 space-y-1">
                  <div className="px-2.5 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={11} className="text-emerald-700" />
                    <span>AP Mandi Districts</span>
                  </div>
                  {matchedDistricts.map((dist) => (
                    <button
                      key={dist}
                      onClick={() => handleSelectDistrict(dist)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors ${
                        activeDistrict.toLowerCase() === dist.toLowerCase()
                          ? 'bg-emerald-50 text-emerald-900 font-bold'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">📍</span>
                        <span className="text-xs font-bold">{dist} District Mandis</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {activeDistrict.toLowerCase() === dist.toLowerCase() ? 'Current Active' : 'Switch Here'}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Footer action: search all in Buy Produce */}
              <div className="p-2.5 bg-slate-50/70 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsSearchFocused(false);
                    if (onNavigateToTab) onNavigateToTab('buy_produce');
                  }}
                  className="w-full py-2 bg-[#062419] hover:bg-[#093324] text-white rounded-xl text-xs font-black shadow-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>View All Produce Matching &ldquo;{searchQuery}&rdquo;</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: District Selector, Notifications, Dealer Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* AP Unified Portal Navigation Switcher */}
        {onSelectPortalMode && (
          <div className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 shadow-2xs">
            <button
              onClick={() => onSelectPortalMode('general', activeDistrict)}
              className="px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded-xl transition-all flex items-center gap-1"
              title="AP Mandi Market Trends & Heatmap"
            >
              <span>📈</span>
              <span>Trends</span>
            </button>
            <button
              onClick={() => onSelectPortalMode('farmer', activeDistrict)}
              className="px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded-xl transition-all flex items-center gap-1"
              title="Farmer Sell Portal"
            >
              <span>🌾</span>
              <span>Farmer</span>
            </button>
            <button
              className="px-2.5 py-1 text-[11px] font-black text-white bg-teal-800 rounded-xl shadow-xs flex items-center gap-1"
              title="Current: Dealer Buy Portal"
            >
              <span>🛒</span>
              <span>Dealer</span>
            </button>
            <button
              onClick={() => onSelectPortalMode('transport', activeDistrict)}
              className="px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded-xl transition-all flex items-center gap-1"
              title="Transport & Logistics Hub"
            >
              <span>🚚</span>
              <span>Transport</span>
            </button>
            <button
              onClick={() => onSelectPortalMode('admin')}
              className="px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded-xl transition-all flex items-center gap-1"
              title="Govt Agriculture Command Center"
            >
              <span>🏛️</span>
              <span>Admin</span>
            </button>
          </div>
        )}

        {/* District Selector Pill */}
        <div className="relative">
          <button
            onClick={() => setDistrictDropdownOpen(!districtDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all"
          >
            <MapPin size={14} className="text-emerald-700" />
            <span className="max-w-[100px] truncate">{activeDistrict}</span>
            <ChevronDown size={13} className="text-slate-400" />
          </button>

          {districtDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setDistrictDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-40 max-h-72 overflow-y-auto custom-scrollbar">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select AP Mandi District
                </div>
                {DISTRICT_LIST.map((dist) => (
                  <button
                    key={dist}
                    onClick={() => {
                      onChangeDistrict(dist);
                      setDistrictDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-colors text-left ${
                      activeDistrict.toLowerCase() === dist.toLowerCase()
                        ? 'bg-emerald-50 text-emerald-800 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{dist}</span>
                    {activeDistrict.toLowerCase() === dist.toLowerCase() && (
                      <CheckCircle2 size={13} className="text-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {notifDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setNotifDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-1.5 w-84 bg-white rounded-2xl shadow-xl border border-slate-100 p-3.5 z-40">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900">
                      {activeRole === 'farmer'
                        ? '🌾 Farmer Notifications'
                        : activeRole === 'admin'
                        ? '🏛️ State Admin Alerts'
                        : '🛒 Dealer Notifications'}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {unreadCount} New
                  </span>
                </div>
                <div className="divide-y divide-slate-100 mt-1 max-h-80 overflow-y-auto custom-scrollbar">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl transition-colors ${
                        n.unread ? 'bg-emerald-50/60' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-slate-900">{n.title}</p>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                            {n.category}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile or Login Button - Always visible for current role */}
        {currentUser && (
          currentUser.isLoggedIn ? (
            /* Logged-In User Profile Badge */
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 pl-1.5 pr-2 py-1 rounded-2xl hover:bg-slate-100 transition-colors text-left"
              >
                <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-black shadow-xs ${
                  currentUser.role === 'farmer' ? 'bg-emerald-700' :
                  currentUser.role === 'transport' ? 'bg-blue-700' :
                  currentUser.role === 'worker' ? 'bg-amber-600' :
                  currentUser.role === 'admin' ? 'bg-purple-700' :
                  'bg-[#062419]'
                }`}>
                  {currentUser.avatarInitials}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser.name}
                    </span>
                    <ShieldCheck size={13} className="text-emerald-600 inline" />
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5 capitalize">
                    {currentUser.role} • {currentUser.id}
                  </p>
                </div>
                <ChevronDown size={13} className="text-slate-400 hidden sm:block" />
              </button>

              {userDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setUserDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-76 bg-white rounded-2xl shadow-xl border border-slate-100 p-3.5 z-40">
                    <div className="pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center text-sm font-black ${
                          currentUser.role === 'farmer' ? 'bg-emerald-700' :
                          currentUser.role === 'transport' ? 'bg-blue-700' :
                          currentUser.role === 'worker' ? 'bg-amber-600' :
                          currentUser.role === 'admin' ? 'bg-purple-700' :
                          'bg-[#062419]'
                        }`}>
                          {currentUser.avatarInitials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</h4>
                          <p className="text-[10px] text-emerald-700 font-semibold mt-0.5 capitalize">
                            Verified AP {currentUser.role}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">{currentUser.id}</p>
                        </div>
                      </div>
                      <div className="mt-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl space-y-0.5">
                        <p>Mobile: +91 {currentUser.mobile || '9848011223'}</p>
                        <p>Jurisdiction: {currentUser.district || activeDistrict} Mandis</p>
                      </div>
                    </div>

                    {/* 1-Click Role Persona Switcher */}
                    <div className="pt-2 border-b border-slate-100 pb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 pb-1">
                        Switch Persona / Portal (1-Click)
                      </p>
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            if (onLoginUser) onLoginUser('dealer');
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                            currentUser.role === 'dealer' ? 'bg-teal-50 text-teal-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">🛒 Dealer (Sri Balaji)</span>
                          {currentUser.role === 'dealer' && <span className="text-[10px] text-teal-600 font-bold">Active</span>}
                        </button>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            if (onSelectPortalMode) {
                              onSelectPortalMode('farmer', activeDistrict);
                            } else if (onLoginUser) {
                              onLoginUser('farmer');
                            }
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                            currentUser.role === 'farmer' ? 'bg-emerald-50 text-emerald-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">🌾 Farmer (V. Ramana Rao)</span>
                          {currentUser.role === 'farmer' && <span className="text-[10px] text-emerald-600 font-bold">Active</span>}
                        </button>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            if (onSelectPortalMode) {
                              onSelectPortalMode('transport', activeDistrict);
                            } else if (onLoginUser) {
                              onLoginUser('transport');
                            }
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                            currentUser.role === 'transport' ? 'bg-blue-50 text-blue-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">🚚 Transport (AP GreenLine)</span>
                          {currentUser.role === 'transport' && <span className="text-[10px] text-blue-600 font-bold">Active</span>}
                        </button>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            if (onSelectPortalMode) {
                              onSelectPortalMode('admin');
                            } else if (onLoginUser) {
                              onLoginUser('admin');
                            }
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                            currentUser.role === 'admin' ? 'bg-purple-50 text-purple-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">🏛️ Admin (Command Center)</span>
                          {currentUser.role === 'admin' && <span className="text-[10px] text-purple-600 font-bold">Active</span>}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 space-y-1">
                      {onNavigateToTab && (
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onNavigateToTab('profile_settings');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors text-left"
                        >
                          <User size={14} className="text-emerald-700" />
                          <span>View Profile & Settings (నా ప్రొఫైల్)</span>
                        </button>
                      )}

                      {onOpenAuthModal && (
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenAuthModal('login');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors text-left"
                        >
                          <UserCheck size={14} className="text-emerald-600" />
                          <span>Switch Account (ఖాతా మార్చండి)</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onSignOutUser) {
                            onSignOutUser();
                          } else if (onLogout) {
                            onLogout();
                          }
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
                      >
                        <LogOut size={14} />
                        <span>Sign Out ({currentUser.role})</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Role-Specific Logged-Out Direct Login and Sign Up Buttons */
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  if (onOpenAuthModal) {
                    onOpenAuthModal('login');
                  } else {
                    setLoginModalOpen(true);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#062c1e] hover:bg-[#0a3a28] text-emerald-300 hover:text-white text-xs font-bold shadow-xs transition-all border border-[#0e4b34]"
                title="Login to existing account"
              >
                <LogIn size={14} />
                <span>
                  {currentUser.role === 'dealer'
                    ? 'Dealer Login'
                    : currentUser.role === 'farmer'
                    ? 'Farmer Login'
                    : currentUser.role === 'transport'
                    ? 'Transport Login'
                    : currentUser.role === 'worker'
                    ? 'Worker Login'
                    : currentUser.role === 'admin'
                    ? 'Admin Login'
                    : 'Login'}
                </span>
              </button>

              <button
                onClick={() => {
                  if (onOpenAuthModal) {
                    onOpenAuthModal('signup');
                  } else {
                    setLoginModalOpen(true);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0e4b34] hover:bg-[#135d41] text-white text-xs font-bold shadow-xs transition-all border border-[#166544]"
                title="Sign Up as new user"
              >
                <UserCheck size={14} />
                <span>Sign Up</span>
              </button>
            </div>
          )
        )}
      </div>

      {/* Universal Multi-Role Direct Login Modal (Fallback without profile cards) */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#062c1e] text-emerald-400 flex items-center justify-center">
                  <LogIn size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">AP-RythuSetu Authentication</h3>
                  <p className="text-[11px] text-slate-500">Login or Sign Up with your mobile number</p>
                </div>
              </div>
              <button
                onClick={() => setLoginModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Custom Phone / Name Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!customPhone) return;
                const name = customName.trim() || (loginRole === 'farmer' ? 'AP Registered Farmer' : loginRole === 'dealer' ? 'AP Licensed Dealer' : 'AP User');
                const id = `AP-${loginRole.toUpperCase().slice(0, 3)}-${customPhone.slice(-4)}`;
                if (onLoginUser) {
                  onLoginUser(loginRole, name, id, customPhone, activeDistrict);
                }
                setLoginModalOpen(false);
                setCustomPhone('');
                setCustomName('');
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Select Role (పాత్రను ఎంచుకోండి)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['dealer', 'farmer', 'admin'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setLoginRole(r)}
                      className={`py-1.5 rounded-xl font-bold border transition-colors capitalize text-xs ${
                        loginRole === r
                          ? 'bg-[#062c1e] text-white border-[#062c1e]'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Full Name (పేరు)
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  10-Digit Mobile Number (మొబైల్ నంబర్) *
                </label>
                <input
                  type="tel"
                  placeholder="9848012345"
                  maxLength={10}
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value.replace(/\D/g, ''))}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 text-xs font-semibold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#062c1e] hover:bg-[#0a3a28] text-emerald-300 hover:text-white rounded-xl font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 border border-[#0e4b34]"
                >
                  <LogIn size={14} />
                  <span>Login / Sign In (ప్రవేశించండి)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
