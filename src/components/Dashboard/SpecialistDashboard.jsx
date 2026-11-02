import React, { useState } from 'react';
import DashboardNavbar from './DashboardNavbar';
import Sidebar from './Sidebar';
import WelcomeBanner from './WelcomeBanner';
import StatCards from './StatCards';
import ScreeningModal from './ScreeningModal';
import AIChatBot from './AIChatBot';
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
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const specialistMenuItems = [
    { name: 'Teleconsultation Review Queue', icon: <AIIcon /> },
    { name: 'Incoming PHC Referral Case Files', icon: <ReferralIcon /> },
    { name: 'AI Biopsy Re-confirmation Center', icon: <CameraIcon /> },
    { name: 'Histopathology & Cytology Reports', icon: <HistoryIcon /> },
    { name: 'Multi-Disciplinary Tumor Board (MDT)', icon: <UserPlusIcon /> },
    { name: 'Radiation & Surgical Staging Notes', icon: <ReportsIcon /> },
    { name: 'High-Risk Longitudinal Tracking', icon: <CalendarIcon /> },
    { name: 'Specialist Credentials & Digital Signature', icon: <SettingsIcon /> },
  ];

  const specialistStats = [
    {
      title: 'Incoming PHC Referrals',
      value: '42',
      trend: '↑ 14%',
      trendColor: 'green',
      subtext: 'vs. last week',
      icon: <ReferralIcon className="w-5 h-5" />,
      colorClass: 'orange',
      cardBorder: 'orange-bottom',
    },
    {
      title: 'Teleconsultations Scheduled',
      value: '18',
      trend: '↑ 8%',
      trendColor: 'green',
      subtext: 'for today',
      icon: <AIIcon className="w-5 h-5" />,
      colorClass: 'teal',
      cardBorder: 'teal-bottom',
    },
    {
      title: 'Biopsy Recommendations Pending',
      value: '9',
      trend: 'High Priority',
      trendColor: 'amber',
      subtext: 'requires approval',
      icon: <WarningIcon className="w-5 h-5" />,
      colorClass: 'amber',
      cardBorder: 'amber-bottom',
    },
    {
      title: 'Confirmed Case Closures',
      value: '64',
      trend: '↑ 22%',
      trendColor: 'green',
      subtext: 'this month',
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
    if (navName === 'Teleconsultation Review Queue' || navName === 'AI Biopsy Re-confirmation Center') {
      setIsReviewModalOpen(true);
    } else if (onToast) {
      onToast(`Navigating to ${navName}`);
    }
  };

  const handleAction = (action) => {
    switch (action) {
      case 'launch-teleconsult':
        setIsReviewModalOpen(true);
        if (onToast) onToast('Starting Encrypted WebRTC Teleconsultation with PHC Koyyuru...');
        break;
      case 'review-biopsy':
        setIsReviewModalOpen(true);
        if (onToast) onToast('Loading AI Biopsy Multi-Spectral Visuals & Grad-CAM Heatmap...');
        break;
      case 'issue-referral':
        if (onToast) onToast('Generating Digital Referral Endorsement & e-Signature (ABHA M3)...');
        break;
      case 'order-histopathology':
        if (onToast) onToast('Order Dispatched: Fine Needle Aspiration & Punch Biopsy Kit to PHC Araku.');
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
            <span>Specialist Dashboard • Area Hospital Paderu Tele-Review Center</span>
          </div>
        </div>

        {/* Central Canvas Area - Fills Full Display */}
        <main className="dash-content-canvas full-display">
          <div className="dash-center-col">
            {/* Welcome Banner */}
            <WelcomeBanner
              doctorName="Dr. Ananya Varma, MD"
              roleSubtitle="Specialist Dashboard • Head of Oral Oncology & Tertiary Review"
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
                    <h3>Specialist Referral Triage & Teleconsults</h3>
                    <p>Weekly referrals triaged from 11 ITDA Paderu PHCs</p>
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
                    <h3>Lesion Staging & Histopathology Distribution</h3>
                    <p>Current active referred cohort breakdown</p>
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
                    Urgent Specialist Referral & Teleconsultation Queue
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                    Triaged high-suspicion cases awaiting oncology concurrence & biopsy directives
                  </p>
                </div>
                <button
                  type="button"
                  className="view-all-link"
                  onClick={() => onToast && onToast('Loading comprehensive 42-patient referral ledger...')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  View All Referrals <span>→</span>
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="patient-table">
                  <thead>
                    <tr>
                      <th>Ref ID</th>
                      <th>Patient Name</th>
                      <th>Referring PHC</th>
                      <th>Suspected Lesion</th>
                      <th>AI Confidence</th>
                      <th>Triage Status</th>
                      <th style={{ textAlign: 'right' }}>Specialist Action</th>
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
                        <td style={{ textAlign: 'right' }}>
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
                              padding: '6px 12px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <span>🔬 Review Scan</span>
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
                  Tertiary Review <br />
                  <span>Saves Lives</span>
                </h3>
                <p>Connecting Tribal PHCs to Advanced Oncology Care</p>
              </div>
            </div>

            {/* 4 Specialist Action Buttons */}
            <div className="action-buttons-group">
              <button
                type="button"
                className="btn-action-hero orange-grad"
                onClick={() => handleAction('launch-teleconsult')}
                title="Launch Encrypted Teleconsultation Suite"
              >
                <div className="btn-left">
                  <AIIcon className="w-4 h-4" />
                  <span>Launch Teleconsult Suite</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero teal-grad"
                onClick={() => handleAction('review-biopsy')}
                title="Review AI Biopsy Flagged Scans"
              >
                <div className="btn-left">
                  <CameraIcon className="w-4 h-4" />
                  <span>Review AI Biopsy Scans</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero"
                style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', color: '#fff' }}
                onClick={() => handleAction('issue-referral')}
                title="Issue Digital Referral Endorsement"
              >
                <div className="btn-left">
                  <ReferralIcon className="w-4 h-4" />
                  <span>Issue Referral Endorsement</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)', color: '#fff' }}
                onClick={() => handleAction('order-histopathology')}
                title="Order Histopathology / Biopsy Kit"
              >
                <div className="btn-left">
                  <HeartPulseIcon className="w-4 h-4" />
                  <span>Order Biopsy Dispatch</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>
            </div>

            {/* Department Schedule Card */}
            <div className="schedule-card">
              <div className="schedule-header">
                <h4>Today's Tele-OPD Lineup</h4>
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

