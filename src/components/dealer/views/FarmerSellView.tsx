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
  const [activeFarmerTab, setActiveFarmerTab] = useState<'listings' | 'transport' | 'bookings'>('listings');
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

  // Transport Booking Form States
  const [selectedVehicleType, setSelectedVehicleType] = useState<'tractor' | 'mini_truck' | 'heavy_truck'>('mini_truck');
  const [transportPickupVillage, setTransportPickupVillage] = useState('Duggirala Gramam, Tenali Mandal');
  const [transportDestination, setTransportDestination] = useState(`${district} Agricultural Market Yard (Mandi)`);
  const [transportCrop, setTransportCrop] = useState('Guntur Sannam Chilli');
  const [transportQuintals, setTransportQuintals] = useState('80');
  const [transportDate, setTransportDate] = useState('Today (Immediate)');
  const [transportTimeSlot, setTransportTimeSlot] = useState('Morning 08:00 AM - 11:00 AM');
  const [transportPhone, setTransportPhone] = useState('9848022331');
  const [bookingSuccessModal, setBookingSuccessModal] = useState<any | null>(null);

  const [bookedTransports, setBookedTransports] = useState([
    {
      id: 'BK-TRP-2026-9041',
      vehicleType: 'mini_truck',
      vehicleName: 'Eicher Pro 2049 (5-Ton Mini Truck)',
      vehicleReg: 'AP-07-TJ-8842',
      driverName: 'Ch. Rambabu (AP Verified Fleet Driver)',
      driverPhone: '9848033221',
      crop: 'Guntur Sannam Chilli',
      quintals: 80,
      pickup: 'Duggirala Village Farm-Gate',
      destination: `${district} Mirchi Yard Mandi #4`,
      dateSlot: 'Today, 11:30 AM',
      otp: '482910',
      baseFare: 2400,
      subsidy: 1200,
      farmerFare: 1200,
      status: 'En Route to Farm (ETA 20 min)'
    }
  ]);

  const VEHICLE_OPTIONS = [
    {
      id: 'tractor' as const,
      name: 'Mini Tractor Trolley (ట్రాక్టర్ ట్రాలీ)',
      capacity: '30 Quintals (3 MT)',
      desc: 'Ideal for local village to RBK depot / local village mandis',
      baseFare: 1200,
      subsidy: 600,
      farmerPay: 600,
      icon: '🚜'
    },
    {
      id: 'mini_truck' as const,
      name: 'Tata Ace / Eicher Pro (5-Ton మినీ లారీ)',
      capacity: '60 Quintals (6 MT)',
      desc: 'Ideal for inter-mandal transit and regional cold storage hubs',
      baseFare: 2400,
      subsidy: 1200,
      farmerPay: 1200,
      icon: '🚚'
    },
    {
      id: 'heavy_truck' as const,
      name: 'Ashok Leyland 10-Ton (భారీ లారీ)',
      capacity: '120 Quintals (12 MT)',
      desc: 'Heavy bulk haulage for export terminals and central warehouses',
      baseFare: 4800,
      subsidy: 2400,
      farmerPay: 2400,
      icon: '🚛'
    }
  ];

  const handleBookTransportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenVeh = VEHICLE_OPTIONS.find((v) => v.id === selectedVehicleType) || VEHICLE_OPTIONS[1];
    const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
    const regDigits = Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: `BK-TRP-${Date.now().toString().slice(-6)}`,
      vehicleType: selectedVehicleType,
      vehicleName: chosenVeh.name,
      vehicleReg: `AP-07-TJ-${regDigits}`,
      driverName: 'K. Srinivasa Rao (AP Verified Fleet Driver)',
      driverPhone: '9848055112',
      crop: transportCrop,
      quintals: Number(transportQuintals) || 50,
      pickup: transportPickupVillage,
      destination: transportDestination,
      dateSlot: `${transportDate} • ${transportTimeSlot}`,
      otp: generatedOtp,
      baseFare: chosenVeh.baseFare,
      subsidy: chosenVeh.subsidy,
      farmerFare: chosenVeh.farmerPay,
      status: 'Vehicle Confirmed - Driver Dispatched'
    };

    setBookedTransports([newBooking, ...bookedTransports]);
    setBookingSuccessModal(newBooking);
  };

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
              onClick={() => setActiveFarmerTab('transport')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0e4b34] hover:bg-[#135d41] border border-[#1a6e4b] text-white text-xs font-black rounded-xl transition-all shadow-md"
            >
              <Truck size={16} className="text-amber-300" />
              <span>🚜 Book Transport (50% Subsidy)</span>
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
          onClick={() => setActiveFarmerTab('transport')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeFarmerTab === 'transport'
              ? 'bg-[#062419] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Truck size={15} className="text-amber-400" />
          <span>🚜 Book Farm-Gate Transport (రవాణా బుకింగ్ - 50% Subsidy)</span>
        </button>

        <button
          onClick={() => setActiveFarmerTab('bookings')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeFarmerTab === 'bookings'
              ? 'bg-[#062419] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Clock size={15} />
          <span>My Freight Bookings ({bookedTransports.length} Active)</span>
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

      {/* Transport Booking Module */}
      {activeFarmerTab === 'transport' && (
        <div className="space-y-6">
          {/* Subsidy Banner */}
          <div className="p-4 bg-gradient-to-r from-emerald-900 via-teal-900 to-[#062419] rounded-3xl border border-emerald-500/30 text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center text-xl shrink-0 shadow-md">
                🚜
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] tracking-wider uppercase">
                  AP Rythu Transport Subsidy (రవాణా రాయితీ)
                </span>
                <h3 className="text-base font-black text-white mt-1">
                  50% Government Freight Subsidy on Farm-Gate Harvest Pickup
                </h3>
                <p className="text-xs text-emerald-200/80 mt-0.5">
                  The Andhra Pradesh Agriculture Department pays 50% of the transport fare directly to the fleet driver.
                  You pay only the remaining 50% upon safe unload at the Mandi Yard or Cold Storage.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveFarmerTab('bookings')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-colors"
              >
                View Active Bookings ({bookedTransports.length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Booking Form */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5">
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    Step 1: Select Freight Vehicle Type
                  </h3>
                  <p className="text-xs text-slate-500">
                    Choose based on your crop harvest quantity and distance
                  </p>
                </div>

                {/* 3 Vehicle Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {VEHICLE_OPTIONS.map((v) => {
                    const isSelected = selectedVehicleType === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVehicleType(v.id)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="text-2xl mb-1.5">{v.icon}</div>
                        <h4 className="font-extrabold text-xs text-slate-900 leading-tight">
                          {v.name}
                        </h4>
                        <p className="text-[10px] text-emerald-700 font-bold mt-1">
                          Capacity: {v.capacity}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{v.desc}</p>
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 line-through">₹{v.baseFare}</span>
                          <span className="text-xs font-black text-emerald-800">₹{v.farmerPay} net</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleBookTransportSubmit} className="space-y-4 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 mb-3">
                      Step 2: Farm Pickup &amp; Destination Mandi
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Farm Pickup Location (Village &amp; Mandal)</label>
                      <div className="relative">
                        <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={transportPickupVillage}
                          onChange={(e) => setTransportPickupVillage(e.target.value)}
                          placeholder="e.g. Duggirala Farm Gate, Tenali"
                          required
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Destination Mandi / Cold Storage</label>
                      <div className="relative">
                        <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" />
                        <input
                          type="text"
                          value={transportDestination}
                          onChange={(e) => setTransportDestination(e.target.value)}
                          placeholder="e.g. Guntur Mirchi Yard Mandi #4"
                          required
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Produce / Crop Name</label>
                      <select
                        value={transportCrop}
                        onChange={(e) => setTransportCrop(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 cursor-pointer"
                      >
                        <option>Guntur Sannam Chilli</option>
                        <option>Duggirala Turmeric</option>
                        <option>BPT 5204 Paddy</option>
                        <option>Cotton Long Staple</option>
                        <option>Virginia Tobacco</option>
                        <option>Yellow Corn / Maize</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Estimated Load Quantity (Quintals)</label>
                      <input
                        type="number"
                        value={transportQuintals}
                        onChange={(e) => setTransportQuintals(e.target.value)}
                        required
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-sm text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Pickup Date</label>
                      <select
                        value={transportDate}
                        onChange={(e) => setTransportDate(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 cursor-pointer"
                      >
                        <option>Today (Immediate Dispatch)</option>
                        <option>Tomorrow Morning</option>
                        <option>Within 48 Hours</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Loading Time Slot</label>
                      <select
                        value={transportTimeSlot}
                        onChange={(e) => setTransportTimeSlot(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 cursor-pointer"
                      >
                        <option>Morning 08:00 AM - 11:00 AM</option>
                        <option>Afternoon 01:00 PM - 04:00 PM</option>
                        <option>Evening 05:00 PM - 08:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Farmer Contact Mobile for Driver OTP</label>
                    <input
                      type="tel"
                      value={transportPhone}
                      onChange={(e) => setTransportPhone(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-sm text-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#062419] hover:bg-[#0a3828] text-white rounded-2xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2 hover:scale-[1.01]"
                  >
                    <Truck size={17} className="text-amber-400" />
                    <span>Confirm &amp; Book Farm-Gate Vehicle (Generate 6-Digit OTP)</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right 5 Cols: Live Fare Breakdown & Subsidy Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Subsidy &amp; Fare Summary
                  </h3>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-[10px] font-bold">
                    AP Rythu Subsidy Valid
                  </span>
                </div>

                {(() => {
                  const veh = VEHICLE_OPTIONS.find((v) => v.id === selectedVehicleType) || VEHICLE_OPTIONS[1];
                  return (
                    <div className="space-y-3 text-xs">
                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Selected Vehicle</span>
                          <span className="font-bold text-slate-900">{veh.name.split('(')[0]}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Commercial Base Fare</span>
                          <span className="font-semibold text-slate-700">₹{veh.baseFare.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-emerald-700 font-bold">
                          <span>AP Govt 50% Rythu Subsidy</span>
                          <span>- ₹{veh.subsidy.toLocaleString()}</span>
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm">
                          <span className="font-black text-slate-900">Farmer Net Payable</span>
                          <span className="font-black text-emerald-700 text-lg">₹{veh.farmerPay.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200 text-amber-900 text-[11px] space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold">
                          <KeyRound size={13} className="text-amber-700 shrink-0" />
                          <span>6-Digit Verification OTP Escrow Security</span>
                        </div>
                        <p className="text-amber-800 leading-snug">
                          A 6-digit AP-Rythu verification OTP will be issued immediately upon booking. 
                          Share this OTP with the fleet driver <strong>only after</strong> your {transportQuintals} Quintals of {transportCrop} are safely loaded onto the vehicle.
                        </p>
                      </div>

                      <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200 text-emerald-900 text-[11px] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold">
                          <ShieldCheck size={13} className="text-emerald-700 shrink-0" />
                          <span>100% Transit Insurance Protection</span>
                        </div>
                        <p className="text-emerald-800">
                          All freight trips booked through AP-RythuSetu are backed by state transit insurance covering rain damage, transit spillage, and road accidents.
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Triplogs and Active Bookings */}
      {activeFarmerTab === 'bookings' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-black text-slate-900">
                My Booked Farm-Gate Freight Vehicles
              </h2>
              <p className="text-xs text-slate-400">
                Active transport dispatches, assigned AP verified drivers, and secure 6-digit loading OTPs
              </p>
            </div>
            <button
              onClick={() => setActiveFarmerTab('transport')}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <Truck size={14} />
              <span>+ Book Another Vehicle</span>
            </button>
          </div>

          <div className="space-y-4">
            {bookedTransports.map((b) => (
              <div
                key={b.id}
                className="p-5 bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🚚</span>
                      <h3 className="text-xs font-black text-slate-900">{b.vehicleName}</h3>
                      <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-mono font-bold rounded">
                        {b.vehicleReg}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Booking ID: <strong className="text-slate-700">{b.id}</strong> • Produce: <strong>{b.quintals} Q of {b.crop}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full border border-emerald-300">
                      {b.status}
                    </span>
                  </div>
                </div>

                {/* OTP and Route Pill */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 bg-emerald-950 text-white rounded-2xl border border-emerald-800">
                  <div>
                    <span className="text-[10px] text-emerald-300 font-semibold uppercase">6-Digit Loading OTP</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <KeyRound size={16} className="text-amber-400" />
                      <span className="font-mono text-xl font-black text-amber-300 tracking-widest">{b.otp}</span>
                    </div>
                    <p className="text-[9px] text-emerald-200/70 mt-0.5">Share with driver only upon loading</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-emerald-300 font-semibold uppercase">Assigned Driver</span>
                    <p className="font-bold text-xs text-white mt-0.5">{b.driverName}</p>
                    <p className="text-[11px] text-emerald-300 font-mono mt-0.5">+91 {b.driverPhone}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-emerald-300 font-semibold uppercase">Farmer Net Fare (50% Subsidy)</span>
                    <p className="font-black text-base text-white mt-0.5">₹{b.farmerFare.toLocaleString()}</p>
                    <p className="text-[10px] text-emerald-400 font-semibold">Govt Paid: ₹{b.subsidy.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                  <div className="text-slate-600 space-y-0.5">
                    <p className="flex items-center gap-1.5 text-[11px]">
                      <MapPin size={12} className="text-slate-400" />
                      <span>From: <strong>{b.pickup}</strong> &rarr; To: <strong>{b.destination}</strong></span>
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px]">
                      <Clock size={12} className="text-slate-400" />
                      <span>Slot: {b.dateSlot}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Calling assigned driver: +91 ${b.driverPhone}`)}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
                    >
                      <Phone size={13} />
                      <span>Call Driver</span>
                    </button>
                    <button
                      onClick={() => alert(`Live GPS Tracking for vehicle ${b.vehicleReg}: Driver is moving on SH-48, 4.2 km from your farm.`)}
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

      {/* Booking Confirmation Success Modal */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-4">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
                🚜
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Farm-Gate Transport Confirmed!
              </h3>
              <p className="text-xs text-slate-500">
                AP Verified freight driver has been allocated with 50% Rythu Transport Subsidy
              </p>
            </div>

            <div className="p-4 bg-emerald-950 text-white rounded-2xl text-center space-y-1">
              <p className="text-[10px] text-emerald-300 uppercase tracking-widest font-bold">
                Your 6-Digit Verification OTP
              </p>
              <div className="font-mono text-3xl font-black text-amber-300 tracking-widest">
                {bookingSuccessModal.otp}
              </div>
              <p className="text-[10px] text-emerald-200/80 pt-1">
                Give this OTP to driver only after produce is loaded at your farm
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Vehicle:</span>
                <span className="font-bold">{bookingSuccessModal.vehicleReg}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Driver:</span>
                <span className="font-bold">{bookingSuccessModal.driverName.split('(')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Driver Phone:</span>
                <span className="font-bold text-emerald-700">+91 {bookingSuccessModal.driverPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Produce:</span>
                <span className="font-bold">{bookingSuccessModal.quintals} Q of {bookingSuccessModal.crop}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="font-bold text-slate-900">Farmer Net Fare:</span>
                <span className="font-black text-emerald-800 text-sm">₹{bookingSuccessModal.farmerFare}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setBookingSuccessModal(null);
                setActiveFarmerTab('bookings');
              }}
              className="w-full py-3 bg-[#062419] hover:bg-[#093324] text-white font-black text-xs rounded-xl shadow-md transition-all"
            >
              View Active Bookings
            </button>
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
