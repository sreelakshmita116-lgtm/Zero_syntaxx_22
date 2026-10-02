import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Search, X } from 'lucide-react';
import { ALL_QUESTIONS } from '../data/questions';
import { QuestionCard } from '../components/QuestionCard';

export function QuestionBank() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialCat = location.state?.filterCategory || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = [
    'All',
    'HR Interview',
    'Technical Interview',
    'Internship Interview',
    'College Placement',
    'Self Introduction',
    'Behavioral Questions',
    'Pressure Mode'
  ];

  const filteredQuestions = useMemo(() => {
    return ALL_QUESTIONS.filter((q) => {
      if (selectedCategory !== 'All' && q.category !== selectedCategory) {
        return false;
      }
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchQ = q.question.toLowerCase().includes(query);
        const matchCat = q.category.toLowerCase().includes(query);
        const matchKws = q.keywords?.some((kw) => kw.toLowerCase().includes(query));
        if (!matchQ && !matchCat && !matchKws) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const handlePracticeQuestion = (question) => {
    let typeId = 'hr';
    if (question.category.includes('Technical')) typeId = 'technical';
    else if (question.category.includes('Internship')) typeId = 'internship';
    else if (question.category.includes('Placement')) typeId = 'placement';
    else if (question.category.includes('Self Intro')) typeId = 'self_intro';
    else if (question.category.includes('Behavioral')) typeId = 'behavioral';

    navigate('/setup', {
      state: {
        category: typeId,
        preSelectedQuestion: question
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-300 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-purple-400" />
          <span>Curated Interview Repository</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Curated Question Bank
        </h1>
        <p className="text-sm text-slate-400">
          Browse real placement and industry interview questions. Practice individual prompts with AI follow-ups.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by concept (e.g. OOP, conflict, architecture, weakness, compiler)..."
            className="w-full bg-[#080B14] border border-slate-800 rounded-2xl pl-11 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'bg-[#0B0F1C] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400">
            Showing <strong className="text-white">{filteredQuestions.length}</strong> questions
          </span>

          <div className="flex items-center space-x-1.5">
            <span className="text-slate-500">Difficulty:</span>
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg border transition ${
                  selectedDifficulty === diff
                    ? 'bg-[#18223F] text-purple-300 border-purple-500/40 font-bold'
                    : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Question Cards Grid */}
      {filteredQuestions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onPractice={handlePracticeQuestion}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#11182D] border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No questions match your criteria</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search keywords or resetting the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
            className="text-xs text-purple-300 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
