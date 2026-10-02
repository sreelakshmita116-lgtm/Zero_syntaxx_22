import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Trophy, CheckCircle2, Clock, Calendar, ArrowRight, Play, AlertCircle, Trash2, RotateCcw } from 'lucide-react';
import { Button } from '../components/Button';
import { ProgressChart } from '../components/ProgressChart';
import { getInterviewHistory, clearInterviewHistory, DEFAULT_HISTORY } from '../utils/storage';

export function Dashboard() {
  const navigate = useNavigate();
  const [history, setHistory] = useState(() => getInterviewHistory());

  const totalInterviews = history.length;
  const bestScore = totalInterviews > 0
    ? Math.max(...history.map((h) => h.overallPercentage || 0))
    : 0;

  const avgScore = totalInterviews > 0
    ? Math.round(history.reduce((acc, h) => acc + (h.overallPercentage || 0), 0) / totalInterviews)
    : 0;

  const totalQuestionsAnswered = history.reduce((acc, h) => {
    return acc + (h.totalQuestions || h.qnaList?.length || 5);
  }, 0);

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your interview logs? You can restore sample history anytime.")) {
      clearInterviewHistory();
      setHistory([]);
    }
  };

  const handleRestoreSample = () => {
    localStorage.setItem('intervue_ai_history_v1', JSON.stringify(DEFAULT_HISTORY));
    setHistory(DEFAULT_HISTORY);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      
      {/* Page Title & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-300 mb-2">
            <LineChart className="w-3.5 h-3.5 text-purple-400" />
            <span>Interview Performance Analytics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Progress & Performance Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track metrics over time, observe score growth, and inspect historical AI evaluations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            size="md"
            variant="primary"
            icon={Play}
            onClick={() => navigate('/setup')}
            className="text-xs font-bold shadow-lg shadow-purple-500/25"
          >
            Start New Interview
          </Button>
        </div>
      </div>

      {/* 1. Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Interviews */}
        <div className="bg-[#11182D] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Total Interviews</span>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-white">{totalInterviews}</span>
            <span className="text-xs text-slate-400">sessions</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Practice consistency is the #1 predictor of offer success
          </p>
        </div>

        {/* Average Score */}
        <div className="bg-[#11182D] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Average Score</span>
            <LineChart className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-emerald-400">{avgScore}%</span>
            <span className="text-xs text-slate-400">composite</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Targeting &gt; 80% for top-tier corporate placements
          </p>
        </div>

        {/* Best Score */}
        <div className="bg-[#11182D] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Best Score</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-amber-400">{bestScore}%</span>
            <span className="text-xs text-slate-400">all-time high</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Personal benchmark achieved in mock rounds
          </p>
        </div>

        {/* Questions Answered */}
        <div className="bg-[#11182D] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Questions Answered</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-indigo-300">{totalQuestionsAnswered}</span>
            <span className="text-xs text-slate-400">prompts</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Across HR, Technical, and Placement categories
          </p>
        </div>

      </div>

      {/* 2. Improvement Chart & Weaknesses Breakdown */}
      <ProgressChart history={history} />

      {/* 3. Recent Interviews Table */}
      <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Recent Interview Sessions
            </h3>
            <p className="text-xs text-slate-400">
              Click any past session to review full AI feedback and question breakdowns.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {history.length === 0 ? (
              <button
                onClick={handleRestoreSample}
                className="text-xs text-purple-300 hover:text-purple-200 flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Load Sample Data</span>
              </button>
            ) : (
              <button
                onClick={handleClearHistory}
                className="text-xs text-slate-500 hover:text-rose-400 flex items-center space-x-1 transition"
                title="Clear interview logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {history.length > 0 ? (
          <div className="divide-y divide-slate-800/80">
            {history.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => navigate('/results', { state: { report: item } })}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#141C34]/60 px-3 rounded-2xl transition cursor-pointer group"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white group-hover:text-purple-300 transition">
                      {item.sessionSetup?.typeLabel || 'Mock Interview'}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#18223F] text-slate-300 border border-slate-700">
                      {item.sessionSetup?.difficulty || 'Intermediate'}
                    </span>
                    {item.sessionSetup?.isPressureMode && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                        Pressure
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </span>
                    <span>•</span>
                    <span>{item.totalQuestions || 5} questions</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-lg font-black text-white block">
                      {item.overallPercentage}%
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-medium">
                      {item.overallPercentage >= 80 ? 'Mastered' : item.overallPercentage >= 65 ? 'Proficient' : 'Needs Practice'}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-800 group-hover:bg-purple-600 text-slate-300 group-hover:text-white transition">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="font-bold text-slate-300 text-sm">No interviews recorded yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Ready to begin? Choose your interview track and get your first score.
            </p>
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate('/setup')}
            >
              Start First Interview
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}
