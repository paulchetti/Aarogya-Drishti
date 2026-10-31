import React, { useState } from 'react';
import {
  CalendarCheck,
  Video,
  MapPin,
  Clock,
  User,
  Star,
  Plus,
  CheckCircle,
  PhoneCall,
  Search,
  Filter
} from 'lucide-react';
import { availableDoctors, upcomingAppointments } from '../../data/mockHealthData';

export default function ScheduledConsultationsView({ onStartTeleconsult }) {
  const [filter, setFilter] = useState('upcoming'); // 'upcoming' | 'completed' | 'all'
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState('');

  // Initial consults list
  const [consultations, setConsultations] = useState([
    {
      id: 'CONS-901',
      doctor: 'Dr. Andrew Sharma',
      title: 'MD, DM (Cardiology)',
      specialty: 'Cardiology & Telemedicine',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      date: 'Today, 4 Nov 2025',
      time: '09:00 AM',
      mode: 'Video Teleconsult',
      status: 'Confirmed',
      reason: 'Heart rhythm review & Statin therapy adjustment',
      patientName: 'Bessie Cooper',
      isLiveNow: true
    },
    {
      id: 'CONS-902',
      doctor: 'Dr. Priya Nair',
      title: 'MBBS, MD (General Medicine)',
      specialty: 'Internal Medicine & Chronic Care',
      avatar: 'https://images.unsplash.com/photo-1594824813576-857e4e0477bf?w=150&auto=format&fit=crop&q=80',
      date: 'Tomorrow, 5 Nov 2025',
      time: '11:30 AM',
      mode: 'Video Teleconsult',
      status: 'Confirmed',
      reason: 'Quarterly diabetic management review',
      patientName: 'Cody Fisher',
      isLiveNow: false
    },
    {
      id: 'CONS-903',
      doctor: 'Dr. Rajesh Iyer',
      title: 'MS (Orthopedics), DNB',
      specialty: 'Orthopedics & Sports Rehab',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
      date: '7 Nov 2025',
      time: '02:30 PM',
      mode: 'In-Clinic Physical',
      status: 'Confirmed',
      reason: 'Knee joint mobility assessment & physical therapy',
      patientName: 'Noah Patel',
      isLiveNow: false
    },
    {
      id: 'CONS-904',
      doctor: 'Dr. Sunita Sen',
      title: 'MD, DGO (Obstetrics & Gynecology)',
      specialty: 'Maternal Health & Antenatal Care',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
      date: '28 Oct 2025',
      time: '04:00 PM',
      mode: 'Video Teleconsult',
      status: 'Completed',
      reason: 'Routine ultrasound follow-up review',
      patientName: 'Sophia Reyes',
      isLiveNow: false
    }
  ]);

  // Booking Form State
  const [selectedDoctorId, setSelectedDoctorId] = useState(availableDoctors[0].id);
  const [consultMode, setConsultMode] = useState('Video Teleconsult');
  const [consultDate, setConsultDate] = useState('2025-11-06');
  const [consultSlot, setConsultSlot] = useState(availableDoctors[0].slots[0]);
  const [consultReason, setConsultReason] = useState('');

  const handleBookConsultation = (e) => {
    e.preventDefault();
    const doc = availableDoctors.find((d) => d.id === selectedDoctorId) || availableDoctors[0];

    const newBooking = {
      id: `CONS-${Math.floor(1000 + Math.random() * 9000)}`,
      doctor: doc.name,
      title: doc.title,
      specialty: doc.specialty,
      avatar: doc.avatar,
      date: consultDate,
      time: consultSlot,
      mode: consultMode,
      status: 'Confirmed',
      reason: consultReason || 'General clinical health assessment',
      patientName: 'Self (Citizen)',
      isLiveNow: false
    };

    setConsultations([newBooking, ...consultations]);
    setShowBookingModal(false);
    setBookingSuccess(`Consultation booked successfully with ${doc.name} on ${consultDate} at ${consultSlot}!`);
    setTimeout(() => setBookingSuccess(''), 5000);
  };

  const filteredConsultations = consultations.filter((c) => {
    if (filter === 'upcoming') return c.status === 'Confirmed';
    if (filter === 'completed') return c.status === 'Completed';
    return true;
  });

  return (
    <div className="dashboard-content-area feature-view-container">
      {/* Header */}
      <div className="feature-header">
        <div className="feature-header-left">
          <h1>Scheduled Consultations</h1>
          <p>Book and attend virtual teleconsultations or in-person clinic visits with verified specialists.</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setShowBookingModal(true)}
        >
          <Plus size={18} />
          <span>+ Book New Consultation</span>
        </button>
      </div>

      {bookingSuccess && (
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
          <span>{bookingSuccess}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[
          { id: 'upcoming', label: 'Upcoming Consultations' },
          { id: 'completed', label: 'Past / Completed' },
          { id: 'all', label: 'All History' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`tab-pill ${filter === tab.id ? 'active' : ''}`}
            style={{ padding: '8px 20px' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Consultations Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredConsultations.map((c) => {
          const isVideo = c.mode.includes('Video') || c.mode.includes('Teleconsult');
          return (
            <div
              key={c.id}
              className="form-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px',
                borderLeft: c.isLiveNow ? '4px solid #10b981' : '1px solid #eef2f6'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <img
                      src={c.avatar}
                      alt={c.doctor}
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h3 style={{ margin: '0 0 2px', fontSize: '1.05rem', fontWeight: 700 }}>{c.doctor}</h3>
                      <div style={{ fontSize: '0.78rem', color: '#0d9488', fontWeight: 600 }}>{c.specialty}</div>
                    </div>
                  </div>

                  <span
                    style={{
                      background: c.isLiveNow ? '#d1fae5' : c.status === 'Completed' ? '#f1f5f9' : '#e0f2fe',
                      color: c.isLiveNow ? '#065f46' : c.status === 'Completed' ? '#475569' : '#0369a1',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '12px'
                    }}
                  >
                    {c.isLiveNow ? '● READY TO JOIN' : c.status}
                  </span>
                </div>

                <div
                  style={{
                    background: '#f8fafc',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    fontSize: '0.84rem',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                    <Clock size={15} color="#0d9488" />
                    <strong>{c.date}</strong> at <strong>{c.time}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                    {isVideo ? <Video size={15} color="#0d9488" /> : <MapPin size={15} color="#0d9488" />}
                    <span>{c.mode}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>
                    <strong>Reason:</strong> {c.reason}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                {isVideo && c.status === 'Confirmed' && (
                  <button
                    className="btn-primary"
                    style={{
                      background: c.isLiveNow ? 'linear-gradient(135deg, #10b981, #059669)' : undefined,
                      width: '100%',
                      justifyContent: 'center'
                    }}
                    onClick={() =>
                      onStartTeleconsult({
                        name: c.patientName,
                        doctor: c.doctor,
                        specialty: c.specialty,
                        avatar: c.avatar
                      })
                    }
                  >
                    <Video size={16} />
                    <span>{c.isLiveNow ? 'Join Live Consultation Now' : 'Join Video Room'}</span>
                  </button>
                )}

                {!isVideo && (
                  <button
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => alert(`Directions to clinic sent to your registered phone number!`)}
                  >
                    <MapPin size={15} />
                    <span>View Clinic Directions</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Book New Consultation Modal */}
      {showBookingModal && (
        <div className="modal-backdrop" onClick={() => setShowBookingModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarCheck size={22} color="#0d9488" />
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Schedule Clinical Consultation</h3>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBookConsultation}>
              {/* Doctor Selection */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  Choose Specialist Doctor *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {availableDoctors.map((doc) => {
                    const isSelected = selectedDoctorId === doc.id;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        style={{
                          border: isSelected ? '2px solid #0d9488' : '1px solid #e2e8f0',
                          background: isSelected ? '#f0fdfa' : '#ffffff',
                          borderRadius: '12px',
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <img
                          src={doc.avatar}
                          alt={doc.name}
                          style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>{doc.name}</div>
                          <div style={{ fontSize: '0.72rem', color: '#0d9488' }}>{doc.specialty}</div>
                          <div style={{ fontSize: '0.7rem', color: '#f59e0b', marginTop: '2px' }}>
                            ★ {doc.rating} ({doc.reviews} reviews)
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Consultation Mode */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  Consultation Mode *
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['Video Teleconsult', 'In-Clinic Physical'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setConsultMode(mode)}
                      className={`tab-pill ${consultMode === mode ? 'active' : ''}`}
                      style={{ flex: 1, padding: '10px', textAlign: 'center' }}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="form-grid-2" style={{ marginBottom: '16px' }}>
                <div className="form-group">
                  <label>Select Date *</label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    value={consultDate}
                    onChange={(e) => setConsultDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Available Time Slot *</label>
                  <select
                    className="form-control"
                    value={consultSlot}
                    onChange={(e) => setConsultSlot(e.target.value)}
                  >
                    {availableDoctors.find((d) => d.id === selectedDoctorId)?.slots.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reason for Consultation */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label>Reason for Visit / Primary Symptoms</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Describe your current symptoms or reason for consulting the doctor..."
                  value={consultReason}
                  onChange={(e) => setConsultReason(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <CheckCircle size={17} />
                  <span>Confirm Appointment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

