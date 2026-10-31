import React from 'react';

export default function WelcomeBanner({ doctorName = 'Dr. Sandeep Kumar' }) {
  return (
    <div className="welcome-card">
      <div className="welcome-text">
        <h2>Welcome Back,</h2>
        <h1>{doctorName}</h1>
        <p>Together for early detection and better oral health.</p>
      </div>

      {/* Oral clinical examination photographic artwork fading into the background */}
      <div className="welcome-photo-bg">
        <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="photoMask" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="skinGlow" cx="70%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#fed7aa" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background patient face / clinic lighting */}
          <rect x="0" y="0" width="320" height="120" fill="url(#skinGlow)" />

          {/* Patient lips & teeth examination */}
          <path d="M190 35 Q 240 20 280 40 Q 250 65 190 55 Z" fill="#f43f5e" opacity="0.45" />
          <path d="M200 42 Q 240 32 270 44 Q 240 54 200 48 Z" fill="#ffffff" opacity="0.9" />
          <path d="M190 55 Q 240 68 280 50 Q 240 85 190 65 Z" fill="#e11d48" opacity="0.4" />

          {/* Dental examination mirror with stainless steel handle */}
          <path d="M110 95 L 215 50" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="225" cy="46" rx="14" ry="11" fill="#e2e8f0" stroke="#64748b" strokeWidth="3" transform="rotate(-15 225 46)" />
          <ellipse cx="225" cy="46" rx="11" ry="8" fill="#bae6fd" opacity="0.75" transform="rotate(-15 225 46)" />
          <line x1="220" y1="42" x2="230" y2="50" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

          {/* Doctor's gloved hand (soft medical blue/cyan) */}
          <path d="M90 120 C 110 85, 140 80, 160 95 C 180 110, 160 120, 140 120 Z" fill="#38bdf8" opacity="0.5" />
          <path d="M130 95 C 145 75, 175 75, 195 90 C 180 105, 150 110, 130 95 Z" fill="#0284c7" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
