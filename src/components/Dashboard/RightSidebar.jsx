import React from 'react';
import {
  UserPlusIcon,
  CameraIcon,
  SearchIcon,
  CalendarIcon,
  ChevronRightIcon,
  AIIcon,
  ReportsIcon,
  HelpIcon,
  HeartPulseIcon,
} from '../Icons';

export default function RightSidebar({ onActionClick }) {
  return (
    <aside className="dash-right-col">
      {/* Hero Promotion Card matching source image (Misty Hills + Tribal Child) */}
      <div className="early-detection-hero">
        <div className="hero-photo-layer">
          <svg viewBox="0 0 260 185" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="mistSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="40%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="hillBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a5f" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Sky & Mist */}
            <rect width="260" height="185" fill="url(#mistSky)" />

            {/* Lush Misty Blue Hills of Paderu & Araku */}
            <path d="M-20 90 Q 60 25 140 60 T 280 40 L 280 185 L -20 185 Z" fill="#0f4c5c" opacity="0.75" />
            <path d="M-10 110 Q 70 55 160 85 T 280 70 L 280 185 L -10 185 Z" fill="#0d5c4b" opacity="0.85" />
            <path d="M0 130 Q 90 85 190 115 T 280 100 L 280 185 L 0 185 Z" fill="#064e3b" />

            {/* Child Profile with traditional headband on the right */}
            <g transform="translate(160, 50)">
              {/* Head & neck silhouette */}
              <ellipse cx="60" cy="55" rx="36" ry="42" fill="#8c5837" />
              <ellipse cx="56" cy="58" rx="28" ry="32" fill="#a46d47" />
              {/* Smiling lips */}
              <path d="M38 72 Q 46 80 56 74" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              {/* Bright joyful eyes */}
              <ellipse cx="44" cy="52" rx="4" ry="4" fill="#18181b" />
              <circle cx="45" cy="51" r="1.5" fill="#ffffff" />
              {/* Colorful tribal beaded headband */}
              <path d="M30 42 Q 60 26 95 38" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
              <path d="M32 44 Q 60 28 93 40" stroke="#facc15" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M35 34 Q 65 18 96 30" stroke="#dc2626" strokeWidth="3" />
            </g>
          </svg>
        </div>

        <div className="hero-gradient-overlay" />

        <div className="hero-content">
          <h3>
            Early Detection <br />
            <span>Saves Lives</span>
          </h3>
          <p>Connecting Rural Communities to Specialist Care</p>
        </div>
      </div>

      {/* 4 Action Buttons matching exact layout and colors */}
      <div className="action-buttons-group">
        <button
          type="button"
          className="btn-action-hero orange-grad"
          onClick={() => onActionClick('register-patient')}
        >
          <div className="btn-left">
            <UserPlusIcon className="w-5 h-5" />
            <span>Register New Patient</span>
          </div>
          <ChevronRightIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          className="btn-action-hero teal-grad"
          onClick={() => onActionClick('start-screening')}
        >
          <div className="btn-left">
            <CameraIcon className="w-5 h-5" />
            <span>Start Screening</span>
          </div>
          <ChevronRightIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          className="btn-action-hero white-card"
          onClick={() => onActionClick('view-referrals')}
        >
          <div className="btn-left">
            <SearchIcon className="w-4 h-4" />
            <span>View Referrals</span>
          </div>
          <ChevronRightIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          className="btn-action-hero white-card"
          onClick={() => onActionClick('check-appointments')}
        >
          <div className="btn-left">
            <CalendarIcon className="w-4 h-4" style={{ color: '#ea580c' }} />
            <span>Check Appointments</span>
          </div>
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Links Card */}
      <div className="quick-links-card">
        <h4>Quick Links</h4>
        <div className="quick-links-list">
          <button
            type="button"
            className="quick-link-row"
            onClick={() => onActionClick('ai-analysis')}
          >
            <div className="quick-link-icon-circle">
              <AIIcon className="w-4 h-4" />
            </div>
            <span>AI Analysis</span>
          </button>

          <button
            type="button"
            className="quick-link-row"
            onClick={() => onActionClick('reports')}
          >
            <div className="quick-link-icon-circle" style={{ color: '#0d9488' }}>
              <ReportsIcon className="w-4 h-4" />
            </div>
            <span>Reports</span>
          </button>

          <button
            type="button"
            className="quick-link-row"
            onClick={() => onActionClick('help')}
          >
            <div className="quick-link-icon-circle" style={{ color: '#0d9488' }}>
              <HelpIcon className="w-4 h-4" />
            </div>
            <span>Help & Support</span>
          </button>
        </div>
      </div>

      {/* Healthy Smiles Promo Card */}
      <div className="healthy-smiles-card">
        <div className="smiles-bg-wave" />
        <div className="smiles-icon-box">
          <HeartPulseIcon className="w-5 h-5" />
        </div>
        <div className="smiles-text">
          <strong>Healthy Smiles</strong>
          <span>Stronger Communities</span>
        </div>
      </div>
    </aside>
  );
}
