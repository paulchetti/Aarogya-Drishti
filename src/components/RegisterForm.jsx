import React, { useState } from 'react';
import SocialAuth from './SocialAuth';
import { useLanguage } from '../context/LanguageContext';

export default function RegisterForm({ onSwitchMode, onSubmit, onSocialClick }) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="auth-form register-form active" onSubmit={handleSubmit}>
      <div className="mobile-brand">
        <span className="brand-mark">
          <span></span>
          <i></i>
        </span>
        <b>AAROGYA DRISHTI</b>
      </div>

      <div className="eyebrow">{language === 'te' ? 'మీ ఖాతాను సృష్టించండి' : 'CREATE YOUR ACCOUNT'}</div>
      <h1>
        {language === 'te' ? (
          <>
            మా సంరక్షణ సంఘంలో<br />
            <em>చేరండి.</em>
          </>
        ) : (
          <>
            Join our care<br />
            <em>community.</em>
          </>
        )}
      </h1>
      <p className="form-intro">
        {language === 'te'
          ? 'మీ ఆరోగ్య సంరక్షణ ప్రయాణాన్ని ప్రారంభించడానికి సురక్షితమైన ఖాతాను సృష్టించండి.'
          : 'Create a secure account to access your healthcare journey.'}
      </p>

      <div className="field">
        <label htmlFor="regName">{language === 'te' ? 'పూర్తి పేరు' : 'Full name'}</label>
        <div className="input-wrap">
          <span className="field-icon">◉</span>
          <input
            id="regName"
            name="name"
            type="text"
            placeholder={language === 'te' ? 'మీ పూర్తి పేరును నమోదు చేయండి' : 'Enter your full name'}
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="regEmail">{t('emailAddress', 'Email address')}</label>
        <div className="input-wrap">
          <span className="field-icon">✉</span>
          <input
            id="regEmail"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="regPassword">{language === 'te' ? 'పాస్‌వర్డ్ సృష్టించండి' : 'Create password'}</label>
        <div className="input-wrap">
          <span className="field-icon">⌑</span>
          <input
            id="regPassword"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder={language === 'te' ? 'కనీసం 8 అక్షరాలు' : 'At least 8 characters'}
            minLength={8}
            autoComplete="new-password"
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

      <button className="primary-btn" type="submit">
        {language === 'te' ? 'ఖాతా సృష్టించండి →' : 'Create account →'}
      </button>

      <SocialAuth onSocialClick={onSocialClick} />

      <p className="mobile-switch">
        {language === 'te' ? 'ఇప్పటికే ఖాతా ఉందా? ' : "Already have an account? "}
        <button type="button" onClick={() => onSwitchMode('login')}>
          {language === 'te' ? 'లాగిన్ అవ్వండి' : 'Log in'}
        </button>
      </p>
    </form>
  );
}
