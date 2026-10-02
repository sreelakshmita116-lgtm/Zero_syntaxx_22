import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Sparkles, Zap, Target, LineChart, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';

export function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'AI Mock Interviews',
      description: 'Simulate realistic behavioral, technical, HR, and campus placement interviews with adaptive AI personas.',
      icon: Bot,
      accent: 'border-purple-500/30 bg-purple-500/5'
    },
    {
      title: 'Real-time Follow-up Questions',
      description: 'The AI doesn’t just read a static script — it actively analyzes your answer and poses smart, contextual follow-ups.',
      icon: Zap,
      accent: 'border-indigo-500/30 bg-indigo-500/5'
    },
    {
      title: 'Detailed Feedback',
      description: 'Receive multi-dimensional scores across Communication, Confidence, Relevance, Technical Depth, and Grammar.',
      icon: Target,
      accent: 'border-violet-500/30 bg-violet-500/5'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your improvement trajectory with interactive trend graphs, identified weaknesses, and session history.',
      icon: LineChart,
      accent: 'border-emerald-500/30 bg-emerald-500/5'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 text-center max-w-4xl mx-auto px-4">
        
        {/* Pill Tag */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-bold text-purple-300 mb-6 shadow-sm shadow-purple-500/10">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>Next-Generation AI Interview Practice For Students</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.15]">
          Practice. Improve.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-white">
            Get Interview Ready.
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-xl text-slate-300 mt-6 leading-relaxed max-w-2xl mx-auto font-normal">
          InterVue AI helps ambitious students and job seekers crack college placements, internship rounds, and high-stakes tech interviews with realistic AI-driven dialogue and instant feedback.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button
            size="lg"
            variant="primary"
            icon={Sparkles}
            onClick={() => navigate('/setup')}
            className="w-full sm:w-auto text-base font-bold px-8 shadow-xl shadow-purple-500/25"
          >
            Start Free Mock Interview
          </Button>

          <Button
            size="lg"
            variant="secondary"
            icon={LineChart}
            onClick={() => navigate('/progress')}
            className="w-full sm:w-auto text-base"
          >
            View Progress & History
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 mt-10 pt-6 border-t border-slate-800/80">
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero account required</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Voice & Text answer inputs</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Realistic Pressure Mode</span>
          </span>
        </div>

      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
            Engineered For Placement Success
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">
            Everything you need to master your interview performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`border rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-purple-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg bg-[#11182D] ${feat.accent}`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 mb-5 shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform">
                    <div className="w-full h-full bg-[#080B14] rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center text-xs font-semibold text-purple-400 group-hover:text-purple-300">
                  <span>Explore capability</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Special Feature: Pressure Mode Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-[#11100D] border border-amber-500/30 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl shadow-amber-950/20">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-extrabold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>Special Feature</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Simulate High-Stakes Pressure Mode
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Real interviewers test your composure with rapid-fire questions, 30-second timers, and unexpected follow-ups. Turn on Pressure Mode in setup to train your mental clarity under demanding conditions.
            </p>
          </div>

          <Button
            size="lg"
            variant="pressure"
            icon={ShieldAlert}
            onClick={() => navigate('/setup')}
            className="shrink-0 text-sm font-bold px-6 py-4"
          >
            Launch Pressure Mode
          </Button>
        </div>
      </section>

      {/* How it Works / 3 Step Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
            Simple 3-Step Process
          </h2>
          <p className="text-2xl font-bold text-white mt-1">
            How to get interview-ready in 15 minutes a day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-6 text-center space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/25 font-black text-base flex items-center justify-center mx-auto">
              1
            </div>
            <h4 className="text-base font-bold text-white">Configure Your Session</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Select between HR, Technical, Placement, or Internship, set difficulty level, and optionally add your skills.
            </p>
          </div>

          <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-6 text-center space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/25 font-black text-base flex items-center justify-center mx-auto">
              2
            </div>
            <h4 className="text-base font-bold text-white">Answer AI Interviewer</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Respond via voice or text under realistic countdown timers. Defend your reasoning when the AI asks follow-up questions.
            </p>
          </div>

          <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-6 text-center space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/25 font-black text-base flex items-center justify-center mx-auto">
              3
            </div>
            <h4 className="text-base font-bold text-white">Analyze Breakdown</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspect your Communication, Confidence, and Technical scores. Learn from identified weak spots before your real interview.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
