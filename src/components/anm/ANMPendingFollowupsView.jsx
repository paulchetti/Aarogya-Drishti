import React, { useState } from 'react';
import {
  Clock,
  AlertCircle,
  CheckCircle,
  Phone,
  Video,
  Calendar,
  User,
  Heart,
  Baby,
  Activity,
  Send,
  ArrowRight
} from 'lucide-react';

export default function ANMPendingFollowupsView({ onStartTeleconsult }) {
  const [toastMessage, setToastMessage] = useState('');

  const [followups, setFollowups] = useState([
    {
      id: 'FOL-01',
      citizenName: 'Rajeswari Killo',
      age: 21,
      gender: 'Female',
      hamlet: 'Paderu Ward 4 (Tribal Settlement)',
      phone: '9849223344',
      abhaId: '91-7712-4033-9128',
      type: 'High-Risk Pregnancy (34 Weeks)',
      reason: 'Severe Anemia (Hb 7.1 g/dL) & High BP (148/96). Recheck due for Iron Sucrose response.',
      daysOverdue: 4,
      priority: 'CRITICAL',
      lastSeen: '24 Oct 2025',
      doctorRef: 'Dr. Sandeep Kumar'
    },
    {
      id: 'FOL-02',
      citizenName: 'Chitti Babu',
      age: 49,
      gender: 'Male',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      phone: '9848556677',
      abhaId: '91-4432-8819-0092',
      type: 'Suspected Oral Pre-Cancer',
      reason: 'Erythroplakia red patch on mouth floor (>21 days). Biopsy order review pending.',
      daysOverdue: 2,
      priority: 'HIGH',
      lastSeen: '28 Oct 2025',
      doctorRef: 'Dr. Ananya Varma'
    },
    {
      id: 'FOL-03',
      citizenName: 'Anil Korra (Infant)',
      age: '9 Months',
      gender: 'Male',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      phone: '9848123450',
      abhaId: '91-8842-1923-5510 (Father)',
      type: 'Child Immunization Delay',
      reason: 'Measles-Rubella (MR-1) vaccine & Vitamin A dose overdue by 6 days.',
      daysOverdue: 6,
      priority: 'HIGH',
      lastSeen: '20 Oct 2025',
      doctorRef: 'Sub-Centre Session'
    },
    {
      id: 'FOL-04',
      citizenName: 'Appala Naidu',
      age: 63,
      gender: 'Male',
      hamlet: 'Paderu Ward 4 (Tribal Settlement)',
      phone: '9849001122',
      abhaId: '91-5541-2098-7619',
      type: 'Uncontrolled Hypertension',
      reason: 'BP 154/98 mmHg. Post-prescription compliance and salt reduction counseling follow-up.',
      daysOverdue: 1,
      priority: 'MODERATE',
      lastSeen: '27 Oct 2025',
      doctorRef: 'Dr. Sandeep Kumar'
    },
    {
      id: 'FOL-05',
      citizenName: 'Kondamma Korra',
      age: 56,
      gender: 'Female',
      hamlet: 'Paderu Ward 2 (Pedaguda)',
      phone: '9490123789',
      abhaId: '91-3419-7721-0024',
      type: 'Diabetes Blood Sugar Recheck',
      reason: 'Random blood sugar 230 mg/dL on last visit. Fasting blood glucose test needed.',
      daysOverdue: 3,
      priority: 'MODERATE',
      lastSeen: '25 Oct 2025',
      doctorRef: 'Dr. Sandeep Kumar'
    }
  ]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleResolveFollowup = (id, name) => {
    setFollowups((prev) => prev.filter((item) => item.id !== id));
    showNotification(`Logged completed field checkup for ${name}. Case moved to active records.`);
  };

  return (
    <div style={{ padding: '24px', background: '#f8fafc' }}>
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            background: '#0d9488',
            color: '#ffffff',
            padding: '12px 22px',
            borderRadius: '30px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            zIndex: 9999,
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div style={{ marginBottom: '22px' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
          Pending Patient Follow-ups &amp; Overdue Field Alerts
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
          Real-time tracking of overdue vitals checks, high-risk pregnancies, and delayed immunizations
        </p>
      </div>

      {/* SUMMARY BANNER */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #fee2e2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#dc2626', fontWeight: 700, textTransform: 'uppercase' }}>Total Overdue Follow-ups</span>
            <AlertCircle size={20} color="#dc2626" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#dc2626', marginTop: '6px' }}>
            {followups.length} Citizens
          </div>
          <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 600 }}>Immediate field intervention required</span>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>High Risk ANC Alerts</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0052cc', marginTop: '6px' }}>1 Mother</div>
          <span style={{ fontSize: '0.72rem', color: '#0052cc', fontWeight: 600 }}>Severe Anemia (Hb 7.1 g/dL)</span>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Delayed Child Vaccines</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706', marginTop: '6px' }}>1 Infant</div>
          <span style={{ fontSize: '0.72rem', color: '#d97706', fontWeight: 600 }}>MR-1 / Vit-A due at Ward 3</span>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Teleconsult Reviews</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7c3aed', marginTop: '6px' }}>2 Cases</div>
          <span style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 600 }}>Specialist &amp; MO Queued</span>
        </div>
      </div>

      {/* FOLLOW-UP CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {followups.map((f) => (
          <div
            key={f.id}
            style={{
              background: '#ffffff',
              borderRadius: '18px',
              border: f.priority === 'CRITICAL' ? '2px solid #fecaca' : '1.5px solid #e2e8f0',
              padding: '20px 24px',
              boxShadow: f.priority === 'CRITICAL' ? '0 6px 20px rgba(220, 38, 38, 0.08)' : '0 2px 8px rgba(0,0,0,0.02)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>{f.citizenName}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {f.age} • {f.gender} • {f.hamlet}
                </span>
                <span
                  style={{
                    background: f.priority === 'CRITICAL' ? '#fee2e2' : '#fef3c7',
                    color: f.priority === 'CRITICAL' ? '#dc2626' : '#d97706',
                    padding: '2px 10px',
                    borderRadius: '14px',
                    fontSize: '0.7rem',
                    fontWeight: 800
                  }}
                >
                  ● {f.priority} (Overdue by {f.daysOverdue} days)
                </span>
              </div>

              <div style={{ fontSize: '0.72rem', color: '#0284c7', fontFamily: 'monospace', marginTop: '2px' }}>
                ABHA ID: {f.abhaId} • Phone: 📞 {f.phone}
              </div>

              <div style={{ fontSize: '0.86rem', color: '#1e293b', fontWeight: 700, marginTop: '8px' }}>
                {f.type}
              </div>

              <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '2px' }}>
                <strong>Reason:</strong> {f.reason}
              </div>

              <div style={{ fontSize: '0.75rem', color: '#0052cc', fontWeight: 600, marginTop: '4px' }}>
                Supervising Doctor: {f.doctorRef} • Last Evaluated: {f.lastSeen}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '180px', alignItems: 'flex-end' }}>
              <button
                onClick={() => handleResolveFollowup(f.id, f.citizenName)}
                style={{
                  background: '#16a34a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '18px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                ✓ Mark Visit Done
              </button>

              <button
                onClick={() => showNotification(`SMS reminder dispatched to ${f.phone}`)}
                style={{
                  background: '#eff6ff',
                  color: '#0052cc',
                  border: 'none',
                  padding: '7px 16px',
                  borderRadius: '18px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Send size={13} />
                <span>Send SMS to Citizen</span>
              </button>

              {onStartTeleconsult && (
                <button
                  onClick={() =>
                    onStartTeleconsult({
                      name: f.citizenName,
                      age: f.age,
                      gender: f.gender,
                      abhaId: f.abhaId,
                      complaint: f.reason,
                      vitals: {}
                    })
                  }
                  style={{
                    background: '#0d9488',
                    color: '#ffffff',
                    border: 'none',
                    padding: '7px 16px',
                    borderRadius: '18px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Video size={13} />
                  <span>Call Doctor Live</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

