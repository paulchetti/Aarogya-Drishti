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
    { name: 'Direct / Walk-in Registration', icon: <UserPlusIcon /> },
    { name: 'EHR Clinical Documentation', icon: <HistoryIcon /> },
    { name: 'Diagnostic & Triage Assessment', icon: <CameraIcon /> },
    { name: 'Care Continuity Tracking', icon: <ReferralIcon /> },
    { name: 'Appointment Scheduling & Slot Management', icon: <CalendarIcon /> },
    { name: 'Facility Utilization & Clinical Reports', icon: <ReportsIcon /> },
    { name: 'Virtual Consultation Queue', icon: <AIIcon /> },
    { name: 'Clinician Profile & Credentials', icon: <SettingsIcon /> },
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
            title={item.name}
          >
            {item.icon}
            <span className="nav-item-text">{item.name}</span>
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
          Primary Health Centre (PHC)<br />
          Care Continuity Network
        </div>
      </div>
    </aside>
  );
}
