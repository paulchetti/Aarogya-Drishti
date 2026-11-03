import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './anmPortal.css';
import {
  UserPlus,
  Users,
  MapPin,
  CalendarClock,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  ArrowLeft,
  LogOut,
  ChevronRight,
  Activity,
  Video,
  HeartPulse,
  Clock,
  Shield,
  FileCheck
} from 'lucide-react';
import ANMPatientEnrollmentView from './ANMPatientEnrollmentView';
import ANMPatientDirectoryView from './ANMPatientDirectoryView';
import ANMCatchmentView from './ANMCatchmentView';
import ANMResolvedCasesView from './ANMResolvedCasesView';
import ANMPendingFollowupsView from './ANMPendingFollowupsView';
import ANMMorbidityTrendsView from './ANMMorbidityTrendsView';
import ANMFieldAnalyticsView from './ANMFieldAnalyticsView';
import ANMVisitScheduleView from './ANMVisitScheduleView';
import TeleconsultationSuite from '../clinical/TeleconsultationSuite';

export default function ANMPortalLayout({

  user,
  onLogout
}) {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeModule, setActiveModule] = useState(null);
  // null = main dashboard grid, or:
  // 'enrollment' | 'directory' | 'catchment' | 'schedule' | 'followups' | 'resolved' | 'morbidity' | 'analytics' | 'live_teleconsult'

  const [teleconsultPatient, setTeleconsultPatient] = useState(null);

  const workerName = user?.name || 'ANM Lakshmi Devi';
  const workerAvatar =
    user?.avatar ||
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80';

  const handleStartTeleconsult = (pt) => {
    setTeleconsultPatient(pt);
    setActiveModule('live_teleconsult');
  };

  return (
    <div className="patient-portal-root">
      {/* --------------------------------------------------------------------
          AUTHENTIC BACKGROUND VECTOR ELEMENTS (Strictly in Background z-index: 0)
          -------------------------------------------------------------------- */}
      <div className="portal-decor-bg-layer" aria-hidden="true">
        {/* 1. Top-Left Vibrant Cyan/Blue Curved Wave Swoosh */}
        <svg
          className="portal-decor-top-left"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="anmTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#004cd4" />
              <stop offset="45%" stopColor="#006ef5" />
              <stop offset="85%" stopColor="#00aaff" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="anmTopRim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0,0 L 290,0 C 235,70 160,160 85,225 C 40,265 0,300 0,300 Z"
            fill="url(#anmTopGrad)"
          />
          <path
            d="M 0,0 L 305,0 C 248,76 170,170 90,238 C 42,280 0,315 0,315 Z"
            fill="none"
            stroke="url(#anmTopRim)"
            strokeWidth="2.5"
          />
        </svg>

        {/* 2. Top-Right Cyan/Blue Halftone Dot Matrix Pattern */}
        <svg
          className="portal-decor-top-right"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[...Array(9)].map((_, r) =>
            [...Array(9)].map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={40 + c * 22}
                cy={15 + r * 22}
                r={2.2}
                fill="#0284c7"
                opacity={Math.max(0.04, ((c + 1) * (9 - r)) / 95)}
              />
            ))
          )}
        </svg>

        {/* 3. Bottom Wave Swooshes (Orange Wave + Deep Navy Blue Wave) */}
        <svg
          className="portal-decor-bottom-waves"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="anmOrangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff7a00" />
              <stop offset="55%" stopColor="#ff6500" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <linearGradient id="anmNavyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00266e" />
              <stop offset="50%" stopColor="#001847" />
              <stop offset="100%" stopColor="#040e22" />
            </linearGradient>
            <linearGradient id="anmCyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#005ce6" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M 0,180 L 0,110 C 65,120 120,150 160,180 Z" fill="url(#anmCyanGrad)" />
          <path
            d="M 500,180 C 660,180 770,75 1040,36 C 1190,14 1310,46 1440,82 L 1440,180 Z"
            fill="url(#anmOrangeGrad)"
          />
          <path
            d="M 680,180 C 820,180 930,95 1160,68 C 1280,52 1360,82 1440,108 L 1440,180 Z"
            fill="url(#anmNavyGrad)"
          />
        </svg>
      </div>

      {/* --------------------------------------------------------------------
          MAIN CONTENT CONTAINER
          -------------------------------------------------------------------- */}
      {!activeModule ? (
        <div className="patient-content-container">
          {/* 1. TOPBAR: Floating white pill header */}
          <header className="patient-topbar">
            {/* Left: Round Logo + Brand Title */}
            <div
              className="patient-brand-group"
              onClick={() => setActiveModule(null)}
              style={{ cursor: 'pointer' }}
              title="Aarogya Drishti Home"
            >
              <div className="patient-logo-circle">
                <img
                  src="/logo.png"
                  alt="Aarogya Drishti Official Logo"
                  className="patient-logo-img"
                  onError={(e) => {
                    e.currentTarget.src = '/aarogya-logo.jpg';
                  }}
                />
              </div>
              <div className="patient-brand-box">
                <span className="patient-brand-title">
                  Arogya <span className="brand-orange">Drishti</span>
                </span>
                <span className="patient-brand-sub">{language === 'te' ? 'ఏఎన్‌ఎం & గ్రామ ఆరోగ్య కార్యకర్త పోర్టల్' : 'ANM & VILLAGE HEALTH WORKER PORTAL'}</span>
              </div>
            </div>

            {/* Right: Worker Profile + Switchers + Logout */}
            <div className="patient-header-right">
              <div className="patient-profile-capsule">
                <div className="patient-capsule-pic-wrap">
                  <img
                    src={workerAvatar}
                    alt={workerName}
                    className="patient-capsule-pic"
                  />
                </div>
                <div className="patient-capsule-info">
                  <span className="patient-capsule-name">{workerName}</span>
                  <span className="patient-capsule-tag">
                    <span className="tag-dot">●</span> {language === 'te' ? 'ఏఎన్‌ఎం ఫీల్డ్ వర్కర్ | పాడేరు' : 'ANM Field Worker | Paderu'}
                  </span>
                </div>
              </div>

              <button
                className="patient-logout-btn"
                onClick={onLogout}
                title="Log out of ANM portal"
              >
                <LogOut size={15} />
                <span>{language === 'te' ? 'లాగౌట్' : 'Logout'}</span>
              </button>
            </div>
          </header>

          {/* 2. ROYAL BLUE SERVICE SELECTION BANNER */}
          <div className="patient-service-banner">
            <div className="patient-banner-pulse-badge">
              <Activity size={18} strokeWidth={2.4} />
            </div>
            <span className="patient-banner-text">
              {language === 'te' ? 'ఆరోగ్య దృష్టి గ్రామ ఆరోగ్య సంరక్షణ సేవను ఎంచుకోండి:' : 'Select an Aarogya Drishti frontline village health service:'}
            </span>
          </div>

          {/* 3. CATCHMENT & FIELD SUMMARY STRIP */}
          <div className="anm-catchment-strip">
            <div className="anm-catchment-metric">
              <div className="anm-metric-icon" style={{ background: '#eff6ff', color: '#0052cc' }}>
                <MapPin size={18} />
              </div>
              <div>
                <div className="anm-metric-val">4,820</div>
                <div className="anm-metric-lbl">{language === 'te' ? 'కేటాయించిన జనాభా' : 'Catchment Population'}</div>
              </div>
            </div>

            <div className="anm-catchment-metric">
              <div className="anm-metric-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                <Users size={18} />
              </div>
              <div>
                <div className="anm-metric-val">3,940</div>
                <div className="anm-metric-lbl">{language === 'te' ? 'నమోదైన పౌరులు (81.7%)' : 'Registered Citizens (81.7%)'}</div>
              </div>
            </div>

            <div className="anm-catchment-metric">
              <div className="anm-metric-icon" style={{ background: '#fee2e2', color: '#dc2626' }}>
                <AlertCircle size={18} />
              </div>
              <div>
                <div className="anm-metric-val">{language === 'te' ? '5 అలర్ట్‌లు' : '5 Alerts'}</div>
                <div className="anm-metric-lbl">{language === 'te' ? 'పెండింగ్ ఫాలో-అప్‌లు' : 'Pending Follow-ups'}</div>
              </div>
            </div>

            <div className="anm-catchment-metric">
              <div className="anm-metric-icon" style={{ background: '#f0fdfa', color: '#0d9488' }}>
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="anm-metric-val">{language === 'te' ? '52 కేసులు' : '52 Cases'}</div>
                <div className="anm-metric-lbl">{language === 'te' ? 'ఈ త్రైమాసికంలో పరిష్కారం' : 'Resolved This Quarter'}</div>
              </div>
            </div>
          </div>

          {/* 4. THE 8 FRONT-LINE SERVICE ACTION CARDS GRID */}
          <div className="anm-services-grid">
            {/* CARD 1: Patient Enrollment & Demographics Intake */}
            <div
              className="patient-feature-card"
              onClick={() => setActiveModule('enrollment')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-orange">
                <UserPlus size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  {language === 'te' ? <>రోగి నమోదు &amp;<br />వివరాల నమోదు</> : <>Patient Enrollment &amp;<br />Demographics Intake</>}
                </div>
                <div className="patient-card-subtitle">
                  {language === 'te' ? 'పౌరుల వివరాలు & ఆభా ఐడీ సృష్టి' : 'Citizen Intake & ABHA Generation'}
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* CARD 2: Patient Directory & Search */}
            <div
              className="patient-feature-card"
              onClick={() => setActiveModule('directory')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-blue">
                <Users size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  {language === 'te' ? <>గ్రామ రోగుల డైరెక్టరీ &amp;<br />శోధన</> : <>Patient Directory &amp;<br />Longitudinal Search</>}
                </div>
                <div className="patient-card-subtitle">
                  {language === 'te' ? '3,940 మంది గ్రామ పౌరుల జాబితా' : 'Roster of 3,940 Village Citizens'}
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* CARD 3: Assigned Catchment Population */}
            <div
              className="patient-feature-card"
              onClick={() => setActiveModule('catchment')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-green">
                <MapPin size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  {language === 'te' ? <>కేటాయించిన జనాభా<br />వివరాలు</> : <>Assigned Catchment<br />Population</>}
                </div>
                <div className="patient-card-subtitle">
                  {language === 'te' ? '5 వార్డులు, జనాభా & ఆశా లింకులు' : '5 Wards, Demographics & ASHA Links'}
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* CARD 4: Visit & Screening Schedule */}
            <div
              className="patient-feature-card"
              onClick={() => setActiveModule('schedule')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-purple">
                <CalendarClock size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  {language === 'te' ? <>గ్రామ పర్యటన &amp; స్క్రీనింగ్<br />రోజువారీ షెడ్యూల్</> : <>Visit &amp; Screening<br />Daily Schedule</>}
                </div>
                <div className="patient-card-subtitle">
                  {language === 'te' ? 'గ్రామ ఆరోగ్య పోషకాహార దినం & క్యాంపులు' : 'VHND, NCD Itinerary & Camps'}
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* CARD 5: Pending Follow-ups */}
            <div
              className="patient-feature-card"
              onClick={() => setActiveModule('followups')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-rose">
                <AlertCircle size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  {language === 'te' ? <>పెండింగ్ ఫాలో-అప్‌లు<br />&amp; ఫీల్డ్ అలర్ట్‌లు</> : <>Pending Follow-ups<br />&amp; Overdue Alerts</>}
                </div>
                <div className="patient-card-subtitle">
                  {language === 'te' ? 'రక్తపోటు, గర్భిణుల & టీకాల తనిఖీ' : 'Vitals Rechecks, ANC & Vaccines Due'}
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* CARD 6: Resolved Cases */}
            <div
              className="patient-feature-card"
              onClick={() => setActiveModule('resolved')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-teal">
                <CheckCircle2 size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  {language === 'te' ? <>పరిష్కరించబడిన కేసులు &amp;<br />చికిత్స ఫలితాలు</> : <>Resolved Cases &amp;<br />Treatment Outcomes</>}
                </div>
                <div className="patient-card-subtitle">
                  {language === 'te' ? 'నయమైన ఇన్ఫెక్షన్లు & నియంత్రిత వ్యాధులు' : 'Cured Infections & Stabilized NCDs'}
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* CARD 7: Epidemiological Morbidity Trends */}
            <div
              className="patient-feature-card"
              onClick={() => setActiveModule('morbidity')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-indigo">
                <TrendingUp size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  {language === 'te' ? <>వ్యాధి పోకడలు &amp;<br />సర్వైలెన్స్</> : <>Epidemiological<br />Morbidity Trends</>}
                </div>
                <div className="patient-card-subtitle">
                  {language === 'te' ? 'వ్యాధి వ్యాప్తి గ్రాఫ్‌లు & హెచ్చరికలు' : 'Surveillance Curves & Outbreak Rates'}
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>

            {/* CARD 8: Field Analytics Reports */}
            <div
              className="patient-feature-card"
              onClick={() => setActiveModule('analytics')}
              role="button"
              tabIndex={0}
            >
              <div className="patient-card-icon-badge badge-amber">
                <BarChart3 size={24} strokeWidth={2.2} />
              </div>
              <div className="patient-card-text-group">
                <div className="patient-card-title">
                  {language === 'te' ? <>ఫీల్డ్ హెల్త్ అనలిటిక్స్<br />&amp; పురోగతి నివేదికలు</> : <>Field Analytics<br />&amp; Progress Reports</>}
                </div>
                <div className="patient-card-subtitle">
                  {language === 'te' ? 'నెలవారీ MPR నివేదిక, లక్ష్యాలు & ఎగుమతి' : 'Monthly MPR, KPIs & CSV Export'}
                </div>
              </div>
              <div className="patient-card-arrow-circle">
                <ChevronRight size={16} strokeWidth={2.4} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* --------------------------------------------------------------------
            FOCUSED INTERACTIVE VIEW (When any feature is clicked)
            -------------------------------------------------------------------- */
        <div className="patient-focused-container">
          <div className="patient-focused-header">
            <button
              className="patient-back-btn"
              onClick={() => setActiveModule(null)}
              title="Return to ANM Portal Home"
            >
              <ArrowLeft size={16} />
              <span>{language === 'te' ? '← ఏఎన్‌ఎం పోర్టల్‌కు తిరిగి వెళ్ళండి' : '← Back to ANM Portal'}</span>
            </button>

            <div className="patient-focused-title-badge">
              {activeModule === 'enrollment' && (language === 'te' ? 'రోగి నమోదు & వివరాల నమోదు' : 'Patient Enrollment & Demographics Intake')}
              {activeModule === 'directory' && (language === 'te' ? 'గ్రామ రోగుల డైరెక్టరీ & శోధన' : 'Patient Directory & Longitudinal Search')}
              {activeModule === 'catchment' && (language === 'te' ? 'కేటాయించిన జనాభా & ఆవాసాల వివరాలు' : 'Assigned Catchment Population & Habitation Demographics')}
              {activeModule === 'schedule' && (language === 'te' ? 'గ్రామ పర్యటన & స్క్రీనింగ్ రోజువారీ షెడ్యూల్' : 'Frontline Visit & Screening Schedule Itinerary')}
              {activeModule === 'followups' && (language === 'te' ? 'పెండింగ్ ఫాలో-అప్‌లు & ఫీల్డ్ అలర్ట్‌లు' : 'Pending Patient Follow-ups & Overdue Field Alerts')}
              {activeModule === 'resolved' && (language === 'te' ? 'పరిష్కరించబడిన కేసులు & చికిత్స ఫలితాలు' : 'Resolved Cases & Patient Treatment Outcomes')}
              {activeModule === 'morbidity' && (language === 'te' ? 'వ్యాధి పోకడలు & సర్వైలెన్స్' : 'Epidemiological Morbidity Trends & Surveillance')}
              {activeModule === 'analytics' && (language === 'te' ? 'ఫీల్డ్ హెల్త్ అనలిటిక్స్ & పురోగతి నివేదికలు' : 'Field Health Analytics & Monthly Progress Reports (MPR)')}
              {activeModule === 'live_teleconsult' && (language === 'te' ? 'లైవ్ వీడియో టెలికన్సల్టేషన్ విభాగం' : 'Live Video Teleconsultation Suite')}
            </div>

            <div className="patient-focused-actions">
              <span className="patient-status-indicator">{language === 'te' ? '● యాక్టివ్ సెషన్ • సబ్-సెంటర్ పాడేరు' : '● Active Session • Sub-Centre Paderu'}</span>
            </div>
          </div>

          <div className="patient-focused-body">
            {activeModule === 'enrollment' && (
              <ANMPatientEnrollmentView onStartTeleconsult={handleStartTeleconsult} />
            )}

            {activeModule === 'directory' && (
              <ANMPatientDirectoryView onStartTeleconsult={handleStartTeleconsult} />
            )}

            {activeModule === 'catchment' && (
              <ANMCatchmentView />
            )}

            {activeModule === 'schedule' && (
              <ANMVisitScheduleView onStartTeleconsult={handleStartTeleconsult} />
            )}

            {activeModule === 'followups' && (
              <ANMPendingFollowupsView onStartTeleconsult={handleStartTeleconsult} />
            )}

            {activeModule === 'resolved' && (
              <ANMResolvedCasesView />
            )}

            {activeModule === 'morbidity' && (
              <ANMMorbidityTrendsView />
            )}

            {activeModule === 'analytics' && (
              <ANMFieldAnalyticsView />
            )}

            {activeModule === 'live_teleconsult' && (
              <TeleconsultationSuite
                patientData={teleconsultPatient}
                currentUserRole="anm"
                onEndCall={() => setActiveModule(null)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
