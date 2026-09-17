import React from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Compass,
  ArrowRight
} from 'lucide-react';
import APMap from '../../../APMap';
import {
  DISTRICT_DATA,
  normalizeDistrictName,
  DISTRICT_LIST,
  getDistrictWeather
} from '../../../districtData';

interface APMapExplorerViewProps {
  activeDistrict: string;
  onSelectDistrict: (dist: string) => void;
  onNavigateToProduce: () => void;
}

export const APMapExplorerView: React.FC<APMapExplorerViewProps> = ({
  activeDistrict,
  onSelectDistrict,
  onNavigateToProduce
}) => {
  const districtDetail = DISTRICT_DATA[normalizeDistrictName(activeDistrict)] || DISTRICT_DATA['Guntur'];
  const weather = getDistrictWeather(activeDistrict);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>🗺️</span>
            <span>/</span>
            <span className="text-slate-600 font-semibold">AP Map Explorer</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
            Andhra Pradesh Geo-Intelligence &amp; Mandi Map
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any of the 26 districts to inspect soil conditions, real-time weather, arrival volumes, and crops
          </p>
        </div>

        {/* District Selector Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Quick Select:</span>
          <select
            value={activeDistrict}
            onChange={(e) => onSelectDistrict(e.target.value)}
            className="text-xs font-bold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden"
          >
            {DISTRICT_LIST.map((d) => (
              <option key={d} value={d}>
                {d} District
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Map on Left (7 cols), District Intelligence on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Interactive Map Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-emerald-700" />
              <h3 className="text-xs font-bold text-slate-900">
                26 Districts of Andhra Pradesh
              </h3>
            </div>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Interactive GeoJSON
            </span>
          </div>

          <div className="w-full h-[520px] my-2 flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50/50 border border-slate-100">
            <APMap
              selectedDistrict={activeDistrict}
              onSelectDistrict={(dist) => onSelectDistrict(dist)}
              standaloneMapOnly={true}
            />
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            Tip: Hover over or tap any district on the map to switch context in real time.
          </p>
        </div>

        {/* Right 5 cols: Live District Intelligence */}
        <div className="lg:col-span-5 space-y-5">
          {/* Active District Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                  Active District
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-1">
                  {districtDetail.name} District
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">{districtDetail.tagline}</p>
              </div>

              <div className="w-10 h-10 rounded-2xl bg-[#062419] text-white flex items-center justify-center font-bold text-sm">
                AP
              </div>
            </div>

            {/* Weather Widget */}
            <div className="p-4 bg-gradient-to-r from-emerald-950 to-[#0a3827] text-white rounded-2xl space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CloudSun size={24} className="text-amber-300" />
                  <div>
                    <h4 className="text-base font-black">{weather.currentTemp}°C</h4>
                    <p className="text-[10px] text-emerald-200 leading-tight">{weather.condition}</p>
                  </div>
                </div>
                <div className="text-right text-[10px] text-emerald-200">
                  <p>Advisory: <span className="font-bold text-white max-w-[150px] truncate inline-block">{weather.agroAdvisory}</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-center text-[10px]">
                <div className="flex items-center justify-center gap-1">
                  <Droplets size={12} className="text-cyan-300" />
                  <span>{weather.humidity}% Humidity</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Wind size={12} className="text-teal-300" />
                  <span>{weather.windSpeed} km/h Wind</span>
                </div>
              </div>
            </div>

            {/* Agronomy Matrix */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Soil Classification:</span>
                <span className="font-bold text-slate-800 text-right max-w-[200px] truncate">
                  {districtDetail.soilType}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Primary Season:</span>
                <span className="font-bold text-slate-800">{districtDetail.primarySeason}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Annual Rainfall:</span>
                <span className="font-bold text-slate-800">{districtDetail.rainfall}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Annual Arrivals:</span>
                <span className="font-bold text-slate-800">{districtDetail.totalArrivals}</span>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Registered Farmers:</span>
                <span className="font-bold text-slate-800">
                  {districtDetail.activeFarmers.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Primary Crops Badges */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                Major Crops in {districtDetail.name}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {districtDetail.crops.map((c) => (
                  <span
                    key={c.name}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    {c.name} (₹{c.priceNum.toLocaleString()})
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={onNavigateToProduce}
              className="w-full py-2.5 bg-[#062419] hover:bg-[#093324] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span>View Listings in {districtDetail.name}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
