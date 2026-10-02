import React from 'react';
import { Bot, LoaderCircle, Mic, MicOff, Send, SkipForward, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Button } from './Button';

export function InterviewCard({
  currentQuestionText,
  isFollowUpPhase,
  userAnswer,
  setUserAnswer,
  isAnalyzing,
  isRecording,
  onToggleVoice,
  onPlayQuestion,
  isSpeakingQuestion,
  isLoadingQuestionAudio,
  questionAudioError,
  onSubmitAnswer,
  onSkipQuestion,
  answerInputRef
}) {
  const wordCount = userAnswer.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="bg-[#11182D] border border-indigo-500/20 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl shadow-indigo-950/40">
      
      {/* Subtle purple gradient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Header: Interviewer Persona Banner */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 relative z-10">
        <div className="flex items-center space-x-3.5">
          <div className="relative">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-purple-500/25">
              <div className="w-full h-full bg-[#080B14] rounded-[14px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#11182D]" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white text-base tracking-tight">
                AI Interviewer
              </h3>
              {isFollowUpPhase ? (
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Follow-Up Question
                </span>
              ) : (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  Primary Prompt
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Evaluating clarity, depth & STAR structure in real-time
            </p>
          </div>
        </div>

        {/* Animated Soundwave Visualizer */}
        <div className="flex items-center space-x-1 text-purple-400 bg-purple-950/40 px-2.5 py-1.5 rounded-xl border border-purple-800/40">
          <span className="w-1 bg-purple-400 rounded-full animate-wave-1" />
          <span className="w-1 bg-indigo-400 rounded-full animate-wave-2" />
          <span className="w-1 bg-purple-300 rounded-full animate-wave-3" />
          <span className="w-1 bg-violet-400 rounded-full animate-wave-4" />
          <span className="w-1 bg-purple-400 rounded-full animate-wave-5" />
        </div>
      </div>

      {/* Current Question Statement */}
      <div className="bg-[#0B0F1C]/90 border border-indigo-500/25 rounded-2xl p-5 sm:p-6 space-y-2 relative z-10 shadow-inner">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interviewer Prompt</span>
          </span>
          <button
            type="button"
            onClick={onPlayQuestion}
            disabled={!currentQuestionText || isAnalyzing}
            aria-label={isLoadingQuestionAudio ? 'Cancel question audio' : isSpeakingQuestion ? 'Stop question audio' : 'Listen to question'}
            className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-2.5 py-1.5 text-xs font-semibold text-purple-300 transition hover:border-purple-400/60 hover:bg-purple-500/15 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoadingQuestionAudio ? (
              <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
            ) : isSpeakingQuestion ? (
              <VolumeX className="h-3.5 w-3.5" />
            ) : (
              <Volume2 className="h-3.5 w-3.5" />
            )}
            <span>{isLoadingQuestionAudio ? 'Generating...' : isSpeakingQuestion ? 'Stop' : 'Listen'}</span>
          </button>
        </div>
        {questionAudioError && (
          <p role="alert" className="text-xs text-rose-400">{questionAudioError}</p>
        )}
        <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
          "{currentQuestionText}"
        </p>
      </div>

      {/* Answer Input Section */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Your Response:</span>
          <span className="font-mono text-purple-300">
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
        </div>

        <div className="relative">
          <textarea
            ref={answerInputRef}
            rows={6}
            disabled={isAnalyzing}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Speak or type your answer clearly. Structure with the STAR method (Situation, Task, Action, Result) for higher scores..."
            className="w-full rounded-2xl border border-rose-400 bg-white p-4 text-sm text-slate-900 placeholder-slate-500 shadow-[0_0_18px_rgba(244,63,94,0.16)] transition-all focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-400/60 leading-relaxed font-sans"
          />

          {/* Voice Recording Indicator */}
          {isRecording && (
            <div className="absolute bottom-3 left-4 flex items-center space-x-2 text-xs font-bold text-rose-400 animate-pulse bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Listening... Speak clearly into your mic</span>
            </div>
          )}
        </div>
      </div>

      {/* Analyzing Animation Callout */}
      {isAnalyzing && (
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center space-x-3 text-purple-300 text-sm animate-pulse relative z-10">
          <Bot className="w-5 h-5 text-purple-400 animate-bounce shrink-0" />
          <div>
            <p className="font-bold text-white">Analyzing your answer...</p>
            <p className="text-xs text-purple-300/80">Evaluating clarity, technical depth, and preparing contextual follow-up.</p>
          </div>
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 relative z-10">
        
        {/* Voice Input Button */}
        <button
          type="button"
          onClick={onToggleVoice}
          disabled={isAnalyzing}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
            isRecording
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 animate-pulse'
              : 'bg-white border-orange-400 text-slate-900 shadow-[0_0_16px_rgba(249,115,22,0.22)] hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]'
          }`}
        >
          {isRecording ? <MicOff className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4 text-orange-600" />}
          <span>{isRecording ? 'Stop Recording' : 'Voice Input (Mic)'}</span>
        </button>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Button
            size="md"
            variant="ghost"
            icon={SkipForward}
            onClick={onSkipQuestion}
            disabled={isAnalyzing}
            className="flex-1 sm:flex-none text-xs"
          >
            Skip Question
          </Button>

          <Button
            size="md"
            variant="primary"
            icon={Send}
            loading={isAnalyzing}
            onClick={onSubmitAnswer}
            className="flex-1 sm:flex-none text-xs font-bold px-6 shadow-lg shadow-purple-500/25"
          >
            Submit Answer
          </Button>
        </div>

      </div>

    </div>
  );
}
