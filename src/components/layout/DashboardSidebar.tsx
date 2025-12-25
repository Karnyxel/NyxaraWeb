'use client';

import { User } from 'next-auth';
import { 
  Home, 
  Settings, 
  Users as UsersIcon, 
  Music, 
  Shield, 
  BarChart3,
  Bot,
  LogOut,
  ChevronRight,
  Bell,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
  user: User;
}

const navItems = [
  { name: 'Dashboard', icon: Home, href: '/dashboard' },
  { name: 'Servidores', icon: UsersIcon, href: '/dashboard/servers' },
  { name: 'Configuración', icon: Settings, href: '/dashboard/settings' },
  { name: 'Música', icon: Music, href: '/dashboard/music' },
  { name: 'Moderación', icon: Shield, href: '/dashboard/moderation' },
  { name: 'Estadísticas', icon: BarChart3, href: '/dashboard/analytics' },
  { name: 'Comandos', icon: Bot, href: '/dashboard/commands' },
];

const secondaryItems = [
  { name: 'Notificaciones', icon: Bell, href: '/dashboard/notifications' },
  { name: 'Ayuda', icon: HelpCircle, href: '/dashboard/help' },
];

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-800 bg-gray-900/95 backdrop-blur-lg z-40">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-nyxara-primary to-nyxara-secondary flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white">Nyxara Dashboard</h2>
            <p className="text-xs text-gray-400">Panel de administración</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          {user.image ? (
            <img 
              src={user.image} 
              alt={user.name || 'Usuario'} 
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <span className="text-white font-bold">
                {user.name?.[0] || 'U'}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white truncate">{user.name || 'Usuario'}</p>
            <p className="text-xs text-gray-400 truncate">{user.email || 'Sin email'}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Principal
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors group"
            >
              <Icon className="h-5 w-5 text-gray-400 group-hover:text-nyxara-primary" />
              <span className="font-medium">{item.name}</span>
            </a>
          );
        })}
      </nav>

      {/* Secondary Navigation */}
      <nav className="p-4 space-y-1 mt-4">
        <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          General
        </p>
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors group"
            >
              <Icon className="h-5 w-5 text-gray-400 group-hover:text-nyxara-primary" />
              <span className="font-medium">{item.name}</span>
            </a>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors group">
          <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-400" />
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}