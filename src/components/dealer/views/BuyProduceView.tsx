import React, { useState } from 'react';
import {
  Sprout,
  Users,
  Box,
  IndianRupee,
  Search,
  RotateCcw,
  Handshake,
  ChevronRight,
  Headphones,
  Phone,
  LayoutGrid,
  List,
  ChevronDown
} from 'lucide-react';
import type { FarmerListing } from '../types';

interface BuyProduceViewProps {
  district: string;
  listings: FarmerListing[];
  onSelectListingForDeal: (listing: FarmerListing) => void;
  onOpenNewEnquiryModal: () => void;
  initialSearchQuery?: string;
}

export const BuyProduceView: React.FC<BuyProduceViewProps> = ({
  district,
  listings,
  onSelectListingForDeal,
  onOpenNewEnquiryModal,
  initialSearchQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  React.useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [selectedMandal, setSelectedMandal] = useState('All Mandals');
  const [selectedPriceRange, setSelectedPriceRange] = useState('Any Price');
  const [selectedVolume, setSelectedVolume] = useState('Any Volume');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCrop('All Crops');
    setSelectedGrade('All Grades');
    setSelectedMandal('All Mandals');
    setSelectedPriceRange('Any Price');
    setSelectedVolume('Any Volume');
  };

  // Filter listings
  const filteredListings = listings.filter((l) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        l.cropName.toLowerCase().includes(q) ||
        l.farmerName.toLowerCase().includes(q) ||
        l.mandal.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedCrop !== 'All Crops' && !l.cropName.toLowerCase().includes(selectedCrop.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>🏠</span>
            <span>/</span>
            <span className="text-slate-600 font-semibold">Buy Produce</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
            Buy Produce (Dealer Portal)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Browse verified farmer produce and place procurement enquiries
          </p>
        </div>

        <button
          onClick={onOpenNewEnquiryModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#062419] hover:bg-[#093324] text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950/10 transition-all hover:translate-y-px"
        >
          <span>+ New Enquiry</span>
        </button>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <Sprout size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Available Listings</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">1,248</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑ +12% this week</span>
            </p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <Users size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Verified Farmers</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">832</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑ +8% this week</span>
            </p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <Box size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Total Volume Available</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">12,450 Q</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑ +15% this week</span>
            </p>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#062419] text-white flex items-center justify-center shrink-0">
            <IndianRupee size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Average Asking Price</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">₹18,750 / Q</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑ +3% this week</span>
            </p>
          </div>
        </div>
      </div>

      {/* Filter Card: Find the Right Produce */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sprout size={18} className="text-emerald-700" />
          <div>
            <h3 className="text-sm font-black text-slate-900">Find the Right Produce</h3>
            <p className="text-[11px] text-slate-400">
              Use filters to discover verified farmer listings across Andhra Pradesh
            </p>
          </div>
        </div>

        {/* Search bar inside filter card */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by crop, variety, farmer name, or district..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* Dropdowns Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-hidden"
            >
              <option>All Crops</option>
              <option>Chilli</option>
              <option>Paddy</option>
              <option>Tobacco</option>
              <option>Turmeric</option>
              <option>Maize</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-hidden"
            >
              <option>All Grades</option>
              <option>Grade A</option>
              <option>Grade A1</option>
              <option>Grade B</option>
              <option>FAQ</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">District</label>
            <select
              defaultValue={district}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-hidden"
            >
              <option>{district}</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Mandal</label>
            <select
              value={selectedMandal}
              onChange={(e) => setSelectedMandal(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-hidden"
            >
              <option>All Mandals</option>
              <option>Amaravathi</option>
              <option>Tenali</option>
              <option>Ponnur</option>
              <option>Mangalagiri</option>
              <option>Bapatla</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Price Range (₹/Q)</label>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-hidden"
            >
              <option>Any Price</option>
              <option>&lt; ₹5,000</option>
              <option>₹5,000 - ₹10,000</option>
              <option>&gt; ₹10,000</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Volume (Q)</label>
            <select
              value={selectedVolume}
              onChange={(e) => setSelectedVolume(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-hidden"
            >
              <option>Any Volume</option>
              <option>&lt; 100 Q</option>
              <option>100 - 300 Q</option>
              <option>&gt; 300 Q</option>
            </select>
          </div>
        </div>

        {/* Buttons: Clear & Search */}
        <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <RotateCcw size={13} />
            <span>Clear Filters</span>
          </button>

          <button className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-[#062419] hover:bg-[#093324] rounded-xl shadow-xs transition-colors">
            <Search size={13} />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Listings (Left 8 Cols) and Widgets (Right 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Listings Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Header row */}
            <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-700">
                  <Sprout size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    Verified Farmer Listings ({district})
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Showing verified produce available for procurement
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 font-semibold">
                  <span className="text-slate-400 text-[10px]">Sort by:</span>
                  <span>Latest First</span>
                  <ChevronDown size={13} className="text-slate-400" />
                </div>

                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1 rounded ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400'}`}
                  >
                    <List size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400'}`}
                  >
                    <LayoutGrid size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Listings Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Farmer &amp; Location</th>
                    <th className="py-3 px-4">Crop &amp; Grade</th>
                    <th className="py-3 px-4">Available Volume</th>
                    <th className="py-3 px-4">Asking Price</th>
                    <th className="py-3 px-4">Listed On</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredListings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                            {item.farmerInitials}
                          </div>
                          <div>
                            <p className="font-extrabold text-slate-900">{item.farmerName}</p>
                            <p className="text-[10px] text-slate-500">{item.mandal}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.cropName}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1595188812674-d4f3b610c436?q=80&w=600&auto=format&fit=crop';
                            }}
                          />
                          <div>
                            <p className="font-extrabold text-slate-900">{item.cropName}</p>
                            <p className="text-[10px] text-slate-500">
                              {item.cropVariety} • {item.grade}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-black text-slate-900">
                        {item.availableVolumeQuintals} Q
                      </td>

                      <td className="py-3.5 px-4 font-black text-slate-900">
                        ₹{item.askingPricePerQuintal.toLocaleString()} / Q
                      </td>

                      <td className="py-3.5 px-4 text-[11px] text-slate-500 font-medium">
                        {item.listedTime}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => onSelectListingForDeal(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#062419] hover:bg-[#093324] text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all hover:scale-102"
                        >
                          <Handshake size={14} className="text-emerald-400" />
                          <span>Deal &amp; Ask</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button className="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                <span>View All Listings</span>
                <ChevronRight size={13} />
              </button>

              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                  &lt;
                </button>
                <button className="w-7 h-7 rounded-lg bg-[#062419] text-white font-bold flex items-center justify-center">
                  1
                </button>
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                  2
                </button>
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                  3
                </button>
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                  4
                </button>
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                  5
                </button>
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Widgets */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Crop Availability ({district})</h3>
              <button className="text-xs font-bold text-emerald-700 hover:underline">
                View Details &gt;
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Guntur Chilli</span>
                  <span className="font-bold text-slate-900">4,850 Q</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-700 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Paddy</span>
                  <span className="font-bold text-slate-900">3,240 Q</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Tobacco (FCV)</span>
                  <span className="font-bold text-slate-900">1,820 Q</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Turmeric</span>
                  <span className="font-bold text-slate-900">1,450 Q</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '32%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Maize</span>
                  <span className="font-bold text-slate-900">890 Q</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-300 rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Recent Market Insights</h3>
              <button
                onClick={() => setSelectedCrop('All Crops')}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                Reset &gt;
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div
                onClick={() => setSelectedCrop('Chilli')}
                className="p-2 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors flex items-start justify-between gap-2 group"
              >
                <p className="text-slate-700 font-medium group-hover:text-emerald-900">
                  <span className="text-emerald-600 font-bold mr-1">↑</span>
                  Guntur Chilli prices up 3% this week
                </p>
                <span className="text-[10px] text-slate-400 shrink-0 group-hover:text-emerald-700 font-semibold">Filter →</span>
              </div>
              <div
                onClick={() => setSelectedCrop('Paddy')}
                className="p-2 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors flex items-start justify-between gap-2 group"
              >
                <p className="text-slate-700 font-medium group-hover:text-emerald-900">
                  <span className="text-emerald-600 font-bold mr-1">↑</span>
                  Paddy demand increased in Guntur
                </p>
                <span className="text-[10px] text-slate-400 shrink-0 group-hover:text-emerald-700 font-semibold">Filter →</span>
              </div>
              <div
                onClick={() => setSelectedCrop('Tobacco')}
                className="p-2 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors flex items-start justify-between gap-2 group"
              >
                <p className="text-slate-700 font-medium group-hover:text-emerald-900">
                  <span className="text-rose-600 font-bold mr-1">↓</span>
                  Tobacco (FCV) prices down 1%
                </p>
                <span className="text-[10px] text-slate-400 shrink-0 group-hover:text-emerald-700 font-semibold">Filter →</span>
              </div>
              <div
                onClick={() => setSelectedCrop('Turmeric')}
                className="p-2 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors flex items-start justify-between gap-2 group"
              >
                <p className="text-slate-700 font-medium group-hover:text-emerald-900">
                  <span className="text-amber-600 font-bold mr-1">★</span>
                  Turmeric prices stable &amp; high demand
                </p>
                <span className="text-[10px] text-slate-400 shrink-0 group-hover:text-emerald-700 font-semibold">Filter →</span>
              </div>
            </div>
          </div>

          <div className="bg-[#062419] text-white rounded-3xl p-5 border border-emerald-800 shadow-md space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl text-emerald-400">
                <Headphones size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">Need Assistance?</h4>
                <p className="text-[11px] text-emerald-200">Our support team is here to help you.</p>
              </div>
            </div>

            <button
              onClick={() => alert("Connecting to AP RythuSetu Dealer Support Desk...")}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
            >
              <Phone size={13} />
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
