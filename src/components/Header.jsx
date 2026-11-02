import React, { useState, useEffect, useRef } from 'react';

export default function Header({ onOpenDashboard }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const dashboardOptions = [
    {
      key: 'phc_dashboard',
      icon: '🏥',
      title: 'PHC Dashboard',
      subtitle: 'Primary Health Centre • Medical Officer Triage & EHR',
      badge: 'Clinical Ops',
      badgeColor: '#0d9488',
      badgeBg: '#ccfbf1',
    },
    {
      key: 'specialist_dashboard',
      icon: '🔬',
      title: 'Specialist Dashboard',
      subtitle: 'Oral Oncology • Teleconsultation Review & Biopsy Orders',
      badge: 'Tertiary Care',
      badgeColor: '#f97316',
      badgeBg: '#ffedd5',
    },
    {
      key: 'district_admin_dashboard',
      icon: '🏛️',
      title: 'District Administrator Dashboard',
      subtitle: 'DMHO • ITDA Paderu Tribal Health Mission & Mandals',
      badge: 'Public Health',
      badgeColor: '#2563eb',
      badgeBg: '#dbeafe',
    },
    {
      key: 'system_admin_dashboard',
      icon: '🛡️',
      title: 'System Administrator Dashboard',
      subtitle: 'ITDA Cloud • RBAC, Audit Event Logs & AI Telemetry',
      badge: 'Cyber & AI',
      badgeColor: '#7c3aed',
      badgeBg: '#ede9fe',
    },
    {
      key: 'anm_portal',
      icon: '👩‍⚕️',
      title: 'ANM / Village Health Worker Portal',
      subtitle: 'Sub-Centre & ASHA • Community Screening & Vitals',
      badge: 'Frontline Care',
      badgeColor: '#e11d48',
      badgeBg: '#ffe4e6',
    },
    {
      key: 'patient',
      icon: '👤',
      title: 'Citizen Care Portal',
      subtitle: 'Citizen Health Locker • Longitudinal ABHA Records',
      badge: 'Citizen Access',
      badgeColor: '#059669',
      badgeBg: '#d1fae5',
    },
  ];

  const handleSelect = (dashboardKey) => {
    setIsDropdownOpen(false);
    if (onOpenDashboard) {
      onOpenDashboard(dashboardKey);
    }
  };

  return (
    <header className="topbar">
      <a className="brand" href="#" aria-label="Aarogya Drishti home" onClick={(e) => e.preventDefault()}>
        <img
          src="/logo.png"
          alt="Aarogya Drishti Logo"
          style={{ width: '54px', height: '54px', objectFit: 'contain' }}
        />
        <span className="brand-copy">
          <strong>AAROGYA <b>DRISHTI</b></strong>
          <small>EARLY CARE. BETTER TOMORROWS.</small>
        </span>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {onOpenDashboard && (
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              style={{
                background: isDropdownOpen ? '#0d9488' : '#e6f4ea',
                color: isDropdownOpen ? '#ffffff' : '#137333',
                border: '1.5px solid #137333',
                borderRadius: '22px',
                padding: '7px 16px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isDropdownOpen
                  ? '0 4px 14px rgba(13, 148, 136, 0.3)'
                  : '0 2px 6px rgba(0,0,0,0.06)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>📊 Open Dashboard</span>
              <span style={{ fontSize: '0.7rem' }}>{isDropdownOpen ? '▲' : '▼'}</span>
            </button>

            {/* Dashboard Selector Dropdown Panel */}
            {isDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 10px)',
                  right: 0,
                  width: '360px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 18px 40px rgba(15, 23, 42, 0.18)',
                  border: '1.5px solid #e2e8f0',
                  padding: '12px',
                  zIndex: 1000,
                  animation: 'fadeIn 0.15s ease-out',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px 10px 10px',
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Select Dashboard / Portal
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#0d9488',
                      backgroundColor: '#ccfbf1',
                      padding: '2px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    Quick Access
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                  {dashboardOptions.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleSelect(opt.key)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '10px 12px',
                        borderRadius: '12px',
                        border: '1px solid transparent',
                        backgroundColor: '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        width: '100%',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.borderColor = '#cbd5e1';
                        e.currentTarget.style.transform = 'translateX(2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <div
                        style={{
                          fontSize: '1.25rem',
                          lineHeight: 1,
                          marginTop: '2px',
                          padding: '6px',
                          borderRadius: '10px',
                          backgroundColor: opt.badgeBg,
                        }}
                      >
                        {opt.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span
                            style={{
                              fontSize: '0.86rem',
                              fontWeight: 700,
                              color: '#0f172a',
                            }}
                          >
                            {opt.title}
                          </span>
                          <span
                            style={{
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              color: opt.badgeColor,
                              backgroundColor: opt.badgeBg,
                              padding: '2px 6px',
                              borderRadius: '6px',
                            }}
                          >
                            {opt.badge}
                          </span>
                        </div>
                        <p
                          style={{
                            margin: '3px 0 0 0',
                            fontSize: '0.72rem',
                            color: '#64748b',
                            lineHeight: 1.3,
                            whiteSpace: 'normal',
                          }}
                        >
                          {opt.subtitle}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="secure-label">
          <span className="secure-dot"></span>
          SECURE HEALTHCARE PORTAL
        </div>
      </div>
    </header>
  );
}
