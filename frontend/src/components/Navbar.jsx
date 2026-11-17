import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight, Lock, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { isAuthenticated, openAuthModal, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* 1. TOP HEADER */}
      <header className={`navbar-custom ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" className="brand-logo" onClick={closeMenu}>
            <strong>MUM</strong> <span>digital agency</span>
          </Link>

          {/* Right Action: Nav links + Lang Toggle + Concentric Ring Badge + Hamburger */}
          <div className="nav-right">
            <a href="#why-mum" className="nav-pill-link d-none-mobile">
              {t.nav.whyMum}
            </a>
            <a href="#services" className="nav-pill-link d-none-mobile">
              {t.nav.services}
            </a>
            <a href="#projects" className="nav-pill-link d-none-mobile">
              {t.nav.projects}
            </a>

            {isAuthenticated ? (
              <div className="nav-admin-group d-none-mobile">
                <Link to="/admin" className="admin-tag">
                  {t.nav.admin}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="nav-logout-btn"
                  title="Log out Admin"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="nav-login-btn d-none-mobile"
              >
                <Lock size={13} />
                <span>Login</span>
              </button>
            )}

            {/* Quick Lang Switcher in Header */}
            <div className="lang-switcher-pill">
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="lang-sep">/</span>
              <button
                type="button"
                className={`lang-btn ${lang === 'fr' ? 'active' : ''}`}
                onClick={() => setLang('fr')}
                aria-label="Passer en Français"
              >
                FR
              </button>
            </div>

            <div className="m-circle-badge" title="MUM Digital Mark">
              <svg viewBox="0 0 254.79 254.79" width="34" height="34" className="badge-svg">
                <circle cx="127.4" cy="127.4" r="116" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="14" />
                <circle cx="127.4" cy="127.4" r="78" fill="none" stroke="#00ACDF" strokeWidth="16" />
                <text x="127.4" y="145" textAnchor="middle" fill="#ffffff" fontSize="72" fontWeight="800" fontFamily="Outfit">
                  M
                </text>
              </svg>
            </div>

            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setMenuOpen(true)}
              aria-label={t.nav.openMenu}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. FULLSCREEN OVERLAY MEGA MENU */}
      {menuOpen && (
        <div className="fullscreen-menu-overlay">
          <div className="container menu-inner">
            {/* Top Bar of Menu */}
            <div className="menu-topbar">
              <Link to="/" className="brand-logo" onClick={closeMenu}>
                <strong>MUM</strong> <span>digital agency</span>
              </Link>

              <div className="menu-top-right">
                <nav className="menu-nav-links">
                  <a href="#why-mum" onClick={closeMenu}>{t.nav.whyMum}</a>
                  <a href="#agency" onClick={closeMenu}>{t.nav.agency}</a>
                  <a href="#services" onClick={closeMenu}>{t.nav.services}</a>
                  <a href="#projects" onClick={closeMenu}>{t.nav.projects}</a>
                  {isAuthenticated ? (
                    <div className="menu-admin-auth-group">
                      <Link to="/admin" onClick={closeMenu} className="admin-tag">{t.nav.admin}</Link>
                      <button
                        type="button"
                        onClick={() => { logout(); closeMenu(); }}
                        className="menu-logout-btn"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { openAuthModal('login'); closeMenu(); }}
                      className="menu-login-btn"
                    >
                      <Lock size={16} /> Admin Login
                    </button>
                  )}
                  <a href="#contact" onClick={closeMenu}>{t.nav.contact}</a>
                </nav>

                <div className="menu-lang">
                  <button
                    type="button"
                    className={lang === 'en' ? 'active' : ''}
                    onClick={() => setLang('en')}
                  >
                    EN
                  </button>
                  <span className="lang-divider">|</span>
                  <button
                    type="button"
                    className={lang === 'fr' ? 'active' : ''}
                    onClick={() => setLang('fr')}
                  >
                    FR
                  </button>
                </div>

                <button
                  type="button"
                  className="menu-close-btn"
                  onClick={closeMenu}
                  aria-label={t.nav.closeMenu}
                >
                  <X size={32} />
                </button>
              </div>
            </div>

            {/* Menu Body Grid */}
            <div className="menu-body-grid">
              {/* Left Column: 3D M-Logo Card */}
              <div className="menu-brand-card">
                <div className="card-m-emblem">
                  <div className="outer-ring">
                    <div className="inner-m">M</div>
                  </div>
                </div>
              </div>

              {/* Middle Columns: 4 Services Categories */}
              <div className="menu-services-grid">
                <div className="service-category">
                  <h4><span className="cat-num">(01)</span> {t.nav.strategy}</h4>
                  <ul>
                    {t.nav.strategyList.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="service-category">
                  <h4><span className="cat-num">(02)</span> {t.nav.creation}</h4>
                  <ul>
                    {t.nav.creationList.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="service-category">
                  <h4><span className="cat-num">(03)</span> {t.nav.marketing}</h4>
                  <ul>
                    {t.nav.marketingList.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="service-category">
                  <h4><span className="cat-num">(04)</span> {t.nav.applications}</h4>
                  <ul>
                    {t.nav.applicationsList.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: CTA & Socials */}
              <div className="menu-cta-col">
                <p className="cta-prompt">{t.nav.projectPrompt}</p>
                <a href="#contact" className="btn-project-cta" onClick={closeMenu}>
                  {t.nav.yourProject} <ArrowUpRight size={18} />
                </a>

                <div className="menu-socials">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                    <FacebookIcon />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                    <YoutubeIcon />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <LinkedinIcon />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
