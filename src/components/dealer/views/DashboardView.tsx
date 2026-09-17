import {
  TrendingUp,
  IndianRupee,
  Sprout,
  Users,
  Store,
  MapPin,
  ArrowRight,
  CloudSun,
  Compass
} from 'lucide-react';
import APMap from '../../../APMap';
import { DISTRICT_DATA, normalizeDistrictName, getDistrictWeather } from '../../../districtData';
import type { CropMarketOverview, FarmerListing } from '../types';

interface DashboardViewProps {
  activeDistrict: string;
  onChangeDistrict: (dist: string) => void;
  marketOverviews: CropMarketOverview[];
  listings: FarmerListing[];
  onNavigateToTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  activeDistrict,
  onChangeDistrict,
  marketOverviews,
  listings,
  onNavigateToTab
}) => {
  const districtDetail = DISTRICT_DATA[normalizeDistrictName(activeDistrict)] || DISTRICT_DATA['Guntur'];
  const weather = getDistrictWeather(activeDistrict);

  return (
    <div className="space-y-6">
      {/* Top Banner - Solid Dark Green (No Glassmorphism) */}
      <div className="bg-[#062c1e] text-white p-6 rounded-3xl shadow-xl border-2 border-[#0e4b34] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-extrabold uppercase bg-[#0e4b34] text-emerald-300 border border-[#166544] px-2.5 py-0.5 rounded-full">
              Andhra Pradesh Unified Agriculture Command Hub
            </span>
            <span className="text-xs text-emerald-200 font-semibold">
              📍 Active Jurisdiction: {activeDistrict} Mandis
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-white tracking-tight">
            AP-RythuSetu State Procurement &amp; Market Intelligence
          </h1>
          <p className="text-xs text-emerald-200 mt-1 max-w-2xl font-medium">
            {districtDetail.tagline} • Soil Profile: {districtDetail.soilType}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 bg-[#0a3a28] border border-[#145a3c] px-3.5 py-2 rounded-2xl text-xs shadow-inner">
            <CloudSun size={20} className="text-amber-400" />
            <div>
              <p className="font-extrabold text-white leading-tight">{weather.currentTemp}°C • {weather.condition}</p>
              <p className="text-[10px] text-emerald-300 font-medium leading-tight">Humidity: {weather.humidity}%</p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab('buy_produce')}
            className="px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-[#041d14] font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <span>Browse Produce</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div
          onClick={() => onNavigateToTab('buy_produce')}
          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-emerald-500 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <Sprout size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Available Produce</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">{listings.length * 250} Q</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑ Verified AP Farmers</span>
            </p>
          </div>
        </div>

        {/* Stat 2 */}
        <div
          onClick={() => onNavigateToTab('market_trends')}
          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-emerald-500 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <IndianRupee size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Avg Market Rate</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">₹18,750 / Q</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑ +3.2% this week</span>
            </p>
          </div>
        </div>

        {/* Stat 3 */}
        <div
          onClick={() => onNavigateToTab('crops_grades')}
          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-emerald-500 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <Users size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Active Farmers</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">{districtDetail.activeFarmers.toLocaleString()}</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>In {activeDistrict} Region</span>
            </p>
          </div>
        </div>

        {/* Stat 4 */}
        <div
          onClick={() => onNavigateToTab('districts_mandis')}
          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-emerald-500 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <Store size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Total AP Mandis</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">28 Regulated</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>e-NAM Integrated</span>
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Statewide 26-District Mandi Intelligence Map */}
      <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Compass size={18} />
            </div>
            <div>
              <h2 className="text-sm lg:text-base font-black text-slate-900">
                Interactive Andhra Pradesh 26-District Mandi &amp; Agronomy Map
              </h2>
              <p className="text-[11px] text-slate-400">
                Click any district on the vector map to instantly switch jurisdiction and load real-time mandi prices
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500">Selected:</span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-black">
              📍 {activeDistrict} District
            </span>
            <button
              onClick={() => onNavigateToTab('ap_map')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline ml-2 flex items-center gap-1"
            >
              <span>Full Map Explorer</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: The Large SVG Vector Map */}
          <div className="lg:col-span-7 h-[460px] flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50/40 border border-slate-100">
            <APMap
              selectedDistrict={activeDistrict}
              onSelectDistrict={(d) => onChangeDistrict(d)}
              standaloneMapOnly={true}
            />
          </div>

          {/* Right: Active District Agronomy & Mandi Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-gradient-to-br from-emerald-950 to-[#062419] text-white rounded-2xl space-y-3 shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Active District
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">
                    {districtDetail.name} District
                  </h3>
                  <p className="text-xs text-emerald-200/80">{districtDetail.tagline}</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-black text-xs text-emerald-300">
                  AP
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-[11px]">
                <div>
                  <p className="text-emerald-300 text-[10px]">Temp</p>
                  <p className="font-bold text-white">{weather.currentTemp}°C</p>
                </div>
                <div>
                  <p className="text-emerald-300 text-[10px]">Soil Profile</p>
                  <p className="font-bold text-white truncate">{districtDetail.soilType}</p>
                </div>
                <div>
                  <p className="text-emerald-300 text-[10px]">Active Farmers</p>
                  <p className="font-bold text-white">{districtDetail.activeFarmers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Top Crops in Selected District */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-black text-slate-800">Primary Mandi Crops ({activeDistrict})</span>
                <span className="text-[10px] text-emerald-700 font-bold">Modal Trading Rates</span>
              </div>
              <div className="space-y-2">
                {districtDetail.crops.slice(0, 3).map((crop) => (
                  <div
                    key={crop.name}
                    className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200/80 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🌱</span>
                      <div>
                        <p className="font-extrabold text-slate-900">{crop.name}</p>
                        <p className="text-[10px] text-slate-400">Yield: {crop.yieldPerAcre}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-emerald-700">{crop.price}</p>
                      <p className="text-[10px] text-slate-400">Avg Market Rate</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => onNavigateToTab('buy_produce')}
                  className="flex-1 py-2 bg-[#062419] hover:bg-[#093324] text-white rounded-xl text-xs font-bold text-center transition-all"
                >
                  Buy {activeDistrict} Produce →
                </button>
                <button
                  onClick={() => onNavigateToTab('profit_calc')}
                  className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Estimate Profit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left 8 cols, Right 4 cols */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Quick Launch Modules & Market Overview */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Launch Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => onNavigateToTab('ap_map')}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
                🗺️
              </div>
              <h3 className="text-xs font-black text-slate-900">Interactive AP Map</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Explore 26 AP districts, soil profiles, and regional mandi arrivals.
              </p>
            </div>

            <div
              onClick={() => onNavigateToTab('farmer_sell')}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
                🌾
              </div>
              <h3 className="text-xs font-black text-slate-900">Farmer Sell Portal</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Publish verified produce and respond to real-time dealer bargain offers.
              </p>
            </div>

            <div
              onClick={() => onNavigateToTab('ai_assistant')}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
                🎙️
              </div>
              <h3 className="text-xs font-black text-slate-900">AI Voice &amp; Vision</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Telugu speech assistant and camera crop disease prescription.
              </p>
            </div>
          </div>

          {/* Crop Overview Table Preview */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  {activeDistrict} Primary Mandi Prices &amp; Demand
                </h3>
                <p className="text-[11px] text-slate-400">
                  Real-time arrivals and modal trading prices
                </p>
              </div>
              <button
                onClick={() => onNavigateToTab('market_trends')}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>Full Trends</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                    <th className="py-2.5 px-4">Crop</th>
                    <th className="py-2.5 px-4">Grade</th>
                    <th className="py-2.5 px-4">Modal Price</th>
                    <th className="py-2.5 px-4">Change</th>
                    <th className="py-2.5 px-4">Demand</th>
                    <th className="py-2.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {marketOverviews.slice(0, 4).map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                        <img
                          src={c.image}
                          alt={c.cropName}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                        />
                        <span>{c.cropName}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{c.grade}</td>
                      <td className="py-3 px-4 font-black text-slate-900">₹{c.currentPrice.toLocaleString()} / Q</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">
                        ↑ +{c.changePct.toFixed(1)}%
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-200">
                          {c.demand}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onNavigateToTab('buy_produce')}
                          className="px-2.5 py-1 bg-[#062419] hover:bg-[#093324] text-white rounded-lg text-[10px] font-bold"
                        >
                          Find Sellers
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 cols: District Agronomy & Support Desk */}
        <div className="lg:col-span-4 space-y-6">
          {/* Agronomy Profile */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <MapPin size={16} className="text-emerald-700" />
              <h3 className="text-xs font-black text-slate-900">
                {activeDistrict} Agronomy Profile
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Primary Season:</span>
                <span className="font-bold text-slate-800">{districtDetail.primarySeason}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Annual Rainfall:</span>
                <span className="font-bold text-slate-800">{districtDetail.rainfall}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Arrival Volume:</span>
                <span className="font-bold text-slate-800">{districtDetail.totalArrivals}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Farming Advisory:</span>
                <span className="font-bold text-emerald-700 text-right max-w-[150px] truncate">
                  {weather.agroAdvisory}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigateToTab('ap_map')}
              className="w-full mt-2 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Open Full Geo Map →
            </button>
          </div>

          {/* Quick Calculator Shortcut */}
          <div className="bg-[#062419] text-white rounded-3xl p-5 border border-emerald-800 shadow-md space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-xl text-emerald-400">
                <TrendingUp size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">Profit &amp; Yield Calculator</h4>
                <p className="text-[10px] text-emerald-200">Compute ROI for any crop &amp; acreage</p>
              </div>
            </div>

            <button
              onClick={() => onNavigateToTab('profit_calc')}
              className="w-full py-2 bg-white text-slate-900 text-xs font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-xs"
            >
              Launch Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
