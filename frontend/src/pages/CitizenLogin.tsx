import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CitizenLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    
    // Simulate auth by saving to localStorage
    const user = { phone, name: isLogin ? 'Citizen User' : name };
    localStorage.setItem('samvaada_citizen', JSON.stringify(user));
    
    navigate('/citizen/dashboard');
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#f9f9ff] text-[#111c2c] font-sans relative">
      {/* Back button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors"
      >
        <span className="material-symbols-outlined">arrow_back</span> Back
      </button>

      {/* Brand Identity */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-4">
          <span className="material-symbols-outlined text-3xl">public</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-3xl font-extrabold text-[#00193c] tracking-tight">Citizen Portal</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Karnataka 1092 Helpline</p>
        </div>
      </div>

      {/* Login Container */}
      <section className="w-full max-w-md bg-white border border-slate-200 p-10 shadow-xl rounded-3xl">
        <div className="flex mb-8 bg-slate-100 p-1 rounded-xl">
          <button 
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400">person</span>
                </div>
                <input 
                  className="w-full h-12 pl-12 pr-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none font-medium transition-all" 
                  placeholder="Enter your name" 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Mobile Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">smartphone</span>
              </div>
              <input 
                className="w-full h-12 pl-12 pr-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none font-medium transition-all" 
                placeholder="10-digit mobile number" 
                type="tel" 
                pattern="[0-9]{10}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="w-full h-14 bg-blue-600 text-white font-bold text-lg flex items-center justify-center gap-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]" type="submit">
            {isLogin ? 'Get OTP to Login' : 'Create Profile'}
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </form>
      </section>
    </main>
  );
};

export default CitizenLogin;
