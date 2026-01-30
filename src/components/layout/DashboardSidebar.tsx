'use client';

import React from 'react';
import { 
  Home, 
  Server, 
  Command, 
  Settings, 
  User, 
  Bell, 
  Shield,
  LogOut,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

interface DashboardSidebarProps {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const navItems = [
    { icon: Home, label: 'Resumen', href: '/dashboard', active: true },
    { icon: Server, label: 'Servidores', href: '/dashboard/servers' },
    { icon: Command, label: 'Comandos', href: '/commands' },
    { icon: CreditCard, label: 'Suscripción', href: '/plans' },
    { icon: Settings, label: 'Configuración', href: '/dashboard/settings' },
    { icon: Bell, label: 'Notificaciones', href: '/dashboard/notifications' },
    { icon: Shield, label: 'Seguridad', href: '/dashboard/security' },
    { icon: HelpCircle, label: 'Ayuda', href: '/support' },
  ];

  const handleLogout = async () => {
    // Aquí iría la lógica de logout
    window.location.href = '/api/auth/signout';
  };

  // Helper para obtener la primera letra del nombre
  const getInitial = () => {
    if (!user?.name) return 'U';
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-gray-800 p-6 h-fit sticky top-8">
      {/* User Profile */}
      <div className="flex items-center gap-3 mb-8">
        <Avatar className="h-12 w-12">
          {user?.image && (
            <AvatarImage 
              src={user.image} 
              alt={user.name || 'Usuario'}
            />
          )}
          <AvatarFallback>
            {getInitial()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold truncate">{user?.name || 'Usuario'}</h3>
          <p className="text-sm text-gray-400 truncate">{user?.email || 'usuario@example.com'}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? 'bg-gradient-to-r from-nyxara-primary/20 to-nyxara-secondary/20 text-nyxara-primary border border-nyxara-primary/30'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="mb-8">
        <h4 className="font-bold mb-3 text-gray-300">Resumen rápido</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900/50 rounded-lg p-3">
            <div className="text-lg font-bold">12</div>
            <div className="text-xs text-gray-400">Servidores</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3">
            <div className="text-lg font-bold">3</div>
            <div className="text-xs text-gray-400">Premium</div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        Cerrar sesión
      </Button>
    </div>
  );
}