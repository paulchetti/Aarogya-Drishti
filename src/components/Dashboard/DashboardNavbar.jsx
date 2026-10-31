import React from 'react';
import { LogoIcon, BellIcon, UserIcon } from '../Icons';

export default function DashboardNavbar({
  lang = 'EN',
  onToggleLang,
  onLogout,
  notificationCount = 3,
}) {
  return (
    <header className="dash-navbar">
      <div className="dash-brand">
        <div className="dash-brand-icon">
          <LogoIcon className="w-9 h-9" />
        </div>
        <div className="dash-brand-text">
          <h1>AAROGYA DRISHTI</h1>
          <p>AI Assisted Oral Health Screening Platform</p>
        </div>
      </div>

      <div className="dash-top-actions">
        {/* Language switch button */}
        <button
          type="button"
          className="lang-toggle-btn"
          onClick={onToggleLang}
          title="Toggle Telugu / English (ITDA Paderu requirement)"
        >
          <span>🌐</span>
          <span>{lang === 'EN' ? 'తెలుగు (TE)' : 'English (EN)'}</span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="notif-btn"
          aria-label="Notifications"
          onClick={() => alert('3 Urgent Cases pending review from Chintapalli and Koyyuru PHC')}
        >
          <BellIcon className="w-5 h-5" />
          {notificationCount > 0 && <span className="notif-badge">{notificationCount}</span>}
        </button>

        {/* Doctor profile */}
        <div className="doctor-profile" onClick={onLogout} title="Click to logout or switch account">
          <div className="doctor-avatar">
            <UserIcon className="w-5 h-5" />
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
