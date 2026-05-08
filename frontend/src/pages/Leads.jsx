import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Plus, Search, Filter } from 'lucide-react';

const statusColors = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Qualified': 'bg-purple-100 text-purple-800',
  'Proposal Sent': 'bg-orange-100 text-orange-800',
  'Won': 'bg-green-100 text-green-800',
  'Lost': 'bg-red-100 text-red-800',
};

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [salespersonFilter, setSalespersonFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);
      if (sourceFilter) params.append('lead_source', sourceFilter);
      if (salespersonFilter) params.append('assigned_salesperson', salespersonFilter);
      
      const res = await api.get(`/leads?${params.toString()}`);
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, statusFilter, sourceFilter, salespersonFilter]);

  if (loading && leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading leads...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Leads</h1>
        <Link to="/leads/new" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Lead
        </Link>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads, companies, or emails..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            {Object.keys(statusColors).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="">All Sources</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Cold Call">Cold Call</option>
            <option value="Conference">Conference</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Salesperson..."
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none w-36"
            value={salespersonFilter}
            onChange={(e) => setSalespersonFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm tracking-wide">
                <th className="p-5 font-semibold text-slate-500 uppercase">Name</th>
                <th className="p-5 font-semibold text-slate-500 uppercase">Company</th>
                <th className="p-5 font-semibold text-slate-500 uppercase">Status</th>
                <th className="p-5 font-semibold text-slate-500 uppercase">Value</th>
                <th className="p-5 font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-all">
                  <td className="p-5">
                    <div className="font-semibold text-slate-800">{lead.lead_name}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{lead.email}</div>
                  </td>
                  <td className="p-5 text-slate-600 font-medium">{lead.company_name}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[lead.status] || 'bg-slate-100 text-slate-800'}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-5 text-slate-600 font-medium">${lead.estimated_deal_value || 0}</td>
                  <td className="p-5">
                    <Link to={`/leads/${lead.id}`} className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline">View</Link>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-500 font-medium">No leads found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;
