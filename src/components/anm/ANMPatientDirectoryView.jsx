import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  User,
  Phone,
  FileText,
  Video,
  Calendar,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Activity,
  Heart,
  Sparkles,
  MapPin,
  Building,
  ShieldCheck
} from 'lucide-react';
import { getAllPatients } from '../../services/referralRoutingService';
import { useLanguage } from '../../context/LanguageContext';

export default function ANMPatientDirectoryView({ onStartTeleconsult }) {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHamlet, setSelectedHamlet] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedPatientModal, setSelectedPatientModal] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [patients, setPatients] = useState([]);

  // Base fallback village directory records
  const defaultBasePatients = [
    {
      id: 'PT-01',
      name: 'Ramu Korra',
      age: 52,
      gender: 'Male',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      phone: '9848123450',
      abhaId: '91-8842-1923-5510',
      category: 'NCD Patient',
      vitals: { bp: '158/98', sugar: 215, spo2: 97, bmi: 24.2 },
      chronic: 'Hypertension (Stage 2) & Type 2 Diabetes',
      oralScreening: 'Leukoplakia White Patch',
      lastVisit: '02 Nov 2025',
      risk: 'HIGH',
      teleconsultDone: true
    },
    {
      id: 'PT-02',
      name: 'Kumari Korra',
      age: 23,
      gender: 'Female',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      phone: '9848998811',
      abhaId: '91-1122-3344-5566',
      category: 'ANC Mother',
      vitals: { bp: '136/88', sugar: 94, spo2: 99, bmi: 21.8 },
      chronic: 'Moderate Anemia (Hb 8.4 g/dL)',
      oralScreening: 'Normal Mucosa',
      lastVisit: '01 Nov 2025',
      risk: 'HIGH',
      teleconsultDone: false
    },
    {
      id: 'PT-03',
      name: 'Savitri Vanthala',
      age: 44,
      gender: 'Female',
      hamlet: 'Paderu Ward 1 (Main Village)',
      phone: '9440129988',
      abhaId: '91-3211-9045-8822',
      category: 'General',
      vitals: { bp: '124/82', sugar: 112, spo2: 99, bmi: 22.4 },
      chronic: 'None',
      oralScreening: 'Normal Mucosa',
      lastVisit: '29 Oct 2025',
      risk: 'LOW',
      teleconsultDone: false
    },
    {
      id: 'PT-04',
      name: 'Appala Naidu',
      age: 63,
      gender: 'Male',
      hamlet: 'Paderu Ward 4 (Tribal Settlement)',
      phone: '9849001122',
      abhaId: '91-5541-2098-7619',
      category: 'Elderly',
      vitals: { bp: '142/92', sugar: 168, spo2: 95, bmi: 25.1 },
      chronic: 'Stage 1 HTN & Pre-diabetes',
      oralScreening: 'Mild Submucous Fibrosis',
      lastVisit: '28 Oct 2025',
      risk: 'MODERATE',
      teleconsultDone: true
    },
    {
      id: 'PT-05',
      name: 'Gowri Killo',
      age: 38,
      gender: 'Female',
      hamlet: 'Paderu Ward 2 (Pedaguda)',
      phone: '9490334455',
      abhaId: '91-7712-4033-9128',
      category: 'General',
      vitals: { bp: '118/76', sugar: 98, spo2: 98, bmi: 21.0 },
      chronic: 'None',
      oralScreening: 'Normal Mucosa',
      lastVisit: '25 Oct 2025',
      risk: 'LOW',
      teleconsultDone: false
    },
    {
      id: 'PT-06',
      name: 'Chitti Babu',
      age: 49,
      gender: 'Male',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      phone: '9848556677',
      abhaId: '91-4432-8819-0092',
      category: 'NCD Patient',
      vitals: { bp: '162/104', sugar: 242, spo2: 94, bmi: 26.5 },
      chronic: 'Hypertension & Oral Lesion Alert',
      oralScreening: 'Erythroplakia Red Patch',
      lastVisit: '24 Oct 2025',
      risk: 'HIGH',
      teleconsultDone: true
    }
  ];

  // Helper to sync and transform patients from referralRoutingService
  const loadPatients = () => {
    try {
      const liveList = getAllPatients();
      const mappedLive = liveList.map((pt) => {
        let ageNum = 45;
        let genderStr = 'Male';
        if (pt.ageSex) {
          const parts = pt.ageSex.split('/');
          ageNum = parseInt(parts[0], 10) || 45;
          genderStr = parts[1]?.trim() === 'F' ? 'Female' : 'Male';
        } else if (pt.age) {
          ageNum = pt.age;
          genderStr = pt.gender || 'Male';
        }

        const isHighRisk =
          (pt.suspicionScore && parseInt(pt.suspicionScore, 10) >= 60) ||
          pt.status === 'urgent_referral' ||
          pt.referral != null;

        return {
          id: pt.id,
          name: language === 'te' && pt.nameTe ? pt.nameTe : pt.name,
          age: ageNum,
          gender: genderStr,
          hamlet: `${pt.village || 'G. Madugula'} (${pt.mandal || 'ITDA Paderu'})`,
          mandal: pt.mandal,
          village: pt.village,
          phone: pt.contact || '9848123450',
          abhaId: pt.id.startsWith('ADP') ? `91-${pt.id.replace('ADP-', '4421-')}-2026` : '91-8842-1923-5510',
          category: pt.referral ? 'Oncology Referral' : 'Oral Screening',
          vitals: pt.vitals || { bp: '138/88', sugar: 142, spo2: 97, bmi: 23.5 },
          chronic: pt.suspicionReason || (pt.symptoms && pt.symptoms[0]?.label) || 'Under Active Triage',
          oralScreening: pt.oralLesionSite ? `${pt.oralLesionSite} Lesion (${pt.suspicionScore || '89%'})` : 'AI Clinical Concordance',
          lastVisit: pt.registeredDate || 'Today',
          risk: isHighRisk ? 'HIGH' : 'MODERATE',
          teleconsultDone: pt.teleconsult?.status === 'completed',
          assignedAnm: pt.assignedAnm,
          assignedPhc: pt.assignedPhc,
          exposureHistory: pt.exposureHistory,
          symptoms: pt.symptoms,
          referral: pt.referral,
          isLiveRouted: true,
          raw: pt
        };
      });

      // Filter out duplicates by id
      const liveIds = new Set(mappedLive.map((p) => p.id));
      const filteredDefaults = defaultBasePatients.filter((p) => !liveIds.has(p.id));

      setPatients([...mappedLive, ...filteredDefaults]);
    } catch (e) {
      console.error('Failed to load patients for ANM directory:', e);
      setPatients(defaultBasePatients);
    }
  };

  useEffect(() => {
    loadPatients();
    const handleUpdate = () => loadPatients();
    window.addEventListener('aarogya_patients_updated', handleUpdate);
    return () => window.removeEventListener('aarogya_patients_updated', handleUpdate);
  }, [language]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const filteredPatients = patients.filter((pt) => {
    const matchesSearch =
      pt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pt.abhaId.includes(searchTerm) ||
      pt.phone.includes(searchTerm) ||
      (pt.chronic && pt.chronic.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesHamlet = selectedHamlet === 'ALL' || pt.hamlet.includes(selectedHamlet);
    const matchesCat = selectedCategory === 'ALL' || pt.category === selectedCategory;

    return matchesSearch && matchesHamlet && matchesCat;
  });

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

      {/* HEADER & FILTER BAR */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              {language === 'te'
                ? 'గ్రామ రోగుల డైరెక్టరీ & నిరంతర ఆరోగ్య రికార్డులు'
                : 'Village Patient Directory & Longitudinal Health Records'}
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
              {language === 'te'
                ? 'ఐటీడీఏ పాడేరు సబ్-సెంటర్ పరిధిలోని నమోదైన పౌరులు & ఆటో-రౌటింగ్ జాబితా'
                : 'Intelligent Catchment Routing • Sub-Centre ANM & PHC Inbound Registry'}
            </p>
          </div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#ffedd5',
              color: '#c2410c',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 800,
              border: '1.5px solid #fed7aa'
            }}
          >
            <Sparkles size={14} />
            <span>{patients.length} {language === 'te' ? 'నమోదైన పౌరులు' : 'Catchment Citizens Active'}</span>
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '22px' }}>
        <div style={{ flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center', background: '#ffffff', padding: '8px 16px', borderRadius: '30px', border: '1px solid #cbd5e1' }}>
          <Search size={16} color="#64748b" style={{ marginRight: '8px' }} />
          <input
            type="text"
            placeholder={language === 'te' ? 'పేరు, ఆభా ఐడీ, ఫోన్ లేదా పరిస్థితి ద్వారా శోధించండి...' : 'Search by citizen name, ABHA ID, phone, symptoms...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.88rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Filter size={16} color="#64748b" />
          <select
            value={selectedHamlet}
            onChange={(e) => setSelectedHamlet(e.target.value)}
            style={{ padding: '8px 14px', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.85rem', fontWeight: 600, outline: 'none' }}
          >
            <option value="ALL">{language === 'te' ? 'అన్ని గ్రామాలు / ఆవాసాలు' : 'All Mandals & Villages'}</option>
            <option value="G. Madugula">G. Madugula</option>
            <option value="Paderu">Paderu Catchment</option>
            <option value="Vanabhasingi">Vanabhasingi</option>
            <option value="Minumuluru">Minumuluru</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '8px 14px', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.85rem', fontWeight: 600, outline: 'none' }}
          >
            <option value="ALL">{language === 'te' ? 'అన్ని విభాగాలు' : 'All Priority Categories'}</option>
            <option value="Oncology Referral">Oncology Referral</option>
            <option value="Oral Screening">Oral Screening</option>
            <option value="NCD Patient">NCD Patient</option>
            <option value="Elderly">Elderly (60+)</option>
          </select>
        </div>
      </div>

      {/* PATIENT TABLE */}
      <div style={{ background: '#ffffff', borderRadius: '20px', boxShadow: '0 4px 18px rgba(0,0,0,0.04)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '950px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '14px 18px' }}>{language === 'te' ? 'రోగి & ఆభా ఐడీ' : 'Citizen & ABHA ID'}</th>
                <th style={{ padding: '14px 16px' }}>{language === 'te' ? 'వయస్సు / లింగం' : 'Age / Sex'}</th>
                <th style={{ padding: '14px 16px' }}>{language === 'te' ? 'లొకేషన్ / కేటాయించిన పీహెచ్‌సీ' : 'Mandal & Catchment PHC'}</th>
                <th style={{ padding: '14px 16px' }}>{language === 'te' ? 'లక్షణాలు / నోటి స్క్రీనింగ్' : 'Screening / Habit Risk'}</th>
                <th style={{ padding: '14px 16px' }}>{language === 'te' ? 'రిస్క్ టైర్' : 'Acuity Risk'}</th>
                <th style={{ padding: '14px 16px', textAlign: 'center' }}>{language === 'te' ? 'టెలికన్సల్ట్' : '3-Way Video'}</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>{language === 'te' ? 'చర్యలు' : 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((pt) => (
                <tr
                  key={pt.id}
                  style={{
                    borderBottom: '1px solid #f1f5f9',
                    fontSize: '0.85rem',
                    background: pt.id === 'ADP-2026-0046' ? '#fffbeb' : pt.isLiveRouted ? '#f0fdfa' : '#ffffff',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: pt.risk === 'HIGH' ? '#ffedd5' : '#e0f2fe',
                          color: pt.risk === 'HIGH' ? '#c2410c' : '#0369a1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.9rem',
                          flexShrink: 0
                        }}
                      >
                        {pt.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{pt.name}</span>
                          {pt.id === 'ADP-2026-0046' && (
                            <span style={{ fontSize: '0.65rem', background: '#dc2626', color: '#ffffff', padding: '2px 6px', borderRadius: '10px', fontWeight: 800 }}>
                              DEMO CASE
                            </span>
                          )}
                          {pt.isLiveRouted && pt.id !== 'ADP-2026-0046' && (
                            <span style={{ fontSize: '0.65rem', background: '#0d9488', color: '#ffffff', padding: '2px 6px', borderRadius: '10px', fontWeight: 800 }}>
                              NEW INTAKE
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#0284c7', fontFamily: 'monospace', fontWeight: 600 }}>
                          {pt.abhaId}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 600 }}>
                    {pt.age} yrs • {pt.gender}
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{pt.hamlet}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                      {pt.assignedPhc?.name || 'G. Madugula PHC'}
                    </div>
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{pt.oralScreening}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{pt.chronic}</div>
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        background: pt.risk === 'HIGH' ? '#fee2e2' : pt.risk === 'MODERATE' ? '#fef3c7' : '#dcfce7',
                        color: pt.risk === 'HIGH' ? '#b91c1c' : pt.risk === 'MODERATE' ? '#b45309' : '#15803d'
                      }}
                    >
                      {pt.risk === 'HIGH' && <AlertTriangle size={12} />}
                      <span>{pt.risk} PRIORITY</span>
                    </span>
                  </td>

                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    {onStartTeleconsult && (
                      <button
                        onClick={() =>
                          onStartTeleconsult({
                            id: pt.id,
                            name: pt.name,
                            age: pt.age,
                            gender: pt.gender,
                            ageSex: `${pt.age} / ${pt.gender.charAt(0)}`,
                            abhaId: pt.abhaId,
                            complaint: pt.chronic,
                            vitals: pt.vitals,
                            assignedPhc: pt.assignedPhc,
                            assignedAnm: pt.assignedAnm,
                            referral: pt.referral,
                            raw: pt.raw || pt
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
                          gap: '6px',
                          boxShadow: '0 2px 6px rgba(13,148,136,0.25)'
                        }}
                        title={language === 'te' ? 'పీహెచ్‌సీ & నిపుణుడితో వీడియో కాల్ ప్రారంభించండి' : 'Launch 3-Way Video Gateway with PHC MO & Specialist'}
                      >
                        <Video size={13} />
                        <span>{language === 'te' ? 'వీడియో కాల్' : '3-Way Video'}</span>
                      </button>
                    )}
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedPatientModal(pt)}
                      style={{
                        background: '#eff6ff',
                        color: '#0052cc',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '14px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {language === 'te' ? 'వివరాలు' : 'Profile'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PATIENT DETAIL MODAL */}
      {selectedPatientModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px'
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              maxWidth: '620px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#0052cc', fontWeight: 800, textTransform: 'uppercase' }}>
                  {language === 'te' ? 'ఐటీడీఏ పాడేరు క్లినికల్ రికార్డు' : 'ITDA Paderu Citizen Longitudinal Record'}
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
                  {selectedPatientModal.name}
                </h3>
                <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: '#0284c7', fontWeight: 700 }}>
                  ABHA ID: {selectedPatientModal.abhaId}
                </div>
              </div>

              <span
                style={{
                  background: selectedPatientModal.risk === 'HIGH' ? '#fee2e2' : '#f0fdf4',
                  color: selectedPatientModal.risk === 'HIGH' ? '#dc2626' : '#16a34a',
                  padding: '4px 14px',
                  borderRadius: '16px',
                  fontSize: '0.78rem',
                  fontWeight: 800
                }}
              >
                ● {selectedPatientModal.risk} RISK
              </span>
            </div>

            {/* Geo-Routing & Jurisdiction Box */}
            <div style={{ background: '#f0fdfa', border: '1.5px solid #ccfbf1', padding: '14px', borderRadius: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0d9488', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} />
                <span>{language === 'te' ? 'కేటాయించిన సబ్-సెంటర్ & పీహెచ్‌సీ రౌటింగ్' : 'Designated Frontline & PHC Geo-Catchment'}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.82rem', color: '#134e4a' }}>
                <div>
                  <strong>Village / Mandal:</strong> {selectedPatientModal.hamlet}
                </div>
                <div>
                  <strong>Sub-Centre ANM:</strong> {selectedPatientModal.assignedAnm?.name || 'Lakshmi Devi (GM Sub-Centre)'}
                </div>
                <div>
                  <strong>Catchment PHC:</strong> {selectedPatientModal.assignedPhc?.name || 'G. Madugula PHC'}
                </div>
                <div>
                  <strong>Tertiary Hospital:</strong> Area Hospital Paderu
                </div>
              </div>
            </div>

            {/* Demographics & Vitals */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#f8fafc', padding: '14px', borderRadius: '16px', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Demographics:</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                  {selectedPatientModal.age} yrs • {selectedPatientModal.gender}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Contact Phone:</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                  {selectedPatientModal.phone}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Vitals:</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                  BP {selectedPatientModal.vitals?.bp} • Sugar {selectedPatientModal.vitals?.sugar} mg/dL
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Registered Date:</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                  {selectedPatientModal.lastVisit}
                </div>
              </div>
            </div>

            {/* Exposure Habits & Symptoms */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                {language === 'te' ? 'అలవాట్లు & క్లినికల్ పరిశీలనలు:' : 'Exposure Habits & Clinical Assessment:'}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#334155', background: '#fff7ed', border: '1px solid #ffedd5', padding: '10px 14px', borderRadius: '12px', marginBottom: '8px' }}>
                <strong>Habits / Reverse Smoking:</strong>{' '}
                {selectedPatientModal.exposureHistory && selectedPatientModal.exposureHistory.length > 0
                  ? selectedPatientModal.exposureHistory.map((h) => `${h.label} (${h.durationYears || 18} yrs)`).join(', ')
                  : 'Tobacco chewing (18 yrs), Reverse chutta smoking (Adda Poga)'}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#334155', background: '#f1f5f9', padding: '10px 14px', borderRadius: '12px' }}>
                <strong>Oral Lesion & AI Concordance:</strong> {selectedPatientModal.oralScreening} • {selectedPatientModal.chronic}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setSelectedPatientModal(null)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '16px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>

              {onStartTeleconsult && (
                <button
                  onClick={() => {
                    const ptToCall = selectedPatientModal;
                    setSelectedPatientModal(null);
                    onStartTeleconsult({
                      id: ptToCall.id,
                      name: ptToCall.name,
                      age: ptToCall.age,
                      gender: ptToCall.gender,
                      ageSex: `${ptToCall.age} / ${ptToCall.gender.charAt(0)}`,
                      abhaId: ptToCall.abhaId,
                      complaint: ptToCall.chronic,
                      vitals: ptToCall.vitals,
                      assignedPhc: ptToCall.assignedPhc,
                      assignedAnm: ptToCall.assignedAnm,
                      referral: ptToCall.referral,
                      raw: ptToCall.raw || ptToCall
                    });
                  }}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '16px',
                    border: 'none',
                    background: '#0d9488',
                    color: '#ffffff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Video size={14} />
                  <span>{language === 'te' ? '3-వే వీడియో కాల్ ప్రారంభించండి' : 'Launch 3-Way Video Call'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
