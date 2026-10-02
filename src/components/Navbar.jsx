import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Sparkles, Bot, CircleHelp, Moon, Sun, Menu, X, Play, BookOpen, LineChart, User, UserRound, Home } from 'lucide-react';
import { Button } from './Button';

export function Navbar({ theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/setup', label: 'Practice', icon: Play },
    { to: '/questions', label: 'Question Bank', icon: BookOpen },
    { to: '/progress', label: 'Progress', icon: LineChart },
    { to: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080B14]/90 dark:bg-[#080B14]/90 light:bg-white/90 backdrop-blur-md border-b border-indigo-950/60 light:border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
            <div aria-hidden="true" className="relative flex h-full w-full items-center justify-center gap-0.5 rounded-[14px] bg-[#080B14] light:bg-white">
              <Bot className="h-5 w-5 text-purple-400" />
              <div className="relative mt-1">
                <UserRound className="h-3.5 w-3.5 text-purple-300" />
                <CircleHelp className="absolute -right-1.5 -top-2.5 h-3 w-3 rounded-full bg-[#080B14] text-amber-300 light:bg-white" />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white light:text-slate-900">
                InterVue
              </span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase tracking-wider">
                AI
              </span>
            </div>
            <span className="text-[9px] text-slate-400 font-semibold tracking-wide">
              AI INTERVIEW SIMULATOR
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-purple-500/15 text-purple-300 font-semibold border border-purple-500/30 shadow-sm shadow-purple-500/10'
                      : 'text-slate-400 hover:text-white light:hover:text-slate-900 hover:bg-[#131A2F]/60 light:hover:bg-slate-100'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl border border-slate-800 light:border-slate-200 bg-[#11182D]/70 light:bg-slate-100 text-slate-400 hover:text-white light:hover:text-slate-900 hover:border-purple-500/50 transition"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Quick CTA Button */}
          <div className="hidden sm:block">
            <Button
              size="md"
              variant="primary"
              icon={Sparkles}
              onClick={() => navigate('/setup')}
            >
              Start Interview
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-indigo-950/80 bg-[#080B14] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition ${
                    isActive
                      ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
          <div className="pt-2">
            <Button
              size="lg"
              variant="primary"
              className="w-full justify-center"
              icon={Play}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/setup');
              }}
            >
              Start Interview
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
