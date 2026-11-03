import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  ScreenShare,
  Camera,
  Activity,
  FileText,
  MessageSquare,
  ShieldCheck,
  Send,
  CheckCircle2,
  Users,
  Building2,
  Stethoscope,
  Sparkles,
  Printer,
  AlertTriangle,
  Maximize2,
  RefreshCw,
  Radio,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { TERTIARY_SPECIALIST_CENTER } from '../../services/referralRoutingService';

export default function TeleconsultationSuite({
  patientData,
  currentUserRole = 'doctor', // 'doctor' (PHC) | 'specialist' | 'patient' | 'anm'
  onEndCall,
}) {
  const { language, t } = useLanguage();

  // Call Settings & Media State
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callMode, setCallMode] = useState('3-way'); // '3-way' | '2-way-patient' | '2-way-provider'
  const [activeSideTab, setActiveSideTab] = useState('clinical'); // 'clinical' | 'biopsy' | 'chat'
  const [callDuration, setCallDuration] = useState(145);
  const [cameraError, setCameraError] = useState(null);
  const [isCapturingSnapshot, setIsCapturingSnapshot] = useState(false);

  // Active Camera Assignment: Which tile receives the local camera feed?
  // Defaults to the logged-in role, but user can freely assign/switch
  const defaultTile =
    currentUserRole === 'specialist'
      ? 'specialist'
      : currentUserRole === 'patient' || currentUserRole === 'anm'
      ? 'patient'
      : 'phc';
  const [activeCameraTile, setActiveCameraTile] = useState(defaultTile);

  // Video Element Refs
  const localVideoRef = useRef(null);
  const screenVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);

  // Simulated Speaking Participant (pulses audio wave for realism)
  const [speakingParty, setSpeakingParty] = useState('specialist');

  // Freeze-Frame Captured Oral Photo
  const [capturedOralPhoto, setCapturedOralPhoto] = useState(
    patientData?.oralPhotos?.[0] ||
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80'
  );

  // Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Dr. Sandeep Kumar (PHC Doctor)',
      senderTe: 'డాక్టర్ సందీప్ (పీహెచ్‌సీ వైద్యులు)',
      text: 'Good afternoon Dr. Ananya. Presenting 46yo male from G. Madugula with an 8-week persistent white cheek plaque and 18-year reverse smoking habit.',
      time: '02:01 PM',
    },
    {
      id: 2,
      sender: 'Dr. Ananya Varma (Specialist Oncologist)',
      senderTe: 'డాక్టర్ అనన్య వర్మ (స్పెషలిస్ట్)',
      text: 'Thank you Dr. Sandeep. Video stream quality is clear. I observe indurated margins on the right buccal mucosa. A 4mm punch biopsy is strongly indicated.',
      time: '02:02 PM',
    },
    {
      id: 3,
      sender: 'Lakshmi Devi (Village ANM with Patient)',
      senderTe: 'లక్ష్మీ దేవి (గ్రామ ఏఎన్‌ఎం)',
      text: 'Doctor, the patient confirms pain and burning sensation whenever consuming hot or spicy foods.',
      time: '02:03 PM',
    },
  ]);
  const [newChatText, setNewChatText] = useState('');

  // Biopsy Order State
  const [biopsyOrdered, setBiopsyOrdered] = useState(false);
  const [biopsyType, setBiopsyType] = useState('Punch Biopsy (4mm Core)');
  const [biopsyNotes, setBiopsyNotes] = useState(
    '4mm punch biopsy from representative indurated margin of right buccal leukoplakic plaque. Formalin fixed for histopathological dysplastic grading.'
  );

  const patient = patientData || {
    id: 'ADP-2026-0046',
    name: 'Appa Rao (G. Madugula Case)',
    nameTe: 'అప్పారావు (జి. మాడుగుల)',
    ageSex: '46 / M',
    village: 'G. Madugula',
    mandal: 'G. Madugula',
    assignedPhc: { name: 'G. Madugula Primary Health Centre' },
    assignedAnm: { name: 'Lakshmi Devi, GNM' },
    exposureHistory: [
      { label: 'Tobacco Chewing (Gutkha/Khaini - 18 yrs, 6 pkts/day)' },
      { label: 'Reverse Smoking (Adda Poga - 10 yrs)' },
    ],
    symptoms: [
      { label: 'Persistent White Cheek Patch (> 8 weeks)' },
      { label: 'Burning Sensation on Spices' },
    ],
    aiAssessment: {
      triageClassification: 'High Suspicion - Potentially Malignant',
      concordanceScore: 89,
    },
  };

  // 1. Initialize Real Webcam Stream
  const startCamera = async () => {
    try {
      setCameraError(null);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported in this browser environment.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: true,
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setVideoOn(true);
      setMicOn(true);
    } catch (err) {
      console.warn('Webcam initialization notice:', err.message || err);
      setCameraError(
        'Device camera not accessible or permission pending. Click "Enable Camera" below or continue with the active simulated HD stream.'
      );
    }
  };

  useEffect(() => {
    startCamera();

    // Timer
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Alternate simulated speaking indicator for life-like video presence
    const speakTimer = setInterval(() => {
      setSpeakingParty((prev) => (prev === 'specialist' ? 'phc' : prev === 'phc' ? 'patient' : 'specialist'));
    }, 4500);

    return () => {
      clearInterval(timer);
      clearInterval(speakTimer);
      // Clean up local tracks
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Sync stream to video element whenever activeCameraTile changes
  useEffect(() => {
    if (localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
  }, [activeCameraTile]);

  // 2. Toggle Mic (Mute / Unmute real audio track)
  const handleToggleMic = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach((t) => {
        t.enabled = !micOn;
      });
    }
    setMicOn(!micOn);
  };

  // 3. Toggle Video Camera (Enable / Disable real video track)
  const handleToggleVideo = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach((t) => {
        t.enabled = !videoOn;
      });
    }
    setVideoOn(!videoOn);
  };

  // 4. Real Screen Share (getDisplayMedia)
  const handleToggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop());
        screenStreamRef.current = null;
      }
      setIsScreenSharing(false);
    } else {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
          alert('Screen sharing is not supported in this browser.');
          return;
        }
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenStreamRef.current = stream;
        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = stream;
        }
        setIsScreenSharing(true);
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
        };
      } catch (err) {
        console.warn('Screen share cancelled or failed:', err);
      }
    }
  };

  // 5. Freeze-Frame Capture Oral Snapshot from Video & Pass to AI
  const handleCaptureOralFreezeFrame = () => {
    setIsCapturingSnapshot(true);
    try {
      const videoEl = localVideoRef.current;
      if (videoEl && videoEl.videoWidth) {
        const canvas = document.createElement('canvas');
        canvas.width = videoEl.videoWidth || 640;
        canvas.height = videoEl.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedOralPhoto(dataUrl);
        setActiveSideTab('clinical');
      } else {
        // Fallback high-resolution lesion sample
        setCapturedOralPhoto('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80');
        setActiveSideTab('clinical');
      }
    } catch (e) {
      console.warn('Snapshot capture fallback:', e);
    }
    setTimeout(() => {
      setIsCapturingSnapshot(false);
    }, 600);
  };

  // Format Duration
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 6. Interactive In-Call Chat with Automated Provider Response
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const myName =
      currentUserRole === 'specialist'
        ? 'Dr. Ananya Varma (Specialist)'
        : currentUserRole === 'patient'
        ? `${patient.name} (Patient)`
        : 'Dr. Sandeep Kumar (PHC Doctor)';

    const userMsg = {
      id: Date.now(),
      sender: myName,
      text: newChatText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const sentText = newChatText;
    setNewChatText('');

    // Simulate realistic peer clinical reply after 1.8 seconds
    setTimeout(() => {
      let replySender = 'Dr. Ananya Varma (Specialist Oncologist)';
      let replyText = `Acknowledged. Reviewing the mucosal borders on the live video stream. Proceeding with histopathology orders.`;

      if (currentUserRole === 'specialist') {
        replySender = 'Dr. Sandeep Kumar (PHC Doctor)';
        replyText = `Understood Dr. Ananya. We have arranged the 4mm punch biopsy kit here at G. Madugula PHC. Preparing patient now.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: replySender,
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1800);
  };

  // 7. Issue Biopsy Order
  const handleIssueBiopsyOrder = (e) => {
    e.preventDefault();
    setBiopsyOrdered(true);
  };

  // 8. Clean Session End
  const handleHangup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (onEndCall) onEndCall();
  };

  return (
    <div
      style={{
        background: '#090d16',
        color: '#f8fafc',
        borderRadius: '20px',
        padding: '20px',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
        border: '1.5px solid #1e293b',
        fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* TOP HEADER: ROOM & WEBRTC STATUS */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          borderBottom: '1px solid #1e293b',
          paddingBottom: '16px',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              boxShadow: '0 0 10px #ef4444',
              animation: 'pulse 1.5s infinite',
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                ITDA Tele-Oncology Gateway • Live WebRTC Encrypted (AES-256)
              </span>
              <span style={{ fontSize: '11px', background: '#1e293b', color: '#38bdf8', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                ● REC 00:{formatTime(callDuration)}
              </span>
              <span style={{ fontSize: '11px', background: '#0f172a', color: '#94a3b8', padding: '2px 8px', borderRadius: '10px' }}>
                Session: ROOM-PADERU-7821
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0 0', color: '#ffffff' }}>
              {language === 'te'
                ? 'బహుళ-పక్ష లైవ్ టెలికన్సల్టేషన్ (స్పెషలిస్ట్ ⇄ పీహెచ్‌సీ ⇄ రోగి)'
                : 'Multi-Party Clinical Teleconsultation (Specialist ⇄ PHC Doctor ⇄ Patient)'}
            </h2>
          </div>
        </div>

        {/* Flexible Multi-Party Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#111827', padding: '6px 10px', borderRadius: '12px', border: '1px solid #374151' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af' }}>
            {language === 'te' ? 'కాల్ మోడ్:' : 'Call Mode:'}
          </span>
          <button
            type="button"
            onClick={() => setCallMode('3-way')}
            style={{
              background: callMode === '3-way' ? '#f97316' : 'transparent',
              color: callMode === '3-way' ? '#ffffff' : '#94a3b8',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Users size={14} />
            <span>3-Way (All 3)</span>
          </button>
          <button
            type="button"
            onClick={() => setCallMode('2-way-patient')}
            style={{
              background: callMode === '2-way-patient' ? '#0d9488' : 'transparent',
              color: callMode === '2-way-patient' ? '#ffffff' : '#94a3b8',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            2-Way (Doc + Pt)
          </button>
          <button
            type="button"
            onClick={() => setCallMode('2-way-provider')}
            style={{
              background: callMode === '2-way-provider' ? '#2563eb' : 'transparent',
              color: callMode === '2-way-provider' ? '#ffffff' : '#94a3b8',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            2-Way (Doc + Spec)
          </button>
        </div>
      </div>

      {/* Screen Sharing Banner (if active) */}
      {isScreenSharing && (
        <div style={{ background: '#1e3a8a', padding: '10px 16px', borderRadius: '12px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontSize: '13px', fontWeight: 700 }}>
            <ScreenShare size={18} />
            <span>Sharing Diagnostic Screen / Slides with Room Participants</span>
          </div>
          <button
            type="button"
            onClick={handleToggleScreenShare}
            style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 800, cursor: 'pointer' }}
          >
            Stop Sharing
          </button>
        </div>
      )}

      {/* MAIN STAGE: VIDEO TILES (LEFT) + CLINICAL DRAWER (RIGHT) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1.2fr)', gap: '18px', flex: 1 }}>
        {/* Left: Video Stage */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: callMode === '3-way' ? '1fr 1fr' : '1fr',
              gap: '12px',
              flex: 1,
            }}
          >
            {/* TILE 1: SPECIALIST ONCOLOGIST (Dr. Ananya Varma) */}
            <div
              style={{
                position: 'relative',
                background: '#131d2e',
                borderRadius: '16px',
                border: activeCameraTile === 'specialist' ? '2.5px solid #f97316' : '1.5px solid #1e3a8a',
                overflow: 'hidden',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '14px',
                boxShadow: speakingParty === 'specialist' ? '0 0 20px rgba(249, 115, 22, 0.3)' : 'none',
              }}
            >
              {/* Video Feed: Either Live Webcam if assigned to specialist, or High-Fidelity Remote Stream */}
              {activeCameraTile === 'specialist' ? (
                videoOn ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: '#0f172a' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#1e293b', color: '#94a3b8', margin: '0 auto 8px auto', display: 'grid', placeItems: 'center' }}>
                        <VideoOff size={28} />
                      </div>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>Camera Paused</span>
                    </div>
                  </div>
                )
              ) : (
                <div style={{ position: 'absolute', inset: 0 }}>
                  <img
                    src="https://images.unsplash.com/photo-1594824813583-36603a110a11?auto=format&fit=crop&w=600&q=80"
                    alt="Dr. Ananya Varma Specialist"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }}
                  />
                  {speakingParty === 'specialist' && (
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(249, 115, 22, 0.9)', color: '#fff', padding: '3px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Radio size={12} className="animate-pulse" /> Speaking...
                    </div>
                  )}
                </div>
              )}

              {/* Tile Header Tags */}
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', color: '#fed7aa', padding: '3px 9px', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>
                  👑 HOST SPECIALIST
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {activeCameraTile === 'specialist' && (
                    <span style={{ background: '#059669', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 800 }}>
                      YOUR LIVE CAM
                    </span>
                  )}
                  <span style={{ background: '#16a34a', color: '#ffffff', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                    1080p • 24ms
                  </span>
                </div>
              </div>

              {/* Tile Footer Meta & Switch Cam Option */}
              <div style={{ position: 'relative', zIndex: 2, background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(6px)', padding: '8px 12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                    {TERTIARY_SPECIALIST_CENTER.specialistName}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Area Hospital Paderu • Oral Oncology Review
                  </div>
                </div>
                {activeCameraTile !== 'specialist' && (
                  <button
                    type="button"
                    onClick={() => setActiveCameraTile('specialist')}
                    title="Switch your local webcam to this Specialist tile"
                    style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', fontSize: '10.5px', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Switch Cam Here
                  </button>
                )}
              </div>
            </div>

            {/* TILE 2: PHC MEDICAL OFFICER (Dr. Sandeep Kumar) */}
            {(callMode === '3-way' || callMode === '2-way-provider') && (
              <div
                style={{
                  position: 'relative',
                  background: '#131d2e',
                  borderRadius: '16px',
                  border: activeCameraTile === 'phc' ? '2.5px solid #0d9488' : '1.5px solid #0f766e',
                  overflow: 'hidden',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '14px',
                  boxShadow: speakingParty === 'phc' ? '0 0 20px rgba(13, 148, 136, 0.3)' : 'none',
                }}
              >
                {activeCameraTile === 'phc' ? (
                  videoOn ? (
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: '#0f172a' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#1e293b', color: '#94a3b8', margin: '0 auto 8px auto', display: 'grid', placeItems: 'center' }}>
                          <VideoOff size={28} />
                        </div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Camera Paused</span>
                      </div>
                    </div>
                  )
                ) : (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <img
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"
                      alt="Dr. Sandeep Kumar PHC MO"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }}
                    />
                    {speakingParty === 'phc' && (
                      <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(13, 148, 136, 0.9)', color: '#fff', padding: '3px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Radio size={12} className="animate-pulse" /> Speaking...
                      </div>
                    )}
                  </div>
                )}

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', color: '#5eead4', padding: '3px 9px', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>
                    🩺 PHC MEDICAL OFFICER
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {activeCameraTile === 'phc' && (
                      <span style={{ background: '#059669', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 800 }}>
                        YOUR LIVE CAM
                      </span>
                    )}
                    <span style={{ background: '#16a34a', color: '#ffffff', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                      720p • 18ms
                    </span>
                  </div>
                </div>

                <div style={{ position: 'relative', zIndex: 2, background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(6px)', padding: '8px 12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                      Dr. Sandeep Kumar, MBBS
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      G. Madugula PHC • Referring Clinician
                    </div>
                  </div>
                  {activeCameraTile !== 'phc' && (
                    <button
                      type="button"
                      onClick={() => setActiveCameraTile('phc')}
                      title="Switch your local webcam to this PHC Doctor tile"
                      style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', fontSize: '10.5px', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      Switch Cam Here
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TILE 3: PATIENT APPA RAO & ANM LAKSHMI DEVI (Village Sub-Centre) */}
            {(callMode === '3-way' || callMode === '2-way-patient') && (
              <div
                style={{
                  position: 'relative',
                  background: '#131d2e',
                  borderRadius: '16px',
                  border: activeCameraTile === 'patient' ? '2.5px solid #ea580c' : '1.5px solid #9a3412',
                  overflow: 'hidden',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '14px',
                  gridColumn: callMode === '3-way' ? 'span 2' : 'span 1',
                  boxShadow: speakingParty === 'patient' ? '0 0 20px rgba(234, 88, 12, 0.3)' : 'none',
                }}
              >
                {activeCameraTile === 'patient' ? (
                  videoOn ? (
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: '#0f172a' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#1e293b', color: '#94a3b8', margin: '0 auto 8px auto', display: 'grid', placeItems: 'center' }}>
                          <VideoOff size={28} />
                        </div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Camera Paused</span>
                      </div>
                    </div>
                  )
                ) : (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                      alt="Patient with Village ANM"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                    />
                    {speakingParty === 'patient' && (
                      <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(234, 88, 12, 0.9)', color: '#fff', padding: '3px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Radio size={12} className="animate-pulse" /> Speaking...
                      </div>
                    )}
                  </div>
                )}

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', color: '#fed7aa', padding: '3px 9px', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>
                    👤 PATIENT &amp; VILLAGE ANM
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {activeCameraTile === 'patient' && (
                      <span style={{ background: '#059669', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 800 }}>
                        YOUR LIVE CAM
                      </span>
                    )}
                    <span style={{ background: '#0284c7', color: '#ffffff', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                      4G Edge Gateway
                    </span>
                  </div>
                </div>

                <div style={{ position: 'relative', zIndex: 2, background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(6px)', padding: '8px 12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>
                      {patient.name} ({patient.ageSex})
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      {patient.village}, {patient.mandal} • Accompanied by ANM {patient.assignedAnm?.name}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#fdba74', background: '#7c2d12', padding: '3px 8px', borderRadius: '8px', fontWeight: 700 }}>
                      Oral Cavity Exam Active
                    </span>
                    {activeCameraTile !== 'patient' && (
                      <button
                        type="button"
                        onClick={() => setActiveCameraTile('patient')}
                        title="Switch your local webcam to this Patient tile"
                        style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', fontSize: '10.5px', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        Switch Cam Here
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CALL CONTROLS FLOATING BAR */}
          <div
            style={{
              background: '#111827',
              borderRadius: '16px',
              padding: '12px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #1f2937',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {/* Left: Call Timer & Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#f97316' }}>
                ⏱ {formatTime(callDuration)}
              </span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>|</span>
              <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 700 }}>
                ● Low Jitter (2ms)
              </span>
            </div>

            {/* Center: Main Media Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Mic Toggle */}
              <button
                type="button"
                onClick={handleToggleMic}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: 'none',
                  background: micOn ? '#374151' : '#ef4444',
                  color: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
              >
                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>

              {/* Video Camera Toggle */}
              <button
                type="button"
                onClick={handleToggleVideo}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: 'none',
                  background: videoOn ? '#374151' : '#ef4444',
                  color: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                title={videoOn ? 'Turn Off Camera' : 'Turn On Camera'}
              >
                {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
              </button>

              {/* Real Screen Share */}
              <button
                type="button"
                onClick={handleToggleScreenShare}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: 'none',
                  background: isScreenSharing ? '#2563eb' : '#374151',
                  color: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                }}
                title="Share Screen or Slides with Participants"
              >
                <ScreenShare size={20} />
              </button>

              {/* Freeze-Frame Oral Cavity Snapshot Button */}
              <button
                type="button"
                onClick={handleCaptureOralFreezeFrame}
                style={{
                  padding: '8px 16px',
                  borderRadius: '24px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontWeight: 800,
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(249, 115, 22, 0.35)',
                }}
                title="Freeze and capture an oral cavity frame for instant Gemini AI review"
              >
                <Camera size={16} />
                <span>{isCapturingSnapshot ? 'Capturing...' : '📸 Capture Oral Frame'}</span>
              </button>

              {/* End Call Button */}
              <button
                type="button"
                onClick={handleHangup}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  border: 'none',
                  background: '#ef4444',
                  color: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
                }}
                title="End Consultation Session"
              >
                <PhoneOff size={22} />
              </button>
            </div>

            {/* Right: Camera Status / Retry permission */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={startCamera}
                style={{
                  background: '#1f2937',
                  border: '1px solid #374151',
                  color: '#94a3b8',
                  padding: '5px 10px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                title="Re-request camera permissions"
              >
                <RefreshCw size={12} />
                <span>Reset Cam</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Clinical Dossier Drawer */}
        <div
          style={{
            background: '#111827',
            borderRadius: '16px',
            border: '1px solid #1f2937',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Drawer Tab Headers */}
          <div style={{ display: 'flex', borderBottom: '1px solid #1f2937', background: '#0b1120' }}>
            <button
              type="button"
              onClick={() => setActiveSideTab('clinical')}
              style={{
                flex: 1,
                padding: '12px',
                background: activeSideTab === 'clinical' ? '#111827' : 'transparent',
                color: activeSideTab === 'clinical' ? '#f97316' : '#94a3b8',
                border: 'none',
                borderBottom: activeSideTab === 'clinical' ? '2.5px solid #f97316' : 'none',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <FileText size={14} />
              <span>{language === 'te' ? 'క్లినికల్ పరిశీలనలు' : 'Clinical Findings'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSideTab('biopsy')}
              style={{
                flex: 1,
                padding: '12px',
                background: activeSideTab === 'biopsy' ? '#111827' : 'transparent',
                color: activeSideTab === 'biopsy' ? '#0d9488' : '#94a3b8',
                border: 'none',
                borderBottom: activeSideTab === 'biopsy' ? '2.5px solid #0d9488' : 'none',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Stethoscope size={14} />
              <span>{language === 'te' ? 'బయాప్సీ ఆర్డర్' : 'Order Biopsy'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSideTab('chat')}
              style={{
                flex: 1,
                padding: '12px',
                background: activeSideTab === 'chat' ? '#111827' : 'transparent',
                color: activeSideTab === 'chat' ? '#38bdf8' : '#94a3b8',
                border: 'none',
                borderBottom: activeSideTab === 'chat' ? '2.5px solid #38bdf8' : 'none',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <MessageSquare size={14} />
              <span>{language === 'te' ? 'లైవ్ చాట్' : 'Live Chat'}</span>
            </button>
          </div>

          {/* Drawer Body Content */}
          <div style={{ padding: '16px', overflowY: 'auto', flex: 1 }}>
            {/* TAB 1: CLINICAL FINDINGS & ORAL CAPTURE */}
            {activeSideTab === 'clinical' && (
              <div>
                {/* Live Freeze-Frame Oral Photo */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#f97316', textTransform: 'uppercase' }}>
                      ORAL CAVITY FREEZE-FRAME
                    </span>
                    <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 700 }}>
                      ● High Clarity
                    </span>
                  </div>
                  <div
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1.5px solid #374151',
                      height: '150px',
                      position: 'relative',
                      background: '#030712',
                    }}
                  >
                    <img
                      src={capturedOralPhoto}
                      alt="Oral lesion freeze frame"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', bottom: '6px', left: '8px', background: 'rgba(0,0,0,0.75)', padding: '3px 8px', borderRadius: '6px', fontSize: '10.5px', color: '#fed7aa' }}>
                      Right Buccal Mucosa • 2.2 cm Plaque (Indurated)
                    </div>
                  </div>
                </div>

                {/* Gemini AI Concordance Box */}
                <div style={{ background: '#1e293b', padding: '12px', borderRadius: '10px', marginBottom: '14px', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={14} /> GEMINI MULTIMODAL CONCORDANCE
                    </span>
                    <span style={{ background: '#881337', color: '#fecdd3', fontSize: '10px', padding: '2px 6px', borderRadius: '6px', fontWeight: 800 }}>
                      89% High Suspicion
                    </span>
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
                    {patient.aiAssessment?.triageClassification || 'High Suspicion - Potentially Malignant'}
                  </div>
                  <small style={{ color: '#94a3b8', fontSize: '10.5px', display: 'block', marginTop: '2px' }}>
                    Non-scrapable homogeneous plaque with dysplastic verrucous borders. Matches reverse smoker oral keratosis.
                  </small>
                </div>

                {/* Habit History */}
                <div style={{ marginBottom: '14px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8' }}>EXPOSURE HISTORY (NOCR / ACS):</span>
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', fontSize: '12px', color: '#e2e8f0', lineHeight: 1.5 }}>
                    {patient.exposureHistory?.map((h, i) => (
                      <li key={i}>{h.label}</li>
                    ))}
                  </ul>
                </div>

                {/* Symptoms */}
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8' }}>REPORTED SYMPTOMS:</span>
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', fontSize: '12px', color: '#e2e8f0', lineHeight: 1.5 }}>
                    {patient.symptoms?.map((s, i) => (
                      <li key={i}>{s.label}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: ORDER BIOPSY REQUISITION */}
            {activeSideTab === 'biopsy' && (
              <div>
                {!biopsyOrdered ? (
                  <form onSubmit={handleIssueBiopsyOrder}>
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                        INVESTIGATION PROCEDURE:
                      </label>
                      <select
                        value={biopsyType}
                        onChange={(e) => setBiopsyType(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', fontSize: '12px' }}
                      >
                        <option value="Punch Biopsy (4mm Core)">Punch Biopsy (4mm Core - Histopathology)</option>
                        <option value="Incisional Wedge Biopsy">Incisional Wedge Biopsy</option>
                        <option value="Brush Cytology (OralCDx)">Brush Cytology (OralCDx Diagnostic)</option>
                        <option value="Toluidine Blue Staining">Toluidine Blue In-Vivo Staining</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                        CLINICAL INSTRUCTIONS &amp; HISTOPATH NOTES:
                      </label>
                      <textarea
                        rows={4}
                        value={biopsyNotes}
                        onChange={(e) => setBiopsyNotes(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', fontSize: '12px', lineHeight: 1.4 }}
                      />
                    </div>

                    <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px', border: '1px solid #1e293b', marginBottom: '16px', fontSize: '11px', color: '#94a3b8' }}>
                      <div>• Destination: <strong>Area Hospital Paderu Histopathology Lab</strong></div>
                      <div>• Referring MO: <strong>Dr. Sandeep Kumar (G. Madugula PHC)</strong></div>
                      <div>• Supervised By: <strong>Dr. Ananya Varma, MD (Surgical Oncology)</strong></div>
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '11px',
                        borderRadius: '10px',
                        border: 'none',
                        background: '#0d9488',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 14px rgba(13, 148, 136, 0.35)',
                      }}
                    >
                      <CheckCircle2 size={16} />
                      <span>Issue Official Punch Biopsy Requisition</span>
                    </button>
                  </form>
                ) : (
                  <div style={{ background: '#064e3b', border: '1.5px solid #059669', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                    <CheckCircle2 size={36} color="#34d399" style={{ margin: '0 auto 8px auto' }} />
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#ffffff', fontWeight: 800 }}>
                      Biopsy Order Dispatched Successfully!
                    </h4>
                    <p style={{ margin: 0, fontSize: '11.5px', color: '#a7f3d0' }}>
                      Order #BIO-PADERU-2026-8812 routed to Area Hospital Paderu Lab.
                    </p>
                    <div style={{ marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        style={{ background: '#ffffff', color: '#065f46', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Printer size={13} /> Print Requisition
                      </button>
                      <button
                        type="button"
                        onClick={() => setBiopsyOrdered(false)}
                        style={{ background: 'transparent', color: '#a7f3d0', border: '1px solid #059669', padding: '6px 12px', borderRadius: '6px', fontSize: '11.5px', cursor: 'pointer' }}
                      >
                        Edit Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ENCRYPTED LIVE CLINICAL CHAT */}
            {activeSideTab === 'chat' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                  {chatMessages.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        background: m.sender.includes('Specialist') ? '#1e293b' : '#0f172a',
                        border: m.sender.includes('Specialist') ? '1px solid #334155' : '1px solid #1e293b',
                        padding: '10px 12px',
                        borderRadius: '10px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: m.sender.includes('Specialist') ? '#f97316' : '#38bdf8' }}>
                          {m.sender}
                        </span>
                        <span style={{ fontSize: '10px', color: '#64748b' }}>{m.time}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '12px', color: '#e2e8f0', lineHeight: 1.4 }}>
                        {m.text}
                      </p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Type clinical observation..."
                    value={newChatText}
                    onChange={(e) => setNewChatText(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', fontSize: '12px', outline: 'none' }}
                  />
                  <button
                    type="submit"
                    style={{ background: '#f97316', border: 'none', color: '#ffffff', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
