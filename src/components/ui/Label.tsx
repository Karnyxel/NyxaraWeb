'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  required?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, htmlFor, required, variant = 'default', ...props }, ref) => {
    
    const variantClasses = {
      default: 'text-gray-300',
      success: 'text-green-400',
      warning: 'text-yellow-400',
      error: 'text-red-400'
    };

    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          'flex items-center gap-1.5',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-red-500 text-xs" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label };