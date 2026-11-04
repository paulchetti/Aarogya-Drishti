import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Hospital,
  UserCheck,
  Video,
  MapPin,
  CheckCircle,
  Printer,
  X,
  AlertCircle,
  Truck,
  Phone,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  getAllPatients,
  TERTIARY_SPECIALIST_CENTER,
} from '../../services/referralRoutingService';

export default function AppointmentSchedulingModal({
  isOpen,
  onClose,
  initialPatient = null,
  onAppointmentBooked,
  onLaunchTelehealth,
}) {
  const { language } = useLanguage();
  const allPatients = getAllPatients();

  const [selectedPatientId, setSelectedPatientId] = useState(
    initialPatient?.id || (allPatients[0] ? allPatients[0].id : 'ADP-2026-0046')
  );
  const currentPatient =
    allPatients.find((p) => p.id === selectedPatientId) || initialPatient || allPatients[0];

  const [consultType, setConsultType] = useState('teleconsult'); // 'teleconsult' | 'physical_opd'
  const [specialty, setSpecialty] = useState('Head & Neck Surgical Oncology');
  const [facility, setFacility] = useState(TERTIARY_SPECIALIST_CENTER.name);
  const [selectedDoctor, setSelectedDoctor] = useState(
    'Dr. Ananya Varma, MD (Surgical Oncology)'
  );
  const [slotDate, setSlotDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [slotTime, setSlotTime] = useState('10:30 AM');
  const [priority, setPriority] = useState('Urgent (Within 48h)');
  const [transportAssistance, setTransportAssistance] = useState(true);
  const [assignNavigator, setAssignNavigator] = useState(true);
  const [smsNotification, setSmsNotification] = useState(true);

  const [isBooked, setIsBooked] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  if (!isOpen) return null;

  const availableSlots = [
    { time: '09:30 AM', status: 'Available' },
    { time: '10:30 AM', status: 'Available' },
    { time: '11:45 AM', status: 'Available' },
    { time: '02:15 PM', status: 'Available' },
    { time: '03:45 PM', status: 'Fast-Track Slot' },
  ];

  const handleBookAppointment = (e) => {
    e.preventDefault();
    const tokenNumber = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
    const confirmation = {
      tokenNumber,
      patientId: currentPatient.id,
      patientName: currentPatient.name,
      consultType,
      specialty,
      facility,
      doctor: selectedDoctor,
      slotDate,
      slotTime,
      priority,
      transportAssistance,
      navigatorAssigned: assignNavigator ? 'ASHA Facilitator Parvathi Devi (98480-11223)' : 'Self-Arranged',
      smsDispatched: smsNotification,
      meetingRoomId: `paderu-telemed-${currentPatient.id.slice(-4)}`,
      meetingLink: `${window.location.origin}/?teleconsult=true&room=paderu-telemed-${currentPatient.id.slice(-4)}&role=specialist`,
    };

    // Save to patient longitudinal record
    try {
      const stored = localStorage.getItem('aarogya_patients_db');
      if (stored) {
        const patients = JSON.parse(stored);
        const idx = patients.findIndex((p) => p.id === currentPatient.id);
        if (idx !== -1) {
          if (!patients[idx].appointments) patients[idx].appointments = [];
          patients[idx].appointments.push({
            ...confirmation,
            createdAt: new Date().toISOString(),
            status: 'Confirmed & Scheduled',
          });
          patients[idx].longitudinalTimeline.push({
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            actor: 'Dr. Sandeep Kumar, MBBS',
            action: `${consultType === 'teleconsult' ? 'Teleconsultation Slot Booked' : 'Physical Hospital OPD Visit Scheduled'} with ${selectedDoctor} for ${slotDate} at ${slotTime}`,
            status: 'Scheduled',
          });
          localStorage.setItem('aarogya_patients_db', JSON.stringify(patients));
          window.dispatchEvent(new Event('aarogya_patients_updated'));
        }
      }
    } catch (err) {
      console.warn('Could not persist appointment record:', err);
    }

    setBookingConfirmation(confirmation);
    setIsBooked(true);
    if (onAppointmentBooked) onAppointmentBooked(confirmation);
  };

  const handlePrintSlip = () => {
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
          maxWidth: '720px',
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
            background: isBooked
              ? 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)'
              : 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: isBooked ? '#dcfce7' : '#ffedd5',
                display: 'grid',
                placeItems: 'center',
                color: isBooked ? '#16a34a' : '#ea580c',
              }}
            >
              {isBooked ? <CheckCircle size={24} /> : <Calendar size={24} />}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                {isBooked
                  ? (language === 'te' ? 'అపాయింట్‌మెంట్ విజయవంతంగా ఖరారైంది' : 'Appointment Confirmed & Scheduled')
                  : (language === 'te' ? 'అపాయింట్‌మెంట్లు & స్లాట్ షెడ్యూలింగ్' : 'Appointment Scheduling & Slot Management')}
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                {language === 'te'
                  ? 'మాడ్యూల్ E & F: స్పెషలిస్ట్ టెలీమెడిసిన్ మరియు ప్రత్యక్ష ఆసుపత్రి రెఫరల్'
                  : 'Modules E & F: Specialist Telemedicine & Physical Hospital Outpatient Appointment'}
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

        {/* Content Body */}
        {!isBooked ? (
          <form onSubmit={handleBookAppointment} style={{ padding: '24px' }}>
            {/* Step 1: Patient Selection */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '14px 16px',
                marginBottom: '18px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#475569' }}>
                  {language === 'te' ? 'రోగి ఎంపిక (పేషెంట్ రికార్డ్)' : 'Select Patient Record'}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: currentPatient?.triageCategory === 'red_flag' ? '#fee2e2' : '#fef3c7',
                    color: currentPatient?.triageCategory === 'red_flag' ? '#b91c1c' : '#b45309',
                  }}
                >
                  {currentPatient?.triageCategory === 'red_flag' ? '🚨 Red Flag Lesion' : '⚠️ Moderate Risk'}
                </span>
              </div>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0f172a',
                  background: '#ffffff',
                }}
              >
                {allPatients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.id}) • {p.ageSex} • {p.village}, {p.mandal} • {p.primaryLesionSite || 'Oral Lesion'}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Consultation Mode (Teleconsult vs Physical Hospital OPD) */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
                {language === 'te' ? 'సంప్రదింపు విధానం (Consultation Type)' : 'Consultation Mode & Channel'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div
                  onClick={() => setConsultType('teleconsult')}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: `2px solid ${consultType === 'teleconsult' ? '#ea580c' : '#e2e8f0'}`,
                    background: consultType === 'teleconsult' ? '#fff7ed' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: consultType === 'teleconsult' ? '#ffedd5' : '#f1f5f9',
                      display: 'grid',
                      placeItems: 'center',
                      color: consultType === 'teleconsult' ? '#ea580c' : '#64748b',
                    }}
                  >
                    <Video size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '13px', color: '#0f172a' }}>
                      {language === 'te' ? 'వీడియో టెలి-కన్సల్టేషన్' : 'Telemedicine Video Slot'}
                    </strong>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      {language === 'te' ? 'రియల్-టైమ్ వెబ్‌ఆర్‌టీసీ లైవ్ కాల్' : 'Live Specialist Review (WebRTC)'}
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setConsultType('physical_opd')}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: `2px solid ${consultType === 'physical_opd' ? '#0d9488' : '#e2e8f0'}`,
                    background: consultType === 'physical_opd' ? '#f0fdfa' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: consultType === 'physical_opd' ? '#ccfbf1' : '#f1f5f9',
                      display: 'grid',
                      placeItems: 'center',
                      color: consultType === 'physical_opd' ? '#0d9488' : '#64748b',
                    }}
                  >
                    <Hospital size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '13px', color: '#0f172a' }}>
                      {language === 'te' ? 'ప్రత్యక్ష ఆసుపత్రి ఓపీడీ' : 'Physical Hospital Visit (OPD)'}
                    </strong>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      {language === 'te' ? 'ఏరియా ఆసుపత్రి పాడేరు' : 'Area Hospital Paderu / KGH'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Destination Hospital & Specialist Selection */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                  {language === 'te' ? 'నిర్దేశిత ఆసుపత్రి' : 'Designated Hospital'}
                </label>
                <select
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  <option value={TERTIARY_SPECIALIST_CENTER.name}>Area Hospital Paderu (Tribal Oncology Hub)</option>
                  <option value="King George Hospital (KGH) - Visakhapatnam">King George Hospital (KGH) Visakhapatnam</option>
                  <option value="Mahatma Gandhi Cancer Hospital (MGCHRI) - Vizag">MGCHRI Comprehensive Cancer Centre</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                  {language === 'te' ? 'స్పెషలిస్ట్ సర్జన్' : 'Specialist Clinician'}
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  <option value="Dr. Ananya Varma, MD (Surgical Oncology)">Dr. Ananya Varma, MD (Surgical Oncology)</option>
                  <option value="Dr. M. Prasad, MDS (Oral & Maxillofacial Pathology)">Dr. M. Prasad, MDS (Oral Pathology)</option>
                  <option value="On-Call Tribal Tele-Oncology Board">On-Call Tribal Tele-Oncology Board</option>
                </select>
              </div>
            </div>

            {/* Step 4: Date & Available Slots */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px', alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                    {language === 'te' ? 'తేదీ' : 'Select Date'}
                  </label>
                  <input
                    type="date"
                    value={slotDate}
                    onChange={(e) => setSlotDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                    {language === 'te' ? 'లభ్యత ఉన్న స్లాట్లు' : 'Available Time Slots'}
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {availableSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot.time}
                        onClick={() => setSlotTime(slot.time)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: slotTime === slot.time ? '2px solid #ea580c' : '1px solid #cbd5e1',
                          background: slotTime === slot.time ? '#ffedd5' : '#ffffff',
                          color: slotTime === slot.time ? '#c2410c' : '#334155',
                        }}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Patient Navigation & Tribal Support Services (Module I) */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '14px 16px',
                marginBottom: '20px',
              }}
            >
              <span style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#0d9488', marginBottom: '8px' }}>
                {language === 'te' ? 'గిరిజన రోగి రవాణా & నావిగేటర్ సహాయం (Module I)' : 'Patient Navigation & Transport Assistance (Module I)'}
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={transportAssistance}
                    onChange={(e) => setTransportAssistance(e.target.checked)}
                  />
                  <span>
                    <strong>{language === 'te' ? '₹500 ఐటీడీఏ రవాణా వోచర్ & 108 గిరిజన అంబులెన్స్ సదుపాయం' : 'Issue ₹500 ITDA Tribal Transport Voucher & 108 Feeder Ambulance alert'}</strong>
                  </span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={assignNavigator}
                    onChange={(e) => setAssignNavigator(e.target.checked)}
                  />
                  <span>
                    <strong>{language === 'te' ? 'గ్రామ ఆశా వర్కర్‌ను పేషెంట్ నావిగేటర్‌గా కేటాయించండి (పార్వతీ దేవి)' : 'Assign dedicated ASHA Patient Navigator (Parvathi Devi)'}</strong>
                  </span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={smsNotification}
                    onChange={(e) => setSmsNotification(e.target.checked)}
                  />
                  <span>{language === 'te' ? 'రోగి ఫోన్‌కు తెలుగులో నాన్-సెన్సిటివ్ ఎస్ఎంఎస్ రిమైండర్ పంపండి' : 'Dispatch non-sensitive bilingual SMS reminder to patient phone'}</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '9px 18px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#475569',
                }}
              >
                {language === 'te' ? 'రద్దు చేయి' : 'Cancel'}
              </button>
              <button
                type="submit"
                style={{
                  padding: '9px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)',
                }}
              >
                {language === 'te' ? 'స్లాట్ ఖరారు చేయండి' : 'Confirm & Schedule Appointment'}
              </button>
            </div>
          </form>
        ) : (
          /* Printable Bilingual Confirmation Slip (Module F) */
          <div style={{ padding: '24px' }}>
            <div
              id="printable-appointment-slip"
              style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '16px',
                padding: '24px',
                background: '#fafafa',
                marginBottom: '20px',
              }}
            >
              {/* Slip Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0d9488', paddingBottom: '12px', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', color: '#0d9488', fontWeight: 900 }}>
                    AAROGYA DRISHTI • ఆసుపత్రి అపాయింట్‌మెంట్ రసీదు
                  </h4>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    ITDA Paderu Tribal Oral Cancer Triage Network • Govt of Andhra Pradesh
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>TOKEN / టోకెన్</span>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#ea580c' }}>
                    {bookingConfirmation?.tokenNumber}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Patient Name / రోగి పేరు</span>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{bookingConfirmation?.patientName}</div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>ID: {bookingConfirmation?.patientId}</div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Mode & Schedule / సమయం</span>
                  <div style={{ fontWeight: 800, color: '#ea580c' }}>
                    {bookingConfirmation?.slotDate} • {bookingConfirmation?.slotTime}
                  </div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>
                    {bookingConfirmation?.consultType === 'teleconsult' ? '🌐 Live Telemedicine Video Consult' : '🏥 Physical Hospital OPD'}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Designated Facility / ఆసుపత్రి</span>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{bookingConfirmation?.facility}</div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>{bookingConfirmation?.specialty}</div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Assigned Specialist / నిపుణులు</span>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{bookingConfirmation?.doctor}</div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Assigned Navigator / నావిగేటర్</span>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{bookingConfirmation?.navigatorAssigned}</div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Transport Assistance / రవాణా</span>
                  <div style={{ fontWeight: 700, color: '#16a34a' }}>
                    {bookingConfirmation?.transportAssistance ? '₹500 ITDA Voucher Issued' : 'Self-Transport'}
                  </div>
                </div>
              </div>

              {/* Instructions in Telugu and English */}
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '10px 14px', fontSize: '11px', color: '#166534' }}>
                <strong>గమనిక (Instructions):</strong> దయచేసి అపాయింట్‌మెంట్ సమయానికి 15 నిమిషాల ముందుగా ప్రాథమిక ఆరోగ్య కేంద్రం లేదా ఏరియా ఆసుపత్రికి చేరుకోండి. ఆధార్ కార్డు తప్పనిసరి కాదు.
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handlePrintSlip}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: '#334155',
                }}
              >
                <Printer size={16} />
                <span>{language === 'te' ? 'రసీదు ప్రింట్ చేయండి' : 'Print Bilingual Slip (Ctrl+P)'}</span>
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                {bookingConfirmation?.consultType === 'teleconsult' && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onLaunchTelehealth) onLaunchTelehealth(currentPatient);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '9px 20px',
                      borderRadius: '10px',
                      border: 'none',
                      background: '#0d9488',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <Video size={16} />
                    <span>{language === 'te' ? 'వీడియో కాల్ ప్రారంభించండి' : 'Open Video Suite Now'}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '9px 22px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#0f172a',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {language === 'te' ? 'ముగించు' : 'Done'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
