import React from 'react';

export default function WelcomeBanner({ doctorName = 'Dr. Sandeep Kumar' }) {
  return (
    <div className="welcome-card">
      <div className="welcome-text">
        <h2>Welcome Back,</h2>
        <h1>{doctorName}</h1>
        <p>Together for early detection and better oral health.</p>
      </div>

      <div className="welcome-art-bg">
        <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="120" cy="45" rx="35" ry="25" fill="#38bdf8" opacity="0.15" />
          <path d="M70 45 C 90 20, 110 20, 140 45" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M75 50 C 95 65, 115 65, 135 50" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          {/* Dental mirror icon */}
          <line x1="30" y1="20" x2="80" y2="55" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="85" cy="58" r="9" stroke="#64748b" strokeWidth="2.5" fill="#e2e8f0" />
        </svg>
      </div>
    </div>
  );
}
