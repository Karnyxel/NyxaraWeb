import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bot } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Bot className="h-8 w-8 text-purple-500" />
          <span className="text-xl font-bold">Nyxara</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/docs">
            <Button variant="ghost">Documentación</Button>
          </Link>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            Invitar Bot
          </Button>
        </div>
      </div>
    </nav>
  )
}