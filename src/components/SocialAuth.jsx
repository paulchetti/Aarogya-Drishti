import React from 'react';

export default function SocialAuth({ onSocialClick }) {
  return (
    <>
      <div className="or-divider">
        <span></span> or continue with <span></span>
      </div>
      <div className="social-row">
        <button
          type="button"
          className="social-btn"
          aria-label="Continue with Google"
          onClick={() => onSocialClick('Google')}
        >
          G
        </button>
        <button
          type="button"
          className="social-btn facebook"
          aria-label="Continue with Facebook"
          onClick={() => onSocialClick('Facebook')}
        >
          f
        </button>
        <button
          type="button"
          className="social-btn github"
          aria-label="Continue with GitHub"
          onClick={() => onSocialClick('GitHub')}
        >
          ⌘
        </button>
        <button
          type="button"
          className="social-btn linkedin"
          aria-label="Continue with LinkedIn"
          onClick={() => onSocialClick('LinkedIn')}
        >
          in
        </button>
      </div>
    </>
  );
}

