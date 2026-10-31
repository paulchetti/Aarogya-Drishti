import React from 'react';

const patients = [
  {
    id: 'ADP-001248',
    name: 'Lakshmi Devi',
    ageSex: '42 / F',
    village: 'Gudem',
    date: '15 Apr 2025',
    status: 'Normal',
    statusClass: 'normal',
    avatarColor: '#f43f5e',
  },
  {
    id: 'ADP-001247',
    name: 'Ramesh Babu',
    ageSex: '37 / M',
    village: 'Chintapalli',
    date: '15 Apr 2025',
    status: 'Under Review',
    statusClass: 'under-review',
    avatarColor: '#0284c7',
  },
  {
    id: 'ADP-001246',
    name: 'Savitri',
    ageSex: '28 / F',
    village: 'Koyyuru',
    date: '14 Apr 2025',
    status: 'Suspicious',
    statusClass: 'suspicious',
    avatarColor: '#e11d48',
  },
  {
    id: 'ADP-001245',
    name: 'Mohan Rao',
    ageSex: '56 / M',
    village: 'Paderu',
    date: '14 Apr 2025',
    status: 'Normal',
    statusClass: 'normal',
    avatarColor: '#059669',
  },
  {
    id: 'ADP-001244',
    name: 'Anitha',
    ageSex: '33 / F',
    village: 'Araku',
    date: '13 Apr 2025',
    status: 'Follow-up',
    statusClass: 'follow-up',
    avatarColor: '#8b5cf6',
  },
];

export default function RecentPatientsTable({ onViewPatient }) {
  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Recent Patients</h3>
        <a
          href="#view-all"
          className="view-all-link"
          onClick={(e) => {
            e.preventDefault();
            if (onViewPatient) onViewPatient(null);
          }}
        >
          View All Patients <span>→</span>
        </a>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="patient-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Age / Sex</th>
              <th>Village</th>
              <th>Screening Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600, color: '#475569' }}>{p.id}</td>
                <td>
                  <div className="patient-name-col">
                    <div className="patient-avatar-thumb" style={{ backgroundColor: '#e0f2fe' }}>
                      <svg viewBox="0 0 24 24" fill={p.avatarColor} style={{ width: '18px', height: '18px' }}>
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <span>{p.name}</span>
                  </div>
                </td>
                <td>{p.ageSex}</td>
                <td>{p.village}</td>
                <td style={{ color: '#64748b' }}>{p.date}</td>
                <td>
                  <span className={`status-pill ${p.statusClass}`}>{p.status}</span>
                </td>
                <td>
                  <button
                    type="button"
                    className="action-dots-btn"
                    aria-label="Patient options"
                    onClick={() => onViewPatient && onViewPatient(p)}
                  >
                    ⋮
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
