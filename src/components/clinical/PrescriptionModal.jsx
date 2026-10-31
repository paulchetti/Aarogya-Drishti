import React from 'react';
import { FileText, Printer, Download, CheckCircle2, ShieldCheck, HeartPulse } from 'lucide-react';

export default function PrescriptionModal({ rx, patient, onClose }) {
  if (!rx && !patient) return null;

  const currentPatient = patient || {
    name: 'Ethan Walker',
    age: '25 years',
    gender: 'Male',
    abhaId: '91-4829-1029-4501',
    phone: '+91 98765 43210'
  };

  const medicine = rx || {
    medicine: 'Metformin Hydrochloride (Glucophage)',
    dosage: '500 mg',
    frequency: 'Twice daily after meals',
    timing: 'Morning & Night',
    prescribedBy: 'Dr. Andrew Sharma, MD',
    specialty: 'Internal Medicine & Endocrinology',
    startDate: '15 Oct 2025',
    duration: '30 days',
    instructions: 'Take with food to minimize gastric discomfort. Maintain low glycemic diet.',
    refillsLeft: 2
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        {/* Modal Top Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="#0d9488" />
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Digital Medical Prescription</h3>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              className="btn-secondary"
              onClick={() => window.print()}
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            >
              <Printer size={15} />
              <span>Print Rx</span>
            </button>
            <button
              onClick={onClose}
              style={{
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Prescription Paper Document */}
        <div
          style={{
            border: '2px solid #e2e8f0',
            borderRadius: '16px',
            padding: '28px',
            background: '#ffffff',
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.02)'
          }}
        >
          {/* Header of Prescription */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottom: '2px solid #0d9488',
              paddingBottom: '16px',
              marginBottom: '16px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HeartPulse size={22} color="#0d9488" />
                <strong style={{ fontSize: '1.15rem', color: '#0b3d2f' }}>AAROGYA DRISHTI</strong>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                Ayushman Bharat Certified Telehealth Network
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                {medicine.prescribedBy || 'Dr. Andrew Sharma'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Reg. No: MCI-2015-884920
              </div>
              <div style={{ fontSize: '0.75rem', color: '#0d9488', fontWeight: 600 }}>
                {medicine.specialty || 'General & Internal Medicine'}
              </div>
            </div>
          </div>

          {/* Patient Details strip */}
          <div
            style={{
              background: '#f8fafc',
              padding: '12px 16px',
              borderRadius: '10px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              fontSize: '0.84rem',
              marginBottom: '20px'
            }}
          >
            <div>
              <span style={{ color: '#64748b' }}>Patient Name: </span>
              <strong>{currentPatient.name}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>Age / Gender: </span>
              <strong>{currentPatient.age} / {currentPatient.gender || 'Male'}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>ABHA ID: </span>
              <strong style={{ color: '#0d9488' }}>{currentPatient.abhaId}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>Date Issued: </span>
              <strong>{medicine.startDate || 'Today'}</strong>
            </div>
          </div>

          {/* Rx Symbol & Medication Body */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0d9488', fontFamily: 'serif', marginBottom: '8px' }}>
              ℞
            </div>

            <div
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
                background: '#fafafa'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>
                  {medicine.medicine}
                </strong>
                <span style={{ background: '#e0f2fe', color: '#0369a1', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', fontSize: '0.78rem' }}>
                  {medicine.dosage}
                </span>
              </div>

              <div style={{ margin: '8px 0', fontSize: '0.86rem', color: '#334155' }}>
                <strong>Frequency:</strong> {medicine.frequency} ({medicine.timing})
              </div>

              <div style={{ fontSize: '0.84rem', color: '#475569', background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>Clinical Instructions:</strong> {medicine.instructions}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.8rem', color: '#64748b' }}>
                <span>Duration: <strong>{medicine.duration || '30 days'}</strong></span>
                <span>Refills Authorized: <strong>{medicine.refillsLeft ?? 2} remaining</strong></span>
              </div>
            </div>
          </div>

          {/* Doctor Signature & Security QR */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: '1px dashed #cbd5e1',
              paddingTop: '18px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontSize: '0.78rem', fontWeight: 600 }}>
              <ShieldCheck size={20} color="#16a34a" />
              <span>Cryptographically Signed via ABDM Health Locker</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Brush Script MT, cursive', fontSize: '1.6rem', color: '#0b3d2f' }}>
                Andrew Sharma
              </div>
              <div style={{ borderTop: '1px solid #94a3b8', fontSize: '0.75rem', color: '#475569', paddingTop: '4px' }}>
                Authorized Medical Practitioner
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

