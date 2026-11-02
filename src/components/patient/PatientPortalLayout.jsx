import React, { useState } from 'react';
import './patientPortal.css';
import {
  ArrowLeft,
  ShieldCheck,
  UserCheck
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

  const handleStartTeleconsult = (pt) => {
    setTeleconsultPatient(pt);
    setActiveModule('teleconsult');
  };

  return (
    <div className="patient-portal-root">
      {/* --------------------------------------------------------------------
          CITIZEN DASHBOARD (100% Exact Replication of Reference Mockup)
          -------------------------------------------------------------------- */}
      {!activeModule ? (
        <div className="patient-dashboard-wrapper">
          <div className="patient-dashboard-exact">
            {/* The exact reference artwork replicating all buttons, typography, stethoscope, and background */}
            <img
              src="/patient-dashboard-ref.jpg"
              alt="Aarogya Drishti Citizen Care Portal Dashboard"
              className="patient-dashboard-base-img"
              draggable={false}
            />

            {/* Interactive Hotspots for Header Actions */}
            {/* 1. Logo & Brand Home Link */}
            <button
              className="hotspot-action hotspot-logo"
              onClick={() => setActiveModule(null)}
              title="Aarogya Drishti - Citizen Care Portal Home"
              aria-label="Aarogya Drishti Home"
            />

            {/* 2. Citizen Profile Capsule */}
            <div
              className="hotspot-action hotspot-profile"
              title="Citizen Rahul - Citizen Portal (Active)"
              aria-label="Citizen Profile"
            />

            {/* 3. Logout Button */}
            <button
              className="hotspot-action hotspot-logout"
              onClick={onLogout}
              title="Log out of Citizen Portal"
              aria-label="Logout"
            />

            {/* Interactive Hotspots for the 5 Service Buttons */}
            {/* Button 1: Patient Intake & Registration */}
            <button
              className="hotspot-card hotspot-card-intake"
              onClick={() => setActiveModule('intake')}
              title="Open Patient Intake & Registration (ABHA)"
              aria-label="Patient Intake & Registration"
            >
              <span className="hotspot-focus-ring" />
            </button>

            {/* Button 2: EHR History & Active Prescriptions */}
            <button
              className="hotspot-card hotspot-card-ehr"
              onClick={() => setActiveModule('ehr')}
              title="Open EHR History & Active Prescriptions"
              aria-label="EHR History & Active Prescriptions"
            >
              <span className="hotspot-focus-ring" />
            </button>

            {/* Button 3: Scheduled Consultations */}
            <button
              className="hotspot-card hotspot-card-consult"
              onClick={() => setActiveModule('consultations')}
              title="Open Scheduled Consultations & Doctor Booking"
              aria-label="Scheduled Consultations"
            >
              <span className="hotspot-focus-ring" />
            </button>

            {/* Button 4: Clinical Intake Questionnaire & Triage */}
            <button
              className="hotspot-card hotspot-card-questionnaire"
              onClick={() => setActiveModule('questionnaire')}
              title="Open Clinical Intake Questionnaire & Triage"
              aria-label="Clinical Intake Questionnaire & Triage"
            >
              <span className="hotspot-focus-ring" />
            </button>

            {/* Button 5: Tele consult suite */}
            <button
              className="hotspot-card hotspot-card-teleconsult"
              onClick={() => setActiveModule('teleconsult')}
              title="Open Teleconsultation Suite (Live Video Room)"
              aria-label="Tele consult suite"
            >
              <span className="hotspot-focus-ring" />
            </button>
          </div>
        </div>
      ) : (
        /* FOCUSED INTERACTIVE VIEW (When any feature is clicked) */
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
