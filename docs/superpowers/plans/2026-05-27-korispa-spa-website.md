# KORISPA 고급 마사지 스파 홈페이지 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 다국어(ko/en/ja/zh-CN/zh-TW) 지원 고급 마사지 스파 홈페이지를 Next.js Page Router로 구현한다. 메인 원페이지 + 예약 임시 페이지, 플로팅 멀티채널 위젯, 풀스크린 비디오 히어로, SEO + LD+JSON 완비.

**Architecture:** Next.js Page Router + next-i18next(5개 언어) + TanStack Query + Tailwind CSS 커스텀 테마. 번역은 공개 폴더의 JSON 네임스페이스(common/home/services/reservation)로 관리. 채널/서비스 설정은 `config/` + `data/`에 중앙화하여 나중에 API로 전환이 쉽도록 TanStack Query 훅으로 감싼다.

**Tech Stack:** Next.js 14 (Page Router), TypeScript, next-i18next, @tanstack/react-query, Tailwind CSS, next-seo, next-sitemap, @fontsource/pretendard

---

## 파일 맵

| 파일 | 역할 |
|------|------|
| `next.config.js` | i18n 로케일 설정, 이미지 도메인 |
| `next-i18next.config.js` | next-i18next 설정 |
| `next-sitemap.config.js` | 사이트맵 생성 설정 |
| `tailwind.config.ts` | 커스텀 컬러/폰트/애니메이션 토큰 |
| `styles/globals.css` | Tailwind 베이스 + 전역 스타일 |
| `pages/_document.tsx` | `<html lang>` 동적 설정, 구글 폰트 |
| `pages/_app.tsx` | i18n Provider, QueryClient, 전역 레이아웃 |
| `pages/index.tsx` | 메인 원페이지 (섹션 조합 + SEO) |
| `pages/reservation.tsx` | 예약 Coming Soon 임시 페이지 |
| `config/contact.ts` | 채널 링크/색상 중앙 설정 |
| `data/services.ts` | 서비스 아이콘/ID 정적 데이터 |
| `hooks/useServices.ts` | TanStack Query 훅 |
| `lib/seo.ts` | 언어별 메타/LD+JSON 생성 헬퍼 |
| `components/ui/Button.tsx` | 공통 버튼 (outline/solid) |
| `components/ui/Card.tsx` | 공통 카드 |
| `components/ui/SectionWrapper.tsx` | 섹션 진입 fade-up 애니메이션 래퍼 |
| `components/ui/LanguageSwitcher.tsx` | 언어 전환 버튼 |
| `components/ui/ChatChannelButton.tsx` | 채널별 버튼 |
| `components/layout/Header.tsx` | 고정 헤더 + 모바일 메뉴 |
| `components/layout/Footer.tsx` | 푸터 |
| `components/layout/FloatingChat.tsx` | 우측 하단 플로팅 위젯 |
| `components/sections/Hero.tsx` | 풀스크린 비디오 + 패럴랙스 |
| `components/sections/BrandMessage.tsx` | 핵심 카피 3줄 |
| `components/sections/Services.tsx` | 서비스 카드 3개 |
| `components/sections/Philosophy.tsx` | 브랜드 철학 섹션 |
| `components/sections/Gallery.tsx` | 이미지 그리드 + 라이트박스 |
| `components/sections/LocationContact.tsx` | 지도 + 영업시간 + 채널 |
| `public/locales/{ko,en,ja,zh-CN,zh-TW}/{common,home,services,reservation}.json` | 5언어 × 4네임스페이스 번역 파일 |

---

## Task 1: 프로젝트 스캐폴딩 & 의존성 설치

**Files:**
- Create: `package.json` (자동 생성)
- Create: `next.config.js`
- Create: `next-i18next.config.js`
- Create: `tsconfig.json` (자동 생성)

- [ ] **Step 1: Next.js 앱 생성**

프로젝트 루트에서 실행 (현재 디렉토리가 비어 있어야 함):

```bash
cd /Users/yoon-lokalpage/Laboratory-Lokalpage/Project/korispa-frontend
npx create-next-app@14 . \
  --typescript \
  --tailwind \
  --eslint \
  --no-app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-git
```

프롬프트가 나오면 모두 기본값(Enter)으로 진행.

Expected output: `Success! Created korispa-frontend at ...`

- [ ] **Step 2: 추가 의존성 설치**

```bash
npm install \
  next-i18next \
  react-i18next \
  i18next \
  @tanstack/react-query \
  next-seo \
  next-sitemap \
  @fontsource/pretendard
```

Expected output: `added N packages`

- [ ] **Step 3: git 초기화**

```bash
git init
echo ".superpowers/" >> .gitignore
echo "public/video/" >> .gitignore
git add .
git commit -m "chore: initial Next.js scaffold"
```

Expected output: `[main (root-commit) xxxxxxx] chore: initial Next.js scaffold`

---

## Task 2: Tailwind 커스텀 테마 & 디자인 토큰

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `styles/globals.css`

- [ ] **Step 1: tailwind.config.ts 교체**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f8f5f0',
        sand: '#ede8e0',
        border: '#d4b896',
        accent: '#b89060',
        'spa-text': '#2c1f14',
        muted: '#9a8070',
        dark: '#1a1714',
      },
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans JP', 'Noto Sans SC', 'Noto Sans TC', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: globals.css 교체**

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-sans text-spa-text bg-cream;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

- [ ] **Step 3: TypeScript 확인**

```bash
npx tsc --noEmit
```

Expected output: 에러 없음 (경고는 무시)

- [ ] **Step 4: 커밋**

```bash
git add tailwind.config.ts styles/globals.css
git commit -m "feat: custom Tailwind design tokens (colors, fonts, animations)"
```

---

## Task 3: i18n 설정 & next.config.js

**Files:**
- Create: `next-i18next.config.js`
- Modify: `next.config.js`
- Create: `next-sitemap.config.js`

- [ ] **Step 1: next-i18next.config.js 생성**

```js
// next-i18next.config.js
/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    locales: ['ko', 'en', 'ja', 'zh-CN', 'zh-TW'],
    defaultLocale: 'ko',
  },
  localePath: './public/locales',
}
```

- [ ] **Step 2: next.config.js 교체**

```js
// next.config.js
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
```

- [ ] **Step 3: next-sitemap.config.js 생성**

```js
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.korispa.com',
  generateRobotsTxt: true,
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en', 'ja', 'zh-CN', 'zh-TW'],
  },
}
```

- [ ] **Step 4: package.json에 postbuild 스크립트 추가**

`package.json`의 `"scripts"` 섹션을 찾아 `"postbuild"` 추가:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "postbuild": "next-sitemap",
  "start": "next start",
  "lint": "next lint"
}
```

- [ ] **Step 5: 커밋**

```bash
git add next-i18next.config.js next.config.js next-sitemap.config.js package.json
git commit -m "feat: i18n (5 locales) and sitemap config"
```

---

## Task 4: 번역 파일 — 한국어 (ko)

**Files:**
- Create: `public/locales/ko/common.json`
- Create: `public/locales/ko/home.json`
- Create: `public/locales/ko/services.json`
- Create: `public/locales/ko/reservation.json`

- [ ] **Step 1: 폴더 생성**

```bash
mkdir -p public/locales/{ko,en,ja,zh-CN,zh-TW}
```

- [ ] **Step 2: public/locales/ko/common.json**

```json
{
  "nav": {
    "services": "서비스",
    "philosophy": "브랜드",
    "gallery": "갤러리",
    "location": "오시는 길",
    "reservation": "예약하기"
  },
  "language": {
    "ko": "KO",
    "en": "EN",
    "ja": "JP",
    "zh-CN": "简",
    "zh-TW": "繁"
  },
  "contact": {
    "title": "상담하기",
    "kakao": "카카오톡",
    "whatsapp": "WhatsApp",
    "wechat": "WeChat",
    "messenger": "Messenger",
    "line": "Line"
  },
  "footer": {
    "copyright": "© 2026 KORISPA. All rights reserved.",
    "address": "서울특별시 (주소 업데이트 예정)"
  }
}
```

- [ ] **Step 3: public/locales/ko/home.json**

```json
{
  "hero": {
    "tagline": "마음을 위한 시간",
    "headline1": "공간 그 자체가",
    "headline2": "휴식이 되도록",
    "cta": "예약하기"
  },
  "brand_message": {
    "line1": "나무의 온도, 종이의 질감, 촛불의 흔들림",
    "line2": "한 분 한 분의 컨디션과 감정에 집중",
    "line3": "공간 그 자체가 휴식이 되도록"
  },
  "philosophy": {
    "title": "우리의 철학",
    "subtitle": "오모테나시와 와비사비",
    "omotenashi_title": "おもてなし",
    "omotenashi_desc": "상대를 배려하는 진심 어린 환대. 코리스파의 모든 서비스는 한 분 한 분을 위한 맞춤형 케어로 시작됩니다.",
    "wabisabi_title": "侘寂",
    "wabisabi_desc": "불완전함 속의 아름다움. 있는 그대로의 자신을 받아들이고 쉬어가는 공간을 만들어 드립니다."
  },
  "gallery": {
    "title": "공간"
  },
  "location": {
    "title": "오시는 길",
    "hours_title": "영업시간",
    "hours": {
      "weekday": "평일 10:00 - 22:00",
      "weekend": "주말 10:00 - 21:00"
    },
    "contact_title": "바로 문의하기"
  }
}
```

- [ ] **Step 4: public/locales/ko/services.json**

```json
{
  "title": "서비스",
  "subtitle": "당신의 여정에 맞는 휴식",
  "detail": "자세히 보기",
  "items": {
    "firstday": {
      "name": "첫날팩",
      "description": "도착 당일 쌓인 여행 피로를 풀어드리는 집중 케어 프로그램",
      "options": ["90분", "120분"],
      "icon": "✈️"
    },
    "pickdrop": {
      "name": "픽드롭 패키지",
      "description": "호텔 픽업부터 드롭까지, 시간에 자유로운 프리미엄 서비스",
      "options": ["60분", "90분", "120분"],
      "icon": "🚗"
    },
    "departure": {
      "name": "귀국 패키지",
      "description": "출국 전 마지막 힐링. 라운지 이용과 함께 여행의 마무리를",
      "options": ["90분", "120분"],
      "icon": "🌿"
    }
  }
}
```

- [ ] **Step 5: public/locales/ko/reservation.json**

```json
{
  "title": "온라인 예약 준비 중",
  "subtitle": "더 편리한 서비스를 준비하고 있습니다",
  "description": "현재는 아래 채널로 직접 문의해 주세요",
  "back_home": "홈으로 돌아가기"
}
```

- [ ] **Step 6: 커밋**

```bash
git add public/locales/ko/
git commit -m "feat: Korean (ko) translations"
```

---

## Task 5: 번역 파일 — 영어 (en)

**Files:**
- Create: `public/locales/en/common.json`
- Create: `public/locales/en/home.json`
- Create: `public/locales/en/services.json`
- Create: `public/locales/en/reservation.json`

- [ ] **Step 1: public/locales/en/common.json**

```json
{
  "nav": {
    "services": "Services",
    "philosophy": "Our Story",
    "gallery": "Gallery",
    "location": "Location",
    "reservation": "Book Now"
  },
  "language": {
    "ko": "KO",
    "en": "EN",
    "ja": "JP",
    "zh-CN": "简",
    "zh-TW": "繁"
  },
  "contact": {
    "title": "Contact Us",
    "kakao": "KakaoTalk",
    "whatsapp": "WhatsApp",
    "wechat": "WeChat",
    "messenger": "Messenger",
    "line": "Line"
  },
  "footer": {
    "copyright": "© 2026 KORISPA. All rights reserved.",
    "address": "Seoul, Korea (address to be updated)"
  }
}
```

- [ ] **Step 2: public/locales/en/home.json**

```json
{
  "hero": {
    "tagline": "Time For Your Mind",
    "headline1": "Where Space Itself",
    "headline2": "Becomes Your Rest",
    "cta": "Book Now"
  },
  "brand_message": {
    "line1": "The warmth of wood, the texture of paper, the flicker of candlelight",
    "line2": "Focused entirely on your condition and emotions",
    "line3": "Where space itself becomes your rest"
  },
  "philosophy": {
    "title": "Our Philosophy",
    "subtitle": "Omotenashi & Wabi-Sabi",
    "omotenashi_title": "Omotenashi",
    "omotenashi_desc": "Wholehearted hospitality with genuine care. Every service at KORISPA begins with personalized attention tailored to each individual guest.",
    "wabisabi_title": "Wabi-Sabi",
    "wabisabi_desc": "Beauty in imperfection. We create a space where you can accept yourself as you are and simply rest."
  },
  "gallery": {
    "title": "Our Space"
  },
  "location": {
    "title": "Find Us",
    "hours_title": "Opening Hours",
    "hours": {
      "weekday": "Weekdays  10:00 - 22:00",
      "weekend": "Weekends  10:00 - 21:00"
    },
    "contact_title": "Contact Us Directly"
  }
}
```

- [ ] **Step 3: public/locales/en/services.json**

```json
{
  "title": "Services",
  "subtitle": "Rest tailored to your journey",
  "detail": "Learn More",
  "items": {
    "firstday": {
      "name": "First Day Pack",
      "description": "Intensive care program to release travel fatigue on your arrival day",
      "options": ["90 min", "120 min"],
      "icon": "✈️"
    },
    "pickdrop": {
      "name": "Pick & Drop Package",
      "description": "Premium door-to-door service with hotel pickup and drop-off",
      "options": ["60 min", "90 min", "120 min"],
      "icon": "🚗"
    },
    "departure": {
      "name": "Departure Package",
      "description": "Final healing before your flight, complete your journey with lounge access",
      "options": ["90 min", "120 min"],
      "icon": "🌿"
    }
  }
}
```

- [ ] **Step 4: public/locales/en/reservation.json**

```json
{
  "title": "Online Booking Coming Soon",
  "subtitle": "We're preparing a more convenient service for you",
  "description": "Please contact us directly through the channels below",
  "back_home": "Back to Home"
}
```

- [ ] **Step 5: 커밋**

```bash
git add public/locales/en/
git commit -m "feat: English (en) translations"
```

---

## Task 6: 번역 파일 — 일본어 (ja)

**Files:**
- Create: `public/locales/ja/common.json`
- Create: `public/locales/ja/home.json`
- Create: `public/locales/ja/services.json`
- Create: `public/locales/ja/reservation.json`

- [ ] **Step 1: public/locales/ja/common.json**

```json
{
  "nav": {
    "services": "サービス",
    "philosophy": "ブランド",
    "gallery": "ギャラリー",
    "location": "アクセス",
    "reservation": "ご予約"
  },
  "language": {
    "ko": "KO",
    "en": "EN",
    "ja": "JP",
    "zh-CN": "简",
    "zh-TW": "繁"
  },
  "contact": {
    "title": "お問い合わせ",
    "kakao": "カカオトーク",
    "whatsapp": "WhatsApp",
    "wechat": "WeChat",
    "messenger": "Messenger",
    "line": "LINE"
  },
  "footer": {
    "copyright": "© 2026 KORISPA. All rights reserved.",
    "address": "ソウル特別市（住所更新予定）"
  }
}
```

- [ ] **Step 2: public/locales/ja/home.json**

```json
{
  "hero": {
    "tagline": "心のための時間",
    "headline1": "空間そのものが",
    "headline2": "安らぎとなるように",
    "cta": "ご予約はこちら"
  },
  "brand_message": {
    "line1": "木の温もり、紙の質感、ろうそくの揺らめき",
    "line2": "お一人おひとりのコンディションと感情に寄り添う",
    "line3": "空間そのものが安らぎとなるように"
  },
  "philosophy": {
    "title": "私たちの哲学",
    "subtitle": "おもてなしと侘寂",
    "omotenashi_title": "おもてなし",
    "omotenashi_desc": "心からのおもてなし。KORISPAのすべてのサービスは、お一人おひとりに寄り添ったパーソナルケアから始まります。",
    "wabisabi_title": "侘寂",
    "wabisabi_desc": "不完全さの中の美しさ。ありのままの自分を受け入れ、ただ休んでいただける空間を提供します。"
  },
  "gallery": {
    "title": "空間"
  },
  "location": {
    "title": "アクセス",
    "hours_title": "営業時間",
    "hours": {
      "weekday": "平日  10:00 - 22:00",
      "weekend": "週末  10:00 - 21:00"
    },
    "contact_title": "直接お問い合わせ"
  }
}
```

- [ ] **Step 3: public/locales/ja/services.json**

```json
{
  "title": "サービス",
  "subtitle": "あなたの旅に合わせた安らぎ",
  "detail": "詳しく見る",
  "items": {
    "firstday": {
      "name": "ファーストデイパック",
      "description": "到着当日の旅疲れを癒す集中ケアプログラム",
      "options": ["90分", "120分"],
      "icon": "✈️"
    },
    "pickdrop": {
      "name": "ピック＆ドロップパッケージ",
      "description": "ホテルへのお迎えからお送りまで、時間を自由に使えるプレミアムサービス",
      "options": ["60分", "90分", "120分"],
      "icon": "🚗"
    },
    "departure": {
      "name": "帰国パッケージ",
      "description": "フライト前の最後の癒し。ラウンジ利用とともに旅の締めくくりを",
      "options": ["90分", "120分"],
      "icon": "🌿"
    }
  }
}
```

- [ ] **Step 4: public/locales/ja/reservation.json**

```json
{
  "title": "オンライン予約準備中",
  "subtitle": "より便利なサービスを準備しています",
  "description": "現在は下記チャンネルよりお問い合わせください",
  "back_home": "ホームに戻る"
}
```

- [ ] **Step 5: 커밋**

```bash
git add public/locales/ja/
git commit -m "feat: Japanese (ja) translations"
```

---

## Task 7: 번역 파일 — 중국어 간체(zh-CN) + 번체(zh-TW)

**Files:**
- Create: `public/locales/zh-CN/common.json`
- Create: `public/locales/zh-CN/home.json`
- Create: `public/locales/zh-CN/services.json`
- Create: `public/locales/zh-CN/reservation.json`
- Create: `public/locales/zh-TW/common.json`
- Create: `public/locales/zh-TW/home.json`
- Create: `public/locales/zh-TW/services.json`
- Create: `public/locales/zh-TW/reservation.json`

- [ ] **Step 1: public/locales/zh-CN/common.json**

```json
{
  "nav": {
    "services": "服务",
    "philosophy": "品牌",
    "gallery": "空间",
    "location": "位置",
    "reservation": "预约"
  },
  "language": {
    "ko": "KO",
    "en": "EN",
    "ja": "JP",
    "zh-CN": "简",
    "zh-TW": "繁"
  },
  "contact": {
    "title": "联系我们",
    "kakao": "KakaoTalk",
    "whatsapp": "WhatsApp",
    "wechat": "微信",
    "messenger": "Messenger",
    "line": "Line"
  },
  "footer": {
    "copyright": "© 2026 KORISPA. 版权所有。",
    "address": "首尔特别市（地址待更新）"
  }
}
```

- [ ] **Step 2: public/locales/zh-CN/home.json**

```json
{
  "hero": {
    "tagline": "为心灵而留的时间",
    "headline1": "让空间本身",
    "headline2": "成为您的休憩",
    "cta": "立即预约"
  },
  "brand_message": {
    "line1": "木材的温度，纸张的质感，烛光的摇曳",
    "line2": "专注于每位客人的状态与情感",
    "line3": "让空间本身成为您的休憩"
  },
  "philosophy": {
    "title": "我们的哲学",
    "subtitle": "款待之道与侘寂",
    "omotenashi_title": "款待之道",
    "omotenashi_desc": "真诚的款待与关怀。KORISPA的每项服务都从为每位客人量身定制的专属护理开始。",
    "wabisabi_title": "侘寂",
    "wabisabi_desc": "不完美中的美。我们为您创造一个能够接受本真自我、静心休憩的空间。"
  },
  "gallery": {
    "title": "空间"
  },
  "location": {
    "title": "找到我们",
    "hours_title": "营业时间",
    "hours": {
      "weekday": "工作日  10:00 - 22:00",
      "weekend": "周末  10:00 - 21:00"
    },
    "contact_title": "直接联系我们"
  }
}
```

- [ ] **Step 3: public/locales/zh-CN/services.json**

```json
{
  "title": "服务",
  "subtitle": "为您的旅程量身定制的休憩",
  "detail": "了解更多",
  "items": {
    "firstday": {
      "name": "初日套餐",
      "description": "专为消除抵达当天旅途疲劳而设计的集中护理项目",
      "options": ["90分钟", "120分钟"],
      "icon": "✈️"
    },
    "pickdrop": {
      "name": "接送套餐",
      "description": "含酒店接送的高端服务，时间自由安排",
      "options": ["60分钟", "90分钟", "120分钟"],
      "icon": "🚗"
    },
    "departure": {
      "name": "归程套餐",
      "description": "出发前的最后放松，配合贵宾休息室，为旅程画上完美句点",
      "options": ["90分钟", "120分钟"],
      "icon": "🌿"
    }
  }
}
```

- [ ] **Step 4: public/locales/zh-CN/reservation.json**

```json
{
  "title": "在线预约即将开放",
  "subtitle": "我们正在为您准备更便捷的服务",
  "description": "目前请通过以下渠道直接与我们联系",
  "back_home": "返回首页"
}
```

- [ ] **Step 5: public/locales/zh-TW/common.json**

```json
{
  "nav": {
    "services": "服務",
    "philosophy": "品牌",
    "gallery": "空間",
    "location": "位置",
    "reservation": "預約"
  },
  "language": {
    "ko": "KO",
    "en": "EN",
    "ja": "JP",
    "zh-CN": "简",
    "zh-TW": "繁"
  },
  "contact": {
    "title": "聯絡我們",
    "kakao": "KakaoTalk",
    "whatsapp": "WhatsApp",
    "wechat": "微信",
    "messenger": "Messenger",
    "line": "Line"
  },
  "footer": {
    "copyright": "© 2026 KORISPA. 版權所有。",
    "address": "首爾特別市（地址待更新）"
  }
}
```

- [ ] **Step 6: public/locales/zh-TW/home.json**

```json
{
  "hero": {
    "tagline": "為心靈而留的時間",
    "headline1": "讓空間本身",
    "headline2": "成為您的休憩",
    "cta": "立即預約"
  },
  "brand_message": {
    "line1": "木材的溫度，紙張的質感，燭光的搖曳",
    "line2": "專注於每位賓客的狀態與情感",
    "line3": "讓空間本身成為您的休憩"
  },
  "philosophy": {
    "title": "我們的哲學",
    "subtitle": "款待之道與侘寂",
    "omotenashi_title": "款待之道",
    "omotenashi_desc": "真誠的款待與關懷。KORISPA的每項服務都從為每位賓客量身定制的專屬護理開始。",
    "wabisabi_title": "侘寂",
    "wabisabi_desc": "不完美中的美。我們為您創造一個能夠接受本真自我、靜心休憩的空間。"
  },
  "gallery": {
    "title": "空間"
  },
  "location": {
    "title": "找到我們",
    "hours_title": "營業時間",
    "hours": {
      "weekday": "平日  10:00 - 22:00",
      "weekend": "週末  10:00 - 21:00"
    },
    "contact_title": "直接聯絡我們"
  }
}
```

- [ ] **Step 7: public/locales/zh-TW/services.json**

```json
{
  "title": "服務",
  "subtitle": "為您的旅程量身定制的休憩",
  "detail": "了解更多",
  "items": {
    "firstday": {
      "name": "初日套餐",
      "description": "專為消除抵達當天旅途疲勞而設計的集中護理項目",
      "options": ["90分鐘", "120分鐘"],
      "icon": "✈️"
    },
    "pickdrop": {
      "name": "接送套餐",
      "description": "含飯店接送的高端服務，時間自由安排",
      "options": ["60分鐘", "90分鐘", "120分鐘"],
      "icon": "🚗"
    },
    "departure": {
      "name": "歸程套餐",
      "description": "出發前的最後放鬆，配合貴賓休息室，為旅程畫上完美句點",
      "options": ["90分鐘", "120分鐘"],
      "icon": "🌿"
    }
  }
}
```

- [ ] **Step 8: public/locales/zh-TW/reservation.json**

```json
{
  "title": "線上預約即將開放",
  "subtitle": "我們正在為您準備更便捷的服務",
  "description": "目前請透過以下管道直接與我們聯繫",
  "back_home": "返回首頁"
}
```

- [ ] **Step 9: 커밋**

```bash
git add public/locales/zh-CN/ public/locales/zh-TW/
git commit -m "feat: Chinese Simplified (zh-CN) and Traditional (zh-TW) translations"
```

---

## Task 8: _document.tsx + _app.tsx + globals.css

**Files:**
- Modify: `pages/_document.tsx`
- Modify: `pages/_app.tsx`

- [ ] **Step 1: pages/_document.tsx 교체**

```tsx
// pages/_document.tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx)
  }

  render() {
    const locale = this.props.__NEXT_DATA__.locale ?? 'ko'

    return (
      <Html lang={locale}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Noto+Sans+JP:wght@300;400&family=Noto+Sans+SC:wght@300;400&family=Noto+Sans+TC:wght@300;400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

- [ ] **Step 2: pages/_app.tsx 교체**

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { DefaultSeo } from 'next-seo'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingChat from '@/components/layout/FloatingChat'
import '@/styles/globals.css'
import '@fontsource/pretendard/300.css'
import '@fontsource/pretendard/400.css'
import '@fontsource/pretendard/500.css'
import '@fontsource/pretendard/700.css'

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo
        defaultTitle="KORISPA | 고급 마사지 스파"
        titleTemplate="%s | KORISPA"
      />
      <Header />
      <Component {...pageProps} />
      <Footer />
      <FloatingChat />
    </QueryClientProvider>
  )
}

export default appWithTranslation(App)
```

- [ ] **Step 3: 레이아웃 스텁 생성 (TypeScript 통과용, Task 11-12에서 실제 구현으로 교체)**

```tsx
// components/layout/Header.tsx
export default function Header() { return null }
```

```tsx
// components/layout/Footer.tsx
export default function Footer() { return null }
```

```tsx
// components/layout/FloatingChat.tsx
export default function FloatingChat() { return null }
```

- [ ] **Step 4: TypeScript 확인**

```bash
npx tsc --noEmit
```

Expected output: 에러 없음

- [ ] **Step 5: 커밋**

```bash
git add pages/_document.tsx pages/_app.tsx components/layout/
git commit -m "feat: _document (html lang), _app (i18n + QueryClient + layout), layout stubs"
```

---

## Task 9: 데이터 레이어 (config / data / hooks / lib)

**Files:**
- Create: `config/contact.ts`
- Create: `data/services.ts`
- Create: `hooks/useServices.ts`
- Create: `lib/seo.ts`

- [ ] **Step 1: config/contact.ts 생성**

```bash
mkdir -p config data hooks lib
```

```ts
// config/contact.ts
export type ChannelId = 'kakao' | 'whatsapp' | 'wechat' | 'messenger' | 'line'

export interface ContactChannel {
  id: ChannelId
  url: string
  color: string   // Tailwind text color class
  bgColor: string // Tailwind bg color class
  labelKey: string // i18n key (common namespace)
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'kakao',
    url: 'https://pf.kakao.com/_replace_with_actual',
    color: 'text-yellow-900',
    bgColor: 'bg-yellow-400',
    labelKey: 'contact.kakao',
  },
  {
    id: 'whatsapp',
    url: 'https://wa.me/821000000000',
    color: 'text-white',
    bgColor: 'bg-green-500',
    labelKey: 'contact.whatsapp',
  },
  {
    id: 'wechat',
    url: '#wechat',
    color: 'text-white',
    bgColor: 'bg-green-600',
    labelKey: 'contact.wechat',
  },
  {
    id: 'messenger',
    url: 'https://m.me/replace_with_actual',
    color: 'text-white',
    bgColor: 'bg-blue-600',
    labelKey: 'contact.messenger',
  },
  {
    id: 'line',
    url: 'https://line.me/ti/p/replace_with_actual',
    color: 'text-white',
    bgColor: 'bg-green-400',
    labelKey: 'contact.line',
  },
]
```

- [ ] **Step 2: data/services.ts 생성**

```ts
// data/services.ts
export type ServiceId = 'firstday' | 'pickdrop' | 'departure'

export interface ServiceData {
  id: ServiceId
  icon: string
}

export const servicesData: ServiceData[] = [
  { id: 'firstday', icon: '✈️' },
  { id: 'pickdrop', icon: '🚗' },
  { id: 'departure', icon: '🌿' },
]
```

- [ ] **Step 3: hooks/useServices.ts 생성**

```ts
// hooks/useServices.ts
import { useQuery } from '@tanstack/react-query'
import { servicesData, ServiceData } from '@/data/services'

export function useServices() {
  return useQuery<ServiceData[]>({
    queryKey: ['services'],
    // Future: replace with fetch('/api/services').then(r => r.json())
    queryFn: () => Promise.resolve(servicesData),
  })
}
```

- [ ] **Step 4: lib/seo.ts 생성**

```ts
// lib/seo.ts
import { NextSeoProps } from 'next-seo'

const BASE_URL = 'https://www.korispa.com'

export const LOCALES = ['ko', 'en', 'ja', 'zh-CN', 'zh-TW'] as const
export type Locale = (typeof LOCALES)[number]

const SEO_TITLES: Record<Locale, string> = {
  ko: '코리스파 | 서울 고급 마사지 스파',
  en: 'KORISPA | Luxury Massage Spa in Seoul',
  ja: 'KORISPA | ソウル高級マッサージスパ',
  'zh-CN': 'KORISPA | 首尔高端按摩水疗',
  'zh-TW': 'KORISPA | 首爾高端按摩水療',
}

const SEO_DESCRIPTIONS: Record<Locale, string> = {
  ko: '서울의 고급 마사지 스파 코리스파. 첫날팩, 픽드롭, 귀국 패키지로 여행 전후 완벽한 휴식을 경험하세요.',
  en: 'KORISPA luxury massage spa in Seoul. Experience perfect relaxation with our First Day Pack, Pick & Drop, and Departure packages.',
  ja: 'ソウルの高級マッサージスパ、KORISPA。ファーストデイパック、ピック＆ドロップ、帰国パッケージで旅の疲れを癒してください。',
  'zh-CN': '首尔高端按摩水疗KORISPA。通过初日套餐、接送套餐和归程套餐，体验旅行前后的完美休憩。',
  'zh-TW': '首爾高端按摩水療KORISPA。透過初日套餐、接送套餐和歸程套餐，體驗旅行前後的完美休憩。',
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
          alt: 'KORISPA Luxury Spa Seoul',
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
    hasMap: 'https://maps.google.com/',
    telephone: '',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '서울특별시',
      addressCountry: 'KR',
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
```

- [ ] **Step 5: TypeScript 확인**

```bash
npx tsc --noEmit
```

Expected output: 에러 없음

- [ ] **Step 6: 커밋**

```bash
git add config/ data/ hooks/ lib/
git commit -m "feat: data layer (contact config, services data, useServices hook, seo helpers)"
```

---

## Task 10: UI 프리미티브 컴포넌트

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Card.tsx`
- Create: `components/ui/SectionWrapper.tsx`
- Create: `components/ui/LanguageSwitcher.tsx`
- Create: `components/ui/ChatChannelButton.tsx`

- [ ] **Step 1: 폴더 생성**

```bash
mkdir -p components/ui components/layout components/sections
```

- [ ] **Step 2: components/ui/Button.tsx**

```tsx
// components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'outline' | 'solid'
  href?: string
  locale?: string
  className?: string
}

export default function Button({
  children,
  variant = 'outline',
  href,
  locale,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-block px-8 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 font-sans'
  const variants = {
    outline: 'border border-accent text-accent hover:bg-accent hover:text-cream',
    solid: 'bg-spa-text text-cream hover:bg-accent',
  }
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} locale={locale} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
```

- [ ] **Step 3: components/ui/Card.tsx**

```tsx
// components/ui/Card.tsx
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
}

export default function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div
      className={`bg-cream border border-border p-8 transition-all duration-300 ${
        hoverable ? 'hover:border-accent hover:-translate-y-1 hover:shadow-lg' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 4: components/ui/SectionWrapper.tsx**

```tsx
// components/ui/SectionWrapper.tsx
import { useEffect, useRef, ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-fade-up')
          el.classList.remove('opacity-0')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id={id}
      className={`opacity-0 py-24 md:py-32 ${className}`}
    >
      {children}
    </section>
  )
}
```

- [ ] **Step 5: components/ui/LanguageSwitcher.tsx**

```tsx
// components/ui/LanguageSwitcher.tsx
import { useRouter } from 'next/router'
import Link from 'next/link'

const LANGUAGES = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JP' },
  { code: 'zh-CN', label: '简' },
  { code: 'zh-TW', label: '繁' },
]

export default function LanguageSwitcher() {
  const { pathname, asPath, query, locale } = useRouter()

  return (
    <div className="flex items-center gap-3">
      {LANGUAGES.map((lang, i) => (
        <span key={lang.code} className="flex items-center gap-3">
          <Link
            href={{ pathname, query }}
            as={asPath}
            locale={lang.code}
            className={`text-xs tracking-widest transition-colors duration-200 ${
              locale === lang.code
                ? 'text-accent font-medium'
                : 'text-muted hover:text-spa-text'
            }`}
          >
            {lang.label}
          </Link>
          {i < LANGUAGES.length - 1 && (
            <span className="text-border text-xs select-none">|</span>
          )}
        </span>
      ))}
    </div>
  )
}
```

- [ ] **Step 6: components/ui/ChatChannelButton.tsx**

```tsx
// components/ui/ChatChannelButton.tsx
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
      className={`${channel.bgColor} ${channel.color} ${sizeClasses} rounded-full font-sans tracking-wide transition-opacity hover:opacity-90 inline-flex items-center gap-2`}
    >
      {label}
    </a>
  )
}
```

- [ ] **Step 7: TypeScript 확인**

```bash
npx tsc --noEmit
```

Expected output: 에러 없음

- [ ] **Step 8: 커밋**

```bash
git add components/ui/
git commit -m "feat: UI primitives (Button, Card, SectionWrapper, LanguageSwitcher, ChatChannelButton)"
```

---

## Task 11: 레이아웃 — Header + Footer

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: components/layout/Header.tsx**

```tsx
// components/layout/Header.tsx
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

const NAV_KEYS = ['services', 'philosophy', 'gallery', 'location'] as const

export default function Header() {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          locale={locale}
          className="font-serif text-sm tracking-[0.3em] uppercase text-spa-text"
        >
          KORISPA
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_KEYS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-xs tracking-widest text-muted hover:text-spa-text transition-colors"
            >
              {t(`nav.${key}`)}
            </a>
          ))}
          <Link
            href="/reservation"
            locale={locale}
            className="text-xs tracking-widest border border-accent text-accent px-4 py-2 hover:bg-accent hover:text-cream transition-all"
          >
            {t('nav.reservation')}
          </Link>
        </nav>

        {/* Language switcher — desktop */}
        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-spa-text"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-border px-6 py-6 flex flex-col gap-4">
          {NAV_KEYS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-sm tracking-widest text-muted hover:text-spa-text"
              onClick={() => setMenuOpen(false)}
            >
              {t(`nav.${key}`)}
            </a>
          ))}
          <Link
            href="/reservation"
            locale={locale}
            className="text-sm tracking-widest text-accent"
            onClick={() => setMenuOpen(false)}
          >
            {t('nav.reservation')}
          </Link>
          <div className="mt-2">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: components/layout/Footer.tsx**

```tsx
// components/layout/Footer.tsx
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

const NAV_KEYS = ['services', 'philosophy', 'gallery', 'location'] as const

export default function Footer() {
  const { t } = useTranslation('common')
  const { locale } = useRouter()

  return (
    <footer className="bg-dark text-muted py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif text-sm tracking-[0.3em] text-cream mb-4">KORISPA</p>
            <p className="text-xs leading-relaxed">{t('footer.address')}</p>
          </div>

          {/* Nav */}
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

          {/* Language + Book */}
          <div className="flex flex-col gap-6">
            <LanguageSwitcher />
            <Link
              href="/reservation"
              locale={locale}
              className="text-xs tracking-widest border border-muted text-muted px-4 py-2 w-fit hover:border-accent hover:text-accent transition-all"
            >
              {t('nav.reservation')}
            </Link>
          </div>
        </div>

        <div className="border-t border-muted/30 pt-8 text-xs text-muted/70">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: TypeScript 확인**

```bash
npx tsc --noEmit
```

Expected output: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add components/layout/Header.tsx components/layout/Footer.tsx
git commit -m "feat: Header (sticky, mobile drawer) and Footer components"
```

---

## Task 12: 레이아웃 — FloatingChat 위젯

**Files:**
- Create: `components/layout/FloatingChat.tsx`

- [ ] **Step 1: components/layout/FloatingChat.tsx**

```tsx
// components/layout/FloatingChat.tsx
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
      {/* Channel list — appears above the button */}
      {open && (
        <div className="flex flex-col gap-2 items-end animate-fade-in">
          <p className="text-xs text-muted bg-cream/95 backdrop-blur px-3 py-1 rounded-full border border-border shadow-sm">
            {t('contact.title')}
          </p>
          {CONTACT_CHANNELS.map((channel) => (
            <ChatChannelButton key={channel.id} channel={channel} size="sm" />
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-accent text-cream flex items-center justify-center shadow-lg hover:bg-spa-text transition-colors"
        aria-label={t('contact.title')}
        title={t('contact.title')}
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
```

- [ ] **Step 2: 개발 서버로 레이아웃 확인**

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 열기.
- 헤더가 상단에 고정되어 있는지 확인
- 스크롤 50px 이후 배경색 변화 확인
- 스크롤 200px 이후 플로팅 버튼 노출 확인
- 클릭 시 채널 목록 펼쳐짐 확인

- [ ] **Step 3: 커밋**

```bash
git add components/layout/FloatingChat.tsx
git commit -m "feat: FloatingChat widget (scroll-triggered, 5 channels)"
```

---

## Task 13: 섹션 — Hero (비디오 + 패럴랙스)

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: components/sections/Hero.tsx**

```tsx
// components/sections/Hero.tsx
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Button from '@/components/ui/Button'

export default function Hero() {
  const { t } = useTranslation('home')
  const { locale } = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleScroll = () => {
      // 패럴랙스: 스크롤 속도의 40%로 비디오 이동
      video.style.transform = `translateY(${window.scrollY * 0.4}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-[120%] object-cover"
        style={{ willChange: 'transform', top: '-10%' }}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Fallback image (shown if video not available) */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80"
          alt="KORISPA luxury spa"
          fill
          priority
          className="object-cover"
          style={{ zIndex: -1 }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-dark/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-6 animate-fade-in">
          {t('hero.tagline')}
        </p>
        <h1 className="font-serif text-cream text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 animate-fade-up">
          {t('hero.headline1')}
          <br />
          {t('hero.headline2')}
        </h1>
        <Button href="/reservation" locale={locale} variant="outline">
          {t('hero.cta')}
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50 z-10">
        <span className="text-xs tracking-[0.3em]">SCROLL</span>
        <div className="w-px h-8 bg-cream/30 animate-pulse" />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: Hero section (video background, parallax, fade-in copy)"
```

---

## Task 14: 섹션 — BrandMessage + Services

**Files:**
- Create: `components/sections/BrandMessage.tsx`
- Create: `components/sections/Services.tsx`

- [ ] **Step 1: components/sections/BrandMessage.tsx**

```tsx
// components/sections/BrandMessage.tsx
import { useTranslation } from 'next-i18next'
import SectionWrapper from '@/components/ui/SectionWrapper'

export default function BrandMessage() {
  const { t } = useTranslation('home')

  return (
    <SectionWrapper className="bg-cream px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-8 h-px bg-accent mx-auto mb-12" />
        <div className="flex flex-col gap-8">
          {(['line1', 'line2', 'line3'] as const).map((key) => (
            <p
              key={key}
              className="font-serif text-spa-text text-xl md:text-2xl font-light leading-relaxed"
            >
              {t(`brand_message.${key}`)}
            </p>
          ))}
        </div>
        <div className="w-8 h-px bg-accent mx-auto mt-12" />
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: components/sections/Services.tsx**

```tsx
// components/sections/Services.tsx
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useServices } from '@/hooks/useServices'

export default function Services() {
  const { t } = useTranslation(['services'])
  const { locale } = useRouter()
  const { data: services = [] } = useServices()

  return (
    <SectionWrapper id="services" className="bg-sand px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-muted text-xs tracking-[0.3em] uppercase mb-3">
            {t('services:title')}
          </p>
          <h2 className="font-serif text-spa-text text-3xl md:text-4xl font-light">
            {t('services:subtitle')}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => {
            const options = t(`services:items.${service.id}.options`, {
              returnObjects: true,
            }) as string[]

            return (
              <Card key={service.id} hoverable>
                <div className="text-3xl mb-6">{service.icon}</div>
                <p className="text-muted text-xs tracking-[0.2em] uppercase mb-2">
                  {t(`services:items.${service.id}.name`)}
                </p>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {t(`services:items.${service.id}.description`)}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {options.map((opt) => (
                    <span
                      key={opt}
                      className="text-xs border border-border text-muted px-3 py-1"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
                <Button href="/reservation" locale={locale} variant="outline" className="w-full text-center">
                  {t('services:detail')}
                </Button>
              </Card>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: 커밋**

```bash
git add components/sections/BrandMessage.tsx components/sections/Services.tsx
git commit -m "feat: BrandMessage and Services sections"
```

---

## Task 15: 섹션 — Philosophy + Gallery

**Files:**
- Create: `components/sections/Philosophy.tsx`
- Create: `components/sections/Gallery.tsx`

- [ ] **Step 1: components/sections/Philosophy.tsx**

```tsx
// components/sections/Philosophy.tsx
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import SectionWrapper from '@/components/ui/SectionWrapper'

export default function Philosophy() {
  const { t } = useTranslation('home')

  return (
    <SectionWrapper id="philosophy" className="bg-cream px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-muted text-xs tracking-[0.3em] uppercase mb-3">
            {t('philosophy.title')}
          </p>
          <h2 className="font-serif text-spa-text text-3xl md:text-4xl font-light">
            {t('philosophy.subtitle')}
          </h2>
        </div>

        {/* Grid: text + image, image + text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Omotenashi text */}
          <div>
            <p className="font-serif text-accent text-4xl mb-6">
              {t('philosophy.omotenashi_title')}
            </p>
            <p className="text-muted text-sm leading-loose">
              {t('philosophy.omotenashi_desc')}
            </p>
          </div>

          {/* Image 1 */}
          <div className="relative h-72 md:h-96">
            <Image
              src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80"
              alt="KORISPA spa room"
              fill
              className="object-cover"
            />
          </div>

          {/* Image 2 — swapped order on mobile */}
          <div className="relative h-72 md:h-96 order-last md:order-none">
            <Image
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80"
              alt="KORISPA massage therapy"
              fill
              className="object-cover"
            />
          </div>

          {/* Wabi-Sabi text */}
          <div>
            <p className="font-serif text-accent text-4xl mb-6">
              {t('philosophy.wabisabi_title')}
            </p>
            <p className="text-muted text-sm leading-loose">
              {t('philosophy.wabisabi_desc')}
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: components/sections/Gallery.tsx**

```tsx
// components/sections/Gallery.tsx
import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import SectionWrapper from '@/components/ui/SectionWrapper'

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', alt: 'Spa entrance' },
  { src: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?w=800&q=80', alt: 'Treatment room' },
  { src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80', alt: 'Relaxation area' },
  { src: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80', alt: 'Massage room' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', alt: 'Wellness space' },
  { src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80', alt: 'Spa atmosphere' },
]

export default function Gallery() {
  const { t } = useTranslation('home')
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  return (
    <SectionWrapper id="gallery" className="bg-dark px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-cream text-3xl md:text-4xl font-light">
            {t('gallery.title')}
          </h2>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={i}
              className="relative aspect-square overflow-hidden group"
              onClick={() => setLightboxIdx(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-dark/95 flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream/70 hover:text-cream transition-colors"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close lightbox"
          >
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" d="M6 6l20 20M6 26L26 6" />
            </svg>
          </button>
          <div
            className="relative max-w-4xl w-full aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[lightboxIdx].src}
              alt={GALLERY_IMAGES[lightboxIdx].alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: 커밋**

```bash
git add components/sections/Philosophy.tsx components/sections/Gallery.tsx
git commit -m "feat: Philosophy and Gallery (with lightbox) sections"
```

---

## Task 16: 섹션 — LocationContact

**Files:**
- Create: `components/sections/LocationContact.tsx`

- [ ] **Step 1: components/sections/LocationContact.tsx**

```tsx
// components/sections/LocationContact.tsx
import { useTranslation } from 'next-i18next'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { CONTACT_CHANNELS } from '@/config/contact'
import ChatChannelButton from '@/components/ui/ChatChannelButton'

export default function LocationContact() {
  const { t } = useTranslation('home')

  return (
    <SectionWrapper id="location" className="bg-sand px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-muted text-xs tracking-[0.3em] uppercase mb-3">
            {t('location.title')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Google Maps embed */}
          <div className="h-64 md:h-96 overflow-hidden rounded bg-border/20">
            <iframe
              src="https://maps.google.com/maps?q=Seoul,Korea&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KORISPA Location"
            />
          </div>

          {/* Hours + Channels */}
          <div className="flex flex-col gap-10">
            {/* Hours */}
            <div>
              <h3 className="font-serif text-spa-text text-xl mb-4">
                {t('location.hours_title')}
              </h3>
              <div className="flex flex-col gap-2 text-sm text-muted">
                <p>{t('location.hours.weekday')}</p>
                <p>{t('location.hours.weekend')}</p>
              </div>
            </div>

            {/* Contact channels */}
            <div>
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
```

- [ ] **Step 2: 커밋**

```bash
git add components/sections/LocationContact.tsx
git commit -m "feat: LocationContact section (map, hours, channel buttons)"
```

---

## Task 17: 페이지 조립 — pages/index.tsx

**Files:**
- Modify: `pages/index.tsx`

- [ ] **Step 1: pages/index.tsx 교체**

```tsx
// pages/index.tsx
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import Hero from '@/components/sections/Hero'
import BrandMessage from '@/components/sections/BrandMessage'
import Services from '@/components/sections/Services'
import Philosophy from '@/components/sections/Philosophy'
import Gallery from '@/components/sections/Gallery'
import LocationContact from '@/components/sections/LocationContact'
import { getHomePageSeo, getLocalBusinessLdJson, type Locale } from '@/lib/seo'

const HomePage: NextPage = () => {
  const { locale } = useRouter()
  const seoProps = getHomePageSeo((locale ?? 'ko') as Locale)

  return (
    <>
      <NextSeo {...seoProps} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessLdJson()),
          }}
        />
      </Head>
      <main>
        <Hero />
        <BrandMessage />
        <Services />
        <Philosophy />
        <Gallery />
        <LocationContact />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ko', ['common', 'home', 'services'])),
  },
})

export default HomePage
```

- [ ] **Step 2: 개발 서버로 메인 페이지 확인**

```bash
npm run dev
```

`http://localhost:3000` 에서:
- 히어로 풀스크린 + 패럴랙스 동작 확인
- 6개 섹션 순서대로 노출 확인
- 스크롤 시 섹션별 fade-up 애니메이션 확인
- 언어 전환 (`/en`, `/ja`, `/zh-CN`, `/zh-TW`) 텍스트 변경 확인

- [ ] **Step 3: 커밋**

```bash
git add pages/index.tsx
git commit -m "feat: main page assembled (Hero + BrandMessage + Services + Philosophy + Gallery + LocationContact)"
```

---

## Task 18: 예약 임시 페이지 — pages/reservation.tsx

**Files:**
- Create: `pages/reservation.tsx`

- [ ] **Step 1: pages/reservation.tsx 생성**

```tsx
// pages/reservation.tsx
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
          {/* Icon */}
          <div className="text-6xl mb-8">🗓️</div>

          {/* Title */}
          <h1 className="font-serif text-spa-text text-3xl md:text-4xl font-light mb-4">
            {t('reservation:title')}
          </h1>
          <p className="text-muted text-sm mb-2">{t('reservation:subtitle')}</p>
          <p className="text-muted text-sm mb-12">{t('reservation:description')}</p>

          {/* Channels */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CONTACT_CHANNELS.map((channel) => (
              <ChatChannelButton key={channel.id} channel={channel} />
            ))}
          </div>

          {/* Back home */}
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
```

- [ ] **Step 2: 예약 페이지 확인**

`http://localhost:3000/reservation` 에서:
- "온라인 예약 준비 중" 메시지 확인
- 채널 버튼 5개 노출 확인
- `http://localhost:3000/en/reservation` 에서 영문 텍스트 확인
- "홈으로 돌아가기" 링크 동작 확인

- [ ] **Step 3: 커밋**

```bash
git add pages/reservation.tsx
git commit -m "feat: reservation placeholder page (coming soon + channel buttons)"
```

---

## Task 19: next-sitemap + robots.txt

**Files:**
- Modify: `next-sitemap.config.js` (완성)

- [ ] **Step 1: 빌드 및 sitemap 생성 확인**

```bash
npm run build
```

Expected output:
```
Route (pages)                              Size     First Load JS
┌ ○ /                                      ...
├ ○ /reservation                           ...
...
✓ Generating static pages
✓ Generating sitemap
```

`public/sitemap.xml` 과 `public/robots.txt` 파일이 생성되었는지 확인:

```bash
ls public/sitemap*.xml public/robots.txt
```

Expected output:
```
public/robots.txt
public/sitemap.xml
public/sitemap-0.xml
```

- [ ] **Step 2: sitemap 내용 확인**

```bash
head -30 public/sitemap.xml
```

Expected output: 5개 언어별 URL (`/`, `/en`, `/ja`, `/zh-CN`, `/zh-TW`) 포함 확인

- [ ] **Step 3: 커밋**

```bash
git add public/sitemap*.xml public/robots.txt
git commit -m "feat: sitemap.xml and robots.txt generated (5 locales)"
```

---

## Task 20: TypeScript 전체 검사 + 최종 빌드 검증

**Files:**
- 수정 없음 (검증 단계)

- [ ] **Step 1: TypeScript 전체 타입 검사**

```bash
npx tsc --noEmit
```

Expected output: 에러 0개. 에러가 있으면 해당 파일/라인을 수정한 후 재실행.

- [ ] **Step 2: ESLint 검사**

```bash
npm run lint
```

Expected output: 경고/에러 없음 (또는 무시 가능한 경고만)

- [ ] **Step 3: 프로덕션 빌드 최종 확인**

```bash
npm run build && npm run start
```

`http://localhost:3000` 에서 다음 항목 최종 확인:

1. 브라우저 소스 보기(`Ctrl+U`)에서 `<html lang="ko">` 확인
2. `<script type="application/ld+json">` 에 LocalBusiness 데이터 확인
3. 언어 전환 5개 모두 동작 (`/`, `/en`, `/ja`, `/zh-CN`, `/zh-TW`)
4. `http://localhost:3000/reservation` Coming Soon 페이지 확인
5. 플로팅 위젯 스크롤 200px 이후 노출 확인
6. 모바일 뷰 (DevTools > 320px) 레이아웃 깨짐 없음 확인
7. `http://localhost:3000/sitemap.xml` 접근 가능 확인

- [ ] **Step 4: .gitignore에 빌드 아웃풋 확인 후 최종 커밋**

```bash
git add -A
git commit -m "chore: final build verification — all 20 tasks complete

- Next.js Page Router + next-i18next (ko/en/ja/zh-CN/zh-TW)
- Tailwind custom theme (cream/sand/accent/dark)
- Pretendard + Noto Sans JP/SC/TC fonts
- Hero video parallax, 6 sections, floating chat widget
- next-seo + LD+JSON (LocalBusiness) + next-sitemap

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## 미결 사항 (실제 배포 전 교체 필요)

다음 항목들은 실제 정보가 확정되면 `config/contact.ts`와 `lib/seo.ts`에서 교체:

| 항목 | 파일 | 현재 값 |
|------|------|---------|
| 카카오 채널 URL | `config/contact.ts` | `https://pf.kakao.com/_replace_with_actual` |
| WhatsApp 번호 | `config/contact.ts` | `https://wa.me/821000000000` |
| WeChat ID | `config/contact.ts` | `#wechat` |
| Messenger ID | `config/contact.ts` | `https://m.me/replace_with_actual` |
| Line ID | `config/contact.ts` | `https://line.me/ti/p/replace_with_actual` |
| 스파 주소 | `lib/seo.ts` + 번역 파일 | `서울특별시 (주소 업데이트 예정)` |
| Google Maps URL | `components/sections/LocationContact.tsx` | `Seoul,Korea` 검색 |
| 히어로 비디오 | `public/video/hero.mp4` | 파일 없음 (이미지 폴백 사용 중) |
| OG 이미지 | `public/og-image.jpg` | 파일 없음 |
