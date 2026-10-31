import React from 'react';

export default function WelcomeBanner({ doctorName = 'Dr. Sandeep Kumar' }) {
  return (
    <div className="welcome-card">
      <div className="welcome-text">
        <h2>Welcome Back,</h2>
        <h1>{doctorName}</h1>
        <p>Primary Health Centre (PHC) / Medical Officer Dashboard</p>
      </div>

      {/* Clinical Oral Examination & Diagnostic Triage photo */}
      <div className="welcome-photo-bg">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=640&q=85"
          alt="Clinical Examination"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=640&q=85";
          }}
        />
      </div>
    </div>
  );
}
