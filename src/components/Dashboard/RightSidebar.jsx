import React from 'react';
import {
  UserPlusIcon,
  CameraIcon,
  SearchIcon,
  CalendarIcon,
  AIIcon,
  ReportsIcon,
  HelpIcon,
  HeartPulseIcon,
} from '../Icons';

export default function RightSidebar({ onActionClick }) {
  return (
    <aside className="dash-right-col">
      {/* Hero Card: Misty Paderu Hills + Tribal Child smiling matching Source Image 2 */}
      <div className="early-detection-hero">
        <div className="hero-photo-layer">
          <img
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=85"
            alt="Rural community child"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=85";
            }}
          />
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

      {/* 4 Action Buttons - Single Line, Clean Spacing, Exact Match */}
      <div className="action-buttons-group">
        <button
          type="button"
          className="btn-action-hero orange-grad"
          onClick={() => onActionClick('register-patient')}
        >
          <div className="btn-left">
            <UserPlusIcon className="w-4 h-4" />
            <span>Register New Patient</span>
          </div>
          <span className="btn-chevron">›</span>
        </button>

        <button
          type="button"
          className="btn-action-hero teal-grad"
          onClick={() => onActionClick('start-screening')}
        >
          <div className="btn-left">
            <CameraIcon className="w-4 h-4" />
            <span>Start Screening</span>
          </div>
          <span className="btn-chevron">›</span>
        </button>

        <button
          type="button"
          className="btn-action-hero white-card"
          onClick={() => onActionClick('view-referrals')}
        >
          <div className="btn-left">
            <SearchIcon className="w-4 h-4" style={{ color: '#0d9488' }} />
            <span>View Referrals</span>
          </div>
          <span className="btn-chevron" style={{ color: '#94a3b8' }}>›</span>
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
          <span className="btn-chevron" style={{ color: '#94a3b8' }}>›</span>
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
            <div className="quick-link-icon-circle">
              <ReportsIcon className="w-4 h-4" />
            </div>
            <span>Reports</span>
          </button>

          <button
            type="button"
            className="quick-link-row"
            onClick={() => onActionClick('help')}
          >
            <div className="quick-link-icon-circle">
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
