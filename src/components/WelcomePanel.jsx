import React from 'react';

export default function WelcomePanel({ onSwitchMode }) {
  return (
    <aside className="welcome-side" id="welcomeSide">
      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>

      {/* Visible in register mode */}
      <div className="panel-content register-prompt">
        <div className="welcome-logo-container">
          <img
            src="/logo.png"
            alt="Aarogya Drishti Logo"
            className="welcome-brand-logo"
          />
        </div>
        <span className="panel-kicker">YOUR HEALTH, IN FOCUS</span>
        <h2>
          Welcome<br />
          back!
        </h2>
        <p>Sign in and stay connected to your care journey.</p>
        <button
          className="outline-btn"
          type="button"
          onClick={() => onSwitchMode('login')}
        >
          Employee login
        </button>
      </div>

      {/* Visible in login mode */}
      <div className="panel-content login-prompt">
        <div className="welcome-logo-container">
          <img
            src="/logo.png"
            alt="Aarogya Drishti Logo"
            className="welcome-brand-logo"
          />
        </div>
        <span className="panel-kicker">A HEALTHIER TOMORROW STARTS HERE</span>
        <h2>
          Hello,<br />
          there!
        </h2>
        <p>New to Aarogya Drishti? Create an account to get started.</p>
        <button
          className="outline-btn"
          type="button"
          onClick={() => onSwitchMode('register')}
        >
          Citizen login
        </button>
      </div>

      <div className="panel-footer">
        <span>✳</span> Compassionate care. Connected communities.
      </div>
    </aside>
  );
}
