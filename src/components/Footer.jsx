import React from 'react';

export default function Footer({ onHelpClick }) {
  return (
    <footer className="page-footer">
      <span>© 2026 Aarogya Drishti</span>
      <span>
        <i></i> Your information is protected
      </span>
      <button type="button" onClick={onHelpClick}>
        Need help?
      </button>
    </footer>
  );
}

