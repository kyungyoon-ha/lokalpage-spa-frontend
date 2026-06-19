import { useTranslation } from 'next-i18next'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { CONTACT_CHANNELS } from '@/config/contact'
import ChatChannelButton from '@/components/ui/ChatChannelButton'

export default function LocationContact() {
  const { t } = useTranslation('home')

  return (
    <SectionWrapper id="location" className="bg-sand px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="reveal text-muted text-xs tracking-[0.3em] uppercase mb-3">
            {t('location.title')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <div className="reveal reveal-d1 h-64 md:h-96 overflow-hidden bg-border/20">
            <iframe
              src="https://maps.google.com/maps?q=9.5534304,123.7632956&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KORISPA Location"
            />
          </div>

          <div className="flex flex-col gap-10">

            <div className="reveal reveal-d2">
              <h3 className="font-serif text-spa-text text-xl mb-4">
                {t('location.hours_title')}
              </h3>
              <div className="flex flex-col gap-2 text-sm text-muted">
                <p>{t('location.hours.weekday')}</p>
                <p>{t('location.hours.weekend')}</p>
              </div>
            </div>

            <div className="reveal reveal-d3">
              <h3 className="font-serif text-spa-text text-xl mb-4">
                {t('location.contact_title')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {CONTACT_CHANNELS.map((channel) => (
                  <ChatChannelButton key={channel.id} channel={channel} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
