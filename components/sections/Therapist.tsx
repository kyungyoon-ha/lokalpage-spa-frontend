import { useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'

export default function Therapist() {
  const { t } = useTranslation('home')
  const sectionRef  = useRef<HTMLDivElement>(null)
  const imgBoxRef   = useRef<HTMLDivElement>(null)
  const contAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          imgBoxRef.current?.classList.add('on')
          contAreaRef.current?.classList.add('on')
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} style={{ backgroundColor: '#f8f5f0' }}>
      <div className="sc-therapist">

        <div className="img-box" ref={imgBoxRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://cdn.imweb.me/thumbnail/20251121/77335644c50d0.png" alt="Our therapist" />
        </div>

        <div className="cont-area" ref={contAreaRef}>
          <div className="text-wrap">
            <p className="therapist">OUR THERAPIST</p>
            <p className="sub" style={{ whiteSpace: 'pre-line' }}>
              {t('therapist.sub')}
            </p>
          </div>
          <div className="slide-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.imweb.me/thumbnail/20251121/91ac16434dc34.png" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.imweb.me/thumbnail/20251121/7c713766b6c3e.png" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.imweb.me/thumbnail/20251121/a83e33be5ed44.png" alt="" />
          </div>
        </div>

      </div>
    </div>
  )
}
