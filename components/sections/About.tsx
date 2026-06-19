import { useEffect, useRef } from 'react'

// about-1.html 그대로 구현
// .on: filter:blur(0)+opacity:1+marginTop:0  (blur+fade+slide-up)

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const targets = section.querySelectorAll<HTMLElement>('.about-area, .title-box, .sub-text, .img-area')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          targets.forEach((el) => el.classList.add('on'))
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="sc-about">
      {/* 90° rotated ABOUT label */}
      <div className="about-area">
        <span>ABOUT</span>
      </div>

      <div className="wrapper">
        {/* Large image — 70% width */}
        <div className="img-area">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://cdn.imweb.me/thumbnail/20251121/57455cab81194.png" alt="KORISPA space" />
        </div>

        {/* Right content: vertical title + sub text */}
        <div className="cont-area">
          <div className="title-box">
            <div className="line" />
            <h3 className="main-text">
              조용히 스며드는 <span>치유</span>
            </h3>
            <div className="line" />
            <h3 className="main-text">
              마음을 위한 <span>시간</span>
            </h3>
            <div className="line" />
          </div>
          <p className="sub-text">
            코리 스파는 몸을 위한 공간이 아닌,<br />
            마음을 위한 시간이 되기를 바랍니다.
          </p>
        </div>
      </div>
    </div>
  )
}
