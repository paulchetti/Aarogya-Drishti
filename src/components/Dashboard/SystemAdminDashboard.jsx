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

export default function SystemAdminDashboard({ onToast, onSwitchDashboard, onLogout }) {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      value: '1,420',
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

  const auditEvents = [
    {
      id: 'AUD-99482',
      time: '15 Apr 2025, 10:42:18',
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
      time: '15 Apr 2025, 10:39:04',
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
      time: '15 Apr 2025, 10:31:55',
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
      time: '15 Apr 2025, 10:20:12',
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
      time: '15 Apr 2025, 09:58:33',
      actor: 'unknown-client-probe',
      role: 'Anonymous IP',
      event: 'Blocked Unauthorized REST API Ping',
      resource: 'WAF Filter / Rate-Limiter (429)',
      ip: '198.51.100.24 (External)',
      status: 'BLOCKED',
      statusClass: 'suspicious',
    },
  ];

  const handleNavSelect = (navName) => {
    setActiveNav(navName);
    if (onToast) onToast(`System Admin: Accessing ${navName}...`);
  };

  const handleAction = (action) => {
    switch (action) {
      case 'rotate-keys':
        if (onToast) onToast('Cryptographic Rotation Triggered: ABHA OAuth & HIPAA AES-256 Keys Renewed.');
        break;
      case 'flush-edge':
        if (onToast) onToast('Edge Cache Clean: Purged 342 Synced Offline Image Batches from Field Nodes.');
        break;
      case 'inspect-ai':
        if (onToast) onToast('AI Provenance: MobileNetV3 (v3.4.1) & ViT-B16 Weights SHA-256 Validated.');
        break;
      case 'trigger-backup':
        if (onToast) onToast('Disaster Recovery: Automated Geo-Redundant PostgreSQL Snapshot Initialized.');
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
        dashboardTitle="System Administrator Dashboard"
        userName="S. Ramakrishna, M.Tech"
        userRole="Director of Digital Infrastructure & Cyber Systems"
        userAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
        notificationCount={2}
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
            menuTitle="System Admin Controls"
            customItems={sysAdminMenuItems}
          />

          <div className="dash-facility-badge">
            <span className="badge-dot" style={{ backgroundColor: '#7c3aed' }}>●</span>
            <span>System Administrator Dashboard • Identity and Access Management (IAM) & Provisioning</span>
          </div>
        </div>

        {/* Central Canvas Area - Fills Full Display */}
        <main className="dash-content-canvas full-display">
          <div className="dash-center-col">
            {/* Welcome Banner */}
            <WelcomeBanner
              doctorName="S. Ramakrishna"
              roleSubtitle="System Administrator Dashboard • Cyber Operations, AI Telemetry & Infrastructure"
              photoUrl="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=640&q=85"
            />

            {/* 4 Stat Metric Cards with Colored Lines */}
            <StatCards cards={systemStats} />

            {/* Middle 2 Charts */}
            <div className="charts-dual-row">
              {/* Left Chart: API Gateway & Edge Sync Load */}
              <div className="chart-card">
                <div className="chart-header">
                  <div className="chart-title-wrap">
                    <h3>API Gateway Load & Offline Edge Synchronization</h3>
                    <p>Hourly network throughput & automated SQLite-to-Cloud re-sync</p>
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
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="520" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="75" x2="520" y2="75" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="120" x2="520" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Area fill */}
                    <path
                      d="M 20 120 Q 90 70, 160 85 T 300 45 T 440 28 L 500 15 L 500 160 L 20 160 Z"
                      fill="url(#sysAreaGrad)"
                    />
                    {/* Trend Line */}
                    <path
                      d="M 20 120 Q 90 70, 160 85 T 300 45 T 440 28 L 500 15"
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    {/* Bar columns */}
                    {[
                      { x: 50, h: 55, color: '#0d9488' },
                      { x: 130, h: 80, color: '#0d9488' },
                      { x: 210, h: 110, color: '#f97316' },
                      { x: 290, h: 125, color: '#7c3aed' },
                      { x: 370, h: 140, color: '#0d9488' },
                      { x: 450, h: 150, color: '#7c3aed' },
                    ].map((b, i) => (
                      <rect
                        key={i}
                        x={b.x}
                        y={160 - b.h}
                        width="16"
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
                    <span>REST / GraphQL Throughput</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#0d9488' }} />
                    <span>Offline Edge Sync Batches</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#f97316' }} />
                    <span>ABDM Gateway Handshakes</span>
                  </div>
                </div>
              </div>

              {/* Right Chart: AI Model Ensemble Accuracy & Latency */}
              <div className="chart-card">
                <div className="chart-header">
                  <div className="chart-title-wrap">
                    <h3>AI Multi-Model Ensemble Telemetry</h3>
                    <p>On-device inference validation & cloud benchmarks</p>
                  </div>
                </div>

                <div className="donut-body">
                  <div className="donut-graphic">
                    <svg viewBox="0 0 160 160" className="donut-svg">
                      <circle cx="80" cy="80" r="54" fill="none" stroke="#e2e8f0" strokeWidth="22" />
                      {/* MobileNetV3 Edge (Teal) */}
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="22"
                        strokeDasharray="135 340"
                        strokeDashoffset="0"
                      />
                      {/* ViT-B16 Transformer (Purple) */}
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#7c3aed"
                        strokeWidth="22"
                        strokeDasharray="105 340"
                        strokeDashoffset="-135"
                      />
                      {/* ResNet50 Classifier (Orange) */}
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="22"
                        strokeDasharray="65 340"
                        strokeDashoffset="-240"
                      />
                      {/* YOLOv8 Oral Detector (Amber) */}
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="22"
                        strokeDasharray="35 340"
                        strokeDashoffset="-305"
                      />
                    </svg>
                    <div className="donut-center-label">
                      <span className="donut-big-num">98.6%</span>
                      <span className="donut-small-sub">F1 Score</span>
                    </div>
                  </div>

                  <div className="donut-legend-col">
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#0d9488' }} />
                      <span className="d-label">MobileNetV3 Edge (98.4%)</span>
                    </div>
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#7c3aed' }} />
                      <span className="d-label">ViT-B16 Transformer (99.1%)</span>
                    </div>
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#f97316' }} />
                      <span className="d-label">ResNet50 Classifier (97.9%)</span>
                    </div>
                    <div className="donut-legend-row">
                      <span className="d-dot" style={{ backgroundColor: '#f59e0b' }} />
                      <span className="d-label">YOLOv8 Oral ROI (96.8%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Audit Event Log Table */}
            <div className="table-card">
              <div className="table-header">
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    {language === 'te' ? 'ఐడెంటిటీ & యాక్సెస్ మేనేజ్‌మెంట్ (IAM) & సిస్టమ్ ఆడిట్ ఈవెంట్ లాగ్' : 'Identity and Access Management (IAM) & System Audit Event Log'}
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                    Immutable cryptographic audit trail & provisioning console adhering to ABDM, DISHA & HIPAA guidelines
                  </p>
                </div>
                <button
                  type="button"
                  className="view-all-link"
                  onClick={() => onToast && onToast('Exporting IAM Provisioning & Cryptographic Audit Log (JSON-LD / CSV)...')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Export IAM Audit Trail <span>→</span>
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="patient-table">
                  <thead>
                    <tr>
                      <th>Event ID / Time</th>
                      <th>Actor Identity</th>
                      <th>Event Description</th>
                      <th>Resource / Destination</th>
                      <th>IP Node / Origin</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Security Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditEvents.map((evt) => (
                      <tr key={evt.id}>
                        <td style={{ fontWeight: 700, color: '#334155' }}>
                          <div>{evt.id}</div>
                          <small style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{evt.time}</small>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{evt.actor}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{evt.role}</div>
                        </td>
                        <td style={{ fontWeight: 600, color: '#1e293b' }}>{evt.event}</td>
                        <td style={{ fontSize: '0.78rem', color: '#0d9488', fontFamily: 'monospace' }}>
                          {evt.resource}
                        </td>
                        <td style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'monospace' }}>
                          {evt.ip}
                        </td>
                        <td>
                          <span className={`status-pill ${evt.statusClass}`}>{evt.status}</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => {
                              if (onToast) onToast(`Tracing Cryptographic Signature & Hash for ${evt.id}`);
                            }}
                            style={{
                              background: '#7c3aed',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '6px 12px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            <span>Inspect Hash</span>
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
            {/* Hero Card: Cloud & Security Ops */}
            <div className="early-detection-hero" style={{ background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)' }}>
              <div className="hero-photo-layer">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=85"
                  alt="Security Cloud Infrastructure"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=85";
                  }}
                />
              </div>

              <div className="hero-gradient-overlay" />

              <div className="hero-content">
                <h3>
                  Zero-Trust <br />
                  <span>Architecture</span>
                </h3>
                <p>Securing Tribal Telemedicine & AI Inference at Scale</p>
              </div>
            </div>

            {/* 4 System Admin Action Buttons */}
            <div className="action-buttons-group">
              <button
                type="button"
                className="btn-action-hero"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)', color: '#fff' }}
                onClick={() => handleAction('rotate-keys')}
                title="Force Rotate ABHA Cryptographic Keys"
              >
                <div className="btn-left">
                  <WarningIcon className="w-4 h-4" />
                  <span>Rotate Cryptographic Keys</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero teal-grad"
                onClick={() => handleAction('flush-edge')}
                title="Flush Stale Offline Edge Sync Cache"
              >
                <div className="btn-left">
                  <TargetIcon className="w-4 h-4" />
                  <span>Flush Synced Edge Cache</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero orange-grad"
                onClick={() => handleAction('inspect-ai')}
                title="Inspect Edge AI Model Weights & Signatures"
              >
                <div className="btn-left">
                  <AIIcon className="w-4 h-4" />
                  <span>Inspect AI Model Weights</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero"
                style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', color: '#fff' }}
                onClick={() => handleAction('trigger-backup')}
                title="Trigger Automated Geo-Redundant Backup"
              >
                <div className="btn-left">
                  <ReportsIcon className="w-4 h-4" />
                  <span>Trigger Geo-Cloud Backup</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>
            </div>

            {/* Infrastructure Health Status Card */}
            <div className="schedule-card">
              <div className="schedule-header">
                <h4>Core Cloud Telemetry</h4>
                <span className="schedule-date">Live Status</span>
              </div>

              <div className="schedule-list">
                <div className="schedule-item">
                  <div className="schedule-time" style={{ color: '#16a34a' }}>ABDM M3</div>
                  <div className="schedule-info">
                    <span className="patient-name">ABHA Token & Consent Gateway</span>
                    <span className="consult-type">Status: Healthy • 99.99% Success</span>
                  </div>
                  <span className="slot-badge live">Optimal</span>
                </div>

                <div className="schedule-item">
                  <div className="schedule-time" style={{ color: '#7c3aed' }}>AI EDGE</div>
                  <div className="schedule-info">
                    <span className="patient-name">Multi-Spectral Inference Engine</span>
                    <span className="consult-type">Latency: 395ms • WebAssembly Active</span>
                  </div>
                  <span className="slot-badge live">Optimal</span>
                </div>

                <div className="schedule-item">
                  <div className="schedule-time" style={{ color: '#0d9488' }}>BROKER</div>
                  <div className="schedule-info">
                    <span className="patient-name">Paderu Agency MQTT Edge Broker</span>
                    <span className="consult-type">Connected: 48 / 48 PHC Field Nodes</span>
                  </div>
                  <span className="slot-badge live">Connected</span>
                </div>

                <div className="schedule-item">
                  <div className="schedule-time" style={{ color: '#2563eb' }}>ENCRYPT</div>
                  <div className="schedule-info">
                    <span className="patient-name">PostgreSQL Clinical Data Vault</span>
                    <span className="consult-type">AES-256 GCM • Hardware Security Module</span>
                  </div>
                  <span className="slot-badge live">Protected</span>
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
          <strong>AAROGYA DRISHTI</strong> &nbsp;|&nbsp; System Administrator Dashboard
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          © 2025 AAROGYA DRISHTI. All rights reserved.
        </div>
      </footer>

      {/* AI System Security & AI Telemetry Copilot */}
      <AIChatBot dashboardType="system_admin_dashboard" />
    </div>
  );
}

