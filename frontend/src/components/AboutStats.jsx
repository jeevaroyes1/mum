import { CheckCircle2, Quote, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutStats() {
  const { t } = useLanguage();

  return (
    <>
      {/* 1. TESTIMONIAL / CLIENT TRUST SECTION */}
      <section className="section-padding testimonials-section">
        <div className="container">
          <div className="section-header text-center scroll-reveal">
            <span className="section-tag">{t.testimonials.tag}</span>
            <h2 className="section-title">{t.testimonials.title}</h2>
          </div>

          <div className="testimonial-card scroll-reveal">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#00ACDF" color="#00ACDF" />
              ))}
            </div>
            <Quote size={42} className="quote-icon" />
            <blockquote className="testimonial-quote">
              {t.testimonials.quote}
            </blockquote>
            <div className="testimonial-author">
              <strong>{t.testimonials.author}</strong>
              <span>{t.testimonials.role}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT AGENCY SECTION */}
      <section id="agency" className="section-padding dark-section agency-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual-col scroll-reveal">
              <div className="about-img-wrap">
                <img
                  src="https://www.mum.lu/thumbnails/120772-600-500-Crop.jpg"
                  alt="Équipe MUM digital agency Weiswampach"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="about-badge">
                  <span>{t.about.locationBadge}</span>
                </div>
              </div>
            </div>

            <div className="about-content-col scroll-reveal">
              <span className="section-tag">{t.about.tag}</span>
              <h2 className="section-title" style={{ color: '#ffffff' }}>
                {t.about.title}
              </h2>
              <p className="about-text">
                {t.about.description}
              </p>

              <div className="values-list">
                {t.about.values.map((v) => (
                  <div key={v.code} className="value-item">
                    <CheckCircle2 size={20} className="value-check" />
                    <div>
                      <strong className="value-title">{v.title}</strong>
                      <p className="value-desc">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="stats-grid">
            {t.about.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="stat-card scroll-reveal-stagger"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
