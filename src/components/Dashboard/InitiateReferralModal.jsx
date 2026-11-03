import React, { useState } from 'react';
import {
  FileText,
  AlertTriangle,
  Hospital,
  UserCheck,
  Calendar,
  CheckCircle,
  Printer,
  X,
  Stethoscope,
  Video,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  initiateSpecialistReferral,
  TERTIARY_SPECIALIST_CENTER,
} from '../../services/referralRoutingService';

export default function InitiateReferralModal({ isOpen, patient, onClose, onReferralCreated, onStartVideoCall }) {
  const { language } = useLanguage();
  const [priority, setPriority] = useState('urgent');
  const [clinicalRationale, setClinicalRationale] = useState(
    patient
      ? `${patient.name} (${patient.ageSex}) from ${patient.village}, ${patient.mandal} Mandal presents with persistent oral lesion. Habit history: ${patient.exposureHistory?.map((h) => h.label).join(', ') || 'Tobacco chewing'}. Gemini AI triage indicates elevated suspicion. Urgent tele-oncology consult and diagnostic punch biopsy requested.`
      : ''
  );
  const [indicatedWorkups, setIndicatedWorkups] = useState([
    'Punch Biopsy (Histopathology)',
    'Brush Cytology Review',
    'Clinical Staging',
  ]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdReferral, setCreatedReferral] = useState(null);

  if (!isOpen || !patient) return null;

  const handleToggleWorkup = (workup) => {
    setIndicatedWorkups((prev) =>
      prev.includes(workup) ? prev.filter((w) => w !== workup) : [...prev, workup]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPatient = initiateSpecialistReferral(patient.id, {
      priority,
      referringDoctor: 'Dr. Sandeep Kumar, MBBS (G. Madugula PHC)',
      clinicalRationale,
      indicatedProcedures: indicatedWorkups,
    });

    if (updatedPatient) {
      setCreatedReferral(updatedPatient.referral);
      setIsSuccess(true);
      if (onReferralCreated) onReferralCreated(updatedPatient);
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1.5px solid #e2e8f0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1.5px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: isSuccess
              ? 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)'
              : 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: isSuccess ? '#dcfce7' : '#ffedd5',
                display: 'grid',
                placeItems: 'center',
                color: isSuccess ? '#16a34a' : '#ea580c',
              }}
            >
              {isSuccess ? <CheckCircle size={22} /> : <Hospital size={22} />}
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                ITDA Paderu • Inter-Facility Referral Pipeline
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {isSuccess
                  ? (language === 'te' ? 'రెఫరల్ స్లిప్ జారీ చేయబడింది' : 'Specialist Referral Confirmed')
                  : (language === 'te' ? 'స్పెషలిస్ట్‌కు అత్యవసర రెఫరల్ ప్రారంభించండి' : 'Escalate Referral to Oral Oncology Specialist')}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              color: '#64748b',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {!isSuccess ? (
            <form onSubmit={handleSubmit}>
              {/* Patient Snapshot Bar */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>PATIENT CASE</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                    {patient.name} ({patient.ageSex})
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>
                    ID: <strong>{patient.id}</strong> • {patient.village}, {patient.mandal} Mandal
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>REFERRING CLINICIAN</span>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f766e' }}>
                    Dr. Sandeep Kumar, MBBS
                  </div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>G. Madugula PHC</div>
                </div>
              </div>

              {/* Destination Hospital */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  {language === 'te' ? 'కేటాయించిన టెరిటరీ స్పెషలిస్ట్ సెంటర్:' : 'Designated Tertiary Specialist Center:'}
                </label>
                <div
                  style={{
                    background: '#eff6ff',
                    border: '1.5px solid #bfdbfe',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <Building2 size={24} color="#2563eb" />
                  <div>
                    <strong style={{ fontSize: '13.5px', color: '#1e3a8a' }}>
                      {TERTIARY_SPECIALIST_CENTER.hospitalName}
                    </strong>
                    <div style={{ fontSize: '12px', color: '#3b82f6' }}>
                      Specialist Head: {TERTIARY_SPECIALIST_CENTER.specialistName}
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority Selection */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '8px' }}>
                  {language === 'te' ? 'రెఫరల్ ప్రాధాన్యత (Priority Level) *' : 'Clinical Referral Priority *'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setPriority('urgent')}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      border: priority === 'urgent' ? '2px solid #dc2626' : '1.5px solid #cbd5e1',
                      background: priority === 'urgent' ? '#fef2f2' : '#ffffff',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b91c1c', fontWeight: 800 }}>
                      <AlertTriangle size={16} />
                      <span>{language === 'te' ? 'అత్యవసరం (URGENT - 48 గంటలు)' : 'URGENT PRIORITY (48-72h)'}</span>
                    </div>
                    <small style={{ color: '#64748b', fontSize: '11px', display: 'block', marginTop: '4px' }}>
                      High suspicion lesions, erythroleukoplakia, indurated ulcers
                    </small>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPriority('routine')}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      border: priority === 'routine' ? '2px solid #f59e0b' : '1.5px solid #cbd5e1',
                      background: priority === 'routine' ? '#fffbeb' : '#ffffff',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b45309', fontWeight: 800 }}>
                      <Calendar size={16} />
                      <span>{language === 'te' ? 'సాధారణ స్పెషలిస్ట్ సమీక్ష' : 'PRIORITY ROUTINE REVIEW'}</span>
                    </div>
                    <small style={{ color: '#64748b', fontSize: '11px', display: 'block', marginTop: '4px' }}>
                      Benign mucosal changes, low-grade OSMF, preventive check
                    </small>
                  </button>
                </div>
              </div>

              {/* Indicated Diagnostic Orders */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '8px' }}>
                  {language === 'te' ? 'సిఫార్సు చేసిన రోగనిర్ధారణ పరీక్షలు (Indicated Workups):' : 'Indicated Diagnostic Orders for Specialist:'}
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[
                    'Punch Biopsy (Histopathology)',
                    'Vital Toluidine Blue Staining',
                    'Brush Cytology Review',
                    'Contrast CT Facial/Neck Staging',
                    'Clinical Staging (TNM)',
                  ].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => handleToggleWorkup(w)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 700,
                        border: indicatedWorkups.includes(w) ? '1.5px solid #0d9488' : '1.5px solid #cbd5e1',
                        background: indicatedWorkups.includes(w) ? '#ccfbf1' : '#f8fafc',
                        color: indicatedWorkups.includes(w) ? '#0f766e' : '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      {indicatedWorkups.includes(w) ? '✓ ' : '+ '} {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clinical Rationale */}
              <div style={{ marginBottom: '22px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  {language === 'te' ? 'క్లినికల్ కారణం & వైద్యుల నోట్స్ (Clinical Rationale) *' : 'Clinical Rationale & Doctor Encounter Notes *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={clinicalRationale}
                  onChange={(e) => setClinicalRationale(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    lineHeight: 1.5,
                  }}
                />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    background: '#ffffff',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                  }}
                >
                  {language === 'te' ? 'రద్దు చేయండి' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 26px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
                  }}
                >
                  <span>{language === 'te' ? 'స్పెషలిస్ట్‌కు రెఫరల్ పంపండి →' : 'Dispatch Specialist Referral →'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Printable Referral Slip Confirmation */
            <div>
              <div
                style={{
                  border: '2px dashed #059669',
                  borderRadius: '14px',
                  padding: '24px',
                  background: '#f0fdf4',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #bbf7d0', paddingBottom: '14px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a' }}>OFFICIAL REFERRAL DOSSIER</span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#065f46', margin: '4px 0' }}>
                      {createdReferral?.referralId}
                    </h3>
                    <small style={{ color: '#047857' }}>
                      Generated: {createdReferral?.referralDate} • {createdReferral?.priorityLabel}
                    </small>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>DESTINATION HOSPITAL</span>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e3a8a' }}>{TERTIARY_SPECIALIST_CENTER.hospitalName}</div>
                    <div style={{ fontSize: '11.5px', color: '#2563eb' }}>Specialist: {TERTIARY_SPECIALIST_CENTER.specialistName}</div>
                  </div>
                </div>

                <div style={{ fontSize: '13px', color: '#1e293b', marginBottom: '12px' }}>
                  <strong>Patient:</strong> {patient.name} ({patient.ageSex}) • Mandal: {patient.mandal} • Village: {patient.village}
                </div>

                <div style={{ fontSize: '13px', color: '#334155', background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #d1fae5', marginBottom: '14px' }}>
                  <strong>Clinical Rationale:</strong>
                  <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{createdReferral?.clinicalRationale}</p>
                </div>

                <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#047857' }}>
                  <div>
                    <strong>Referring Doctor:</strong> {createdReferral?.referringDoctor}
                  </div>
                  <div>
                    <strong>Indicated Orders:</strong> {createdReferral?.indicatedProcedures.join(', ')}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    padding: '9px 16px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Printer size={16} />
                  <span>{language === 'te' ? 'రెఫరల్ స్లిప్ ముద్రించండి' : 'Print Referral Slip'}</span>
                </button>

                <div style={{ display: 'flex', gap: '10px' }}>
                  {onStartVideoCall && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onStartVideoCall(patient);
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(13, 148, 136, 0.35)',
                      }}
                    >
                      <Video size={18} />
                      <span>{language === 'te' ? '3-వే టెలిహెల్త్ వీడియో కాల్ ప్రారంభించండి →' : 'Launch 3-Way Video Gateway →'}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    style={{
                      background: '#f1f5f9',
                      border: 'none',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    {language === 'te' ? 'పూర్తయింది (Close)' : 'Done'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
