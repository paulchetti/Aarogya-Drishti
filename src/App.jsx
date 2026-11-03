import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthCard from './components/AuthCard';
import Toast from './components/Toast';
import DashboardLayout from './components/clinical/DashboardLayout';
import PHCDashboard from './components/Dashboard/PHCDashboard';
import SpecialistDashboard from './components/Dashboard/SpecialistDashboard';
import DistrictAdminDashboard from './components/Dashboard/DistrictAdminDashboard';
import SystemAdminDashboard from './components/Dashboard/SystemAdminDashboard';
import CitizenPortalLayout from './components/citizen/CitizenPortalLayout';
import ANMPortalLayout from './components/anm/ANMPortalLayout';

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
  const [viewMode, setViewMode] = useState('phc_dashboard'); 
  // 'phc_dashboard' | 'specialist_dashboard' | 'district_admin_dashboard' | 'system_admin_dashboard' | 'anm_portal' | 'patient' | 'doctor'
  const [toast, setToast] = useState({ message: '', visible: false });
  const toastTimerRef = useRef(null);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    let title = 'Aarogya Drishti | Primary Health Centre (PHC) Dashboard';
    if (viewMode === 'specialist_dashboard') {
      title = 'Aarogya Drishti | Specialist Dashboard (Oral Oncology)';
    } else if (viewMode === 'district_admin_dashboard') {
      title = 'Aarogya Drishti | District Administrator Dashboard (DMHO)';
    } else if (viewMode === 'system_admin_dashboard') {
      title = 'Aarogya Drishti | System Administrator Dashboard (Security & IT)';
    } else if (viewMode === 'anm_portal') {
      title = 'Aarogya Drishti | ANM & Village Health Worker Portal';
    } else if (viewMode === 'patient') {
      title = 'Aarogya Drishti | Citizen Care Portal';
    }
    document.title = title;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = '/logo.png?v=' + Date.now();
  }, [viewMode]);

  // Direct role & teleconsultation routing from URL query params (e.g. invite links)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get('role');
      if (roleParam === 'specialist') {
        handleSwitchDashboard('specialist_dashboard');
      } else if (roleParam === 'patient') {
        handleSwitchDashboard('patient');
      } else if (roleParam === 'anm') {
        handleSwitchDashboard('anm_portal');
      } else if (roleParam === 'doctor' || roleParam === 'phc') {
        handleSwitchDashboard('phc_dashboard');
      }
    } catch (e) {
      console.warn('URL param parse error:', e);
    }
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

  const handleSwitchDashboard = (targetMode) => {
    if (targetMode === 'specialist_dashboard') {
      setUser({
        name: 'Dr. Ananya Varma, MD',
        fullName: 'Dr. Ananya Varma, MD',
        email: 'dr.ananya@oncology.areahosp.gov.in',
        role: 'specialist',
        avatar: 'https://images.unsplash.com/photo-1594824813583-36603a110a11?auto=format&fit=crop&w=120&q=80',
      });
      setViewMode('specialist_dashboard');
      showToast('Opened Specialist Dashboard (Oral Oncology & Teleconsultation Review)');
    } else if (targetMode === 'district_admin_dashboard') {
      setUser({
        name: 'Dr. K. Venkateswara Rao',
        fullName: 'Dr. K. Venkateswara Rao, MBBS, MD',
        email: 'dmho.paderu@hmfw.ap.gov.in',
        role: 'district_admin',
        avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=120&q=80',
      });
      setViewMode('district_admin_dashboard');
      showToast('Opened District Administrator Dashboard (DMHO ITDA Paderu)');
    } else if (targetMode === 'system_admin_dashboard') {
      setUser({
        name: 'S. Ramakrishna',
        fullName: 'S. Ramakrishna, M.Tech',
        email: 'sysadmin.cloud@itda.ap.gov.in',
        role: 'system_admin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      });
      setViewMode('system_admin_dashboard');
      showToast('Opened System Administrator Dashboard (Security & AI Telemetry)');
    } else if (targetMode === 'anm_portal') {
      setUser({
        name: 'ANM Lakshmi Devi',
        fullName: 'Lakshmi Devi, GNM',
        email: 'lakshmi.anm@paderu.hfw.gov.in',
        role: 'anm',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      });
      setViewMode('anm_portal');
      showToast('Opened ANM & Village Health Worker Portal (Sub-Centre Paderu)');
    } else if (targetMode === 'patient') {
      setUser({
        name: 'Citizen Rahul',
        fullName: 'Citizen Rahul Sharma',
        email: 'rahul.citizen@aarogyadrishti.in',
        role: 'citizen',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      });
      setViewMode('patient');
      showToast('Opened Citizen Care Portal');
    } else {
      setUser({
        name: 'Dr. Sandeep Kumar',
        fullName: 'Dr. Sandeep Kumar',
        email: 'dr.sandeep@phc.aarogyadrishti.in',
        role: 'doctor',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      });
      setViewMode('phc_dashboard');
      showToast('Opened PHC Medical Officer Dashboard');
    }
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
    showToast(`Welcome ${newCitizen.name}! Opening your Citizen Portal.`);
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

  // Reusable Floating Switcher component for all views
  const renderFloatingSwitcher = () => (
    <div
      style={{
        position: 'fixed',
        bottom: '18px',
        left: '20px',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        background: '#ffffff',
        padding: '6px 12px',
        borderRadius: '30px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        border: '1.5px solid #0d9488',
        gap: '8px',
      }}
    >
      <button
        type="button"
        onClick={toggleLanguage}
        style={{
          background: language === 'te' ? '#ffedd5' : '#eff6ff',
          color: language === 'te' ? '#c2410c' : '#0052cc',
          border: `1.5px solid ${language === 'te' ? '#f97316' : '#93c5fd'}`,
          borderRadius: '16px',
          padding: '4px 10px',
          fontSize: '11px',
          fontWeight: 800,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.06)',
          transition: 'all 0.15s ease',
        }}
        title="Switch language between English and Telugu"
      >
        <span>🌐</span>
        <span>{language === 'te' ? 'తెలుగు (Active)' : 'English | తెలుగు'}</span>
      </button>

      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase' }}>
        {language === 'te' ? 'పోర్టల్:' : 'Portal:'}
      </span>
      {[
        { key: 'phc_dashboard', label: language === 'te' ? '🏥 పీహెచ్‌సీ' : '🏥 PHC' },
        { key: 'specialist_dashboard', label: language === 'te' ? '🔬 స్పెషలిస్ట్' : '🔬 Specialist' },
        { key: 'district_admin_dashboard', label: language === 'te' ? '🏛️ జిల్లా అడ్మిన్' : '🏛️ District Admin' },
        { key: 'system_admin_dashboard', label: language === 'te' ? '🛡️ సిస్టమ్ అడ్మిన్' : '🛡️ System Admin' },
        { key: 'anm_portal', label: language === 'te' ? '👩‍⚕️ ఏఎన్‌ఎం / ఫీల్డ్' : '👩‍⚕️ ANM / Field' },
        { key: 'patient', label: language === 'te' ? '👤 పౌరుడు' : '👤 Citizen' },
      ].map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleSwitchDashboard(tab.key)}
          style={{
            background: viewMode === tab.key ? '#0d9488' : 'transparent',
            color: viewMode === tab.key ? '#ffffff' : '#334155',
            border: 'none',
            borderRadius: '16px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          {tab.label}
        </button>
      ))}
      <button
        onClick={handleLogout}
        title="Exit to Login Page"
        style={{
          background: '#fee2e2',
          color: '#dc2626',
          border: 'none',
          borderRadius: '16px',
          padding: '4px 8px',
          fontSize: '11px',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        {language === 'te' ? '🚪 లాగిన్' : '🚪 Login'}
      </button>
    </div>
  );

  // If user is authenticated:
  if (user) {
    // 1. PRIMARY HEALTH CENTRE (PHC) DASHBOARD
    if (viewMode === 'phc_dashboard' || viewMode === 'oral_screening') {
      return (
        <div style={{ position: 'relative' }}>
          {renderFloatingSwitcher()}
          <PHCDashboard
            onToast={showToast}
            onSwitchDashboard={handleSwitchDashboard}
            onLogout={handleLogout}
          />
          <Toast message={toast.message} visible={toast.visible} />
        </div>
      );
    }

    // 2. SPECIALIST DASHBOARD (ORAL ONCOLOGY)
    if (viewMode === 'specialist_dashboard') {
      return (
        <div style={{ position: 'relative' }}>
          {renderFloatingSwitcher()}
          <SpecialistDashboard
            onToast={showToast}
            onSwitchDashboard={handleSwitchDashboard}
            onLogout={handleLogout}
          />
          <Toast message={toast.message} visible={toast.visible} />
        </div>
      );
    }

    // 3. DISTRICT ADMINISTRATOR DASHBOARD (DMHO)
    if (viewMode === 'district_admin_dashboard') {
      return (
        <div style={{ position: 'relative' }}>
          {renderFloatingSwitcher()}
          <DistrictAdminDashboard
            onToast={showToast}
            onSwitchDashboard={handleSwitchDashboard}
            onLogout={handleLogout}
          />
          <Toast message={toast.message} visible={toast.visible} />
        </div>
      );
    }

    // 4. SYSTEM ADMINISTRATOR DASHBOARD (SECURITY & IT)
    if (viewMode === 'system_admin_dashboard') {
      return (
        <div style={{ position: 'relative' }}>
          {renderFloatingSwitcher()}
          <SystemAdminDashboard
            onToast={showToast}
            onSwitchDashboard={handleSwitchDashboard}
            onLogout={handleLogout}
          />
          <Toast message={toast.message} visible={toast.visible} />
        </div>
      );
    }

    // 5. ANM & VILLAGE HEALTH WORKER PORTAL
    if (viewMode === 'anm_portal') {
      return (
        <>
          {renderFloatingSwitcher()}
          <ANMPortalLayout
            user={user}
            onLogout={handleLogout}



          />
          <Toast message={toast.message} visible={toast.visible} />
        </>
      );
    }

    // 6. CITIZEN CARE PORTAL
    if (viewMode === 'patient') {
      return (
        <>
          {renderFloatingSwitcher()}
          <CitizenPortalLayout
            user={user}
            onLogout={handleLogout}


          />
          <Toast message={toast.message} visible={toast.visible} />
        </>
      );
    }

    // 7. CLINICAL TELECONSULTATION SUITE
    return (
      <>
        {renderFloatingSwitcher()}
        <DashboardLayout
          user={user}
          onLogout={handleLogout}
          onSwitchToCitizenPortal={() => handleSwitchDashboard('patient')}
        />
        <Toast message={toast.message} visible={toast.visible} />
      </>
    );
  }

  // Otherwise show login/register authentication page
  return (
    <main className="page-shell">
      <Header
        onOpenDashboard={handleSwitchDashboard}
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
