import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getAllPatients } from '../../services/referralRoutingService';

const statusTranslations = {
  Normal: 'సాధారణం (Normal)',
  'Under Review': 'సమీక్షలో ఉంది (Review)',
  Suspicious: 'అనుమానాస్పదం (Suspicious)',
  'Follow-up': 'ఫాలో-అప్ (Follow-up)',
  'Referred to Specialist': 'స్పెషలిస్ట్‌కు రిఫర్ చేయబడింది',
  'Biopsy Authorized': 'బయాప్సీ ఆమోదించబడింది',
};

export default function RecentPatientsTable({ onViewPatient }) {
  const { language } = useLanguage();
  const [patients, setPatients] = useState(() => getAllPatients());

  // Listen to cross-portal registry updates (Module A, D, F)
  useEffect(() => {
    const handleUpdate = () => {
      setPatients(getAllPatients());
    };

    window.addEventListener('aarogya_patients_updated', handleUpdate);
    return () => window.removeEventListener('aarogya_patients_updated', handleUpdate);
  }, []);

  const getDisplayStatus = (p) => {
    if (p.status === 'referred_to_specialist') {
      return { label: 'Referred to Specialist', class: 'suspicious' };
    }
    if (p.status === 'biopsy_endorsed') {
      return { label: 'Biopsy Authorized', class: 'follow-up' };
    }
    if (p.aiAssessment?.finding === 'suspicious_finding') {
      return { label: 'Suspicious', class: 'suspicious' };
    }
    if (p.symptoms && p.symptoms.length > 0) {
      return { label: 'Under Review', class: 'under-review' };
    }
    return { label: 'Normal', class: 'normal' };
  };

  return (
    <div className="table-card">
      <div className="table-header">
        <div>
          <h3 style={{ margin: 0 }}>
            {language === 'te' ? 'ఇటీవలి నమోదులు / రిజిస్ట్రేషన్లు' : 'Recent Admissions & Longitudinal Registry'}
          </h3>
          <small style={{ color: '#64748b', fontSize: '0.74rem' }}>
            Live sync across Village Hamlets, PHC Doctor Triage & Area Hospital Paderu
          </small>
        </div>
        <button
          type="button"
          className="view-all-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => {
            if (onViewPatient) onViewPatient(patients[0]);
          }}
        >
          {language === 'te' ? 'అన్ని నమోదులు చూడండి' : 'View All Registry Patients'} <span>→</span>
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="patient-table">
          <thead>
            <tr>
              <th>{language === 'te' ? 'రోగి ఐడి' : 'Patient ID'}</th>
              <th>{language === 'te' ? 'పేరు' : 'Name'}</th>
              <th>{language === 'te' ? 'వయస్సు / లింగం' : 'Age / Sex'}</th>
              <th>{language === 'te' ? 'గ్రామం / మండలం' : 'Village / Mandal'}</th>
              <th>{language === 'te' ? 'నమోదు తేదీ' : 'Registration Date'}</th>
              <th>{language === 'te' ? 'స్థితి' : 'Status'}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => {
              const statusObj = getDisplayStatus(p);
              return (
                <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => onViewPatient && onViewPatient(p)}>
                  <td style={{ fontWeight: 700, color: '#334155' }}>
                    <div>{p.id}</div>
                    <small style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{p.abhaId || 'ABHA Registered'}</small>
                  </td>
                  <td>
                    <div className="patient-name-col">
                      <div
                        className="patient-avatar-thumb"
                        style={{
                          background: p.gender === 'Female' ? '#fdf2f8' : '#eff6ff',
                          color: p.gender === 'Female' ? '#db2777' : '#2563eb',
                          fontWeight: 800,
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '0.76rem',
                          borderRadius: '8px',
                          width: '32px',
                          height: '32px',
                        }}
                      >
                        {p.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{p.name}</span>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          {p.exposureHistory?.[0]?.label || 'No known habits'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{p.ageSex}</td>
                  <td>
                    <div>{p.village}</div>
                    <small style={{ color: '#0d9488', fontWeight: 600 }}>{p.mandal}</small>
                  </td>
                  <td style={{ color: '#64748b', fontSize: '0.78rem' }}>{p.registeredDate}</td>
                  <td>
                    <span className={`status-pill ${statusObj.class}`}>
                      {language === 'te' ? statusTranslations[statusObj.label] || statusObj.label : statusObj.label}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="action-dots-btn"
                      aria-label="Options"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onViewPatient) onViewPatient(p);
                      }}
                    >
                      ⋮
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
