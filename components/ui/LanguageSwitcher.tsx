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
