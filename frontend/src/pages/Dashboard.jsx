import React, { useEffect, useState } from 'react';
import api from '../api';
import { DollarSign, Users, CheckCircle, XCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5 transition-all hover:shadow-md">
    <div className={`p-4 rounded-xl ${colorClass}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/leads/dashboard');
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-gray-500 font-medium animate-pulse">Loading dashboard statistics...</p>
    </div>
  );
  if (!stats) return (
    <div className="flex flex-col items-center justify-center h-64">
      <p className="text-red-500 font-medium">Error loading dashboard statistics.</p>
    </div>
  );

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8 tracking-tight">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total Leads" value={stats.totalLeads} icon={Users} colorClass="bg-blue-500" />
        <StatCard title="New Leads" value={stats.newLeads} icon={Users} colorClass="bg-indigo-500" />
        <StatCard title="Qualified Leads" value={stats.qualifiedLeads} icon={CheckCircle} colorClass="bg-yellow-500" />
        <StatCard title="Won Deals" value={stats.wonLeads} icon={CheckCircle} colorClass="bg-green-500" />
        <StatCard title="Lost Leads" value={stats.lostLeads} icon={XCircle} colorClass="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-50 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">Total Pipeline Value</h3>
          </div>
          <p className="text-4xl font-bold text-indigo-600 tracking-tight">{formatCurrency(stats.totalEstimatedValue)}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-50 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">Total Won Value</h3>
          </div>
          <p className="text-4xl font-bold text-green-600 tracking-tight">{formatCurrency(stats.totalWonValue)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
