import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Plus,
  Users,
  Baby,
  Heart,
  Video,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

export default function ANMVisitScheduleView({ onStartTeleconsult }) {
  const [toastMessage, setToastMessage] = useState('');
  const [selectedDay, setSelectedDay] = useState('Today');
  const [showAddVisitModal, setShowAddVisitModal] = useState(false);

  const [schedule, setSchedule] = useState([
    {
      id: 'SCH-01',
      time: '09:00 AM - 10:30 AM',
      day: 'Today',
      date: '02 Nov 2025',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      ashaPartner: 'ASHA Kumari Devi',
      type: 'Door-to-Door NCD & Oral Screening',
      targetHouseholds: 12,
      plannedVisits: [
        'Ramu Korra (BP & Oral recheck)',
        'Somulu Korra (New ABHA & Sugar)',
        'Elderly residents (Households 3-41 to 3-52)'
      ],
      status: 'In Progress'
    },
    {
      id: 'SCH-02',
      time: '11:00 AM - 01:00 PM',
      day: 'Today',
      date: '02 Nov 2025',
      hamlet: 'Paderu Ward 3 (Gondiguda)',
      ashaPartner: 'ASHA Kumari Devi',
      type: 'Antenatal Care (ANC) Home Checks',
      targetHouseholds: 4,
      plannedVisits: [
        'Kumari Korra (28 Wks, Hb retest & IFA count)',
        'Postnatal check for newborn of Lakshmi'
      ],
      status: 'Upcoming'
    },
    {
      id: 'SCH-03',
      time: '02:30 PM - 04:30 PM',
      day: 'Today',
      date: '02 Nov 2025',
      hamlet: 'Sub-Centre Paderu HQ',
      ashaPartner: 'All ASHAs',
      type: 'PHC Doctor Teleconsultation Hours',
      targetHouseholds: 6,
      plannedVisits: [
        'Dr. Sandeep Kumar (MO Paderu) Video Link',
        '3 High-risk referrals queued'
      ],
      status: 'Upcoming'
    },
    {
      id: 'SCH-04',
      time: '09:30 AM - 02:00 PM',
      day: 'Tomorrow',
      date: '03 Nov 2025',
      hamlet: 'Paderu Ward 4 (Tribal Settlement)',
      ashaPartner: 'ASHA Somamma Korra',
      type: 'Village Health & Nutrition Day (VHND)',
      targetHouseholds: 25,
      plannedVisits: [
        'Routine Universal Immunization (UIP)',
        'Growth monitoring & Take-Home Ration',
        'Rajeswari Killo (Severe Anemia review)'
      ],
      status: 'Scheduled'
    },
    {
      id: 'SCH-05',
      time: '10:00 AM - 01:30 PM',
      day: 'Wednesday',
      date: '05 Nov 2025',
      hamlet: 'Paderu Ward 2 (Pedaguda)',
      ashaPartner: 'ASHA Parvathi Killo',
      type: 'Elderly Chronic Care & Sugar Camp',
      targetHouseholds: 18,
      plannedVisits: [
        'Glucometer test strip screening camp',
        'Hypertension medicine refill distribution'
      ],
      status: 'Scheduled'
    }
  ]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const filteredSchedule = schedule.filter((s) => selectedDay === 'ALL' || s.day === selectedDay);

  return (
    <div style={{ padding: '24px', background: '#f8fafc' }}>
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            background: '#0d9488',
            color: '#ffffff',
            padding: '12px 22px',
            borderRadius: '30px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            zIndex: 9999,
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER & FILTER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '22px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
            Frontline Visit &amp; Screening Schedule Itinerary
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
            Daily village itineraries, VHND sessions, and outreach immunization camps
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['Today', 'Tomorrow', 'Wednesday', 'ALL'].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: selectedDay === day ? 'none' : '1px solid #cbd5e1',
                background: selectedDay === day ? '#0052cc' : '#ffffff',
                color: selectedDay === day ? '#ffffff' : '#64748b',
                cursor: 'pointer'
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* SCHEDULE CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredSchedule.map((item) => (
          <div
            key={item.id}
            style={{
              background: '#ffffff',
              borderRadius: '18px',
              border: item.status === 'In Progress' ? '2px solid #93c5fd' : '1.5px solid #e2e8f0',
              padding: '20px 24px',
              boxShadow: item.status === 'In Progress' ? '0 6px 20px rgba(0, 82, 204, 0.08)' : '0 2px 8px rgba(0,0,0,0.02)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    background: item.status === 'In Progress' ? '#eff6ff' : '#f8fafc',
                    color: item.status === 'In Progress' ? '#0052cc' : '#475569',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Clock size={13} />
                  <span>{item.time}</span>
                </span>

                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                  {item.day} ({item.date})
                </span>

                <span
                  style={{
                    background: item.status === 'In Progress' ? '#f0fdf4' : '#f1f5f9',
                    color: item.status === 'In Progress' ? '#16a34a' : '#64748b',
                    padding: '3px 8px',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: 700
                  }}
                >
                  ● {item.status}
                </span>
              </div>

              <h4 style={{ margin: '8px 0 2px', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                {item.type}
              </h4>

              <div style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <MapPin size={14} />
                <span>Location: {item.hamlet} • Accompanied by: {item.ashaPartner}</span>
              </div>

              <div style={{ marginTop: '10px', background: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase' }}>
                  Planned Itinerary &amp; Target ({item.targetHouseholds} Households):
                </div>
                <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: '0.8rem', color: '#475569' }}>
                  {item.plannedVisits.map((v, idx) => (
                    <li key={idx}>{v}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px', alignItems: 'flex-end' }}>
              <button
                onClick={() => showNotification(`Opened household checklist for ${item.hamlet}`)}
                style={{
                  background: 'linear-gradient(100deg, #ff7a00, #f97316)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '9px 18px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                Open Checklist
              </button>

              <button
                onClick={() => showNotification(`Call connected to ${item.ashaPartner}`)}
                style={{
                  background: '#f1f5f9',
                  color: '#334155',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                📞 Call ASHA Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

