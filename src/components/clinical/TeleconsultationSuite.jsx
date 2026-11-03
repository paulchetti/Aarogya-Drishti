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
  UserCheck,
  Copy,
  Check,
  Wifi,
  Globe,
  Share2,
  Link2,
  Monitor,
  HelpCircle,
  X
} from 'lucide-react';
import Peer from 'peerjs';
import { useLanguage } from '../../context/LanguageContext';
import { TERTIARY_SPECIALIST_CENTER } from '../../services/referralRoutingService';

// Sub-component for playing remote video streams cleanly
function RemoteStreamPlayer({ stream, roleName }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  );
}

// Generate an animated Virtual Clinical MediaStream if physical camera is blocked (e.g., HTTP origin on 2nd laptop)
function createVirtualClinicianStream(role, displayName) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');

  let tick = 0;
  const draw = () => {
    tick++;
    // Dark medical navy background
    const bgGrad = ctx.createLinearGradient(0, 0, 640, 480);
    if (role === 'specialist') {
      bgGrad.addColorStop(0, '#0b1329');
      bgGrad.addColorStop(1, '#1e1b4b');
    } else if (role === 'phc') {
      bgGrad.addColorStop(0, '#042f2e');
      bgGrad.addColorStop(1, '#0b1329');
    } else {
      bgGrad.addColorStop(0, '#431407');
      bgGrad.addColorStop(1, '#0b1329');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 640, 480);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 640; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 480);
      ctx.stroke();
    }
    for (let y = 0; y < 480; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(640, y);
      ctx.stroke();
    }

    // Avatar Circle with gentle pulsating ring
    const cx = 320;
    const cy = 200;
    const pulse = Math.sin(tick * 0.12) * 5;

    ctx.beginPath();
    ctx.arc(cx, cy, 65 + pulse, 0, Math.PI * 2);
    ctx.fillStyle =
      role === 'specialist'
        ? 'rgba(249, 115, 22, 0.25)'
        : role === 'phc'
        ? 'rgba(13, 148, 136, 0.25)'
        : 'rgba(234, 88, 12, 0.25)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, 58, 0, Math.PI * 2);
    ctx.fillStyle = role === 'specialist' ? '#f97316' : role === 'phc' ? '#0d9488' : '#ea580c';
    ctx.fill();

    // Initials / Icon
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(role === 'specialist' ? 'Dr.A' : role === 'phc' ? 'Dr.S' : 'AR', cx, cy);

    // Clinician / Patient Title
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(displayName, cx, 295);

    ctx.font = '13.5px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(
      role === 'specialist'
        ? 'Area Hospital Paderu • Oral Oncology Review'
        : role === 'phc'
        ? 'G. Madugula PHC • Referring Clinician Feed'
        : 'Village Sub-Centre • Patient Video Tele-Kiosk',
      cx,
      325
    );

    // Heartbeat ECG Wave Simulation
    ctx.strokeStyle = role === 'specialist' ? '#f97316' : role === 'phc' ? '#2dd4bf' : '#fb923c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let x = 40; x < 600; x += 5) {
      const offset = (x + tick * 4) % 200;
      let y = 410;
      if (offset > 80 && offset < 95) y = 410 - 25;
      else if (offset >= 95 && offset < 110) y = 410 + 20;
      else if (offset >= 110 && offset < 125) y = 410 - 35;
      else if (offset >= 125 && offset < 140) y = 410 + 10;
      if (x === 40) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Live Telemetry Banner
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('● WEBRTC LIVE STREAM • 1080p • 24ms', 30, 36);

    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'right';
    const now = new Date().toTimeString().split(' ')[0];
    ctx.fillText(now + ' IST', 610, 36);
  };

  const timer = setInterval(draw, 50); // 20 fps
  draw();

  const stream = canvas.captureStream ? canvas.captureStream(20) : null;

  // Add dummy silent audio track so WebRTC media negotiations succeed
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const dst = audioCtx.createMediaStreamDestination();
    osc.connect(dst);
    osc.start();
    const audioTrack = dst.stream.getAudioTracks()[0];
    if (audioTrack && stream) {
      audioTrack.enabled = false;
      stream.addTrack(audioTrack);
    }
  } catch (e) {}

  return { stream, cleanup: () => clearInterval(timer) };
}

export default function TeleconsultationSuite({
  patientData,
  currentUserRole = 'doctor', // 'doctor' (PHC) | 'specialist' | 'patient' | 'anm'
  onEndCall,
}) {
  const { language, t } = useLanguage();

  // Read URL query parameters if loaded via invite link
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const initialRoom = urlParams.get('room') || 'paderu-telemed-101';
  const roleFromUrl = urlParams.get('role');

  // Role Normalization
  const resolveRole = (r) => {
    if (r === 'specialist') return 'specialist';
    if (r === 'patient' || r === 'anm') return 'patient';
    return 'phc'; // default for doctor / phc
  };

  const [roomCode, setRoomCode] = useState(initialRoom);
  const [inputRoomCode, setInputRoomCode] = useState(initialRoom);
  const [isEditingRoom, setIsEditingRoom] = useState(false);
  const [myRole, setMyRole] = useState(roleFromUrl ? resolveRole(roleFromUrl) : resolveRole(currentUserRole));

  // Call Settings & Media State
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callMode, setCallMode] = useState('3-way'); // '3-way' | '2-way-patient' | '2-way-provider'
  const [activeSideTab, setActiveSideTab] = useState('clinical'); // 'clinical' | 'biopsy' | 'chat'
  const [callDuration, setCallDuration] = useState(145);
  const [cameraMode, setCameraMode] = useState('physical'); // 'physical' | 'virtual'
  const [showCameraHelpModal, setShowCameraHelpModal] = useState(false);
  const [isCapturingSnapshot, setIsCapturingSnapshot] = useState(false);

  // Active Camera Assignment for single-device test switching
  const [activeCameraTile, setActiveCameraTile] = useState(myRole);

  // Multi-Device WebRTC / PeerJS State
  const [webrtcStatus, setWebrtcStatus] = useState('connecting'); // 'connecting' | 'connected' | 'waiting' | 'error'
  const [webrtcNotice, setWebrtcNotice] = useState('Connecting to WebRTC mesh...');
  const [remoteStreams, setRemoteStreams] = useState({
    specialist: null,
    phc: null,
    patient: null,
  });
  const [connectedRoles, setConnectedRoles] = useState([]);
  const [copiedLinkRole, setCopiedLinkRole] = useState(null);

  // Refs
  const localVideoRef = useRef(null);
  const screenVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const virtualCleanupRef = useRef(null);
  const screenStreamRef = useRef(null);
  const peerRef = useRef(null);
  const activeCallsRef = useRef({});
  const activeConnsRef = useRef({});

  // Simulated Speaking Participant
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
  const [biopsyUrgency, setBiopsyUrgency] = useState('Within 48 Hours (High Priority)');
  const [biopsyNotes, setBiopsyNotes] = useState(
    '4mm punch core under local lidocaine infiltration. Target indurated anterior border of right buccal plaque. Immediate fixation in 10% neutral buffered formalin. Route to Pathology Lab, Area Hospital Paderu.'
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

  const getRoleDisplayName = (r) => {
    if (r === 'specialist') return 'Dr. Ananya Varma, MD (Specialist)';
    if (r === 'phc') return 'Dr. Sandeep Kumar, MBBS (PHC Doctor)';
    return 'Appa Rao & ANM Lakshmi (Village Kiosk)';
  };

  // 1. Bulletproof Stream Acquisition (Physical Webcam with Virtual Stream Fallback)
  const initializeMediaStream = async (roleToUse = myRole) => {
    // Clean up existing virtual generator if any
    if (virtualCleanupRef.current) {
      virtualCleanupRef.current();
      virtualCleanupRef.current = null;
    }

    // Try physical camera first
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: true,
        });
        localStreamRef.current = stream;
        setCameraMode('physical');
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setVideoOn(true);
        setMicOn(true);
        return stream;
      }
    } catch (err) {
      console.warn('Physical camera unavailable (e.g. non-secure HTTP origin). Activating Virtual Clinical Stream:', err.message);
    }

    // Fallback: Generate Animated Virtual Clinician Stream
    setCameraMode('virtual');
    const { stream, cleanup } = createVirtualClinicianStream(roleToUse, getRoleDisplayName(roleToUse));
    virtualCleanupRef.current = cleanup;
    localStreamRef.current = stream;
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    setVideoOn(true);
    setMicOn(true);
    return stream;
  };

  // 2. Broadcast Data via WebRTC Data Channels (for Chat, Snapshots, Biopsy)
  const broadcastWebRTCData = (data) => {
    Object.values(activeConnsRef.current).forEach((conn) => {
      if (conn && conn.open) {
        try {
          conn.send(data);
        } catch (e) {
          console.warn('WebRTC broadcast failed for a peer:', e);
        }
      }
    });
  };

  // 3. Handle Incoming Data from Connected Peer Laptops
  const handleIncomingData = (data) => {
    if (!data) return;
    if (data.type === 'chat' && data.message) {
      setChatMessages((prev) => [...prev, data.message]);
    } else if (data.type === 'snapshot' && data.photoUrl) {
      setCapturedOralPhoto(data.photoUrl);
      setActiveSideTab('clinical');
    } else if (data.type === 'biopsy') {
      setBiopsyOrdered(true);
      if (data.biopsyType) setBiopsyType(data.biopsyType);
      if (data.biopsyUrgency) setBiopsyUrgency(data.biopsyUrgency);
      if (data.biopsyNotes) setBiopsyNotes(data.biopsyNotes);
      setActiveSideTab('biopsy');
    }
  };

  // 4. Multi-Device PeerJS Room Connection Engine
  const setupPeerConnection = async (targetRoom, role) => {
    const cleanRoom = (targetRoom || 'paderu-telemed-101').toLowerCase().replace(/[^a-z0-9_-]/g, '');
    const myPeerId = `aarogya-${cleanRoom}-${role}`;

    if (peerRef.current) {
      try {
        peerRef.current.destroy();
      } catch (e) {}
      peerRef.current = null;
    }

    setWebrtcStatus('connecting');
    setWebrtcNotice(`Connecting as ${role.toUpperCase()} to room "${cleanRoom}"...`);

    let stream = localStreamRef.current;
    if (!stream) {
      stream = await initializeMediaStream(role);
    }

    try {
      const peer = new Peer(myPeerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' },
          ],
        },
      });

      peerRef.current = peer;

      peer.on('open', (id) => {
        console.log('[Aarogya Drishti PeerJS] Connected with ID:', id);
        setWebrtcStatus('connected');
        setWebrtcNotice(`Room "${cleanRoom}" Live • Waiting for or connected to other devices`);

        // Automatically dial the other 2 roles
        const otherRoles = ['specialist', 'phc', 'patient'].filter((r) => r !== role);
        otherRoles.forEach((targetRole) => {
          dialRemoteRole(peer, cleanRoom, targetRole, role, stream);
        });
      });

      // Handle Incoming Call from another laptop
      peer.on('call', (incomingCall) => {
        console.log('[Aarogya Drishti PeerJS] Incoming call from:', incomingCall.peer);
        // Always answer with active stream (physical or virtual)
        incomingCall.answer(localStreamRef.current || stream);

        incomingCall.on('stream', (remoteStream) => {
          const remoteRole =
            incomingCall.metadata?.role ||
            (incomingCall.peer.includes('specialist')
              ? 'specialist'
              : incomingCall.peer.includes('phc')
              ? 'phc'
              : 'patient');

          setRemoteStreams((prev) => ({ ...prev, [remoteRole]: remoteStream }));
          setConnectedRoles((prev) => Array.from(new Set([...prev, remoteRole])));
          setWebrtcNotice(`Connected to remote device (${remoteRole.toUpperCase()})`);
        });

        incomingCall.on('close', () => {
          const remoteRole =
            incomingCall.metadata?.role ||
            (incomingCall.peer.includes('specialist')
              ? 'specialist'
              : incomingCall.peer.includes('phc')
              ? 'phc'
              : 'patient');

          setRemoteStreams((prev) => ({ ...prev, [remoteRole]: null }));
          setConnectedRoles((prev) => prev.filter((r) => r !== remoteRole));
        });
      });

      // Handle Incoming WebRTC Data Connection (Chat / Snapshot / Biopsy)
      peer.on('connection', (conn) => {
        const remoteRole =
          conn.metadata?.role ||
          (conn.peer.includes('specialist')
            ? 'specialist'
            : conn.peer.includes('phc')
            ? 'phc'
            : 'patient');

        activeConnsRef.current[remoteRole] = conn;

        conn.on('data', (data) => {
          handleIncomingData(data);
        });

        conn.on('close', () => {
          delete activeConnsRef.current[remoteRole];
        });
      });

      peer.on('error', (err) => {
        console.warn('[Aarogya Drishti PeerJS] Error:', err.type, err.message);
        if (err.type === 'unavailable-id') {
          // If role already taken, inform user or attempt connecting
          setWebrtcNotice(`Notice: Role "${role.toUpperCase()}" already registered. If refreshing, click Reconnect.`);
        } else if (err.type === 'peer-unavailable') {
          // Normal: other peers not yet in room
        } else {
          setWebrtcNotice(`WebRTC Status: ${err.type || 'Connected'}`);
        }
      });
    } catch (e) {
      console.warn('PeerJS init fallback:', e);
      setWebrtcStatus('error');
      setWebrtcNotice('Local mode active.');
    }
  };

  // Helper to dial a specific role
  const dialRemoteRole = (peer, room, targetRole, fromRole, stream) => {
    if (!peer || peer.destroyed) return;
    const targetPeerId = `aarogya-${room}-${targetRole}`;
    const mediaStreamToSend = stream || localStreamRef.current;

    // 1. Media Call (Always send stream so peer receives real video)
    if (mediaStreamToSend) {
      try {
        const call = peer.call(targetPeerId, mediaStreamToSend, {
          metadata: { role: fromRole, name: getRoleDisplayName(fromRole) },
        });

        if (call) {
          activeCallsRef.current[targetRole] = call;

          call.on('stream', (remoteStream) => {
            console.log('[PeerJS] Received remote stream from', targetRole);
            setRemoteStreams((prev) => ({ ...prev, [targetRole]: remoteStream }));
            setConnectedRoles((prev) => Array.from(new Set([...prev, targetRole])));
            setWebrtcNotice(`Connected to remote device (${targetRole.toUpperCase()})`);
          });

          call.on('close', () => {
            setRemoteStreams((prev) => ({ ...prev, [targetRole]: null }));
            setConnectedRoles((prev) => prev.filter((r) => r !== targetRole));
          });
        }
      } catch (e) {}
    }

    // 2. Data Connection (Chat & Orders)
    try {
      const conn = peer.connect(targetPeerId, {
        metadata: { role: fromRole },
      });

      if (conn) {
        conn.on('open', () => {
          activeConnsRef.current[targetRole] = conn;
        });
        conn.on('data', (data) => {
          handleIncomingData(data);
        });
        conn.on('close', () => {
          delete activeConnsRef.current[targetRole];
        });
      }
    } catch (e) {}
  };

  // Manual Reconnect Button
  const handleManualReconnect = () => {
    setupPeerConnection(roomCode, myRole);
  };

  // Lifecycle
  useEffect(() => {
    initializeMediaStream(myRole);
    setupPeerConnection(roomCode, myRole);

    // Call Duration Timer
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Simulated speech wave alternation when no real peers speaking
    const speakTimer = setInterval(() => {
      setSpeakingParty((prev) => (prev === 'specialist' ? 'phc' : prev === 'phc' ? 'patient' : 'specialist'));
    }, 4500);

    // Auto-retry dialing remote peers every 4 seconds until connected
    const dialInterval = setInterval(() => {
      if (peerRef.current && !peerRef.current.destroyed) {
        const cleanRoom = (roomCode || 'paderu-telemed-101').toLowerCase().replace(/[^a-z0-9_-]/g, '');
        const otherRoles = ['specialist', 'phc', 'patient'].filter(
          (r) => r !== myRole && !remoteStreams[r]
        );
        otherRoles.forEach((targetRole) => {
          dialRemoteRole(peerRef.current, cleanRoom, targetRole, myRole, localStreamRef.current);
        });
      }
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(speakTimer);
      clearInterval(dialInterval);

      if (virtualCleanupRef.current) {
        virtualCleanupRef.current();
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (peerRef.current) {
        try {
          peerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, []);

  // Sync stream to video element whenever activeCameraTile changes
  useEffect(() => {
    if (localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
  }, [activeCameraTile, videoOn, cameraMode]);

  // Handle Role Change
  const handleChangeRole = (newRole) => {
    setMyRole(newRole);
    setActiveCameraTile(newRole);
    initializeMediaStream(newRole);
    setupPeerConnection(roomCode, newRole);
  };

  // Handle Room Change
  const handleApplyRoom = (e) => {
    e.preventDefault();
    if (!inputRoomCode.trim()) return;
    const clean = inputRoomCode.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    setRoomCode(clean);
    setIsEditingRoom(false);
    setupPeerConnection(clean, myRole);
  };

  // Copy Invite Link for Other Laptop
  const handleCopyInviteLink = (targetRole) => {
    const clean = (roomCode || 'paderu-telemed-101').toLowerCase().replace(/[^a-z0-9_-]/g, '');
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const host = isLocal ? '192.168.1.67' : window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : '';
    const inviteUrl = `${window.location.protocol}//${host}${port}/?teleconsult=true&room=${clean}&role=${targetRole}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(inviteUrl).then(() => {
        setCopiedLinkRole(targetRole);
        setTimeout(() => setCopiedLinkRole(null), 3500);
      }).catch(() => {
        prompt('Copy this invite link to open on second laptop:', inviteUrl);
      });
    } else {
      prompt('Copy this invite link to open on second laptop:', inviteUrl);
    }
  };

  // Media Controls
  const handleToggleMic = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach((t) => {
        t.enabled = !micOn;
      });
    }
    setMicOn(!micOn);
  };

  const handleToggleVideo = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach((t) => {
        t.enabled = !videoOn;
      });
    }
    setVideoOn(!videoOn);
  };

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

  // Oral Freeze-Frame Capture Tool
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
        broadcastWebRTCData({ type: 'snapshot', photoUrl: dataUrl });
      } else {
        const fallback = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80';
        setCapturedOralPhoto(fallback);
        setActiveSideTab('clinical');
        broadcastWebRTCData({ type: 'snapshot', photoUrl: fallback });
      }
    } catch (e) {
      console.warn('Snapshot capture fallback:', e);
    }
    setTimeout(() => {
      setIsCapturingSnapshot(false);
    }, 600);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // In-Call Chat
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const myName = getRoleDisplayName(myRole);

    const userMsg = {
      id: Date.now(),
      sender: myName,
      text: newChatText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setNewChatText('');

    broadcastWebRTCData({ type: 'chat', message: userMsg });

    if (connectedRoles.length === 0) {
      setTimeout(() => {
        let replySender = 'Dr. Ananya Varma, MD (Specialist)';
        let replyText = `Acknowledged. Reviewing the mucosal borders on the live video stream. Proceeding with histopathology orders.`;

        if (myRole === 'specialist') {
          replySender = 'Dr. Sandeep Kumar, MBBS (PHC Doctor)';
          replyText = `Understood Dr. Ananya. We will prep the patient at G. Madugula PHC and arrange the punch biopsy core per protocol.`;
        } else if (myRole === 'patient') {
          replySender = 'Dr. Sandeep Kumar, MBBS (PHC Doctor)';
          replyText = `బాధపడకండి అప్పారావు గారు, నిపుణులైన వైద్యులు పరీక్షిస్తున్నారు. మేము పాడేరు ఆసుపత్రికి అవసరమైన పరీక్షలు ఏర్పాటు చేస్తాం.`;
        }

        const replyMsg = {
          id: Date.now() + 1,
          sender: replySender,
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages((prev) => [...prev, replyMsg]);
      }, 1600);
    }
  };

  // Issue Biopsy Order
  const handleOrderBiopsy = () => {
    setBiopsyOrdered(true);
    setActiveSideTab('biopsy');

    broadcastWebRTCData({
      type: 'biopsy',
      biopsyType,
      biopsyUrgency,
      biopsyNotes,
      timestamp: new Date().toISOString(),
    });

    const sysMsg = {
      id: Date.now(),
      sender: 'SYSTEM CLINICAL AUDIT',
      text: `✅ OFFICIAL BIOPSY REQUISITION ISSUED: ${biopsyType} (${biopsyUrgency}). Referral order dispatched to Area Hospital Paderu Histopathology Lab.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, sysMsg]);
    broadcastWebRTCData({ type: 'chat', message: sysMsg });
  };

  return (
    <div
      style={{
        background: '#090d16',
        borderRadius: '20px',
        border: '1px solid #1e293b',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.75)',
        color: '#f8fafc',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '760px',
      }}
    >
      {/* 1. TOP SUITE HEADER & MULTI-DEVICE ROOM BAR */}
      <div
        style={{
          background: 'linear-gradient(90deg, #0b1324 0%, #151e33 100%)',
          padding: '12px 20px',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Left: Branding & Patient Context */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)',
            }}
          >
            <Stethoscope size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                {language === 'te' ? 'ట్రైబల్ టెలి-కన్సల్టేషన్ సూట్' : 'Tribal Teleconsultation Suite'}
              </span>
              <span
                style={{
                  background: '#f97316',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: '10px',
                  letterSpacing: '0.5px',
                }}
              >
                WEBRTC LIVE MESH
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              <span>Case: <strong style={{ color: '#f8fafc' }}>{patient.name}</strong> ({patient.ageSex})</span>
              <span>•</span>
              <span>Origin: <strong style={{ color: '#f8fafc' }}>{patient.assignedPhc?.name || 'G. Madugula PHC'}</strong></span>
            </div>
          </div>
        </div>

        {/* Center: Interactive Room Code & Multi-Device Peer Status */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={15} color="#38bdf8" />
            {isEditingRoom ? (
              <form onSubmit={handleApplyRoom} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="text"
                  value={inputRoomCode}
                  onChange={(e) => setInputRoomCode(e.target.value)}
                  style={{
                    background: '#1e293b',
                    border: '1px solid #475569',
                    color: '#ffffff',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    width: '130px',
                  }}
                  placeholder="e.g. paderu-101"
                  autoFocus
                />
                <button
                  type="submit"
                  style={{
                    background: '#f97316',
                    color: '#ffffff',
                    border: 'none',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Join
                </button>
              </form>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Room:</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#38bdf8' }}>{roomCode}</span>
                <button
                  type="button"
                  onClick={() => setIsEditingRoom(true)}
                  title="Change room name"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '10.5px',
                    textDecoration: 'underline',
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          <div style={{ height: '16px', width: '1px', background: '#334155' }} />

          {/* Connection status indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: connectedRoles.length > 0 ? '#10b981' : '#f59e0b',
                display: 'inline-block',
                boxShadow: connectedRoles.length > 0 ? '0 0 8px #10b981' : 'none',
              }}
            />
            <span style={{ fontSize: '11px', fontWeight: 700, color: connectedRoles.length > 0 ? '#6ee7b7' : '#fcd34d' }}>
              {connectedRoles.length > 0
                ? `${connectedRoles.length + 1} Devices Live (${connectedRoles.join(' + ').toUpperCase()})`
                : '1 Device (Standby for Peers)'}
            </span>

            {/* Reconnect button */}
            <button
              type="button"
              onClick={handleManualReconnect}
              title="Force reconnect WebRTC mesh"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#38bdf8',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <RefreshCw size={12} />
            </button>
          </div>
        </div>

        {/* Right: Timer & End Call */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              background: '#0f172a',
              border: '1px solid #334155',
              padding: '6px 12px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12.5px',
              fontWeight: 800,
              color: '#38bdf8',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }} />
            <span>● REC {formatTime(callDuration)}</span>
          </div>

          {onEndCall && (
            <button
              type="button"
              onClick={onEndCall}
              style={{
                background: '#dc2626',
                border: 'none',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <PhoneOff size={14} />
              <span>{language === 'te' ? 'కాల్ ముగించు' : 'End Call'}</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. MULTI-DEVICE INVITE & ROLE SELECTION BAR */}
      <div
        style={{
          background: '#0d1526',
          padding: '8px 20px',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          fontSize: '11.5px',
        }}
      >
        {/* Device Role Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#94a3b8', fontWeight: 600 }}>This Laptop's Role:</span>
          <div style={{ display: 'flex', background: '#090d16', padding: '3px', borderRadius: '8px', border: '1px solid #334155' }}>
            <button
              type="button"
              onClick={() => handleChangeRole('specialist')}
              style={{
                background: myRole === 'specialist' ? '#f97316' : 'transparent',
                color: myRole === 'specialist' ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '3px 9px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              👑 Specialist Oncologist
            </button>
            <button
              type="button"
              onClick={() => handleChangeRole('phc')}
              style={{
                background: myRole === 'phc' ? '#0d9488' : 'transparent',
                color: myRole === 'phc' ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '3px 9px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              🩺 PHC Doctor
            </button>
            <button
              type="button"
              onClick={() => handleChangeRole('patient')}
              style={{
                background: myRole === 'patient' ? '#ea580c' : 'transparent',
                color: myRole === 'patient' ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '3px 9px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              👤 Patient / ANM
            </button>
          </div>
        </div>

        {/* 1-Click Copy Invite Links for Other Laptop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Link2 size={13} color="#38bdf8" /> Open on 2nd Laptop:
          </span>
          <button
            type="button"
            onClick={() => handleCopyInviteLink('specialist')}
            style={{
              background: '#1e293b',
              color: '#fdba74',
              border: '1px solid #334155',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            {copiedLinkRole === 'specialist' ? (
              <>
                <Check size={12} color="#10b981" />
                <span style={{ color: '#10b981' }}>Copied Specialist Link!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Invite Specialist</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleCopyInviteLink('phc')}
            style={{
              background: '#1e293b',
              color: '#5eead4',
              border: '1px solid #334155',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            {copiedLinkRole === 'phc' ? (
              <>
                <Check size={12} color="#10b981" />
                <span style={{ color: '#10b981' }}>Copied PHC Link!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Invite PHC Doctor</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleCopyInviteLink('patient')}
            style={{
              background: '#1e293b',
              color: '#cbd5e1',
              border: '1px solid #334155',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            {copiedLinkRole === 'patient' ? (
              <>
                <Check size={12} color="#10b981" />
                <span style={{ color: '#10b981' }}>Copied Patient Link!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Invite Patient</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Helpful notification if Chrome blocked camera due to HTTP origin */}
      {cameraMode === 'virtual' && (
        <div
          style={{
            background: 'linear-gradient(90deg, #1e1b4b 0%, #172554 100%)',
            borderBottom: '1px solid #3b82f6',
            padding: '7px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11.5px',
            color: '#93c5fd',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#38bdf8', fontWeight: 800 }}>⚡ High-Fidelity Virtual Stream Active:</span>
            <span>
              Chrome blocked the physical webcam on this device because the URL is over HTTP (Not Secure). Streaming a live animated clinical card with ECG telemetry.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowCameraHelpModal(true)}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '3px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <HelpCircle size={13} />
            <span>Enable Real Webcam on 2nd Laptop (10s fix)</span>
          </button>
        </div>
      )}

      {/* 3. MAIN STAGE: VIDEO TILES (LEFT) + CLINICAL DRAWER (RIGHT) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1.2fr)', gap: '16px', padding: '16px', flex: 1 }}>
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
                border:
                  myRole === 'specialist' || activeCameraTile === 'specialist'
                    ? '2.5px solid #f97316'
                    : remoteStreams.specialist
                    ? '2.5px solid #10b981'
                    : '1.5px solid #1e3a8a',
                overflow: 'hidden',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '14px',
                boxShadow: speakingParty === 'specialist' ? '0 0 20px rgba(249, 115, 22, 0.3)' : 'none',
              }}
            >
              {/* VIDEO LAYER: Local Camera | Remote Live Stream | Simulated Fallback */}
              {myRole === 'specialist' || activeCameraTile === 'specialist' ? (
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
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#1e293b', color: '#94a3b8', margin: '0 auto 8px auto', display: 'grid', placeItems: 'center' }}>
                        <VideoOff size={26} />
                      </div>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>Camera Paused</span>
                    </div>
                  </div>
                )
              ) : remoteStreams.specialist ? (
                <RemoteStreamPlayer stream={remoteStreams.specialist} roleName="Specialist" />
              ) : (
                <div style={{ position: 'absolute', inset: 0, background: '#0f172a' }}>
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
                <span style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(4px)', color: '#fed7aa', padding: '3px 9px', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>
                  👑 SPECIALIST ONCOLOGIST
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {myRole === 'specialist' ? (
                    <span style={{ background: '#059669', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 800 }}>
                      {cameraMode === 'virtual' ? 'VIRTUAL STREAM (THIS LAPTOP)' : 'YOUR LIVE CAM'}
                    </span>
                  ) : remoteStreams.specialist ? (
                    <span style={{ background: '#0284c7', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 800 }}>
                      LIVE FROM 2ND LAPTOP
                    </span>
                  ) : (
                    <span style={{ background: '#475569', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 700 }}>
                      STANDBY
                    </span>
                  )}
                  <span style={{ background: '#16a34a', color: '#ffffff', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                    1080p • 24ms
                  </span>
                </div>
              </div>

              {/* Tile Footer Meta */}
              <div style={{ position: 'relative', zIndex: 2, background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(6px)', padding: '8px 12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                    {TERTIARY_SPECIALIST_CENTER.specialistName}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Area Hospital Paderu • Oral Oncology Division
                  </div>
                </div>
                {myRole !== 'specialist' && !remoteStreams.specialist && (
                  <button
                    type="button"
                    onClick={() => setActiveCameraTile('specialist')}
                    title="Preview your local webcam on this tile"
                    style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', fontSize: '10px', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Switch Cam
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
                  border:
                    myRole === 'phc' || activeCameraTile === 'phc'
                      ? '2.5px solid #0d9488'
                      : remoteStreams.phc
                      ? '2.5px solid #10b981'
                      : '1.5px solid #0f766e',
                  overflow: 'hidden',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '14px',
                  boxShadow: speakingParty === 'phc' ? '0 0 20px rgba(13, 148, 136, 0.3)' : 'none',
                }}
              >
                {myRole === 'phc' || activeCameraTile === 'phc' ? (
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
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#1e293b', color: '#94a3b8', margin: '0 auto 8px auto', display: 'grid', placeItems: 'center' }}>
                          <VideoOff size={26} />
                        </div>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>Camera Paused</span>
                      </div>
                    </div>
                  )
                ) : remoteStreams.phc ? (
                  <RemoteStreamPlayer stream={remoteStreams.phc} roleName="PHC Doctor" />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, background: '#0f172a' }}>
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
                  <span style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(4px)', color: '#5eead4', padding: '3px 9px', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>
                    🩺 PHC MEDICAL OFFICER
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {myRole === 'phc' ? (
                      <span style={{ background: '#059669', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 800 }}>
                        {cameraMode === 'virtual' ? 'VIRTUAL STREAM (THIS LAPTOP)' : 'YOUR LIVE CAM'}
                      </span>
                    ) : remoteStreams.phc ? (
                      <span style={{ background: '#0284c7', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 800 }}>
                        LIVE FROM 2ND LAPTOP
                      </span>
                    ) : (
                      <span style={{ background: '#475569', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 700 }}>
                        STANDBY
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
                  {myRole !== 'phc' && !remoteStreams.phc && (
                    <button
                      type="button"
                      onClick={() => setActiveCameraTile('phc')}
                      title="Preview your local webcam on this tile"
                      style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', fontSize: '10px', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      Switch Cam
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
                  border:
                    myRole === 'patient' || activeCameraTile === 'patient'
                      ? '2.5px solid #ea580c'
                      : remoteStreams.patient
                      ? '2.5px solid #10b981'
                      : '1.5px solid #9a3412',
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
                {myRole === 'patient' || activeCameraTile === 'patient' ? (
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
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#1e293b', color: '#94a3b8', margin: '0 auto 8px auto', display: 'grid', placeItems: 'center' }}>
                          <VideoOff size={26} />
                        </div>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>Camera Paused</span>
                      </div>
                    </div>
                  )
                ) : remoteStreams.patient ? (
                  <RemoteStreamPlayer stream={remoteStreams.patient} roleName="Patient" />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, background: '#0f172a' }}>
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80"
                      alt="Patient Appa Rao with ANM"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }}
                    />
                    {speakingParty === 'patient' && (
                      <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(234, 88, 12, 0.9)', color: '#fff', padding: '3px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Radio size={12} className="animate-pulse" /> Patient Responding...
                      </div>
                    )}
                  </div>
                )}

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(4px)', color: '#fdba74', padding: '3px 9px', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>
                    👤 PATIENT & VILLAGE ANM FACILITATOR
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {myRole === 'patient' ? (
                      <span style={{ background: '#059669', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 800 }}>
                        {cameraMode === 'virtual' ? 'VIRTUAL STREAM (THIS LAPTOP)' : 'YOUR LIVE CAM'}
                      </span>
                    ) : remoteStreams.patient ? (
                      <span style={{ background: '#0284c7', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 800 }}>
                        LIVE FROM 2ND LAPTOP
                      </span>
                    ) : (
                      <span style={{ background: '#475569', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 700 }}>
                        STANDBY
                      </span>
                    )}
                    <span style={{ background: '#0284c7', color: '#ffffff', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                      4G Solar Tele-Kiosk • 32ms
                    </span>
                  </div>
                </div>

                <div style={{ position: 'relative', zIndex: 2, background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(6px)', padding: '10px 14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>
                      {patient.name} ({patient.ageSex}) • ANM Lakshmi Devi Present
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                      Village Sub-Centre G. Madugula • High AI Suspicion (89% Concordance)
                    </div>
                  </div>
                  {myRole !== 'patient' && !remoteStreams.patient && (
                    <button
                      type="button"
                      onClick={() => setActiveCameraTile('patient')}
                      title="Preview your local webcam on this tile"
                      style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', fontSize: '10px', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      Switch Cam
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Media & Camera Control Bar */}
          <div
            style={{
              background: '#0b1324',
              borderRadius: '14px',
              padding: '12px 18px',
              border: '1px solid #1e293b',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {/* Left: Mic, Video, Screen Share */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={handleToggleMic}
                style={{
                  background: micOn ? '#1e293b' : '#ef4444',
                  color: '#ffffff',
                  border: '1px solid #334155',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                {micOn ? <Mic size={16} /> : <MicOff size={16} />}
                <span>{micOn ? 'Mute Mic' : 'Unmute Mic'}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleVideo}
                style={{
                  background: videoOn ? '#1e293b' : '#ef4444',
                  color: '#ffffff',
                  border: '1px solid #334155',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                {videoOn ? <Video size={16} /> : <VideoOff size={16} />}
                <span>{videoOn ? 'Turn Off Cam' : 'Turn On Cam'}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleScreenShare}
                style={{
                  background: isScreenSharing ? '#2563eb' : '#1e293b',
                  color: '#ffffff',
                  border: '1px solid #334155',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                <ScreenShare size={16} />
                <span>{isScreenSharing ? 'Stop Sharing' : 'Share Screen'}</span>
              </button>
            </div>

            {/* Center: Live Oral Freeze-Frame Snapshot Button */}
            <button
              type="button"
              onClick={handleCaptureOralFreezeFrame}
              disabled={isCapturingSnapshot}
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '9px 18px',
                borderRadius: '10px',
                fontSize: '12.5px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(249, 115, 22, 0.4)',
              }}
            >
              <Camera size={17} />
              <span>{isCapturingSnapshot ? 'Extracting Frame...' : '📸 Capture Oral Freeze-Frame'}</span>
            </button>

            {/* Right: Mode Switcher */}
            <div style={{ display: 'flex', background: '#090d16', padding: '3px', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <button
                type="button"
                onClick={() => setCallMode('3-way')}
                style={{
                  background: callMode === '3-way' ? '#2563eb' : 'transparent',
                  color: callMode === '3-way' ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                3-Way
              </button>
              <button
                type="button"
                onClick={() => setCallMode('2-way-patient')}
                style={{
                  background: callMode === '2-way-patient' ? '#2563eb' : 'transparent',
                  color: callMode === '2-way-patient' ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Doc + Pt
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
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Doc + Spec
              </button>
            </div>
          </div>
        </div>

        {/* Right: Integrated Clinical Drawer */}
        <div
          style={{
            background: '#0d1526',
            borderRadius: '16px',
            border: '1px solid #1e293b',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Drawer Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #1e293b', background: '#090d16' }}>
            <button
              type="button"
              onClick={() => setActiveSideTab('clinical')}
              style={{
                flex: 1,
                padding: '12px 10px',
                background: activeSideTab === 'clinical' ? '#0d1526' : 'transparent',
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
              <Activity size={15} />
              <span>AI & Findings</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSideTab('biopsy')}
              style={{
                flex: 1,
                padding: '12px 10px',
                background: activeSideTab === 'biopsy' ? '#0d1526' : 'transparent',
                color: activeSideTab === 'biopsy' ? '#f97316' : '#94a3b8',
                border: 'none',
                borderBottom: activeSideTab === 'biopsy' ? '2.5px solid #f97316' : 'none',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <FileText size={15} />
              <span>Biopsy Order</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSideTab('chat')}
              style={{
                flex: 1,
                padding: '12px 10px',
                background: activeSideTab === 'chat' ? '#0d1526' : 'transparent',
                color: activeSideTab === 'chat' ? '#f97316' : '#94a3b8',
                border: 'none',
                borderBottom: activeSideTab === 'chat' ? '2.5px solid #f97316' : 'none',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <MessageSquare size={15} />
              <span>In-Call Chat</span>
            </button>
          </div>

          {/* TAB 1: CLINICAL FINDINGS & ORAL FREEZE-FRAME SNAPSHOT */}
          {activeSideTab === 'clinical' && (
            <div style={{ padding: '16px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Captured Oral Freeze-Frame Card */}
              <div style={{ background: '#131d2e', borderRadius: '12px', padding: '12px', border: '1px solid #1e3a8a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={14} color="#f97316" /> Captured Oral Freeze-Frame
                  </span>
                  <span style={{ fontSize: '10px', background: '#f97316', color: '#fff', padding: '2px 7px', borderRadius: '8px', fontWeight: 800 }}>
                    GEMINI AI READY
                  </span>
                </div>
                <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '150px', background: '#000' }}>
                  <img
                    src={capturedOralPhoto}
                    alt="Oral lesion freeze-frame"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '6px', left: '8px', background: 'rgba(0,0,0,0.7)', padding: '2px 8px', borderRadius: '6px', fontSize: '10px', color: '#5eead4' }}>
                    Right Buccal Plaque • 8-Week History
                  </div>
                </div>
              </div>

              {/* AI Triage & Concordance Banner */}
              <div style={{ background: '#1c1917', border: '1px solid #78350f', borderRadius: '12px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#fde047' }}>
                    ⚠️ {patient.aiAssessment?.triageClassification || 'High Suspicion - Malignancy Alert'}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#4ade80' }}>
                    {patient.aiAssessment?.concordanceScore || 89}% Concordance
                  </span>
                </div>
                <p style={{ fontSize: '11.5px', color: '#d6d3d1', margin: '8px 0 0 0', lineHeight: 1.5 }}>
                  AI multi-modal vision detects localized mucosal thickening with irregular margins. Concordant with clinical presentation of Adda Poga reverse smoker palate keratosis.
                </p>
              </div>

              {/* Exposure Factors */}
              <div style={{ background: '#131d2e', borderRadius: '12px', padding: '12px', border: '1px solid #1e293b' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Key Risk Factors & Exposures
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                  {patient.exposureHistory?.map((exp, idx) => (
                    <div key={idx} style={{ fontSize: '11.5px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#ef4444' }}>●</span>
                      <span>{exp.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BIOPSY ORDER REQUISITION */}
          {activeSideTab === 'biopsy' && (
            <div style={{ padding: '16px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {biopsyOrdered ? (
                <div style={{ background: '#022c22', border: '1.5px solid #059669', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: 800, fontSize: '13px' }}>
                    <CheckCircle2 size={18} />
                    <span>Official Biopsy Requisition Active</span>
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '11.5px', color: '#a7f3d0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div><strong>Requisition ID:</strong> BIO-PADERU-2026-8812</div>
                    <div><strong>Procedure:</strong> {biopsyType}</div>
                    <div><strong>Urgency:</strong> {biopsyUrgency}</div>
                    <div><strong>Authorized By:</strong> Dr. Ananya Varma, MD (Oral Oncology)</div>
                    <div><strong>Target Lab:</strong> Area Hospital Paderu Histopathology Division</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    style={{
                      marginTop: '12px',
                      background: '#059669',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Printer size={15} />
                    <span>Print Formal Requisition Slip</span>
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                      Biopsy Protocol & Method
                    </label>
                    <select
                      value={biopsyType}
                      onChange={(e) => setBiopsyType(e.target.value)}
                      style={{ width: '100%', background: '#131d2e', border: '1px solid #334155', color: '#fff', padding: '8px 10px', borderRadius: '8px', fontSize: '12px' }}
                    >
                      <option>Punch Biopsy (4mm Core)</option>
                      <option>Incisional Scalpel Biopsy</option>
                      <option>Exfoliative Cytology Scraping</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                      Clinical Urgency Level
                    </label>
                    <select
                      value={biopsyUrgency}
                      onChange={(e) => setBiopsyUrgency(e.target.value)}
                      style={{ width: '100%', background: '#131d2e', border: '1px solid #334155', color: '#fff', padding: '8px 10px', borderRadius: '8px', fontSize: '12px' }}
                    >
                      <option>Within 48 Hours (High Priority)</option>
                      <option>Within 7 Days (Standard Review)</option>
                      <option>Immediate / Same-Day Escalation</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                      Pathologist Clinical Notes & Instructions
                    </label>
                    <textarea
                      value={biopsyNotes}
                      onChange={(e) => setBiopsyNotes(e.target.value)}
                      rows={4}
                      style={{ width: '100%', background: '#131d2e', border: '1px solid #334155', color: '#fff', padding: '8px 10px', borderRadius: '8px', fontSize: '11.5px', lineHeight: 1.5 }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleOrderBiopsy}
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 16px',
                      borderRadius: '10px',
                      fontSize: '12.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(5, 150, 105, 0.4)',
                    }}
                  >
                    <ShieldCheck size={16} />
                    <span>Authorize Biopsy Order to Paderu</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: IN-CALL CLINICAL CHAT */}
          {activeSideTab === 'chat' && (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {chatMessages.map((msg) => (
                  <div key={msg.id} style={{ background: '#131d2e', borderRadius: '10px', padding: '10px 12px', border: '1px solid #1e293b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: msg.sender.includes('Specialist') ? '#fdba74' : msg.sender.includes('PHC') ? '#5eead4' : '#f8fafc' }}>
                        {msg.sender}
                      </span>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>{msg.time}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#cbd5e1', margin: 0, lineHeight: 1.45 }}>{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChat} style={{ padding: '12px', borderTop: '1px solid #1e293b', background: '#090d16', display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={newChatText}
                  onChange={(e) => setNewChatText(e.target.value)}
                  placeholder="Type clinical observation..."
                  style={{ flex: 1, background: '#131d2e', border: '1px solid #334155', color: '#fff', padding: '8px 12px', borderRadius: '8px', fontSize: '12px' }}
                />
                <button
                  type="submit"
                  style={{ background: '#f97316', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* POPUP MODAL: HOW TO ENABLE REAL PHYSICAL WEBCAM ON 2ND LAPTOP OVER HTTP */}
      {showCameraHelpModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <div
            style={{
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '16px',
              maxWidth: '560px',
              width: '100%',
              padding: '24px',
              color: '#f8fafc',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
            }}
          >
            <button
              type="button"
              onClick={() => setShowCameraHelpModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#2563eb', display: 'grid', placeItems: 'center' }}>
                <Camera size={20} color="#fff" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>How to Enable Real Webcam on 2nd Laptop</h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
                  Chrome blocks cameras on HTTP (Not Secure) origins by default. Here is the 10-second fix:
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px', lineHeight: 1.5, color: '#cbd5e1' }}>
              <div style={{ background: '#1e293b', padding: '10px 14px', borderRadius: '10px' }}>
                <strong>Step 1:</strong> In Chrome on your second laptop, open a new tab and paste:
                <div style={{ background: '#090d16', padding: '6px 10px', borderRadius: '6px', color: '#38bdf8', fontFamily: 'monospace', margin: '6px 0', fontSize: '12px' }}>
                  chrome://flags/#unsafely-treat-insecure-origin-as-secure
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '10px 14px', borderRadius: '10px' }}>
                <strong>Step 2:</strong> In the text box that appears, paste your laptop's URL:
                <div style={{ background: '#090d16', padding: '6px 10px', borderRadius: '6px', color: '#f97316', fontFamily: 'monospace', margin: '6px 0', fontSize: '12px' }}>
                  http://192.168.1.67:5173
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '10px 14px', borderRadius: '10px' }}>
                <strong>Step 3:</strong> Change the dropdown from <strong>Disabled</strong> to <strong>Enabled</strong>, then click the blue <strong>Relaunch</strong> button at the bottom of Chrome.
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowCameraHelpModal(false)}
                style={{
                  background: '#f97316',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
