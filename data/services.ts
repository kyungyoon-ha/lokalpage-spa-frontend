export type ServiceId = 'firstday' | 'pickdrop' | 'departure'

export interface ServiceData {
  id: ServiceId
  icon: string
  enName: string
  images: string[]
}

export const servicesData: ServiceData[] = [
  {
    id: 'firstday',
    icon: '✈️',
    enName: 'ARRIVAL SPA - PACKAGE',
    images: [
      'https://cdn.imweb.me/thumbnail/20251208/07a64fe7e99af.jpg',
      'https://cdn.imweb.me/thumbnail/20251208/af7deeaba4066.jpg',
      'https://cdn.imweb.me/thumbnail/20251229/820e5c31b0bc3.jpg',
      'https://cdn.imweb.me/thumbnail/20251208/2d1a74131702c.jpg',
      'https://cdn.imweb.me/thumbnail/20251208/1b9ba0ab96adf.jpg',
      'https://cdn.imweb.me/thumbnail/20251208/d1f0a003d1923.jpg',
      'https://cdn.imweb.me/thumbnail/20251208/dce734c20014f.jpg',
      'https://cdn.imweb.me/thumbnail/20260207/c7585e33265df.jpg',
      'https://cdn.imweb.me/thumbnail/20251208/1fa7849fd1ab1.jpg',
      'https://cdn.imweb.me/thumbnail/20251208/6b024eaa0ca34.jpg',
      'https://cdn.imweb.me/thumbnail/20251208/2c61611ea8777.jpg',
      'https://cdn.imweb.me/thumbnail/20251208/26af33e2e5573.jpg',
      'https://cdn.imweb.me/thumbnail/20251208/9004206fd5db4.gif',
      'https://cdn.imweb.me/thumbnail/20251208/a1ad54750a77d.jpg',
      'https://cdn.imweb.me/thumbnail/20251208/8ba7c87b23d1d.jpg',
      'https://cdn.imweb.me/thumbnail/20251208/a3db0cd212b07.jpg',
      'https://cdn.imweb.me/thumbnail/20251208/092b8558b67c6.jpg',
    ],
  },
  {
    id: 'pickdrop',
    icon: '🚗',
    enName: 'PICK & DROP - PACKAGE',
    images: [
      'https://cdn.imweb.me/thumbnail/20251121/b89b42b75532c.jpeg',
    ],
  },
  {
    id: 'departure',
    icon: '🌿',
    enName: 'DEPARTURE SPA - PACKAGE',
    images: [
      'https://cdn.imweb.me/thumbnail/20251121/6bae1fa5b6af4.jpeg',
    ],
  },
]
