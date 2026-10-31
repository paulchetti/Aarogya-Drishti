import React from 'react';

const lesionData = [
  { label: 'White Patch', percentage: 32, color: '#0d9488' },
  { label: 'Red Patch', percentage: 24, color: '#f97316' },
  { label: 'Ulcer', percentage: 18, color: '#eab308' },
  { label: 'Growth', percentage: 15, color: '#0284c7' },
  { label: 'Others', percentage: 11, color: '#94a3b8' },
];

export default function LesionDonutChart() {
  // SVG Donut calculation
  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Lesion Types</h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flex: 1 }}>
        {/* Donut graphic */}
        <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {lesionData.map((item, index) => {
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((cumulativePercent / 100) * circumference);
              cumulativePercent += item.percentage;

              return (
                <circle
                  key={index}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                  style={{ transition: 'all 0.3s' }}
                />
              );
            })}
          </svg>

          {/* Center text */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Total</span>
            <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '22px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
              68
            </span>
          </div>
        </div>

        {/* Legend listing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {lesionData.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#475569',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontWeight: 600 }}>{item.label}</span>
              </div>
              <span style={{ fontWeight: 700, color: '#1e293b' }}>{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

