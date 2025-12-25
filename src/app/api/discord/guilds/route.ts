import { NextResponse } from "next/server"

// TODO: Implementar autenticación real
const DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN // O usa otra forma de autenticación

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  
  if (!token) {
    return NextResponse.json({ error: 'Token required' }, { status: 401 })
  }

  try {
    const response = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Discord API error' }, { status: response.status })
    }

    const guilds = await response.json()
    return NextResponse.json(guilds)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}