import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Target, LineChart, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { ScoreCard } from '../components/ScoreCard';
import { FeedbackCard } from '../components/FeedbackCard';
import { getInterviewHistory } from '../utils/storage';

export function Results() {
  const navigate = useNavigate();
  const location = useLocation();

  const report = location.state?.report || getInterviewHistory()[0] || null;

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const audioContext = new AudioContext();
        const playPop = () => {
          const oscillator = audioContext.createOscillator();
          const gain = audioContext.createGain();
          const now = audioContext.currentTime;

          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(240, now);
          oscillator.frequency.exponentialRampToValueAtTime(75, now + 0.14);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.16, now + 0.012);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
          oscillator.connect(gain);
          gain.connect(audioContext.destination);
          oscillator.onended = () => audioContext.close();
          oscillator.start(now);
          oscillator.stop(now + 0.17);
        };

        if (audioContext.state === 'suspended') {
          audioContext.resume().then(playPop, () => audioContext.close());
        } else {
          playPop();
        }
      }
    } catch {}
  }, []);

  if (!report) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <Trophy className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">No Interview Result Found</h2>
        <p className="text-xs text-slate-400">Complete an interview session to review your personalized breakdown.</p>
        <Button onClick={() => navigate('/setup')} variant="primary">
          Start An Interview
        </Button>
      </div>
    );
  }

  const {
    overallPercentage = 75,
    scores = {},
    strengths = [],
    areasToImprove = [],
    commonMistakes = [],
    aiFeedback = '',
    qnaList = [],
    sessionSetup = {}
  } = report;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      
      {/* Top Banner Celebration */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-bold text-purple-300 mb-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Evaluation Complete</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Interview Completed! 🎉
        </h1>

        <p className="text-sm text-slate-300">
          Here is your comprehensive performance audit for your{' '}
          <strong className="text-purple-300">{sessionSetup.typeLabel || 'Mock Interview'}</strong> session.
        </p>
      </div>

      {/* 1. Score Breakdown Gauges */}
      <ScoreCard
        scores={scores}
        overallPercentage={overallPercentage}
      />

      {/* 2. Detailed Feedback Cards */}
      <FeedbackCard
        aiFeedback={aiFeedback}
        strengths={strengths}
        areasToImprove={areasToImprove}
        commonMistakes={commonMistakes}
        qnaList={qnaList}
      />

      {/* 3. Action Buttons */}
      <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h4 className="text-base font-bold text-white">Next Steps</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Refine your answers or review your longitudinal progress graph.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Button
            size="md"
            variant="outline"
            icon={RotateCcw}
            onClick={() => navigate('/setup', { state: { category: sessionSetup.type } })}
            className="flex-1 sm:flex-none text-xs"
          >
            Try Again
          </Button>

          <Button
            size="md"
            variant="secondary"
            icon={Target}
            onClick={() => navigate('/questions', { state: { filterCategory: sessionSetup.typeLabel } })}
            className="flex-1 sm:flex-none text-xs"
          >
            Practice Weak Areas
          </Button>

          <Button
            size="md"
            variant="primary"
            icon={LineChart}
            onClick={() => navigate('/progress')}
            className="flex-1 sm:flex-none text-xs font-bold shadow-lg shadow-purple-500/25"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>

    </div>
  );
}
