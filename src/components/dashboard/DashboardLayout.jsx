import React, { useState } from 'react';
import './dashboard.css';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import DashboardOverview from './DashboardOverview';
import PatientIntakeView from './PatientIntakeView';
import EHRHistoryView from './EHRHistoryView';
import ScheduledConsultationsView from './ScheduledConsultationsView';
import ClinicalQuestionnaireView from './ClinicalQuestionnaireView';
import TeleconsultationSuite from './TeleconsultationSuite';
import PrescriptionModal from './PrescriptionModal';

export default function DashboardLayout({ user, onLogout, onSwitchToPatientPortal }) {
  const [currentView, setCurrentView] = useState('overview'); // 'overview' | 'intake' | 'ehr' | 'consultations' | 'questionnaire' | 'teleconsult' | 'settings' | 'help'
  const [activePatientForTeleconsult, setActivePatientForTeleconsult] = useState(null);
  const [selectedReportForModal, setSelectedReportForModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(
    user || {
      name: 'Dr. Andrew',
      fullName: 'Dr. Andrew Sharma',
      email: 'andrew.sharma@aarogyadrishti.in',
      role: 'doctor',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
    }
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Toggle user role between citizen and doctor/staff
  const handleRoleToggle = () => {
    setCurrentUser((prev) => ({
      ...prev,
      role: prev.role === 'citizen' ? 'doctor' : 'citizen',
      name: prev.role === 'citizen' ? 'Dr. Andrew' : 'Citizen Rahul'
    }));
  };

  // Launch Teleconsultation Suite directly
  const handleStartTeleconsult = (patient) => {
    setActivePatientForTeleconsult(patient);
    setCurrentView('teleconsult');
  };

  // Open Medical Report Modal
  const handleOpenReport = (patient) => {
    setSelectedReportForModal(patient);
  };

  return (
    <div className="dashboard-root">
      {/* Left Navigation Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={onLogout}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isCollapsed={isSidebarCollapsed}
      />

      {/* Main Wrapper */}
      <div className="main-wrapper">
        <TopNavbar
          user={currentUser}
          onRoleToggle={handleRoleToggle}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          onNavigate={setCurrentView}
          onSwitchToPatientPortal={onSwitchToPatientPortal}
        />

        {/* View Router */}
        {currentView === 'overview' && (
          <DashboardOverview
            onNavigate={setCurrentView}
            onStartTeleconsult={handleStartTeleconsult}
            onOpenReport={handleOpenReport}
          />
        )}

        {currentView === 'intake' && (
          <PatientIntakeView
            onStartTeleconsult={handleStartTeleconsult}
          />
        )}

        {currentView === 'ehr' && (
          <EHRHistoryView
            onOpenPrescription={(rx) => setSelectedReportForModal(rx)}
          />
        )}

        {currentView === 'consultations' && (
          <ScheduledConsultationsView
            onStartTeleconsult={handleStartTeleconsult}
          />
        )}

        {currentView === 'questionnaire' && (
          <ClinicalQuestionnaireView
            onStartTeleconsult={handleStartTeleconsult}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'teleconsult' && (
          <TeleconsultationSuite
            patientData={activePatientForTeleconsult}
            onEndCall={() => setCurrentView('overview')}
            onOpenRx={(rx) => setSelectedReportForModal(rx)}
          />
        )}

        {/* Settings View */}
        {currentView === 'settings' && (
          <div className="dashboard-content-area feature-view-container">
            <div className="feature-header">
              <div className="feature-header-left">
                <h1>Account & Portal Settings</h1>
                <p>Manage your profile, ABHA credentials, notification preferences, and privacy.</p>
              </div>
            </div>
            <div className="form-card">
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem' }}>{currentUser.name}</h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{currentUser.email}</div>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: '6px',
                      fontSize: '0.75rem',
                      background: '#d1fae5',
                      color: '#065f46',
                      padding: '2px 10px',
                      borderRadius: '12px',
                      fontWeight: 700
                    }}
                  >
                    Verified Role: {currentUser.role.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={currentUser.email}
                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button className="btn-primary" onClick={() => alert('Settings saved successfully!')}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help & Support View */}
        {currentView === 'help' && (
          <div className="dashboard-content-area feature-view-container">
            <div className="feature-header">
              <div className="feature-header-left">
                <h1>Aarogya Drishti Help & Center</h1>
                <p>24x7 Citizen Healthcare Helpline & Telemedicine Support.</p>
              </div>
            </div>
            <div className="form-card">
              <h3 style={{ margin: '0 0 12px' }}>Emergency Healthcare Helpline</h3>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6' }}>
                For medical emergencies, call national emergency toll-free <strong>108</strong> or <strong>102</strong>.<br />
                For ABDM & Aarogya Drishti technical assistance, call <strong>1800-11-4477</strong> (Toll Free).
              </p>
              <button className="btn-primary" style={{ marginTop: '16px' }} onClick={() => setCurrentView('overview')}>
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Prescription / Report Modal */}
      {selectedReportForModal && (
        <PrescriptionModal
          patient={selectedReportForModal}
          onClose={() => setSelectedReportForModal(null)}
        />
      )}
    </div>
  );
}
