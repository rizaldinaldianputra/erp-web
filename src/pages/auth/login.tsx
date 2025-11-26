import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Import Sonner
import { Toaster, toast } from 'sonner';

// Komponen Background Bintang Bergerak (Tetap sama)
const StarField = () => {
  const stars = [...Array(20)].map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-30"
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default function CosmicLogin() {
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ username, password });
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-black text-white p-6 overflow-hidden">
      {/* --- 5. KONFIGURASI TOASTER KHUSUS TEMA COSMIC --- */}
      <Toaster
        position="top-center"
        expand={true}
        richColors
        theme="dark" // Paksa dark mode agar sesuai background
        toastOptions={{
          classNames: {
            toast:
              'bg-slate-950/80 backdrop-blur-xl border border-indigo-500/20 shadow-2xl shadow-indigo-500/10 rounded-xl',
            title: 'text-indigo-100 font-semibold',
            description: 'text-indigo-300/70 text-xs',
            actionButton: 'bg-indigo-600',
          },
          style: {
            // Override inline style untuk memastikan background menyatu
            background: 'rgba(2, 6, 23, 0.8)',
          },
        }}
      />

      {/* Background Elements */}
      <StarField />
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative w-full max-w-md"
      >
        {/* Card Container */}
        <div className="bg-white/5 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden group">
          {/* Efek Kilau pada Card saat Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />

          {/* --- LOGO SECTION --- */}
          <div className="flex flex-col items-center justify-center mb-8">
            <h2 className="mt-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
              Welcome Back
            </h2>
            <p className="text-indigo-200/60 text-sm mt-1">Access your cosmic dashboard</p>
          </div>

          {/* --- FORM SECTION --- */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-indigo-200 ml-1">Email Address</label>
              <div className="relative group/input">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400/70 w-5 h-5 group-focus-within/input:text-indigo-300 transition-colors" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all hover:bg-black/30"
                  placeholder="name@company.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-medium text-indigo-200">Password</label>
                <button
                  type="button"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  onClick={() =>
                    toast.info('Recovery Protocol', {
                      description: 'Check your comms channel for reset link.',
                    })
                  }
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative group/input">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400/70 w-5 h-5 group-focus-within/input:text-indigo-300 transition-colors" />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all hover:bg-black/30"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-white font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all relative overflow-hidden"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-indigo-200/50">
              Don't have an account?{' '}
              <a
                href="#"
                className="text-indigo-400 hover:text-white transition-colors font-medium"
                onClick={() =>
                  toast('Registration Closed', {
                    description: 'We are currently at full capacity.',
                  })
                }
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
