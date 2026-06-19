import { useEffect, useRef, useCallback, useState } from 'react'
import { useTranslation } from 'next-i18next'

const PANELS = [
  {
    bg: 'https://cdn.imweb.me/thumbnail/20251121/0f8e75828acda.png',
    t1Key: 'sticky.p1_t1',
    t2Key: 'sticky.p1_t2',
    dKey:  'sticky.p1_desc',
  },
  {
    bg: 'https://cdn.imweb.me/thumbnail/20251121/08292edcc0168.png',
    t1Key: 'sticky.p2_t1',
    t2Key: 'sticky.p2_t2',
    dKey:  'sticky.p2_desc',
  },
  {
    bg: 'https://cdn.imweb.me/thumbnail/20251121/739dba9a3aaa6.png',
    t1Key: 'sticky.p3_t1',
    t2Key: 'sticky.p3_t2',
    dKey:  'sticky.p3_desc',
  },
]

const MOBILE_PANELS = [...PANELS, ...PANELS]
const AUTO_SPEED = 0.6

export default function StickyScroll() {
  const { t } = useTranslation('home')
  const containerRef   = useRef<HTMLDivElement>(null)
  const listRef        = useRef<HTMLDivElement>(null)
  const panelRefs      = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs    = useRef<(HTMLDivElement | null)[]>([])
  const rafRef         = useRef<number>()
  const [isMobile, setIsMobile] = useState(false)

  // mobile drag state
  const mobileListRef = useRef<HTMLDivElement>(null)
  const offsetRef     = useRef(0)
  const dragActiveRef = useRef(false)
  const dragStartXRef = useRef(0)
  const mobileRafRef  = useRef<number>()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Desktop scroll-driven ──
  const update = useCallback(() => {
    const container = containerRef.current
    const list      = listRef.current
    if (!container || !list) return

    const containerTop = container.getBoundingClientRect().top + window.scrollY
    const scrollable   = container.offsetHeight - window.innerHeight
    const progress     = Math.max(0, Math.min(1, (window.scrollY - containerTop) / scrollable))

    list.style.transform = `translateX(${-progress * 200}vw)`

    // active panel index
    let activeIdx = 0
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return
      const threshold = i === 0 ? 0 : i / PANELS.length - 0.05
      const isActive = progress >= threshold
      panel.classList.toggle('active', isActive)
      if (isActive) activeIdx = i
    })

    // show only the active panel's content text
    contentRefs.current.forEach((el, i) => {
      if (!el) return
      el.style.opacity = i === activeIdx ? '1' : '0'
      el.style.filter  = i === activeIdx ? 'blur(0)' : 'blur(5px)'
    })
  }, [])

  useEffect(() => {
    if (isMobile) return
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
  }, [update, isMobile])

  // ── Mobile infinite loop ──
  const mobileLoop = useCallback(() => {
    const el = mobileListRef.current
    if (!el) return
    if (!dragActiveRef.current) {
      offsetRef.current -= AUTO_SPEED
      const half = el.scrollWidth / 2
      if (Math.abs(offsetRef.current) >= half) offsetRef.current = 0
      el.style.transform = `translateX(${offsetRef.current}px)`
    }
    mobileRafRef.current = requestAnimationFrame(mobileLoop)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    mobileRafRef.current = requestAnimationFrame(mobileLoop)
    return () => { if (mobileRafRef.current) cancelAnimationFrame(mobileRafRef.current) }
  }, [isMobile, mobileLoop])

  const onDragStart = useCallback((clientX: number) => {
    dragActiveRef.current = true
    dragStartXRef.current = clientX
  }, [])

  const onDragMove = useCallback((clientX: number) => {
    if (!dragActiveRef.current) return
    const el = mobileListRef.current
    if (!el) return
    const delta = clientX - dragStartXRef.current
    dragStartXRef.current = clientX
    offsetRef.current += delta
    const half = el.scrollWidth / 2
    if (offsetRef.current > 0) offsetRef.current -= half
    if (Math.abs(offsetRef.current) >= half) offsetRef.current += half
    el.style.transform = `translateX(${offsetRef.current}px)`
  }, [])

  const onDragEnd = useCallback(() => { dragActiveRef.current = false }, [])

  const panelBgStyle = (bg: string): React.CSSProperties => ({
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    flexShrink: 0,
  })

  if (isMobile) {
    return (
      <div
        style={{ height: '100vh', overflow: 'hidden', position: 'relative', cursor: 'grab' }}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
      >
        <div
          ref={mobileListRef}
          style={{ display: 'flex', width: 'max-content', height: '100%', willChange: 'transform', userSelect: 'none' }}
        >
          {MOBILE_PANELS.map((panel, i) => (
            <div
              key={i}
              className="sticky-panel active"
              style={{ ...panelBgStyle(panel.bg), width: '100vw', height: '100vh' }}
            >
              <div style={{ position: 'absolute', bottom: '50px', left: '24px', display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: 'calc(100% - 48px)' }}>
                <h2
                  className="panel-content delay-title"
                  style={{ fontSize: 'clamp(28px, 7vw, 42px)', fontWeight: 600, lineHeight: 1.3, color: '#fff',
                    fontFamily: '"Antic Didone","NanumMyeongjo","Apple SD Gothic Neo","sans-serif"' }}
                >
                  {t(panel.t1Key)}<br />{t(panel.t2Key)}
                </h2>
                <p
                  className="panel-content delay-desc"
                  style={{ fontSize: '14px', letterSpacing: '-0.3px', fontWeight: 500, lineHeight: 1.6, color: '#fff', whiteSpace: 'pre-line' }}
                >
                  {t(panel.dKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── Desktop: backgrounds slide, text fixed ──
  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative', top: '-100px' }}>
      {/* sticky viewport */}
      <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden' }}>

        {/* background panels — slide horizontally */}
        <div
          ref={listRef}
          style={{ display: 'flex', width: '300vw', height: '100%', willChange: 'transform' }}
        >
          {PANELS.map((panel, i) => (
            <div
              key={i}
              ref={(el) => { panelRefs.current[i] = el }}
              className="sticky-panel"
              style={{ ...panelBgStyle(panel.bg), width: '100vw', height: '100%' }}
            />
          ))}
        </div>

        {/* text overlay — fixed inside sticky, never clips */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {PANELS.map((panel, i) => (
            <div
              key={i}
              ref={(el) => { contentRefs.current[i] = el }}
              style={{
                position: 'absolute',
                bottom: '100px',
                left: '100px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                opacity: i === 0 ? 1 : 0,
                filter: i === 0 ? 'blur(0)' : 'blur(5px)',
                transition: 'opacity 0.8s ease, filter 0.8s ease',
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(36px, 4.5vw, 60px)',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: '#fff',
                  fontFamily: '"Antic Didone","NanumMyeongjo","Apple SD Gothic Neo","Malgun Gothic","Nanum Gothic","Noto Sans","sans-serif"',
                  margin: 0,
                }}
              >
                {t(panel.t1Key)}<br />{t(panel.t2Key)}
              </h2>
              <p
                style={{
                  fontSize: '18px',
                  letterSpacing: '-0.5px',
                  fontWeight: 500,
                  lineHeight: 1.6,
                  color: '#fff',
                  whiteSpace: 'pre-line',
                  margin: 0,
                }}
              >
                {t(panel.dKey)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
