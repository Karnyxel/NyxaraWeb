'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  showIcons?: boolean;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ 
    checked, 
    onCheckedChange, 
    size = 'md', 
    variant = 'default',
    showIcons = false,
    className = '', 
    disabled,
    ...props 
  }, ref) => {
    
    const sizeClasses = {
      sm: 'h-5 w-9',
      md: 'h-6 w-11',
      lg: 'h-7 w-14'
    };
    
    const knobSizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };
    
    const variantClasses = {
      default: checked ? 'bg-gradient-to-r from-gray-600 to-gray-700' : 'bg-gray-700',
      primary: checked ? 'bg-gradient-to-r from-nyxara-primary to-purple-600' : 'bg-gray-700',
      success: checked ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-700',
      warning: checked ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-700',
      danger: checked ? 'bg-gradient-to-r from-red-500 to-pink-600' : 'bg-gray-700'
    };

    const iconSize = {
      sm: 10,
      md: 12,
      lg: 14
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={cn(
          'group relative inline-flex items-center rounded-full transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900',
          'disabled:cursor-not-allowed disabled:opacity-50',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        onClick={() => onCheckedChange(!checked)}
        {...props}
      >
        {/* Fondo con gradiente animado */}
        {checked && (
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: variant === 'primary' 
                ? 'linear-gradient(90deg, #f92929, #ef4444, #dc2626)' 
                : variant === 'success'
                ? 'linear-gradient(90deg, #10b981, #059669, #047857)'
                : 'linear-gradient(90deg, #6b7280, #4b5563, #374151)'
            }}
          />
        )}
        
        {/* Knob con efecto de elevación */}
        <span
          className={cn(
            'relative inline-block transform rounded-full bg-white shadow-lg transition-all duration-300',
            'group-hover:scale-110 group-active:scale-95',
            checked ? 'translate-x-5' : 'translate-x-1',
            knobSizeClasses[size]
          )}
        >
          {/* Efecto de brillo */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 to-transparent opacity-30" />
          
          {/* Iconos */}
          {showIcons && (
            <span className="absolute inset-0 flex items-center justify-center">
              {checked ? (
                <Check 
                  className="text-green-500" 
                  size={iconSize[size]} 
                  strokeWidth={3}
                />
              ) : (
                <X 
                  className="text-gray-400" 
                  size={iconSize[size]} 
                  strokeWidth={3}
                />
              )}
            </span>
          )}
        </span>
        
        {/* Etiquetas de estado */}
        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs font-medium text-white/50">
          OFF
        </span>
        <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs font-medium text-white/50">
          ON
        </span>
      </button>
    );
  }
);

Switch.displayName = 'Switch';