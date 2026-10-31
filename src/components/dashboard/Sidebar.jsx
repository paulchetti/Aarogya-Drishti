import React from 'react';
import {
  LayoutDashboard,
  UserPlus,
  FileText,
  CalendarCheck,
  ClipboardList,
  Video,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  Activity
} from 'lucide-react';

export default function Sidebar({
  currentView,
  onNavigate,
  onLogout,
  onToggleCollapse,
  isCollapsed = false
}) {
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'intake', label: 'Patient Intake & Reg', icon: UserPlus, badge: 'New' },
    { id: 'ehr', label: 'EHR & Prescriptions', icon: FileText, badgeCount: 4 },
    { id: 'consultations', label: 'Consultations', icon: CalendarCheck, badgeCount: 3 },
    { id: 'questionnaire', label: 'Intake Questionnaire', icon: ClipboardList },
    { id: 'teleconsult', label: 'Teleconsult Suite', icon: Video, isLive: true },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand" onClick={() => onNavigate('overview')}>
          <div className="brand-icon-box">
            <Activity size={22} strokeWidth={2.4} />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-title">Aarogya</span>
            <span className="brand-subtitle">DRISHTI PORTAL</span>
          </div>
        </div>
        <button
          className="sidebar-toggle-btn"
          onClick={onToggleCollapse}
          title="Toggle Sidebar"
          aria-label="Toggle Navigation"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-section-label">Clinical Core</span>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="link-icon">
                <Icon size={19} />
              </span>
              <span className="link-text">{item.label}</span>

              {item.isLive && (
                <span className="badge-pill badge-live">LIVE</span>
              )}
              {item.badge && !item.isLive && (
                <span className="badge-pill badge-count">{item.badge}</span>
              )}
              {item.badgeCount && !item.isLive && (
                <span className="badge-pill badge-count">{item.badgeCount}</span>
              )}
            </button>
          );
        })}

        <span className="nav-section-label" style={{ marginTop: '24px' }}>System</span>
        <button
          className={`sidebar-link ${currentView === 'settings' ? 'active' : ''}`}
          onClick={() => onNavigate('settings')}
        >
          <span className="link-icon">
            <Settings size={19} />
          </span>
          <span className="link-text">Setting</span>
        </button>

        <button
          className={`sidebar-link ${currentView === 'help' ? 'active' : ''}`}
          onClick={() => onNavigate('help')}
        >
          <span className="link-icon">
            <HelpCircle size={19} />
          </span>
          <span className="link-text">Help & Center</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-link sidebar-logout" onClick={onLogout}>
          <span className="link-icon">
            <LogOut size={19} />
          </span>
          <span className="link-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}

