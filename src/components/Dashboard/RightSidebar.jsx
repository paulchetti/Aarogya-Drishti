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
      {/* Hero Promotion Card */}
      <div className="early-detection-hero">
        <div
          className="hero-bg-overlay"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.4) 0%, transparent 60%), linear-gradient(135deg, #0f766e 0%, #042f2e 100%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.8px',
              marginBottom: '8px',
              textTransform: 'uppercase',
            }}
          >
            Tribal Outreach
          </div>
          <h3>
            Early Detection <br />
            <span style={{ color: '#fed7aa' }}>Saves Lives</span>
          </h3>
          <p>Connecting Rural Communities to Specialist Care in ITDA Paderu</p>
        </div>
      </div>

      {/* 4 Action Buttons */}
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
            <CalendarIcon className="w-4 h-4" />
            <span>Check Appointments</span>
          </div>
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Links */}
      <div className="quick-links-card">
        <h4>Quick Links</h4>
        <div className="quick-links-list">
          <button
            type="button"
            className="quick-link-row"
            onClick={() => onActionClick('ai-analysis')}
          >
            <div className="quick-link-icon">
              <AIIcon className="w-4 h-4" />
            </div>
            <span>AI Analysis</span>
          </button>

          <button
            type="button"
            className="quick-link-row"
            onClick={() => onActionClick('reports')}
          >
            <div className="quick-link-icon" style={{ color: '#0284c7' }}>
              <ReportsIcon className="w-4 h-4" />
            </div>
            <span>Reports</span>
          </button>

          <button
            type="button"
            className="quick-link-row"
            onClick={() => onActionClick('help')}
          >
            <div className="quick-link-icon" style={{ color: '#ea580c' }}>
              <HelpIcon className="w-4 h-4" />
            </div>
            <span>Help & Support</span>
          </button>
        </div>
      </div>

      {/* Healthy Smiles Promo */}
      <div className="healthy-smiles-card">
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
