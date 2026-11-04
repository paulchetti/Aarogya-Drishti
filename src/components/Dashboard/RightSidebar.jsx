import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  UserPlusIcon,
  CameraIcon,
  SearchIcon,
  CalendarIcon,
  AIIcon,
  ReportsIcon,
  HelpIcon,
  HeartPulseIcon,
} from '../Icons';

export default function RightSidebar({ onActionClick }) {
  const { language } = useLanguage();

  return (
    <aside className="dash-right-col">
      {/* Hero Card: Care Outreach */}
      <div className="early-detection-hero">
        <div className="hero-photo-layer">
          <img
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=85"
            alt="Rural health community"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=85";
            }}
          />
        </div>

        <div className="hero-gradient-overlay" />

        <div className="hero-content">
          <h3>
            {language === 'te' ? (
              <>
                ముందస్తు గుర్తింపు <br />
                <span>ప్రాణాలను కాపాడుతుంది</span>
              </>
            ) : (
              <>
                Early Detection <br />
                <span>Saves Lives</span>
              </>
            )}
          </h3>
          <p>
            {language === 'te'
              ? 'గ్రామీణ ప్రజలను స్పెషలిస్ట్ వైద్యంతో అనుసంధానించడం'
              : 'Connecting Rural Communities to Specialist Care'}
          </p>
        </div>
      </div>

      {/* 4 Action Buttons mapped to exact requested terms */}
      <div className="action-buttons-group">
        <button
          type="button"
          className="btn-action-hero orange-grad"
          onClick={() => onActionClick('direct-registration')}
          title={language === 'te' ? 'ప్రత్యక్ష రోగి నమోదు (వాక్-ఇన్)' : 'Direct / Walk-in Registration'}
        >
          <div className="btn-left">
            <UserPlusIcon className="w-4 h-4" />
            <span>{language === 'te' ? 'ప్రత్యక్ష రోగి నమోదు (వాక్-ఇన్)' : 'Direct / Walk-in Registration'}</span>
          </div>
          <span className="btn-chevron">›</span>
        </button>

        <button
          type="button"
          className="btn-action-hero teal-grad"
          onClick={() => onActionClick('diagnostic-triage')}
          title={language === 'te' ? 'నోటి పరీక్ష & ఏఐ ట్రయాజ్ అంచనా' : 'Diagnostic & Triage Assessment'}
        >
          <div className="btn-left">
            <CameraIcon className="w-4 h-4" />
            <span>{language === 'te' ? 'నోటి పరీక్ష & ఏఐ ట్రయాజ్ అంచనా' : 'Diagnostic & Triage Assessment'}</span>
          </div>
          <span className="btn-chevron">›</span>
        </button>

        <button
          type="button"
          className="btn-action-hero white-card"
          onClick={() => onActionClick('initiate-referral')}
          title={language === 'te' ? 'రెఫరల్ అభ్యర్థన ప్రారంభించండి' : 'Initiate Referral Request'}
        >
          <div className="btn-left">
            <SearchIcon className="w-4 h-4" style={{ color: '#0d9488' }} />
            <span>{language === 'te' ? 'రెఫరల్ అభ్యర్థన ప్రారంభించండి' : 'Initiate Referral Request'}</span>
          </div>
          <span className="btn-chevron" style={{ color: '#94a3b8' }}>›</span>
        </button>

        <button
          type="button"
          className="btn-action-hero white-card"
          onClick={() => onActionClick('appointment-scheduling')}
          title={language === 'te' ? 'అపాయింట్‌మెంట్లు & షెడ్యూలింగ్' : 'Appointment Scheduling & Slot Management'}
        >
          <div className="btn-left">
            <CalendarIcon className="w-4 h-4" style={{ color: '#ea580c' }} />
            <span>{language === 'te' ? 'అపాయింట్‌మెంట్లు & షెడ్యూలింగ్' : 'Appointment Scheduling & Slot Management'}</span>
          </div>
          <span className="btn-chevron" style={{ color: '#94a3b8' }}>›</span>
        </button>
      </div>

      {/* Quick Links Card mapped to exact terms */}
      <div className="quick-links-card">
        <h4>{language === 'te' ? 'శీఘ్ర లింకులు' : 'Quick Links'}</h4>
        <div className="quick-links-list">
          <button
            type="button"
            className="quick-link-row"
            onClick={() => onActionClick('virtual-consultation-queue')}
            title={language === 'te' ? 'వీడియో టెలికన్సల్టేషన్ క్యూ' : 'Virtual Consultation Queue'}
          >
            <div className="quick-link-icon-circle">
              <AIIcon className="w-4 h-4" />
            </div>
            <span>{language === 'te' ? 'వీడియో టెలికన్సల్టేషన్ క్యూ' : 'Virtual Consultation Queue'}</span>
          </button>

          <button
            type="button"
            className="quick-link-row"
            onClick={() => onActionClick('facility-reports')}
            title={language === 'te' ? 'క్లినికల్ వినియోగం & నివేదికలు' : 'Facility Utilization & Clinical Reports'}
          >
            <div className="quick-link-icon-circle">
              <ReportsIcon className="w-4 h-4" />
            </div>
            <span>{language === 'te' ? 'క్లినికల్ వినియోగం & నివేదికలు' : 'Facility Utilization & Clinical Reports'}</span>
          </button>

          <button
            type="button"
            className="quick-link-row"
            onClick={() => onActionClick('clinician-profile')}
            title={language === 'te' ? 'వైద్యుల ప్రొఫైల్ & వివరాలు' : 'Clinician Profile & Credentials'}
          >
            <div className="quick-link-icon-circle">
              <HelpIcon className="w-4 h-4" />
            </div>
            <span>{language === 'te' ? 'వైద్యుల ప్రొఫైల్ & వివరాలు' : 'Clinician Profile & Credentials'}</span>
          </button>
        </div>
      </div>

      {/* Care Continuity Tracking Card */}
      <div
        className="healthy-smiles-card"
        onClick={() => onActionClick('care-continuity')}
        style={{ cursor: 'pointer' }}
        title={language === 'te' ? 'నిరంతర సంరక్షణ & లాంగిట్యూడినల్ రికార్డులు' : 'Care Continuity & Longitudinal Records'}
      >
        <div className="smiles-bg-wave" />
        <div className="smiles-icon-box">
          <HeartPulseIcon className="w-5 h-5" />
        </div>
        <div className="smiles-text">
          <strong>{language === 'te' ? 'నిరంతర సంరక్షణ ట్రాకింగ్' : 'Care Continuity Tracking'}</strong>
          <span>{language === 'te' ? 'ప్రాథమిక ఆరోగ్య కేంద్ర నెట్‌వర్క్' : 'Primary Health Centre Network'}</span>
        </div>
      </div>
    </aside>
  );
}
