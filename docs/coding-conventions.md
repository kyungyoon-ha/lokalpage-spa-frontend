# 코드 컨벤션

## 목차

1. [파일 & 컴포넌트 구조](#1-파일--컴포넌트-구조)
2. [컴포넌트 명명 규칙](#2-컴포넌트-명명-규칙)
3. [임포트 규칙](#3-임포트-규칙)
4. [도메인 구조](#4-도메인-구조)
5. [공통 컴포넌트 (src/components, src/hooks)](#5-공통-컴포넌트-srccomponents-srchooks)
6. [서비스 & API](#6-서비스--api)
7. [Values & Maps](#7-values--maps)
8. [Hooks](#8-hooks)
9. [React Query (queryKey 컨벤션)](#9-react-query-querykey-컨벤션)
10. [스타일링](#10-스타일링)
11. [커밋 메시지](#11-커밋-메시지)

---

## 1. 파일 & 컴포넌트 구조

### 한 파일에는 하나의 컴포넌트만 정의한다

```tsx
// ❌ 잘못된 예 - 한 파일에 여러 컴포넌트
// ReservationTop.tsx
const ReservationTopTitle = () => <h1>...</h1>
const ReservationTopDescription = () => <p>...</p>

export const ReservationTop = () => (
  <>
    <ReservationTopTitle />
    <ReservationTopDescription />
  </>
)

// ✅ 올바른 예 - 파일을 분리
// ReservationTop/index.tsx
// ReservationTop/ReservationTopTitle.tsx
// ReservationTop/ReservationTopDescription.tsx
// ReservationTop/ReservationTopDescriptionItem.tsx
```

### 코드가 길어지면 분리한다

한 컴포넌트에 너무 많은 책임이 집중되거나 코드가 길어지면 즉시 하위 컴포넌트로 분리한다. 기준은 가독성과 단일 책임 원칙이다.

```
도메인/
└── components/
    └── ReservationTop/
        ├── index.tsx                      # ReservationTop (조합만 담당)
        ├── ReservationTopTitle.tsx
        ├── ReservationTopDescription.tsx
        └── ReservationTopDescriptionItem.tsx
```

---

## 2. 컴포넌트 명명 규칙

컴포넌트 이름은 계층 구조를 그대로 나타낸다. 이름만 봐도 어느 계층에 속하는지 직관적으로 알 수 있어야 한다.

```
<도메인><기능><하위기능><세부항목>
```

```tsx
// 예시: 예약 도메인 상단 영역
ReservationTop
ReservationTopTitle
ReservationTopDescription
ReservationTopDescriptionItem

// 예시: 상품 상세 컨텐츠 리뷰
ProductDetailContent // 컨테이너
ProductDetailContentReviews // 리뷰 목록
ProductDetailContentReviewCard // 리뷰 카드 단일 항목
ProductDetailContentReviewCardComment // 리뷰 카드 내 댓글
```

### 폴더 구조 기준

- 하위 컴포넌트가 2개 이상이면 폴더로 묶고 `index.tsx`를 둔다
- 단독으로 쓰이는 단순 컴포넌트는 `.tsx` 파일 하나로 유지한다

```
components/
├── ReservationTop/               # 폴더 구조 (하위 컴포넌트 多)
│   ├── index.tsx
│   ├── ReservationTopTitle.tsx
│   └── ReservationTopDescription.tsx
├── ReservationBottom.tsx         # 단일 파일 (하위 컴포넌트 無)
```

---

## 3. 임포트 규칙

### 같은 도메인 내부: 상대 경로 (`./`)

도메인 내부에서만 사용하는 컴포넌트는 반드시 상대 경로로 임포트한다.

```tsx
// domains/reservation/index.tsx
import ReservationTop from './components/ReservationTop'
import ReservationBottom from './components/ReservationBottom'
```

### 도메인 간 교차 참조: 절대 경로 (`@`)

다른 도메인, 공통 컴포넌트, 유틸리티 등은 절대 경로를 사용한다.

```tsx
import { PageLayout } from '@components/common'
import { Flex } from '@components/ui'
import useGetProduct from '@hooks/useGetProduct'
import { fetchGetProduct } from '@services'
import { colors } from '@styles/colorPalette'
import { SCREENS } from '@utils/config'
import cartProductValues from '@utils/values/cartProductValues'
import { getProductClassMap } from '@utils/maps/productClassMap'
```

### 경로 별칭 (Path Aliases)

| 별칭            | 실제 경로               |
| --------------- | ----------------------- |
| `@components/*` | `src/components/*`      |
| `@domains/*`    | `src/domains/*`         |
| `@hooks/*`      | `src/hooks/*`           |
| `@services/*`   | `src/services/index.ts` |
| `@utils/*`      | `src/utils/*`           |
| `@styles/*`     | `src/styles/*`          |
| `@assets/*`     | `src/assets/*`          |
| `@protocol/*`   | proto-generated types   |

---

## 4. 도메인 구조

도메인과 연관된 모든 파일(컴포넌트, 훅, 유틸)은 해당 도메인 폴더 안에 정의한다. 도메인 외부에서 참조하지 않는 파일은 절대 `src/hooks`, `src/components` 등 공통 폴더에 두지 않는다.

```
src/domains/<domain-name>/
├── index.tsx                # 도메인 루트 컴포넌트 (페이지에서 import)
├── components/
│   ├── DomainFeature/       # 주요 섹션 (폴더 구조)
│   │   ├── index.tsx
│   │   ├── DomainFeatureTitle.tsx
│   │   └── DomainFeatureItem.tsx
│   └── DomainSimple.tsx     # 단순 컴포넌트 (단일 파일)
├── hooks/
│   └── useDomainFeature.ts  # 도메인 전용 훅
└── utils/
    └── getDomainHelper.ts   # 도메인 전용 유틸
```

---

## 5. 공통 컴포넌트 (src/components, src/hooks)

`src/components`와 `src/hooks`는 **2개 이상의 도메인**에서 사용하는 경우에만 위치시킨다.

### 규칙

- 처음 작성 시에는 도메인 내부에 둔다
- 다른 도메인에서도 필요해진 순간 공통 폴더로 이동한다
- 공통 컴포넌트/훅을 수정할 때는 **다른 도메인에 미치는 영향을 반드시 확인**한다

```tsx
// src/hooks/useGetProduct.ts - 여러 도메인에서 사용하므로 공통 훅
// src/components/common/PageLayout.tsx - 여러 페이지에서 사용하므로 공통 컴포넌트

// ❌ 하나의 도메인에서만 사용하는데 공통 폴더에 있는 경우
// src/hooks/useProductDetailScrollSync.ts (product-detail 전용이면 도메인 안으로)
```

---

## 6. 서비스 & API

모든 API 호출 함수는 `src/services/` 안에 도메인별 파일로 정리하고 `index.ts`에서 barrel export한다.

```
src/services/
├── index.ts           # export * from './product'; export * from './cart'; ...
├── product.ts
├── cart.ts
├── reservation.ts
└── purchase.ts
```

### 함수 네이밍

```ts
// 단건 조회
export const fetchGetProduct = async (payload: GetProduct_GetProductRequest) => { ... }

// 목록 조회
export const fetchListProducts = async (payload: ListProducts_ListProductsRequest) => { ... }

// 생성/수정/삭제
export const fetchCreateReservation = async (...) => { ... }
export const fetchUpdateReservation = async (...) => { ... }
export const fetchDeleteReservation = async (...) => { ... }
```

### 사용

```tsx
import { fetchGetProduct } from '@services'
```

---

## 7. Values & Maps

### Values (`src/utils/values/`)

복잡한 proto 객체를 컴포넌트에서 사용하기 좋은 형태로 변환할 때 사용한다.

**우선순위:**

1. `src/utils/values/`에 이미 있는 values 함수가 있으면 그것을 사용한다
2. 없고 한 컴포넌트에서만 쓰인다면 컴포넌트 내부에서 직접 정의한다
3. 여러 컴포넌트에서 반복 사용된다면 `src/utils/values/`에 함수를 만든다

```tsx
// ✅ 올바른 예
import requiredInformationValues from '@utils/values/requiredInformationValues'
import cartProductValues from '@utils/values/cartProductValues'

const { pickupInfo, dropoffInfo, boardingPassInfo } =
  requiredInformationValues(requiredInformation)
const { startDate, optionString } = cartProductValues(cartProduct)
```

### Maps (`src/utils/maps/`)

열거형(enum), 코드 값을 사람이 읽을 수 있는 문자열로 변환할 때 사용한다.

**우선순위:**

1. `src/utils/maps/`에 이미 있는 map 함수가 있으면 그것을 사용한다
2. 없고 한 곳에서만 쓰인다면 컴포넌트 내부에 정의한다
3. 여러 곳에서 같은 매핑이 필요하다면 `src/utils/maps/`에 추가한다

```tsx
import { getProductClassMap } from '@utils/maps/productClassMap'
import { getGenderTypeMap } from '@utils/maps/genderTypeMap'
import { getPaymentTypeMap } from '@utils/maps/paymentTypeMap'

const classLabel = getProductClassMap(product.classId)
const genderLabel = getGenderTypeMap(member.gender)
```

---

## 8. Hooks

### Contexts 대신 Hooks를 사용한다

Context는 사용하지 않는다. 상태 관리와 비즈니스 로직은 `useXxx` 커스텀 훅으로 캡슐화한다.

```tsx
// ❌ Context 사용
const { cartToken } = useContext(StoreContext)

// ✅ Hook 사용
const { cartToken } = useStoreContext() // 기존 레거시 hook
// 신규 작성 시에는 react-query 기반 커스텀 훅으로 만든다
```

### 데이터 페칭: react-query 기반 훅

```ts
// src/hooks/useGetProduct.ts
import { useQuery } from '@tanstack/react-query'
import { fetchGetProduct } from '@services'

const useGetProduct = ({ productCode }: { productCode: string }) => {
  return useQuery({
    queryKey: ['product', productCode],
    queryFn: () => fetchGetProduct({ productCode }),
    enabled: !!productCode,
  })
}

export default useGetProduct
```

### 훅 배치 기준

| 위치                      | 기준                       |
| ------------------------- | -------------------------- |
| `domains/<domain>/hooks/` | 해당 도메인 내에서만 사용  |
| `src/hooks/`              | 2개 이상의 도메인에서 사용 |

---

## 9. React Query (queryKey 컨벤션)

### queryKey는 fetch 함수명과 1:1로 대응한다

`queryKey`의 첫 번째 요소는 fetch 함수명에서 `fetch` 접두사를 제거하고 camelCase → kebab-case로 변환한 값과 동일해야 한다.

```ts
// fetch 함수명              →  queryKey 첫 번째 요소
fetchGetPurchase             →  'get-purchase'
fetchListReservationContexts →  'list-reservation-contexts'
fetchGetPurchaseMember       →  'get-purchase-member'
fetchListPurchaseMemos       →  'list-purchase-memos'
fetchListPurchaseMemberMemos →  'list-purchase-member-memos'
fetchListPurchaseNotificationLogs → 'list-purchase-notification-logs'
```

```ts
// ❌ fetch 함수명과 맞지 않는 임의 키
useQuery({
  queryKey: ['reservation-detail', reservationId],
  queryFn: () => fetchListReservationContexts({ reservationIds: [reservationId] }),
})

// ✅ fetch 함수명에서 파생된 키
useQuery({
  queryKey: ['list-reservation-contexts', reservationId],
  queryFn: () => fetchListReservationContexts({ reservationIds: [reservationId] }),
})
```

### invalidateQueries도 동일한 키를 사용한다

mutation 성공 후 캐시를 무효화할 때도 같은 키를 사용한다. 부분 키로 invalidate하면 해당 prefix로 시작하는 모든 쿼리가 무효화된다.

```ts
// ✅ 특정 ID의 쿼리만 무효화
queryClient.invalidateQueries({ queryKey: ['list-reservation-contexts', reservationId] })

// ✅ 해당 fetch 함수를 사용하는 모든 쿼리 무효화 (광범위 - 의도한 경우에만)
queryClient.invalidateQueries({ queryKey: ['list-reservation-contexts'] })
```

### 두 번째 요소는 식별자(ID, params)를 넣는다

```ts
// 단건 조회 - 해당 리소스의 ID
queryKey: ['get-purchase', purchaseId]

// 목록 조회 - 필터 파라미터 전체 또는 그룹 식별자
queryKey: ['list-reservation-contexts', purchaseId]
queryKey: ['list-purchase-notification-logs', purchaseId]
```

---

## 10. 스타일링

Emotion CSS-in-JS를 사용한다.

```tsx
import { css } from '@emotion/react'
import { colors } from '@styles/colorPalette'
import { SCREENS } from '@utils/config'

const containerStyles = css`
  padding: 24px;
  background: ${colors.white};

  @media (max-width: ${SCREENS.sm}) {
    padding: 16px;
  }
`

const Component = () => <Flex css={containerStyles}>...</Flex>
```

### 컬러

`@styles/colorPalette`에서 가져온다. 하드코딩 금지.

```tsx
import { colors } from '@styles/colorPalette'

// ❌
color: '#ffffff'

// ✅
color: colors.white
```

### 반응형 브레이크포인트

`@utils/config`의 `SCREENS`를 사용한다.

```ts
export const SCREENS = {
  xs: '655px',
  sm: '775px',
  md: '968px',
  lg: '1280px',
  xl: '1400px',
}
```

---

## 11. 커밋 메시지

```
feat:     새로운 기능 추가
fix:      버그 수정
refactor: 기능 변경 없는 코드 개선
style:    포맷팅, 세미콜론 등 코드 로직 무관 변경
chore:    빌드, 패키지 등 설정 변경
docs:     문서 수정
perf:     성능 개선
test:     테스트 추가/수정
```

---

## 요약 체크리스트

새 코드를 작성하기 전에 확인한다.

- [ ] 하나의 파일에는 하나의 컴포넌트만 정의한다
- [ ] 컴포넌트명이 계층 구조를 직관적으로 나타내는가
- [ ] 도메인 전용 파일은 도메인 폴더 안에 있는가
- [ ] 도메인 내부 컴포넌트는 상대 경로(`./`)로 임포트하는가
- [ ] 공통 컴포넌트/훅(`src/components`, `src/hooks`)은 이미 있는 것을 먼저 쓰는가
- [ ] 공통 컴포넌트를 수정하기 전에 다른 도메인 영향 범위를 확인했는가
- [ ] API 함수는 `src/services/`에 있는가
- [ ] 복잡한 객체 변환은 `utils/values/`를 먼저 확인했는가
- [ ] 코드→텍스트 매핑은 `utils/maps/`를 먼저 확인했는가
- [ ] Context 대신 Hook을 사용하는가
- [ ] 여러 도메인에서 같은 훅/컴포넌트가 필요하다면 공통 폴더로 이동했는가
- [ ] `queryKey` 첫 번째 요소가 fetch 함수명(kebab-case)과 일치하는가
- [ ] `invalidateQueries`에서 사용하는 키가 `queryKey`와 동일한가
