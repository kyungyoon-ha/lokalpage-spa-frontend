import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { servicesData } from '@/data/services'

// service.html 그대로 — CSS는 globals.css에 있음
// .on 클래스: wrapper blur(0)+opacity:1 / hover: wrapper bottom→50px, cont/btn fade-in

const SERVICE_TITLES = ['FIRST DAY', 'PICK / DROP', 'LAST DAY']

export default function Services() {
  const { t } = useTranslation('services')
  const { locale } = useRouter()
  const services = servicesData
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const areas = section.querySelectorAll<HTMLElement>('.service-area')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          areas.forEach((a) => a.classList.add('on'))
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef}>
      <div className="sc-service">
        {services.map((service, i) => {
          const options = t(`items.${service.id}.options`, { returnObjects: true }) as string[]
          return (
            <div key={service.id} className="service-area">
              <div className="wrapper">
                <div className="title-wrap">
                  <p className="kor">{t(`items.${service.id}.name`)}</p>
                  <h6 className="title">{SERVICE_TITLES[i]}</h6>
                </div>
                <div className="cont-wrap">
                  <p className="cont">{t(`items.${service.id}.description`)}</p>
                  <div className="hash-box">
                    {Array.isArray(options) && options.map((opt) => (
                      <span key={opt} className="hash">{opt}</span>
                    ))}
                  </div>
                </div>
                <div className="btn-wrap">
                  <Link href={`/services/${service.id}`} locale={locale}>{t('detail').toUpperCase()}</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
