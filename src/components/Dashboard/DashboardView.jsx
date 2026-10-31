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
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isScreeningModalOpen, setIsScreeningModalOpen] = useState(false);

  const handleNavSelect = (navName) => {
    setActiveNav(navName);
    if (navName === 'Patient Registration') {
      setIsPatientModalOpen(true);
    } else if (navName === 'Oral Screening') {
      setIsScreeningModalOpen(true);
    } else if (onToast) {
      onToast(`Viewing ${navName}`);
    }
  };

  const handleActionClick = (action) => {
    switch (action) {
      case 'register-patient':
        setIsPatientModalOpen(true);
        break;
      case 'start-screening':
        setIsScreeningModalOpen(true);
        break;
      case 'view-referrals':
        if (onToast) onToast('Opening Specialist Referral Queue for Paderu District Hospital...');
        break;
      case 'check-appointments':
        if (onToast) onToast('Loading Upcoming Telemedicine & Clinic Appointments...');
        break;
      case 'ai-analysis':
        setIsScreeningModalOpen(true);
        break;
      case 'reports':
        if (onToast) onToast('Exporting Screening & Lesion Analysis Report (PDF/Excel)...');
        break;
      case 'help':
        if (onToast) onToast('Aarogya Drishti Helpline: 1800-425-4252 (ITDA Paderu Cell)');
        break;
      default:
        break;
    }
  };

  const handlePatientSaved = (patient) => {
    if (onToast) onToast(`Patient ${patient.name} (${patient.id}) registered successfully!`);
  };

  const handleScreeningComplete = (action) => {
    if (action === 'refer') {
      if (onToast) onToast('Urgent Specialist Referral dispatched to Paderu Area Hospital!');
    } else {
      if (onToast) onToast('Routine Follow-up scheduled in 30 days.');
    }
  };

  return (
    <div className="dashboard-root">
      {/* Top Navbar */}
      <DashboardNavbar notificationCount={3} />

      {/* Main Body Grid */}
      <div className="dash-main-layout">
        {/* Left Sidebar */}
        <Sidebar activeNav={activeNav} onNavSelect={handleNavSelect} />

        {/* Central Canvas Area */}
        <main className="dash-content-canvas">
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
          <strong>AAROGYA DRISHTI</strong> &nbsp;|&nbsp; AI Assisted Oral Health Screening Platform
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
