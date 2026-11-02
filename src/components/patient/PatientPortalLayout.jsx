import React, { useState } from 'react';
import './patientPortal.css';
import {
  UserPlus,
  FileText,
  CalendarCheck,
  ClipboardList,
  Video,
  ArrowLeft,
  LogOut,
  Activity,
  ChevronRight,
  LayoutDashboard,
  ShieldCheck
} from 'lucide-react';
import PatientIntakeView from '../clinical/PatientIntakeView';
import EHRHistoryView from '../clinical/EHRHistoryView';
import ScheduledConsultationsView from '../clinical/ScheduledConsultationsView';
import ClinicalQuestionnaireView from '../clinical/ClinicalQuestionnaireView';
import TeleconsultationSuite from '../clinical/TeleconsultationSuite';

export default function PatientPortalLayout({
  user,
  onLogout,
  onSwitchToDoctorDashboard
}) {
  const [activeModule, setActiveModule] = useState(null); // null = show 5 buttons, or 'intake' | 'ehr' | 'consultations' | 'questionnaire' | 'teleconsult'
  const [teleconsultPatient, setTeleconsultPatient] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const patientName = user?.name || 'Citizen Rahul';
  const patientAvatar =
    user?.avatar ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';

  const handleStartTeleconsult = (pt) => {
    setTeleconsultPatient(pt);
    setActiveModule('teleconsult');
  };

  return (
    <div className="patient-portal-root">
      {/* --------------------------------------------------------------------
          AUTHENTIC BACKGROUND ASSETS (Directly extracted from reference)
          -------------------------------------------------------------------- */}

      {/* Top-Left Royal Blue Wave */}
      <img
        src="/decor-top-left.png"
        alt="Top Left Wave Accent"
        className="bg-decor-top-left"
      />

      {/* Top-Right Halftone Dot Matrix */}
      <img
        src="/decor-top-right.png"
        alt="Top Right Halftone Dots"
        className="bg-decor-top-right"
      />

      {/* Bottom-Right Navy & Orange Ribbons with Medical Stethoscope */}
      <img
        src="/decor-stethoscope.png"
        alt="Bottom Right Ribbons and Stethoscope"
        className="bg-decor-bottom-right"
      />

      {/* Faint Wave Line Contours in Center */}
      <svg
        className="bg-decor-contours"
        viewBox="0 0 1400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-50 200 C 200 160, 400 240, 650 190 C 900 140, 1150 250, 1450 180"
          stroke="#0052cc"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <path
          d="M-50 260 C 250 210, 480 300, 720 250 C 960 200, 1200 310, 1450 240"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />
        <path
          d="M-50 320 C 220 280, 520 360, 800 310 C 1080 260, 1250 350, 1450 300"
          stroke="#ff7a00"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
      </svg>

      {/* --------------------------------------------------------------------
          TOPBAR (Floating White Rounded Capsule Container)
          -------------------------------------------------------------------- */}
      <header className="patient-topbar">
        {/* Left: Circular Logo with Cyan Ring + Arogya Drishti Text */}
        <div
          className="patient-brand-group"
          onClick={() => setActiveModule(null)}
          title="Return to Home"
        >
          {/* Circular logo container with glowing cyan ring */}
          <div className="patient-logo-circle">
            <img
              src="/aarogya-logo.jpg"
              alt="Aarogya Drishti Official Logo"
              className="patient-logo-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/logo.png';
              }}
            />
          </div>

          {/* Brand Box: Arogya Drishti (Navy & Orange) + CITIZEN CARE PORTAL */}
          <div className="patient-brand-box">
            <span className="patient-brand-title">
              Arogya <span className="title-orange">Drishti</span>
            </span>
            <span className="patient-brand-sub">CITIZEN CARE PORTAL</span>
          </div>
        </div>

        {/* Right: Profile capsule (Profile pic + name) and Logout */}
        <div className="patient-header-right">
          {/* User Profile Capsule (Clickable for menu) */}
          <div
            className="patient-profile-capsule"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="Profile & Settings"
          >
            <div className="patient-capsule-pic-wrap">
              <img
                src={patientAvatar}
                alt={patientName}
                className="patient-capsule-pic"
              />
            </div>
            <div className="patient-capsule-info">
              <span className="patient-capsule-name">{patientName}</span>
              <span className="patient-capsule-tag">
                <span style={{ fontSize: '10px' }}>●</span> Citizen Portal
              </span>
            </div>
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="profile-dropdown-menu">
              {onSwitchToDoctorDashboard && (
                <button
                  className="profile-dropdown-item"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onSwitchToDoctorDashboard();
                  }}
                >
                  <LayoutDashboard size={15} />
                  <span>Switch to Doctor View</span>
                </button>
              )}
              <div
                style={{
                  fontSize: '0.72rem',
                  color: '#94a3b8',
                  padding: '4px 14px',
                  borderTop: '1px solid #f1f5f9',
                  marginTop: '4px'
                }}
              >
                ABHA ID: 91-4829-1029-4501
              </div>
            </div>
          )}

          {/* Logout Button (Soft Salmon/Pink Pill) */}
          <button
            className="patient-logout-btn"
            onClick={onLogout}
            title="Log out of citizen portal"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* --------------------------------------------------------------------
          MAIN BODY
          -------------------------------------------------------------------- */}
      <main className="patient-portal-main">
        {/* When NO feature is opened, show the exact 5-button layout from the image */}
        {!activeModule && (
          <div>
            {/* Royal Blue Stadium Banner */}
            <div className="patient-portal-hero-title">
              <span className="patient-hero-pulse-badge">
                <Activity size={20} strokeWidth={2.4} />
              </span>
              <span>Select an Aarogya Drishti citizen healthcare service:</span>
            </div>

            <div className="patient-cards-layout">
              {/* ROW 1: 3 CARDS */}
              <div className="patient-cards-row-1">
                {/* 1. Patient Intake & Registration (Warm Orange) */}
                <div
                  className="patient-feature-card card-intake"
                  onClick={() => setActiveModule('intake')}
                >
                  <div className="card-left-group">
                    <div className="patient-card-icon-badge badge-intake">
                      <UserPlus size={24} strokeWidth={2.2} />
                    </div>
                    <div className="card-text-block">
                      <div className="patient-card-text">
                        Patient Intake &<br />Registration
                      </div>
                      <div className="patient-card-subtext">
                        ABHA Registration & Citizen Intake
                      </div>
                    </div>
                  </div>
                  <div className="card-right-arrow">
                    <ChevronRight size={17} strokeWidth={2.4} />
                  </div>
                </div>

                {/* 2. EHR History & Active Prescriptions (Royal Blue) */}
                <div
                  className="patient-feature-card card-ehr"
                  onClick={() => setActiveModule('ehr')}
                >
                  <div className="card-left-group">
                    <div className="patient-card-icon-badge badge-ehr">
                      <FileText size={24} strokeWidth={2.2} />
                    </div>
                    <div className="card-text-block">
                      <div className="patient-card-text">
                        EHR History &<br />Active Prescriptions
                      </div>
                      <div className="patient-card-subtext">
                        Health Records & Active Medications
                      </div>
                    </div>
                  </div>
                  <div className="card-right-arrow">
                    <ChevronRight size={17} strokeWidth={2.4} />
                  </div>
                </div>

                {/* 3. Scheduled Consultations (Emerald Green) */}
                <div
                  className="patient-feature-card card-consult"
                  onClick={() => setActiveModule('consultations')}
                >
                  <div className="card-left-group">
                    <div className="patient-card-icon-badge badge-consult">
                      <CalendarCheck size={24} strokeWidth={2.2} />
                    </div>
                    <div className="card-text-block">
                      <div className="patient-card-text">
                        Scheduled<br />Consultations
                      </div>
                      <div className="patient-card-subtext">
                        Doctor Appointments & Booking
                      </div>
                    </div>
                  </div>
                  <div className="card-right-arrow">
                    <ChevronRight size={17} strokeWidth={2.4} />
                  </div>
                </div>
              </div>

              {/* ROW 2: 2 CARDS */}
              <div className="patient-cards-row-2">
                {/* 4. Clinical Intake Questionnaire & Triage (Royal Purple) */}
                <div
                  className="patient-feature-card card-questionnaire"
                  onClick={() => setActiveModule('questionnaire')}
                >
                  <div className="card-left-group">
                    <div className="patient-card-icon-badge badge-questionnaire">
                      <ClipboardList size={24} strokeWidth={2.2} />
                    </div>
                    <div className="card-text-block">
                      <div className="patient-card-text">
                        Clinical Intake<br />Questionnaire & Triage
                      </div>
                      <div className="patient-card-subtext">
                        Pre-Consultation Symptom Assessment
                      </div>
                    </div>
                  </div>
                  <div className="card-right-arrow">
                    <ChevronRight size={17} strokeWidth={2.4} />
                  </div>
                </div>

                {/* 5. Tele consult suite (Coral Orange) */}
                <div
                  className="patient-feature-card card-teleconsult"
                  onClick={() => setActiveModule('teleconsult')}
                >
                  <div className="card-left-group">
                    <div className="patient-card-icon-badge badge-teleconsult">
                      <Video size={24} strokeWidth={2.2} />
                    </div>
                    <div className="card-text-block">
                      <div className="patient-card-text">
                        Tele consult<br />suite
                      </div>
                      <div className="patient-card-subtext">
                        Live Video Consultation Room
                      </div>
                    </div>
                  </div>
                  <div className="card-right-arrow">
                    <ChevronRight size={17} strokeWidth={2.4} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* When a feature is clicked, show it inside the patient-focused container with a Back Button */}
        {activeModule && (
          <div className="patient-focused-view-wrapper">
            <div className="patient-focused-nav">
              <button
                className="patient-back-btn"
                onClick={() => setActiveModule(null)}
              >
                <ArrowLeft size={16} />
                <span>← Back to Patient Portal</span>
              </button>

              <div className="patient-focused-title">
                {activeModule === 'intake' && 'Patient Intake & Registration'}
                {activeModule === 'ehr' && 'EHR History & Active Prescriptions'}
                {activeModule === 'consultations' && 'Scheduled Consultations'}
                {activeModule === 'questionnaire' && 'Clinical Intake Questionnaire'}
                {activeModule === 'teleconsult' && 'Teleconsultation Suite'}
              </div>

              <div style={{ width: '100px' }} />
            </div>

            {/* Feature Modules */}
            {activeModule === 'intake' && (
              <PatientIntakeView onStartTeleconsult={handleStartTeleconsult} />
            )}

            {activeModule === 'ehr' && <EHRHistoryView />}

            {activeModule === 'consultations' && (
              <ScheduledConsultationsView onStartTeleconsult={handleStartTeleconsult} />
            )}

            {activeModule === 'questionnaire' && (
              <ClinicalQuestionnaireView
                onStartTeleconsult={handleStartTeleconsult}
                onNavigate={(view) => setActiveModule(view)}
              />
            )}

            {activeModule === 'teleconsult' && (
              <TeleconsultationSuite
                patientData={teleconsultPatient}
                onEndCall={() => setActiveModule(null)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
