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
    <>
      {/* Semi-transparent Backdrop Overlay when Menu is Open */}
      {isMenuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onToggleMenu}
          aria-label="Close menu"
        />
      )}

      {/* Slide-out Menu Drawer - Styled in Dashboard Light Aesthetic */}
      <aside className={`dash-sidebar-drawer ${isMenuOpen ? 'open' : 'closed'}`}>
        <div className="drawer-header">
          {/* Top Home icon with title 'Menu' */}
          <button
            type="button"
            className="drawer-menu-header-btn"
            onClick={() => {
              if (onToggleMenu) onToggleMenu();
              if (onNavSelect) onNavSelect('Dashboard');
            }}
            title="Click to close menu"
          >
            <DashboardIcon />
            <span style={{ fontWeight: 800, letterSpacing: '0.3px' }}>Menu</span>
            <span className="drawer-menu-chevron">▲</span>
          </button>
        </div>

        {/* All Remaining Clinical Options */}
        <nav className="drawer-nav">
          {remainingItems.map((item) => (
            <button
              key={item.name}
              type="button"
              className={`drawer-nav-item ${activeNav === item.name ? 'active' : ''}`}
              onClick={() => {
                onNavSelect(item.name);
                if (onToggleMenu) onToggleMenu();
              }}
              title={item.name}
            >
              <span className="drawer-nav-icon">{item.icon}</span>
              <span className="drawer-nav-text">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Tribal Village Artwork & Motto at bottom */}
        <div className="drawer-footer-art">
          <div className="drawer-art-card">
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
          <div className="drawer-slogan">
            Primary Health Centre (PHC)
            <br />
            Care Continuity Network
          </div>
        </div>
      </aside>
    </>
  );
}
