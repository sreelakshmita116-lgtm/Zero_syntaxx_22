import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Play, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { INTERVIEW_TYPES } from '../data/questions';
import { getProfile, saveActiveSession } from '../utils/storage';

export function Setup() {
  const navigate = useNavigate();
  const location = useLocation();

  const preSelectedCategory = location.state?.category || 'hr';
  const preSelectedQuestion = location.state?.preSelectedQuestion || null;

  const [selectedType, setSelectedType] = useState(preSelectedCategory);
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [questionCount, setQuestionCount] = useState(5);
  const [userBio, setUserBio] = useState('');
  const [isPressureMode, setIsPressureMode] = useState(false);

  useEffect(() => {
    const profile = getProfile();
    if (profile && profile.skills) {
      setUserBio(`${profile.name || 'Student'} • ${profile.course || ''}. Skills: ${profile.skills}`);
    }
  }, []);

  const handleStartInterview = (e) => {
    e.preventDefault();

    const typeObj = INTERVIEW_TYPES.find((t) => t.id === selectedType) || INTERVIEW_TYPES[0];

    const sessionSetup = {
      type: selectedType,
      typeLabel: typeObj.label,
      difficulty,
      questionCount: Number(questionCount),
      userBio: userBio.trim(),
      isPressureMode,
      preSelectedQuestion,
      startedAt: new Date().toISOString()
    };

    saveActiveSession(sessionSetup);
    navigate('/interview', { state: { sessionSetup } });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Session Configuration</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Configure Your Mock Interview
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Tailor the simulation to your target role, experience level, and preferred pressure environment.
        </p>
      </div>

      <form onSubmit={handleStartInterview} className="space-y-8">
        
        {/* 1. Interview Type Selection */}
        <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-base font-bold text-white block">
                1. Select Interview Domain
              </label>
              <span className="text-xs text-slate-400">
                Choose the context and focus of questions the AI will pose.
              </span>
            </div>
            <span className="text-xs text-purple-400 font-mono font-bold bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
              Required
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {INTERVIEW_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                    isSelected
                      ? 'bg-purple-500/15 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                      : 'bg-[#0B0F1C] border-slate-800/80 text-slate-300 hover:border-purple-500/40 hover:bg-[#121A33]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white">
                      {type.label}
                    </span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {type.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Difficulty & Length Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Difficulty Selection */}
          <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm">
            <label className="text-base font-bold text-white block">
              2. Experience / Difficulty
            </label>
            <p className="text-xs text-slate-400">
              Adjusts the complexity and depth of expected technical solutions.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {['Beginner', 'Intermediate', 'Advanced'].map((diff) => {
                const isSelected = difficulty === diff;
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`py-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? diff === 'Beginner'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-sm'
                          : diff === 'Intermediate'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500 shadow-sm'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500 shadow-sm'
                        : 'bg-[#0B0F1C] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interview Length */}
          <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm">
            <label className="text-base font-bold text-white block">
              3. Interview Length
            </label>
            <p className="text-xs text-slate-400">
              Total base questions before concluding and compiling your report.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { count: 5, label: '5 Questions', time: '~10 mins' },
                { count: 10, label: '10 Questions', time: '~20 mins' },
                { count: 15, label: '15 Questions', time: '~30 mins' }
              ].map((len) => {
                const isSelected = questionCount === len.count;
                return (
                  <button
                    key={len.count}
                    type="button"
                    onClick={() => setQuestionCount(len.count)}
                    className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                      isSelected
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500 shadow-sm'
                        : 'bg-[#0B0F1C] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold block text-white">{len.label}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{len.time}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* 3. Optional Bio / Skills Input */}
        <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-2 shadow-sm">
          <label className="text-base font-bold text-white flex items-center justify-between">
            <span>4. Tell Us About Yourself / Your Skills (Optional)</span>
            <span className="text-xs font-normal text-slate-400">Used by AI to personalize questions</span>
          </label>
          <textarea
            rows={3}
            value={userBio}
            onChange={(e) => setUserBio(e.target.value)}
            placeholder="e.g. 3rd-year CS student at NIT with projects in React, Node.js, and Redis. Passionate about distributed systems..."
            className="w-full bg-[#0B0F1C] border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 leading-relaxed font-sans"
          />
        </div>

        {/* 4. Special Feature: Pressure Mode Toggle */}
        <div className="mx-auto w-full max-w-2xl bg-gradient-to-br from-[#291207] via-[#170B07] to-[#0B0B0A] border border-orange-400/40 rounded-3xl p-5 sm:p-6 space-y-3 shadow-[0_0_26px_rgba(249,115,22,0.18)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/15 text-orange-300 border border-orange-400/30 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-white">
                    Enable Pressure Mode
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-300 border border-orange-400/30">
                    High Stakes
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Enforces stricter 30-45s answer timers, high-tension follow-up challenges, and tough questions like: <em>"Why should we choose you over another candidate?"</em>
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={isPressureMode}
              onClick={() => setIsPressureMode(!isPressureMode)}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer shrink-0 ${
                isPressureMode ? 'bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.6)]' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  isPressureMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="p-3 bg-orange-500/10 border border-orange-500/25 rounded-xl text-xs text-orange-300 flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Pressure Mode simulates a challenging real-world interview. Recommended if you have upcoming final rounds!</span>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center pt-2">
          <Button
            size="lg"
            variant={isPressureMode ? 'pressure' : 'primary'}
            type="submit"
            icon={Play}
            className="w-full sm:w-auto px-12 py-4 text-base font-bold shadow-2xl shadow-purple-500/30"
          >
            {isPressureMode ? 'Launch Pressure Mode Interview' : 'Start Mock Interview'}
          </Button>
        </div>

      </form>

    </div>
  );
}
