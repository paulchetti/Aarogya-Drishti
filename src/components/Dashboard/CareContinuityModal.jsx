import React, { useState } from 'react';
import {
  HeartPulse,
  History,
  UserCheck,
  Phone,
  Truck,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  X,
  Plus,
  Send,
  ShieldCheck,
  Activity,
  Microscope,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getAllPatients } from '../../services/referralRoutingService';

export default function CareContinuityModal({ isOpen, onClose, initialPatient = null }) {
  const { language } = useLanguage();
  const allPatients = getAllPatients();

  const [selectedPatientId, setSelectedPatientId] = useState(
    initialPatient?.id || (allPatients[0] ? allPatients[0].id : 'ADP-2026-0046')
  );
  const currentPatient =
    allPatients.find((p) => p.id === selectedPatientId) || initialPatient || allPatients[0];

  const [activeTab, setActiveTab] = useState('longitudinal'); // 'longitudinal' | 'navigation'

  // New Navigation Log entry state
  const [newContactNote, setNewContactNote] = useState('');
  const [newContactMode, setNewContactMode] = useState('Hamlet In-Person Visit');

  if (!isOpen || !currentPatient) return null;

  const handleAddNavigationLog = (e) => {
    e.preventDefault();
    if (!newContactNote.trim()) return;

    try {
      const stored = localStorage.getItem('aarogya_patients_db');
      if (stored) {
        const patients = JSON.parse(stored);
        const idx = patients.findIndex((p) => p.id === currentPatient.id);
        if (idx !== -1) {
          if (!patients[idx].patientNavigation) {
            patients[idx].patientNavigation = {
              assignedNavigator: 'ASHA Facilitator Parvathi Devi',
              navigatorPhone: '98480-11223',
              contactAttempts: [],
            };
          }
          patients[idx].patientNavigation.contactAttempts.push({
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            mode: newContactMode,
            outcome: newContactNote,
            by: 'PHC Staff / Dr. Sandeep Kumar',
          });
          patients[idx].longitudinalTimeline.push({
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            actor: 'Patient Navigator Parvathi Devi',
            action: `Contact attempt logged (${newContactMode}): ${newContactNote}`,
            status: 'Follow-Up Updated',
          });
          localStorage.setItem('aarogya_patients_db', JSON.stringify(patients));
          window.dispatchEvent(new Event('aarogya_patients_updated'));
          setNewContactNote('');
        }
      }
    } catch (err) {
      console.warn('Failed to update navigation log:', err);
    }
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
          maxWidth: '820px',
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
            background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#ffedd5',
                display: 'grid',
                placeItems: 'center',
                color: '#ea580c',
              }}
            >
              <HeartPulse size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                {language === 'te'
                  ? 'నిరంతర సంరక్షణ & పేషెంట్ నావిగేషన్ కన్సోల్'
                  : 'Care Continuity Tracking & Patient Navigation'}
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                {language === 'te'
                  ? 'మాడ్యూల్ H & I: లాంగిట్యూడినల్ ఈహెచ్ఆర్ రికార్డులు & గిరిజన ఫాలో-అప్ ఎస్కలేషన్'
                  : 'Modules H & I: Longitudinal EMR Audit Timeline & Tribal Patient Navigation'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: '#f1f5f9',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              color: '#64748b',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Patient Selection Bar */}
        <div
          style={{
            padding: '12px 24px',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>
              {language === 'te' ? 'కేసు ఎంపిక:' : 'Active Patient:'}
            </span>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '12px',
                fontWeight: 700,
                color: '#0f172a',
                background: '#ffffff',
              }}
            >
              {allPatients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id}) • {p.ageSex} • {p.village}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '8px',
                background: currentPatient.triageCategory === 'red_flag' ? '#fee2e2' : '#fef3c7',
                color: currentPatient.triageCategory === 'red_flag' ? '#b91c1c' : '#b45309',
              }}
            >
              {currentPatient.triageCategory === 'red_flag' ? '🚨 Red Flag Lesion' : '⚠️ Moderate Risk'}
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '8px',
                background: '#e0f2fe',
                color: '#0369a1',
              }}
            >
              Mandal: {currentPatient.mandal}
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', padding: '0 24px', background: '#ffffff' }}>
          <button
            type="button"
            onClick={() => setActiveTab('longitudinal')}
            style={{
              padding: '12px 18px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'longitudinal' ? '3px solid #ea580c' : '3px solid transparent',
              color: activeTab === 'longitudinal' ? '#ea580c' : '#64748b',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <History size={16} />
            <span>{language === 'te' ? 'మాడ్యూల్ H: లాంగిట్యూడినల్ టైమ్‌లైన్' : 'Module H: Longitudinal Case Timeline'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('navigation')}
            style={{
              padding: '12px 18px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'navigation' ? '3px solid #0d9488' : '3px solid transparent',
              color: activeTab === 'navigation' ? '#0d9488' : '#64748b',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <UserCheck size={16} />
            <span>{language === 'te' ? 'మాడ్యూల్ I: పేషెంట్ నావిగేషన్ & ఫాలో-అప్' : 'Module I: Patient Navigation & Reminders'}</span>
          </button>
        </div>

        {/* Tab 1: Module H Longitudinal Record */}
        {activeTab === 'longitudinal' && (
          <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '14px', color: '#0f172a' }}>
                  {language === 'te' ? 'పూర్తి క్లినికల్ ప్రయాణం & ఆడిట్ చరిత్ర' : 'Chronological Clinical Audit Trail'}
                </strong>
                <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b' }}>
                  {language === 'te'
                    ? 'రిజిస్ట్రేషన్ నుండి నిపుణుల బయాప్సీ వరకు ప్రతి చర్య సమయం మరియు వైద్యుల వివరాలతో నమోదు చేయబడింది.'
                    : 'All events retain actor identity, timestamps, and verifiable decision logs.'}
                </p>
              </div>

              <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, background: '#f0fdf4', padding: '4px 10px', borderRadius: '6px' }}>
                4 Consents Recorded & Verified
              </div>
            </div>

            {/* Stepper Timeline */}
            <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px solid #e2e8f0', marginLeft: '12px' }}>
              {(currentPatient.longitudinalTimeline || []).map((step, idx) => (
                <div key={idx} style={{ marginBottom: '18px', position: 'relative' }}>
                  {/* Pin Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-31px',
                      top: '2px',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: idx === (currentPatient.longitudinalTimeline.length - 1) ? '#ea580c' : '#0d9488',
                      border: '2px solid #ffffff',
                      boxShadow: '0 0 0 2px #cbd5e1',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '13px', color: '#0f172a' }}>{step.action}</strong>
                    <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{step.date}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#0d9488', fontWeight: 700, marginTop: '2px' }}>
                    By: {step.actor}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    Status: <span style={{ fontWeight: 600, color: '#334155' }}>{step.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Model Provenance Box (Module C Transparency Requirement) */}
            <div
              style={{
                marginTop: '20px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                fontSize: '11px',
                color: '#475569',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <ShieldCheck size={14} color="#0d9488" />
                <strong style={{ color: '#0f172a' }}>AI Model Provenance & Regulatory Notice:</strong>
              </div>
              Model: Gemini 1.5 Flash Vision Multimodal (Oncology Fine-Tuned Weights v2.4) • NOT FOR INDEPENDENT CLINICAL DIAGNOSIS. Photographs and AI suspicion scores supplement, but NEVER substitute for, a qualified clinician-ordered histopathological punch biopsy.
            </div>
          </div>
        )}

        {/* Tab 2: Module I Patient Navigation */}
        {activeTab === 'navigation' && (
          <div style={{ padding: '24px' }}>
            {/* Navigator Overview Card */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px',
                background: '#f8fafc',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                marginBottom: '20px',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                  Assigned Patient Navigator / ఆశా వర్కర్
                </span>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                  {currentPatient.patientNavigation?.assignedNavigator || 'ASHA Facilitator Parvathi Devi'}
                </div>
                <div style={{ fontSize: '12px', color: '#0d9488', fontWeight: 600, marginTop: '2px' }}>
                  📞 {currentPatient.patientNavigation?.navigatorPhone || '98480-11223'}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                  Tribal Transport Support / రవాణా సహాయం
                </span>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#16a34a', marginTop: '2px' }}>
                  ₹500 ITDA Voucher Issued (ITDA-TR-8491)
                </div>
                <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                  108 Feeder Ambulance on standby for Paderu Ghat travel
                </div>
              </div>
            </div>

            {/* Contact History */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                {language === 'te' ? 'సంప్రదింపు ప్రయత్నాల చరిత్ర (Contact Attempts)' : 'Patient Contact & Follow-Up Log'}
              </h4>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', color: '#475569', fontWeight: 700 }}>
                      <th style={{ padding: '8px 12px' }}>Timestamp</th>
                      <th style={{ padding: '8px 12px' }}>Channel</th>
                      <th style={{ padding: '8px 12px' }}>Outcome / Notes</th>
                      <th style={{ padding: '8px 12px' }}>Logged By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(currentPatient.patientNavigation?.contactAttempts || [
                      {
                        date: '2025-04-14 09:30',
                        mode: 'Hamlet In-Person Visit',
                        outcome: 'Visited residence in Kudumulu. Explained teleconsultation plan in Telugu. Family confirmed attendance.',
                        by: 'ASHA Parvathi Devi',
                      },
                      {
                        date: '2025-04-14 14:15',
                        mode: 'Phone Call (Telugu)',
                        outcome: 'Reminded patient of 10:30 AM specialist slot. Transport voucher arranged.',
                        by: 'PHC Staff',
                      },
                    ]).map((c, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 12px', color: '#64748b' }}>{c.date}</td>
                        <td style={{ padding: '8px 12px', fontWeight: 600 }}>{c.mode}</td>
                        <td style={{ padding: '8px 12px', color: '#334155' }}>{c.outcome}</td>
                        <td style={{ padding: '8px 12px', color: '#0d9488', fontWeight: 600 }}>{c.by}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add New Contact Attempt Form */}
            <form onSubmit={handleAddNavigationLog} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#0d9488', display: 'block', marginBottom: '8px' }}>
                {language === 'te' ? 'కొత్త ఫాలో-అప్ చర్యను నమోదు చేయండి' : 'Log New Contact / Escalation Note'}
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '10px', alignItems: 'center' }}>
                <select
                  value={newContactMode}
                  onChange={(e) => setNewContactMode(e.target.value)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: '#ffffff',
                  }}
                >
                  <option value="Hamlet In-Person Visit">Hamlet In-Person Visit</option>
                  <option value="Phone Call (Telugu)">Phone Call (Telugu)</option>
                  <option value="Missed Visit Escalation">Missed Visit Escalation</option>
                  <option value="Transport Coordination">Transport Coordination</option>
                </select>

                <input
                  type="text"
                  placeholder="Record outcome (e.g., patient reached, agreed to attend biopsy on Tuesday)..."
                  value={newContactNote}
                  onChange={(e) => setNewContactNote(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '12px',
                    background: '#ffffff',
                  }}
                />

                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#0d9488',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Plus size={14} />
                  <span>Log</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: 'none',
              background: '#0f172a',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {language === 'te' ? 'ముగించు' : 'Close Console'}
          </button>
        </div>
      </div>
    </div>
  );
}
