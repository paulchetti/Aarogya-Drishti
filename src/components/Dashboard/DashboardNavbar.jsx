import React, { useState, useEffect } from 'react';
import { BellIcon } from '../Icons';
import { useLanguage } from '../../context/LanguageContext';

export default function DashboardNavbar({
  dashboardTitle = 'PHC Dashboard',
  userName = 'Dr. Sandeep Kumar',
  userRole = 'PHC Medical Officer',
  userAvatar = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80',
  notificationCount = 3,
  onSwitchDashboard,
  onLogout,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { language, toggleLanguage, isOffline, fontSize, setFontSize } = useLanguage();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.warn('Exit fullscreen failed:', err);
      });
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <header className="dash-navbar">
      {/* Orange artistic gradient swoosh in background */}
      <div className="dash-navbar-swoosh" />

      {/* Brand area: Logo image and text cleanly placed in top left */}
      <div className="dash-brand">
        <img
          src="/logo.png"
          alt="Aarogya Drishti Emblem"
          className="dash-brand-logo-img"
        />
        <div className="dash-brand-text">
          <h1>{language === 'te' ? 'ఆరోగ్య దృష్టి' : 'AAROGYA DRISHTI'}</h1>
          <p>{t(dashboardTitle)}</p>
        </div>
      </div>

      {/* Right side actions */}
      <div className="dash-top-actions">
        {/* Language Switcher Button (One-Touch Telugu ⇄ English) */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="lang-toggle-btn"
          style={{
            background: language === 'te' ? '#ffedd5' : '#f8fafc',
            color: language === 'te' ? '#c2410c' : '#0f172a',
            border: `1.5px solid ${language === 'te' ? '#f97316' : '#cbd5e1'}`,
            borderRadius: '20px',
            padding: '5px 12px',
            fontSize: '11.5px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            transition: 'all 0.15s ease',
          }}
          title="Switch between English and Telugu (ఒకే టచ్‌తో తెలుగు మార్చండి)"
        >
          <span style={{ fontSize: '13px' }}>🌐</span>
          <span>{language === 'te' ? 'తెలుగు (Active)' : 'English | తెలుగు'}</span>
        </button>

        {/* Network & Edge Sync Telemetry Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: isOffline ? '#fee2e2' : '#ecfdf5',
            color: isOffline ? '#b91c1c' : '#047857',
            border: `1px solid ${isOffline ? '#fca5a5' : '#a7f3d0'}`,
            borderRadius: '20px',
            padding: '4px 9px',
            fontSize: '10.5px',
            fontWeight: 700,
          }}
          title={isOffline ? 'Offline Edge Storage Active' : 'Connected to ABDM State Gateway'}
        >
          <span style={{ fontSize: '8px' }}>{isOffline ? '🔴' : '🟢'}</span>
          <span>{isOffline ? 'Offline Edge' : 'ABDM Cloud'}</span>
        </div>

        {/* Accessibility Font Sizing Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '16px',
            padding: '2px 4px',
            gap: '2px',
          }}
          title="Accessibility Font Sizing (A- / A+)"
        >
          <button
            type="button"
            onClick={() => setFontSize('normal')}
            style={{
              border: 'none',
              background: fontSize === 'normal' ? '#0d9488' : 'transparent',
              color: fontSize === 'normal' ? '#fff' : '#64748b',
              borderRadius: '10px',
              padding: '2px 6px',
              fontSize: '10px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            A
          </button>
          <button
            type="button"
            onClick={() => setFontSize('large')}
            style={{
              border: 'none',
              background: fontSize === 'large' ? '#0d9488' : 'transparent',
              color: fontSize === 'large' ? '#fff' : '#64748b',
              borderRadius: '10px',
              padding: '2px 6px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            A+
          </button>
        </div>

        {/* Full Screen Toggle Button */}
        <button
          type="button"
          className={`fullscreen-btn ${isFullscreen ? 'active' : ''}`}
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Full Screen' : 'Set Display Full Screen'}
        >
          <span className="fs-icon">{isFullscreen ? '🗗' : '⛶'}</span>
          <span className="fs-text">{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          className="notif-btn"
          aria-label="Notifications"
          title={`${notificationCount} pending notices`}
        >
          <BellIcon className="w-5 h-5" />
          {notificationCount > 0 && <span className="notif-badge">{notificationCount}</span>}
        </button>

        {/* User / Clinician Profile with switch dropdown */}
        <div style={{ position: 'relative' }}>
          <div
            className="doctor-profile"
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            style={{ cursor: 'pointer' }}
            title="Click to Switch Portal or Logout"
          >
            <div className="doctor-avatar-wrap">
              <img
                src={userAvatar}
                alt={userName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=120&q=80";
                }}
              />
            </div>
            <div className="doctor-info">
              <span className="doctor-name">{userName}</span>
              <span className="doctor-role">{userRole}</span>
            </div>
            <span className="chevron-down">{isProfileMenuOpen ? '▲' : '▼'}</span>
          </div>

          {/* Quick Profile / Dashboard Switch Dropdown */}
          {isProfileMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '270px',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 12px 28px rgba(0,0,0,0.14)',
                border: '1px solid #e2e8f0',
                padding: '10px 0',
                zIndex: 100,
              }}
            >
              <div style={{ padding: '8px 16px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800 }}>
                  {language === 'te' ? 'డాష్‌బోర్డ్ మార్చండి' : 'Switch Dashboard'}
                </div>
              </div>

              {[
                { key: 'phc_dashboard', label: language === 'te' ? '🏥 పీహెచ్‌సీ డాష్‌బోర్డ్' : '🏥 PHC Dashboard', sub: language === 'te' ? 'ప్రాథమిక ఆరోగ్య కేంద్రం' : 'Primary Health Centre' },
                { key: 'specialist_dashboard', label: language === 'te' ? '🔬 స్పెషలిస్ట్ డాష్‌బోర్డ్' : '🔬 Specialist Dashboard', sub: language === 'te' ? 'నోటి ఆంకాలజీ & రివ్యూ' : 'Oral Oncology & Review' },
                { key: 'district_admin_dashboard', label: language === 'te' ? '🏛️ జిల్లా అడ్మిన్ డాష్‌బోర్డ్' : '🏛️ District Admin Dashboard', sub: language === 'te' ? 'డీఎంహెచ్‌ఓ & గిరిజన ఆరోగ్యం' : 'DMHO & Tribal Health' },
                { key: 'system_admin_dashboard', label: language === 'te' ? '🛡️ సిస్టమ్ అడ్మిన్ డాష్‌బోర్డ్' : '🛡️ System Admin Dashboard', sub: language === 'te' ? 'సెక్యూరిటీ & క్లౌడ్ కార్యకలాపాలు' : 'Security & Cloud Ops' },
                { key: 'patient', label: language === 'te' ? '👤 పౌర / రోగి పోర్టల్' : '👤 Citizen / Patient Portal', sub: language === 'te' ? 'ఆభా & సంరక్షణ ప్రయాణం' : 'ABHA & Care Journey' },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    if (onSwitchDashboard) onSwitchDashboard(item.key);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{item.label}</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{item.sub}</span>
                </button>
              ))}

              <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '6px', paddingTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#dc2626',
                    fontSize: '13px',
                    fontWeight: 700,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#fef2f2')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  🚪 {language === 'te' ? 'లాగౌట్ / లాగిన్‌కు నిష్క్రమించండి' : 'Logout / Exit to Login'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
