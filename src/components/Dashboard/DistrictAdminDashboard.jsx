import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import DashboardNavbar from './DashboardNavbar';
import Sidebar from './Sidebar';
import WelcomeBanner from './WelcomeBanner';
import StatCards from './StatCards';
import AIChatBot from './AIChatBot';
import '../../styles/dashboard.css';
import {
  ReportsIcon,
  ReferralIcon,
  TargetIcon,
  UserIcon,
  WarningIcon,
  CalendarIcon,
  HistoryIcon,
  SettingsIcon,
  CameraIcon,
  HeartPulseIcon,
} from '../Icons';
import {
  Truck,
  MapPin,
  CheckCircle2,
  DollarSign,
  Download,
  Printer,
  Package,
  Activity,
  AlertTriangle,
  Clock,
  Send,
  X,
  FileSpreadsheet,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function DistrictAdminDashboard({ onToast, onSwitchDashboard, onLogout }) {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Interactive Modal States
  const [isVanFleetModalOpen, setIsVanFleetModalOpen] = useState(false);
  const [selectedMandalModal, setSelectedMandalModal] = useState(null);
  const [isAshaModalOpen, setIsAshaModalOpen] = useState(false);
  const [isComplianceModalOpen, setIsComplianceModalOpen] = useState(false);
  const [isHeatmapModalOpen, setIsHeatmapModalOpen] = useState(false);

  // Dynamic Fleet State
  const [vans, setVans] = useState([
    {
      id: 'VAN-01',
      name: 'Mobile Oral Oncology Unit #01',
      mandal: 'Araku Valley',
      hamlet: 'Dumbriguda Ghat Kiosks',
      driver: 'K. Somaraju (Ph: 94901-22411)',
      doctor: 'Dr. V. Madhavan, MBBS',
      screenedToday: 84,
      targetToday: 100,
      battery: '88% (Solar Active)',
      status: 'Active Field Camp',
      statusClass: 'normal',
    },
    {
      id: 'VAN-02',
      name: 'Mobile Oral Oncology Unit #02',
      mandal: 'Paderu Central',
      hamlet: 'Hukumpeta Weekly Shandy',
      driver: 'P. Appala Naidu (Ph: 98480-55122)',
      doctor: 'Dr. Sandeep Kumar, MBBS',
      screenedToday: 112,
      targetToday: 120,
      battery: '94% (Grid Plugged)',
      status: 'Camp Complete',
      statusClass: 'normal',
    },
    {
      id: 'VAN-03',
      name: 'Mobile Oral Oncology Unit #03',
      mandal: 'Munchingiputtu',
      hamlet: 'Sujanakota Border Hamlets',
      driver: 'M. Kondababu (Ph: 99491-88433)',
      doctor: 'Dr. Rajesh Varma, BDS',
      screenedToday: 48,
      targetToday: 90,
      battery: '62% (Solar Charging)',
      status: 'En Route / Transit',
      statusClass: 'under-review',
    },
    {
      id: 'VAN-04',
      name: 'Mobile Oral Oncology Unit #04',
      mandal: 'Chintapalli',
      hamlet: 'Base Depot Paderu',
      driver: 'T. Rama Rao (Ph: 91770-33499)',
      doctor: 'Dr. Swathi K., MBBS',
      screenedToday: 0,
      targetToday: 100,
      battery: '100% (Fully Prepped)',
      status: 'Standby at Depot',
      statusClass: 'follow-up',
    },
  ]);

  // Dynamic Mandal Performance State
  const [mandalList, setMandalList] = useState([
    {
      mandal: 'Paderu',
      phc: 'PHC Paderu Central',
      inCharge: 'Dr. Sandeep Kumar',
      screened: 2450,
      target: 2800,
      pct: '87.5%',
      redFlags: 38,
      referrals: 22,
      vanStatus: 'Camp Complete',
      vanClass: 'normal',
      cytologyKits: 140,
      biopsyKits: 45,
      habitRisk: 'High (Adda Poga: 38%, Khaini: 24%)',
      breakdown: { leukoplakia: 18, erythroplakia: 8, osmf: 9, malignancy: 3 },
    },
    {
      mandal: 'Araku Valley',
      phc: 'PHC Araku & Dumbriguda',
      inCharge: 'Dr. V. Madhavan',
      screened: 2120,
      target: 2500,
      pct: '84.8%',
      redFlags: 29,
      referrals: 18,
      vanStatus: 'Active Camp',
      vanClass: 'normal',
      cytologyKits: 110,
      biopsyKits: 30,
      habitRisk: 'Moderate (Chutta: 29%, Gutkha: 22%)',
      breakdown: { leukoplakia: 14, erythroplakia: 6, osmf: 7, malignancy: 2 },
    },
    {
      mandal: 'Chintapalli',
      phc: 'PHC Chintapalli Sub-Div',
      inCharge: 'Dr. M. Swathi',
      screened: 1890,
      target: 2300,
      pct: '82.1%',
      redFlags: 34,
      referrals: 21,
      vanStatus: 'Scheduled',
      vanClass: 'normal',
      cytologyKits: 45, // Deficit!
      biopsyKits: 12,
      habitRisk: 'Critical (Adda Poga: 46%, Betel: 31%)',
      breakdown: { leukoplakia: 15, erythroplakia: 11, osmf: 5, malignancy: 3 },
    },
    {
      mandal: 'Munchingiputtu',
      phc: 'PHC Munchingiputtu Border',
      inCharge: 'Dr. Rajesh Varma',
      screened: 1640,
      target: 2100,
      pct: '78.1%',
      redFlags: 26,
      referrals: 14,
      vanStatus: 'En Route',
      vanClass: 'under-review',
      cytologyKits: 60,
      biopsyKits: 18,
      habitRisk: 'High (Khaini: 36%, Reverse Smoker: 28%)',
      breakdown: { leukoplakia: 12, erythroplakia: 5, osmf: 7, malignancy: 2 },
    },
    {
      mandal: 'G. Madugula',
      phc: 'PHC G. Madugula Tribal',
      inCharge: 'Dr. P. Srinivasa Rao',
      screened: 1780,
      target: 2200,
      pct: '80.9%',
      redFlags: 31,
      referrals: 19,
      vanStatus: 'Active Camp',
      vanClass: 'normal',
      cytologyKits: 95,
      biopsyKits: 28,
      habitRisk: 'Critical (Adda Poga: 42%, Gutkha: 29%)',
      breakdown: { leukoplakia: 16, erythroplakia: 7, osmf: 6, malignancy: 2 },
    },
    {
      mandal: 'G.K. Veedhi',
      phc: 'PHC G.K. Veedhi Interior',
      inCharge: 'Dr. B. Anjaneyulu',
      screened: 1420,
      target: 1900,
      pct: '74.7%',
      redFlags: 22,
      referrals: 12,
      vanStatus: 'Scheduled',
      vanClass: 'normal',
      cytologyKits: 40, // Deficit!
      biopsyKits: 10,
      habitRisk: 'High (Chutta: 39%, Betel: 24%)',
      breakdown: { leukoplakia: 10, erythroplakia: 6, osmf: 4, malignancy: 2 },
    },
  ]);

  // Dynamic ASHA Incentives State
  const [ashaWorkers, setAshaWorkers] = useState([
    {
      id: 'ASHA-PAD-042',
      name: 'Lakshmi Devi',
      village: 'G. Madugula Sub-Centre',
      mandal: 'G. Madugula',
      screenings: 42,
      redFlags: 6,
      biopsyConfirmed: 2,
      earnedIncentive: 4200, // 42 * ₹50 + 2 * ₹1000 + bonus
      status: 'Approved (Pending DBT)',
    },
    {
      id: 'ASHA-ARK-088',
      name: 'Parvati Kondamma',
      village: 'Dumbriguda Hamlet 14',
      mandal: 'Araku Valley',
      screenings: 38,
      redFlags: 4,
      biopsyConfirmed: 1,
      earnedIncentive: 3800,
      status: 'Approved (Pending DBT)',
    },
    {
      id: 'ASHA-CHI-019',
      name: 'Sanyasamma Majji',
      village: 'Tajangi Coffee Colony',
      mandal: 'Chintapalli',
      screenings: 48,
      redFlags: 8,
      biopsyConfirmed: 3,
      earnedIncentive: 5400,
      status: 'Approved (Pending DBT)',
    },
    {
      id: 'ASHA-MUN-104',
      name: 'Appalanarasamma D.',
      village: 'Sujanapeta Kiosk',
      mandal: 'Munchingiputtu',
      screenings: 35,
      redFlags: 5,
      biopsyConfirmed: 1,
      earnedIncentive: 3500,
      status: 'Approved (Pending DBT)',
    },
  ]);

  const [dbtDisbursed, setDbtDisbursed] = useState(false);
  const [dbtBatchRef, setDbtBatchRef] = useState('');

  // Dispatch Form State
  const [dispatchVanId, setDispatchVanId] = useState('VAN-04');
  const [dispatchMandal, setDispatchMandal] = useState('Chintapalli');
  const [dispatchHamlet, setDispatchHamlet] = useState('Tajangi Interior Hamlets');
  const [dispatchQuota, setDispatchQuota] = useState(150);

  const adminMenuItems = [
    { name: 'Jurisdictional Macro-Analytics & Surveillance Dashboard', icon: <ReportsIcon /> },
    { name: 'Population Screening Coverage', icon: <UserIcon /> },
    { name: 'Mandal & PHC Performance Backlog', icon: <TargetIcon /> },
    { name: 'High-Risk Habit Epidemiological Heatmap', icon: <WarningIcon /> },
    { name: 'Mobile Screening Van Fleet Deployment', icon: <CameraIcon /> },
    { name: 'Tertiary Referral Transit Monitoring', icon: <ReferralIcon /> },
    { name: 'ASHA & ANM Incentive & Screening Tracker', icon: <HistoryIcon /> },
    { name: 'Health Ministry & ABDM Compliance Reports', icon: <SettingsIcon /> },
  ];

  const districtStats = [
    {
      title: language === 'te' ? 'మొత్తం జిల్లా స్క్రీనింగ్‌లు' : 'Total District Screenings',
      value: '14,820',
      trend: '↑ 24%',
      trendColor: 'green',
      subtext: 'vs. last month',
      icon: <UserIcon className="w-5 h-5" />,
      colorClass: 'orange',
      cardBorder: 'orange-bottom',
    },
    {
      title: language === 'te' ? 'క్రియాశీల రిఫరల్స్' : 'Active Outbound Referrals',
      value: '186',
      trend: '↑ 12%',
      trendColor: 'green',
      subtext: 'across 11 Mandals',
      icon: <ReferralIcon className="w-5 h-5" />,
      colorClass: 'teal',
      cardBorder: 'teal-bottom',
    },
    {
      title: language === 'te' ? 'హై-రిస్క్ అలవాట్ల స్క్రీనింగ్ రేటు' : 'High-Risk Habit Screening Rate',
      value: '78.6%',
      trend: 'Target 85%',
      trendColor: 'amber',
      subtext: 'tribal hamlets covered',
      icon: <TargetIcon className="w-5 h-5" />,
      colorClass: 'amber',
      cardBorder: 'amber-bottom',
    },
    {
      title: language === 'te' ? 'నిరంతర సంరక్షణ అనుసరణ' : 'Care Continuity Adherence',
      value: '94.2%',
      trend: '↑ 4.1%',
      trendColor: 'green',
      subtext: 'follow-up completion',
      icon: <CalendarIcon className="w-5 h-5" />,
      colorClass: 'blue',
      cardBorder: 'blue-bottom',
    },
  ];

  const handleNavSelect = (navName) => {
    setActiveNav(navName);
    if (navName === 'Mobile Screening Van Fleet Deployment') {
      setIsVanFleetModalOpen(true);
    } else if (navName === 'Mandal & PHC Performance Backlog' || navName === 'Population Screening Coverage') {
      setSelectedMandalModal(mandalList[0]);
    } else if (navName === 'High-Risk Habit Epidemiological Heatmap') {
      setIsHeatmapModalOpen(true);
    } else if (navName === 'ASHA & ANM Incentive & Screening Tracker') {
      setIsAshaModalOpen(true);
    } else if (
      navName === 'Health Ministry & ABDM Compliance Reports' ||
      navName === 'Jurisdictional Macro-Analytics & Surveillance Dashboard'
    ) {
      setIsComplianceModalOpen(true);
    } else if (onToast) {
      onToast(`Navigating to ${navName}`);
    }
  };

  const handleAction = (action) => {
    switch (action) {
      case 'export-rollup':
        setIsComplianceModalOpen(true);
        break;
      case 'dispatch-vans':
        setIsVanFleetModalOpen(true);
        break;
      case 'asha-drive':
        setIsAshaModalOpen(true);
        break;
      case 'reallocate-kits':
        setSelectedMandalModal(mandalList.find((m) => m.cytologyKits < 50) || mandalList[2]);
        break;
      default:
        break;
    }
  };

  // 1. Dispatch Van Action
  const handleConfirmVanDispatch = (e) => {
    e.preventDefault();
    setVans((prev) =>
      prev.map((v) =>
        v.id === dispatchVanId
          ? {
              ...v,
              mandal: dispatchMandal,
              hamlet: dispatchHamlet,
              targetToday: parseInt(dispatchQuota, 10),
              status: 'Dispatched & En Route',
              statusClass: 'under-review',
            }
          : v
      )
    );
    if (onToast) {
      onToast(`✅ Successfully Dispatched ${dispatchVanId} to ${dispatchMandal} (${dispatchHamlet})!`);
    }
    setIsVanFleetModalOpen(false);
  };

  // 2. Reallocate Supplies Action
  const handleTransferKits = (mandalName, count = 150) => {
    setMandalList((prev) =>
      prev.map((m) =>
        m.mandal === mandalName
          ? {
              ...m,
              cytologyKits: m.cytologyKits + count,
              biopsyKits: m.biopsyKits + 25,
            }
          : m
      )
    );
    if (selectedMandalModal && selectedMandalModal.mandal === mandalName) {
      setSelectedMandalModal((prev) => ({
        ...prev,
        cytologyKits: prev.cytologyKits + count,
        biopsyKits: prev.biopsyKits + 25,
      }));
    }
    if (onToast) {
      onToast(`📦 Transferred ${count} Oral Cytology Kits from Central Depot to ${mandalName} PHC!`);
    }
  };

  // 3. Disburse ASHA DBT Action
  const handleDisburseDBT = () => {
    const ref = `PFMS-AP-ASR-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setDbtBatchRef(ref);
    setDbtDisbursed(true);
    setAshaWorkers((prev) =>
      prev.map((w) => ({
        ...w,
        status: `Paid via DBT (Ref: ${ref})`,
      }))
    );
    if (onToast) {
      onToast(`💳 Disbursed ₹16,900 Direct Benefit Transfer via PFMS to 4 ASHA Health Workers!`);
    }
  };

  // 4. Export CSV Action
  const handleExportCSV = () => {
    const headers = 'Mandal,PHC,Medical Officer,Target,Screened,CoveragePct,RedFlags,Referrals,CytologyKits\n';
    const rows = mandalList
      .map(
        (m) =>
          `"${m.mandal}","${m.phc}","${m.inCharge}",${m.target},${m.screened},"${m.pct}",${m.redFlags},${m.referrals},${m.cytologyKits}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ITDA_Paderu_District_Health_Rollup_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onToast) onToast('📥 Downloaded ITDA Paderu District Health Rollup CSV!');
  };

  return (
    <div className="dashboard-root">
      {/* Subtle Medical Caduceus Watermark */}
      <div className="dashboard-watermark-bg" aria-hidden="true">
        <img src="/caduceus-watermark.png" alt="Medical Caduceus Watermark" className="watermark-img" />
      </div>

      {/* Top Navbar */}
      <DashboardNavbar
        dashboardTitle="District Administrator Dashboard"
        userName="Dr. K. Venkateswara Rao"
        userRole="District Medical & Health Officer (DMHO)"
        userAvatar="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=120&q=80"
        notificationCount={6}
        onSwitchDashboard={onSwitchDashboard}
        onLogout={onLogout}
      />

      {/* Main Body Grid */}
      <div className="dash-main-layout full-display">
        {/* Top bar row below navbar */}
        <div className="dash-top-menu-bar">
          <Sidebar
            activeNav={activeNav}
            onNavSelect={handleNavSelect}
            isMenuOpen={isMenuOpen}
            onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
            menuTitle="District Admin Options"
            customItems={adminMenuItems}
          />

          <div className="dash-facility-badge">
            <span className="badge-dot" style={{ backgroundColor: '#2563eb' }}>
              ●
            </span>
            <span>District Administrator Dashboard • Jurisdictional Macro-Analytics & Surveillance</span>
          </div>
        </div>

        {/* Central Canvas Area */}
        <main className="dash-content-canvas full-display">
          <div className="dash-center-col">
            {/* Welcome Banner */}
            <WelcomeBanner
              doctorName="Dr. K. Venkateswara Rao, MD"
              roleSubtitle="District Administrator Dashboard • DMHO, Alluri Sitharama Raju District"
              photoUrl="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=640&q=85"
            />

            {/* 4 Stat Metric Cards */}
            <StatCards cards={districtStats} />

            {/* Middle 2 Charts */}
            <div className="charts-dual-row">
              {/* Left Chart: Mandal Screening Trajectory */}
              <div
                className="chart-card"
                style={{ cursor: 'pointer' }}
                onClick={() => setIsComplianceModalOpen(true)}
                title="Click to view Jurisdictional Macro-Analytics Report"
              >
                <div className="chart-header">
                  <div className="chart-title-wrap">
                    <h3>Mandal Screening & High-Risk Triage Trajectory</h3>
                    <p>Monthly screening velocity across 11 Tribal Mandals (Click to view report)</p>
                  </div>
                  <span className="chart-badge" style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>
                    14,820 / 18,000 Target (82.3%)
                  </span>
                </div>

                <div className="chart-svg-container">
                  <svg viewBox="0 0 520 180" className="chart-svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="distAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="30" x2="520" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="75" x2="520" y2="75" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="120" x2="520" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

                    <path
                      d="M 20 135 Q 100 110, 180 80 T 320 50 T 450 35 L 500 20 L 500 160 L 20 160 Z"
                      fill="url(#distAreaGrad)"
                    />
                    <path
                      d="M 20 135 Q 100 110, 180 80 T 320 50 T 450 35 L 500 20"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    {[
                      { x: 45, h: 65, color: '#0d9488' },
                      { x: 120, h: 88, color: '#0d9488' },
                      { x: 195, h: 105, color: '#f97316' },
                      { x: 270, h: 120, color: '#2563eb' },
                      { x: 345, h: 135, color: '#0d9488' },
                      { x: 420, h: 145, color: '#2563eb' },
                    ].map((b, i) => (
                      <rect
                        key={i}
                        x={b.x}
                        y={160 - b.h}
                        width="18"
                        height={b.h}
                        rx="4"
                        fill={b.color}
                        opacity="0.85"
                      />
                    ))}
                  </svg>
                </div>

                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#2563eb' }} />
                    <span>Target Trajectory</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#0d9488' }} />
                    <span>PHC Screened Cohort</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#f97316' }} />
                    <span>Van Mobile Camps</span>
                  </div>
                </div>
              </div>

              {/* Right Chart: Risk & Habit Profiling */}
              <div
                className="chart-card"
                style={{ cursor: 'pointer' }}
                onClick={() => setIsHeatmapModalOpen(true)}
                title="Click to view Epidemiological Heatmap"
              >
                <div className="chart-header">
                  <div className="chart-title-wrap">
                    <h3>District High-Risk Habit Profiling</h3>
                    <p>Epidemiological exposure across tribal population (Click to open Heatmap)</p>
                  </div>
                </div>

                <div className="donut-body">
                  <div className="donut-graphic">
                    <svg viewBox="0 0 160 160" className="donut-svg">
                      <circle cx="80" cy="80" r="54" fill="none" stroke="#e2e8f0" strokeWidth="22" />
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="22"
                        strokeDasharray="130 340"
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="22"
                        strokeDasharray="100 340"
                        strokeDashoffset="-130"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="22"
                        strokeDasharray="70 340"
                        strokeDashoffset="-230"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="22"
                        strokeDasharray="40 340"
                        strokeDashoffset="-300"
                      />
                    </svg>
                    <div className="donut-center-label">
                      <span className="donut-big-num">14.8k</span>
                      <span className="donut-small-sub">Screened</span>
                    </div>
                  </div>

                  <div className="donut-legend-col">
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#f97316' }} />
                      <span className="d-label">Reverse Smoking / Chutta (38%)</span>
                    </div>
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#0d9488' }} />
                      <span className="d-label">Betel Quid & Areca (29%)</span>
                    </div>
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#f59e0b' }} />
                      <span className="d-label">Gutkha / Khaini (21%)</span>
                    </div>
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#3b82f6' }} />
                      <span className="d-label">Non-Habit / Control (12%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mandal PHC Performance Table */}
            <div className="table-card">
              <div className="table-header">
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    Jurisdictional Macro-Analytics, Screening Quotas & Backlog Tracker
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                    Click any Mandal row to inspect clinical breakdown, red-flags, and reallocate diagnostic kits
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="view-all-link"
                    onClick={handleExportCSV}
                    style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#0f172a', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <FileSpreadsheet size={14} />
                    <span>Export CSV</span>
                  </button>
                  <button
                    type="button"
                    className="view-all-link"
                    onClick={() => setIsComplianceModalOpen(true)}
                    style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>Full Rollup Document</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="patient-table">
                  <thead>
                    <tr>
                      <th>{language === 'te' ? 'మండలం' : 'Mandal'}</th>
                      <th>Primary Health Centre</th>
                      <th>Medical Officer In-Charge</th>
                      <th>Screened / Target</th>
                      <th>{language === 'te' ? 'కవరేజ్ %' : 'Coverage %'}</th>
                      <th>Red-Flag Triage</th>
                      <th>Van Fleet Status</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mandalList.map((m) => (
                      <tr
                        key={m.mandal}
                        onClick={() => setSelectedMandalModal(m)}
                        style={{ cursor: 'pointer' }}
                        title="Click to inspect mandal breakdown"
                      >
                        <td style={{ fontWeight: 800, color: '#0f172a' }}>{m.mandal}</td>
                        <td style={{ fontWeight: 600, color: '#475569' }}>{m.phc}</td>
                        <td style={{ fontWeight: 600, color: '#0d9488' }}>{m.inCharge}</td>
                        <td style={{ fontWeight: 700 }}>
                          {m.screened.toLocaleString()} / {m.target.toLocaleString()}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', minWidth: '40px' }}>
                              <div style={{ width: m.pct, height: '100%', background: '#0d9488' }} />
                            </div>
                            <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{m.pct}</span>
                          </div>
                        </td>
                        <td style={{ fontWeight: 800, color: '#ea580c' }}>
                          {m.redFlags} cases ({m.referrals} referred)
                        </td>
                        <td>
                          <span className={`status-pill ${m.vanClass}`}>{m.vanStatus}</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMandalModal(m);
                            }}
                            style={{
                              background: '#2563eb',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '6px 12px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            <span>Inspect & Supply</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Action & Info Sidebar */}
          <aside className="dash-right-col">
            {/* Hero Card */}
            <div className="early-detection-hero" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' }}>
              <div className="hero-photo-layer">
                <img
                  src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=85"
                  alt="Tribal Community Health"
                />
              </div>

              <div className="hero-gradient-overlay" />

              <div className="hero-content-layer">
                <span className="hero-badge">ITDA SURVEILLANCE</span>
                <h3 className="hero-title">Early Detection Prevents Mortality</h3>
                <p className="hero-desc">
                  Coordinating 11 Mandals, 4 Mobile Screening Vans, and 48 PHCs across Alluri Sitharama Raju district.
                </p>
              </div>
            </div>

            {/* Quick Actions (All 4 Fully Functional) */}
            <div className="dash-quick-actions">
              <button
                type="button"
                className="btn-action-hero"
                style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: '#fff' }}
                onClick={() => handleAction('export-rollup')}
                title="Export District DMHO Monthly Rollup"
              >
                <div className="btn-left">
                  <ReportsIcon className="w-4 h-4" />
                  <span>Export DMHO Monthly Rollup</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero orange-grad"
                onClick={() => handleAction('dispatch-vans')}
                title="Dispatch Mobile Oral Screening Units"
              >
                <div className="btn-left">
                  <CameraIcon className="w-4 h-4" />
                  <span>Dispatch Mobile Screening Vans</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero teal-grad"
                onClick={() => handleAction('asha-drive')}
                title="Trigger ASHA Community Door-to-Door Drive"
              >
                <div className="btn-left">
                  <UserIcon className="w-4 h-4" />
                  <span>ASHA Incentive & Disbursal Tracker</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero"
                style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)', color: '#fff' }}
                onClick={() => handleAction('reallocate-kits')}
                title="Reallocate Oral Biopsy & Cytology Kits"
              >
                <div className="btn-left">
                  <HeartPulseIcon className="w-4 h-4" />
                  <span>Reallocate Clinical Supplies</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>
            </div>

            {/* Mobile Van Fleet Status Card */}
            <div className="schedule-card">
              <div className="schedule-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4>Mobile Screening Fleet Status</h4>
                <button
                  type="button"
                  onClick={() => setIsVanFleetModalOpen(true)}
                  style={{ background: 'transparent', border: 'none', color: '#2563eb', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}
                >
                  Manage Fleet →
                </button>
              </div>

              <div className="schedule-list">
                {vans.map((v) => (
                  <div key={v.id} className="schedule-item" onClick={() => setIsVanFleetModalOpen(true)} style={{ cursor: 'pointer' }}>
                    <div className="schedule-time" style={{ color: v.id === 'VAN-03' ? '#f59e0b' : '#16a34a' }}>
                      {v.id}
                    </div>
                    <div className="schedule-info">
                      <span className="patient-name">
                        {v.mandal} ({v.hamlet})
                      </span>
                      <span className="consult-type">
                        {v.status} • Screened: {v.screenedToday}/{v.targetToday}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* Footer */}
      <footer className="dash-bottom-footer">
        <div className="footer-swoosh" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <strong>AAROGYA DRISHTI</strong> &nbsp;|&nbsp; District Administrator Dashboard
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          © 2026 AAROGYA DRISHTI. All rights reserved. ITDA Paderu Operations.
        </div>
      </footer>

      {/* =========================================================================
          MODAL 1: MOBILE VAN FLEET DISPATCH & GPS ROUTE MANAGER
         ========================================================================= */}
      {isVanFleetModalOpen && (
        <div className="dash-modal-backdrop" onClick={() => setIsVanFleetModalOpen(false)}>
          <div className="dash-modal" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '1.5px solid #2563eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#2563eb', display: 'grid', placeItems: 'center', color: '#fff' }}>
                  <Truck size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    Mobile Screening Van Fleet Deployment & Dispatch Console
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Live GPS Telemetry, Battery Status & Active Outreach Dispatch across Tribal Hamlets
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setIsVanFleetModalOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Fleet Status Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {vans.map((v) => (
                  <div key={v.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{v.id}: {v.mandal}</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', background: v.status.includes('Active') ? '#dcfce7' : '#e0e7ff', color: v.status.includes('Active') ? '#166534' : '#1e40af' }}>
                        {v.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div><strong>Location:</strong> {v.hamlet}</div>
                      <div><strong>Medical Staff:</strong> {v.doctor}</div>
                      <div><strong>Power & Kit:</strong> {v.battery}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                        <span>Progress: {v.screenedToday} / {v.targetToday} citizens</span>
                        <strong style={{ color: '#0d9488' }}>{Math.round((v.screenedToday / (v.targetToday || 1)) * 100)}%</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dispatch Form */}
              <form onSubmit={handleConfirmVanDispatch} style={{ background: '#f1f5f9', borderRadius: '12px', padding: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.92rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Send size={16} color="#2563eb" /> Dispatch / Reroute Unit to Vulnerable Tribal Hamlet
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Select Van</label>
                    <select value={dispatchVanId} onChange={(e) => setDispatchVanId(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}>
                      <option value="VAN-01">VAN-01 (Araku Valley)</option>
                      <option value="VAN-02">VAN-02 (Paderu Central)</option>
                      <option value="VAN-03">VAN-03 (Munchingiputtu)</option>
                      <option value="VAN-04">VAN-04 (Chintapalli / Standby)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Destination Mandal</label>
                    <select value={dispatchMandal} onChange={(e) => setDispatchMandal(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}>
                      <option>Chintapalli</option>
                      <option>Munchingiputtu</option>
                      <option>G.K. Veedhi</option>
                      <option>G. Madugula</option>
                      <option>Araku Valley</option>
                      <option>Ananthagiri</option>
                      <option>Koyyuru</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Target Screening Quota</label>
                    <input type="number" value={dispatchQuota} onChange={(e) => setDispatchQuota(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Target Remote Hamlet / Weekly Shandy Market</label>
                  <input type="text" value={dispatchHamlet} onChange={(e) => setDispatchHamlet(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                </div>

                <button type="submit" style={{ width: '100%', background: '#2563eb', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Truck size={17} />
                  <span>🚀 Authorize & Dispatch Mobile Screening Van</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: MANDAL & PHC PERFORMANCE DEEP-DIVE & SUPPLY ALLOCATION
         ========================================================================= */}
      {selectedMandalModal && (
        <div className="dash-modal-backdrop" onClick={() => setSelectedMandalModal(null)}>
          <div className="dash-modal" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '1.5px solid #0d9488' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#0d9488', display: 'grid', placeItems: 'center', color: '#fff' }}>
                  <Package size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    {selectedMandalModal.mandal} Mandal • PHC Deep-Dive & Clinical Inventory
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Medical Officer In-Charge: <strong>{selectedMandalModal.inCharge}</strong> ({selectedMandalModal.phc})
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setSelectedMandalModal(null)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Metrics Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div style={{ background: '#f0fdfa', border: '1px solid #ccfbf1', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#0f766e', fontWeight: 700 }}>Total Screened</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#134e4a' }}>
                    {selectedMandalModal.screened} <span style={{ fontSize: '0.8rem', color: '#64748b' }}>/ {selectedMandalModal.target}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#0d9488', fontWeight: 800 }}>{selectedMandalModal.pct} Coverage</div>
                </div>

                <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#c2410c', fontWeight: 700 }}>Red-Flag Oral Lesions</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#9a3412' }}>
                    {selectedMandalModal.redFlags} cases
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#ea580c', fontWeight: 800 }}>{selectedMandalModal.referrals} referred to Paderu</div>
                </div>

                <div style={{ background: selectedMandalModal.cytologyKits < 50 ? '#fef2f2' : '#f8fafc', border: selectedMandalModal.cytologyKits < 50 ? '1px solid #fecaca' : '1px solid #e2e8f0', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: selectedMandalModal.cytologyKits < 50 ? '#dc2626' : '#475569', fontWeight: 700 }}>
                    Cytology Diagnostic Kits
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: selectedMandalModal.cytologyKits < 50 ? '#991b1b' : '#0f172a' }}>
                    {selectedMandalModal.cytologyKits} kits
                  </div>
                  <div style={{ fontSize: '0.75rem', color: selectedMandalModal.cytologyKits < 50 ? '#ef4444' : '#16a34a', fontWeight: 800 }}>
                    {selectedMandalModal.cytologyKits < 50 ? '⚠️ DEFICIT ALERT' : 'Adequate Supply'}
                  </div>
                </div>
              </div>

              {/* Red-Flag Lesion Breakdown */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#0f172a' }}>
                  Triage Lesion Histopathology Distribution ({selectedMandalModal.mandal})
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
                  <div style={{ background: '#fff', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{selectedMandalModal.breakdown?.leukoplakia || 14}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Leukoplakia</div>
                  </div>
                  <div style={{ background: '#fff', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444' }}>{selectedMandalModal.breakdown?.erythroplakia || 6}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Erythroplakia</div>
                  </div>
                  <div style={{ background: '#fff', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f59e0b' }}>{selectedMandalModal.breakdown?.osmf || 7}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>OSMF Trismus</div>
                  </div>
                  <div style={{ background: '#fff', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#dc2626' }}>{selectedMandalModal.breakdown?.malignancy || 2}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Malignancy Alert</div>
                  </div>
                </div>
              </div>

              {/* Supply Action Button */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => handleTransferKits(selectedMandalModal.mandal, 150)}
                  style={{
                    flex: 1,
                    background: '#0d9488',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Package size={17} />
                  <span>📦 Transfer +150 Oral Cytology Kits from Central Depot</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedMandalModal(null);
                    setIsVanFleetModalOpen(true);
                  }}
                  style={{
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Truck size={17} />
                  <span>Schedule Van Camp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: ASHA & ANM INCENTIVE TRACKER & DIRECT BENEFIT TRANSFER (DBT)
         ========================================================================= */}
      {isAshaModalOpen && (
        <div className="dash-modal-backdrop" onClick={() => setIsAshaModalOpen(false)}>
          <div className="dash-modal" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '1.5px solid #f97316' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f97316', display: 'grid', placeItems: 'center', color: '#fff' }}>
                  <DollarSign size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    ASHA & ANM Community Incentive & DBT Disbursal Tracker
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Verified Screening Incentives (₹50/Screening + ₹1,000 Early Detection Referral Incentive)
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setIsAshaModalOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Summary Banner */}
              <div style={{ background: '#fff7ed', border: '1px solid #fdba74', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#9a3412', fontWeight: 700 }}>Total DBT Incentive Batch Payable</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c2410c' }}>₹16,900</div>
                  <div style={{ fontSize: '0.75rem', color: '#7c2d12' }}>4 Frontline Health Workers • Alluri Sitharama Raju District</div>
                </div>

                <button
                  type="button"
                  onClick={handleDisburseDBT}
                  disabled={dbtDisbursed}
                  style={{
                    background: dbtDisbursed ? '#16a34a' : '#f97316',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: dbtDisbursed ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>{dbtDisbursed ? '✓ Disbursed via PFMS' : 'Disburse Direct Benefit Transfer (DBT)'}</span>
                </button>
              </div>

              {dbtDisbursed && (
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '10px 14px', borderRadius: '8px', fontSize: '0.8rem', color: '#065f46' }}>
                  ✅ <strong>PFMS Bank Batch Transaction ID:</strong> {dbtBatchRef} • Transferred to Andhra Pradesh Grameena Vikas Bank (APGVB) Aadhaar-linked accounts.
                </div>
              )}

              {/* Workers Table */}
              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                <table className="patient-table" style={{ margin: 0 }}>
                  <thead>
                    <tr>
                      <th>ASHA Worker</th>
                      <th>Village Sub-Centre</th>
                      <th>Screenings Completed</th>
                      <th>Red-Flag Referrals</th>
                      <th>Earned Incentive</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ashaWorkers.map((w) => (
                      <tr key={w.id}>
                        <td style={{ fontWeight: 800, color: '#0f172a' }}>{w.name}</td>
                        <td style={{ color: '#475569' }}>{w.village}</td>
                        <td style={{ fontWeight: 700 }}>{w.screenings} cases</td>
                        <td style={{ fontWeight: 800, color: '#ea580c' }}>
                          {w.redFlags} flagged ({w.biopsyConfirmed} biopsy confirmed)
                        </td>
                        <td style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.95rem' }}>₹{w.earnedIncentive.toLocaleString()}</td>
                        <td>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: dbtDisbursed ? '#16a34a' : '#ea580c' }}>
                            {w.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: OFFICIAL ABDM & HEALTH MINISTRY COMPLIANCE REPORT EXPORTER
         ========================================================================= */}
      {isComplianceModalOpen && (
        <div className="dash-modal-backdrop" onClick={() => setIsComplianceModalOpen(false)}>
          <div className="dash-modal" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '1.5px solid #1e40af' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#1e40af', display: 'grid', placeItems: 'center', color: '#fff' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    Government of Andhra Pradesh • ITDA Paderu Health Rollup
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    ABDM M3 / FHIR Compliant Oral Cancer Surveillance & Triage Summary
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setIsComplianceModalOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Formal Government Document Header */}
              <div style={{ border: '2px solid #cbd5e1', borderRadius: '12px', padding: '20px', background: '#fff' }}>
                <div style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    INTEGRATED TRIBAL DEVELOPMENT AGENCY (ITDA) • PADERU
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>
                    ALLURI SITHARAMA RAJU DISTRICT ORAL CANCER SURVEILLANCE REPORT
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                    Period: Monthly Assessment (April 2026) • Published by Office of DMHO Paderu
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Total Tribal Population</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>610,000</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Cumulative Screenings</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2563eb' }}>14,820 (82.3% of Q1 Target)</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>ABDM ABHA Linkage Rate</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#16a34a' }}>96.4% Verified</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.6 }}>
                  <p style={{ margin: '0 0 10px 0' }}>
                    <strong>Epidemiological Executive Summary:</strong> Community-wide oral tele-screening across 11 tribal Mandals identified <strong>186 high-acuity lesions</strong>, of which <strong>84 punch biopsies</strong> were scheduled at Area Hospital Paderu Oral Oncology Center.
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Habit Prevalence:</strong> Adda Poga (Reverse Smoking) remains the primary carcinogenic driver in Chintapalli (46%) and G. Madugula (42%), followed by betel quid & processed tobacco (Gutkha).
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#0f172a',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <FileSpreadsheet size={16} />
                  <span>Export FHIR Data (CSV)</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Printer size={16} />
                  <span>Print Formal Rollup Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 5: HIGH-RISK HABIT EPIDEMIOLOGICAL HEATMAP
         ========================================================================= */}
      {isHeatmapModalOpen && (
        <div className="dash-modal-backdrop" onClick={() => setIsHeatmapModalOpen(false)}>
          <div className="dash-modal" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '1.5px solid #ea580c' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ea580c', display: 'grid', placeItems: 'center', color: '#fff' }}>
                  <Layers size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    ITDA Paderu Epidemiological Habit Exposure Heatmap
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Spatial Distribution of Adda Poga (Reverse Smoking) & Gutkha Addiction
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setIsHeatmapModalOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {mandalList.map((m) => (
                  <div key={m.mandal} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{m.mandal} Mandal</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: m.habitRisk.includes('Critical') ? '#dc2626' : '#d97706', background: m.habitRisk.includes('Critical') ? '#fef2f2' : '#fffbeb', padding: '2px 8px', borderRadius: '6px' }}>
                        {m.habitRisk.includes('Critical') ? 'CRITICAL RISK' : 'HIGH RISK'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                      <strong>Primary Exposure:</strong> {m.habitRisk}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                      Red-Flag Cases: <strong>{m.redFlags}</strong> ({m.referrals} escalated for specialist biopsy)
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', padding: '12px', borderRadius: '10px', fontSize: '0.8rem', color: '#9a3412', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>Targeted Intervention Recommendation:</strong> Deploy Mobile Van #01 to Chintapalli for immediate door-to-door cessation counseling and oral screening.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsHeatmapModalOpen(false);
                    setIsVanFleetModalOpen(true);
                  }}
                  style={{ background: '#ea580c', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Deploy Van →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI District Copilot Chatbot */}
      <AIChatBot dashboardType="district_admin_dashboard" />
    </div>
  );
}
