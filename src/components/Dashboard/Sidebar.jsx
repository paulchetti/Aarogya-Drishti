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

      {/* Decorative Tribal Village Illustration matching image */}
      <div className="sidebar-footer-art">
        <div className="village-illustration">
          <svg viewBox="0 0 160 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hills */}
            <path d="M-10 65 Q 40 25 90 65" fill="#042f2e" opacity="0.6" />
            <path d="M50 65 Q 110 30 170 65" fill="#0f766e" opacity="0.4" />
            {/* Palm Trees */}
            <path d="M25 65 L 25 35" stroke="#134e4a" strokeWidth="2" />
            <circle cx="25" cy="32" r="8" fill="#14b8a6" opacity="0.6" />
            <path d="M135 65 L 135 38" stroke="#134e4a" strokeWidth="2" />
            <circle cx="135" cy="35" r="7" fill="#14b8a6" opacity="0.5" />
            {/* Traditional Hut */}
            <path d="M65 65 L 65 52 L 85 52 L 85 65 Z" fill="#09282f" />
            <path d="M60 52 L 75 38 L 90 52 Z" fill="#b45309" opacity="0.8" />
            <rect x="71" y="56" width="8" height="9" fill="#f59e0b" opacity="0.8" />
            {/* Second small hut */}
            <path d="M95 65 L 95 55 L 110 55 L 110 65 Z" fill="#09282f" />
            <path d="M91 55 L 102.5 44 L 114 55 Z" fill="#9a3412" opacity="0.8" />
          </svg>
        </div>
        <div className="sidebar-slogan">
          Better Oral Health<br />
          for a Healthier Tomorrow
        </div>
      </div>
    </aside>
  );
}
