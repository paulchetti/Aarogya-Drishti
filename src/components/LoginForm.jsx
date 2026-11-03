import React, { useState } from 'react';
import SocialAuth from './SocialAuth';
import { useLanguage } from '../context/LanguageContext';

export default function LoginForm({
  onSwitchMode,
  onSubmit,
  onForgotPassword,
  onSocialClick,
}) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="auth-form login-form active" onSubmit={handleSubmit}>
      <div className="mobile-brand">
        <span className="brand-mark">
          <span></span>
          <i></i>
        </span>
        <b>AAROGYA DRISHTI</b>
      </div>

      <div className="eyebrow">{t('welcomeBackEyebrow', 'WELCOME BACK')}</div>
      <h1>
        {language === 'te' ? (
          <>
            మిమ్మల్ని మళ్ళీ కలవడం<br />
            <em>ఆనందంగా ఉంది.</em>
          </>
        ) : (
          <>
            Good to see<br />
            <em>you again.</em>
          </>
        )}
      </h1>
      <p className="form-intro">
        {t('signInIntro', 'Sign in to continue to your secure healthcare workspace.')}
      </p>

      <div className="field">
        <label htmlFor="loginEmail">{t('emailAddress', 'Email address')}</label>
        <div className="input-wrap">
          <span className="field-icon">✉</span>
          <input
            id="loginEmail"
            name="email"
            type="email"
            placeholder={t('enterEmail', 'Enter your email')}
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <div className="label-line">
          <label htmlFor="loginPassword">{t('password', 'Password')}</label>
          <button type="button" onClick={onForgotPassword}>
            {t('forgotPassword', 'Forgot password?')}
          </button>
        </div>
        <div className="input-wrap">
          <span className="field-icon">⌑</span>
          <input
            id="loginPassword"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder={t('enterPassword', 'Enter your password')}
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            className="show-password"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? t('hide', 'Hide') : t('show', 'Show')}
          </button>
        </div>
      </div>

      <label className="remember">
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
        />
        {t('rememberMe', 'Remember me')}
      </label>

      <button className="primary-btn" type="submit">
        {t('logInSecurely', 'Log in securely →')}
      </button>

      {/* Quick Demo Access Buttons for instant review */}
      <div style={{ display: 'flex', gap: '8px', margin: '12px 0 6px' }}>
        <button
          type="button"
          onClick={() => onSubmit({ email: 'rahul.citizen@aarogyadrishti.in', role: 'citizen', name: 'Citizen Rahul' })}
          style={{
            flex: 1,
            padding: '8px 10px',
            fontSize: '0.78rem',
            fontWeight: 600,
            borderRadius: '10px',
            background: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #a7f3d0',
            cursor: 'pointer'
          }}
        >
          {t('demoCitizenLogin', '⚡ Demo Citizen Login')}
        </button>
        <button
          type="button"
          onClick={() => onSubmit({ email: 'andrew.sharma@aarogyadrishti.in', role: 'doctor', name: 'Dr. Andrew' })}
          style={{
            flex: 1,
            padding: '8px 10px',
            fontSize: '0.78rem',
            fontWeight: 600,
            borderRadius: '10px',
            background: '#f0fdfa',
            color: '#0f766e',
            border: '1px solid #99f6e4',
            cursor: 'pointer'
          }}
        >
          {t('demoDoctorLogin', '⚡ Demo Doctor Login')}
        </button>
      </div>

      <SocialAuth onSocialClick={onSocialClick} />

      <p className="mobile-switch">
        Don't have an account?{' '}
        <button type="button" onClick={() => onSwitchMode('register')}>
          Create account
        </button>
      </p>
    </form>
  );
}
