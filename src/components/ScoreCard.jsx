import React from 'react';
import { MessageSquare, ShieldCheck, Target, Cpu, CheckCircle2 } from 'lucide-react';

export function ScoreCard({ scores, overallPercentage }) {
  const metrics = [
    {
      key: 'communication',
      label: 'Communication',
      score: scores?.communication ?? 0,
      icon: MessageSquare,
      description: 'Clarity, pacing & answer structure'
    },
    {
      key: 'confidence',
      label: 'Confidence',
      score: scores?.confidence ?? 0,
      icon: ShieldCheck,
      description: 'Conviction, active voice & poise'
    },
    {
      key: 'relevance',
      label: 'Relevance',
      score: scores?.relevance ?? 0,
      icon: Target,
      description: 'Targeted prompt alignment & depth'
    },
    {
      key: 'technicalKnowledge',
      label: 'Technical Knowledge',
      score: scores?.technicalKnowledge ?? 0,
      icon: Cpu,
      description: 'Domain mastery & terminology'
    },
    {
      key: 'grammar',
      label: 'Grammar & Tone',
      score: scores?.grammar ?? 0,
      icon: CheckCircle2,
      description: 'Professional phrasing & filler control'
    }
  ];

  const getScoreBadge = (score) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 65) return 'text-purple-300 bg-purple-500/10 border-purple-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  const getBarColor = (score) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 65) return 'bg-gradient-to-r from-indigo-500 to-purple-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-6">
      
      {/* Overall Score Banner */}
      <div className="bg-gradient-to-r from-[#1A160A] via-[#0D0D0B] to-[#1A160A] border border-purple-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-purple-950/20">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-purple-400">
            Overall Evaluation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Performance Summary
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-lg">
            Aggregated metric computed across all answered questions, follow-ups, and timing constraints.
          </p>
        </div>

        {/* Circular gauge representation */}
        <div className="relative flex items-center justify-center shrink-0">
          <div className="w-28 h-28 rounded-full border-4 border-slate-800 flex flex-col items-center justify-center bg-[#080B14] shadow-inner shadow-black">
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-200">
              {overallPercentage}%
            </span>
            <span className="text-[10px] font-semibold uppercase text-slate-400">
              {overallPercentage >= 80 ? 'Excellent' : overallPercentage >= 65 ? 'Proficient' : 'Needs Practice'}
            </span>
          </div>
          {/* Subtle outer glow ring */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/40 animate-ping opacity-20" />
        </div>
      </div>

      {/* Grid of 5 Key Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className="bg-[#11182D] border border-slate-800 rounded-2xl p-4.5 flex flex-col justify-between hover:border-purple-500/40 transition group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl border border-orange-300 bg-white text-orange-600 shadow-[0_0_14px_rgba(249,115,22,0.25)] flex items-center justify-center transition group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getScoreBadge(item.score)}`}>
                    {item.score}/100
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm">
                  {item.label}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Linear Progress bar */}
              <div className="mt-4 pt-2 border-t border-slate-800/80">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getBarColor(item.score)}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
