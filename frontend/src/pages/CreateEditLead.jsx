import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const CreateEditLead = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lead_name: '',
    company_name: '',
    email: '',
    phone_number: '',
    lead_source: '',
    assigned_salesperson: '',
    status: 'New',
    estimated_deal_value: 0
  });

  useEffect(() => {
    if (isEditing) {
      const fetchLead = async () => {
        try {
          const res = await api.get(`/leads/${id}`);
          setFormData(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchLead();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/leads/${id}`, formData);
      } else {
        await api.post('/leads', formData);
      }
      navigate('/leads');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold text-slate-800 mb-8 tracking-tight">{isEditing ? 'Edit Lead' : 'Create New Lead'}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Lead Name <span className="text-red-500">*</span></label>
            <input required type="text" name="lead_name" value={formData.lead_name} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
            <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Lead Source</label>
            <input type="text" name="lead_source" value={formData.lead_source} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. Website, Referral" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Assigned Salesperson</label>
            <input type="text" name="assigned_salesperson" value={formData.assigned_salesperson} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all">
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Estimated Deal Value ($)</label>
            <input type="number" name="estimated_deal_value" value={formData.estimated_deal_value} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/leads')} className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors font-medium">Cancel</button>
          <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium shadow-sm shadow-indigo-200">Save Lead</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditLead;
