'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showValue?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    value, 
    max = 100, 
    showValue = false, 
    color = 'primary', 
    size = 'md', 
    animated = false,
    className,
    ...props 
  }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    const colorClasses = {
      primary: 'bg-gradient-to-r from-nyxara-primary to-purple-600',
      success: 'bg-gradient-to-r from-green-500 to-emerald-600',
      warning: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      danger: 'bg-gradient-to-r from-red-500 to-pink-600',
      info: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    };
    
    const sizeClasses = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4'
    };

    return (
      <div className="w-full space-y-2">
        {showValue && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progreso</span>
            <span className="font-medium">{percentage.toFixed(1)}%</span>
          </div>
        )}
        
        <div
          ref={ref}
          className={cn(
            'relative w-full overflow-hidden rounded-full bg-gray-800/50',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              colorClasses[color],
              animated && 'animate-gradient bg-[length:200%_auto]'
            )}
            style={{ width: `${percentage}%` }}
          />
          
          {/* Efecto de brillo */}
          {animated && (
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 animate-shimmer"
              style={{ 
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite linear'
              }}
            />
          )}
        </div>
        
        <style jsx>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };