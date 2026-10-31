import React from 'react';
import { LogoIcon, BellIcon, UserIcon } from '../Icons';

export default function DashboardNavbar({ notificationCount = 3 }) {
  return (
    <header className="dash-navbar">
      {/* Orange artistic gradient swoosh in background matching source image */}
      <div className="dash-navbar-swoosh" />

      {/* Brand logo & tagline */}
      <div className="dash-brand">
        <div className="dash-brand-icon">
          <LogoIcon className="w-10 h-10" />
        </div>
        <div className="dash-brand-text">
          <h1>AAROGYA DRISHTI</h1>
          <p>AI Assisted Oral Health Screening Platform</p>
        </div>
      </div>

      {/* Right side actions */}
      <div className="dash-top-actions">
        {/* Notification Bell */}
        <button
          type="button"
          className="notif-btn"
          aria-label="Notifications"
        >
          <BellIcon className="w-5 h-5" />
          {notificationCount > 0 && <span className="notif-badge">{notificationCount}</span>}
        </button>

        {/* Doctor Profile */}
        <div className="doctor-profile">
          <div className="doctor-avatar-wrap">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
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
