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
  ChevronRight
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
  const [activeModule, setActiveModule] = useState(null); // null = dashboard, or 'intake' | 'ehr' | 'consultations' | 'questionnaire' | 'teleconsult'
  const [teleconsultPatient, setTeleconsultPatient] = useState(null);

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
          PORTAL MAIN CONTAINER
          -------------------------------------------------------------------- */}
      {!activeModule ? (
        <div className="patient-dashboard-frame">
          {/* Authentic Artwork Backdrop Layer */}
          <div className="patient-art-backdrop" />

          {/* 1. TOPBAR: Matching exact floating white pill */}
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
                    // Fallback if logo.png fails
                    e.currentTarget.src = '/aarogya-logo.jpg';
                  }}
                />
              </div>
              <div className="patient-brand-box">
                <span className="patient-brand-title">
                  Arogya <span className="brand-orange">Drishti</span>
                </span>
                <span className="patient-brand-sub">CITIZEN CARE PORTAL</span>
              </div>
            </div>

            {/* Right: Citizen Profile + Logout Button */}
            <div className="patient-header-right">
              <div className="patient-profile-capsule">
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
                    <span className="tag-dot">●</span> Citizen Portal
                  </span>
                </div>
              </div>

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

          {/* 2. BLUE SERVICE SELECTION BANNER */}
          <div className="patient-service-banner">
            <div className="patient-banner-pulse-badge">
              <Activity size={18} strokeWidth={2.4} />
            </div>
            <span className="patient-banner-text">
              Select an Aarogya Drishti citizen healthcare service:
            </span>
          </div>

          {/* 3. THE 5 SERVICE ACTION CARDS (3 columns x 2 rows) */}
          <div className="patient-cards-grid">
            {/* ROW 1: CARD 1 - Patient Intake & Registration */}
            <div
              className="patient-feature-card card-intake"
              onClick={() => setActiveModule('intake')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-orange">
                <UserPlus size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  Patient Intake &amp;<br />Registration
                </div>
                <div className="patient-card-subtitle">
                  ABHA Registration &amp; Citizen Intake
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* ROW 1: CARD 2 - EHR History & Active Prescriptions */}
            <div
              className="patient-feature-card card-ehr"
              onClick={() => setActiveModule('ehr')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-blue">
                <FileText size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  EHR History &amp;<br />Active Prescriptions
                </div>
                <div className="patient-card-subtitle">
                  Health Records &amp; Active Medications
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* ROW 1: CARD 3 - Scheduled Consultations */}
            <div
              className="patient-feature-card card-consult"
              onClick={() => setActiveModule('consultations')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-green">
                <CalendarCheck size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  Scheduled<br />Consultations
                </div>
                <div className="patient-card-subtitle">
                  Doctor Appointments &amp; Booking
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* ROW 2: CARD 4 - Clinical Intake Questionnaire & Triage */}
            <div
              className="patient-feature-card card-questionnaire"
              onClick={() => setActiveModule('questionnaire')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-purple">
                <ClipboardList size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  Clinical Intake<br />Questionnaire &amp; Triage
                </div>
                <div className="patient-card-subtitle">
                  Pre-Consultation Symptom Assessment
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* ROW 2: CARD 5 - Tele consult suite */}
            <div
              className="patient-feature-card card-teleconsult"
              onClick={() => setActiveModule('teleconsult')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-coral">
                <Video size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  Tele consult<br />suite
                </div>
                <div className="patient-card-subtitle">
                  Live Video Consultation Room
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* ROW 2: COLUMN 3 (EMPTY SLOT) - Where stethoscope & waves shine through */}
            <div className="patient-grid-stethoscope-slot" aria-hidden="true" />
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
              title="Return to Citizen Portal Home"
            >
              <ArrowLeft size={16} />
              <span>← Back to Patient Portal</span>
            </button>

            <div className="patient-focused-title-badge">
              {activeModule === 'intake' && 'Patient Intake & Registration (ABHA)'}
              {activeModule === 'ehr' && 'EHR History & Active Prescriptions'}
              {activeModule === 'consultations' && 'Scheduled Consultations'}
              {activeModule === 'questionnaire' && 'Clinical Intake Questionnaire & Triage'}
              {activeModule === 'teleconsult' && 'Teleconsultation Suite'}
            </div>

            <div className="patient-focused-actions">
              <span className="patient-status-indicator">● Active Session</span>
            </div>
          </div>

          <div className="patient-focused-body">
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
        </div>
      )}
    </div>
  );
}
