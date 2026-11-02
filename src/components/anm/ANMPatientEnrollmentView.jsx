import React, { useState } from 'react';
import {
  UserPlus,
  CheckCircle,
  CreditCard,
  QrCode,
  Users,
  Shield,
  Heart,
  Activity,
  FileCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function ANMPatientEnrollmentView({ onStartTeleconsult }) {
  const [toastMessage, setToastMessage] = useState('');
  const [createdEnrollment, setCreatedEnrollment] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    guardianName: '',
    gender: 'Male',
    age: '',
    dob: '',
    phone: '',
    aadhaar: '',
    hamlet: 'Paderu Ward 3 (Gondiguda)',
    vulnerability: 'General BPL',
    chronicConditions: 'None',
    tobaccoUse: 'No',
    systolic: '120',
    diastolic: '80',
    bloodSugar: '105',
    height: '165',
    weight: '62'
  });

  const [recentEnrolled, setRecentEnrolled] = useState([
    {
      id: 'ENR-2025-88',
      name: 'Somulu Korra',
      guardian: 'Chitti Babu (Father)',
      gender: 'Male',
      age: 48,
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      abhaId: '91-8842-1923-5510',
      vulnerability: 'PVTG (Particularly Vulnerable Tribal)',
      chronic: 'Hypertension Stage 1',
      date: 'Today, 09:30 AM'
    },
    {
      id: 'ENR-2025-87',
      name: 'Bhavani Killo',
      guardian: 'Ramu Killo (Spouse)',
      gender: 'Female',
      age: 26,
      hamlet: 'Paderu Ward 2 (Pedaguda)',
      abhaId: '91-3419-7721-0024',
      vulnerability: 'Antenatal Mother (2nd Trimester)',
      chronic: 'Mild Anemia',
      date: 'Today, 10:45 AM'
    },
    {
      id: 'ENR-2025-86',
      name: 'Appala Swamy',
      guardian: 'Subba Rao (Father)',
      gender: 'Male',
      age: 64,
      hamlet: 'Paderu Ward 4 (Tribal Settlement)',
      abhaId: '91-5521-9981-4432',
      vulnerability: 'Senior Citizen (Elderly BPL)',
      chronic: 'Type 2 Diabetes',
      date: 'Yesterday'
    }
  ]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.phone) {
      alert('Please fill Citizen Full Name, Age, and Mobile number.');
      return;
    }

    const generatedAbha = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord = {
      id: `ENR-2025-${Math.floor(10 + Math.random() * 90)}`,
      name: formData.name,
      guardian: formData.guardianName || 'Family Head',
      gender: formData.gender,
      age: parseInt(formData.age, 10),
      hamlet: formData.hamlet,
      abhaId: generatedAbha,
      vulnerability: formData.vulnerability,
      chronic: formData.chronicConditions,
      date: 'Just Now'
    };

    setRecentEnrolled([newRecord, ...recentEnrolled]);
    setCreatedEnrollment(newRecord);
    showNotification(`Successfully enrolled ${newRecord.name} with ABHA ID: ${newRecord.abhaId}`);

    // Reset Form
    setFormData({
      name: '',
      guardianName: '',
      gender: 'Male',
      age: '',
      dob: '',
      phone: '',
      aadhaar: '',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      vulnerability: 'General BPL',
      chronicConditions: 'None',
      tobaccoUse: 'No',
      systolic: '120',
      diastolic: '80',
      bloodSugar: '105',
      height: '165',
      weight: '62'
    });
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

      {/* HEADER SUMMARY */}
      <div style={{ marginBottom: '22px' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
          Frontline Citizen Enrollment &amp; Demographics Intake
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
          Door-to-door ABHA Registration, Longitudinal Electronic Health Record (EHR) &amp; Demographic Intake
        </p>
      </div>

      {/* RECENTLY GENERATED ABHA BANNER */}
      {createdEnrollment && (
        <div
          style={{
            background: 'linear-gradient(135deg, #0b2545 0%, #1e3a8a 100%)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '20px 24px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: '0 8px 28px rgba(11, 37, 69, 0.2)'
          }}
        >
          <div>
            <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' }}>
              ✓ ABHA ID Generated &amp; Synced with National Health Authority (NHA)
            </span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px' }}>
              {createdEnrollment.name} • {createdEnrollment.age} yrs ({createdEnrollment.gender})
            </div>
            <div style={{ fontSize: '1.1rem', fontFamily: 'monospace', color: '#5eead4', fontWeight: 800, marginTop: '2px' }}>
              {createdEnrollment.abhaId}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '4px' }}>
              Hamlet: {createdEnrollment.hamlet} • Category: {createdEnrollment.vulnerability}
            </div>
          </div>
          <button
            onClick={() => setCreatedEnrollment(null)}
            style={{
              background: '#38bdf8',
              color: '#0b2545',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '20px',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ENROLLMENT FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '24px',
          border: '1.5px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          marginBottom: '28px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ background: '#fff7ed', color: '#ff7a00', padding: '8px', borderRadius: '50%' }}>
            <UserPlus size={20} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              Step 1: Citizen Demographic &amp; Household Profile
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Enter full Aadhaar or local verification details
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Citizen Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Kondamma Korra"
              required
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Father / Husband / Guardian Name
            </label>
            <input
              type="text"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleInputChange}
              placeholder="e.g. Ramu Korra"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Age (Years) *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="e.g. 42"
              required
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Mobile Phone (Citizen / Head) *
            </label>
            <input
              type="tel"
              name="phone"
              maxLength={10}
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="10-digit Mobile"
              required
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Aadhaar Number (12 Digits)
            </label>
            <input
              type="text"
              name="aadhaar"
              maxLength={12}
              value={formData.aadhaar}
              onChange={handleInputChange}
              placeholder="XXXX XXXX XXXX"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Hamlet / Habitation Area
            </label>
            <select
              name="hamlet"
              value={formData.hamlet}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            >
              <option value="Paderu Ward 1 (Main Village)">Paderu Ward 1 (Main Village)</option>
              <option value="Paderu Ward 2 (Pedaguda)">Paderu Ward 2 (Pedaguda)</option>
              <option value="Paderu Ward 3 (Gondiguda)">Paderu Ward 3 (Gondiguda)</option>
              <option value="Paderu Ward 4 (Tribal Settlement)">Paderu Ward 4 (Tribal Settlement)</option>
              <option value="Paderu Ward 5 (Valley Hamlet)">Paderu Ward 5 (Valley Hamlet)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Socio-Economic Vulnerability
            </label>
            <select
              name="vulnerability"
              value={formData.vulnerability}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            >
              <option value="General BPL">General BPL (White Ration Card)</option>
              <option value="PVTG (Particularly Vulnerable Tribal)">PVTG (Tribal Group)</option>
              <option value="Antenatal Mother (ANC)">Antenatal Mother (ANC)</option>
              <option value="Postnatal Mother (PNC)">Postnatal Mother (PNC)</option>
              <option value="Senior Citizen (Elderly BPL)">Senior Citizen (Elderly BPL)</option>
              <option value="Specially Abled / PwD">Specially Abled / PwD</option>
            </select>
          </div>
        </div>

        {/* VITALS SECTION */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
            Step 2: Baseline Clinical Vitals &amp; Comorbidity Screening
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                Systolic BP (mmHg)
              </label>
              <input
                type="number"
                name="systolic"
                value={formData.systolic}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                Diastolic BP (mmHg)
              </label>
              <input
                type="number"
                name="diastolic"
                value={formData.diastolic}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                Random Blood Sugar (mg/dL)
              </label>
              <input
                type="number"
                name="bloodSugar"
                value={formData.bloodSugar}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                Known Chronic Condition
              </label>
              <select
                name="chronicConditions"
                value={formData.chronicConditions}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              >
                <option value="None">None Reported</option>
                <option value="Hypertension">Hypertension</option>
                <option value="Type 2 Diabetes">Type 2 Diabetes</option>
                <option value="Tuberculosis (Under DOTS)">Tuberculosis (Under DOTS)</option>
                <option value="Asthma / COPD">Asthma / COPD</option>
                <option value="Sickle Cell Anemia">Sickle Cell Anemia (Tribal Screen)</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(100deg, #ff7a00, #f97316)',
              color: '#ffffff',
              border: 'none',
              padding: '11px 26px',
              borderRadius: '24px',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(255, 122, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <UserPlus size={16} />
            <span>Complete Enrollment &amp; Generate ABHA</span>
          </button>
        </div>
      </form>

      {/* RECENTLY ENROLLED CITIZENS LIST */}
      <div style={{ background: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
            Recently Enrolled Citizens (Sub-Centre Paderu Register)
          </h4>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 18px' }}>Citizen &amp; ABHA ID</th>
                <th style={{ padding: '12px 18px' }}>Guardian</th>
                <th style={{ padding: '12px 18px' }}>Age / Gender</th>
                <th style={{ padding: '12px 18px' }}>Hamlet</th>
                <th style={{ padding: '12px 18px' }}>Vulnerability Category</th>
                <th style={{ padding: '12px 18px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentEnrolled.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 18px' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{item.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#0284c7', fontFamily: 'monospace' }}>
                      {item.abhaId}
                    </div>
                  </td>
                  <td style={{ padding: '12px 18px', color: '#475569' }}>
                    {item.guardian}
                  </td>
                  <td style={{ padding: '12px 18px', color: '#334155' }}>
                    {item.age} yrs • {item.gender}
                  </td>
                  <td style={{ padding: '12px 18px', color: '#64748b' }}>
                    {item.hamlet}
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    <span style={{ background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600 }}>
                      {item.vulnerability}
                    </span>
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                      ✓ Enrolled ({item.date})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
