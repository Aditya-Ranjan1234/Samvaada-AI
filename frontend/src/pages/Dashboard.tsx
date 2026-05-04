const Dashboard = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  return (
    <div className="bg-[#f9f9ff] text-on-background font-body-md overflow-hidden h-screen flex flex-col">
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
          <div className="px-4 border-t border-slate-200 pt-6 space-y-2">
             <div className="flex items-center gap-3 px-4 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 rounded-xl cursor-pointer">
                <span className="material-symbols-outlined text-sm">translate</span> Language Settings
             </div>
             <div className="flex items-center gap-3 px-4 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 rounded-xl cursor-pointer">
                <span className="material-symbols-outlined text-sm">help</span> Support
             </div>
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
                { id: '#CALL-2940', name: 'Mrs. Gowda', status: 'URGENT', sentiment: 'Concerned / Distressed', time: '04:12', active: true },
                { id: '#CALL-2941', name: 'Mr. Venkat Rao', status: 'Neutral Inquiry', sentiment: 'Neutral', time: 'Wait: 2m', active: false },
                { id: '#CALL-2942', name: 'Shanti Kumari', status: 'Status Check', sentiment: 'Waiting', time: 'Wait: 5m', active: false },
              ].map((call, i) => (
                <div key={i} className={`p-6 border-b border-slate-50 cursor-pointer transition-all ${call.active ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'hover:bg-slate-50'}`}>
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black text-slate-400">{call.id}</span>
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${call.status === 'URGENT' ? 'bg-red-100 text-red-600' : 'text-slate-400 uppercase tracking-widest'}`}>{call.status}</span>
                   </div>
                   <div className="text-sm font-bold text-slate-900 mb-1">{call.name}</div>
                   <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                      <div className="flex items-center gap-1">
                         <span className="material-symbols-outlined text-sm">sentiment_neutral</span> {call.sentiment}
                      </div>
                      <span className={`${call.active ? 'bg-slate-200 text-slate-800' : ''} px-2 py-0.5 rounded`}>{call.time}</span>
                   </div>
                   {call.active && <div className="mt-4 py-1.5 bg-slate-900 text-white text-[9px] font-black text-center rounded uppercase tracking-widest">In Progress</div>}
                </div>
              ))}
           </div>
        </aside>

        {/* Conversation Area */}
        <main className="flex-1 bg-white flex flex-col overflow-hidden relative">
           <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar pb-32">
              {/* Summary Header */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative group">
                 <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-slate-800 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    <h3 className="text-sm font-bold text-slate-800">Live Context Summary</h3>
                 </div>
                 <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    Citizen reporting a <span className="text-red-600 font-bold">major water main burst</span> near Richmond Road. The leakage is flooding the basement of an apartment complex. Priority verification: <span className="italic font-bold">High</span>.
                 </p>
              </div>

              {/* Feed */}
              <div className="space-y-10">
                 <div className="space-y-3">
                    <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Caller (Kannada) <span className="ml-2 font-medium">03:45</span></span>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 max-w-[85%] space-y-4">
                       <p className="text-lg font-bold text-slate-800 leading-snug">ನಮಸ್ಕಾರ ಸರ್, ನಮ್ಮ ರಿಚ್ಮಂಡ್ ರಸ್ತೆಯಲ್ಲಿ ನೀರಿನ ಪೈಪ್ ಒಡೆದಿದೆ. ದಯವಿಟ್ಟು ಬೇಗ ಬನ್ನಿ.</p>
                       <div className="flex items-start gap-3 pt-4 border-t border-slate-200 text-blue-600 italic font-medium text-sm">
                          <span className="material-symbols-outlined text-lg">translate</span>
                          <p>"Hello sir, a water pipe has burst on our Richmond Road. Please come quickly."</p>
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-col items-end space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Agent (Ramesh) <span className="ml-2 font-medium">03:52</span></span>
                    <div className="p-6 bg-primary text-white rounded-2xl rounded-tr-none max-w-[85%] shadow-xl">
                       <p className="text-sm font-bold leading-relaxed">Don't worry ma'am, I am recording this. Can you tell me exactly which building it is near?</p>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Caller (Kannada) <span className="ml-2 font-medium">04:05</span></span>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 max-w-[85%] space-y-4">
                       <p className="text-lg font-bold text-slate-800 leading-snug">ಇದು ಮೌರ್ಯ ಅಪಾರ್ಟ್‌ಮೆಂಟ್ ಎದುರು ಇದೆ. ನೀರು ಪೂರ್ತಿ ಒಳಗೆ ಬರ್ತಿದೆ!</p>
                       <div className="flex items-start gap-3 pt-4 border-t border-slate-200 text-blue-600 italic font-medium text-sm">
                          <span className="material-symbols-outlined text-lg">translate</span>
                          <p>"It is in front of Maurya Apartments. Water is coming completely inside!"</p>
                       </div>
                       <div className="flex gap-2 pt-2">
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-[9px] font-black rounded uppercase">Distress Detected</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-[9px] font-black rounded uppercase">Entity: Maurya Apartments</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Bottom Bar */}
           <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-200 flex items-center gap-4">
              <button className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-all">
                 <span className="material-symbols-outlined">mic</span>
              </button>
              <div className="flex-1 relative">
                 <input className="w-full h-12 bg-slate-50 border border-slate-200 rounded-lg px-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Type response or select recommended response..." />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert("Initializing Live AI Call Simulation...")}
                  className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">add_call</span> New AI Call
                </button>
              </div>
              <button className="bg-red-600 text-white h-12 px-8 rounded-lg font-bold flex items-center gap-3 shadow-lg active:scale-95 transition-all ml-4">
                 <span className="material-symbols-outlined">call_end</span> End & Log Ticket
              </button>
           </div>
        </main>

        {/* Intelligence Sidebar */}
        <aside className="w-80 border-l border-slate-200 bg-white flex flex-col p-6 overflow-y-auto custom-scrollbar shrink-0">
           <div className="mb-8">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                 <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> Verified Entities
              </h3>
              <div className="space-y-6">
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-3">Location</p>
                    <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-3">
                       <span className="material-symbols-outlined text-blue-600">location_on</span>
                       <div>
                          <p className="text-xs font-bold text-slate-900">Richmond Road, Bangalore</p>
                       </div>
                    </div>
                    <div className="w-full h-32 bg-slate-200 rounded-xl border border-slate-100 overflow-hidden relative grayscale opacity-60">
                       <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDuGPUz_a8SV63217T-SuKRK8j4TgPNDcc8rduzg-Ai9QwxMmgbw0QrhTIKjGQLTqOgQQkOdJsu7cDZiRx1N0dqlMtCo45MPN1KPr9S38uc6VNEBV7r6xOLIEH8y9BsRTBatyLCCl9eFRTuObO_o_fz2-2VXvFvECRiQ1OP-KuLV1_k18zU2WS3taQSDRkWiBoHBSjmk9q9z0i2Cd6qHeR3xAUV32ltd0qbY7XzwjTdSwlFMYNyXtCj9FnA2a_xyJXE1Tx24V80GU" alt="Map" className="w-full h-full object-cover" />
                    </div>
                 </div>

                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-3">Primary Issue</p>
                    <div className="flex items-center gap-3 text-red-600 font-bold text-sm">
                       <span className="material-symbols-outlined">home_repair_service</span> Water Main Leakage
                    </div>
                 </div>
              </div>
           </div>

           <div className="mb-8 pt-8 border-t border-slate-100">
              <div className="flex justify-between items-end mb-4">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Urgency & Sentiment</h3>
                 <span className="text-2xl font-black text-red-600">92%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-red-600 w-[92%] rounded-full shadow-[0_0_10px_rgba(220,38,38,0.4)]"></div>
              </div>
              <p className="text-[9px] font-bold text-red-600 italic mt-3">High Urgency: Property damage imminent.</p>
           </div>

           <div className="pt-8 border-t border-slate-100 space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                 <span className="material-symbols-outlined text-lg">bolt</span> Next Actions
              </h3>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-blue-100 transition-all">
                 <span className="material-symbols-outlined text-blue-600">assignment</span>
                 <div>
                    <p className="text-[10px] font-black text-blue-900">Alert BWSSB Team</p>
                    <p className="text-[8px] font-bold text-blue-700">Priority Dispatch - Zone 4</p>
                 </div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-slate-100 transition-all opacity-60">
                 <span className="material-symbols-outlined text-slate-400">info</span>
                 <div>
                    <p className="text-[10px] font-black text-slate-900">Send Safety Instructions</p>
                    <p className="text-[8px] font-bold text-slate-500">Auto-translate to Kannada</p>
                 </div>
              </div>
           </div>
        </aside>
      </div>
      {/* Slide-over Panels */}
      {showSettings && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl z-[100] p-8 border-l border-slate-200 transform transition-all">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">System Settings</h3>
            <span className="material-symbols-outlined cursor-pointer" onClick={() => setShowSettings(false)}>close</span>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <label className="text-xs font-bold uppercase text-slate-500">Audio Input</label>
              <select className="w-full mt-2 p-2 bg-white border border-slate-200 rounded-lg">
                <option>Default Microphone</option>
              </select>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <label className="text-xs font-bold uppercase text-slate-500">Language Auto-Detection</label>
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" checked readOnly />
                <span className="text-sm">Enabled (MMS-LID)</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showProfile && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl z-[100] p-8 border-l border-slate-200 transform transition-all">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Operator Profile</h3>
            <span className="material-symbols-outlined cursor-pointer" onClick={() => setShowProfile(false)}>close</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-slate-100 mb-4 overflow-hidden border-4 border-white shadow-lg">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPurKNj_xLrxBpKrdHgJ76c_TKalq-hBo5zeh-dJV07PmRT9yX93MPO-slCaSh0UZQRVrxBEhPlVBQZNpOcXNS-kQ_iebOJ-TSvhFhugwVAVltdY2MC382zpDnp4QUY4clar11p0vbBaYgJVeaDR_iN0NOcCbaFKp6GPqpYnXN6lm_B9XeMCwFV9SfTtVsQIhBmObOk4HO7VoLIok-Nk6CwivGNway8y6nnUoumLCAPULaKNKuRj3thiockS7pYy_Zm-TRuujjzL4" alt="Ramesh" />
            </div>
            <h4 className="text-lg font-bold">Ramesh K.</h4>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Lead Operator</p>
            <button className="mt-8 w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all">Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
