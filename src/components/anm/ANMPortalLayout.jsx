import React, { useState } from 'react';
import '../citizen/citizenPortal.css';
import {
  Activity,
  HeartPulse,
  CreditCard,
  Video,
  PackageCheck,
  ArrowLeft,
  LogOut,
  ChevronRight,
  Shield,
  LayoutGrid
} from 'lucide-react';
import ANMNCDScreeningView from './ANMNCDScreeningView';
import ANMMaternalChildView from './ANMMaternalChildView';
import ANMABHAFamilyRegisterView from './ANMABHAFamilyRegisterView';
import ANMTeleconsultReferralView from './ANMTeleconsultReferralView';
import ANMMedicineStockView from './ANMMedicineStockView';
import TeleconsultationSuite from '../clinical/TeleconsultationSuite';

export default function ANMPortalLayout({
  user,
  onLogout,
  onSwitchToDoctorDashboard,
  onSwitchToCitizenPortal
}) {
  const [activeModule, setActiveModule] = useState(null); 
  // null = dashboard grid, or 'screening' | 'maternal' | 'abha' | 'teleconsult' | 'stock' | 'live_teleconsult'
  const [teleconsultPatient, setTeleconsultPatient] = useState(null);

  const workerName = user?.name || 'ANM Lakshmi Devi';
  const workerAvatar =
    user?.avatar ||
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80';

  const handleStartTeleconsult = (pt) => {
    setTeleconsultPatient(pt);
    setActiveModule('live_teleconsult');
  };

  return (
    <div className="patient-portal-root">
      {/* --------------------------------------------------------------------
          AUTHENTIC BACKGROUND VECTOR ELEMENTS (Strictly in Background z-index: 0)
          -------------------------------------------------------------------- */}
      <div className="portal-decor-bg-layer" aria-hidden="true">
        {/* 1. Top-Left Vibrant Cyan/Blue Curved Wave Swoosh */}
        <svg
          className="portal-decor-top-left"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="portalTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#004cd4" />
              <stop offset="45%" stopColor="#006ef5" />
              <stop offset="85%" stopColor="#00aaff" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="portalTopRim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0,0 L 290,0 C 235,70 160,160 85,225 C 40,265 0,300 0,300 Z"
            fill="url(#portalTopGrad)"
          />
          <path
            d="M 0,0 L 305,0 C 248,76 170,170 90,238 C 42,280 0,315 0,315 Z"
            fill="none"
            stroke="url(#portalTopRim)"
            strokeWidth="2.5"
          />
        </svg>

        {/* 2. Top-Right Cyan/Blue Halftone Dot Matrix Pattern */}
        <svg
          className="portal-decor-top-right"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[...Array(9)].map((_, r) =>
            [...Array(9)].map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={40 + c * 22}
                cy={15 + r * 22}
                r={2.2}
                fill="#0284c7"
                opacity={Math.max(0.04, ((c + 1) * (9 - r)) / 95)}
              />
            ))
          )}
        </svg>

        {/* 3. Bottom Wave Swooshes (Orange Wave + Deep Navy Blue Wave) */}
        <svg
          className="portal-decor-bottom-waves"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="portalOrangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff7a00" />
              <stop offset="55%" stopColor="#ff6500" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <linearGradient id="portalNavyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00266e" />
              <stop offset="50%" stopColor="#001847" />
              <stop offset="100%" stopColor="#040e22" />
            </linearGradient>
            <linearGradient id="portalCyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#005ce6" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M 0,180 L 0,110 C 65,120 120,150 160,180 Z" fill="url(#portalCyanGrad)" />
          <path
            d="M 500,180 C 660,180 770,75 1040,36 C 1190,14 1310,46 1440,82 L 1440,180 Z"
            fill="url(#portalOrangeGrad)"
          />
          <path
            d="M 680,180 C 820,180 930,95 1160,68 C 1280,52 1360,82 1440,108 L 1440,180 Z"
            fill="url(#portalNavyGrad)"
          />
        </svg>
      </div>

      {/* --------------------------------------------------------------------
          PORTAL MAIN CONTENT CONTAINER
          -------------------------------------------------------------------- */}
      {!activeModule ? (
        <div className="patient-content-container">
          {/* 1. TOPBAR: Floating white pill header */}
          <header className="patient-topbar">
            {/* Left: Round Logo + Brand Title */}
            <div
              className="patient-brand-group"
              onClick={() => setActiveModule(null)}
              style={{ cursor: 'pointer' }}
              title="Aarogya Drishti Home"
            >
              <div className="patient-logo-circle">
                <img
                  src="/logo.png"
                  alt="Aarogya Drishti Official Logo"
                  className="patient-logo-img"
                  onError={(e) => {
                    e.currentTarget.src = '/aarogya-logo.jpg';
                  }}
                />
              </div>
              <div className="patient-brand-box">
                <span className="patient-brand-title">
                  Arogya <span className="brand-orange">Drishti</span>
                </span>
                <span className="patient-brand-sub">ANM &amp; VILLAGE HEALTH WORKER PORTAL</span>
              </div>
            </div>

            {/* Right: Worker Profile + Switchers + Logout */}
            <div className="patient-header-right">
              <div className="patient-profile-capsule">
                <div className="patient-capsule-pic-wrap">
                  <img
                    src={workerAvatar}
                    alt={workerName}
                    className="patient-capsule-pic"
                  />
                </div>
                <div className="patient-capsule-info">
                  <span className="patient-capsule-name">{workerName}</span>
                  <span className="patient-capsule-tag">
                    <span className="tag-dot">●</span> ANM Field Worker | Paderu
                  </span>
                </div>
              </div>

              {onSwitchToDoctorDashboard && (
                <button
                  className="patient-logout-btn"
                  onClick={onSwitchToDoctorDashboard}
                  title="Open Primary Health Centre (PHC) / Medical Officer Dashboard"
                  style={{
                    background: '#0d9488',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    padding: '6px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <span>🏥 PHC Dashboard</span>
                </button>
              )}

              {onSwitchToCitizenPortal && (
                <button
                  className="patient-logout-btn"
                  onClick={onSwitchToCitizenPortal}
                  title="Switch to Citizen Care Portal"
                  style={{
                    background: '#0052cc',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    padding: '6px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <span>👤 Citizen Portal</span>
                </button>
              )}

              <button
                className="patient-logout-btn"
                onClick={onLogout}
                title="Log out of ANM portal"
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          </header>

          {/* 2. ROYAL BLUE SERVICE SELECTION BANNER */}
          <div className="patient-service-banner">
            <div className="patient-banner-pulse-badge">
              <Activity size={18} strokeWidth={2.4} />
            </div>
            <span className="patient-banner-text">
              Select an Aarogya Drishti frontline village health service:
            </span>
          </div>

          {/* 3. THE 5 SERVICE ACTION CARDS GRID (3 columns x 2 rows) */}
          <div className="patient-cards-grid">
            {/* ROW 1: CARD 1 - Household NCD & Vitals Screening */}
            <div
              className="patient-feature-card card-intake"
              onClick={() => setActiveModule('screening')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-orange">
                <Activity size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  Village Household &amp;<br />NCD Screening
                </div>
                <div className="patient-card-subtitle">
                  BP, Blood Sugar, Vitals &amp; Oral Screen
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* ROW 1: CARD 2 - Maternal & Child Health (ANC/PNC) */}
            <div
              className="patient-feature-card card-ehr"
              onClick={() => setActiveModule('maternal')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-blue">
                <HeartPulse size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  Maternal &amp; Child<br />Health (ANC / PNC)
                </div>
                <div className="patient-card-subtitle">
                  High-Risk Pregnancies &amp; Immunization
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* ROW 1: CARD 3 - Village ABHA ID & Family Health Folder */}
            <div
              className="patient-feature-card card-consult"
              onClick={() => setActiveModule('abha')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-green">
                <CreditCard size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  Village ABHA ID &amp;<br />Family Health Folder
                </div>
                <div className="patient-card-subtitle">
                  Digital ABHA Generation &amp; Roster
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* ROW 2: CARD 4 - Field Teleconsult & PHC Referral */}
            <div
              className="patient-feature-card card-questionnaire"
              onClick={() => setActiveModule('teleconsult')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-purple">
                <Video size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  Field Teleconsult &amp;<br />PHC Referral
                </div>
                <div className="patient-card-subtitle">
                  Connect Patient to Medical Officer Live
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* ROW 2: CARD 5 - Medicine Kit & Diagnostic Stock */}
            <div
              className="patient-feature-card card-teleconsult"
              onClick={() => setActiveModule('stock')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-coral">
                <PackageCheck size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  Medicine Kit &amp;<br />Diagnostic Stock
                </div>
                <div className="patient-card-subtitle">
                  Rapid Test Strips, IFA &amp; ORS Inventory
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* ROW 2: COLUMN 3 - Community Hero Card (Matching Citizen Portal) */}
            <div
              className="patient-consult-hero-card"
              title="Aarogya Drishti Frontline Field Care - Sub-Centre Paderu"
              onClick={() => setActiveModule('screening')}
              style={{ cursor: 'pointer' }}
            >
              <img
                src="/doctor-patient-consult.jpg"
                alt="ANM Frontline Health Worker examining village patient"
                className="patient-consult-hero-img"
              />
              <div className="patient-consult-hero-overlay">
                <span className="patient-consult-hero-badge">
                  <span className="consult-badge-dot">●</span>
                  <span>Sub-Centre Paderu: 34 Screened Today</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* --------------------------------------------------------------------
            FOCUSED INTERACTIVE VIEW (When any feature is clicked)
            -------------------------------------------------------------------- */
        <div className="patient-focused-container">
          <div className="patient-focused-header">
            <button
              className="patient-back-btn"
              onClick={() => setActiveModule(null)}
              title="Return to ANM Portal Home"
            >
              <ArrowLeft size={16} />
              <span>← Back to ANM Portal</span>
            </button>

            <div className="patient-focused-title-badge">
              {activeModule === 'screening' && 'Village Household & NCD Screening'}
              {activeModule === 'maternal' && 'Maternal & Child Health (ANC/PNC & Immunization)'}
              {activeModule === 'abha' && 'Village ABHA ID Generation & Family Health Folders'}
              {activeModule === 'teleconsult' && 'Field Teleconsultation & Doctor Referral Queue'}
              {activeModule === 'stock' && 'Field Medicine Kit & Diagnostic Stock Inventory'}
              {activeModule === 'live_teleconsult' && 'Live Video Teleconsultation Suite'}
            </div>

            <div className="patient-focused-actions">
              <span className="patient-status-indicator">● Active Village Session (Sub-Centre Paderu)</span>
            </div>
          </div>

          <div className="patient-focused-body">
            {activeModule === 'screening' && (
              <ANMNCDScreeningView onStartTeleconsult={handleStartTeleconsult} />
            )}

            {activeModule === 'maternal' && (
              <ANMMaternalChildView onStartTeleconsult={handleStartTeleconsult} />
            )}

            {activeModule === 'abha' && (
              <ANMABHAFamilyRegisterView />
            )}

            {activeModule === 'teleconsult' && (
              <ANMTeleconsultReferralView onStartTeleconsult={handleStartTeleconsult} />
            )}

            {activeModule === 'stock' && (
              <ANMMedicineStockView />
            )}

            {activeModule === 'live_teleconsult' && (
              <TeleconsultationSuite
                patientData={teleconsultPatient}
                onEndCall={() => setActiveModule('teleconsult')}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
