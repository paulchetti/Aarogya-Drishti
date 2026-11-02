import React, { useState } from 'react';
import {
  Search,
  Filter,
  User,
  Phone,
  FileText,
  Video,
  Calendar,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Activity,
  Heart
} from 'lucide-react';

export default function ANMPatientDirectoryView({ onStartTeleconsult }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHamlet, setSelectedHamlet] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedPatientModal, setSelectedPatientModal] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [patients, setPatients] = useState([
    {
      id: 'PT-01',
      name: 'Ramu Korra',
      age: 52,
      gender: 'Male',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      phone: '9848123450',
      abhaId: '91-8842-1923-5510',
      category: 'NCD Patient',
      vitals: { bp: '158/98', sugar: 215, spo2: 97, bmi: 24.2 },
      chronic: 'Hypertension (Stage 2) & Type 2 Diabetes',
      oralScreening: 'Leukoplakia White Patch',
      lastVisit: '02 Nov 2025',
      risk: 'HIGH',
      teleconsultDone: true
    },
    {
      id: 'PT-02',
      name: 'Kumari Korra',
      age: 23,
      gender: 'Female',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      phone: '9848998811',
      abhaId: '91-1122-3344-5566',
      category: 'ANC Mother',
      vitals: { bp: '136/88', sugar: 94, spo2: 99, bmi: 21.8 },
      chronic: 'Moderate Anemia (Hb 8.4 g/dL)',
      oralScreening: 'Normal Mucosa',
      lastVisit: '01 Nov 2025',
      risk: 'HIGH',
      teleconsultDone: false
    },
    {
      id: 'PT-03',
      name: 'Savitri Vanthala',
      age: 44,
      gender: 'Female',
      hamlet: 'Paderu Ward 1 (Main Village)',
      phone: '9440129988',
      abhaId: '91-3211-9045-8822',
      category: 'General',
      vitals: { bp: '124/82', sugar: 112, spo2: 99, bmi: 22.4 },
      chronic: 'None',
      oralScreening: 'Normal Mucosa',
      lastVisit: '29 Oct 2025',
      risk: 'LOW',
      teleconsultDone: false
    },
    {
      id: 'PT-04',
      name: 'Appala Naidu',
      age: 63,
      gender: 'Male',
      hamlet: 'Paderu Ward 4 (Tribal Settlement)',
      phone: '9849001122',
      abhaId: '91-5541-2098-7619',
      category: 'Elderly',
      vitals: { bp: '142/92', sugar: 168, spo2: 95, bmi: 25.1 },
      chronic: 'Stage 1 HTN & Pre-diabetes',
      oralScreening: 'Mild Submucous Fibrosis',
      lastVisit: '28 Oct 2025',
      risk: 'MODERATE',
      teleconsultDone: true
    },
    {
      id: 'PT-05',
      name: 'Gowri Killo',
      age: 38,
      gender: 'Female',
      hamlet: 'Paderu Ward 2 (Pedaguda)',
      phone: '9490334455',
      abhaId: '91-7712-4033-9128',
      category: 'General',
      vitals: { bp: '118/76', sugar: 98, spo2: 98, bmi: 21.0 },
      chronic: 'None',
      oralScreening: 'Normal Mucosa',
      lastVisit: '25 Oct 2025',
      risk: 'LOW',
      teleconsultDone: false
    },
    {
      id: 'PT-06',
      name: 'Chitti Babu',
      age: 49,
      gender: 'Male',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      phone: '9848556677',
      abhaId: '91-4432-8819-0092',
      category: 'NCD Patient',
      vitals: { bp: '162/104', sugar: 242, spo2: 94, bmi: 26.5 },
      chronic: 'Hypertension & Oral Lesion Alert',
      oralScreening: 'Erythroplakia Red Patch',
      lastVisit: '24 Oct 2025',
      risk: 'HIGH',
      teleconsultDone: true
    }
  ]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const filteredPatients = patients.filter((pt) => {
    const matchesSearch =
      pt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pt.abhaId.includes(searchTerm) ||
      pt.phone.includes(searchTerm) ||
      pt.chronic.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesHamlet = selectedHamlet === 'ALL' || pt.hamlet.includes(selectedHamlet);
    const matchesCat = selectedCategory === 'ALL' || pt.category === selectedCategory;

    return matchesSearch && matchesHamlet && matchesCat;
  });

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

      {/* HEADER & FILTER BAR */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
          Village Patient Directory &amp; Longitudinal Health Records
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
          Search across 3,940 registered citizens in Sub-Centre Paderu catchment
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '22px' }}>
        <div style={{ flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center', background: '#ffffff', padding: '8px 16px', borderRadius: '30px', border: '1px solid #cbd5e1' }}>
          <Search size={16} color="#64748b" style={{ marginRight: '8px' }} />
          <input
            type="text"
            placeholder="Search by name, 14-digit ABHA, mobile, or chronic condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.88rem' }}
          />
        </div>

        <select
          value={selectedHamlet}
          onChange={(e) => setSelectedHamlet(e.target.value)}
          style={{ padding: '9px 14px', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}
        >
          <option value="ALL">All Hamlets (5 Wards)</option>
          <option value="Ward 1">Ward 1 (Main Village)</option>
          <option value="Ward 2">Ward 2 (Pedaguda)</option>
          <option value="Ward 3">Ward 3 (Gondiguda)</option>
          <option value="Ward 4">Ward 4 (Tribal Colony)</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '9px 14px', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}
        >
          <option value="ALL">All Categories</option>
          <option value="NCD Patient">NCD Patients (HTN/Diabetes)</option>
          <option value="ANC Mother">ANC Mothers (Pregnant)</option>
          <option value="Elderly">Elderly (60+)</option>
          <option value="General">General Citizens</option>
        </select>
      </div>

      {/* PATIENTS DIRECTORY TABLE */}
      <div style={{ background: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
              Sub-Centre Citizen Roster
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Showing {filteredPatients.length} matching patients
            </span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 18px' }}>Patient &amp; ABHA</th>
                <th style={{ padding: '12px 18px' }}>Age / Gender</th>
                <th style={{ padding: '12px 18px' }}>Hamlet &amp; Mobile</th>
                <th style={{ padding: '12px 18px' }}>Latest Vitals</th>
                <th style={{ padding: '12px 18px' }}>Chronic Status</th>
                <th style={{ padding: '12px 18px' }}>Triage Risk</th>
                <th style={{ padding: '12px 18px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((pt) => (
                <tr key={pt.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 18px' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{pt.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#0284c7', fontFamily: 'monospace' }}>
                      {pt.abhaId}
                    </div>
                  </td>
                  <td style={{ padding: '12px 18px', color: '#334155' }}>
                    {pt.age} yrs • {pt.gender}
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    <div style={{ color: '#475569' }}>{pt.hamlet}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>📞 {pt.phone}</div>
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>BP: {pt.vitals.bp}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Sugar: {pt.vitals.sugar} mg/dL • SpO2: {pt.vitals.spo2}%
                    </div>
                  </td>
                  <td style={{ padding: '12px 18px', maxWidth: '200px' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>
                      {pt.chronic}
                    </div>
                    {pt.oralScreening !== 'Normal Mucosa' && (
                      <span style={{ fontSize: '0.7rem', color: '#9333ea', fontWeight: 700 }}>
                        ⚠️ {pt.oralScreening}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '14px',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        background:
                          pt.risk === 'HIGH'
                            ? '#fee2e2'
                            : pt.risk === 'MODERATE'
                            ? '#fef3c7'
                            : '#f0fdf4',
                        color:
                          pt.risk === 'HIGH'
                            ? '#dc2626'
                            : pt.risk === 'MODERATE'
                            ? '#d97706'
                            : '#16a34a'
                      }}
                    >
                      ● {pt.risk}
                    </span>
                  </td>
                  <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        onClick={() => setSelectedPatientModal(pt)}
                        style={{
                          background: '#eff6ff',
                          color: '#0052cc',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '14px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Profile
                      </button>

                      {pt.risk === 'HIGH' && onStartTeleconsult && (
                        <button
                          onClick={() =>
                            onStartTeleconsult({
                              name: pt.name,
                              age: pt.age,
                              gender: pt.gender,
                              abhaId: pt.abhaId,
                              complaint: pt.chronic,
                              vitals: pt.vitals
                            })
                          }
                          style={{
                            background: '#0d9488',
                            color: '#ffffff',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '14px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Video size={12} />
                          <span>Call MO</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PATIENT DETAIL MODAL */}
      {selectedPatientModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px'
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              maxWidth: '560px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#0052cc', fontWeight: 800, textTransform: 'uppercase' }}>
                  Citizen Longitudinal Health Profile
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                  {selectedPatientModal.name}
                </h3>
                <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: '#0284c7', fontWeight: 700 }}>
                  ABHA ID: {selectedPatientModal.abhaId}
                </div>
              </div>

              <span
                style={{
                  background: selectedPatientModal.risk === 'HIGH' ? '#fee2e2' : '#f0fdf4',
                  color: selectedPatientModal.risk === 'HIGH' ? '#dc2626' : '#16a34a',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '0.75rem',
                  fontWeight: 800
                }}
              >
                ● {selectedPatientModal.risk} RISK
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', background: '#f8fafc', padding: '16px', borderRadius: '16px', marginBottom: '18px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Demographics:</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                  {selectedPatientModal.age} yrs • {selectedPatientModal.gender}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Location:</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                  {selectedPatientModal.hamlet}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Phone:</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                  {selectedPatientModal.phone}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Last ANM Visit:</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                  {selectedPatientModal.lastVisit}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                Clinical Records &amp; Diagnostic Findings:
              </div>
              <div style={{ fontSize: '0.85rem', color: '#334155' }}>
                • <strong>Vitals:</strong> BP {selectedPatientModal.vitals.bp} mmHg, Blood Sugar {selectedPatientModal.vitals.sugar} mg/dL, SpO2 {selectedPatientModal.vitals.spo2}%
              </div>
              <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '4px' }}>
                • <strong>Oral Cancer Screening:</strong> {selectedPatientModal.oralScreening}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '4px' }}>
                • <strong>Condition:</strong> {selectedPatientModal.chronic}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setSelectedPatientModal(null)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '16px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  showNotification(`Scheduled follow up visit for ${selectedPatientModal.name}`);
                  setSelectedPatientModal(null);
                }}
                style={{
                  padding: '8px 18px',
                  borderRadius: '16px',
                  border: 'none',
                  background: '#0052cc',
                  color: '#ffffff',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Schedule Follow-up Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

