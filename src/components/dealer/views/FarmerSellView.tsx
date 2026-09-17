import React, { useState, useEffect } from 'react';
import {
  Sprout,
  PlusCircle,
  Phone,
  CheckCircle2,
  XCircle,
  IndianRupee,
  X,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  BadgeCheck,
  Tag,
  ArrowUpRight,
  Truck,
  MapPin,
  Clock,
  KeyRound,
  Handshake,
  Building2
} from 'lucide-react';
import { api } from '../../../api';
import { DISTRICT_DATA, normalizeDistrictName, getCropImage } from '../../../districtData';
import { notificationService } from '../../../services/notificationService';

interface FarmerSellViewProps {
  district: string;
  farmerUser: any;
  onRefreshData?: () => void;
}

export const FarmerSellView: React.FC<FarmerSellViewProps> = ({
  district,
  farmerUser
}) => {
  const [activeFarmerTab, setActiveFarmerTab] = useState<'listings'>('listings');
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [newCrop, setNewCrop] = useState('');
  const [newVariety, setNewVariety] = useState('Teja Supreme S17');
  const [newQty, setNewQty] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [reqInspection, setReqInspection] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [counterModalOpen, setCounterModalOpen] = useState(false);
  const [counterEnquiry, setCounterEnquiry] = useState<any | null>(null);
  const [counterPrice, setCounterPrice] = useState('');
  const [dealReviewModalOpen, setDealReviewModalOpen] = useState(false);
  const [selectedDealForReview, setSelectedDealForReview] = useState<any | null>(null);

  // Transport tracking (read-only for farmer — dealer books transport)
  const [dealerBookedTransports] = useState([
    {
      id: 'FRT-9041',
      crop: 'Guntur Sannam Chilli',
      quintals: 150,
      pickup: 'Duggirala Village Farm-Gate',
      destination: `${district} Mirchi Yard Mandi #4`,
      dateSlot: 'Today, 11:30 AM',
      otp: '482910',
      driverName: 'K. Srinivas Rao',
      driverPhone: '9848099881',
      vehicle: 'Ashok Leyland 10T',
      regNo: 'AP 07 TJ 4521',
      status: 'In Transit',
      dealerName: 'Sri Balaji Agro Commodities Ltd'
    }
  ]);







  // Active listings
  const [myListings, setMyListings] = useState<any[]>([
    {
      id: 'lst-live-1',
      crop_name: 'Guntur Sannam Chilli',
      variety: 'Teja Supreme S17',
      grade: 'Grade A1 (RBK Certified)',
      quantity_quintals: 150,
      price: 18500,
      status: 'active',
      inspection_requested: 1,
      image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=800&auto=format&fit=crop',
      created_at: 'Today, 09:30 AM',
      views: 342,
      bids: 3
    },
    {
      id: 'lst-live-2',
      crop_name: 'Duggirala Turmeric',
      variety: 'Curcumin 5.2% Premium',
      grade: 'Super Grade',
      quantity_quintals: 95,
      price: 9200,
      status: 'active',
      inspection_requested: 1,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop',
      created_at: 'Yesterday, 05:20 PM',
      views: 189,
      bids: 2
    },
    {
      id: 'lst-live-3',
      crop_name: 'BPT 5204 Paddy',
      variety: 'Samba Mahsuri Fine',
      grade: 'Grade A Dry Grain',
      quantity_quintals: 280,
      price: 2450,
      status: 'active',
      inspection_requested: 0,
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=800&auto=format&fit=crop',
      created_at: '2 days ago',
      views: 512,
      bids: 5
    }
  ]);

  // Live Dealer Bargain Proposals
  const [enquiries, setEnquiries] = useState<any[]>([
    {
      id: '101',
      crop_name: 'Guntur Sannam Chilli',
      crop_qty: 150,
      dealer_name: 'Sri Balaji Agro Commodities Ltd',
      dealer_id: 'AP-DLR-2026-3044',
      dealer_mobile: '9848033442',
      dealer_price: 17800,
      asking_price: 18500,
      proposed_qty: 150,
      status: 'pending',
      created_at: 'Today, 10:45 AM',
      payment_type: 'Instant RTGS on Weighment',
      notes: 'Ready for immediate procurement of complete 150 Q lot. Fleet truck available for farm-gate pickup.'
    },
    {
      id: '102',
      crop_name: 'Duggirala Turmeric',
      crop_qty: 95,
      dealer_name: 'Kisan Export House & Spices',
      dealer_id: 'AP-DLR-2026-1188',
      dealer_mobile: '9440188229',
      dealer_price: 8950,
      asking_price: 9200,
      proposed_qty: 95,
      status: 'pending',
      created_at: 'Today, 08:15 AM',
      payment_type: 'AP Govt Escrow Protected',
      notes: 'We need standard Curcumin tested lot. Will arrange direct gunny bag loading at your farm.'
    }
  ]);

  // Listen for notification navigation targeting a specific deal / enquiry
  useEffect(() => {
    const handleCheckDeal = () => {
      try {
        const stored = localStorage.getItem('ap_farmer_highlight_deal');
        if (stored) {
          const data = JSON.parse(stored);
          localStorage.removeItem('ap_farmer_highlight_deal');
          const targetId = String(data?.enquiryId || '101');
          const match = enquiries.find((e) => String(e.id) === targetId) || enquiries[0];
          if (match) {
            setSelectedDealForReview(match);
            setDealReviewModalOpen(true);
            setActiveFarmerTab('listings');
          }
        }
      } catch {}
    };

    handleCheckDeal();

    const onOpenDeal = (e: any) => {
      const targetId = String(e.detail?.enquiryId || '101');
      const match = enquiries.find((enq) => String(enq.id) === targetId) || enquiries[0];
      if (match) {
        setSelectedDealForReview(match);
        setDealReviewModalOpen(true);
        setActiveFarmerTab('listings');
      }
    };

    window.addEventListener('ap-farmer-open-deal', onOpenDeal as any);
    return () => window.removeEventListener('ap-farmer-open-deal', onOpenDeal as any);
  }, [enquiries]);

  const districtDetail = DISTRICT_DATA[normalizeDistrictName(district)] || DISTRICT_DATA['Guntur'];

  // Quick preset crops
  const QUICK_CROPS = [
    { name: 'Guntur Sannam Chilli', variety: 'Teja Supreme S17', defaultRate: 18500, icon: '🌶️' },
    { name: 'Duggirala Turmeric', variety: 'High Curcumin Gold', defaultRate: 9200, icon: '🌿' },
    { name: 'BPT 5204 Paddy', variety: 'Samba Mahsuri Fine', defaultRate: 2450, icon: '🌾' },
    { name: 'Cotton Bunny', variety: 'Long Staple 32mm', defaultRate: 7400, icon: '☁️' },
    { name: 'Virginia Tobacco', variety: 'Flue Cured Grade 1', defaultRate: 16800, icon: '🍂' }
  ];

  const handleSelectQuickCrop = (c: typeof QUICK_CROPS[0]) => {
    setNewCrop(c.name);
    setNewVariety(c.variety);
    setNewPrice(String(c.defaultRate));
    setPublishModalOpen(true);
  };

  const handlePublishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrop || !newQty || !newPrice) {
      alert('Please provide crop name, quantity, and asking price.');
      return;
    }

    setIsPublishing(true);
    try {
      const defaultImg =
        districtDetail.crops.find((c) =>
          c.name.toLowerCase().includes(newCrop.toLowerCase())
        )?.image || getCropImage(newCrop);

      const listingData = {
        farmer_id: farmerUser?.id || 'AP-FRM-2026-1011',
        farmer_name: farmerUser?.name || 'V. Ramana Rao',
        farmer_mobile: farmerUser?.mobile || '9848022331',
        crop: newCrop,
        variety: newVariety,
        qty: Number(newQty),
        price: Number(newPrice),
        district: district,
        quality: reqInspection ? 'RBK Certified Grade A1' : 'Farmer Standard Grade',
        image_url: defaultImg
      };

      const result = await api.publishCrop(listingData);
      const createdItem = {
        crop_name: newCrop,
        variety: newVariety,
        grade: reqInspection ? 'RBK Certified Grade A1' : 'Standard Field Grade',
        quantity_quintals: Number(newQty),
        price: Number(newPrice),
        district: district,
        image: defaultImg,
        id: result?.id || `lst-${Date.now()}`,
        status: 'active',
        created_at: 'Just now',
        views: 1,
        bids: 0
      };

      setMyListings([createdItem, ...myListings]);
      setIsPublishing(false);
      setPublishModalOpen(false);
      setNewCrop('');
      setNewQty('');
      setNewPrice('');
      alert(`🎉 Harvest Published! Your lot '${newCrop}' (${newQty} Quintals) is now live across Andhra Pradesh mandi dealers.`);
    } catch {
      setIsPublishing(false);
      alert('Your harvest lot has been queued and broadcasted to AP Mandi dealers.');
    }
  };

  const handleEnquiryAction = async (enqId: string, status: 'accepted' | 'declined') => {
    try {
      await api.updateEnquiryStatus(Number(enqId), status);
      const enq = enquiries.find((item) => String(item.id) === String(enqId));
      setEnquiries((prev) =>
        prev.map((item) => (String(item.id) === String(enqId) ? { ...item, status } : item))
      );
      if (selectedDealForReview && String(selectedDealForReview.id) === String(enqId)) {
        setSelectedDealForReview((prev: any) => (prev ? { ...prev, status } : null));
      }

      if (status === 'accepted') {
        notificationService.addNotification({
          roleTarget: 'dealer',
          title: `🤝 Deal Confirmed by Farmer!`,
          desc: `Farmer accepted your offer of ₹${Number(enq?.dealer_price || 18000).toLocaleString()}/Q for ${enq?.proposed_qty || enq?.crop_qty || 150} Q ${enq?.crop_name || 'produce'}. Escrow locked.`,
          category: 'Deal Acceptance',
          linkTab: 'deal_and_ask',
          unread: true
        });
        alert('🎉 Bargain Accepted! An official AP Mandi Escrow Contract has been locked. The dealer has been notified for pickup and payment.');
      } else {
        notificationService.addNotification({
          roleTarget: 'dealer',
          title: `❌ Deal Declined by Farmer`,
          desc: `Farmer declined offer of ₹${Number(enq?.dealer_price || 18000).toLocaleString()}/Q for ${enq?.crop_name || 'produce'}.`,
          category: 'Bargain Update',
          linkTab: 'deal_and_ask',
          unread: true
        });
        alert('Decline recorded. Dealer has been notified.');
      }
    } catch {
      setEnquiries((prev) =>
        prev.map((item) => (String(item.id) === String(enqId) ? { ...item, status } : item))
      );
    }
  };

  const handleSendCounter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counterPrice || !counterEnquiry) return;
    setEnquiries((prev) =>
      prev.map((item) =>
        item.id === counterEnquiry.id
          ? {
              ...item,
              asking_price: Number(counterPrice),
              notes: `Farmer Counter-Offer: ₹${Number(counterPrice).toLocaleString()} / Q requested.`
            }
          : item
      )
    );
    setCounterModalOpen(false);
    alert(`Counter-offer of ₹${Number(counterPrice).toLocaleString()} / Q submitted to ${counterEnquiry.dealer_name}!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Official Hero Banner - Solid Dark Green (No Glassmorphism) */}
      <div className="rounded-3xl bg-[#062c1e] p-6 lg:p-8 text-white shadow-xl border-2 border-[#0e4b34]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e4b34] border border-[#166544] text-emerald-300 text-xs font-bold">
              <Sparkles size={13} className="text-amber-400" />
              <span>Rythu Bharosa Kendra (RBK) Verified Portal</span>
              <span className="text-emerald-500">•</span>
              <span className="text-white font-black">{district} District</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
              Farmer Harvest &amp; Mandi Bargaining Hub
            </h1>

            <p className="text-emerald-100/90 text-xs lg:text-sm leading-relaxed font-medium">
              Sell your crop directly to certified AP mandi dealers at transparent modal rates. 
              Zero middleman commissions, guaranteed instant RTGS payments backed by AP Civil Supplies Escrow.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-emerald-200">
              <div className="flex items-center gap-1.5 bg-[#0a3a28] border border-[#145a3c] px-3 py-1.5 rounded-xl font-semibold">
                <ShieldCheck size={15} className="text-emerald-400" />
                <span>Govt MSP Safety Net</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0a3a28] border border-[#145a3c] px-3 py-1.5 rounded-xl font-semibold">
                <BadgeCheck size={15} className="text-emerald-400" />
                <span>RBK Quality Certification</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0a3a28] border border-[#145a3c] px-3 py-1.5 rounded-xl font-semibold">
                <IndianRupee size={15} className="text-emerald-400" />
                <span>Zero Brokerage Fee</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => setPublishModalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-400 hover:bg-emerald-300 text-[#041d14] font-black text-xs rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle size={17} />
              <span>+ Publish New Produce</span>
            </button>

            <button
              onClick={() => alert('Transport will be booked by the dealer after your deal acceptance. You will receive an SMS when a captain is assigned to pick up your produce.')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0e4b34] border border-[#1a6e4b] text-white text-xs font-bold rounded-xl opacity-70 cursor-default"
            >
              <Truck size={16} className="text-amber-300" />
              <span>🚜 Transport Booked by Dealer</span>
            </button>

            <button
              onClick={() => alert("Connecting to Rythu 1902 Support Desk...")}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0a3a28] hover:bg-[#0f4f38] border border-[#166544] text-emerald-200 hover:text-white text-xs font-bold rounded-xl transition-all"
            >
              <Phone size={13} className="text-amber-400" />
              <span>Helpline 1902</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">My Active Lots</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sprout size={16} />
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900">{myListings.length} Lots</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live across 26 AP Mandis
            </p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Live Dealer Bargains</span>
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <IndianRupee size={16} />
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900">{enquiries.length} Offers</h3>
            <p className="text-[11px] font-bold text-amber-600 mt-1">
              Immediate Cash Settlement
            </p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">{district} Modal Rate</span>
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp size={16} />
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900">₹18,500 <span className="text-xs font-normal text-slate-400">/ Q</span></h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight size={13} />
              +4.8% above Minimum Support Price
            </p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Escrow Protected</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck size={16} />
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900">100% Safe</h3>
            <p className="text-[11px] font-bold text-slate-500 mt-1">
              AP Civil Supplies Dept DBT
            </p>
          </div>
        </div>
      </div>

      {/* Farmer Portal View Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveFarmerTab('listings')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeFarmerTab === 'listings'
              ? 'bg-[#062419] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sprout size={15} />
          <span>Harvest Lots &amp; Mandi Offers ({myListings.length} Lots, {enquiries.length} Bids)</span>
        </button>

        <button
          className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 bg-white text-slate-400 border border-dashed border-slate-200 cursor-default"
          title="Transport is booked by the dealer after deal acceptance"
        >
          <Truck size={15} className="text-slate-300" />
          <span>🚛 Transport Tracking ({dealerBookedTransports.length} Active)</span>
          <span className="text-[10px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full font-normal">Booked by Dealer</span>
        </button>
      </div>

      {/* Content based on active tab */}
      {activeFarmerTab === 'listings' && (
        <>
          {/* 3. 1-Click Fast Harvest Launcher Banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 rounded-2xl p-4 border border-emerald-200/70 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Tag size={18} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Quick Publish Harvest by Crop</h3>
                <p className="text-[11px] text-slate-500">Select your crop to auto-fill current mandi benchmark price</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {QUICK_CROPS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleSelectQuickCrop(c)}
                  className="px-3 py-1.5 bg-white hover:bg-emerald-700 hover:text-white border border-emerald-200/80 rounded-xl text-xs font-bold text-slate-800 transition-all flex items-center gap-1.5 shadow-2xs group"
                >
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                  <span className="text-[10px] text-emerald-600 group-hover:text-emerald-200">
                    (₹{c.defaultRate.toLocaleString()})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Main 2-Column Split: Active Harvests vs Live Dealer Bargain Proposals */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 6 Cols: My Published Harvest Lots */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Sprout size={16} />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-slate-900">
                        My Active Harvest Listings
                      </h2>
                      <p className="text-[11px] text-slate-400">
                        {myListings.length} crops currently visible to all AP registered buyers
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setPublishModalOpen(true)}
                    className="px-3 py-1.5 bg-[#062419] hover:bg-[#093324] text-white rounded-xl text-xs font-bold transition-all"
                  >
                    + New Crop
                  </button>
                </div>

                <div className="space-y-4">
                  {myListings.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 rounded-2xl transition-all duration-200 space-y-3"
                    >
                      <div className="flex items-start gap-3.5">
                        <img
                          src={item.image}
                          alt={item.crop_name}
                          className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1595188812674-d4f3b610c436?q=80&w=600&auto=format&fit=crop';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm font-black text-slate-900 truncate">
                              {item.crop_name}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-200 shrink-0">
                              LIVE ON MANDI
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 mt-0.5">
                            Variety: <span className="font-semibold text-slate-700">{item.variety}</span>
                          </p>

                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                              {item.grade}
                            </span>
                            {item.inspection_requested === 1 && (
                              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 flex items-center gap-1">
                                <ShieldCheck size={11} />
                                <span>RBK Inspected</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                        <div>
                          <p className="text-[10px] text-slate-400">Available Volume</p>
                          <p className="font-black text-slate-900">{item.quantity_quintals} Q</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400">Asking Price</p>
                          <p className="font-black text-emerald-700">₹{Number(item.price).toLocaleString()} / Q</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400">Mandi Inquiries</p>
                          <p className="font-black text-blue-600">{item.bids} Dealer Bids</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Live Dealer Bargain Proposals */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <IndianRupee size={16} />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-slate-900">
                        Dealer Purchase Proposals &amp; Bargains
                      </h2>
                      <p className="text-[11px] text-slate-400">
                        Direct offers from certified AP traders for your produce
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                    {enquiries.filter((e) => e.status === 'pending').length} Active
                  </span>
                </div>

                <div className="space-y-4">
                  {enquiries.map((enq) => {
                    const diff = enq.dealer_price - (enq.asking_price || 18500);
                    const diffPct = Math.round((diff / (enq.asking_price || 18500)) * 100);

                    return (
                      <div
                        key={enq.id}
                        className="p-5 bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl shadow-2xs space-y-4 transition-all"
                      >
                        {/* Dealer Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xs font-black text-slate-900">{enq.dealer_name}</h3>
                              <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-mono font-bold rounded">
                                {enq.dealer_id}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                              <span>Target Crop: <strong>{enq.crop_name}</strong></span>
                              <span>•</span>
                              <span>{enq.proposed_qty} Quintals</span>
                            </p>
                          </div>

                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              enq.status === 'accepted'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : enq.status === 'declined'
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : 'bg-amber-100 text-amber-900 border border-amber-300'
                            }`}
                          >
                            {enq.status}
                          </span>
                        </div>

                        {/* Price Breakdown */}
                        <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded-xl border border-slate-200/80 text-xs">
                          <div>
                            <p className="text-[10px] text-slate-400">Your Asking Price</p>
                            <p className="font-bold text-slate-700 mt-0.5">
                              ₹{Number(enq.asking_price || 18500).toLocaleString()} / Q
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400">Dealer Offer Price</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <p className="font-black text-emerald-700 text-sm">
                                ₹{Number(enq.dealer_price).toLocaleString()} / Q
                              </p>
                              <span
                                className={`text-[10px] font-bold ${
                                  diff >= 0 ? 'text-emerald-600' : 'text-rose-600'
                                }`}
                              >
                                {diff >= 0 ? `+₹${diff}` : `-₹${Math.abs(diff)}`} ({diffPct}%)
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Dealer Notes & Escrow */}
                        <div className="space-y-1.5 text-xs text-slate-600">
                          <p className="text-[11px] italic bg-slate-100/60 p-2.5 rounded-xl border border-slate-200/50">
                            &ldquo;{enq.notes}&rdquo;
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-emerald-700 font-semibold pt-1">
                            <ShieldCheck size={13} />
                            <span>{enq.payment_type}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-1 space-y-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedDealForReview(enq);
                              setDealReviewModalOpen(true);
                            }}
                            className="w-full py-2 px-3 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                          >
                            <Handshake size={14} className="text-emerald-600" />
                            <span>Review Full Contract &amp; Escrow Guarantee (సమీక్షించండి)</span>
                          </button>

                          {enq.status === 'pending' && (
                            <div className="grid grid-cols-3 gap-2">
                              <button
                                onClick={() => handleEnquiryAction(enq.id, 'accepted')}
                                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black shadow-xs transition-all"
                              >
                                <CheckCircle2 size={14} />
                                <span>Accept (అంగీకరించు)</span>
                              </button>

                              <button
                                onClick={() => {
                                  setCounterEnquiry(enq);
                                  setCounterPrice(String(enq.dealer_price + 400));
                                  setCounterModalOpen(true);
                                }}
                                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold transition-all"
                              >
                                <span>Counter (ధర మార్చు)</span>
                              </button>

                              <button
                                onClick={() => handleEnquiryAction(enq.id, 'declined')}
                                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-rose-50 border border-slate-200 text-rose-600 rounded-xl text-xs font-bold transition-all"
                              >
                                <XCircle size={14} />
                                <span>Decline (తిరస్కరించు)</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {enq.status === 'accepted' && (
                          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                              <span>Deal Locked! Dealer Phone: <strong>+91 {enq.dealer_mobile}</strong></span>
                            </div>
                            <button
                              onClick={() => alert(`Dialing dealer: +91 ${enq.dealer_mobile}`)}
                              className="px-3 py-1 bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1"
                            >
                              <Phone size={12} />
                              <span>Call Dealer</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}


      {/* Dealer-Booked Transport Tracking Panel */}
      {dealerBookedTransports.length > 0 && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-200 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Truck size={15} className="text-emerald-700" />
                <h2 className="text-sm font-black text-slate-900">
                  Transport Dispatched by Your Dealer
                </h2>
              </div>
              <p className="text-xs text-slate-400">
                The dealer has arranged freight pickup — track your shipment below
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full border border-emerald-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Tracking
            </span>
          </div>

          <div className="space-y-4">
            {dealerBookedTransports.map((b) => (
              <div
                key={b.id}
                className="p-5 bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🚚</span>
                      <h3 className="text-xs font-black text-slate-900">{b.vehicle}</h3>
                      <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-mono font-bold rounded">
                        {b.regNo}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Job ID: <strong className="text-slate-700">{b.id}</strong> • Produce: <strong>{b.quintals} Q of {b.crop}</strong>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Arranged by: <strong className="text-emerald-700">{b.dealerName}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full border border-emerald-300">
                      {b.status}
                    </span>
                  </div>
                </div>

                {/* OTP and Route Pill */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 bg-emerald-950 text-white rounded-2xl border border-emerald-800">
                  <div>
                    <span className="text-[10px] text-emerald-300 font-semibold uppercase">6-Digit Delivery OTP</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <KeyRound size={16} className="text-amber-400" />
                      <span className="font-mono text-xl font-black text-amber-300 tracking-widest">{b.otp}</span>
                    </div>
                    <p className="text-[9px] text-emerald-200/70 mt-0.5">Give to driver after produce is loaded at your farm</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-emerald-300 font-semibold uppercase">Assigned Captain</span>
                    <p className="font-bold text-xs text-white mt-0.5">{b.driverName}</p>
                    <p className="text-[11px] text-emerald-300 font-mono mt-0.5">+91 {b.driverPhone}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                  <div className="text-slate-600 space-y-0.5">
                    <p className="flex items-center gap-1.5 text-[11px]">
                      <MapPin size={12} className="text-slate-400" />
                      <span>From: <strong>{b.pickup}</strong> → To: <strong>{b.destination}</strong></span>
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px]">
                      <Clock size={12} className="text-slate-400" />
                      <span>Slot: {b.dateSlot}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Calling assigned captain: +91 ${b.driverPhone}`)}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
                    >
                      <Phone size={13} />
                      <span>Call Captain</span>
                    </button>
                    <button
                      onClick={() => alert(`Live GPS Tracking for vehicle ${b.regNo}: Captain is on SH-48, 4.2 km from your farm. ETA: 12 min.`)}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs border border-slate-200 flex items-center gap-1.5"
                    >
                      <MapPin size={13} />
                      <span>Live GPS</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* 5. Publish Produce Modal */}
      {publishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-700">
                  <Sprout size={20} />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900">
                    Publish Produce to Mandi Network
                  </h2>
                  <p className="text-xs text-slate-400">
                    Broadcast direct to verified AP dealers &amp; processing mills
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPublishModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePublishSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Crop Name</label>
                <input
                  type="text"
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  placeholder="e.g. Guntur Sannam Chilli, Duggirala Turmeric..."
                  className="w-full font-bold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Variety / Grade</label>
                  <input
                    type="text"
                    value={newVariety}
                    onChange={(e) => setNewVariety(e.target.value)}
                    className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Quantity (Quintals)</label>
                  <input
                    type="number"
                    value={newQty}
                    onChange={(e) => setNewQty(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full font-black text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-700">Asking Price (₹ / Quintal)</label>
                  <span className="text-[10px] text-emerald-600 font-bold">
                    Suggested: ₹18,500/Q (Modal Rate)
                  </span>
                </div>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="e.g. 18500"
                  className="w-full font-black text-base bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white"
                  required
                />
              </div>

              <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="reqInspection"
                  checked={reqInspection}
                  onChange={(e) => setReqInspection(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-500"
                />
                <label htmlFor="reqInspection" className="text-[11px] text-emerald-950 font-semibold cursor-pointer">
                  Request Free RBK Quality Grade Certificate
                  <span className="block text-[10px] font-normal text-emerald-800">
                    An Agriculture Officer from your local Rythu Bharosa Kendra will inspect and tag your crop within 24 hours.
                  </span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPublishModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPublishing}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-extrabold rounded-xl shadow-md"
                >
                  {isPublishing ? 'Broadcasting...' : 'Publish to AP Mandi Network'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Counter-Offer Modal */}
      {counterModalOpen && counterEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Submit Counter-Offer</h3>
              <button onClick={() => setCounterModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Dealer offered <strong>₹{counterEnquiry.dealer_price.toLocaleString()}/Q</strong> for {counterEnquiry.crop_name}. What is your counter asking rate?
            </p>

            <form onSubmit={handleSendCounter} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Counter Price (₹ / Q)</label>
                <input
                  type="number"
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(e.target.value)}
                  className="w-full text-base font-black p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCounterModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 text-white font-bold rounded-xl text-xs"
                >
                  Send Counter Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Professional Deal Proposal Review Modal (Farmer View) */}
      {dealReviewModalOpen && selectedDealForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150 space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#062419] to-emerald-800 text-white flex items-center justify-center text-xl shadow-md">
                  🤝
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-slate-900 text-base">
                      Mandi Deal Proposal &amp; Escrow Contract
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                      {selectedDealForReview.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    రైతు బేరసారాలు • Official Procurement Offer from Verified Mandi Trader
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDealReviewModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Dealer Identity & Verification Card */}
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-emerald-700" />
                  <span className="font-black text-xs text-slate-900">{selectedDealForReview.dealer_name}</span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full">
                    <BadgeCheck size={10} />
                    <span>AP Verified Trader</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  License: <strong className="font-mono text-slate-700">{selectedDealForReview.dealer_id}</strong> • Mobile: <strong className="font-mono text-slate-700">+91 {selectedDealForReview.dealer_mobile}</strong>
                </p>
              </div>
              <span className="text-2xl">🏛️</span>
            </div>

            {/* Crop & Rate Financial Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Target Crop</span>
                <p className="font-black text-slate-900 mt-0.5 text-xs">{selectedDealForReview.crop_name}</p>
                <p className="text-[10px] text-slate-500">{selectedDealForReview.proposed_qty || selectedDealForReview.crop_qty || 150} Quintals</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Your Asking Rate</span>
                <p className="font-bold text-slate-700 mt-0.5 text-xs">
                  ₹{Number(selectedDealForReview.asking_price || 18500).toLocaleString()}/Q
                </p>
                <span className="text-[10px] text-slate-400">Original lot price</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-800 font-bold uppercase">Dealer Offered Rate</span>
                <p className="font-black text-emerald-800 mt-0.5 text-sm">
                  ₹{Number(selectedDealForReview.dealer_price).toLocaleString()}/Q
                </p>
                <span className="text-[10px] font-bold text-emerald-700">Ready for instant lock</span>
              </div>
            </div>

            {/* Total Farmer Payout Highlight */}
            <div className="p-4 bg-gradient-to-r from-[#062419] to-[#0b422e] text-white rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <p className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider">
                  Total Payout to Your Bank Account (రైతు ఖాతాకు జమ)
                </p>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  ₹{(Number(selectedDealForReview.dealer_price) * Number(selectedDealForReview.proposed_qty || selectedDealForReview.crop_qty || 150)).toLocaleString()}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck size={11} className="text-emerald-400" />
                  <span>100% Escrow Protected</span>
                </span>
                <p className="text-[9px] text-emerald-300/80 mt-1">Direct RTGS on Weighment</p>
              </div>
            </div>

            {/* Dealer Note / Terms */}
            {selectedDealForReview.notes && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Trader Procurement Notes:</span>
                <p className="italic text-[11px]">&ldquo;{selectedDealForReview.notes}&rdquo;</p>
              </div>
            )}

            {/* Status Actions */}
            {selectedDealForReview.status === 'pending' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  onClick={() => handleEnquiryAction(selectedDealForReview.id, 'accepted')}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <CheckCircle2 size={16} />
                  <span>Accept Deal (అంగీకరించు)</span>
                </button>

                <button
                  onClick={() => {
                    setCounterEnquiry(selectedDealForReview);
                    setCounterPrice(String(selectedDealForReview.dealer_price + 400));
                    setDealReviewModalOpen(false);
                    setCounterModalOpen(true);
                  }}
                  className="w-full py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Counter (ధర మార్చు)</span>
                </button>

                <button
                  onClick={() => handleEnquiryAction(selectedDealForReview.id, 'declined')}
                  className="w-full py-3 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <XCircle size={16} />
                  <span>Decline (తిరస్కరించు)</span>
                </button>
              </div>
            ) : selectedDealForReview.status === 'accepted' ? (
              <div className="space-y-3">
                <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-black text-emerald-900">
                        Deal Confirmed &amp; AP Escrow Locked!
                      </p>
                      <p className="text-[11px] text-emerald-700">
                        Dealer Contact: <strong>+91 {selectedDealForReview.dealer_mobile}</strong>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Connecting to dealer +91 ${selectedDealForReview.dealer_mobile}...`)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
                  >
                    <Phone size={13} />
                    <span>Call Dealer Now</span>
                  </button>
                </div>
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-2.5">
                  <Truck size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-blue-900">
                    <p className="font-black">Transport will be arranged by the dealer 🚛</p>
                    <p className="font-normal mt-0.5">
                      The dealer will post a freight job on the AP Captain Network. A verified truck captain near your farm will accept and arrive for pickup. You will get an SMS notification with the driver's name and ETA.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-center text-xs text-rose-700 font-bold">
                This deal proposal was declined. The lot remains open for other AP mandi traders.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
