import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#f9f9ff] text-[#111c2c] font-sans">
      {/* Brand Identity */}
      <div className="flex flex-col items-center mb-10">
        <div className="mb-6">
          <img 
            alt="Government of Karnataka Seal" 
            className="h-24 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvmAnZFbtOv9FA5zNphcQMx0C5LSSAnUnuAqWtXd1ATQqHrAWfpLbx87QRhNxy-ysCUJWohVaR4gc983bUNjlJUNQj-mqM8nria0SklXkeVjBD1BiGr5kXfBBUm8fPN01kkMjVbzGU2TvjkpCwobv4RPK2yvXuQlFHJktxQHPReaHj6XorSubRb_90E5S2NfX59ZSOdfkiWJUy1dQ03dHsFqM_LieEgxwa2GhsJxoVRRSCc39QN8p4f9JNrBqMzulbl_g08yjWo00"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-4xl font-extrabold text-[#00193c] tracking-tight">Samvaada AI</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">CivicVoice Intelligence</p>
        </div>
      </div>

      {/* Login Container */}
      <section className="w-full max-w-md bg-white border border-slate-200 p-10 shadow-xl rounded-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#00193c] mb-2">1092 Helpline Portal</h2>
          <p className="text-sm text-slate-500 font-medium">Enter your credentials to access the operator dashboard.</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Language Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="language">Preferred Language</label>
            <div className="relative">
              <select className="w-full h-12 px-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 appearance-none focus:ring-2 focus:ring-blue-900 focus:outline-none font-medium" id="language" name="language">
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">expand_more</span>
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="username">Username / Employee ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">badge</span>
              </div>
              <input className="w-full h-12 pl-12 pr-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-900 focus:outline-none font-medium" id="username" name="username" placeholder="e.g. KA-1092-OP-88" type="text" required/>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="password">Password</label>
              <a className="text-[10px] text-blue-600 font-bold hover:underline" href="#">Forgot password?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">lock</span>
              </div>
              <input className="w-full h-12 pl-12 pr-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-900 focus:outline-none font-medium" id="password" name="password" placeholder="••••••••" type="password" required/>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full h-14 bg-[#00193c] text-white font-bold text-lg flex items-center justify-center gap-3 rounded-xl hover:bg-black transition-all shadow-lg active:scale-[0.98]" type="submit">
            Secure Sign In
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </button>
        </form>
      </section>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md mt-6">
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <span className="material-symbols-outlined text-blue-900">shield_lock</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-blue-900">2FA Active</h4>
            <p className="text-[10px] text-slate-500 font-medium">OTP verification required for access.</p>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <span className="material-symbols-outlined text-blue-600">support_agent</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-700">Support</h4>
            <p className="text-[10px] text-slate-500 font-medium">Contact IT Helpdesk at ext. 4004.</p>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center opacity-50">
        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">Unauthorized access is prohibited. All sessions are logged.</p>
        <div className="text-[10px] mt-2 py-2 border-t border-slate-200">System Version: v4.2.0-stable | Samvaada Civic Intelligence</div>
      </footer>
    </main>
  );
};

export default Login;
