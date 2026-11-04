import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  X,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Package,
  Calendar,
  Building,
  BarChart2,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getDistrictAggregateIndicators } from '../../services/referralRoutingService';

export default function FacilityUtilizationReportModal({ isOpen, onClose }) {
  const { language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedSubcentre, setSelectedSubcentre] = useState('All Sub-Centres');

  if (!isOpen) return null;

  const indicators = getDistrictAggregateIndicators();

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'SubCentre,Screenings,SuspiciousLesions,SpecialistReferrals,BiopsiesAdvised,BiopsiesCompleted,StockToluidineBlue,StockCytologyBrushes\n' +
      'G. Madugula Central,18,3,3,2,1,24,14\n' +
      'Kudumulu Hamlet,9,1,1,1,1,12,8\n' +
      'Vanabhasingi Tribal Camp,7,0,0,0,0,8,6\n' +
      'Solabham Subcentre,4,0,0,0,0,6,4\n';

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PHC_Facility_Utilization_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

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
          maxWidth: '780px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1.5px solid #e2e8f0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1.5px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#ccfbf1',
                display: 'grid',
                placeItems: 'center',
                color: '#0d9488',
              }}
            >
              <FileText size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                {language === 'te' ? 'క్లినికల్ వినియోగం & సౌకర్యాల నివేదిక' : 'Facility Utilization & Clinical Reports'}
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                {language === 'te'
                  ? 'మాడ్యూల్ J: పీహెచ్‌సీ స్క్రీనింగ్ గణాంకాలు, బయాప్సీ ట్రాకింగ్ మరియు ల్యాబ్ సరఫరా నిల్వలు'
                  : 'Module J: PHC Screening Census, Biopsy Tracking & Diagnostic Reagent Stocks'}
              </p>
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

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Top Filters */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              {['today', 'this_week', 'this_month'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelectedPeriod(p)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: selectedPeriod === p ? '1.5px solid #0d9488' : '1px solid #cbd5e1',
                    background: selectedPeriod === p ? '#f0fdfa' : '#ffffff',
                    color: selectedPeriod === p ? '#0f766e' : '#475569',
                  }}
                >
                  {p === 'today' ? (language === 'te' ? 'నేడు' : 'Today') : p === 'this_week' ? (language === 'te' ? 'ఈ వారం' : 'This Week') : (language === 'te' ? 'ఈ నెల' : 'This Month')}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={handleExportCSV}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#334155',
                }}
              >
                <Download size={14} />
                <span>Export CSV</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#334155',
                }}
              >
                <Printer size={14} />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Key Program Metric Cards (Module J Aggregates) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '22px' }}>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'te' ? 'స్క్రీనింగ్లు' : 'Total Screened'}
              </span>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>38</div>
              <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>Target: 40 (95%)</span>
            </div>

            <div style={{ background: '#fff7ed', padding: '14px', borderRadius: '12px', border: '1px solid #fed7aa' }}>
              <span style={{ fontSize: '11px', color: '#c2410c', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'te' ? 'రెడ్ ఫ్లాగ్ అసాధారణతలు' : 'Red-Flag Lesions'}
              </span>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#ea580c', margin: '4px 0' }}>4</div>
              <span style={{ fontSize: '11px', color: '#ea580c', fontWeight: 600 }}>10.5% positivity</span>
            </div>

            <div style={{ background: '#f0fdfa', padding: '14px', borderRadius: '12px', border: '1px solid #99f6e4' }}>
              <span style={{ fontSize: '11px', color: '#0f766e', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'te' ? 'స్పెషలిస్ట్ రెఫరల్స్' : 'Specialist Referrals'}
              </span>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#0d9488', margin: '4px 0' }}>4</div>
              <span style={{ fontSize: '11px', color: '#0d9488', fontWeight: 600 }}>100% initiated</span>
            </div>

            <div style={{ background: '#f0fdf4', padding: '14px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <span style={{ fontSize: '11px', color: '#166534', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'te' ? 'బయాప్సీ సిఫార్సులు' : 'Biopsies Advised'}
              </span>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#16a34a', margin: '4px 0' }}>3</div>
              <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>2 samples taken</span>
            </div>
          </div>

          {/* Diagnostic Stock & Reagent Status */}
          <div
            style={{
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: '14px',
              padding: '16px',
              marginBottom: '22px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Package size={18} color="#0d9488" />
              <strong style={{ fontSize: '13px', color: '#0f172a' }}>
                {language === 'te' ? 'క్లినికల్ రీఎజెంట్ & స్క్రీనింగ్ కిట్ నిల్వలు' : 'On-Site Diagnostic Reagents & Biopsy Consumables'}
              </strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Toluidine Blue 1% Dye</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>42 Kits Available</div>
                <span style={{ fontSize: '10px', color: '#16a34a', fontWeight: 700 }}>● Stock Sufficient</span>
              </div>
              <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Cytology Brush Kits (Orcellex)</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#ea580c' }}>18 Kits Available</div>
                <span style={{ fontSize: '10px', color: '#ea580c', fontWeight: 700 }}>⚠️ Re-order Triggered</span>
              </div>
              <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>4mm Punch Biopsy Forceps</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>12 Sterile Sets</div>
                <span style={{ fontSize: '10px', color: '#16a34a', fontWeight: 700 }}>● Autoclaved Ready</span>
              </div>
            </div>
          </div>

          {/* Sub-Centre Breakdown Table */}
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
              {language === 'te' ? 'గ్రామ ఉప-కేంద్రాల వారీగా స్క్రీనింగ్ విభజన' : 'Sub-Centre / Gram Panchayat Census'}
            </h4>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', color: '#475569', fontWeight: 700 }}>
                    <th style={{ padding: '8px 12px' }}>Sub-Centre</th>
                    <th style={{ padding: '8px 12px' }}>ANM Facilitator</th>
                    <th style={{ padding: '8px 12px' }}>Screened</th>
                    <th style={{ padding: '8px 12px' }}>Suspects</th>
                    <th style={{ padding: '8px 12px' }}>Referral Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>G. Madugula Central</td>
                    <td style={{ padding: '8px 12px' }}>ANM Lakshmi Devi</td>
                    <td style={{ padding: '8px 12px', fontWeight: 700 }}>18</td>
                    <td style={{ padding: '8px 12px', color: '#ea580c', fontWeight: 700 }}>3</td>
                    <td style={{ padding: '8px 12px', color: '#16a34a' }}>All Referred to Paderu</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>Kudumulu Tribal Hamlet</td>
                    <td style={{ padding: '8px 12px' }}>ASHA Parvathi Devi</td>
                    <td style={{ padding: '8px 12px', fontWeight: 700 }}>9</td>
                    <td style={{ padding: '8px 12px', color: '#ea580c', fontWeight: 700 }}>1</td>
                    <td style={{ padding: '8px 12px', color: '#16a34a' }}>Teleconsult Booked</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>Vanabhasingi Tribal Camp</td>
                    <td style={{ padding: '8px 12px' }}>ANM Sunitha K.</td>
                    <td style={{ padding: '8px 12px', fontWeight: 700 }}>7</td>
                    <td style={{ padding: '8px 12px', color: '#64748b' }}>0</td>
                    <td style={{ padding: '8px 12px', color: '#64748b' }}>Routine Follow-up</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>Solabham Subcentre</td>
                    <td style={{ padding: '8px 12px' }}>MPHW Govind Rao</td>
                    <td style={{ padding: '8px 12px', fontWeight: 700 }}>4</td>
                    <td style={{ padding: '8px 12px', color: '#64748b' }}>0</td>
                    <td style={{ padding: '8px 12px', color: '#64748b' }}>Routine Follow-up</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
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
            {language === 'te' ? 'మూసివేయి' : 'Close Report'}
          </button>
        </div>
      </div>
    </div>
  );
}
