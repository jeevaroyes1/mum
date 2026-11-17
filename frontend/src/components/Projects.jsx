import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const projectImages = [
  'https://www.mum.lu/thumbnails/128906-800-500-Crop.jpg',
  'https://www.mum.lu/thumbnails/128900-800-500-Crop.jpg',
  'https://www.mum.lu/thumbnails/128768-800-500-Crop.jpg',
  'https://www.mum.lu/thumbnails/128756-400-225-Crop.jpg',
];

export default function Projects() {
  const { t } = useLanguage();
  const trackRef = useRef(null);
  const railRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Responsive check for desktop pinned scroll vs mobile natural layout
  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth > 820);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Vertical-to-Horizontal Scroll interpolation (requestAnimationFrame)
  useEffect(() => {
    if (!isDesktop) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!trackRef.current || !railRef.current) {
            ticking = false;
            return;
          }

          const trackRect = trackRef.current.getBoundingClientRect();
          const trackHeight = trackRef.current.offsetHeight;
          const windowHeight = window.innerHeight;
          const scrollDistance = trackHeight - windowHeight;

          if (scrollDistance <= 0) {
            ticking = false;
            return;
          }

          // Progress 0 when top of section touches top of viewport, 1 when track ends
          const currentScroll = -trackRect.top;
          const progress = Math.max(0, Math.min(1, currentScroll / scrollDistance));
          setScrollProgress(progress);

          const railWidth = railRef.current.scrollWidth;
          const windowWidth = window.innerWidth;
          // Calculate max horizontal travel distance leaving comfortable margin on right
          const maxTravel = Math.max(0, railWidth - windowWidth + 120);
          setTranslateX(progress * maxTravel);

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
    <section id="projects" ref={trackRef} className="projects-horizontal-track">
      <div className="projects-pinned-stage">
        <div className="container projects-pinned-header">
          <div className="projects-heading-text">
            <span className="section-tag">{t.projects.tag}</span>
            <h2 className="section-title">{t.projects.title}</h2>
          </div>
          <a href="#contact" className="btn btn-outline-cyan">
            <span>{t.projects.viewAll}</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* Horizontal Moving Cards Rail */}
        <div className="projects-rail-viewport">
          <div
            ref={railRef}
            className="projects-cards-rail"
            style={
              isDesktop
                ? {
                    transform: `translate3d(-${translateX}px, 0, 0)`,
                    transition: 'transform 0.08s cubic-bezier(0.16, 1, 0.3, 1)',
                  }
                : {}
            }
          >
            {t.projects.items.map((project, idx) => (
              <article
                key={project.title}
                className="project-card project-card-horizontal"
              >
                <div className="project-img-wrap">
                  <img
                    src={projectImages[idx]}
                    alt={project.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <span className="project-badge">{project.tag}</span>
                </div>
                <div className="project-info">
                  <div>
                    <span className="project-cat">{project.category}</span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                  </div>
                  <span className="project-arrow" aria-label={`${t.projects.viewProject} ${project.title}`}>
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Pinned Scroll Progress Indicator */}
        {isDesktop && (
          <div className="container projects-progress-wrap">
            <div className="projects-progress-track">
              <div
                className="projects-progress-bar"
                style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
              ></div>
            </div>
            <span className="projects-scroll-hint">Scroll to explore case studies →</span>
          </div>
        )}
      </div>
    </section>
  );
}
