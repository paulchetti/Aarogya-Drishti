import React from 'react';

export default function WelcomeBanner({ doctorName = 'Dr. Sandeep Kumar' }) {
  return (
    <div className="welcome-card">
      <div className="welcome-text">
        <h2>Welcome Back,</h2>
        <h1>{doctorName}</h1>
        <p>Together for early detection and better oral health.</p>
      </div>

      {/* High-res Clinical Oral Examination Photo matching source image */}
      <div className="welcome-photo-bg">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=640&q=85"
          alt="Oral Examination with dental mirror"
          onError={(e) => {
            // Fallback dental exam image
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=640&q=85";
          }}
        />
      </div>
    </div>
  );
}
