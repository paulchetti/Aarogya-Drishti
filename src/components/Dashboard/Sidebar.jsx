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

export default function Sidebar({ activeNav = 'Dashboard', onNavSelect }) {
  const navItems = [
    { name: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" /> },
    { name: 'Patient Registration', icon: <UserPlusIcon className="w-5 h-5" /> },
    { name: 'Medical History', icon: <HistoryIcon className="w-5 h-5" /> },
    { name: 'Oral Screening', icon: <CameraIcon className="w-5 h-5" /> },
    { name: 'Referrals & Follow-ups', icon: <ReferralIcon className="w-5 h-5" /> },
    { name: 'Appointments', icon: <CalendarIcon className="w-5 h-5" /> },
    { name: 'Reports', icon: <ReportsIcon className="w-5 h-5" /> },
    { name: 'AI Analysis', icon: <AIIcon className="w-5 h-5" /> },
    { name: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  return (
    <aside className="dash-sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.name}
            type="button"
            className={`nav-item ${activeNav === item.name ? 'active' : ''}`}
            onClick={() => onNavSelect(item.name)}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Decorative Tribal Village Illustration matching source image */}
      <div className="sidebar-footer-art">
        <div className="village-art-card">
          <svg viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a47" />
                <stop offset="60%" stopColor="#2c515d" />
                <stop offset="100%" stopColor="#436c7a" />
              </linearGradient>
              <linearGradient id="hillGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22424b" />
                <stop offset="100%" stopColor="#112930" />
              </linearGradient>
              <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#546538" />
                <stop offset="50%" stopColor="#3d4924" />
                <stop offset="100%" stopColor="#242e14" />
              </linearGradient>
            </defs>

            {/* Sky */}
            <rect width="200" height="110" fill="url(#skyGrad)" />

            {/* Distant Misty Blue Mountains */}
            <path d="M-10 65 Q 40 30 90 55 T 190 45 L 210 110 L -10 110 Z" fill="url(#hillGrad1)" opacity="0.6" />
            <path d="M30 65 Q 110 35 180 50 L 210 110 L 10 110 Z" fill="#132e35" opacity="0.8" />

            {/* Green Foreground Ground */}
            <path d="M-5 75 Q 80 62 205 70 L 205 110 L -5 110 Z" fill="url(#groundGrad)" />

            {/* Palm & Evergreen Trees */}
            <g opacity="0.9">
              {/* Left Palm tree */}
              <path d="M28 85 Q 26 50 35 32" stroke="#22180c" strokeWidth="2.5" />
              <path d="M35 32 Q 18 25 10 32" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
              <path d="M35 32 Q 22 18 20 12" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <path d="M35 32 Q 40 16 48 20" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
              <path d="M35 32 Q 48 28 52 38" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
              
              {/* Additional lush foliage */}
              <circle cx="16" cy="80" r="14" fill="#2d4a22" />
              <circle cx="48" cy="82" r="12" fill="#3b5e28" />
              <circle cx="175" cy="76" r="16" fill="#2d4a22" />
              <circle cx="190" cy="74" r="14" fill="#3b5e28" />
            </g>

            {/* Thatched Tribal Village Huts */}
            <g>
              {/* Main hut */}
              <rect x="68" y="72" width="42" height="24" fill="#e2d4b7" stroke="#3e2723" strokeWidth="0.8" />
              <path d="M60 72 L 89 50 L 118 72 Z" fill="#b45309" stroke="#78350f" strokeWidth="1" />
              <rect x="83" y="80" width="10" height="16" fill="#3e2723" />
              <rect x="73" y="76" width="6" height="6" fill="#fef3c7" stroke="#78350f" strokeWidth="0.5" />
              <rect x="99" y="76" width="6" height="6" fill="#fef3c7" stroke="#78350f" strokeWidth="0.5" />

              {/* Smaller right hut */}
              <rect x="122" y="74" width="30" height="20" fill="#d7c4a3" stroke="#3e2723" strokeWidth="0.8" />
              <path d="M116 74 L 137 57 L 158 74 Z" fill="#9a3412" stroke="#7c2d12" strokeWidth="1" />
              <rect x="133" y="80" width="8" height="14" fill="#2d1a10" />
            </g>
          </svg>
        </div>
        <div className="sidebar-slogan">
          Better Oral Health<br />
          for a Healthier Tomorrow
        </div>
      </div>
    </aside>
  );
}
