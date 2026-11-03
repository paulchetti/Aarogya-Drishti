import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onHelpClick }) {
  const { language } = useLanguage();

  return (
    <footer className="page-footer">
      <span>© 2026 Aarogya Drishti</span>
      <span>
        <i></i> {language === 'te' ? 'మీ సమాచారం భద్రంగా రక్షించబడింది' : 'Your information is protected'}
      </span>
      <button type="button" onClick={onHelpClick}>
        {language === 'te' ? 'సహాయం కావాలా?' : 'Need help?'}
      </button>
    </footer>
  );
}
