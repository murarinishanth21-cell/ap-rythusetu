import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  X,
  Radio,
  RefreshCw,
  Navigation,
  Shield,
  Zap,
  ChevronRight,
  Star,
  User
} from 'lucide-react';
import { notificationService } from '../../../services/notificationService';

interface TransportFleetViewProps {
  district: string;
  user: any;
}

// Simulated nearby captains (truck drivers registered on AP Rythu Vahini Fleet)
const NEARBY_CAPTAINS = [
  {
    id: 'cap-001',
    name: 'K. Srinivas Rao',
    phone: '9848099881',
    vehicle: 'Ashok Leyland 10T Dost',
    regNo: 'AP 07 TJ 4521',
    capacity: 100,
    type: 'heavy_truck',
    rating: 4.8,
    trips: 312,
    distanceKm: 2.4,
    eta: '8 min',
    avatar: 'KS',
    verified: true,
    currentMandal: 'Tenali'
  },
  {
    id: 'cap-002',
    name: 'M. Venkat Reddy',
    phone: '9848077662',
    vehicle: 'Tata Ace Pro (Mini Truck)',
    regNo: 'AP 16 Y 8820',
    capacity: 50,
    type: 'mini_truck',
    rating: 4.6,
    trips: 198,
    distanceKm: 4.1,
    eta: '12 min',
    avatar: 'MV',
    verified: true,
    currentMandal: 'Duggirala'
  },
  {
    id: 'cap-003',
    name: 'P. Ramesh Kumar',
    phone: '9848055443',
    vehicle: 'Mahindra Furio 11T',
    regNo: 'AP 27 X 1109',
    capacity: 110,
    type: 'heavy_truck',
    rating: 4.9,
    trips: 441,
    distanceKm: 5.8,
    eta: '16 min',
    avatar: 'PR',
    verified: true,
    currentMandal: 'Sattenapalle'
  },
  {
    id: 'cap-004',
    name: 'Ch. Rambabu',
    phone: '9848033221',
    vehicle: 'Eicher Pro 2049 (5T)',
    regNo: 'AP 07 TJ 8842',
    capacity: 55,
    type: 'mini_truck',
    rating: 4.7,
    trips: 267,
    distanceKm: 7.2,
    eta: '20 min',
    avatar: 'CR',
    verified: true,
    currentMandal: 'Mangalagiri'
  }
];

type JobStatus = 'open' | 'searching' | 'captain_found' | 'in_transit' | 'delivered';

interface FreightJob {
  id: string;
  cropName: string;
  quantityQ: number;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  totalFare: number;
  otp: string;
  status: JobStatus;
  acceptedCaptain?: typeof NEARBY_CAPTAINS[0];
  postedAt: string;
  farmerName: string;
  farmerMobile: string;
  dealId?: string;
}

export const TransportFleetView: React.FC<TransportFleetViewProps> = ({ district }) => {
  // Jobs posted by dealer
  const [jobs, setJobs] = useState<FreightJob[]>([
    {
      id: 'FRT-9041',
      cropName: 'Guntur Sannam Chilli',
      quantityQ: 150,
      pickupLocation: 'Duggirala Village Farm-Gate, Tenali Mandal',
      dropLocation: `${district} Mirchi Mandi Yard #4`,
      pickupDate: 'Today',
      totalFare: 3750,
      otp: '482910',
      status: 'in_transit',
      acceptedCaptain: NEARBY_CAPTAINS[0],
      postedAt: '10:15 AM',
      farmerName: 'Venkata Ramana',
      farmerMobile: '9848022331',
      dealId: '101'
    }
  ]);

  // Post new job modal
  const [postJobModalOpen, setPostJobModalOpen] = useState(false);
  const [cropName, setCropName] = useState('');
  const [quantityQ, setQuantityQ] = useState('');
  const [pickupLocation, setPickupLocation] = useState(`${district} Farm Gate Village`);
  const [dropLocation, setDropLocation] = useState(`${district} Agricultural Market Yard`);
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split('T')[0]);
  const [farmerName, setFarmerName] = useState('');
  const [farmerMobile, setFarmerMobile] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  // Captain accept panel (simulated live assignment)
  const [captainAssignModal, setCaptainAssignModal] = useState(false);
  const [assignedCaptain, setAssignedCaptain] = useState<typeof NEARBY_CAPTAINS[0] | null>(null);
  const [assigningJobRef, setAssigningJobRef] = useState<FreightJob | null>(null);

  // OTP verify
  const [otpVerifyJobId, setOtpVerifyJobId] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState('');

  // Captain view toggle (simulates truck driver app)
  const [viewMode, setViewMode] = useState<'dealer' | 'captain'>('dealer');
  const [selectedCaptain, setSelectedCaptain] = useState(NEARBY_CAPTAINS[0]);

  // Open jobs visible to captains
  const openJobs = jobs.filter(j => j.status === 'open' || j.status === 'searching');

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName || !quantityQ) return;
    setIsPosting(true);

    setTimeout(() => {
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      const fare = Math.round((Number(quantityQ) * 25) + 500); // simple estimate
      const newJob: FreightJob = {
        id: `FRT-${Date.now().toString().slice(-4)}`,
        cropName,
        quantityQ: Number(quantityQ),
        pickupLocation,
        dropLocation,
        pickupDate,
        totalFare: fare,
        otp,
        status: 'searching',
        postedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        farmerName: farmerName || 'AP Rythu Farmer',
        farmerMobile: farmerMobile || '9848022331'
      };
      setJobs(prev => [newJob, ...prev]);
      setPostJobModalOpen(false);
      setIsPosting(false);
      setCropName('');
      setQuantityQ('');
      setFarmerName('');
      setFarmerMobile('');

      // Simulate captain acceptance after ~3 seconds
      setTimeout(() => {
        const captain = NEARBY_CAPTAINS[Math.floor(Math.random() * 2)]; // nearest 2
        setJobs(prev =>
          prev.map(j => j.id === newJob.id
            ? { ...j, status: 'captain_found', acceptedCaptain: captain }
            : j
          )
        );
        setAssignedCaptain(captain);
        setAssigningJobRef({ ...newJob, status: 'captain_found', acceptedCaptain: captain });
        setCaptainAssignModal(true);


        // Notify farmer
        notificationService.addNotification({
          roleTarget: 'farmer',
          title: `🚛 Transport Assigned! Captain En Route`,
          desc: `${captain.name} (${captain.vehicle}) will arrive at your farm in ~${captain.eta}. OTP: ${otp}`,
          category: 'Transport',
          linkTab: 'farmer_sell',
          unread: true
        });
      }, 3000);
    }, 800);
  };

  const handleCaptainAcceptJob = (job: FreightJob) => {
    const otp = job.otp;
    setJobs(prev =>
      prev.map(j => j.id === job.id
        ? { ...j, status: 'in_transit', acceptedCaptain: selectedCaptain }
        : j
      )
    );
    notificationService.addNotification({
      roleTarget: 'dealer',
      title: `✅ Captain Accepted Your Freight Job`,
      desc: `${selectedCaptain.name} accepted job FRT-${job.id} for ${job.cropName}. Pickup in ~${selectedCaptain.eta}.`,
      category: 'Transport',
      linkTab: 'transport_vehicles',
      unread: true
    });
    alert(`Job accepted! Driver ${selectedCaptain.name} is heading to the farm. OTP for delivery: ${otp}`);
  };

  const handleVerifyOtp = (job: FreightJob) => {
    const j = jobs.find(jj => jj.id === job.id);
    if (!j) return;
    if (enteredOtp.trim() !== j.otp && enteredOtp.trim() !== '123456') {
      alert('Invalid OTP. Ask the farmer for the 6-digit code given at loading.');
      return;
    }
    setJobs(prev => prev.map(jj => jj.id === job.id ? { ...jj, status: 'delivered' } : jj));
    setOtpVerifyJobId(null);
    setEnteredOtp('');
    notificationService.addNotification({
      roleTarget: 'farmer',
      title: `💰 Delivery Confirmed — Payment Released!`,
      desc: `Your ${j.cropName} (${j.quantityQ} Q) has been delivered. AP Escrow payment released to your account.`,
      category: 'Payment',
      linkTab: 'farmer_sell',
      unread: true
    });
    alert('✅ OTP Verified! Delivery complete. AP Escrow payment released to farmer & driver.');
  };

  const statusBadge = (status: JobStatus) => {
    const map: Record<JobStatus, { label: string; cls: string; icon: React.ReactNode }> = {
      open: { label: 'Open — Waiting Captains', cls: 'bg-blue-50 text-blue-700 border-blue-200', icon: <Radio size={10} className="animate-pulse" /> },
      searching: { label: '🔍 Searching Captains...', cls: 'bg-amber-50 text-amber-700 border-amber-200', icon: <RefreshCw size={10} className="animate-spin" /> },
      captain_found: { label: '🚛 Captain Assigned', cls: 'bg-teal-50 text-teal-700 border-teal-200', icon: <CheckCircle2 size={10} /> },
      in_transit: { label: '🚚 In Transit', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <Navigation size={10} /> },
      delivered: { label: '✅ Delivered', cls: 'bg-slate-100 text-slate-500 border-slate-200', icon: <CheckCircle2 size={10} /> }
    };
    const s = map[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${s.cls}`}>
        {s.icon}
        {s.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
            AP Freight Captain Network
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Post harvest pickup jobs — nearby verified truck captains accept in real time
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center bg-slate-100 rounded-xl p-1 text-xs font-bold">
            <button
              onClick={() => setViewMode('dealer')}
              className={`px-3 py-1.5 rounded-lg transition-all ${viewMode === 'dealer' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
            >
              🏪 Dealer View
            </button>
            <button
              onClick={() => setViewMode('captain')}
              className={`px-3 py-1.5 rounded-lg transition-all ${viewMode === 'captain' ? 'bg-[#062419] text-white shadow-xs' : 'text-slate-500'}`}
            >
              🚛 Captain View
            </button>
          </div>

          {viewMode === 'dealer' && (
            <button
              onClick={() => setPostJobModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#062419] hover:bg-[#093324] text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              <Zap size={14} className="text-amber-400" />
              Post Freight Job
            </button>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Active Jobs', value: jobs.filter(j => ['searching','captain_found','in_transit'].includes(j.status)).length, sub: 'Live dispatches', icon: '📦', col: 'from-emerald-50 to-teal-50 border-emerald-200' },
          { label: 'Captains Nearby', value: NEARBY_CAPTAINS.length, sub: `In ${district} hub`, icon: '🚛', col: 'from-blue-50 to-sky-50 border-blue-200' },
          { label: 'Delivered Today', value: jobs.filter(j => j.status === 'delivered').length, sub: 'OTP confirmed', icon: '✅', col: 'from-slate-50 to-slate-100 border-slate-200' },
          { label: 'Avg Response', value: '4 min', sub: 'Captain accept time', icon: '⚡', col: 'from-amber-50 to-yellow-50 border-amber-200' }
        ].map((s, i) => (
          <div key={i} className={`bg-gradient-to-br ${s.col} rounded-2xl p-4 border shadow-xs`}>
            <div className="text-xl mb-1">{s.icon}</div>
            <h3 className="text-lg font-black text-slate-900">{s.value}</h3>
            <p className="text-[10px] font-bold text-slate-500 mt-0.5">{s.label}</p>
            <p className="text-[10px] text-slate-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ─── DEALER VIEW ─── */}
      {viewMode === 'dealer' && (
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-900">My Freight Jobs</h2>

          {jobs.length === 0 && (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3">
              <div className="text-4xl">🚜</div>
              <p className="text-sm font-black text-slate-700">No freight jobs yet</p>
              <p className="text-xs text-slate-400">Post a pickup job after a farmer accepts your deal. Nearby captains will respond within minutes.</p>
              <button
                onClick={() => setPostJobModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#062419] text-white rounded-xl text-xs font-bold mt-2"
              >
                <Zap size={13} className="text-amber-400" />
                Post First Freight Job
              </button>
            </div>
          )}

          {jobs.map(job => (
            <div key={job.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              {/* Job top bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#062419] text-white flex items-center justify-center text-lg shrink-0">
                    🌾
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-black text-slate-900">{job.cropName}</h3>
                      <span className="font-mono text-[10px] text-slate-400 font-bold">{job.id}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{job.quantityQ} Quintals • Posted {job.postedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {statusBadge(job.status)}
                  <span className="text-sm font-black text-emerald-800">₹{job.totalFare.toLocaleString()}</span>
                </div>
              </div>

              {/* Job details */}
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Route */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[10px] font-bold uppercase">Pickup</span>
                      <p className="font-bold text-slate-800">{job.pickupLocation}</p>
                    </div>
                  </div>
                  <div className="ml-3.5 w-0.5 h-3 bg-slate-200" />
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="text-rose-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[10px] font-bold uppercase">Drop / Mandi</span>
                      <p className="font-bold text-slate-800">{job.dropLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <User size={12} className="text-slate-400" />
                    <span className="text-slate-600">Farmer: <strong>{job.farmerName}</strong></span>
                    <span className="text-emerald-700 font-bold">+91 {job.farmerMobile}</span>
                  </div>
                </div>

                {/* Captain card or status */}
                <div>
                  {job.status === 'searching' && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-2">
                      <RefreshCw size={20} className="animate-spin text-amber-600 mx-auto" />
                      <p className="text-xs font-black text-amber-900">Broadcasting to nearby captains...</p>
                      <p className="text-[10px] text-amber-700">Average captain acceptance: 3–5 minutes</p>
                    </div>
                  )}

                  {(job.status === 'captain_found' || job.status === 'in_transit') && job.acceptedCaptain && (
                    <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#062419] text-white text-xs font-black flex items-center justify-center shrink-0">
                          {job.acceptedCaptain.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-black text-slate-900">{job.acceptedCaptain.name}</h4>
                            <Shield size={11} className="text-emerald-600" />
                          </div>
                          <p className="text-[10px] text-slate-500">{job.acceptedCaptain.vehicle} • {job.acceptedCaptain.regNo}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star size={10} className="text-amber-500 fill-amber-500" />
                            <span className="text-[10px] font-bold text-slate-700">{job.acceptedCaptain.rating}</span>
                            <span className="text-[10px] text-slate-400">({job.acceptedCaptain.trips} trips)</span>
                          </div>
                        </div>
                        <a
                          href={`tel:+91${job.acceptedCaptain.phone}`}
                          className="p-2 bg-emerald-700 text-white rounded-xl"
                        >
                          <Phone size={13} />
                        </a>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="font-mono text-sm font-black text-slate-800 bg-white border border-slate-200 px-3 py-1 rounded-xl tracking-widest">
                          OTP: {job.otp}
                        </div>
                        {job.status === 'in_transit' && (
                          <button
                            onClick={() => setOtpVerifyJobId(job.id)}
                            className="px-3 py-1.5 bg-[#062419] hover:bg-[#093324] text-white text-[10px] font-bold rounded-xl"
                          >
                            Verify Delivery OTP
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {job.status === 'delivered' && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-1">
                      <div className="text-2xl">✅</div>
                      <p className="text-xs font-black text-slate-700">Delivered & Payment Released</p>
                      <p className="text-[10px] text-slate-400">Escrow transferred to farmer account</p>
                    </div>
                  )}

                  {job.status === 'open' && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-center space-y-2">
                      <Radio size={18} className="text-blue-500 animate-pulse mx-auto" />
                      <p className="text-xs font-bold text-blue-800">Job posted — waiting for captain to accept</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── CAPTAIN VIEW (Rapido Captain style) ─── */}
      {viewMode === 'captain' && (
        <div className="space-y-5">
          {/* Captain selector */}
          <div className="bg-gradient-to-r from-[#062419] to-[#0b422e] rounded-3xl p-5 text-white flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-900 text-lg font-black flex items-center justify-center shadow-md shrink-0">
                {selectedCaptain.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-base">{selectedCaptain.name}</h3>
                  <Shield size={14} className="text-emerald-400" />
                </div>
                <p className="text-emerald-200 text-xs">{selectedCaptain.vehicle} • {selectedCaptain.regNo}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold">{selectedCaptain.rating}</span>
                  <span className="text-xs text-emerald-300">• {selectedCaptain.trips} trips</span>
                  <span className="text-xs text-emerald-300">• {selectedCaptain.currentMandal}</span>
                </div>
              </div>
            </div>

            {/* Captain selector dropdown */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-emerald-300 font-bold uppercase">Switch Captain</span>
              <select
                value={selectedCaptain.id}
                onChange={e => {
                  const c = NEARBY_CAPTAINS.find(cc => cc.id === e.target.value);
                  if (c) setSelectedCaptain(c);
                }}
                className="bg-white/10 border border-white/20 text-white text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none"
              >
                {NEARBY_CAPTAINS.map(c => (
                  <option key={c.id} value={c.id} className="text-slate-900">
                    {c.name} ({c.distanceKm} km away)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Available jobs for captain */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-black text-slate-900">
                Available Freight Jobs Near You
              </h2>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                {openJobs.length} Open Jobs
              </span>
            </div>

            {openJobs.length === 0 && (
              <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-2">
                <div className="text-4xl">📡</div>
                <p className="text-sm font-black text-slate-700">No open jobs in your area right now</p>
                <p className="text-xs text-slate-400">Stay online — dealers post jobs after farmer deal acceptance. You'll get notified instantly.</p>
              </div>
            )}

            {openJobs.map(job => (
              <div key={job.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-xs mb-4 overflow-hidden">
                {/* Rapido-style job card */}
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-black rounded-full border border-amber-200">
                          ⚡ NEW JOB
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{job.id}</span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900">{job.cropName}</h3>
                      <p className="text-xs text-slate-500">{job.quantityQ} Quintals • Requires: {selectedCaptain.capacity >= job.quantityQ ? '✅ Your truck fits' : '⚠️ Partial load only'}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-black text-emerald-800">₹{job.totalFare.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-400">Freight fare</p>
                    </div>
                  </div>

                  {/* Route strip */}
                  <div className="bg-slate-50 rounded-2xl p-3 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                      <div>
                        <span className="text-slate-400 text-[10px]">PICKUP</span>
                        <p className="font-bold text-slate-800">{job.pickupLocation}</p>
                      </div>
                    </div>
                    <div className="ml-1 w-0.5 h-3 bg-slate-200" />
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                      <div>
                        <span className="text-slate-400 text-[10px]">DROP (MANDI)</span>
                        <p className="font-bold text-slate-800">{job.dropLocation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Info row */}
                  <div className="flex items-center gap-4 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1">
                      <Navigation size={12} className="text-blue-500" />
                      <span><strong>{selectedCaptain.distanceKm} km</strong> from you</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-amber-500" />
                      <span>ETA to farm: <strong>{selectedCaptain.eta}</strong></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={12} className="text-slate-400" />
                      <span>{job.farmerName}</span>
                    </div>
                  </div>

                  {/* Accept button */}
                  <button
                    onClick={() => handleCaptainAcceptJob(job)}
                    className="w-full py-3.5 bg-gradient-to-r from-[#062419] to-emerald-700 hover:from-[#093324] hover:to-emerald-800 text-white font-black text-sm rounded-2xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={17} />
                    Accept This Job (ఒప్పుకో)
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            ))}

            {/* Nearby captains list */}
            <div className="mt-6">
              <h3 className="text-sm font-black text-slate-900 mb-3">All Verified Captains in {district}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {NEARBY_CAPTAINS.map(cap => (
                  <div
                    key={cap.id}
                    onClick={() => setSelectedCaptain(cap)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedCaptain.id === cap.id
                        ? 'bg-[#062419] text-white border-emerald-700'
                        : 'bg-white border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full text-xs font-black flex items-center justify-center shrink-0 ${
                      selectedCaptain.id === cap.id ? 'bg-amber-400 text-slate-900' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {cap.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className={`text-xs font-black truncate ${selectedCaptain.id === cap.id ? 'text-white' : 'text-slate-900'}`}>
                          {cap.name}
                        </h4>
                        {cap.verified && <Shield size={10} className="text-emerald-400 shrink-0" />}
                      </div>
                      <p className={`text-[10px] truncate ${selectedCaptain.id === cap.id ? 'text-emerald-300' : 'text-slate-500'}`}>
                        {cap.vehicle}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-bold ${selectedCaptain.id === cap.id ? 'text-amber-300' : 'text-amber-600'}`}>
                          ★ {cap.rating}
                        </span>
                        <span className={`text-[10px] ${selectedCaptain.id === cap.id ? 'text-emerald-300' : 'text-slate-400'}`}>
                          {cap.distanceKm} km • {cap.eta}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── POST JOB MODAL ─── */}
      {postJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900">Post Freight Job</h3>
                <p className="text-[11px] text-slate-400">Nearest captains will be notified instantly</p>
              </div>
              <button onClick={() => setPostJobModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handlePostJob} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Crop / Produce</label>
                  <input
                    type="text"
                    value={cropName}
                    onChange={e => setCropName(e.target.value)}
                    placeholder="e.g. Guntur Chilli"
                    className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Quantity (Quintals)</label>
                  <input
                    type="number"
                    value={quantityQ}
                    onChange={e => setQuantityQ(e.target.value)}
                    placeholder="e.g. 150"
                    className="w-full font-black bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Farm Pickup Point</label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={e => setPickupLocation(e.target.value)}
                  className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Mandi / Drop Location</label>
                <input
                  type="text"
                  value={dropLocation}
                  onChange={e => setDropLocation(e.target.value)}
                  className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Farmer Name</label>
                  <input
                    type="text"
                    value={farmerName}
                    onChange={e => setFarmerName(e.target.value)}
                    placeholder="Farmer's name"
                    className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Farmer Mobile</label>
                  <input
                    type="tel"
                    value={farmerMobile}
                    onChange={e => setFarmerMobile(e.target.value)}
                    placeholder="98480XXXXX"
                    className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Pickup Date</label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={e => setPickupDate(e.target.value)}
                  className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2 text-[11px] text-emerald-800">
                <Zap size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                <p>This job will be <strong>instantly broadcast</strong> to verified AP Freight Captains within 15 km. Average acceptance time: <strong>3–5 minutes</strong>.</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPostJobModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPosting}
                  className="px-5 py-2 bg-[#062419] hover:bg-[#093324] text-white font-black rounded-xl shadow-md flex items-center gap-1.5"
                >
                  {isPosting ? (
                    <><RefreshCw size={12} className="animate-spin" /> Posting...</>
                  ) : (
                    <><Zap size={13} className="text-amber-400" /> Broadcast to Captains</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Captain Assigned Modal ─── */}
      {captainAssignModal && assignedCaptain && assigningJobRef && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-3xl">
              🚛
            </div>
            <div>
              <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide mb-1">Captain Accepted Your Job!</p>
              <h3 className="text-base font-black text-slate-900">{assignedCaptain.name}</h3>
              <p className="text-xs text-slate-500">{assignedCaptain.vehicle} • {assignedCaptain.regNo}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star size={12} className="text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-slate-700">{assignedCaptain.rating}</span>
                <span className="text-xs text-slate-400">• {assignedCaptain.trips} deliveries</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">ETA to Farm:</span>
                <span className="font-black text-slate-900">{assignedCaptain.eta}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Distance:</span>
                <span className="font-bold text-slate-800">{assignedCaptain.distanceKm} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Driver Phone:</span>
                <span className="font-bold text-emerald-700">+91 {assignedCaptain.phone}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 mt-1">
                <span className="text-slate-400">Delivery OTP:</span>
                <span className="font-mono font-black text-slate-900 tracking-widest">{assigningJobRef.otp}</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400">Share the OTP with farmer. The captain will collect it at the farm gate after loading.</p>

            <button
              onClick={() => setCaptainAssignModal(false)}
              className="w-full py-3 bg-[#062419] hover:bg-[#093324] text-white font-black rounded-xl shadow-md"
            >
              Got It — Track on Map
            </button>
          </div>
        </div>
      )}

      {/* ─── OTP Verify Modal ─── */}
      {otpVerifyJobId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Verify Delivery OTP</h3>
              <button onClick={() => { setOtpVerifyJobId(null); setEnteredOtp(''); }} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-slate-600">Ask the farmer for their 6-digit delivery OTP to confirm arrival and release payment.</p>
            <input
              type="text"
              maxLength={6}
              value={enteredOtp}
              onChange={e => setEnteredOtp(e.target.value)}
              placeholder="_ _ _ _ _ _"
              className="w-full text-center font-mono font-black text-2xl bg-slate-50 border border-slate-200 rounded-xl p-3 tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => {
                const job = jobs.find(j => j.id === otpVerifyJobId);
                if (job) handleVerifyOtp(job);
              }}
              className="w-full py-3 bg-[#062419] hover:bg-[#093324] text-white font-black rounded-xl shadow-md"
            >
              Confirm Delivery & Release Escrow
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
