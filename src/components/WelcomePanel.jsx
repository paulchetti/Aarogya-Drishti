import React from 'react';

export default function WelcomePanel({ onSwitchMode }) {
  return (
    <aside className="welcome-side" id="welcomeSide">
      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>

      {/* Visible in register mode */}
      <div className="panel-content register-prompt">
        <div className="illustration">
          <div className="illustration-ring ring-a"></div>
          <div className="illustration-ring ring-b"></div>
          <div className="health-symbol">
            <span></span>
            <i></i>
          </div>
          <div className="mini-card mini-card-one">
            <b>✓</b>
            <span>Care connected</span>
          </div>
          <div className="mini-card mini-card-two">
            <span className="pulse"></span>
            <span>Patient first</span>
          </div>
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
        <div className="illustration">
          <div className="illustration-ring ring-a"></div>
          <div className="illustration-ring ring-b"></div>
          <div className="health-symbol">
            <span></span>
            <i></i>
          </div>
          <div className="mini-card mini-card-one">
            <b>✓</b>
            <span>Care connected</span>
          </div>
          <div className="mini-card mini-card-two">
            <span className="pulse"></span>
            <span>Patient first</span>
          </div>
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

