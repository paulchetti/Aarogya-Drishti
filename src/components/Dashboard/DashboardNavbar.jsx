import React from 'react';
import { BellIcon } from '../Icons';

export default function DashboardNavbar({ notificationCount = 3 }) {
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
