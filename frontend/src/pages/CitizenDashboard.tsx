import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CitizenUser {
  name: string;
  phone: string;
}

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<CitizenUser | null>(null);
  const [complaintText, setComplaintText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myComplaints, setMyComplaints] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('samvaada_citizen');
    if (!savedUser) {
      navigate('/citizen/login');
      return;
    }
    setUser(JSON.parse(savedUser));
    
    // Load their local complaints history
    const savedComplaints = localStorage.getItem('samvaada_citizen_complaints');
    if (savedComplaints) {
      setMyComplaints(JSON.parse(savedComplaints));
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText.trim()) return;
    
    setIsSubmitting(true);
    
    // 1. Create a transcript format expected by the backend
    const transcript = [
      { s: 'CITIZEN', t: complaintText }
    ];
    
    const callId = `#CZN-${Math.floor(Math.random() * 9000) + 1000}`;

    try {
      // 2. Send to the AI Pipeline Backend (Same one the agents use!)
      // The backend will automatically extract the Intent and Summary via Groq
      // and append it to the global Agent queue.
      const response = await fetch('/api/v1/calls/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          call_id: callId,
          transcript: transcript,
          intent: "Live Call", // Triggers AI extraction
          summary: "Citizen self-reported via online portal.",
          language: "EN"
        })
      });

      if (response.ok) {
        const data = await response.json();
        const finalIntent = data.call?.intent || "Pending Review";
        
        // 3. Save locally for the citizen to see their own history
        const newComplaint = {
          id: callId,
          text: complaintText,
          date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'Pending Verification',
          category: finalIntent
        };
        
        const updatedComplaints = [newComplaint, ...myComplaints];
        setMyComplaints(updatedComplaints);
        localStorage.setItem('samvaada_citizen_complaints', JSON.stringify(updatedComplaints));
        
        setComplaintText('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Failed to submit complaint to AI pipeline", err);
      alert("Error submitting complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('samvaada_citizen');
    navigate('/citizen/login');
  };

  if (!user) return null;

  return (
    <div className="bg-[#f9f9ff] text-slate-900 font-sans min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 lg:px-12 h-20 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined">public</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#00193c]">Citizen Portal</h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Karnataka 1092</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3 text-right">
            <div>
              <p className="text-sm font-bold text-[#00193c]">{user.name}</p>
              <p className="text-xs text-slate-500 font-medium">+91 {user.phone}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Book Complaint */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>
            
            <h2 className="text-2xl font-bold text-[#00193c] mb-2 relative z-10">Book a Civic Complaint</h2>
            <p className="text-slate-500 text-sm mb-8 relative z-10">Describe your issue in detail. Our AI will automatically categorize it and route it to the 1092 operators.</p>
            
            {showSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-start gap-3 relative z-10 animate-fade-in">
                <span className="material-symbols-outlined">check_circle</span>
                <div>
                  <h4 className="font-bold text-sm">Complaint Registered Successfully</h4>
                  <p className="text-xs mt-1 font-medium">Your issue has been routed to the 1092 operators and is pending verification.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative z-10">
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Complaint Details
                </label>
                <textarea
                  className="w-full h-40 p-5 bg-slate-50 border border-slate-200 rounded-2xl resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-slate-800"
                  placeholder="E.g., There is a massive water pipe burst near Richmond Road signal. It is causing a huge traffic jam."
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="material-symbols-outlined animate-spin">sync</span>
                  ) : (
                    <span className="material-symbols-outlined">send</span>
                  )}
                  {isSubmitting ? 'Routing to Operators...' : 'Submit Complaint'}
                </button>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest max-w-[200px]">
                  AI-Powered Real-Time Verification
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: History */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#00193c]">My Complaints</h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
              {myComplaints.length} Records
            </span>
          </div>

          <div className="space-y-4">
            {myComplaints.length === 0 ? (
              <div className="bg-white border border-slate-200 border-dashed rounded-3xl p-10 text-center flex flex-col items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-3 opacity-50">inbox</span>
                <p className="text-sm font-medium">You haven't booked any complaints yet.</p>
              </div>
            ) : (
              myComplaints.map((comp, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-black text-slate-400">{comp.id}</span>
                      <h3 className="text-sm font-bold text-blue-900 mt-1">{comp.category}</h3>
                    </div>
                    <span className="text-[10px] font-black px-2 py-1 rounded bg-amber-100 text-amber-700 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">schedule</span>
                      {comp.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">{comp.text}</p>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{comp.date}</span>
                    <button className="text-xs font-bold text-blue-600 hover:text-blue-800">View Details</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default CitizenDashboard;
