import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
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
  menuTitle = 'PHC Dashboard Options',
  customItems = null,
}) {
  const { language } = useLanguage();

  const teluguMap = {
    'Direct / Walk-in Registration': 'ప్రత్యక్ష రోగి నమోదు (రిజిస్ట్రేషన్)',
    'EHR Clinical Documentation': 'ఈహెచ్ఆర్ క్లినికల్ రికార్డులు',
    'Diagnostic & Triage Assessment': 'నోటి పరీక్ష & ఏఐ ట్రయాజ్ అంచనా',
    'Care Continuity Tracking': 'నిరంతర సంరక్షణ & ఫాలో-అప్',
    'Appointment Scheduling & Slot Management': 'అపాయింట్‌మెంట్లు & షెడ్యూలింగ్',
    'Facility Utilization & Clinical Reports': 'క్లినికల్ వినియోగం & నివేదికలు',
    'Virtual Consultation Queue': 'వీడియో టెలికన్సల్టేషన్ క్యూ',
    'Clinician Profile & Credentials': 'వైద్యుల ప్రొఫైల్ & వివరాలు',
  };

  const defaultItems = [
    { name: 'Direct / Walk-in Registration', icon: <UserPlusIcon /> },
    { name: 'EHR Clinical Documentation', icon: <HistoryIcon /> },
    { name: 'Diagnostic & Triage Assessment', icon: <CameraIcon /> },
    { name: 'Care Continuity Tracking', icon: <ReferralIcon /> },
    { name: 'Appointment Scheduling & Slot Management', icon: <CalendarIcon /> },
    { name: 'Facility Utilization & Clinical Reports', icon: <ReportsIcon /> },
    { name: 'Virtual Consultation Queue', icon: <AIIcon /> },
    { name: 'Clinician Profile & Credentials', icon: <SettingsIcon /> },
  ];

  const menuItems = customItems || defaultItems;

  return (
    <div className="menu-anchor-below-logo">
      {/* Menu Toggle Button directly below the Logo */}
      <button
        type="button"
        className={`menu-toggle-btn-below-logo ${isMenuOpen ? 'active' : ''}`}
        onClick={onToggleMenu}
        title={isMenuOpen ? 'Collapse Menu' : 'Open Menu Options'}
      >
        <DashboardIcon />
        <span className="menu-btn-text">{language === 'te' ? 'మెనూ' : 'Menu'}</span>
        <span className="menu-btn-chevron">{isMenuOpen ? '▲' : '▼'}</span>
      </button>

      {/* Backdrop overlay when open */}
      {isMenuOpen && (
        <div
          className="menu-dropdown-backdrop"
          onClick={onToggleMenu}
          aria-label="Close menu"
        />
      )}

      {/* Clean Dropdown Card directly below the Menu button */}
      {isMenuOpen && (
        <div className="menu-dropdown-panel-below-logo">
          <div className="menu-dropdown-header">
            <span className="menu-dropdown-title">
              {language === 'te' ? (teluguMap[menuTitle] || 'డాష్‌బోర్డ్ ఆప్షన్స్') : menuTitle}
            </span>
            <button
              type="button"
              className="menu-dropdown-close"
              onClick={onToggleMenu}
            >
              ✕
            </button>
          </div>

          <nav className="menu-dropdown-nav">
            {menuItems.map((item) => (
              <button
                key={item.name}
                type="button"
                className={`menu-dropdown-item ${activeNav === item.name ? 'active' : ''}`}
                onClick={() => {
                  if (onNavSelect) onNavSelect(item.name);
                  if (onToggleMenu) onToggleMenu();
                }}
                title={item.name}
              >
                <span className="dropdown-item-icon">{item.icon}</span>
                <span className="dropdown-item-text">
                  {language === 'te' && teluguMap[item.name] ? teluguMap[item.name] : item.name}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
