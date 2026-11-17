import { useRef, useState, useEffect } from 'react';
import { 
  Eye, 
  TrendingUp, 
  UserCheck, 
  Cpu, 
  Compass, 
  PenTool, 
  Globe, 
  Megaphone, 
  Layers, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const pillarIcons = {
  Visibility: <Eye size={22} />,
  Growth: <TrendingUp size={22} />,
  Recruiting: <UserCheck size={22} />,
  Efficiency: <Cpu size={22} />,
};

const serviceIcons = [
  <Compass size={24} key="01" />,
  <PenTool size={24} key="02" />,
  <Globe size={24} key="03" />,
  <Megaphone size={24} key="04" />,
  <Layers size={24} key="05" />,
];

export default function Services() {
  const { t } = useLanguage();
  const pillarsTrackRef = useRef(null);
  const pillarsRailRef = useRef(null);
  const [pillarsProgress, setPillarsProgress] = useState(0);
  const [pillarsTranslateX, setPillarsTranslateX] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Responsive check for desktop pinned horizontal scroll
  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth > 820);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Vertical-to-Horizontal scroll interpolation
  useEffect(() => {
    if (!isDesktop) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!pillarsTrackRef.current || !pillarsRailRef.current) {
            ticking = false;
            return;
          }

          const trackRect = pillarsTrackRef.current.getBoundingClientRect();
          const trackHeight = pillarsTrackRef.current.offsetHeight;
          const windowHeight = window.innerHeight;
          const scrollDistance = trackHeight - windowHeight;

          if (scrollDistance <= 0) {
            ticking = false;
            return;
          }

          const currentScroll = -trackRect.top;
          const progress = Math.max(0, Math.min(1, currentScroll / scrollDistance));
          setPillarsProgress(progress);

          const railWidth = pillarsRailRef.current.scrollWidth;
          const windowWidth = window.innerWidth;
          const maxTravel = Math.max(0, railWidth - windowWidth + 140);
          setPillarsTranslateX(progress * maxTravel);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  return (
    <>
      {/* 1. WHY MUM - 4 PILLARS SECTION (PINNED HORIZONTAL SCROLL) */}
      <section id="why-mum" ref={pillarsTrackRef} className="pillars-track-section">
        <div className="pillars-pinned-stage">
          <div
            className="container text-center pillars-header-wrap"
            style={{
              transform: isDesktop
                ? `translateY(${Math.max(-20, (0.45 - pillarsProgress) * 35)}px)`
                : 'none',
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="pillars-badge-pill scroll-reveal">
              <Sparkles size={14} className="badge-sparkle-icon" />
              <span>{t.pillars.tag}</span>
            </div>
            <h2 className="pillars-main-title scroll-reveal">
              {t.pillars.title}
            </h2>
            <p className="pillars-lead-subtitle scroll-reveal">
              {t.pillars.subtitle}
            </p>
          </div>

          {/* Cards Horizontal Rail */}
          <div className="pillars-rail-viewport">
            <div
              ref={pillarsRailRef}
              className="pillars-cards-rail"
              style={
                isDesktop
                  ? {
                      transform: `translate3d(-${pillarsTranslateX}px, 0, 0)`,
                      transition: 'transform 0.08s cubic-bezier(0.16, 1, 0.3, 1)',
                    }
                  : {}
              }
            >
              {t.pillars.items.map((pillar) => (
                <div
                  key={pillar.tag}
                  className="pillar-card pillar-card-horizontal"
                >
                  <div className="pillar-top">
                    <span className="pillar-tag">{pillar.tag}</span>
                    <div className="pillar-icon">
                      {pillarIcons[pillar.tag] || <Eye size={22} />}
                    </div>
                  </div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.description}</p>
                  <div className="pillar-accent-glow"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          {isDesktop && (
            <div className="container pillars-progress-wrap">
              <div className="pillars-progress-track">
                <div
                  className="pillars-progress-bar"
                  style={{ width: `${Math.max(12, pillarsProgress * 100)}%` }}
                ></div>
              </div>
              <span className="pillars-scroll-hint">Scroll to slide through pillars →</span>
            </div>
          )}
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="services" className="section-padding services-section">
        <div className="container">
          <div className="section-lead-row scroll-reveal">
            <div>
              <span className="section-tag">{t.services.tag}</span>
              <h2 className="section-title">{t.services.title}</h2>
            </div>
            <p className="lead-description">{t.services.leadText}</p>
          </div>

          {/* Overlapping / Stacked Cards Container */}
          <div className="services-stack">
            {t.services.items.map((service, idx) => (
              <div
                key={service.number}
                className="service-card-stacked"
                style={{
                  '--stack-idx': idx,
                  zIndex: 10 + idx,
                }}
              >
                <div className="card-stack-inner">
                  <div className="card-stack-left">
                    <div className="service-card-top">
                      <div className="service-icon">{serviceIcons[idx] || <Compass size={24} />}</div>
                      <span className="service-num">{service.number}</span>
                    </div>
                    <span className="service-cat-pill">{service.category}</span>
                    <h3 className="card-stack-title">{service.title}</h3>
                    <p className="card-stack-desc">{service.description}</p>
                    <a href="#contact" className="service-link card-stack-link">
                      <span>{t.services.learnMore}</span> <ArrowUpRight size={16} />
                    </a>
                  </div>

                  <div className="card-stack-right">
                    <div className="stack-right-panel">
                      <div className="stack-feature-header">
                        <span className="stack-feature-label">Key Capabilities</span>
                        <div className="stack-accent-dot"></div>
                      </div>
                      <div className="service-tags-wrap stack-tags-wrap">
                        {service.tags.map((tagItem) => (
                          <span key={tagItem} className="service-mini-tag">{tagItem}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
