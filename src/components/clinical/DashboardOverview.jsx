import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  UserPlus,
  Calendar,
  MoreHorizontal,
  FileText,
  Printer,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { initialStats, initialPatients, upcomingAppointments } from '../../data/mockHealthData';

export default function DashboardOverview({
  onNavigate,
  onStartTeleconsult,
  onOpenReport
}) {
  const [timeFilter, setTimeFilter] = useState('Daily');
  const [selectedDay, setSelectedDay] = useState(4); // 4 Sun
  const [patientsList, setPatientsList] = useState(initialPatients);

  const daysList = [
    { dayNum: 3, dayName: 'Sat' },
    { dayNum: 4, dayName: 'Sun' },
    { dayNum: 5, dayName: 'Mon' },
    { dayNum: 6, dayName: 'Tue' },
    { dayNum: 7, dayName: 'Wed' },
    { dayNum: 8, dayName: 'Thu' },
    { dayNum: 9, dayName: 'Fri' },
  ];

  // Daily appointment bar chart data
  const barChartData = [
    { day: 'Sat', clinic: 15, online: 20 },
    { day: 'Sun', clinic: 10, online: 25 },
    { day: 'Mon', clinic: 12, online: 40, active: true },
    { day: 'Tue', clinic: 18, online: 32 },
    { day: 'Wed', clinic: 14, online: 28 },
    { day: 'Thu', clinic: 16, online: 35 },
    { day: 'Fri', clinic: 12, online: 26 },
  ];

  return (
    <div className="dashboard-content-area">
      {/* --------------------------------------------------------------------
          TOP ROW: 4 STATS CARDS (Pastel Palette)
          -------------------------------------------------------------------- */}
      <div className="stats-grid">
        {/* Total Patients */}
        <div
          className="stat-card stat-card-blue"
          onClick={() => onNavigate('intake')}
          style={{ cursor: 'pointer' }}
        >
          <div className="stat-icon-wrap">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-title">Total Patients</div>
            <div className="stat-value-row">
              <span className="stat-number">{initialStats.totalPatients}</span>
              <span className="trend-badge trend-up">
                <ArrowUpRight size={13} /> {initialStats.totalPatientsTrend}
              </span>
            </div>
          </div>
        </div>

        {/* Old Patients / EHR Records */}
        <div
          className="stat-card stat-card-pink"
          onClick={() => onNavigate('ehr')}
          style={{ cursor: 'pointer' }}
        >
          <div className="stat-icon-wrap">
            <UserCheck size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-title">Old Patients</div>
            <div className="stat-value-row">
              <span className="stat-number">{initialStats.oldPatients}</span>
              <span className="trend-badge trend-down">
                <ArrowDownRight size={13} /> {initialStats.oldPatientsTrend}
              </span>
            </div>
          </div>
        </div>

        {/* New Patients / Intake */}
        <div
          className="stat-card stat-card-green"
          onClick={() => onNavigate('intake')}
          style={{ cursor: 'pointer' }}
        >
          <div className="stat-icon-wrap">
            <UserPlus size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-title">New Patients</div>
            <div className="stat-value-row">
              <span className="stat-number">{initialStats.newPatients}</span>
              <span className="trend-badge trend-up">
                <ArrowUpRight size={13} /> {initialStats.newPatientsTrend}
              </span>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div
          className="stat-card stat-card-peach"
          onClick={() => onNavigate('consultations')}
          style={{ cursor: 'pointer' }}
        >
          <div className="stat-icon-wrap">
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-title">Appointments</div>
            <div className="stat-value-row">
              <span className="stat-number">{initialStats.appointments}</span>
              <span className="trend-badge trend-up">
                <ArrowUpRight size={13} /> {initialStats.appointmentsTrend}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------
          MIDDLE ROW: 3 CHARTS
          -------------------------------------------------------------------- */}
      <div className="charts-grid">
        {/* Daily Appointment Stats */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Daily Appointment Stats</h3>
            <button className="more-btn" title="Options">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="bar-chart-container">
            {/* Tooltip on Monday */}
            <div className="chart-tooltip-badge">
              <span className="tooltip-item">
                <span className="dot-clinic" /> Clinic: 12
              </span>
              <span className="tooltip-item">
                <span className="dot-online" /> Online: 40
              </span>
            </div>

            <div className="bars-group">
              {barChartData.map((b) => (
                <div key={b.day} className="bar-col">
                  <div className="stacked-bar">
                    <div
                      className="bar-segment-clinic"
                      style={{ height: `${b.clinic * 1.5}px` }}
                      title={`Clinic: ${b.clinic}`}
                    />
                    <div
                      className="bar-segment-online"
                      style={{ height: `${b.online * 1.8}px` }}
                      title={`Online: ${b.online}`}
                    />
                  </div>
                  <span className="bar-day-label">{b.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Stats (Curved Line) */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Appointment Stats</h3>
            <button className="more-btn" title="Options">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="line-chart-container">
            {/* Peak visitor pin */}
            <div className="visitors-pin">50 Visitors</div>

            <svg
              className="line-chart-svg"
              viewBox="0 0 320 120"
              preserveAspectRatio="none"
            >
              {/* Vertical dashed line at Monday peak */}
              <line
                x1="120"
                y1="38"
                x2="120"
                y2="115"
                stroke="#0d9488"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Smooth spline curve */}
              <path
                d="M 10 95 C 45 90, 75 80, 95 60 C 110 40, 130 40, 145 65 C 170 100, 205 105, 230 70 C 255 35, 280 50, 310 90"
                fill="none"
                stroke="#0d9488"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Peak Circle Marker */}
              <circle
                cx="120"
                cy="44"
                r="5"
                fill="#ffffff"
                stroke="#0d9488"
                strokeWidth="2.5"
              />
            </svg>

            <div className="line-days-row">
              {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Overview Donut */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Patient Overview</h3>
            <button className="more-btn" title="Options">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="donut-chart-wrap">
            <svg width="170" height="170" viewBox="0 0 170 170">
              {/* Background ring */}
              <circle
                cx="85"
                cy="85"
                r="64"
                fill="transparent"
                stroke="#f1f5f9"
                strokeWidth="18"
              />

              {/* Teen Segment (Teal) - 40 / 70 */}
              <circle
                cx="85"
                cy="85"
                r="64"
                fill="transparent"
                stroke="#0d9488"
                strokeWidth="18"
                strokeDasharray="230 402"
                strokeDashoffset="60"
                strokeLinecap="round"
              />

              {/* Older Segment (Pink) - 12 / 70 */}
              <circle
                cx="85"
                cy="85"
                r="64"
                fill="transparent"
                stroke="#f43f5e"
                strokeWidth="18"
                strokeDasharray="70 402"
                strokeDashoffset="-180"
                strokeLinecap="round"
              />

              {/* Adult Segment (Green) - 10 / 70 */}
              <circle
                cx="85"
                cy="85"
                r="64"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="18"
                strokeDasharray="58 402"
                strokeDashoffset="-260"
                strokeLinecap="round"
              />

              {/* Child Segment (Yellow) - 8 / 70 */}
              <circle
                cx="85"
                cy="85"
                r="64"
                fill="transparent"
                stroke="#f59e0b"
                strokeWidth="18"
                strokeDasharray="46 402"
                strokeDashoffset="-328"
                strokeLinecap="round"
              />
            </svg>

            {/* Donut Center */}
            <div className="donut-center-text">
              <div className="donut-total-num">70</div>
              <div className="donut-total-lbl">Total</div>
            </div>

            {/* Labels matching screenshot */}
            <div className="donut-tags">
              <div className="donut-tag tag-child">
                8<br /><small>Child</small>
              </div>
              <div className="donut-tag tag-adult">
                10<br /><small>Adult</small>
              </div>
              <div className="donut-tag tag-older">
                12<br /><small>Older</small>
              </div>
              <div className="donut-tag tag-teen">
                40<br /><small>Teen</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------
          BOTTOM ROW: PATIENTS TABLE + UPCOMING APPOINTMENTS
          -------------------------------------------------------------------- */}
      <div className="bottom-grid">
        {/* Patients Table Card */}
        <div className="table-card">
          <div className="table-header-row">
            <h3 className="table-title">Patients</h3>
            <div className="tab-filter-pill-group">
              {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((tab) => (
                <button
                  key={tab}
                  className={`tab-pill ${timeFilter === tab ? 'active' : ''}`}
                  onClick={() => setTimeFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="patients-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>AGE</th>
                  <th>DATE & TIME</th>
                  <th>APPOINTED FOR</th>
                  <th>REPORT</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {patientsList.map((pt) => (
                  <tr key={pt.id}>
                    <td>
                      <div className="patient-cell">
                        <img
                          src={pt.avatar}
                          alt={pt.name}
                          className="patient-cell-avatar"
                        />
                        <span className="patient-cell-name">{pt.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="age-badge">{pt.age}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                        {pt.dateTime}
                      </span>
                    </td>
                    <td>
                      <span className="appointed-tag">{pt.appointedFor}</span>
                    </td>
                    <td>
                      <button
                        className="report-cell-btn"
                        onClick={() => onOpenReport(pt)}
                        title="View Medical Report PDF"
                      >
                        <FileText size={13} />
                        <span>PDF</span>
                      </button>
                    </td>
                    <td>
                      <div className="action-btns-cell">
                        <button
                          className="btn-view-text"
                          onClick={() => onOpenReport(pt)}
                        >
                          View
                        </button>
                        <button
                          className="btn-icon-action"
                          title="Print Patient Encounter"
                          onClick={() => window.print()}
                        >
                          <Printer size={15} />
                        </button>
                        <button
                          className="btn-icon-action"
                          title="Options"
                          onClick={() => onNavigate('ehr')}
                        >
                          <MoreHorizontal size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Appointments Widget */}
        <div className="upcoming-card">
          <h3 className="upcoming-title">Upcoming Appointments</h3>

          {/* Month Strip Header */}
          <div className="calendar-strip-header">
            <button className="cal-nav-btn" title="Previous month">
              <ChevronLeft size={16} />
            </button>
            <span className="calendar-month-name">November</span>
            <button className="cal-nav-btn" title="Next month">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Days Strip */}
          <div className="calendar-days-strip">
            {daysList.map((d) => (
              <button
                key={d.dayNum}
                className={`day-pill ${selectedDay === d.dayNum ? 'active' : ''}`}
                onClick={() => setSelectedDay(d.dayNum)}
              >
                <span className="day-pill-number">{d.dayNum}</span>
                <span className="day-pill-name">{d.dayName}</span>
              </button>
            ))}
          </div>

          {/* Appointments List */}
          <div className="upcoming-list">
            {upcomingAppointments.map((ua) => {
              const isOnline = ua.status === 'Online';
              return (
                <div key={ua.id} className="upcoming-item">
                  <div className="upcoming-patient-left">
                    <img
                      src={ua.avatar}
                      alt={ua.name}
                      className="upcoming-avatar"
                    />
                    <div>
                      <div className="upcoming-name">{ua.name}</div>
                      <div className="upcoming-time">{ua.time}</div>
                    </div>
                  </div>

                  <div className="upcoming-actions-right">
                    <span
                      className={
                        isOnline ? 'status-pill-online' : 'status-pill-offline'
                      }
                    >
                      {ua.status}
                    </span>

                    {/* Direct Teleconsult Call Button for Online Patients */}
                    {isOnline ? (
                      <button
                        className="btn-teleconsult-call"
                        title="Start Teleconsultation Video Call"
                        onClick={() => onStartTeleconsult(ua)}
                      >
                        <PhoneCall size={15} />
                      </button>
                    ) : (
                      <button
                        className="btn-icon-action"
                        title="Options"
                        onClick={() => onNavigate('consultations')}
                      >
                        <MoreHorizontal size={15} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

