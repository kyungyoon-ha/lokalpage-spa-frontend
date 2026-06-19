import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
}

export default function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div
      className={`bg-cream border border-border p-8 transition-all duration-300 ${
        hoverable ? 'hover:border-accent hover:-translate-y-1 hover:shadow-lg' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
