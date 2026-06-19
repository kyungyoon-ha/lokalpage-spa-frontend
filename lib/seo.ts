import { NextSeoProps } from 'next-seo'

const BASE_URL = 'https://www.korispa.com'

export const LOCALES = ['ko', 'en', 'ja', 'zh-CN', 'zh-TW'] as const
export type Locale = (typeof LOCALES)[number]

const SEO_TITLES: Record<Locale, string> = {
  ko: '코리스파 | 보홀 고급 마사지 스파',
  en: 'KORISPA | Luxury Massage Spa in Bohol',
  ja: 'KORISPA | ボホール高級マッサージスパ',
  'zh-CN': 'KORISPA | 薄荷岛高端按摩水疗',
  'zh-TW': 'KORISPA | 薄荷島高端按摩水療',
}

const SEO_DESCRIPTIONS: Record<Locale, string> = {
  ko: '보홀의 고급 마사지 스파 코리스파. 첫날팩, 픽드롭, 귀국 패키지로 여행 전후 완벽한 휴식을 경험하세요.',
  en: 'KORISPA luxury massage spa in Bohol. Experience perfect relaxation with our First Day Pack, Pick & Drop, and Departure packages.',
  ja: 'ボホールの高級マッサージスパ、KORISPA。ファーストデイパック、ピック＆ドロップ、帰国パッケージで旅の疲れを癒してください。',
  'zh-CN': '薄荷岛高端按摩水疗KORISPA。通过初日套餐、接送套餐和归程套餐，体验旅行前后的完美休憩。',
  'zh-TW': '薄荷島高端按摩水療KORISPA。透過初日套餐、接送套餐和歸程套餐，體驗旅行前後的完美休憩。',
}

function getLocaleUrl(locale: Locale): string {
  return locale === 'ko' ? BASE_URL : `${BASE_URL}/${locale}`
}

export function getHomePageSeo(locale: Locale): NextSeoProps {
  return {
    title: SEO_TITLES[locale],
    description: SEO_DESCRIPTIONS[locale],
    canonical: getLocaleUrl(locale),
    openGraph: {
      type: 'website',
      url: getLocaleUrl(locale),
      title: SEO_TITLES[locale],
      description: SEO_DESCRIPTIONS[locale],
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'KORISPA Luxury Spa Bohol',
        },
      ],
    },
    languageAlternates: LOCALES.map((l) => ({
      hrefLang: l === 'ko' ? 'x-default' : l,
      href: getLocaleUrl(l),
    })),
  }
}

export function getReservationPageSeo(locale: Locale): NextSeoProps {
  return {
    title: `예약 | KORISPA`,
    description: SEO_DESCRIPTIONS[locale],
    canonical: `${getLocaleUrl(locale)}/reservation`,
  }
}

export function getLocalBusinessLdJson() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
    name: '코리스파 KORISPA',
    url: BASE_URL,
    image: `${BASE_URL}/og-image.jpg`,
    priceRange: '₩₩₩',
    availableLanguage: ['Korean', 'English', 'Japanese', 'Chinese'],
    email: 'korispabohol@gmail.com',
    telephone: '010-4671-3429',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Purok 5, Barangay Danao',
      addressLocality: 'Panglao',
      addressRegion: 'Bohol',
      addressCountry: 'PH',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '10:00',
        closes: '21:00',
      },
    ],
    makesOffer: [
      { '@type': 'Offer', name: '첫날팩', description: '도착 당일 여행 피로 회복 집중 케어' },
      { '@type': 'Offer', name: '픽드롭 패키지', description: '호텔 픽업부터 드롭까지 프리미엄 서비스' },
      { '@type': 'Offer', name: '귀국 패키지', description: '출국 전 마지막 힐링과 라운지 이용' },
    ],
  }
}
