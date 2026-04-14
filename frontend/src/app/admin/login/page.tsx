'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0b2e] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 text-2xl font-extrabold mb-2">
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
              <circle cx="20" cy="20" r="19" stroke="url(#loginGrad)" strokeWidth="2"/>
              <path d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="url(#loginGrad)" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="20" cy="20" r="3" fill="url(#loginGrad)"/>
              <defs><linearGradient id="loginGrad" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#c4197d"/><stop offset="1" stopColor="#3a1d8e"/></linearGradient></defs>
            </svg>
            MedWorx
          </div>
          <p className="text-[#7a779a] text-sm">Admin Panel</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="surface-card rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6">Sign In</h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm text-[#b8b5d0] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white focus:border-[#c4197d] focus:ring-2 focus:ring-[#c4197d]/20 outline-none transition-all"
              placeholder="admin@medworx.iq"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-[#b8b5d0] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white focus:border-[#c4197d] focus:ring-2 focus:ring-[#c4197d]/20 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full btn-gradient text-white font-semibold glow-magenta transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
