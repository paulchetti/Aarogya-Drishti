import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthCard from './components/AuthCard';
import Toast from './components/Toast';

export default function App() {
  const [mode, setMode] = useState('register'); // 'register' | 'login'
  const [toast, setToast] = useState({ message: '', visible: false });
  const toastTimerRef = useRef(null);

  useEffect(() => {
    // Force document title update in the browser
    document.title = 'Aarogya Drishti | Secure Healthcare Portal';

    // Force favicon update to clear any previous cached icons
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = '/favicon.svg?v=' + Date.now();
  }, []);

  const showToast = (message) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ message, visible: true });
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
  };

  const handleRegisterSubmit = (data) => {
    console.log('Registering user:', data);
    showToast(`Welcome ${data.name || 'User'}! Registration UI is connected and ready for backend integration.`);
  };

  const handleLoginSubmit = (data) => {
    console.log('Logging in user:', data);
    showToast(`Welcome back (${data.email})! Connect your authentication API to sign in.`);
  };

  const handleForgotPassword = () => {
    showToast('Connect your password-reset flow to enable account recovery.');
  };

  const handleSocialClick = (provider) => {
    showToast(`${provider} sign-in clicked. Configure OAuth before enabling.`);
  };

  const handleHelpClick = () => {
    showToast('Aarogya Drishti Support: Add your support email or helpline here.');
  };

  return (
    <main className="page-shell">
      <Header />

      <AuthCard
        mode={mode}
        onSwitchMode={setMode}
        onRegisterSubmit={handleRegisterSubmit}
        onLoginSubmit={handleLoginSubmit}
        onForgotPassword={handleForgotPassword}
        onSocialClick={handleSocialClick}
      />

      <Footer onHelpClick={handleHelpClick} />

      <Toast message={toast.message} visible={toast.visible} />
    </main>
  );
}

