import { useState, useEffect } from 'react';
import axios from 'axios';

const Supervisor = () => {
  const [stats, setStats] = useState({ active_agents: 0, total_calls_today: 0, avg_accuracy: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/v1/users/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch supervisor stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-[#f9f9ff] text-on-surface font-body-md overflow-hidden h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="flex justify-between items-center h-16 px-6 w-full sticky top-0 z-50 bg-white border-b border-slate-200 shrink-0">
        <div className="text-xl font-bold tracking-tight text-slate-900">CivicVoice Intelligence</div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input className="pl-10 pr-4 py-1.5 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 bg-slate-50" placeholder="Search interactions..." type="text"/>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-500 cursor-pointer hover:bg-slate-50 p-2 rounded-full">notifications</span>
            <button 
              onClick={() => alert("Global System Settings")}
              className="material-symbols-outlined text-slate-500 cursor-pointer hover:bg-slate-50 p-2 rounded-full"
            >
              settings
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden ml-2 border border-slate-200 cursor-pointer">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNoCQUspZyWDLDzPVnTK-JatDOrTnYL3f-V4TDTgKZ29swkrNET3G-X4xqIlqjI0Hk8pnzb8SrjjRfRlkFB_HDOlT4fOF1K3JO7075g-8qNhsxHt9jwCG5bW4mWTex3WDxfQ2d896REx1G_Gmg1Ppu0Exv-dnJC9dIEltPrjH_IVOi1KbdPrMttWernlN2r2xkOyYlxDapVkhpd2I9X6uhKfVUTbf8B6fdNz_Jve6aJohtQiq2TFRS4FLEqpWQLEYJWe8oBae7crc" alt="Supervisor" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SideNavBar */}
        <nav className="flex flex-col h-full w-64 border-r border-slate-200 bg-slate-50 pt-6 px-4 z-40 shrink-0">
          <div className="px-6 pb-6 border-b border-slate-200 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-container rounded flex items-center justify-center text-white shadow-lg">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
              </div>
              <div>
                <div className="text-lg font-black text-blue-900 leading-none">Helpline Admin</div>
                <div className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">Verified Supervisor</div>
              </div>
            </div>
          </div>
          <div className="flex-1 px-4 space-y-1">
             <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-all font-semibold text-sm">
                <span className="material-symbols-outlined">dashboard</span> Agent Dashboard
             </a>
             <a href="/history" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-all font-semibold text-sm">
                <span className="material-symbols-outlined">history</span> Call History
             </a>
             <a href="/supervisor" className="flex items-center gap-3 px-4 py-3 bg-white text-blue-900 shadow-sm border border-slate-200 rounded-lg font-bold text-sm">
                <span className="material-symbols-outlined">monitoring</span> Supervisor Overview
             </a>
          </div>
        </nav>

        {/* Main Content Canvas */}
        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-primary">Supervisor Monitoring Overview</h1>
                <p className="text-sm text-on-surface-variant mt-1 font-medium">Real-time operational metrics for Karnataka Samvaada AI Helpline.</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95">
                  <span className="material-symbols-outlined text-[18px]">file_download</span> Export Report
                </button>
              </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Calls Today', value: stats.total_calls_today, change: '+12%', color: 'green' },
                { label: 'Avg. Handling Time', value: '4m 12s', change: '-2.4s', color: 'red' },
                { label: 'Verification Accuracy', value: `${(stats.avg_accuracy * 100).toFixed(1)}%`, change: '99.2%', color: 'green' },
                { label: 'Active Agents', value: stats.active_agents, change: 'LIVE', color: 'blue' },
              ].map((kpi, i) => (
                <div key={i} className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">{kpi.label}</span>
                    <span className={`text-${kpi.color}-600 bg-${kpi.color}-50 px-2 py-0.5 rounded text-[10px] font-black`}>{kpi.change}</span>
                  </div>
                  <div className="text-3xl font-black text-primary tracking-tight">{kpi.value}</div>
                  <div className="w-full bg-slate-100 h-1 mt-4 rounded-full overflow-hidden">
                    <div className="bg-secondary w-3/4 h-full rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-8">
               {/* Chart Card */}
               <div className="col-span-12 lg:col-span-8 bg-white p-8 border border-slate-200 rounded-3xl shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="text-xl font-bold text-primary">Call Volume (Last 24h)</h3>
                     <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                           <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> Current
                        </div>
                     </div>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-1 px-2 border-b border-slate-50">
                     {Array.from({ length: 24 }).map((_, i) => (
                       <div key={i} className="w-full bg-secondary rounded-t-sm" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                     ))}
                  </div>
                  <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                     <span>00:00</span>
                     <span>12:00</span>
                     <span>23:59</span>
                  </div>
               </div>

               {/* Trending Card */}
               <div className="col-span-12 lg:col-span-4 bg-white p-8 border border-slate-200 rounded-3xl shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-8">Trending Intents</h3>
                  <div className="space-y-6">
                     {[
                       { label: 'Power Outage', count: '842', color: 'red' },
                       { label: 'Street Light Repair', count: '621', color: 'blue' },
                       { label: 'Water Shortage', count: '415', color: 'orange' },
                     ].map((intent, i) => (
                       <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all">
                          <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-xl bg-${intent.color}-50 text-${intent.color}-600 flex items-center justify-center`}>
                                <span className="material-symbols-outlined">bolt</span>
                             </div>
                             <div>
                                <div className="text-sm font-bold text-slate-900">{intent.label}</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase">{intent.count} reports</div>
                             </div>
                          </div>
                          <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Supervisor;
