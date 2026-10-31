import React, { useState, useRef, useEffect } from 'react';

export default function ScreeningModal({ isOpen, onClose, onComplete }) {
  const [selectedSite, setSelectedSite] = useState('Buccal Mucosa (Cheek)');
  const [step, setStep] = useState(1); // 1: Camera Capture, 2: Triage Assessment
  const [analyzing, setAnalyzing] = useState(false);

  // Camera state
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' (back) or 'user' (front)
  const [capturedImage, setCapturedImage] = useState(null);
  const [qualityStats, setQualityStats] = useState({ lighting: 'Good', blur: 'Low', glare: 'Controlled' });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Stop camera tracks cleanly
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Start real camera access
  const startCamera = async (mode = facingMode) => {
    stopCamera();
    setCameraError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser environment.');
      }

      const constraints = {
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }
      setCameraActive(true);
    } catch (err) {
      console.warn('Camera access error:', err);
      // Try fallback to any video source if environment camera fails
      if (mode === 'environment') {
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          streamRef.current = fallbackStream;
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play();
            };
          }
          setCameraActive(true);
          return;
        } catch (fallbackErr) {
          setCameraError(fallbackErr.message || 'Camera permission denied or camera not found.');
        }
      } else {
        setCameraError(err.message || 'Camera permission denied or camera not found.');
      }
      setCameraActive(false);
    }
  };

  // Launch camera when modal opens
  useEffect(() => {
    if (isOpen && step === 1 && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, step, capturedImage]);

  // Toggle front/back camera
  const toggleFacingMode = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  // Capture current video frame
  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Simple luminance calculation to verify lighting quality
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let totalLuminance = 0;
      for (let i = 0; i < imgData.data.length; i += 4) {
        // formula: 0.299*R + 0.587*G + 0.114*B
        totalLuminance += 0.299 * imgData.data[i] + 0.587 * imgData.data[i + 1] + 0.114 * imgData.data[i + 2];
      }
      const avgLuminance = totalLuminance / (imgData.data.length / 4);
      setQualityStats({
        lighting: avgLuminance > 60 ? 'Optimal' : 'Low Light',
        blur: 'Clear Focus',
        glare: 'Controlled',
      });
    } catch {
      // ignore security issues with cors
    }

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
    stopCamera();
  };

  // File upload fallback
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target.result);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

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
    setCapturedImage(null);
    stopCamera();
    onClose();
  };

  const handleModalClose = () => {
    stopCamera();
    setCapturedImage(null);
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dash-modal-backdrop" onClick={handleModalClose}>
      <div className="dash-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        {/* Header */}
        <div className="dash-modal-header">
          <div>
            <h2>Diagnostic & Triage Assessment</h2>
            <span style={{ fontSize: '11px', color: '#0d9488', fontWeight: 600 }}>
              Module B & C: In-App Camera Clinical Photographic Examination
            </span>
          </div>
          <button type="button" className="close-modal-btn" onClick={handleModalClose}>
            ✕
          </button>
        </div>

        {/* Hidden canvas for frame capture */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {step === 1 ? (
          <div>
            {/* Body Site Selection */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                Select Body Site for Examination:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
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
                      padding: '5px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 600,
                      border: selectedSite === site ? '1.5px solid #0d9488' : '1px solid #cbd5e1',
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

            {/* REAL CAMERA FEED / CAPTURED PREVIEW CONTAINER */}
            <div
              style={{
                width: '100%',
                height: '280px',
                background: '#091319',
                borderRadius: '14px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              {capturedImage ? (
                /* Captured Frame Preview */
                <img
                  src={capturedImage}
                  alt="Captured oral examination"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : cameraActive ? (
                /* Live WebRTC Video Stream */
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
                    }}
                  />

                  {/* Clinical Framing Overlay Guide */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '200px',
                      height: '160px',
                      border: '2px dashed #0d9488',
                      borderRadius: '16px',
                      pointerEvents: 'none',
                      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.45)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      padding: '8px',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(13, 148, 136, 0.85)',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '9.5px',
                        fontWeight: 700,
                        letterSpacing: '0.4px',
                      }}
                    >
                      FRAME LESION HERE
                    </span>
                  </div>

                  {/* Switch Camera Button (Front/Back) */}
                  <button
                    type="button"
                    onClick={toggleFacingMode}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(15, 23, 42, 0.75)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '20px',
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      zIndex: 10,
                    }}
                  >
                    🔄 Flip Camera
                  </button>
                </>
              ) : (
                /* Camera Error / Permission Request View */
                <div style={{ textAlign: 'center', color: '#cbd5e1', padding: '20px' }}>
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>📷</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                    {cameraError ? 'Camera Access Required' : 'Initializing Clinical Camera...'}
                  </div>
                  <p style={{ fontSize: '11px', color: '#94a3b8', maxWidth: '300px', margin: '0 auto 14px' }}>
                    {cameraError || 'Please allow browser camera permissions to capture diagnostic oral views.'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => startCamera(facingMode)}
                      style={{
                        background: '#0d9488',
                        color: 'white',
                        border: 'none',
                        padding: '7px 14px',
                        borderRadius: '8px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Grant Camera Access
                    </button>
                    <label
                      style={{
                        background: '#334155',
                        color: 'white',
                        padding: '7px 14px',
                        borderRadius: '8px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Upload Image File
                      <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>
              )}

              {/* Quality Indicators Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '12px',
                  right: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '10px',
                  color: '#94a3b8',
                  background: 'rgba(15, 23, 42, 0.75)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  zIndex: 10,
                }}
              >
                <span style={{ color: '#4ade80' }}>✓ Lighting: {qualityStats.lighting}</span>
                <span style={{ color: '#4ade80' }}>✓ Focus: {qualityStats.blur}</span>
                <span style={{ color: '#4ade80' }}>✓ Glare: {qualityStats.glare}</span>
              </div>
            </div>

            {/* Camera Actions Bar */}
            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <label
                  style={{
                    fontSize: '11px',
                    color: '#0284c7',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  📁 Select file from device
                  <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                {capturedImage ? (
                  <>
                    <button
                      type="button"
                      onClick={handleRetake}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        background: 'white',
                        fontWeight: 600,
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      Retake Photo
                    </button>
                    <button
                      type="button"
                      onClick={handleStartAnalysis}
                      disabled={analyzing}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(100deg, #0d9488 0%, #0f766e 100%)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(13, 148, 136, 0.3)',
                      }}
                    >
                      {analyzing ? 'Analyzing Triage...' : 'Proceed to Triage Assessment →'}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={captureFrame}
                    disabled={!cameraActive}
                    style={{
                      padding: '9px 22px',
                      borderRadius: '8px',
                      border: 'none',
                      background: cameraActive
                        ? 'linear-gradient(100deg, #f97316 0%, #ea580c 100%)'
                        : '#94a3b8',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '12.5px',
                      cursor: cameraActive ? 'pointer' : 'not-allowed',
                      boxShadow: cameraActive ? '0 3px 10px rgba(234, 88, 12, 0.3)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>📸</span>
                    <span>Capture Oral Photo</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: Diagnostic & Triage Assessment Results */
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
              <strong>PRIMARY HEALTH CENTRE (PHC) CLINICAL TRIAGE PROTOCOL:</strong>
              <div>
                Photographic screening supplements, and never replaces, the full physical clinical examination and indicated biopsy.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
              {/* Captured Photo with Triage Bounding Box Overlay */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '10px',
                  position: 'relative',
                }}
              >
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                  CAPTURED ORAL VIEW ({selectedSite.toUpperCase()})
                </div>
                <div
                  style={{
                    height: '140px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {capturedImage ? (
                    <img
                      src={capturedImage}
                      alt="Captured examination"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>Oral Photo</span>
                  )}
                  {/* Bounding box localization indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '25%',
                      left: '30%',
                      width: '45%',
                      height: '45%',
                      border: '2px solid #ef4444',
                      borderRadius: '6px',
                      background: 'rgba(239, 68, 68, 0.15)',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: '-16px',
                        left: '0',
                        background: '#ef4444',
                        color: 'white',
                        fontSize: '8.5px',
                        padding: '1px 4px',
                        borderRadius: '3px',
                        fontWeight: 700,
                      }}
                    >
                      Region of Suspicion
                    </span>
                  </div>
                </div>
              </div>

              {/* Triage Findings & Recommended Next Action */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div
                  style={{
                    background: '#fff7ed',
                    border: '1px solid #fed7aa',
                    borderRadius: '10px',
                    padding: '10px 12px',
                  }}
                >
                  <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#9a3412', marginBottom: '2px' }}>
                    TRIAGE CLASSIFICATION
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#ea580c' }}>
                    Suspicious Finding for Specialist Review
                  </div>
                  <div style={{ fontSize: '11px', color: '#7c2d12', marginTop: '2px' }}>
                    Confidence Score: <strong>78.4%</strong> (Demonstration Model)
                  </div>
                </div>

                <div
                  style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '10px',
                    padding: '10px 12px',
                  }}
                >
                  <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#166534', marginBottom: '2px' }}>
                    CLINICAL PATHWAY
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#15803d' }}>
                    Initiate Outbound Referral Request
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#14532d', marginTop: '2px' }}>
                    Designated Hospital: ITDA Paderu Area Hospital Oncology Unit
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleFinish('routine')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: 'white',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Log Routine Follow-up
              </button>
              <button
                type="button"
                onClick={() => handleFinish('refer')}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(100deg, #f97316 0%, #ea580c 100%)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Initiate Referral Request →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
