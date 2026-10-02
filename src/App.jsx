import React, { useState, useEffect } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Setup } from './pages/Setup';
import { Interview } from './pages/Interview';
import { Results } from './pages/Results';
import { Dashboard } from './pages/Dashboard';
import { QuestionBank } from './pages/QuestionBank';
import { Profile } from './pages/Profile';
import { getStoredTheme, setStoredTheme } from './utils/storage';
import { Bot, Heart, Sparkles } from 'lucide-react';

const Router = import.meta.env.BASE_URL === '/' ? BrowserRouter : HashRouter;

function App() {
  const [theme, setTheme] = useState(() => getStoredTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    setStoredTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col font-sans selection:bg-[#FFD633] selection:text-black ${theme}`}>
        
        {/* Top Sticky Navigation */}
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        {/* Dynamic Route Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/results" element={<Results />} />
            <Route path="/progress" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/questions" element={<QuestionBank />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#33290D] bg-[#080808] light:bg-white text-slate-400 py-10 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFD633] to-white p-0.5">
                <div className="w-full h-full bg-[#080808] light:bg-white rounded-[10px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#FFD633]" />
                </div>
              </div>
              <div>
                <span className="font-bold text-sm text-[#FF8A24] drop-shadow-[0_0_7px_rgba(255,138,36,0.75)]">
                  InterVue AI
                </span>
                <p className="text-[11px] text-slate-500">
                  Practice. Improve. Get Interview Ready.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <Link to="/" className="hover:text-amber-300 transition">Home</Link>
              <Link to="/setup" className="hover:text-amber-300 transition">Practice Mock</Link>
              <Link to="/questions" className="hover:text-amber-300 transition">Question Bank</Link>
              <Link to="/progress" className="hover:text-amber-300 transition">Dashboard</Link>
              <Link to="/profile" className="hover:text-amber-300 transition">Profile</Link>
              <a href="mailto:BugDealers@gmail.com" className="hover:text-amber-300 transition">Contact Us</a>
              <span className="border-l border-orange-400/40 pl-4 text-[10px] font-bold uppercase tracking-wider text-orange-300">
                Developed by Bug Dealers
              </span>
            </div>

            <div className="text-xs text-slate-500 text-center md:text-right">
              <span>Local session storage • Edge TTS question audio</span>
            </div>

          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;
