import { useState } from 'react';
import { X, Lock, Mail, User, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { authModalOpen, closeAuthModal, authMode, setAuthMode, login, signup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleFillDemo = () => {
    setEmail('admin@mum.lu');
    setPassword('admin123');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authMode === 'login') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Authentication failed. Please verify your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={closeAuthModal}>
      <div className="admin-modal-card auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="section-tag" style={{ marginBottom: '0.25rem' }}>Security</span>
            <h3>{authMode === 'login' ? 'Admin Authentication' : 'Create Admin Account'}</h3>
          </div>
          <button type="button" onClick={closeAuthModal} className="modal-close-icon" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Tab Toggle: Login vs Sign Up */}
        <div className="auth-tab-row">
          <button
            type="button"
            className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setAuthMode('login');
              setError('');
            }}
          >
            Log In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setAuthMode('signup');
              setError('');
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Demo Credentials Pill */}
        <div className="auth-demo-hint">
          <div className="demo-hint-text">
            <Lock size={14} className="demo-lock-icon" />
            <span>Stored in DB: <strong>admin@mum.lu</strong> / <strong>admin123</strong></span>
          </div>
          {authMode === 'login' && (
            <button type="button" onClick={handleFillDemo} className="btn-auto-fill">
              Auto Fill
            </button>
          )}
        </div>

        {error && (
          <div className="modal-error-alert" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          {authMode === 'signup' && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="auth-input-wrapper">
                <User size={16} className="auth-input-icon" />
                <input
                  type="text"
                  placeholder="e.g. Administrator"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Admin Email</label>
            <div className="auth-input-wrapper">
              <Mail size={16} className="auth-input-icon" />
              <input
                type="email"
                placeholder="admin@mum.lu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="auth-input-wrapper">
              <Lock size={16} className="auth-input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-footer" style={{ marginTop: '1.75rem' }}>
            <button type="button" onClick={closeAuthModal} className="btn btn-outline" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                'Authenticating...'
              ) : (
                <>
                  <span>{authMode === 'login' ? 'Log In to Admin' : 'Create & Access'}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
