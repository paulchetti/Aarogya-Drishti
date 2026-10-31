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

export default function Sidebar({
  activeNav = 'Dashboard',
  onNavSelect,
  isMenuOpen = false,
  onToggleMenu,
}) {
  const remainingItems = [
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
    <aside className={`dash-sidebar ${isMenuOpen ? 'expanded' : 'collapsed'}`}>
      <nav className="sidebar-nav">
        {/* Home icon with title 'Menu' - Clicking toggles remaining options */}
        <button
          type="button"
          className={`nav-item menu-toggle-btn ${activeNav === 'Dashboard' ? 'active' : ''}`}
          onClick={() => {
            if (onToggleMenu) onToggleMenu();
            if (onNavSelect) onNavSelect('Dashboard');
          }}
          title={isMenuOpen ? 'Collapse options' : 'Show remaining options'}
        >
          <DashboardIcon />
          <span className="nav-item-text" style={{ fontWeight: 800, letterSpacing: '0.3px' }}>
            Menu
          </span>
          <span className="menu-chevron" style={{ marginLeft: 'auto', fontSize: '9px', opacity: 0.85 }}>
            {isMenuOpen ? '▲' : '▼'}
          </span>
        </button>

        {/* Remaining options - revealed when Menu is clicked */}
        {isMenuOpen && (
          <div className="remaining-nav-items">
            {remainingItems.map((item) => (
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
          </div>
        )}
      </nav>

      {/* Tribal Village Artwork & Motto at bottom (visible when expanded) */}
      {isMenuOpen && (
        <div className="sidebar-footer-art">
          <div className="village-art-card">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=480&q=80"
              alt="Tribal Village Landscape"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=480&q=80';
              }}
            />
          </div>
          <div className="sidebar-slogan">
            Primary Health Centre (PHC)
            <br />
            Care Continuity Network
          </div>
        </div>
      )}
    </aside>
  );
}
