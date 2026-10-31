import React, { useState } from 'react';
import SocialAuth from './SocialAuth';

export default function RegisterForm({ onSwitchMode, onSubmit, onSocialClick }) {
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

      <div className="eyebrow">CREATE YOUR ACCOUNT</div>
      <h1>
        Join our care<br />
        <em>community.</em>
      </h1>
      <p className="form-intro">
        Create a secure account to access your healthcare journey.
      </p>

      <div className="field">
        <label htmlFor="regName">Full name</label>
        <div className="input-wrap">
          <span className="field-icon">◉</span>
          <input
            id="regName"
            name="name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="regEmail">Email address</label>
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
        <label htmlFor="regPassword">Create password</label>
        <div className="input-wrap">
          <span className="field-icon">⌑</span>
          <input
            id="regPassword"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 8 characters"
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
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <button className="primary-btn" type="submit">
        Create account <span>→</span>
      </button>

      <SocialAuth onSocialClick={onSocialClick} />

      <p className="mobile-switch">
        Already have an account?{' '}
        <button type="button" onClick={() => onSwitchMode('login')}>
          Log in
        </button>
      </p>
    </form>
  );
}

