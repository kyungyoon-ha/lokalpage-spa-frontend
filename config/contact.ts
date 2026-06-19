export type ChannelId = 'kakao' | 'messenger' | 'whatsapp' | 'line'

export interface ContactChannel {
  id: ChannelId
  url: string
  color: string
  bgColor: string
  labelKey: string
  icon: string
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'kakao',
    url: 'http://pf.kakao.com/_BVSxkn/chat',
    color: 'text-yellow-900',
    bgColor: 'bg-yellow-400',
    labelKey: 'contact.kakao',
    icon: '💬',
  },
  {
    id: 'messenger',
    url: 'https://m.me/replace_with_actual',
    color: 'text-white',
    bgColor: 'bg-blue-600',
    labelKey: 'contact.messenger',
    icon: '📱',
  },
  {
    id: 'whatsapp',
    url: 'https://wa.me/821000000000',
    color: 'text-white',
    bgColor: 'bg-green-500',
    labelKey: 'contact.whatsapp',
    icon: '📞',
  },
  {
    id: 'line',
    url: 'https://line.me/ti/p/replace_with_actual',
    color: 'text-white',
    bgColor: 'bg-green-400',
    labelKey: 'contact.line',
    icon: '💚',
  },
]
