import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Edit, Trash2, ArrowLeft, Send } from 'lucide-react';

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchLead();
    fetchNotes();
  }, [id]);

  const fetchLead = async () => {
    const res = await api.get(`/leads/${id}`);
    setLead(res.data);
  };

  const fetchNotes = async () => {
    const res = await api.get(`/notes/${id}`);
    setNotes(res.data);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      await api.delete(`/leads/${id}`);
      navigate('/leads');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    await api.post('/notes', {
      lead_id: id,
      note_content: newNote,
      created_by: user.email,
    });
    setNewNote('');
    fetchNotes();
  };

  if (!lead) return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-gray-500 font-medium animate-pulse">Loading lead details...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/leads" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6 font-semibold transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Leads
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">{lead.lead_name}</h1>
                <p className="text-lg text-slate-500 font-medium">{lead.company_name}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/leads/${id}/edit`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                  <Edit className="w-5 h-5" />
                </Link>
                <button onClick={handleDelete} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm mt-6">
              <div><span className="text-slate-400 font-medium uppercase tracking-wider text-xs">Email</span> <br/><span className="font-semibold text-slate-800 text-base">{lead.email || '-'}</span></div>
              <div><span className="text-slate-400 font-medium uppercase tracking-wider text-xs">Phone</span> <br/><span className="font-semibold text-slate-800 text-base">{lead.phone_number || '-'}</span></div>
              <div><span className="text-slate-400 font-medium uppercase tracking-wider text-xs">Status</span> <br/><span className="font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mt-1 inline-block text-xs">{lead.status}</span></div>
              <div><span className="text-slate-400 font-medium uppercase tracking-wider text-xs">Deal Value</span> <br/><span className="font-bold text-green-600 text-base">${lead.estimated_deal_value || 0}</span></div>
              <div><span className="text-slate-400 font-medium uppercase tracking-wider text-xs">Source</span> <br/><span className="font-semibold text-slate-800 text-base">{lead.lead_source || '-'}</span></div>
              <div><span className="text-slate-400 font-medium uppercase tracking-wider text-xs">Assigned To</span> <br/><span className="font-semibold text-slate-800 text-base">{lead.assigned_salesperson || '-'}</span></div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6 tracking-tight">Notes</h2>
            
            <form onSubmit={handleAddNote} className="mb-6 flex gap-3">
              <input 
                type="text" 
                value={newNote} 
                onChange={(e) => setNewNote(e.target.value)} 
                placeholder="Add a note..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium">
                <Send className="w-4 h-4" /> Add
              </button>
            </form>

            <div className="space-y-4">
              {notes.map(note => (
                <div key={note.id} className="p-5 bg-slate-50/50 rounded-xl border border-slate-100">
                  <p className="text-slate-700 mb-3 leading-relaxed">{note.note_content}</p>
                  <div className="text-xs text-slate-400 flex justify-between font-medium">
                    <span>{note.created_by}</span>
                    <span>{new Date(note.created_at).toLocaleString()}</span>
                  </div>
                </div>
              ))}
              {notes.length === 0 && <p className="text-slate-400 italic text-sm">No notes added yet.</p>}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">System Info</h3>
            <div className="space-y-5 text-sm">
              <div><span className="text-slate-400 block mb-1 font-medium">Created At</span> <span className="font-semibold text-slate-800">{new Date(lead.created_at).toLocaleString()}</span></div>
              <div><span className="text-slate-400 block mb-1 font-medium">Last Updated</span> <span className="font-semibold text-slate-800">{new Date(lead.updated_at).toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
