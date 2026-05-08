import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 text-slate-300 w-64 min-h-screen flex flex-col fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6 text-2xl font-bold flex items-center gap-3 text-white tracking-tight">
        <div className="bg-indigo-600 p-2 rounded-xl">
          <Users className="w-6 h-6 text-white" />
        </div>
        CRM Pro
      </div>
      <div className="flex-1 px-4 space-y-1 mt-6">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">Menu</div>
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-all font-medium">
          <LayoutDashboard className="w-5 h-5 text-slate-400" />
          Dashboard
        </Link>
        <Link to="/leads" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-all font-medium">
          <Users className="w-5 h-5 text-slate-400" />
          Leads
        </Link>
      </div>
      <div className="p-4 border-t border-slate-800">
        <div className="mb-4 text-sm text-slate-400 truncate px-3">{user?.email}</div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-all text-left font-medium text-slate-300"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
