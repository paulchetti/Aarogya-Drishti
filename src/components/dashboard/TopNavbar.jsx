import React, { useState } from 'react';
import { Search, Calendar, Bell, ChevronDown, Check, UserCheck, Shield, LayoutGrid } from 'lucide-react';

export default function TopNavbar({
  user,
  onRoleToggle,
  onSearch,
  searchQuery,
  onNavigate,
  onSwitchToPatientPortal
}) {
  const [showMonthMenu, setShowMonthMenu] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('November 2025');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Teleconsultation Scheduled', time: '10 mins ago', unread: true },
    { id: 2, title: 'New Lab Report: Lipid Profile Uploaded', time: '1 hour ago', unread: true },
    { id: 3, title: 'Prescription Refill Approved: Metformin', time: 'Yesterday', unread: false }
  ];

  const months = ['November 2025', 'October 2025', 'September 2025', 'All Time'];

  return (
    <header className="top-navbar">
      <div className="nav-welcome">
        <span className="welcome-kicker">Welcome back</span>
        <h2 className="welcome-name">
          {user?.name || 'Dr. Andrew'} <span role="img" aria-label="wave">👋</span>
        </h2>
      </div>

      <div className="nav-actions">
        {/* Switch to Patient Portal Layout Button */}
        {onSwitchToPatientPortal && (
          <button
            className="role-switch-btn"
            style={{
              background: '#0f3b4f',
              color: '#ffffff',
              borderColor: '#23789f',
              boxShadow: '0 2px 8px rgba(15, 59, 79, 0.25)'
            }}
            onClick={onSwitchToPatientPortal}
            title="Switch to the 5-button Patient Portal Layout"
          >
            <LayoutGrid size={14} color="#7ee787" />
            <span>Patient Portal Layout</span>
          </button>
        )}

        {/* Global Search */}
        <div className="search-box">
          <span className="search-icon-wrap">
            <Search size={17} />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search patients, EHR, doctors..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Month Filter Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className="month-filter-btn"
            onClick={() => setShowMonthMenu(!showMonthMenu)}
          >
            <Calendar size={15} color="#0d9488" />
            <span>{selectedPeriod}</span>
            <ChevronDown size={14} />
          </button>

          {showMonthMenu && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                padding: '6px',
                minWidth: '170px',
                zIndex: 60
              }}
            >
              {months.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setSelectedPeriod(m);
                    setShowMonthMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8px 12px',
                    border: 'none',
                    background: selectedPeriod === m ? '#f0fdf4' : 'transparent',
                    color: selectedPeriod === m ? '#166534' : '#334155',
                    fontSize: '0.85rem',
                    fontWeight: selectedPeriod === m ? 600 : 400,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {m}
                  {selectedPeriod === m && <Check size={14} color="#166534" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            className="icon-btn"
            title="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={18} />
            <span className="notification-dot" />
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                padding: '16px',
                width: '300px',
                zIndex: 60
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <strong style={{ fontSize: '0.9rem' }}>Notifications</strong>
                <span style={{ fontSize: '0.75rem', color: '#0d9488', fontWeight: 600 }}>Mark all read</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '10px',
                      background: n.unread ? '#f0fdfa' : '#f8fafc',
                      borderLeft: n.unread ? '3px solid #0d9488' : '3px solid #cbd5e1'
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b' }}>{n.title}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Role Switcher Pill */}
        <button
          className="role-switch-btn"
          onClick={onRoleToggle}
          title="Click to toggle between Citizen & Doctor view"
        >
          <UserCheck size={14} />
          <span>Role: <strong>{user?.role === 'citizen' ? 'Citizen' : 'Doctor / Staff'}</strong></span>
        </button>

        {/* Profile Pill */}
        <div className="user-profile-pill" onClick={() => onNavigate('settings')}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'}
            alt="User Avatar"
            className="user-avatar"
          />
          <div className="user-meta-wrap">
            <div className="user-meta-name">{user?.name || 'Dr. Andrew'}</div>
            <div className="user-meta-role">
              {user?.role === 'citizen' ? 'ABHA Verified' : 'Chief Consultant'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
