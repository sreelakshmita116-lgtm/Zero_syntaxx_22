import React from 'react';

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'pressure'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  loading = false,
  icon: Icon,
  className = '',
  ...props
}) {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-4.5 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3.5 text-base rounded-2xl gap-2.5'
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-indigo-500 via-purple-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold shadow-lg shadow-indigo-500/25 border border-purple-400/30 hover:shadow-purple-500/40',
    secondary:
      'bg-[#131A2F] hover:bg-[#1A233F] text-slate-100 border border-slate-700/80 font-medium',
    outline:
      'bg-transparent hover:bg-purple-500/10 text-purple-300 border border-purple-500/40 hover:border-purple-400 font-medium',
    ghost:
      'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white font-medium',
    danger:
      'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold',
    pressure:
      'bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-400 hover:from-amber-400 hover:to-yellow-300 text-black font-bold shadow-xl shadow-amber-500/30 border border-yellow-200/50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-sans tracking-wide transition-all duration-200 select-none cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${
        sizeStyles[size] || sizeStyles.md
      } ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : Icon ? (
        <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} shrink-0`} />
      ) : null}
      {children}
    </button>
  );
}
