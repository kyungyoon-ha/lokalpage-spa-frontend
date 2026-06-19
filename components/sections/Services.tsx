import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { servicesData } from '@/data/services'

const SERVICE_TITLES = ['FIRST DAY', 'PICK / DROP', 'LAST DAY']

const MASSAGE_BG = 'https://cdn.imweb.me/thumbnail/20251121/b89b42b75532c.jpeg'

const MASSAGE_LABEL: Record<string, { kor: string; title: string; desc: string }> = {
  en:      { kor: 'Massage Menu',      title: 'MASSAGE', desc: 'Traditional Thai & Japanese techniques for full-body healing.' },
  ja:      { kor: 'マッサージメニュー', title: 'MASSAGE', desc: '全身をほぐす伝統的なタイ・日本式テクニック。' },
  'zh-CN': { kor: '按摩菜单',          title: 'MASSAGE', desc: '全身放松的传统泰式与日式技法。' },
  'zh-TW': { kor: '按摩菜單',          title: 'MASSAGE', desc: '全身放鬆的傳統泰式與日式技法。' },
}

export default function Services() {
  const { t } = useTranslation('services')
  const router = useRouter()
  const { locale = 'ko' } = router
  const sectionRef = useRef<HTMLDivElement>(null)
  const isKo = locale === 'ko'

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
  }, [isKo])

  const navigate = (href: string) => router.push(href, undefined, { locale })

  return (
    <section id="services" ref={sectionRef}>
      <div className={`sc-service${isKo ? '' : ' single'}`}>

        {isKo ? (
          servicesData.map((service, i) => {
            const options = t(`items.${service.id}.options`, { returnObjects: true }) as string[]
            const href = `/services/${service.id}`
            return (
              <div
                key={service.id}
                className="service-area"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(href)}
              >
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
                    <Link
                      href={href}
                      locale={locale}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('detail').toUpperCase()}
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div
            className="service-area massage-card"
            style={{ backgroundImage: `url(${MASSAGE_BG})`, cursor: 'pointer' }}
            onClick={() => navigate('/services/massage')}
          >
            <div className="wrapper">
              <div className="title-wrap">
                <p className="kor">{MASSAGE_LABEL[locale]?.kor ?? 'Massage Menu'}</p>
                <h6 className="title">{MASSAGE_LABEL[locale]?.title ?? 'MASSAGE'}</h6>
              </div>
              <div className="cont-wrap">
                <p className="cont">{MASSAGE_LABEL[locale]?.desc ?? ''}</p>
              </div>
              <div className="btn-wrap">
                <Link
                  href="/services/massage"
                  locale={locale}
                  onClick={(e) => e.stopPropagation()}
                >
                  VIEW MENU
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
