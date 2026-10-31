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

export default function DashboardView({ onLogout, onToast }) {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [lang, setLang] = useState('EN');
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isScreeningModalOpen, setIsScreeningModalOpen] = useState(false);

  const handleToggleLang = () => {
    const nextLang = lang === 'EN' ? 'TE' : 'EN';
    setLang(nextLang);
    onToast(
      nextLang === 'TE'
        ? 'భాష తెలుగుకు మార్చబడింది (ITDA Paderu Tribal Health Mode)'
        : 'Language switched to English'
    );
  };

  const handleNavSelect = (navName) => {
    setActiveNav(navName);
    if (navName === 'Patient Registration') {
      setIsPatientModalOpen(true);
    } else if (navName === 'Oral Screening') {
      setIsScreeningModalOpen(true);
    } else {
      onToast(`Navigated to ${navName}`);
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
        onToast('Opening Specialist Referral Queue for ITDA Paderu District Hospital...');
        break;
      case 'check-appointments':
        onToast('Viewing upcoming Telemedicine & In-person clinic appointments...');
        break;
      case 'ai-analysis':
        setIsScreeningModalOpen(true);
        break;
      case 'reports':
        onToast('Generating District Health & Screening Overview Report (PDF/Excel)...');
        break;
      case 'help':
        onToast('Connecting to ITDA Paderu Tele-oncology Support Helpline...');
        break;
      default:
        break;
    }
  };

  const handlePatientSaved = (patient) => {
    onToast(`Patient ${patient.name} (${patient.id}) registered successfully!`);
  };

  const handleScreeningComplete = (action) => {
    if (action === 'refer') {
      onToast('Urgent Specialist Referral dispatched to Paderu Area Hospital!');
    } else {
      onToast('Screening documented. Follow-up logged in 30 days.');
    }
  };

  return (
    <div className="dashboard-root">
      {/* Top Navbar */}
      <DashboardNavbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onLogout={onLogout}
        notificationCount={3}
      />

      {/* Main Body Grid */}
      <div className="dash-main-layout">
        {/* Left Sidebar */}
        <Sidebar activeNav={activeNav} onNavSelect={handleNavSelect} />

        {/* Central Canvas Area */}
        <main className="dash-content-canvas">
          <div className="dash-center-col">
            {/* Welcome Banner */}
            <WelcomeBanner doctorName="Dr. Sandeep Kumar" />

            {/* 4 Stat Metric Cards */}
            <StatCards />

            {/* Middle 2 Charts */}
            <div className="charts-dual-row">
              <ScreeningChart />
              <LesionDonutChart />
            </div>

            {/* Recent Patients Table */}
            <RecentPatientsTable
              onViewPatient={(p) => {
                if (p) onToast(`Viewing clinical record for ${p.name} (${p.id})`);
                else onToast('Opening complete longitudinal patient directory...');
              }}
            />
          </div>

          {/* Right Action & Info Sidebar */}
          <RightSidebar onActionClick={handleActionClick} />
        </main>
      </div>

      {/* Footer */}
      <footer className="dash-bottom-footer">
        <div>
          <strong>AAROGYA DRISHTI</strong> | AI Assisted Oral Health Screening Platform
        </div>
        <div>© 2025 AAROGYA DRISHTI. All rights reserved.</div>
      </footer>

      {/* Modals */}
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
