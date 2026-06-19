import { ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'outline' | 'solid'
  href?: string
  locale?: string
  className?: string
}

export default function Button({
  children,
  variant = 'outline',
  href,
  locale,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-block px-8 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 font-sans'
  const variants = {
    outline: 'border border-accent text-accent hover:bg-accent hover:text-cream',
    solid: 'bg-spa-text text-cream hover:bg-accent',
  }
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} locale={locale} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
