
import { useState } from 'react';
import API from '../services/api';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactForm() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    }
  };

  const validateFrontend = () => {
    let errors = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    const cleanPhone = formData.phone.replace(/[\s\-().]/g, '');
    const indianPhoneRegex = /^[6-9][0-9]{9}$/;

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!indianPhoneRegex.test(cleanPhone)) {
      errors.phone = 'Invalid phone number.';
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!validateFrontend()) return;

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        phone: formData.phone.trim()
      };

      const response = await API.post('/enquiries', payload);
      if (response.data.success) {
        setSuccessMsg(t.contact.successAlert);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const backendErrors = {};
        err.response.data.errors.forEach((e) => {
          backendErrors[e.path || e.param] = e.msg;
        });
        setFieldErrors(backendErrors);
      } else {
        setErrorMsg(err.response?.data?.message || t.contact.errorAlert);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        <div className="section-header text-center scroll-reveal" style={{ marginBottom: '3rem' }}>
          <span className="section-tag">{t.contact.tag}</span>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="form-container scroll-reveal">
          {successMsg && (
            <div className="success-alert" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <CheckCircle size={20} /> {successMsg}
            </div>
          )}

          {errorMsg && (
            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: 600, textAlign: 'center', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <AlertCircle size={20} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t.contact.fullName}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.contact.namePlaceholder}
              />
              {fieldErrors.name && <div className="error-text">{fieldErrors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">{t.contact.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.contact.emailPlaceholder}
              />
              {fieldErrors.email && <div className="error-text">{fieldErrors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">{t.contact.phone}</label>
              <div className="phone-input-group">
                <div className="phone-country-pill" title="India (+91)">
                  +91
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 98765 43210"
                  className="phone-field"
                  maxLength={10}
                />
              </div>
              {fieldErrors.phone && (
                <div className="error-text">{fieldErrors.phone}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">{t.contact.message}</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder={t.contact.messagePlaceholder}
              ></textarea>
              {fieldErrors.message && <div className="error-text">{fieldErrors.message}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
              disabled={submitting}
            >
              {submitting ? t.contact.submitting : <>{t.contact.submitBtn} <Send size={16} /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
