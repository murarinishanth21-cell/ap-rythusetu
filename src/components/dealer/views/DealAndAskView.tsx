import React, { useState } from 'react';
import {
  Sprout,
  Users,
  IndianRupee,
  TrendingUp,
  Phone,
  MessageSquare,
  HelpCircle,
  BookOpen,
  Send,
  Bookmark,
  Info,
  MoreHorizontal,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import type { FarmerListing, NegotiationOffer } from '../types';
import { INITIAL_OFFER_HISTORY } from '../dealerData';

interface DealAndAskViewProps {
  listing?: FarmerListing;
  onBackToBuyProduce: () => void;
  onViewMarketTrends?: () => void;
}

export const DealAndAskView: React.FC<DealAndAskViewProps> = ({
  listing,
  onBackToBuyProduce,
  onViewMarketTrends
}) => {
  // Default to first listing if none provided
  const activeListing: FarmerListing = listing || {
    id: "lst-1",
    farmerName: "Venkata Ramana",
    farmerInitials: "VR",
    mandal: "Amaravathi Mandal",
    district: "Guntur",
    cropName: "Guntur Sannam Chilli",
    cropVariety: "Teja Supreme S17",
    grade: "Grade A1",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600&auto=format&fit=crop",
    availableVolumeQuintals: 150,
    askingPricePerQuintal: 18500,
    listedTime: "Today, 09:30 AM",
    verified: true,
    dealsCount: 12,
    rating: 4.8,
    completionRate: 100
  };

  const [currentStep, setCurrentStep] = useState<number>(3); // Currently negotiating
  const [offeredPrice, setOfferedPrice] = useState<number>(17500);
  const [offeredQty, setOfferedQty] = useState<number>(activeListing.availableVolumeQuintals);
  const [message, setMessage] = useState<string>(
    `We are interested to purchase ${activeListing.availableVolumeQuintals} Q of Grade A1 ${activeListing.cropName}. Please confirm if you can accept this price.`
  );
  const [offers, setOffers] = useState<NegotiationOffer[]>(INITIAL_OFFER_HISTORY);
  const [submitting, setSubmitting] = useState(false);

  // Price comparison
  const priceDiff = offeredPrice - activeListing.askingPricePerQuintal;
  const pctDiff = ((priceDiff / activeListing.askingPricePerQuintal) * 100).toFixed(1);

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offeredPrice || !offeredQty) return;

    setSubmitting(true);
    setTimeout(() => {
      const newOffer: NegotiationOffer = {
        id: `off-${Date.now()}`,
        dateTime: 'Just now',
        offeredPrice: Number(offeredPrice),
        quantity: Number(offeredQty),
        status: 'Pending',
        message: message
      };
      setOffers([newOffer, ...offers]);
      setSubmitting(false);
      alert(`✅ Offer of ₹${Number(offeredPrice).toLocaleString()}/Q sent to farmer ${activeListing.farmerName} in real time!`);
    }, 400);
  };

  const steps = [
    { num: 1, title: 'Select Farmer & Crop', desc: 'Choose from verified listings' },
    { num: 2, title: 'Review Details', desc: 'Check quality, quantity & price' },
    { num: 3, title: 'Negotiate', desc: 'Send offer or counter offer' },
    { num: 4, title: 'Confirm Deal', desc: 'Finalize and schedule pickup' },
    { num: 5, title: 'Track & Complete', desc: 'Monitor and mark as complete' }
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <button
              onClick={onBackToBuyProduce}
              className="hover:text-slate-700 flex items-center gap-1 font-medium"
            >
              <ArrowLeft size={12} />
              <span>Buy Produce</span>
            </button>
            <span>&gt;</span>
            <span className="text-slate-700 font-bold">Deal &amp; Ask</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
            Deal &amp; Ask
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Negotiate and confirm procurement directly with verified farmers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("How it works: 1. Review farmer details. 2. Formulate your price offer. 3. Send offer. Farmer gets real-time SMS/WhatsApp notification.")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs"
          >
            <HelpCircle size={14} className="text-slate-500" />
            <span>How it works?</span>
          </button>

          <button
            onClick={() => alert("Chat Guidelines: Treat verified AP farmers with courtesy. Payments are protected via Govt escrow guarantee.")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs"
          >
            <BookOpen size={14} className="text-slate-500" />
            <span>Chat Guidelines</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Stepper (Left 3 cols) and Negotiation Content (Right 9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stepper Card */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <div className="relative space-y-6">
              {/* Vertical connector line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-100 -z-0" />

              {steps.map((s) => {
                const isActive = s.num === currentStep;
                const isPassed = s.num < currentStep;

                return (
                  <div
                    key={s.num}
                    onClick={() => setCurrentStep(s.num)}
                    className="relative z-10 flex items-start gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                        isActive
                          ? 'bg-[#062419] text-white ring-4 ring-emerald-100 shadow-xs'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                      }`}
                    >
                      {isPassed ? '✓' : s.num}
                    </div>
                    <div>
                      <h4
                        className={`text-xs font-bold leading-tight ${
                          isActive ? 'text-emerald-950 font-black' : 'text-slate-700'
                        }`}
                      >
                        {s.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 9 cols: Cards */}
        <div className="lg:col-span-9 space-y-6">
          {/* Row 1: Selected Listing & Farmer Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Selected Listing Card (7 cols) */}
            <div className="md:col-span-7 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Sprout size={16} className="text-emerald-700" />
                <h3 className="text-xs font-bold text-slate-900">Selected Listing</h3>
              </div>

              <div className="flex items-start gap-3.5">
                <img
                  src={activeListing.image}
                  alt={activeListing.cropName}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1595188812674-d4f3b610c436?q=80&w=600&auto=format&fit=crop';
                  }}
                />
                <div className="flex-1">
                  <h4 className="text-sm font-black text-slate-900">{activeListing.cropName}</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 rounded-md text-[10px] font-bold">
                      {activeListing.cropVariety}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-bold">
                      {activeListing.grade}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px]">
                    <div>
                      <p className="text-slate-400 text-[10px]">Farmer</p>
                      <p className="font-bold text-slate-800">{activeListing.farmerName}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px]">Location</p>
                      <p className="font-bold text-slate-800">{activeListing.mandal}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px]">Available Volume</p>
                      <p className="font-black text-slate-900">
                        {activeListing.availableVolumeQuintals} Quintals
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px]">Asking Price</p>
                      <p className="font-black text-slate-900">
                        ₹{activeListing.askingPricePerQuintal.toLocaleString()} / Q
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Farmer Info Card (5 cols) */}
            <div className="md:col-span-5 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-emerald-700" />
                  <h3 className="text-xs font-bold text-slate-900">Farmer Information</h3>
                </div>
                <button className="text-[11px] font-bold text-emerald-700 hover:underline">
                  View Profile &gt;
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#062419] text-white flex items-center justify-center font-black text-sm shrink-0">
                  {activeListing.farmerInitials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-black text-slate-900">
                      {activeListing.farmerName}
                    </h4>
                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold rounded">
                      Verified
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    📍 {activeListing.mandal}, {activeListing.district}
                  </p>
                </div>
              </div>

              {/* Farmer stats */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-2xl text-center">
                <div>
                  <p className="text-xs font-black text-slate-900">{activeListing.dealsCount}</p>
                  <p className="text-[9px] text-slate-400">Total Deals</p>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">{activeListing.rating} ★</p>
                  <p className="text-[9px] text-slate-400">Rating</p>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">{activeListing.completionRate}%</p>
                  <p className="text-[9px] text-slate-400">Completion Rate</p>
                </div>
              </div>

              {/* Farmer action buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => alert(`Dialing verified farmer ${activeListing.farmerName} at +91 9848022331...`)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-xs"
                >
                  <Phone size={13} />
                  <span>Call Farmer</span>
                </button>
                <button
                  onClick={() => alert(`Opening secure direct messenger with ${activeListing.farmerName}...`)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#062419] hover:bg-[#093324] text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  <MessageSquare size={13} className="text-emerald-400" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Your Offer & Price Insights */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Your Offer Card (7 cols) */}
            <div className="md:col-span-7 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <IndianRupee size={16} className="text-emerald-700" />
                  <div>
                    <h3 className="text-xs font-black text-slate-900">Your Offer</h3>
                    <p className="text-[10px] text-slate-400">
                      Enter your proposed price and quantity
                    </p>
                  </div>
                </div>
                {onViewMarketTrends && (
                  <button
                    onClick={onViewMarketTrends}
                    className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
                  >
                    <span>View Market Trends</span>
                    <ChevronRight size={12} />
                  </button>
                )}
              </div>

              <form onSubmit={handleSendOffer} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Offered Price */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Your Offered Price (₹ / Q)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={offeredPrice}
                        onChange={(e) => setOfferedPrice(Number(e.target.value))}
                        className="w-full text-xs font-black bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">
                        Quantity (Quintals)
                      </label>
                      <span className="text-[9px] text-slate-400 font-semibold">
                        Max available: {activeListing.availableVolumeQuintals} Q
                      </span>
                    </div>
                    <input
                      type="number"
                      max={activeListing.availableVolumeQuintals}
                      value={offeredQty}
                      onChange={(e) => setOfferedQty(Number(e.target.value))}
                      className="w-full text-xs font-black bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Message to Farmer */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">
                      Message to Farmer (Optional)
                    </label>
                    <span className="text-[9px] text-slate-400">{message.length}/500</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                  />
                </div>

                {/* Offer Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#062419] hover:bg-[#093324] text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950/10 transition-all"
                  >
                    <Send size={13} className="text-emerald-400" />
                    <span>{submitting ? 'Sending Offer...' : 'Send Offer'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("Offer saved as draft in Enquiries.")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-xs"
                  >
                    <Bookmark size={13} className="text-slate-500" />
                    <span>Save as Draft</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Price Insights Card (5 cols) */}
            <div className="md:col-span-5 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <TrendingUp size={16} className="text-emerald-700" />
                <h3 className="text-xs font-bold text-slate-900">Price Insights</h3>
              </div>

              {/* Comparison stats */}
              <div className="grid grid-cols-2 gap-3 py-1">
                <div className="p-2.5 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] text-slate-400">
                    Current Market Price ({activeListing.district})
                  </p>
                  <p className="text-sm font-black text-slate-900 mt-0.5">
                    ₹{activeListing.askingPricePerQuintal.toLocaleString()} / Q
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-slate-400">Your Offer</p>
                    <span
                      className={`text-[9px] font-bold px-1 rounded ${
                        Number(pctDiff) <= 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                      }`}
                    >
                      {pctDiff}%
                    </span>
                  </div>
                  <p className="text-sm font-black text-slate-900 mt-0.5">
                    ₹{Number(offeredPrice).toLocaleString()} / Q
                  </p>
                  <p className="text-[9px] text-slate-400 mt-0.5">
                    {priceDiff < 0
                      ? `₹${Math.abs(priceDiff).toLocaleString()} below asking price`
                      : `₹${priceDiff.toLocaleString()} above asking price`}
                  </p>
                </div>
              </div>

              {/* Blue info banner */}
              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-start gap-2 text-[11px] text-blue-900">
                <Info size={15} className="text-blue-600 shrink-0 mt-0.5" />
                <p>
                  This price is {Math.abs(Number(pctDiff))}% below the current market average for{' '}
                  <span className="font-bold">{activeListing.cropVariety} {activeListing.cropName}</span>.
                </p>
              </div>

              {/* Recent Deals list */}
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="font-bold text-slate-800">Recent Deals for Similar Produce</span>
                  <button className="text-emerald-700 font-bold hover:underline">
                    View More &gt;
                  </button>
                </div>
                <div className="divide-y divide-slate-100 text-[11px]">
                  <div className="py-1.5 flex items-center justify-between">
                    <span className="text-slate-500">6 Sep 2025</span>
                    <span className="font-semibold text-slate-700">120 Q</span>
                    <span className="font-black text-slate-900">₹18,200</span>
                  </div>
                  <div className="py-1.5 flex items-center justify-between">
                    <span className="text-slate-500">5 Sep 2025</span>
                    <span className="font-semibold text-slate-700">200 Q</span>
                    <span className="font-black text-slate-900">₹18,500</span>
                  </div>
                  <div className="py-1.5 flex items-center justify-between">
                    <span className="text-slate-500">4 Sep 2025</span>
                    <span className="font-semibold text-slate-700">150 Q</span>
                    <span className="font-black text-slate-900">₹17,800</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Offer History Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <IndianRupee size={16} className="text-emerald-700" />
              <div>
                <h3 className="text-xs font-black text-slate-900">Offer History</h3>
                <p className="text-[10px] text-slate-400">
                  Track your negotiation history for this listing
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Date &amp; Time</th>
                    <th className="py-2.5 px-3">Offered Price</th>
                    <th className="py-2.5 px-3">Quantity</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Message</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {offers.map((off) => (
                    <tr key={off.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 text-slate-500 text-[11px] font-medium whitespace-nowrap">
                        {off.dateTime}
                      </td>
                      <td className="py-3 px-3 font-black text-slate-900">
                        ₹{off.offeredPrice.toLocaleString()} / Q
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-800">
                        {off.quantity} Q
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            off.status === 'Accepted'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : off.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {off.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 text-[11px] max-w-xs truncate">
                        {off.message}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button className="text-slate-400 hover:text-slate-700 p-1">
                          <MoreHorizontal size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
