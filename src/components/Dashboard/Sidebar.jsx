import React from 'react';
import {
  DashboardIcon,
  UserPlusIcon,
  HistoryIcon,
  CameraIcon,
  ReferralIcon,
  CalendarIcon,
  ReportsIcon,
  AIIcon,
  SettingsIcon,
} from '../Icons';

export default function Sidebar({ activeNav = 'Dashboard', onNavSelect }) {
  const navItems = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Patient Registration', icon: <UserPlusIcon /> },
    { name: 'Medical History', icon: <HistoryIcon /> },
    { name: 'Oral Screening', icon: <CameraIcon /> },
    { name: 'Referrals & Follow-ups', icon: <ReferralIcon /> },
    { name: 'Appointments', icon: <CalendarIcon /> },
    { name: 'Reports', icon: <ReportsIcon /> },
    { name: 'AI Analysis', icon: <AIIcon /> },
    { name: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <aside className="dash-sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.name}
            type="button"
            className={`nav-item ${activeNav === item.name ? 'active' : ''}`}
            onClick={() => onNavSelect(item.name)}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Tribal Village Artwork & Motto at bottom */}
      <div className="sidebar-footer-art">
        <div className="village-art-card">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=480&q=80"
            alt="Tribal Village Landscape"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=480&q=80";
            }}
          />
        </div>
        <div className="sidebar-slogan">
          Better Oral Health<br />
          for a Healthier Tomorrow
        </div>
      </div>
    </aside>
  );
}
