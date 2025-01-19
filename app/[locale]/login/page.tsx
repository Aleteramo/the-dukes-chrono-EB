'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
        locale: 'it' // O rileva la lingua dinamicamente
      });

      if (result?.error) {
        toast.error('Credenziali non valide');
      } else {
        toast.success('Login effettuato con successo');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Si è verificato un errore durante il login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="p-8 bg-white/10 rounded-lg shadow-xl w-96 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-gold mb-6 text-center">Admin Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-gold/80 text-sm">Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 bg-black/50 text-gold border border-gold/30 rounded focus:outline-none focus:border-gold"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gold/80 text-sm">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-black/50 text-gold border border-gold/30 rounded focus:outline-none focus:border-gold"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-gold text-black rounded hover:bg-gold/90 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Login in corso...' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  );
}