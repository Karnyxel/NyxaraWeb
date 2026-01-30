// src/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { 
  Menu, 
  X, 
  Shield, 
  Sparkles, 
  Moon, 
  Sun,
  User,
  LogOut,
  Settings,
  Home,
  Command,
  Users,
  CreditCard,
  BarChart3,
  Handshake,
  BookOpen,
  LayoutDashboard,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";
import { signIn, signOut } from 'next-auth/react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const { data: session, status } = useSession();
  const [userPermissions, setUserPermissions] = useState<string[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "dark";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    loadNavigationMenu();
  }, []);

  const loadNavigationMenu = async () => {
    try {
      const response = await fetch('/api/navigation');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data.data || []);
      } else {
        // Menú por defecto
        setMenuItems([
          { id: 1, title: "Inicio", url: "/", icon: "🏠", displayorder: 1 },
          { id: 2, title: "Comandos", url: "/commands", icon: "⌨️", displayorder: 2 },
          { id: 3, title: "Estadísticas", url: "/stats", icon: "📊", displayorder: 3 },
          { id: 4, title: "Planes", url: "/plans", icon: "💎", displayorder: 4 },
          { id: 5, title: "Equipo", url: "/team", icon: "👥", displayorder: 5 },
          { id: 6, title: "Partners", url: "/partners", icon: "🤝", displayorder: 6 },
          { id: 7, title: "Documentación", url: "/docs", icon: "📚", displayorder: 7 },
        ]);
      }
    } catch (error) {
      console.error("Error loading menu:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo con imagen personalizada */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary rounded-full opacity-20 blur-xl" />
              {/* Usar imagen personalizada en lugar de icono */}
              <div className="relative z-10 w-10 h-10">
                {/* Puedes usar un Image de Next.js o un div con background */}
                <div className="w-10 h-10 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
              </div>
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
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="text-gray-600 dark:text-gray-300 hover:text-nyxara-primary dark:hover:text-white transition-colors hover:scale-105"
              >
                {item.title}
              </Link>
            ))}
            
            {/* Elementos condicionales basados en autenticación */}
            {status === "authenticated" && (
              <Link
                href="/dashboard"
                className="text-gray-600 dark:text-gray-300 hover:text-nyxara-primary dark:hover:text-white transition-colors hover:scale-105"
              >
                Dashboard
              </Link>
            )}
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
            
            {status === "authenticated" ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {session.user?.image && (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name || "User"}
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {session.user?.name}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => signOut()}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Salir
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                className="gap-2"
                onClick={() => signIn("discord")}
              >
                <Shield className="h-4 w-4" />
                Login con Discord
              </Button>
            )}
            
            <Button 
              className="gap-2 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary hover:shadow-lg hover:shadow-nyxara-primary/30"
              onClick={() => window.open('https://discord.com/oauth2/authorize?client_id=1432444397299175514&permissions=8&scope=bot%20applications.commands', '_blank')}
            >
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
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="text-gray-600 dark:text-gray-300 hover:text-nyxara-primary py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              
              {/* Elementos condicionales en móvil */}
              {status === "authenticated" && (
                <Link
                  href="/dashboard"
                  className="text-gray-600 dark:text-gray-300 hover:text-nyxara-primary py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              
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
                {status === "authenticated" ? (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      {session.user?.image && (
                        <img 
                          src={session.user.image} 
                          alt={session.user.name || "User"}
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <div>
                        <p className="font-medium">{session.user?.name}</p>
                        <p className="text-sm text-gray-500">Ver perfil</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => signOut()}>
                      Cerrar sesión
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => signIn("discord")}>
                    Login con Discord
                  </Button>
                )}
                <Button 
                  onClick={() => window.open('https://discord.com/oauth2/authorize?client_id=1432444397299175514&permissions=8&scope=bot%20applications.commands', '_blank')}
                >
                  Invitar Bot
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}