import React, { useState } from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const totalScreenings = [20, 24, 23, 28, 31, 35, 34, 30, 32, 30, 33, 36];
const suspiciousFindings = [6, 9, 8, 12, 13, 15, 14, 11, 13, 11, 14, 16];

export default function ScreeningChart() {
  const [hoverIndex, setHoverIndex] = useState(null);

  // SVG coordinate calculations
  const width = 500;
  const height = 200;
  const paddingX = 35;
  const paddingY = 25;
  const maxY = 50;

  const getX = (index) => paddingX + (index * (width - 2 * paddingX)) / (months.length - 1);
  const getY = (val) => height - paddingY - (val * (height - 2 * paddingY)) / maxY;

  // Build curved SVG path using Catmull-Rom or Bezier
  const makeSmoothPath = (data) => {
    return data.reduce((acc, val, i, arr) => {
      const x = getX(i);
      const y = getY(val);
      if (i === 0) return `M ${x} ${y}`;
      const prevX = getX(i - 1);
      const prevY = getY(arr[i - 1]);
      const cp1X = prevX + (x - prevX) / 2;
      const cp2X = cp1X;
      return `${acc} C ${cp1X} ${prevY}, ${cp2X} ${y}, ${x} ${y}`;
    }, '');
  };

  const lineTotal = makeSmoothPath(totalScreenings);
  const lineSuspicious = makeSmoothPath(suspiciousFindings);

  const areaTotal = `${lineTotal} L ${getX(months.length - 1)} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`;
  const areaSuspicious = `${lineSuspicious} L ${getX(months.length - 1)} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Screening Overview</h3>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot teal"></span>
            <span>Total Screenings</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot orange"></span>
            <span>Suspicious Findings</span>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '220px' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y-axis labels */}
          {[0, 10, 20, 30, 40, 50].map((tick) => (
            <g key={tick}>
              <line
                x1={paddingX}
                y1={getY(tick)}
                x2={width - paddingX}
                y2={getY(tick)}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <text
                x={paddingX - 8}
                y={getY(tick) + 3}
                fill="#94a3b8"
                fontSize="9"
                textAnchor="end"
                fontFamily="sans-serif"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* Area Gradients */}
          <path d={areaTotal} fill="url(#tealGrad)" />
          <path d={areaSuspicious} fill="url(#orangeGrad)" />

          {/* Smooth Curves */}
          <path d={lineTotal} fill="none" stroke="#0d9488" strokeWidth="2.5" />
          <path d={lineSuspicious} fill="none" stroke="#f97316" strokeWidth="2.5" />

          {/* Data Points */}
          {totalScreenings.map((val, i) => (
            <circle
              key={`tot-${i}`}
              cx={getX(i)}
              cy={getY(val)}
              r={hoverIndex === i ? 5 : 3.5}
              fill="#0d9488"
              stroke="#ffffff"
              strokeWidth="2"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ cursor: 'pointer', transition: 'r 0.15s' }}
            />
          ))}

          {suspiciousFindings.map((val, i) => (
            <circle
              key={`sus-${i}`}
              cx={getX(i)}
              cy={getY(val)}
              r={hoverIndex === i ? 5 : 3.5}
              fill="#f97316"
              stroke="#ffffff"
              strokeWidth="2"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ cursor: 'pointer', transition: 'r 0.15s' }}
            />
          ))}

          {/* X Axis Months */}
          {months.map((m, i) => (
            <text
              key={m}
              x={getX(i)}
              y={height - 6}
              fill="#94a3b8"
              fontSize="9"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              {m}
            </text>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoverIndex !== null && (
          <div
            style={{
              position: 'absolute',
              left: `${(getX(hoverIndex) / width) * 100}%`,
              top: '15px',
              transform: 'translateX(-50%)',
              background: '#0f172a',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '8px',
              fontSize: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
              zIndex: 10,
              whiteSpace: 'nowrap',
            }}
          >
            <strong>{months[hoverIndex]}</strong>
            <div style={{ color: '#2dd4bf' }}>Screenings: {totalScreenings[hoverIndex]}</div>
            <div style={{ color: '#fb923c' }}>Suspicious: {suspiciousFindings[hoverIndex]}</div>
          </div>
        )}
      </div>
    </div>
  );
}
