import React, { useState } from 'react';
import {
  Video,
  UserCheck,
  Calendar,
  Clock,
  Phone,
  AlertTriangle,
  CheckCircle,
  FileText,
  Activity
} from 'lucide-react';

export default function ANMTeleconsultReferralView({ onStartTeleconsult }) {
  const [toastMessage, setToastMessage] = useState('');

  const [referrals, setReferrals] = useState([
    {
      id: 'REF-01',
      patientName: 'Ramu Korra',
      age: 52,
      gender: 'Male',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      abhaId: '91-8842-1923-5510',
      referredDoctor: 'Dr. Sandeep Kumar',
      doctorRole: 'PHC Medical Officer',
      complaint: 'Stage 2 HTN (BP 158/98), Blood Sugar 215 mg/dL & Suspicious Oral Leukoplakia',
      priority: 'URGENT',
      vitals: { bp: '158/98', sugar: 215, spo2: 97 },
      status: 'Ready in Waiting Room'
    },
    {
      id: 'REF-02',
      patientName: 'Rajeswari Killo',
      age: 21,
      gender: 'Female',
      hamlet: 'Paderu Ward 4 (Tribal Settlement)',
      abhaId: '91-7712-4033-9128',
      referredDoctor: 'Dr. Ananya Varma',
      doctorRole: 'Specialist (Area Hospital Paderu)',
      complaint: 'High Risk Pregnancy (34 Weeks) with Severe Anemia (Hb 7.1 g/dL) and Elevated BP',
      priority: 'HIGH',
      vitals: { bp: '148/96', hb: 7.1, weeks: 34 },
      status: 'Ready in Waiting Room'
    },
    {
      id: 'REF-03',
      patientName: 'Chitti Babu',
      age: 49,
      gender: 'Male',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      abhaId: '91-4432-8819-0092',
      referredDoctor: 'Dr. Ananya Varma',
      doctorRole: 'Specialist (Oral Oncology)',
      complaint: 'Non-healing oral ulcer on floor of mouth (>21 days) with chewing tobacco habit',
      priority: 'HIGH',
      vitals: { bp: '162/104', sugar: 242, spo2: 94 },
      status: 'Queued for 02:30 PM'
    }
  ]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
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

      {/* DOCTOR AVAILABILITY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #ccfbf1', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
            alt="Dr. Sandeep Kumar"
            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #0d9488' }}
          />
          <div>
            <div style={{ fontWeight: 800, color: '#0f172a' }}>Dr. Sandeep Kumar</div>
            <div style={{ fontSize: '0.75rem', color: '#0d9488', fontWeight: 700 }}>PHC Medical Officer (Paderu)</div>
            <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600, marginTop: '2px' }}>
              ● Online for Field Teleconsults
            </div>
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #fed7aa', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img
            src="https://images.unsplash.com/photo-1594824813583-36603a110a11?auto=format&fit=crop&w=120&q=80"
            alt="Dr. Ananya Varma"
            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #f97316' }}
          />
          <div>
            <div style={{ fontWeight: 800, color: '#0f172a' }}>Dr. Ananya Varma, MD</div>
            <div style={{ fontSize: '0.75rem', color: '#f97316', fontWeight: 700 }}>Oral Oncologist &amp; Specialist</div>
            <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600, marginTop: '2px' }}>
              ● Available for High-Risk Referrals
            </div>
          </div>
        </div>
      </div>

      {/* REFERRAL QUEUE */}
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
            Village Frontline Teleconsultation Referral Queue
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Patients with the ANM awaiting doctor consultation
          </span>
        </div>

        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {referrals.map((ref) => (
            <div
              key={ref.id}
              style={{
                border: '1.5px solid #e2e8f0',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                background: '#ffffff'
              }}
            >
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>{ref.patientName}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {ref.age} yrs • {ref.gender} • {ref.hamlet}
                  </span>
                  <span
                    style={{
                      background: ref.priority === 'URGENT' ? '#fee2e2' : '#fef3c7',
                      color: ref.priority === 'URGENT' ? '#dc2626' : '#d97706',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 800
                    }}
                  >
                    ● {ref.priority}
                  </span>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#334155', marginTop: '6px' }}>
                  <strong>Clinical Findings:</strong> {ref.complaint}
                </div>

                <div style={{ fontSize: '0.75rem', color: '#0d9488', fontWeight: 700, marginTop: '4px' }}>
                  Referred To: {ref.referredDoctor} ({ref.doctorRole})
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() =>
                    onStartTeleconsult({
                      name: ref.patientName,
                      age: ref.age,
                      gender: ref.gender,
                      abhaId: ref.abhaId,
                      complaint: ref.complaint,
                      vitals: ref.vitals
                    })
                  }
                  style={{
                    background: 'linear-gradient(100deg, #0d9488, #0f766e)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '24px',
                    fontWeight: 800,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(13, 148, 136, 0.25)'
                  }}
                >
                  <Video size={16} />
                  <span>Start Live Video Call</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

