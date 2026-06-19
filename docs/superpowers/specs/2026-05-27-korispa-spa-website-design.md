# 코리스파 (KORISPA) 홈페이지 디자인 스펙

**날짜:** 2026-05-27  
**프로젝트:** korispa-frontend  
**사이트:** https://www.korispa.com  
**목적:** 다국어 고급 마사지 스파 홈페이지 — 한국인 + 외국인 친화적

---

## 1. 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js (Page Router) |
| 국제화 | next-i18next |
| 데이터 패칭 | TanStack Query (useQuery) |
| 스타일링 | Tailwind CSS |
| SEO | next-seo + LD+JSON |
| 사이트맵 | next-sitemap |
| 폰트 | Pretendard (@fontsource/pretendard) + Noto Sans JP/SC/TC (Google Fonts CDN 폴백) |
| 이미지 | next/image + Unsplash 스톡 (추후 실사진으로 교체) |

---

## 2. 프로젝트 구조

```
korispa-frontend/
├── pages/
│   ├── _app.tsx                # i18n Provider, QueryClient, Global Layout
│   ├── _document.tsx           # <html lang={locale}>, 폰트 프리로드
│   ├── index.tsx               # 메인 원페이지 (모든 섹션 조합)
│   └── reservation.tsx         # 예약 Coming Soon 임시 페이지
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # 로고 + 네비 + 언어 스위처
│   │   ├── Footer.tsx          # 주소, SNS, 언어 스위처, 저작권
│   │   └── FloatingChat.tsx    # 멀티채널 플로팅 위젯
│   ├── sections/
│   │   ├── Hero.tsx            # 풀스크린 비디오 + 패럴랙스
│   │   ├── BrandMessage.tsx    # 핵심 카피 3줄
│   │   ├── Services.tsx        # 서비스 카드 3개
│   │   ├── Philosophy.tsx      # 브랜드 철학 (오모테나시/와비사비)
│   │   ├── Gallery.tsx         # 공간 이미지 그리드
│   │   └── LocationContact.tsx # 지도 + 영업시간 + 채널 버튼
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── LanguageSwitcher.tsx
│       ├── ChatChannelButton.tsx
│       └── SectionWrapper.tsx  # fade-up 애니메이션 공통 래퍼
├── config/
│   └── contact.ts              # 채널별 링크 중앙 관리 (위젯 + Contact 섹션 공유)
├── data/
│   └── services.ts             # 서비스 정보 로컬 데이터 (추후 API 전환)
├── hooks/
│   └── useServices.ts          # TanStack Query 훅 (로컬 데이터 → API 전환 대비)
├── lib/
│   └── seo.ts                  # 언어별 메타/LD+JSON 생성 헬퍼
├── public/
│   ├── locales/
│   │   ├── ko/
│   │   │   ├── common.json     # 헤더, 푸터, 공통 UI
│   │   │   ├── home.json       # 메인 페이지 텍스트
│   │   │   └── services.json   # 서비스명, 설명
│   │   ├── en/
│   │   ├── ja/
│   │   ├── zh-CN/
│   │   └── zh-TW/
│   └── video/
│       └── hero.mp4            # 히어로 영상 (추후 교체)
├── styles/
│   └── globals.css
├── next.config.js              # i18n locales 설정
├── next-sitemap.config.js      # 사이트맵 자동 생성
└── tailwind.config.ts          # 커스텀 테마
```

---

## 3. 다국어 (i18n) 설정

### 지원 언어
| 코드 | 언어 | URL |
|------|------|-----|
| `ko` | 한국어 (기본) | `/` |
| `en` | 영어 | `/en` |
| `ja` | 일본어 | `/ja` |
| `zh-CN` | 중국어 간체 | `/zh-CN` |
| `zh-TW` | 중국어 번체 | `/zh-TW` |

### next.config.js i18n 설정
```js
i18n: {
  locales: ['ko', 'en', 'ja', 'zh-CN', 'zh-TW'],
  defaultLocale: 'ko',
}
```

### 번역 네임스페이스
- `common` — 헤더, 푸터, 버튼, 공통 UI 문구
- `home` — 메인 페이지 섹션별 텍스트 (히어로 카피, 브랜드 메시지, 철학 등)
- `services` — 서비스명, 설명, 시간 옵션
- `reservation` — 예약 임시 페이지 문구

---

## 4. 비주얼 디자인 시스템

### 컬러 팔레트
```
cream:   #f8f5f0   메인 배경
sand:    #ede8e0   섹션 대비 배경
border:  #d4b896   구분선, 테두리
accent:  #b89060   골드 포인트 (버튼, 강조)
text:    #2c1f14   메인 텍스트 (다크 브라운)
muted:   #9a8070   서브 텍스트, 레이블
dark:    #1a1714   히어로 오버레이, 푸터
```

### 타이포그래피
| 용도 | 폰트 |
|------|------|
| 주요 폰트 | Pretendard (한국어 + 영문) |
| 일본어 폴백 | Noto Sans JP |
| 간체 폴백 | Noto Sans SC |
| 번체 폴백 | Noto Sans TC |
| 영문 헤딩 포인트 | Cormorant Garamond |

```ts
// tailwind.config.ts
fontFamily: {
  sans: ['Pretendard', 'Noto Sans JP', 'Noto Sans SC', 'Noto Sans TC', 'sans-serif'],
  serif: ['Cormorant Garamond', 'serif'],
}
```

### 공통 UI 패턴
- **버튼**: 아웃라인 스타일, 호버시 accent 색상 채움, `letter-spacing: 0.15em`
- **섹션 진입 애니메이션**: `fade-up` (Intersection Observer, 0.8s ease)
- **섹션 패딩**: `py-24 md:py-32` 일관 적용
- **언어 스위처**: `KO / EN / JP / 简 / 繁` 텍스트 버튼, 현재 언어 골드 강조

---

## 5. 페이지 & 섹션 상세

### 5-1. 메인 페이지 (`/`)

#### Hero
- 풀스크린 비디오 배경 (`object-fit: cover`)
- 다크 오버레이 (`bg-dark/60`)
- 스크롤 시 `translateY` 패럴랙스 (requestAnimationFrame)
- 비디오 미지원 환경: 고해상도 이미지 폴백 (`<picture>`)
- 중앙 정렬 카피 + "예약하기" CTA 버튼

#### Brand Message
- 핵심 카피 3줄 페이드인 (순차 딜레이)
- "공간 그 자체가 휴식이 되도록" 등 코리스파 시그니처 문구
- 배경: `cream`, 최소한의 장식

#### Services
- 카드 3개 가로 배열 (모바일: 세로 스택)
- 각 카드: 아이콘 + 서비스명 + 설명 + 시간 옵션 + "자세히 보기" 링크
- 서비스: 첫날팩 (90/120분) / 픽드롭 (60/90/120분) / 귀국 패키지 (90/120분)
- 호버: 골드 테두리 + 미세 상승 효과
- 배경: `sand`

#### Brand Philosophy
- 좌우 2단 분할: 텍스트(오모테나시/와비사비) + 이미지
- 모바일: 이미지 상단, 텍스트 하단
- 배경: `cream`

#### Gallery
- 3열 그리드 (모바일: 2열 → 1열)
- Unsplash 고급 스파 이미지 6~9장
- 클릭 시 라이트박스 확대
- 배경: `dark` (이미지가 돋보이도록)

#### Location & Contact
- Google Maps 또는 Kakao Maps 임베드
- 영업시간 테이블 (다국어)
- 멀티채널 버튼: 카카오톡 / WhatsApp / WeChat / Messenger / Line
- 배경: `sand`

#### Footer
- 로고, 사업자 정보, 주소
- SNS 링크 아이콘
- 언어 스위처 재노출
- 저작권 (`© 2026 KORISPA`)
- 배경: `dark`

---

### 5-2. 예약 임시 페이지 (`/reservation`)

- "온라인 예약 준비 중 / Coming Soon" 메시지 (5개 언어)
- 멀티채널 문의 버튼 (카카오톡/WhatsApp/WeChat/Messenger/Line)
- "홈으로 돌아가기" 링크
- 추후 예약 API 연동 시 이 페이지를 달력/폼으로 교체
- 채널 링크는 `config/contact.ts`에서 공유

---

## 6. 플로팅 멀티채널 위젯 (`FloatingChat.tsx`)

### 동작
- 화면 우측 하단 고정 (`fixed bottom-6 right-6`)
- 스크롤 200px 이전: 숨김 (히어로 구간 방해 방지)
- 스크롤 200px 이후: 페이드인 노출
- 닫힌 상태: 골드 원형 💬 버튼, 호버시 "상담하기" 툴팁
- 열린 상태: 위로 펼쳐지는 채널 목록 (애니메이션)

### 채널 목록
| 채널 | 연결 방식 |
|------|----------|
| 카카오톡 | `https://pf.kakao.com/...` 딥링크 |
| WhatsApp | `https://wa.me/{번호}` |
| WeChat | QR 팝업 또는 ID 복사 |
| Messenger | `https://m.me/{페이지ID}` |
| Line | `https://line.me/ti/p/...` |

### 설정 중앙 관리
```ts
// config/contact.ts
export const CONTACT_CHANNELS = {
  kakao: { url: '...', label: { ko: '카카오톡', en: 'KakaoTalk', ... } },
  whatsapp: { url: '...', label: { ... } },
  wechat: { url: '...', label: { ... } },
  messenger: { url: '...', label: { ... } },
  line: { url: '...', label: { ... } },
}
```

---

## 7. SEO 전략

### next-seo 설정
- 모든 페이지: 언어별 `title`, `description` 동적 생성
- OG 이미지: 언어별 히어로 이미지
- `hreflang` alternate 링크 5개 언어 전체 명시
- `_document.tsx`: `<html lang={locale}>` 동적 설정

### LD+JSON 구조화 데이터
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
  "name": "코리스파 KORISPA",
  "url": "https://www.korispa.com",
  "priceRange": "₩₩₩",
  "availableLanguage": ["Korean", "English", "Japanese", "Chinese"],
  "hasMap": "https://maps.google.com/...",
  "openingHoursSpecification": [...],
  "makesOffer": [
    { "@type": "Offer", "name": "첫날팩", "description": "..." },
    { "@type": "Offer", "name": "픽드롭 패키지", "description": "..." },
    { "@type": "Offer", "name": "귀국 패키지", "description": "..." }
  ]
}
```

### 추가 SEO
- `next-sitemap`으로 5개 언어 × 전체 페이지 `sitemap.xml` 자동 생성
- `robots.txt` 설정
- 모든 `<img>` alt 텍스트 다국어 처리
- `next/image` WebP 자동 변환
- 히어로 비디오 lazy load (뷰포트 진입 후 재생)
- Core Web Vitals 대응: LCP 이미지 `priority` 속성, CLS 방지 레이아웃

---

## 8. 데이터 패턴 (TanStack Query)

현재는 로컬 JSON 데이터, 추후 API 전환 시 `queryFn`만 교체:

```ts
// hooks/useServices.ts
export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => import('../data/services').then(m => m.services),
    // 추후: queryFn: () => fetch('/api/services').then(r => r.json())
  })
}
```

---

## 9. 미결 사항 (추후 확인 필요)

- [ ] 히어로 비디오 파일 (mp4) 준비
- [ ] 채널별 실제 링크/ID (카카오 채널, WhatsApp 번호, WeChat ID, Messenger ID, Line ID)
- [ ] 실제 스파 주소 및 Google Maps URL
- [ ] 실제 영업시간
- [ ] 도메인 www.korispa.com 배포 환경 (Vercel / 자체 서버)
- [ ] 예약 API 오픈 시점 및 스펙

---

## 10. 구현 범위 요약

| 범위 | 포함 |
|------|------|
| 메인 원페이지 | ✅ (섹션 7개) |
| 예약 임시 페이지 | ✅ |
| 다국어 5개 언어 | ✅ |
| 플로팅 채팅 위젯 | ✅ |
| SEO + LD+JSON | ✅ |
| 예약 시스템 | ❌ (임시 페이지만, 추후 별도 작업) |
| 실제 영상/사진 | ❌ (스톡 이미지/비디오로 대체, 추후 교체) |
| 백엔드/API | ❌ (정적 데이터만, 추후 연동) |
