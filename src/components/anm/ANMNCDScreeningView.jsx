import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Droplets,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle,
  Video,
  FileText,
  UserCheck,
  Calendar,
  Filter,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function ANMNCDScreeningView({ onStartTeleconsult }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [showAddForm, setShowAddForm] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Initial Mock Village Screenings
  const [screenings, setScreenings] = useState([
    {
      id: 'VHW-2025-01',
      name: 'Ramu Korra',
      age: 52,
      gender: 'Male',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      abhaId: '91-8842-1923-5510',
      bp: '158/98',
      bpStatus: 'Stage 2 HTN',
      bloodSugar: 215,
      sugarStatus: 'High (Diabetic)',
      spo2: 97,
      oralScreening: 'Suspicious Leukoplakia (White Patch, Right Buccal)',
      riskLevel: 'HIGH',
      date: 'Today, 10:15 AM',
      referredToDoctor: true
    },
    {
      id: 'VHW-2025-02',
      name: 'Savitri Vanthala',
      age: 44,
      gender: 'Female',
      hamlet: 'Paderu Ward 1 (Main Village)',
      abhaId: '91-3211-9045-8822',
      bp: '124/82',
      bpStatus: 'Normal',
      bloodSugar: 112,
      sugarStatus: 'Normal',
      spo2: 99,
      oralScreening: 'Normal Mucosa',
      riskLevel: 'LOW',
      date: 'Today, 11:20 AM',
      referredToDoctor: false
    },
    {
      id: 'VHW-2025-03',
      name: 'Appala Naidu',
      age: 63,
      gender: 'Male',
      hamlet: 'Paderu Ward 4 (Tribal Settlement)',
      abhaId: '91-5541-2098-7619',
      bp: '142/92',
      bpStatus: 'Stage 1 HTN',
      bloodSugar: 168,
      sugarStatus: 'Elevated (Pre-Diabetic)',
      spo2: 95,
      oralScreening: 'Mild Submucous Fibrosis (Tobacco Chewer)',
      riskLevel: 'MODERATE',
      date: 'Today, 12:05 PM',
      referredToDoctor: true
    },
    {
      id: 'VHW-2025-04',
      name: 'Gowri Killo',
      age: 38,
      gender: 'Female',
      hamlet: 'Paderu Ward 2 (Pedaguda)',
      abhaId: '91-7712-4033-9128',
      bp: '118/76',
      bpStatus: 'Normal',
      bloodSugar: 98,
      sugarStatus: 'Normal',
      spo2: 98,
      oralScreening: 'Normal Mucosa',
      riskLevel: 'LOW',
      date: 'Yesterday',
      referredToDoctor: false
    },
    {
      id: 'VHW-2025-05',
      name: 'Chitti Babu',
      age: 49,
      gender: 'Male',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      abhaId: '91-4432-8819-0092',
      bp: '162/104',
      bpStatus: 'Hypertensive Crisis Alert',
      bloodSugar: 242,
      sugarStatus: 'High (Diabetic)',
      spo2: 94,
      oralScreening: 'Erythroplakia Red Patch (Floor of mouth)',
      riskLevel: 'HIGH',
      date: 'Yesterday',
      referredToDoctor: true
    }
  ]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    hamlet: 'Paderu Ward 3 (Gondiguda)',
    abhaId: '',
    systolic: '',
    diastolic: '',
    bloodSugar: '',
    spo2: '98',
    pulse: '76',
    oralCavity: 'Normal Mucosa',
    tobaccoUse: 'No',
    complaints: ''
  });

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.systolic || !formData.diastolic) {
      alert('Please fill citizen name, age, and blood pressure readings.');
      return;
    }

    const sys = parseInt(formData.systolic, 10);
    const dia = parseInt(formData.diastolic, 10);
    const sugar = parseInt(formData.bloodSugar, 10) || 110;

    let bpStatus = 'Normal';
    let riskLevel = 'LOW';

    if (sys >= 160 || dia >= 100) {
      bpStatus = 'Stage 2 HTN';
      riskLevel = 'HIGH';
    } else if (sys >= 140 || dia >= 90) {
      bpStatus = 'Stage 1 HTN';
      riskLevel = 'MODERATE';
    } else if (sys >= 130 || dia >= 85) {
      bpStatus = 'Pre-Hypertension';
      riskLevel = 'MODERATE';
    }

    let sugarStatus = 'Normal';
    if (sugar >= 200) {
      sugarStatus = 'High (Diabetic)';
      riskLevel = 'HIGH';
    } else if (sugar >= 140) {
      sugarStatus = 'Elevated (Pre-Diabetic)';
      if (riskLevel === 'LOW') riskLevel = 'MODERATE';
    }

    if (formData.oralCavity !== 'Normal Mucosa') {
      riskLevel = 'HIGH';
    }

    const newRecord = {
      id: `VHW-2025-${Math.floor(10 + Math.random() * 90)}`,
      name: formData.name,
      age: parseInt(formData.age, 10),
      gender: formData.gender,
      hamlet: formData.hamlet,
      abhaId: formData.abhaId || `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      bp: `${sys}/${dia}`,
      bpStatus,
      bloodSugar: sugar,
      sugarStatus,
      spo2: parseInt(formData.spo2, 10) || 98,
      oralScreening: formData.oralCavity,
      riskLevel,
      date: 'Just Now',
      referredToDoctor: riskLevel === 'HIGH'
    };

    setScreenings([newRecord, ...screenings]);
    setShowAddForm(false);
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      abhaId: '',
      systolic: '',
      diastolic: '',
      bloodSugar: '',
      spo2: '98',
      pulse: '76',
      oralCavity: 'Normal Mucosa',
      tobaccoUse: 'No',
      complaints: ''
    });

    showNotification(`Recorded screening for ${newRecord.name} (Risk: ${newRecord.riskLevel})`);
  };

  const filteredScreenings = screenings.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.hamlet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.abhaId.includes(searchTerm);
    if (filterRisk === 'ALL') return matchesSearch;
    return matchesSearch && s.riskLevel === filterRisk;
  });

  const highRiskCount = screenings.filter((s) => s.riskLevel === 'HIGH').length;
  const moderateRiskCount = screenings.filter((s) => s.riskLevel === 'MODERATE').length;

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

      {/* TOP STATS CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '18px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
              Total Village Screenings
            </span>
            <div style={{ background: '#eff6ff', color: '#2563eb', padding: '8px', borderRadius: '50%' }}>
              <UserCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '8px' }}>
            {screenings.length}
          </div>
          <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>
            ● Sub-Centre Paderu Target: 85% Completed
          </span>
        </div>

        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '18px',
            border: '1px solid #fee2e2',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: '#dc2626', fontWeight: 700, textTransform: 'uppercase' }}>
              High Risk Alerts
            </span>
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '8px', borderRadius: '50%' }}>
              <ShieldAlert size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#dc2626', marginTop: '8px' }}>
            {highRiskCount}
          </div>
          <span style={{ fontSize: '0.78rem', color: '#dc2626', fontWeight: 600 }}>
            Referred to PHC Medical Officer
          </span>
        </div>

        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '18px',
            border: '1px solid #fef3c7',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: '#d97706', fontWeight: 700, textTransform: 'uppercase' }}>
              Moderate Risk
            </span>
            <div style={{ background: '#fef3c7', color: '#d97706', padding: '8px', borderRadius: '50%' }}>
              <Activity size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706', marginTop: '8px' }}>
            {moderateRiskCount}
          </div>
          <span style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 600 }}>
            Lifestyle counseling &amp; 14-day recheck
          </span>
        </div>

        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '18px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
              Oral Lesions Detected
            </span>
            <div style={{ background: '#faf5ff', color: '#9333ea', padding: '8px', borderRadius: '50%' }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#9333ea', marginTop: '8px' }}>
            2
          </div>
          <span style={{ fontSize: '0.78rem', color: '#9333ea', fontWeight: 600 }}>
            Tele-Oncology referral queued
          </span>
        </div>
      </div>

      {/* ACTION BAR: SEARCH, RISK FILTER, NEW SCREENING BUTTON */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '280px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              borderRadius: '30px',
              padding: '6px 14px',
              border: '1px solid #cbd5e1',
              flex: 1,
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
            }}
          >
            <Search size={16} color="#64748b" style={{ marginRight: '8px' }} />
            <input
              type="text"
              placeholder="Search by citizen name, hamlet, or ABHA ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.88rem',
                color: '#1e293b'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'HIGH', 'MODERATE', 'LOW'].map((risk) => (
              <button
                key={risk}
                onClick={() => setFilterRisk(risk)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  border: filterRisk === risk ? 'none' : '1px solid #cbd5e1',
                  background:
                    filterRisk === risk
                      ? risk === 'HIGH'
                        ? '#dc2626'
                        : risk === 'MODERATE'
                        ? '#d97706'
                        : risk === 'LOW'
                        ? '#16a34a'
                        : '#0f172a'
                      : '#ffffff',
                  color: filterRisk === risk ? '#ffffff' : '#64748b',
                  cursor: 'pointer'
                }}
              >
                {risk}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            background: 'linear-gradient(100deg, #ff7a00, #f97316)',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '30px',
            fontWeight: 800,
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255, 122, 0, 0.25)'
          }}
        >
          <Plus size={18} />
          <span>{showAddForm ? 'Cancel Entry' : 'Record New Household Screening'}</span>
        </button>
      </div>

      {/* NEW SCREENING FORM ACCORDION */}
      {showAddForm && (
        <form
          onSubmit={handleFormSubmit}
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            border: '1.5px solid #ffedd5',
            boxShadow: '0 8px 30px rgba(255, 122, 0, 0.08)',
            marginBottom: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div style={{ background: '#fff7ed', color: '#ff7a00', padding: '8px', borderRadius: '50%' }}>
              <Activity size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: 800 }}>
                Door-to-Door NCD &amp; Field Health Screening Entry
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                Auxiliary Nurse Midwife (ANM) / ASHA Village Vitals Record
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Citizen Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Somulu Korra"
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Years"
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
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
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Hamlet / Ward
              </label>
              <select
                name="hamlet"
                value={formData.hamlet}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              >
                <option value="Paderu Ward 1 (Main Village)">Paderu Ward 1 (Main Village)</option>
                <option value="Paderu Ward 2 (Pedaguda)">Paderu Ward 2 (Pedaguda)</option>
                <option value="Paderu Ward 3 (Gondiguda)">Paderu Ward 3 (Gondiguda)</option>
                <option value="Paderu Ward 4 (Tribal Settlement)">Paderu Ward 4 (Tribal Settlement)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Systolic BP (mmHg) *
              </label>
              <input
                type="number"
                name="systolic"
                value={formData.systolic}
                onChange={handleInputChange}
                placeholder="e.g. 138"
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Diastolic BP (mmHg) *
              </label>
              <input
                type="number"
                name="diastolic"
                value={formData.diastolic}
                onChange={handleInputChange}
                placeholder="e.g. 88"
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Blood Sugar (mg/dL)
              </label>
              <input
                type="number"
                name="bloodSugar"
                value={formData.bloodSugar}
                onChange={handleInputChange}
                placeholder="Random Blood Sugar"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Oral Cavity Examination (Cancer Screen)
              </label>
              <select
                name="oralCavity"
                value={formData.oralCavity}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              >
                <option value="Normal Mucosa">Normal Mucosa (No Lesion)</option>
                <option value="Suspicious White Patch (Leukoplakia)">Suspicious White Patch (Leukoplakia)</option>
                <option value="Red Patch (Erythroplakia)">Red Patch (Erythroplakia)</option>
                <option value="Non-healing Ulcer (>14 Days)">Non-healing Ulcer (&gt;14 Days)</option>
                <option value="Submucous Fibrosis (Restricted mouth opening)">Submucous Fibrosis (Restricted mouth)</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#64748b',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 22px',
                borderRadius: '8px',
                border: 'none',
                background: '#ff7a00',
                color: '#ffffff',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Save &amp; Generate Triage
            </button>
          </div>
        </form>
      )}

      {/* SCREENINGS TABLE */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>
              Household Screening Registry (Sub-Centre Paderu)
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Showing {filteredScreenings.length} citizen health records
            </span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 18px' }}>Citizen &amp; ABHA ID</th>
                <th style={{ padding: '12px 18px' }}>Age / Gender</th>
                <th style={{ padding: '12px 18px' }}>Hamlet</th>
                <th style={{ padding: '12px 18px' }}>Blood Pressure</th>
                <th style={{ padding: '12px 18px' }}>Sugar (mg/dL)</th>
                <th style={{ padding: '12px 18px' }}>Oral Check</th>
                <th style={{ padding: '12px 18px' }}>Risk Level</th>
                <th style={{ padding: '12px 18px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredScreenings.map((sc) => (
                <tr key={sc.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}>
                  <td style={{ padding: '12px 18px' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{sc.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#0284c7', fontFamily: 'monospace' }}>
                      {sc.abhaId}
                    </div>
                  </td>
                  <td style={{ padding: '12px 18px', color: '#475569' }}>
                    {sc.age} yrs • {sc.gender}
                  </td>
                  <td style={{ padding: '12px 18px', color: '#64748b' }}>
                    {sc.hamlet}
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    <div style={{ fontWeight: 700, color: sc.bpStatus.includes('HTN') ? '#dc2626' : '#1e293b' }}>
                      {sc.bp} mmHg
                    </div>
                    <div style={{ fontSize: '0.7rem', color: sc.bpStatus.includes('HTN') ? '#dc2626' : '#16a34a' }}>
                      {sc.bpStatus}
                    </div>
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    <div style={{ fontWeight: 700, color: sc.bloodSugar > 180 ? '#dc2626' : '#1e293b' }}>
                      {sc.bloodSugar} mg/dL
                    </div>
                    <div style={{ fontSize: '0.7rem', color: sc.bloodSugar > 180 ? '#dc2626' : '#16a34a' }}>
                      {sc.sugarStatus}
                    </div>
                  </td>
                  <td style={{ padding: '12px 18px', maxWidth: '200px' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: sc.oralScreening.includes('Normal') ? '#16a34a' : '#9333ea',
                        background: sc.oralScreening.includes('Normal') ? '#f0fdf4' : '#faf5ff',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        display: 'inline-block'
                      }}
                    >
                      {sc.oralScreening}
                    </span>
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        background:
                          sc.riskLevel === 'HIGH'
                            ? '#fee2e2'
                            : sc.riskLevel === 'MODERATE'
                            ? '#fef3c7'
                            : '#f0fdf4',
                        color:
                          sc.riskLevel === 'HIGH'
                            ? '#dc2626'
                            : sc.riskLevel === 'MODERATE'
                            ? '#d97706'
                            : '#16a34a'
                      }}
                    >
                      ● {sc.riskLevel}
                    </span>
                  </td>
                  <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                    {sc.riskLevel === 'HIGH' && onStartTeleconsult ? (
                      <button
                        onClick={() =>
                          onStartTeleconsult({
                            name: sc.name,
                            age: sc.age,
                            gender: sc.gender,
                            abhaId: sc.abhaId,
                            complaint: `High Risk NCD: BP ${sc.bp}, Sugar ${sc.bloodSugar}, Oral: ${sc.oralScreening}`,
                            vitals: { bp: sc.bp, sugar: sc.bloodSugar, spo2: sc.spo2 }
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
                        <span>Teleconsult</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => showNotification(`Recorded 14-day follow up reminder for ${sc.name}`)}
                        style={{
                          background: '#f1f5f9',
                          color: '#475569',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '16px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Follow up
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
  );
}
