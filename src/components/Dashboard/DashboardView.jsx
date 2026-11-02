import React, { useState } from 'react';
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
import '../../styles/dashboard.css';

export default function DashboardView({ onToast }) {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isScreeningModalOpen, setIsScreeningModalOpen] = useState(false);

  const handleNavSelect = (navName) => {
    setActiveNav(navName);
    if (navName === 'Direct / Walk-in Registration') {
      setIsPatientModalOpen(true);
    } else if (navName === 'Diagnostic & Triage Assessment') {
      setIsScreeningModalOpen(true);
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
        if (onToast) onToast('Initiating Referral Request to Area Hospital / Oncology Specialist...');
        break;
      case 'appointment-scheduling':
        if (onToast) onToast('Opening Appointment Scheduling & Slot Management...');
        break;
      case 'virtual-consultation-queue':
        if (onToast) onToast('Loading Virtual Consultation Queue (3 Pending Clinician Reviews)...');
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
      if (onToast) onToast('Initiated Outbound Referral Request to Area Hospital!');
    } else {
      if (onToast) onToast('Care Continuity Tracking: Follow-up scheduled.');
    }
  };

  return (
    <div className="dashboard-root">
      {/* Top Navbar with clean logo in top left */}
      <DashboardNavbar notificationCount={3} />

      {/* Main Body Grid - 100% Full Display Width */}
      <div className="dash-main-layout full-display">
        {/* Top bar row below navbar: Menu toggle button directly BELOW the logo */}
        <div className="dash-top-menu-bar">
          <Sidebar
            activeNav={activeNav}
            onNavSelect={handleNavSelect}
            isMenuOpen={isMenuOpen}
            onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
          />

          <div className="dash-facility-badge">
            <span className="badge-dot">●</span>
            <span>PHC Paderu Clinical Operations & Diagnostic Portal</span>
          </div>
        </div>

        {/* Central Canvas Area - Fills Full Display */}
        <main className="dash-content-canvas full-display">
          <div className="dash-center-col">
            {/* Welcome Banner with Doctor & Dental Examination Background */}
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
                if (p && onToast) onToast(`Opening records for ${p.name} (${p.id})`);
                else if (onToast) onToast('Viewing all longitudinal records...');
              }}
            />
          </div>

          {/* Right Action & Info Sidebar */}
          <RightSidebar onActionClick={handleActionClick} />
        </main>
      </div>

      {/* Footer with Bottom-Left Orange Wave and Copyright */}
      <footer className="dash-bottom-footer">
        <div className="footer-swoosh" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <strong>AAROGYA DRISHTI</strong> &nbsp;|&nbsp; Primary Health Centre (PHC) / Medical Officer Dashboard
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
    </div>
  );
}
