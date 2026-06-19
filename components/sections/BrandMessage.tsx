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
