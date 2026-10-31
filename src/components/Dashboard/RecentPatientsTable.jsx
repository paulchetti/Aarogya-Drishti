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
    initials: 'LD',
  },
  {
    id: 'ADP-001247',
    name: 'Ramesh Babu',
    ageSex: '37 / M',
    village: 'Chintapalli',
    date: '15 Apr 2025',
    status: 'Under Review',
    statusClass: 'under-review',
    initials: 'RB',
  },
  {
    id: 'ADP-001246',
    name: 'Savitri',
    ageSex: '28 / F',
    village: 'Koyyuru',
    date: '14 Apr 2025',
    status: 'Suspicious',
    statusClass: 'suspicious',
    initials: 'SV',
  },
  {
    id: 'ADP-001245',
    name: 'Mohan Rao',
    ageSex: '56 / M',
    village: 'Paderu',
    date: '14 Apr 2025',
    status: 'Normal',
    statusClass: 'normal',
    initials: 'MR',
  },
  {
    id: 'ADP-001244',
    name: 'Anitha',
    ageSex: '33 / F',
    village: 'Araku',
    date: '13 Apr 2025',
    status: 'Follow-up',
    statusClass: 'follow-up',
    initials: 'AN',
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
                  <div className="patient-cell-name">
                    <span className="patient-mini-avatar">{p.initials}</span>
                    <span>{p.name}</span>
                  </div>
                </td>
                <td>{p.ageSex}</td>
                <td>{p.village}</td>
                <td style={{ color: '#64748b' }}>{p.date}</td>
                <td>
                  <span className={`status-badge ${p.statusClass}`}>{p.status}</span>
                </td>
                <td>
                  <button
                    type="button"
                    className="action-dots"
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
