import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthCard from './components/AuthCard';
import Toast from './components/Toast';
import DashboardLayout from './components/clinical/DashboardLayout';
import DashboardView from './components/Dashboard/DashboardView';
import PatientPortalLayout from './components/patient/PatientPortalLayout';

export default function App() {
  const [mode, setMode] = useState('login');
  const [user, setUser] = useState({
    name: 'Dr. Sandeep Kumar',
    fullName: 'Dr. Sandeep Kumar',
    email: 'dr.sandeep@phc.aarogyadrishti.in',
    role: 'doctor',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
  });
  // Default directly to PHC Medical Officer Dashboard
  const [viewMode, setViewMode] = useState('phc_dashboard'); // 'phc_dashboard' | 'patient' | 'doctor'
  const [toast, setToast] = useState({ message: '', visible: false });
  const toastTimerRef = useRef(null);

  useEffect(() => {
    document.title = 'Aarogya Drishti | Primary Health Centre (PHC) Dashboard';

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = '/logo.png?v=' + Date.now();
  }, []);

  const showToast = (message) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ message, visible: true });
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
  };

  const handleRegisterSubmit = (data) => {
    const newCitizen = {
      name: data.name || 'Citizen User',
      fullName: data.name || 'Citizen User',
      email: data.email || 'citizen@aarogyadrishti.in',
      role: 'citizen',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };
    setUser(newCitizen);
    setViewMode('patient');
    showToast(`Welcome ${newCitizen.name}! Opening your patient portal.`);
  };

  const handleLoginSubmit = (data) => {
    const extractedName = data.name || (data.email ? data.email.split('@')[0] : 'Dr. Sandeep Kumar');
    const role = data.role || (data.email?.includes('doctor') ? 'doctor' : 'citizen');
    const loggedUser = {
      name: extractedName.charAt(0).toUpperCase() + extractedName.slice(1),
      fullName: extractedName,
      email: data.email || 'dr.sandeep@phc.aarogyadrishti.in',
      role: role,
      avatar: role === 'doctor'
        ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };
    setUser(loggedUser);
    setViewMode(role === 'doctor' ? 'phc_dashboard' : 'patient');
    showToast(`Welcome back ${loggedUser.name}! Opening PHC Medical Officer Dashboard.`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('You have been logged out securely.');
  };

  const handleForgotPassword = () => {
    showToast('Password recovery link sent to your registered email or ABHA mobile.');
  };

  const handleSocialClick = (provider) => {
    showToast(`${provider} sign-in: Authenticating with ABHA Digital Locker...`);
    setUser({
      name: 'Dr. Sandeep Kumar',
      email: `dr.sandeep.${provider.toLowerCase()}@abdm.gov.in`,
      role: 'doctor',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
    });
    setViewMode('phc_dashboard');
  };

  const handleHelpClick = () => {
    showToast('Aarogya Drishti 24x7 PHC Healthcare Helpline: 1800-11-4477');
  };

  // If citizen/doctor is logged in:
  if (user) {
    // 1. PRIMARY HEALTH CENTRE (PHC) / MEDICAL OFFICER DASHBOARD
    if (viewMode === 'phc_dashboard' || viewMode === 'oral_screening') {
      return (
        <div style={{ position: 'relative' }}>
          {/* Quick Floating Portal Switcher */}
          <div
            style={{
              position: 'fixed',
              bottom: '18px',
              right: '20px',
              zIndex: 999,
              display: 'flex',
              gap: '8px',
            }}
          >
            <button
              onClick={() => setViewMode('patient')}
              style={{
                background: '#ffffff',
                color: '#0d9488',
                border: '1.5px solid #0d9488',
                padding: '8px 16px',
                borderRadius: '20px',
                fontWeight: 700,
                fontSize: '11.5px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              👤 Switch to Patient Portal
            </button>
          </div>

          <DashboardView onToast={showToast} />
          <Toast message={toast.message} visible={toast.visible} />
        </div>
      );
    }

    // 2. PATIENT / CITIZEN PORTAL
    if (viewMode === 'patient') {
      return (
        <>
          <PatientPortalLayout
            user={user}
            onLogout={handleLogout}
            onSwitchToDoctorDashboard={() => setViewMode('phc_dashboard')}
          />
          <Toast message={toast.message} visible={toast.visible} />
        </>
      );
    }

    // 3. CLINICAL TELECONSULTATION SUITE
    return (
      <>
        <DashboardLayout
          user={user}
          onLogout={handleLogout}
          onSwitchToPatientPortal={() => setViewMode('patient')}
        />
        <Toast message={toast.message} visible={toast.visible} />
      </>
    );
  }

  // Otherwise show login/register authentication page
  return (
    <main className="page-shell">
      <Header
        onOpenDashboard={() => {
          setUser({
            name: 'Dr. Sandeep Kumar',
            fullName: 'Dr. Sandeep Kumar',
            email: 'dr.sandeep@phc.aarogyadrishti.in',
            role: 'doctor',
            avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
          });
          setViewMode('phc_dashboard');
        }}
      />

      <AuthCard
        mode={mode}
        onSwitchMode={setMode}
        onRegisterSubmit={handleRegisterSubmit}
        onLoginSubmit={handleLoginSubmit}
        onForgotPassword={handleForgotPassword}
        onSocialClick={handleSocialClick}
      />

      <Footer onHelpClick={handleHelpClick} />

      <Toast message={toast.message} visible={toast.visible} />
    </main>
  );
}
