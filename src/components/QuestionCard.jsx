import React from 'react';
import { ArrowRight } from 'lucide-react';

export function QuestionCard({ question, onPractice }) {
  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Intermediate':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      case 'Advanced':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="bg-[#11182D] border border-slate-800 hover:border-purple-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-purple-950/20 group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider bg-purple-500/10 px-2.5 py-0.5 rounded-md border border-purple-500/25">
            {question.category}
          </span>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getDifficultyBadge(question.difficulty)}`}>
            {question.difficulty}
          </span>
        </div>

        {/* Question Text */}
        <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition leading-snug mb-3">
          {question.question}
        </h4>

        {/* Expected Keywords */}
        {question.keywords && question.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {question.keywords.slice(0, 4).map((kw, idx) => (
              <span key={idx} className="text-[10px] text-slate-400 bg-[#0B0F1C] px-2 py-0.5 rounded border border-slate-800/80">
                #{kw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {question.followUps?.length ? `${question.followUps.length} follow-ups ready` : 'Standard prompt'}
        </span>

        <button
          onClick={() => onPractice(question)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-600 text-purple-300 hover:text-white font-semibold text-xs border border-purple-500/30 transition cursor-pointer"
        >
          <span>Practice This</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
