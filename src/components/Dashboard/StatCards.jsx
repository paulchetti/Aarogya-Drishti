import React from 'react';
import { UserIcon, TargetIcon, WarningIcon, CalendarIcon } from '../Icons';

export default function StatCards() {
  const cards = [
    {
      title: 'Recent Admissions / Registrations',
      value: '248',
      trend: '↑ 12%',
      trendColor: 'green',
      subtext: 'vs. last month',
      icon: <UserIcon className="w-5 h-5" />,
      colorClass: 'orange',
      cardBorder: 'orange-bottom',
    },
    {
      title: 'Total Outbound Referrals',
      value: '32',
      trend: '↑ 18%',
      trendColor: 'green',
      subtext: 'vs. last week',
      icon: <TargetIcon className="w-5 h-5" />,
      colorClass: 'teal',
      cardBorder: 'teal-bottom',
    },
    {
      title: 'Pending Follow-ups',
      value: '7',
      trend: '↑ 3%',
      trendColor: 'amber',
      subtext: 'vs. last week',
      icon: <WarningIcon className="w-5 h-5" />,
      colorClass: 'amber',
      cardBorder: 'amber-bottom',
    },
    {
      title: 'Completed Follow-ups',
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
            <div className="metric-title" title={card.title}>{card.title}</div>
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
