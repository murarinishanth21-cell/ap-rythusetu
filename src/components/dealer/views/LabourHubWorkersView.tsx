import React, { useState } from 'react';
import {
  Users,
  HardHat,
  Sprout,
  Building2,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  PlusCircle,
  Search,
  ShieldCheck,
  Truck,
  IndianRupee,
  X,
  Sparkles,
  Briefcase
} from 'lucide-react';
import { DISTRICT_LIST } from '../../../districtData';

export interface LabourJobListing {
  id: string;
  employerType: 'Farmer' | 'Construction Site Owner' | 'Cold Storage & Logistics';
  employerName: string;
  organizationName: string;
  contactMobile: string;
  jobTitle: string;
  category: 'Agriculture' | 'Construction' | 'Cold Storage' | 'Equipment Operator';
  district: string;
  mandal: string;
  siteLocation: string;
  workersNeeded: number;
  workersFilled: number;
  dailyWage: number;
  durationDays: number;
  workTimings: string;
  transportProvided: boolean;
  foodProvided: boolean;
  notes: string;
  postedAt: string;
  escrowStatus: 'Guaranteed' | 'Direct Cash on Site';
}

const INITIAL_LABOUR_JOBS: LabourJobListing[] = [
  {
    id: 'job-101',
    employerType: 'Farmer',
    employerName: 'V. Ramana Rao',
    organizationName: 'Ramana Natural Farms',
    contactMobile: '9848022331',
    jobTitle: 'Teja Sannam Chilli Plucking & Grading Squad',
    category: 'Agriculture',
    district: 'Guntur',
    mandal: 'Amaravathi',
    siteLocation: 'Dharanikota Fields, Plot 14',
    workersNeeded: 12,
    workersFilled: 5,
    dailyWage: 750,
    durationDays: 5,
    workTimings: '07:30 AM - 04:30 PM',
    transportProvided: true,
    foodProvided: true,
    notes: 'Looking for experienced plucking labor. Daily cash payment or direct PhonePe at 5 PM.',
    postedAt: '25 mins ago',
    escrowStatus: 'Guaranteed'
  },
  {
    id: 'job-102',
    employerType: 'Construction Site Owner',
    employerName: 'K. Rajasekhar Reddy',
    organizationName: 'Amaravati Smart Infra & Towers',
    contactMobile: '9440199332',
    jobTitle: 'Commercial Building Concrete Mixing & Masonry',
    category: 'Construction',
    district: 'NTR (Vijayawada)',
    mandal: 'Vijayawada Urban',
    siteLocation: 'MG Road, High-Rise Project Phase 2',
    workersNeeded: 20,
    workersFilled: 8,
    dailyWage: 950,
    durationDays: 14,
    workTimings: '08:00 AM - 05:30 PM',
    transportProvided: true,
    foodProvided: false,
    notes: 'Need skilled masons, bar-benders and helpers. Safety helmets and boots provided on site.',
    postedAt: '1 hour ago',
    escrowStatus: 'Guaranteed'
  },
  {
    id: 'job-103',
    employerType: 'Cold Storage & Logistics',
    employerName: 'Sri Balaji Logistics Corp',
    organizationName: 'Guntur Mirchi Yard Cold Chain',
    contactMobile: '9848033442',
    jobTitle: 'Gunny Bag Loading, Unloading & Multi-Tier Stacking',
    category: 'Cold Storage',
    district: 'Guntur',
    mandal: 'Guntur Rural',
    siteLocation: 'Mandi Yard Cold Complex Gate 4',
    workersNeeded: 8,
    workersFilled: 2,
    dailyWage: 850,
    durationDays: 7,
    workTimings: '09:00 AM - 06:00 PM',
    transportProvided: false,
    foodProvided: true,
    notes: 'Handling 50kg chilli and turmeric sacks. Heavy loading equipment assistance available.',
    postedAt: '2 hours ago',
    escrowStatus: 'Guaranteed'
  },
  {
    id: 'job-104',
    employerType: 'Farmer',
    employerName: 'N. Siva Kumar',
    organizationName: 'Nellore Rice Cultivators Syndicate',
    contactMobile: '9440188229',
    jobTitle: 'BPT Paddy Sowing, De-weeding & Field Bunding',
    category: 'Agriculture',
    district: 'Sri Potti Sriramulu Nellore',
    mandal: 'Kovur',
    siteLocation: 'Pennar River Basin Fields',
    workersNeeded: 15,
    workersFilled: 11,
    dailyWage: 700,
    durationDays: 4,
    workTimings: '07:00 AM - 03:30 PM',
    transportProvided: true,
    foodProvided: true,
    notes: 'Morning breakfast and buttermilk provided. Immediate requirement for transplanting.',
    postedAt: '3 hours ago',
    escrowStatus: 'Guaranteed'
  },
  {
    id: 'job-105',
    employerType: 'Construction Site Owner',
    employerName: 'M. Chenna Kesava',
    organizationName: 'Rayalaseema Highways & Bridges Ltd',
    contactMobile: '9848022003',
    jobTitle: 'Highway Culvert Shuttering, Earthwork & Laborers',
    category: 'Construction',
    district: 'Kurnool',
    mandal: 'Dhone',
    siteLocation: 'NH-44 Bypass Mile 72',
    workersNeeded: 16,
    workersFilled: 6,
    dailyWage: 900,
    durationDays: 20,
    workTimings: '08:00 AM - 05:00 PM',
    transportProvided: true,
    foodProvided: true,
    notes: 'Worksite camp accommodation provided for teams coming from outside mandals.',
    postedAt: '4 hours ago',
    escrowStatus: 'Guaranteed'
  },
  {
    id: 'job-106',
    employerType: 'Farmer',
    employerName: 'G. Appala Naidu',
    organizationName: 'Organic Valley Mango Orchards',
    contactMobile: '9848022022',
    jobTitle: 'Mango Orchard Pruning, Spraying & Fruit Bagging',
    category: 'Agriculture',
    district: 'Chittoor',
    mandal: 'Palamaner',
    siteLocation: 'Bangalore Road Orchard Estate',
    workersNeeded: 10,
    workersFilled: 3,
    dailyWage: 800,
    durationDays: 6,
    workTimings: '08:00 AM - 04:30 PM',
    transportProvided: false,
    foodProvided: true,
    notes: 'Experience with horticultural pruning desired. Safe equipment provided.',
    postedAt: '5 hours ago',
    escrowStatus: 'Guaranteed'
  }
];

interface LabourHubWorkersViewProps {
  district: string;
}

export const LabourHubWorkersView: React.FC<LabourHubWorkersViewProps> = ({ district }) => {
  const [jobs, setJobs] = useState<LabourJobListing[]>(INITIAL_LABOUR_JOBS);
  const [activeMode, setActiveMode] = useState<'kiosk' | 'hire'>('kiosk');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(district || 'All Districts');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Post Job Modal State
  const [postJobModalOpen, setPostJobModalOpen] = useState(false);
  const [formEmployerType, setFormEmployerType] = useState<'Farmer' | 'Construction Site Owner' | 'Cold Storage & Logistics'>('Farmer');
  const [formEmployerName, setFormEmployerName] = useState('');
  const [formOrgName, setFormOrgName] = useState('');
  const [formMobile, setFormMobile] = useState('');
  const [formJobTitle, setFormJobTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'Agriculture' | 'Construction' | 'Cold Storage' | 'Equipment Operator'>('Agriculture');
  const [formDistrict, setFormDistrict] = useState(district || 'Guntur');
  const [formMandal, setFormMandal] = useState('Central Mandal');
  const [formSiteLocation, setFormSiteLocation] = useState('');
  const [formWorkersCount, setFormWorkersCount] = useState('6');
  const [formWage, setFormWage] = useState('750');
  const [formDays, setFormDays] = useState('3');
  const [formTransport, setFormTransport] = useState(true);
  const [formFood, setFormFood] = useState(true);
  const [formNotes, setFormNotes] = useState('');

  // Booking Modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedJobForBooking, setSelectedJobForBooking] = useState<LabourJobListing | null>(null);
  const [workerNameInput, setWorkerNameInput] = useState('');
  const [workerMobileInput, setWorkerMobileInput] = useState('');
  const [workerCountInput, setWorkerCountInput] = useState('1');
  const [bookedNotice, setBookedNotice] = useState<string | null>(null);

  // Filtered Jobs
  const filteredJobs = jobs.filter((j) => {
    if (selectedDistrict !== 'All Districts' && j.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
      return false;
    }
    if (selectedCategory !== 'All' && j.category !== selectedCategory) {
      return false;
    }
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      j.jobTitle.toLowerCase().includes(q) ||
      j.employerName.toLowerCase().includes(q) ||
      j.organizationName.toLowerCase().includes(q) ||
      j.district.toLowerCase().includes(q) ||
      j.mandal.toLowerCase().includes(q) ||
      j.category.toLowerCase().includes(q)
    );
  });

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmployerName || !formJobTitle || !formWage || !formWorkersCount) {
      alert('Please fill out all required fields.');
      return;
    }

    const newJob: LabourJobListing = {
      id: `job-${Date.now()}`,
      employerType: formEmployerType,
      employerName: formEmployerName,
      organizationName: formOrgName || formEmployerName,
      contactMobile: formMobile || '9848099888',
      jobTitle: formJobTitle,
      category: formCategory,
      district: formDistrict,
      mandal: formMandal,
      siteLocation: formSiteLocation || `${formMandal} Site`,
      workersNeeded: Number(formWorkersCount),
      workersFilled: 0,
      dailyWage: Number(formWage),
      durationDays: Number(formDays) || 1,
      workTimings: '08:00 AM - 05:00 PM',
      transportProvided: formTransport,
      foodProvided: formFood,
      notes: formNotes,
      postedAt: 'Just now',
      escrowStatus: 'Guaranteed'
    };

    setJobs([newJob, ...jobs]);
    setPostJobModalOpen(false);
    setActiveMode('kiosk');
    setBookedNotice(`🎉 Requirement Published! "${formJobTitle}" for ${formWorkersCount} workers is now LIVE on Andhra Pradesh Shramik Hubs.`);
  };

  const handleBookWorkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForBooking) return;

    const count = Number(workerCountInput) || 1;
    setJobs((prev) =>
      prev.map((j) =>
        j.id === selectedJobForBooking.id
          ? { ...j, workersFilled: Math.min(j.workersNeeded, j.workersFilled + count) }
          : j
      )
    );

    setBookingModalOpen(false);
    setBookedNotice(
      `✅ Work Confirmed! ${count} worker spot(s) reserved for "${selectedJobForBooking.jobTitle}" in ${selectedJobForBooking.district}. Employer Contact: +91 ${selectedJobForBooking.contactMobile}.`
    );
    setWorkerNameInput('');
    setWorkerMobileInput('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Official Bilingual Header - Solid Dark Green (No Glassmorphism) */}
      <div className="rounded-3xl bg-[#062c1e] p-6 lg:p-8 text-white shadow-xl border-2 border-[#0e4b34]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e4b34] border border-[#166544] text-emerald-300 text-xs font-bold">
              <Sparkles size={13} className="text-amber-400" />
              <span>ఆంధ్రప్రదేశ్ శ్రామిక సేతు (AP Shramik Welfare &amp; Hubs)</span>
              <span className="text-emerald-500">•</span>
              <span className="text-white font-black">{district} Zone</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>AP Shramik Hubs &amp; Workers Portal</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black shadow-sm">
                కార్మికుల పోర్టల్
              </span>
            </h1>

            <p className="text-emerald-100/90 text-xs lg:text-sm leading-relaxed font-medium">
              Direct workforce hiring for <strong>Farmers</strong> &amp; <strong>Construction Site Owners</strong>. 
              Real-time daily wage opportunities for workers at Mandi Shramik Hubs across all 26 districts of Andhra Pradesh with AP Govt Escrow protection.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-emerald-200">
              <div className="flex items-center gap-1.5 bg-[#0a3a28] border border-[#145a3c] px-3 py-1.5 rounded-xl font-semibold">
                <ShieldCheck size={15} className="text-emerald-400" />
                <span>AP Minimum Wages Act 2026</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0a3a28] border border-[#145a3c] px-3 py-1.5 rounded-xl font-semibold">
                <HardHat size={15} className="text-amber-400" />
                <span>BOCW Welfare Protection</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0a3a28] border border-[#145a3c] px-3 py-1.5 rounded-xl font-semibold">
                <IndianRupee size={15} className="text-emerald-400" />
                <span>Direct Daily Settlement</span>
              </div>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={() => setPostJobModalOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle size={18} />
              <span>+ Hire Workers / Post Job</span>
            </button>

            <button
              onClick={() => {
                setActiveMode(activeMode === 'kiosk' ? 'hire' : 'kiosk');
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0a3a28] hover:bg-[#0f4f38] border border-[#166544] text-emerald-200 hover:text-white text-xs font-bold rounded-xl transition-all"
            >
              <Briefcase size={14} className="text-amber-300" />
              <span>
                {activeMode === 'kiosk' ? 'Switch to Employer View' : 'Switch to Shramik Hub Kiosk'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Booking / Notification Banner */}
      {bookedNotice && (
        <div className="p-4 bg-emerald-950 border border-emerald-500 text-emerald-100 rounded-2xl text-xs flex items-center justify-between shadow-md animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span className="font-semibold">{bookedNotice}</span>
          </div>
          <button onClick={() => setBookedNotice(null)} className="p-1 text-emerald-400 hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}

      {/* 2. Statewide Labour Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Mandi Shramik Hubs</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-2">142 Hubs</h3>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">Covering All 26 AP Districts</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Open Job Vacancies</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <HardHat size={16} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-2">
            {jobs.reduce((acc, j) => acc + (j.workersNeeded - j.workersFilled), 0)} Workers Needed
          </h3>
          <p className="text-[11px] text-amber-600 font-bold mt-1">Agriculture &amp; Construction</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Average Daily Wage</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <IndianRupee size={16} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-2">
            ₹750 - ₹950 <span className="text-xs font-normal text-slate-400">/ Day</span>
          </h3>
          <p className="text-[11px] text-blue-600 font-bold mt-1">+ Daily Meals &amp; Transport</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Wage Protection Escrow</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-2">100% Safe</h3>
          <p className="text-[11px] text-slate-500 font-bold mt-1">BOCW / AP Labour Board</p>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* District Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
            >
              <option value="All Districts">All 26 Districts (Statewide)</option>
              {DISTRICT_LIST.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Work Category Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-xs font-bold">
            {(['All', 'Agriculture', 'Construction', 'Cold Storage', 'Equipment Operator'] as const).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    selectedCategory === cat
                      ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search job title, farmer, contractor, mandal..."
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 w-56 sm:w-72"
          />
        </div>
      </div>

      {/* 4. Live Jobs Board (Workers Portal / Labour Hub View) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map((job) => {
          const spotsLeft = job.workersNeeded - job.workersFilled;
          const isAgri = job.category === 'Agriculture';
          const isConstruction = job.category === 'Construction';

          return (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Employer & Category Badge */}
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                      isAgri
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : isConstruction
                        ? 'bg-amber-50 text-amber-900 border border-amber-300'
                        : 'bg-blue-50 text-blue-900 border border-blue-200'
                    }`}
                  >
                    {isAgri ? <Sprout size={12} /> : isConstruction ? <HardHat size={12} /> : <Building2 size={12} />}
                    <span>{job.employerType}</span>
                  </span>

                  <span className="text-[10px] text-slate-400 font-medium">{job.postedAt}</span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    {job.jobTitle}
                  </h3>
                  <p className="text-xs font-bold text-slate-600 mt-1">
                    {job.organizationName} • <span className="font-normal text-slate-500">{job.employerName}</span>
                  </p>
                </div>

                {/* Location */}
                <div className="p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-100 space-y-1">
                  <p className="font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin size={13} className="text-emerald-700 shrink-0" />
                    <span>{job.district} • {job.mandal}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 pl-5 truncate">{job.siteLocation}</p>
                </div>

                {/* Wage & Duration Highlight */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-gradient-to-r from-emerald-50/60 to-amber-50/60 rounded-2xl border border-emerald-200/60">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block">Daily Wage (రోజు కూలీ)</span>
                    <p className="text-lg font-black text-slate-900">
                      ₹{job.dailyWage.toLocaleString()}
                      <span className="text-[10px] font-normal text-slate-500"> / Day</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-bold block">Duration</span>
                    <p className="text-sm font-black text-emerald-800">
                      {job.durationDays} Days Work
                    </p>
                  </div>
                </div>

                {/* Perks & Timings */}
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-600">
                  <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                    <Clock size={11} /> {job.workTimings}
                  </span>
                  {job.transportProvided && (
                    <span className="flex items-center gap-1 bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                      <Truck size={11} /> Free Transport
                    </span>
                  )}
                  {job.foodProvided && (
                    <span className="bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200">
                      🍲 Meals Included
                    </span>
                  )}
                </div>

                {/* Vacancies Progress */}
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-600">
                      Workers Needed: <strong>{job.workersNeeded}</strong>
                    </span>
                    <span className="font-extrabold text-amber-700">
                      {spotsLeft > 0 ? `${spotsLeft} Spots Available` : 'Full Squad Confirmed'}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all"
                      style={{ width: `${(job.workersFilled / job.workersNeeded) * 100}%` }}
                    />
                  </div>
                </div>

                {job.notes && (
                  <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{job.notes}"
                  </p>
                )}
              </div>

              {/* Action Buttons for Worker & Labour Contractor */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedJobForBooking(job);
                    setWorkerCountInput('1');
                    setBookingModalOpen(true);
                  }}
                  disabled={spotsLeft <= 0}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                    spotsLeft > 0
                      ? 'bg-[#062419] hover:bg-[#093324] text-white'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>{spotsLeft > 0 ? 'Accept Work / నియామకం' : 'Squad Full'}</span>
                </button>

                <button
                  onClick={() => alert(`Calling Employer ${job.employerName} at +91 ${job.contactMobile}...`)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700"
                  title="Call Employer"
                >
                  <Phone size={14} className="text-emerald-700" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Post Job Modal (For Farmers & Construction Site Owners) */}
      {postJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-amber-500 text-slate-950 rounded-2xl">
                  <HardHat size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Hire Workers / Post Job Requirement
                  </h3>
                  <p className="text-xs text-slate-400">
                    Broadcast direct to AP Mandi Shramik Hubs &amp; Workers Portal
                  </p>
                </div>
              </div>
              <button onClick={() => setPostJobModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePostJobSubmit} className="space-y-4 text-xs">
              {/* Employer Type Selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Who is Hiring? (యజమాని రకం)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Farmer', label: '🌾 Farmer (రైతు)' },
                    { id: 'Construction Site Owner', label: '🏗️ Construction (బిల్డర్)' },
                    { id: 'Cold Storage & Logistics', label: '❄️ Cold Storage (గోడౌన్)' }
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setFormEmployerType(t.id as any)}
                      className={`p-2.5 rounded-xl border text-[11px] font-black transition-all ${
                        formEmployerType === t.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Employer Name, Firm & Mobile */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={formEmployerName}
                    onChange={(e) => setFormEmployerName(e.target.value)}
                    placeholder="e.g. V. Ramana Rao / K. Reddy"
                    className="w-full font-bold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Farm / Firm / Site Name</label>
                  <input
                    type="text"
                    value={formOrgName}
                    onChange={(e) => setFormOrgName(e.target.value)}
                    placeholder="e.g. Ramana Farms / Infra Towers"
                    className="w-full font-bold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number (Mobile)</label>
                  <input
                    type="tel"
                    value={formMobile}
                    onChange={(e) => setFormMobile(e.target.value)}
                    placeholder="e.g. 9848022331"
                    className="w-full font-bold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Work Title & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Work Description / Job Title</label>
                  <input
                    type="text"
                    value={formJobTitle}
                    onChange={(e) => setFormJobTitle(e.target.value)}
                    placeholder="e.g. Chilli Plucking Squad / Concrete Masonry"
                    className="w-full font-black text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sector / Work Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full font-bold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white"
                  >
                    <option value="Agriculture">🌾 Agriculture &amp; Harvesting</option>
                    <option value="Construction">🏗️ Construction &amp; Masonry</option>
                    <option value="Cold Storage">❄️ Cold Storage &amp; Loading</option>
                    <option value="Equipment Operator">🚜 Machine &amp; Tractor Operator</option>
                  </select>
                </div>
              </div>

              {/* District & Mandal */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">AP District (జిల్లా)</label>
                  <select
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full font-bold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:bg-white"
                  >
                    {DISTRICT_LIST.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mandal / Town</label>
                  <input
                    type="text"
                    value={formMandal}
                    onChange={(e) => setFormMandal(e.target.value)}
                    placeholder="e.g. Amaravathi / Kovur"
                    className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Specific Location */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Worksite / Field Address</label>
                <input
                  type="text"
                  value={formSiteLocation}
                  onChange={(e) => setFormSiteLocation(e.target.value)}
                  placeholder="e.g. Plot 14, Dharanikota Canal Road / High-Rise Site"
                  className="w-full font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:bg-white"
                />
              </div>

              {/* Workers Count, Daily Wage, Duration */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Workers Needed</label>
                  <input
                    type="number"
                    value={formWorkersCount}
                    onChange={(e) => setFormWorkersCount(e.target.value)}
                    className="w-full font-black text-base bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Wage (₹ / Day)</label>
                  <input
                    type="number"
                    value={formWage}
                    onChange={(e) => setFormWage(e.target.value)}
                    className="w-full font-black text-base bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Days Needed</label>
                  <input
                    type="number"
                    value={formDays}
                    onChange={(e) => setFormDays(e.target.value)}
                    className="w-full font-black text-base bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Facilities Provided */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 block">Facilities Provided for Workers:</span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formTransport}
                      onChange={(e) => setFormTransport(e.target.checked)}
                      className="rounded text-emerald-700"
                    />
                    <span className="text-[11px] font-semibold text-slate-800">Free Transport (Pickup &amp; Drop)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formFood}
                      onChange={(e) => setFormFood(e.target.checked)}
                      className="rounded text-emerald-700"
                    />
                    <span className="text-[11px] font-semibold text-slate-800">Lunch / Food Provided</span>
                  </label>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Requirements / Work Instructions Note</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Daily cash payment at 5 PM. Safety gear provided. Experience preferred..."
                  className="w-full font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:bg-white resize-none"
                />
              </div>

              {/* Estimated Budget Summary */}
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-emerald-800 font-bold block">Estimated Escrow Total:</span>
                  <span className="text-slate-600 font-medium">
                    {formWorkersCount} Workers × ₹{formWage}/day × {formDays} Days
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-emerald-900">
                    ₹{(Number(formWorkersCount) * Number(formWage) * Number(formDays)).toLocaleString()}
                  </p>
                  <span className="text-[9px] font-bold text-emerald-700">AP BOCW Verified</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPostJobModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#062419] hover:bg-[#093324] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <PlusCircle size={15} />
                  <span>Broadcast to AP Shramik Hubs</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Accept / Book Work Modal for Workers */}
      {bookingModalOpen && selectedJobForBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <h3 className="text-sm font-black text-slate-900">Confirm Work Booking</h3>
              </div>
              <button onClick={() => setBookingModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
              <p className="font-extrabold text-slate-900">{selectedJobForBooking.jobTitle}</p>
              <p className="text-slate-600">Employer: {selectedJobForBooking.employerName} ({selectedJobForBooking.organizationName})</p>
              <p className="text-emerald-700 font-black">₹{selectedJobForBooking.dailyWage}/Day • {selectedJobForBooking.workTimings}</p>
            </div>

            <form onSubmit={handleBookWorkSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Worker Name / Squad Leader</label>
                <input
                  type="text"
                  value={workerNameInput}
                  onChange={(e) => setWorkerNameInput(e.target.value)}
                  placeholder="Enter worker / maistry name"
                  className="w-full font-bold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number for SMS Pass</label>
                <input
                  type="tel"
                  value={workerMobileInput}
                  onChange={(e) => setWorkerMobileInput(e.target.value)}
                  placeholder="e.g. 9848011223"
                  className="w-full font-bold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Number of Workers Joining</label>
                <input
                  type="number"
                  min="1"
                  max={selectedJobForBooking.workersNeeded - selectedJobForBooking.workersFilled}
                  value={workerCountInput}
                  onChange={(e) => setWorkerCountInput(e.target.value)}
                  className="w-full font-black text-base bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs"
                >
                  Confirm &amp; Reserve Spot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
