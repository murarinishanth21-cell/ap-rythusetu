import React from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  TrendingUp,
  Bell,
  Package,
  Truck,
  Warehouse,
  FileText,
  BarChart3,
  Sprout,
  Landmark,
  Settings,
  HelpCircle,
  BookOpen,
  X,
  Calculator,
  Mic,
  MessageSquareWarning,
  HardHat
} from 'lucide-react';
import type { UserProfile } from './DealerHeader';

export type DealerActiveTab =
  | 'dashboard'
  | 'buy_produce'
  | 'deal_and_ask'
  | 'market_trends'
  | 'enquiries_deals'
  | 'price_alerts'
  | 'farmer_sell'
  | 'ap_map'
  | 'profit_calc'
  | 'ai_assistant'
  | 'stock_inventory'
  | 'transport_vehicles'
  | 'warehouse_storage'
  | 'labour_hub'
  | 'grievances'
  | 'purchase_history'
  | 'analytics_reports'
  | 'farmers'
  | 'crops_grades'
  | 'districts_mandis'
  | 'profile_settings'
  | 'support'
  | 'help_resources';

interface DealerSidebarProps {
  activeTab: DealerActiveTab;
  onSelectTab: (tab: DealerActiveTab) => void;
  onSwitchPortalRole: () => void;
  currentRole: 'dealer' | 'farmer';
  currentUser?: UserProfile;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onSelectPortalMode?: (mode: 'general' | 'farmer' | 'dealer' | 'transport' | 'admin', district?: string) => void;
}

export const DealerSidebar: React.FC<DealerSidebarProps> = ({
  activeTab,
  onSelectTab,
  onSwitchPortalRole: _onSwitchPortalRole,
  currentRole: _currentRole,
  currentUser,
  isOpenMobile = false,
  onCloseMobile,
  onSelectPortalMode: _onSelectPortalMode
}) => {
  const navSections = [
    {
      items: [
        { id: 'dashboard' as DealerActiveTab, label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'PROCUREMENT',
      items: [
        { id: 'buy_produce' as DealerActiveTab, label: 'Buy Produce (Dealer)', icon: ShoppingCart },
        { id: 'market_trends' as DealerActiveTab, label: 'Market Trends', icon: TrendingUp },
        { id: 'price_alerts' as DealerActiveTab, label: 'Price Alerts', icon: Bell }
      ]
    },
    {
      title: 'FARMER & AGRI-TECH',
      items: [
        { id: 'farmer_sell' as DealerActiveTab, label: 'Farmer Sell Portal', icon: Sprout },
        { id: 'profit_calc' as DealerActiveTab, label: 'Profit & Yield Calculator', icon: Calculator },
        { id: 'ai_assistant' as DealerActiveTab, label: 'AI Voice & Disease Vision', icon: Mic }
      ]
    },
    {
      title: 'LOGISTICS & HUBS',
      items: [
        { id: 'transport_vehicles' as DealerActiveTab, label: 'Transport & Vehicles', icon: Truck },
        { id: 'warehouse_storage' as DealerActiveTab, label: 'Warehouse & Cold Storage', icon: Warehouse },
        { id: 'labour_hub' as DealerActiveTab, label: 'Shramik Hubs & Workers', icon: HardHat }
      ]
    },
    {
      title: 'GOVERNANCE & ACCOUNT',
      items: [
        { id: 'purchase_history' as DealerActiveTab, label: 'Purchase History', icon: FileText },
        { id: 'analytics_reports' as DealerActiveTab, label: 'Analytics & Reports', icon: BarChart3 },
        { id: 'profile_settings' as DealerActiveTab, label: 'Profile & Settings (నా ప్రొఫైల్)', icon: Settings }
      ]
    },
    {
      title: 'MASTER DATA',
      items: [
        { id: 'crops_grades' as DealerActiveTab, label: 'Crops & Quality Grades (పంటలు & గ్రేడ్లు)', icon: Sprout },
        { id: 'districts_mandis' as DealerActiveTab, label: 'Districts & Mandis', icon: Landmark }
      ]
    },
    {
      title: 'ADMIN (OFFICIALS ONLY)',
      items: [
        { id: 'stock_inventory' as DealerActiveTab, label: 'Stock & Inventory (Admin)', icon: Package, requiresAdmin: true },
        { id: 'grievances' as DealerActiveTab, label: 'Grievances & Redressal (Admin)', icon: MessageSquareWarning, requiresAdmin: true },
        { id: 'support' as DealerActiveTab, label: 'Support Helpline', icon: HelpCircle },
        { id: 'help_resources' as DealerActiveTab, label: 'Help & Resources', icon: BookOpen }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#062419] text-white flex flex-col justify-between border-r border-[#0d3b2a] transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header Branding */}
        <div className="p-4 border-b border-[#0d3b2a]/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/ap-logo.png"
              alt="Govt of AP"
              className="w-10 h-10 object-contain drop-shadow-sm rounded-full bg-white/10 p-0.5"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-white">
                  AP-RythuSetu
                </span>
                <span className="text-[9px] font-semibold bg-emerald-900/90 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded">
                  Govt of AP
                </span>
              </div>
              <p className="text-[10px] font-bold tracking-wider text-emerald-400 mt-0.5 uppercase">
                {activeTab === 'farmer_sell' || activeTab === 'profit_calc'
                  ? 'FARMER PORTAL'
                  : activeTab === 'transport_vehicles' || activeTab === 'warehouse_storage' || activeTab === 'labour_hub'
                  ? 'TRANSPORT PORTAL'
                  : activeTab === 'grievances' || activeTab === 'stock_inventory'
                  ? 'ADMIN COMMAND'
                  : activeTab === 'market_trends' || activeTab === 'ap_map'
                  ? 'MARKET TRENDS'
                  : 'DEALER PORTAL'}
              </p>
            </div>
          </div>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden text-emerald-300 hover:text-white p-1 rounded-lg"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 custom-scrollbar">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {section.title && (
                <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-emerald-400/60 uppercase">
                  {section.title}
                </div>
              )}
              {section.items.map((item: any) => {
                const Icon = item.icon;
                const isActive =
                  activeTab === item.id ||
                  (item.id === 'buy_produce' && activeTab === 'deal_and_ask');
                const isLocked = item.requiresAdmin && (!currentUser?.isLoggedIn || currentUser?.role !== 'admin');

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left group ${
                      isActive
                        ? 'bg-[#0e5942] text-white font-semibold shadow-inner border border-emerald-500/30'
                        : 'text-emerald-100/75 hover:bg-emerald-900/40 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        size={16}
                        className={isActive ? 'text-emerald-300' : 'text-emerald-400/70 group-hover:text-emerald-300'}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.requiresAdmin && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shrink-0 ${
                        !isLocked
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                      }`}>
                        {!isLocked ? '✓ Admin' : '🔒 Login'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Clean Footer Bar */}
        <div className="p-3 border-t border-[#0d3b2a]/70 flex items-center justify-between text-[11px] text-emerald-400/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-300">AP-RythuSetu</span>
          </div>
          <span className="text-[10px] bg-[#051c14] border border-emerald-900 px-2 py-0.5 rounded text-emerald-400 font-mono font-bold">26 Mandis Online</span>
        </div>
      </aside>
    </>
  );
};
