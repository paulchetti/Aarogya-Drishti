import React, { useState } from 'react';
import {
  MapPin,
  Home,
  Users,
  Baby,
  Heart,
  Shield,
  Activity,
  CheckCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function ANMCatchmentView() {
  const [selectedHamletFilter, setSelectedHamletFilter] = useState('ALL');

  const catchmentSummary = {
    subCentre: 'Sub-Centre Paderu (Gondiguda)',
    phcParent: 'Primary Health Centre Paderu',
    mandal: 'Paderu ITDA Tribal Mandal',
    totalPopulation: 4820,
    totalHouseholds: 1040,
    abhaEnrolled: 3940,
    coveragePercent: 81.7,
    underFiveCount: 412,
    pregnantMothers: 38,
    eligibleCouples: 640,
    elderlyCount: 738
  };

  const hamlets = [
    {
      id: 'HAM-01',
      name: 'Paderu Ward 3 (Gondiguda)',
      ashaWorker: 'ASHA Kumari Devi',
      households: 260,
      population: 1210,
      underFive: 105,
      pregnant: 11,
      elderly: 190,
      abhaCoverage: 88,
      ncdScreened: 84,
      distanceFromSC: '0.2 km (HQ)',
      ambulanceAccess: 'Good (Paved Road)',
      vulnerabilityTier: 'Medium'
    },
    {
      id: 'HAM-02',
      name: 'Paderu Ward 1 (Main Village)',
      ashaWorker: 'ASHA Saroja Rao',
      households: 280,
      population: 1340,
      underFive: 118,
      pregnant: 9,
      elderly: 210,
      abhaCoverage: 92,
      ncdScreened: 90,
      distanceFromSC: '1.5 km',
      ambulanceAccess: 'Good (Highway Link)',
      vulnerabilityTier: 'Low'
    },
    {
      id: 'HAM-03',
      name: 'Paderu Ward 2 (Pedaguda)',
      ashaWorker: 'ASHA Parvathi Killo',
      households: 210,
      population: 980,
      underFive: 82,
      pregnant: 8,
      elderly: 152,
      abhaCoverage: 78,
      ncdScreened: 74,
      distanceFromSC: '2.8 km',
      ambulanceAccess: 'Fair (Gravel Road)',
      vulnerabilityTier: 'Medium'
    },
    {
      id: 'HAM-04',
      name: 'Paderu Ward 4 (Tribal Settlement)',
      ashaWorker: 'ASHA Somamma Korra',
      households: 180,
      population: 780,
      underFive: 64,
      pregnant: 7,
      elderly: 118,
      abhaCoverage: 71,
      ncdScreened: 68,
      distanceFromSC: '4.2 km (Hilly)',
      ambulanceAccess: 'Difficult (Feeder Track)',
      vulnerabilityTier: 'High (PVTG Focus)'
    },
    {
      id: 'HAM-05',
      name: 'Paderu Ward 5 (Valley Hamlet)',
      ashaWorker: 'ASHA Lakshmi Bai',
      households: 110,
      population: 510,
      underFive: 43,
      pregnant: 3,
      elderly: 68,
      abhaCoverage: 69,
      ncdScreened: 65,
      distanceFromSC: '5.5 km (Valley)',
      ambulanceAccess: 'Difficult (Footpath/Jeep)',
      vulnerabilityTier: 'High (PVTG Focus)'
    }
  ];

  const filteredHamlets =
    selectedHamletFilter === 'ALL'
      ? hamlets
      : hamlets.filter((h) => h.id === selectedHamletFilter);

  return (
    <div style={{ padding: '24px', background: '#f8fafc' }}>
      {/* HEADER */}
      <div style={{ marginBottom: '22px' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
          Assigned Catchment Population &amp; Village Habitation Register
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
          Jurisdiction of {catchmentSummary.subCentre} under {catchmentSummary.phcParent}
        </p>
      </div>

      {/* CATCHMENT STATS GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '26px'
        }}
      >
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total Catchment</span>
            <div style={{ background: '#eff6ff', color: '#0052cc', padding: '8px', borderRadius: '50%' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
            {catchmentSummary.totalPopulation.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
            {catchmentSummary.totalHouseholds} Total Households
          </span>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>ABHA Digitized</span>
            <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '8px', borderRadius: '50%' }}>
              <CheckCircle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16a34a', marginTop: '6px' }}>
            {catchmentSummary.abhaEnrolled.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
            {catchmentSummary.coveragePercent}% of Total Population
          </span>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Maternal &amp; Under-5</span>
            <div style={{ background: '#fff1f2', color: '#e11d48', padding: '8px', borderRadius: '50%' }}>
              <Baby size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
            {catchmentSummary.underFiveCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#e11d48', fontWeight: 600 }}>
            {catchmentSummary.pregnantMothers} Pregnant Mothers Active
          </span>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Elderly Citizens (60+)</span>
            <div style={{ background: '#fffbeb', color: '#d97706', padding: '8px', borderRadius: '50%' }}>
              <Heart size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
            {catchmentSummary.elderlyCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 600 }}>
            Quarterly NCD Screening Priority
          </span>
        </div>
      </div>

      {/* HAMLETS REGISTER LIST */}
      <div style={{ background: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
              Sub-Centre Ward &amp; Habitation Demographics
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              5 Assigned Habitations with Designated ASHA Village Links
            </span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 18px' }}>Habitation / Ward</th>
                <th style={{ padding: '12px 18px' }}>Assigned ASHA</th>
                <th style={{ padding: '12px 18px' }}>Households &amp; Pop</th>
                <th style={{ padding: '12px 18px' }}>Vulnerable Cohorts</th>
                <th style={{ padding: '12px 18px' }}>ABHA &amp; NCD Progress</th>
                <th style={{ padding: '12px 18px' }}>108 / Ambulance Road</th>
                <th style={{ padding: '12px 18px', textAlign: 'right' }}>Vulnerability</th>
              </tr>
            </thead>
            <tbody>
              {filteredHamlets.map((h) => (
                <tr key={h.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 18px' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{h.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      📍 {h.distanceFromSC} from Sub-Centre
                    </div>
                  </td>
                  <td style={{ padding: '12px 18px', fontWeight: 600, color: '#0052cc' }}>
                    {h.ashaWorker}
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{h.population} citizens</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{h.households} Households</div>
                  </td>
                  <td style={{ padding: '12px 18px', fontSize: '0.75rem', color: '#334155' }}>
                    <div>👶 {h.underFive} U-5 Children</div>
                    <div style={{ color: '#e11d48', fontWeight: 700 }}>🤰 {h.pregnant} Pregnant Mothers</div>
                  </td>
                  <td style={{ padding: '12px 18px', width: '180px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700 }}>
                      <span style={{ color: '#16a34a' }}>ABHA: {h.abhaCoverage}%</span>
                      <span style={{ color: '#0052cc' }}>NCD: {h.ncdScreened}%</span>
                    </div>
                    <div style={{ background: '#f1f5f9', borderRadius: '10px', height: '6px', overflow: 'hidden', marginTop: '4px' }}>
                      <div
                        style={{
                          width: `${h.abhaCoverage}%`,
                          background: '#16a34a',
                          height: '100%',
                          borderRadius: '10px'
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: '12px 18px', fontSize: '0.75rem', color: '#475569' }}>
                    {h.ambulanceAccess}
                  </td>
                  <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background:
                          h.vulnerabilityTier.includes('High')
                            ? '#fee2e2'
                            : h.vulnerabilityTier.includes('Medium')
                            ? '#fef3c7'
                            : '#f0fdf4',
                        color:
                          h.vulnerabilityTier.includes('High')
                            ? '#dc2626'
                            : h.vulnerabilityTier.includes('Medium')
                            ? '#d97706'
                            : '#16a34a'
                      }}
                    >
                      {h.vulnerabilityTier}
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

