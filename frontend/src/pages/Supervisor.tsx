import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Supervisor = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ active_agents: 0, total_calls_today: 0, avg_accuracy: 0 });
  const [chartHeights] = useState(() => Array.from({ length: 24 }, () => Math.random() * 75 + 20));

  useEffect(() => {
    axios.get('/api/v1/users/stats')
      .then(r => setStats(r.data))
      .catch(() => setStats({ active_agents: 3, total_calls_today: 124, avg_accuracy: 0.982 }));
  }, []);

  return (
    <div className="bg-[#f9f9ff] text-on-surface overflow-hidden h-screen flex flex-col">

      {/* ── Top Bar ──────────────────────────────────────────────── */}
      <header className="flex justify-between items-center h-16 px-6 w-full sticky top-0 z-50 bg-white border-b border-slate-200 shrink-0">
        <div className="text-xl font-bold tracking-tight text-slate-900">CivicVoice Intelligence</div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none w-56 bg-slate-50" placeholder="Search…" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Notifications cleared')}
              className="p-2 rounded-full hover:bg-slate-100 transition-all"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-slate-500">notifications</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-full hover:bg-slate-100 transition-all"
              title="Settings"
            >
              <span className="material-symbols-outlined text-slate-500">settings</span>
            </button>
            <div
              onClick={() => navigate('/dashboard')}
              className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ml-1"
            >
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNoCQUspZyWDLDzPVnTK-JatDOrTnYL3f-V4TDTgKZ29swkrNET3G-X4xqIlqjI0Hk8pnzb8SrjjRfRlkFB_HDOlT4fOF1K3JO7075g-8qNhsxHt9jwCG5bW4mWTex3WDxfQ2d896REx1G_Gmg1Ppu0Exv-dnJC9dIEltPrjH_IVOi1KbdPrMttWernlN2r2xkOyYlxDapVkhpd2I9X6uhKfVUTbf8B6fdNz_Jve6aJohtQiq2TFRS4FLEqpWQLEYJWe8oBae7crc" alt="Supervisor" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ──────────────────────────────────────────────── */}
        <nav className="flex flex-col h-full w-64 border-r border-slate-200 bg-slate-50 pt-6 px-4 shrink-0">
          <div className="px-4 pb-6 border-b border-slate-200 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-900 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
              </div>
              <div>
                <div className="text-sm font-black text-blue-900">Helpline Admin</div>
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Verified Supervisor</div>
              </div>
            </div>
          </div>
          <div className="flex-1 px-2 space-y-1">
            <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-all font-semibold text-sm text-left">
              <span className="material-symbols-outlined text-sm">dashboard</span> Agent Dashboard
            </button>
            <button onClick={() => navigate('/history')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-all font-semibold text-sm text-left">
              <span className="material-symbols-outlined text-sm">history</span> Call History
            </button>
            <button onClick={() => navigate('/supervisor')} className="w-full flex items-center gap-3 px-4 py-3 bg-white text-blue-900 shadow-sm border border-slate-200 rounded-lg font-bold text-sm text-left">
              <span className="material-symbols-outlined text-sm">monitoring</span> Supervisor Overview
            </button>
          </div>
        </nav>

        {/* ── Main Canvas ──────────────────────────────────────────── */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-primary">Supervisor Overview</h1>
                <p className="text-sm text-slate-500 mt-1">Real-time metrics for Karnataka Samvaada AI Helpline.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-5 py-2.5 border border-slate-200 bg-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">add_call</span> Go to Dashboard
                </button>
                <button
                  onClick={() => alert('Report exported as PDF!')}
                  className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-md active:scale-95 text-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">file_download</span> Export Report
                </button>
              </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {[
                { label: 'Total Calls Today', value: stats.total_calls_today, change: '+12%', icon: 'call', color: 'green' },
                { label: 'Avg. Handle Time',  value: '4m 12s',               change: '-2.4s', icon: 'timer', color: 'amber' },
                { label: 'AI Accuracy',       value: `${(stats.avg_accuracy * 100).toFixed(1)}%`, change: '↑0.8%', icon: 'verified', color: 'blue' },
                { label: 'Active Agents',     value: stats.active_agents,     change: 'LIVE',  icon: 'support_agent', color: 'red' },
              ].map((kpi, i) => (
                <div key={i} className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="material-symbols-outlined text-slate-400">{kpi.icon}</span>
                    <span className={`text-${kpi.color}-600 bg-${kpi.color}-50 px-2 py-0.5 rounded text-[10px] font-black`}>{kpi.change}</span>
                  </div>
                  <div className="text-3xl font-black text-primary tracking-tight mb-1">{kpi.value}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-6">

              {/* Bar Chart */}
              <div className="col-span-12 lg:col-span-8 bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-primary">Call Volume — Last 24 Hours</h3>
                  <button
                    onClick={() => navigate('/history')}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    View All History <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
                <div className="h-52 flex items-end gap-1.5 border-b border-slate-100">
                  {chartHeights.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <div
                        className="w-full bg-primary/20 rounded-t hover:bg-primary transition-all cursor-pointer"
                        style={{ height: `${h}%` }}
                        onClick={() => navigate('/history')}
                        title={`Hour ${i}:00 — ${Math.round(h * 2)} calls`}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                  <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
                </div>
              </div>

              {/* Trending Intents */}
              <div className="col-span-12 lg:col-span-4 bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
                <h3 className="text-lg font-bold text-primary mb-6">Trending Issues</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Power Outage',        count: 842, icon: 'bolt',          color: 'red' },
                    { label: 'Street Light Repair',  count: 621, icon: 'lightbulb',     color: 'amber' },
                    { label: 'Water Shortage',       count: 415, icon: 'water_drop',    color: 'blue' },
                    { label: 'Road Pothole',         count: 288, icon: 'construction',  color: 'orange' },
                  ].map((intent, i) => (
                    <button
                      key={i}
                      onClick={() => navigate('/history')}
                      className="w-full flex items-center justify-between group hover:bg-slate-50 p-2 rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-${intent.color}-50 text-${intent.color}-600 flex items-center justify-center`}>
                          <span className="material-symbols-outlined text-sm">{intent.icon}</span>
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold text-slate-900">{intent.label}</div>
                          <div className="text-[10px] font-bold text-slate-400">{intent.count} reports</div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors text-sm">chevron_right</span>
                    </button>
                  ))}
                </div>

                {/* Add Agent shortcut */}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="mt-6 w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold text-xs hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">person_add</span> Add New Agent Profile
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Supervisor;
