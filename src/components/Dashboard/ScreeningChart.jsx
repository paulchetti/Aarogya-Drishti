import React, { useState } from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const completedFollowUps = [19, 24, 23, 27, 30, 35, 34, 29, 31, 30, 32, 36];
const pendingFollowUps = [6, 9, 8, 11, 13, 15, 14, 11, 13, 11, 14, 16];

export default function ScreeningChart() {
  const [hoverIndex, setHoverIndex] = useState(null);

  const width = 480;
  const height = 190;
  const paddingX = 30;
  const paddingY = 20;
  const maxY = 50;

  const getX = (i) => paddingX + (i * (width - 2 * paddingX)) / (months.length - 1);
  const getY = (val) => height - paddingY - (val * (height - 2 * paddingY)) / maxY;

  const makeSmoothCurve = (data) => {
    return data.reduce((acc, val, i, arr) => {
      const x = getX(i);
      const y = getY(val);
      if (i === 0) return `M ${x} ${y}`;
      const prevX = getX(i - 1);
      const prevY = getY(arr[i - 1]);
      const cpX = (prevX + x) / 2;
      return `${acc} C ${cpX} ${prevY}, ${cpX} ${y}, ${x} ${y}`;
    }, '');
  };

  const lineCompleted = makeSmoothCurve(completedFollowUps);
  const linePending = makeSmoothCurve(pendingFollowUps);

  const areaCompleted = `${lineCompleted} L ${getX(months.length - 1)} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`;
  const areaPending = `${linePending} L ${getX(months.length - 1)} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Cumulative Follow-up Volume</h3>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot teal"></span>
            <span>Completed Follow-ups</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot orange"></span>
            <span>Pending Follow-ups</span>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '190px' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id="chartTealGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="chartOrangeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 10, 20, 30, 40, 50].map((tick) => (
            <g key={tick}>
              <line
                x1={paddingX}
                y1={getY(tick)}
                x2={width - paddingX}
                y2={getY(tick)}
                stroke="#edf2f7"
                strokeWidth="1"
              />
              <text
                x={paddingX - 6}
                y={getY(tick) + 3}
                fill="#94a3b8"
                fontSize="8.5"
                textAnchor="end"
                fontFamily="sans-serif"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* Area Fills */}
          <path d={areaCompleted} fill="url(#chartTealGrad)" />
          <path d={areaPending} fill="url(#chartOrangeGrad)" />

          {/* Curves */}
          <path d={lineCompleted} fill="none" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" />
          <path d={linePending} fill="none" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" />

          {/* Points */}
          {completedFollowUps.map((val, i) => (
            <circle
              key={`tot-${i}`}
              cx={getX(i)}
              cy={getY(val)}
              r={hoverIndex === i ? 4.5 : 3}
              fill="#0d9488"
              stroke="#ffffff"
              strokeWidth="1.5"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ cursor: 'pointer' }}
            />
          ))}

          {pendingFollowUps.map((val, i) => (
            <circle
              key={`sus-${i}`}
              cx={getX(i)}
              cy={getY(val)}
              r={hoverIndex === i ? 4.5 : 3}
              fill="#f97316"
              stroke="#ffffff"
              strokeWidth="1.5"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ cursor: 'pointer' }}
            />
          ))}

          {/* X Axis Months */}
          {months.map((m, i) => (
            <text
              key={m}
              x={getX(i)}
              y={height - 4}
              fill="#94a3b8"
              fontSize="8.5"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              {m}
            </text>
          ))}
        </svg>

        {hoverIndex !== null && (
          <div
            style={{
              position: 'absolute',
              left: `${(getX(hoverIndex) / width) * 100}%`,
              top: '10px',
              transform: 'translateX(-50%)',
              background: '#0f172a',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
              zIndex: 10,
              whiteSpace: 'nowrap',
            }}
          >
            <strong>{months[hoverIndex]}</strong>: Completed {completedFollowUps[hoverIndex]} | Pending {pendingFollowUps[hoverIndex]}
          </div>
        )}
      </div>
    </div>
  );
}
