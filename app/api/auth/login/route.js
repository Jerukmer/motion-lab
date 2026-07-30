import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'https://motion.alicazone.my.id'

export async function POST(req) {
  try {
    const body = await req.json()

    const response = await fetch(`${BACKEND_URL}/api/auth/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal terhubung ke server' },
      { status: 500 }
    )
  }
}