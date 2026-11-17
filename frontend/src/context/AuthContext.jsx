import { createContext, useContext, useState } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mum_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    if (res.data && res.data.success && res.data.user) {
      setAdminUser(res.data.user);
      localStorage.setItem('mum_admin_user', JSON.stringify(res.data.user));
      closeAuthModal();
      return { success: true };
    }
    return { success: false, message: 'Invalid response from server' };
  };

  const signup = async (name, email, password) => {
    const res = await API.post('/auth/signup', { name, email, password });
    if (res.data && res.data.success && res.data.user) {
      setAdminUser(res.data.user);
      localStorage.setItem('mum_admin_user', JSON.stringify(res.data.user));
      closeAuthModal();
      return { success: true };
    }
    return { success: false, message: 'Invalid response from server' };
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('mum_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        authModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { // eslint-disable-line react-refresh/only-export-components
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
