import React, { useState } from 'react';
import {
  Heart,
  Baby,
  Calendar,
  AlertCircle,
  CheckCircle,
  Plus,
  Search,
  Video,
  Shield,
  FileCheck
} from 'lucide-react';

export default function ANMMaternalChildView({ onStartTeleconsult }) {
  const [activeTab, setActiveTab] = useState('anc'); // 'anc' | 'immunization'
  const [toastMessage, setToastMessage] = useState('');

  const [ancMothers, setAncMothers] = useState([
    {
      id: 'ANC-01',
      name: 'Kumari Korra',
      age: 23,
      hamlet: 'Paderu Ward 3',
      gravida: 'G1P0',
      weeks: 28,
      trimester: '3rd Trimester',
      edd: '24 Jan 2026',
      hb: 8.4,
      bp: '136/88',
      highRisk: true,
      riskReason: 'Moderate Anemia (Hb 8.4 g/dL), Mild Pre-HTN',
      ifaTabletsGiven: 100,
      tdDose: 'Td-1 & Td-2 Done',
      nextVisit: '10 Nov 2025'
    },
    {
      id: 'ANC-02',
      name: 'Padma Vanthala',
      age: 26,
      hamlet: 'Paderu Ward 1',
      gravida: 'G2P1',
      weeks: 16,
      trimester: '2nd Trimester',
      edd: '15 Apr 2026',
      hb: 11.2,
      bp: '116/74',
      highRisk: false,
      riskReason: 'Normal Progression',
      ifaTabletsGiven: 60,
      tdDose: 'Td-1 Done',
      nextVisit: '22 Nov 2025'
    },
    {
      id: 'ANC-03',
      name: 'Rajeswari Killo',
      age: 21,
      hamlet: 'Paderu Ward 4',
      gravida: 'G1P0',
      weeks: 34,
      trimester: '3rd Trimester',
      edd: '12 Dec 2025',
      hb: 7.1,
      bp: '148/96',
      highRisk: true,
      riskReason: 'Severe Anemia (Hb 7.1 g/dL) & Gestational HTN',
      ifaTabletsGiven: 120,
      tdDose: 'Td-1 & Td-2 Done',
      nextVisit: 'Tomorrow (Urgent)'
    }
  ]);

  const [immunizations, setImmunizations] = useState([
    {
      id: 'IMM-01',
      childName: 'Anil Korra',
      motherName: 'Kumari Korra',
      age: '9 Months',
      dob: '02 Feb 2025',
      hamlet: 'Paderu Ward 3',
      vaccineDue: 'Measles-Rubella (MR-1) & Vitamin A (Dose 1)',
      status: 'Due Today',
      weight: '7.8 kg'
    },
    {
      id: 'IMM-02',
      childName: 'Bhavani Vanthala',
      motherName: 'Padma Vanthala',
      age: '14 Weeks',
      dob: '25 Jul 2025',
      hamlet: 'Paderu Ward 1',
      vaccineDue: 'Pentavalent-3, OPV-3 & fIPV-2',
      status: 'Administered',
      weight: '5.9 kg'
    },
    {
      id: 'IMM-03',
      childName: 'Santosh Killo',
      motherName: 'Latha Killo',
      age: 'Birth Dose',
      dob: '28 Oct 2025',
      hamlet: 'Paderu Ward 4',
      vaccineDue: 'BCG, OPV-0 & Hepatitis B Birth Dose',
      status: 'Administered',
      weight: '2.9 kg'
    }
  ]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleAdministerVaccine = (id) => {
    setImmunizations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Administered' } : item
      )
    );
    showNotification('Vaccine marked as Administered & updated to ABDM RCH Register.');
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

      {/* TOP TABS */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('anc')}
          style={{
            padding: '10px 22px',
            borderRadius: '30px',
            fontWeight: 800,
            fontSize: '0.88rem',
            border: 'none',
            background: activeTab === 'anc' ? '#0052cc' : '#ffffff',
            color: activeTab === 'anc' ? '#ffffff' : '#475569',
            boxShadow: activeTab === 'anc' ? '0 4px 14px rgba(0,82,204,0.25)' : '0 1px 3px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Heart size={16} />
          <span>Expectant Mothers (ANC Care)</span>
        </button>

        <button
          onClick={() => setActiveTab('immunization')}
          style={{
            padding: '10px 22px',
            borderRadius: '30px',
            fontWeight: 800,
            fontSize: '0.88rem',
            border: 'none',
            background: activeTab === 'immunization' ? '#0052cc' : '#ffffff',
            color: activeTab === 'immunization' ? '#ffffff' : '#475569',
            boxShadow: activeTab === 'immunization' ? '0 4px 14px rgba(0,82,204,0.25)' : '0 1px 3px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Baby size={16} />
          <span>Child Immunization (Universal Immunization Programme)</span>
        </button>
      </div>

      {activeTab === 'anc' ? (
        <div>
          {/* ANC STATS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>Total Registered Pregnancies</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>18</div>
              <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600 }}>100% Institutional Delivery Target</span>
            </div>

            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #fee2e2' }}>
              <span style={{ fontSize: '0.78rem', color: '#dc2626', fontWeight: 700 }}>High Risk Pregnancies (HRP)</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#dc2626', marginTop: '6px' }}>2</div>
              <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 600 }}>Flagged for Special MO Care</span>
            </div>

            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>IFA Compliance Rate</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0052cc', marginTop: '6px' }}>94%</div>
              <span style={{ fontSize: '0.72rem', color: '#0052cc', fontWeight: 600 }}>180 tablets course tracked</span>
            </div>
          </div>

          {/* MOTHERS LIST TABLE */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
              <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
                Active Antenatal Care (ANC) Roster - Paderu Sub-Centre
              </h4>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 18px' }}>Mother's Name</th>
                    <th style={{ padding: '12px 18px' }}>Gestational Age</th>
                    <th style={{ padding: '12px 18px' }}>Expected Delivery (EDD)</th>
                    <th style={{ padding: '12px 18px' }}>Vitals &amp; Hb</th>
                    <th style={{ padding: '12px 18px' }}>Tetanus (Td) &amp; IFA</th>
                    <th style={{ padding: '12px 18px' }}>Risk Status</th>
                    <th style={{ padding: '12px 18px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ancMothers.map((m) => (
                    <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 18px' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{m.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          {m.age} yrs • {m.hamlet} • {m.gravida}
                        </div>
                      </td>
                      <td style={{ padding: '12px 18px', color: '#0052cc', fontWeight: 700 }}>
                        {m.weeks} Weeks ({m.trimester})
                      </td>
                      <td style={{ padding: '12px 18px', color: '#1e293b', fontWeight: 600 }}>
                        {m.edd}
                      </td>
                      <td style={{ padding: '12px 18px' }}>
                        <div style={{ color: m.hb < 9 ? '#dc2626' : '#16a34a', fontWeight: 700 }}>
                          Hb: {m.hb} g/dL
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>BP: {m.bp}</div>
                      </td>
                      <td style={{ padding: '12px 18px', fontSize: '0.75rem', color: '#334155' }}>
                        <div>{m.tdDose}</div>
                        <div style={{ color: '#0052cc', fontWeight: 600 }}>{m.ifaTabletsGiven} IFA Issued</div>
                      </td>
                      <td style={{ padding: '12px 18px' }}>
                        {m.highRisk ? (
                          <span
                            style={{
                              background: '#fee2e2',
                              color: '#dc2626',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              display: 'inline-block'
                            }}
                          >
                            ⚠️ High Risk Pregnancy
                          </span>
                        ) : (
                          <span
                            style={{
                              background: '#f0fdf4',
                              color: '#16a34a',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '0.72rem',
                              fontWeight: 700
                            }}
                          >
                            ✓ Normal ANC
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                        {m.highRisk && onStartTeleconsult ? (
                          <button
                            onClick={() =>
                              onStartTeleconsult({
                                name: m.name,
                                age: m.age,
                                gender: 'Female',
                                abhaId: '91-ANC-' + m.id,
                                complaint: `High Risk Pregnancy: ${m.riskReason}, Gestation: ${m.weeks} weeks, Hb: ${m.hb} g/dL, BP: ${m.bp}`,
                                vitals: { bp: m.bp, hb: m.hb, weeks: m.weeks }
                              })
                            }
                            style={{
                              background: '#0d9488',
                              color: '#ffffff',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: '16px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <Video size={13} />
                            <span>Tele-Gynecology</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => showNotification(`Recorded ANC visit checkup for ${m.name}`)}
                            style={{
                              background: '#eff6ff',
                              color: '#0052cc',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: '16px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Log Visit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* IMMUNIZATION REGISTER */
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
            <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
              Infant &amp; Child Universal Immunization Schedule (UIP)
            </h4>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 18px' }}>Child Name</th>
                  <th style={{ padding: '12px 18px' }}>Mother / Guardian</th>
                  <th style={{ padding: '12px 18px' }}>Age &amp; Weight</th>
                  <th style={{ padding: '12px 18px' }}>Vaccines Due</th>
                  <th style={{ padding: '12px 18px' }}>Status</th>
                  <th style={{ padding: '12px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {immunizations.map((imm) => (
                  <tr key={imm.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 18px', fontWeight: 800, color: '#0f172a' }}>
                      {imm.childName}
                    </td>
                    <td style={{ padding: '12px 18px', color: '#475569' }}>
                      {imm.motherName} • {imm.hamlet}
                    </td>
                    <td style={{ padding: '12px 18px', color: '#334155' }}>
                      {imm.age} ({imm.weight})
                    </td>
                    <td style={{ padding: '12px 18px', color: '#0052cc', fontWeight: 600 }}>
                      {imm.vaccineDue}
                    </td>
                    <td style={{ padding: '12px 18px' }}>
                      <span
                        style={{
                          background: imm.status === 'Administered' ? '#f0fdf4' : '#fef3c7',
                          color: imm.status === 'Administered' ? '#16a34a' : '#d97706',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}
                      >
                        {imm.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                      {imm.status !== 'Administered' ? (
                        <button
                          onClick={() => handleAdministerVaccine(imm.id)}
                          style={{
                            background: '#16a34a',
                            color: '#ffffff',
                            border: 'none',
                            padding: '6px 14px',
                            borderRadius: '16px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Mark Given
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
                          ✓ Logged
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

