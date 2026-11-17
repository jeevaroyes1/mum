import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, Lock, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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

export default function Footer() {
  const { t } = useLanguage();
  const { isAuthenticated, openAuthModal, logout } = useAuth();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Brand & Address */}
        <div className="footer-col-brand">
          <Link to="/" className="brand-logo footer-brand">
            <strong>MUM</strong> <span>digital agency</span>
          </Link>
          <div className="footer-address">
            <span className="address-line">{t.footer.address1}</span>
            <span className="address-line">{t.footer.address2}</span>
            <span className="address-line">{t.footer.address3}</span>
          </div>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col-nav">
          <h4>{t.footer.navTitle}</h4>
          <ul className="footer-links">
            <li><a href="#why-mum">{t.nav.whyMum}</a></li>
            <li><a href="#services">{t.nav.services}</a></li>
            <li><a href="#projects">{t.nav.projects}</a></li>
            <li><a href="#agency">{t.nav.agency}</a></li>
            <li><a href="#contact">{t.nav.contact}</a></li>
            {isAuthenticated ? (
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Link to="/admin" className="footer-admin-link">{t.nav.admin}</Link>
                <button
                  type="button"
                  onClick={logout}
                  className="footer-logout-btn"
                  title="Log out Admin"
                >
                  <LogOut size={13} />
                </button>
              </li>
            ) : (
              <li>
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="footer-login-btn"
                >
                  <Lock size={13} style={{ marginRight: '5px' }} />
                  Admin Login
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Contact info & CTA */}
        <div className="footer-col-contact">
          <h4>{t.footer.contactTitle}</h4>
          <ul className="footer-contact">
            <li>
              <Phone size={16} /> <a href="tel:+3522780731">+352 27 80 73 1</a>
            </li>
            <li>
              <Mail size={16} /> <a href="mailto:info@mum.lu">info@mum.lu</a>
            </li>
            <li>
              <MapPin size={16} /> <span>3, Om Knupp, Weiswampach</span>
            </li>
          </ul>

          <div style={{ marginTop: '1.5rem' }}>
            <a href="#contact" className="btn btn-outline-cyan footer-cta-btn">
              <span>{t.nav.yourProject}</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>{t.footer.rights}</p>
        <div className="footer-legal-links">
          <span>{t.footer.privacy}</span>
          <span>•</span>
          <span>{t.footer.legal}</span>
          <span>•</span>
          <span>{t.footer.cookies}</span>
        </div>
      </div>
    </footer>
  );
}
