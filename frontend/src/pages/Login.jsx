import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 font-sans flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl mix-blend-multiply"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-300/20 rounded-full blur-3xl mix-blend-multiply"></div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] p-10 border border-white/50 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 p-4 rounded-2xl shadow-lg shadow-indigo-200/50">
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-2 tracking-tight">Welcome Back</h2>
        <p className="text-center text-slate-500 mb-8 font-medium">Sign in to your CRM Pro account</p>
        
        {error && <div className="bg-red-50/80 backdrop-blur-sm text-red-600 font-medium p-4 rounded-xl text-sm mb-6 border border-red-100 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          {error}
        </div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 font-medium text-slate-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 font-medium text-slate-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold py-3.5 px-4 rounded-xl hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md shadow-indigo-200/50 mt-6 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>
        <div className="mt-8 text-sm text-center text-slate-500 font-medium bg-slate-50/50 p-4 rounded-xl border border-slate-100 backdrop-blur-sm">
          Demo Credentials: <span className="text-slate-700">admin@example.com</span> / <span className="text-slate-700">password123</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
