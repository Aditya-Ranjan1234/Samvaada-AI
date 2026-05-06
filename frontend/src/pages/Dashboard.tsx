import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Message {
  speaker: 'CITIZEN' | 'AI';
  text: string;
  time: string;
  language?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState<Message[]>([]);
  const [callId, setCallId] = useState('');
  const [callTimer, setCallTimer] = useState(0);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [transcript]);

  // Call timer
  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => setCallTimer(t => t + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallTimer(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isCallActive]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const now = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  // ── Start a new call ──────────────────────────────────────────────────
  const startCall = async () => {
    const id = `CALL-${Math.floor(Math.random() * 9000) + 1000}`;
    setCallId(id);
    setTranscript([]);
    setIsCallActive(true);

    setTranscript([{
      speaker: 'AI',
      text: 'Namaskara! Karnataka 1092 Helpline. How may I assist you today? (ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?)',
      time: now(),
      language: 'en/kn',
    }]);
  };

  // ── End call ─────────────────────────────────────────────────────────
  const endCall = () => {
    stopMic();
    setIsCallActive(false);
    setIsListening(false);
  };

  // ── Mic toggle using Web Speech API ──────────────────────────────────
  const toggleMic = () => {
    if (isListening) { stopMic(); return; }

    const SpeechRecognition = window.SpeechRecognition || (window as unknown as { webkitSpeechRecognition: typeof SpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'kn-IN'; // Kannada first; browser falls back automatically
    recognition.continuous = false;
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onresult = async (event) => {
      const spoken = event.results[0][0].transcript;
      const citizenMsg: Message = { speaker: 'CITIZEN', text: spoken, time: now(), language: 'Auto-detected' };
      setTranscript(prev => [...prev, citizenMsg]);
      setIsListening(false);
      await sendToGroq(spoken);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend   = () => setIsListening(false);

    recognition.start();
    setIsListening(true);
  };

  const stopMic = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  // ── Send text to Groq via backend ────────────────────────────────────
  const sendToGroq = async (text: string) => {
    setIsThinking(true);
    try {
      const res = await fetch('/api/v1/calls/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: 'en' }),
      });
      const data = await res.json();
      const aiMsg: Message = {
        speaker: 'AI',
        text: data.ai_reply || 'I am unable to process that right now.',
        time: now(),
        language: data.detected_language,
      };
      setTranscript(prev => [...prev, aiMsg]);
    } catch {
      setTranscript(prev => [...prev, { speaker: 'AI', text: 'Error connecting to AI engine.', time: now() }]);
    } finally {
      setIsThinking(false);
    }
  };

  // ── Manual text send ─────────────────────────────────────────────────
  const [inputText, setInputText] = useState('');
  const sendText = async () => {
    if (!inputText.trim()) return;
    const citizenMsg: Message = { speaker: 'CITIZEN', text: inputText, time: now() };
    setTranscript(prev => [...prev, citizenMsg]);
    const text = inputText;
    setInputText('');
    await sendToGroq(text);
  };

  // ─────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#f9f9ff] text-on-background font-body-md overflow-hidden h-screen flex flex-col relative">

      {/* ── Top Navbar ─────────────────────────────────────────────── */}
      <header className="flex justify-between items-center h-16 px-6 w-full bg-white border-b border-slate-200 shrink-0 z-50">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-slate-900">CivicVoice Intelligence</span>
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
            <span className="material-symbols-outlined text-blue-600 text-lg">person</span>
            <span className="text-sm font-bold text-slate-700">Ramesh K.</span>
            {isCallActive && (
              <div className="flex items-center gap-2 border-l border-slate-200 pl-4 ml-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Live · {formatTime(callTimer)}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isCallActive && (
            <div className="bg-slate-900 text-white px-4 py-1.5 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-red-400">fiber_manual_record</span>
              <span className="text-sm font-black tracking-widest">{formatTime(callTimer)}</span>
            </div>
          )}
          <span className="material-symbols-outlined text-slate-500 cursor-pointer">notifications</span>
          <button onClick={() => setShowSettings(!showSettings)} className="material-symbols-outlined text-slate-500 cursor-pointer hover:bg-slate-100 p-2 rounded-full">settings</button>
          <div onClick={() => setShowProfile(!showProfile)} className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-200 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPurKNj_xLrxBpKrdHgJ76c_TKalq-hBo5zeh-dJV07PmRT9yX93MPO-slCaSh0UZQRVrxBEhPlVBQZNpOcXNS-kQ_iebOJ-TSvhFhugwVAVltdY2MC382zpDnp4QUY4clar11p0vbBaYgJVeaDR_iN0NOcCbaFKp6GPqpYnXN6lm_B9XeMCwFV9SfTtVsQIhBmObOk4HO7VoLIok-Nk6CwivGNway8y6nnUoumLCAPULaKNKuRj3thiockS7pYy_Zm-TRuujjzL4" alt="Agent" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar Nav ─────────────────────────────────────────── */}
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
            <div className="px-4 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-slate-100 rounded-xl cursor-pointer">
              <span className="material-symbols-outlined text-sm">translate</span> Language: Auto
            </div>
          </div>
        </nav>

        {/* ── Active Queue ─────────────────────────────────────────── */}
        <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-800">Active Queue</h3>
            <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-black rounded-full">
              {isCallActive ? '1 Live' : '0 Live'}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {isCallActive ? (
              <div className="p-5 border-b border-slate-50 bg-blue-50/60 border-l-4 border-l-blue-600">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black text-slate-400">{callId}</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-red-100 text-red-600">LIVE</span>
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">Citizen Caller</div>
                <div className="text-[10px] font-bold text-slate-500">Auto-detect · {formatTime(callTimer)}</div>
                <div className="mt-3 py-1.5 bg-slate-900 text-white text-[9px] font-black text-center rounded uppercase tracking-widest">In Progress</div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-2 block">phone_disabled</span>
                <p className="text-xs font-bold">No active calls.<br/>Click "Start Call" to simulate.</p>
              </div>
            )}
          </div>
          {!isCallActive && (
            <div className="p-4 border-t border-slate-100">
              <button
                onClick={startCall}
                className="w-full py-3 bg-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-green-700 transition-all active:scale-95 shadow-lg"
              >
                <span className="material-symbols-outlined text-[18px]">add_call</span> Start Simulated Call
              </button>
            </div>
          )}
        </aside>

        {/* ── Live Conversation Area ───────────────────────────────── */}
        <main className="flex-1 bg-white flex flex-col overflow-hidden">

          {/* Call header */}
          {isCallActive && (
            <div className="px-6 py-3 bg-red-50 border-b border-red-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-black text-red-700 uppercase tracking-widest">Live Session · {callId}</span>
                <span className="text-xs font-bold text-slate-500">· Groq Llama-3 active · Language: Auto-detect</span>
              </div>
              <button
                onClick={endCall}
                className="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">call_end</span> End Call
              </button>
            </div>
          )}

          {/* Transcript feed */}
          <div ref={feedRef} className="flex-1 overflow-y-auto p-6 space-y-4 pb-32">
            {transcript.length === 0 && !isCallActive && (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 gap-4">
                <span className="material-symbols-outlined text-6xl">phone_in_talk</span>
                <p className="text-sm font-bold">Start a simulated call to begin the live<br/>multilingual AI conversation.</p>
              </div>
            )}

            {transcript.map((msg, i) => (
              <div key={i} className={`flex ${msg.speaker === 'AI' ? '' : 'justify-end'}`}>
                <div className={`max-w-[75%] ${msg.speaker === 'AI' ? 'bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none' : 'bg-primary text-white rounded-2xl rounded-tr-none shadow-lg'} p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${msg.speaker === 'AI' ? 'text-blue-600' : 'text-blue-200'}`}>
                      {msg.speaker === 'AI' ? '🤖 Samvaada AI' : '👤 Citizen'}
                    </span>
                    {msg.language && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${msg.speaker === 'AI' ? 'bg-blue-100 text-blue-600' : 'bg-blue-700 text-white'}`}>
                        {msg.language}
                      </span>
                    )}
                    <span className={`text-[9px] ml-auto ${msg.speaker === 'AI' ? 'text-slate-400' : 'text-blue-200'}`}>{msg.time}</span>
                  </div>
                  <p className={`text-sm font-medium leading-relaxed ${msg.speaker === 'AI' ? 'text-slate-800' : 'text-white'}`}>{msg.text}</p>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none p-4 max-w-[200px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <span className="text-xs text-slate-400 font-bold ml-1">Groq thinking…</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom bar */}
          {isCallActive && (
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex items-center gap-3" style={{ left: '32rem' }}>
              <button
                onClick={toggleMic}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                title={isListening ? 'Stop recording' : 'Start recording'}
              >
                <span className="material-symbols-outlined">{isListening ? 'mic_off' : 'mic'}</span>
              </button>
              <input
                className="flex-1 h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Or type citizen's message and press Enter…"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendText()}
              />
              <button
                onClick={sendText}
                disabled={!inputText.trim()}
                className="h-11 px-5 bg-primary text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-900 disabled:opacity-40 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ── Settings Panel ─────────────────────────────────────────── */}
      {showSettings && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl z-[100] p-8 border-l border-slate-200">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">System Settings</h3>
            <span className="material-symbols-outlined cursor-pointer hover:text-red-500" onClick={() => setShowSettings(false)}>close</span>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <label className="text-xs font-bold uppercase text-slate-500 block mb-2">AI Engine</label>
              <p className="text-sm font-semibold text-slate-800">Groq · Llama-3-8B-8192</p>
              <p className="text-[10px] text-green-600 font-bold mt-1">● Connected</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Speech Recognition</label>
              <p className="text-sm font-semibold text-slate-800">Web Speech API (Browser-native)</p>
              <p className="text-[10px] text-slate-500 mt-1">Kannada → Hindi → English fallback</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Database</label>
              <p className="text-sm font-semibold text-slate-800">Supabase · PostgreSQL</p>
              <p className="text-[10px] text-green-600 font-bold mt-1">● Active</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Profile Panel ──────────────────────────────────────────── */}
      {showProfile && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl z-[100] p-8 border-l border-slate-200">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Operator Profile</h3>
            <span className="material-symbols-outlined cursor-pointer hover:text-red-500" onClick={() => setShowProfile(false)}>close</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 mb-4 overflow-hidden border-2 border-slate-200">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPurKNj_xLrxBpKrdHgJ76c_TKalq-hBo5zeh-dJV07PmRT9yX93MPO-slCaSh0UZQRVrxBEhPlVBQZNpOcXNS-kQ_iebOJ-TSvhFhugwVAVltdY2MC382zpDnp4QUY4clar11p0vbBaYgJVeaDR_iN0NOcCbaFKp6GPqpYnXN6lm_B9XeMCwFV9SfTtVsQIhBmObOk4HO7VoLIok-Nk6CwivGNway8y6nnUoumLCAPULaKNKuRj3thiockS7pYy_Zm-TRuujjzL4" alt="Ramesh" />
            </div>
            <h4 className="font-bold text-lg">Ramesh K.</h4>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Lead Operator · Zone 4</p>
            <div className="w-full mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Calls Today</span>
                <span className="font-bold">14</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Avg Handle Time</span>
                <span className="font-bold">4m 08s</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Accuracy</span>
                <span className="font-bold text-green-600">98.2%</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="mt-8 w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
