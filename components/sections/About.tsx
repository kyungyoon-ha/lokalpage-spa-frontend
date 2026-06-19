import { useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'

export default function About() {
  const { t } = useTranslation('home')
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const targets = section.querySelectorAll<HTMLElement>('.about-area, .title-box, .sub-text, .img-area')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          targets.forEach((el) => el.classList.add('on'))
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="sc-about">
      <div className="about-area">
        <span>ABOUT</span>
      </div>

      <div className="wrapper">
        <div className="img-area">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://cdn.imweb.me/thumbnail/20251121/57455cab81194.png" alt="KORISPA space" />
        </div>

        <div className="cont-area">
          <div className="title-box">
            <div className="line" />
            <h3 className="main-text">
              {t('about.title1')} <span>{t('about.title1_em')}</span>
            </h3>
            <div className="line" />
            <h3 className="main-text">
              {t('about.title2')} <span>{t('about.title2_em')}</span>
            </h3>
            <div className="line" />
          </div>
          <p className="sub-text" style={{ whiteSpace: 'pre-line' }}>
            {t('about.sub')}
          </p>
        </div>
      </div>
    </div>
  )
}
