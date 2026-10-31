import React from 'react';

export default function Header() {
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
      <div className="secure-label">
        <span className="secure-dot"></span>
        SECURE HEALTHCARE PORTAL
      </div>
    </header>
  );
}
