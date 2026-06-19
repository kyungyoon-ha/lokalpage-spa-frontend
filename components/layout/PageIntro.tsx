import { useEffect, useState } from 'react'

export default function PageIntro() {
  const [phase, setPhase] = useState<'visible' | 'opening' | 'done'>('visible')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 1000)
    const t2 = setTimeout(() => setPhase('done'), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'done') return null

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden" style={{ pointerEvents: 'none' }}>
      {/* Left panel */}
      <div
        className="intro-panel absolute top-0 left-0 w-1/2 h-full"
        style={{
          backgroundImage: 'url(https://cdn.imweb.me/thumbnail/20251015/c7b583948eac3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          transform: phase === 'opening' ? 'translateX(-100%)' : 'translateX(0)',
        }}
      />
      {/* Right panel */}
      <div
        className="intro-panel absolute top-0 right-0 w-1/2 h-full"
        style={{
          backgroundImage: 'url(https://cdn.imweb.me/thumbnail/20251015/c7b583948eac3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center left',
          transform: phase === 'opening' ? 'translateX(100%)' : 'translateX(0)',
        }}
      />
      {/* Logo */}
      <div
        className="intro-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          opacity: phase === 'opening' ? 0 : 1,
          filter: phase === 'opening' ? 'blur(40px)' : 'blur(0px)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://cdn.imweb.me/thumbnail/20251015/79a3a8752db1a.png"
          alt="KORISPA"
          style={{ width: '274px', maxWidth: '40vw' }}
        />
      </div>
    </div>
  )
}
