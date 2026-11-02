import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  CheckCircle,
  TrendingUp,
  Award,
  Calendar,
  Share2,
  FileText
} from 'lucide-react';

export default function ANMFieldAnalyticsView() {
  const [toastMessage, setToastMessage] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('October 2025');

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const kpis = [
    { label: 'Early ANC Registration (<12 Wks)', value: '92.4%', target: '>90%', status: 'TARGET ACHIEVED', color: '#16a34a' },
    { label: '4+ Antenatal Care (ANC) Visits', value: '94.8%', target: '>90%', status: 'TARGET ACHIEVED', color: '#16a34a' },
    { label: 'Institutional Delivery Rate', value: '100%', target: '100%', status: 'PERFECT RECORD', color: '#16a34a' },
    { label: 'Full Infant Immunization (UIP)', value: '96.5%', target: '>95%', status: 'TARGET ACHIEVED', color: '#16a34a' },
    { label: 'NCD Screening (30+ Population)', value: '84.2%', target: '>80%', status: 'TARGET ACHIEVED', color: '#0052cc' },
    { label: 'ABHA Digital Health Saturation', value: '81.7%', target: '>80%', status: 'ON TRACK', color: '#0052cc' },
    { label: 'Teleconsultation Completed', value: '46 Cases', target: '>30/mo', status: 'ACTIVE ADOPTION', color: '#7c3aed' },
    { label: 'TB DOTS Treatment Success', value: '100%', target: '>85%', status: 'ZERO DEFAULT', color: '#16a34a' }
  ];

  const handleExportReport = (type) => {
    showNotification(`Generated & Downloaded Sub-Centre Paderu ${type} for ${selectedMonth}`);
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

      {/* HEADER & ACTION BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '22px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
            Field Health Analytics &amp; Monthly Progress Reports (MPR)
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
            National Health Mission (NHM) &amp; ABDM Performance Indicators for Sub-Centre Paderu
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ padding: '9px 14px', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}
          >
            <option value="November 2025">November 2025 (MTD)</option>
            <option value="October 2025">October 2025 (Complete)</option>
            <option value="September 2025">September 2025 (Complete)</option>
          </select>

          <button
            onClick={() => handleExportReport('Monthly MPR Report (PDF)')}
            style={{
              background: '#0052cc',
              color: '#ffffff',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '20px',
              fontWeight: 800,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Download size={14} />
            <span>Export MPR</span>
          </button>

          <button
            onClick={() => handleExportReport('Field Data (Excel/CSV)')}
            style={{
              background: '#16a34a',
              color: '#ffffff',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '20px',
              fontWeight: 800,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <FileSpreadsheet size={14} />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* KPI TILES GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '26px'
        }}
      >
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '18px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, minHeight: '34px' }}>
              {kpi.label}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '10px' }}>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a' }}>
                {kpi.value}
              </div>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                Benchmark: {kpi.target}
              </span>
            </div>

            <div style={{ marginTop: '8px' }}>
              <span
                style={{
                  background: '#f0fdf4',
                  color: kpi.color,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: 800
                }}
              >
                ✓ {kpi.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* SUB-CENTRE MONTHLY PERFORMANCE AUDIT */}
      <div style={{ background: '#ffffff', borderRadius: '18px', padding: '24px', border: '1px solid #e2e8f0' }}>
        <h4 style={{ margin: '0 0 12px', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
          National Rural Health Mission (NRHM) Grading: Grade A+ Sub-Centre
        </h4>
        <p style={{ margin: '0 0 16px', fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
          Sub-Centre Paderu has fulfilled all primary healthcare delivery benchmarks for maternal survival, zero vaccine-preventable outbreaks, and proactive oral pre-malignant triage across tribal habitations.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ background: '#f8fafc', padding: '12px 18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>ASHA Workers Coordinated:</span>
            <div style={{ fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>5 ASHA Activists</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '12px 18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>Village Health Days Conducted:</span>
            <div style={{ fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>4 Sessions / Month</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '12px 18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>Drug Stock Availability:</span>
            <div style={{ fontWeight: 800, color: '#16a34a', marginTop: '2px' }}>96.8% Stocked</div>
          </div>
        </div>
      </div>
    </div>
  );
}

