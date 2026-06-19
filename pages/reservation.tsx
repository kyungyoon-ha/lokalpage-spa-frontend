import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { CONTACT_CHANNELS } from '@/config/contact'
import ChatChannelButton from '@/components/ui/ChatChannelButton'
import { getReservationPageSeo, type Locale } from '@/lib/seo'

const ReservationPage: NextPage = () => {
  const { t } = useTranslation(['reservation', 'common'])
  const { locale } = useRouter()
  const seoProps = getReservationPageSeo((locale ?? 'ko') as Locale)

  return (
    <>
      <NextSeo {...seoProps} />
      <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-24">
        <div className="text-center max-w-lg">
          <div className="text-6xl mb-8">🗓️</div>

          <h1 className="font-serif text-spa-text text-3xl md:text-4xl font-light mb-4">
            {t('reservation:title')}
          </h1>
          <p className="text-muted text-sm mb-2">{t('reservation:subtitle')}</p>
          <p className="text-muted text-sm mb-12">{t('reservation:description')}</p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CONTACT_CHANNELS.map((channel) => (
              <ChatChannelButton key={channel.id} channel={channel} />
            ))}
          </div>

          <Link
            href="/"
            locale={locale}
            className="text-xs text-muted tracking-widest hover:text-accent transition-colors underline underline-offset-4"
          >
            ← {t('reservation:back_home')}
          </Link>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ko', ['common', 'reservation'])),
  },
})

export default ReservationPage
