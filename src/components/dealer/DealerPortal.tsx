import React, { useState, useEffect, useMemo } from 'react';
import { DealerSidebar, type DealerActiveTab } from './DealerSidebar';
import { DealerHeader, type UserProfile } from './DealerHeader';
import { DashboardView } from './views/DashboardView';
import { MarketTrendsView } from './views/MarketTrendsView';
import { BuyProduceView } from './views/BuyProduceView';
import { DealAndAskView } from './views/DealAndAskView';
import { PriceAlertsView } from './views/PriceAlertsView';
import { StockInventoryView } from './views/StockInventoryView';
import { FarmerSellView } from './views/FarmerSellView';
import { ProfitCalculatorView } from './views/ProfitCalculatorView';
import { AIAssistantView } from './views/AIAssistantView';
import { TransportFleetView } from './views/TransportFleetView';
import { GrievanceRedressalView } from './views/GrievanceRedressalView';
import { WarehouseStorageView } from './views/WarehouseStorageView';
import { LabourHubWorkersView } from './views/LabourHubWorkersView';
import { UserProfileView } from './views/UserProfileView';
import { CropsGradesView } from './views/CropsGradesView';
import { OtherDealerViews } from './views/OtherDealerViews';
import { api } from '../../api';
import {
  CURRENT_DEALER,
  getDistrictFarmerListings
} from './dealerData';
import type { FarmerListing, CropMarketOverview, DealerUser } from './types';
import { DISTRICT_LIST, getDistrictMarketOverviews, getCropImage } from '../../districtData';
import {
  X,
  Send,
  UserCheck,
  ArrowRight,
  LogIn
} from 'lucide-react';

const SESSIONS_STORAGE_KEY = 'ap_rythusetu_role_sessions_v3';

export interface RoleSessions {
  dealer: UserProfile;
  farmer: UserProfile;
  transport: UserProfile;
  worker: UserProfile;
  admin: UserProfile;
}

export const DEFAULT_ROLE_SESSIONS: RoleSessions = {
  dealer: {
    name: 'Sri Balaji Agro Traders',
    role: 'dealer',
    id: 'AP-DLR-GNT-8891',
    mobile: '9848011223',
    district: 'Guntur',
    avatarInitials: 'SB',
    isLoggedIn: true
  },
  farmer: {
    name: 'V. Ramana Rao',
    role: 'farmer',
    id: 'AP-RYTHU-522001',
    mobile: '9848022331',
    district: 'Guntur',
    avatarInitials: 'VR',
    isLoggedIn: true
  },
  transport: {
    name: 'AP Rythu Vahini Transport',
    role: 'transport',
    id: 'AP-LOG-7721',
    mobile: '9848033445',
    district: 'Guntur',
    avatarInitials: 'RV',
    isLoggedIn: true
  },
  worker: {
    name: 'Mandi Hamali & Agritech Union',
    role: 'worker',
    id: 'AP-SHR-4412',
    mobile: '9848044556',
    district: 'Guntur',
    avatarInitials: 'MH',
    isLoggedIn: true
  },
  admin: {
    name: 'AP Agriculture Directorate Admin',
    role: 'admin',
    id: 'AP-DIR-ADM-01',
    mobile: '9848000001',
    district: 'Amaravati',
    avatarInitials: 'AD',
    isLoggedIn: true
  }
};

const getStoredRoleSessions = (): RoleSessions => {
  try {
    const saved = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return {
          dealer: parsed.dealer || DEFAULT_ROLE_SESSIONS.dealer,
          farmer: parsed.farmer || DEFAULT_ROLE_SESSIONS.farmer,
          transport: parsed.transport || DEFAULT_ROLE_SESSIONS.transport,
          worker: parsed.worker || DEFAULT_ROLE_SESSIONS.worker,
          admin: parsed.admin || DEFAULT_ROLE_SESSIONS.admin
        };
      }
    }
  } catch {}
  return DEFAULT_ROLE_SESSIONS;
};

export const getRoleForTab = (tab: DealerActiveTab): 'farmer' | 'dealer' | 'transport' | 'worker' | 'admin' => {
  if (tab === 'dashboard') return 'dealer';
  if (tab === 'farmer_sell' || tab === 'profit_calc') return 'farmer';
  if (tab === 'transport_vehicles' || tab === 'warehouse_storage') return 'transport';
  if (tab === 'labour_hub') return 'worker';
  if (tab === 'stock_inventory' || tab === 'grievances') return 'admin';
  return 'dealer';
};

interface AdminAccessGateProps {
  tabTitle: string;
  tabDescription: string;
  onLoginAsAdmin: () => void;
  onBackToDashboard: () => void;
}

const AdminAccessGate: React.FC<AdminAccessGateProps> = ({
  tabTitle,
  tabDescription,
  onLoginAsAdmin,
  onBackToDashboard
}) => (
  <div className="max-w-2xl mx-auto my-10 bg-white rounded-3xl border-2 border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
    <div className="bg-[#062c1e] text-white p-6 border-b-2 border-[#0e4b34] text-center">
      <div className="w-16 h-16 rounded-3xl bg-[#0e4b34] border-2 border-[#166544] mx-auto flex items-center justify-center text-3xl shadow-inner mb-3">
        🔒
      </div>
      <span className="text-[10px] font-black uppercase tracking-wider bg-[#0e4b34] text-emerald-300 border border-[#166544] px-3 py-1 rounded-full">
        ఆంధ్రప్రదేశ్ ప్రభుత్వం • Restricted Official Access
      </span>
      <h2 className="text-xl sm:text-2xl font-black text-white mt-2 tracking-tight">
        Admin Authentication Required
      </h2>
      <p className="text-xs text-emerald-200 mt-1 font-medium">
        అడ్మిన్ లాగిన్ అవసరం • Authorized State Officials Only
      </p>
    </div>

    <div className="p-6 sm:p-8 space-y-6 text-center">
      <div className="space-y-2">
        <h3 className="text-base font-black text-slate-900">
          {tabTitle} is Accessible by Admin Only
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-lg mx-auto">
          {tabDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
          <p className="font-extrabold text-slate-900 flex items-center gap-1.5">
            <span>🏛️</span>
            <span>Statewide Inventory Control</span>
          </p>
          <p className="text-[11px] text-slate-500">
            Real-time buffer stocks, cold storage godowns &amp; emergency dispatches across all 26 AP districts.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
          <p className="font-extrabold text-slate-900 flex items-center gap-1.5">
            <span>⚖️</span>
            <span>APMC Dispute &amp; Grievances</span>
          </p>
          <p className="text-[11px] text-slate-500">
            Confidential resolution of payment delays, weighment disputes, and official AP Govt escrow interventions.
          </p>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onLoginAsAdmin}
          className="w-full sm:w-auto px-6 py-3 bg-[#062c1e] hover:bg-[#0a3a28] text-emerald-300 hover:text-white rounded-2xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 border border-[#0e4b34]"
        >
          <span>🔐 Login as State Administrator (అడ్మిన్‌గా లాగిన్)</span>
          <ArrowRight size={14} />
        </button>

        <button
          onClick={onBackToDashboard}
          className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs transition-colors"
        >
          <span>Return to Dashboard (డాష్‌బోర్డ్)</span>
        </button>
      </div>
    </div>
  </div>
);

interface DealerPortalProps {
  initialDistrict?: string;
  onSwitchToFarmerPortal?: () => void;
  onSelectPortalMode?: (mode: 'general' | 'farmer' | 'dealer' | 'transport' | 'admin', district?: string) => void;
}

export const DealerPortal: React.FC<DealerPortalProps> = ({
  initialDistrict = 'Guntur',
  onSwitchToFarmerPortal: _onSwitchToFarmerPortal,
  onSelectPortalMode
}) => {
  const [activeTab, setActiveTab] = useState<DealerActiveTab>('dashboard');
  const [activeDistrict, setActiveDistrict] = useState<string>(initialDistrict);
  const [currentRole, setCurrentRole] = useState<'dealer' | 'farmer'>('dealer');
  const [dealerUser] = useState<DealerUser>(CURRENT_DEALER);
  
  // Persistent Role-Specific Auth Sessions (Remembers each portal profile)
  const [roleSessions, setRoleSessions] = useState<RoleSessions>(getStoredRoleSessions);
  const activeRole = getRoleForTab(activeTab);
  const currentHeaderUser: UserProfile | undefined = activeRole ? roleSessions[activeRole] : undefined;
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  
  // Auth Modal Tab & Form State (Strictly Login or Sign Up - No Profiles Shown)
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [authCustomRole, setAuthCustomRole] = useState<'farmer' | 'dealer' | 'transport' | 'worker' | 'admin'>('farmer');
  const [authCustomName, setAuthCustomName] = useState<string>('');
  const [authCustomMobile, setAuthCustomMobile] = useState<string>('');
  const [authCustomDistrict, setAuthCustomDistrict] = useState<string>(initialDistrict);
  const [authCustomOtp, setAuthCustomOtp] = useState<string>('123456');
  const [authRememberMe, setAuthRememberMe] = useState<boolean>(true);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Keep activeDistrict synced with initialDistrict prop
  useEffect(() => {
    if (initialDistrict) {
      setActiveDistrict(initialDistrict);
    }
  }, [initialDistrict]);

  // Dynamically calculate marketOverviews for the active district
  const marketOverviews = useMemo<CropMarketOverview[]>(() => {
    return getDistrictMarketOverviews(activeDistrict);
  }, [activeDistrict]);

  // Live state for listings & selected deal item
  const [listings, setListings] = useState<FarmerListing[]>(() => getDistrictFarmerListings(initialDistrict));
  const [selectedListingForDeal, setSelectedListingForDeal] = useState<FarmerListing | undefined>(() => {
    const init = getDistrictFarmerListings(initialDistrict);
    return init[0];
  });

  // Modals
  const [newEnquiryModalOpen, setNewEnquiryModalOpen] = useState(false);

  // New Enquiry Form
  const [enqCrop, setEnqCrop] = useState('Guntur Sannam Chilli');
  const [enqQty, setEnqQty] = useState('150');
  const [enqRate, setEnqRate] = useState('18000');
  const [enqNotes, setEnqNotes] = useState('');

  // Real-time background data loading
  useEffect(() => {
    let mounted = true;

    const loadRealtimeMarketplace = async () => {
      try {
        const liveListings = await api.getMarketplace(activeDistrict);
        if (mounted && Array.isArray(liveListings) && liveListings.length > 0) {
          const mapped: FarmerListing[] = liveListings.map((item: any) => ({
            id: item.id?.toString() || `lst-${Math.random()}`,
            farmerName: item.farmer_name || 'AP Farmer',
            farmerInitials: (item.farmer_name || 'AP')
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2),
            mandal: item.mandal || `${activeDistrict} Mandal`,
            district: item.district || activeDistrict,
            cropName: item.crop || item.crop_name || item.cropName || 'Produce',
            cropVariety: item.variety || item.cropVariety || 'Standard',
            grade: item.quality || item.grade || 'Grade A1 FAQ',
            image: item.image_url || item.image || getCropImage(item.crop || item.crop_name),
            availableVolumeQuintals: Number(item.qty || item.quantity_quintals || item.availableVolumeQuintals) || 100,
            askingPricePerQuintal: Number(item.price || item.askingPricePerQuintal) || 2500,
            listedTime: 'Real-time',
            verified: true,
            dealsCount: 14,
            rating: 4.8,
            completionRate: 99
          }));
          setListings(mapped);
          if (mapped.length > 0) setSelectedListingForDeal(mapped[0]);
        } else if (mounted) {
          const fallback = getDistrictFarmerListings(activeDistrict);
          setListings(fallback);
          if (fallback.length > 0) setSelectedListingForDeal(fallback[0]);
        }
      } catch {
        if (mounted) {
          const fallback = getDistrictFarmerListings(activeDistrict);
          setListings(fallback);
          if (fallback.length > 0) setSelectedListingForDeal(fallback[0]);
        }
      }
    };

    loadRealtimeMarketplace();
    const interval = setInterval(loadRealtimeMarketplace, 8000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [activeDistrict]);

  // Handle Select Listing for Deal
  const handleSelectListingForDeal = (listing: FarmerListing) => {
    setSelectedListingForDeal(listing);
    setActiveTab('deal_and_ask');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`🎉 Purchase Enquiry for ${enqQty} Quintals of ${enqCrop} @ ₹${Number(enqRate).toLocaleString()}/Q has been broadcasted to verified farmers in ${activeDistrict}!`);
    setNewEnquiryModalOpen(false);
    setEnqNotes('');
  };

  const handleSelectPortalModeInternal = (mode: 'general' | 'farmer' | 'dealer' | 'transport' | 'admin', district?: string) => {
    if (district) {
      setActiveDistrict(district);
    }
    if (mode === 'farmer') {
      setCurrentRole('farmer');
      setActiveTab('farmer_sell');
      handleLoginUser('farmer', undefined, undefined, undefined, district || activeDistrict);
    } else if (mode === 'dealer') {
      setCurrentRole('dealer');
      setActiveTab('dashboard');
      handleLoginUser('dealer', undefined, undefined, undefined, district || activeDistrict);
    } else if (mode === 'transport') {
      setActiveTab('transport_vehicles');
      handleLoginUser('transport', undefined, undefined, undefined, district || activeDistrict);
    } else if (mode === 'admin') {
      setActiveTab('grievances');
      handleLoginUser('admin', undefined, undefined, undefined, 'Amaravati');
    } else if (mode === 'general') {
      setActiveTab('market_trends');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onSelectPortalMode) {
      onSelectPortalMode(mode, district);
    }
  };

  const handleSwitchPortalRole = () => {
    if (currentRole === 'dealer') {
      handleSelectPortalModeInternal('farmer');
    } else {
      handleSelectPortalModeInternal('dealer');
    }
  };

  const handleLoginUser = (
    role: 'dealer' | 'farmer' | 'admin' | 'transport' | 'worker',
    name?: string,
    id?: string,
    mobile?: string,
    district?: string
  ) => {
    const defaultProfile = DEFAULT_ROLE_SESSIONS[role];
    const finalName = name || defaultProfile.name;
    const finalId = id || defaultProfile.id;
    const avatarInitials = finalName
      .split(' ')
      .map((s) => s[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const profile: UserProfile = {
      name: finalName,
      role,
      id: finalId,
      mobile: mobile || defaultProfile.mobile,
      district: district || activeDistrict,
      avatarInitials,
      isLoggedIn: true
    };

    const updatedSessions: RoleSessions = {
      ...roleSessions,
      [role]: profile
    };
    setRoleSessions(updatedSessions);
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updatedSessions));
    } catch {}

    setAuthModalOpen(false);

    if (role === 'farmer') {
      setCurrentRole('farmer');
      setActiveTab('farmer_sell');
    } else if (role === 'transport') {
      setActiveTab('transport_vehicles');
    } else if (role === 'worker') {
      setActiveTab('labour_hub');
    } else if (role === 'admin') {
      setActiveTab('stock_inventory');
    } else {
      setCurrentRole('dealer');
      setActiveTab('buy_produce');
    }
  };

  const handleSignOutUser = () => {
    const roleToSignOut = activeRole || 'dealer';
    const updatedSessions: RoleSessions = {
      ...roleSessions,
      [roleToSignOut]: {
        ...roleSessions[roleToSignOut],
        isLoggedIn: false
      }
    };
    setRoleSessions(updatedSessions);
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updatedSessions));
    } catch {}
  };

  const handleOpenAuthModal = (
    targetRole?: 'farmer' | 'dealer' | 'transport' | 'worker' | 'admin',
    mode: 'login' | 'signup' = 'login'
  ) => {
    const roleToSet = targetRole || activeRole || 'dealer';
    setAuthCustomRole(roleToSet);
    setAuthTab(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex">
      {/* 1. Left Sidebar Navigation */}
      <DealerSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSwitchPortalRole={handleSwitchPortalRole}
        onSelectPortalMode={handleSelectPortalModeInternal}
        currentRole={currentRole}
        currentUser={currentHeaderUser || roleSessions.dealer}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header with Real-Time Global Search & Universal Auth */}
        <DealerHeader
          dealer={dealerUser}
          activeDistrict={activeDistrict}
          onChangeDistrict={(dist) => setActiveDistrict(dist)}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          searchQuery={globalSearch}
          onSearchChange={(q) => setGlobalSearch(q)}
          onLogout={handleSignOutUser}
          listings={listings}
          onNavigateToTab={(t) => setActiveTab(t)}
          onSelectListingForDeal={handleSelectListingForDeal}
          currentUser={currentHeaderUser}
          onLoginUser={handleLoginUser}
          onSignOutUser={handleSignOutUser}
          onOpenAuthModal={(mode) => handleOpenAuthModal(undefined, mode)}
          activeTab={activeTab}
          onSelectPortalMode={handleSelectPortalModeInternal}
        />

        {/* Main Canvas Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Active View Router */}
          {activeTab === 'dashboard' && (
            <DashboardView
              activeDistrict={activeDistrict}
              onChangeDistrict={(d) => setActiveDistrict(d)}
              marketOverviews={marketOverviews}
              listings={listings}
              onNavigateToTab={(t) => setActiveTab(t)}
            />
          )}

          {activeTab === 'market_trends' && (
            <MarketTrendsView
              district={activeDistrict}
              marketOverviews={marketOverviews}
              searchQuery={globalSearch}
              onCreateAlertClick={() => setActiveTab('price_alerts')}
              onViewAllCropsClick={() => setActiveTab('buy_produce')}
            />
          )}

          {activeTab === 'buy_produce' && (
            <BuyProduceView
              district={activeDistrict}
              onChangeDistrict={(d) => setActiveDistrict(d)}
              listings={listings}
              initialSearchQuery={globalSearch}
              onSelectListingForDeal={handleSelectListingForDeal}
              onOpenNewEnquiryModal={() => setNewEnquiryModalOpen(true)}
            />
          )}

          {activeTab === 'deal_and_ask' && (
            <DealAndAskView
              listing={selectedListingForDeal}
              onBackToBuyProduce={() => setActiveTab('buy_produce')}
              onViewMarketTrends={() => setActiveTab('market_trends')}
              onNavigateToTab={(tab) => setActiveTab(tab as any)}
            />
          )}


          {activeTab === 'price_alerts' && (
            <PriceAlertsView
              district={activeDistrict}
              onNavigateToMarketTrends={() => setActiveTab('market_trends')}
            />
          )}

          {/* ADMIN ROUTE 1: Stock & Inventory Ledger (Protected) */}
          {activeTab === 'stock_inventory' && (
            roleSessions.admin.isLoggedIn ? (
              <StockInventoryView
                district={activeDistrict}
                initialSearchQuery={globalSearch}
              />
            ) : (
              <AdminAccessGate
                tabTitle="Statewide Stock & Inventory Ledger"
                tabDescription="Contains complete storage records, capacity utilization, commodity breakdowns, and manager contact directories for all 26 districts of Andhra Pradesh."
                onLoginAsAdmin={() => handleOpenAuthModal('admin', 'login')}
                onBackToDashboard={() => setActiveTab('dashboard')}
              />
            )
          )}

          {activeTab === 'farmer_sell' && (
            <FarmerSellView
              district={activeDistrict}
              farmerUser={{
                id: roleSessions.farmer.id,
                name: roleSessions.farmer.name,
                role: 'farmer',
                district: roleSessions.farmer.district || activeDistrict
              }}
            />
          )}

          {activeTab === 'ap_map' && (
            <BuyProduceView
              district={activeDistrict}
              onChangeDistrict={(d) => setActiveDistrict(d)}
              listings={listings}
              initialSearchQuery={globalSearch}
              onSelectListingForDeal={handleSelectListingForDeal}
              onOpenNewEnquiryModal={() => setNewEnquiryModalOpen(true)}
            />
          )}

          {activeTab === 'profit_calc' && (
            <ProfitCalculatorView
              district={activeDistrict}
              onNavigateToMarketTrends={() => setActiveTab('market_trends')}
            />
          )}

          {activeTab === 'ai_assistant' && (
            <AIAssistantView
              district={activeDistrict}
              user={dealerUser}
            />
          )}

          {activeTab === 'transport_vehicles' && (
            <TransportFleetView
              district={activeDistrict}
              user={dealerUser}
            />
          )}

          {/* User Profile & Account Settings */}
          {activeTab === 'profile_settings' && (
            <UserProfileView
              user={currentHeaderUser || roleSessions.dealer}
              district={activeDistrict}
              onUpdateUser={(updated) => {
                const targetRole = updated.role;
                const updatedSessions: RoleSessions = {
                  ...roleSessions,
                  [targetRole]: updated
                };
                setRoleSessions(updatedSessions);
                try {
                  localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updatedSessions));
                } catch {}
              }}
              onSwitchProfile={() => handleOpenAuthModal()}
              onSignOut={handleSignOutUser}
            />
          )}

          {/* ADMIN ROUTE 2: Mandi Grievances & Redressal (Protected) */}
          {activeTab === 'grievances' && (
            roleSessions.admin.isLoggedIn ? (
              <GrievanceRedressalView district={activeDistrict} />
            ) : (
              <AdminAccessGate
                tabTitle="Mandi Grievances & Dispute Redressal"
                tabDescription="Contains confidential farmer-dealer dispute tickets, mandi weighment claims, payment delay escalations, and official AP Govt enforcement actions."
                onLoginAsAdmin={() => handleOpenAuthModal('admin', 'login')}
                onBackToDashboard={() => setActiveTab('dashboard')}
              />
            )
          )}

          {activeTab === 'warehouse_storage' && (
            <WarehouseStorageView district={activeDistrict} />
          )}

          {activeTab === 'labour_hub' && (
            <LabourHubWorkersView district={activeDistrict} />
          )}

          {/* Real-time Crops & Quality Grades Ledger */}
          {activeTab === 'crops_grades' && (
            <CropsGradesView
              district={activeDistrict}
              onNavigateToTab={(t) => setActiveTab(t)}
            />
          )}

          {/* Fallback for other administrative/master data tabs */}
          {![
            'dashboard',
            'market_trends',
            'buy_produce',
            'deal_and_ask',
            'price_alerts',
            'stock_inventory',
            'farmer_sell',
            'ap_map',
            'profit_calc',
            'ai_assistant',
            'transport_vehicles',
            'warehouse_storage',
            'labour_hub',
            'grievances',
            'profile_settings',
            'crops_grades'
          ].includes(activeTab) && (
            <OtherDealerViews
              tab={activeTab}
              district={activeDistrict}
              onNavigateToTab={(t) => setActiveTab(t)}
            />
          )}
        </main>

        {/* 3. Footer */}
        <footer className="mt-auto bg-white border-t border-slate-200/80 px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2025 AP-RythuSetu, Government of Andhra Pradesh. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <button onClick={() => alert('AP-RythuSetu Privacy Policy')} className="hover:text-slate-800">
              Privacy Policy
            </button>
            <span>|</span>
            <button onClick={() => alert('AP-RythuSetu Terms of Use')} className="hover:text-slate-800">
              Terms of Use
            </button>
            <span>|</span>
            <button onClick={() => alert('AP-RythuSetu Support Helpline: 155251')} className="hover:text-slate-800">
              Support
            </button>
          </div>
        </footer>
      </div>

      {/* Modal: New Enquiry */}
      {newEnquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Place New Produce Enquiry</h3>
              <button
                onClick={() => setNewEnquiryModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitEnquiry} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Select Crop</label>
                <select
                  value={enqCrop}
                  onChange={(e) => setEnqCrop(e.target.value)}
                  className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
                >
                  <option>Guntur Sannam Chilli</option>
                  <option>Guntur Chilli (334)</option>
                  <option>Paddy (BPT 5204)</option>
                  <option>Tobacco (FCV)</option>
                  <option>Turmeric</option>
                  <option>Maize</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Required Quantity (Q)</label>
                  <input
                    type="number"
                    value={enqQty}
                    onChange={(e) => setEnqQty(e.target.value)}
                    className="w-full font-black text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Offer Price (₹ / Q)</label>
                  <input
                    type="number"
                    value={enqRate}
                    onChange={(e) => setEnqRate(e.target.value)}
                    className="w-full font-black text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Procurement District</label>
                <input
                  type="text"
                  readOnly
                  value={activeDistrict}
                  className="w-full font-bold bg-slate-100 border border-slate-200 rounded-xl p-2.5 text-slate-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Specifications / Notes</label>
                <textarea
                  rows={3}
                  value={enqNotes}
                  onChange={(e) => setEnqNotes(e.target.value)}
                  placeholder="e.g. Moisture below 10%, immediate cash settlement at mandi..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewEnquiryModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#062419] hover:bg-[#093324] text-white font-bold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Send size={13} className="text-emerald-400" />
                  <span>Broadcast Enquiry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          UNIVERSAL INITIAL LOGIN / SIGN-UP GATE MODAL (WITH DEMO FOR EACH PROFILE)
          ========================================================================= */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-8">
            {/* Modal Solid Dark Green Header (No Glassmorphism) */}
            <div className="bg-[#062c1e] text-white p-5 sm:p-6 border-b-2 border-[#0e4b34] relative">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0e4b34] border border-[#166544] flex items-center justify-center text-amber-400 font-black text-2xl shrink-0 shadow-inner">
                    🏛️
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#0e4b34] text-emerald-300 border border-[#166544] px-2.5 py-0.5 rounded-full">
                        ఆంధ్రప్రదేశ్ ప్రభుత్వం • Govt of AP
                      </span>
                      <span className="text-[10px] text-amber-300 font-bold hidden sm:inline">
                        Verified Secure Portal
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                      AP-RythuSetu Login &amp; Registration
                    </h2>
                    <p className="text-xs text-emerald-200/90 font-medium">
                      రైతు, వ్యాపారి, రవాణాదారు, శ్రామికులు &amp; ప్రభుత్వ అడ్మిన్ సమగ్ర పోర్టల్
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setAuthModalOpen(false);
                    setActiveTab('dashboard');
                  }}
                  className="text-emerald-300 hover:text-white p-1.5 rounded-xl hover:bg-[#0e4b34] transition-colors"
                  title="Explore as Guest"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Top Navigation Tabs - Strictly Login or Sign Up */}
              <div className="flex items-center gap-2 mt-5 border-t border-[#0e4b34] pt-4 overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => setAuthTab('login')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 ${
                    authTab === 'login'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-[#0a3a28] text-emerald-200 hover:text-white hover:bg-[#0e4b34]'
                  }`}
                >
                  <LogIn size={15} />
                  <span>🔑 Login (ప్రవేశం / లాగిన్)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAuthTab('signup')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 ${
                    authTab === 'signup'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-[#0a3a28] text-emerald-200 hover:text-white hover:bg-[#0e4b34]'
                  }`}
                >
                  <UserCheck size={15} />
                  <span>📝 Sign Up (కొత్త నమోదు / సైన్ అప్)</span>
                </button>
              </div>
            </div>

            {/* Modal Body: Direct Login or Sign Up Form (No profiles displayed) */}
            <div className="p-5 sm:p-7 max-h-[72vh] overflow-y-auto custom-scrollbar">
              {authTab === 'login' ? (
                /* ======================== 1. LOGIN FORM ======================== */
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!authCustomMobile || authCustomMobile.length < 10) {
                      alert('Please enter your 10-digit registered mobile number.');
                      return;
                    }
                    const name = authCustomName.trim() || (
                      authCustomRole === 'farmer' ? 'AP Registered Farmer' :
                      authCustomRole === 'transport' ? 'AP Fleet Transporter' :
                      authCustomRole === 'worker' ? 'AP Shramik Worker' :
                      authCustomRole === 'admin' ? 'AP State Admin' :
                      'AP Licensed Dealer'
                    );
                    const id = `AP-${authCustomRole.toUpperCase().slice(0, 3)}-${authCustomMobile.slice(-4)}`;
                    handleLoginUser(authCustomRole, name, id, authCustomMobile, authCustomDistrict);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="font-black text-slate-900 text-sm">
                        🔐 Portal Login (మొబైల్ ద్వారా ప్రవేశించండి)
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Enter your registered mobile number and OTP to continue
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAuthTab('signup')}
                      className="text-xs font-bold text-emerald-700 hover:underline shrink-0"
                    >
                      New user? Sign Up →
                    </button>
                  </div>

                  {/* Select Portal Role */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Select Your Portal Role (పోర్టల్ పాత్రను ఎంచుకోండి)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { key: 'farmer', label: '🌾 Farmer (రైతు)' },
                        { key: 'dealer', label: '🛒 Dealer (వ్యాపారి)' },
                        { key: 'transport', label: '🚚 Transporter (రవాణా)' },
                        { key: 'worker', label: '👷 Shramik (శ్రామికుడు)' },
                        { key: 'admin', label: '🏛️ Admin (అడ్మిన్)' }
                      ].map((r) => (
                        <button
                          key={r.key}
                          type="button"
                          onClick={() => setAuthCustomRole(r.key as any)}
                          className={`p-2.5 rounded-xl font-extrabold text-left border transition-all text-xs ${
                            authCustomRole === r.key
                              ? 'bg-[#062c1e] text-white border-[#062c1e] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 10-Digit Mobile */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      10-Digit Mobile Number (మొబైల్ నంబర్) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9848012345"
                        value={authCustomMobile}
                        onChange={(e) => setAuthCustomMobile(e.target.value.replace(/\D/g, ''))}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-3 py-2.5 text-slate-900 font-bold text-xs focus:bg-white focus:border-emerald-600 outline-hidden"
                      />
                    </div>
                  </div>

                  {/* 6-Digit OTP / Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-700">
                        6-Digit Security OTP / PIN (ఓటీపీ)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthCustomOtp('123456');
                          alert('OTP sent to +91 ' + (authCustomMobile || '9848011223') + ': 123456');
                        }}
                        className="text-[11px] font-bold text-emerald-700 hover:underline"
                      >
                        Send OTP (ఓటీపీ పంపండి)
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={authCustomOtp}
                      onChange={(e) => setAuthCustomOtp(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-black text-center tracking-widest text-sm focus:bg-white focus:border-emerald-600 outline-hidden"
                      placeholder="123456"
                    />
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="rememberMeLogin"
                      checked={authRememberMe}
                      onChange={(e) => setAuthRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500"
                    />
                    <label htmlFor="rememberMeLogin" className="font-semibold text-slate-700 text-xs cursor-pointer">
                      Remember my login on this device (నన్ను గుర్తుంచుకో)
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#062c1e] hover:bg-[#0a3a28] text-emerald-300 hover:text-white rounded-2xl font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 border border-[#0e4b34]"
                  >
                    <LogIn size={16} />
                    <span>Login to AP-RythuSetu ({authCustomRole.toUpperCase()})</span>
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setAuthTab('signup')}
                      className="text-xs font-semibold text-slate-500 hover:text-emerald-800"
                    >
                      Don't have an account yet? <span className="font-bold text-emerald-700 underline">Register / Sign Up here</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* ======================== 2. SIGN UP FORM ======================== */
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!authCustomMobile || authCustomMobile.length < 10) {
                      alert('Please enter a valid 10-digit mobile number.');
                      return;
                    }
                    if (!authCustomName.trim()) {
                      alert('Please enter your full name for registration.');
                      return;
                    }
                    const name = authCustomName.trim();
                    const id = `AP-${authCustomRole.toUpperCase().slice(0, 3)}-${authCustomMobile.slice(-4)}`;
                    handleLoginUser(authCustomRole, name, id, authCustomMobile, authCustomDistrict);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="font-black text-slate-900 text-sm">
                        📝 New User Registration (కొత్త నమోదు)
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Create your verified profile on AP-RythuSetu unified portal
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAuthTab('login')}
                      className="text-xs font-bold text-emerald-700 hover:underline shrink-0"
                    >
                      Already registered? Login →
                    </button>
                  </div>

                  {/* Select Role */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Register as (పోర్టల్ పాత్రను ఎంచుకోండి)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { key: 'farmer', label: '🌾 Farmer (రైతు)' },
                        { key: 'dealer', label: '🛒 Dealer (వ్యాపారి)' },
                        { key: 'transport', label: '🚚 Transporter (రవాణా)' },
                        { key: 'worker', label: '👷 Shramik (శ్రామికుడు)' },
                        { key: 'admin', label: '🏛️ Admin (అడ్మిన్)' }
                      ].map((r) => (
                        <button
                          key={r.key}
                          type="button"
                          onClick={() => setAuthCustomRole(r.key as any)}
                          className={`p-2.5 rounded-xl font-extrabold text-left border transition-all text-xs ${
                            authCustomRole === r.key
                              ? 'bg-[#062c1e] text-white border-[#062c1e] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Full Name (రైతు / వ్యాపారి పూర్తి పేరు) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sri V. Ramana Rao"
                      value={authCustomName}
                      onChange={(e) => setAuthCustomName(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-semibold text-xs focus:bg-white focus:border-emerald-600 outline-hidden"
                    />
                  </div>

                  {/* 10-Digit Mobile & District */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        10-Digit Mobile Number (మొబైల్ నంబర్) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="9848012345"
                          value={authCustomMobile}
                          onChange={(e) => setAuthCustomMobile(e.target.value.replace(/\D/g, ''))}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-3 py-2.5 text-slate-900 font-bold text-xs focus:bg-white focus:border-emerald-600 outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        District (జిల్లా)
                      </label>
                      <select
                        value={authCustomDistrict}
                        onChange={(e) => setAuthCustomDistrict(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-semibold text-xs focus:bg-white focus:border-emerald-600 outline-hidden"
                      >
                        {DISTRICT_LIST.map((dist) => (
                          <option key={dist} value={dist}>{dist}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 6-Digit OTP */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-700">
                        6-Digit Security OTP (ఓటీపీ)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthCustomOtp('123456');
                          alert('OTP sent to +91 ' + (authCustomMobile || '9848011223') + ': 123456');
                        }}
                        className="text-[11px] font-bold text-emerald-700 hover:underline"
                      >
                        Send Verification OTP
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={authCustomOtp}
                      onChange={(e) => setAuthCustomOtp(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-black text-center tracking-widest text-sm focus:bg-white focus:border-emerald-600 outline-hidden"
                      placeholder="123456"
                    />
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="rememberMeSignUp"
                      checked={authRememberMe}
                      onChange={(e) => setAuthRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500"
                    />
                    <label htmlFor="rememberMeSignUp" className="font-semibold text-slate-700 text-xs cursor-pointer">
                      Remember my login on this device (నన్ను గుర్తుంచుకో)
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#062c1e] hover:bg-[#0a3a28] text-emerald-300 hover:text-white rounded-2xl font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 border border-[#0e4b34]"
                  >
                    <UserCheck size={16} />
                    <span>Register &amp; Create Account ({authCustomRole.toUpperCase()})</span>
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setAuthTab('login')}
                      className="text-xs font-semibold text-slate-500 hover:text-emerald-800"
                    >
                      Already have an account? <span className="font-bold text-emerald-700 underline">Login to existing account</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Modal Solid Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 font-medium">
                🔒 Protected by AP Agriculture &amp; Marketing Directorate
              </span>

              <button
                type="button"
                onClick={() => {
                  setAuthModalOpen(false);
                  setActiveTab('dashboard');
                }}
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-1.5"
              >
                <span>🌐 Continue as Guest / View Dashboard (అతిథిగా ప్రవేశం)</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
