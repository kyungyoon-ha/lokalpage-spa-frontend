import { useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'next-i18next'

// about-2.html 그대로 구현
// 왼쪽 이미지: y:60(아래서 올라옴) → y:0 → y:-60(위로 사라짐)
// 오른쪽 이미지: y:-60(위에서 내려옴) → y:0 → y:60(아래로 사라짐)
// 중앙 텍스트: opacity+blur만 전환

export default function Philosophy() {
  const { t } = useTranslation('home')
  const containerRef = useRef<HTMLDivElement>(null)
  const firstRef     = useRef<HTMLDivElement>(null)
  const secondRef    = useRef<HTMLDivElement>(null)
  const rafRef       = useRef<number>()

  const setEl = (el: HTMLElement | null, opacity: number, blur: number, y: number) => {
    if (!el) return
    el.style.opacity   = String(opacity)
    el.style.filter    = `blur(${blur}px)`
    el.style.transform = `translateY(${y}px)`
  }

  const update = useCallback(() => {
    const container = containerRef.current
    const first     = firstRef.current
    const second    = secondRef.current
    if (!container || !first || !second) return

    const containerTop = container.getBoundingClientRect().top + window.scrollY
    const scrollable   = container.offsetHeight - window.innerHeight
    const progress     = Math.max(0, Math.min(1, (window.scrollY - containerTop) / scrollable))

    const f1L  = first.querySelector<HTMLElement>('img.left')
    const f1R  = first.querySelector<HTMLElement>('img.right')
    const f1C  = first.querySelector<HTMLElement>('.cont-area')
    const f2L  = second.querySelector<HTMLElement>('img.left')
    const f2R  = second.querySelector<HTMLElement>('img.right')
    const f2C  = second.querySelector<HTMLElement>('.cont-area')

    if (progress < 0.35) {
      // Phase A: first group enters
      const p = progress / 0.35
      setEl(f1L, p,     5 * (1 - p),  60 * (1 - p))   // 아래서 올라옴
      setEl(f1R, p,     5 * (1 - p), -60 * (1 - p))   // 위에서 내려옴
      setEl(f1C, p,     5 * (1 - p),  0)
      setEl(f2L, 0, 5,  60)
      setEl(f2R, 0, 5, -60)
      setEl(f2C, 0, 5,   0)
    } else if (progress < 0.6) {
      // Phase B: first exits, second enters simultaneously
      const p = (progress - 0.35) / 0.25
      setEl(f1L, 1 - p, p * 5, -60 * p)    // 위로 사라짐
      setEl(f1R, 1 - p, p * 5,  60 * p)    // 아래로 사라짐
      setEl(f1C, 1 - p, p * 5,  0)
      setEl(f2L, p,     5 * (1 - p),  60 * (1 - p))   // 아래서 올라옴
      setEl(f2R, p,     5 * (1 - p), -60 * (1 - p))   // 위에서 내려옴
      setEl(f2C, p,     5 * (1 - p),  0)
    } else {
      // Phase C: second stays
      setEl(f1L, 0, 5, -60)
      setEl(f1R, 0, 5,  60)
      setEl(f1C, 0, 5,   0)
      setEl(f2L, 1, 0,   0)
      setEl(f2R, 1, 0,   0)
      setEl(f2C, 1, 0,   0)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // initial states
    const init = (el: HTMLElement | null, y: number) => {
      if (!el) return
      el.style.opacity   = '0'
      el.style.filter    = 'blur(5px)'
      el.style.transform = `translateY(${y}px)`
      el.style.transition = 'none'
    }
    const f = firstRef.current
    const s = secondRef.current
    if (f) {
      init(f.querySelector('img.left'),   60)
      init(f.querySelector('img.right'), -60)
      init(f.querySelector('.cont-area'),  0)
    }
    if (s) {
      init(s.querySelector('img.left'),   60)
      init(s.querySelector('img.right'), -60)
      init(s.querySelector('.cont-area'),  0)
    }

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [update])

  // 이미지 & 텍스트 공통 transition
  const imgStyle: React.CSSProperties = {
    width: '27%',
    objectFit: 'cover' as const,
    transition: 'opacity 1.2s ease, filter 1.2s ease, transform 1.2s ease',
  }
  const contStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#2d2618',
    transition: 'opacity 1.2s ease, filter 1.2s ease',
  }
  const groupStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  return (
    <div id="philosophy" ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      {/* Sticky inner — .sc-brand */}
      <div className="sc-brand-sticky" style={{
        width: 'calc(100% - 300px)',
        height: 'calc(100vh - 80px)',
        margin: '0 auto',
        position: 'sticky',
        top: '80px',
      }}>

        {/* ── FIRST GROUP: 精神 / オモテナシ ── */}
        <div ref={firstRef} className="sc-brand-group" style={groupStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.imweb.me/thumbnail/20251121/57ff504a48733.png"
            alt=""
            className="left"
            style={{ ...imgStyle, marginBottom: '160px' }}
          />
          <div className="cont-area" style={contStyle}>
            <p style={{ fontFamily: '"Marcellus",serif', fontSize: '16px', textDecoration: 'underline', marginBottom: '50px' }}>
              BRAND PHILOSOPHY #1
            </p>
            <p style={{ fontFamily: '"Marcellus",serif', fontSize: 'clamp(60px,8vw,100px)' }}>おもてなし</p>
            <div style={{ fontSize: '18px' }}>
              <p style={{ fontWeight: 800 }}>{t('philosophy.omotenashi_title')}</p>
              <p>[ {t('philosophy.omotenashi_subtitle')} ]</p>
            </div>
            <p style={{ fontSize: '18px', letterSpacing: '-0.5px', lineHeight: 1.6, marginTop: '30px', maxWidth: '360px', margin: '30px auto 0' }}>
              {t('philosophy.omotenashi_desc')}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.imweb.me/thumbnail/20251121/cfb2cdeb2c8d8.png"
            alt=""
            className="right"
            style={{ ...imgStyle, marginTop: '160px' }}
          />
        </div>

        {/* ── SECOND GROUP: わびさび / 와비사비 ── */}
        <div ref={secondRef} className="sc-brand-group" style={groupStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.imweb.me/thumbnail/20251013/81b3442326ab8.png"
            alt=""
            className="left"
            style={{ ...imgStyle, marginBottom: '160px' }}
          />
          <div className="cont-area" style={contStyle}>
            <p style={{ fontFamily: '"Marcellus",serif', fontSize: '16px', textDecoration: 'underline', marginBottom: '50px' }}>
              BRAND PHILOSOPHY #2
            </p>
            <p style={{ fontFamily: '"Marcellus",serif', fontSize: 'clamp(60px,8vw,100px)' }}>わびさび</p>
            <div style={{ fontSize: '18px' }}>
              <p style={{ fontWeight: 800 }}>{t('philosophy.wabisabi_title')}</p>
              <p>[ {t('philosophy.wabisabi_subtitle')} ]</p>
            </div>
            <p style={{ fontSize: '18px', letterSpacing: '-0.5px', lineHeight: 1.6, marginTop: '30px', maxWidth: '360px', margin: '30px auto 0' }}>
              {t('philosophy.wabisabi_desc')}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.imweb.me/thumbnail/20251121/9b7cb7fefb076.png"
            alt=""
            className="right"
            style={{ ...imgStyle, marginTop: '160px' }}
          />
        </div>

      </div>
    </div>
  )
}
