import React, { useState } from 'react';
import {
  TrendingUp,
  IndianRupee,
  Sprout,
  Store,
  Calendar,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  Flame,
  Box,
  ChevronRight,
  X,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import type { CropMarketOverview } from '../types';

interface MarketTrendsViewProps {
  district: string;
  marketOverviews: CropMarketOverview[];
  onCreateAlertClick: () => void;
  onViewAllCropsClick?: () => void;
  searchQuery?: string;
}

export const MarketTrendsView: React.FC<MarketTrendsViewProps> = ({
  district,
  marketOverviews,
  onCreateAlertClick,
  onViewAllCropsClick,
  searchQuery = ''
}) => {
  const [selectedCrop, setSelectedCrop] = useState<string>('All Crops');
  const [timeframe, setTimeframe] = useState<'7 Days' | '30 Days' | '3 Months'>('7 Days');
  const [hoveredPoint, setHoveredPoint] = useState<{ date: string; price: number; x: number; y: number } | null>(null);
  const [selectedInsightFilter, setSelectedInsightFilter] = useState<'all' | 'rising' | 'declining' | 'demand' | 'volume'>('all');
  const [activeInsightModal, setActiveInsightModal] = useState<any | null>(null);

  const filteredOverviews = marketOverviews.filter((c) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!c.cropName.toLowerCase().includes(q) && !c.grade.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (selectedInsightFilter === 'rising') return c.changePct > 0;
    if (selectedInsightFilter === 'declining') return c.changePct < 0;
    if (selectedInsightFilter === 'demand') return c.demand === 'High';
    if (selectedInsightFilter === 'volume') return (typeof c.volumeQuintals === 'number' ? c.volumeQuintals : parseInt(String(c.volumeQuintals).replace(/\D/g, ''), 10)) >= 2000;
    return true;
  });

  const cropPills = ['All Crops', ...Array.from(new Set(marketOverviews.map(c => c.cropName)))];

  // Chart data based on selected crop
  const chartDatasets: Record<string, { date: string; price: number }[]> = {
    'All Crops': [
      { date: 'Sep 10', price: 11500 },
      { date: 'Sep 11', price: 14200 },
      { date: 'Sep 12', price: 16300 },
      { date: 'Sep 13', price: 18750 },
      { date: 'Sep 14', price: 18200 },
      { date: 'Sep 15', price: 16800 },
      { date: 'Sep 16', price: 18900 }
    ]
  };

  const getDynamicChartData = (crop: string) => {
    if (chartDatasets[crop]) return chartDatasets[crop];
    const match = marketOverviews.find(c => c.cropName === crop);
    const baseP = match ? match.currentPrice : 4500;
    return [
      { date: 'Sep 10', price: Math.round(baseP * 0.94) },
      { date: 'Sep 11', price: Math.round(baseP * 0.96) },
      { date: 'Sep 12', price: Math.round(baseP * 0.95) },
      { date: 'Sep 13', price: Math.round(baseP * 0.98) },
      { date: 'Sep 14', price: Math.round(baseP * 0.99) },
      { date: 'Sep 15', price: Math.round(baseP * 0.97) },
      { date: 'Sep 16', price: baseP }
    ];
  };

  const chartData = selectedCrop === 'All Crops' ? chartDatasets['All Crops'] : getDynamicChartData(selectedCrop);

  // Calculate SVG coordinates
  const svgWidth = 720;
  const svgHeight = 220;
  const padLeft = 55;
  const padRight = 30;
  const padTop = 20;
  const padBottom = 40;

  const allPrices = chartData.map(d => d.price);
  const minPrice = Math.max(0, Math.floor(Math.min(...allPrices) * 0.85));
  const maxPrice = Math.ceil(Math.max(...allPrices) * 1.15) || 10000;

  const points = chartData.map((d, index) => {
    const x = padLeft + (index / Math.max(1, chartData.length - 1)) * (svgWidth - padLeft - padRight);
    const y = svgHeight - padBottom - ((d.price - minPrice) / Math.max(1, maxPrice - minPrice)) * (svgHeight - padTop - padBottom);
    return { ...d, x, y };
  });

  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-700 border border-emerald-100">
            <TrendingUp size={22} />
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
              Market Trends
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Track live crop prices, market movements and demand insights across Andhra Pradesh
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Date Selector Pill */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs">
            <Calendar size={14} className="text-slate-500" />
            <span>Last 7 Days</span>
          </div>

          {/* Export Report */}
          <button
            onClick={() => alert(`Report downloaded for ${district} AP Mandis.`)}
            className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs transition-colors"
          >
            <Download size={14} className="text-slate-500" />
            <span>Export Report</span>
          </button>

          {/* Create Price Alert Button */}
          <button
            onClick={onCreateAlertClick}
            className="flex items-center gap-2 px-4 py-2 bg-[#062419] hover:bg-[#093324] text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950/10 transition-all hover:translate-y-px"
          >
            <Plus size={14} />
            <span>Create Price Alert</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Avg Market Price */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <IndianRupee size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Average Market Price</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">₹18,750 / Q</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑ +3.2% from last week</span>
            </p>
          </div>
        </div>

        {/* Stat 2: Total Market Volume */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <TrendingUp size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Total Market Volume</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">12,450 Q</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑ +8.7% from last week</span>
            </p>
          </div>
        </div>

        {/* Stat 3: Active Crops */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <Sprout size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Active Crops</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">12</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑ +2 this week</span>
            </p>
          </div>
        </div>

        {/* Stat 4: Total Markets */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <Store size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Total Markets</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">28</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑ +4 this week</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Chart & Table on Left, Market Insights on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Columns */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card: Market Price Trends (Line Chart) */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-emerald-700" />
                  <h3 className="text-sm font-black text-slate-900">Market Price Trends</h3>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Average price movement (₹/Q) over the selected period
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl">
                  {cropPills.map((cp) => (
                    <button
                      key={cp}
                      onClick={() => setSelectedCrop(cp)}
                      className={`px-2.5 py-1 text-[11px] rounded-lg font-semibold transition-all ${
                        selectedCrop === cp
                          ? 'bg-[#062419] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cp}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl">
                  {(['7 Days', '30 Days', '3 Months'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-2.5 py-1 text-[11px] rounded-lg font-semibold transition-all ${
                        timeframe === tf
                          ? 'bg-[#062419] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive SVG Line Graph */}
            <div className="relative pt-4 overflow-x-auto">
              {hoveredPoint && (
                <div
                  className="absolute z-20 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg pointer-events-none shadow-lg -translate-x-1/2 -translate-y-full"
                  style={{ left: hoveredPoint.x, top: hoveredPoint.y - 8 }}
                >
                  {hoveredPoint.date}: ₹{hoveredPoint.price.toLocaleString()}
                </div>
              )}

              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-56 select-none"
              >
                {/* Horizontal Grid lines & y-axis values */}
                {[0, 0.25, 0.5, 0.75, 1].map((factor, idx) => {
                  const yVal = svgHeight - padBottom - factor * (svgHeight - padTop - padBottom);
                  const priceLabel = Math.round(minPrice + factor * (maxPrice - minPrice));
                  return (
                    <g key={idx}>
                      <line
                        x1={padLeft}
                        y1={yVal}
                        x2={svgWidth - padRight}
                        y2={yVal}
                        stroke="#f1f5f9"
                        strokeDasharray="3 3"
                        strokeWidth="1"
                      />
                      <text
                        x={padLeft - 8}
                        y={yVal + 3}
                        textAnchor="end"
                        fontSize="9"
                        fill="#94a3b8"
                        fontWeight="600"
                      >
                        {priceLabel.toLocaleString()}
                      </text>
                    </g>
                  );
                })}

                {/* The Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#047857"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Point Dots */}
                {points.map((p, idx) => (
                  <g key={idx}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="#047857"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="cursor-pointer transition-transform hover:scale-150"
                      onMouseEnter={() => setHoveredPoint(p)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                    {/* X-axis date labels */}
                    <text
                      x={p.x}
                      y={svgHeight - 12}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#94a3b8"
                      fontWeight="600"
                    >
                      {p.date}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Card: Crop-wise Market Overview */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-700">
                  <Sprout size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Crop-wise Market Overview</h3>
                  <p className="text-[11px] text-slate-400">
                    Current market prices, change and demand status
                  </p>
                </div>
              </div>
              <button
                onClick={onViewAllCropsClick}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
              >
                <span>View All Crops</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Active Insight Filter Banner */}
            {selectedInsightFilter !== 'all' && (
              <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span className="font-bold text-emerald-900">
                    Filtered by Market Insight: <strong className="capitalize underline">{selectedInsightFilter.replace('_', ' ')}</strong> ({filteredOverviews.length} crops match)
                  </span>
                </div>
                <button
                  onClick={() => setSelectedInsightFilter('all')}
                  className="flex items-center gap-1 px-2.5 py-0.5 bg-white border border-emerald-200 text-emerald-800 rounded-lg font-bold text-[11px] hover:bg-emerald-100/50"
                >
                  <span>Clear Filter</span>
                  <X size={12} />
                </button>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Crop</th>
                    <th className="py-3 px-4">Grade</th>
                    <th className="py-3 px-4">Current Price (₹/Q)</th>
                    <th className="py-3 px-4">Previous Price (₹/Q)</th>
                    <th className="py-3 px-4">Change</th>
                    <th className="py-3 px-4">Volume (Q)</th>
                    <th className="py-3 px-4">Demand</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOverviews.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={c.image}
                            alt={c.cropName}
                            className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1595188812674-d4f3b610c436?q=80&w=600&auto=format&fit=crop';
                            }}
                          />
                          <span className="font-extrabold text-slate-900">{c.cropName}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{c.grade}</td>
                      <td className="py-3.5 px-4 font-black text-slate-900">
                        {c.currentPrice.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium">
                        {c.previousPrice.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-bold">
                        <span
                          className={`inline-flex items-center gap-0.5 ${
                            c.changePct >= 0 ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {c.changePct >= 0 ? '↑' : '↓'} {c.changePct >= 0 ? `+${c.changePct.toFixed(1)}%` : `${c.changePct.toFixed(1)}%`}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">{c.volumeQuintals}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            c.demand === 'High'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {c.demand}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Market Insights */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Lightbulb size={17} className="text-emerald-700" />
                <h3 className="text-sm font-black text-slate-900">Market Insights</h3>
              </div>
              <button className="text-xs font-bold text-emerald-700 hover:text-emerald-800">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {/* Insight 1: Rising Prices */}
              <div
                onClick={() => {
                  setSelectedInsightFilter(selectedInsightFilter === 'rising' ? 'all' : 'rising');
                  setActiveInsightModal({
                    title: 'Rising Price Surge Alerts',
                    badge: '+4.2% Regional Avg Increase',
                    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    desc: 'Turmeric, Maize, and Paddy trading rates surged over the last 48 hours across AP Mandis.',
                    drivers: [
                      'Inter-state industrial spice processor buying from Tamil Nadu and Maharashtra.',
                      'Export terminal procurement demand at Kakinada and Visakhapatnam ports.',
                      'Delayed winter arrival batches tightening immediate market supply.'
                    ],
                    crops: 'Turmeric, Maize, Paddy',
                    action: 'Dealers should finalize procurement contracts today before wholesale modal rates increase another 2-3% by weekend auctions.'
                  });
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedInsightFilter === 'rising'
                    ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <ArrowUpRight size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-900">Rising Prices</h4>
                      <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        +3.2%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Turmeric, Maize, Paddy prices increased this week.
                    </p>
                    <span className="text-[10px] font-bold text-emerald-700 mt-1 inline-flex items-center gap-0.5">
                      {selectedInsightFilter === 'rising' ? '✓ Filter Active • Click for Deep AI Advisory' : 'Filter & View Advisory →'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Insight 2: Declining Prices */}
              <div
                onClick={() => {
                  setSelectedInsightFilter(selectedInsightFilter === 'declining' ? 'all' : 'declining');
                  setActiveInsightModal({
                    title: 'Declining Rates & Buyer Advantage',
                    badge: '-3.1% Price Softening',
                    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
                    desc: 'Tobacco (FCV) and Groundnut prices dipped due to heavy morning auction platform arrivals.',
                    drivers: [
                      'Surge in direct farm-gate lot dispatches across Prakasam and Guntur hubs.',
                      'Buyers holding back bids awaiting new grading certification batches.'
                    ],
                    crops: 'Tobacco (FCV), Groundnut',
                    action: 'Favorable acquisition window. Dealers can negotiate bulk discounts with prompt payment guarantees.'
                  });
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedInsightFilter === 'declining'
                    ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500/20 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                    <ArrowDownRight size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-900">Declining Prices</h4>
                      <span className="text-[9px] font-extrabold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                        -3.1%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Tobacco (FCV), Groundnut prices decreased.
                    </p>
                    <span className="text-[10px] font-bold text-rose-700 mt-1 inline-flex items-center gap-0.5">
                      {selectedInsightFilter === 'declining' ? '✓ Filter Active • Click for Deep AI Advisory' : 'Filter & View Advisory →'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Insight 3: High Demand Crops */}
              <div
                onClick={() => {
                  setSelectedInsightFilter(selectedInsightFilter === 'demand' ? 'all' : 'demand');
                  setActiveInsightModal({
                    title: 'High Demand & Liquidity Crops',
                    badge: 'High Liquidity Mandis',
                    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
                    desc: 'Chilli, Turmeric, and Paddy continue to see aggressive bidding with zero unsold lots at daily closing.',
                    drivers: [
                      'Global export interest for Teja Supreme S17 red chilli.',
                      'Govt buffer stock procurement tenders active via AP Civil Supplies.'
                    ],
                    crops: 'Guntur Sannam Chilli, Turmeric, Paddy',
                    action: 'Immediate trade turnaround. Lots procured are typically resold or dispatched within 24 hours.'
                  });
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedInsightFilter === 'demand'
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500/20 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                    <Flame size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-900">High Demand Crops</h4>
                      <span className="text-[9px] font-extrabold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                        Top Demand
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Chilli, Turmeric, Paddy showing strong demand.
                    </p>
                    <span className="text-[10px] font-bold text-amber-700 mt-1 inline-flex items-center gap-0.5">
                      {selectedInsightFilter === 'demand' ? '✓ Filter Active • Click for Deep AI Advisory' : 'Filter & View Advisory →'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Insight 4: High Volume Crops */}
              <div
                onClick={() => {
                  setSelectedInsightFilter(selectedInsightFilter === 'volume' ? 'all' : 'volume');
                  setActiveInsightModal({
                    title: 'High Volume Mandi Arrivals',
                    badge: '12,450+ Quintals Stored',
                    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
                    desc: 'Maize and Paddy recorded peak seasonal volume inflow across Krishna and Guntur mandis.',
                    drivers: [
                      'Peak harvest season culmination across coastal delta belt.',
                      'Subsidized transport fleet operating at 100% capacity.'
                    ],
                    crops: 'Maize, Guntur Sannam Chilli',
                    action: 'Take advantage of bulk storage freight subsidies. AP Govt transport fleet available at ₹24/km.'
                  });
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedInsightFilter === 'volume'
                    ? 'bg-teal-50 border-teal-300 ring-2 ring-teal-500/20 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <Box size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-900">High Volume Crops</h4>
                      <span className="text-[9px] font-extrabold text-teal-800 bg-teal-100 px-1.5 py-0.5 rounded">
                        12.4K Q
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Maize, Paddy, Groundnut recorded high volumes.
                    </p>
                    <span className="text-[10px] font-bold text-teal-700 mt-1 inline-flex items-center gap-0.5">
                      {selectedInsightFilter === 'volume' ? '✓ Filter Active • Click for Deep AI Advisory' : 'Filter & View Advisory →'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Market Insight Deep Advisory Modal */}
      {activeInsightModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" />
                <h3 className="text-sm font-black text-slate-900">{activeInsightModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveInsightModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${activeInsightModal.badgeColor}`}>
                  {activeInsightModal.badge}
                </span>
                <span className="text-slate-400 font-semibold">Jurisdiction: {district} Mandis</span>
              </div>

              <p className="text-slate-700 leading-relaxed font-medium">
                {activeInsightModal.desc}
              </p>

              <div className="p-3 bg-slate-50 rounded-2xl space-y-1.5">
                <p className="text-[11px] font-black text-slate-900">Key Economic Drivers:</p>
                <ul className="space-y-1 text-[11px] text-slate-600 list-disc list-inside">
                  {activeInsightModal.drivers.map((d: string, i: number) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-emerald-950 space-y-1">
                <p className="text-[11px] font-black flex items-center gap-1 text-emerald-800">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>AP Agronomy Recommendation</span>
                </p>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  {activeInsightModal.action}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedInsightFilter('all');
                    setActiveInsightModal(null);
                  }}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
                >
                  Clear Filter
                </button>
                {onViewAllCropsClick && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveInsightModal(null);
                      onViewAllCropsClick();
                    }}
                    className="px-5 py-2 bg-[#062419] hover:bg-[#093324] text-white font-bold rounded-xl shadow-md"
                  >
                    Procure in Marketplace →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
