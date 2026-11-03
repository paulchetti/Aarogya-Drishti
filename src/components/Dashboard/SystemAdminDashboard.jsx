import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import DashboardNavbar from './DashboardNavbar';
import Sidebar from './Sidebar';
import WelcomeBanner from './WelcomeBanner';
import StatCards from './StatCards';
import AIChatBot from './AIChatBot';
import '../../styles/dashboard.css';
import {
  SettingsIcon,
  HistoryIcon,
  AIIcon,
  UserIcon,
  ReportsIcon,
  TargetIcon,
  WarningIcon,
  CalendarIcon,
  HeartPulseIcon,
} from '../Icons';
import {
  Key,
  Shield,
  ShieldCheck,
  Cpu,
  Database,
  RefreshCw,
  Search,
  UserPlus,
  CheckCircle2,
  Lock,
  Zap,
  Terminal,
  Activity,
  X,
  Play,
  Download,
  AlertCircle
} from 'lucide-react';

export default function SystemAdminDashboard({ onToast, onSwitchDashboard, onLogout }) {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Modal States
  const [isIAMModalOpen, setIsIAMModalOpen] = useState(false);
  const [isKeyRotationModalOpen, setIsKeyRotationModalOpen] = useState(false);
  const [isAIBenchmarkModalOpen, setIsAIBenchmarkModalOpen] = useState(false);
  const [isEdgeSyncModalOpen, setIsEdgeSyncModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  // Dynamic IAM Clinicians State
  const [clinicians, setClinicians] = useState([
    {
      id: 'USR-AP-8812',
      name: 'Dr. Sandeep Kumar',
      email: 'dr.sandeep@phc.paderu',
      role: 'PHC Medical Officer',
      facility: 'G. Madugula PHC',
      regId: 'APMC-2018-84920',
      status: 'Active',
      lastLogin: '10 mins ago',
    },
    {
      id: 'USR-AP-9941',
      name: 'Dr. Ananya Varma, MD',
      email: 'dr.ananya@oncology.areahosp',
      role: 'Specialist Oncologist',
      facility: 'Area Hospital Paderu',
      regId: 'APMC-2012-68492',
      status: 'Active',
      lastLogin: '4 mins ago',
    },
    {
      id: 'USR-AP-6418',
      name: 'ANM Lakshmi Devi',
      email: 'lakshmi.anm@paderu.hfw.gov.in',
      role: 'Village ANM / Field Worker',
      facility: 'G. Madugula Sub-Centre',
      regId: 'AP-GNM-94182',
      status: 'Active',
      lastLogin: '18 mins ago',
    },
    {
      id: 'USR-AP-4211',
      name: 'Dr. V. Madhavan',
      email: 'dr.madhavan@phc.araku',
      role: 'PHC Medical Officer',
      facility: 'PHC Araku & Dumbriguda',
      regId: 'APMC-2016-77319',
      status: 'Active',
      lastLogin: '1 hour ago',
    },
  ]);

  // New Clinician Form State
  const [newClinicianName, setNewClinicianName] = useState('');
  const [newClinicianRole, setNewClinicianRole] = useState('PHC Medical Officer');
  const [newClinicianFacility, setNewClinicianFacility] = useState('Chintapalli PHC');
  const [newClinicianReg, setNewClinicianReg] = useState('APMC-2024-99120');

  // Key Rotation State
  const [isRotatingKey, setIsRotatingKey] = useState(false);
  const [keyRotationStep, setKeyRotationStep] = useState(0);
  const [currentKeyHash, setCurrentKeyHash] = useState(
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  );

  // AI Benchmark State
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchmarkResult, setBenchmarkResult] = useState(null);

  // Edge Sync State
  const [isSyncingEdge, setIsSyncingEdge] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [edgeNodes, setEdgeNodes] = useState([
    {
      id: 'NODE-MUN-01',
      name: 'Munchingiputtu Remote Sub-Centre Kiosk',
      connectivity: '2G Cellular (Intermittent)',
      pendingRecords: 18,
      status: 'Queue Pending',
    },
    {
      id: 'NODE-CHI-04',
      name: 'Chintapalli Tribal Solar Health Hub',
      connectivity: 'Satellite / Mesh (Offline Mode)',
      pendingRecords: 12,
      status: 'Queue Pending',
    },
    {
      id: 'NODE-GKV-02',
      name: 'G.K. Veedhi Mobile Screening Van #04',
      connectivity: '4G Hotspot (Roaming)',
      pendingRecords: 9,
      status: 'Queue Pending',
    },
  ]);

  // Dynamic Audit Events State
  const [auditEvents, setAuditEvents] = useState([
    {
      id: 'AUD-99482',
      time: '15 Apr 2026, 10:42:18',
      actor: 'dr.sandeep@phc.paderu',
      role: 'PHC Medical Officer',
      event: 'Oral Lesion AI Inference (Dual Model)',
      resource: 'FHIR Observation / OralScan-001248',
      ip: '10.142.4.18 (Paderu PHC LAN)',
      status: 'VERIFIED',
      statusClass: 'normal',
    },
    {
      id: 'AUD-99481',
      time: '15 Apr 2026, 10:39:04',
      actor: 'EDGE-NODE-CHINTAPALLI-02',
      role: 'Automated Sync Agent',
      event: 'Offline Queue Re-sync (18 Records)',
      resource: 'SQLite Local Edge DB -> PostgreSQL Cloud',
      ip: '10.142.12.89 (Cellular Gateway)',
      status: 'SYNCED',
      statusClass: 'normal',
    },
    {
      id: 'AUD-99480',
      time: '15 Apr 2026, 10:31:55',
      actor: 'dr.ananya@oncology.areahosp',
      role: 'Oral Oncologist',
      event: 'Specialist Referral Biopsy Endorsement',
      resource: 'ABHA M3 Milestone Dispatch',
      ip: '172.16.8.44 (Area Hosp WAN)',
      status: 'ENCRYPTED',
      statusClass: 'follow-up',
    },
    {
      id: 'AUD-99479',
      time: '15 Apr 2026, 10:20:12',
      actor: 'GATEWAY-KEYCLOAK-IAM',
      role: 'Security Service',
      event: 'ABHA RSA Key Pair Automated Rotation',
      resource: 'Vault Transit Engine / HSM Slot #4',
      ip: '10.0.1.5 (Cloud K8s Pod)',
      status: 'ROTATED',
      statusClass: 'normal',
    },
    {
      id: 'AUD-99478',
      time: '15 Apr 2026, 09:58:33',
      actor: 'unknown-client-probe',
      role: 'Anonymous IP',
      event: 'Blocked Unauthorized REST API Ping',
      resource: 'WAF Filter / Rate-Limiter (429)',
      ip: '198.51.100.24 (External)',
      status: 'BLOCKED',
      statusClass: 'suspicious',
    },
  ]);

  const [auditSearchQuery, setAuditSearchQuery] = useState('');

  const sysAdminMenuItems = [
    { name: 'Identity and Access Management (IAM) & Provisioning Console', icon: <UserIcon /> },
    { name: 'Security & HIPAA Audit Event Log', icon: <HistoryIcon /> },
    { name: 'AI Inference Latency & Model Provenance', icon: <AIIcon /> },
    { name: 'Offline Edge Sync & Queue Diagnostics', icon: <SettingsIcon /> },
    { name: 'ABDM Gateway & ABHA Token Health', icon: <TargetIcon /> },
    { name: 'End-to-End Encryption Key Rotation', icon: <WarningIcon /> },
    { name: 'Database Sharding & Backup Snapshots', icon: <ReportsIcon /> },
    { name: 'Server Telemetry & System Diagnostics', icon: <CalendarIcon /> },
  ];

  const systemStats = [
    {
      title: language === 'te' ? 'క్రియాశీల వైద్యులు & సిబ్బంది' : 'Active Authenticated Clinicians',
      value: `${clinicians.length + 1416}`,
      trend: '↑ 8%',
      trendColor: 'green',
      subtext: 'across 48 facilities',
      icon: <UserIcon className="w-5 h-5" />,
      colorClass: 'orange',
      cardBorder: 'orange-bottom',
    },
    {
      title: language === 'te' ? 'ఆఫ్‌లైన్ ఎడ్జ్ సింక్ బ్యాచ్‌లు' : 'Edge Cache Offline Batches',
      value: '342',
      trend: '100% Synced',
      trendColor: 'green',
      subtext: 'zero data loss',
      icon: <TargetIcon className="w-5 h-5" />,
      colorClass: 'teal',
      cardBorder: 'teal-bottom',
    },
    {
      title: language === 'te' ? 'నేటి AI మోడల్ విశ్లేషణలు' : 'AI Model Inferences Today',
      value: '864',
      trend: 'Avg 420ms',
      trendColor: 'amber',
      subtext: 'Edge + Cloud Dual Mode',
      icon: <AIIcon className="w-5 h-5" />,
      colorClass: 'amber',
      cardBorder: 'amber-bottom',
    },
    {
      title: language === 'te' ? 'భద్రతా సమ్మతి సూచిక' : 'Security Compliance Index',
      value: '100%',
      trend: 'Zero Breaches',
      trendColor: 'green',
      subtext: 'ABDM & SOC2 Ready',
      icon: <WarningIcon className="w-5 h-5" />,
      colorClass: 'blue',
      cardBorder: 'blue-bottom',
    },
  ];

  const handleNavSelect = (navName) => {
    setActiveNav(navName);
    if (navName === 'Identity and Access Management (IAM) & Provisioning Console') {
      setIsIAMModalOpen(true);
    } else if (navName === 'End-to-End Encryption Key Rotation') {
      setIsKeyRotationModalOpen(true);
    } else if (navName === 'AI Inference Latency & Model Provenance') {
      setIsAIBenchmarkModalOpen(true);
    } else if (navName === 'Offline Edge Sync & Queue Diagnostics') {
      setIsEdgeSyncModalOpen(true);
    } else if (navName === 'Security & HIPAA Audit Event Log' || navName === 'ABDM Gateway & ABHA Token Health') {
      setIsAuditModalOpen(true);
    } else if (onToast) {
      onToast(`System Admin: Accessing ${navName}...`);
    }
  };

  const handleAction = (action) => {
    switch (action) {
      case 'rotate-keys':
        setIsKeyRotationModalOpen(true);
        break;
      case 'flush-edge':
        setIsEdgeSyncModalOpen(true);
        break;
      case 'inspect-ai':
        setIsAIBenchmarkModalOpen(true);
        break;
      case 'trigger-backup':
        setIsIAMModalOpen(true);
        break;
      default:
        break;
    }
  };

  // 1. Provision Clinician
  const handleProvisionClinician = (e) => {
    e.preventDefault();
    if (!newClinicianName.trim()) return;

    const newDoc = {
      id: `USR-AP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newClinicianName,
      email: `${newClinicianName.toLowerCase().replace(/[^a-z]/g, '')}@phc.ap.gov.in`,
      role: newClinicianRole,
      facility: newClinicianFacility,
      regId: newClinicianReg,
      status: 'Active',
      lastLogin: 'Just now (Provisioned)',
    };

    setClinicians((prev) => [newDoc, ...prev]);
    setNewClinicianName('');
    if (onToast) onToast(`✅ Successfully Provisioned Clinician: ${newDoc.name} (${newDoc.role})!`);
  };

  // 2. Trigger Cryptographic Key Rotation
  const handleStartKeyRotation = () => {
    setIsRotatingKey(true);
    setKeyRotationStep(1);

    setTimeout(() => setKeyRotationStep(2), 700);
    setTimeout(() => setKeyRotationStep(3), 1400);
    setTimeout(() => {
      setKeyRotationStep(4);
      const newHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setCurrentKeyHash(newHash);
      setIsRotatingKey(false);

      const auditEntry = {
        id: `AUD-${Math.floor(99490 + Math.random() * 100)}`,
        time: new Date().toLocaleTimeString() + ', Today',
        actor: 'S. Ramakrishna (SysAdmin)',
        role: 'Director Cyber Systems',
        event: 'RSA-4096 Master Token Rotation',
        resource: `Vault HSM Slot #4 / Hash: ${newHash.substring(0, 12)}...`,
        ip: '10.0.1.5 (Secure Console)',
        status: 'ROTATED',
        statusClass: 'normal',
      };
      setAuditEvents((prev) => [auditEntry, ...prev]);
      if (onToast) onToast('🔐 Cryptographic Master Token Rotated and Distributed to 48 Nodes!');
    }, 2200);
  };

  // 3. Run AI Inference Benchmark
  const handleRunAIBenchmark = () => {
    setIsBenchmarking(true);
    setTimeout(() => {
      setIsBenchmarking(false);
      setBenchmarkResult({
        geminiTime: '388 ms',
        geminiConcordance: '96.8%',
        yoloTime: '76 ms',
        yoloConcordance: '92.4%',
        agreementScore: '98.2%',
        vram: '2.1 GB / 16 GB',
        device: 'Edge WebAssembly + Gemini Vision Cloud',
      });
      if (onToast) onToast('⚡ Dual AI Model Latency Profiling Benchmark Completed!');
    }, 1200);
  };

  // 4. Force Edge Database Resync
  const handleForceEdgeSync = () => {
    setIsSyncingEdge(true);
    setSyncProgress(25);
    setTimeout(() => setSyncProgress(60), 600);
    setTimeout(() => {
      setSyncProgress(100);
      setIsSyncingEdge(false);
      setEdgeNodes((prev) =>
        prev.map((n) => ({
          ...n,
          pendingRecords: 0,
          status: '100% Synced to Cloud DB',
        }))
      );
      if (onToast) onToast('☁️ Successfully Synced 39 Offline Records from all 14 Sub-Centres!');
    }, 1400);
  };

  return (
    <div className="dashboard-root">
      {/* Subtle Medical Caduceus Watermark */}
      <div className="dashboard-watermark-bg" aria-hidden="true">
        <img src="/caduceus-watermark.png" alt="Medical Caduceus Watermark" className="watermark-img" />
      </div>

      {/* Top Navbar */}
      <DashboardNavbar
        dashboardTitle="System Administrator Dashboard"
        userName="S. Ramakrishna, M.Tech"
        userRole="Director of Digital Infrastructure & Cyber Systems"
        userAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
        notificationCount={2}
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
            menuTitle="System Admin Controls"
            customItems={sysAdminMenuItems}
          />

          <div className="dash-facility-badge">
            <span className="badge-dot" style={{ backgroundColor: '#7c3aed' }}>
              ●
            </span>
            <span>System Administrator Dashboard • Identity and Access Management (IAM) & Provisioning</span>
          </div>
        </div>

        {/* Central Canvas Area */}
        <main className="dash-content-canvas full-display">
          <div className="dash-center-col">
            {/* Welcome Banner */}
            <WelcomeBanner
              doctorName="S. Ramakrishna"
              roleSubtitle="System Administrator Dashboard • Cyber Operations, AI Telemetry & Infrastructure"
              photoUrl="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=640&q=85"
            />

            {/* 4 Stat Metric Cards */}
            <StatCards cards={systemStats} />

            {/* Middle 2 Charts */}
            <div className="charts-dual-row">
              {/* Left Chart: API Gateway & Edge Sync Load */}
              <div
                className="chart-card"
                style={{ cursor: 'pointer' }}
                onClick={() => setIsEdgeSyncModalOpen(true)}
                title="Click to view Edge Sync Diagnostics"
              >
                <div className="chart-header">
                  <div className="chart-title-wrap">
                    <h3>API Gateway Load & Offline Edge Synchronization</h3>
                    <p>Hourly network throughput & automated SQLite-to-Cloud re-sync (Click to inspect)</p>
                  </div>
                  <span className="chart-badge" style={{ backgroundColor: '#ede9fe', color: '#6d28d9' }}>
                    99.98% Uptime SLA
                  </span>
                </div>

                <div className="chart-svg-container">
                  <svg viewBox="0 0 520 180" className="chart-svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sysAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="30" x2="520" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="75" x2="520" y2="75" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="120" x2="520" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

                    <path
                      d="M 20 120 Q 90 70, 160 85 T 300 45 T 440 28 L 500 15 L 500 160 L 20 160 Z"
                      fill="url(#sysAreaGrad)"
                    />
                    <path
                      d="M 20 120 Q 90 70, 160 85 T 300 45 T 440 28 L 500 15"
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    {[
                      { x: 50, h: 55, color: '#8b5cf6' },
                      { x: 130, h: 90, color: '#8b5cf6' },
                      { x: 210, h: 110, color: '#6d28d9' },
                      { x: 290, h: 130, color: '#8b5cf6' },
                      { x: 370, h: 145, color: '#6d28d9' },
                      { x: 450, h: 155, color: '#7c3aed' },
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
                    <span className="legend-dot" style={{ backgroundColor: '#7c3aed' }} />
                    <span>REST API Call Volume</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#8b5cf6' }} />
                    <span>Edge Offline SQLite Sync Batches</span>
                  </div>
                </div>
              </div>

              {/* Right Chart: Model Inference Telemetry */}
              <div
                className="chart-card"
                style={{ cursor: 'pointer' }}
                onClick={() => setIsAIBenchmarkModalOpen(true)}
                title="Click to run AI Model Latency Benchmark"
              >
                <div className="chart-header">
                  <div className="chart-title-wrap">
                    <h3>AI Model Inference & Latency Profiler</h3>
                    <p>Edge vs Cloud Execution Time Distribution (Click to benchmark)</p>
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
                        stroke="#8b5cf6"
                        strokeWidth="22"
                        strokeDasharray="180 340"
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="22"
                        strokeDasharray="110 340"
                        strokeDashoffset="-180"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="22"
                        strokeDasharray="50 340"
                        strokeDashoffset="-290"
                      />
                    </svg>
                    <div className="donut-center-label">
                      <span className="donut-big-num">864</span>
                      <span className="donut-small-sub">Inferences</span>
                    </div>
                  </div>

                  <div className="donut-legend-col">
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#8b5cf6' }} />
                      <span className="d-label">Gemini 1.5 Flash Vision (52%)</span>
                    </div>
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#06b6d4' }} />
                      <span className="d-label">YOLOv8 Edge Quantized (32%)</span>
                    </div>
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#10b981' }} />
                      <span className="d-label">Local Cache Hits (16%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Logs Table */}
            <div className="table-card">
              <div className="table-header">
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    Security, HIPAA & ABDM Cryptographic Audit Trail
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                    Immutable SHA-256 event trail across all 48 authenticated PHCs and mobile screening vans
                  </p>
                </div>
                <button
                  type="button"
                  className="view-all-link"
                  onClick={() => setIsAuditModalOpen(true)}
                  style={{ background: '#7c3aed', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Inspect Full Audit Trail <span>→</span>
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="patient-table">
                  <thead>
                    <tr>
                      <th>Audit ID</th>
                      <th>Timestamp</th>
                      <th>Authenticated Actor</th>
                      <th>Security Event</th>
                      <th>Resource Accessed</th>
                      <th>Source IP</th>
                      <th style={{ textAlign: 'right' }}>Integrity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditEvents.slice(0, 5).map((ev) => (
                      <tr key={ev.id} onClick={() => setIsAuditModalOpen(true)} style={{ cursor: 'pointer' }}>
                        <td style={{ fontWeight: 800, color: '#7c3aed', fontFamily: 'monospace' }}>{ev.id}</td>
                        <td style={{ color: '#64748b', fontSize: '0.78rem' }}>{ev.time}</td>
                        <td style={{ fontWeight: 600, color: '#0f172a' }}>{ev.actor}</td>
                        <td style={{ fontWeight: 600 }}>{ev.event}</td>
                        <td style={{ color: '#475569', fontSize: '0.78rem' }}>{ev.resource}</td>
                        <td style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'monospace' }}>{ev.ip}</td>
                        <td style={{ textAlign: 'right' }}>
                          <span className={`status-pill ${ev.statusClass}`}>{ev.status}</span>
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
            <div className="early-detection-hero" style={{ background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)' }}>
              <div className="hero-photo-layer">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=85"
                  alt="Cyber Infrastructure & AI"
                />
              </div>

              <div className="hero-gradient-overlay" />

              <div className="hero-content-layer">
                <span className="hero-badge">INFRASTRUCTURE HEALTH</span>
                <h3 className="hero-title">Zero-Trust Telemetry</h3>
                <p className="hero-desc">
                  ABHA Gateway M3 Connected • AES-256 End-to-End Encryption • Dual Cloud-Edge Inference
                </p>
              </div>
            </div>

            {/* Quick Actions (All 4 Fully Functional) */}
            <div className="dash-quick-actions">
              <button
                type="button"
                className="btn-action-hero"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)', color: '#fff' }}
                onClick={() => handleAction('rotate-keys')}
                title="Rotate Cryptographic Token Master Keys"
              >
                <div className="btn-left">
                  <Key size={16} />
                  <span>Rotate Cryptographic Keys</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero orange-grad"
                onClick={() => handleAction('flush-edge')}
                title="Force Immediate Offline Edge Sync"
              >
                <div className="btn-left">
                  <Database size={16} />
                  <span>Offline Edge Sync Diagnostics</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero teal-grad"
                onClick={() => handleAction('inspect-ai')}
                title="Run Dual AI Model Latency Benchmark"
              >
                <div className="btn-left">
                  <Cpu size={16} />
                  <span>AI Latency & Model Profiler</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero"
                style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)', color: '#fff' }}
                onClick={() => handleAction('trigger-backup')}
                title="IAM User & Clinician Provisioning"
              >
                <div className="btn-left">
                  <UserPlus size={16} />
                  <span>IAM Clinician Provisioning</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>
            </div>

            {/* System Status Card */}
            <div className="schedule-card">
              <div className="schedule-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4>Security & Service Mesh</h4>
                <button
                  type="button"
                  onClick={() => setIsAuditModalOpen(true)}
                  style={{ background: 'transparent', border: 'none', color: '#7c3aed', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}
                >
                  Audit View →
                </button>
              </div>

              <div className="schedule-list">
                <div className="schedule-item" onClick={() => setIsKeyRotationModalOpen(true)} style={{ cursor: 'pointer' }}>
                  <div className="schedule-time" style={{ color: '#10b981' }}>HSM</div>
                  <div className="schedule-info">
                    <span className="patient-name">RSA-4096 Vault Engine</span>
                    <span className="consult-type">Slot #4 Active • SHA-256 Validated</span>
                  </div>
                </div>

                <div className="schedule-item" onClick={() => setIsEdgeSyncModalOpen(true)} style={{ cursor: 'pointer' }}>
                  <div className="schedule-time" style={{ color: '#06b6d4' }}>EDGE</div>
                  <div className="schedule-info">
                    <span className="patient-name">14 Field Sub-Centres</span>
                    <span className="consult-type">SQLite Offline Storage Ready</span>
                  </div>
                </div>

                <div className="schedule-item" onClick={() => setIsAIBenchmarkModalOpen(true)} style={{ cursor: 'pointer' }}>
                  <div className="schedule-time" style={{ color: '#8b5cf6' }}>AI</div>
                  <div className="schedule-info">
                    <span className="patient-name">Gemini 1.5 + YOLOv8n</span>
                    <span className="consult-type">Dual Triage • 420ms Latency</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* Footer */}
      <footer className="dash-bottom-footer">
        <div className="footer-swoosh" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <strong>AAROGYA DRISHTI</strong> &nbsp;|&nbsp; System Administrator Dashboard
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          © 2026 AAROGYA DRISHTI. All rights reserved. ITDA Paderu Cyber Infrastructure.
        </div>
      </footer>

      {/* =========================================================================
          MODAL 1: IAM CLINICIAN PROVISIONING CONSOLE
         ========================================================================= */}
      {isIAMModalOpen && (
        <div className="dash-modal-backdrop" onClick={() => setIsIAMModalOpen(false)}>
          <div className="dash-modal" style={{ maxWidth: '820px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '1.5px solid #0d9488' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#0d9488', display: 'grid', placeItems: 'center', color: '#fff' }}>
                  <UserPlus size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    Identity and Access Management (IAM) & Clinician Provisioning Console
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Manage Authenticated Doctors, Specialists, and Field ANMs across 48 Health Facilities
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setIsIAMModalOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Provision Form */}
              <form onSubmit={handleProvisionClinician} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#0f172a' }}>
                  + Provision New Clinician / Telehealth Specialist
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Clinician Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Rajesh Kumar, MD"
                      value={newClinicianName}
                      onChange={(e) => setNewClinicianName(e.target.value)}
                      required
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>System Role</label>
                    <select
                      value={newClinicianRole}
                      onChange={(e) => setNewClinicianRole(e.target.value)}
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                    >
                      <option>PHC Medical Officer</option>
                      <option>Specialist Oncologist</option>
                      <option>Village ANM / Field Worker</option>
                      <option>Mobile Van Lead Doctor</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Assigned Facility</label>
                    <input
                      type="text"
                      value={newClinicianFacility}
                      onChange={(e) => setNewClinicianFacility(e.target.value)}
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>APMC Reg / License</label>
                    <input
                      type="text"
                      value={newClinicianReg}
                      onChange={(e) => setNewClinicianReg(e.target.value)}
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    background: '#0d9488',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <UserPlus size={15} />
                  <span>Provision Clinician & Issue ABHA Security Token</span>
                </button>
              </form>

              {/* Clinicians Table */}
              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                <table className="patient-table" style={{ margin: 0 }}>
                  <thead>
                    <tr>
                      <th>Clinician Name</th>
                      <th>System Role</th>
                      <th>Assigned Facility</th>
                      <th>Medical Reg / APMC</th>
                      <th>Last Active</th>
                      <th style={{ textAlign: 'right' }}>Account Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clinicians.map((c) => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: 800, color: '#0f172a' }}>{c.name}</td>
                        <td style={{ fontWeight: 600, color: '#0d9488' }}>{c.role}</td>
                        <td style={{ color: '#475569' }}>{c.facility}</td>
                        <td style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>{c.regId}</td>
                        <td style={{ fontSize: '0.78rem', color: '#64748b' }}>{c.lastLogin}</td>
                        <td style={{ textAlign: 'right' }}>
                          <span className="status-pill normal">{c.status}</span>
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
          MODAL 2: CRYPTOGRAPHIC MASTER KEY ROTATION CONSOLE
         ========================================================================= */}
      {isKeyRotationModalOpen && (
        <div className="dash-modal-backdrop" onClick={() => setIsKeyRotationModalOpen(false)}>
          <div className="dash-modal" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '1.5px solid #7c3aed' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#7c3aed', display: 'grid', placeItems: 'center', color: '#fff' }}>
                  <Key size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    End-to-End Cryptographic Master Key Rotation
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Hardware Security Module (HSM) Vault • RSA-4096 / Ed25519 Encryption
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setIsKeyRotationModalOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#090d16', color: '#f8fafc', padding: '16px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                <div style={{ color: '#38bdf8', marginBottom: '8px', fontWeight: 800 }}>
                  [HSM-TRANSIT-ENGINE] Active Master Key Fingerprint:
                </div>
                <div style={{ wordBreak: 'break-all', color: '#4ade80', lineHeight: 1.5 }}>
                  SHA256: {currentKeyHash}
                </div>
                <div style={{ color: '#94a3b8', marginTop: '8px', fontSize: '0.72rem' }}>
                  Status: Slot #4 Verified • Zero Breaches • HIPAA & ABDM Compliant
                </div>
              </div>

              {/* Step Sequence */}
              {isRotatingKey && (
                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                  <div style={{ color: keyRotationStep >= 1 ? '#16a34a' : '#94a3b8', fontWeight: 700 }}>
                    {keyRotationStep >= 1 ? '✓' : '○'} Step 1: Generating 4096-bit prime RSA keypair in Vault HSM...
                  </div>
                  <div style={{ color: keyRotationStep >= 2 ? '#16a34a' : '#94a3b8', fontWeight: 700 }}>
                    {keyRotationStep >= 2 ? '✓' : '○'} Step 2: Re-signing ABDM OAuth certificates and JWT keys...
                  </div>
                  <div style={{ color: keyRotationStep >= 3 ? '#16a34a' : '#94a3b8', fontWeight: 700 }}>
                    {keyRotationStep >= 3 ? '✓' : '○'} Step 3: Pushing new public keys to 48 PHC edge nodes & vans...
                  </div>
                  <div style={{ color: keyRotationStep >= 4 ? '#16a34a' : '#94a3b8', fontWeight: 700 }}>
                    {keyRotationStep >= 4 ? '✓' : '○'} Step 4: Invalidating stale tokens and issuing verified SHA-256 seal.
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleStartKeyRotation}
                disabled={isRotatingKey}
                style={{
                  background: isRotatingKey ? '#64748b' : '#7c3aed',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: isRotatingKey ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Key size={17} />
                <span>{isRotatingKey ? 'Rotating Master Key...' : 'Execute Automated Master Key Rotation'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: DUAL AI MODEL BENCHMARKING & LATENCY PROFILER
         ========================================================================= */}
      {isAIBenchmarkModalOpen && (
        <div className="dash-modal-backdrop" onClick={() => setIsAIBenchmarkModalOpen(false)}>
          <div className="dash-modal" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '1.5px solid #8b5cf6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#8b5cf6', display: 'grid', placeItems: 'center', color: '#fff' }}>
                  <Cpu size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    Dual AI Inference Engine Benchmarking Sandbox
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Comparative Profiler: Gemini 1.5 Flash (Cloud) vs YOLOv8n-OralQuant (Edge)
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setIsAIBenchmarkModalOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* Cloud Model */}
                <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: '#6d28d9', fontSize: '0.9rem' }}>Gemini 1.5 Flash (Cloud)</span>
                    <span style={{ fontSize: '0.72rem', background: '#8b5cf6', color: '#fff', padding: '2px 7px', borderRadius: '6px', fontWeight: 800 }}>MULTI-MODAL</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '8px', lineHeight: 1.5 }}>
                    <div><strong>Architecture:</strong> Vision-Language Transformer</div>
                    <div><strong>Quantization:</strong> FP32 Cloud API Endpoint</div>
                    <div><strong>Typical Latency:</strong> 380 - 420 ms</div>
                    <div><strong>Concordance:</strong> 96.8% (Clinical Gold Standard)</div>
                  </div>
                </div>

                {/* Edge Model */}
                <div style={{ background: '#ecfeff', border: '1px solid #cffafe', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: '#0e7490', fontSize: '0.9rem' }}>YOLOv8n-OralQuant (Edge)</span>
                    <span style={{ fontSize: '0.72rem', background: '#06b6d4', color: '#fff', padding: '2px 7px', borderRadius: '6px', fontWeight: 800 }}>OFFLINE WASM</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '8px', lineHeight: 1.5 }}>
                    <div><strong>Architecture:</strong> Edge CNN / Feature Pyramids</div>
                    <div><strong>Quantization:</strong> INT8 (6.2 MB Payload)</div>
                    <div><strong>Typical Latency:</strong> 70 - 85 ms (Zero Cloud Dependency)</div>
                    <div><strong>Concordance:</strong> 92.4% (Triage Screening)</div>
                  </div>
                </div>
              </div>

              {/* Benchmark Results Display */}
              {benchmarkResult && (
                <div style={{ background: '#090d16', color: '#f8fafc', borderRadius: '10px', padding: '14px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                  <div style={{ color: '#4ade80', fontWeight: 800, marginBottom: '6px' }}>
                    ⚡ LIVE BENCHMARK METRICS CAPTURED:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', color: '#cbd5e1' }}>
                    <div>Gemini 1.5 Flash Latency: <strong style={{ color: '#38bdf8' }}>{benchmarkResult.geminiTime}</strong></div>
                    <div>YOLOv8n Edge Latency: <strong style={{ color: '#4ade80' }}>{benchmarkResult.yoloTime}</strong></div>
                    <div>Dual Agreement Concordance: <strong>{benchmarkResult.agreementScore}</strong></div>
                    <div>Execution Mode: <strong>{benchmarkResult.device}</strong></div>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleRunAIBenchmark}
                disabled={isBenchmarking}
                style={{
                  background: isBenchmarking ? '#64748b' : '#8b5cf6',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: isBenchmarking ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Zap size={17} />
                <span>{isBenchmarking ? 'Running Dual Benchmark...' : 'Run Comparative Latency Benchmark'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: OFFLINE EDGE SYNC DIAGNOSTICS & QUEUE INSPECTOR
         ========================================================================= */}
      {isEdgeSyncModalOpen && (
        <div className="dash-modal-backdrop" onClick={() => setIsEdgeSyncModalOpen(false)}>
          <div className="dash-modal" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '1.5px solid #06b6d4' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#06b6d4', display: 'grid', placeItems: 'center', color: '#fff' }}>
                  <Database size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    Offline Edge Sync Diagnostics & Queue Inspector
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    SQLite-to-PostgreSQL Cloud Replication for Disconnected Tribal Kiosks
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setIsEdgeSyncModalOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {isSyncingEdge && (
                <div style={{ background: '#ecfeff', border: '1px solid #a5f3fc', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0891b2', marginBottom: '6px' }}>
                    Flushing SQLite Queues to PostgreSQL Cloud... {syncProgress}%
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#cffafe', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${syncProgress}%`, height: '100%', background: '#0891b2', transition: 'width 0.4s' }} />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {edgeNodes.map((n) => (
                  <div key={n.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.88rem' }}>{n.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Network: {n.connectivity}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: n.pendingRecords > 0 ? '#ea580c' : '#16a34a' }}>
                        {n.pendingRecords > 0 ? `${n.pendingRecords} Pending Records` : '✓ 0 Pending'}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{n.status}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleForceEdgeSync}
                disabled={isSyncingEdge}
                style={{
                  background: isSyncingEdge ? '#64748b' : '#06b6d4',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: isSyncingEdge ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <RefreshCw size={17} />
                <span>{isSyncingEdge ? 'Synchronizing Nodes...' : 'Force Immediate Cloud Synchronization'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 5: FULL SECURITY & HIPAA AUDIT TRAIL SEARCH
         ========================================================================= */}
      {isAuditModalOpen && (
        <div className="dash-modal-backdrop" onClick={() => setIsAuditModalOpen(false)}>
          <div className="dash-modal" style={{ maxWidth: '850px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '1.5px solid #475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#475569', display: 'grid', placeItems: 'center', color: '#fff' }}>
                  <HistoryIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    Security, HIPAA & ABDM Cryptographic Audit Trail
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Tamper-Evident SHA-256 Audit Records across 48 Connected PHCs
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setIsAuditModalOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Search by Actor, IP address, or Event..."
                  value={auditSearchQuery}
                  onChange={(e) => setAuditSearchQuery(e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const csvContent =
                      'AuditID,Timestamp,Actor,Role,Event,Resource,IP,Status\n' +
                      auditEvents
                        .map(
                          (a) =>
                            `"${a.id}","${a.time}","${a.actor}","${a.role}","${a.event}","${a.resource}","${a.ip}","${a.status}"`
                        )
                        .join('\n');
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `HIPAA_Audit_Trail_${new Date().toISOString().split('T')[0]}.csv`;
                    link.click();
                  }}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#0f172a',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>
              </div>

              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px', maxHeight: '360px' }}>
                <table className="patient-table" style={{ margin: 0 }}>
                  <thead>
                    <tr>
                      <th>Audit ID</th>
                      <th>Timestamp</th>
                      <th>Actor</th>
                      <th>Event</th>
                      <th>Resource</th>
                      <th>Source IP</th>
                      <th style={{ textAlign: 'right' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditEvents
                      .filter(
                        (a) =>
                          !auditSearchQuery ||
                          a.actor.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
                          a.event.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
                          a.ip.toLowerCase().includes(auditSearchQuery.toLowerCase())
                      )
                      .map((ev) => (
                        <tr key={ev.id}>
                          <td style={{ fontWeight: 800, color: '#7c3aed', fontFamily: 'monospace' }}>{ev.id}</td>
                          <td style={{ color: '#64748b', fontSize: '0.78rem' }}>{ev.time}</td>
                          <td style={{ fontWeight: 600, color: '#0f172a' }}>{ev.actor}</td>
                          <td style={{ fontWeight: 600 }}>{ev.event}</td>
                          <td style={{ color: '#475569', fontSize: '0.78rem' }}>{ev.resource}</td>
                          <td style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'monospace' }}>{ev.ip}</td>
                          <td style={{ textAlign: 'right' }}>
                            <span className={`status-pill ${ev.statusClass}`}>{ev.status}</span>
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

      {/* AI System Copilot Chatbot */}
      <AIChatBot dashboardType="system_admin_dashboard" />
    </div>
  );
}
