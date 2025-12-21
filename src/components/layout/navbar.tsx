"use client" 

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bot, Menu, X, Shield, Sparkles } from "lucide-react"
import { useState } from "react"
const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Comandos", href: "/comandos" },
  { name: "Premium", href: "/premium" },
  { name: "Equipo", href: "/equipo" },
  { name: "Partners", href: "/partners" },
  { name: "Documentación", href: "/docs" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary rounded-full opacity-20 blur-xl" />
              <Bot className="h-10 w-10 text-nyxara-primary relative z-10" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-nyxara-primary to-nyxara-secondary bg-clip-text text-transparent">
                Nyxara
              </span>
              <p className="text-xs text-gray-400">Discord Bot</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors hover:scale-105"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="gap-2">
              <Shield className="h-4 w-4" />
              Login
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
              <Sparkles className="h-4 w-4" />
              Invitar Bot
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <Button variant="outline">Login</Button>
                <Button>Invitar Bot</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}