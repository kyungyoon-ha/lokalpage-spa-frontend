export type ServiceId = "firstday" | "pickdrop" | "departure";

export interface ServiceData {
  id: ServiceId;
  icon: string;
  enName: string;
  images: string[];
}

export const servicesData: ServiceData[] = [
  {
    id: "firstday",
    icon: "✈️",
    enName: "ARRIVAL SPA - PACKAGE",
    images: [
      "https://cdn.imweb.me/thumbnail/20251208/07a64fe7e99af.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/af7deeaba4066.jpg",
      "https://cdn.imweb.me/thumbnail/20251229/820e5c31b0bc3.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/2d1a74131702c.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/1b9ba0ab96adf.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/d1f0a003d1923.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/dce734c20014f.jpg",
      "https://cdn.imweb.me/thumbnail/20260207/c7585e33265df.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/1fa7849fd1ab1.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/6b024eaa0ca34.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/2c61611ea8777.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/26af33e2e5573.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/9004206fd5db4.gif",
      "https://cdn.imweb.me/thumbnail/20251208/a1ad54750a77d.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/8ba7c87b23d1d.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/a3db0cd212b07.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/092b8558b67c6.jpg",
    ],
  },
  {
    id: "pickdrop",
    icon: "🚗",
    enName: "PICK & DROP - PACKAGE",
    images: [
      "https://cdn.imweb.me/thumbnail/20251208/9e5273e2aa55f.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/9aba213130175.gif",
      "https://cdn.imweb.me/thumbnail/20251208/6431ef71aa303.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/0fc6e8c168b5b.jpg",
      "https://cdn.imweb.me/thumbnail/20251229/fcb3c6852daf5.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/4821e3f31fcd1.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/78ea642887cc1.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/cd21dedf72374.jpg",
      "https://cdn.imweb.me/thumbnail/20260207/dff9b6c37e2a0.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/43e49067a881b.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/84594ebc52d91.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/625127bf5472d.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/6dba7557aeb8a.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/dc0aefffd2110.gif",
      "https://cdn.imweb.me/thumbnail/20251208/c466f9cf555b0.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/837039cdda6df.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/b73255a9dc659.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/525c58d5044ac.jpg",
    ],
  },
  {
    id: "departure",
    icon: "🌿",
    enName: "DEPARTURE SPA - PACKAGE",
    images: [
      "https://cdn.imweb.me/thumbnail/20251208/4c5ffc83aa43f.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/73341b1056529.jpg",
      "https://cdn.imweb.me/thumbnail/20251229/1ca0872521f3c.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/c19884ee24be6.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/35bbe9833e810.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/084b8327afb67.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/351df67e1a8ad.jpg",
      "https://cdn.imweb.me/thumbnail/20260207/5ae3f1f2f35ee.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/12e40bfc635c7.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/66bf9f1fa0210.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/de19e4d60f1d1.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/c4c5e381f0313.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/188e2d04af479.gif",
      "https://cdn.imweb.me/thumbnail/20251208/697c3c26dbe2b.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/8cfd28ef05653.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/6dfdc7ce27fc1.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/022068b4fc717.jpg",
      "https://cdn.imweb.me/thumbnail/20251208/d9e98eec515a2.jpg",
    ],
  },
];
