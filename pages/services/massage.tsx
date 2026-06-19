import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { SPA_CATEGORIES, mapTherapy, toLocale } from '@/data/therapy'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})

const PAGE_TITLE: Record<string, string> = {
  ko: '마사지 메뉴',
  en: 'Massage Menu',
  ja: 'マッサージメニュー',
  'zh-CN': '按摩菜单',
  'zh-TW': '按摩菜單',
}

const RESERVE_LABEL: Record<string, string> = {
  ko: '예약하기',
  en: 'RESERVATION',
  ja: 'ご予約',
  'zh-CN': '立即预约',
  'zh-TW': '立即預約',
}

const MassagePage: NextPage = () => {
  const { locale = 'en' } = useRouter()
  const loc = toLocale(locale)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  const categories = activeCategory === null ? SPA_CATEGORIES : [SPA_CATEGORIES[activeCategory]]

  return (
    <>
      <NextSeo title={`${PAGE_TITLE[locale] ?? 'Massage Menu'} | KORISPA`} />

      <main style={{ background: '#f8f5f0', minHeight: '100vh', paddingTop: '80px', paddingBottom: '120px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 24px 0' }}>

          {/* Header */}
          <div style={{ marginBottom: '48px', borderBottom: '1px solid rgba(44,31,20,0.12)', paddingBottom: '32px' }}>
            <p style={{ fontFamily: '"Marcellus",serif', fontSize: '12px', letterSpacing: '0.3em', color: '#9a8070', marginBottom: '12px' }}>
              KORISPA · MENU
            </p>
            <h1 style={{ fontFamily: '"Marcellus",serif', fontSize: 'clamp(28px,5vw,48px)', color: '#2c1f14', fontWeight: 400, letterSpacing: '0.05em' }}>
              {PAGE_TITLE[locale] ?? 'Massage Menu'}
            </h1>
          </div>

          {/* Category filter tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                padding: '8px 16px', fontSize: '13px', letterSpacing: '0.05em', cursor: 'pointer', border: '1px solid',
                background: activeCategory === null ? '#2c1f14' : 'transparent',
                color: activeCategory === null ? '#f8f5f0' : '#2c1f14',
                borderColor: '#2c1f14', transition: 'all 0.2s',
              }}
            >
              ALL
            </button>
            {SPA_CATEGORIES.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(activeCategory === i ? null : i)}
                style={{
                  padding: '8px 16px', fontSize: '13px', letterSpacing: '0.05em', cursor: 'pointer', border: '1px solid',
                  background: activeCategory === i ? '#2c1f14' : 'transparent',
                  color: activeCategory === i ? '#f8f5f0' : '#2c1f14',
                  borderColor: activeCategory === i ? '#2c1f14' : 'rgba(44,31,20,0.3)', transition: 'all 0.2s',
                }}
              >
                {cat.label[loc]}
              </button>
            ))}
          </div>

          {/* Menu items */}
          {categories.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: '48px' }}>
              <h2 style={{
                fontFamily: '"Marcellus",serif', fontSize: '13px', letterSpacing: '0.25em',
                color: '#9a8070', marginBottom: '16px', textTransform: 'uppercase',
              }}>
                {cat.label[loc]}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                {cat.ids.map((id) => {
                  const item = mapTherapy[id]
                  if (!item) return null
                  const { name, description } = item[loc]
                  return (
                    <div key={id} style={{
                      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                      padding: '20px 0', borderBottom: '1px solid rgba(44,31,20,0.08)',
                      gap: '16px',
                    }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '16px', fontWeight: 600, color: '#2c1f14', marginBottom: '6px', letterSpacing: '-0.2px' }}>
                          {name}
                        </p>
                        <p style={{ fontSize: '13px', color: '#9a8070', lineHeight: 1.6, letterSpacing: '-0.1px' }}>
                          {description}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{ fontSize: '15px', fontWeight: 600, color: '#2c1f14', fontFamily: '"Marcellus",serif' }}>
                          ₱{item.price.toLocaleString()}
                        </p>
                        <p style={{ fontSize: '12px', color: '#9a8070', marginTop: '2px' }}>
                          {item.duration}min
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

        </div>
      </main>

      {/* Fixed bottom bar */}
      <div style={{
        position: 'fixed', bottom: '24px', left: '24px', right: '24px',
        background: 'rgba(26, 23, 20, 0.93)', backdropFilter: 'blur(8px)',
        borderRadius: '4px', padding: '20px 32px', zIndex: 100,
      }}>
        <div className="service-bottom-bar">
          <div className="bar-text">
            <span className="bar-name">{PAGE_TITLE[locale] ?? 'Massage Menu'}</span>
          </div>
          <Link href="/reservation" locale={locale} className="bar-btn">
            {RESERVE_LABEL[locale] ?? 'RESERVATION'}
          </Link>
        </div>
      </div>
    </>
  )
}

export default MassagePage
