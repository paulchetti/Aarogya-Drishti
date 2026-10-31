import React from 'react';
import { UserIcon, TargetIcon, WarningIcon, CalendarIcon } from '../Icons';

export default function StatCards() {
  const cards = [
    {
      title: 'Total Patients',
      value: '248',
      trend: '↑ 12%',
      trendColor: 'green',
      subtext: 'vs. last month',
      icon: <UserIcon className="w-5 h-5" />,
      colorClass: 'orange',
      cardBorder: 'orange-bottom',
    },
    {
      title: 'Screened Today',
      value: '32',
      trend: '↑ 18%',
      trendColor: 'green',
      subtext: 'vs. last week',
      icon: <TargetIcon className="w-5 h-5" />,
      colorClass: 'teal',
      cardBorder: 'teal-bottom',
    },
    {
      title: 'Suspicious Findings',
      value: '7',
      trend: '↑ 3%',
      trendColor: 'amber',
      subtext: 'vs. last week',
      icon: <WarningIcon className="w-5 h-5" />,
      colorClass: 'amber',
      cardBorder: 'amber-bottom',
    },
    {
      title: 'Follow-ups Due',
      value: '18',
      trend: '↑ 5%',
      trendColor: 'green',
      subtext: 'this month',
      icon: <CalendarIcon className="w-5 h-5" />,
      colorClass: 'blue',
      cardBorder: 'blue-bottom',
    },
  ];

  return (
    <div className="stat-cards-grid">
      {cards.map((card, i) => (
        <div key={i} className={`metric-card ${card.cardBorder}`}>
          <div>
            <div className={`metric-icon-circle ${card.colorClass}`}>{card.icon}</div>
            <div className="metric-title">{card.title}</div>
          </div>
          <div className="metric-value-row">
            <span className="metric-number">{card.value}</span>
            <div className="metric-trend-box">
              <span className={`metric-trend-val ${card.trendColor}`}>{card.trend}</span>
              <span className="metric-trend-sub">{card.subtext}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
