import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { servicesData } from '@/data/services'

const LOCALES = ['ko', 'en', 'ja', 'zh-CN', 'zh-TW']

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: servicesData.flatMap((s) =>
    LOCALES.map((locale) => ({ params: { id: s.id }, locale }))
  ),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({ locale, params }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ko', ['common', 'services'])),
    id: params?.id as string,
  },
})

const ServiceDetailPage: NextPage<{ id: string }> = ({ id }) => {
  const { t } = useTranslation('services')
  const { locale } = useRouter()
  const service = servicesData.find((s) => s.id === id)
  if (!service) return null

  const name    = t(`items.${id}.name`)
  const tagline = t(`items.${id}.tagline`)

  return (
    <>
      <NextSeo
        title={`${name} | KORISPA`}
        description={t(`items.${id}.description`)}
      />

      {/* page background */}
      <main style={{ background: '#f8f5f0', minHeight: '100vh', paddingTop: '80px', paddingBottom: '100px' }}>
        <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 0 40px' }}>

          {/* ── First image with logo overlay ── */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '80vh',
            backgroundImage: `url(${service.images[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '12px',
            }}>
              <p style={{
                fontFamily: '"Marcellus",serif',
                fontSize: 'clamp(28px, 6vw, 52px)',
                color: 'rgba(190,165,115,0.5)',
                letterSpacing: '0.15em',
                margin: 0,
                textAlign: 'center',
              }}>
                KORI SPA
              </p>
              <p style={{
                fontFamily: '"Marcellus",serif',
                fontSize: 'clamp(11px, 1.8vw, 14px)',
                color: 'rgba(190,165,115,0.5)',
                letterSpacing: '0.2em',
                margin: 0,
                textAlign: 'center',
              }}>
                {service.enName}&nbsp;&nbsp;·&nbsp;&nbsp;{name}
              </p>
            </div>
          </div>

          {/* ── Additional images ── */}
          {service.images.slice(1).map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`${name} ${i + 2}`}
              style={{ width: '100%', display: 'block', marginTop: '8px', objectFit: 'cover' }}
            />
          ))}

        </div>
      </main>

      {/* ── Fixed bottom bar ── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(26, 23, 20, 0.93)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 40px',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>
            {name}
          </span>
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.2px' }}>
            {tagline}
          </span>
        </div>
        <Link
          href="/reservation"
          locale={locale}
          style={{
            background: '#a89060',
            color: '#1a1714',
            padding: '14px 36px',
            fontFamily: '"Marcellus",serif',
            fontSize: '14px',
            letterSpacing: '0.2em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'background 0.3s',
          }}
        >
          RESERVATION
        </Link>
      </div>
    </>
  )
}

export default ServiceDetailPage
