import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9f9ff] font-sans flex flex-col items-center justify-center p-6 text-slate-900">
      <div className="flex flex-col items-center mb-12 text-center">
        <img 
          alt="Government Seal" 
          className="h-24 w-auto object-contain mb-6 drop-shadow-sm" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvmAnZFbtOv9FA5zNphcQMx0C5LSSAnUnuAqWtXd1ATQqHrAWfpLbx87QRhNxy-ysCUJWohVaR4gc983bUNjlJUNQj-mqM8nria0SklXkeVjBD1BiGr5kXfBBUm8fPN01kkMjVbzGU2TvjkpCwobv4RPK2yvXuQlFHJktxQHPReaHj6XorSubRb_90E5S2NfX59ZSOdfkiWJUy1dQ03dHsFqM_LieEgxwa2GhsJxoVRRSCc39QN8p4f9JNrBqMzulbl_g08yjWo00"
        />
        <h1 className="text-5xl font-extrabold text-[#00193c] tracking-tight mb-2">Samvaada AI</h1>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">CivicVoice Intelligence Platform</p>
        <p className="mt-4 text-slate-600 max-w-lg">Please select your portal to continue. Citizens can book complaints, while 1092 operators manage the queue.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Citizen Card */}
        <div 
          onClick={() => navigate('/citizen/login')}
          className="group cursor-pointer bg-white border-2 border-transparent hover:border-blue-500 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 z-10 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl">groups</span>
          </div>
          <h2 className="text-2xl font-bold text-[#00193c] mb-3 z-10">Citizen Portal</h2>
          <p className="text-slate-500 font-medium z-10">Book a new complaint, report civic issues, and track your service requests.</p>
          <button className="mt-8 px-8 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors z-10 w-full">
            Enter as Citizen
          </button>
        </div>

        {/* Admin Card */}
        <div 
          onClick={() => navigate('/login')}
          className="group cursor-pointer bg-white border-2 border-transparent hover:border-slate-800 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-slate-50 rounded-br-full -ml-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div className="w-20 h-20 bg-slate-100 text-slate-700 rounded-2xl flex items-center justify-center mb-6 z-10 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl">admin_panel_settings</span>
          </div>
          <h2 className="text-2xl font-bold text-[#00193c] mb-3 z-10">Admin / Operator</h2>
          <p className="text-slate-500 font-medium z-10">1092 Helpline agents and supervisors. Secure login required.</p>
          <button className="mt-8 px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl group-hover:bg-[#00193c] group-hover:text-white transition-colors z-10 w-full">
            Secure Login
          </button>
        </div>
      </div>
      
      <footer className="mt-16 text-center opacity-60">
        <div className="text-xs mt-2 py-2 text-slate-500 font-medium">© 2026 Government of Karnataka | Powered by AI for Bharat</div>
      </footer>
    </div>
  );
};

export default Landing;
