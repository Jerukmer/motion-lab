export const metadata = {
  title: 'Microstock Motion LAB',
  description: 'Studio pembuat motion graphic otomatis pakai AI (Gemini) — tinggal ketik ide, langsung jadi animasi Canvas siap render buat konten microstock (Adobe Stock, Shutterstock, dll).',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-slate-950 text-slate-200 antialiased">
        {children}
      </body>
    </html>
  )
}