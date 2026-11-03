import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function PatientModal({ isOpen, onClose, onSave }) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: 'Female',
    contact: '',
    village: 'G. Madugula',
    mandal: 'Paderu',
    habits: ['chewing_tobacco'],
    symptoms: ['white_patch'],
  });

  if (!isOpen) return null;

  const handleHabitToggle = (habit) => {
    setFormData((prev) => ({
      ...prev,
      habits: prev.habits.includes(habit)
        ? prev.habits.filter((h) => h !== habit)
        : [...prev.habits, habit],
    }));
  };

  const handleSymptomToggle = (symptom) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPatient = {
      id: `ADP-00${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name || (language === 'te' ? 'కొత్త రోగి' : 'New Patient'),
      ageSex: `${formData.age || '40'} / ${formData.sex === 'Female' ? 'F' : 'M'}`,
      village: formData.village,
      date: language === 'te' ? 'ఈరోజు' : 'Today',
      status: formData.symptoms.length > 0 ? 'Under Review' : 'Normal',
      statusClass: formData.symptoms.length > 0 ? 'under-review' : 'normal',
      initials: (formData.name || 'NP').slice(0, 2).toUpperCase(),
    };
    onSave(newPatient);
    onClose();
  };

  return (
    <div className="dash-modal-backdrop" onClick={onClose}>
      <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dash-modal-header">
          <h2>{language === 'te' ? 'ప్రత్యక్ష రోగి నమోదు (వాక్-ఇన్)' : 'Direct / Walk-in Registration'}</h2>
          <button type="button" className="close-modal-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                {language === 'te' ? 'పూర్తి పేరు' : 'Full Name'}
              </label>
              <input
                type="text"
                required
                placeholder={language === 'te' ? 'రోగి పేరు నమోదు చేయండి' : 'Enter patient name'}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                {language === 'te' ? 'వయస్సు' : 'Age'}
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 46"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                {language === 'te' ? 'లింగం' : 'Sex'}
              </label>
              <select
                value={formData.sex}
                onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
              >
                <option value="Female">{language === 'te' ? 'స్త్రీ (Female)' : 'Female'}</option>
                <option value="Male">{language === 'te' ? 'పురుషుడు (Male)' : 'Male'}</option>
                <option value="Other">{language === 'te' ? 'ఇతరులు (Other)' : 'Other'}</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                {language === 'te' ? 'గ్రామం / నివాసం' : 'Village / Habitation'}
              </label>
              <select
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
              >
                <option value="G. Madugula">G. Madugula</option>
                <option value="Paderu">Paderu</option>
                <option value="Araku">Araku</option>
                <option value="Chintapalli">Chintapalli</option>
                <option value="Koyyuru">Koyyuru</option>
                <option value="Gudem">Gudem</option>
              </select>
            </div>
          </div>

          {/* Exposure History (Compulsory for Oral Cancer Screenings) */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
              {language === 'te' ? 'అలవాట్ల వివరాలు (హ్యాబిట్స్)' : 'Exposure History (Habits)'}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { id: 'smoking', label: language === 'te' ? 'బీడీ / సిగరెట్ తాగడం' : 'Smoking (Bidi/Cigarette)' },
                { id: 'chewing_tobacco', label: language === 'te' ? 'పొగాకు నమలడం / ఖైనీ' : 'Chewing Tobacco / Khaini' },
                { id: 'gutkha', label: language === 'te' ? 'గుట్కా / పాన్ మసాలా' : 'Gutkha / Pan Masala' },
                { id: 'areca_nut', label: language === 'te' ? 'వక్క (Areca Nut)' : 'Areca Nut' },
                { id: 'reverse_smoking', label: language === 'te' ? 'రివర్స్ స్మోకింగ్ (అడ్డ పొగ)' : 'Reverse Smoking (Adda Poga)' },
              ].map((habit) => (
                <button
                  type="button"
                  key={habit.id}
                  onClick={() => handleHabitToggle(habit.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                    border: formData.habits.includes(habit.id) ? '1px solid #ea580c' : '1px solid #cbd5e1',
                    background: formData.habits.includes(habit.id) ? '#ffedd5' : '#f8fafc',
                    color: formData.habits.includes(habit.id) ? '#9a3412' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  {habit.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clinical Symptoms */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
              {language === 'te' ? 'గమనించిన లక్షణాలు (Symptoms Noted)' : 'Symptoms Noted'}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { id: 'white_patch', label: language === 'te' ? 'తెల్లటి మచ్చ (White Patch)' : 'White Patch' },
                { id: 'red_patch', label: language === 'te' ? 'ఎర్రటి మచ్చ (Red Patch)' : 'Red Patch' },
                { id: 'ulcer', label: language === 'te' ? 'తగ్గని పుండు (Ulcer > 14 days)' : 'Ulcer (> 14 days)' },
                { id: 'trismus', label: language === 'te' ? 'నోరు తెరవలేకపోవడం (Trismus)' : 'Difficulty Opening Mouth' },
                { id: 'burning', label: language === 'te' ? 'కారంతో మంట (Burning Sensation)' : 'Burning with Spices' },
              ].map((sym) => (
                <button
                  type="button"
                  key={sym.id}
                  onClick={() => handleSymptomToggle(sym.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                    border: formData.symptoms.includes(sym.id) ? '1px solid #0d9488' : '1px solid #cbd5e1',
                    background: formData.symptoms.includes(sym.id) ? '#ccfbf1' : '#f8fafc',
                    color: formData.symptoms.includes(sym.id) ? '#0f766e' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  {sym.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 18px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: 'white',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              {language === 'te' ? 'రద్దు చేయండి' : 'Cancel'}
            </button>
            <button
              type="submit"
              style={{
                padding: '9px 20px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(100deg, #f97316 0%, #ea580c 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              {language === 'te' ? 'నమోదును భద్రపరచండి →' : 'Save & Register →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
