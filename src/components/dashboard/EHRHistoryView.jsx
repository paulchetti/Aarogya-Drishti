import React, { useState } from 'react';
import {
  FileText,
  Pill,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  RefreshCw,
  PlusCircle,
  Activity,
  Upload,
  Eye,
  AlertTriangle,
  FolderOpen
} from 'lucide-react';
import { activePrescriptions, ehrRecords } from '../../data/mockHealthData';
import PrescriptionModal from './PrescriptionModal';

export default function EHRHistoryView({ onOpenPrescription }) {
  const [activeTab, setActiveTab] = useState('prescriptions'); // 'prescriptions' | 'records'
  const [prescriptions, setPrescriptions] = useState(activePrescriptions);
  const [records, setRecords] = useState(ehrRecords);
  const [selectedRx, setSelectedRx] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [refillNotice, setRefillNotice] = useState('');

  // Handle refill request
  const handleRequestRefill = (rxId) => {
    setPrescriptions((prev) =>
      prev.map((item) => {
        if (item.id === rxId) {
          return {
            ...item,
            refillsLeft: Math.max(0, item.refillsLeft - 1),
            daysRemaining: item.daysRemaining + 30
          };
        }
        return item;
      })
    );
    setRefillNotice('Refill request approved and sent to your preferred pharmacy!');
    setTimeout(() => setRefillNotice(''), 4000);
  };

  return (
    <div className="dashboard-content-area feature-view-container">
      {/* Feature Header */}
      <div className="feature-header">
        <div className="feature-header-left">
          <h1>EHR History & Active Prescriptions</h1>
          <p>Verified Electronic Health Records, diagnostic test reports, and active pharmaceutical regimens.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn-secondary"
            onClick={() => setShowUploadModal(true)}
          >
            <Upload size={17} />
            <span>Upload Record</span>
          </button>
          <button
            className="btn-primary"
            onClick={() => setSelectedRx(prescriptions[0])}
          >
            <FileText size={17} />
            <span>Latest Rx Slip</span>
          </button>
        </div>
      </div>

      {refillNotice && (
        <div
          style={{
            background: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #a7f3d0',
            padding: '12px 20px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          <CheckCircle size={18} color="#10b981" />
          <span>{refillNotice}</span>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveTab('prescriptions')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'prescriptions' ? '3px solid #0d9488' : '3px solid transparent',
            color: activeTab === 'prescriptions' ? '#0d9488' : '#64748b',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer'
          }}
        >
          <Pill size={18} />
          <span>Active Prescriptions ({prescriptions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('records')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'records' ? '3px solid #0d9488' : '3px solid transparent',
            color: activeTab === 'records' ? '#0d9488' : '#64748b',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer'
          }}
        >
          <FolderOpen size={18} />
          <span>EHR History & Diagnostic Reports ({records.length})</span>
        </button>
      </div>

      {/* Tab 1: Active Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
          {prescriptions.map((rx) => {
            const coursePercent = Math.min(
              100,
              Math.round(((30 - rx.daysRemaining) / 30) * 100)
            );
            return (
              <div key={rx.id} className="rx-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <Pill size={16} color="#0d9488" />
                      <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>{rx.medicine}</strong>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      Prescribed by {rx.prescribedBy} • {rx.specialty}
                    </span>
                  </div>
                  <span
                    style={{
                      background: '#e0f2fe',
                      color: '#0369a1',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '12px'
                    }}
                  >
                    {rx.dosage}
                  </span>
                </div>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', fontSize: '0.84rem' }}>
                  <div style={{ color: '#334155', marginBottom: '4px' }}>
                    <strong>Schedule:</strong> {rx.frequency} ({rx.timing})
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
                    {rx.instructions}
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>
                    <span>Course Progress ({coursePercent}%)</span>
                    <span>{rx.daysRemaining} days left</span>
                  </div>
                  <div className="rx-progress-bar">
                    <div className="rx-progress-fill" style={{ width: `${coursePercent}%` }} />
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.78rem', color: '#475569' }}>
                    Refills Left: <strong>{rx.refillsLeft}</strong>
                  </span>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                      onClick={() => setSelectedRx(rx)}
                      title="View Official Digital Prescription Slip"
                    >
                      <Eye size={13} />
                      <span>View Slip</span>
                    </button>

                    <button
                      className="btn-primary"
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      onClick={() => handleRequestRefill(rx.id)}
                      disabled={rx.refillsLeft <= 0}
                      title="Refill Medicine"
                    >
                      <RefreshCw size={13} />
                      <span>Refill Rx</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: EHR Records Timeline */}
      {activeTab === 'records' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {records.map((rec) => (
            <div
              key={rec.id}
              className="form-card"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px'
              }}
            >
              <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: '#f0fdfa',
                    color: '#0d9488',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FileText size={24} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>{rec.title}</h3>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        background: '#ecfdf5',
                        color: '#065f46',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontWeight: 600
                      }}
                    >
                      {rec.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>
                    {rec.facility} • Signed by {rec.doctor} • Date: {rec.date}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '6px' }}>
                    {rec.summary}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{rec.fileSize}</span>
                <button
                  className="btn-secondary"
                  onClick={() => setSelectedReport(rec)}
                  style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                >
                  <Eye size={14} />
                  <span>View Details</span>
                </button>
                <button
                  className="btn-primary"
                  onClick={() => alert(`Downloading verified report ${rec.title}...`)}
                  style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prescription Slip Modal */}
      {selectedRx && (
        <PrescriptionModal
          rx={selectedRx}
          onClose={() => setSelectedRx(null)}
        />
      )}

      {/* Diagnostic Report Details Modal */}
      {selectedReport && (
        <div className="modal-backdrop" onClick={() => setSelectedReport(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={22} color="#0d9488" />
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{selectedReport.title}</h3>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.86rem' }}>
                <div><strong>Lab/Facility:</strong> {selectedReport.facility}</div>
                <div><strong>Consultant:</strong> {selectedReport.doctor}</div>
                <div><strong>Recorded Date:</strong> {selectedReport.date}</div>
                <div><strong>Report Status:</strong> <span style={{ color: '#059669', fontWeight: 700 }}>{selectedReport.status}</span></div>
              </div>
            </div>

            <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem', color: '#0b3d2f' }}>Clinical Summary & Findings</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6', color: '#334155' }}>
                {selectedReport.summary}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn-secondary" onClick={() => window.print()}>
                <Download size={15} />
                <span>Print Report</span>
              </button>
              <button className="btn-primary" onClick={() => setSelectedReport(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Record Modal */}
      {showUploadModal && (
        <div className="modal-backdrop" onClick={() => setShowUploadModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '1.2rem' }}>Upload External Health Document</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
              Supported formats: PDF, JPG, DICOM (Max file size: 25MB). Auto-linked to your ABHA profile.
            </p>

            <div
              style={{
                border: '2px dashed #0d9488',
                borderRadius: '16px',
                padding: '36px',
                textAlign: 'center',
                background: '#f0fdfa',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
              onClick={() => {
                alert('File uploaded successfully! Analyzed with OCR and added to records.');
                setShowUploadModal(false);
              }}
            >
              <Upload size={36} color="#0d9488" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontWeight: 700, color: '#0b3d2f', marginBottom: '4px' }}>
                Click to browse or drop your lab report here
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Blood tests, Imaging scans, Discharge summaries
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn-secondary" onClick={() => setShowUploadModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

