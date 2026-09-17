import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { DISTRICT_DATA, normalizeDistrictName } from '../../../districtData';

interface ProfitCalculatorViewProps {
  district: string;
  onNavigateToMarketTrends?: () => void;
}

export const ProfitCalculatorView: React.FC<ProfitCalculatorViewProps> = ({
  district,
  onNavigateToMarketTrends
}) => {
  const districtDetail = DISTRICT_DATA[normalizeDistrictName(district)] || DISTRICT_DATA['Guntur'];
  const [selectedCropName, setSelectedCropName] = useState<string>(districtDetail.crops[0]?.name || 'Chilli');
  const [acreage, setAcreage] = useState<number>(2);

  const selectedCrop =
    districtDetail.crops.find((c) => c.name === selectedCropName) || districtDetail.crops[0];

  // Mathematical computations
  const totalYield = (selectedCrop.yieldNum * acreage).toFixed(1);
  const totalCost = selectedCrop.costPerAcre * acreage;
  const totalRevenue = parseFloat(totalYield) * selectedCrop.priceNum;
  const netProfit = totalRevenue - totalCost;
  const roi = totalCost > 0 ? ((netProfit / totalCost) * 100).toFixed(0) : '0';

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>🧮</span>
            <span>/</span>
            <span className="text-slate-600 font-semibold">Profit &amp; Yield Estimator</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
            Interactive Crop Yield &amp; Profit Calculator
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Forecast production yield, cultivation expenditure, projected market revenue, and ROI across {district} Mandis
          </p>
        </div>

        {onNavigateToMarketTrends && (
          <button
            onClick={onNavigateToMarketTrends}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-xs"
          >
            <span>Live Price Trends</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>

      {/* 4 Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-medium text-slate-500">Projected Yield</p>
          <h3 className="text-lg font-black text-slate-900 mt-0.5">{totalYield} Quintals</h3>
          <p className="text-[11px] font-bold text-emerald-600 mt-0.5">
            {selectedCrop.yieldNum} Q / Acre avg
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-medium text-slate-500">Cultivation Cost</p>
          <h3 className="text-lg font-black text-slate-900 mt-0.5">₹{totalCost.toLocaleString()}</h3>
          <p className="text-[11px] font-bold text-slate-500 mt-0.5">
            ₹{selectedCrop.costPerAcre.toLocaleString()} / Acre
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-medium text-slate-500">Expected Gross Revenue</p>
          <h3 className="text-lg font-black text-slate-900 mt-0.5">₹{Math.round(totalRevenue).toLocaleString()}</h3>
          <p className="text-[11px] font-bold text-emerald-600 mt-0.5">
            @ ₹{selectedCrop.priceNum.toLocaleString()} / Q
          </p>
        </div>

        <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200 shadow-xs">
          <p className="text-[11px] font-medium text-emerald-800">Net Estimated Profit</p>
          <h3 className="text-lg font-black text-emerald-950 mt-0.5">₹{Math.round(netProfit).toLocaleString()}</h3>
          <p className="text-[11px] font-bold text-emerald-700 mt-0.5">
            ROI: {roi}% Return on Cost
          </p>
        </div>
      </div>

      {/* Interactive Controls & Financial Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 cols: Inputs & Sliders */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <h3 className="text-sm font-black text-slate-900 pb-3 border-b border-slate-100">
            Configure Agricultural Parameters
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-2">
              Select Crop in {district}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {districtDetail.crops.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedCropName(c.name)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedCropName === c.name
                      ? 'bg-[#062419] text-white border-[#062419] shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <p className="font-extrabold text-xs">{c.name}</p>
                  <p className={`text-[10px] mt-0.5 ${selectedCropName === c.name ? 'text-emerald-300' : 'text-slate-500'}`}>
                    ₹{c.priceNum.toLocaleString()}/Q
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-600">
                Land Acreage: <span className="font-black text-slate-900">{acreage} Acres</span>
              </label>
              <span className="text-[10px] text-slate-400 font-semibold">(1 - 50 Acres)</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={acreage}
              onChange={(e) => setAcreage(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>1 Acre</span>
              <span>10 Acres</span>
              <span>25 Acres</span>
              <span>50 Acres</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs space-y-2 text-slate-700">
            <div className="flex justify-between">
              <span>Mandi Benchmark:</span>
              <span className="font-bold text-slate-900">{selectedCrop.mandiName}</span>
            </div>
            <div className="flex justify-between">
              <span>Market Trend:</span>
              <span className="font-bold text-emerald-600">{selectedCrop.trend}</span>
            </div>
            <div className="flex justify-between">
              <span>Minimum Support Price (MSP):</span>
              <span className="font-bold text-slate-900">{selectedCrop.msp || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Right 6 cols: Projected Balance Sheet */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <h3 className="text-sm font-black text-slate-900 pb-3 border-b border-slate-100">
            Projected Financial Breakdown
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600">Total Cultivation Cost</span>
                <span className="text-slate-900">₹{totalCost.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-slate-400 h-full rounded-full"
                  style={{ width: `${Math.min((totalCost / totalRevenue) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600">Net Farmer Profit</span>
                <span className="text-emerald-700">₹{Math.round(netProfit).toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${Math.min((netProfit / totalRevenue) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-950 text-white rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Profitability Summary
            </h4>
            <p className="text-sm font-bold leading-relaxed">
              Cultivating {acreage} acres of <span className="text-emerald-400 font-black">{selectedCrop.name}</span> in {district} yields an estimated <span className="text-emerald-300 font-black">{totalYield} Quintals</span> with a projected net profit of <span className="text-emerald-300 font-black">₹{Math.round(netProfit).toLocaleString()}</span> ({roi}% ROI).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
