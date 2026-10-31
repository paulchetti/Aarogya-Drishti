import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthCard from './components/AuthCard';
import Toast from './components/Toast';
import DashboardLayout from './components/dashboard/DashboardLayout';
import PatientPortalLayout from './components/patient/PatientPortalLayout';

export default function App() {
  const [mode, setMode] = useState('login');
  const [user, setUser] = useState({
    name: 'Citizen Rahul',
    fullName: 'Rahul Sharma',
    email: 'rahul.citizen@aarogyadrishti.in',
    role: 'citizen',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  });
  const [viewMode, setViewMode] = useState('patient'); // 'patient' (User's sketch layout) | 'doctor' (Clinical dashboard)
  const [toast, setToast] = useState({ message: '', visible: false });
  const toastTimerRef = useRef(null);

  useEffect(() => {
    document.title = 'Aarogya Drishti | Secure Healthcare Portal & Patient Layout';

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = '/aarogya-logo.jpg?v=' + Date.now();
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
    const extractedName = data.name || (data.email ? data.email.split('@')[0] : 'Citizen Rahul');
    const role = data.role || (data.email?.includes('doctor') ? 'doctor' : 'citizen');
    const loggedUser = {
      name: extractedName.charAt(0).toUpperCase() + extractedName.slice(1),
      fullName: extractedName,
      email: data.email || 'citizen@aarogyadrishti.in',
      role: role,
      avatar: role === 'doctor'
        ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };
    setUser(loggedUser);
    setViewMode(role === 'doctor' ? 'doctor' : 'patient');
    showToast(`Welcome back ${loggedUser.name}! Opening ${role === 'doctor' ? 'doctor dashboard' : 'patient layout'}.`);
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
      name: 'Verified Citizen',
      email: `citizen.${provider.toLowerCase()}@abdm.gov.in`,
      role: 'citizen',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    });
    setViewMode('patient');
  };

  const handleHelpClick = () => {
    showToast('Aarogya Drishti 24x7 Citizen Helpline: 1800-11-4477');
  };

  // If citizen/user is logged in:
  if (user) {
    if (viewMode === 'patient') {
      return (
        <>
          <PatientPortalLayout
            user={user}
            onLogout={handleLogout}
            onSwitchToDoctorDashboard={() => setViewMode('doctor')}
          />
          <Toast message={toast.message} visible={toast.visible} />
        </>
      );
    }

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
            name: 'Citizen Rahul',
            fullName: 'Rahul Sharma',
            email: 'rahul.citizen@aarogyadrishti.in',
            role: 'citizen',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
          });
          setViewMode('patient');
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
