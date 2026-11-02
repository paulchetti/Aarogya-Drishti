import React, { useState } from 'react';
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

export default function DistrictAdminDashboard({ onToast, onSwitchDashboard, onLogout }) {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      title: 'Total District Screenings',
      value: '14,820',
      trend: '↑ 24%',
      trendColor: 'green',
      subtext: 'vs. last month',
      icon: <UserIcon className="w-5 h-5" />,
      colorClass: 'orange',
      cardBorder: 'orange-bottom',
    },
    {
      title: 'Active Outbound Referrals',
      value: '186',
      trend: '↑ 12%',
      trendColor: 'green',
      subtext: 'across 11 Mandals',
      icon: <ReferralIcon className="w-5 h-5" />,
      colorClass: 'teal',
      cardBorder: 'teal-bottom',
    },
    {
      title: 'High-Risk Habit Screening Rate',
      value: '78.6%',
      trend: 'Target 85%',
      trendColor: 'amber',
      subtext: 'tribal hamlets covered',
      icon: <TargetIcon className="w-5 h-5" />,
      colorClass: 'amber',
      cardBorder: 'amber-bottom',
    },
    {
      title: 'Care Continuity Adherence',
      value: '94.2%',
      trend: '↑ 4.1%',
      trendColor: 'green',
      subtext: 'follow-up completion',
      icon: <CalendarIcon className="w-5 h-5" />,
      colorClass: 'blue',
      cardBorder: 'blue-bottom',
    },
  ];

  const mandalData = [
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
    },
    {
      mandal: 'Araku Valley',
      phc: 'PHC Araku & Dumbriguda',
      inCharge: 'Dr. V. Madhavan',
      screened: 2120,
      target: 2500,
      pct: '84.8%',
      redFlags: 44,
      referrals: 29,
      vanStatus: 'Van #01 Active',
      vanClass: 'suspicious',
    },
    {
      mandal: 'Chintapalli',
      phc: 'PHC Chintapalli Tribal',
      inCharge: 'Dr. G. Sumalatha',
      screened: 1840,
      target: 2200,
      pct: '83.6%',
      redFlags: 31,
      referrals: 18,
      vanStatus: 'Van #02 En Route',
      vanClass: 'follow-up',
    },
    {
      mandal: 'G.K. Veedhi',
      phc: 'PHC G.K. Veedhi South',
      inCharge: 'Dr. P. Srinivas',
      screened: 1690,
      target: 2100,
      pct: '80.4%',
      redFlags: 27,
      referrals: 16,
      vanStatus: 'Camp Active',
      vanClass: 'under-review',
    },
    {
      mandal: 'Munchingiputtu',
      phc: 'PHC Munchingiputtu Border',
      inCharge: 'Dr. K. Ravinder',
      screened: 1420,
      target: 1900,
      pct: '74.7%',
      redFlags: 24,
      referrals: 14,
      vanStatus: 'Van #03 Queued',
      vanClass: 'follow-up',
    },
    {
      mandal: 'Hukumpeta',
      phc: 'PHC Hukumpeta',
      inCharge: 'Dr. T. Padma',
      screened: 1380,
      target: 1800,
      pct: '76.6%',
      redFlags: 22,
      referrals: 12,
      vanStatus: 'Scheduled',
      vanClass: 'normal',
    },
  ];

  const handleNavSelect = (navName) => {
    setActiveNav(navName);
    if (onToast) onToast(`Navigating to ${navName}`);
  };

  const handleAction = (action) => {
    switch (action) {
      case 'export-rollup':
        if (onToast) onToast('Generating ITDA Paderu District Health Rollup for ABDM State Gateway...');
        break;
      case 'dispatch-vans':
        if (onToast) onToast('Dispatched Mobile Oral Screening Vans #01, #02 to Munchingiputtu & Araku!');
        break;
      case 'asha-drive':
        if (onToast) onToast('Triggered ASHA Community Screening Protocol: 420 Village Health Workers Notified.');
        break;
      case 'reallocate-kits':
        if (onToast) onToast('Supplies Reallocated: 250 Oral Cytology Kits routed to Chintapalli & G.K. Veedhi.');
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
        dashboardTitle="District Administrator Dashboard"
        userName="Dr. K. Venkateswara Rao"
        userRole="District Medical & Health Officer (DMHO)"
        userAvatar="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=120&q=80"
        notificationCount={6}
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
            menuTitle="District Admin Options"
            customItems={adminMenuItems}
          />

          <div className="dash-facility-badge">
            <span className="badge-dot" style={{ backgroundColor: '#2563eb' }}>●</span>
            <span>District Administrator Dashboard • Jurisdictional Macro-Analytics & Surveillance</span>
          </div>
        </div>

        {/* Central Canvas Area - Fills Full Display */}
        <main className="dash-content-canvas full-display">
          <div className="dash-center-col">
            {/* Welcome Banner */}
            <WelcomeBanner
              doctorName="Dr. K. Venkateswara Rao, MD"
              roleSubtitle="District Administrator Dashboard • DMHO, Alluri Sitharama Raju District"
              photoUrl="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=640&q=85"
            />

            {/* 4 Stat Metric Cards with Colored Lines */}
            <StatCards cards={districtStats} />

            {/* Middle 2 Charts */}
            <div className="charts-dual-row">
              {/* Left Chart: Mandal Screening Trajectory */}
              <div className="chart-card">
                <div className="chart-header">
                  <div className="chart-title-wrap">
                    <h3>Mandal Screening & High-Risk Triage Trajectory</h3>
                    <p>Monthly screening velocity across 11 Tribal Mandals</p>
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
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="520" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="75" x2="520" y2="75" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="120" x2="520" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Area fill */}
                    <path
                      d="M 20 135 Q 100 110, 180 80 T 320 50 T 450 35 L 500 20 L 500 160 L 20 160 Z"
                      fill="url(#distAreaGrad)"
                    />
                    {/* Trend Line */}
                    <path
                      d="M 20 135 Q 100 110, 180 80 T 320 50 T 450 35 L 500 20"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    {/* Mandal Performance Bars */}
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
              <div className="chart-card">
                <div className="chart-header">
                  <div className="chart-title-wrap">
                    <h3>District High-Risk Habit Profiling</h3>
                    <p>Epidemiological exposure across tribal population</p>
                  </div>
                </div>

                <div className="donut-body">
                  <div className="donut-graphic">
                    <svg viewBox="0 0 160 160" className="donut-svg">
                      <circle cx="80" cy="80" r="54" fill="none" stroke="#e2e8f0" strokeWidth="22" />
                      {/* Reverse Smoking / Chutta (Orange) */}
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
                      {/* Betel Quid / Areca (Teal) */}
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
                      {/* Gutkha / Khaini (Amber) */}
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
                      {/* Non-Habit / Regular (Blue) */}
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
                    District epidemiological surveillance across 11 tribal Mandals with live mobile van camp tracking
                  </p>
                </div>
                <button
                  type="button"
                  className="view-all-link"
                  onClick={() => onToast && onToast('Exporting Jurisdictional Macro-Analytics Report (PDF)...')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Download Macro-Analytics <span>→</span>
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="patient-table">
                  <thead>
                    <tr>
                      <th>Mandal</th>
                      <th>Primary Health Centre</th>
                      <th>Medical Officer In-Charge</th>
                      <th>Screened / Target</th>
                      <th>Coverage %</th>
                      <th>Red-Flag Triage</th>
                      <th>Van Fleet Status</th>
                      <th style={{ textAlign: 'right' }}>Mandal Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mandalData.map((m) => (
                      <tr key={m.mandal}>
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
                            onClick={() => {
                              if (onToast) onToast(`Reviewing Mandal Health Quotas & Dispatches for ${m.mandal}`);
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
                            <span>Inspect PHC</span>
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
            {/* Hero Card: Tribal Health Mission */}
            <div className="early-detection-hero" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' }}>
              <div className="hero-photo-layer">
                <img
                  src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=85"
                  alt="Tribal Community Health"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=85";
                  }}
                />
              </div>

              <div className="hero-gradient-overlay" />

              <div className="hero-content">
                <h3>
                  Tribal Health <br />
                  <span>Mission</span>
                </h3>
                <p>Reaching the Most Remote Hamlets of Paderu Agency</p>
              </div>
            </div>

            {/* 4 District Action Buttons */}
            <div className="action-buttons-group">
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
                  <span>Trigger ASHA Community Drive</span>
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
                  <span>Reallocate Biopsy Kits</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>
            </div>

            {/* Mobile Van Fleet Status Card */}
            <div className="schedule-card">
              <div className="schedule-header">
                <h4>Mobile Screening Fleet Status</h4>
                <span className="schedule-date">Live GPS</span>
              </div>

              <div className="schedule-list">
                <div className="schedule-item">
                  <div className="schedule-time" style={{ color: '#16a34a' }}>VAN 01</div>
                  <div className="schedule-info">
                    <span className="patient-name">Araku Valley (Hamlets 14-19)</span>
                    <span className="consult-type">Screened: 84 / Target: 100 today</span>
                  </div>
                  <span className="slot-badge live">In Field</span>
                </div>

                <div className="schedule-item">
                  <div className="schedule-time" style={{ color: '#2563eb' }}>VAN 02</div>
                  <div className="schedule-info">
                    <span className="patient-name">Chintapalli Agency Camp</span>
                    <span className="consult-type">Screened: 62 / Target: 80 today</span>
                  </div>
                  <span className="slot-badge live">In Field</span>
                </div>

                <div className="schedule-item">
                  <div className="schedule-time" style={{ color: '#f59e0b' }}>VAN 03</div>
                  <div className="schedule-info">
                    <span className="patient-name">Munchingiputtu Remote Transit</span>
                    <span className="consult-type">En route to Border Hamlet</span>
                  </div>
                  <span className="slot-badge pending">Transit</span>
                </div>

                <div className="schedule-item">
                  <div className="schedule-time" style={{ color: '#64748b' }}>VAN 04</div>
                  <div className="schedule-info">
                    <span className="patient-name">Paderu District HQ Base</span>
                    <span className="consult-type">Routine Sterilization & Restock</span>
                  </div>
                  <span className="slot-badge" style={{ background: '#f1f5f9', color: '#475569' }}>HQ Base</span>
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
          <strong>AAROGYA DRISHTI</strong> &nbsp;|&nbsp; District Administrator Dashboard
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          © 2025 AAROGYA DRISHTI. All rights reserved.
        </div>
      </footer>

      {/* AI District Health Intelligence Copilot */}
      <AIChatBot dashboardType="district_admin_dashboard" />
    </div>
  );
}

