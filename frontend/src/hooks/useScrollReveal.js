import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    // 1. Intersection Observer for Scroll Reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-stagger, .pillar-card, .testimonial-card, .about-visual-col, .about-content-col, .stat-card'
    );
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      }
      observer.observe(el);
    });

    // 2. Interactive Spotlight Cursor Follower on Cards (ChaiUI / Linear pattern)
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll(
        '.spotlight-card, .pillar-card, .service-card-stacked, .project-card, .testimonial-card, .stat-card'
      );
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
}
