import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthCard from './components/AuthCard';
import Toast from './components/Toast';
import DashboardView from './components/Dashboard/DashboardView';

export default function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'auth'
  const [authMode, setAuthMode] = useState('login'); // 'register' | 'login'
  const [toast, setToast] = useState({ message: '', visible: false });
  const toastTimerRef = useRef(null);

  useEffect(() => {
    // Force document title update in the browser
    document.title =
      view === 'dashboard'
        ? 'Aarogya Drishti | PHC Medical Officer Dashboard'
        : 'Aarogya Drishti | Secure Healthcare Portal';

    // Force favicon update
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = '/favicon.svg?v=' + Date.now();
  }, [view]);

  const showToast = (message) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ message, visible: true });
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  const handleRegisterSubmit = (data) => {
    showToast(`Welcome ${data.name || 'User'}! Logging you into the Medical Officer portal...`);
    setTimeout(() => setView('dashboard'), 1000);
  };

  const handleLoginSubmit = (data) => {
    showToast(`Logged in successfully as Dr. Sandeep Kumar`);
    setTimeout(() => setView('dashboard'), 600);
  };

  const handleForgotPassword = () => {
    showToast('Password recovery link sent to your registered PHC medical email.');
  };

  const handleSocialClick = (provider) => {
    showToast(`${provider} sign-in enabled in simulation mode. Logging in...`);
    setTimeout(() => setView('dashboard'), 600);
  };

  const handleHelpClick = () => {
    showToast('Aarogya Drishti Helpline: 1800-425-4252 (ITDA Paderu Health Cell)');
  };

  return (
    <>
      {/* Floating View Switcher to quickly demonstrate both the Auth Portal & the Dashboard */}
      <div
        style={{
          position: 'fixed',
          top: '12px',
          right: '12px',
          zIndex: 9999,
          display: 'flex',
          gap: '6px',
          background: 'rgba(15, 23, 42, 0.85)',
          padding: '4px 6px',
          borderRadius: '20px',
          backdropFilter: 'blur(6px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        }}
      >
        <button
          type="button"
          onClick={() => setView('dashboard')}
          style={{
            background: view === 'dashboard' ? '#0d9488' : 'transparent',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          📊 Dashboard
        </button>
        <button
          type="button"
          onClick={() => setView('auth')}
          style={{
            background: view === 'auth' ? '#ea580c' : 'transparent',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          🔐 Login UI
        </button>
      </div>

      {view === 'dashboard' ? (
        <DashboardView
          onLogout={() => {
            showToast('Signed out of PHC Medical Officer portal.');
            setView('auth');
          }}
          onToast={showToast}
        />
      ) : (
        <main className="page-shell">
          <Header />

          <AuthCard
            mode={authMode}
            onSwitchMode={setAuthMode}
            onRegisterSubmit={handleRegisterSubmit}
            onLoginSubmit={handleLoginSubmit}
            onForgotPassword={handleForgotPassword}
            onSocialClick={handleSocialClick}
          />

          <Footer onHelpClick={handleHelpClick} />
        </main>
      )}

      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
