'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [username, setUsername] = useState('')
  const [prompt, setPrompt] = useState('')
  const [animation, setAnimation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
      return
    }

    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.username) {
          setUsername(data.username)
        } else {
          localStorage.removeItem('token')
          router.push('/')
        }
      })
      .catch(() => {
        localStorage.removeItem('token')
        router.push('/')
      })
  }, [router])

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setError('')
    setAnimation(null)

    try {
      const response = await fetch('/api/generate-canvas-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      })

      const data = await response.json()

      if (response.ok) {
        setAnimation(data)
      } else {
        setError(data.error || 'Gagal generate animasi')
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Hai, {username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-[#0b0c16] border border-indigo-900/60 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Generate Motion Graphics</h2>
          <p className="text-slate-400 text-sm mb-4">
            Ketik ide animasi Anda, kami akan generate kode Canvas untuk motion graphics
          </p>

          <textarea
            className="w-full p-3 bg-[#060712] border border-indigo-900/60 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors mb-3"
            rows={3}
            placeholder="Misal: animasi bintang berputar, efek cahaya neon, spiral partikel..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-50 text-white font-bold text-sm rounded-lg"
          >
            {loading ? 'Generating...' : 'Generate Animasi'}
          </button>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {animation && (
          <div className="bg-[#0b0c16] border border-indigo-900/60 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Hasil Generator</h3>
            <p className="text-slate-400 text-sm mb-3">Prompt: {animation.prompt}</p>
            <div className="bg-slate-900 rounded-lg p-4 mb-4">
              <pre className="text-xs text-green-400 overflow-x-auto">
                {animation.code}
              </pre>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(animation.code)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}