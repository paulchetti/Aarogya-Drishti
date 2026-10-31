import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Share2,
  Activity,
  FileText,
  MessageSquare,
  ShieldCheck,
  Send,
  Plus,
  HeartPulse,
  CheckCircle2,
  User,
  Sparkles
} from 'lucide-react';

export default function TeleconsultationSuite({
  patientData,
  onEndCall,
  onOpenRx
}) {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [activeSideTab, setActiveSideTab] = useState('vitals'); // 'vitals' | 'rx' | 'chat'
  const [callDuration, setCallDuration] = useState(145); // in seconds
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Doctor', text: 'Hello! I have reviewed your clinical intake questionnaire and latest lipid profile.', time: '09:01 AM' },
    { id: 2, sender: 'Patient', text: 'Good morning Doctor. Yes, I have been feeling occasional fatigue after morning walks.', time: '09:02 AM' },
    { id: 3, sender: 'Doctor', text: 'Your vitals are steady at 125/82 mmHg. I am making a minor adjustment to your statin dose.', time: '09:03 AM' }
  ]);
  const [newChatText, setNewChatText] = useState('');

  // Live Prescription Builder State
  const [liveRx, setLiveRx] = useState({
    medicine: 'Atorvastatin Calcium',
    dosage: '20 mg',
    timing: 'Once daily at bedtime',
    instructions: 'Take after dinner. Maintain low cholesterol diet.'
  });
  const [rxIssued, setRxIssued] = useState(false);

  const patient = patientData || {
    name: 'Bessie Cooper',
    age: '28 years',
    gender: 'Female',
    appointedFor: 'Cardio-metabolic teleconsultation',
    abhaId: '91-4829-1029-4501',
    vitals: { bp: '122/80', hr: '74 bpm', spo2: '99%', temp: '98.4°F' }
  };

  // Timer effect
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
      sender: 'You',
      text: newChatText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages([...chatMessages, msg]);
    setNewChatText('');
  };

  const handleIssueRx = (e) => {
    e.preventDefault();
    setRxIssued(true);
    setTimeout(() => setRxIssued(false), 4000);
  };

  return (
    <div className="dashboard-content-area feature-view-container">
      {/* Telehealth Room Container */}
      <div className="teleconsult-room-wrapper">
        {/* Main Video Feed Stage */}
        <div className="video-stage-card">
          {/* Header Info Overlay */}
          <div className="call-overlay-header">
            <span className="live-indicator" />
            <span className="call-timer">{formatTime(callDuration)}</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
              <ShieldCheck size={15} color="#10b981" />
              <span>ABDM Encrypted HD (1080p)</span>
            </div>
          </div>

          {/* Primary Doctor/Patient Feed */}
          <div className="video-feed-main">
            {videoOn ? (
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=900&auto=format&fit=crop&q=80"
                alt="Doctor Teleconsult Stream"
                className="simulated-video-img"
              />
            ) : (
              <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                <VideoOff size={48} style={{ margin: '0 auto 12px' }} />
                <p>Camera feed paused</p>
              </div>
            )}

            {/* Doctor Info Pill on video */}
            <div
              style={{
                position: 'absolute',
                bottom: '90px',
                left: '24px',
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(8px)',
                padding: '8px 16px',
                borderRadius: '16px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
              <div>
                <strong style={{ fontSize: '0.9rem' }}>Dr. Andrew Sharma (Cardiologist)</strong>
                <div style={{ fontSize: '0.72rem', color: '#a7f3d0' }}>Speaking • Connected via Aarogya Telehealth</div>
              </div>
            </div>

            {/* Picture-in-Picture (Patient Self Stream) */}
            <div className="pip-self-feed">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80"
                alt="Patient Self View"
                className="pip-self-img"
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '6px',
                  left: '8px',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  fontSize: '0.68rem',
                  color: '#ffffff'
                }}
              >
                {patient.name} (You)
              </div>
            </div>
          </div>

          {/* Floating Controls Bar */}
          <div className="video-controls-bar">
            {/* Mic Toggle */}
            <button
              className={`ctrl-btn ${!micOn ? 'off' : ''}`}
              onClick={() => setMicOn(!micOn)}
              title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {micOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>

            {/* Video Toggle */}
            <button
              className={`ctrl-btn ${!videoOn ? 'off' : ''}`}
              onClick={() => setVideoOn(!videoOn)}
              title={videoOn ? 'Turn Video Off' : 'Turn Video On'}
            >
              {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>

            {/* Screen Share */}
            <button
              className={`ctrl-btn ${screenSharing ? 'active' : ''}`}
              onClick={() => setScreenSharing(!screenSharing)}
              title="Share Screen"
            >
              <Share2 size={20} />
            </button>

            {/* Vitals Sidebar Toggle */}
            <button
              className={`ctrl-btn ${activeSideTab === 'vitals' ? 'active' : ''}`}
              onClick={() => setActiveSideTab('vitals')}
              title="Live Vitals HUD"
            >
              <Activity size={20} />
            </button>

            {/* Rx Pad Toggle */}
            <button
              className={`ctrl-btn ${activeSideTab === 'rx' ? 'active' : ''}`}
              onClick={() => setActiveSideTab('rx')}
              title="Prescription Pad"
            >
              <FileText size={20} />
            </button>

            {/* Chat Toggle */}
            <button
              className={`ctrl-btn ${activeSideTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveSideTab('chat')}
              title="In-Call Chat"
            >
              <MessageSquare size={20} />
            </button>

            {/* End Call */}
            <button
              className="ctrl-btn ctrl-btn-hangup"
              onClick={onEndCall}
              title="End Teleconsultation"
            >
              <PhoneOff size={22} />
            </button>
          </div>
        </div>

        {/* Side Panel: Clinical Dossier, Prescription Pad & Chat */}
        <div className="teleconsult-sidepanel">
          <div className="sidepanel-tabs">
            <button
              className={`sidepanel-tab-btn ${activeSideTab === 'vitals' ? 'active' : ''}`}
              onClick={() => setActiveSideTab('vitals')}
            >
              Vitals & Intake
            </button>
            <button
              className={`sidepanel-tab-btn ${activeSideTab === 'rx' ? 'active' : ''}`}
              onClick={() => setActiveSideTab('rx')}
            >
              Digital Rx Pad
            </button>
            <button
              className={`sidepanel-tab-btn ${activeSideTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveSideTab('chat')}
            >
              In-Call Chat
            </button>
          </div>

          <div className="sidepanel-body">
            {/* TAB 1: Live Patient Vitals & Intake */}
            {activeSideTab === 'vitals' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
                    alt={patient.name}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>{patient.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: '#0d9488' }}>ABHA: {patient.abhaId}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
                  CONNECTED IOMT VITALS HUD
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ background: '#f0fdfa', border: '1px solid #ccfbf1', padding: '12px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.72rem', color: '#0d9488', fontWeight: 600 }}>BLOOD PRESSURE</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f766e' }}>
                      {patient.vitals?.bp || '122/80'}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Normal Range</div>
                  </div>

                  <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', padding: '12px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 600 }}>HEART RATE</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#b91c1c' }}>
                      {patient.vitals?.hr || '74 bpm'}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Sinus Rhythm</div>
                  </div>

                  <div style={{ background: '#eff6ff', border: '1px solid #dbeafe', padding: '12px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.72rem', color: '#3b82f6', fontWeight: 600 }}>BLOOD OXYGEN</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1d4ed8' }}>
                      {patient.vitals?.spo2 || '99%'}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Optimal SpO2</div>
                  </div>

                  <div style={{ background: '#fefce8', border: '1px solid #fef08a', padding: '12px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.72rem', color: '#ca8a04', fontWeight: 600 }}>TEMPERATURE</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#854d0e' }}>
                      {patient.vitals?.temp || '98.4°F'}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Afebrile</div>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', fontSize: '0.82rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                    Chief Complaint / Intake Reason:
                  </div>
                  <div style={{ color: '#475569' }}>
                    {patient.appointedFor || 'Cardiovascular checkup & follow-up statin optimization.'}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Live Digital Prescription Builder */}
            {activeSideTab === 'rx' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Issue Live Prescription</h4>
                  <span style={{ fontSize: '0.75rem', color: '#0d9488', fontWeight: 600 }}>ABDM Compliant</span>
                </div>

                {rxIssued && (
                  <div
                    style={{
                      background: '#ecfdf5',
                      color: '#065f46',
                      padding: '10px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>Prescription issued and linked to patient ABHA!</span>
                  </div>
                )}

                <form onSubmit={handleIssueRx}>
                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <label>Medication</label>
                    <input
                      type="text"
                      className="form-control"
                      value={liveRx.medicine}
                      onChange={(e) => setLiveRx({ ...liveRx, medicine: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <label>Dosage & Strength</label>
                    <input
                      type="text"
                      className="form-control"
                      value={liveRx.dosage}
                      onChange={(e) => setLiveRx({ ...liveRx, dosage: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <label>Timing & Schedule</label>
                    <input
                      type="text"
                      className="form-control"
                      value={liveRx.timing}
                      onChange={(e) => setLiveRx({ ...liveRx, timing: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label>Doctor Instructions</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={liveRx.instructions}
                      onChange={(e) => setLiveRx({ ...liveRx, instructions: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <CheckCircle2 size={16} />
                    <span>Sign & Issue Digital Rx</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: In-Call Clinical Chat */}
            {activeSideTab === 'chat' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
                  {chatMessages.map((msg) => {
                    const isMe = msg.sender === 'You' || msg.sender === 'Doctor';
                    return (
                      <div
                        key={msg.id}
                        style={{
                          alignSelf: isMe ? 'flex-end' : 'flex-start',
                          maxWidth: '85%',
                          background: isMe ? '#0d9488' : '#f1f5f9',
                          color: isMe ? '#ffffff' : '#1e293b',
                          padding: '8px 12px',
                          borderRadius: '12px',
                          fontSize: '0.82rem'
                        }}
                      >
                        <div style={{ fontSize: '0.68rem', opacity: 0.8, marginBottom: '2px' }}>
                          {msg.sender} • {msg.time}
                        </div>
                        <div>{msg.text}</div>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type in-call message..."
                    value={newChatText}
                    onChange={(e) => setNewChatText(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '8px 14px' }}>
                    <Send size={15} />
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

