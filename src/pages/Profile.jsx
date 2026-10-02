import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, School, BookOpen, Code, Target, Save, Check, Play } from 'lucide-react';
import { Button } from '../components/Button';
import { getProfile, saveProfile, getInterviewHistory } from '../utils/storage';

export function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => getProfile());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const history = getInterviewHistory();

  const handleSave = (e) => {
    e.preventDefault();
    saveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-300 mb-2">
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span>Student Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Personal & Academic Profile
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            This information trains the AI to generate tailored questions matching your specific college, degree, and skills.
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          icon={Play}
          onClick={() => navigate('/setup')}
          className="text-xs font-bold shadow-lg shadow-purple-500/25"
        >
          Practice with Profile
        </Button>
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Profile saved successfully in your browser! Your next mock interview will automatically adapt to your background.</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-[#11182D] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-purple-400" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="e.g. Alex Morgan"
              className="w-full bg-[#080B14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            />
          </div>

          {/* College / University */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
              <School className="w-3.5 h-3.5 text-purple-400" />
              <span>College / University</span>
            </label>
            <input
              type="text"
              value={profile.college}
              onChange={(e) => setProfile({ ...profile, college: e.target.value })}
              placeholder="e.g. National Institute of Technology"
              className="w-full bg-[#080B14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            />
          </div>

          {/* Degree & Course */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              <span>Course / Major</span>
            </label>
            <input
              type="text"
              value={profile.course}
              onChange={(e) => setProfile({ ...profile, course: e.target.value })}
              placeholder="e.g. B.Tech Computer Science & Engineering"
              className="w-full bg-[#080B14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            />
          </div>

          {/* Career Goal */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
              <Target className="w-3.5 h-3.5 text-purple-400" />
              <span>Career Goal / Target Role</span>
            </label>
            <input
              type="text"
              value={profile.careerGoal}
              onChange={(e) => setProfile({ ...profile, careerGoal: e.target.value })}
              placeholder="e.g. Full-Stack Software Engineer at tech product company"
              className="w-full bg-[#080B14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            />
          </div>

        </div>

        {/* Technical Skills & Expertise */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
            <Code className="w-3.5 h-3.5 text-purple-400" />
            <span>Key Technical Skills (Comma separated)</span>
          </label>
          <textarea
            rows={3}
            value={profile.skills}
            onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
            placeholder="e.g. React, JavaScript, Node.js, Python, DSA, SQL, System Design, Git"
            className="w-full bg-[#080B14] border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 leading-relaxed font-sans"
          />
          <p className="text-[11px] text-slate-500">
            The AI interviewer will draw from these skills when asking architecture and domain-specific questions.
          </p>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          <span className="text-xs text-slate-400">
            Stored locally on your device in <code className="text-purple-300 font-mono">localStorage</code>.
          </span>

          <Button
            size="md"
            variant="primary"
            type="submit"
            icon={Save}
            className="font-bold px-6 shadow-md shadow-purple-500/25"
          >
            Save Profile
          </Button>
        </div>

      </form>

      {/* Snapshot Cards */}
      <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h4 className="text-base font-bold text-white">Interview Readiness</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            You have completed <strong className="text-purple-300">{history.length}</strong> mock interview sessions so far.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate('/progress')}
        >
          View Full Report
        </Button>
      </div>

    </div>
  );
}
