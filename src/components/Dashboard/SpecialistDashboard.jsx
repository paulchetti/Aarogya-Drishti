import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import DashboardNavbar from './DashboardNavbar';
import Sidebar from './Sidebar';
import WelcomeBanner from './WelcomeBanner';
import StatCards from './StatCards';
import ScreeningModal from './ScreeningModal';
import AIChatBot from './AIChatBot';
import TeleconsultationSuite from '../clinical/TeleconsultationSuite';
import { getAllPatients } from '../../services/referralRoutingService';
import '../../styles/dashboard.css';
import {
  AIIcon,
  CameraIcon,
  CalendarIcon,
  ReferralIcon,
  ReportsIcon,
  HistoryIcon,
  SettingsIcon,
  UserPlusIcon,
  TargetIcon,
  WarningIcon,
  SearchIcon,
  HeartPulseIcon,
} from '../Icons';

export default function SpecialistDashboard({ onToast, onSwitchDashboard, onLogout }) {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isTelehealthOpen, setIsTelehealthOpen] = useState(() => {
    const p = new URLSearchParams(window.location.search);
    return p.get('teleconsult') === 'true' || !!p.get('room');
  });
  const [selectedCase, setSelectedCase] = useState(null);

  const demoPatient = getAllPatients().find((p) => p.id === 'ADP-2026-0046') || getAllPatients()[0];

  const specialistMenuItems = [
    { name: 'Inbound Referral Triage Queue', icon: <ReferralIcon /> },
    { name: 'High-Acuity Priority Cases', icon: <WarningIcon /> },
    { name: 'Longitudinal EMR Records', icon: <HistoryIcon /> },
    { name: 'Clinical Encounter Notes', icon: <ReportsIcon /> },
    { name: 'Diagnostic Orders & Lab Workups', icon: <CameraIcon /> },
    { name: 'Inter-Provider Clinical Feedback', icon: <AIIcon /> },
    { name: 'Specialist Consultation Schedule', icon: <CalendarIcon /> },
    { name: 'Diagnostic Summary Report', icon: <ReportsIcon /> },
    { name: 'Telehealth Video Gateway', icon: <HeartPulseIcon /> },
    { name: 'Specialist Directory & Availability Settings', icon: <SettingsIcon /> },
  ];

  const specialistStats = [
    {
      title: language === 'te' ? 'వచ్చిన పీహెచ్‌సీ రిఫరల్స్' : 'Incoming PHC Referrals',
      value: '42',
      trend: '↑ 14%',
      trendColor: 'green',
      subtext: language === 'te' ? 'గత వారంతో పోలిస్తే' : 'vs. last week',
      icon: <ReferralIcon className="w-5 h-5" />,
      colorClass: 'orange',
      cardBorder: 'orange-bottom',
    },
    {
      title: language === 'te' ? 'షెడ్యూల్ చేసిన టెలికన్సల్టేషన్లు' : 'Teleconsultations Scheduled',
      value: '18',
      trend: '↑ 8%',
      trendColor: 'green',
      subtext: language === 'te' ? 'నేటి కొరకు' : 'for today',
      icon: <AIIcon className="w-5 h-5" />,
      colorClass: 'teal',
      cardBorder: 'teal-bottom',
    },
    {
      title: language === 'te' ? 'పెండింగ్‌లో ఉన్న బయాప్సీ సిఫార్సులు' : 'Biopsy Recommendations Pending',
      value: '9',
      trend: language === 'te' ? 'హై ప్రయారిటీ' : 'High Priority',
      trendColor: 'amber',
      subtext: language === 'te' ? 'ఆమోదం అవసరం' : 'requires approval',
      icon: <WarningIcon className="w-5 h-5" />,
      colorClass: 'amber',
      cardBorder: 'amber-bottom',
    },
    {
      title: language === 'te' ? 'ధృవీకరించబడిన కేసు పరిష్కారాలు' : 'Confirmed Case Closures',
      value: '64',
      trend: '↑ 22%',
      trendColor: 'green',
      subtext: language === 'te' ? 'ఈ నెలలో' : 'this month',
      icon: <TargetIcon className="w-5 h-5" />,
      colorClass: 'blue',
      cardBorder: 'blue-bottom',
    },
  ];

  const referralQueue = [
    {
      id: 'REF-2025-089',
      patientId: 'ADP-001246',
      name: 'Savitri K.',
      ageSex: '28 / F',
      phc: 'PHC Koyyuru',
      lesion: 'Erythroplakia (Lateral Tongue)',
      risk: 'High Suspicion',
      riskClass: 'suspicious',
      aiConfidence: '94.2%',
      triageDate: '15 Apr 2025',
      status: 'Urgent Review',
      statusClass: 'under-review',
    },
    {
      id: 'REF-2025-088',
      patientId: 'ADP-001239',
      name: 'Govinda Raju',
      ageSex: '51 / M',
      phc: 'PHC Araku',
      lesion: 'Ulcerative Mass (Buccal Mucosa)',
      risk: 'Malignancy Alert',
      riskClass: 'suspicious',
      aiConfidence: '96.8%',
      triageDate: '15 Apr 2025',
      status: 'Biopsy Scheduled',
      statusClass: 'follow-up',
    },
    {
      id: 'REF-2025-087',
      patientId: 'ADP-001235',
      name: 'Appala Narasamma',
      ageSex: '62 / F',
      phc: 'PHC Chintapalli',
      lesion: 'Reverse Smoker Palatal Keratosis',
      risk: 'Moderate Risk',
      riskClass: 'follow-up',
      aiConfidence: '88.5%',
      triageDate: '14 Apr 2025',
      status: 'Tele-Consult Set',
      statusClass: 'normal',
    },
    {
      id: 'REF-2025-086',
      patientId: 'ADP-001228',
      name: 'Ramesh Babu',
      ageSex: '37 / M',
      phc: 'PHC Paderu',
      lesion: 'Homogeneous Leukoplakia (Labial)',
      risk: 'Pre-Cancerous',
      riskClass: 'under-review',
      aiConfidence: '91.0%',
      triageDate: '14 Apr 2025',
      status: 'Pending Review',
      statusClass: 'under-review',
    },
    {
      id: 'REF-2025-085',
      patientId: 'ADP-001219',
      name: 'Kondala Rao',
      ageSex: '44 / M',
      phc: 'PHC Munchingiputtu',
      lesion: 'Oral Submucous Fibrosis (Grade III)',
      risk: 'Trismus Detected',
      riskClass: 'follow-up',
      aiConfidence: '89.4%',
      triageDate: '13 Apr 2025',
      status: 'Second Opinion',
      statusClass: 'normal',
    },
  ];

  const handleNavSelect = (navName) => {
    setActiveNav(navName);
    if (navName === 'Telehealth Video Gateway') {
      setSelectedCase(demoPatient);
      setIsTelehealthOpen(true);
    } else if (navName === 'Diagnostic Orders & Lab Workups' || navName === 'High-Acuity Priority Cases') {
      setIsReviewModalOpen(true);
    } else if (onToast) {
      onToast(`Navigating to ${navName}`);
    }
  };

  const handleAction = (action) => {
    switch (action) {
      case 'telehealth-gateway':
      case 'launch-teleconsult':
        setSelectedCase(demoPatient);
        setIsTelehealthOpen(true);
        if (onToast) onToast('Launching Multi-Party Telehealth Video Gateway...');
        break;
      case 'diagnostic-orders':
      case 'review-biopsy':
        setIsReviewModalOpen(true);
        if (onToast) onToast('Opening Diagnostic Orders & Lab Workups Console...');
        break;
      case 'clinical-feedback':
      case 'issue-referral':
        if (onToast) onToast('Recording Inter-Provider Clinical Feedback & e-Sign for Referring PHC...');
        break;
      case 'directory-settings':
      case 'order-histopathology':
        if (onToast) onToast('Updating Specialist Directory & Availability Settings...');
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-root">
      {/* Subtle Medical Caduceus Watermark in the background */}
      <div className="dashboard-watermark-bg" aria-hidden="true">
        <img
          src="/caduceus-watermark.png"
          alt="Medical Caduceus Watermark"
          className="watermark-img"
        />
      </div>

      {/* Top Navbar with clean logo in top left */}
      <DashboardNavbar
        dashboardTitle="Specialist Dashboard"
        userName="Dr. Ananya Varma, MD"
        userRole="Head of Oral Oncology & Tele-Triage"
        userAvatar="https://images.unsplash.com/photo-1594824813583-36603a110a11?auto=format&fit=crop&w=120&q=80"
        notificationCount={5}
        onSwitchDashboard={onSwitchDashboard}
        onLogout={onLogout}
      />

      {/* Main Body Grid - 100% Full Display Width */}
      <div className="dash-main-layout full-display">
        {/* Top bar row below navbar: Menu toggle button directly BELOW the logo */}
        <div className="dash-top-menu-bar">
          <Sidebar
            activeNav={activeNav}
            onNavSelect={handleNavSelect}
            isMenuOpen={isMenuOpen}
            onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
            menuTitle="Specialist Clinical Options"
            customItems={specialistMenuItems}
          />

          <div className="dash-facility-badge">
            <span className="badge-dot" style={{ backgroundColor: '#f97316' }}>●</span>
            <span>{language === 'te' ? 'స్పెషలిస్ట్ డాష్‌బోర్డ్ • ఏరియా ఆసుపత్రి పాడేరు టెలి-రివ్యూ కేంద్రం' : 'Specialist Dashboard • Area Hospital Paderu Tele-Review Center'}</span>
          </div>
        </div>

        {/* Central Canvas Area - Fills Full Display */}
        <main className="dash-content-canvas full-display">
          <div className="dash-center-col">
            {isTelehealthOpen ? (
              <div style={{ marginBottom: '24px' }}>
                <TeleconsultationSuite
                  patientData={selectedCase || demoPatient}
                  currentUserRole="specialist"
                  onEndCall={() => setIsTelehealthOpen(false)}
                />
              </div>
            ) : (
              <>
                {/* Welcome Banner */}
                <WelcomeBanner
                  doctorName={language === 'te' ? 'డాక్టర్ అనన్య వర్మ, MD' : 'Dr. Ananya Varma, MD'}
                  roleSubtitle={language === 'te' ? 'స్పెషలిస్ట్ డాష్‌బోర్డ్ • ఓరల్ ఆంకాలజీ విభాగం & టెర్షియరీ రివ్యూ' : 'Specialist Dashboard • Head of Oral Oncology & Tertiary Review'}
                  photoUrl="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=640&q=85"
                />

                {/* 4 Stat Metric Cards with Colored Lines */}
                <StatCards cards={specialistStats} />

            {/* Middle 2 Charts */}
            <div className="charts-dual-row">
              {/* Left Chart: Referral Triage & Teleconsults */}
              <div className="chart-card">
                <div className="chart-header">
                  <div className="chart-title-wrap">
                    <h3>{language === 'te' ? 'స్పెషలిస్ట్ రెఫరల్ ట్రయాజ్ & టెలికన్సల్ట్స్' : 'Specialist Referral Triage & Teleconsults'}</h3>
                    <p>{language === 'te' ? '11 ఐటీడీఏ పాడేరు పీహెచ్‌సీల నుండి వచ్చిన వారపు రెఫరల్స్' : 'Weekly referrals triaged from 11 ITDA Paderu PHCs'}</p>
                  </div>
                  <span className="chart-badge" style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>
                    +18% Monthly Inflow
                  </span>
                </div>

                <div className="chart-svg-container">
                  <svg viewBox="0 0 520 180" className="chart-svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="specAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="520" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="75" x2="520" y2="75" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="120" x2="520" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Area fill */}
                    <path
                      d="M 20 140 Q 90 90, 160 110 T 300 65 T 440 40 L 500 25 L 500 160 L 20 160 Z"
                      fill="url(#specAreaGrad)"
                    />
                    {/* Trend Line */}
                    <path
                      d="M 20 140 Q 90 90, 160 110 T 300 65 T 440 40 L 500 25"
                      fill="none"
                      stroke="#ea580c"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    {/* Secondary Bars */}
                    {[
                      { x: 50, h: 45 },
                      { x: 130, h: 70 },
                      { x: 210, h: 95 },
                      { x: 290, h: 115 },
                      { x: 370, h: 130 },
                      { x: 450, h: 145 },
                    ].map((b, i) => (
                      <rect
                        key={i}
                        x={b.x}
                        y={160 - b.h}
                        width="16"
                        height={b.h}
                        rx="4"
                        fill="#0d9488"
                        opacity="0.75"
                      />
                    ))}
                  </svg>
                </div>

                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#ea580c' }} />
                    <span>Teleconsultation Reviews</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#0d9488' }} />
                    <span>Confirmed High-Risk Interventions</span>
                  </div>
                </div>
              </div>

              {/* Right Chart: Lesion Staging Distribution */}
              <div className="chart-card">
                <div className="chart-header">
                  <div className="chart-title-wrap">
                    <h3>{language === 'te' ? 'లెసియన్ దశలు & హిస్టోపాథాలజీ పంపిణీ' : 'Lesion Staging & Histopathology Distribution'}</h3>
                    <p>{language === 'te' ? 'ప్రస్తుతం రిఫర్ చేయబడిన కేసుల విభజన' : 'Current active referred cohort breakdown'}</p>
                  </div>
                </div>

                <div className="donut-body">
                  <div className="donut-graphic">
                    <svg viewBox="0 0 160 160" className="donut-svg">
                      <circle cx="80" cy="80" r="54" fill="none" stroke="#e2e8f0" strokeWidth="22" />
                      {/* Leukoplakia (Orange) */}
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="22"
                        strokeDasharray="140 340"
                        strokeDashoffset="0"
                      />
                      {/* Erythroplakia (Teal) */}
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="22"
                        strokeDasharray="95 340"
                        strokeDashoffset="-140"
                      />
                      {/* OSMF (Amber) */}
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="22"
                        strokeDasharray="65 340"
                        strokeDashoffset="-235"
                      />
                      {/* Malignant SCC (Red) */}
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="22"
                        strokeDasharray="40 340"
                        strokeDashoffset="-300"
                      />
                    </svg>
                    <div className="donut-center-label">
                      <span className="donut-big-num">124</span>
                      <span className="donut-small-sub">Cases</span>
                    </div>
                  </div>

                  <div className="donut-legend-col">
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#f97316' }} />
                      <span className="d-label">Stage I Leukoplakia (41%)</span>
                    </div>
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#0d9488' }} />
                      <span className="d-label">Stage II Erythroplakia (28%)</span>
                    </div>
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#f59e0b' }} />
                      <span className="d-label">OSMF Grade II/III (19%)</span>
                    </div>
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#dc2626' }} />
                      <span className="d-label">Malignant SCC (12%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialist Referral Table */}
            <div className="table-card">
              <div className="table-header">
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    {language === 'te' ? 'వచ్చిన రిఫరల్ ట్రయాజ్ క్యూ (తీవ్రమైన అత్యవసర కేసులు)' : 'Inbound Referral Triage Queue (High-Acuity Cases)'}
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                    Triaged high-acuity priority cases awaiting oncological diagnosis, lab workups & clinical encounter notes
                  </p>
                </div>
                <button
                  type="button"
                  className="view-all-link"
                  onClick={() => onToast && onToast('Loading comprehensive Longitudinal EMR Records...')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  View Longitudinal EMR Records <span>→</span>
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="patient-table">
                  <thead>
                    <tr>
                      <th>{language === 'te' ? 'రిఫరల్ ఐడీ' : 'Ref ID'}</th>
                      <th>{language === 'te' ? 'రోగి పేరు' : 'Patient Name'}</th>
                      <th>{language === 'te' ? 'రిఫర్ చేసిన పీహెచ్‌సీ' : 'Referring PHC'}</th>
                      <th>{language === 'te' ? 'అనుమానిత గాయం' : 'Suspected Lesion'}</th>
                      <th>{language === 'te' ? 'ఏఐ కచ్చితత్వం' : 'AI Confidence'}</th>
                      <th>{language === 'te' ? 'ట్రయాజ్ స్థితి' : 'Triage Status'}</th>
                      <th style={{ textAlign: 'right' }}>{language === 'te' ? 'స్పెషలిస్ట్ చర్య' : 'Specialist Action'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralQueue.map((r) => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 700, color: '#334155' }}>
                          <div>{r.id}</div>
                          <small style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{r.patientId}</small>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{r.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{r.ageSex}</div>
                        </td>
                        <td style={{ fontWeight: 600, color: '#0d9488' }}>{r.phc}</td>
                        <td>
                          <div style={{ fontWeight: 600, color: '#1e293b' }}>{r.lesion}</div>
                          <span className={`status-pill ${r.riskClass}`} style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                            {r.risk}
                          </span>
                        </td>
                        <td style={{ fontWeight: 800, color: '#ea580c' }}>{r.aiConfidence}</td>
                        <td>
                          <span className={`status-pill ${r.statusClass}`}>{r.status}</span>
                        </td>
                        <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCase(r);
                              setIsTelehealthOpen(true);
                              if (onToast) onToast(`Launching 3-Way Telehealth Gateway for ${r.name}`);
                            }}
                            style={{
                              background: '#f97316',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '6px 11px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              marginRight: '6px',
                            }}
                          >
                            <span>📹 {language === 'te' ? '3-వే వీడియో' : '3-Way Video'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCase(r);
                              setIsReviewModalOpen(true);
                              if (onToast) onToast(`Opening oncology tele-review for ${r.name}`);
                            }}
                            style={{
                              background: '#0d9488',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '6px 11px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                            }}
                          >
                            <span>🔬 {language === 'te' ? 'సమీక్షించండి' : 'Review'}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </>
            )}
          </div>

          {/* Right Action & Info Sidebar */}
          <aside className="dash-right-col">
            {/* Hero Card: Oral Oncology Care */}
            <div className="early-detection-hero" style={{ background: 'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)' }}>
              <div className="hero-photo-layer">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=85"
                  alt="Oral Oncology Review"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=85";
                  }}
                />
              </div>

              <div className="hero-gradient-overlay" />

              <div className="hero-content">
                <h3>
                  {language === 'te' ? <>స్పెషలిస్ట్ సమీక్ష <br /></> : <>Tertiary Review <br /></>}
                  <span>{language === 'te' ? 'ప్రాణాలను కాపాడుతుంది' : 'Saves Lives'}</span>
                </h3>
                <p>{language === 'te' ? 'గిరిజన పీహెచ్‌సీలను ఆధునిక ఆంకాలజీ సంరక్షణతో అనుసంధానించడం' : 'Connecting Tribal PHCs to Advanced Oncology Care'}</p>
              </div>
            </div>

            {/* 4 Specialist Action Buttons */}
            <div className="action-buttons-group">
              <button
                type="button"
                className="btn-action-hero orange-grad"
                onClick={() => handleAction('telehealth-gateway')}
                title="Telehealth Video Gateway"
              >
                <div className="btn-left">
                  <AIIcon className="w-4 h-4" />
                  <span>{language === 'te' ? 'టెలిహెల్త్ వీడియో గేట్‌వే' : 'Telehealth Video Gateway'}</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero teal-grad"
                onClick={() => handleAction('diagnostic-orders')}
                title="Diagnostic Orders & Lab Workups"
              >
                <div className="btn-left">
                  <CameraIcon className="w-4 h-4" />
                  <span>{language === 'te' ? 'రోగనిర్ధారణ ఆర్డర్లు & ల్యాబ్‌లు' : 'Diagnostic Orders & Labs'}</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero"
                style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', color: '#fff' }}
                onClick={() => handleAction('clinical-feedback')}
                title="Inter-Provider Clinical Feedback"
              >
                <div className="btn-left">
                  <ReferralIcon className="w-4 h-4" />
                  <span>{language === 'te' ? 'పీహెచ్‌సీకి క్లినికల్ ఫీడ్‌బ్యాక్' : 'Inter-Provider Feedback'}</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)', color: '#fff' }}
                onClick={() => handleAction('directory-settings')}
                title="Specialist Directory & Availability Settings"
              >
                <div className="btn-left">
                  <SettingsIcon className="w-4 h-4" />
                  <span>Directory & Availability</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>
            </div>

            {/* Department Schedule Card */}
            <div className="schedule-card">
              <div className="schedule-header">
                <h4>Specialist Consultation Schedule</h4>
                <span className="schedule-date">15 Apr 2025</span>
              </div>

              <div className="schedule-list">
                <div className="schedule-item">
                  <div className="schedule-time">10:30 AM</div>
                  <div className="schedule-info">
                    <span className="patient-name">Savitri K. (PHC Koyyuru)</span>
                    <span className="consult-type">Biopsy Confirmation Video Review</span>
                  </div>
                  <span className="slot-badge live">Live Now</span>
                </div>

                <div className="schedule-item">
                  <div className="schedule-time">11:45 AM</div>
                  <div className="schedule-info">
                    <span className="patient-name">Govinda Raju (PHC Araku)</span>
                    <span className="consult-type">Surgical Tumor Board Workup</span>
                  </div>
                  <span className="slot-badge pending">Queued</span>
                </div>

                <div className="schedule-item">
                  <div className="schedule-time">02:15 PM</div>
                  <div className="schedule-info">
                    <span className="patient-name">Appala Narasamma (Chintapalli)</span>
                    <span className="consult-type">Palatal Lesion Post-Biopsy Staging</span>
                  </div>
                  <span className="slot-badge pending">Upcoming</span>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* Footer with Bottom-Left Orange Wave and Copyright */}
      <footer className="dash-bottom-footer">
        <div className="footer-swoosh" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <strong>AAROGYA DRISHTI</strong> &nbsp;|&nbsp; Specialist Dashboard
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          © 2025 AAROGYA DRISHTI. All rights reserved.
        </div>
      </footer>

      {/* Diagnostic & Teleconsultation Modal */}
      {isReviewModalOpen && (
        <ScreeningModal
          patient={selectedCase || { name: 'Savitri K.', id: 'ADP-001246', age: 28, gender: 'Female' }}
          onClose={() => setIsReviewModalOpen(false)}
          onComplete={(action) => {
            setIsReviewModalOpen(false);
            if (onToast) onToast(`Specialist action recorded: ${action}`);
          }}
        />
      )}

      {/* AI Specialist Copilot Chatbot */}
      <AIChatBot dashboardType="specialist_dashboard" />
    </div>
  );
}

