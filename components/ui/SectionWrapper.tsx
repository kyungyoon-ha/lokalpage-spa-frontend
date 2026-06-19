import { useEffect, useRef, ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Add reveal to direct children that don't already have it
    const revealEls = el.querySelectorAll<HTMLElement>('.reveal, .reveal-fade')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).classList.add('visible')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )

    revealEls.forEach((el) => observer.observe(el))

    // Also observe the section itself for a section-level reveal
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          sectionObserver.unobserve(el)
        }
      },
      { threshold: 0.05 }
    )
    el.style.opacity = '0'
    el.style.transition = 'opacity 0.3s ease'
    sectionObserver.observe(el)

    return () => {
      observer.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  return (
    <section
      ref={ref}
      id={id}
      className={`py-24 md:py-32 ${className}`}
    >
      {children}
    </section>
  )
}
