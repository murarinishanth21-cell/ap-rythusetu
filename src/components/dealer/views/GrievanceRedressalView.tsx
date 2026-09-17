import React, { useState } from 'react';
import { api } from '../../../api';

interface GrievanceRedressalViewProps {
  district: string;
}

export const GrievanceRedressalView: React.FC<GrievanceRedressalViewProps> = ({
  district
}) => {
  const [grievances, setGrievances] = useState<any[]>([
    {
      id: 'AP-GRV-2026-0081',
      user_name: 'V. Ramana Rao',
      user_role: 'farmer',
      district: 'Guntur',
      category: 'Mandi Payment Delay',
      description: 'Payment of ₹1,85,000 for 150 Q Chilli delayed beyond 24 hours at Amaravathi Mandi.',
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
      district: 'Guntur',
      category: 'Crop Damage Compensation',
      description: 'Unseasonal hail storm damage claim assessment submitted via RBK center.',
      status: 'Resolved',
      created_at: '14 Sep 2025'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGrievances = grievances.filter((g) => {
    if (filterStatus !== 'All' && g.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        g.user_name.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const numId = parseInt(id.replace(/\D/g, ''), 10) || 1;
      await api.updateGrievanceStatus(numId, newStatus);
      setGrievances((prev) =>
        prev.map((g) => (g.id === id ? { ...g, status: newStatus } : g))
      );
      alert(`Grievance ${id} status updated to ${newStatus}.`);
    } catch {
      setGrievances((prev) =>
        prev.map((g) => (g.id === id ? { ...g, status: newStatus } : g))
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>⚖️</span>
            <span>/</span>
            <span className="text-slate-600 font-semibold">Grievances</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
            Grievance Redressal &amp; Dispute Resolution
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            AP Civil Supplies &amp; Agriculture Department official dispute resolution desk for {district} Mandis
          </p>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-medium text-slate-500">Total Grievances</p>
          <h3 className="text-lg font-black text-slate-900 mt-0.5">{grievances.length} Tickets</h3>
          <p className="text-[11px] font-bold text-slate-500 mt-0.5">In {district} Region</p>
        </div>

        <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-100 shadow-xs">
          <p className="text-[11px] font-medium text-rose-800">Pending Review</p>
          <h3 className="text-lg font-black text-rose-900 mt-0.5">
            {grievances.filter((g) => g.status === 'Open').length} Open
          </h3>
          <p className="text-[11px] font-bold text-rose-600 mt-0.5">Under 24hr SLA</p>
        </div>

        <div className="bg-amber-50/40 rounded-2xl p-4 border border-amber-100 shadow-xs">
          <p className="text-[11px] font-medium text-amber-800">Under Investigation</p>
          <h3 className="text-lg font-black text-amber-900 mt-0.5">
            {grievances.filter((g) => g.status === 'In Progress').length} Active
          </h3>
          <p className="text-[11px] font-bold text-amber-600 mt-0.5">RBK Officer Assigned</p>
        </div>

        <div className="bg-emerald-50/40 rounded-2xl p-4 border border-emerald-100 shadow-xs">
          <p className="text-[11px] font-medium text-emerald-800">Resolved Disputes</p>
          <h3 className="text-lg font-black text-emerald-900 mt-0.5">
            {grievances.filter((g) => g.status === 'Resolved').length} Settled
          </h3>
          <p className="text-[11px] font-bold text-emerald-600 mt-0.5">100% Redressal</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-black text-slate-900">
              Mandi Dispute &amp; Grievance Registry
            </h3>
            <p className="text-[11px] text-slate-400">
              Review and resolve payment, grading, and freight disputes
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ticket ID or name..."
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700"
            >
              <option>All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                <th className="py-2.5 px-4">Ticket ID</th>
                <th className="py-2.5 px-4">Complainant</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4">Description</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-center">Change Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGrievances.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">{g.id}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{g.user_name}</p>
                    <p className="text-[10px] text-slate-400 capitalize">{g.user_role}</p>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{g.category}</td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-sm">{g.description}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        g.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : g.status === 'In Progress'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {g.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <select
                      value={g.status}
                      onChange={(e) => handleUpdateStatus(g.id, e.target.value)}
                      className="text-[11px] font-bold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700"
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
