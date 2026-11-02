import React, { useState } from 'react';
import {
  CheckCircle2,
  FileCheck,
  Search,
  Filter,
  Award,
  Heart,
  Baby,
  Activity,
  Smile,
  ShieldCheck
} from 'lucide-react';

export default function ANMResolvedCasesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('ALL');

  const [resolvedCases, setResolvedCases] = useState([
    {
      id: 'RES-2025-01',
      citizenName: 'Appanna Korra',
      age: 46,
      gender: 'Male',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      abhaId: '91-4412-8877-0012',
      originalCondition: 'Pulmonary Tuberculosis (Bacteriologically Confirmed)',
      intervention: '6-Month Directly Observed Therapy (DOTS) under ANM supervision',
      outcome: 'Cured (Sputum Negative, Weight gained +6.2 kg)',
      resolvedDate: '28 Oct 2025',
      supervisingDoctor: 'Dr. Sandeep Kumar (PHC Paderu)',
      badgeColor: '#16a34a'
    },
    {
      id: 'RES-2025-02',
      citizenName: 'Devi Killo',
      age: 24,
      gender: 'Female',
      hamlet: 'Paderu Ward 4 (Tribal Settlement)',
      abhaId: '91-3321-9900-1144',
      originalCondition: 'High-Risk Pregnancy: Severe Anemia (Hb 6.8 g/dL)',
      intervention: '2 Doses IV Iron Sucrose at PHC + Daily IFA Tracking',
      outcome: 'Safe Institutional Delivery of Healthy Baby (3.1 kg), Hb 11.4 g/dL',
      resolvedDate: '24 Oct 2025',
      supervisingDoctor: 'Dr. Sandeep Kumar & Area Hospital Obstetrician',
      badgeColor: '#0052cc'
    },
    {
      id: 'RES-2025-03',
      citizenName: 'Sanyasi Rao',
      age: 58,
      gender: 'Male',
      hamlet: 'Paderu Ward 1 (Main Village)',
      abhaId: '91-6677-2233-4455',
      originalCondition: 'Severe Hypertension (Stage 2: 170/110 mmHg) & Headache',
      intervention: 'Teleconsultation with Medical Officer, Telmisartan 40mg initiated',
      outcome: 'BP Stabilized at 122/80 mmHg across 4 consecutive field visits',
      resolvedDate: '20 Oct 2025',
      supervisingDoctor: 'Dr. Sandeep Kumar (PHC Medical Officer)',
      badgeColor: '#16a34a'
    },
    {
      id: 'RES-2025-04',
      citizenName: 'Baby Tarun (S/o Gowri)',
      age: '14 Months',
      gender: 'Male',
      hamlet: 'Paderu Ward 2 (Pedaguda)',
      abhaId: '91-7788-0011-2233',
      originalCondition: 'Severe Acute Malnutrition (SAM) with bilateral pedal edema',
      intervention: '14-Day Admission at Nutrition Rehabilitation Centre (NRC) Paderu',
      outcome: 'Discharged in Green Zone (Weight: 8.6 kg, Mid-Upper Arm Circumference normal)',
      resolvedDate: '15 Oct 2025',
      supervisingDoctor: 'NRC Pediatrician & ANM Lakshmi Devi',
      badgeColor: '#d97706'
    },
    {
      id: 'RES-2025-05',
      citizenName: 'Mutyalamma Vanthala',
      age: 51,
      gender: 'Female',
      hamlet: 'Paderu Ward 5 (Valley Hamlet)',
      abhaId: '91-9900-1122-3344',
      originalCondition: 'Plasmodium Falciparum (Pf) Severe Malaria with High Fever',
      intervention: 'Artesunate Combination Therapy (ACT) + Long-Lasting Bed Net Issued',
      outcome: 'Complete parasite clearance, Afebrile, Full Recovery',
      resolvedDate: '08 Oct 2025',
      supervisingDoctor: 'Dr. Sandeep Kumar (PHC Paderu)',
      badgeColor: '#16a34a'
    }
  ]);

  const filtered = resolvedCases.filter((c) => {
    const matchesSearch =
      c.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.originalCondition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.hamlet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.abhaId.includes(searchTerm);
    return matchesSearch;
  });

  return (
    <div style={{ padding: '24px', background: '#f8fafc' }}>
      {/* HEADER */}
      <div style={{ marginBottom: '22px' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
          Resolved Cases &amp; Patient Treatment Outcomes
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
          Sub-Centre Paderu registry of stabilized chronic patients, cured infections &amp; safe deliveries
        </p>
      </div>

      {/* METRIC BANNER */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #bbf7d0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700, textTransform: 'uppercase' }}>Resolved This Quarter</span>
            <CheckCircle2 size={20} color="#16a34a" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16a34a', marginTop: '6px' }}>52 Cases</div>
          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>100% Validated by PHC MO</span>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>TB Treatment Success</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>100% (6 of 6)</div>
          <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600 }}>Zero DOTS default rate</span>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>High Risk ANC Resolved</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0052cc', marginTop: '6px' }}>14 Mothers</div>
          <span style={{ fontSize: '0.72rem', color: '#0052cc', fontWeight: 600 }}>All institutional deliveries</span>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>HTN/Diabetes Stabilized</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#7c3aed', marginTop: '6px' }}>28 Patients</div>
          <span style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 600 }}>Under regular medicine refill</span>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#ffffff', padding: '8px 16px', borderRadius: '30px', border: '1px solid #cbd5e1' }}>
          <Search size={16} color="#64748b" style={{ marginRight: '8px' }} />
          <input
            type="text"
            placeholder="Search by citizen name, condition (TB, Anemia, HTN), or ABHA..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.88rem' }}
          />
        </div>
      </div>

      {/* RESOLVED CASES CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              background: '#ffffff',
              borderRadius: '18px',
              border: '1.5px solid #e2e8f0',
              padding: '20px 24px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>{item.citizenName}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {item.age} • {item.gender} • {item.hamlet}
                </span>
                <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800 }}>
                  ✓ RESOLVED
                </span>
              </div>

              <div style={{ fontSize: '0.72rem', color: '#0284c7', fontFamily: 'monospace', marginTop: '2px' }}>
                {item.abhaId}
              </div>

              <div style={{ fontSize: '0.84rem', color: '#dc2626', fontWeight: 700, marginTop: '8px' }}>
                Initial Condition: <span style={{ color: '#334155', fontWeight: 600 }}>{item.originalCondition}</span>
              </div>

              <div style={{ fontSize: '0.84rem', color: '#0052cc', fontWeight: 700, marginTop: '4px' }}>
                Intervention: <span style={{ color: '#334155', fontWeight: 600 }}>{item.intervention}</span>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 800, marginTop: '6px', background: '#f0fdf4', padding: '6px 12px', borderRadius: '8px', display: 'inline-block' }}>
                🎯 Outcome: {item.outcome}
              </div>
            </div>

            <div style={{ textAlign: 'right', minWidth: '180px' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Date of Case Resolution:</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                {item.resolvedDate}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#0d9488', fontWeight: 700, marginTop: '4px' }}>
                {item.supervisingDoctor}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
