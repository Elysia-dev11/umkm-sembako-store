'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        // Improve error handling for Supabase auth failures
        let errorMessage = signInError.message;
        
        // Handle common Supabase error cases with friendly messages
        if (signInError.message.includes('Invalid login credentials') || 
            signInError.message.includes('invalid_credentials') ||
            signInError.message.includes('400')) {
          errorMessage = 'Email atau password salah. Silakan periksa kembali.';
        } else if (signInError.message.includes('Email not confirmed')) {
          errorMessage = 'Email belum dikonfirmasi. Silakan cek inbox email Anda.';
        } else if (signInError.message.includes('Too many requests')) {
          errorMessage = 'Terlalu banyak percobaan. Silakan tunggu beberapa saat.';
        } else if (signInError.message.includes('Network')) {
          errorMessage = 'Terjadi masalah koneksi. Silakan periksa internet Anda.';
        }

        // If sign in fails, try to sign up (for demo)
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.email.split('@')[0],
            }
          }
        });

        if (signUpError) {
          // Handle signup errors with friendly messages
          let signupErrorMessage = signUpError.message;
          if (signUpError.message.includes('already registered') ||
              signUpError.message.includes('already exists')) {
            signupErrorMessage = 'Akun sudah terdaftar. Silakan login dengan password yang benar.';
          } else if (signUpError.message.includes('Password')) {
            signupErrorMessage = 'Password harus minimal 6 karakter.';
          }
          setError(signupErrorMessage);
          return;
        }

        // Save user to localStorage for signup - check if admin email
        const isAdmin = formData.email.includes('admin') || formData.email.includes('@sembako');
        const user = {
          id: signUpData.user?.id || '1',
          email: formData.email,
          name: formData.email.split('@')[0],
          role: isAdmin ? 'ADMIN' : 'CUSTOMER',
        };
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // Save user to localStorage - check if admin email
        const isAdmin = formData.email.includes('admin') || formData.email.includes('@sembako');
        const user = {
          id: data.user?.id || '1',
          email: formData.email,
          name: data.user?.user_metadata?.name || formData.email.split('@')[0],
          role: isAdmin ? 'ADMIN' : 'CUSTOMER',
        };
        localStorage.setItem('user', JSON.stringify(user));
      }

      router.push(redirect);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Masuk</h1>
            <p className="text-gray-600 mt-2">Selamat datang kembali di Sembako Store</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input pl-10"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input pl-10 pr-10"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-600">Ingat saya</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-primary hover:text-primary-dark">
                Lupa password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Belum punya akun?{' '}
            <Link href="/register" className="text-primary hover:text-primary-dark font-medium">
              Daftar sekarang
            </Link>
          </p>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Supabase:</strong> Akun baru akan dibuat otomatis jika belum terdaftar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}