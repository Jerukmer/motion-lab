'use client'

import { useState } from 'react'

export default function OrderPage() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    paket: 'basic'
  })
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setStep(2)
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">
            ORDER AKUN
          </h1>
          <p className="text-slate-400 text-sm">Motion Graphics Studio — akses AI Canvas Generator</p>
        </div>

        {step === 1 && (
          <div className="bg-[#0b0c16] border border-indigo-900/60 rounded-2xl p-6">
            <div className="price-box text-center mb-6">
              <div className="text-4xl font-bold text-cyan-400 mb-2">Rp 50.000</div>
              <div className="text-slate-500 text-sm">per bulan</div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-400 block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-[#060712] border border-indigo-900/60 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-400 block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-[#060712] border border-indigo-900/60 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  placeholder="john@example.com"
                  required
                />
              </div>

              {error && <div className="bg-red-900/20 border border-red-500 text-red-300 p-2 rounded-lg text-sm mb-3">{error}</div>}

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white font-bold text-sm rounded-lg"
              >
                Lanjut ke Pembayaran
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="/" className="text-cyan-400 hover:text-cyan-300 text-sm">Kembali ke Login</a>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-[#0b0c16] border border-indigo-900/60 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-4 text-center">Pembayaran QRIS</h2>
            <div className="qris-box text-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=https://wa.me/6288287359834"
                alt="QRIS Payment"
                className="mb-2"
              />
              <p className="text-slate-300 text-sm mb-2">Scan untuk bayar Rp 50.000</p>
            </div>

            <div className="steps mb-4">
              <ol className="list-decimal list-inside text-sm text-slate-400">
                <li>Scan QRIS di atas</li>
                <li>Bayar Rp 50.000</li>
                <li>Kirim bukti bayar ke admin</li>
                <li>Akun sudah aktif</li>
              </ol>
            </div>

            <a
              href="https://wa.me/6288287359834?text=Halo%2C%20saya%20baru%20bayar%20untuk%20akun%20Motion%20LAB%2C%20nama%3A%20{formData.nama}"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-lg text-center"
            >
              Hubungi via WhatsApp
            </a>

            <div className="mt-6 text-center">
              <button
                onClick={() => setStep(1)}
                className="text-cyan-400 hover:text-cyan-300 text-sm"
              >
                Kembali
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}