import React from 'react';
import {
  User,
  ShieldCheck,
  Award,
  Key,
  Hospital,
  MapPin,
  FileCheck,
  CheckCircle,
  X,
  Stethoscope,
  LogOut,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ClinicianProfileModal({ isOpen, onClose, onSwitchDashboard, onLogout }) {
  const { language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          maxWidth: '620px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1.5px solid #e2e8f0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Doctor Badge */}
        <div
          style={{
            padding: '24px',
            borderBottom: '1.5px solid #f1f5f9',
            background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
              alt="Dr. Sandeep Kumar"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #0d9488',
                boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)',
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>
                  Dr. Sandeep Kumar
                </h3>
                <span
                  style={{
                    background: '#ccfbf1',
                    color: '#0f766e',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <ShieldCheck size={12} />
                  ABHA Verified
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                MBBS, DNB (Family Medicine) • Medical Officer
              </p>
              <span style={{ fontSize: '11px', color: '#0d9488', fontWeight: 600 }}>
                Primary Health Centre G. Madugula • ITDA Paderu
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: '#f1f5f9',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              color: '#64748b',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Credentials and Privileges Body */}
        <div style={{ padding: '24px' }}>
          {/* Statutory Registration Details */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '16px',
              marginBottom: '18px',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#475569', display: 'block', marginBottom: '10px' }}>
              {language === 'te' ? 'వైద్య మండలి నమోదు వివరాలు' : 'Statutory Licensure & ABHA Registration'}
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
              <div>
                <span style={{ color: '#64748b' }}>State Medical Council</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>Andhra Pradesh Medical Council (APMC)</div>
                <div style={{ fontSize: '11px', color: '#0d9488', fontWeight: 600 }}>Reg #: APMC-2018-84920</div>
              </div>

              <div>
                <span style={{ color: '#64748b' }}>National Health ID (ABHA)</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>91-4920-8411-2041</div>
                <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>● Active Status (Class 3 DSC)</div>
              </div>
            </div>
          </div>

          {/* Clinical Privileges Checklist */}
          <div style={{ marginBottom: '18px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#475569', display: 'block', marginBottom: '10px' }}>
              {language === 'te' ? 'క్లినికల్ అధికారాలు & బాధ్యతలు' : 'Authorized Clinical Privileges (ITDA Protocol)'}
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', fontSize: '12px' }}>
              {[
                { title: 'Level-3 Oral Pre-Cancer Triage Authority', desc: 'Can sign off on smartphone AI visual assessments', active: true },
                { title: 'Tertiary Tele-Oncology Video Referral', desc: 'Can escalate directly to Area Hospital Paderu specialist board', active: true },
                { title: 'Toluidine Blue In-Vivo Staining & Punch Biopsy Ordering', desc: 'Authorized to order local histopathology samples', active: true },
                { title: '108 Feeder Ambulance & ITDA Transport Voucher Signatory', desc: 'Empowered to disburse emergency transport funding', active: true },
              ].map((priv, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <CheckCircle size={16} color="#16a34a" />
                  <div>
                    <strong style={{ display: 'block', color: '#0f172a' }}>{priv.title}</strong>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{priv.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
            {onSwitchDashboard && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchDashboard('specialist_dashboard');
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: '#334155',
                }}
              >
                🔬 Switch to Specialist View
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                border: 'none',
                background: '#0f172a',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {language === 'te' ? 'మూసివేయి' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
