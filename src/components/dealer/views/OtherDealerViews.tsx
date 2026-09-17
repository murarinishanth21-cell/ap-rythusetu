import React from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Truck,
  Warehouse,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import type { DealerActiveTab } from '../DealerSidebar';

interface OtherDealerViewsProps {
  tab: DealerActiveTab;
  district: string;
  onNavigateToTab: (tab: DealerActiveTab) => void;
}

export const OtherDealerViews: React.FC<OtherDealerViewsProps> = ({
  tab,
  district,
  onNavigateToTab
}) => {
  // Dashboard Overview
  if (tab === 'dashboard') {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-700 border border-emerald-100">
              <LayoutDashboard size={22} />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
                Dealer Command Dashboard
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Overview of your procurement, market positions and freight logistics across Andhra Pradesh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateToTab('buy_produce')}
              className="px-4 py-2 bg-[#062419] hover:bg-[#093324] text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Browse Farmer Listings
            </button>
          </div>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigateToTab('buy_produce')}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs cursor-pointer hover:border-emerald-500 transition-colors"
          >
            <p className="text-[11px] font-medium text-slate-500">Active Listings</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">1,248 Crops</h3>
            <p className="text-[11px] font-bold text-emerald-600 mt-0.5">In {district} Mandis</p>
          </div>

          <div
            onClick={() => onNavigateToTab('market_trends')}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs cursor-pointer hover:border-emerald-500 transition-colors"
          >
            <p className="text-[11px] font-medium text-slate-500">Avg Market Rate</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">₹18,750 / Q</h3>
            <p className="text-[11px] font-bold text-emerald-600 mt-0.5">↑ +3.2% this week</p>
          </div>

          <div
            onClick={() => onNavigateToTab('price_alerts')}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs cursor-pointer hover:border-emerald-500 transition-colors"
          >
            <p className="text-[11px] font-medium text-slate-500">Price Alerts</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">20 Active</h3>
            <p className="text-[11px] font-bold text-blue-600 mt-0.5">6 Triggered</p>
          </div>

          <div
            onClick={() => onNavigateToTab('stock_inventory')}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs cursor-pointer hover:border-emerald-500 transition-colors"
          >
            <p className="text-[11px] font-medium text-slate-500">Inventory Holding</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">8,420 Kg</h3>
            <p className="text-[11px] font-bold text-amber-600 mt-0.5">3 Items Low Stock</p>
          </div>
        </div>

        {/* Quick Launchpad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => onNavigateToTab('market_trends')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">📈</span>
              <ArrowUpRight size={18} className="text-slate-400 group-hover:text-emerald-700 transition-colors" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 mt-3">Live Market Trends</h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Inspect historical line graphs, mandi arrivals, and AP price movements.
            </p>
          </div>

          <div
            onClick={() => onNavigateToTab('deal_and_ask')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🤝</span>
              <ArrowUpRight size={18} className="text-slate-400 group-hover:text-emerald-700 transition-colors" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 mt-3">Deal &amp; Ask Negotiation</h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Formulate purchase proposals and bargain directly with verified AP farmers.
            </p>
          </div>

          <div
            onClick={() => onNavigateToTab('transport_vehicles')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🚚</span>
              <ArrowUpRight size={18} className="text-slate-400 group-hover:text-emerald-700 transition-colors" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 mt-3">Freight &amp; Fleet Logistics</h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Book verified commercial transport vehicles with OTP escrow delivery.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Enquiries & Deals
  if (tab === 'enquiries_deals') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-700 border border-emerald-100">
              <MessageSquare size={22} />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
                Enquiries &amp; Deals
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Track all purchase proposals sent to farmers, price negotiations, and contracts
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToTab('deal_and_ask')}
            className="px-4 py-2 bg-[#062419] hover:bg-[#093324] text-white rounded-xl text-xs font-bold shadow-xs"
          >
            + Start New Negotiation
          </button>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="py-3 px-4">Deal ID</th>
                  <th className="py-3 px-4">Farmer</th>
                  <th className="py-3 px-4">Crop</th>
                  <th className="py-3 px-4">Offered Price</th>
                  <th className="py-3 px-4">Volume</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">DL-2026-901</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Venkata Ramana (Amaravathi)</td>
                  <td className="py-3.5 px-4">Guntur Sannam Chilli (150 Q)</td>
                  <td className="py-3.5 px-4 font-black text-slate-900">₹17,500 / Q</td>
                  <td className="py-3.5 px-4">150 Quintals</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-bold">
                      Pending Farmer Response
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onNavigateToTab('deal_and_ask')}
                      className="px-3 py-1 bg-[#062419] text-white rounded-lg font-bold text-[11px]"
                    >
                      View Negotiation
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">DL-2026-884</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Siva Kumar (Tenali)</td>
                  <td className="py-3.5 px-4">Paddy BPT 5204 (300 Q)</td>
                  <td className="py-3.5 px-4 font-black text-slate-900">₹2,150 / Q</td>
                  <td className="py-3.5 px-4">300 Quintals</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
                      Deal Accepted
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onNavigateToTab('transport_vehicles')}
                      className="px-3 py-1 bg-emerald-700 text-white rounded-lg font-bold text-[11px]"
                    >
                      Schedule Pickup
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Transport & Vehicles
  if (tab === 'transport_vehicles') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-700 border border-emerald-100">
              <Truck size={22} />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
                Transport &amp; Freight Vehicles
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Dispatch booked farmer produce via GPS-tracked AP commercial vehicles
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">AP GreenLine 10T Truck</span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                Available Now
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Driver: K. Srinivas (Guntur Hub)</p>
            <p className="text-xs font-black text-slate-900 mt-2">Rate: ₹35 / Km • Capacity: 100 Q</p>
            <button
              onClick={() => alert("Booking dispatch for 10T Truck...")}
              className="w-full mt-3 py-2 bg-[#062419] text-white text-xs font-bold rounded-xl"
            >
              Book For Dispatch
            </button>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Amaravathi Express 5T Eicher</span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                Available Now
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Driver: M. Venkat (Tenali Hub)</p>
            <p className="text-xs font-black text-slate-900 mt-2">Rate: ₹24 / Km • Capacity: 50 Q</p>
            <button
              onClick={() => alert("Booking dispatch for 5T Eicher...")}
              className="w-full mt-3 py-2 bg-[#062419] text-white text-xs font-bold rounded-xl"
            >
              Book For Dispatch
            </button>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Rythu Setu Reefer 8T (Cold)</span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full">
                Cold Storage
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Driver: P. Ramesh (Guntur Cold Mandi)</p>
            <p className="text-xs font-black text-slate-900 mt-2">Rate: ₹45 / Km • Capacity: 80 Q</p>
            <button
              onClick={() => alert("Booking cold chain reefer dispatch...")}
              className="w-full mt-3 py-2 bg-[#062419] text-white text-xs font-bold rounded-xl"
            >
              Book Cold Chain
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Warehouse & Storage
  if (tab === 'warehouse_storage') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-700 border border-emerald-100">
            <Warehouse size={22} />
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
              Warehouse &amp; Cold Storage
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Govt-accredited warehouses and AP cold storage capacity in {district}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
            <h3 className="text-sm font-black text-slate-900">Guntur Central Mandi Hub</h3>
            <p className="text-xs text-slate-500 mt-0.5">Capacity: 50,000 Metric Tons • Utilization: 68%</p>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '68%' }} />
            </div>
            <div className="mt-3 text-xs text-slate-600 flex justify-between">
              <span>Available Space: 16,000 MT</span>
              <span className="font-bold text-emerald-700">e-NWR Certified</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
            <h3 className="text-sm font-black text-slate-900">Tenali Cold Storage Yard</h3>
            <p className="text-xs text-slate-500 mt-0.5">Capacity: 20,000 Metric Tons • Utilization: 45%</p>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '45%' }} />
            </div>
            <div className="mt-3 text-xs text-slate-600 flex justify-between">
              <span>Available Space: 11,000 MT</span>
              <span className="font-bold text-emerald-700">Temperature: 4°C - 8°C</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generic fallback for other Master Data / Admin tabs
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-700 border border-emerald-100">
          <ShieldCheck size={22} />
        </div>
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight capitalize">
            {tab.replace(/_/g, ' ')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            AP-RythuSetu Official Government Dealer Services ({district} Division)
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#062419] text-white flex items-center justify-center font-bold">
            AP
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">Department of Agriculture &amp; Marketing</h3>
            <p className="text-xs text-slate-500">Government of Andhra Pradesh • Official Portal</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          You are viewing official records under <strong>{district} District</strong> jurisdiction.
          For immediate dealer support or mandi licensing queries, call the toll-free helpline <strong>155251</strong>.
        </p>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => onNavigateToTab('market_trends')}
            className="px-4 py-2 bg-[#062419] text-white text-xs font-bold rounded-xl"
          >
            Go to Market Trends
          </button>
          <button
            onClick={() => onNavigateToTab('buy_produce')}
            className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50"
          >
            Browse Verified Produce
          </button>
        </div>
      </div>
    </div>
  );
};
