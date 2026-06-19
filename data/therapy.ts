export type Locale = 'ko' | 'en' | 'ja' | 'zh-CN' | 'zh-TW'

const LOCALES: readonly Locale[] = ['ko', 'en', 'ja', 'zh-CN', 'zh-TW']

export const toLocale = (value: string): Locale =>
  LOCALES.includes(value as Locale) ? (value as Locale) : 'en'

export type LocaleMap = Record<Locale, string>

type TherapyItem = Record<Locale, { name: string; description: string }> & {
  duration: number
  price: number
}

export const mapTherapy: Record<string, TherapyItem> = {
  '1': {
    ko: { name: '건식 60분', description: '오일 없이 깊은 근육과 관절을 섬세하게 풀어주는 정통 테라피' },
    en: { name: 'Dry 60M', description: 'A deep, therapeutic massage that relaxes muscles and joints.' },
    ja: { name: 'ドライ 60分', description: 'オイルなしで深部の筋肉と関節をほぐす正統派テラピー' },
    'zh-CN': { name: '干式 60分钟', description: '无精油深度按摩肌肉和关节的正统疗法' },
    'zh-TW': { name: '乾式 60分鐘', description: '無精油深度按摩肌肉和關節的正統療法' },
    duration: 60, price: 1200,
  },
  '2': {
    ko: { name: '건식 90분', description: '오일 없이 깊은 근육과 관절을 섬세하게 풀어주는 정통 테라피' },
    en: { name: 'Dry 90M', description: 'A deep, therapeutic massage that relaxes muscles and joints.' },
    ja: { name: 'ドライ 90分', description: 'オイルなしで深部の筋肉と関節をほぐす正統派テラピー' },
    'zh-CN': { name: '干式 90分钟', description: '无精油深度按摩肌肉和关节的正统疗法' },
    'zh-TW': { name: '乾式 90分鐘', description: '無精油深度按摩肌肉和關節的正統療法' },
    duration: 90, price: 1800,
  },
  '3': {
    ko: { name: '건식 120분', description: '오일 없이 깊은 근육과 관절을 섬세하게 풀어주는 정통 테라피' },
    en: { name: 'Dry 120M', description: 'A deep, therapeutic massage that relaxes muscles and joints.' },
    ja: { name: 'ドライ 120分', description: 'オイルなしで深部の筋肉と関節をほぐす正統派テラピー' },
    'zh-CN': { name: '干式 120分钟', description: '无精油深度按摩肌肉和关节的正统疗法' },
    'zh-TW': { name: '乾式 120分鐘', description: '無精油深度按摩肌肉和關節的正統療法' },
    duration: 120, price: 2200,
  },
  '4': {
    ko: { name: '오일 60분', description: '엄선된 아로마 오일로 몸의 긴장을 부드럽게 해소하는 힐링 테라피' },
    en: { name: 'Oil 60M', description: 'A therapeutic massage that relaxes muscles and joints with selected essential oils.' },
    ja: { name: 'オイル 60分', description: '厳選されたアロマオイルで体の緊張をやわらかくほぐすヒーリングテラピー' },
    'zh-CN': { name: '精油 60分钟', description: '使用精选芳香精油轻柔舒缓身体紧张的疗愈疗法' },
    'zh-TW': { name: '精油 60分鐘', description: '使用精選芳香精油輕柔舒緩身體緊張的療癒療法' },
    duration: 60, price: 1400,
  },
  '5': {
    ko: { name: '오일 90분', description: '엄선된 아로마 오일로 몸의 긴장을 부드럽게 해소하는 힐링 테라피' },
    en: { name: 'Oil 90M', description: 'A therapeutic massage that relaxes muscles and joints with selected essential oils.' },
    ja: { name: 'オイル 90分', description: '厳選されたアロマオイルで体の緊張をやわらかくほぐすヒーリングテラピー' },
    'zh-CN': { name: '精油 90分钟', description: '使用精选芳香精油轻柔舒缓身体紧张的疗愈疗法' },
    'zh-TW': { name: '精油 90分鐘', description: '使用精選芳香精油輕柔舒緩身體緊張的療癒療法' },
    duration: 90, price: 1800,
  },
  '6': {
    ko: { name: '오일 120분', description: '엄선된 아로마 오일로 몸의 긴장을 부드럽게 해소하는 힐링 테라피' },
    en: { name: 'Oil 120M', description: 'A therapeutic massage that relaxes muscles and joints with selected essential oils.' },
    ja: { name: 'オイル 120分', description: '厳選されたアロマオイルで体の緊張をやわらかくほぐすヒーリングテラピー' },
    'zh-CN': { name: '精油 120分钟', description: '使用精选芳香精油轻柔舒缓身体紧张的疗愈疗法' },
    'zh-TW': { name: '精油 120分鐘', description: '使用精選芳香精油輕柔舒緩身體緊張的療癒療法' },
    duration: 120, price: 2200,
  },
  '7': {
    ko: { name: '라바스톤 90분', description: '따뜻한 라바스톤으로 깊은 이완과 혈액순환을 돕는 프리미엄 케어' },
    en: { name: 'Lava Stone 90M', description: 'A premium care that promotes deep relaxation and blood circulation with warm lava stones.' },
    ja: { name: 'ラバストーン 90分', description: '温かいラバストーンで深いリラクゼーションと血行促進を助けるプレミアムケア' },
    'zh-CN': { name: '熔岩石 90分钟', description: '用温热熔岩石促进深度放松和血液循环的高级护理' },
    'zh-TW': { name: '熔岩石 90分鐘', description: '用溫熱熔岩石促進深度放鬆和血液循環的高級護理' },
    duration: 90, price: 2000,
  },
  '8': {
    ko: { name: '라바스톤 120분', description: '따뜻한 라바스톤으로 깊은 이완과 혈액순환을 돕는 프리미엄 케어' },
    en: { name: 'Lava Stone 120M', description: 'A premium care that promotes deep relaxation and blood circulation with warm lava stones.' },
    ja: { name: 'ラバストーン 120分', description: '温かいラバストーンで深いリラクゼーションと血行促進を助けるプレミアムケア' },
    'zh-CN': { name: '熔岩石 120分钟', description: '用温热熔岩石促进深度放松和血液循环的高级护理' },
    'zh-TW': { name: '熔岩石 120分鐘', description: '用溫熱熔岩石促進深度放鬆和血液循環的高級護理' },
    duration: 120, price: 2400,
  },
  '9': {
    ko: { name: '썬번 트리트먼트 90분', description: '강한 햇빛에 노출된 피부를 진정시키는 회복 중심의 스페셜 케어' },
    en: { name: 'SunBurn Treatment 90M', description: 'A therapeutic treatment that calms and restores skin exposed to strong sunlight.' },
    ja: { name: 'サンバーントリートメント 90分', description: '強い日差しにさらされた肌を鎮静させる回復重視のスペシャルケア' },
    'zh-CN': { name: '晒伤护理 90分钟', description: '镇静受强烈阳光照射皮肤的修复型特别护理' },
    'zh-TW': { name: '曬傷護理 90分鐘', description: '鎮靜受強烈陽光照射皮膚的修復型特別護理' },
    duration: 90, price: 2000,
  },
  '10': {
    ko: { name: '썬번 트리트먼트 120분', description: '강한 햇빛에 노출된 피부를 진정시키는 회복 중심의 스페셜 케어' },
    en: { name: 'SunBurn Treatment 120M', description: 'A therapeutic treatment that calms and restores skin exposed to strong sunlight.' },
    ja: { name: 'サンバーントリートメント 120分', description: '強い日差しにさらされた肌を鎮静させる回復重視のスペシャルケア' },
    'zh-CN': { name: '晒伤护理 120分钟', description: '镇静受强烈阳光照射皮肤的修复型特别护理' },
    'zh-TW': { name: '曬傷護理 120分鐘', description: '鎮靜受強烈陽光照射皮膚的修復型特別護理' },
    duration: 120, price: 2400,
  },
  '11': {
    ko: { name: '핫 오일 90분', description: '따뜻한 오일로 깊은 이완과 혈액순환을 돕는 프리미엄 케어' },
    en: { name: 'Hot Oil 90M', description: 'A premium care that promotes deep relaxation and blood circulation with hot oil.' },
    ja: { name: 'ホットオイル 90分', description: '温かいオイルで深いリラクゼーションと血行促進を助けるプレミアムケア' },
    'zh-CN': { name: '热油 90分钟', description: '用温热精油促进深度放松和血液循环的高级护理' },
    'zh-TW': { name: '熱油 90分鐘', description: '用溫熱精油促進深度放鬆和血液循環的高級護理' },
    duration: 90, price: 2000,
  },
  '12': {
    ko: { name: '핫 오일 120분', description: '따뜻한 오일로 깊은 이완과 혈액순환을 돕는 프리미엄 케어' },
    en: { name: 'Hot Oil 120M', description: 'A premium care that promotes deep relaxation and blood circulation with hot oil.' },
    ja: { name: 'ホットオイル 120分', description: '温かいオイルで深いリラクゼーションと血行促進を助けるプレミアムケア' },
    'zh-CN': { name: '热油 120分钟', description: '用温热精油促进深度放松和血液循环的高级护理' },
    'zh-TW': { name: '熱油 120分鐘', description: '用溫熱精油促進深度放鬆和血液循環的高級護理' },
    duration: 120, price: 2400,
  },
  '13': {
    ko: { name: '오일 + 드라이 90분', description: '건식과 오일을 조화롭게 결합한 균형 잡힌 시그니처 마사지' },
    en: { name: 'Oil + Dry 90M', description: 'A balanced signature massage that harmoniously combines dry and oil techniques.' },
    ja: { name: 'オイル + ドライ 90分', description: 'ドライとオイルを調和よく組み合わせたバランスのとれたシグニチャーマッサージ' },
    'zh-CN': { name: '精油+干式 90分钟', description: '将干式与精油和谐结合的均衡招牌按摩' },
    'zh-TW': { name: '精油+乾式 90分鐘', description: '將乾式與精油和諧結合的均衡招牌按摩' },
    duration: 90, price: 2200,
  },
  '14': {
    ko: { name: '오일 + 드라이 120분', description: '건식과 오일을 조화롭게 결합한 균형 잡힌 시그니처 마사지' },
    en: { name: 'Oil + Dry 120M', description: 'A balanced signature massage that harmoniously combines dry and oil techniques.' },
    ja: { name: 'オイル + ドライ 120分', description: 'ドライとオイルを調和よく組み合わせたバランスのとれたシグニチャーマッサージ' },
    'zh-CN': { name: '精油+干式 120分钟', description: '将干式与精油和谐结合的均衡招牌按摩' },
    'zh-TW': { name: '精油+乾式 120分鐘', description: '將乾式與精油和諧結合的均衡招牌按摩' },
    duration: 120, price: 2600,
  },
  '15': {
    ko: { name: '발 마사지 60분', description: '발의 반사구를 자극해 전신의 피로를 정교하게 완화합니다' },
    en: { name: 'Foot Massage 60M', description: 'Stimulates the pressure points on the feet to gently relieve fatigue throughout the body.' },
    ja: { name: 'フットマッサージ 60分', description: '足の反射区を刺激し、全身の疲れを精密に緩和します' },
    'zh-CN': { name: '足部按摩 60分钟', description: '刺激足部反射区，精准缓解全身疲劳' },
    'zh-TW': { name: '足部按摩 60分鐘', description: '刺激足部反射區，精準緩解全身疲勞' },
    duration: 60, price: 1000,
  },
  '16': {
    ko: { name: '발 마사지 90분', description: '발의 반사구를 자극해 전신의 피로를 정교하게 완화합니다' },
    en: { name: 'Foot Massage 90M', description: 'Stimulates the pressure points on the feet to gently relieve fatigue throughout the body.' },
    ja: { name: 'フットマッサージ 90分', description: '足の反射区を刺激し、全身の疲れを精密に緩和します' },
    'zh-CN': { name: '足部按摩 90分钟', description: '刺激足部反射区，精准缓解全身疲劳' },
    'zh-TW': { name: '足部按摩 90分鐘', description: '刺激足部反射區，精準緩解全身疲勞' },
    duration: 90, price: 1200,
  },
  '17': {
    ko: { name: '발 마사지 120분', description: '발의 반사구를 자극해 전신의 피로를 정교하게 완화합니다' },
    en: { name: 'Foot Massage 120M', description: 'Stimulates the pressure points on the feet to gently relieve fatigue throughout the body.' },
    ja: { name: 'フットマッサージ 120分', description: '足の反射区を刺激し、全身の疲れを精密に緩和します' },
    'zh-CN': { name: '足部按摩 120分钟', description: '刺激足部反射区，精准缓解全身疲劳' },
    'zh-TW': { name: '足部按摩 120分鐘', description: '刺激足部反射區，精準緩解全身疲勞' },
    duration: 120, price: 1600,
  },
  '18': {
    ko: { name: '성장 마사지 60분', description: '아이의 균형과 성장을 고려해 부드럽고 안전하게 진행되는 케어' },
    en: { name: 'Growth Massage 60M', description: 'A therapeutic massage that considers the balance and growth of children in a gentle and safe manner.' },
    ja: { name: 'グロースマッサージ 60分', description: 'お子様のバランスと成長を考慮した、やさしく安全なケア' },
    'zh-CN': { name: '儿童成长按摩 60分钟', description: '兼顾儿童平衡和成长，温和安全地进行的护理' },
    'zh-TW': { name: '兒童成長按摩 60分鐘', description: '兼顧兒童平衡和成長，溫和安全地進行的護理' },
    duration: 60, price: 1000,
  },
  '19': {
    ko: { name: '성장 마사지 90분', description: '아이의 균형과 성장을 고려해 부드럽고 안전하게 진행되는 케어' },
    en: { name: 'Growth Massage 90M', description: 'A therapeutic massage that considers the balance and growth of children in a gentle and safe manner.' },
    ja: { name: 'グロースマッサージ 90分', description: 'お子様のバランスと成長を考慮した、やさしく安全なケア' },
    'zh-CN': { name: '儿童成长按摩 90分钟', description: '兼顾儿童平衡和成长，温和安全地进行的护理' },
    'zh-TW': { name: '兒童成長按摩 90分鐘', description: '兼顧兒童平衡和成長，溫和安全地進行的護理' },
    duration: 90, price: 1400,
  },
}

export const SPA_CATEGORIES: { label: LocaleMap; ids: string[] }[] = [
  { label: { ko: '건식', en: 'Dry', ja: 'ドライ', 'zh-CN': '干式', 'zh-TW': '乾式' }, ids: ['1', '2', '3'] },
  { label: { ko: '오일', en: 'Oil', ja: 'オイル', 'zh-CN': '精油', 'zh-TW': '精油' }, ids: ['4', '5', '6'] },
  { label: { ko: '라바스톤', en: 'Lava Stone', ja: 'ラバストーン', 'zh-CN': '熔岩石', 'zh-TW': '熔岩石' }, ids: ['7', '8'] },
  { label: { ko: '썬번 트리트먼트', en: 'SunBurn', ja: 'サンバーン', 'zh-CN': '晒伤护理', 'zh-TW': '曬傷護理' }, ids: ['9', '10'] },
  { label: { ko: '핫 오일', en: 'Hot Oil', ja: 'ホットオイル', 'zh-CN': '热油', 'zh-TW': '熱油' }, ids: ['11', '12'] },
  { label: { ko: '오일 + 드라이', en: 'Oil + Dry', ja: 'オイル + ドライ', 'zh-CN': '精油+干式', 'zh-TW': '精油+乾式' }, ids: ['13', '14'] },
  { label: { ko: '발 마사지', en: 'Foot Massage', ja: 'フットマッサージ', 'zh-CN': '足部按摩', 'zh-TW': '足部按摩' }, ids: ['15', '16', '17'] },
  { label: { ko: '성장 마사지', en: 'Growth Massage', ja: 'グロースマッサージ', 'zh-CN': '成长按摩', 'zh-TW': '成長按摩' }, ids: ['18', '19'] },
]

export const getTherapyName = (therapyId: string, locale: string): string => {
  try { return mapTherapy[therapyId][toLocale(locale)].name } catch { return '' }
}

export const getTherapyDescription = (therapyId: string, locale: string): string => {
  try { return mapTherapy[therapyId][toLocale(locale)].description } catch { return '' }
}
