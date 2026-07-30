'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'A1', password: 'Demo' }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        router.push('/dashboard')
      } else {
        setError(data.error || 'Login gagal')
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm bg-[#0b0c16] border border-indigo-900/60 rounded-2xl shadow-2xl shadow-indigo-950/80 p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-lg shadow-cyan-500/20 mb-3">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles w-7 h-7 text-cyan-400" aria-hidden="true">
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                <path d="M20 2v4"></path>
                <path d="M22 4h-4"></path>
                <circle cx="4" cy="20" r="2"></circle>
              </svg>
            </div>
          </div>
        </div>
        <h1 className="font-bold text-lg text-center bg-gradient-to-r from-slate-100 via-slate-200 to-cyan-300 bg-clip-text text-transparent">MICROSTOCK MOTION LAB</h1>
        <p className="text-xs text-slate-400 mt-1">Login untuk melanjutkan</p>
        <p className="text-[11px] text-slate-500 text-center mt-3 leading-relaxed">
          Studio pembuat motion graphic otomatis pakai AI (Gemini) — tinggal ketik ide, langsung jadi animasi Canvas siap render buat konten microstock (Adobe Stock, Shutterstock, dll).
        </p>

        {error && <div className="bg-red-900/20 border border-red-500 text-red-300 p-2 rounded-lg text-sm mb-3">{error}</div>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-50 text-white font-bold text-sm rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
        >
          <span>{loading ? 'Masuk...' : 'MASUK'}</span>
        </button>

        <p className="text-[11px] text-slate-500 text-center mt-6">
          Mau coba dulu? <a
            href="https://wa.me/6288287359834?text=Halo%2C%20saya%20mau%20coba%20demo%20gratis%20Motion%20Graphics%20Studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            Coba Demo Gratis (1 Jam)
          </a>
        </p>
      </div>
    </div>
  )
}