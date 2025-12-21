import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  onClick 
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95'
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'bg-transparent hover:bg-accent text-accent-foreground',
    gradient: 'bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary/50'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}