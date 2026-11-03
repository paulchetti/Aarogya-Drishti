import React, { useState } from 'react';
import '../../styles/dashboard.css';
import DashboardNavbar from './DashboardNavbar';
import Sidebar from './Sidebar';
import WelcomeBanner from './WelcomeBanner';
import StatCards from './StatCards';
import ScreeningChart from './ScreeningChart';
import LesionDonutChart from './LesionDonutChart';
import RecentPatientsTable from './RecentPatientsTable';
import RightSidebar from './RightSidebar';
import PatientModal from './PatientModal';
import ScreeningModal from './ScreeningModal';
import AIChatBot from './AIChatBot';
import InitiateReferralModal from './InitiateReferralModal';
import TeleconsultationSuite from '../clinical/TeleconsultationSuite';
import { getAllPatients } from '../../services/referralRoutingService';

export default function PHCDashboard({ onToast, onSwitchDashboard, onLogout }) {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isScreeningModalOpen, setIsScreeningModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isTelehealthOpen, setIsTelehealthOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const defaultDemoPatient = getAllPatients().find((p) => p.id === 'ADP-2026-0046') || getAllPatients()[0];

  const handleNavSelect = (navName) => {
    setActiveNav(navName);
    if (navName === 'Direct / Walk-in Registration') {
      setIsPatientModalOpen(true);
    } else if (navName === 'Diagnostic & Triage Assessment') {
      setIsScreeningModalOpen(true);
    } else if (navName === 'Care Continuity Tracking' || navName === 'Inbound Referral Triage Queue') {
      setSelectedPatient(defaultDemoPatient);
      setIsReferralModalOpen(true);
    } else if (navName === 'Virtual Consultation Queue') {
      setSelectedPatient(defaultDemoPatient);
      setIsTelehealthOpen(true);
    } else if (onToast) {
      onToast(`Navigating to ${navName}`);
    }
  };

  const handleActionClick = (action) => {
    switch (action) {
      case 'direct-registration':
        setIsPatientModalOpen(true);
        break;
      case 'diagnostic-triage':
        setIsScreeningModalOpen(true);
        break;
      case 'initiate-referral':
        setSelectedPatient(defaultDemoPatient);
        setIsReferralModalOpen(true);
        break;
      case 'appointment-scheduling':
        if (onToast) onToast('Opening Appointment Scheduling & Slot Management...');
        break;
      case 'virtual-consultation-queue':
        setSelectedPatient(defaultDemoPatient);
        setIsTelehealthOpen(true);
        break;
      case 'facility-reports':
        if (onToast) onToast('Generating Facility Utilization & Clinical Reports...');
        break;
      case 'clinician-profile':
        if (onToast) onToast('Viewing Clinician Profile & Credentials for Dr. Sandeep Kumar...');
        break;
      default:
        break;
    }
  };

  const handlePatientSaved = (patient) => {
    if (onToast) onToast(`Registration complete for ${patient.name} (${patient.id})`);
  };

  const handleScreeningComplete = (action) => {
    if (action === 'refer') {
      setSelectedPatient(defaultDemoPatient);
      setIsReferralModalOpen(true);
      if (onToast) onToast('Opening Specialist Referral Form...');
    } else {
      if (onToast) onToast('Care Continuity Tracking: Follow-up scheduled.');
    }
  };

  return (
    <div className="dashboard-root">
      {/* Subtle Medical Caduceus Watermark in the background */}
      <div className="dashboard-watermark-bg" aria-hidden="true">
        <img
          src="/caduceus-watermark.png"
          alt="Medical Caduceus Watermark"
          className="watermark-img"
        />
      </div>

      {/* Top Navbar with clean logo in top left */}
      <DashboardNavbar
        dashboardTitle="PHC Dashboard"
        userName="Dr. Sandeep Kumar"
        userRole="PHC Medical Officer"
        notificationCount={3}
        onSwitchDashboard={onSwitchDashboard}
        onLogout={onLogout}
      />

      {/* Main Body Grid - 100% Full Display Width */}
      <div className="dash-main-layout full-display">
        {/* Top bar row below navbar: Menu toggle button directly BELOW the logo */}
        <div className="dash-top-menu-bar">
          <Sidebar
            activeNav={activeNav}
            onNavSelect={handleNavSelect}
            isMenuOpen={isMenuOpen}
            onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
            menuTitle="PHC Dashboard Options"
          />

          <div className="dash-facility-badge">
            <span className="badge-dot">●</span>
            <span>PHC Dashboard • ITDA Paderu Clinical Operations</span>
          </div>
        </div>

        {/* Central Canvas Area - Fills Full Display */}
        <main className="dash-content-canvas full-display">
          <div className="dash-center-col">
            {isTelehealthOpen ? (
              <div style={{ marginBottom: '24px' }}>
                <TeleconsultationSuite
                  patientData={selectedPatient || defaultDemoPatient}
                  currentUserRole="doctor"
                  onEndCall={() => setIsTelehealthOpen(false)}
                />
              </div>
            ) : (
              <>
                {/* Welcome Banner */}
                <WelcomeBanner doctorName="Dr. Sandeep Kumar" />

                {/* 4 Stat Metric Cards with Exact Bottom Colored Lines */}
                <StatCards />

                {/* Middle 2 Charts (Screening Overview + Lesion Types) */}
                <div className="charts-dual-row">
                  <ScreeningChart />
                  <LesionDonutChart />
                </div>

                {/* Recent Patients Table */}
                <RecentPatientsTable
                  onViewPatient={(p) => {
                    setSelectedPatient(p || defaultDemoPatient);
                    setIsReferralModalOpen(true);
                  }}
                />
              </>
            )}
          </div>

          {/* Right Action & Info Sidebar */}
          <RightSidebar onActionClick={handleActionClick} />
        </main>
      </div>

      {/* Footer with Bottom-Left Orange Wave and Copyright */}
      <footer className="dash-bottom-footer">
        <div className="footer-swoosh" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <strong>AAROGYA DRISHTI</strong> &nbsp;|&nbsp; PHC Dashboard
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          © 2025 AAROGYA DRISHTI. All rights reserved.
        </div>
      </footer>

      {/* Modals for actions */}
      <PatientModal
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        onSave={handlePatientSaved}
      />

      <ScreeningModal
        isOpen={isScreeningModalOpen}
        onClose={() => setIsScreeningModalOpen(false)}
        onComplete={handleScreeningComplete}
      />

      {/* Escalate Specialist Referral Modal */}
      <InitiateReferralModal
        isOpen={isReferralModalOpen}
        patient={selectedPatient || defaultDemoPatient}
        onClose={() => setIsReferralModalOpen(false)}
        onReferralCreated={(updated) => {
          setSelectedPatient(updated);
          if (onToast) onToast(`Referral issued to ${updated.referral?.destinationHospital}!`);
        }}
        onStartVideoCall={(pt) => {
          setSelectedPatient(pt);
          setIsTelehealthOpen(true);
        }}
      />

      {/* AI Clinical Copilot Chatbot */}
      <AIChatBot dashboardType="phc_dashboard" />
    </div>
  );
}
