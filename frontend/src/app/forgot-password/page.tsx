'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Simulate API call - feature coming soon
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMessage('Fitur ini akan segera tersedia. Silakan hubungi admin untuk reset password.');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft size={20} />
            Kembali ke login
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Lupa Password</h1>
            <p className="text-gray-600 mt-2">Masukkan email Anda untuk reset password</p>
          </div>

          {message && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg mb-4">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isLoading ? 'Memproses...' : 'Kirim Link Reset'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Ingat password?{' '}
            <Link href="/login" className="text-primary hover:text-primary-dark font-medium">
              Masuk sekarang
            </Link>
          </p>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              🔒 <strong>Fitur Coming Soon</strong><br />
              Fitur reset password akan segera tersedia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}