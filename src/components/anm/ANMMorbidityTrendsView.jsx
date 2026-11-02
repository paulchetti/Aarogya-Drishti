import React, { useState } from 'react';
import {
  TrendingUp,
  Activity,
  AlertTriangle,
  PieChart,
  BarChart,
  Calendar,
  ShieldAlert,
  Flame,
  CheckCircle
} from 'lucide-react';

export default function ANMMorbidityTrendsView() {
  const [selectedSeason, setSelectedSeason] = useState('ALL');

  const monthlyTrends = [
    { month: 'Jun', htn: 42, diabetes: 24, malaria: 8, oralLesion: 3, diarrhea: 14 },
    { month: 'Jul', htn: 46, diabetes: 26, malaria: 28, oralLesion: 4, diarrhea: 32 },
    { month: 'Aug', htn: 49, diabetes: 28, malaria: 36, oralLesion: 5, diarrhea: 28 },
    { month: 'Sep', htn: 52, diabetes: 31, malaria: 44, oralLesion: 6, diarrhea: 22 },
    { month: 'Oct', htn: 58, diabetes: 35, malaria: 24, oralLesion: 7, diarrhea: 16 },
    { month: 'Nov', htn: 62, diabetes: 38, malaria: 12, oralLesion: 8, diarrhea: 10 }
  ];

  const diseaseCategories = [
    { name: 'Hypertension (HTN)', cases: 62, percent: 34, color: '#ff7a00', riskTier: 'High (Screening Active)' },
    { name: 'Type 2 Diabetes', cases: 38, percent: 21, color: '#0052cc', riskTier: 'Rising Trend' },
    { name: 'Malaria (Pf / Pv)', cases: 12, percent: 7, color: '#16a34a', riskTier: 'Monsoon Controlled' },
    { name: 'Oral Pre-Malignant Lesions', cases: 8, percent: 4.5, color: '#9333ea', riskTier: 'High Priority Alert' },
    { name: 'Tuberculosis (Active DOTS)', cases: 6, percent: 3.3, color: '#dc2626', riskTier: '100% Monitored' },
    { name: 'Seasonal Viral / Respiratory', cases: 54, percent: 30, color: '#0284c7', riskTier: 'Seasonal Normal' }
  ];

  return (
    <div style={{ padding: '24px', background: '#f8fafc' }}>
      {/* HEADER */}
      <div style={{ marginBottom: '22px' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
          Epidemiological Morbidity Trends &amp; Disease Surveillance
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
          Real-time disease incidence, seasonal vector outbreaks, and chronic morbidity curves in Sub-Centre Paderu
        </p>
      </div>

      {/* TOP SUMMARY STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '26px' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #fed7aa', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#ea580c', fontWeight: 700, textTransform: 'uppercase' }}>Top Chronic Morbidity</span>
            <Activity size={18} color="#ea580c" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>34% HTN</div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>62 Active Cases under field care</span>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #e9d5ff', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#9333ea', fontWeight: 700, textTransform: 'uppercase' }}>Oral Pre-Malignancy Alert</span>
            <AlertTriangle size={18} color="#9333ea" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#9333ea', marginTop: '6px' }}>8 Lesions</div>
          <span style={{ fontSize: '0.75rem', color: '#9333ea', fontWeight: 600 }}>Leukoplakia &amp; Chewing tobacco</span>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #bbf7d0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700, textTransform: 'uppercase' }}>Malaria Outbreak Status</span>
            <CheckCircle size={18} color="#16a34a" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16a34a', marginTop: '6px' }}>Contained</div>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>Dropped from 44 in Sep to 12 in Nov</span>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #fee2e2', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#dc2626', fontWeight: 700, textTransform: 'uppercase' }}>Tuberculosis DOTS</span>
            <ShieldAlert size={18} color="#dc2626" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#dc2626', marginTop: '6px' }}>6 Active</div>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>100% Treatment Adherence</span>
        </div>
      </div>

      {/* SVG EPIDEMIOLOGICAL MORBIDITY CHART */}
      <div style={{ background: '#ffffff', borderRadius: '18px', padding: '24px', border: '1px solid #e2e8f0', marginBottom: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              6-Month Morbidity Trends (June - November 2025)
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Monthly registered case burden at Sub-Centre Paderu
            </span>
          </div>

          <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem', fontWeight: 700 }}>
            <span style={{ color: '#ff7a00' }}>● Hypertension</span>
            <span style={{ color: '#0052cc' }}>● Diabetes</span>
            <span style={{ color: '#16a34a' }}>● Malaria</span>
            <span style={{ color: '#9333ea' }}>● Oral Lesions</span>
          </div>
        </div>

        {/* SVG BARS */}
        <div style={{ overflowX: 'auto' }}>
          <svg viewBox="0 0 700 220" style={{ width: '100%', minWidth: '550px', height: '220px' }}>
            {/* Grid lines */}
            <line x1="40" y1="20" x2="680" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="40" y1="70" x2="680" y2="70" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="40" y1="120" x2="680" y2="120" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="40" y1="170" x2="680" y2="170" stroke="#e2e8f0" strokeWidth="1.5" />

            {/* Y axis labels */}
            <text x="15" y="25" fill="#94a3b8" fontSize="10" fontWeight="600">60</text>
            <text x="15" y="75" fill="#94a3b8" fontSize="10" fontWeight="600">40</text>
            <text x="15" y="125" fill="#94a3b8" fontSize="10" fontWeight="600">20</text>
            <text x="15" y="175" fill="#94a3b8" fontSize="10" fontWeight="600">0</text>

            {monthlyTrends.map((t, i) => {
              const xBase = 80 + i * 100;
              const htnH = (t.htn / 70) * 150;
              const diaH = (t.diabetes / 70) * 150;
              const malH = (t.malaria / 70) * 150;
              const oralH = (t.oralLesion / 70) * 150;

              return (
                <g key={t.month}>
                  {/* HTN bar */}
                  <rect x={xBase} y={170 - htnH} width="14" height={htnH} rx="3" fill="#ff7a00" />
                  {/* Diabetes bar */}
                  <rect x={xBase + 16} y={170 - diaH} width="14" height={diaH} rx="3" fill="#0052cc" />
                  {/* Malaria bar */}
                  <rect x={xBase + 32} y={170 - malH} width="14" height={malH} rx="3" fill="#16a34a" />
                  {/* Oral Lesion bar */}
                  <rect x={xBase + 48} y={170 - oralH} width="14" height={oralH} rx="3" fill="#9333ea" />

                  {/* Month Label */}
                  <text x={xBase + 30} y="195" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">
                    {t.month}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* MORBIDITY BREAKDOWN TABLE */}
      <div style={{ background: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
            Current Disease Prevalence Registry
          </h4>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 18px' }}>Disease Category</th>
                <th style={{ padding: '12px 18px' }}>Active Diagnosed Cases</th>
                <th style={{ padding: '12px 18px' }}>% Sub-Centre Morbidity</th>
                <th style={{ padding: '12px 18px' }}>Surveillance Progress</th>
                <th style={{ padding: '12px 18px', textAlign: 'right' }}>Action Tier</th>
              </tr>
            </thead>
            <tbody>
              {diseaseCategories.map((c) => (
                <tr key={c.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 18px', fontWeight: 700, color: '#0f172a' }}>
                    <span style={{ color: c.color, marginRight: '8px' }}>●</span>
                    {c.name}
                  </td>
                  <td style={{ padding: '12px 18px', fontWeight: 800, color: '#1e293b' }}>
                    {c.cases} Patients
                  </td>
                  <td style={{ padding: '12px 18px', color: '#64748b' }}>
                    {c.percent}%
                  </td>
                  <td style={{ padding: '12px 18px', width: '200px' }}>
                    <div style={{ background: '#f1f5f9', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${c.percent * 2.5}%`,
                          background: c.color,
                          height: '100%',
                          borderRadius: '10px'
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                    <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700, color: '#334155' }}>
                      {c.riskTier}
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
