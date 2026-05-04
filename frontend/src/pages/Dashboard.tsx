import { useState } from 'react';

const Dashboard = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="bg-[#f9f9ff] text-on-background font-body-md overflow-hidden h-screen flex flex-col relative">
      {/* Top Navbar */}
      <header className="flex justify-between items-center h-16 px-6 w-full bg-white border-b border-slate-200 shrink-0 z-50">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-slate-900">CivicVoice Intelligence</span>
          <div className="flex items-center gap-4 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
            <span className="material-symbols-outlined text-blue-600 text-lg">person</span>
            <span className="text-body-sm font-bold text-slate-700">Ramesh K.</span>
            <div className="flex items-center gap-2 border-l border-slate-200 pl-4 ml-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Active on Call</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-slate-900 text-white px-4 py-1.5 rounded-lg flex items-center gap-3">
             <span className="material-symbols-outlined text-sm">schedule</span>
             <span className="text-sm font-black tracking-widest">04:12</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-500 cursor-pointer">notifications</span>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="material-symbols-outlined text-slate-500 cursor-pointer hover:bg-slate-50 p-2 rounded-full"
            >
              settings
            </button>
            <div 
              onClick={() => setShowProfile(!showProfile)}
              className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden ml-2 border border-slate-200 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
            >
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPurKNj_xLrxBpKrdHgJ76c_TKalq-hBo5zeh-dJV07PmRT9yX93MPO-slCaSh0UZQRVrxBEhPlVBQZNpOcXNS-kQ_iebOJ-TSvhFhugwVAVltdY2MC382zpDnp4QUY4clar11p0vbBaYgJVeaDR_iN0NOcCbaFKp6GPqpYnXN6lm_B9XeMCwFV9SfTtVsQIhBmObOk4HO7VoLIok-Nk6CwivGNway8y6nnUoumLCAPULaKNKuRj3thiockS7pYy_Zm-TRuujjzL4" alt="Agent" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Nav Sidebar */}
        <nav className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col py-6 shrink-0">
          <div className="px-6 mb-8">
             <h2 className="text-lg font-black text-blue-900 leading-tight">Helpline Admin</h2>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Verified Operator</p>
          </div>
          <div className="flex-1 px-4 space-y-2">
             <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white text-blue-900 shadow-sm border border-slate-200 rounded-xl font-bold text-sm">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span> Agent Dashboard
             </a>
             <a href="/history" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-all font-semibold text-sm">
                <span className="material-symbols-outlined">history</span> Call History
             </a>
             <a href="/supervisor" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-all font-semibold text-sm">
                <span className="material-symbols-outlined">monitoring</span> Supervisor Overview
             </a>
          </div>
        </nav>

        {/* Queue Sidebar */}
        <aside className="w-72 border-r border-slate-200 bg-white flex flex-col shrink-0">
           <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800">Active Queue</h3>
              <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-black rounded-full">4 Live</span>
           </div>
           <div className="flex-1 overflow-y-auto custom-scrollbar">
              {[
                { id: '#CALL-2940', name: 'Mrs. Gowda', status: 'URGENT', sentiment: 'Concerned', time: '04:12', active: true },
                { id: '#CALL-2941', name: 'Mr. Venkat Rao', status: 'Neutral', sentiment: 'Inquiry', time: 'Wait: 2m', active: false },
              ].map((call, i) => (
                <div key={i} className={`p-6 border-b border-slate-50 cursor-pointer transition-all ${call.active ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'hover:bg-slate-50'}`}>
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black text-slate-400">{call.id}</span>
                   </div>
                   <div className="text-sm font-bold text-slate-900 mb-1">{call.name}</div>
                   <div className="text-[10px] font-bold text-slate-500">{call.sentiment} · {call.time}</div>
                </div>
              ))}
           </div>
        </aside>

        {/* Main Conversation Area */}
        <main className="flex-1 bg-white flex flex-col overflow-hidden relative">
           <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar pb-32">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                 <h3 className="text-sm font-bold text-slate-800 mb-2">Live Context Summary</h3>
                 <p className="text-sm text-slate-600 leading-relaxed">
                    Citizen reporting a major water main burst near Richmond Road. Priority: <span className="text-red-600 font-bold">High</span>.
                 </p>
              </div>

              <div className="space-y-8">
                 <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 max-w-[80%]">
                    <p className="text-lg font-bold text-slate-800">ನಮಸ್ಕಾರ ಸರ್, ನಮ್ಮ ರಿಚ್ಮಂಡ್ ರಸ್ತೆಯಲ್ಲಿ ನೀರಿನ ಪೈಪ್ ಒಡೆದಿದೆ.</p>
                 </div>
                 <div className="flex flex-col items-end">
                    <div className="p-6 bg-primary text-white rounded-2xl max-w-[80%] shadow-lg">
                       <p className="text-sm font-bold">Don't worry ma'am, I am recording this. Which building is it near?</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-200 flex items-center gap-4">
              <button className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200">
                 <span className="material-symbols-outlined">mic</span>
              </button>
              <input className="flex-1 h-12 bg-slate-50 border border-slate-200 rounded-lg px-6 text-sm" placeholder="Type response..." />
              <button 
                onClick={() => alert("Simulation Started...")}
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg"
              >
                <span className="material-symbols-outlined text-[18px]">add_call</span> New AI Call
              </button>
           </div>
        </main>
      </div>

      {/* Panels */}
      {showSettings && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl z-[100] p-8 border-l border-slate-200">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Settings</h3>
            <span className="material-symbols-outlined cursor-pointer" onClick={() => setShowSettings(false)}>close</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
             <p className="text-xs font-bold text-slate-500 uppercase">Audio Engine: Active</p>
          </div>
        </div>
      )}
      
      {showProfile && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl z-[100] p-8 border-l border-slate-200">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Profile</h3>
            <span className="material-symbols-outlined cursor-pointer" onClick={() => setShowProfile(false)}>close</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 mb-4 overflow-hidden border border-slate-200">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPurKNj_xLrxBpKrdHgJ76c_TKalq-hBo5zeh-dJV07PmRT9yX93MPO-slCaSh0UZQRVrxBEhPlVBQZNpOcXNS-kQ_iebOJ-TSvhFhugwVAVltdY2MC382zpDnp4QUY4clar11p0vbBaYgJVeaDR_iN0NOcCbaFKp6GPqpYnXN6lm_B9XeMCwFV9SfTtVsQIhBmObOk4HO7VoLIok-Nk6CwivGNway8y6nnUoumLCAPULaKNKuRj3thiockS7pYy_Zm-TRuujjzL4" alt="Ramesh" />
            </div>
            <h4 className="font-bold">Ramesh K.</h4>
            <button className="mt-8 w-full py-2 bg-red-50 text-red-600 font-bold rounded-lg" onClick={() => window.location.href='/login'}>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
