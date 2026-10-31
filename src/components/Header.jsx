import React from 'react';

export default function Header({ onOpenDashboard }) {
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
          <button
            type="button"
            onClick={onOpenDashboard}
            style={{
              background: '#e6f4ea',
              color: '#137333',
              border: '1px solid #ceead6',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Open Dashboard →
          </button>
        )}
        <div className="secure-label">
          <span className="secure-dot"></span>
          SECURE HEALTHCARE PORTAL
        </div>
      </div>
    </header>
  );
}
