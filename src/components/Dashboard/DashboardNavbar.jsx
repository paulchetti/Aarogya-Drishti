import React, { useState, useEffect } from 'react';
import { BellIcon } from '../Icons';

export default function DashboardNavbar({ notificationCount = 3 }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

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

      {/* Brand logo placed in top left corner */}
      <div className="dash-brand">
        <img
          src="/logo.png"
          alt="Aarogya Drishti Emblem"
          className="dash-brand-logo-img"
        />
        <div className="dash-brand-text">
          <h1>AAROGYA DRISHTI</h1>
          <p>Primary Health Centre (PHC) / Medical Officer Dashboard</p>
        </div>
      </div>

      {/* Right side actions */}
      <div className="dash-top-actions">
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
          aria-label="Virtual Consultation Queue Notifications"
          title="Virtual Consultation Queue (3 Pending)"
        >
          <BellIcon className="w-5 h-5" />
          {notificationCount > 0 && <span className="notif-badge">{notificationCount}</span>}
        </button>

        {/* Doctor Profile */}
        <div className="doctor-profile" title="Clinician Profile & Credentials">
          <div className="doctor-avatar-wrap">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80"
              alt="Dr. Sandeep Kumar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=120&q=80";
              }}
            />
          </div>
          <div className="doctor-info">
            <span className="doctor-name">Dr. Sandeep Kumar</span>
            <span className="doctor-role">PHC Medical Officer</span>
          </div>
          <span className="chevron-down">▼</span>
        </div>
      </div>
    </header>
  );
}
