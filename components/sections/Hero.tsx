import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Button from '@/components/ui/Button'

export default function Hero() {
  const { t } = useTranslation('home')
  const { locale } = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleScroll = () => {
      video.style.transform = `translateY(${window.scrollY * 0.4}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video / image background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-[120%] object-cover"
        style={{ willChange: 'transform', top: '-10%' }}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ zIndex: -1 }}>
        <Image
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80"
          alt="KORISPA luxury spa"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-dark/55" />

      {/* Content — staggered blur-to-clear entrance */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="hero-tagline text-accent text-xs tracking-[0.4em] uppercase mb-6">
          {t('hero.tagline')}
        </p>

        <h1 className="font-serif text-cream font-light leading-tight mb-10"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
          <span className="hero-line1 block">{t('hero.headline1')}</span>
          <span className="hero-line2 block">{t('hero.headline2')}</span>
        </h1>

        <div className="hero-cta">
          <Button href="/reservation" locale={locale} variant="outline">
            {t('hero.cta')}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50 z-10">
        <span className="text-xs tracking-[0.3em]">SCROLL</span>
        <div className="scroll-indicator w-px h-8 bg-cream/40" />
      </div>
    </section>
  )
}
