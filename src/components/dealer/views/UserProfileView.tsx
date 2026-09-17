import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  QrCode,
  Bell,
  RefreshCw,
  LogOut,
  Building,
  Truck,
  HardHat,
  Landmark,
  Sprout
} from 'lucide-react';
import { DISTRICT_LIST } from '../../../districtData';
import type { UserProfile } from '../DealerHeader';

interface UserProfileViewProps {
  user: UserProfile;
  district: string;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onSwitchProfile: () => void;
  onSignOut: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  user,
  district,
  onUpdateUser,
  onSwitchProfile,
  onSignOut
}) => {
  const [name, setName] = useState(user.name);
  const [mobile, setMobile] = useState(user.mobile || '9848011223');
  const [selectedDistrict, setSelectedDistrict] = useState(user.district || district);
  const [mandal, setMandal] = useState('Central Mandi Circle');
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  if (!user.isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl border-2 border-slate-200 p-8 text-center shadow-xl animate-in fade-in">
        <div className="w-16 h-16 rounded-2xl bg-[#062c1e] text-emerald-300 flex items-center justify-center text-3xl mx-auto mb-4 border border-[#0e4b34] shadow-inner">
          🔒
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
          Authentication Required
        </span>
        <h2 className="text-xl font-black text-slate-900 mt-3">Profile Access Restricted</h2>
        <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
          You must be logged in to view your personal profile, mandi trading licenses, contact preferences, and dispatch ledger.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <button
            onClick={() => onSwitchProfile()}
            className="px-6 py-2.5 bg-[#062c1e] hover:bg-[#0a3a28] text-emerald-300 hover:text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 border border-[#0e4b34]"
          >
            <span>Login or Sign Up (ప్రవేశం / నమోదు)</span>
          </button>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = name
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'AP';

    const updated: UserProfile = {
      ...user,
      name,
      mobile,
      district: selectedDistrict,
      avatarInitials: initials,
      isLoggedIn: true
    };

    onUpdateUser(updated);
    setSaveMessage('✅ ప్రొఫైల్ విజయవంతంగా నవీకరించబడింది! (Profile saved successfully)');
    setTimeout(() => setSaveMessage(null), 4000);
  };

  const getRoleConfig = (role: UserProfile['role']) => {
    switch (role) {
      case 'farmer':
        return {
          titleTelugu: 'రైతు (AP Registered Farmer)',
          cardBg: 'bg-[#062c1e]',
          badgeBorder: 'border-emerald-500',
          badgeText: 'text-emerald-300',
          icon: Sprout,
          credTitle: 'Rythu Bharosa Kendra (RBK) Affiliation',
          credDetail: 'RBK Code: AP-GNT-RBK-409 | Land: 4.85 Acres Patta',
          authBody: 'Andhra Pradesh Dept of Agriculture & Farmer Welfare'
        };
      case 'dealer':
        return {
          titleTelugu: 'ధాన్య వ్యాపారి (Licensed APMC Dealer)',
          cardBg: 'bg-[#062c1e]',
          badgeBorder: 'border-emerald-500',
          badgeText: 'text-emerald-300',
          icon: Building,
          credTitle: 'APMC Unified Mandi License',
          credDetail: 'License: AP-GNT-DLR-8891 | e-NAM Reg: Verified Grade A',
          authBody: 'AP Agricultural Marketing Department'
        };
      case 'transport':
        return {
          titleTelugu: 'రవాణాదారు (Agri Logistics Partner)',
          cardBg: 'bg-[#062c1e]',
          badgeBorder: 'border-blue-400',
          badgeText: 'text-blue-200',
          icon: Truck,
          credTitle: 'AP Transport Fleet Permit',
          credDetail: 'Fleet ID: AP-LOG-7721 | All AP Mandi Pass: Active',
          authBody: 'AP Road Transport & Mandi Logistics Division'
        };
      case 'worker':
        return {
          titleTelugu: 'శ్రామికుడు (Hamali & Agro Worker)',
          cardBg: 'bg-[#062c1e]',
          badgeBorder: 'border-amber-400',
          badgeText: 'text-amber-200',
          icon: HardHat,
          credTitle: 'AP Shramik Welfare Board ID',
          credDetail: 'Worker Card: AP-SHR-4412 | Mandi Hamali Union Tier-1',
          authBody: 'AP Shramik & Unorganised Workers Welfare Board'
        };
      case 'admin':
        return {
          titleTelugu: 'రాష్ట్ర అడ్మినిస్ట్రేటర్ (Directorate Official)',
          cardBg: 'bg-[#062c1e]',
          badgeBorder: 'border-purple-400',
          badgeText: 'text-purple-200',
          icon: Landmark,
          credTitle: 'AP Agriculture Directorate Credentials',
          credDetail: 'Govt Badge: AP-DIR-ADM-01 | Clearance: Level-4 Executive',
          authBody: 'Government of Andhra Pradesh Secretariat'
        };
      default:
        return {
          titleTelugu: 'వినియోగదారుడు (AP User)',
          cardBg: 'bg-[#062c1e]',
          badgeBorder: 'border-emerald-500',
          badgeText: 'text-emerald-300',
          icon: ShieldCheck,
          credTitle: 'AP-RythuSetu Identity',
          credDetail: 'Verified Citizen Profile',
          authBody: 'Government of Andhra Pradesh'
        };
    }
  };

  const roleConfig = getRoleConfig(user.role);
  const RoleIcon = roleConfig.icon;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-[#062c1e] text-white p-6 sm:p-8 rounded-3xl border-2 border-[#0e4b34] shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0e4b34] text-emerald-300 border border-[#166544]">
                ఆంధ్రప్రదేశ్ ప్రభుత్వం • Official User Account
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                <CheckCircle2 size={13} /> Active &amp; Verified
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{user.name}</span>
              <span className="text-sm px-3 py-1 rounded-xl bg-white/10 text-emerald-200 font-semibold border border-white/10 capitalize flex items-center gap-1.5">
                <RoleIcon size={14} />
                <span>{user.role}</span>
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
              AP-RythuSetu Digital Smart Identity &amp; Notification Control Center for <strong>{user.district || district} District</strong> jurisdiction.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onSwitchProfile}
              className="px-4 py-2.5 rounded-2xl bg-[#0e4b34] hover:bg-[#135d40] text-emerald-200 hover:text-white font-bold text-xs border border-[#1a7350] transition-colors flex items-center gap-2"
            >
              <RefreshCw size={14} />
              <span>Switch Demo Profile (ప్రొఫైల్ మార్చు)</span>
            </button>
            <button
              onClick={onSignOut}
              className="px-4 py-2.5 rounded-2xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-200 hover:text-white font-bold text-xs border border-rose-500/40 transition-colors flex items-center gap-2"
            >
              <LogOut size={14} />
              <span>Sign Out (లాగ్ అవుట్)</span>
            </button>
          </div>
        </div>
      </div>

      {saveMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} className="text-emerald-700" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Main Grid: Digital ID Card on Left, Edit Form & Settings on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Official AP Digital ID Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#062c1e] text-white rounded-3xl p-6 sm:p-7 border-2 border-[#0e4b34] shadow-2xl relative overflow-hidden">
            {/* Holographic Watermark / Seal */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full border-8 border-white/5 flex items-center justify-center pointer-events-none opacity-40">
              <ShieldCheck size={120} className="text-white/10" />
            </div>

            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-emerald-900/80 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#0e4b34] border border-[#166544] flex items-center justify-center font-black text-emerald-300 text-xs shadow-inner">
                  AP
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">
                    Government of Andhra Pradesh
                  </h3>
                  <p className="text-[10px] text-emerald-300 font-semibold">
                    ఆంధ్రప్రదేశ్ ప్రభుత్వం • RythuSetu Card
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                GOVT CERTIFIED
              </span>
            </div>

            {/* Card Body */}
            <div className="py-5 flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-white text-emerald-950 flex items-center justify-center text-2xl font-black shadow-lg border-2 border-emerald-300">
                  {user.avatarInitials}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-[#062c1e]">
                  <ShieldCheck size={12} />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-emerald-300 font-bold uppercase tracking-wide">
                  {roleConfig.titleTelugu}
                </p>
                <h2 className="text-lg font-black text-white truncate mt-0.5">
                  {user.name}
                </h2>
                <p className="text-xs font-mono font-bold text-emerald-200 mt-0.5 tracking-wider">
                  ID: {user.id}
                </p>
              </div>
            </div>

            {/* Card Details Grid */}
            <div className="bg-[#041d14] rounded-2xl p-4 border border-[#0d3b2a] space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-[11px] text-emerald-300/80 font-medium">District (జిల్లా):</span>
                <span className="font-bold text-white">{user.district || district}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-[11px] text-emerald-300/80 font-medium">Mandal / Division:</span>
                <span className="font-bold text-white">{mandal}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-[11px] text-emerald-300/80 font-medium">Registered Mobile:</span>
                <span className="font-bold text-white font-mono">+91 {user.mobile || mobile}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-[11px] text-emerald-300/80 font-medium">Registration Status:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Verified Biometric
                </span>
              </div>
            </div>

            {/* Card Footer: Credentials & Mock QR */}
            <div className="mt-4 pt-4 border-t border-emerald-900/80 flex items-center justify-between">
              <div className="space-y-0.5 max-w-[200px]">
                <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">
                  {roleConfig.credTitle}
                </p>
                <p className="text-[10px] text-slate-300 leading-tight">
                  {roleConfig.credDetail}
                </p>
              </div>
              <div className="p-2 bg-white rounded-xl shadow-xs">
                <QrCode size={40} className="text-slate-900" />
              </div>
            </div>
          </div>

          {/* Quick Authority Seal Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1.5 shadow-xs">
            <p className="font-bold text-slate-900 flex items-center gap-2">
              <Award size={15} className="text-emerald-700" />
              <span>Issuing Authority: {roleConfig.authBody}</span>
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              This digital pass is recognized across all 26 Agricultural Market Committees (APMC), Rythu Bharosa Kendras (RBK), and State Warehouses in Andhra Pradesh.
            </p>
          </div>
        </div>

        {/* Right Column: Profile Edit & Notification Settings (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Edit Profile Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Personal &amp; Operational Details</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  వ్యక్తిగత మరియు మార్కెట్ వివరాలు సవరించండి
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                Live Sync
              </span>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name (పూర్తి పేరు)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mobile Number (మొబైల్ సంఖ్య)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">+91</span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      maxLength={10}
                      required
                      className="w-full text-xs font-mono font-semibold pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Operational District (జిల్లా)
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 bg-white"
                  >
                    {DISTRICT_LIST.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist} District
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mandal / Local Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={mandal}
                    onChange={(e) => setMandal(e.target.value)}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#062c1e] hover:bg-[#0a3a28] text-emerald-300 hover:text-white rounded-xl font-bold text-xs shadow-xs transition-colors border border-[#0e4b34] flex items-center gap-2"
                >
                  <CheckCircle2 size={14} />
                  <span>Save Changes (నవీకరించు)</span>
                </button>
              </div>
            </form>
          </div>

          {/* Alert & Notification Preferences */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Bell size={18} className="text-emerald-700" />
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  AP-RythuSetu Alert &amp; Messaging Preferences
                </h3>
                <p className="text-[11px] text-slate-500">
                  ధరల మరియు లావాదేవీల హెచ్చరికల అమరికలు
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">SMS Price &amp; Arrival Alerts</h4>
                  <p className="text-[11px] text-slate-500">
                    Receive daily mandi opening and closing prices for {selectedDistrict} crops.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSmsAlerts(!smsAlerts)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    smsAlerts ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-xs" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">WhatsApp Deal &amp; Transport Alerts</h4>
                  <p className="text-[11px] text-slate-500">
                    Get instant dispatch confirmations, driver contact cards, and e-gatepasses.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWhatsappUpdates(!whatsappUpdates)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    whatsappUpdates ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-xs" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">High-Volatility Market Warnings</h4>
                  <p className="text-[11px] text-slate-500">
                    Emergency alerts when market prices spike or fall beyond 5% in 24 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPriceAlerts(!priceAlerts)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    priceAlerts ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
