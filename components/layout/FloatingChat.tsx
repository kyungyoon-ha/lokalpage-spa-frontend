import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { CONTACT_CHANNELS } from '@/config/contact'
import ChatChannelButton from '@/components/ui/ChatChannelButton'

export default function FloatingChat() {
  const { t } = useTranslation('common')
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 200)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col gap-2 items-end animate-fade-in">
          <p className="text-xs text-muted bg-cream/95 backdrop-blur px-3 py-1.5 rounded-full border border-border shadow-sm whitespace-nowrap">
            {t('contact.title')}
          </p>
          {CONTACT_CHANNELS.map((channel) => (
            <ChatChannelButton key={channel.id} channel={channel} size="sm" />
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-accent text-cream flex items-center justify-center shadow-lg hover:bg-spa-text transition-colors"
        aria-label={t('contact.title')}
      >
        {open ? (
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M2 2l14 14M2 16L16 2" />
          </svg>
        ) : (
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
