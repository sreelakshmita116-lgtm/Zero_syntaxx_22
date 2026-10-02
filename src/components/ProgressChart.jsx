import React, { useState } from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export function ProgressChart({ history = [] }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Take chronological items for trend (oldest to newest, max last 8)
  const chartData = [...history].reverse().slice(-8);

  if (chartData.length === 0) {
    return (
      <div className="bg-[#11182D] border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
        <TrendingUp className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <p className="text-sm font-medium">No interview history available to chart yet.</p>
        <p className="text-xs text-slate-500 mt-1">Complete your first mock interview to track progress!</p>
      </div>
    );
  }

  // SVG chart dimensions
  const width = 600;
  const height = 180;
  const paddingX = 40;
  const paddingY = 30;

  const points = chartData.map((item, idx) => {
    const x = paddingX + (idx / Math.max(chartData.length - 1, 1)) * (width - 2 * paddingX);
    const pct = item.overallPercentage || 50;
    const clamped = Math.max(40, Math.min(100, pct));
    const normalized = (clamped - 40) / 60; // 0 to 1
    const y = height - paddingY - normalized * (height - 2 * paddingY);
    return { x, y, item, idx, pct };
  });

  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const firstP = points[0];
  const lastP = points[points.length - 1];
  const areaD = `${pathD} L ${lastP.x} ${height - paddingY} L ${firstP.x} ${height - paddingY} Z`;

  const weaknessMetrics = [
    { label: 'Answer Structure (STAR)', frequency: 68, tag: 'High Priority' },
    { label: 'Confidence Delivery', frequency: 54, tag: 'Moderate' },
    { label: 'Technical Depth & Architecture', frequency: 45, tag: 'Improving' },
    { label: 'Grammar & Filler Words', frequency: 32, tag: 'Good Control' }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Improvement Trend Card */}
      <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Your Improvement Over Time
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Tracking overall performance across your recent mock interviews.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold text-purple-300 bg-purple-500/10 px-3 py-1 rounded-xl border border-purple-500/20">
            <span>Recent: {chartData[chartData.length - 1]?.overallPercentage}%</span>
            <span>•</span>
            <span className="text-slate-300 font-normal">
              {chartData.length} sessions plotted
            </span>
          </div>
        </div>

        {/* SVG Responsive Chart */}
        <div className="relative overflow-x-auto pb-2">
          <div className="min-w-[480px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
              <defs>
                <linearGradient id="purpleChartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFD633" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#FFD633" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="purpleStrokeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E6AD00" />
                  <stop offset="50%" stopColor="#FFD633" />
                  <stop offset="100%" stopColor="#FFF0A6" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[40, 60, 80, 100].map((score) => {
                const normalized = (score - 40) / 60;
                const y = height - paddingY - normalized * (height - 2 * paddingY);
                return (
                  <g key={score}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={width - paddingX}
                      y2={y}
                      stroke="#33290D"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingX - 10}
                      y={y + 3}
                      fill="#64748B"
                      fontSize="9"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {score}%
                    </text>
                  </g>
                );
              })}

              {/* Shaded Area */}
              {points.length > 1 && (
                <path d={areaD} fill="url(#purpleChartGradient)" />
              )}

              {/* Line */}
              {points.length > 1 && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#purpleStrokeGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Data Points */}
              {points.map((p) => {
                const isHovered = hoveredPoint?.idx === p.idx;
                return (
                  <g
                    key={p.idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(p)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 7 : 5}
                      fill="#080B14"
                      stroke="#A855F7"
                      strokeWidth="3"
                      className="transition-all"
                    />
                    <text
                      x={p.x}
                      y={height - 8}
                      fill="#94A3B8"
                      fontSize="10"
                      textAnchor="middle"
                    >
                      #{p.idx + 1}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip display */}
            <div className="h-6 mt-1 flex items-center justify-center text-xs text-slate-300">
              {hoveredPoint ? (
                <span className="bg-[#18223F] border border-purple-500/40 px-3 py-1 rounded-full text-white font-medium shadow-lg">
                  Session #{hoveredPoint.idx + 1}: <strong className="text-purple-300">{hoveredPoint.pct}%</strong> ({hoveredPoint.item.sessionSetup?.typeLabel || 'Mock Interview'})
                </span>
              ) : (
                <span className="text-slate-500 text-[11px]">
                  Hover over any data point to inspect session score details.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Frequently Detected Weaknesses */}
      <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Frequently Detected Weaknesses
            </h3>
            <p className="text-xs text-slate-400">
              Areas where the AI evaluator detected consistent opportunities for polish.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {weaknessMetrics.map((item, idx) => (
            <div key={idx} className="bg-[#0B0F1C] border border-slate-800/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{item.label}</span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                  item.frequency > 60 
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                    : item.frequency > 40
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {item.tag}
                </span>
              </div>

              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    item.frequency > 60 ? 'bg-rose-500' : item.frequency > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${item.frequency}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-snug">
                {item.frequency > 60
                  ? 'Address the Situation, Task, Action, and Result systematically.'
                  : item.frequency > 40
                  ? 'Focus on assertive language and project ownership.'
                  : 'Continuing to show strong upward trajectory.'}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
