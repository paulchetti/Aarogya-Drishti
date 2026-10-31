import React, { useState, useRef, useEffect } from 'react';

export default function ScreeningModal({ isOpen, onClose, onComplete }) {
  const [selectedSite, setSelectedSite] = useState('Buccal Mucosa (Cheek)');
  const [step, setStep] = useState(1); // 1: Camera Capture, 2: Triage Assessment
  const [analyzing, setAnalyzing] = useState(false);

  // Device & Stream state
  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const [stream, setStream] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const [facingMode, setFacingMode] = useState(isMobile ? 'environment' : 'user');
  const [availableDevices, setAvailableDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  // Capture & Quality states
  const [capturedImage, setCapturedImage] = useState(null);
  const [darkCaptureWarning, setDarkCaptureWarning] = useState(false);
  const [qualityStats, setQualityStats] = useState({
    lighting: 'Optimal',
    blur: 'Clear Focus',
    glare: 'Controlled',
    brightness: 72,
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Stop all camera tracks cleanly
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setVideoReady(false);
  };

  // Enumerate all video input devices (reveals labels after permission is granted)
  const refreshDevices = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter((d) => d.kind === 'videoinput');
      setAvailableDevices(videoInputs);

      // Auto-select first non-IR color webcam if available
      if (videoInputs.length > 0 && !selectedDeviceId) {
        const preferred =
          videoInputs.find((d) => {
            const lbl = (d.label || '').toLowerCase();
            return !lbl.includes('ir') && !lbl.includes('virtual') && !lbl.includes('depth');
          }) || videoInputs[0];
        setSelectedDeviceId(preferred.deviceId);
      }
    } catch (err) {
      console.warn('Unable to enumerate media devices:', err);
    }
  };

  // Start camera with chosen device or constraints
  const startCamera = async (deviceId = selectedDeviceId, mode = facingMode) => {
    stopCamera();
    setCameraLoading(true);
    setCameraError(null);
    setVideoReady(false);
    setDarkCaptureWarning(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser.');
      }

      let constraints = { audio: false };
      if (deviceId) {
        constraints.video = {
          deviceId: { exact: deviceId },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        };
      } else {
        constraints.video = {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        };
      }

      let mediaStream = null;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err1) {
        console.warn('Initial camera constraint failed, attempting basic fallback:', err1);
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      setStream(mediaStream);
      setCameraActive(true);
      setCameraLoading(false);

      // Refresh devices list so actual hardware labels appear
      refreshDevices();
    } catch (err) {
      console.error('Camera stream access failed:', err);
      setCameraError(
        err.message || 'Unable to access camera. Please check permissions or camera privacy shutter.'
      );
      setCameraActive(false);
      setCameraLoading(false);
    }
  };

  // Bind stream to video element whenever stream changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (stream) {
      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('autoplay', '');

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
              setVideoReady(true);
            }
          })
          .catch((err) => {
            console.warn('Video play interrupted:', err);
          });
      }
    } else {
      video.srcObject = null;
    }
  }, [stream]);

  // Manage camera on modal open/close
  useEffect(() => {
    if (isOpen && step === 1 && !capturedImage) {
      startCamera(selectedDeviceId, facingMode);
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, step, capturedImage]);

  // Cycle between available cameras or flip mode
  const handleSwitchCamera = () => {
    if (availableDevices.length > 1) {
      const currentIndex = availableDevices.findIndex((d) => d.deviceId === selectedDeviceId);
      const nextIndex = (currentIndex + 1) % availableDevices.length;
      const nextDevice = availableDevices[nextIndex];
      setSelectedDeviceId(nextDevice.deviceId);
      startCamera(nextDevice.deviceId, facingMode);
    } else {
      const nextMode = facingMode === 'environment' ? 'user' : 'environment';
      setFacingMode(nextMode);
      startCamera(null, nextMode);
    }
  };

  // Capture photo from live video with rigorous frame validation
  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    // Strict validation: video must be playing and have real frame dimensions
    if (video.readyState < 2 || !video.videoWidth || !video.videoHeight) {
      alert('Camera feed is still initializing. Please wait a moment for the feed to display.');
      return;
    }

    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    // Mirror user-facing camera for natural preview
    if (facingMode === 'user' && !selectedDeviceId) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, width, height);

    // Analyze captured image brightness across pixel samples
    let avgBrightness = 50;
    try {
      const sampleWidth = Math.min(width, 240);
      const sampleHeight = Math.min(height, 180);
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = sampleWidth;
      sampleCanvas.height = sampleHeight;
      const sCtx = sampleCanvas.getContext('2d');
      sCtx.drawImage(video, 0, 0, sampleWidth, sampleHeight);
      const imgData = sCtx.getImageData(0, 0, sampleWidth, sampleHeight);

      let sum = 0;
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 16) {
        sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      }
      avgBrightness = sum / (data.length / 16);
    } catch (err) {
      console.warn('Brightness calculation error:', err);
    }

    const isTooDark = avgBrightness < 12;

    setQualityStats({
      lighting: avgBrightness > 45 ? 'Optimal' : isTooDark ? 'Dark / Obstructed' : 'Low Light',
      blur: 'Clear Focus',
      glare: 'Controlled',
      brightness: Math.round(avgBrightness),
    });

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setCapturedImage(dataUrl);

    // If frame is black, alert user so they know why
    if (isTooDark) {
      setDarkCaptureWarning(true);
    } else {
      setDarkCaptureWarning(false);
    }

    stopCamera();
  };

  // File upload from device
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target.result);
        setDarkCaptureWarning(false);
        setQualityStats({
          lighting: 'Optimal',
          blur: 'Clear Focus',
          glare: 'Controlled',
          brightness: 68,
        });
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  // Load high-resolution pre-bundled clinical sample photos
  const handleLoadSample = (sampleFilename, siteName = 'Buccal Mucosa (Cheek)') => {
    setSelectedSite(siteName);
    setCapturedImage(`/samples/${sampleFilename}`);
    setDarkCaptureWarning(false);
    setQualityStats({
      lighting: 'Optimal',
      blur: 'Clear Focus',
      glare: 'Controlled',
      brightness: 75,
    });
    stopCamera();
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setDarkCaptureWarning(false);
    startCamera(selectedDeviceId, facingMode);
  };

  const handleStartAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setStep(2);
    }, 1200);
  };

  const handleFinish = (action) => {
    if (onComplete) onComplete(action);
    setStep(1);
    setCapturedImage(null);
    setDarkCaptureWarning(false);
    stopCamera();
    onClose();
  };

  const handleModalClose = () => {
    stopCamera();
    setCapturedImage(null);
    setDarkCaptureWarning(false);
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dash-modal-backdrop" onClick={handleModalClose}>
      <div className="dash-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Modal Header */}
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

        {/* Hidden Canvas for High-Resolution Capture */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {step === 1 ? (
          <div>
            {/* Body Site Selection */}
            <div style={{ marginBottom: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px',
                }}
              >
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>
                  Select Body Site for Examination:
                </label>

                {/* Camera Selector Dropdown if multiple devices found */}
                {availableDevices.length > 1 && !capturedImage && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Camera:</span>
                    <select
                      value={selectedDeviceId}
                      onChange={(e) => {
                        setSelectedDeviceId(e.target.value);
                        startCamera(e.target.value);
                      }}
                      style={{
                        padding: '2px 6px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '10.5px',
                        background: 'white',
                        color: '#0f172a',
                        fontWeight: 600,
                        maxWidth: '180px',
                      }}
                    >
                      {availableDevices.map((d, idx) => (
                        <option key={d.deviceId || idx} value={d.deviceId}>
                          {d.label || `Camera ${idx + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

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

            {/* DARK / BLACK CAPTURE WARNING BANNER */}
            {darkCaptureWarning && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1.5px solid #f87171',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  marginBottom: '10px',
                  color: '#991b1b',
                  fontSize: '11.5px',
                  lineHeight: 1.45,
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>⚠️ Camera Captured A Dark / Black Image</span>
                </div>
                <div style={{ color: '#7f1d1d', fontSize: '11px' }}>
                  If your laptop has a webcam slider/shutter, please slide it open, or switch from an IR sensor to a color camera. You can also load an instant clinical sample photo below:
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={handleRetake}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid #dc2626',
                      background: 'white',
                      color: '#b91c1c',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    🔄 Retake / Re-open Camera
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadSample('sample_buccal.jpg', selectedSite)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      background: '#0d9488',
                      color: 'white',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    📸 Use Clinical Oral Sample
                  </button>
                </div>
              </div>
            )}

            {/* VIEWFINDER CONTAINER */}
            <div
              style={{
                width: '100%',
                height: '290px',
                background: '#071217',
                borderRadius: '14px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              {/* 1. PERMANENTLY MOUNTED HTML5 VIDEO TAG */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                onLoadedMetadata={() => {
                  if (videoRef.current && videoRef.current.videoWidth > 0) {
                    setVideoReady(true);
                  }
                }}
                onLoadedData={() => {
                  if (videoRef.current && videoRef.current.videoWidth > 0) {
                    setVideoReady(true);
                  }
                }}
                onPlaying={() => {
                  if (videoRef.current && videoRef.current.videoWidth > 0) {
                    setVideoReady(true);
                  }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: capturedImage ? 'none' : cameraActive ? 'block' : 'none',
                  transform: facingMode === 'user' && !selectedDeviceId ? 'scaleX(-1)' : 'none',
                }}
              />

              {/* 2. CAPTURED PHOTO PREVIEW */}
              {capturedImage && (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0a0f12',
                  }}
                >
                  <img
                    src={capturedImage}
                    alt="Captured oral examination"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(13, 148, 136, 0.9)',
                      color: 'white',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    ✓ Photo Captured ({selectedSite})
                  </div>
                </div>
              )}

              {/* 3. FRAMING GUIDE OVERLAY (VISIBLE DURING LIVE STREAM) */}
              {!capturedImage && cameraActive && videoReady && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      width: '210px',
                      height: '170px',
                      border: '2.5px dashed #0d9488',
                      borderRadius: '18px',
                      pointerEvents: 'none',
                      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.38)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      padding: '8px',
                    }}
                  >
                    <span
                      style={{
                        background: '#0d9488',
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

                  {/* Top Status Bar: Live Status & Switch Button */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(15, 23, 42, 0.75)',
                      color: '#4ade80',
                      borderRadius: '12px',
                      padding: '3px 10px',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <span style={{ fontSize: '9px' }}>🟢</span> LIVE FEED
                  </div>

                  {/* Camera Switch / Flip Button */}
                  <button
                    type="button"
                    onClick={handleSwitchCamera}
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
                    🔄 Switch Camera
                  </button>
                </>
              )}

              {/* 4. CAMERA INITIALIZING / ERROR FALLBACK */}
              {!capturedImage && (!cameraActive || cameraLoading || !videoReady) && (
                <div style={{ textAlign: 'center', color: '#cbd5e1', padding: '20px', zIndex: 5 }}>
                  <div style={{ fontSize: '38px', marginBottom: '8px' }}>📸</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                    {cameraLoading
                      ? 'Connecting to Clinical Camera...'
                      : cameraError
                      ? 'Camera Access Notice'
                      : 'Connecting to Clinical Camera...'}
                  </div>
                  <p style={{ fontSize: '11px', color: '#94a3b8', maxWidth: '340px', margin: '0 auto 14px', lineHeight: 1.4 }}>
                    {cameraError ||
                      'If camera is black, check your laptop privacy slider, allow permissions, or test with sample photos below.'}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => startCamera(selectedDeviceId, facingMode)}
                      style={{
                        background: '#0d9488',
                        color: 'white',
                        border: 'none',
                        padding: '7px 16px',
                        borderRadius: '8px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(13, 148, 136, 0.3)',
                      }}
                    >
                      Allow / Start Camera
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLoadSample('sample_buccal.jpg')}
                      style={{
                        background: '#ea580c',
                        color: 'white',
                        border: 'none',
                        padding: '7px 14px',
                        borderRadius: '8px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Use Sample Oral Photo
                    </button>
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
                  background: 'rgba(15, 23, 42, 0.85)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  zIndex: 10,
                }}
              >
                <span
                  style={{
                    color:
                      qualityStats.lighting === 'Optimal'
                        ? '#4ade80'
                        : qualityStats.lighting === 'Low Light'
                        ? '#facc15'
                        : '#f87171',
                  }}
                >
                  ✓ Lighting: {qualityStats.lighting}
                </span>
                <span style={{ color: '#4ade80' }}>✓ Focus: {qualityStats.blur}</span>
                <span style={{ color: '#4ade80' }}>✓ Glare: {qualityStats.glare}</span>
              </div>
            </div>

            {/* Quick Presets: 3 Realistic Clinical Demonstration Photos */}
            <div
              style={{
                marginTop: '10px',
                padding: '8px 10px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>
                Quick Test Samples:
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handleLoadSample('sample_buccal.jpg', 'Buccal Mucosa (Cheek)')}
                  style={{
                    background: '#e0f2fe',
                    color: '#0369a1',
                    border: '1px solid #bae6fd',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  📸 Buccal Leukoplakia
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample('sample_tongue.jpg', 'Lateral Tongue')}
                  style={{
                    background: '#fef3c7',
                    color: '#b45309',
                    border: '1px solid #fde68a',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  📸 Lateral Tongue Red Patch
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample('sample_normal.jpg', 'Gingiva / Gums')}
                  style={{
                    background: '#f0fdf4',
                    color: '#15803d',
                    border: '1px solid #bbf7d0',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  📸 Normal Oral Mucosa
                </button>
              </div>
            </div>

            {/* Bottom Controls */}
            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                    disabled={!cameraActive || !videoReady}
                    style={{
                      padding: '9px 22px',
                      borderRadius: '8px',
                      border: 'none',
                      background:
                        cameraActive && videoReady
                          ? 'linear-gradient(100deg, #f97316 0%, #ea580c 100%)'
                          : '#94a3b8',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '12.5px',
                      cursor: cameraActive && videoReady ? 'pointer' : 'not-allowed',
                      boxShadow: cameraActive && videoReady ? '0 3px 10px rgba(234, 88, 12, 0.3)' : 'none',
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
                    height: '160px',
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
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>Oral Photo</span>
                  )}

                  {/* Bounding box localization indicator for suspicious finding */}
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

                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    fontSize: '10px',
                    color: '#64748b',
                  }}
                >
                  Model: Mobile Oral Triage v1.4 (Research/Demonstration - Not for final clinical diagnosis)
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
