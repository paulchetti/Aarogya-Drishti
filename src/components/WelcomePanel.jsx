import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function WelcomePanel({ onSwitchMode }) {
  const { t, language } = useLanguage();

  return (
    <aside className="welcome-side" id="welcomeSide">
      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>

      {/* Visible in register mode */}
      <div className="panel-content register-prompt">
        <div
          className="welcome-logo-container"
          style={{
            borderRadius: '50%',
            border: '4px solid #f97316',
            background: '#ffffff',
            boxShadow: '0 10px 28px rgba(249, 115, 22, 0.45), 0 4px 14px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/logo.png"
            alt="Aarogya Drishti Logo"
            className="welcome-brand-logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '50%',
              display: 'block'
            }}
          />
        </div>
        <span className="panel-kicker">
          {language === 'te' ? 'మీ ఆరోగ్యం, మా దృష్టి' : 'YOUR HEALTH, IN FOCUS'}
        </span>
        <h2>
          {language === 'te' ? (
            <>
              తిరిగి<br />
              స్వాగతం!
            </>
          ) : (
            <>
              Welcome<br />
              back!
            </>
          )}
        </h2>
        <p>
          {t('stayConnected', 'Sign in and stay connected to your care journey.')}
        </p>
        <button
          className="outline-btn"
          type="button"
          onClick={() => onSwitchMode('login')}
        >
          {t('employeeLogin', 'Employee login')}
        </button>
      </div>

      {/* Visible in login mode */}
      <div className="panel-content login-prompt">
        <div
          className="welcome-logo-container"
          style={{
            borderRadius: '50%',
            border: '4px solid #f97316',
            background: '#ffffff',
            boxShadow: '0 10px 28px rgba(249, 115, 22, 0.45), 0 4px 14px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/logo.png"
            alt="Aarogya Drishti Logo"
            className="welcome-brand-logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '50%',
              display: 'block'
            }}
          />
        </div>
        <span className="panel-kicker">
          {t('healthierTomorrow', 'A HEALTHIER TOMORROW STARTS HERE')}
        </span>
        <h2>
          {language === 'te' ? (
            <>
              నమస్కారం,<br />
              హలో!
            </>
          ) : (
            <>
              Hello,<br />
              there!
            </>
          )}
        </h2>
        <p>
          {t('newToAarogya', 'New to Aarogya Drishti? Create an account to get started.')}
        </p>
        <button
          className="outline-btn"
          type="button"
          onClick={() => onSwitchMode('register')}
        >
          {t('citizenLogin', 'Citizen login')}
        </button>
      </div>

      <div className="panel-footer">
        <span>✳</span> {t('compassionateCare', 'Compassionate care. Connected communities.')}
      </div>
    </aside>
  );
}
