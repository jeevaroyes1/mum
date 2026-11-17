import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [wordIndex, setWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState('in');
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);

  const rotatingWords = t.hero.rotatingWords;

  // 1. Text Ticker Animation matching MUM.lu Script 2 (800ms anim + 1600ms pause)
  // Reset wordIndex when the language changes (rotatingWords reference updates).
  // useLayoutEffect is used intentionally here: it resets the index synchronously
  // before the browser paints, preventing a flash of the wrong word on language toggle.
  useLayoutEffect(() => {
    setWordIndex(0); // eslint-disable-line react-hooks/set-state-in-effect
  }, [rotatingWords]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setFadeState('in');
      }, 350);
    }, 2200);

    return () => clearInterval(interval);
  }, [rotatingWords]);

  // 2. Video Reel Zoom & Parallax on Scroll (matching mum.lu Bigger Video on Scroll)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxDistance = 750;
          const progress = Math.min(scrollY / maxDistance, 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Progressive image expansion & coordinated text fade
  const videoScale = 1 + scrollProgress * 0.18;
  const textOpacity = Math.max(0, 1 - scrollProgress * 1.5);
  const textParallax = scrollProgress * 55;

  return (
    <section ref={heroRef} className="hero-section heroreel">
      <div className="container hero-container">
        <div className="hero-layout">
          {/* Left Text Block */}
          <div
            className="hero-left"
            style={{
              transform: `translateY(-${textParallax}px)`,
              opacity: textOpacity,
              transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease-out',
            }}
          >
            <div className="hero-badge">
              <Sparkles size={14} className="badge-icon" />
              <span>{t.hero.badge}</span>
            </div>

            <div className="hero-main-title">
              <span className="title-prefix">{t.hero.titlePrefix}</span>
              <h1 className="title-main">{t.hero.titleMain}</h1>
            </div>

            <div className="hero-sub-text textreveal">
              <span className="fixed-text">{t.hero.subFixed1}</span>
              <span className="fixed-text">{t.hero.subFixed2}</span>
              <div className="ticker-wrapper">
                <span className={`keyword-highlight fade-${fadeState}`}>
                  {rotatingWords[wordIndex] || rotatingWords[0]}
                </span>
              </div>
            </div>

            <div className="hero-cta-group">
              <a href="#projects" className="btn btn-outline-cyan">
                <span>{t.hero.discoverProjects}</span>
                <ArrowUpRight size={16} />
              </a>
              <a href="#contact" className="btn btn-filled-white">
                <span>{t.hero.yourProject}</span>
              </a>
            </div>
          </div>

          {/* Right Visual Block - Zoom on Scroll */}
          <div className="hero-right">
            <a href="#why-mum" className="discover-tag" aria-label="Discover sections below">
              <span>{t.hero.discoverTag}</span>
            </a>

            <div
              className="hero-media-card reel-media"
              style={{
                transform: `scale(${videoScale})`,
                borderRadius: `${Math.max(1.25, 2 - scrollProgress * 0.75)}rem`,
                transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.2s ease',
                boxShadow: `0 ${30 + scrollProgress * 35}px ${60 + scrollProgress * 45}px rgba(0, 0, 0, ${0.5 + scrollProgress * 0.35})`,
              }}
            >
              <video
                poster="https://www.mum.lu/videos/mum-intro-25.jpg"
                autoPlay
                muted
                loop
                playsInline
                className="hero-video"
              >
                <source src="https://www.mum.lu/videos/mum-intro-25.mp4" type="video/mp4" />
                <source src="https://www.mum.lu/videos/mum-intro-25.webm" type="video/webm" />
              </video>
              <div className="media-overlay">
                <span className="overlay-tag">{t.hero.experienceBadge}</span>
                <h3>{t.hero.overlayTitle}</h3>
                <p>{t.hero.overlayDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
