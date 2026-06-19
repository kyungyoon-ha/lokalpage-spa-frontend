import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { CONTACT_CHANNELS } from '@/config/contact'
import ChatChannelButton from '@/components/ui/ChatChannelButton'

const NAV_KEYS = ['services', 'philosophy', 'gallery', 'location'] as const

export default function Footer() {
  const { t } = useTranslation('common')
  useRouter()

  return (
    <footer className="bg-dark text-muted py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-serif text-sm tracking-[0.3em] text-cream mb-4">KORISPA</p>
            <p className="text-xs leading-relaxed mb-2">{t('footer.address')}</p>
            <p className="text-xs">korispabohol@gmail.com</p>
          </div>

          <nav className="flex flex-col gap-3">
            {NAV_KEYS.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-xs tracking-widest hover:text-cream transition-colors"
              >
                {t(`nav.${key}`)}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-6">
            <LanguageSwitcher />
            <div className="flex flex-wrap gap-2">
              {CONTACT_CHANNELS.map((channel) => (
                <ChatChannelButton key={channel.id} channel={channel} size="sm" />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-muted/30 pt-8 text-xs text-muted/70">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}
