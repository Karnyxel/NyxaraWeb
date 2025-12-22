"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bot, Menu, X, Shield, Sparkles, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Comandos", href: "/comandos" },
  { name: "Premium", href: "/premium" },
  { name: "Equipo", href: "/team" },
  { name: "Partners", href: "/partners" },
  { name: "Documentación", href: "/docs" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "dark"
    setTheme(savedTheme)
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
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
              <p className="text-xs text-gray-500 dark:text-gray-400">Discord Bot</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-nyxara-primary dark:hover:text-white transition-colors hover:scale-105"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </Button>
            
            <Button variant="ghost" className="gap-2">
              <Shield className="h-4 w-4" />
              Login
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary hover:shadow-lg hover:shadow-nyxara-primary/30">
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
                  className="text-gray-600 dark:text-gray-300 hover:text-nyxara-primary py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-gray-600 dark:text-gray-300">Tema</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-700" />
                  )}
                </Button>
              </div>
              <div className="flex flex-col gap-3 pt-4 px-4">
                <Button variant="outline" className="w-full">Login</Button>
                <Button className="w-full">Invitar Bot</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}