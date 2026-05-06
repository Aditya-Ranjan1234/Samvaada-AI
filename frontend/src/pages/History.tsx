import { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [calls, setCalls] = useState<any[]>([]);
  const [selectedCall, setSelectedCall] = useState<any>(null);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await axios.get('/api/v1/calls/');
        setCalls(response.data);
        if (response.data.length > 0) setSelectedCall(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch call history", error);
      }
    };
    fetchCalls();
  }, []);

  const handleAction = (action: string) => {
    alert(`${action} successful for ${selectedCall.call_id}`);
  };

  return (
    <div className="bg-[#f9f9ff] text-slate-900 font-sans overflow-hidden h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="flex justify-between items-center h-16 px-6 w-full sticky top-0 z-50 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-slate-900">CivicVoice Intelligence</span>
          <div className="hidden md:flex gap-6">
            <a className="text-slate-500 hover:text-blue-900 font-semibold text-sm transition-colors" href="/dashboard">Agent Dashboard</a>
            <a className="text-blue-900 font-bold border-b-2 border-blue-900 text-sm" href="/history">Call History</a>
            <a className="text-slate-500 hover:text-blue-900 font-semibold text-sm transition-colors" href="/supervisor">Supervisor Overview</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button className="p-2 hover:bg-slate-50 rounded-full transition-colors"><span className="material-symbols-outlined text-slate-500">notifications</span></button>
           <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
             <img alt="Agent" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPurKNj_xLrxBpKrdHgJ76c_TKalq-hBo5zeh-dJV07PmRT9yX93MPO-slCaSh0UZQRVrxBEhPlVBQZNpOcXNS-kQ_iebOJ-TSvhFhugwVAVltdY2MC382zpDnp4QUY4clar11p0vbBaYgJVeaDR_iN0NOcCbaFKp6GPqpYnXN6lm_B9XeMCwFV9SfTtVsQIhBmObOk4HO7VoLIok-Nk6CwivGNway8y6nnUoumLCAPULaKNKuRj3thiockS7pYy_Zm-TRuujjzL4"/>
           </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[#00193c]">Call Records</h1>
                <p className="text-sm text-slate-500 mt-1">Audit and verify AI-assisted citizen interactions.</p>
              </div>
              <button className="bg-[#00193c] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95">
                <span className="material-symbols-outlined text-[18px]">download</span> Export Records
              </button>
            </div>

            {/* Table Container */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Call ID</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Date/Time</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Lang</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Intent</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {calls.map((call, i) => (
                      <tr 
                        key={i} 
                        onClick={() => setSelectedCall(call)}
                        className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedCall?.call_id === call.call_id ? 'bg-blue-50/50' : ''}`}
                      >
                        <td className="px-6 py-4 text-sm font-bold text-blue-900">{call.call_id}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{call.timestamp}</td>
                        <td className="px-6 py-4"><span className="text-[10px] font-black bg-slate-100 text-slate-700 px-2 py-1 rounded">{call.language}</span></td>
                        <td className="px-6 py-4"><span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{call.intent}</span></td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center gap-1 font-bold text-xs ${call.status === 'Verified' ? 'text-green-600' : 'text-amber-600'}`}>
                            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
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

            {/* Selection Detail Panels */}
            {selectedCall && (
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[450px]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600">description</span> Full Transcript
                    </h3>
                    <span className="text-[10px] bg-slate-900 text-white px-2 py-1 rounded font-black tracking-widest">AUDIO ARCHIVED</span>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
                    {selectedCall.transcript?.map((msg: any, j: number) => (
                      <div key={j} className="flex flex-col gap-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${msg.s === 'AI' ? 'text-blue-600' : 'text-slate-400'}`}>{msg.s}</span>
                        <p className={`text-sm font-medium p-4 rounded-2xl ${msg.s === 'AI' ? 'bg-blue-50 text-blue-900' : 'bg-slate-50 text-slate-700'}`}>{msg.t}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-7 space-y-6">
                  <div className="bg-white p-8 rounded-3xl border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-blue-900 flex items-center gap-3">
                        <span className="material-symbols-outlined text-blue-600" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span> AI-Generated Intelligence
                      </h3>
                      <div className="flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full border border-green-200">
                        <span className="material-symbols-outlined text-sm">verified_user</span>
                        <span className="text-xs font-bold uppercase tracking-wider">98% Accuracy</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="p-6 bg-white/80 rounded-2xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">Operational Summary</p>
                        <p className="text-sm font-bold text-slate-800 leading-relaxed">{selectedCall.summary}</p>
                      </div>
                      <div className="pt-6 border-t border-blue-100 flex gap-4">
                        <button 
                          onClick={() => handleAction('Flagging for review')}
                          className="flex-1 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all active:scale-95"
                        >
                          Flag for Review
                        </button>
                        <button 
                          onClick={() => handleAction('Approval and dispatch')}
                          className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-xl active:scale-95"
                        >
                          Approve & Dispatch
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;
