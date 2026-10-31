import React from 'react';
import { UserIcon, TargetIcon, WarningIcon, CalendarIcon } from '../Icons';

export default function StatCards() {
  const cards = [
    {
      title: 'Total Patients',
      value: '248',
      trend: '↑ 12%',
      trendClass: 'up-green',
      subtext: 'vs. last month',
      icon: <UserIcon className="w-5 h-5" />,
      theme: 'orange',
    },
    {
      title: 'Screened Today',
      value: '32',
      trend: '↑ 18%',
      trendClass: 'up-green',
      subtext: 'vs. last week',
      icon: <TargetIcon className="w-5 h-5" />,
      theme: 'teal',
    },
    {
      title: 'Suspicious Findings',
      value: '7',
      trend: '↑ 3%',
      trendClass: 'up-amber',
      subtext: 'vs. last week',
      icon: <WarningIcon className="w-5 h-5" />,
      theme: 'amber',
    },
    {
      title: 'Follow-ups Due',
      value: '18',
      trend: '↑ 5%',
      trendClass: 'up-green',
      subtext: 'this month',
      icon: <CalendarIcon className="w-5 h-5" />,
      theme: 'blue',
    },
  ];

  return (
    <div className="stat-cards-grid">
      {cards.map((card, i) => (
        <div key={i} className="metric-card">
          <div className="metric-top">
            <div className={`metric-icon-wrap ${card.theme}`}>{card.icon}</div>
            <span className="metric-title">{card.title}</span>
          </div>
          <div className="metric-bottom">
            <span className="metric-value">{card.value}</span>
            <div className="metric-trend-wrap">
              <span className={`metric-trend ${card.trendClass}`}>{card.trend}</span>
              <span className="metric-trend-sub"> {card.subtext}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
