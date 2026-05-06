import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Fix for TypeScript Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

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
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [transcript]);

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

  const startCall = async () => {
    setCallId(`CALL-${Math.floor(Math.random() * 9000) + 1000}`);
    setTranscript([{
      speaker: 'AI',
      text: 'Namaskara! Karnataka 1092 Helpline. I am your AI assistant. How may I help you today?',
      time: now(),
      language: 'en/kn',
    }]);
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsListening(false);
  };

  // ── REAL AUDIO CAPTURE (Not Simulated) ────────────────────────────────
  const toggleMic = async () => {
    if (isListening) {
      mediaRecorderRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await processRealAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (err) {
      console.error("Mic access denied", err);
      alert("Please allow microphone access for REAL AI interaction.");
    }
  };

  const processRealAudio = async (blob: Blob) => {
    setIsThinking(true);
    const formData = new FormData();
    formData.append('file', blob, 'recording.wav');

    try {
      // Calling the REAL NLU endpoint we created
      const res = await fetch('/api/v1/nlu/process', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      setTranscript(prev => [...prev, 
        { speaker: 'CITIZEN', text: data.transcript, time: now(), language: data.detected_language },
        { speaker: 'AI', text: data.ai_reply, time: now(), language: 'AI Generated' }
      ]);
    } catch (error) {
      console.error("AI Processing Error", error);
      setTranscript(prev => [...prev, { speaker: 'AI', text: 'Error: Backend AI Engine unreachable.', time: now() }]);
    } finally {
      setIsThinking(false);
    }
  };

  const [inputText, setInputText] = useState('');
  const sendText = async () => {
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText('');
    setTranscript(prev => [...prev, { speaker: 'CITIZEN', text, time: now() }]);
    setIsThinking(true);
    
    try {
      const res = await fetch('/api/v1/calls/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: 'en' }),
      });
      const data = await res.json();
      setTranscript(prev => [...prev, { speaker: 'AI', text: data.ai_reply, time: now() }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="bg-[#f9f9ff] text-on-background font-body-md overflow-hidden h-screen flex flex-col relative">
      <header className="flex justify-between items-center h-16 px-6 w-full bg-white border-b border-slate-200 shrink-0 z-50">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-slate-900">CivicVoice Intelligence</span>
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
            <span className="material-symbols-outlined text-blue-600 text-lg">person</span>
            <span className="text-sm font-bold text-slate-700">Operator</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isCallActive && (
            <div className="bg-slate-900 text-white px-4 py-1.5 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-red-400">fiber_manual_record</span>
              <span className="text-sm font-black tracking-widest">{formatTime(callTimer)}</span>
            </div>
          )}
          <button onClick={() => setShowSettings(!showSettings)} className="material-symbols-outlined text-slate-500 cursor-pointer hover:bg-slate-100 p-2 rounded-full">settings</button>
          <div onClick={() => setShowProfile(!showProfile)} className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-200 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPurKNj_xLrxBpKrdHgJ76c_TKalq-hBo5zeh-dJV07PmRT9yX93MPO-slCaSh0UZQRVrxBEhPlVBQZNpOcXNS-kQ_iebOJ-TSvhFhugwVAVltdY2MC382zpDnp4QUY4clar11p0vbBaYgJVeaDR_iN0NOcCbaFKp6GPqpYnXN6lm_B9XeMCwFV9SfTtVsQIhBmObOk4HO7VoLIok-Nk6CwivGNway8y6nnUoumLCAPULaKNKuRj3thiockS7pYy_Zm-TRuujjzL4" alt="Agent" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col py-6 shrink-0">
          <div className="px-6 mb-8">
            <h2 className="text-lg font-black text-blue-900 leading-tight">Admin Portal</h2>
          </div>
          <div className="flex-1 px-4 space-y-2">
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white text-blue-900 shadow-sm border border-slate-200 rounded-xl font-bold text-sm">
              <span className="material-symbols-outlined">dashboard</span> Dashboard
            </a>
            <a href="/history" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-all font-semibold text-sm">
              <span className="material-symbols-outlined">history</span> History
            </a>
            <a href="/supervisor" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-all font-semibold text-sm">
              <span className="material-symbols-outlined">monitoring</span> Supervisor
            </a>
          </div>
        </nav>

        <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">Queue Status</h3>
          </div>
          {!isCallActive && (
            <div className="p-4 mt-auto">
              <button onClick={startCall} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg active:scale-95 transition-all">
                <span className="material-symbols-outlined">add_call</span> Start Call
              </button>
            </div>
          )}
        </aside>

        <main className="flex-1 bg-white flex flex-col overflow-hidden relative">
          <div ref={feedRef} className="flex-1 overflow-y-auto p-6 space-y-4 pb-32">
            {transcript.map((msg, i) => (
              <div key={i} className={`flex ${msg.speaker === 'AI' ? '' : 'justify-end'}`}>
                <div className={`max-w-[75%] ${msg.speaker === 'AI' ? 'bg-slate-50 border border-slate-100 rounded-2xl' : 'bg-blue-600 text-white rounded-2xl'} p-4`}>
                  <p className="text-sm font-medium">{msg.text}</p>
                </div>
              </div>
            ))}
            {isThinking && <div className="text-xs text-slate-400 animate-pulse">AI is processing audio...</div>}
          </div>

          {isCallActive && (
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex items-center gap-3" style={{ left: '0' }}>
              <button
                onClick={toggleMic}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600'}`}
              >
                <span className="material-symbols-outlined">{isListening ? 'mic_off' : 'mic'}</span>
              </button>
              <input className="flex-1 h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm" placeholder="Speak on mic or type..." value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendText()} />
            </div>
          )}
        </main>
      </div>

      {showSettings && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl z-[100] p-8 border-l border-slate-200">
          <h3 className="text-xl font-bold mb-8">Settings</h3>
          <p className="text-sm font-bold text-slate-500">Live Audio Inference: Active (Groq)</p>
          <button onClick={() => setShowSettings(false)} className="mt-8 text-blue-600 font-bold">Close</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
