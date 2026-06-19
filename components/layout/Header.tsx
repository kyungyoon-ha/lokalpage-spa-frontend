import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

const NAV_KEYS = ['services', 'philosophy', 'gallery', 'location'] as const

export default function Header() {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          locale={locale}
          className="font-serif text-sm tracking-[0.3em] uppercase text-cream"
          style={{ textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.4)' }}
        >
          <span className={scrolled ? 'text-spa-text' : 'text-cream'}>KORISPA</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_KEYS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className={`text-xs tracking-widest transition-colors ${
                scrolled ? 'text-muted hover:text-spa-text' : 'text-cream/80 hover:text-cream'
              }`}
            >
              {t(`nav.${key}`)}
            </a>
          ))}
          <Link
            href="/reservation"
            locale={locale}
            className={`text-xs tracking-widest px-4 py-2 transition-all border ${
              scrolled
                ? 'border-accent text-accent hover:bg-accent hover:text-cream'
                : 'border-cream/70 text-cream hover:bg-cream/20'
            }`}
          >
            {t('nav.reservation')}
          </Link>
        </nav>

        <div className="hidden md:block">
          <div className={scrolled ? '' : '[&_a]:text-cream/70 [&_a:hover]:text-cream [&_span]:text-cream/30'}>
            <LanguageSwitcher />
          </div>
        </div>

        <button
          className={`md:hidden transition-colors ${scrolled ? 'text-spa-text' : 'text-cream'}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-border px-6 py-6 flex flex-col gap-4">
          {NAV_KEYS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-sm tracking-widest text-muted hover:text-spa-text"
              onClick={() => setMenuOpen(false)}
            >
              {t(`nav.${key}`)}
            </a>
          ))}
          <Link
            href="/reservation"
            locale={locale}
            className="text-sm tracking-widest text-accent"
            onClick={() => setMenuOpen(false)}
          >
            {t('nav.reservation')}
          </Link>
          <div className="mt-2">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  )
}
