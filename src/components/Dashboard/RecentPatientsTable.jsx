import React from 'react';

const admissions = [
  {
    id: 'ADP-001248',
    name: 'Lakshmi Devi',
    ageSex: '42 / F',
    village: 'Gudem',
    date: '15 Apr 2025',
    status: 'Normal',
    statusClass: 'normal',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80',
  },
  {
    id: 'ADP-001247',
    name: 'Ramesh Babu',
    ageSex: '37 / M',
    village: 'Chintapalli',
    date: '15 Apr 2025',
    status: 'Under Review',
    statusClass: 'under-review',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
  },
  {
    id: 'ADP-001246',
    name: 'Savitri',
    ageSex: '28 / F',
    village: 'Koyyuru',
    date: '14 Apr 2025',
    status: 'Suspicious',
    statusClass: 'suspicious',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80',
  },
  {
    id: 'ADP-001245',
    name: 'Mohan Rao',
    ageSex: '56 / M',
    village: 'Paderu',
    date: '14 Apr 2025',
    status: 'Normal',
    statusClass: 'normal',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
  },
  {
    id: 'ADP-001244',
    name: 'Anitha',
    ageSex: '33 / F',
    village: 'Araku',
    date: '13 Apr 2025',
    status: 'Follow-up',
    statusClass: 'follow-up',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
  },
];

export default function RecentPatientsTable({ onViewPatient }) {
  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Recent Admissions / Registrations</h3>
        <a
          href="#view-all"
          className="view-all-link"
          onClick={(e) => {
            e.preventDefault();
            if (onViewPatient) onViewPatient(null);
          }}
        >
          View All Admissions / Registrations <span>→</span>
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
            {admissions.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600, color: '#475569' }}>{p.id}</td>
                <td>
                  <div className="patient-name-col">
                    <div className="patient-avatar-thumb">
                      <img
                        src={p.photo}
                        alt={p.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
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
                    aria-label="Options"
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
