import { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [calls, setCalls] = useState<any[]>([]);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await axios.get('/api/v1/calls/');
        setCalls(response.data);
      } catch (error) {
        console.error("Failed to fetch call history", error);
      }
    };
    fetchCalls();
  }, []);
  return (
    <div className="bg-background text-on-background font-body-md overflow-hidden h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="flex justify-between items-center h-16 px-6 w-full sticky top-0 z-50 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-slate-900">CivicVoice Intelligence</span>
          <div className="hidden md:flex gap-6">
            <a className="text-slate-500 hover:text-blue-900 font-label-md transition-colors" href="/dashboard">Agent Dashboard</a>
            <a className="text-blue-900 font-semibold border-b-2 border-blue-900 font-label-md" href="/history">Call History</a>
            <a className="text-slate-500 hover:text-blue-900 font-label-md transition-colors" href="/supervisor">Supervisor Overview</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <input className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-1.5 text-body-sm focus:outline-none focus:ring-1 focus:ring-secondary w-64" placeholder="Search interactions..." type="text"/>
            <span className="material-symbols-outlined absolute right-3 top-1.5 text-on-surface-variant text-lg">search</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors cursor-pointer active:opacity-80">
              <span className="material-symbols-outlined text-slate-600">notifications</span>
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors cursor-pointer active:opacity-80">
              <span className="material-symbols-outlined text-slate-600">settings</span>
            </button>
          </div>
          <div className="h-8 w-8 rounded-full overflow-hidden bg-primary-container border border-outline-variant">
            <img alt="Agent Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPurKNj_xLrxBpKrdHgJ76c_TKalq-hBo5zeh-dJV07PmRT9yX93MPO-slCaSh0UZQRVrxBEhPlVBQZNpOcXNS-kQ_iebOJ-TSvhFhugwVAVltdY2MC382zpDnp4QUY4clar11p0vbBaYgJVeaDR_iN0NOcCbaFKp6GPqpYnXN6lm_B9XeMCwFV9SfTtVsQIhBmObOk4HO7VoLIok-Nk6CwivGNway8y6nnUoumLCAPULaKNKuRj3thiockS7pYy_Zm-TRuujjzL4"/>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* SideNavBar / Filter Panel */}
        <aside className="flex flex-col h-full w-64 border-r border-slate-200 bg-slate-50 pt-6 px-4 z-40 overflow-y-auto custom-scrollbar shrink-0">
          <div className="mb-8">
            <h2 className="text-label-md text-on-surface-variant mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              FILTERS
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-caption text-on-surface-variant block mb-2 font-semibold">Date Range</label>
                <select className="w-full bg-white border border-outline-variant rounded px-3 py-2 text-body-sm focus:border-secondary focus:ring-0">
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                  <option selected>Last 30 Days</option>
                </select>
              </div>
              <div>
                <label className="text-caption text-on-surface-variant block mb-2 font-semibold">Department</label>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-body-sm text-slate-700 cursor-pointer py-1">
                    <input checked readOnly className="rounded border-outline-variant text-secondary" type="checkbox"/>
                    Public Works
                  </label>
                  <label className="flex items-center gap-2 text-body-sm text-slate-700 cursor-pointer py-1">
                    <input checked readOnly className="rounded border-outline-variant text-secondary" type="checkbox"/>
                    Electricity (BESCOM)
                  </label>
                </div>
              </div>
              <div>
                <label className="text-caption text-on-surface-variant block mb-2 font-semibold">Citizen Sentiment</label>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-body-sm text-slate-700 cursor-pointer py-1">
                    <input className="text-secondary" name="sentiment" type="radio"/>
                    <span className="material-symbols-outlined text-green-600 text-lg">sentiment_satisfied</span> Positive
                  </label>
                  <label className="flex items-center gap-2 text-body-sm text-slate-700 cursor-pointer py-1">
                    <input checked readOnly className="text-secondary" name="sentiment" type="radio"/>
                    <span className="material-symbols-outlined text-amber-500 text-lg">sentiment_neutral</span> Neutral
                  </label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h1 className="text-h2 font-h2 text-primary">Call History</h1>
                <p className="text-body-sm text-on-surface-variant">Review and manage past helpline interactions with AI-assisted verification.</p>
              </div>
              <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md flex items-center gap-2 active:opacity-90">
                <span className="material-symbols-outlined text-lg">download</span> Export CSV
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-4 py-3 text-label-md text-on-surface-variant">Call ID</th>
                      <th className="px-4 py-3 text-label-md text-on-surface-variant">Date/Time</th>
                      <th className="px-4 py-3 text-label-md text-on-surface-variant">Language</th>
                      <th className="px-4 py-3 text-label-md text-on-surface-variant">Intent</th>
                      <th className="px-4 py-3 text-label-md text-on-surface-variant">Status</th>
                    </tr>
                  </thead>
                   <tbody className="divide-y divide-slate-100">
                    {calls.map((call, i) => (
                      <tr key={i} className="hover:bg-slate-50 cursor-pointer transition-colors">
                        <td className="px-4 py-4 text-body-sm font-medium text-blue-900">{call.call_id}</td>
                        <td className="px-4 py-4 text-body-sm text-slate-600">{call.timestamp}</td>
                        <td className="px-4 py-4"><span className="text-caption bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{call.language}</span></td>
                        <td className="px-4 py-4"><span className="text-caption bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">{call.intent}</span></td>
                        <td className="px-4 py-4">
                          <div className={`flex items-center gap-1 font-bold text-caption ${call.status === 'Verified' ? 'text-green-700' : 'text-amber-600'}`}>
                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                              {call.status === 'Verified' ? 'check_circle' : 'schedule'}
                            </span> 
                            {call.status}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 mt-8">
              <div className="col-span-12 lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 flex flex-col h-[400px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-h3 font-h3 text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined">description</span> Call Transcript
                  </h3>
                  <span className="text-caption bg-secondary-fixed text-on-secondary-fixed px-2 py-1 rounded font-bold uppercase tracking-wider">Audio Recorded</span>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-caption font-bold text-secondary uppercase">CITIZEN [00:12]</span>
                    <p className="text-body-sm text-slate-700 bg-slate-50 p-3 rounded-lg border-l-4 border-slate-300 font-medium">Namaskara, there is a large pothole near the 4th Main Junction in Jayanagar. It's causing traffic congestion.</p>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <span className="text-caption font-bold text-primary uppercase">AI AGENT [00:25]</span>
                    <p className="text-body-sm text-on-primary bg-primary p-3 rounded-lg font-medium">Understood. I am recording a complaint for Jayanagar. Landmark nearby?</p>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-7 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-blue-200 bg-gradient-to-br from-white to-blue-50 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-h3 font-h3 text-blue-900 flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span> AI-Generated Summary
                    </h3>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full border border-green-200">
                      <span className="material-symbols-outlined text-sm">verified_user</span>
                      <span className="text-caption font-bold">Verified Accuracy: 98%</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/60 p-3 rounded-lg border border-slate-100">
                        <p className="text-caption text-slate-500 uppercase font-bold">Primary Issue</p>
                        <p className="text-body-md font-semibold text-slate-900">Severe Pothole Damage</p>
                      </div>
                      <div className="bg-white/60 p-3 rounded-lg border border-slate-100">
                        <p className="text-caption text-slate-500 uppercase font-bold">Location</p>
                        <p className="text-body-md font-semibold text-slate-900">Jayanagar, 4th Main</p>
                      </div>
                    </div>
                    <p className="text-body-md text-slate-800 leading-relaxed font-medium">
                      Citizen reported a hazardous pothole at a major intersection in Jayanagar. AI has verified the location and flagged as high-priority "Public Safety" event.
                    </p>
                    <div className="pt-4 border-t border-blue-100 flex gap-4">
                      <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-label-md hover:bg-slate-50 transition-colors">Flag for Manual Review</button>
                      <button className="bg-blue-900 text-white px-6 py-2 rounded-lg font-label-md hover:bg-blue-950 transition-shadow shadow-md">Approve & Send to PWD</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;
