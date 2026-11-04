import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  registerPatient,
  checkDuplicatePatient,
  ITDA_PADERU_MANDALS,
} from '../../services/referralRoutingService';
import { AlertCircle, ShieldCheck, CheckCircle2, UserCheck, X } from 'lucide-react';

export default function PatientModal({ isOpen, onClose, onSave }) {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: 'Female',
    contact: '',
    habitation: '',
    village: 'G. Madugula',
    mandal: 'G. Madugula',
    habits: ['reverse_smoking', 'chewing_tobacco'],
    habitDurationYears: '10',
    habitFrequency: '4-5 times/day',
    symptoms: ['ulcer', 'trismus'],
    symptomDurationWeeks: '6',
    trismusOpeningMm: '22',
    consents: {
      examinationConsent: true,
      imagingConsent: true,
      teleconsultConsent: true,
      dataProcessingConsent: true,
    },
  });

  const [duplicateWarning, setDuplicateWarning] = useState(null);

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

  const handleConsentToggle = (key) => {
    setFormData((prev) => ({
      ...prev,
      consents: {
        ...prev.consents,
        [key]: !prev.consents[key],
      },
    }));
  };

  const handleContactChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, contact: val }));
    if (val.length >= 10 || formData.name.length >= 3) {
      const dup = checkDuplicatePatient({ name: formData.name, contact: val });
      setDuplicateWarning(dup);
    } else {
      setDuplicateWarning(null);
    }
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, name: val }));
    if (val.length >= 3 || formData.contact.length >= 10) {
      const dup = checkDuplicatePatient({ name: val, contact: formData.contact });
      setDuplicateWarning(dup);
    } else {
      setDuplicateWarning(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Map habits & symptoms to structured exposures (Module A)
    const exposureHistory = formData.habits.map((h) => ({
      type: h,
      label:
        h === 'reverse_smoking'
          ? 'Reverse Smoking (Adda Poga / Chutta)'
          : h === 'chewing_tobacco'
          ? 'Chewing Tobacco / Khaini'
          : h === 'gutkha'
          ? 'Gutkha / Pan Masala'
          : h === 'areca_nut'
          ? 'Areca Nut / Betel Quid'
          : 'Smoking (Bidi/Cigarette)',
      durationYears: parseInt(formData.habitDurationYears || 5, 10),
      frequency: formData.habitFrequency || 'Daily',
      active: true,
    }));

    const symptomsList = formData.symptoms.map((s) => ({
      type: s,
      label:
        s === 'white_patch'
          ? 'Leukoplakic White Patch'
          : s === 'red_patch'
          ? 'Erythroplakic Red Plaque'
          : s === 'ulcer'
          ? 'Non-healing Ulcer (> 14 days)'
          : s === 'trismus'
          ? `Restricted Mouth Opening (${formData.trismusOpeningMm} mm Trismus)`
          : 'Burning Sensation with Spices',
      durationWeeks: parseInt(formData.symptomDurationWeeks || 4, 10),
      severity: s === 'trismus' ? 'Grade II' : 'Moderate',
    }));

    // Register into shared referralRoutingService database (Module A)
    const createdPatient = registerPatient({
      name: formData.name || (language === 'te' ? 'కొత్త రోగి' : 'New Patient'),
      age: formData.age || '45',
      gender: formData.sex,
      contact: formData.contact,
      village: formData.village,
      mandal: formData.mandal,
      habitation: formData.habitation,
      exposureHistory,
      symptoms: symptomsList,
      consents: {
        ...formData.consents,
        timestamp: new Date().toISOString(),
      },
      actor: 'Dr. Sandeep Kumar, MBBS (PHC Medical Officer)',
    });

    if (onSave) onSave(createdPatient);
    onClose();
  };

  return (
    <div className="dash-modal-backdrop" onClick={onClose}>
      <div className="dash-modal" style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <div className="dash-modal-header" style={{ borderBottom: '2px solid #0d9488' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.15rem' }}>
              {language === 'te' ? 'ప్రత్యక్ష రోగి నమోదు & వైద్య చరిత్ర (Module A)' : 'Direct / Walk-in Patient Registration (Module A)'}
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>
              Compliant with ITDA Paderu Oral Cancer Protocol • Aadhaar Optional (ABHA Generated)
            </p>
          </div>
          <button type="button" className="close-modal-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Duplicate Detection Warning Banner (Module A Requirement) */}
        {duplicateWarning && (
          <div
            style={{
              margin: '12px 16px 0 16px',
              padding: '10px 14px',
              background: '#fffbeb',
              border: '1.5px solid #f59e0b',
              borderRadius: '8px',
              color: '#92400e',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} color="#d97706" />
              <div>
                <strong>Potential Duplicate Detected:</strong> Existing record found for{' '}
                <strong>{duplicateWarning.name}</strong> ({duplicateWarning.id} • {duplicateWarning.contact}) in {duplicateWarning.village}.
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', background: '#fef3c7', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
              Longitudinal EMR Exists
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
          {/* Section 1: Demographics & Geo-Hierarchy */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', marginBottom: '14px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '0.82rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              1. Patient Demographics & Habitation
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  {language === 'te' ? 'పూర్తి పేరు *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'te' ? 'రోగి పేరు నమోదు చేయండి' : 'Enter patient name'}
                  value={formData.name}
                  onChange={handleNameChange}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  {language === 'te' ? 'వయస్సు *' : 'Age *'}
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 46"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  {language === 'te' ? 'లింగం *' : 'Sex *'}
                </label>
                <select
                  value={formData.sex}
                  onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px', background: 'white' }}
                >
                  <option value="Female">{language === 'te' ? 'స్త్రీ (Female)' : 'Female'}</option>
                  <option value="Male">{language === 'te' ? 'పురుషుడు (Male)' : 'Male'}</option>
                  <option value="Other">{language === 'te' ? 'ఇతరులు (Other)' : 'Other'}</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  {language === 'te' ? 'మొబైల్ నంబర్ *' : 'Mobile Contact *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9XXXX XXXXX"
                  value={formData.contact}
                  onChange={handleContactChange}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  {language === 'te' ? 'మండలం (ITDA)' : 'Mandal (ITDA)'}
                </label>
                <select
                  value={formData.mandal}
                  onChange={(e) => setFormData({ ...formData, mandal: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px', background: 'white' }}
                >
                  {ITDA_PADERU_MANDALS.map((m) => (
                    <option key={m.mandal} value={m.mandal}>
                      {m.mandal} ({m.mandalTe})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  {language === 'te' ? 'గ్రామం / నివాసం' : 'Village / Habitation'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vanabhasingi Hamlet"
                  value={formData.habitation || formData.village}
                  onChange={(e) => setFormData({ ...formData, habitation: e.target.value, village: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Exposure History (Compulsory Adda Poga, Gutkha, Areca Nut) */}
          <div style={{ background: '#fff7ed', border: '1px solid #fdba74', borderRadius: '10px', padding: '12px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <h4 style={{ margin: 0, fontSize: '0.82rem', color: '#c2410c', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                2. Epidemiological Exposure History (Habits & Frequency)
              </h4>
              <span style={{ fontSize: '0.7rem', color: '#ea580c', fontWeight: 700 }}>Compulsory Screening Risk Factor</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
              {[
                { id: 'reverse_smoking', label: 'Reverse Smoking (Adda Poga / Chutta)' },
                { id: 'chewing_tobacco', label: 'Chewing Tobacco / Khaini' },
                { id: 'gutkha', label: 'Gutkha / Pan Masala' },
                { id: 'areca_nut', label: 'Areca Nut / Betel Quid' },
                { id: 'smoking', label: 'Bidi / Cigarette' },
              ].map((habit) => (
                <button
                  type="button"
                  key={habit.id}
                  onClick={() => handleHabitToggle(habit.id)}
                  style={{
                    padding: '5px 11px',
                    borderRadius: '16px',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: formData.habits.includes(habit.id) ? '1.5px solid #ea580c' : '1px solid #cbd5e1',
                    background: formData.habits.includes(habit.id) ? '#ea580c' : '#ffffff',
                    color: formData.habits.includes(habit.id) ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  {habit.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#7c2d12', display: 'block', marginBottom: '3px' }}>
                  Duration of Habit (Years)
                </label>
                <input
                  type="number"
                  value={formData.habitDurationYears}
                  onChange={(e) => setFormData({ ...formData, habitDurationYears: e.target.value })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#7c2d12', display: 'block', marginBottom: '3px' }}>
                  Daily Usage Frequency
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5-6 times/day"
                  value={formData.habitFrequency}
                  onChange={(e) => setFormData({ ...formData, habitFrequency: e.target.value })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Clinical Symptoms & Trismus (Module A) */}
          <div style={{ background: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: '10px', padding: '12px', marginBottom: '14px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.82rem', color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              3. Clinical Symptoms & Restricted Mouth Opening (Trismus)
            </h4>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
              {[
                { id: 'ulcer', label: 'Persistent Ulcer (> 14 days)' },
                { id: 'white_patch', label: 'White Patch (Leukoplakia)' },
                { id: 'red_patch', label: 'Red Patch (Erythroplakia)' },
                { id: 'trismus', label: 'Restricted Mouth Opening (Trismus)' },
                { id: 'burning', label: 'Burning Sensation with Spices' },
                { id: 'growth', label: 'Visible Vegetative Growth' },
              ].map((sym) => (
                <button
                  type="button"
                  key={sym.id}
                  onClick={() => handleSymptomToggle(sym.id)}
                  style={{
                    padding: '5px 11px',
                    borderRadius: '16px',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: formData.symptoms.includes(sym.id) ? '1.5px solid #0d9488' : '1px solid #cbd5e1',
                    background: formData.symptoms.includes(sym.id) ? '#0d9488' : '#ffffff',
                    color: formData.symptoms.includes(sym.id) ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  {sym.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#134e4a', display: 'block', marginBottom: '3px' }}>
                  Symptom Duration (Weeks)
                </label>
                <input
                  type="number"
                  value={formData.symptomDurationWeeks}
                  onChange={(e) => setFormData({ ...formData, symptomDurationWeeks: e.target.value })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#134e4a', display: 'block', marginBottom: '3px' }}>
                  Inter-incisal Distance (Trismus mm)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 22 mm"
                  value={formData.trismusOpeningMm}
                  onChange={(e) => setFormData({ ...formData, trismusOpeningMm: e.target.value })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Informed Consent Records (Module A Requirement) */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 12px', marginBottom: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '0.8rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="#0d9488" />
              <span>Informed Patient Consent Records (ABDM Digital Health Protocol)</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.74rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.consents.examinationConsent}
                  onChange={() => handleConsentToggle('examinationConsent')}
                />
                <span>Clinical Oral Examination Consent</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.consents.imagingConsent}
                  onChange={() => handleConsentToggle('imagingConsent')}
                />
                <span>Intraoral Photography Consent</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.consents.teleconsultConsent}
                  onChange={() => handleConsentToggle('teleconsultConsent')}
                />
                <span>Specialist Teleconsultation Consent</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.consents.dataProcessingConsent}
                  onChange={() => handleConsentToggle('dataProcessingConsent')}
                />
                <span>ABDM Encrypted Data Processing</span>
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
              * Aadhaar is optional; Unique ID (ADP-2026) auto-assigned
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: 'white',
                  fontWeight: 600,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                }}
              >
                {language === 'te' ? 'రద్దు చేయండి' : 'Cancel'}
              </button>
              <button
                type="submit"
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(100deg, #0d9488 0%, #0f766e 100%)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(13, 148, 136, 0.3)',
                }}
              >
                <UserCheck size={14} />
                <span>{language === 'te' ? 'నమోదును పూర్తి చేయండి →' : 'Save & Register Citizen →'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
