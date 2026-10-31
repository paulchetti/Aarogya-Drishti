import React, { useState } from 'react';
import './patientPortal.css';
import {
  UserPlus,
  FileText,
  CalendarCheck,
  ClipboardList,
  Video,
  ArrowLeft,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Activity
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
          TOPBAR (Matches User Drawing: Circle Logo + Rectangle Box + Capsule)
          -------------------------------------------------------------------- */}
      <header className="patient-topbar">
        {/* Left: Keep logo here + Arogya Drishti box */}
        <div className="patient-brand-group">
          {/* Circular logo container */}
          <div
            className="patient-logo-circle"
            title="Aarogya Drishti Official Emblem"
            onClick={() => setActiveModule(null)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="/aarogya-logo.jpg"
              alt="Aarogya Drishti Official Logo"
              className="patient-logo-img"
            />
          </div>

          {/* Rectangular box: Arogya Drishti */}
          <div
            className="patient-brand-box"
            onClick={() => setActiveModule(null)}
            style={{ cursor: 'pointer' }}
          >
            <span className="patient-brand-title">Arogya Drishti</span>
            <span className="patient-brand-sub">Citizen Care Portal</span>
          </div>
        </div>

        {/* Right: Profile capsule (Profile pic + name) and actions */}
        <div className="patient-header-right">
          {/* Capsule */}
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
              <span className="patient-capsule-tag">● Citizen Portal</span>
            </div>
          </div>

          {/* Switch to Doctor Dashboard Button */}
          {onSwitchToDoctorDashboard && (
            <button
              className="patient-action-pill-btn"
              onClick={onSwitchToDoctorDashboard}
              title="Switch to Doctor & Clinical Dashboard"
            >
              <LayoutDashboard size={16} />
              <span>Doctor View</span>
            </button>
          )}

          {/* Logout */}
          <button
            className="patient-logout-btn"
            onClick={onLogout}
            title="Log out of citizen portal"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* --------------------------------------------------------------------
          MAIN BODY
          -------------------------------------------------------------------- */}
      <main className="patient-portal-main">
        {/* When NO feature is opened, show the exact 5-button layout from the sketch */}
        {!activeModule && (
          <div>
            <div className="patient-portal-hero-title">
              <Activity size={22} color="#7ee787" />
              <span>Select an Aarogya Drishti citizen healthcare service:</span>
            </div>

            <div className="patient-cards-layout">
              {/* ROW 1: 3 CARDS */}
              <div className="patient-cards-row-1">
                {/* 1. Patient Intake & Registration */}
                <div
                  className="patient-feature-card"
                  onClick={() => setActiveModule('intake')}
                >
                  <div className="patient-card-icon-badge">
                    <UserPlus size={22} />
                  </div>
                  <div className="patient-card-text">
                    Patient Intake &<br />Registration
                  </div>
                  <div className="patient-card-subtext">
                    ABHA Registration & Citizen Intake
                  </div>
                </div>

                {/* 2. EHR History & Active */}
                <div
                  className="patient-feature-card"
                  onClick={() => setActiveModule('ehr')}
                >
                  <div className="patient-card-icon-badge">
                    <FileText size={22} />
                  </div>
                  <div className="patient-card-text">
                    EHR History &<br />Active Prescriptions
                  </div>
                  <div className="patient-card-subtext">
                    Health Records & Active Medications
                  </div>
                </div>

                {/* 3. Scheduled Consultations */}
                <div
                  className="patient-feature-card"
                  onClick={() => setActiveModule('consultations')}
                >
                  <div className="patient-card-icon-badge">
                    <CalendarCheck size={22} />
                  </div>
                  <div className="patient-card-text">
                    Scheduled<br />Consultations
                  </div>
                  <div className="patient-card-subtext">
                    Doctor Appointments & Booking
                  </div>
                </div>
              </div>

              {/* ROW 2: 2 CARDS */}
              <div className="patient-cards-row-2">
                {/* 4. Clinical Intake Questionnaire & */}
                <div
                  className="patient-feature-card"
                  onClick={() => setActiveModule('questionnaire')}
                >
                  <div className="patient-card-icon-badge">
                    <ClipboardList size={22} />
                  </div>
                  <div className="patient-card-text">
                    Clinical Intake<br />Questionnaire & Triage
                  </div>
                  <div className="patient-card-subtext">
                    Pre-Consultation Symptom Assessment
                  </div>
                </div>

                {/* 5. Tele consult suite */}
                <div
                  className="patient-feature-card"
                  onClick={() => setActiveModule('teleconsult')}
                >
                  <div
                    className="patient-card-icon-badge"
                    style={{ background: 'rgba(239, 68, 68, 0.25)', color: '#f87171' }}
                  >
                    <Video size={22} />
                  </div>
                  <div className="patient-card-text">
                    Tele consult<br />suite
                  </div>
                  <div className="patient-card-subtext">
                    Live Video Consultation Room
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
