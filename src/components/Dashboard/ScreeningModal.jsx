import React, { useState } from 'react';

export default function ScreeningModal({ isOpen, onClose, onComplete }) {
  const [selectedSite, setSelectedSite] = useState('Buccal Mucosa (Cheek)');
  const [step, setStep] = useState(1); // 1: Capture/Upload, 2: AI Review
  const [analyzing, setAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleStartAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setStep(2);
    }, 1200);
  };

  const handleFinish = (action) => {
    onComplete(action);
    setStep(1);
    onClose();
  };

  return (
    <div className="dash-modal-backdrop" onClick={onClose}>
      <div className="dash-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        <div className="dash-modal-header">
          <div>
            <h2>Oral Health Screening & AI Assessment</h2>
            <span style={{ fontSize: '11px', color: '#0d9488', fontWeight: 600 }}>
              Module B & C: Quality Checked Photographic Documentation
            </span>
          </div>
          <button type="button" className="close-modal-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {step === 1 ? (
          <div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                Select Body Site for Examination:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  'Buccal Mucosa (Cheek)',
                  'Lateral Tongue',
                  'Gingiva / Gums',
                  'Hard & Soft Palate',
                  'Floor of Mouth',
                ].map((site) => (
                  <button
                    key={site}
                    type="button"
                    onClick={() => setSelectedSite(site)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 600,
                      border: selectedSite === site ? '1px solid #0d9488' : '1px solid #cbd5e1',
                      background: selectedSite === site ? '#ccfbf1' : '#f8fafc',
                      color: selectedSite === site ? '#0f766e' : '#475569',
                      cursor: 'pointer',
                    }}
                  >
                    {site}
                  </button>
                ))}
              </div>
            </div>

            {/* Camera Viewfinder Mock */}
            <div
              style={{
                width: '100%',
                height: '240px',
                background: '#0f172a',
                borderRadius: '14px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '2px dashed #334155',
                color: '#cbd5e1',
              }}
            >
              {/* Framing guides */}
              <div
                style={{
                  width: '180px',
                  height: '140px',
                  border: '2px solid rgba(13, 148, 136, 0.7)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'radial-gradient(circle, rgba(244, 119, 50, 0.15) 0%, transparent 70%)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '28px' }}>📸</span>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>
                    Frame lesion in center
                  </div>
                </div>
              </div>

              {/* Quality Indicators */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  right: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '10px',
                  color: '#94a3b8',
                }}
              >
                <span style={{ color: '#22c55e' }}>✓ Lighting: Good</span>
                <span style={{ color: '#22c55e' }}>✓ Blur: Low</span>
                <span style={{ color: '#22c55e' }}>✓ Glare: Controlled</span>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: 'white',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartAnalysis}
                disabled={analyzing}
                style={{
                  padding: '9px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(100deg, #0d9488 0%, #0f766e 100%)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                {analyzing ? 'Processing AI Inference...' : 'Capture & Run AI Inference →'}
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: AI Inference & Clinical Decision */
          <div>
            <div
              style={{
                background: '#fef3c7',
                border: '1px solid #fde68a',
                padding: '10px 14px',
                borderRadius: '10px',
                marginBottom: '14px',
                fontSize: '11px',
                color: '#92400e',
                lineHeight: 1.4,
              }}
            >
              <strong>RESEARCH / DEMONSTRATION MODEL:</strong>
              <div>
                Not for independent clinical diagnosis. AI flags assist healthcare workers and do not replace physical biopsy or clinical examination.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                  AI INFERENCE FINDING
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#ea580c', marginBottom: '4px' }}>
                  Suspicious Leukoplakia (White Patch)
                </div>
                <div style={{ fontSize: '11px', color: '#475569' }}>
                  Confidence Score: <strong>78.4%</strong> (Demonstration)
                </div>
                <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                  Site: <strong>{selectedSite}</strong>
                </div>
              </div>

              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                  RECOMMENDED NEXT STEP
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f766e', marginBottom: '4px' }}>
                  Specialist Teleconsultation
                </div>
                <div style={{ fontSize: '11px', color: '#475569' }}>
                  District Hospital, ITDA Paderu Oral Oncology Unit
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleFinish('routine')}
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: 'white',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Schedule Routine Follow-up
              </button>
              <button
                type="button"
                onClick={() => handleFinish('refer')}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(100deg, #f97316 0%, #ea580c 100%)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Create Urgent Specialist Referral →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
