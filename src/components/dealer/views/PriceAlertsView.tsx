import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Clock,
  Slash,
  Calendar,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  BarChart3,
  X,
  Lightbulb
} from 'lucide-react';
import type { PriceAlertItem } from '../types';
import { INITIAL_PRICE_ALERTS, INITIAL_RECENT_ALERTS } from '../dealerData';

interface PriceAlertsViewProps {
  district: string;
  onNavigateToMarketTrends?: () => void;
}

export const PriceAlertsView: React.FC<PriceAlertsViewProps> = ({
  district,
  onNavigateToMarketTrends
}) => {
  const [alerts, setAlerts] = useState<PriceAlertItem[]>(INITIAL_PRICE_ALERTS);
  const [recentAlerts] = useState(INITIAL_RECENT_ALERTS);
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [newCrop, setNewCrop] = useState('Guntur Chilli');
  const [newGrade, setNewGrade] = useState('Teja Supreme S17');
  const [newCondition, setNewCondition] = useState<'Price Above' | 'Price Below'>('Price Above');
  const [newTargetPrice, setNewTargetPrice] = useState('19500');

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTargetPrice) return;

    const newId = `AL-2026-00${alerts.length + 1}`;
    const newAlert: PriceAlertItem = {
      id: newId,
      cropName: newCrop,
      grade: newGrade,
      iconType: newCrop.toLowerCase().includes('chilli') ? 'chilli' : 'sprout',
      condition: newCondition,
      targetPrice: Number(newTargetPrice),
      currentPrice: 18500,
      status: 'Active',
      lastUpdated: 'Just now',
      actionText: 'View >'
    };

    setAlerts([newAlert, ...alerts]);
    setModalOpen(false);
    alert(`🔔 Price alert ${newId} created successfully for ${newCrop} (${newCondition} ₹${Number(newTargetPrice).toLocaleString()}) in ${district}!`);
  };

  const getCropEmoji = (name: string) => {
    const l = name.toLowerCase();
    if (l.includes('chilli')) return '🌶️';
    if (l.includes('turmeric')) return '🟡';
    if (l.includes('tobacco')) return '🍂';
    if (l.includes('maize')) return '🌽';
    if (l.includes('paddy')) return '🌾';
    return '🌱';
  };

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-700 border border-emerald-100">
            <Bell size={22} />
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
              Price Alerts
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Get notified about price changes and market opportunities for your preferred crops in {district}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs">
            <Calendar size={14} className="text-slate-500" />
            <span>Last 7 Days</span>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#062419] hover:bg-[#093324] text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950/10 transition-all hover:translate-y-px"
          >
            <Plus size={14} />
            <span>Create Price Alert</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <Bell size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Total Alerts</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">28</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑ +12% from last week</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Active Alerts</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">20</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑ +11% from last week</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <Clock size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Triggered Alerts</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">6</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑ +50% from last week</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <Slash size={20} className="text-emerald-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium text-slate-500">Inactive Alerts</p>
              <button className="text-[10px] font-bold text-emerald-700 hover:underline">
                View All
              </button>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">2</h3>
            <p className="text-[11px] font-bold text-rose-600 flex items-center gap-0.5 mt-0.5">
              <span>↓ -33% from last week</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Active Price Alerts */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-emerald-700" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">Active Price Alerts</h3>
                  <p className="text-[11px] text-slate-400">
                    Real-time notifications for your selected crops and price conditions.
                  </p>
                </div>
              </div>
              <button className="text-xs font-bold text-emerald-700 hover:underline">
                View All &gt;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-4">ID</th>
                    <th className="py-2.5 px-4">Crop</th>
                    <th className="py-2.5 px-4">Grade</th>
                    <th className="py-2.5 px-4">Condition</th>
                    <th className="py-2.5 px-4">Target Price (₹/Q)</th>
                    <th className="py-2.5 px-4">Current Price (₹/Q)</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4">Last Updated</th>
                    <th className="py-2.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {alerts.map((al) => (
                    <tr key={al.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 text-[11px] font-medium text-slate-500">
                        {al.id}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <span className="mr-1.5">{getCropEmoji(al.cropName)}</span>
                        <span>{al.cropName}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">{al.grade}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            al.condition === 'Price Above'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {al.condition}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        ₹{al.targetPrice.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-black text-slate-900">
                        ₹{al.currentPrice.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
                          {al.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[11px] text-slate-500">{al.lastUpdated}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => alert(`Showing alert details for ${al.id}`)}
                          className="text-emerald-700 hover:text-emerald-900 font-bold text-[11px]"
                        >
                          View &gt;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Price Alerts */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-700" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">Recent Price Alerts</h3>
                  <p className="text-[11px] text-slate-400">
                    Latest triggered and updated alerts.
                  </p>
                </div>
              </div>
              <button className="text-xs font-bold text-emerald-700 hover:underline">
                View All &gt;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-4">Time</th>
                    <th className="py-2.5 px-4">Crop</th>
                    <th className="py-2.5 px-4">Grade</th>
                    <th className="py-2.5 px-4">Alert Type</th>
                    <th className="py-2.5 px-4">Price</th>
                    <th className="py-2.5 px-4">Change</th>
                    <th className="py-2.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentAlerts.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 text-[11px] font-medium text-slate-500">{r.time}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <span className="mr-1.5">{getCropEmoji(r.cropName)}</span>
                        <span>{r.cropName}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">{r.grade}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            r.alertType === 'Price Above'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {r.alertType}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-black text-slate-900">
                        ₹{r.price.toLocaleString()} / Q
                      </td>
                      <td className="py-3 px-4 font-bold">
                        <span
                          className={`inline-flex items-center gap-0.5 ${
                            r.changePct >= 0 ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {r.changePct >= 0 ? '↑' : '↓'} {r.changePct >= 0 ? `+${r.changePct.toFixed(1)}%` : `${r.changePct.toFixed(1)}%`}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            r.status === 'Triggered'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Cols */}
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

            <div className="space-y-4 divide-y divide-slate-100">
              <div className="pt-2 first:pt-0">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <ArrowUpRight size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-extrabold text-slate-900">Rising Prices</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Turmeric, Maize, Paddy prices increased this week.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                    <ArrowDownRight size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-extrabold text-slate-900">Declining Prices</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Tobacco (FCV), Groundnut prices decreased.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-sm font-black text-slate-900 pb-2 border-b border-slate-100">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50/60 hover:bg-emerald-50 text-emerald-950 font-bold text-xs transition-colors border border-emerald-100"
              >
                <Bell size={15} className="text-emerald-700" />
                <span>Create Price Alert</span>
              </button>

              <button
                onClick={onNavigateToMarketTrends}
                className="w-full flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50/60 hover:bg-emerald-50 text-emerald-950 font-bold text-xs transition-colors border border-emerald-100"
              >
                <TrendingUp size={15} className="text-emerald-700" />
                <span>Track Market Trends</span>
              </button>

              <button
                onClick={onNavigateToMarketTrends}
                className="w-full flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50/60 hover:bg-emerald-50 text-emerald-950 font-bold text-xs transition-colors border border-emerald-100"
              >
                <BarChart3 size={15} className="text-emerald-700" />
                <span>View Price History</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-sm font-black text-slate-900 pb-2 border-b border-slate-100">
              Price Alert Summary
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-semibold text-slate-700">Guntur Chilli</span>
                <span className="font-bold text-slate-500">8 alerts &gt;</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-semibold text-slate-700">Turmeric</span>
                <span className="font-bold text-slate-500">6 alerts &gt;</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-semibold text-slate-700">Tobacco (FCV)</span>
                <span className="font-bold text-slate-500">5 alerts &gt;</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-semibold text-slate-700">Maize</span>
                <span className="font-bold text-slate-500">4 alerts &gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Create Price Alert */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <Bell size={18} />
                </div>
                <h3 className="text-sm font-black text-slate-900">Create New Price Alert</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Crop Name</label>
                <select
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
                >
                  <option>Guntur Chilli</option>
                  <option>Guntur Sannam Chilli</option>
                  <option>Turmeric</option>
                  <option>Tobacco (FCV)</option>
                  <option>Maize</option>
                  <option>Paddy</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Grade</label>
                <input
                  type="text"
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Alert Trigger Condition</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewCondition('Price Above')}
                    className={`p-2.5 rounded-xl font-bold border transition-all ${
                      newCondition === 'Price Above'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    📈 Price Above
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewCondition('Price Below')}
                    className={`p-2.5 rounded-xl font-bold border transition-all ${
                      newCondition === 'Price Below'
                        ? 'bg-rose-50 text-rose-800 border-rose-300 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    📉 Price Below
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Target Price (₹ / Quintal)</label>
                <input
                  type="number"
                  value={newTargetPrice}
                  onChange={(e) => setNewTargetPrice(e.target.value)}
                  className="w-full font-black text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#062419] hover:bg-[#093324] text-white font-bold rounded-xl shadow-md"
                >
                  Save Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
