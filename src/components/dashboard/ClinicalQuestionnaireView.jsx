import React, { useState } from 'react';
import {
  ClipboardList,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Activity,
  Heart,
  Thermometer,
  ShieldAlert,
  Send,
  Video
} from 'lucide-react';

export default function ClinicalQuestionnaireView({ onStartTeleconsult, onNavigate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Questionnaire form state
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Headache', 'Severe Fatigue']);
  const [painLevel, setPainLevel] = useState(5);
  const [duration, setDuration] = useState('2-3 Days');
  const [temperature, setTemperature] = useState('99.2°F');
  const [bloodPressure, setBloodPressure] = useState('124/82');
  const [hasAllergies, setHasAllergies] = useState('No');
  const [allergiesDetail, setAllergiesDetail] = useState('');
  const [lifestyleNotes, setLifestyleNotes] = useState('Non-smoker, moderate daily activity');
  const [submitted, setSubmitted] = useState(false);

  const symptomList = [
    { id: 'fever', label: 'Fever / Chills', icon: '🌡️' },
    { id: 'cough', label: 'Dry or Productive Cough', icon: '😷' },
    { id: 'chest_pain', label: 'Chest Discomfort / Tightness', icon: '🫀' },
    { id: 'breath', label: 'Shortness of Breath', icon: '🫁' },
    { id: 'headache', label: 'Headache / Migraine', icon: '🤕' },
    { id: 'fatigue', label: 'Severe Fatigue', icon: '💤' },
    { id: 'joint_pain', label: 'Joint / Muscle Aches', icon: '🦴' },
    { id: 'stomach', label: 'Abdominal Pain / Nausea', icon: '🤢' },
    { id: 'dizziness', label: 'Dizziness or Brain Fog', icon: '😵' },
    { id: 'rash', label: 'Skin Rash or Itching', icon: '🔴' },
  ];

  const toggleSymptom = (label) => {
    if (selectedSymptoms.includes(label)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== label));
    } else {
      setSelectedSymptoms([...selectedSymptoms, label]);
    }
  };

  // Determine Triage Urgency Level
  const isUrgent =
    selectedSymptoms.includes('Chest Discomfort / Tightness') ||
    selectedSymptoms.includes('Shortness of Breath') ||
    painLevel >= 8;

  const isModerate =
    !isUrgent &&
    (selectedSymptoms.length >= 3 || painLevel >= 5 || duration === '> 1 Month');

  const triageStatus = isUrgent
    ? { level: 'High Priority (Amber/Red)', color: '#dc2626', bg: '#fee2e2', rec: 'Immediate Teleconsultation Recommended' }
    : isModerate
    ? { level: 'Moderate Urgency (Yellow)', color: '#d97706', bg: '#fef3c7', rec: 'Schedule Teleconsult Within 24 Hours' }
    : { level: 'Standard Care (Green)', color: '#16a34a', bg: '#dcfce7', rec: 'Routine Outpatient Follow-up' };

  return (
    <div className="dashboard-content-area feature-view-container">
      {/* Header */}
      <div className="feature-header">
        <div className="feature-header-left">
          <h1>Clinical Intake Questionnaire & Triage</h1>
          <p>Complete this guided clinical assessment prior to consultation to expedite diagnosis.</p>
        </div>
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0d9488' }}>
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      <div className="form-card">
        {/* Step Progress Bar */}
        <div className="wizard-progress">
          {[
            'Chief Complaints',
            'Pain & Duration',
            'Vitals & History',
            'Allergies & Habits',
            'Triage Assessment'
          ].map((title, idx) => {
            const stepNum = idx + 1;
            const isCompleted = currentStep > stepNum;
            const isActive = currentStep === stepNum;
            return (
              <div
                key={title}
                className={`wizard-step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => setCurrentStep(stepNum)}
                style={{ cursor: 'pointer' }}
              >
                <div className="step-circle">{isCompleted ? '✓' : stepNum}</div>
                <span className="step-label">{title}</span>
              </div>
            );
          })}
        </div>

        {/* STEP 1: Chief Complaints & Symptoms */}
        {currentStep === 1 && (
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
              What symptoms or discomfort are you experiencing?
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '18px' }}>
              Select all primary symptoms that apply today.
            </p>

            <div className="symptom-chips-grid">
              {symptomList.map((sym) => {
                const isSelected = selectedSymptoms.includes(sym.label);
                return (
                  <div
                    key={sym.id}
                    className={`symptom-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSymptom(sym.label)}
                  >
                    <span>{sym.icon}</span>
                    <span>{sym.label}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '16px', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Selected Symptoms: </span>
              <span style={{ fontSize: '0.85rem', color: '#0d9488' }}>
                {selectedSymptoms.length > 0 ? selectedSymptoms.join(', ') : 'None selected yet'}
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: Pain & Duration */}
        {currentStep === 2 && (
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
              Severity, Pain Scale & Duration
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '24px' }}>
              Rate your current discomfort on the standardized 1–10 clinical pain scale.
            </p>

            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Discomfort / Pain Level:</span>
                <span
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: painLevel >= 7 ? '#ef4444' : painLevel >= 4 ? '#f59e0b' : '#10b981'
                  }}
                >
                  {painLevel} / 10 - {painLevel >= 8 ? 'Severe' : painLevel >= 5 ? 'Moderate' : 'Mild'}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#0d9488', height: '8px', cursor: 'pointer' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px' }}>
                <span>1 (Minimal / No pain)</span>
                <span>5 (Moderate discomfort)</span>
                <span>10 (Worst imaginable)</span>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
                How long have these symptoms persisted?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {['Today only', '2-3 Days', '1-2 Weeks', '> 1 Month'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    className={`tab-pill ${duration === d ? 'active' : ''}`}
                    style={{ padding: '12px', textAlign: 'center' }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Vitals & History */}
        {currentStep === 3 && (
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
              Recorded Vitals & Medical Context
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
              Provide any home vital measurements if recently taken.
            </p>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Body Temperature (°F)</label>
                <input
                  type="text"
                  className="form-control"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="e.g. 98.6°F"
                />
              </div>

              <div className="form-group">
                <label>Blood Pressure (Systolic / Diastolic)</label>
                <input
                  type="text"
                  className="form-control"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                  placeholder="e.g. 120/80 mmHg"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Allergies & Lifestyle */}
        {currentStep === 4 && (
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
              Allergies & Lifestyle Factors
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
              Crucial for contraindication screening before prescriptions are issued.
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
                Do you have any known drug or food allergies?
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['No', 'Yes'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setHasAllergies(opt)}
                    className={`tab-pill ${hasAllergies === opt ? 'active' : ''}`}
                    style={{ padding: '8px 24px' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {hasAllergies === 'Yes' && (
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label>Please list specific allergies</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Penicillin, Aspirin, Peanuts"
                  value={allergiesDetail}
                  onChange={(e) => setAllergiesDetail(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label>Lifestyle & Habits</label>
              <textarea
                className="form-control"
                rows={2}
                value={lifestyleNotes}
                onChange={(e) => setLifestyleNotes(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* STEP 5: Triage Summary & Urgency Score */}
        {currentStep === 5 && (
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
              Intake Summary & AI Clinical Triage
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
              Automated clinical assessment based on your responses.
            </p>

            {/* Urgency Badge */}
            <div
              style={{
                background: triageStatus.bg,
                border: `1px solid ${triageStatus.color}`,
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldAlert size={26} color={triageStatus.color} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: triageStatus.color }}>
                      Triage Category: {triageStatus.level}
                    </h4>
                    <span style={{ fontSize: '0.85rem', color: '#334155' }}>
                      {triageStatus.rec}
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    background: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    color: triageStatus.color
                  }}
                >
                  Pain Score: {painLevel}/10
                </span>
              </div>
            </div>

            {/* Summary Details */}
            <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '14px', marginBottom: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.86rem' }}>
                <div><strong>Reported Symptoms:</strong> {selectedSymptoms.join(', ') || 'None'}</div>
                <div><strong>Duration:</strong> {duration}</div>
                <div><strong>Temperature:</strong> {temperature}</div>
                <div><strong>Blood Pressure:</strong> {bloodPressure}</div>
                <div><strong>Allergies:</strong> {hasAllergies === 'Yes' ? allergiesDetail : 'None declared'}</div>
                <div><strong>Recommended Dept:</strong> Cardiology / Internal Medicine</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                className="btn-secondary"
                onClick={() => {
                  alert('Intake questionnaire responses saved to your EHR profile!');
                  onNavigate('ehr');
                }}
              >
                Save to EHR Dossier
              </button>

              <button
                className="btn-primary"
                onClick={() => {
                  onStartTeleconsult({
                    name: 'Citizen Self-Triage',
                    appointedFor: selectedSymptoms.join(', ') || 'Clinical Evaluation',
                    vitals: { bp: bloodPressure, temp: temperature }
                  });
                }}
              >
                <Video size={17} />
                <span>Launch Teleconsult With Specialist</span>
              </button>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid #eef2f6'
          }}
        >
          <button
            type="button"
            className="btn-secondary"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            style={{ opacity: currentStep === 1 ? 0.4 : 1, cursor: currentStep === 1 ? 'not-allowed' : 'pointer' }}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              className="btn-primary"
              onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
            >
              <span>Next Step</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={() => alert('Questionnaire completed! Your triage file has been generated.')}
            >
              <CheckCircle size={16} />
              <span>Complete Assessment</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

