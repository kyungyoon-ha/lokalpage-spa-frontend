import { useTranslation } from 'next-i18next'
import { ContactChannel } from '@/config/contact'

interface ChatChannelButtonProps {
  channel: ContactChannel
  size?: 'sm' | 'md'
}

export default function ChatChannelButton({ channel, size = 'md' }: ChatChannelButtonProps) {
  const { t } = useTranslation('common')
  const label = t(channel.labelKey)
  const sizeClasses = size === 'sm' ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-sm'

  return (
    <a
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${channel.bgColor} ${channel.color} ${sizeClasses} rounded-full font-sans tracking-wide transition-opacity hover:opacity-90 inline-flex items-center gap-2 font-medium`}
    >
      {label}
    </a>
  )
}
