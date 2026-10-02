import React, { useState } from 'react';
import { Sparkles, CheckCircle, ArrowUpRight, AlertCircle, ChevronDown, ChevronUp, Bot, MessageSquare } from 'lucide-react';

export function FeedbackCard({
  aiFeedback,
  strengths = [],
  areasToImprove = [],
  commonMistakes = [],
  qnaList = []
}) {
  const [expandedQnaIndex, setExpandedQnaIndex] = useState(null);

  const toggleQna = (idx) => {
    setExpandedQnaIndex(expandedQnaIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Executive AI Analysis Callout */}
      <div className="bg-gradient-to-br from-[#211B0B] via-[#11100D] to-[#090909] border border-purple-500/30 rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-lg shadow-purple-950/20">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shrink-0 shadow-lg shadow-purple-500/25">
            <div className="w-full h-full bg-[#080B14] rounded-[14px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                AI Interviewer Verdict
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 uppercase">
                Detailed Evaluation
              </span>
            </div>
            <p className="text-sm text-slate-200 mt-2 leading-relaxed font-normal">
              "{aiFeedback}"
            </p>
          </div>
        </div>
      </div>

      {/* 2. Strengths & Areas to Improve Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Strengths Card */}
        <div className="bg-[#11182D] border border-emerald-500/20 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-center space-x-2.5 text-emerald-400">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm tracking-wide text-white">Key Strengths</h4>
          </div>

          <ul className="space-y-2.5">
            {strengths.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas to Improve Card */}
        <div className="bg-[#11182D] border border-amber-500/20 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-center space-x-2.5 text-amber-400">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm tracking-wide text-white">Areas for Improvement</h4>
          </div>

          <ul className="space-y-2.5">
            {areasToImprove.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 3. Common Mistakes Callout */}
      {commonMistakes.length > 0 && (
        <div className="bg-[#11182D] border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-slate-400">
            <AlertCircle className="w-4 h-4 text-purple-400" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">
              Frequently Observed Candidate Traps
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {commonMistakes.map((mistake, idx) => (
              <div key={idx} className="bg-[#0B0F1C] p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                {mistake}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Question-by-Question Detailed Drilldown */}
      {qnaList.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span>Question-by-Question Review</span>
            </h3>
            <span className="text-xs text-slate-400">
              {qnaList.length} responses recorded
            </span>
          </div>

          <div className="space-y-3">
            {qnaList.map((item, index) => {
              const isExpanded = expandedQnaIndex === index;
              const evalResult = item.evaluation || {};
              const score = evalResult.scores?.overall || 75;

              return (
                <div
                  key={index}
                  className="bg-[#11182D] border border-slate-800 hover:border-purple-500/40 rounded-2xl overflow-hidden transition"
                >
                  <div
                    onClick={() => toggleQna(index)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="pr-4 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-purple-400 font-mono">
                          Q{index + 1}
                        </span>
                        {item.isFollowUp && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            Follow-up
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-white">
                        {item.question}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#18223F] border border-slate-700 text-slate-200">
                        {score}%
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 space-y-3 bg-[#0B0F1C]/70">
                      
                      {/* Candidate Answer */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Your Answer:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-200 bg-[#070A12] p-3.5 rounded-xl border border-slate-800/80 leading-relaxed font-sans">
                          {item.answer || '(No answer provided / Skipped)'}
                        </p>
                      </div>

                      {/* AI Feedback on this answer */}
                      {evalResult.feedback && (
                        <div className="p-3 bg-purple-500/5 rounded-xl border border-purple-500/20 text-xs text-purple-200 leading-relaxed flex items-start space-x-2">
                          <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-purple-300">Critique: </strong>
                            {evalResult.feedback}
                          </span>
                        </div>
                      )}

                      {/* Keyword Matches */}
                      {evalResult.matchedKeywords?.length > 0 && (
                        <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                          <span>Detected Keywords:</span>
                          <div className="flex flex-wrap gap-1">
                            {evalResult.matchedKeywords.map((kw, kwIdx) => (
                              <span key={kwIdx} className="px-1.5 py-0.5 rounded bg-[#16203B] text-slate-300 font-mono text-[10px]">
                                #{kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
