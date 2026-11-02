import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  CheckCircle,
  Search,
  Plus,
  Users,
  Home,
  ShieldCheck,
  Download,
  FileCheck
} from 'lucide-react';

export default function ANMABHAFamilyRegisterView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [createdCard, setCreatedCard] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Aadhaar Form State
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [citizenDob, setCitizenDob] = useState('');
  const [citizenGender, setCitizenGender] = useState('Male');
  const [citizenPhone, setCitizenPhone] = useState('');

  const [families, setFamilies] = useState([
    {
      id: 'FAM-001',
      houseNo: 'H.No 3-41',
      headOfFamily: 'Somulu Korra',
      membersCount: 4,
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      abhaCount: '4 of 4 Created (100%)',
      pmjayEligible: true,
      lastSurveyDate: '28 Oct 2025'
    },
    {
      id: 'FAM-002',
      houseNo: 'H.No 1-12',
      headOfFamily: 'Savitri Vanthala',
      membersCount: 5,
      hamlet: 'Paderu Ward 1 (Main Village)',
      abhaCount: '5 of 5 Created (100%)',
      pmjayEligible: true,
      lastSurveyDate: '29 Oct 2025'
    },
    {
      id: 'FAM-003',
      houseNo: 'H.No 4-88',
      headOfFamily: 'Appala Naidu',
      membersCount: 3,
      hamlet: 'Paderu Ward 4 (Tribal Settlement)',
      abhaCount: '2 of 3 Created (66%)',
      pmjayEligible: true,
      lastSurveyDate: '01 Nov 2025'
    },
    {
      id: 'FAM-004',
      houseNo: 'H.No 2-19',
      headOfFamily: 'Gowri Killo',
      membersCount: 6,
      hamlet: 'Paderu Ward 2 (Pedaguda)',
      abhaCount: '6 of 6 Created (100%)',
      pmjayEligible: false,
      lastSurveyDate: '15 Oct 2025'
    }
  ]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleGenerateAbha = (e) => {
    e.preventDefault();
    if (!citizenName || !citizenPhone) {
      alert('Please fill citizen name and mobile number.');
      return;
    }

    const randomAbha = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCard = {
      name: citizenName,
      abhaId: randomAbha,
      dob: citizenDob || '12/05/1988',
      gender: citizenGender,
      phone: citizenPhone,
      phrAddress: citizenName.toLowerCase().replace(/\s+/g, '') + '@abdm'
    };

    setCreatedCard(newCard);
    setShowGenerateModal(false);
    showNotification(`Generated ABHA ID: ${newCard.abhaId} for ${newCard.name}`);
  };

  const filteredFamilies = families.filter(
    (f) =>
      f.headOfFamily.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.houseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.hamlet.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* TOP ACTION BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div style={{ flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center', background: '#ffffff', padding: '6px 14px', borderRadius: '30px', border: '1px solid #cbd5e1' }}>
          <Search size={16} color="#64748b" style={{ marginRight: '8px' }} />
          <input
            type="text"
            placeholder="Search family by house no, head of household, hamlet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.88rem' }}
          />
        </div>

        <button
          onClick={() => setShowGenerateModal(true)}
          style={{
            background: '#16a34a',
            color: '#ffffff',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '30px',
            fontWeight: 800,
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)'
          }}
        >
          <CreditCard size={18} />
          <span>Create New Citizen ABHA ID</span>
        </button>
      </div>

      {/* CREATED CARD PREVIEW MODAL / BANNER */}
      {createdCard && (
        <div
          style={{
            background: 'linear-gradient(135deg, #0b2545 0%, #134e4a 100%)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 8px 30px rgba(11, 37, 69, 0.25)',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#5eead4', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Ayushman Bharat Digital Mission (ABDM) • Citizen Digital Health Card
              </span>
              <h3 style={{ margin: '6px 0 0', fontSize: '1.4rem', fontWeight: 800 }}>{createdCard.name}</h3>
              <div style={{ fontSize: '1.2rem', fontFamily: 'monospace', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {createdCard.abhaId}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '6px' }}>
                ABHA Address: <span style={{ color: '#ffffff', fontWeight: 700 }}>{createdCard.phrAddress}</span> • Gender: {createdCard.gender} • Mobile: {createdCard.phone}
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <QrCode size={70} color="#0b2545" />
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              onClick={() => {
                showNotification('Digital ABHA card downloaded & saved to offline register.');
                setCreatedCard(null);
              }}
              style={{
                background: '#38bdf8',
                color: '#0b2545',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '20px',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Done / Print Card
            </button>
          </div>
        </div>
      )}

      {/* GENERATE MODAL POPUP */}
      {showGenerateModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px'
          }}
        >
          <form
            onSubmit={handleGenerateAbha}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)'
            }}
          >
            <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
              Generate Ayushman Bharat ABHA ID
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.8rem', color: '#64748b' }}>
              Instant ABDM Enrollment for Rural &amp; Tribal Citizens
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Citizen Full Name *
                </label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder="e.g. Kondamma Korra"
                  required
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Aadhaar Number (12 Digits)
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={aadhaarInput}
                  onChange={(e) => setAadhaarInput(e.target.value)}
                  placeholder="XXXX XXXX XXXX"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Mobile Number (Linked or Proxy) *
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={citizenPhone}
                  onChange={(e) => setCitizenPhone(e.target.value)}
                  placeholder="9876543210"
                  required
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Gender
                  </label>
                  <select
                    value={citizenGender}
                    onChange={(e) => setCitizenGender(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Year of Birth
                  </label>
                  <input
                    type="number"
                    value={citizenDob}
                    onChange={(e) => setCitizenDob(e.target.value)}
                    placeholder="YYYY"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowGenerateModal(false)}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: '#16a34a', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
              >
                Verify &amp; Create ABHA
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FAMILY FOLDER LIST */}
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
            Village Family Health Folders (Sub-Centre Paderu)
          </h4>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 18px' }}>House No &amp; Head</th>
                <th style={{ padding: '12px 18px' }}>Hamlet</th>
                <th style={{ padding: '12px 18px' }}>Family Members</th>
                <th style={{ padding: '12px 18px' }}>ABHA Coverage</th>
                <th style={{ padding: '12px 18px' }}>PM-JAY Health Cover</th>
                <th style={{ padding: '12px 18px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFamilies.map((fam) => (
                <tr key={fam.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 18px' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{fam.headOfFamily}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{fam.houseNo}</div>
                  </td>
                  <td style={{ padding: '12px 18px', color: '#475569' }}>
                    {fam.hamlet}
                  </td>
                  <td style={{ padding: '12px 18px', color: '#0052cc', fontWeight: 700 }}>
                    {fam.membersCount} Persons
                  </td>
                  <td style={{ padding: '12px 18px', color: '#16a34a', fontWeight: 600 }}>
                    {fam.abhaCount}
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    {fam.pmjayEligible ? (
                      <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                        ✓ ₹5 Lakh Covered
                      </span>
                    ) : (
                      <span style={{ background: '#f1f5f9', color: '#64748b', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem' }}>
                        Verification Pending
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                    <button
                      onClick={() => showNotification(`Opened Family Folder for ${fam.headOfFamily}`)}
                      style={{
                        background: '#eff6ff',
                        color: '#0052cc',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '16px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      View Folder
                    </button>
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
