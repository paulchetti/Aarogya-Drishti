import React, { useState, useRef, useEffect } from 'react';
import Toast from './components/Toast';
import DashboardView from './components/Dashboard/DashboardView';

export default function App() {
  const [toast, setToast] = useState({ message: '', visible: false });
  const toastTimerRef = useRef(null);

  useEffect(() => {
    document.title = 'AAROGYA DRISHTI | AI Assisted Oral Health Screening Platform';

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = '/logo.jpg?v=' + Date.now();
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

  return (
    <>
      <DashboardView onToast={showToast} />
      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
