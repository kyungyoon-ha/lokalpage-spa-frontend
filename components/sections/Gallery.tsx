import { useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'

// about-3.html 그대로 구현 — Swiper 풀스크린 슬라이더
// active 슬라이드: cont-area opacity 0+blur(5px)+translateY(20px) → 1+blur(0)+translateY(0)

const SLIDES = [
  {
    bg: 'https://cdn.imweb.me/thumbnail/20251127/3f40cab19158b.jpg',
    cls: 'store01',
  },
  {
    bg: 'https://cdn.imweb.me/thumbnail/20251121/d1d437c49cdc9.png',
    cls: 'store02',
  },
  {
    bg: 'https://cdn.imweb.me/thumbnail/20251121/e66c325f22c13.png',
    cls: 'store03',
  },
]

export default function Gallery() {
  const { t } = useTranslation('home')
  const swiperRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instanceRef = useRef<any>(null)
  const currentRef  = useRef<HTMLSpanElement>(null)
  const totalRef    = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let Swiper: any
    import('swiper').then((mod) => {
      Swiper = mod.Swiper ?? mod.default
      if (!swiperRef.current) return

      instanceRef.current = new Swiper(swiperRef.current, {
        loop: true,
        speed: 2000,
        pagination: { el: '.swiper-pagination', type: 'fraction' },
        on: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          realIndexChange(sw: any) {
            if (currentRef.current) currentRef.current.textContent = String(sw.realIndex + 1)
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          init(sw: any) {
            if (totalRef.current)   totalRef.current.textContent   = String(sw.slides.length - (sw.loopedSlides ?? 0) * 2 || SLIDES.length)
            if (currentRef.current) currentRef.current.textContent = '1'
          },
        },
      })
    })

    return () => { instanceRef.current?.destroy?.() }
  }, [])

  const galleryTitle = t('gallery.title')
  const subText = `공간은 말이 없지만, 마음을 움직입니다.\n나무의 온도, 종이의 질감, 촛불의 흔들림 속에서\n자연과 가장 가까운 휴식을 경험하세요.`

  return (
    <section id="gallery" style={{ width: '100%', position: 'relative' }}>
      <div
        ref={swiperRef}
        className="swiper storeSwiper"
        style={{ width: '100%', height: '100vh' }}
      >
        <div className="swiper-wrapper">
          {SLIDES.map((slide) => (
            <div
              key={slide.cls}
              className={`swiper-slide ${slide.cls}`}
              style={{
                backgroundImage: `url(${slide.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                padding: '80px 100px',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <div
                className="cont-area"
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  width: '100%',
                  color: '#fff',
                }}
              >
                <div className="main-box">
                  <p style={{
                    fontFamily: '"Marcellus",serif',
                    fontSize: '16px',
                    textDecoration: 'underline',
                    marginBottom: '8px',
                  }}>
                    OUR SPACE
                  </p>
                  <h3 style={{
                    fontFamily: '"Marcellus",serif',
                    fontSize: 'clamp(36px,5vw,70px)',
                    fontWeight: 400,
                    lineHeight: 1.1,
                  }}>
                    {galleryTitle.toUpperCase()}
                  </h3>
                </div>
                <p className="sub" style={{
                  fontSize: '18px',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.6,
                  textAlign: 'right',
                  maxWidth: '420px',
                  whiteSpace: 'pre-line',
                }}>
                  {subText}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fraction pagination */}
        <div
          className="swiper-pagination"
          style={{
            position: 'absolute',
            bottom: 'auto',
            top: '10%',
            right: '100px',
            left: 'auto',
            textAlign: 'right',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: '"Marcellus",serif',
            fontSize: '24px',
            paddingRight: '0',
            zIndex: 10,
          }}
        />
      </div>
    </section>
  )
}
