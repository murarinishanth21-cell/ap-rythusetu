import React, { useState, useEffect } from 'react';
import { RefreshCw, Search, Mic, Plus, X, Send, ShieldAlert } from 'lucide-react';
import { api } from '../../../api';
import { DISTRICT_LIST } from '../../../districtData';
import { notificationService } from '../../../services/notificationService';

interface GrievanceRedressalViewProps {
  district: string;
}

export const GrievanceRedressalView: React.FC<GrievanceRedressalViewProps> = ({
  district
}) => {
  const [grievances, setGrievances] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  // New Grievance Modal Form State
  const [formName, setFormName] = useState('V. Ramana Rao');
  const [formMobile, setFormMobile] = useState('9848022331');
  const [formDistrict, setFormDistrict] = useState(district === 'Statewide' ? 'Guntur' : district);
  const [formCategory, setFormCategory] = useState('Mandi Payment Delay');
  const [formDesc, setFormDesc] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Load real-time grievances from API
  const loadGrievances = async () => {
    try {
      setLoading(true);
      const targetDist = filterDistrict === 'All' ? (district === 'Statewide' ? undefined : district) : filterDistrict;
      const res = await api.getGrievances(
        targetDist,
        filterStatus === 'All' ? undefined : filterStatus
      );

      if (Array.isArray(res) && res.length > 0) {
        setGrievances(res);
      } else {
        // Fallback default sample data if API returns empty
        const fallback = [
          {
            id: 'AP-GRV-2026-0081',
            user_name: 'V. Ramana Rao',
            user_role: 'farmer',
            district: 'Guntur',
            category: 'Mandi Payment Delay',
            description: 'Payment of ₹1,85,000 for 150 Q Chilli delayed beyond 24 hours at Amaravathi Mandi.',
            translated_text: 'Voice Grievance reported in Guntur: Payment delayed beyond 24 hours at Amaravathi Mandi.',
            status: 'Open',
            created_at: 'Today, 07:15 AM'
          },
          {
            id: 'AP-GRV-2026-0074',
            user_name: 'Sri Balaji Agro Traders',
            user_role: 'dealer',
            district: 'Guntur',
            category: 'Weighment Discrepancy',
            description: 'Mandi weighbridge gross tare discrepancy of 4 quintals during lot dispatch.',
            status: 'In Progress',
            created_at: 'Yesterday, 04:30 PM'
          },
          {
            id: 'AP-GRV-2026-0062',
            user_name: 'Siva Kumar',
            user_role: 'farmer',
            district: 'Prakasam',
            category: 'Crop Damage Compensation',
            description: 'Severe Paddy Blast pest damage assessment claim submitted via Rythu Bharosa Kendra.',
            status: 'Resolved',
            created_at: '14 Sep 2026'
          }
        ];
        setGrievances(fallback);
      }
    } catch (e) {
      console.error('Failed to load grievances:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGrievances();
    const handleSyncEvent = () => loadGrievances();
    window.addEventListener('ap-rythusetu-grievance-change', handleSyncEvent);
    const interval = setInterval(loadGrievances, 3500);
    return () => {
      window.removeEventListener('ap-rythusetu-grievance-change', handleSyncEvent);
      clearInterval(interval);
    };
  }, [district, filterStatus, filterDistrict]);

  const handleCreateManualGrievance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDesc.trim()) return;

    try {
      setFormSubmitting(true);
      const res = await api.createGrievance({
        user_id: `AP-FRM-${formMobile.slice(-4) || '9999'}`,
        user_name: formName.trim(),
        user_role: 'farmer',
        district: formDistrict,
        category: formCategory,
        description: formDesc.trim(),
        translated_text: formDesc.trim()
      });

      const tId = res?.id || res?.ticket_id || Math.floor(100 + Math.random() * 900);

      // Add to Admin Notifications
      notificationService.addNotification({
        roleTarget: 'admin',
        title: `🚨 New Grievance #${tId} (${formCategory})`,
        desc: `${formName} in ${formDistrict}: "${formDesc.length > 75 ? formDesc.slice(0, 75) + '...' : formDesc}"`,
        category: formCategory,
        linkTab: 'grievances',
        district: formDistrict,
        unread: true
      });

      // Add to Farmer Notifications
      notificationService.addNotification({
        roleTarget: 'farmer',
        title: `📋 Grievance Ticket #${tId} Lodged`,
        desc: `Your ticket regarding ${formCategory} has been recorded in the AP Government Mandi Ledger.`,
        category: 'Grievance',
        linkTab: 'grievances',
        district: formDistrict,
        unread: true
      });

      // Trigger event and reload
      window.dispatchEvent(new CustomEvent('ap-rythusetu-grievance-change'));
      setModalOpen(false);
      setFormDesc('');
      await loadGrievances();
      alert(`✅ Official Grievance Ticket #${tId} lodged successfully! Reflected in live admin ledger.`);
    } catch {
      alert('Failed to submit grievance.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const filteredGrievances = grievances.filter((g) => {
    if (filterStatus !== 'All' && g.status !== filterStatus) return false;
    if (filterDistrict !== 'All' && g.district !== filterDistrict) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (g.user_name || '').toLowerCase().includes(q) ||
        (g.category || '').toLowerCase().includes(q) ||
        (g.description || '').toLowerCase().includes(q) ||
        (g.district || '').toLowerCase().includes(q) ||
        String(g.id || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleUpdateStatus = async (id: any, newStatus: string) => {
    try {
      const numId = typeof id === 'number' ? id : parseInt(String(id).replace(/\D/g, ''), 10) || 1;
      const remark = prompt(
        `Enter official administrative remark for ticket #${id}:`,
        newStatus === 'Resolved'
          ? 'Payment expedited through AP Escrow and verified by Mandi Secretary.'
          : 'Under official investigation by local Agricultural Officer.'
      );
      if (remark === null) return;

      await api.updateGrievanceStatus(numId, newStatus, remark);
      setGrievances((prev) =>
        prev.map((g) => (g.id === id ? { ...g, status: newStatus, remark } : g))
      );

      // Notify Farmer of status update
      notificationService.addNotification({
        roleTarget: 'farmer',
        title: `🏛️ Grievance #${id} Updated: ${newStatus}`,
        desc: `AP Agriculture Directorate Action: "${remark}".`,
        category: 'Official Action',
        linkTab: 'grievances',
        unread: true
      });

      alert(`✅ Grievance #${id} status updated to ${newStatus}.`);
    } catch {
      setGrievances((prev) =>
        prev.map((g) => (g.id === id ? { ...g, status: newStatus } : g))
      );
    }
  };

  const openCount = grievances.filter((g) => g.status === 'Open').length;
  const inProgressCount = grievances.filter((g) => g.status === 'In Progress').length;
  const resolvedCount = grievances.filter((g) => g.status === 'Resolved').length;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>🏛️</span>
            <span>/</span>
            <span className="text-slate-600 font-semibold">Admin Command Center</span>
            <span>/</span>
            <span className="text-slate-600 font-semibold">Grievances</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
            AP Mandi Grievance &amp; Farmer Voice Redressal Portal
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time automated grievance ingestion from AI Voice Assistant, RBK kiosks, and farmers across AP
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#062419] hover:bg-[#0a3a28] text-emerald-300 hover:text-white rounded-xl text-xs font-black transition-all shadow-xs"
          >
            <Plus size={14} />
            <span>Lodge Grievance Ticket (ఫిర్యాదు దాఖలు)</span>
          </button>
          <button
            onClick={loadGrievances}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin text-emerald-600' : 'text-slate-500'} />
            <span>{loading ? 'Syncing...' : 'Sync Live'}</span>
          </button>
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Real-time Active</span>
          </span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-medium text-slate-500">Total Registered Tickets</p>
          <h3 className="text-lg font-black text-slate-900 mt-0.5">{grievances.length} Tickets</h3>
          <p className="text-[11px] font-bold text-slate-500 mt-0.5">Statewide AP Mandis</p>
        </div>

        <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100 shadow-xs">
          <p className="text-[11px] font-medium text-rose-800">Pending Review (Urgent)</p>
          <h3 className="text-lg font-black text-rose-900 mt-0.5">{openCount} Open</h3>
          <p className="text-[11px] font-bold text-rose-600 mt-0.5">24hr Government SLA</p>
        </div>

        <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100 shadow-xs">
          <p className="text-[11px] font-medium text-amber-800">Under Investigation</p>
          <h3 className="text-lg font-black text-amber-900 mt-0.5">{inProgressCount} Active</h3>
          <p className="text-[11px] font-bold text-amber-600 mt-0.5">Assigned to Local Officer</p>
        </div>

        <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 shadow-xs">
          <p className="text-[11px] font-medium text-emerald-800">Successfully Resolved</p>
          <h3 className="text-lg font-black text-emerald-900 mt-0.5">{resolvedCount} Settled</h3>
          <p className="text-[11px] font-bold text-emerald-600 mt-0.5">Direct Settlement</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-black text-slate-900">
              Live Mandi Grievance Ledger
            </h3>
            <p className="text-[11px] text-slate-400">
              Farmer voice complaints, payment delays, and crop damage inspection requests
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ticket, farmer, or keyword..."
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-slate-800 focus:outline-hidden"
              />
            </div>

            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700"
            >
              <option value="All">All AP Districts</option>
              {DISTRICT_LIST.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                <th className="py-2.5 px-4">Ticket</th>
                <th className="py-2.5 px-4">Complainant / Farmer</th>
                <th className="py-2.5 px-4">District</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4">Description / AI Transcript</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGrievances.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No grievances matching current filters.
                  </td>
                </tr>
              ) : (
                filteredGrievances.map((g) => {
                  const isVoiceGrievance =
                    (g.translated_text && g.translated_text.toLowerCase().includes('voice')) ||
                    (g.description && g.description.toLowerCase().includes('voice')) ||
                    (String(g.id).includes('VOICE'));

                  return (
                    <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-slate-800 block">#{g.id}</span>
                        {isVoiceGrievance && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full mt-0.5">
                            <Mic size={9} />
                            <span>AI Voice</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{g.user_name || 'Farmer'}</p>
                        <p className="text-[10px] text-slate-400 capitalize">{g.user_role || 'farmer'}</p>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700">
                        📍 {g.district || district}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {g.category || 'Mandi Grievance'}
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-md leading-relaxed">
                        <p className="line-clamp-2">{g.description || g.translated_text}</p>
                        {g.remark && (
                          <p className="text-[10px] text-emerald-800 bg-emerald-50 p-1 rounded mt-1 border border-emerald-100">
                            <strong>Govt Action:</strong> {g.remark}
                          </p>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            g.status === 'Resolved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : g.status === 'In Progress'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {g.status || 'Open'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <select
                          value={g.status || 'Open'}
                          onChange={(e) => handleUpdateStatus(g.id, e.target.value)}
                          className="text-[11px] font-bold bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800 cursor-pointer"
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolve</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Grievance Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-rose-50 text-rose-700 rounded-xl">
                  <ShieldAlert size={18} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">
                    Lodge Official Grievance Ticket
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    ఆంధ్రప్రదేశ్ వ్యవసాయ మార్కెటింగ్ శాఖ • 24hr Official SLA
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateManualGrievance} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Complainant / Farmer Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold focus:bg-white focus:border-emerald-600 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">10-Digit Mobile Number</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formMobile}
                    onChange={(e) => setFormMobile(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold focus:bg-white focus:border-emerald-600 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">AP District (జిల్లా)</label>
                  <select
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold focus:bg-white focus:border-emerald-600 outline-hidden"
                  >
                    {DISTRICT_LIST.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Grievance Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold focus:bg-white focus:border-emerald-600 outline-hidden"
                  >
                    <option value="Mandi Payment Delay">Mandi Payment Delay (చెల్లింపు ఆలస్యం)</option>
                    <option value="Weighment Discrepancy">Weighment Discrepancy (తూకం తేడా)</option>
                    <option value="Crop Damage Compensation">Crop Damage Compensation (పంట నష్టం)</option>
                    <option value="Transport Logistics Issue">Transport Logistics Issue (రవాణా సమస్య)</option>
                    <option value="Cold Storage Delay">Cold Storage Delay (శీతల గోదాము సమస్య)</option>
                    <option value="Other Mandi Grievance">Other Mandi Grievance (ఇతర సమస్య)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Description of Issue / Mandi Details (వివరణ)
                </label>
                <textarea
                  rows={3}
                  required
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="State the lot ID, amount delayed, mandi location, or weighbridge receipt details..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-xs focus:bg-white focus:border-emerald-600 outline-hidden resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2.5 bg-[#062419] hover:bg-[#0a3a28] text-emerald-300 hover:text-white rounded-xl font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
                >
                  <Send size={13} />
                  <span>{formSubmitting ? 'Recording Ticket...' : 'Submit Grievance Ticket'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
