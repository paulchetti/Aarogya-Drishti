import React from 'react';
import { UserIcon, TargetIcon, WarningIcon, CalendarIcon } from '../Icons';
import { useLanguage } from '../../context/LanguageContext';

const titleTranslations = {
  'Recent Admissions / Registrations': 'ఇటీవలి నమోదులు / రిజిస్ట్రేషన్లు',
  'Total Outbound Referrals': 'మొత్తం రెఫరల్స్ (బయటకు పంపినవి)',
  'Pending Follow-ups': 'పెండింగ్‌లో ఉన్న ఫాలో-అప్‌లు',
  'Completed Follow-ups': 'పూర్తయిన ఫాలో-అప్‌లు',
  'vs. last month': 'గత నెలతో పోలిస్తే',
  'vs. last week': 'గత వారంతో పోలిస్తే',
  'this month': 'ఈ నెలలో',
};

export default function StatCards({ cards = null }) {
  const { language } = useLanguage();

  const defaultCards = [
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

  const items = cards || defaultCards;

  const translate = (text) => {
    if (language === 'te' && titleTranslations[text]) {
      return titleTranslations[text];
    }
    return text;
  };

  return (
    <div className="stat-cards-grid">
      {items.map((card, i) => (
        <div key={i} className={`metric-card ${card.cardBorder}`}>
          <div>
            <div className={`metric-icon-circle ${card.colorClass}`}>{card.icon}</div>
            <div className="metric-title" title={translate(card.title)}>{translate(card.title)}</div>
          </div>
          <div className="metric-value-row">
            <span className="metric-number">{card.value}</span>
            <div className="metric-trend-box">
              <span className={`metric-trend-val ${card.trendColor}`}>{card.trend}</span>
              <span className="metric-trend-sub">{translate(card.subtext)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
