import { useState } from 'react';
import { FiSend, FiX } from 'react-icons/fi'; // Pastikan install: npm install react-icons

const AiCosmicChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Halo! Saya AI Cosmic. Ada yang bisa saya bantu?' },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Tambah pesan user
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulasi balasan AI (delay 1 detik)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'ai', text: 'Saya sedang memproses pertanyaan semesta Anda...' },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* === WINDOW CHAT AI (Muncul saat isChatOpen = true) === */}
      {isChatOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col animate-fade-in-up transition-all duration-300">
          {/* Header Cosmic */}
          <div className="p-4 bg-gradient-to-r from-violet-700 to-blue-600 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              {/* Avatar Kecil di Header */}
              <div className="relative w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/30">
                <div className="w-2 h-2 bg-green-400 rounded-full absolute top-0 right-0 border border-violet-700"></div>
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">AI COSMIC</h3>
                <p className="text-[10px] text-blue-100 opacity-80">Online Assistant</p>
              </div>
            </div>
            {/* Tombol Close Kecil di Header */}
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white/70 hover:text-white transition"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Area Chat (Scrollable) */}
          <div className="flex-1 p-4 h-80 overflow-y-auto space-y-3 bg-slate-900 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 text-sm rounded-2xl shadow-sm ${
                    msg.from === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-br-none'
                      : 'bg-slate-800 border border-slate-700 text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-slate-800 border-t border-slate-700 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-600 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500 transition-all"
              placeholder="Tulis pesan..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-transform transform hover:scale-110 active:scale-95"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      )}

      {/* === TOMBOL TRIGGER (FLOATING BUTTON) === */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="focus:outline-none group transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        {isChatOpen ? (
          // OPSI A: Jika Chat Terbuka, tampilkan tombol X bulat sederhana (biar bersih)
          <div className="w-12 h-12 bg-slate-800 border border-slate-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-slate-700">
            <FiX size={24} />
          </div>
        ) : (
          // OPSI B: Jika Chat Tertutup, tampilkan SVG AI COSMIC Besar
          // Masukkan Kode SVG yang sudah kita buat sebelumnya di sini
          <svg
            width="280"
            height="80"
            viewBox="0 0 300 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-xl cursor-pointer"
          >
            <defs>
              <linearGradient id="cosmicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6a11cb" />
                <stop offset="100%" stopColor="#2575fc" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <clipPath id="circleView">
                <circle cx="50" cy="50" r="24" />
              </clipPath>
            </defs>

            {/* Background Utama */}
            <rect
              x="5"
              y="15"
              width="290"
              height="70"
              rx="35"
              fill="url(#cosmicGrad)"
              filter="url(#glow)"
            />

            {/* Bagian Avatar / Orbit */}
            <circle
              cx="50"
              cy="50"
              r="28"
              fill="white"
              fillOpacity="0.15"
              stroke="white"
              strokeWidth="1"
            />
            <ellipse
              cx="50"
              cy="50"
              rx="32"
              ry="10"
              stroke="#00FFFF"
              strokeWidth="1.5"
              transform="rotate(-30 50 50)"
              opacity="0.8"
            />

            {/* User Shape */}
            <g clipPath="url(#circleView)">
              <rect x="20" y="20" width="60" height="60" fill="transparent" />
              <path d="M26 65C26 57 35 55 50 55C65 55 74 57 74 65V80H26V65Z" fill="white" />
              <circle cx="50" cy="42" r="10" fill="white" />
            </g>

            {/* Headset */}
            <path
              d="M40 42C40 35 44 31 50 31C56 31 60 35 60 42"
              stroke="#00FFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M60 42L60 48L54 50"
              stroke="#00FFFF"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="40" cy="42" r="2" fill="#00FFFF" />

            {/* Teks */}
            <text
              x="95"
              y="45"
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
              fontSize="18"
              fill="white"
            >
              AI COSMIC
            </text>
            <text x="95" y="65" fontFamily="Arial, sans-serif" fontSize="12" fill="#E0E0E0">
              Klik ini mulai dengan AI
            </text>

            {/* Online Dot */}
            <circle cx="72" cy="32" r="4" fill="#00FF00" stroke="#6a11cb" strokeWidth="1" />

            {/* Bintang */}
            <circle cx="270" cy="30" r="2" fill="white" opacity="0.8" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default AiCosmicChat;
