import React from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import WelcomePanel from './WelcomePanel';

export default function AuthCard({
  mode,
  onSwitchMode,
  onRegisterSubmit,
  onLoginSubmit,
  onForgotPassword,
  onSocialClick,
}) {
  const isLogin = mode === 'login';

  return (
    <section className={`auth-card ${isLogin ? 'login-mode' : ''}`} id="authCard">
      <div className="form-side">
        {isLogin ? (
          <LoginForm
            onSwitchMode={onSwitchMode}
            onSubmit={onLoginSubmit}
            onForgotPassword={onForgotPassword}
            onSocialClick={onSocialClick}
          />
        ) : (
          <RegisterForm
            onSwitchMode={onSwitchMode}
            onSubmit={onRegisterSubmit}
            onSocialClick={onSocialClick}
          />
        )}
      </div>

      <WelcomePanel onSwitchMode={onSwitchMode} />
    </section>
  );
}

