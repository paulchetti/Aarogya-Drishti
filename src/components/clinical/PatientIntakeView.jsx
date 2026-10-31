import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  CreditCard,
  CheckCircle,
  FileBadge,
  Phone,
  Mail,
  HeartPulse,
  AlertCircle,
  Download,
  Eye,
  Filter
} from 'lucide-react';
import { initialPatients } from '../../data/mockHealthData';

export default function PatientIntakeView({ onStartTeleconsult }) {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedPatientForCard, setSelectedPatientForCard] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '',
    email: '',
    abhaId: '91-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000),
    appointedFor: '',
    department: 'General Medicine',
    allergies: 'None reported',
    chronicConditions: 'None',
    address: 'Sector 14, Health District'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterPatient = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in patient name and phone number');
      return;
    }

    const newPatient = {
      id: `P-${patients.length + 101}`,
      name: formData.name,
      age: `${formData.age || '28'} years`,
      gender: formData.gender,
      dateTime: 'Today - Just Registered',
      appointedFor: formData.appointedFor || 'General Clinical Intake',
      doctor: 'Dr. Andrew Sharma',
      department: formData.department,
      status: 'Intake Completed',
      report: 'Intake Dossier Ready',
      abhaId: formData.abhaId,
      phone: formData.phone,
      email: formData.email || 'patient@aarogyadrishti.in',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      vitals: { bp: '120/80', hr: '72 bpm', spo2: '99%', temp: '98.6°F' }
    };

    setPatients([newPatient, ...patients]);
    setToastMessage(`Patient ${formData.name} registered successfully with ABHA ID!`);
    setShowForm(false);
    setSelectedPatientForCard(newPatient);

    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.appointedFor.toLowerCase().includes(search.toLowerCase()) ||
      p.abhaId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-content-area feature-view-container">
      {/* View Header */}
      <div className="feature-header">
        <div className="feature-header-left">
          <h1>Patient Intake & Registration</h1>
          <p>Register citizens, generate ABHA Health Accounts, and prepare clinical intake triage.</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <UserPlus size={18} />
          <span>{showForm ? 'View Patient Directory' : '+ Register New Patient'}</span>
        </button>
      </div>

      {toastMessage && (
        <div
          style={{
            background: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #a7f3d0',
            padding: '12px 20px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          <CheckCircle size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Registration Form Modal or Accordion */}
      {showForm && (
        <div className="form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 4px' }}>
                New Clinical Intake & ABHA Registration
              </h2>
              <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Complies with Ayushman Bharat Digital Mission (ABDM) standards
              </span>
            </div>
            <span
              style={{
                background: '#e0f2fe',
                color: '#0284c7',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '16px'
              }}
            >
              Step 1 of 1: Fast Intake
            </span>
          </div>

          <form onSubmit={handleRegisterPatient}>
            <div className="form-grid-3" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label>Full Legal Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ramesh Kumar Patel"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Age (Years) *</label>
                <input
                  type="number"
                  name="age"
                  required
                  placeholder="e.g. 34"
                  className="form-control"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Gender *</label>
                <select
                  name="gender"
                  className="form-control"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Non-Binary</option>
                </select>
              </div>
            </div>

            <div className="form-grid-3" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label>ABHA Health ID (Auto-Generated)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="abhaId"
                    readOnly
                    className="form-control"
                    value={formData.abhaId}
                    style={{ background: '#f8fafc', fontWeight: 600, color: '#0d9488' }}
                  />
                  <CreditCard
                    size={16}
                    color="#0d9488"
                    style={{ position: 'absolute', right: '12px', top: '12px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Blood Group</label>
                <select
                  name="bloodGroup"
                  className="form-control"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="form-grid-2" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label>Chief Complaint / Appointed For *</label>
                <input
                  type="text"
                  name="appointedFor"
                  required
                  placeholder="e.g. Chronic hypertension follow-up, acute chest pain"
                  className="form-control"
                  value={formData.appointedFor}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Department / Specialty</label>
                <select
                  name="department"
                  className="form-control"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="General Medicine">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
              </div>
            </div>

            <div className="form-grid-2" style={{ marginBottom: '24px' }}>
              <div className="form-group">
                <label>Known Allergies (Medications / Food)</label>
                <input
                  type="text"
                  name="allergies"
                  placeholder="e.g. Penicillin, Sulfa drugs"
                  className="form-control"
                  value={formData.allergies}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Pre-existing Chronic Conditions</label>
                <input
                  type="text"
                  name="chronicConditions"
                  placeholder="e.g. Type 2 Diabetes, High BP, Asthma"
                  className="form-control"
                  value={formData.chronicConditions}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                <CheckCircle size={17} />
                <span>Submit Intake & Create ABHA Card</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ABHA Digital Card Preview Modal */}
      {selectedPatientForCard && (
        <div className="modal-backdrop" onClick={() => setSelectedPatientForCard(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Ayushman Bharat Health Card (ABHA)</h3>
              <button
                onClick={() => setSelectedPatientForCard(null)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div className="abha-card-preview">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HeartPulse size={24} color="#34d399" />
                  <span style={{ fontWeight: 800, letterSpacing: '0.5px' }}>AAROGYA DRISHTI</span>
                </div>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '12px' }}>
                  GOVT. OF INDIA VERIFIED
                </span>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                <img
                  src={selectedPatientForCard.avatar}
                  alt={selectedPatientForCard.name}
                  style={{ width: '64px', height: '64px', borderRadius: '16px', border: '2px solid #ffffff', objectFit: 'cover' }}
                />
                <div>
                  <h2 style={{ margin: '0 0 4px', fontSize: '1.3rem' }}>{selectedPatientForCard.name}</h2>
                  <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                    Age: {selectedPatientForCard.age} | Gender: {selectedPatientForCard.gender}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#a7f3d0', marginTop: '2px' }}>
                    ABHA Address: {selectedPatientForCard.name.toLowerCase().replace(/\s+/g, '')}@abdm
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 16px', borderRadius: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.5px' }}>
                  ABHA Number
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '2px', color: '#6ee7b7' }}>
                  {selectedPatientForCard.abhaId}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', opacity: 0.85 }}>
                <span>Phone: {selectedPatientForCard.phone}</span>
                <span>Blood: B+</span>
                <span>Status: Active</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button
                className="btn-secondary"
                onClick={() => window.print()}
              >
                <Download size={16} />
                <span>Print ABHA Card</span>
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  setSelectedPatientForCard(null);
                  onStartTeleconsult(selectedPatientForCard);
                }}
              >
                <Phone size={16} />
                <span>Launch Teleconsult</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Directory Search & Filters */}
      <div className="table-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h3 className="table-title">Registered Patients Directory ({filteredPatients.length})</h3>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="search-box" style={{ width: '260px' }}>
              <span className="search-icon-wrap">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="search-input"
                placeholder="Filter by name, ABHA or reason..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="patients-table">
            <thead>
              <tr>
                <th>PATIENT & ABHA ID</th>
                <th>AGE & GENDER</th>
                <th>CONTACT</th>
                <th>APPOINTED FOR</th>
                <th>DEPARTMENT</th>
                <th>VITALS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="patient-cell">
                      <img src={p.avatar} alt={p.name} className="patient-cell-avatar" />
                      <div>
                        <div className="patient-cell-name">{p.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#0d9488', fontWeight: 600 }}>
                          {p.abhaId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{p.age}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.gender}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.82rem' }}>{p.phone}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{p.email}</div>
                  </td>
                  <td>
                    <span className="appointed-tag">{p.appointedFor}</span>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        background: '#f1f5f9',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontWeight: 600,
                        color: '#475569'
                      }}
                    >
                      {p.department}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.75rem', color: '#334155' }}>
                      BP: <strong>{p.vitals?.bp}</strong>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      HR: {p.vitals?.hr}
                    </div>
                  </td>
                  <td>
                    <div className="action-btns-cell">
                      <button
                        className="btn-primary"
                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                        onClick={() => setSelectedPatientForCard(p)}
                        title="View ABHA Digital Card"
                      >
                        <FileBadge size={14} />
                        <span>ABHA Card</span>
                      </button>
                    </div>
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

