import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { servicesData } from '@/data/services'

const SERVICE_TITLES = ['FIRST DAY', 'PICK / DROP', 'LAST DAY']

const MASSAGE_BG = 'https://cdn.imweb.me/thumbnail/20251121/a7668c9f872b9.png'

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
            style={{
              width: '100%',
              height: 'calc(100vh - 80px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              background: '#1a1714',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
            onClick={() => navigate('/services/massage')}
          >
            {/* subtle background */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MASSAGE_BG}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }}
            />
            <div style={{ position: 'relative', textAlign: 'center', color: '#f8f5f0' }}>
              <p style={{ fontFamily: '"Marcellus",serif', fontSize: '13px', letterSpacing: '0.3em', color: 'rgba(248,245,240,0.5)', marginBottom: '16px' }}>
                KORISPA · MENU
              </p>
              <h2 style={{ fontFamily: '"Marcellus",serif', fontSize: 'clamp(40px,6vw,80px)', fontWeight: 400, letterSpacing: '0.1em', lineHeight: 1.1 }}>
                MASSAGE
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(248,245,240,0.6)', marginTop: '16px', letterSpacing: '0.05em' }}>
                {MASSAGE_LABEL[locale]?.desc ?? ''}
              </p>
            </div>
            <Link
              href="/services/massage"
              locale={locale}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                border: '1px solid rgba(248,245,240,0.4)',
                color: '#f8f5f0',
                padding: '14px 48px',
                fontFamily: '"Marcellus",serif',
                fontSize: '13px',
                letterSpacing: '0.25em',
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
            >
              VIEW MENU
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}
