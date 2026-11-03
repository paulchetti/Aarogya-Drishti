import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
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
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { TERTIARY_SPECIALIST_CENTER } from '../../services/referralRoutingService';

export default function TeleconsultationSuite({
  patientData,
  currentUserRole = 'doctor', // 'doctor' (PHC) | 'specialist' | 'patient'
  onEndCall,
}) {
  const { language } = useLanguage();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [callMode, setCallMode] = useState('3-way'); // '3-way' (Specialist + PHC + Patient) | '2-way-patient' (Specialist + Patient) | '2-way-provider' (Specialist + PHC Doctor)
  const [activeSideTab, setActiveSideTab] = useState('clinical'); // 'clinical' | 'biopsy' | 'chat'
  const [callDuration, setCallDuration] = useState(128); // seconds

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Dr. Sandeep Kumar (PHC Doctor)',
      senderTe: 'డాక్టర్ సందీప్ (పీహెచ్‌సీ వైద్యులు)',
      text: 'Good afternoon Dr. Ananya. Presenting 46yo male from G. Madugula with an 8-week persistent white cheek plaque and 18-year tobacco chew history.',
      time: '02:01 PM',
    },
    {
      id: 2,
      sender: 'Dr. Ananya Varma (Specialist Oncologist)',
      senderTe: 'డాక్టర్ అనన్య వర్మ (స్పెషలిస్ట్)',
      text: 'Thank you Dr. Sandeep. The photographic clarity of the right buccal mucosa is excellent. I observe non-homogeneous verrucous margins. We must proceed with a punch biopsy.',
      time: '02:02 PM',
    },
    {
      id: 3,
      sender: 'Lakshmi Devi (Village ANM with Patient)',
      senderTe: 'లక్ష్మీ దేవి (గ్రామ ఏఎన్‌ఎం)',
      text: 'Doctor, the patient confirms pain when eating spices and feels roughness on the inner cheek.',
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

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newChatText.trim()) return;
    const msg = {
      id: Date.now(),
      sender:
        currentUserRole === 'specialist'
          ? 'Dr. Ananya Varma (Specialist)'
          : currentUserRole === 'patient'
          ? `${patient.name} (Patient)`
          : 'Dr. Sandeep Kumar (PHC Doctor)',
      text: newChatText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages([...chatMessages, msg]);
    setNewChatText('');
  };

  const handleIssueBiopsyOrder = (e) => {
    e.preventDefault();
    setBiopsyOrdered(true);
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
      }}
    >
      {/* Top Header Bar */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                ITDA Tele-Oncology Gateway • WebRTC Encrypted (AES-256)
              </span>
              <span style={{ fontSize: '11px', background: '#1e293b', color: '#94a3b8', padding: '2px 8px', borderRadius: '10px' }}>
                Session: ROOM-PADERU-7821
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0 0', color: '#ffffff' }}>
              {language === 'te'
                ? 'బహుళ-పక్ష టెలికన్సల్టేషన్ (స్పెషలిస్ట్ ⇄ పీహెచ్‌సీ ⇄ రోగి)'
                : 'Multi-Party Clinical Teleconsultation (Specialist ⇄ PHC Doctor ⇄ Patient)'}
            </h2>
          </div>
        </div>

        {/* Flexible Multi-Party Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#111827', padding: '6px 10px', borderRadius: '12px', border: '1px solid #374151' }}>
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

      {/* Main Grid: Video Stage (Left) + Clinical Dossier Drawer (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1.2fr)', gap: '18px', flex: 1 }}>
        {/* Left: Video Tiles Stage */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: callMode === '3-way' ? '1fr 1fr' : '1fr',
              gap: '12px',
              flex: 1,
            }}
          >
            {/* Tile 1: Specialist Oncologist */}
            <div
              style={{
                position: 'relative',
                background: '#131d2e',
                borderRadius: '16px',
                border: '1.5px solid #1e3a8a',
                overflow: 'hidden',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '14px',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1594824813583-36603a110a11?auto=format&fit=crop&w=600&q=80"
                alt="Dr. Ananya Varma Specialist"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.88,
                }}
              />
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', color: '#93c5fd', padding: '3px 9px', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>
                  👑 HOST SPECIALIST
                </span>
                <span style={{ background: '#16a34a', color: '#ffffff', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                  HD 1080p
                </span>
              </div>
              <div style={{ position: 'relative', zIndex: 2, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(6px)', padding: '8px 12px', borderRadius: '10px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                  {TERTIARY_SPECIALIST_CENTER.specialistName}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Area Hospital Paderu • Surgical Oncology Review
                </div>
              </div>
            </div>

            {/* Tile 2: PHC Medical Officer (Visible in 3-way or 2-way provider) */}
            {(callMode === '3-way' || callMode === '2-way-provider') && (
              <div
                style={{
                  position: 'relative',
                  background: '#131d2e',
                  borderRadius: '16px',
                  border: '1.5px solid #0f766e',
                  overflow: 'hidden',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '14px',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"
                  alt="Dr. Sandeep Kumar PHC MO"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.88,
                  }}
                />
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', color: '#5eead4', padding: '3px 9px', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>
                    🩺 PHC MEDICAL OFFICER
                  </span>
                  <span style={{ background: '#16a34a', color: '#ffffff', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                    HD 720p
                  </span>
                </div>
                <div style={{ position: 'relative', zIndex: 2, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(6px)', padding: '8px 12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                    Dr. Sandeep Kumar, MBBS
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    G. Madugula PHC • Patient Attending Doctor
                  </div>
                </div>
              </div>
            )}

            {/* Tile 3: Patient & ANM in Village Sub-Centre (Visible in 3-way or 2-way patient) */}
            {(callMode === '3-way' || callMode === '2-way-patient') && (
              <div
                style={{
                  position: 'relative',
                  background: '#131d2e',
                  borderRadius: '16px',
                  border: '1.5px solid #ea580c',
                  overflow: 'hidden',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '14px',
                  gridColumn: callMode === '3-way' ? 'span 2' : 'span 1',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                  alt="Patient with Village ANM"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.84,
                  }}
                />
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', color: '#fed7aa', padding: '3px 9px', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>
                    👤 PATIENT & VILLAGE ANM
                  </span>
                  <span style={{ background: '#0284c7', color: '#ffffff', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                    4G Tribal Edge
                  </span>
                </div>
                <div style={{ position: 'relative', zIndex: 2, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(6px)', padding: '8px 12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>
                      {patient.name} ({patient.ageSex})
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      {patient.village}, {patient.mandal} • Accompanied by ANM {patient.assignedAnm?.name}
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#fdba74', background: '#7c2d12', padding: '2px 8px', borderRadius: '8px', fontWeight: 700 }}>
                    Oral Examination Active
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Call Controls Floating Bar */}
          <div
            style={{
              background: '#111827',
              borderRadius: '16px',
              padding: '12px 20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              border: '1px solid #1f2937',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#94a3b8', marginRight: '14px' }}>
              ⏱ {formatTime(callDuration)}
            </div>

            <button
              type="button"
              onClick={() => setMicOn(!micOn)}
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
              }}
              title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {micOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>

            <button
              type="button"
              onClick={() => setVideoOn(!videoOn)}
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
              }}
              title={videoOn ? 'Turn Off Video' : 'Turn On Video'}
            >
              {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>

            <button
              type="button"
              onClick={onEndCall}
              style={{
                background: '#dc2626',
                color: '#ffffff',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)',
              }}
            >
              <PhoneOff size={18} />
              <span>{language === 'te' ? 'కాల్ ముగించండి' : 'End Consultation'}</span>
            </button>
          </div>
        </div>

        {/* Right: Side Drawer with Tabs */}
        <div
          style={{
            background: '#111827',
            borderRadius: '16px',
            border: '1.5px solid #1f2937',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #1f2937', background: '#0b1120' }}>
            <button
              type="button"
              onClick={() => setActiveSideTab('clinical')}
              style={{
                flex: 1,
                padding: '12px 8px',
                background: activeSideTab === 'clinical' ? '#111827' : 'transparent',
                color: activeSideTab === 'clinical' ? '#f97316' : '#94a3b8',
                border: 'none',
                borderBottom: activeSideTab === 'clinical' ? '2.5px solid #f97316' : 'none',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {language === 'te' ? 'క్లినికల్ కేస్' : 'Clinical Dossier'}
            </button>
            <button
              type="button"
              onClick={() => setActiveSideTab('biopsy')}
              style={{
                flex: 1,
                padding: '12px 8px',
                background: activeSideTab === 'biopsy' ? '#111827' : 'transparent',
                color: activeSideTab === 'biopsy' ? '#0d9488' : '#94a3b8',
                border: 'none',
                borderBottom: activeSideTab === 'biopsy' ? '2.5px solid #0d9488' : 'none',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {language === 'te' ? 'బయాప్సీ ఆర్డర్' : 'Biopsy Orders'}
            </button>
            <button
              type="button"
              onClick={() => setActiveSideTab('chat')}
              style={{
                flex: 1,
                padding: '12px 8px',
                background: activeSideTab === 'chat' ? '#111827' : 'transparent',
                color: activeSideTab === 'chat' ? '#3b82f6' : '#94a3b8',
                border: 'none',
                borderBottom: activeSideTab === 'chat' ? '2.5px solid #3b82f6' : 'none',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {language === 'te' ? 'లైవ్ చాట్' : 'Audit Chat'}
            </button>
          </div>

          {/* Drawer Content */}
          <div style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
            {activeSideTab === 'clinical' && (
              <div>
                {/* Oral Lesion Photo Preview */}
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#f97316', textTransform: 'uppercase' }}>
                    PATIENT ORAL CAVITY CAPTURE
                  </span>
                  <div
                    style={{
                      marginTop: '6px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1.5px solid #374151',
                      height: '140px',
                      position: 'relative',
                      background: '#030712',
                    }}
                  >
                    <img
                      src={patient.oralPhotos?.[0] || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80'}
                      alt="Buccal lesion scan"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', bottom: '6px', left: '8px', background: 'rgba(0,0,0,0.7)', padding: '2px 8px', borderRadius: '6px', fontSize: '10.5px', color: '#fed7aa' }}>
                      Site: Right Buccal Mucosa • 2.2 cm Plaque
                    </div>
                  </div>
                </div>

                {/* Gemini AI Concordance Box */}
                <div style={{ background: '#1e293b', padding: '12px', borderRadius: '10px', marginBottom: '14px', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={14} /> GEMINI MULTIMODAL TRIAGE
                    </span>
                    <span style={{ background: '#881337', color: '#fecdd3', fontSize: '10px', padding: '2px 6px', borderRadius: '6px', fontWeight: 800 }}>
                      89% Concordance
                    </span>
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
                    {patient.aiAssessment?.triageClassification || 'High Suspicion - Potentially Malignant'}
                  </div>
                  <small style={{ color: '#94a3b8', fontSize: '10.5px' }}>
                    Non-scrapable homogeneous plaque with dysplastic verrucous borders.
                  </small>
                </div>

                {/* Habit & Exposure History */}
                <div style={{ marginBottom: '14px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8' }}>EXPOSURE HISTORY (NOCR / ACS):</span>
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', fontSize: '12px', color: '#e2e8f0', lineHeight: 1.5 }}>
                    {patient.exposureHistory?.map((h, i) => (
                      <li key={i}>{h.label}</li>
                    ))}
                  </ul>
                </div>

                {/* Reported Symptoms */}
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
                        CLINICAL INSTRUCTIONS & HISTOPATH NOTES:
                      </label>
                      <textarea
                        rows={4}
                        value={biopsyNotes}
                        onChange={(e) => setBiopsyNotes(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', fontSize: '12px', lineHeight: 1.4 }}
                      />
                    </div>

                    <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px', border: '1px solid #1e293b', marginBottom: '16px', fontSize: '11px', color: '#94a3b8' }}>
                      <strong>Designated Lab:</strong> Pathology Unit, Area Hospital Paderu. Transportation via ITDA cold-chain sample dispatch.
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      {language === 'te' ? 'బయాప్సీ ల్యాబ్ ఆర్డర్ జారీ చేయండి' : 'Issue Official Biopsy Order'}
                    </button>
                  </form>
                ) : (
                  <div style={{ background: '#064e3b', border: '1px solid #059669', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                    <CheckCircle2 size={32} color="#34d399" style={{ margin: '0 auto 8px auto' }} />
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#ffffff' }}>
                      {language === 'te' ? 'బయాప్సీ ఆర్డర్ జారీ చేయబడింది!' : 'Biopsy Order Issued Successfully!'}
                    </h4>
                    <p style={{ fontSize: '11.5px', color: '#a7f3d0', margin: '0 0 14px 0' }}>
                      Order ID: <strong>BIO-PADERU-2026-8812</strong> • Scheduled for 09:00 AM at Area Hospital Paderu.
                    </p>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      style={{
                        background: '#ffffff',
                        color: '#065f46',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Printer size={14} />
                      <span>{language === 'te' ? 'ఆర్డర్ స్లిప్ ముద్రించండి' : 'Print Biopsy Order Slip'}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeSideTab === 'chat' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                  {chatMessages.map((m) => (
                    <div key={m.id} style={{ background: '#1e293b', padding: '8px 10px', borderRadius: '8px', fontSize: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f97316', fontWeight: 700, fontSize: '10.5px' }}>
                        <span>{language === 'te' ? (m.senderTe || m.sender) : m.sender}</span>
                        <span style={{ color: '#64748b' }}>{m.time}</span>
                      </div>
                      <p style={{ margin: '4px 0 0 0', color: '#f1f5f9', lineHeight: 1.4 }}>{m.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="text"
                    placeholder={language === 'te' ? 'క్లినికల్ నోట్స్ నమోదు చేయండి...' : 'Type encounter note...'}
                    value={newChatText}
                    onChange={(e) => setNewChatText(e.target.value)}
                    style={{ flex: 1, padding: '7px 10px', borderRadius: '6px', background: '#1e293b', border: '1px solid #374151', color: '#ffffff', fontSize: '12px' }}
                  />
                  <button
                    type="submit"
                    style={{ background: '#f97316', border: 'none', borderRadius: '6px', padding: '7px 12px', color: '#ffffff', cursor: 'pointer' }}
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
