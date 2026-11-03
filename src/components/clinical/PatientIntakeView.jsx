import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  Search,
  CheckCircle,
  FileBadge,
  Phone,
  AlertCircle,
  Download,
  Eye,
  MapPin,
  Building2,
  Stethoscope,
  Video,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  ITDA_PADERU_MANDALS,
  resolveGeoRouting,
  registerPatient,
  getAllPatients,
  TERTIARY_SPECIALIST_CENTER,
} from '../../services/referralRoutingService';

export default function PatientIntakeView({ onStartTeleconsult, onOpenScreening }) {
  const { language, t } = useLanguage();
  const [patients, setPatients] = useState(() => getAllPatients());
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [selectedPatientForCard, setSelectedPatientForCard] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Form State strictly adhering to Hackathon PDF Module A
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: 'Male',
    contact: '',
    guardian: '',
    abhaId: '14-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000),
    mandal: 'G. Madugula',
    village: 'G. Madugula',
    // Exposure Habits
    chewingTobacco: false,
    chewingTobaccoYears: '',
    chewingTobaccoFreq: '',
    reverseSmoking: false,
    reverseSmokingYears: '',
    arecaNut: false,
    bidiSmoking: false,
    alcoholConsumption: false,
    noHabits: false,
    // Symptoms
    persistentUlcer: false,
    whitePatch: false,
    redPatch: false,
    trismus: false,
    burningSensation: false,
    bleedingOrGrowth: false,
    dysphagia: false,
    symptomDurationWeeks: '',
    // Consents
    examinationConsent: true,
    photoConsent: true,
    teleconsultConsent: true,
    dataProcessingConsent: true,
  });

  // Keep patients list synchronized across tab events
  useEffect(() => {
    const handleUpdate = () => {
      setPatients(getAllPatients());
    };
    window.addEventListener('aarogya_patients_updated', handleUpdate);
    return () => window.removeEventListener('aarogya_patients_updated', handleUpdate);
  }, []);

  // Compute live geo-routing preview based on chosen Mandal and Village
  const routing = resolveGeoRouting(formData.mandal, formData.village);

  const availableVillages =
    ITDA_PADERU_MANDALS.find((m) => m.mandal === formData.mandal)?.villages || [];

  const handleMandalChange = (e) => {
    const newMandal = e.target.value;
    const vList = ITDA_PADERU_MANDALS.find((m) => m.mandal === newMandal)?.villages || [];
    setFormData((prev) => ({
      ...prev,
      mandal: newMandal,
      village: vList[0]?.village || '',
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegisterPatient = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) {
      alert(language === 'te' ? 'దయచేసి రోగి పేరు మరియు ఫోన్ నంబర్ నమోదు చేయండి' : 'Please fill in patient name and phone number');
      return;
    }

    // Prepare structured exposure habits
    const exposureHistory = [];
    if (formData.chewingTobacco) {
      exposureHistory.push({
        type: 'chewing_tobacco',
        label: 'Tobacco Chewing (Gutkha/Khaini)',
        labelTe: 'పొగాకు నమలడం (గుట్కా/ఖైనీ)',
        durationYears: formData.chewingTobaccoYears || 5,
        frequencyPerDay: formData.chewingTobaccoFreq || '4-6 packets daily',
        active: true,
      });
    }
    if (formData.reverseSmoking) {
      exposureHistory.push({
        type: 'reverse_smoking',
        label: 'Reverse Smoking (Adda Poga / Chutta)',
        labelTe: 'రివర్స్ స్మోకింగ్ (అడ్డ పొగ / చుట్ట)',
        durationYears: formData.reverseSmokingYears || 8,
        active: true,
      });
    }
    if (formData.arecaNut) {
      exposureHistory.push({
        type: 'areca_nut',
        label: 'Areca Nut / Betel Quid without tobacco',
        labelTe: 'వక్క / తమలపాకులు (OSMF కారణం)',
        durationYears: 6,
        active: true,
      });
    }
    if (formData.bidiSmoking) {
      exposureHistory.push({
        type: 'bidi_smoking',
        label: 'Bidi / Cigarette Smoking',
        labelTe: 'బీడీ / సిగరెట్ తాగడం',
        durationYears: 10,
        active: true,
      });
    }
    if (formData.alcoholConsumption) {
      exposureHistory.push({
        type: 'alcohol',
        label: 'Alcohol Consumption (Synergistic Risk)',
        labelTe: 'మద్యం సేవించడం',
        durationYears: 5,
        active: true,
      });
    }
    if (formData.noHabits || exposureHistory.length === 0) {
      exposureHistory.push({
        type: 'none',
        label: 'Non-User / No known habits',
        labelTe: 'ఏ అలవాట్లు లేని వ్యక్తి',
        active: false,
      });
    }

    // Prepare symptoms
    const symptoms = [];
    if (formData.persistentUlcer) {
      symptoms.push({
        type: 'persistent_ulcer',
        label: 'Persistent Ulcer > 14 Days',
        labelTe: '14 రోజులకు పైగా తగ్గని పుండు',
        durationWeeks: formData.symptomDurationWeeks || 3,
      });
    }
    if (formData.whitePatch) {
      symptoms.push({
        type: 'white_patch',
        label: 'White Patch (Leukoplakia)',
        labelTe: 'తెల్లటి మచ్చ (ల్యూకోప్లాకియా)',
        durationWeeks: formData.symptomDurationWeeks || 8,
      });
    }
    if (formData.redPatch) {
      symptoms.push({
        type: 'red_patch',
        label: 'Red Mucosal Patch (Erythroplakia)',
        labelTe: 'ఎర్రటి మచ్చ (ఎరిత్రోప్లాకియా)',
        durationWeeks: formData.symptomDurationWeeks || 4,
      });
    }
    if (formData.trismus) {
      symptoms.push({
        type: 'trismus',
        label: 'Restricted Mouth Opening (Trismus < 3 fingers)',
        labelTe: 'నోరు తెరవలేకపోవడం (ట్రిస్మస్)',
        durationWeeks: formData.symptomDurationWeeks || 12,
      });
    }
    if (formData.burningSensation) {
      symptoms.push({
        type: 'burning',
        label: 'Burning Sensation with Spices',
        labelTe: 'కారంతో మంట మండే అనుభూతి',
        durationWeeks: formData.symptomDurationWeeks || 6,
      });
    }
    if (formData.bleedingOrGrowth) {
      symptoms.push({
        type: 'growth',
        label: 'Unprovoked Bleeding or Growth',
        labelTe: 'రక్తస్రావం లేదా గడ్డ / వాపు',
        durationWeeks: formData.symptomDurationWeeks || 2,
      });
    }

    // Call service to register and auto-route
    const createdPatient = registerPatient({
      name: formData.name,
      nameTe: formData.name,
      age: formData.age,
      sex: formData.sex,
      contact: formData.contact,
      guardian: formData.guardian,
      abhaId: formData.abhaId,
      mandal: formData.mandal,
      village: formData.village,
      exposureHistory,
      symptoms,
      consents: {
        examinationConsent: formData.examinationConsent,
        photoConsent: formData.photoConsent,
        teleconsultConsent: formData.teleconsultConsent,
        dataProcessingConsent: formData.dataProcessingConsent,
      },
    });

    setPatients(getAllPatients());
    setSelectedPatientForCard(createdPatient);
    setShowForm(false);
    setToastMessage(
      language === 'te'
        ? `రోగి ${formData.name} విజయవంతంగా నమోదయ్యారు! దరఖాస్తు సంబంధిత ANM (${routing.anm.name}) మరియు PHC (${routing.phc.name})కి పంపబడింది.`
        : `Patient ${formData.name} registered! Auto-routed to local ANM (${routing.anm.name}) and ${routing.phc.name} triage queue.`
    );
  };

  const handlePreloadDemoCase = () => {
    setFormData({
      name: 'Appa Rao (G. Madugula Case)',
      age: '46',
      sex: 'Male',
      contact: '+91 98480 12345',
      guardian: 'Suramma (Wife)',
      abhaId: '14-9041-7821-4601',
      mandal: 'G. Madugula',
      village: 'G. Madugula',
      chewingTobacco: true,
      chewingTobaccoYears: '18',
      chewingTobaccoFreq: '6 pouches daily',
      reverseSmoking: true,
      reverseSmokingYears: '10',
      arecaNut: false,
      bidiSmoking: false,
      alcoholConsumption: true,
      noHabits: false,
      persistentUlcer: false,
      whitePatch: true,
      redPatch: false,
      trismus: false,
      burningSensation: true,
      bleedingOrGrowth: false,
      dysphagia: false,
      symptomDurationWeeks: '8',
      examinationConsent: true,
      photoConsent: true,
      teleconsultConsent: true,
      dataProcessingConsent: true,
    });
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.village.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-content-area feature-view-container" style={{ padding: '20px' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            background: '#ecfdf5',
            color: '#065f46',
            border: '1.5px solid #a7f3d0',
            padding: '14px 18px',
            borderRadius: '12px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.95rem',
            fontWeight: 700,
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.2)',
          }}
        >
          <CheckCircle size={22} color="#059669" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* View Header */}
      <div className="feature-header" style={{ marginBottom: '22px' }}>
        <div className="feature-header-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              AAROHAN Hackathon 2026 • Module A
            </span>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>
            {language === 'te'
              ? 'రోగి నమోదు & భౌగోళిక-రూటింగ్ వ్యవస్థ'
              : 'Patient Registration & ITDA Geo-Routing Intake'}
          </h1>
          <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0 }}>
            {language === 'te'
              ? 'ఆభా ID, గిరిజన మండల నివాసం, అలవాట్లు & నోటి లక్షణాల నమోదు — సమీప ANM & PHCకి స్వయంచాలక కేటాయింపు.'
              : 'Demographics, habit exposures, oral symptoms & automatic catchment routing to assigned ANM and nearest PHC.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={handlePreloadDemoCase}
            style={{
              background: '#fff7ed',
              color: '#c2410c',
              border: '1.5px solid #fdba74',
              padding: '8px 16px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Sparkles size={16} />
            <span>{language === 'te' ? '🎯 డెమో కేస్ (46 సం. పురుషుడు)' : '🎯 Load 46yo Demo Case'}</span>
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
            style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.35)',
            }}
          >
            <UserPlus size={16} />
            <span>{showForm ? (language === 'te' ? 'ఫారమ్ మూసివేయి' : 'Hide Intake Form') : (language === 'te' ? '+ కొత్త రోగి నమోదు' : '+ Register New Patient')}</span>
          </button>
        </div>
      </div>

      {/* Main Registration Form */}
      {showForm && (
        <form
          onSubmit={handleRegisterPatient}
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1.5px solid #e2e8f0',
            padding: '24px',
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
          }}
        >
          {/* Section 1: Demographics & Geo-Hierarchy */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={20} color="#f97316" />
              <span>1. {language === 'te' ? 'వ్యక్తిగత వివరాలు & ITDA పాడేరు స్థానిక సమాచారం' : 'Personal Demographics & ITDA Paderu Geo-Location'}</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  {language === 'te' ? 'పూర్తి పేరు *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={language === 'te' ? 'ఉదా. అప్పారావు' : 'e.g. Appa Rao'}
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  {language === 'te' ? 'వయస్సు / పుట్టిన తేదీ *' : 'Age / Date of Birth *'}
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  placeholder="e.g. 46"
                  value={formData.age}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  {language === 'te' ? 'లింగం *' : 'Sex *'}
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', background: 'white' }}
                >
                  <option value="Male">{language === 'te' ? 'పురుషుడు (Male)' : 'Male'}</option>
                  <option value="Female">{language === 'te' ? 'స్త్రీ (Female)' : 'Female'}</option>
                  <option value="Other">{language === 'te' ? 'ఇతరులు (Other)' : 'Other'}</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  {language === 'te' ? 'మొబైల్ / సంప్రదింపు నంబర్ *' : 'Mobile / Contact Details *'}
                </label>
                <input
                  type="tel"
                  name="contact"
                  required
                  placeholder="+91 98480 12345"
                  value={formData.contact}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  {language === 'te' ? 'సంరక్షకుడు / బంధువు పేరు' : 'Guardian / Relative Name'}
                </label>
                <input
                  type="text"
                  name="guardian"
                  placeholder="e.g. Suramma (Wife)"
                  value={formData.guardian}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  {language === 'te' ? 'ఆభా నంబర్ (ఐచ్ఛికం - ఆధార్ తప్పనిసరి కాదు)' : 'ABHA ID (Optional - Aadhaar Not Mandatory)'}
                </label>
                <input
                  type="text"
                  name="abhaId"
                  value={formData.abhaId}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', background: '#f8fafc' }}
                />
              </div>
            </div>

            {/* Geo Location Selectors */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  {language === 'te' ? 'గిరిజన మండలం (Mandal) *' : 'ITDA Tribal Mandal *'}
                </label>
                <select
                  name="mandal"
                  value={formData.mandal}
                  onChange={handleMandalChange}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #f97316', fontSize: '13px', background: '#fff7ed', fontWeight: 700 }}
                >
                  {ITDA_PADERU_MANDALS.map((m) => (
                    <option key={m.mandal} value={m.mandal}>
                      {language === 'te' ? m.mandalTe : m.mandal} Mandal
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  {language === 'te' ? 'గ్రామం / నివాసం (Village / Habitation) *' : 'Village / Habitation *'}
                </label>
                <select
                  name="village"
                  value={formData.village}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #f97316', fontSize: '13px', background: '#fff7ed', fontWeight: 700 }}
                >
                  {availableVillages.map((v) => (
                    <option key={v.village} value={v.village}>
                      {language === 'te' ? v.villageTe : v.village} ({v.panchayat})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dynamic Geo-Routing Resolution Banner */}
            <div
              style={{
                marginTop: '16px',
                background: '#f0fdf4',
                border: '1.5px solid #86efac',
                borderRadius: '12px',
                padding: '14px 18px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Building2 size={20} color="#16a34a" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {language === 'te' ? 'కేటాయించిన ప్రాథమిక ఆరోగ్య కేంద్రం (PHC):' : 'Assigned Catchment PHC:'}
                  </span>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
                    {language === 'te' ? routing.phc.nameTe : routing.phc.name}
                  </div>
                  <small style={{ color: '#475569' }}>MO: {routing.phc.medicalOfficer}</small>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Stethoscope size={20} color="#16a34a" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {language === 'te' ? 'కేటాయించిన గ్రామ ఆరోగ్య కార్యకర్త (ANM):' : 'Assigned Village Health Worker (ANM):'}
                  </span>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
                    {language === 'te' ? routing.anm.nameTe : routing.anm.name}
                  </div>
                  <small style={{ color: '#475569' }}>{routing.anm.subCentre} • {routing.anm.contact}</small>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: High-Risk Habit Exposure History */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={20} color="#ea580c" />
              <span>2. {language === 'te' ? 'ప్రమాదకర అలవాట్ల చరిత్ర (Exposure History - NOCR / ACS)' : 'High-Risk Habit History (Exposure - NOCR / ACS)'}</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: formData.chewingTobacco ? '#ffedd5' : '#f8fafc', padding: '12px', borderRadius: '10px', border: `1.5px solid ${formData.chewingTobacco ? '#f97316' : '#e2e8f0'}`, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="chewingTobacco"
                  checked={formData.chewingTobacco}
                  onChange={handleInputChange}
                  style={{ marginTop: '3px', accentColor: '#ea580c' }}
                />
                <div style={{ flex: 1 }}>
                  <strong>{language === 'te' ? 'పొగాకు నమలడం (గుట్కా / ఖైనీ / పాన్)' : 'Tobacco Chewing (Gutkha/Khaini/Paan)'}</strong>
                  {formData.chewingTobacco && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <input
                        type="number"
                        name="chewingTobaccoYears"
                        placeholder="Years (e.g. 18)"
                        value={formData.chewingTobaccoYears}
                        onChange={handleInputChange}
                        style={{ width: '50%', padding: '4px 8px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                      />
                      <input
                        type="text"
                        name="chewingTobaccoFreq"
                        placeholder="Packets/Day (e.g. 6)"
                        value={formData.chewingTobaccoFreq}
                        onChange={handleInputChange}
                        style={{ width: '50%', padding: '4px 8px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                      />
                    </div>
                  )}
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: formData.reverseSmoking ? '#ffedd5' : '#f8fafc', padding: '12px', borderRadius: '10px', border: `1.5px solid ${formData.reverseSmoking ? '#f97316' : '#e2e8f0'}`, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="reverseSmoking"
                  checked={formData.reverseSmoking}
                  onChange={handleInputChange}
                  style={{ marginTop: '3px', accentColor: '#ea580c' }}
                />
                <div style={{ flex: 1 }}>
                  <strong>{language === 'te' ? 'రివర్స్ స్మోకింగ్ (అడ్డ పొగ / చుట్ట - గిరిజన ప్రాంతం)' : 'Reverse Smoking (Adda Poga / Chutta - Tribal Area)'}</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748b' }}>Palatal burn & high glandular dysplasia risk</p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: formData.arecaNut ? '#ffedd5' : '#f8fafc', padding: '12px', borderRadius: '10px', border: `1.5px solid ${formData.arecaNut ? '#f97316' : '#e2e8f0'}`, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="arecaNut"
                  checked={formData.arecaNut}
                  onChange={handleInputChange}
                  style={{ marginTop: '3px', accentColor: '#ea580c' }}
                />
                <div>
                  <strong>{language === 'te' ? 'వక్క / తమలపాకులు (OSMF కారణం)' : 'Areca Nut / Betel Quid (OSMF Etiology)'}</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748b' }}>Submucous fibrosis & alkaloid toxicity</p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: formData.alcoholConsumption ? '#ffedd5' : '#f8fafc', padding: '12px', borderRadius: '10px', border: `1.5px solid ${formData.alcoholConsumption ? '#f97316' : '#e2e8f0'}`, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="alcoholConsumption"
                  checked={formData.alcoholConsumption}
                  onChange={handleInputChange}
                  style={{ marginTop: '3px', accentColor: '#ea580c' }}
                />
                <div>
                  <strong>{language === 'te' ? 'మద్యం సేవించడం (పొగాకుతో కలిపి అధిక ప్రమాదం)' : 'Alcohol Consumption (Synergistic Risk)'}</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748b' }}>Enhanced mucosal permeability</p>
                </div>
              </label>
            </div>
          </div>

          {/* Section 3: Oral Cavity Symptoms */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Stethoscope size={20} color="#0d9488" />
              <span>3. {language === 'te' ? 'నోటి లక్షణాలు (Symptoms Under Assessment)' : 'Oral Symptoms Under Assessment'}</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {[
                { name: 'persistentUlcer', label: language === 'te' ? '14 రోజులకు పైగా తగ్గని పుండు' : 'Persistent Mouth Ulcer (> 14 Days)' },
                { name: 'whitePatch', label: language === 'te' ? 'బుగ్గపై తెల్లటి మచ్చ (ల్యూకోప్లాకియా)' : 'White Patch on Cheek / Tongue (Leukoplakia)' },
                { name: 'redPatch', label: language === 'te' ? 'ఎర్రటి మచ్చ (ఎరిత్రోప్లాకియా - హై రిస్క్)' : 'Red Mucosal Patch (Erythroplakia - High Risk)' },
                { name: 'trismus', label: language === 'te' ? 'నోరు తెరవలేకపోవడం (ట్రిస్మస్ < 3 వేళ్ళు)' : 'Restricted Mouth Opening (Trismus < 3 fingers)' },
                { name: 'burningSensation', label: language === 'te' ? 'కారంతో తీవ్ర మంట (Burning Sensation)' : 'Intense Burning with Spices' },
                { name: 'bleedingOrGrowth', label: language === 'te' ? 'రక్తస్రావం లేదా గడ్డ / వాపు' : 'Local Pain / Bleeding / Visible Growth' },
              ].map((item) => (
                <label key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: formData[item.name] ? '#ccfbf1' : '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${formData[item.name] ? '#0d9488' : '#e2e8f0'}`, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={formData[item.name]}
                    onChange={handleInputChange}
                    style={{ accentColor: '#0d9488' }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: formData[item.name] ? 700 : 500 }}>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 4: Mandatory Consents */}
          <div style={{ marginBottom: '24px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#334155', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={18} color="#059669" />
              <span>4. {language === 'te' ? 'రోగి సమ్మతి పత్రాలు (DPDP & టెలిమెడిసిన్ చట్టాలు)' : 'Mandatory Consents (DPDP & Telemedicine Compliance)'}</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                <input type="checkbox" name="examinationConsent" checked={formData.examinationConsent} onChange={handleInputChange} required />
                <span>{language === 'te' ? 'నోటి శారీరక పరీక్షకు సమ్మతి' : 'Consent for Clinical Oral Cavity Examination'}</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                <input type="checkbox" name="photoConsent" checked={formData.photoConsent} onChange={handleInputChange} required />
                <span>{language === 'te' ? 'ఫోటో తీయడం & ఏఐ అంచనాకు సమ్మతి' : 'Consent for Oral Photography & Advisory AI Review'}</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                <input type="checkbox" name="teleconsultConsent" checked={formData.teleconsultConsent} onChange={handleInputChange} required />
                <span>{language === 'te' ? 'స్పెషలిస్ట్ టెలికన్సల్టేషన్ (వీడియో కాల్)కు సమ్మతి' : 'Consent for Specialist Video Teleconsultation'}</span>
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px' }}>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                padding: '10px 22px',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                background: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              {language === 'te' ? 'రద్దు చేయండి' : 'Cancel'}
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 28px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
              }}
            >
              <UserPlus size={18} />
              <span>{language === 'te' ? 'రోగిని నమోదు చేయండి & సమీప PHCకి రూట్ చేయండి →' : 'Register & Auto-Route to PHC →'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Selected Registered Patient Confirmation Card */}
      {selectedPatientForCard && (
        <div
          style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
            border: '2px solid #3b82f6',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '30px',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.15)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563eb', background: '#dbeafe', padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
                ✓ {language === 'te' ? 'నమోదు పూర్తయింది' : 'Registration Generated'} • {selectedPatientForCard.id}
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', margin: '8px 0 4px 0' }}>
                {selectedPatientForCard.name} ({selectedPatientForCard.ageSex})
              </h2>
              <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0 }}>
                {selectedPatientForCard.village}, {selectedPatientForCard.mandal} Mandal • Contact: {selectedPatientForCard.contact}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {onOpenScreening && (
                <button
                  type="button"
                  onClick={onOpenScreening}
                  style={{
                    background: '#f97316',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sparkles size={16} />
                  <span>{language === 'te' ? 'నోటి ఫోటో తీసి ఏఐ విశ్లేషించండి' : 'Capture Oral Photo & Run AI'}</span>
                </button>
              )}
              {onStartTeleconsult && (
                <button
                  type="button"
                  onClick={() => onStartTeleconsult(selectedPatientForCard)}
                  style={{
                    background: '#0d9488',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Video size={16} />
                  <span>{language === 'te' ? 'టెలికన్సల్టేషన్ ప్రారంభించండి' : 'Launch Teleconsultation Room'}</span>
                </button>
              )}
            </div>
          </div>

          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '12.5px', color: '#475569' }}>
            <div>
              <strong>{language === 'te' ? 'కేటాయించిన PHC:' : 'Assigned PHC:'}</strong> {selectedPatientForCard.assignedPhc?.name}
            </div>
            <div>
              <strong>{language === 'te' ? 'కేటాయించిన ANM:' : 'Assigned ANM:'}</strong> {selectedPatientForCard.assignedAnm?.name} ({selectedPatientForCard.assignedAnm?.contact})
            </div>
            <div>
              <strong>{language === 'te' ? 'రిఫరల్ ఆసుపత్రి:' : 'Referral Hospital:'}</strong> {TERTIARY_SPECIALIST_CENTER.hospitalName}
            </div>
          </div>
        </div>
      )}

      {/* Live Directory of Registered Tribal Patients */}
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid #e2e8f0', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              {language === 'te' ? 'నమోదైన రోగుల రికార్డులు (ITDA పాడేరు)' : 'Registered Patients Longitudinal Directory (ITDA Paderu)'}
            </h3>
            <small style={{ color: '#64748b' }}>
              {filteredPatients.length} {language === 'te' ? 'రోగులు రికార్డుల్లో ఉన్నారు' : 'active patient dossiers registered'}
            </small>
          </div>

          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder={language === 'te' ? 'పేరు, గ్రామం లేదా ఐడి ద్వారా వెతకండి...' : 'Search by name, village, ID...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '7px 10px 7px 32px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                <th style={{ padding: '10px 12px' }}>{language === 'te' ? 'రోగి ఐడి' : 'Patient ID'}</th>
                <th style={{ padding: '10px 12px' }}>{language === 'te' ? 'పేరు' : 'Name'}</th>
                <th style={{ padding: '10px 12px' }}>{language === 'te' ? 'వయస్సు / లింగం' : 'Age / Sex'}</th>
                <th style={{ padding: '10px 12px' }}>{language === 'te' ? 'గ్రామం & మండలం' : 'Village & Mandal'}</th>
                <th style={{ padding: '10px 12px' }}>{language === 'te' ? 'కేటాయించిన PHC & ANM' : 'Assigned PHC & ANM'}</th>
                <th style={{ padding: '10px 12px' }}>{language === 'te' ? 'స్థితి' : 'Status'}</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>{language === 'te' ? 'చర్య' : 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 800, color: '#f97316' }}>{p.id}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1e293b' }}>
                    {language === 'te' ? (p.nameTe || p.name) : p.name}
                  </td>
                  <td style={{ padding: '10px 12px', color: '#475569' }}>{p.ageSex}</td>
                  <td style={{ padding: '10px 12px', color: '#334155' }}>
                    <strong>{p.village}</strong>, {p.mandal}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f766e' }}>{p.assignedPhc?.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>ANM: {p.assignedAnm?.name}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '10px',
                        background: p.status === 'referred_to_specialist' ? '#fee2e2' : '#fef3c7',
                        color: p.status === 'referred_to_specialist' ? '#b91c1c' : '#92400e',
                      }}
                    >
                      {language === 'te' ? (p.statusTe || p.status) : p.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedPatientForCard(p)}
                      style={{
                        background: '#f1f5f9',
                        border: '1px solid #cbd5e1',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {language === 'te' ? 'వివరాలు చూడండి' : 'View Details'}
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
